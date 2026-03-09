"use client";

import { Shield, Target } from "lucide-react";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" data-testid="section-about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-[#3594C4] rounded-3xl translate-x-4 translate-y-4 opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1723357018190-c0163698165b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwb3VsdHJ5JTIwYmFybiUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MjkxODQ5MXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="غيداء البادية"
              data-testid="img-about"
              className="relative rounded-3xl shadow-xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-8 ltr:-left-8 rtl:-right-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#F4F8FA] rounded-full flex items-center justify-center">
                  <span className="text-3xl font-black text-[#6CA741]">+15</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A4B75] text-lg">سنوات من الخبرة</h4>
                  <p className="text-sm text-slate-500 font-medium">
                    في السوق المحلي والإقليمي
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F4F8FA] px-4 py-2 rounded-full mb-6">
              <span className="text-[#3594C4] font-bold text-sm tracking-wide">
                من نحن
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A4B75] mb-6 leading-tight">
              غيداء البادية: التزام بالتميز والجودة في قطاع الدواجن والبيطرة
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              نحن شركة رائدة متخصصة في استيراد وتوريد حظائر الدواجن المتطورة
              والأدوية البيطرية عالية الجودة. نسعى دائماً لتلبية احتياجات المزارعين
              والمربين من خلال توفير أحدث التقنيات والمنتجات العالمية المعتمدة لضمان
              بيئة صحية وإنتاجية ممتازة.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#3594C4]/10 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-[#3594C4]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A4B75] mb-2">رؤيتنا</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  أن نكون الخيار الأول والرواد في قطاع التكنولوجيا الزراعية والرعاية
                  البيطرية في المنطقة.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#6CA741]/10 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#6CA741]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A4B75] mb-2">رسالتنا</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  تقديم حلول مبتكرة ومنتجات موثوقة تساهم في تطوير القطاع الزراعي
                  والحيواني بشكل مستدام.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
