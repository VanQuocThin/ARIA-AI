import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARIA AI — Lễ Tân Thông Minh 24/7",
  description:
    "Lễ tân AI đa kênh cho khách sạn & nhà hàng Việt Nam. Tích hợp Zalo, Facebook, Website. Không bao giờ bỏ lỡ một khách hàng.",
  keywords: "lễ tân AI, AI receptionist, chatbot khách sạn, chatbot nhà hàng, Zalo OA, Vietnam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
