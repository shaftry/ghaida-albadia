"use client";

import { Warehouse, HeartPulse, Stethoscope, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Warehouse,
    title: "استيراد وتجهيز حظائر الدواجن",
    description:
      "نقدم أحدث الأنظمة والمعدات لإنشاء وتجهيز حظائر الدواجن بمواصفات عالمية تضمن بيئة مثالية للتربية، من أنظمة التبريد والتدفئة إلى خطوط الشرب والعلف.",
    color: "text-[#3594C4]",
    bgColor: "bg-[#3594C4]/10",
    borderColor: "border-[#3594C4]/20",
    image:
      "https://images.unsplash.com/photo-1697545698404-46828377ae9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VsdHJ5JTIwZmFybSUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc3MjkxODQ3OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: HeartPulse,
    title: "الأدوية البيطرية واللقاحات",
    description:
      "توفير مجموعة شاملة من الأدوية، الفيتامينات، واللقاحات المعتمدة من أفضل الشركات العالمية للحفاظ على صحة القطيع ومكافحة الأمراض بكفاءة عالية.",
    color: "text-[#6CA741]",
    bgColor: "bg-[#6CA741]/10",
    borderColor: "border-[#6CA741]/20",
    image:
      "https://images.unsplash.com/photo-1606235357537-84aea24d4c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwbWVkaWNpbmUlMjBib3R0bGVzfGVufDF8fHx8MTc3MjkxNzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Stethoscope,
    title: "الاستشارات الفنية والبيطرية",
    description:
      "فريق متخصص من الأطباء البيطريين والمهندسين الزراعيين لتقديم الدعم الفني، التشخيص الدقيق، والاستشارات المستمرة لعملائنا في كافة المراحل.",
    color: "text-[#1A4B75]",
    bgColor: "bg-[#1A4B75]/10",
    borderColor: "border-[#1A4B75]/20",
    image:
      "https://images.unsplash.com/photo-1580982185288-5b50f66a4726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGxhYiUyMHNjaWVudGlzdHxlbnwxfHx8fDE3NzI5MTg0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Leaf,
    title: "مستلزمات التغذية الحديثة",
    description:
      "استيراد وتوزيع أجود أنواع المكملات الغذائية والإضافات العلفية التي تضمن نمواً صحياً وسريعاً وإنتاجية عالية للمزارع بمقاييس جودة عالمية.",
    color: "text-[#C53026]",
    bgColor: "bg-[#C53026]/10",
    borderColor: "border-[#C53026]/20",
    image:
      "https://images.unsplash.com/photo-1586335726249-23f5cee36e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmVlZCUyMGJhZ3N8ZW58MXx8fHwxNzcyOTE4NDkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Services() {
  return (
    <section id="services" data-testid="section-services" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-full mb-6 border border-slate-200 shadow-sm">
            <span className="text-[#3594C4] font-bold text-sm tracking-wide">
              الخدمات المتخصصة
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A4B75] mb-6 leading-tight">
            حلول متكاملة لنجاح <span className="text-[#6CA741]">مشروعك</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            نضع بين أيديكم خبراتنا الواسعة وشراكاتنا العالمية لتقديم أفضل الخدمات
            والحلول المبتكرة في قطاع الدواجن والبيطرة.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              data-testid={`card-service-${index}`}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col sm:flex-row"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 sm:hidden"></div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.bgColor} border ${service.borderColor}`}
                >
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A4B75] mb-4 group-hover:text-[#3594C4] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
