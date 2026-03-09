"use client";

import { MapPin, Phone, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({
        title: "تم إرسال رسالتك بنجاح",
        description: "سنتواصل معك في أقرب وقت ممكن",
      });
    }, 1000);
  };

  return (
    <section id="contact" data-testid="section-contact" className="py-24 bg-white relative">
      <div className="absolute start-0 top-0 w-1/3 h-full bg-[#F4F8FA] z-0 hidden lg:block rounded-e-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-[#3594C4]/10 px-4 py-2 rounded-full mb-6">
                <span className="text-[#3594C4] font-bold text-sm tracking-wide">
                  تواصل معنا
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1A4B75] mb-4 leading-tight">
                نحن هنا لخدمتك <br />
                والإجابة على استفساراتك
              </h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                سواء كنت تبحث عن استشارة بيطرية، أو ترغب في تجهيز مزرعتك بأحدث
                التقنيات، فريقنا جاهز لمساعدتك.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F4F8FA] rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100 shadow-sm">
                  <MapPin className="w-6 h-6 text-[#3594C4]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A4B75] text-lg mb-1">
                    المكتب الرئيسي
                  </h4>
                  <p className="text-slate-600 font-medium">
                    المملكة العربية السعودية، الرياض، شارع التخصصي
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F4F8FA] rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100 shadow-sm">
                  <Phone className="w-6 h-6 text-[#6CA741]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A4B75] text-lg mb-1">
                    أرقام التواصل
                  </h4>
                  <p className="text-slate-600 font-medium" dir="ltr">
                    +966 50 123 4567
                  </p>
                  <p className="text-slate-600 font-medium" dir="ltr">
                    +966 11 234 5678
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F4F8FA] rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100 shadow-sm">
                  <Mail className="w-6 h-6 text-[#C53026]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A4B75] text-lg mb-1">
                    البريد الإلكتروني
                  </h4>
                  <p className="text-slate-600 font-medium">
                    info@ghaidaalbadia.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 start-0 w-full h-2 bg-gradient-to-l from-[#1A4B75] via-[#3594C4] to-[#6CA741]"></div>

              <h3 className="text-2xl font-bold text-[#1A4B75] mb-8">
                أرسل لنا رسالة
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-bold text-slate-700 mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      data-testid="input-name"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3594C4] focus:border-transparent transition-all"
                      placeholder="أدخل اسمك الكريم"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-bold text-slate-700 mb-2">
                      رقم الجوال
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      data-testid="input-phone"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3594C4] focus:border-transparent transition-all"
                      placeholder="05x xxx xxxx"
                      dir="ltr"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-inquiry" className="block text-sm font-bold text-slate-700 mb-2">
                    نوع الاستفسار
                  </label>
                  <select
                    id="contact-inquiry"
                    data-testid="select-inquiry"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3594C4] focus:border-transparent transition-all text-slate-700 appearance-none"
                  >
                    <option>استيراد حظائر ومعدات</option>
                    <option>أدوية ولقاحات بيطرية</option>
                    <option>استشارة فنية</option>
                    <option>أخرى</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-bold text-slate-700 mb-2">
                    رسالتك
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    data-testid="input-message"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3594C4] focus:border-transparent transition-all resize-none"
                    placeholder="كيف يمكننا مساعدتك؟"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  data-testid="button-submit-contact"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1A4B75] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#123654] transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
                >
                  {sending ? "جاري الإرسال..." : "إرسال الطلب"}
                  <Send className="w-5 h-5 rotate-180 rtl:rotate-0" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
