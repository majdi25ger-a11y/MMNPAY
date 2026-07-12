import { ReactNode, useEffect, useState } from "react";
import { Redirect } from "wouter";
import * as authRepository from "@/lib/repositories/authRepository";

interface ProtectedRouteProps {
  children: ReactNode;
}

type SessionState = "checking" | "authenticated" | "unauthenticated";

// Wraps a page and only renders it when a user is logged in. It always
// checks the live Supabase Auth session (via authRepository.getCurrentUser())
// rather than any legacy localStorage auth state. While the check is in
// flight it renders nothing; if there is no active session it redirects to
// /login instead of rendering the requested page.
export default function ProtectedRoute({ children }: ProtectedRouteProps) {

  const [sessionState, setSessionState] = useState<SessionState>("checking");

  useEffect(() => {

    let isMounted = true;

    authRepository.getCurrentUser().then((currentUser) => {

      if (!isMounted) {
        return;
      }

      setSessionState(currentUser ? "authenticated" : "unauthenticated");

    });

    return () => {
      isMounted = false;
    };

  }, []);

  if (sessionState === "checking") {
    return null;
  }

  if (sessionState === "unauthenticated") {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;

}
