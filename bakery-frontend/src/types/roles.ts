/* ============================================
   ROLE-BASED ACCESS CONTROL (RBAC) SYSTEM
   ============================================ */

export const UserRole = {
  ADMIN: "admin",
  OWNER: "owner",
  MANAGER: "manager",
  STAFF: "staff",
  CUSTOMER: "customer",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const Permission = {
  // Dashboard
  READ_DASHBOARD: "read_dashboard",
  WRITE_DASHBOARD: "write_dashboard",

  // Products/Bread
  READ_PRODUCTS: "read_products",
  WRITE_PRODUCTS: "write_products",
  DELETE_PRODUCTS: "delete_products",

  // Sales
  READ_SALES: "read_sales",
  WRITE_SALES: "write_sales",
  DELETE_SALES: "delete_sales",

  // Inventory
  READ_INVENTORY: "read_inventory",
  WRITE_INVENTORY: "write_inventory",

  // Users/Accounts
  READ_USERS: "read_users",
  WRITE_USERS: "write_users",
  DELETE_USERS: "delete_users",

  // Reports
  READ_REPORTS: "read_reports",
  WRITE_REPORTS: "write_reports",

  // Settings
  READ_SETTINGS: "read_settings",
  WRITE_SETTINGS: "write_settings",
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

/**
 * Role to Permissions mapping
 * Define which permissions each role has
 */
export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // Admin has all permissions
    Permission.READ_DASHBOARD,
    Permission.WRITE_DASHBOARD,
    Permission.READ_PRODUCTS,
    Permission.WRITE_PRODUCTS,
    Permission.DELETE_PRODUCTS,
    Permission.READ_SALES,
    Permission.WRITE_SALES,
    Permission.DELETE_SALES,
    Permission.READ_INVENTORY,
    Permission.WRITE_INVENTORY,
    Permission.READ_USERS,
    Permission.WRITE_USERS,
    Permission.DELETE_USERS,
    Permission.READ_REPORTS,
    Permission.WRITE_REPORTS,
    Permission.READ_SETTINGS,
    Permission.WRITE_SETTINGS,
  ],

  [UserRole.OWNER]: [
    // Owner can read all but limited write access
    Permission.READ_DASHBOARD,
    Permission.READ_PRODUCTS,
    Permission.READ_SALES,
    Permission.READ_INVENTORY,
    Permission.READ_USERS,
    Permission.READ_REPORTS,
    Permission.READ_SETTINGS,
  ],

  [UserRole.MANAGER]: [
    // Manager can manage products, sales, and inventory
    Permission.READ_DASHBOARD,
    Permission.WRITE_DASHBOARD,
    Permission.READ_PRODUCTS,
    Permission.WRITE_PRODUCTS,
    Permission.READ_SALES,
    Permission.WRITE_SALES,
    Permission.READ_INVENTORY,
    Permission.WRITE_INVENTORY,
    Permission.READ_USERS,
    Permission.READ_REPORTS,
  ],

  [UserRole.STAFF]: [
    // Staff can read most things and write to sales/inventory
    Permission.READ_DASHBOARD,
    Permission.READ_PRODUCTS,
    Permission.READ_SALES,
    Permission.WRITE_SALES,
    Permission.READ_INVENTORY,
    Permission.WRITE_INVENTORY,
  ],

  [UserRole.CUSTOMER]: [
    // Customer can only read minimal info
    Permission.READ_PRODUCTS,
  ],
};

/**
 * Check if a role has a specific permission
 */
export const hasPermission = (
  role: UserRole,
  permission: Permission,
): boolean => {
  return rolePermissions[role].includes(permission);
};

/**
 * Check if a role has any of the specified permissions
 */
export const hasAnyPermission = (
  role: UserRole,
  permissions: Permission[],
): boolean => {
  return permissions.some((perm) => hasPermission(role, perm));
};

/**
 * Check if a role has all of the specified permissions
 */
export const hasAllPermissions = (
  role: UserRole,
  permissions: Permission[],
): boolean => {
  return permissions.every((perm) => hasPermission(role, perm));
};
