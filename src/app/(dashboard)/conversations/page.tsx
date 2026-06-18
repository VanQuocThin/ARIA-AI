"use client";

import { useState } from "react";
import { MessageCircle, Search, Filter, Clock, CheckCircle, AlertCircle, Send, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";

const mockConversations = [
  {
    id: "1", name: "Nguyễn Thị Mai", channel: "Zalo", status: "open",
    lastMessage: "cho mình hỏi còn phòng cuối tuần k?",
    time: "2 phút trước", unread: 2,
    messages: [
      { role: "user", content: "Chào shop ơi", time: "09:30" },
      { role: "assistant", content: "Xin chào chị Mai! Tôi là ARIA, lễ tân của Khách Sạn Lotus. Tôi có thể giúp gì cho chị ạ? 🌸", time: "09:30" },
      { role: "user", content: "cho mình hỏi còn phòng cuối tuần k?", time: "09:31" },
    ],
  },
  {
    id: "2", name: "Trần Văn Nam", channel: "Facebook", status: "resolved",
    lastMessage: "Đặt bàn 6 người tối thứ 6 được không ạ",
    time: "15 phút trước", unread: 0,
    messages: [
      { role: "user", content: "Đặt bàn 6 người tối thứ 6 được không ạ", time: "09:10" },
      { role: "assistant", content: "Dạ được anh ơi! Tối thứ 6 (20/6) nhà hàng vẫn có chỗ ạ. Anh muốn đặt lúc mấy giờ? Thường anh em hay đặt 18h hoặc 19h ạ.", time: "09:10" },
      { role: "user", content: "19h nhé", time: "09:11" },
      { role: "assistant", content: "Đã đặt bàn cho 6 người lúc 19h thứ 6 (20/6) rồi ạ! Cho tôi xin số điện thoại của anh để xác nhận nhé? 😊", time: "09:11" },
    ],
  },
  {
    id: "3", name: "Lê Thị Hoa", channel: "Website", status: "open",
    lastMessage: "Giá phòng suite bao nhiêu ạ?",
    time: "32 phút trước", unread: 1,
    messages: [
      { role: "user", content: "Giá phòng suite bao nhiêu ạ?", time: "09:00" },
      { role: "assistant", content: "Phòng Suite của khách sạn có giá từ 2.800.000đ/đêm (tuần thường) đến 3.500.000đ/đêm (cuối tuần) chị ơi ạ 🌟 Phòng rộng 60m², có ban công view thành phố, bồn tắm jacuzzi và minibar. Chị muốn đặt ngày nào ạ?", time: "09:00" },
    ],
  },
  {
    id: "4", name: "Phạm Minh Khoa", channel: "Zalo", status: "resolved",
    lastMessage: "Check out muộn được không shop ơi",
    time: "1 tiếng trước", unread: 0,
    messages: [
      { role: "user", content: "Check out muộn được không shop ơi, mình cần tới 2h chiều", time: "08:30" },
      { role: "assistant", content: "Dạ late check-out được anh ơi! Phí thêm 200.000đ/giờ cho đến 14h, hoặc tính nửa ngày nếu anh cần đến 18h ạ. Phòng anh đang ở số mấy để mình xác nhận nhé? 😊", time: "08:30" },
    ],
  },
  {
    id: "5", name: "Hoàng Thị Lan", channel: "Facebook", status: "escalated",
    lastMessage: "tôi đặt phòng mà không có tên mình trong hệ thống...",
    time: "2 tiếng trước", unread: 3,
    messages: [
      { role: "user", content: "tôi đặt phòng mà không có tên mình trong hệ thống, tôi cần giải quyết ngay", time: "07:45" },
      { role: "assistant", content: "Dạ tôi hiểu sự bất tiện này chị ơi! Để tôi kiểm tra lại ngay cho chị. Chị vui lòng cho tôi biết tên đầy đủ và ngày đặt phòng không ạ?", time: "07:45" },
      { role: "user", content: "tôi đặt ngày 19/6, tên Hoàng Thị Lan, SĐT 0912xxx", time: "07:46" },
      { role: "assistant", content: "Tôi đã ghi nhận thông tin của chị và đã chuyển sang nhân viên trực để hỗ trợ chị ngay ạ. Nhân viên sẽ liên hệ với chị trong vòng 5 phút. Xin lỗi về sự bất tiện này! 🙏", time: "07:46" },
      { role: "user", content: "tôi đặt phòng mà không có tên mình trong hệ thống...", time: "07:50" },
    ],
  },
];

const statusConfig = {
  open: { label: "Đang mở", icon: Clock, color: "text-yellow-600 bg-yellow-50" },
  resolved: { label: "Đã xong", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  escalated: { label: "Cần xử lý", icon: AlertCircle, color: "text-red-600 bg-red-50" },
};

const channelColor: Record<string, string> = {
  Zalo: "bg-blue-100 text-blue-700",
  Facebook: "bg-indigo-100 text-indigo-700",
  Website: "bg-violet-100 text-violet-700",
};

export default function ConversationsPage() {
  const [selected, setSelected] = useState(mockConversations[0]);
  const [filter, setFilter] = useState("all");
  const [reply, setReply] = useState("");

  const filtered = filter === "all" ? mockConversations : mockConversations.filter((c) => c.status === filter);

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-0 -m-8">
      {/* List */}
      <div className="w-80 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 space-y-3">
          <h2 className="font-semibold text-gray-900">Hội thoại</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input className="pl-9" placeholder="Tìm kiếm..." />
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {[
              { key: "all", label: "Tất cả" },
              { key: "open", label: "Đang mở" },
              { key: "escalated", label: "Cần xử lý" },
              { key: "resolved", label: "Đã xong" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                  filter === f.key ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filtered.map((conv) => {
            const st = statusConfig[conv.status as keyof typeof statusConfig];
            return (
              <div
                key={conv.id}
                onClick={() => setSelected(conv)}
                className={cn(
                  "px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors",
                  selected.id === conv.id && "bg-violet-50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center font-semibold text-violet-600 text-sm flex-shrink-0 relative">
                    {conv.name.charAt(0)}
                    {conv.unread > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center font-bold">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-medium text-gray-900 text-sm truncate">{conv.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${channelColor[conv.channel]}`}>{conv.channel}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{conv.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center font-semibold text-violet-600 text-sm">
              {selected.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{selected.name}</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${channelColor[selected.channel]}`}>{selected.channel}</span>
                <span className={cn("text-xs px-2 py-0.5 rounded-full", statusConfig[selected.status as keyof typeof statusConfig].color)}>
                  {statusConfig[selected.status as keyof typeof statusConfig].label}
                </span>
              </div>
            </div>
          </div>
          <Button size="sm" variant="outline">Chuyển nhân viên</Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {selected.messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-violet-600" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-sm rounded-2xl px-4 py-3 text-sm",
                  msg.role === "user"
                    ? "bg-violet-600 text-white rounded-tr-sm"
                    : "bg-white text-gray-800 shadow-sm rounded-tl-sm"
                )}
              >
                {msg.content}
                <p className={cn("text-xs mt-1", msg.role === "user" ? "text-violet-300" : "text-gray-400")}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-100 p-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Input
                placeholder="Nhập phản hồi thủ công (ARIA đang tự động)..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="bg-gray-50"
              />
            </div>
            <Button size="icon" disabled={!reply}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <Zap className="w-3 h-3 text-violet-500" />
            ARIA đang tự động xử lý hội thoại này
          </p>
        </div>
      </div>
    </div>
  );
}
