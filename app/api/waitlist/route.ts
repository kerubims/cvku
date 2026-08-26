import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

export async function GET() {
  try {
    const r = await pool.query("SELECT count(*)::int AS n FROM waitlist");
    return NextResponse.json({ count: r.rows[0].n });
  } catch {
    return NextResponse.json({ count: null });
  }
}

export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: string };
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Request tidak valid." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { error: "Format email tidak valid." },
      { status: 400 }
    );
  }

  try {
    const r = await pool.query(
      `INSERT INTO waitlist (email) VALUES ($1)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [email]
    );
    if (r.rowCount === 0) {
      return NextResponse.json(
        { ok: true, message: "Email kamu sudah terdaftar sebelumnya." },
        { status: 200 }
      );
    }
    const total = await pool.query("SELECT count(*)::int AS n FROM waitlist");
    return NextResponse.json({
      ok: true,
      message: "Kamu masuk daftar tunggu. Terima kasih!",
      count: total.rows[0].n,
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan. Coba lagi sebentar." },
      { status: 500 }
    );
  }
}
