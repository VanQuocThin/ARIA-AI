import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mx-auto mb-6">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Trang không tồn tại</h2>
        <p className="text-gray-500 mb-8">Trang bạn tìm không còn ở đây. Có thể đã bị xoá hoặc link bị sai.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/"><Button variant="outline">Về trang chủ</Button></Link>
          <Link href="/dashboard"><Button>Vào Dashboard</Button></Link>
        </div>
      </div>
    </main>
  );
}
