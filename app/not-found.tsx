import Link from "next/link";

export default function NotFound() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F4F8FA] flex items-center justify-center font-sans">
      <div className="text-center">
        <h1 className="text-6xl font-black text-[#1A4B75] mb-4">404</h1>
        <p className="text-xl text-slate-600 font-medium mb-8">الصفحة غير موجودة</p>
        <Link
          href="/"
          className="bg-[#1A4B75] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#123654] transition-all shadow-lg"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
