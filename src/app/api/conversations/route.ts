import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getConversations, getMessages, updateConversationStatus } from "@/lib/supabase/queries";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const propertyId = searchParams.get("property_id");
  const conversationId = searchParams.get("conversation_id");
  const status = searchParams.get("status") ?? "all";

  if (conversationId) {
    const messages = await getMessages(conversationId);
    return NextResponse.json({ messages });
  }

  if (!propertyId) return NextResponse.json({ error: "property_id required" }, { status: 400 });

  const conversations = await getConversations(propertyId, status);
  return NextResponse.json({ conversations });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  if (!id || !status) return NextResponse.json({ error: "id and status required" }, { status: 400 });

  await updateConversationStatus(id, status);
  return NextResponse.json({ ok: true });
}
