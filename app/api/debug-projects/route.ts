import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const teamId = request.nextUrl.searchParams.get("teamId");

  if (!token) {
    return NextResponse.json({ error: "No token provided" });
  }

  const results: Record<string, unknown> = {};

  // Try 1: With teamId
  if (teamId) {
    try {
      const res = await fetch(
        `https://api.vercel.com/v9/projects?teamId=${teamId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      results.withTeamId = {
        status: res.status,
        ok: res.ok,
        projectCount: data.projects?.length || 0,
        projectNames: data.projects?.map((p: { name: string }) => p.name) || [],
        error: data.error || null,
      };
    } catch (err) {
      results.withTeamId = {
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  }

  // Try 2: Without teamId
  try {
    const res = await fetch("https://api.vercel.com/v9/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    results.withoutTeamId = {
      status: res.status,
      ok: res.ok,
      projectCount: data.projects?.length || 0,
      projectNames: data.projects?.map((p: { name: string }) => p.name) || [],
      error: data.error || null,
    };
  } catch (err) {
    results.withoutTeamId = {
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }

  // Try 3: Check token info
  try {
    const res = await fetch("https://api.vercel.com/v2/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    results.user = {
      status: res.status,
      ok: res.ok,
      username: data.user?.username || null,
      error: data.error || null,
    };
  } catch (err) {
    results.user = {
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }

  return NextResponse.json(results, { status: 200 });
}
