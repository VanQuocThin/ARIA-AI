import Anthropic from "@anthropic-ai/sdk";
import { Property, Message } from "@/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateReply(
  property: Property,
  history: Message[],
  userMessage: string
): Promise<string> {
  const systemPrompt = `Bạn là ${property.ai_persona_name || "ARIA"}, lễ tân AI thông minh của ${property.name}.

Thông tin cơ sở:
- Tên: ${property.name}
- Loại: ${property.type === "hotel" ? "Khách sạn" : property.type === "restaurant" ? "Nhà hàng" : property.type === "spa" ? "Spa" : "Quán cà phê"}
- Địa chỉ: ${property.address}
- Số điện thoại: ${property.phone}
- Giờ làm việc: ${property.working_hours_start} - ${property.working_hours_end}
- Giới thiệu: ${property.description}

Lời chào mặc định: "${property.ai_greeting}"

Hướng dẫn:
- Luôn trả lời bằng tiếng Việt, lịch sự và thân thiện
- Giúp khách đặt phòng/bàn, trả lời thắc mắc về giá cả, dịch vụ
- Nếu cần thông tin đặt chỗ, hỏi: tên khách, số điện thoại, ngày giờ, số người
- Khi không chắc, đề nghị khách gọi trực tiếp đến số ${property.phone}
- Không bịa đặt thông tin về giá hoặc dịch vụ chưa được cung cấp
- Giữ phong cách ${property.type === "hotel" ? "chuyên nghiệp, sang trọng" : property.type === "restaurant" ? "ấm cúng, mến khách" : "thân thiện, chuyên nghiệp"}
- Trả lời ngắn gọn, dưới 150 từ trừ khi cần thiết`;

  const messages = history
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

  messages.push({ role: "user", content: userMessage });

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    system: systemPrompt,
    messages,
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}

export async function classifyIntent(message: string): Promise<{
  intent: "booking" | "inquiry" | "complaint" | "other";
  urgency: "low" | "medium" | "high";
}> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 64,
    system:
      'Phân loại tin nhắn khách hàng. Trả về JSON: {"intent": "booking"|"inquiry"|"complaint"|"other", "urgency": "low"|"medium"|"high"}. Chỉ trả về JSON, không giải thích.',
    messages: [{ role: "user", content: message }],
  });

  try {
    const text =
      response.content[0].type === "text" ? response.content[0].text : "{}";
    return JSON.parse(text);
  } catch {
    return { intent: "other", urgency: "low" };
  }
}
