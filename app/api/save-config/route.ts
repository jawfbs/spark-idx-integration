import { NextRequest, NextResponse } from "next/server";
import { setEnvironmentVariables } from "@/lib/vercel-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, projectId, teamId, sparkApiKey, sparkApiSecret, sparkMlsId } = body;

    if (!accessToken || !projectId || !sparkApiKey) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const envVars = [
      {
        key: "SPARK_API_KEY",
        value: sparkApiKey,
        type: "encrypted",
        target: ["production", "preview", "development"],
      },
      {
        key: "SPARK_API_SECRET",
        value: sparkApiSecret || "",
        type: "encrypted",
        target: ["production", "preview", "development"],
      },
      {
        key: "SPARK_MLS_ID",
        value: sparkMlsId || "",
        type: "plain",
        target: ["production", "preview", "development"],
      },
      {
        key: "NEXT_PUBLIC_SPARK_IDX_ENABLED",
        value: "true",
        type: "plain",
        target: ["production", "preview", "development"],
      },
    ];

    await setEnvironmentVariables(accessToken, projectId, envVars, teamId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save config error:", error);
    return NextResponse.json(
      {
        error: `Failed to save: ${error instanceof Error ? error.message : "Unknown"}`,
      },
      { status: 500 }
    );
  }
}
