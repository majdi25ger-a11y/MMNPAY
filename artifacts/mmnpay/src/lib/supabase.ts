// Configured Supabase client for MMNPAY, sourced from Vite env vars.
// Throws immediately if either required variable is missing, rather than
// letting a misconfigured client fail silently later on.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing environment variable VITE_SUPABASE_URL. Set it before using the Supabase client."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing environment variable VITE_SUPABASE_ANON_KEY. Set it before using the Supabase client."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
