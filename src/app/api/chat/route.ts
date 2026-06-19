import { NextRequest, NextResponse } from "next/server";
import { generateReply } from "@/lib/anthropic";
import { createAdminClient } from "@/lib/supabase/admin";
import { Property, Message } from "@/types";

const QUOTA_EXCEEDED_MSG =
  "Xin lỗi, cơ sở hiện đã đạt giới hạn tin nhắn tháng này. Vui lòng liên hệ trực tiếp để được hỗ trợ.";

export async function POST(req: NextRequest) {
  try {
    const { property, history, message } = await req.json();

    if (!property || !message) {
      return NextResponse.json({ error: "Missing property or message" }, { status: 400 });
    }

    // Fetch live quota from DB (admin client bypasses RLS for widget traffic)
    const admin = createAdminClient();
    const { data: prop } = await admin
      .from("properties")
      .select("plan, messages_used, messages_quota")
      .eq("id", property.id)
      .single();

    if (prop?.plan === "free" && prop.messages_used >= prop.messages_quota) {
      return NextResponse.json({ reply: QUOTA_EXCEEDED_MSG });
    }

    const reply = await generateReply(property as Property, history as Message[], message);

    // Increment message counter
    if (prop) {
      await admin
        .from("properties")
        .update({ messages_used: prop.messages_used + 1 })
        .eq("id", property.id);
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
