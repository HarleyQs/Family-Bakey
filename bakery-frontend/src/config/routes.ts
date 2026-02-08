import { UserRole, Permission, hasPermission } from "../types/roles";

export interface RouteConfig {
  path: string;
  label: string;
  requiredPermission?: Permission;
  requiredPermissions?: Permission[];
  requireAll?: boolean;
  component?: React.ComponentType;
  children?: RouteConfig[];
  hidden?: boolean; // Hide from navigation if user doesn't have permission
}

/**
 * Application routes with permission requirements
 * Define all routes and their required permissions here
 */
export const routeConfig: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    requiredPermission: Permission.READ_DASHBOARD,
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    requiredPermission: Permission.READ_DASHBOARD,
  },
  {
    path: "/products",
    label: "Products",
    requiredPermission: Permission.READ_PRODUCTS,
    children: [
      {
        path: "/products",
        label: "All Products",
        requiredPermission: Permission.READ_PRODUCTS,
      },
      {
        path: "/products/new",
        label: "Add Product",
        requiredPermission: Permission.WRITE_PRODUCTS,
      },
      {
        path: "/products/:id/edit",
        label: "Edit Product",
        requiredPermission: Permission.WRITE_PRODUCTS,
      },
    ],
  },
  {
    path: "/sales",
    label: "Sales",
    requiredPermission: Permission.READ_SALES,
    children: [
      {
        path: "/sales",
        label: "All Sales",
        requiredPermission: Permission.READ_SALES,
      },
      {
        path: "/sales/new",
        label: "New Sale",
        requiredPermission: Permission.WRITE_SALES,
      },
    ],
  },
  {
    path: "/inventory",
    label: "Inventory",
    requiredPermission: Permission.READ_INVENTORY,
  },
  {
    path: "/users",
    label: "Users",
    requiredPermission: Permission.READ_USERS,
    hidden: true, // Hidden for non-admin users
    children: [
      {
        path: "/users",
        label: "All Users",
        requiredPermission: Permission.READ_USERS,
      },
      {
        path: "/users/new",
        label: "Add User",
        requiredPermission: Permission.WRITE_USERS,
      },
    ],
  },
  {
    path: "/reports",
    label: "Reports",
    requiredPermission: Permission.READ_REPORTS,
  },
  {
    path: "/settings",
    label: "Settings",
    requiredPermission: Permission.READ_SETTINGS,
    hidden: true, // Hidden for non-admin users
  },
];

/**
 * Get accessible routes for a user based on their role
 */
export const getAccessibleRoutes = (
  role: UserRole,
  routes: RouteConfig[] = routeConfig,
): RouteConfig[] => {
  return routes
    .filter((route) => {
      if (!route.requiredPermission) return true;
      return hasPermission(role, route.requiredPermission);
    })
    .map((route) => ({
      ...route,
      children: route.children
        ? getAccessibleRoutes(role, route.children)
        : undefined,
    }));
};

/**
 * Get navigation items for a user (routes without 'hidden' flag that they have access to)
 */
export const getNavigation = (role: UserRole): RouteConfig[] => {
  const accessibleRoutes = getAccessibleRoutes(role);
  return accessibleRoutes.filter((route) => !route.hidden);
};
