// Repository for user accounts and the current session. This is the
// single place that knows how a "user" is registered, authenticated, and
// persisted -- it wraps Supabase Auth exclusively. No page component may
// talk to `supabase.auth` directly or rely on legacy localStorage auth
// state; they must go through the functions exported here.

import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface NewUserInput {
  fullName: string;
  email: string;
  password: string;
}

// Maps a Supabase Auth user object to the app's User shape.
function toUser(supabaseUser: SupabaseUser): User {

  return {
    id: supabaseUser.id,
    fullName: (supabaseUser.user_metadata?.fullName as string) || "",
    email: supabaseUser.email || "",
    createdAt: supabaseUser.created_at
  };

}

// Registers a new user with Supabase Auth and ensures an active session
// exists before returning. Throws if the email is already registered or
// the sign-up otherwise fails.
export async function register(input: NewUserInput): Promise<User> {

  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        fullName: input.fullName
      }
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  // Supabase's anti-enumeration behavior: signUp for an email that already
  // exists succeeds but returns a user with an empty identities array.
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    throw new Error("This email is already registered.");
  }

  if (!data.user) {
    throw new Error("Unable to create account.");
  }

  // If email confirmation is required, signUp does not return an active
  // session. Explicitly sign in so the caller always ends up authenticated.
  if (!data.session) {

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password
    });

    if (signInError) {
      throw new Error(signInError.message);
    }

  }

  return toUser(data.user);

}

// Authenticates a user by email/password via Supabase Auth. Throws if the
// credentials do not match a registered user.
export async function login(email: string, password: string): Promise<User> {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.user) {
    throw new Error("Invalid email or password.");
  }

  return toUser(data.user);

}

// Clears the current Supabase session.
export async function logout(): Promise<void> {

  await supabase.auth.signOut();

}

// Returns the currently authenticated Supabase user, or null if there is
// no active session. Always reflects the live Supabase Auth session --
// never legacy localStorage state.
export async function getCurrentUser(): Promise<User | null> {

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return toUser(data.user);

}
