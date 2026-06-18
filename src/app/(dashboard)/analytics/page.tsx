import { TrendingUp, MessageCircle, Calendar, Users, Clock, Star, Zap, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const weekData = [
  { day: "T2", messages: 42, bookings: 3 },
  { day: "T3", messages: 58, bookings: 5 },
  { day: "T4", messages: 35, bookings: 2 },
  { day: "T5", messages: 71, bookings: 7 },
  { day: "T6", messages: 94, bookings: 9 },
  { day: "T7", messages: 120, bookings: 12 },
  { day: "CN", messages: 108, bookings: 10 },
];
const maxMessages = Math.max(...weekData.map((d) => d.messages));

const channelStats = [
  { name: "Zalo OA", messages: 312, pct: 54, color: "bg-blue-500" },
  { name: "Facebook", messages: 178, pct: 31, color: "bg-indigo-500" },
  { name: "Website", messages: 87, pct: 15, color: "bg-violet-500" },
];

const intentStats = [
  { label: "Hỏi giá / dịch vụ", count: 198, pct: 34 },
  { label: "Đặt phòng / đặt bàn", count: 163, pct: 28 },
  { label: "Hỏi thông tin chung", count: 121, pct: 21 },
  { label: "Khiếu nại / hỗ trợ", count: 58, pct: 10 },
  { label: "Khác", count: 37, pct: 7 },
];

export default function AnalyticsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Phân tích</h1>
          <p className="text-gray-500 text-sm mt-1">7 ngày qua — cập nhật mỗi giờ</p>
        </div>
        <Badge variant="secondary">Tuần này: 18–24/6/2025</Badge>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Tổng tin nhắn", value: "577", sub: "+23% vs tuần trước", icon: MessageCircle, color: "text-violet-600 bg-violet-100" },
          { label: "Tự động hoá", value: "83%", sub: "481 / 577 tin nhắn", icon: Zap, color: "text-green-600 bg-green-100" },
          { label: "Thời gian phản hồi", value: "1.9s", sub: "Trung bình", icon: Clock, color: "text-blue-600 bg-blue-100" },
          { label: "Hài lòng khách", value: "4.7/5", sub: "Từ 38 phản hồi", icon: Star, color: "text-yellow-600 bg-yellow-100" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
                </div>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Bar chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tin nhắn theo ngày</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-40 mt-2">
                {weekData.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400">{d.messages}</span>
                    <div
                      className="w-full rounded-t-md bg-violet-500 transition-all"
                      style={{ height: `${(d.messages / maxMessages) * 100}%`, minHeight: 4 }}
                    />
                    <span className="text-xs text-gray-500 font-medium">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-violet-500" /> Tin nhắn</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Channel breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Theo kênh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelStats.map((ch) => (
              <div key={ch.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">{ch.name}</span>
                  <span className="text-gray-500">{ch.messages} ({ch.pct}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${ch.color} h-2 rounded-full`} style={{ width: `${ch.pct}%` }} />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <p className="text-xs font-medium text-gray-700">Mục đích hội thoại</p>
              {intentStats.map((i) => (
                <div key={i.label} className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">{i.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-100 rounded-full h-1.5">
                      <div className="bg-violet-400 h-1.5 rounded-full" style={{ width: `${i.pct}%` }} />
                    </div>
                    <span className="text-gray-700 font-medium w-6 text-right">{i.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking & Lead stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-violet-600" /> Đặt chỗ tuần này
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">48</div>
            <p className="text-sm text-gray-500 mb-4">+8 so với tuần trước</p>
            <div className="space-y-3">
              {[
                { label: "Đặt phòng", value: 31, color: "bg-violet-500" },
                { label: "Đặt bàn", value: 17, color: "bg-cyan-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.value / 48) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Xác nhận", value: "38", color: "text-green-600" },
                { label: "Chờ", value: "7", color: "text-yellow-600" },
                { label: "Huỷ", value: "3", color: "text-red-600" },
              ].map((s) => (
                <div key={s.label}>
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-violet-600" /> Hiệu quả Lead
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-1">23</div>
            <p className="text-sm text-gray-500 mb-4">Lead mới tuần này</p>
            <div className="space-y-3">
              {[
                { label: "Tỉ lệ chuyển đổi", value: "34%", icon: TrendingUp, color: "text-green-600" },
                { label: "Doanh thu từ lead", value: "18.4M₫", icon: Phone, color: "text-violet-600" },
                { label: "Lead chờ liên hệ", value: "8", icon: Users, color: "text-yellow-600" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                    {s.label}
                  </div>
                  <span className={`font-semibold text-sm ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-violet-50 rounded-xl p-3 text-sm text-violet-700">
              💡 <strong>Gợi ý:</strong> 8 lead chưa được liên hệ. Phản hồi trong 1 tiếng tăng 3× tỉ lệ chuyển đổi.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
