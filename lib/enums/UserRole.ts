export const USER_ROLES = {
  ADMIN: "admin",
  ORMAS: "ormas",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
