import { storage } from "./storage";
import { hashPassword } from "../lib/auth-helpers";

export async function seedData() {
  const existingAdmin = await storage.getUserByUsername("admin");
  if (!existingAdmin) {
    const hashedPassword = await hashPassword("admin123");
    await storage.createUser({
      username: "admin",
      password: hashedPassword,
      isAdmin: true,
    });
    console.log("Admin user created: admin / admin123");
  }

  const existingNews = await storage.getNews();
  if (existingNews.length === 0) {
    await storage.createNews({
      title: "افتتاح فرع جديد في جدة",
      content: "يسعدنا الإعلان عن افتتاح فرعنا الجديد في مدينة جدة لتقديم خدماتنا لعملائنا في المنطقة الغربية. يقدم الفرع جميع خدماتنا من استيراد حظائر الدواجن والأدوية البيطرية والاستشارات الفنية.",
      imageUrl: "https://images.unsplash.com/photo-1723357018190-c0163698165b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    });
    await storage.createNews({
      title: "شراكة استراتيجية مع شركة عالمية للأدوية البيطرية",
      content: "وقعت غيداء البادية اتفاقية شراكة استراتيجية مع إحدى أكبر الشركات العالمية المتخصصة في الأدوية البيطرية، مما يتيح لنا تقديم أحدث المنتجات والحلول العلاجية لعملائنا.",
      imageUrl: "https://images.unsplash.com/photo-1606235357537-84aea24d4c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    });
    await storage.createNews({
      title: "ورشة عمل مجانية حول التغذية الحديثة للدواجن",
      content: "ندعوكم لحضور ورشة العمل المجانية التي ستقام في مقرنا الرئيسي بالرياض حول أحدث تقنيات التغذية الحديثة للدواجن وأثرها على الإنتاجية والصحة العامة للقطيع.",
      imageUrl: "https://images.unsplash.com/photo-1580982185288-5b50f66a4726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    });
    console.log("Seed news created");
  }

  const existingGallery = await storage.getGalleryImages();
  if (existingGallery.length === 0) {
    const galleryItems = [
      { imageUrl: "https://images.unsplash.com/photo-1723357018190-c0163698165b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "حظائر دواجن حديثة" },
      { imageUrl: "https://images.unsplash.com/photo-1697545698404-46828377ae9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "تجهيزات داخلية متطورة" },
      { imageUrl: "https://images.unsplash.com/photo-1606235357537-84aea24d4c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "أدوية بيطرية معتمدة" },
      { imageUrl: "https://images.unsplash.com/photo-1707515416694-502935a4cff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "تكنولوجيا زراعية حديثة" },
      { imageUrl: "https://images.unsplash.com/photo-1580982185288-5b50f66a4726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "مختبرات بيطرية" },
      { imageUrl: "https://images.unsplash.com/photo-1627747776915-efa03ecce91c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "مزارع دواجن صحية" },
    ];
    for (const item of galleryItems) {
      await storage.createGalleryImage(item);
    }
    console.log("Seed gallery images created");
  }
}
