import getTodayWords from "@/lib/learning/scheduler";

import { NextResponse } from "next/server";

export async function GET() {
  const data = await getTodayWords();
  return NextResponse.json(data);
}