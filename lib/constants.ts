export const VERCEL_API_BASE = "https://api.vercel.com";
export const SPARK_API_BASE = "https://sparkapi.com/v1";
export const SPARK_AUTH_URL = "https://sparkplatform.com/oauth2";

export const INTEGRATION_SCOPES = [
  "read-projects",
  "read-deployments",
  "write-env-vars",
] as const;

export const SPARK_ENV_VARS = {
  SPARK_API_KEY: {
    description: "Your Spark API key from FBS",
    required: true,
  },
  SPARK_API_SECRET: {
    description: "Your Spark API secret from FBS",
    required: true,
  },
  SPARK_MLS_ID: {
    description: "The MLS system ID to pull listings from",
    required: true,
  },
  NEXT_PUBLIC_SPARK_IDX_ENABLED: {
    description: "Flag to enable Spark IDX features",
    required: false,
    default: "true",
  },
} as const;
