/* ============================================
   ROLE-BASED ACCESS CONTROL (RBAC) SYSTEM
   Role set mirrors the backend Role enum
   (ADMIN, OWNER, MANAGER, ACCOUNTING, BAKER, CASHIER).
   Permission map follows the cross-module access matrix
   in the Notion "Feature and Roles Specification".
   ============================================ */

export const UserRole = {
  ADMIN: "admin",
  OWNER: "owner",
  MANAGER: "manager",
  ACCOUNTING: "accounting",
  BAKER: "baker",
  CASHIER: "cashier",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const Permission = {
  // Dashboard
  READ_DASHBOARD: "read_dashboard",
  WRITE_DASHBOARD: "write_dashboard",

  // Products/Recipes/Ingredients
  READ_PRODUCTS: "read_products",
  WRITE_PRODUCTS: "write_products",
  DELETE_PRODUCTS: "delete_products",

  // Sales
  READ_SALES: "read_sales",
  WRITE_SALES: "write_sales",
  DELETE_SALES: "delete_sales",

  // Production
  READ_PRODUCTION: "read_production",
  WRITE_PRODUCTION: "write_production",

  // Inventory / Stock
  READ_INVENTORY: "read_inventory",
  WRITE_INVENTORY: "write_inventory",

  // Finance
  READ_FINANCE: "read_finance",
  WRITE_FINANCE: "write_finance",

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
 * Role to Permissions mapping, derived from the spec's cross-module
 * access matrix (Sales / Production / Stock / Finance / Dashboard).
 * Products (Recipes/Ingredients) aren't in that matrix directly; they're
 * treated like Stock, since recipes drive ingredient consumption.
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
    Permission.READ_PRODUCTION,
    Permission.WRITE_PRODUCTION,
    Permission.READ_INVENTORY,
    Permission.WRITE_INVENTORY,
    Permission.READ_FINANCE,
    Permission.WRITE_FINANCE,
    Permission.READ_USERS,
    Permission.WRITE_USERS,
    Permission.DELETE_USERS,
    Permission.READ_REPORTS,
    Permission.WRITE_REPORTS,
    Permission.READ_SETTINGS,
    Permission.WRITE_SETTINGS,
  ],

  [UserRole.OWNER]: [
    // Owner: read-only across the board
    Permission.READ_DASHBOARD,
    Permission.READ_PRODUCTS,
    Permission.READ_SALES,
    Permission.READ_PRODUCTION,
    Permission.READ_INVENTORY,
    Permission.READ_FINANCE,
    Permission.READ_USERS,
    Permission.READ_REPORTS,
    Permission.READ_SETTINGS,
  ],

  [UserRole.MANAGER]: [
    // Manager: RW on Sales/Production, read-only on Stock/Finance
    Permission.READ_DASHBOARD,
    Permission.WRITE_DASHBOARD,
    Permission.READ_PRODUCTS,
    Permission.READ_SALES,
    Permission.WRITE_SALES,
    Permission.READ_PRODUCTION,
    Permission.WRITE_PRODUCTION,
    Permission.READ_INVENTORY,
    Permission.READ_FINANCE,
    Permission.READ_USERS,
    Permission.READ_REPORTS,
  ],

  [UserRole.ACCOUNTING]: [
    // Accounting: RW on Stock/Finance, read-only on Sales, no Production
    Permission.READ_DASHBOARD,
    Permission.READ_PRODUCTS,
    Permission.WRITE_PRODUCTS,
    Permission.READ_SALES,
    Permission.READ_INVENTORY,
    Permission.WRITE_INVENTORY,
    Permission.READ_FINANCE,
    Permission.WRITE_FINANCE,
    Permission.READ_REPORTS,
    Permission.WRITE_REPORTS,
  ],

  [UserRole.BAKER]: [
    // Head Baker: RW on Production/Stock, no Sales/Finance, limited Dashboard
    Permission.READ_DASHBOARD,
    Permission.READ_PRODUCTS,
    Permission.WRITE_PRODUCTS,
    Permission.READ_PRODUCTION,
    Permission.WRITE_PRODUCTION,
    Permission.READ_INVENTORY,
    Permission.WRITE_INVENTORY,
  ],

  [UserRole.CASHIER]: [
    // Cashier: RW on Sales only, no Dashboard/Stock/Finance/Production
    Permission.READ_PRODUCTS,
    Permission.READ_SALES,
    Permission.WRITE_SALES,
  ],
};

/**
 * Check if a role has a specific permission
 */
export const hasPermission = (
  role: UserRole,
  permission: Permission,
): boolean => {
  const perms = rolePermissions[role];
  if (!perms) return false;
  return perms.includes(permission);
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
