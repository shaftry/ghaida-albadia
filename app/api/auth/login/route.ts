import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/server/storage";
import { comparePasswords } from "@/lib/auth-helpers";
import { getSessionFromReq } from "@/lib/session";
import { seedData } from "@/server/seed";

let seeded = false;
async function ensureSeeded() {
  if (!seeded) {
    await seedData();
    seeded = true;
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureSeeded();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: "يجب إدخال اسم المستخدم وكلمة المرور" }, { status: 400 });
    }

    const user = await storage.getUserByUsername(username);
    if (!user) {
      return NextResponse.json({ message: "اسم المستخدم أو كلمة المرور غير صحيحة" }, { status: 401 });
    }

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "اسم المستخدم أو كلمة المرور غير صحيحة" }, { status: 401 });
    }

    if (!user.isAdmin) {
      return NextResponse.json({ message: "ليس لديك صلاحيات الدخول" }, { status: 403 });
    }

    const res = NextResponse.json({ id: user.id, username: user.username, isAdmin: user.isAdmin });
    const session = await getSessionFromReq(req, res);
    session.userId = user.id;
    session.username = user.username;
    session.isAdmin = user.isAdmin;
    session.isLoggedIn = true;
    await session.save();

    return res;
  } catch {
    return NextResponse.json({ message: "حدث خطأ في تسجيل الدخول" }, { status: 500 });
  }
}
