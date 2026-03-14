const SPARK_API_URL = "https://sparkapi.com/v1";
const SPARK_REPLICATION_URL = "https://replication.sparkapi.com";

export interface SparkAuthStandard {
  mode: "standard";
  apiKey: string;
  apiSecret: string;
}

export interface SparkAuthReplication {
  mode: "replication";
  oauthKey: string;
  accessToken: string;
}

export type SparkAuth = SparkAuthStandard | SparkAuthReplication;

export interface SparkValidationResult {
  valid: boolean;
  message: string;
  mlsName?: string;
  systemName?: string;
  listingCount?: number;
  mode?: string;
}

/**
 * Validate Spark API credentials — supports both modes
 */
export async function validateSparkCredentials(
  auth: SparkAuth
): Promise<SparkValidationResult> {
  try {
    if (auth.mode === "replication") {
      return await validateReplicationToken(auth);
    } else {
      return await validateStandardCredentials(auth);
    }
  } catch (error) {
    return {
      valid: false,
      message:
        error instanceof Error ? error.message : "Unknown validation error",
    };
  }
}

/**
 * Standard Spark API validation (API Key + Secret)
 */
async function validateStandardCredentials(
  auth: SparkAuthStandard
): Promise<SparkValidationResult> {
  // Step 1: Get session token
  const sessionResponse = await fetch(`${SPARK_API_URL}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-SparkApi-User-Agent": "SparkIDXVercelIntegration/1.0",
    },
    body: JSON.stringify({
      D: {
        ApiKey: auth.apiKey,
        ApiSig: auth.apiSecret,
      },
    }),
  });

  if (!sessionResponse.ok) {
    const status = sessionResponse.status;
    if (status === 401 || status === 403) {
      return {
        valid: false,
        message: `Authentication failed (${status}). Check your API Key and Secret.`,
      };
    }
    return {
      valid: false,
      message: `Spark API returned status ${status}`,
    };
  }

  // Step 2: Try to fetch system info
  const sessionData = await sessionResponse.json();
  const token =
    sessionData?.D?.Results?.[0]?.AuthToken || sessionData?.D?.AuthToken;

  if (!token) {
    return {
      valid: false,
      message: "Authentication succeeded but no token was returned.",
    };
  }

  // Step 3: Get system info
  try {
    const systemResponse = await fetch(`${SPARK_API_URL}/system`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-SparkApi-User-Agent": "SparkIDXVercelIntegration/1.0",
      },
    });

    if (systemResponse.ok) {
      const systemData = await systemResponse.json();
      const system = systemData?.D?.Results?.[0];
      return {
        valid: true,
        message: "Connected successfully",
        mlsName: system?.Name || "Unknown MLS",
        systemName: system?.Mls || system?.Name || "Spark API",
        mode: "standard",
      };
    }
  } catch {
    // System info is optional
  }

  return {
    valid: true,
    message: "Connected successfully",
    mode: "standard",
  };
}

/**
 * Replication token validation (Bearer Token)
 */
async function validateReplicationToken(
  auth: SparkAuthReplication
): Promise<SparkValidationResult> {
  // Try the replication endpoint first
  const endpoints = [
    `${SPARK_REPLICATION_URL}/v1/listings?_limit=1`,
    `${SPARK_REPLICATION_URL}/v1/system`,
    `${SPARK_API_URL}/listings?_limit=1`,
    `${SPARK_API_URL}/system`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "X-SparkApi-User-Agent": "SparkIDXVercelIntegration/1.0",
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Try to extract useful info
        const results = data?.D?.Results;
        const totalCount =
          data?.D?.Pagination?.TotalRows || results?.length || 0;

        // Check if this was a system endpoint
        if (endpoint.includes("/system") && results?.[0]) {
          return {
            valid: true,
            message: "Replication token validated successfully",
            mlsName: results[0]?.Name || "Demo MLS",
            systemName: results[0]?.Mls || results[0]?.Name || "Spark API",
            listingCount: totalCount,
            mode: "replication",
          };
        }

        return {
          valid: true,
          message: "Replication token validated successfully",
          listingCount: totalCount,
          mode: "replication",
        };
      }

      if (response.status === 401 || response.status === 403) {
        continue; // Try next endpoint
      }
    } catch {
      continue; // Try next endpoint
    }
  }

  // If all endpoints failed, try one more with the OAuth key as API key header
  try {
    const response = await fetch(
      `${SPARK_REPLICATION_URL}/v1/listings?_limit=1`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "X-SparkApi-User-Key": auth.oauthKey,
          "X-SparkApi-User-Agent": "SparkIDXVercelIntegration/1.0",
        },
      }
    );

    if (response.ok) {
      return {
        valid: true,
        message: "Replication token validated successfully",
        mode: "replication",
      };
    }

    return {
      valid: false,
      message: `Authentication failed (${response.status}). Check your OAuth Key and Access Token.`,
    };
  } catch (error) {
    return {
      valid: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not connect to Spark API",
    };
  }
}
