import { NextRequest, NextResponse } from "next/server";
import { generateReplyStream } from "@/lib/anthropic";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Property, Message } from "@/types";

const QUOTA_EXCEEDED_MSG =
  "Xin lỗi, cơ sở hiện đã đạt giới hạn tin nhắn tháng này. Vui lòng liên hệ trực tiếp để được hỗ trợ.";

export async function POST(req: NextRequest) {
  const { property, history, message } = await req.json() as {
    property: Property;
    history: Message[];
    message: string;
  };

  // Fetch live quota from DB (admin client bypasses RLS for widget traffic)
  const admin = createAdminClient();
  const { data: prop } = await admin
    .from("properties")
    .select("plan, messages_used, messages_quota")
    .eq("id", property.id)
    .single();

  if (prop?.plan === "free" && prop.messages_used >= prop.messages_quota) {
    return NextResponse.json({ error: QUOTA_EXCEEDED_MSG }, { status: 429 });
  }

  // Increment counter before streaming (fire-and-forget)
  if (prop) {
    admin
      .from("properties")
      .update({ messages_used: prop.messages_used + 1 })
      .eq("id", property.id)
      .then(() => {});
  }

  const stream = await generateReplyStream(property, history as Message[], message);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
