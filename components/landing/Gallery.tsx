"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { GalleryImage } from "@shared/schema";
import { Loader2 } from "lucide-react";

const fallbackImages = [
  "https://images.unsplash.com/photo-1723357018190-c0163698165b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "https://images.unsplash.com/photo-1697545698404-46828377ae9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "https://images.unsplash.com/photo-1606235357537-84aea24d4c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "https://images.unsplash.com/photo-1707515416694-502935a4cff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "https://images.unsplash.com/photo-1580982185288-5b50f66a4726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "https://images.unsplash.com/photo-1627747776915-efa03ecce91c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
];

export function Gallery() {
  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const displayImages = images && images.length > 0
    ? images.map((img) => ({ src: img.imageUrl, caption: img.caption }))
    : fallbackImages.map((src, i) => ({ src, caption: `صورة ${i + 1}` }));

  return (
    <section id="gallery" data-testid="section-gallery" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-full mb-6 border border-slate-200 shadow-sm">
            <span className="text-[#6CA741] font-bold text-sm tracking-wide">
              معرض الصور
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A4B75] mb-6 leading-tight">
            نظرة على <span className="text-[#3594C4]">مشاريعنا</span> ومنتجاتنا
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            استعرض جانباً من أعمالنا، وتجهيزاتنا للحظائر الحديثة، ومجموعة الأدوية
            البيطرية التي نوفرها.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#3594C4]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {displayImages.map((img, idx) => (
              <motion.div
                key={idx}
                data-testid={`img-gallery-${idx}`}
                className="relative aspect-square rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div className="absolute inset-0 bg-[#1A4B75]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end">
                  {img.caption && (
                    <p className="text-white text-sm font-medium p-4 w-full">{img.caption}</p>
                  )}
                </div>
                <img
                  src={img.src}
                  alt={img.caption || `صورة من معرض الأعمال ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
