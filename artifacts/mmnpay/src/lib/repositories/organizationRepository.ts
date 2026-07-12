// Repository for organizations. This is the single place that knows how an
// organization is created, looked up, and updated -- it talks to Supabase's
// "organizations" table directly, via the shared `supabase` client. Page
// components should call these functions instead of querying Supabase
// themselves.

import { supabase } from "@/lib/supabase";

export interface Organization {
  id: string;
  owner_id: string;
  name: string;
  owner_name: string;
  email: string;
  phone: string;
  country: string;
  currency: string;
  timezone: string;
  plan: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface NewOrganizationInput {
  owner_id: string;
  name: string;
  owner_name: string;
  email: string;
  phone: string;
  country: string;
  currency: string;
  timezone: string;
  plan?: string;
  status?: string;
}

export type OrganizationUpdateInput = Partial<
  Omit<Organization, "id" | "owner_id" | "created_at" | "updated_at">
>;

const TABLE = "organizations";

const DEFAULT_PLAN = "free";
const DEFAULT_STATUS = "active";

// Creates a new organization owned by the given user. Throws if the insert
// fails (e.g. Supabase error, constraint violation).
export async function createOrganization(
  data: NewOrganizationInput
): Promise<Organization> {

  const { data: created, error } = await supabase
    .from(TABLE)
    .insert({
      owner_id: data.owner_id,
      name: data.name,
      owner_name: data.owner_name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      currency: data.currency,
      timezone: data.timezone,
      plan: data.plan ?? DEFAULT_PLAN,
      status: data.status ?? DEFAULT_STATUS
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return created as Organization;

}

// Returns the organization owned by the given user, or null if none exists.
// Throws if the lookup itself fails (e.g. Supabase error).
export async function getOrganizationByUser(
  userId: string
): Promise<Organization | null> {

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("owner_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as Organization) ?? null;

}

// Updates an existing organization by id with a partial set of fields.
// Throws if the update fails or no matching organization is found.
export async function updateOrganization(
  id: string,
  data: OrganizationUpdateInput
): Promise<Organization> {

  const { data: updated, error } = await supabase
    .from(TABLE)
    .update({
      ...data,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updated as Organization;

}
