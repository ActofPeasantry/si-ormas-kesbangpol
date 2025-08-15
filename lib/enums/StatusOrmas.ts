export const STATUS_ORMAS = {
  AKTIF: "aktif",
  NON_AKTIF: "non aktif",
} as const;

export type UserRole = (typeof STATUS_ORMAS)[keyof typeof STATUS_ORMAS];
