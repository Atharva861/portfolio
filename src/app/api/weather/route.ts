import { NextResponse } from "next/server";
import { getCurrentWeather } from "@/lib/weather";

export const revalidate = 3600; // Next.js App Router cache setting

export async function GET() {
  const weather = await getCurrentWeather();
  return NextResponse.json({ weather });
}
