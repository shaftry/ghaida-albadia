"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { News, GalleryImage } from "@shared/schema";
import {
  Newspaper, Image as ImageIcon, LogOut, Plus, Trash2, Edit, X, Upload, Loader2, Home
} from "lucide-react";

export default function AdminPage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"news" | "gallery">("news");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F8FA] flex items-center justify-center font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-[#3594C4]" />
      </div>
    );
  }

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => router.push("/login"),
      onError: () => router.push("/login"),
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F8FA] font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-4">
              <img src="/images/logo.png" alt="غيداء البادية" className="h-10" />
              <h1 className="text-lg font-bold text-[#1A4B75] hidden sm:block">لوحة الإدارة</h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-slate-500 font-medium">مرحباً، {(user as any)?.username}</span>
              <a href="/" className="inline-flex items-center gap-1 text-sm text-[#3594C4] font-bold hover:underline" data-testid="link-admin-home">
                <Home className="w-4 h-4" />
                الرئيسية
              </a>
              <button
                type="button"
                onClick={handleLogout}
                data-testid="button-admin-logout"
                className="inline-flex items-center gap-1 text-sm text-red-600 font-bold hover:underline"
              >
                <LogOut className="w-4 h-4" />
                خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("news")}
            data-testid="tab-news"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "news"
                ? "bg-[#1A4B75] text-white shadow-lg"
                : "bg-white text-[#1A4B75] border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Newspaper className="w-5 h-5" />
            الأخبار
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            data-testid="tab-gallery"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "gallery"
                ? "bg-[#1A4B75] text-white shadow-lg"
                : "bg-white text-[#1A4B75] border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            معرض الصور
          </button>
        </div>

        {activeTab === "news" ? <NewsManager /> : <GalleryManager />}
      </div>
    </div>
  );
}

