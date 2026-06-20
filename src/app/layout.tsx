import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARIA AI — Lễ Tân Thông Minh 24/7",
  description:
    "Lễ tân AI đa kênh cho khách sạn & nhà hàng Việt Nam. Tích hợp Zalo, Facebook, Website. Không bao giờ bỏ lỡ một khách hàng.",
  keywords: "lễ tân AI, AI receptionist, chatbot khách sạn, chatbot nhà hàng, Zalo OA, Vietnam",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ARIA AI",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ARIA AI" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
