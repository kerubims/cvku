/**
 * In-memory rate limiter untuk /api/auth/* endpoints.
 *
 * Sederhana: sliding-window counter, max 10 request / 60 detik per IP.
 * Untuk production scale-out, ganti pakai Redis/Upstash.
 * Untuk 1 admin CVKu, in-memory cukup.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

// Bersihkan bucket lama tiap 5 menit
setInterval(
  () => {
    const now = Date.now();
    for (const [key, b] of buckets) {
      if (b.resetAt < now) buckets.delete(key);
    }
  },
  5 * 60_000
).unref?.();

export function rateLimit(
  key: string,
  max: number = 10,
  windowMs: number = 60_000
): { ok: true; remaining: number } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const b = buckets.get(key);

  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }

  b.count += 1;
  if (b.count > max) {
    return { ok: false, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  return { ok: true, remaining: max - b.count };
}

export function getClientIp(req: Request): string | null {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf;
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return null;
}
