import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Permission, hasPermission, hasAnyPermission } from "../types/roles";
import ForbiddenPage from "../pages/ForbiddenPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  requiredPermissions?: Permission[];
  requireAll?: boolean; // If true, user must have ALL permissions; if false, user needs ANY of them
  fallback?: React.ReactNode;
}

/**
 * ProtectedRoute component
 * Guards routes based on user permissions
 *
 * Usage:
 * <ProtectedRoute requiredPermission={Permission.READ_PRODUCTS}>
 *   <ProductsPage />
 * </ProtectedRoute>
 *
 * Or with multiple permissions:
 * <ProtectedRoute requiredPermissions={[Permission.READ_SALES, Permission.WRITE_SALES]} requireAll={false}>
 *   <SalesPage />
 * </ProtectedRoute>
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredPermissions,
  requireAll = true,
  fallback,
}) => {
  const { user, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to sign in if not authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Check permissions
  const hasRequiredPermission = () => {
    if (requiredPermission) {
      return hasPermission(user.role, requiredPermission);
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
      if (requireAll) {
        return requiredPermissions.every((perm) =>
          hasPermission(user.role, perm),
        );
      } else {
        return requiredPermissions.some((perm) =>
          hasPermission(user.role, perm),
        );
      }
    }

    return true; // No permission required
  };

  // Show forbidden page if user doesn't have permission
  if (!hasRequiredPermission()) {
    return (
      fallback || <ForbiddenPage requiredPermission={requiredPermission} />
    );
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
