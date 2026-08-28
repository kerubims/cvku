import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ORG_SCHEMA, SOFTWARE_SCHEMA, SITE_URL } from "@/lib/seo/schemas";
import { JsonLd } from "@/components/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CVKu - Buat CV Lolos ATS Gratis",
    template: "%s | CVKu",
  },
  description:
    "Buat CV profesional yang lolos screening ATS dalam hitungan menit. Gratis, tanpa login, dengan bantuan AI untuk merapikan pengalaman kerjamu.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "CVKu - Buat CV Lolos ATS Gratis",
    description:
      "CV profesional yang lolos ATS, dirapikan AI, gratis tanpa login.",
    type: "website",
    locale: "id_ID",
    siteName: "CVKu",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVKu - Buat CV Lolos ATS Gratis",
    description:
      "CV profesional yang lolos ATS, dirapikan AI, gratis tanpa login.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
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
        <JsonLd data={[ORG_SCHEMA, SOFTWARE_SCHEMA]} />
        {children}
      </body>
    </html>
  );
}
