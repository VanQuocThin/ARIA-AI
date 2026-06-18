import { NextRequest, NextResponse } from "next/server";
import { generateReply } from "@/lib/anthropic";
import { Property, Message } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { property, history, message } = await req.json();

    if (!property || !message) {
      return NextResponse.json({ error: "Missing property or message" }, { status: 400 });
    }

    const reply = await generateReply(property as Property, history as Message[], message);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
