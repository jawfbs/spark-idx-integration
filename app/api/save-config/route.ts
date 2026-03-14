import { NextRequest, NextResponse } from "next/server";

const VERCEL_API = "https://api.vercel.com";

interface EnvVar {
  key: string;
  value: string;
  type: "encrypted" | "plain";
  target: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      accessToken,
      projectId,
      teamId,
      mode,
      // Standard fields
      sparkApiKey,
      sparkApiSecret,
      // Replication fields
      sparkOauthKey,
      sparkAccessToken,
      // Common
      sparkMlsId,
    } = body;

    if (!accessToken || !projectId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build env vars based on mode
    const envVars: EnvVar[] = [];

    if (mode === "replication") {
      if (!sparkOauthKey || !sparkAccessToken) {
        return NextResponse.json(
          { error: "OAuth Key and Access Token are required" },
          { status: 400 }
        );
      }

      envVars.push(
        {
          key: "SPARK_OAUTH_KEY",
          value: sparkOauthKey,
          type: "encrypted",
          target: ["production", "preview", "development"],
        },
        {
          key: "SPARK_ACCESS_TOKEN",
          value: sparkAccessToken,
          type: "encrypted",
          target: ["production", "preview", "development"],
        },
        {
          key: "SPARK_AUTH_MODE",
          value: "replication",
          type: "plain",
          target: ["production", "preview", "development"],
        },
        {
          key: "SPARK_REPLICATION_URL",
          value: "https://replication.sparkapi.com",
          type: "plain",
          target: ["production", "preview", "development"],
        }
      );
    } else {
      if (!sparkApiKey || !sparkApiSecret) {
        return NextResponse.json(
          { error: "API Key and Secret are required" },
          { status: 400 }
        );
      }

      envVars.push(
        {
          key: "SPARK_API_KEY",
          value: sparkApiKey,
          type: "encrypted",
          target: ["production", "preview", "development"],
        },
        {
          key: "SPARK_API_SECRET",
          value: sparkApiSecret,
          type: "encrypted",
          target: ["production", "preview", "development"],
        },
        {
          key: "SPARK_AUTH_MODE",
          value: "standard",
          type: "plain",
          target: ["production", "preview", "development"],
        }
      );
    }

    // Common env vars
    if (sparkMlsId) {
      envVars.push({
        key: "SPARK_MLS_ID",
        value: sparkMlsId,
        type: "plain",
        target: ["production", "preview", "development"],
      });
    }

    envVars.push({
      key: "NEXT_PUBLIC_SPARK_IDX_ENABLED",
      value: "true",
      type: "plain",
      target: ["production", "preview", "development"],
    });

    // Save each env var to the Vercel project
    const teamQuery = teamId ? `?teamId=${teamId}` : "";

    for (const envVar of envVars) {
      // Try to create, if it exists update it
      const createResponse = await fetch(
        `${VERCEL_API}/v10/projects/${projectId}/env${teamQuery}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(envVar),
        }
      );

      if (!createResponse.ok) {
        const errorData = await createResponse.json();

        // If already exists, try to update
        if (
          errorData?.error?.code === "ENV_ALREADY_EXISTS" ||
          createResponse.status === 409
        ) {
          // Get existing env vars to find the ID
          const listResponse = await fetch(
            `${VERCEL_API}/v9/projects/${projectId}/env${teamQuery}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (listResponse.ok) {
            const listData = await listResponse.json();
            const existing = listData.envs?.find(
              (e: { key: string }) => e.key === envVar.key
            );

            if (existing) {
              await fetch(
                `${VERCEL_API}/v9/projects/${projectId}/env/${existing.id}${teamQuery}`,
                {
                  method: "PATCH",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    value: envVar.value,
                    type: envVar.type,
                    target: envVar.target,
                  }),
                }
              );
            }
          }
        } else {
          console.error(`Failed to set ${envVar.key}:`, errorData);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save config error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to save configuration",
      },
      { status: 500 }
    );
  }
}
