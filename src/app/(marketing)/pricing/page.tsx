import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Starter",
    price: "990.000",
    desc: "Nhà hàng, quán cà phê nhỏ",
    highlight: false,
    features: [
      "1 kênh (Zalo hoặc Facebook)",
      "500 tin nhắn/tháng",
      "Đặt bàn tự động",
      "Dashboard cơ bản",
      "Hỗ trợ email",
    ],
    notIncluded: ["Upsell thông minh", "Voice AI", "Tích hợp PMS"],
  },
  {
    name: "Pro",
    price: "2.490.000",
    desc: "Khách sạn 2–4 sao, nhà hàng vừa",
    highlight: true,
    features: [
      "3 kênh (Zalo + Facebook + Website)",
      "5.000 tin nhắn/tháng",
      "Đặt phòng & đặt bàn tự động",
      "Upsell thông minh",
      "Dashboard nâng cao + báo cáo",
      "Quản lý Lead",
      "Ethical AI Guard",
      "Hỗ trợ hotline ưu tiên",
    ],
    notIncluded: ["Voice AI", "Tích hợp PMS"],
  },
  {
    name: "Enterprise",
    price: "Liên hệ",
    desc: "Chuỗi khách sạn, resort 4–5 sao",
    highlight: false,
    features: [
      "Không giới hạn kênh & tin nhắn",
      "Voice AI tiếng Việt",
      "Tích hợp PMS/POS (Cloudbeds, Opera...)",
      "Custom AI persona & giọng nói",
      "Multi-property (nhiều cơ sở)",
      "SLA 99.9% uptime",
      "Dedicated account manager",
      "Onboarding & training team",
    ],
    notIncluded: [],
  },
];

const faq = [
  { q: "Tôi có thể dùng thử trước không?", a: "Có! Tất cả gói đều có 14 ngày dùng thử miễn phí. Không cần thẻ tín dụng." },
  { q: "Nếu vượt giới hạn tin nhắn thì sao?", a: "ARIA sẽ thông báo trước khi đến giới hạn. Bạn có thể nâng gói hoặc mua thêm tin nhắn (200.000đ/1.000 tin nhắn)." },
  { q: "Có hỗ trợ onboarding không?", a: "Gói Pro và Enterprise có hỗ trợ onboarding 1-on-1 miễn phí: setup kênh, cấu hình AI, nhập thông tin cơ sở." },
  { q: "Dữ liệu khách hàng của tôi có an toàn không?", a: "100% dữ liệu lưu trên server tại Việt Nam. Chúng tôi không chia sẻ dữ liệu với bên thứ ba. Tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân." },
  { q: "Tôi có thể tự cấu hình AI không?", a: "Có! Dashboard cho phép bạn chỉnh tên AI, lời chào, phong cách trả lời, giờ làm việc — không cần kỹ thuật." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header role="banner">
        <nav role="navigation" aria-label="Điều hướng chính" className="border-b border-gray-100 px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">ARIA AI</span>
          </Link>
          <Link href="/register"><Button size="sm">Dùng thử miễn phí</Button></Link>
        </nav>
      </header>

      <main role="main">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Bảng giá</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Giá minh bạch, không phí ẩn</h1>
          <p className="text-gray-500 text-lg">Rẻ hơn 1 nhân viên lễ tân (7–12 triệu/tháng). Hoạt động 24/7.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl border-2 p-6 ${plan.highlight ? "border-violet-500 shadow-xl shadow-violet-100" : "border-gray-200"}`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="px-4">Phổ biến nhất</Badge>
                </div>
              )}
              <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
              <p className="text-gray-400 text-xs mb-4">{plan.desc}</p>
              <div className="mb-6">
                {plan.price !== "Liên hệ" ? (
                  <><span className="text-3xl font-bold text-gray-900">{plan.price}đ</span><span className="text-gray-400 text-sm">/tháng</span></>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">Liên hệ</span>
                )}
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                  {plan.name === "Enterprise" ? "Liên hệ tư vấn" : "Bắt đầu miễn phí 14 ngày"}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="bg-gray-50 rounded-xl p-5">
                <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}
