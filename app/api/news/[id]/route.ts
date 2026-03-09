import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/server/storage";
import { insertNewsSchema } from "@shared/schema";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

function parseId(param: string): number | null {
  const id = Number(param);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseId(params.id);
    if (!id) return NextResponse.json({ message: "معرف غير صحيح" }, { status: 400 });

    const item = await storage.getNewsById(id);
    if (!item) return NextResponse.json({ message: "الخبر غير موجود" }, { status: 404 });

    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ message: "حدث خطأ" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.json({ message: "غير مصرح" }, { status: 401 });
    }

    const id = parseId(params.id);
    if (!id) return NextResponse.json({ message: "معرف غير صحيح" }, { status: 400 });

    const existing = await storage.getNewsById(id);
    if (!existing) return NextResponse.json({ message: "الخبر غير موجود" }, { status: 404 });

    const body = await req.json();
    const allowed = insertNewsSchema.partial().safeParse(body);
    if (!allowed.success) {
      return NextResponse.json({ message: "بيانات غير صحيحة", errors: allowed.error.errors }, { status: 400 });
    }

    const updated = await storage.updateNews(id, allowed.data);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: "حدث خطأ في تحديث الخبر" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.json({ message: "غير مصرح" }, { status: 401 });
    }

    const id = parseId(params.id);
    if (!id) return NextResponse.json({ message: "معرف غير صحيح" }, { status: 400 });

    const existing = await storage.getNewsById(id);
    if (!existing) return NextResponse.json({ message: "الخبر غير موجود" }, { status: 404 });

    await storage.deleteNews(id);
    return NextResponse.json({ message: "تم حذف الخبر بنجاح" });
  } catch {
    return NextResponse.json({ message: "حدث خطأ في حذف الخبر" }, { status: 500 });
  }
}
