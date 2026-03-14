import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasClientId: !!process.env.INTEGRATION_CLIENT_ID,
    clientIdPrefix: process.env.INTEGRATION_CLIENT_ID?.substring(0, 8) || "NOT SET",
    hasClientSecret: !!process.env.INTEGRATION_CLIENT_SECRET,
    secretLength: process.env.INTEGRATION_CLIENT_SECRET?.length || 0,
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "NOT SET",
  });
}
