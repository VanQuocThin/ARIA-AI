import { NextRequest, NextResponse } from "next/server";
import { generateReply } from "@/lib/anthropic";

// Zalo OA webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const challenge = searchParams.get("challenge");
  // Zalo verification: return the challenge as-is
  if (challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_name, message, sender } = body;

    // Only handle user messages
    if (event_name !== "user_send_text" || !message?.text) {
      return NextResponse.json({ ok: true });
    }

    const userText = message.text;
    const userId = sender?.id;

    // TODO: Look up property from Zalo OA ID in Supabase
    // For now use a placeholder property
    const property = {
      id: "demo",
      name: "Khách Sạn Demo",
      type: "hotel" as const,
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
      phone: "0912 345 678",
      description: "Khách sạn 4 sao trung tâm thành phố",
      ai_persona_name: "ARIA",
      ai_greeting: "Xin chào! Tôi là ARIA, lễ tân của Khách Sạn Demo. Tôi có thể giúp gì cho bạn?",
      working_hours_start: "07:00",
      working_hours_end: "22:00",
      auto_reply: true,
      user_id: "",
      created_at: new Date().toISOString(),
    };

    const reply = await generateReply(property, [], userText);

    // Send reply back via Zalo OA API
    const zaloApiUrl = "https://openapi.zalo.me/v2.0/oa/message/cs";
    await fetch(zaloApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": process.env.ZALO_OA_ACCESS_TOKEN ?? "",
      },
      body: JSON.stringify({
        recipient: { user_id: userId },
        message: { text: reply },
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Zalo webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
