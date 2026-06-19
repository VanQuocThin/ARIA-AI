import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata = { title: "Chính sách bảo mật — ARIA AI" };

export default function PrivacyPage() {
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
      <div className="max-w-2xl mx-auto px-4 py-16 prose prose-gray">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chính sách bảo mật</h1>
        <p className="text-gray-500 text-sm mb-8">Cập nhật lần cuối: 18/06/2025</p>

        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Thông tin chúng tôi thu thập</h2>
            <p>Chúng tôi thu thập các loại thông tin sau:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Thông tin đăng ký: email, họ tên, tên cơ sở kinh doanh</li>
              <li>Thông tin cơ sở: địa chỉ, số điện thoại, mô tả dịch vụ</li>
              <li>Dữ liệu hội thoại: tin nhắn giữa AI và khách hàng của bạn</li>
              <li>Dữ liệu đặt chỗ và khách hàng tiềm năng được thu thập qua ARIA</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Cách chúng tôi sử dụng thông tin</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cung cấp và cải thiện dịch vụ ARIA AI</li>
              <li>Huấn luyện mô hình AI để trả lời chính xác hơn cho cơ sở của bạn</li>
              <li>Gửi thông báo về dịch vụ, cập nhật tính năng</li>
              <li>Hỗ trợ kỹ thuật khi cần</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Bảo mật dữ liệu</h2>
            <p>
              Toàn bộ dữ liệu được mã hóa SSL/TLS khi truyền tải và lưu trữ. Chúng tôi lưu dữ liệu trên server
              đặt tại Việt Nam, tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân. Chúng tôi không
              bán hoặc chia sẻ dữ liệu của bạn với bên thứ ba vì mục đích thương mại.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Quyền của bạn</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Truy cập và xuất toàn bộ dữ liệu của bạn</li>
              <li>Yêu cầu xoá tài khoản và dữ liệu liên quan</li>
              <li>Chỉnh sửa thông tin cơ sở bất kỳ lúc nào</li>
              <li>Tắt tính năng tự động hoá AI</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Liên hệ</h2>
            <p>Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ:</p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@aria.vn<br />
              <strong>Địa chỉ:</strong> TP. Hồ Chí Minh, Việt Nam
            </p>
          </section>
        </div>
      </div>
      </main>
    </div>
  );
}
