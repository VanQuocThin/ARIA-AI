import { Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const bookings = [
  { id: "1", customer: "Nguyễn Thị Mai", phone: "0912 345 678", type: "room", detail: "Phòng Deluxe", date: "21/06/2025", time: "14:00", guests: 2, status: "confirmed", channel: "Zalo" },
  { id: "2", customer: "Trần Văn Nam", phone: "0987 654 321", type: "table", detail: "Bàn 6 người", date: "20/06/2025", time: "19:00", guests: 6, status: "pending", channel: "Facebook" },
  { id: "3", customer: "Lê Văn Bình", phone: "0901 234 567", type: "room", detail: "Phòng Superior", date: "22/06/2025", time: "13:00", guests: 2, status: "confirmed", channel: "Zalo" },
  { id: "4", customer: "Phạm Thu Hương", phone: "0977 111 222", type: "table", detail: "Bàn 4 người", date: "19/06/2025", time: "12:30", guests: 4, status: "cancelled", channel: "Website" },
  { id: "5", customer: "Hoàng Minh Tú", phone: "0933 444 555", type: "room", detail: "Phòng Suite", date: "23/06/2025", time: "14:00", guests: 2, status: "pending", channel: "Zalo" },
  { id: "6", customer: "Đặng Thị Kim", phone: "0966 777 888", type: "table", detail: "Phòng VIP tiệc 20 người", date: "25/06/2025", time: "18:00", guests: 20, status: "confirmed", channel: "Facebook" },
];

const statusConfig = {
  confirmed: { label: "Đã xác nhận", color: "bg-green-100 text-green-700", icon: CheckCircle },
  pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700", icon: AlertCircle },
  cancelled: { label: "Đã huỷ", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function BookingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đặt chỗ</h1>
          <p className="text-gray-500 text-sm mt-1">ARIA tự động thu thập và quản lý đặt chỗ từ tất cả kênh</p>
        </div>
        <Button>+ Thêm thủ công</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Tổng đặt chỗ", value: "6", icon: Calendar },
          { label: "Đã xác nhận", value: "3", icon: CheckCircle, color: "text-green-600" },
          { label: "Chờ xác nhận", value: "2", icon: AlertCircle, color: "text-yellow-600" },
          { label: "Đã huỷ", value: "1", icon: XCircle, color: "text-red-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5 flex items-center gap-3">
              <s.icon className={`w-8 h-8 ${s.color ?? "text-violet-600"}`} />
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking list */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đặt chỗ</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-50">
            {bookings.map((b) => {
              const st = statusConfig[b.status as keyof typeof statusConfig];
              return (
                <div key={b.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center font-semibold text-violet-600 text-sm flex-shrink-0">
                    {b.customer.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{b.customer}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{b.channel}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {b.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {b.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {b.guests} người
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> {b.phone}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{b.detail}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${st.color}`}>
                      <st.icon className="w-3.5 h-3.5" />
                      {st.label}
                    </span>
                    {b.status === "pending" && (
                      <Button size="sm" className="h-7 text-xs">Xác nhận</Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
