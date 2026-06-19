import { NextRequest, NextResponse } from "next/server";
import { generateReply } from "@/lib/anthropic";

// Facebook Messenger webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.FACEBOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.object !== "page") return NextResponse.json({ ok: true });

    for (const entry of body.entry ?? []) {
      for (const event of entry.messaging ?? []) {
        if (!event.message?.text) continue;

        const senderId = event.sender?.id;
        const userText = event.message.text;

        // TODO: Look up property from Facebook Page ID
        const property = {
          id: "demo",
          name: "Khách Sạn Demo",
          type: "hotel" as const,
          address: "123 Nguyễn Huệ, Q1, TP.HCM",
          phone: "0912 345 678",
          description: "Khách sạn 4 sao trung tâm thành phố",
          ai_persona_name: "ARIA",
          ai_greeting: "Xin chào! Tôi là ARIA, lễ tân của Khách Sạn Demo.",
          working_hours_start: "07:00",
          working_hours_end: "22:00",
          auto_reply: true,
          user_id: "",
          plan: "free" as const,
          messages_used: 0,
          messages_quota: 200,
          messages_reset_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        };

        const reply = await generateReply(property, [], userText);

        // Send reply via Facebook Send API
        await fetch(`https://graph.facebook.com/v21.0/me/messages?access_token=${process.env.FACEBOOK_PAGE_ACCESS_TOKEN}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipient: { id: senderId },
            message: { text: reply },
          }),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Facebook webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
