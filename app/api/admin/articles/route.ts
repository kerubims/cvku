import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, AuthError } from "@/lib/auth";
import { getAllArticles, createArticle } from "@/lib/articles";

export async function GET(req: Request) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "all";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;

    const articles = await getAllArticles({ status, limit });
    return NextResponse.json({ ok: true, articles });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
    }
    console.error("[API GET /admin/articles] Error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user } = await requireAdmin();
    const body = await req.json();

    if (!body.title || !body.slug || !body.content_markdown) {
      return NextResponse.json(
        { ok: false, error: "Judul, slug, dan isi markdown wajib diisi." },
        { status: 400 }
      );
    }

    const article = await createArticle({
      title: body.title,
      slug: body.slug,
      content_markdown: body.content_markdown,
      meta_description: body.meta_description,
      target_keyword: body.target_keyword,
      status: body.status || "draft",
      author_id: user.id,
    });

    // Revalidate public routes if published
    if (article.status === "published") {
      revalidatePath("/contoh-cv");
      revalidatePath(`/contoh-cv/${article.slug}`);
    }

    return NextResponse.json({ ok: true, article }, { status: 201 });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
    }
    console.error("[API POST /admin/articles] Error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
