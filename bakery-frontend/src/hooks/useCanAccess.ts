import { useAuth } from "../context/AuthContext";
import { Permission } from "../types/roles";

/**
 * Custom hook to check if current user has a specific permission
 *
 * Usage:
 * const { canAccess } = useCanAccess();
 * if (canAccess(Permission.WRITE_PRODUCTS)) {
 *   // Show edit button
 * }
 */
export const useCanAccess = () => {
  const { user, hasPermission, hasAnyPermission, hasAllPermissions } =
    useAuth();

  return {
    canAccess: (permission: Permission) => hasPermission(permission),
    canAccessAny: (permissions: Permission[]) => hasAnyPermission(permissions),
    canAccessAll: (permissions: Permission[]) => hasAllPermissions(permissions),
    userRole: user?.role,
    isAdmin: user?.role === "admin",
    isOwner: user?.role === "owner",
    isManager: user?.role === "manager",
    isStaff: user?.role === "staff",
    isCustomer: user?.role === "customer",
  };
};

export default useCanAccess;
