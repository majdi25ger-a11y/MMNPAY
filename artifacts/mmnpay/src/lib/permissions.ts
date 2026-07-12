// Reusable, role-based permission helpers. Routes and components should
// check access through these functions instead of comparing emails or
// hardcoding role strings inline -- this is the single source of truth for
// "who is allowed to do what".

import type { Role } from "@/lib/repositories/roleRepository";

export const ROLES: Record<"SUPER_ADMIN" | "OWNER", Role> = {
  SUPER_ADMIN: "super_admin",
  OWNER: "owner"
};

// Roles allowed to access the admin dashboard and any other super-admin-only
// surface. Owners are excluded -- they only see their own organization's
// normal dashboard.
const ADMIN_ROLES: Role[] = [ROLES.SUPER_ADMIN];

// True if `role` is one of the `allowedRoles`. `role` may be null while a
// session/profile is still loading -- treated as "not allowed" rather than
// throwing, so callers can gate rendering on it directly.
export function hasRole(role: Role | null | undefined, allowedRoles: Role[]): boolean {

  if (!role) {
    return false;
  }

  return allowedRoles.includes(role);

}

// True if `role` grants access to admin-only surfaces (e.g. /admin).
export function canAccessAdmin(role: Role | null | undefined): boolean {

  return hasRole(role, ADMIN_ROLES);

}

// True if `role` grants access to the regular, organization-scoped
// dashboard. Both roles can use the normal dashboard -- super_admin is a
// superset of owner, not a separate, restricted account.
export function canAccessDashboard(role: Role | null | undefined): boolean {

  return hasRole(role, [ROLES.SUPER_ADMIN, ROLES.OWNER]);

}
