import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getSession();
    session.destroy();
    return NextResponse.json({ message: "تم تسجيل الخروج بنجاح" });
  } catch {
    return NextResponse.json({ message: "فشل تسجيل الخروج" }, { status: 500 });
  }
}
