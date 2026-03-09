import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.json({ message: "غير مصرح" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ message: "لم يتم رفع أي صورة" }, { status: 400 });
    }

    const allowed = /\.(jpeg|jpg|png|gif|webp)$/i;
    if (!allowed.test(file.name)) {
      return NextResponse.json({ message: "نوع الملف غير مدعوم" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ message: "حجم الملف كبير جداً" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const ext = path.extname(file.name);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const filePath = path.join(uploadDir, uniqueName);

    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    const url = `/uploads/${uniqueName}`;
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ message: "حدث خطأ في رفع الصورة" }, { status: 500 });
  }
}
