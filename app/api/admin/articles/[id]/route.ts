import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, AuthError } from "@/lib/auth";
import { getArticleById, updateArticle, deleteArticle } from "@/lib/articles";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const article = await getArticleById(id);
    if (!article) {
      return NextResponse.json({ ok: false, error: "Artikel tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, article });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
    }
    console.error("[API GET /admin/articles/[id]] Error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();

    const updated = await updateArticle(id, body);
    if (!updated) {
      return NextResponse.json({ ok: false, error: "Gagal memperbarui artikel." }, { status: 404 });
    }

    // Revalidate public routes
    revalidatePath("/contoh-cv");
    revalidatePath(`/contoh-cv/${updated.slug}`);

    return NextResponse.json({ ok: true, article: updated });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
    }
    console.error("[API PATCH /admin/articles/[id]] Error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const article = await getArticleById(id);
    const success = await deleteArticle(id);

    if (!success) {
      return NextResponse.json({ ok: false, error: "Gagal menghapus artikel." }, { status: 400 });
    }

    if (article) {
      revalidatePath("/contoh-cv");
      revalidatePath(`/contoh-cv/${article.slug}`);
    }

    return NextResponse.json({ ok: true, message: "Artikel berhasil dihapus." });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
    }
    console.error("[API DELETE /admin/articles/[id]] Error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
