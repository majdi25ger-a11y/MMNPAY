import { ReactNode } from "react";
import { Redirect } from "wouter";
import * as authRepository from "@/lib/repositories/authRepository";

interface ProtectedRouteProps {
  children: ReactNode;
}

// Wraps a page and only renders it when a user is logged in. If there is
// no current session (per authRepository.getCurrentUser()), it redirects
// to /login instead of rendering the requested page.
export default function ProtectedRoute({ children }: ProtectedRouteProps) {

  const currentUser = authRepository.getCurrentUser();

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;

}
