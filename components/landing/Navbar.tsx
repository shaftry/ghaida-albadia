"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "الرئيسية", href: "#hero" },
  { name: "من نحن", href: "#about" },
  { name: "خدماتنا", href: "#services" },
  { name: "منتجاتنا", href: "#products" },
  { name: "لماذا نحن", href: "#features" },
  { name: "اتصل بنا", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed w-full z-50 top-0 start-0 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#1A4B75]/10"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="flex-shrink-0 flex items-center gap-4">
            <img
              src="/images/logo.png"
              alt="غيداء البادية"
              data-testid="img-logo"
              className="h-16 md:h-20 w-auto drop-shadow-sm transition-transform hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="block text-[#1A4B75] font-bold text-xl leading-tight">
                غيداء البادية
              </span>
              <span className="block text-[#3594C4] text-sm font-semibold mt-0.5">
                لاستيراد حظائر الدواجن
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`link-nav-${link.href.slice(1)}`}
                className="text-[#1A4B75] hover:text-[#3594C4] py-2 text-base font-bold transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#3594C4] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="#contact"
              data-testid="link-consultation"
              className="bg-[#6CA741] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#598d35] transition-all duration-300 shadow-md hover:shadow-lg mr-4"
            >
              اطلب استشارة
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isOpen}
              className="text-[#1A4B75] hover:text-[#3594C4] focus:outline-none p-2 bg-[#F4F8FA] rounded-md"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-white border-t border-[#1A4B75]/10 shadow-lg absolute w-full transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-[#1A4B75] hover:bg-[#F4F8FA] hover:text-[#3594C4] px-4 py-3 rounded-lg text-base font-bold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4">
            <a
              href="#contact"
              className="block text-center bg-[#6CA741] text-white px-6 py-3 rounded-lg text-base font-bold hover:bg-[#598d35] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              اطلب استشارة
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
