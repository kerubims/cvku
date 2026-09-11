import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, AuthError } from "@/lib/auth";
import { getAllArticles, createArticle, type ArticleType } from "@/lib/articles";

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const type = (searchParams.get("type") as ArticleType) || undefined;

    const articles = await getAllArticles({ status, type });
    return NextResponse.json({ ok: true, articles });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.statusCode });
    }
    console.error("GET /api/admin/articles error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { user } = await requireAdmin();
    const body = await request.json();

    if (!body.title || !body.slug || !body.content_markdown) {
      return NextResponse.json(
        { ok: false, error: "Judul, slug, dan isi markdown wajib diisi" },
        { status: 400 }
      );
    }

    const type = body.type || "cv_example";

    const article = await createArticle({
      title: body.title,
      slug: body.slug,
      target_keyword: body.target_keyword,
      meta_description: body.meta_description,
      content_markdown: body.content_markdown,
      status: body.status || "draft",
      type: type,
      author_id: user.id,
    });

    // Revalidate affected routes
    if (type === "cv_example") {
      revalidatePath("/contoh-cv");
      revalidatePath(`/contoh-cv/${article.slug}`);
    } else {
      revalidatePath("/artikel");
      revalidatePath(`/artikel/${article.slug}`);
    }

    return NextResponse.json({ ok: true, article }, { status: 201 });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.statusCode });
    }
    console.error("POST /api/admin/articles error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
