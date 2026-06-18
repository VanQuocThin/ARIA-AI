import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Calendar,
  BarChart3,
  Zap,
  Globe,
  Shield,
  Star,
  ChevronRight,
  Check,
  Building2,
  Utensils,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: MessageCircle,
    title: "Đa kênh tích hợp",
    desc: "Zalo OA, Facebook Messenger, Website Widget — tất cả trong một dashboard duy nhất.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Clock,
    title: "Hoạt động 24/7",
    desc: "Không ngủ, không nghỉ. ARIA trả lời khách ngay cả khi 2 giờ sáng, lễ tết, hay lúc bận nhất.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Calendar,
    title: "Đặt phòng & đặt bàn tự động",
    desc: "Thu thập thông tin, xác nhận đặt chỗ và ghi vào hệ thống tự động — không cần nhân viên.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Globe,
    title: "Tiếng Việt bản ngữ",
    desc: "Hiểu đặc trưng ngôn ngữ Việt Nam: từ lóng, ký hiệu, viết tắt. Hỗ trợ thêm tiếng Anh, Trung, Hàn.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Upsell thông minh",
    desc: "Tự động gợi ý nâng hạng phòng, combo dịch vụ, món đặc biệt — tăng doanh thu trung bình 18%.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Shield,
    title: "Ethical AI Guard",
    desc: "Bộ lọc AI tự động ngăn chặn phản hồi sai lệch, thông tin nhạy cảm hoặc ngoài phạm vi dịch vụ.",
    color: "bg-red-100 text-red-600",
  },
];

const channels = [
  { name: "Zalo OA", icon: "💬", users: "70M+ người dùng VN" },
  { name: "Facebook Messenger", icon: "📘", users: "Kết nối fanpage" },
  { name: "Website Widget", icon: "🌐", users: "Nhúng vào web sẵn có" },
  { name: "Gọi điện AI", icon: "📞", users: "Voice AI tiếng Việt" },
];

const pricing = [
  {
    name: "Starter",
    price: "990.000",
    period: "/tháng",
    desc: "Phù hợp nhà hàng, quán cà phê nhỏ",
    highlight: false,
    features: [
      "1 kênh (Zalo hoặc Facebook)",
      "500 tin nhắn/tháng",
      "Đặt bàn tự động",
      "Dashboard cơ bản",
      "Hỗ trợ email",
    ],
  },
  {
    name: "Pro",
    price: "2.490.000",
    period: "/tháng",
    desc: "Lý tưởng cho khách sạn 2–4 sao, nhà hàng vừa",
    highlight: true,
    features: [
      "3 kênh (Zalo + Facebook + Website)",
      "5.000 tin nhắn/tháng",
      "Đặt phòng & đặt bàn tự động",
      "Upsell thông minh",
      "Dashboard nâng cao + báo cáo",
      "Quản lý Lead",
      "Hỗ trợ ưu tiên (hotline)",
    ],
  },
  {
    name: "Enterprise",
    price: "Liên hệ",
    period: "",
    desc: "Chuỗi khách sạn, resort, thương hiệu lớn",
    highlight: false,
    features: [
      "Không giới hạn kênh & tin nhắn",
      "Voice AI (gọi điện tự động)",
      "Tích hợp PMS/POS",
      "Custom AI persona & giọng nói",
      "SLA 99.9% uptime",
      "Dedicated account manager",
    ],
  },
];

