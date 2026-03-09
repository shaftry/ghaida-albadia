import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/server/storage";
import { insertGalleryImageSchema } from "@shared/schema";
import { getSession } from "@/lib/session";
import { seedData } from "@/server/seed";

export const dynamic = "force-dynamic";

let seeded = false;
async function ensureSeeded() {
  if (!seeded) {
    await seedData();
    seeded = true;
  }
}

export async function GET() {
  try {
    await ensureSeeded();
    const items = await storage.getGalleryImages();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ message: "حدث خطأ في جلب الصور" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.json({ message: "غير مصرح" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = insertGalleryImageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "بيانات غير صحيحة", errors: parsed.error.errors }, { status: 400 });
    }

    const created = await storage.createGalleryImage(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ message: "حدث خطأ في إضافة الصورة" }, { status: 500 });
  }
}
