// Repository for invoices. This is the single place that knows how an
// invoice is created, looked up, updated, and deleted -- it talks to
// Supabase's "invoices" table directly, via the shared `supabase` client.
// Page components should call these functions instead of touching
// localStorage or querying Supabase themselves.

import { supabase } from "@/lib/supabase";

export interface Invoice {
  id: string;
  organization_id: string;
  invoice_number: string;
  customer_name: string;
  email: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export interface NewInvoiceInput {
  organization_id: string;
  invoice_number: string;
  customer_name: string;
  email: string;
  amount: number;
  currency: string;
  description: string;
  due_date: string;
  status?: string;
}

export type InvoiceUpdateInput = Partial<
  Omit<Invoice, "id" | "organization_id" | "created_at" | "updated_at">
>;

const TABLE = "invoices";

const DEFAULT_STATUS = "Draft";

// Creates a new invoice for the given organization. Throws if the insert
// fails (e.g. Supabase error, constraint violation).
export async function createInvoice(data: NewInvoiceInput): Promise<Invoice> {

  const { data: created, error } = await supabase
    .from(TABLE)
    .insert({
      organization_id: data.organization_id,
      invoice_number: data.invoice_number,
      customer_name: data.customer_name,
      email: data.email,
      amount: data.amount,
      currency: data.currency,
      description: data.description,
      due_date: data.due_date,
      status: data.status || DEFAULT_STATUS
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return created as Invoice;

}

// Returns every invoice belonging to the given organization, most recently
// created first. Throws if the query fails.
export async function getInvoicesByOrganization(
  organizationId: string
): Promise<Invoice[]> {

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as Invoice[]) ?? [];

}

// Returns a single invoice by its human-facing invoice number, scoped to
// an organization, or null if none exists. Throws if the lookup fails.
export async function getInvoiceByNumber(
  organizationId: string,
  invoiceNumber: string
): Promise<Invoice | null> {

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("organization_id", organizationId)
    .eq("invoice_number", invoiceNumber)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as Invoice) ?? null;

}

// Updates an existing invoice by id with a partial set of fields. Throws if
// the update fails or no matching invoice is found.
export async function updateInvoice(
  id: string,
  data: InvoiceUpdateInput
): Promise<Invoice> {

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

  return updated as Invoice;

}

// Deletes an invoice by id. Throws if the delete fails.
export async function deleteInvoice(id: string): Promise<void> {

  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

}
