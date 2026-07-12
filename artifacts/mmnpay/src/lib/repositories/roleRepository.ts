// Repository for user roles. This is the single place that knows how a
// role is looked up -- it talks to Supabase's "profiles" table directly,
// via the shared `supabase` client. Page components and other repositories
// should call these functions instead of querying "profiles" themselves.

import { supabase } from "@/lib/supabase";

export type Role = "super_admin" | "owner";

export interface Profile {
  id: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

const TABLE = "profiles";

const DEFAULT_ROLE: Role = "owner";

// Returns the role for the given user id. Every user is expected to have a
// profile row (auto-created by a database trigger on signup), so a missing
// row falls back to the default role rather than throwing -- this keeps
// role checks resilient if a profile hasn't been created yet. Throws only
// if the lookup itself fails (e.g. a genuine Supabase error).
export async function getRoleByUserId(userId: string): Promise<Role> {

  const { data, error } = await supabase
    .from(TABLE)
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data?.role as Role) ?? DEFAULT_ROLE;

}

// Returns the full profile row for the given user id, or null if none
// exists yet. Throws if the lookup itself fails.
export async function getProfileByUserId(userId: string): Promise<Profile | null> {

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as Profile) ?? null;

}
