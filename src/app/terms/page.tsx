import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata = { title: "Điều khoản sử dụng — ARIA AI" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header role="banner">
      <nav role="navigation" aria-label="Điều hướng chính" className="border-b border-gray-100 px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">ARIA AI</span>
        </Link>
      </nav>
      </header>
      <main role="main">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Điều khoản sử dụng</h1>
        <p className="text-gray-500 text-sm mb-8">Cập nhật lần cuối: 18/06/2025</p>

        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Chấp nhận điều khoản</h2>
            <p>
              Bằng cách tạo tài khoản và sử dụng dịch vụ ARIA AI, bạn đồng ý với các điều khoản này.
              Nếu không đồng ý, vui lòng không sử dụng dịch vụ.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Dịch vụ ARIA AI</h2>
            <p>ARIA AI cung cấp hệ thống lễ tân AI tự động bao gồm:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Trả lời tin nhắn tự động qua Zalo OA, Facebook Messenger, Website</li>
              <li>Thu thập và quản lý đặt phòng, đặt bàn</li>
              <li>Quản lý khách hàng tiềm năng</li>
              <li>Dashboard phân tích và báo cáo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Trách nhiệm của người dùng</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cung cấp thông tin chính xác về cơ sở kinh doanh</li>
              <li>Không sử dụng ARIA AI để gửi spam hoặc nội dung không hợp pháp</li>
              <li>Chịu trách nhiệm về nội dung cấu hình trong hệ thống AI</li>
              <li>Đảm bảo có đủ quyền tích hợp với Zalo OA, Facebook Page</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Giới hạn trách nhiệm</h2>
            <p>
              ARIA AI là công cụ hỗ trợ. Chúng tôi không chịu trách nhiệm về các quyết định kinh doanh
              dựa trên phản hồi của AI. Khuyến nghị doanh nghiệp luôn có nhân viên giám sát và
              xử lý các tình huống phức tạp.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Thanh toán & Huỷ dịch vụ</h2>
            <p>
              Phí dịch vụ tính theo tháng. Bạn có thể huỷ bất kỳ lúc nào, phí đã thanh toán
              không hoàn lại theo tháng đang dùng. Dữ liệu được giữ 30 ngày sau khi huỷ.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Liên hệ</h2>
            <p>
              <strong>Email:</strong> legal@aria.vn<br />
              <strong>Địa chỉ:</strong> TP. Hồ Chí Minh, Việt Nam
            </p>
          </section>
        </div>
      </div>
      </main>
    </div>
  );
}
