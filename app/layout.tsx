import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CVKu - Buat CV Lolos ATS Gratis",
  description:
    "Buat CV profesional yang lolos screening ATS dalam hitungan menit. Gratis, tanpa login, dengan bantuan AI untuk merapikan pengalaman kerjamu.",
  metadataBase: new URL("https://cv.ksm.web.id"),
  openGraph: {
    title: "CVKu - Buat CV Lolos ATS Gratis",
    description:
      "CV profesional yang lolos ATS, dirapikan AI, gratis tanpa login.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-zinc-50 text-zinc-900">
        {children}
      </body>
    </html>
  );
}
