"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { ArrowRight, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login.mutateAsync({ username, password });
      router.push("/admin");
    } catch (err: any) {
      setError(err.message?.includes("401") ? "اسم المستخدم أو كلمة المرور غير صحيحة" : "حدث خطأ، حاول مرة أخرى");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8FA] flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <img src="/images/logo.png" alt="غيداء البادية" className="h-20 mx-auto mb-4" data-testid="img-login-logo" />
          </a>
          <h1 className="text-2xl font-black text-[#1A4B75]">تسجيل الدخول</h1>
          <p className="text-slate-500 font-medium mt-2">لوحة إدارة غيداء البادية</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 start-0 w-full h-2 bg-gradient-to-l from-[#1A4B75] via-[#3594C4] to-[#6CA741]"></div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm font-medium" data-testid="text-login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="login-username" className="block text-sm font-bold text-slate-700 mb-2">
                اسم المستخدم
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="login-username"
                  type="text"
                  data-testid="input-login-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pr-10 pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3594C4] focus:border-transparent transition-all"
                  placeholder="أدخل اسم المستخدم"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-bold text-slate-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="login-password"
                  type="password"
                  data-testid="input-login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pr-10 pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3594C4] focus:border-transparent transition-all"
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              data-testid="button-login-submit"
              disabled={login.isPending}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1A4B75] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#123654] transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
            >
              {login.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-[#3594C4] font-bold hover:underline" data-testid="link-back-home">
            العودة للصفحة الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}
