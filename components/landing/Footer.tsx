"use client";

import { Facebook, Instagram, Linkedin, Heart } from "lucide-react";
import { SiX } from "react-icons/si";

export function Footer() {
  return (
    <footer
      data-testid="footer"
      className="bg-[#0F172A] pt-20 pb-10 border-t-[6px] border-[#3594C4] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute bottom-[-20%] right-[-5%] w-96 h-96 rounded-full bg-[#1A4B75] blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl w-max shadow-lg">
              <img src="/images/logo.png" alt="غيداء البادية" className="h-16 w-auto" />
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
              غيداء البادية لاستيراد حظائر الدواجن والأدوية البيطرية، ريادة في
              التكنولوجيا الزراعية والرعاية البيطرية في المملكة.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                data-testid="link-twitter"
                aria-label="تويتر"
                className="w-10 h-10 bg-[#1A4B75] rounded-full flex items-center justify-center text-white hover:bg-[#3594C4] transition-colors shadow-md"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="#"
                data-testid="link-linkedin"
                aria-label="لينكد إن"
                className="w-10 h-10 bg-[#1A4B75] rounded-full flex items-center justify-center text-white hover:bg-[#3594C4] transition-colors shadow-md"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                data-testid="link-instagram"
                aria-label="انستقرام"
                className="w-10 h-10 bg-[#1A4B75] rounded-full flex items-center justify-center text-white hover:bg-[#3594C4] transition-colors shadow-md"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                data-testid="link-facebook"
                aria-label="فيسبوك"
                className="w-10 h-10 bg-[#1A4B75] rounded-full flex items-center justify-center text-white hover:bg-[#3594C4] transition-colors shadow-md"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#6CA741]"></div>
              روابط سريعة
            </h4>
            <ul className="space-y-4">
              {[
                { name: "الرئيسية", href: "#hero" },
                { name: "من نحن", href: "#about" },
                { name: "خدماتنا", href: "#services" },
                { name: "منتجاتنا", href: "#products" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-[#3594C4] font-medium transition-colors inline-block hover:-translate-x-1 duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#C53026]"></div>
              خدمات العملاء
            </h4>
            <ul className="space-y-4">
              {[
                "الاستشارات البيطرية",
                "طلب تسعيرة حظائر",
                "الدعم الفني والصيانة",
                "تواصل معنا",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#contact"
                    className="text-slate-400 hover:text-[#3594C4] font-medium transition-colors inline-block hover:-translate-x-1 duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3594C4]"></div>
              النشرة البريدية
            </h4>
            <p className="text-slate-400 font-medium leading-relaxed mb-4">
              اشترك في النشرة البريدية للحصول على أحدث الأخبار وعروض الأسعار.
            </p>
            <div className="flex bg-[#1A4B75] p-1 rounded-xl shadow-inner">
              <input
                type="email"
                data-testid="input-newsletter-email"
                placeholder="البريد الإلكتروني"
                className="w-full bg-transparent border-none text-white px-4 focus:outline-none placeholder-slate-400"
              />
              <button
                data-testid="button-newsletter-subscribe"
                className="bg-[#3594C4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2b7ba5] transition-colors whitespace-nowrap"
              >
                اشتراك
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 font-medium text-sm">
            &copy; {new Date().getFullYear()} غيداء البادية. جميع الحقوق محفوظة.
          </p>
          <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
            تم التطوير بحب <Heart className="w-4 h-4 text-[#C53026]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
