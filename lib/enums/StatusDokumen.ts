export const STATUS_DOKUMEN = {
  PENGAJUAN: "pengajuan",
  DITERIMA: "diterima",
  DITOLAK: "ditolak",
  TIDAK_AKTIF: "tidak aktif",
} as const;

export type UserRole = (typeof STATUS_DOKUMEN)[keyof typeof STATUS_DOKUMEN];
