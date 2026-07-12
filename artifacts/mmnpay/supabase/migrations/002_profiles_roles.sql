-- Role-based access control for MMNPAY.
-- Run this once in the Supabase SQL editor (same project as the existing
-- organizations/invoices migrations).
--
-- Creates a `profiles` table 1:1 with auth.users holding each user's role,
-- auto-assigns "owner" to every new signup via trigger, backfills existing
-- users to "owner", and locks the table down with RLS mirroring the
-- `organizations` security model (a user may only read/manage their own row;
-- there is no client-side path to self-promote to super_admin).

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'owner' check (role in ('super_admin', 'owner')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

-- Keep updated_at current on every row change.
create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_profiles_updated_at();

-- Auto-provision a profile with role "owner" for every new auth.users row.
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'owner')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;

create trigger on_auth_user_created_profile
after insert on auth.users
for each row
execute function public.handle_new_user_profile();

-- Backfill: give every existing user without a profile the "owner" role.
insert into public.profiles (id, role)
select u.id, 'owner'
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;

-- RLS: same model as `organizations` -- users may only see/manage their own
-- row. No policy allows a user to set their own role, so self-promotion to
-- super_admin is impossible from the client; that must be done manually
-- (e.g. via the Supabase SQL editor) by an operator.
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

-- Intentionally no update/delete policy for regular users: role changes are
-- an operator-only action performed directly in the database.
