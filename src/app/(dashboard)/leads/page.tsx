import { Users, Phone, MessageCircle, TrendingUp, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const leads = [
  { id: "1", name: "Nguyễn Văn Long", phone: "0912 111 222", channel: "Zalo", interest: "Đặt phòng cuối tuần, hỏi về giá Suite", status: "new", time: "1 tiếng trước" },
  { id: "2", name: "Trần Thị Bích", phone: "0987 333 444", channel: "Facebook", interest: "Tiệc sinh nhật 30 người, cần phòng riêng", status: "contacted", time: "3 tiếng trước" },
  { id: "3", name: "Lê Minh Đức", phone: "0901 555 666", channel: "Website", interest: "Tour team building 50 người, 2 đêm", status: "converted", time: "Hôm qua" },
  { id: "4", name: "Phạm Quỳnh Như", phone: "0977 777 888", channel: "Zalo", interest: "Hỏi về phòng tháng, giá dài hạn", status: "new", time: "2 ngày trước" },
  { id: "5", name: "Hoàng Anh Tuấn", phone: "0933 999 000", channel: "Facebook", interest: "Đám cưới 200 khách, hội trường + phòng đêm cưới", status: "contacted", time: "3 ngày trước" },
];

const statusConfig = {
  new: { label: "Mới", color: "bg-blue-100 text-blue-700" },
  contacted: { label: "Đã liên hệ", color: "bg-yellow-100 text-yellow-700" },
  converted: { label: "Đã chuyển đổi", color: "bg-green-100 text-green-700" },
  lost: { label: "Mất khách", color: "bg-red-100 text-red-700" },
};

export default function LeadsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Khách hàng tiềm năng</h1>
          <p className="text-gray-500 text-sm mt-1">ARIA tự động thu thập lead từ các cuộc hội thoại</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Tổng lead", value: "5", icon: Users },
          { label: "Lead mới", value: "2", icon: Star },
          { label: "Đã liên hệ", value: "2", icon: Phone },
          { label: "Đã chuyển đổi", value: "1", icon: TrendingUp },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5 flex items-center gap-3">
              <s.icon className="w-8 h-8 text-violet-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách lead</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-50">
            {leads.map((lead) => {
              const st = statusConfig[lead.status as keyof typeof statusConfig];
              return (
                <div key={lead.id} className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center font-semibold text-violet-600 text-sm flex-shrink-0">
                    {lead.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{lead.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{lead.channel}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <Phone className="w-3.5 h-3.5" /> {lead.phone}
                    </div>
                    <p className="text-sm text-gray-600 flex items-start gap-1">
                      <MessageCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> {lead.interest}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{lead.time}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${st.color}`}>{st.label}</span>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Liên hệ</Button>
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
