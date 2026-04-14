import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const result = await GenAiCode.sendMessage(prompt);
    const AIres = result.response.text();
    return NextResponse.json(JSON.parse(AIres));

  } catch (e) {
    return NextResponse.json({ error: AIres });
  }
}