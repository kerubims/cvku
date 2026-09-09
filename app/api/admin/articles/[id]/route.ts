import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, AuthError } from "@/lib/auth";
import { getArticleById, updateArticle, deleteArticle } from "@/lib/articles";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const article = await getArticleById(id);

    if (!article) {
      return NextResponse.json(
        { ok: false, error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, article });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.statusCode });
    }
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const current = await getArticleById(id);
    if (!current) {
      return NextResponse.json(
        { ok: false, error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    const article = await updateArticle(id, body);

    if (article) {
      const type = article.type || "cv_example";
      if (type === "cv_example") {
        revalidatePath("/contoh-cv");
        revalidatePath(`/contoh-cv/${article.slug}`);
      } else {
        revalidatePath("/artikel");
        revalidatePath(`/artikel/${article.slug}`);
      }
    }

    return NextResponse.json({ ok: true, article });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.statusCode });
    }
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const current = await getArticleById(id);
    if (current) {
      const type = current.type || "cv_example";
      if (type === "cv_example") {
        revalidatePath("/contoh-cv");
        revalidatePath(`/contoh-cv/${current.slug}`);
      } else {
        revalidatePath("/artikel");
        revalidatePath(`/artikel/${current.slug}`);
      }
    }

    const success = await deleteArticle(id);
    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Gagal menghapus artikel" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, message: "Artikel berhasil dihapus." });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.statusCode });
    }
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
