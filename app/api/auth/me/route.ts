import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ message: "غير مسجل الدخول" }, { status: 401 });
    }

    return NextResponse.json({
      id: session.userId,
      username: session.username,
      isAdmin: session.isAdmin,
    });
  } catch {
    return NextResponse.json({ message: "حدث خطأ" }, { status: 500 });
  }
}