function NewsManager() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: newsList = [], isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: { title: string; content: string; imageUrl?: string }) => {
      const res = await apiRequest("POST", "/api/news", data);
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/news"] });
      toast({ title: "تم إضافة الخبر بنجاح" });
      resetForm();
    },
    onError: () => { toast({ title: "فشل في إضافة الخبر", variant: "destructive" }); },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<{ title: string; content: string; imageUrl: string }> }) => {
      const res = await apiRequest("PATCH", `/api/news/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/news"] });
      toast({ title: "تم تحديث الخبر بنجاح" });
      resetForm();
    },
    onError: () => { toast({ title: "فشل في تحديث الخبر", variant: "destructive" }); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/news/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/news"] });
      toast({ title: "تم حذف الخبر بنجاح" });
    },
    onError: () => { toast({ title: "فشل في حذف الخبر", variant: "destructive" }); },
  });

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageUrl("");
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (item: News) => {
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.imageUrl || "");
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData, credentials: "include" });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setImageUrl(url);
    } catch {
      toast({ title: "فشل رفع الصورة", variant: "destructive" });
    }
    setUploading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, content, imageUrl: imageUrl || undefined };
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h2 className="text-2xl font-black text-[#1A4B75]">إدارة الأخبار</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            data-testid="button-add-news"
            className="inline-flex items-center gap-2 bg-[#6CA741] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#598d35] transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            إضافة خبر
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1A4B75]">
              {editingId ? "تعديل الخبر" : "إضافة خبر جديد"}
            </h3>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="news-title" className="block text-sm font-bold text-slate-700 mb-1">عنوان الخبر</label>
              <input
                id="news-title"
                type="text"
                data-testid="input-news-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3594C4] transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="news-content" className="block text-sm font-bold text-slate-700 mb-1">محتوى الخبر</label>
              <textarea
                id="news-content"
                data-testid="input-news-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3594C4] transition-all resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">صورة الخبر</label>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-100 transition-all"
                  disabled={uploading}
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? "جاري الرفع..." : "رفع صورة"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                />
                {imageUrl && (
                  <div className="flex items-center gap-2">
                    <img src={imageUrl} alt="preview" className="w-12 h-12 rounded-lg object-cover border" />
                    <button type="button" onClick={() => setImageUrl("")} className="text-red-500 text-sm font-bold">إزالة</button>
                  </div>
                )}
              </div>
              <input
                type="text"
                data-testid="input-news-imageurl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#3594C4] transition-all text-sm"
                placeholder="أو أدخل رابط الصورة مباشرة"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                data-testid="button-save-news"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="inline-flex items-center gap-2 bg-[#1A4B75] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#123654] transition-all shadow-md disabled:opacity-70"
              >
                {(createMutation.isPending || updateMutation.isPending) ? "جاري الحفظ..." : editingId ? "تحديث" : "حفظ"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#3594C4]" />
        </div>
      ) : newsList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">لا توجد أخبار حالياً</p>
        </div>
      ) : (
        <div className="space-y-4">
          {newsList.map((item) => (
            <div key={item.id} data-testid={`card-admin-news-${item.id}`} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex gap-4 items-start">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[#1A4B75] mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{item.content}</p>
                <p className="text-xs text-slate-400 mt-2">{new Date(item.createdAt).toLocaleDateString("ar-SA")}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(item)}
                  data-testid={`button-edit-news-${item.id}`}
                  className="p-2 text-[#3594C4] hover:bg-[#3594C4]/10 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { if (confirm("هل أنت متأكد من حذف هذا الخبر؟")) deleteMutation.mutate(item.id); }}
                  data-testid={`button-delete-news-${item.id}`}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryManager() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: { imageUrl: string; caption?: string }) => {
      const res = await apiRequest("POST", "/api/gallery", data);
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "تم إضافة الصورة بنجاح" });
      setImageUrl("");
      setCaption("");
      setShowForm(false);
    },
    onError: () => { toast({ title: "فشل في إضافة الصورة", variant: "destructive" }); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/gallery/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "تم حذف الصورة بنجاح" });
    },
    onError: () => { toast({ title: "فشل في حذف الصورة", variant: "destructive" }); },
  });

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData, credentials: "include" });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setImageUrl(url);
    } catch {
      toast({ title: "فشل رفع الصورة", variant: "destructive" });
    }
    setUploading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    createMutation.mutate({ imageUrl, caption: caption || undefined });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h2 className="text-2xl font-black text-[#1A4B75]">إدارة معرض الصور</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            data-testid="button-add-gallery"
            className="inline-flex items-center gap-2 bg-[#6CA741] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#598d35] transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            إضافة صورة
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1A4B75]">إضافة صورة جديدة</h3>
            <button onClick={() => { setShowForm(false); setImageUrl(""); setCaption(""); }} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">الصورة</label>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-100 transition-all"
                  disabled={uploading}
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? "جاري الرفع..." : "رفع صورة"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                />
                {imageUrl && <img src={imageUrl} alt="preview" className="w-16 h-16 rounded-lg object-cover border" />}
              </div>
              <input
                type="text"
                data-testid="input-gallery-imageurl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#3594C4] transition-all text-sm"
                placeholder="أو أدخل رابط الصورة مباشرة"
                required
              />
            </div>
            <div>
              <label htmlFor="gallery-caption" className="block text-sm font-bold text-slate-700 mb-1">وصف الصورة (اختياري)</label>
              <input
                id="gallery-caption"
                type="text"
                data-testid="input-gallery-caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3594C4] transition-all"
                placeholder="وصف مختصر للصورة"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                data-testid="button-save-gallery"
                disabled={createMutation.isPending || !imageUrl}
                className="inline-flex items-center gap-2 bg-[#1A4B75] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#123654] transition-all shadow-md disabled:opacity-70"
              >
                {createMutation.isPending ? "جاري الحفظ..." : "حفظ"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setImageUrl(""); setCaption(""); }} className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#3594C4]" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">لا توجد صور حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} data-testid={`card-admin-gallery-${img.id}`} className="relative group rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <img src={img.imageUrl} alt={img.caption || "gallery"} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => { if (confirm("هل أنت متأكد من حذف هذه الصورة؟")) deleteMutation.mutate(img.id); }}
                  data-testid={`button-delete-gallery-${img.id}`}
                  className="bg-red-500 text-white p-2.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              {img.caption && (
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-sm font-medium truncate">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
