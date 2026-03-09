import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "غيداء البادية - لاستيراد حظائر الدواجن والأدوية البيطرية",
  description: "غيداء البادية - شريكك الموثوق في التكنولوجيا الزراعية والأدوية البيطرية. حلول متكاملة لاستيراد حظائر الدواجن الحديثة والأدوية البيطرية المعتمدة.",
  openGraph: {
    title: "غيداء البادية - لاستيراد حظائر الدواجن والأدوية البيطرية",
    description: "شريكك الموثوق في التكنولوجيا الزراعية والأدوية البيطرية",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
