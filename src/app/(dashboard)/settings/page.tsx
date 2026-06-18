"use client";

import { useState } from "react";
import { Zap, Save, Building2, Bot, Clock, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [autoReply, setAutoReply] = useState(true);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-500 text-sm mt-1">Tuỳ chỉnh ARIA theo cơ sở của bạn</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          {saved ? "✓ Đã lưu!" : <><Save className="w-4 h-4" /> Lưu thay đổi</>}
        </Button>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Property info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-violet-600" />
              <CardTitle className="text-base">Thông tin cơ sở</CardTitle>
            </div>
            <CardDescription>ARIA sẽ dùng thông tin này để trả lời khách hàng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Tên cơ sở</Label>
                <Input defaultValue="Khách Sạn Lotus" />
              </div>
              <div className="space-y-1.5">
                <Label>Loại hình</Label>
                <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option>Khách sạn</option>
                  <option>Nhà hàng</option>
                  <option>Spa</option>
                  <option>Quán cà phê</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Địa chỉ</Label>
              <Input defaultValue="123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Số điện thoại</Label>
                <Input defaultValue="0912 345 678" />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input defaultValue="info@khotsanlotus.vn" type="email" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Mô tả ngắn về cơ sở</Label>
              <Textarea
                defaultValue="Khách Sạn Lotus 4 sao nằm tại trung tâm TP.HCM, cách Bến Thành 500m. Chúng tôi có 120 phòng từ Standard đến Suite, nhà hàng Á-Âu, hồ bơi và spa đẳng cấp."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Persona */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-violet-600" />
              <CardTitle className="text-base">Nhân vật AI</CardTitle>
            </div>
            <CardDescription>Tuỳ chỉnh tên và phong cách của ARIA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Tên AI lễ tân</Label>
              <Input defaultValue="ARIA" placeholder="vd: ARIA, Lily, Nam..." />
              <p className="text-xs text-gray-400">Khách hàng sẽ thấy tên này khi chat</p>
            </div>
            <div className="space-y-1.5">
              <Label>Lời chào mặc định</Label>
              <Textarea
                defaultValue="Xin chào! Tôi là ARIA, lễ tân của Khách Sạn Lotus 🌸 Tôi có thể giúp gì cho bạn?"
                rows={2}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Phong cách trả lời</Label>
              <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option>Chuyên nghiệp, lịch sự</option>
                <option>Thân thiện, ấm cúng</option>
                <option>Sang trọng, trang trọng</option>
                <option>Vui vẻ, năng động</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Working hours */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-violet-600" />
              <CardTitle className="text-base">Giờ làm việc</CardTitle>
            </div>
            <CardDescription>ARIA sẽ tự động thông báo ngoài giờ và ưu tiên xử lý trong giờ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Giờ mở cửa</Label>
                <Input type="time" defaultValue="07:00" />
              </div>
              <div className="space-y-1.5">
                <Label>Giờ đóng cửa</Label>
                <Input type="time" defaultValue="22:00" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Tin nhắn ngoài giờ</Label>
              <Textarea
                defaultValue="Chúng tôi hiện ngoài giờ làm việc (7:00 - 22:00). ARIA sẽ ghi lại yêu cầu của bạn và nhân viên sẽ liên hệ lại sớm nhất vào sáng hôm sau. Cảm ơn bạn! 🌙"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Auto reply toggle */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-600" />
              <CardTitle className="text-base">Tự động hoá</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Tự động trả lời tin nhắn", desc: "ARIA trả lời tất cả tin nhắn mới không cần nhân viên", active: autoReply, onChange: setAutoReply },
              { label: "Tự động xác nhận đặt chỗ", desc: "Gửi tin xác nhận khi khách cung cấp đủ thông tin", active: true, onChange: () => {} },
              { label: "Cảnh báo tin nhắn cần xử lý", desc: "Thông báo khi có khiếu nại hoặc vấn đề phức tạp", active: true, onChange: () => {} },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => item.onChange(!item.active)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.active ? "bg-violet-600" : "bg-gray-200"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${item.active ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
