import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/server/storage";
import { insertNewsSchema } from "@shared/schema";
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
    const items = await storage.getNews();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ message: "حدث خطأ في جلب الأخبار" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.json({ message: "غير مصرح" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = insertNewsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "بيانات غير صحيحة", errors: parsed.error.errors }, { status: 400 });
    }

    const created = await storage.createNews(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ message: "حدث خطأ في إنشاء الخبر" }, { status: 500 });
  }
}
