"use client";

import { ShieldCheck, Truck, Clock, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "جودة معتمدة عالمياً",
    description:
      "جميع منتجاتنا وأدويتنا معتمدة من الهيئات المحلية والدولية لضمان أعلى معايير الجودة.",
    color: "text-[#6CA741]",
    bg: "bg-[#6CA741]/10",
  },
  {
    icon: Clock,
    title: "توصيل سريع وآمن",
    description:
      "نمتلك أسطولاً مجهزاً لضمان وصول الأدوية والمعدات في الوقت المحدد وبأفضل الظروف.",
    color: "text-[#3594C4]",
    bg: "bg-[#3594C4]/10",
  },
  {
    icon: HeadphonesIcon,
    title: "دعم فني واستشاري",
    description:
      "فريقنا متواجد على مدار الساعة لتقديم الدعم الفني والاستشارات البيطرية المجانية.",
    color: "text-[#1A4B75]",
    bg: "bg-[#1A4B75]/10",
  },
  {
    icon: Truck,
    title: "تغطية شاملة",
    description:
      "نغطي كافة مناطق المملكة بشبكة توزيع واسعة لضمان وصول خدماتنا لكل مربي.",
    color: "text-[#C53026]",
    bg: "bg-[#C53026]/10",
  },
];

export function Features() {
  return (
    <section
      id="features"
      data-testid="section-features"
      className="py-24 bg-[#1A4B75] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-[#3594C4] blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] rounded-full bg-[#6CA741] blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="text-white font-bold text-sm tracking-wide">
              لماذا تختار غيداء البادية
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            نتميز بخبرتنا الطويلة و
            <span className="text-[#3594C4]">جودة</span> منتجاتنا
          </h2>
          <p className="text-lg text-slate-300 font-medium leading-relaxed">
            نحن لا نقدم منتجات فحسب، بل نبني شراكات استراتيجية لنجاح مزارعكم من
            خلال معايير صارمة للتميز والخدمة.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              data-testid={`card-feature-${idx}`}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
