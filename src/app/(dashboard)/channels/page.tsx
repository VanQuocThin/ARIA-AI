import { CheckCircle, XCircle, ExternalLink, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const channels = [
  {
    id: "zalo",
    name: "Zalo OA",
    icon: "💬",
    color: "bg-blue-500",
    desc: "Kết nối với Official Account Zalo của bạn. Phục vụ 70M+ người dùng Việt Nam.",
    connected: true,
    info: "OA: Khách Sạn Lotus Official",
    steps: [
      "Đăng nhập tại developers.zalo.me",
      "Tạo ứng dụng mới → chọn OA",
      "Copy App ID và App Secret bên dưới",
      "Cấu hình Webhook URL vào app Zalo",
    ],
  },
  {
    id: "facebook",
    name: "Facebook Messenger",
    icon: "📘",
    color: "bg-indigo-500",
    desc: "Tích hợp với Fanpage Facebook để trả lời khách hàng inbox tự động.",
    connected: false,
    info: null,
    steps: [
      "Vào developers.facebook.com",
      "Tạo app → chọn Messenger",
      "Subscribe page của bạn",
      "Điền Page Access Token bên dưới",
    ],
  },
  {
    id: "widget",
    name: "Website Chat Widget",
    icon: "🌐",
    color: "bg-violet-500",
    desc: "Nhúng widget chat vào website hiện có của bạn. Copy 1 dòng script là xong.",
    connected: true,
    info: "Đã nhúng vào: khotsanlotus.vn",
    steps: [],
  },
  {
    id: "phone",
    name: "Voice AI (Gọi điện)",
    icon: "📞",
    color: "bg-green-500",
    desc: "AI trả lời điện thoại bằng giọng nói tiếng Việt. Dành cho gói Enterprise.",
    connected: false,
    info: null,
    steps: [],
    enterprise: true,
  },
];

const webhookUrl = "https://api.aria.vn/webhook/zalo/prop_abc123";
const widgetScript = `<script src="https://cdn.aria.vn/widget.js" data-key="prop_abc123"></script>`;

export default function ChannelsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kênh tích hợp</h1>
        <p className="text-gray-500 text-sm mt-1">Kết nối ARIA với các kênh nhắn tin của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {channels.map((ch) => (
          <Card key={ch.id} className={ch.enterprise ? "opacity-70" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${ch.color} flex items-center justify-center text-xl`}>
                    {ch.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{ch.name}</CardTitle>
                    {ch.enterprise && <span className="text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">Enterprise</span>}
                  </div>
                </div>
                {ch.connected ? (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> Đã kết nối
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <XCircle className="w-4 h-4" /> Chưa kết nối
                  </div>
                )}
              </div>
              <CardDescription className="mt-2">{ch.desc}</CardDescription>
              {ch.info && <p className="text-xs text-violet-600 font-medium mt-1">{ch.info}</p>}
            </CardHeader>
            <CardContent>
              {ch.enterprise ? (
                <Button className="w-full" variant="outline">Liên hệ để nâng cấp</Button>
              ) : ch.connected ? (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">Cấu hình</Button>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">Ngắt kết nối</Button>
                </div>
              ) : (
                <Button className="w-full" size="sm">{ch.steps.length > 0 ? "Kết nối ngay" : "Sắp ra mắt"}</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Webhook & Widget config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Zalo Webhook URL</CardTitle>
            <CardDescription>Dán URL này vào cài đặt ứng dụng Zalo OA của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input value={webhookUrl} readOnly className="text-xs font-mono bg-gray-50" />
              <Button size="icon" variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <a href="https://developers.zalo.me" target="_blank" rel="noopener noreferrer" className="text-violet-600 text-xs flex items-center gap-1 hover:underline">
              Mở Zalo Developers Console <ExternalLink className="w-3 h-3" />
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Website Widget Script</CardTitle>
            <CardDescription>Nhúng đoạn script này vào thẻ &lt;body&gt; của website bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono text-green-400 overflow-x-auto">
              {widgetScript}
            </div>
            <Button size="sm" variant="outline" className="gap-2">
              <Copy className="w-3.5 h-3.5" /> Copy script
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
