"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap, LayoutDashboard, MessageCircle, Calendar, Users,
  Settings, LogOut, Plug, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const nav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Tổng quan" },
  { href: "/conversations", icon: MessageCircle, label: "Hội thoại" },
  { href: "/bookings", icon: Calendar, label: "Đặt chỗ" },
  { href: "/leads", icon: Users, label: "Tiềm năng" },
  { href: "/analytics", icon: BarChart3, label: "Báo cáo" },
  { href: "/channels", icon: Plug, label: "Kênh" },
  { href: "/settings", icon: Settings, label: "Cài đặt" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="w-60 bg-gray-900 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-5 flex items-center gap-2 border-b border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-white">ARIA AI</span>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