const testimonials = [
  {
    name: "Nguyễn Minh Tuấn",
    role: "Chủ khách sạn Hương Biển, Đà Nẵng",
    avatar: "NT",
    content:
      "Trước đây nhân viên lễ tân phải làm thêm giờ mỗi cuối tuần. Giờ ARIA xử lý 80% tin nhắn tự động, doanh thu đặt phòng online tăng 23% chỉ sau 2 tháng.",
    rating: 5,
  },
  {
    name: "Trần Thị Lan",
    role: "Quản lý nhà hàng Phố Xưa, Hội An",
    avatar: "TL",
    content:
      "Khách nước ngoài hay nhắn tin hỏi menu lúc tối muộn. ARIA trả lời được cả tiếng Anh, tự đặt bàn luôn. Khách hài lòng hơn nhiều.",
    rating: 5,
  },
  {
    name: "Lê Văn Hùng",
    role: "GM, Khách sạn Lotus 4 sao, TP.HCM",
    avatar: "LH",
    content:
      "Setup mất khoảng 2 tiếng, đội support rất nhiệt tình. ARIA hiểu tiếng Việt tốt, kể cả khách nhắn tắt kiểu 'bàn cho 4 ng tối nay được k'.",
    rating: 5,
  },
];

const stats = [
  { value: "< 3 giây", label: "Thời gian phản hồi trung bình" },
  { value: "85%", label: "Tin nhắn được xử lý tự động" },
  { value: "24/7", label: "Hoạt động không ngừng nghỉ" },
  { value: "+18%", label: "Tăng doanh thu upsell TB" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">ARIA AI</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-violet-600 transition-colors">Tính năng</a>
            <a href="#pricing" className="hover:text-violet-600 transition-colors">Bảng giá</a>
            <a href="#testimonials" className="hover:text-violet-600 transition-colors">Khách hàng</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Đăng nhập</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Dùng thử miễn phí</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm px-4 py-1.5">
              🇻🇳 Xây dựng riêng cho thị trường Việt Nam
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Lễ Tân AI{" "}
              <span className="gradient-text">Không Bao Giờ Ngủ</span>{" "}
              <br />cho Khách Sạn &amp; Nhà Hàng
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              ARIA trả lời khách trên Zalo, Facebook, Website 24/7 — đặt phòng, đặt bàn,
              upsell dịch vụ — hoàn toàn tự động. Không cần thuê thêm nhân viên.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="gap-2 px-8">
                  Bắt đầu miễn phí 14 ngày
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                <Phone className="w-4 h-4" />
                Xem demo trực tiếp
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-4">Không cần thẻ tín dụng · Setup trong 30 phút · Hỗ trợ onboarding miễn phí</p>
          </div>

          {/* Mock chat UI */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-600 to-cyan-500 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">ARIA — Khách Sạn Lotus</p>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                    Đang hoạt động · Phản hồi &lt; 3 giây
                  </p>
                </div>
              </div>
              <div className="p-5 space-y-4 bg-gray-50 min-h-[220px]">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-xs">
                    <p className="text-sm text-gray-800">Xin chào! Tôi là ARIA, lễ tân của Khách Sạn Lotus 🌸 Tôi có thể giúp gì cho bạn?</p>
                    <p className="text-xs text-gray-400 mt-1">09:31</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-violet-600 rounded-2xl rounded-tr-sm p-3 shadow-sm max-w-xs">
                    <p className="text-sm text-white">cuối tuần này còn phòng k? 2 ng</p>
                    <p className="text-xs text-violet-300 mt-1">09:32</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-sm">
                    <p className="text-sm text-gray-800">
                      Dạ cuối tuần (21–22/6) vẫn còn phòng ạ! 🎉<br />
                      • <strong>Deluxe</strong>: 850.000đ/đêm<br />
                      • <strong>Superior view biển</strong>: 1.200.000đ/đêm<br /><br />
                      Bạn muốn đặt loại nào? Cho mình xin tên và SĐT để giữ phòng nhé ạ 😊
                    </p>
                    <p className="text-xs text-gray-400 mt-1">09:32 · Phản hồi trong 2.1s</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {channels.map((ch) => (
                <div key={ch.name} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 text-sm">
                  <span>{ch.icon}</span>
                  <span className="font-medium text-gray-700">{ch.name}</span>
                  <span className="text-gray-400 text-xs">{ch.users}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{s.value}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Tính năng</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mọi thứ để tự động hoá lễ tân</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Không phải chatbot đơn giản. ARIA hiểu ngữ cảnh, xử lý yêu cầu, không cần script cứng.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-8 border border-violet-100">
              <Building2 className="w-10 h-10 text-violet-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dành cho Khách Sạn</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                {["Tự động check-in thông tin đặt phòng", "Xử lý yêu cầu housekeeping qua chat", "Upsell phòng cao hơn, dịch vụ spa, ăn sáng", "Trả lời chính sách huỷ phòng, check-in/out", "Tích hợp PMS (Cloudbeds, Opera, local systems)"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8 border border-orange-100">
              <Utensils className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dành cho Nhà Hàng</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                {["Nhận đặt bàn, xác nhận tự động qua Zalo", "Giới thiệu menu, món đặc biệt hôm nay", "Xử lý đặt tiệc, sự kiện riêng tư", "Thu thập yêu cầu đặc biệt (dị ứng, sinh nhật)", "Nhắc nhở booking 1 tiếng trước bữa ăn"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">Cách hoạt động</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Setup trong 30 phút, chạy mãi mãi</h2>
          <p className="text-gray-500 mb-12">Không cần kỹ thuật, không cần code.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Nhập thông tin cơ sở", desc: "Điền tên, địa chỉ, dịch vụ, giờ làm việc. ARIA học từ thông tin của bạn." },
              { step: "02", title: "Kết nối kênh", desc: "Tích hợp Zalo OA, Facebook Page, hoặc nhúng widget vào website hiện có." },
              { step: "03", title: "ARIA tự vận hành", desc: "Bật switch, ARIA bắt đầu trả lời khách. Bạn theo dõi qua dashboard và can thiệp khi cần." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-violet-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{s.step}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Bảng giá</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Giá rõ ràng, không phí ẩn</h2>
            <p className="text-gray-500">Tiết kiệm hơn thuê thêm 1 nhân viên lễ tân (7–12 triệu/tháng)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl border-2 p-6 ${plan.highlight ? "border-violet-500 shadow-xl shadow-violet-100" : "border-gray-200"}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="px-4">Phổ biến nhất</Badge>
                  </div>
                )}
                <h3 className="font-bold text-lg text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-xs mb-4">{plan.desc}</p>
                <div className="mb-6">
                  {plan.period ? (
                    <><span className="text-3xl font-bold text-gray-900">{plan.price}đ</span><span className="text-gray-400 text-sm">{plan.period}</span></>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" /><span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                    {plan.name === "Enterprise" ? "Liên hệ tư vấn" : "Bắt đầu miễn phí"}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">* Tất cả gói có 14 ngày dùng thử miễn phí. Hỗ trợ onboarding 1-on-1 cho gói Pro trở lên.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Khách hàng nói gì</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Họ đã dùng ARIA</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-600 text-sm">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-violet-600 to-cyan-500">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Bắt đầu ngay — miễn phí 14 ngày</h2>
          <p className="text-violet-100 text-lg mb-8">Hàng trăm khách sạn &amp; nhà hàng Việt Nam đã không bỏ lỡ thêm một khách hàng nào.</p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 px-8">
              Tạo tài khoản miễn phí
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white">ARIA AI</span>
            </div>
            <p className="text-gray-400 text-sm">Lễ tân AI 24/7 cho khách sạn &amp; nhà hàng.<br />Xây dựng tại Việt Nam 🇻🇳</p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="text-white font-semibold mb-3">Sản phẩm</p>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Tính năng</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Bảng giá</a></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Dùng thử</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Liên hệ</p>
              <ul className="space-y-2 text-gray-400">
                <li>Zalo: 0912 345 678</li>
                <li>hello@aria.vn</li>
                <li>TP. Hồ Chí Minh</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2025 ARIA AI. Bảo lưu mọi quyền.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300">Chính sách bảo mật</Link>
            <Link href="/terms" className="hover:text-gray-300">Điều khoản sử dụng</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
