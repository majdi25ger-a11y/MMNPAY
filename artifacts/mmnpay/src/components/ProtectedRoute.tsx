import { ReactNode, useEffect, useState } from "react";
import { Redirect } from "wouter";
import * as authRepository from "@/lib/repositories/authRepository";
import type { Role } from "@/lib/repositories/roleRepository";
import { hasRole } from "@/lib/permissions";

interface ProtectedRouteProps {
  children: ReactNode;
  // When provided, the route also requires the current user's role to be
  // one of `allowedRoles`, in addition to being authenticated. Omit for
  // routes that only need a valid session, regardless of role (the
  // pre-existing behavior of this component).
  allowedRoles?: Role[];
}

type SessionState = "checking" | "authenticated" | "unauthenticated" | "forbidden";

// Wraps a page and only renders it when a user is logged in (and, if
// `allowedRoles` is given, also holds one of those roles). It always checks
// the live Supabase Auth session and role (via
// authRepository.getCurrentUserWithRole()) rather than any legacy
// localStorage auth state or email comparison. While the check is in
// flight it renders nothing; unauthenticated sessions redirect to /login,
// and authenticated-but-unauthorized sessions redirect to /dashboard.
export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {

  const [sessionState, setSessionState] = useState<SessionState>("checking");

  useEffect(() => {

    let isMounted = true;

    authRepository.getCurrentUserWithRole().then((currentUser) => {

      if (!isMounted) {
        return;
      }

      if (!currentUser) {
        setSessionState("unauthenticated");
        return;
      }

      if (allowedRoles && !hasRole(currentUser.role, allowedRoles)) {
        setSessionState("forbidden");
        return;
      }

      setSessionState("authenticated");

    });

    return () => {
      isMounted = false;
    };

  }, [allowedRoles]);

  if (sessionState === "checking") {
    return null;
  }

  if (sessionState === "unauthenticated") {
    return <Redirect to="/login" />;
  }

  if (sessionState === "forbidden") {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;

}
