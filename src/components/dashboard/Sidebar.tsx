"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap, LayoutDashboard, MessageCircle, Calendar, Users,
  Settings, LogOut, Plug, BarChart3, ArrowUpRight
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

const planLabel: Record<string, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  enterprise: "Enterprise",
};

const planColor: Record<string, string> = {
  free: "bg-gray-700 text-gray-300",
  starter: "bg-blue-900 text-blue-300",
  pro: "bg-violet-900 text-violet-300",
  enterprise: "bg-amber-900 text-amber-300",
};

interface SidebarProps {
  plan?: string;
  messagesUsed?: number;
  messagesQuota?: number;
}

export function Sidebar({ plan = "free", messagesUsed = 0, messagesQuota = 200 }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const pct = Math.min(100, Math.round((messagesUsed / messagesQuota) * 100));
  const isWarning = pct >= 80;

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
        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${planColor[plan] ?? planColor.free}`}>
          {planLabel[plan] ?? plan}
        </span>
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

      {/* Free plan quota */}
      {plan === "free" && (
        <div className="px-4 pb-3">
          <div className="bg-gray-800 rounded-xl p-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-gray-400">Tin nhắn tháng này</span>
              <span className={`text-xs font-semibold ${isWarning ? "text-amber-400" : "text-gray-300"}`}>
                {messagesUsed}/{messagesQuota}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
              <div
                className={`h-1.5 rounded-full transition-all ${isWarning ? "bg-amber-500" : "bg-violet-500"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-1.5 w-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
            >
              Nâng cấp <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

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
