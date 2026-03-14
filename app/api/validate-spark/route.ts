import { NextRequest, NextResponse } from "next/server";
import {
  validateSparkCredentials,
  SparkAuth,
} from "@/lib/spark-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode } = body;

    let auth: SparkAuth;

    if (mode === "replication") {
      const { oauthKey, accessToken } = body;

      if (!oauthKey || !accessToken) {
        return NextResponse.json(
          { valid: false, message: "OAuth Key and Access Token are required" },
          { status: 400 }
        );
      }

      auth = { mode: "replication", oauthKey, accessToken };
    } else {
      const { apiKey, apiSecret } = body;

      if (!apiKey || !apiSecret) {
        return NextResponse.json(
          { valid: false, message: "API Key and Secret are required" },
          { status: 400 }
        );
      }

      auth = { mode: "standard", apiKey, apiSecret };
    }

    const result = await validateSparkCredentials(auth);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Validate Spark error:", error);
    return NextResponse.json(
      {
        valid: false,
        message:
          error instanceof Error ? error.message : "Validation failed",
      },
      { status: 500 }
    );
  }
}
