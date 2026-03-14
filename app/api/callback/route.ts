import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/vercel-api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const configurationId = searchParams.get("configurationId");
  const teamId = searchParams.get("teamId");
  const next = searchParams.get("next");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  try {
    const tokenData = await exchangeCodeForToken(code);

    // Build the dashboard URL with the token info
    // In production, store this in a database instead of URL params
    const dashboardUrl = new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL);
    dashboardUrl.searchParams.set("accessToken", tokenData.access_token);
    dashboardUrl.searchParams.set("userId", tokenData.user_id);
    if (configurationId)
      dashboardUrl.searchParams.set("configurationId", configurationId);
    if (teamId) dashboardUrl.searchParams.set("teamId", teamId);

    // If Vercel provided a 'next' URL, we'll store it for later redirect
    if (next) dashboardUrl.searchParams.set("next", next);

    return NextResponse.redirect(dashboardUrl.toString());
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
