"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", propertyName: "", propertyType: "hotel" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || supabaseUrl === "undefined" || !supabaseKey || supabaseKey === "undefined") {
      setError("Lỗi cấu hình: Biến môi trường Supabase chưa được thiết lập trong Vercel. Vui lòng liên hệ quản trị viên.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      const signUpPromise = supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.name, property_name: form.propertyName, property_type: form.propertyType },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Kết nối Supabase hết thời gian (15s). Kiểm tra env vars trong Vercel.")), 15000)
      );

      const { error } = await Promise.race([signUpPromise, timeoutPromise]);

      if (error) {
        setError(`Lỗi: ${error.message} (${error.status ?? "unknown"})`);
      } else {
        setDone(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Không thể kết nối: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Kiểm tra email của bạn!</h2>
          <p className="text-gray-500 mb-6">
            Chúng tôi đã gửi link xác nhận đến <strong>{form.email}</strong>.
            Click vào link để kích hoạt tài khoản và bắt đầu sử dụng ARIA hoàn toàn miễn phí.
          </p>
          <Link href="/login">
            <Button variant="outline">Đến trang đăng nhập</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-xl">ARIA AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Đăng ký miễn phí</h1>
          <p className="text-gray-500 text-sm mt-1">Miễn phí mãi mãi, không cần thẻ tín dụng</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 border border-red-100">{error}</div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="name">Họ tên</Label>
              <Input id="name" placeholder="Nguyễn Văn A" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="ban@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" type="password" placeholder="Tối thiểu 8 ký tự" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength={8} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="propertyName">Tên cơ sở kinh doanh</Label>
              <Input id="propertyName" placeholder="Khách sạn ABC / Nhà hàng XYZ" value={form.propertyName} onChange={(e) => setForm({ ...form, propertyName: e.target.value })} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="propertyType">Loại hình</Label>
              <select
                id="propertyType"
                className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={form.propertyType}
                onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
              >
                <option value="hotel">Khách sạn</option>
                <option value="restaurant">Nhà hàng</option>
                <option value="spa">Spa / Massage</option>
                <option value="cafe">Quán cà phê</option>
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản miễn phí"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-violet-600 font-medium hover:underline">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
