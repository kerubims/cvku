"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

const NAV = [
  { href: "/admin/feedback", label: "Feedback" },
  { href: "/admin/articles", label: "Artikel SEO", soon: true },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [, startSignOut] = useTransition();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const r = await fetch("/api/auth/me", { credentials: "include" });
        if (r.status === 401) {
          router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
          return;
        }
        const data = await r.json();
        if (active && data.user) setUser(data.user);
      } catch (err) {
        console.error("[/api/auth/me] error:", err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [pathname, router]);

  function handleSignOut() {
    startSignOut(async () => {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      router.push("/admin/login");
      router.refresh();
    });
  }

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-zinc-50 text-sm text-zinc-500">
        Memuat…
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-zinc-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-[100dvh] w-60 flex-col border-r border-zinc-200 bg-white px-4 py-6 sm:flex">
          <Link href="/" className="mb-6 block">
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              CVKu <span className="text-emerald-600">Admin</span>
            </h1>
          </Link>

          <nav className="space-y-1">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-emerald-50 font-semibold text-emerald-700"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.soon && (
                    <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-600">
                      soon
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-zinc-200 pt-4">
            {user && (
              <div className="mb-2 truncate text-xs text-zinc-600" title={user.email}>
                {user.name || user.email}
              </div>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-10">
          {/* Mobile top bar */}
          <div className="mb-4 flex items-center justify-between sm:hidden">
            <Link href="/" className="text-base font-bold text-zinc-900">
              CVKu Admin
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700"
            >
              Logout
            </button>
          </div>

          {/* Mobile nav */}
          <nav className="mb-4 flex gap-1 sm:hidden">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-1 rounded-md px-3 py-2 text-center text-sm ${
                    active
                      ? "bg-emerald-600 font-semibold text-white"
                      : "border border-zinc-200 bg-white text-zinc-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {children}
        </main>
      </div>
    </div>
  );
}
