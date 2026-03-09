import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/server/storage";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

function parseId(param: string): number | null {
  const id = Number(param);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.json({ message: "غير مصرح" }, { status: 401 });
    }

    const id = parseId(params.id);
    if (!id) return NextResponse.json({ message: "معرف غير صحيح" }, { status: 400 });

    const existing = await storage.getGalleryImageById(id);
    if (!existing) return NextResponse.json({ message: "الصورة غير موجودة" }, { status: 404 });

    await storage.deleteGalleryImage(id);
    return NextResponse.json({ message: "تم حذف الصورة بنجاح" });
  } catch {
    return NextResponse.json({ message: "حدث خطأ في حذف الصورة" }, { status: 500 });
  }
}
