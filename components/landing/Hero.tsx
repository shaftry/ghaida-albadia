"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="hero"
      data-testid="section-hero"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#F4F8FA]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-l from-white/90 via-[#F4F8FA]/95 to-[#F4F8FA] z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1697545698404-46828377ae9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VsdHJ5JTIwZmFybSUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc3MjkxODQ3OXww&ixlib=rb-4.1.0&q=80&w=1920"
          alt="مزرعة دواجن حديثة"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="lg:w-3/5 grid gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white border border-[#3594C4]/20 px-4 py-2 rounded-full w-max shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#C53026] animate-pulse"></span>
            <span className="text-sm font-bold text-[#1A4B75]">
              ريادة في استيراد مستلزمات الدواجن
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A4B75] leading-[1.2]">
            شريكك الموثوق في <br />
            <span className="text-[#3594C4]">التكنولوجيا الزراعية</span> و{" "}
            <span className="text-[#6CA741]">الأدوية البيطرية</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium max-w-xl">
            نقدم في غيداء البادية حلولاً متكاملة لاستيراد حظائر الدواجن الحديثة
            والأدوية البيطرية المعتمدة لضمان إنتاجية عالية وصحة مستدامة لمزارعكم.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#services"
              data-testid="link-browse-services"
              className="inline-flex items-center justify-center gap-3 bg-[#1A4B75] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#123654] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
            >
              تصفح خدماتنا
              <ArrowLeft className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              data-testid="link-contact-hero"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#1A4B75] border-2 border-[#1A4B75]/10 px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#F4F8FA] hover:border-[#3594C4]/50 transition-all duration-300"
            >
              تواصل معنا
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-[#1A4B75]/10">
            {["جودة مضمونة", "خبرة طويلة", "دعم متواصل"].map((text) => (
              <div
                key={text}
                className="flex items-center gap-2 text-slate-600 font-semibold"
              >
                <CheckCircle2 className="w-5 h-5 text-[#6CA741]" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
