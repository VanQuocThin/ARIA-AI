import { GoogleGenerativeAI } from "@google/generative-ai";
import { Property, Message } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function buildSystemPrompt(property: Property): string {
  return `Bạn là ${property.ai_persona_name || "ARIA"}, lễ tân AI thông minh của ${property.name}.

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
}

export async function generateReply(
  property: Property,
  history: Message[],
  userMessage: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: buildSystemPrompt(property),
  });

  const chat = model.startChat({
    history: history
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
  });

  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}

export async function generateReplyStream(
  property: Property,
  history: Message[],
  userMessage: string
): Promise<ReadableStream<Uint8Array>> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: buildSystemPrompt(property),
  });

  const chat = model.startChat({
    history: history
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
  });

  const result = await chat.sendMessageStream(userMessage);
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });
}

export async function classifyIntent(message: string): Promise<{
  intent: "booking" | "inquiry" | "complaint" | "other";
  urgency: "low" | "medium" | "high";
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(
    `Phân loại tin nhắn khách hàng sau. Chỉ trả về JSON, không giải thích:\n{"intent": "booking"|"inquiry"|"complaint"|"other", "urgency": "low"|"medium"|"high"}\n\nTin nhắn: ${message}`
  );
  try {
    const text = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  } catch {
    return { intent: "other", urgency: "low" };
  }
}
