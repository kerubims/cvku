/**
 * Admin layout: shell dengan sidebar + cek auth (handled by AdminShell).
 * Catatan: middleware sudah redirect /admin/* ke /admin/login kalau tidak ada cookie.
 * AdminShell melakukan validasi tambahan (kalau cookie ada tapi invalid, /api/auth/me 401).
 */
import type { Metadata } from "next";
import { AdminShell } from "./admin-shell";

export const metadata: Metadata = {
  title: "Admin — CVKu",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
