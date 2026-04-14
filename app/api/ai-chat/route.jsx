import { createChatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const chatSession = createChatSession(); // ✅ create fresh session

    const result = await chatSession.sendMessage(prompt);

    const AIres = result.response.text();

    return NextResponse.json({ result: AIres });

  } catch (e) {
    console.error(e); // 👈 IMPORTANT
    return NextResponse.json({ error: e.message });
  }
}