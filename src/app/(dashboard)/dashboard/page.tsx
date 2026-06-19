import {
  MessageCircle, Calendar, Users, TrendingUp,
  Clock, CheckCircle, AlertCircle, Zap, ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProperty } from "@/lib/supabase/queries";
import Link from "next/link";

const stats = [
  { label: "Hội thoại hôm nay", value: "47", change: "+12%", icon: MessageCircle, color: "text-violet-600 bg-violet-100" },
  { label: "Đặt chỗ mới", value: "8", change: "+3 hôm nay", icon: Calendar, color: "text-green-600 bg-green-100" },
  { label: "Khách hàng tiềm năng", value: "15", change: "+5 tuần này", icon: Users, color: "text-blue-600 bg-blue-100" },
  { label: "Tỉ lệ tự động hóa", value: "83%", change: "↑ 5% so tuần trước", icon: TrendingUp, color: "text-orange-600 bg-orange-100" },
];

const recentConversations = [
  { name: "Nguyễn Thị Mai", channel: "Zalo", message: "cho mình hỏi còn phòng cuối tuần k?", time: "2 phút trước", status: "open" },
  { name: "Trần Văn Nam", channel: "Facebook", message: "Đặt bàn 6 người tối thứ 6 được không ạ", time: "15 phút trước", status: "resolved" },
  { name: "Lê Thị Hoa", channel: "Website", message: "Giá phòng suite bao nhiêu ạ?", time: "32 phút trước", status: "open" },
  { name: "Phạm Minh Khoa", channel: "Zalo", message: "Check out muộn được không shop ơi", time: "1 tiếng trước", status: "resolved" },
  { name: "Hoàng Thị Lan", channel: "Facebook", message: "Nhà hàng có chỗ đậu xe không ạ", time: "2 tiếng trước", status: "escalated" },
];

const channelBadgeColor: Record<string, string> = {
  Zalo: "bg-blue-100 text-blue-700",
  Facebook: "bg-indigo-100 text-indigo-700",
  Website: "bg-violet-100 text-violet-700",
};

const statusIcon = {
  open: <Clock className="w-4 h-4 text-yellow-500" />,
  resolved: <CheckCircle className="w-4 h-4 text-green-500" />,
  escalated: <AlertCircle className="w-4 h-4 text-red-500" />,
};

function FreePlanBanner({ used, quota }: { used: number; quota: number }) {
  const pct = Math.min(100, Math.round((used / quota) * 100));
  const isWarning = pct >= 80;
  const isExceeded = used >= quota;

  return (
    <div className={`mb-6 rounded-xl border p-4 flex items-center justify-between gap-4 ${
      isExceeded
        ? "bg-red-50 border-red-200"
        : isWarning
        ? "bg-amber-50 border-amber-200"
        : "bg-violet-50 border-violet-200"
    }`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-semibold ${
            isExceeded ? "text-red-700" : isWarning ? "text-amber-700" : "text-violet-700"
          }`}>
            {isExceeded
              ? "⚠️ Đã dùng hết tin nhắn tháng này"
              : isWarning
              ? "⚡ Sắp hết quota tháng này"
              : "✨ Gói Free"}
          </span>
          <span className="text-xs text-gray-500">
            {used} / {quota} tin nhắn đã dùng
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              isExceeded ? "bg-red-500" : isWarning ? "bg-amber-500" : "bg-violet-500"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <Link
        href="/pricing"
        className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex-shrink-0"
      >
        Nâng cấp <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export default async function DashboardPage() {
  const property = await getProperty();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
          <p className="text-gray-500 text-sm mt-1">Thứ Tư, 18 tháng 6 năm 2025</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-4 py-2 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          ARIA đang hoạt động
        </div>
      </div>

      {/* Free plan banner */}
      {property?.plan === "free" && (
        <FreePlanBanner
          used={property.messages_used ?? 0}
          quota={property.messages_quota ?? 200}
        />
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.change}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent conversations */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Hội thoại gần đây</span>
                <a href="/conversations" className="text-violet-600 text-sm font-normal hover:underline">Xem tất cả</a>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-50">
                {recentConversations.map((conv) => (
                  <div key={conv.name} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center font-semibold text-violet-600 text-sm flex-shrink-0">
                        {conv.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-medium text-gray-900 text-sm">{conv.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${channelBadgeColor[conv.channel]}`}>{conv.channel}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conv.message}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {statusIcon[conv.status as keyof typeof statusIcon]}
                        <span className="text-xs text-gray-400">{conv.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick stats */}
        <div className="space-y-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>ARIA hôm nay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Tin nhắn nhận", value: "124" },
                { label: "Tự động trả lời", value: "103", highlight: true },
                { label: "Chuyển nhân viên", value: "21" },
                { label: "Thời gian phản hồi TB", value: "1.8s" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className={`font-semibold text-sm ${item.highlight ? "text-violet-600" : "text-gray-900"}`}>{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Đặt chỗ hôm nay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Nguyễn Thị Mai", detail: "Phòng Deluxe · 21-22/6", status: "confirmed" },
                { name: "Trần Nam Anh", detail: "Bàn 4 người · 19h tối nay", status: "pending" },
                { name: "Lê Văn Bình", detail: "Phòng Superior · 22-25/6", status: "confirmed" },
              ].map((b) => (
                <div key={b.name} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${b.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{b.name}</p>
                    <p className="text-xs text-gray-400">{b.detail}</p>
                  </div>
                </div>
              ))}
              <a href="/bookings" className="text-violet-600 text-xs hover:underline block mt-2">Xem tất cả đặt chỗ →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
