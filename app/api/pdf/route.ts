import { NextResponse } from "next/server";
import puppeteer, { executablePath } from "puppeteer";
import { existsSync } from "fs";
import { renderCV } from "@/lib/render-cv";

function chromePath(): string | undefined {
  // Prefer locally vendored headless shell; fall back to puppeteer's default.
  const local =
    "/home/ubs/cvku/.chrome/chrome-headless-shell/linux-152.0.7977.54/chrome-headless-shell-linux64/chrome-headless-shell";
  if (existsSync(local)) return local;
  try {
    const p = executablePath();
    return typeof p === "string" ? p : undefined;
  } catch {
    return undefined;
  }
}
import type { CVData } from "@/lib/cv-data";

// Simple concurrency gate: max 2 simultaneous renders, queue the rest.
let active = 0;
const waiters: (() => void)[] = [];

async function acquire() {
  if (active < 2) {
    active++;
    return;
  }
  await new Promise<void>((resolve) => waiters.push(resolve));
  active++;
}

function release() {
  active--;
  const next = waiters.shift();
  if (next) next();
}

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  let data: CVData;
  let templateId: string;
  try {
    const body = (await request.json()) as { data?: CVData; templateId?: string };
    data = body.data ?? ({} as CVData);
    templateId = body.templateId ?? "T1";
    if (!data.fullName || typeof data.fullName !== "string") {
      return NextResponse.json(
        { error: "Nama belum diisi." },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Request tidak valid." }, { status: 400 });
  }

  await acquire();
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: chromePath(),
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
    const page = await browser.newPage();
    const html = renderCV(data, templateId);
    await page.setContent(html, { waitUntil: "load" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "15mm", bottom: "15mm", left: "15mm", right: "15mm" },
    });

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="cv.pdf"',
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal membuat PDF. Coba lagi." },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close().catch(() => {});
    release();
  }
}
