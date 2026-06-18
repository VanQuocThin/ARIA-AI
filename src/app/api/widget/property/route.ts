import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Public endpoint — returns safe property info for the chat widget
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key) return NextResponse.json({ error: "key required" }, { status: 400 });

  const supabase = await createClient();
  const { data } = await supabase
    .from("properties")
    .select("id, name, type, ai_persona_name, ai_greeting, phone, working_hours_start, working_hours_end")
    .eq("id", key)
    .eq("auto_reply", true)
    .single();

  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ property: data }, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
