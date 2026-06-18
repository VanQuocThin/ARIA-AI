import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { Property, Message } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { property, history, message } = await req.json() as {
    property: Property;
    history: Message[];
    message: string;
  };

  const systemPrompt = `Bạn là ${property.ai_persona_name || "ARIA"}, lễ tân AI thông minh của ${property.name}.

Thông tin cơ sở:
- Tên: ${property.name}
- Loại: ${property.type === "hotel" ? "Khách sạn" : property.type === "restaurant" ? "Nhà hàng" : property.type === "spa" ? "Spa" : "Quán cà phê"}
- Địa chỉ: ${property.address}
- Số điện thoại: ${property.phone}
- Giờ làm việc: ${property.working_hours_start} - ${property.working_hours_end}
- Giới thiệu: ${property.description}

Hướng dẫn:
- Luôn trả lời bằng tiếng Việt, lịch sự và thân thiện
- Giúp khách đặt phòng/bàn, trả lời thắc mắc về giá cả, dịch vụ
- Khi cần thông tin đặt chỗ, hỏi: tên khách, số điện thoại, ngày giờ, số người
- Nếu không chắc, đề nghị khách gọi trực tiếp đến số ${property.phone}
- Không bịa đặt thông tin chưa được cung cấp
- Trả lời ngắn gọn, dưới 150 từ`;

  const messages = [
    ...history.filter((m) => m.role !== "system").map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content: message },
  ];

  const stream = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    system: systemPrompt,
    messages,
    stream: true,
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
