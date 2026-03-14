import { NextRequest, NextResponse } from "next/server";
import { SparkClient } from "@/lib/spark-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey, apiSecret } = body;

    if (!apiKey) {
      return NextResponse.json(
        { valid: false, message: "API key is required" },
        { status: 400 }
      );
    }

    const client = new SparkClient(apiKey, apiSecret);
    const result = await client.validateCredentials();

    if (result.valid) {
      const systemInfo = await client.getSystemInfo();
      return NextResponse.json({
        valid: true,
        message: result.message,
        mlsName: result.mlsName,
        systemName: systemInfo.name,
        listingCount: systemInfo.listingCount,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        valid: false,
        message: `Validation error: ${error instanceof Error ? error.message : "Unknown"}`,
      },
      { status: 500 }
    );
  }
}
