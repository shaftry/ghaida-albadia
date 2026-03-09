"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { News } from "@shared/schema";
import { Newspaper, Calendar, Loader2, ArrowLeft } from "lucide-react";

export function NewsSection() {
  const { data: newsList, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  if (isLoading) {
    return (
      <section id="news" className="py-24 bg-white">
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#3594C4]" />
        </div>
      </section>
    );
  }

  if (!newsList || newsList.length === 0) return null;

  return (
    <section id="news" data-testid="section-news" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 bg-[#F4F8FA] px-4 py-2 rounded-full mb-6 border border-slate-200 shadow-sm">
            <Newspaper className="w-4 h-4 text-[#1A4B75]" />
            <span className="text-[#1A4B75] font-bold text-sm tracking-wide">
              آخر الأخبار
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A4B75] mb-6 leading-tight">
            تابع <span className="text-[#3594C4]">أحدث أخبارنا</span> وفعالياتنا
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            ابقَ على اطلاع بآخر المستجدات والأنشطة والشراكات الجديدة في غيداء البادية.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.slice(0, 6).map((item, index) => (
            <motion.article
              key={item.id}
              data-testid={`card-news-${item.id}`}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.imageUrl && (
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A4B75]/30 to-transparent z-10"></div>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <time>{new Date(item.createdAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</time>
                </div>
                <h3 className="text-xl font-bold text-[#1A4B75] mb-3 leading-tight group-hover:text-[#3594C4] transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed line-clamp-3 flex-1">
                  {item.content}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 text-[#3594C4] font-bold text-sm hover:gap-2 transition-all cursor-pointer">
                    اقرأ المزيد
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
