"use client";

import { PackageSearch, ShoppingBag, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    id: "equipment",
    title: "معدات وتجهيزات الحظائر",
    items: [
      "أنظمة الشرب الأوتوماتيكية",
      "خطوط العلف الآلية",
      "مراوح وشفاطات التبريد",
      "خلايا التبريد والمناخ",
      "أنظمة التدفئة المركزية",
    ],
    image:
      "https://images.unsplash.com/photo-1697545698404-46828377ae9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VsdHJ5JTIwZmFybSUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc3MjkxODQ3OXww&ixlib=rb-4.1.0&q=80&w=800",
    color: "bg-[#1A4B75]",
  },
  {
    id: "medicine",
    title: "الأدوية واللقاحات البيطرية",
    items: [
      "المضادات الحيوية الفعالة",
      "اللقاحات والأمصال",
      "الفيتامينات والأحماض الأمينية",
      "مضادات الكوكسيديا",
      "المنظفات والمطهرات الحيوية",
    ],
    image:
      "https://images.unsplash.com/photo-1606235357537-84aea24d4c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwbWVkaWNpbmUlMjBib3R0bGVzfGVufDF8fHx8MTc3MjkxNzY4N3ww&ixlib=rb-4.1.0&q=80&w=800",
    color: "bg-[#3594C4]",
  },
  {
    id: "feed",
    title: "الإضافات العلفية",
    items: [
      "الخمائر والبروبيوتيك",
      "مضادات السموم الفطرية",
      "الإنزيمات الهاضمة",
      "الأملاح المعدنية النادرة",
      "مركزات البروتين",
    ],
    image:
      "https://images.unsplash.com/photo-1586335726249-23f5cee36e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmVlZCUyMGJhZ3N8ZW58MXx8fHwxNzcyOTE4NDkxfDA&ixlib=rb-4.1.0&q=80&w=800",
    color: "bg-[#6CA741]",
  },
];

export function Products() {
  return (
    <section id="products" data-testid="section-products" className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#F8FAFC] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#3594C4]/10 px-4 py-2 rounded-full mb-6">
              <PackageSearch className="w-5 h-5 text-[#3594C4]" />
              <span className="text-[#3594C4] font-bold text-sm tracking-wide">
                منتجاتنا الرائدة
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A4B75] mb-6 leading-tight">
              تشكيلة واسعة من <br />
              <span className="text-[#3594C4]">أفضل المنتجات العالمية</span>
            </h2>
          </div>
          <a
            href="#contact"
            data-testid="link-catalog"
            className="inline-flex items-center gap-2 bg-white border-2 border-[#1A4B75]/10 text-[#1A4B75] px-6 py-3 rounded-xl font-bold hover:bg-[#F8FAFC] hover:border-[#3594C4]/50 transition-all"
          >
            تحميل الكتالوج <ArrowLeft className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              data-testid={`card-product-${category.id}`}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A4B75] to-transparent opacity-60 z-10 mix-blend-multiply"></div>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-6 right-6 z-20">
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">
                    {category.title}
                  </h3>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 mb-8 flex-1">
                  {category.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-slate-600 font-medium"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${category.color}`}
                      ></div>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#F4F8FA] text-[#1A4B75] py-3 rounded-xl font-bold hover:bg-[#3594C4] hover:text-white transition-all group-hover:shadow-md mt-auto"
                >
                  <ShoppingBag className="w-5 h-5" />
                  طلب عرض سعر
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
