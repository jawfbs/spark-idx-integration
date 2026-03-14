import { VERCEL_API_BASE } from "./constants";

interface VercelTokenResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  team_id?: string | null;
}

interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
}

export async function exchangeCodeForToken(
  code: string
): Promise<VercelTokenResponse> {
  const response = await fetch(`${VERCEL_API_BASE}/v2/oauth/access_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.INTEGRATION_CLIENT_ID!,
      client_secret: process.env.INTEGRATION_CLIENT_SECRET!,
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/callback`,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json();
}

export async function getProjects(
  accessToken: string,
  teamId?: string | null
): Promise<VercelProject[]> {
  const params = new URLSearchParams();
  if (teamId) params.set("teamId", teamId);

  const response = await fetch(
    `${VERCEL_API_BASE}/v9/projects?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await response.json();
  return data.projects;
}

export async function setEnvironmentVariables(
  accessToken: string,
  projectId: string,
  envVars: { key: string; value: string; target: string[] }[],
  teamId?: string | null
): Promise<void> {
  const params = new URLSearchParams();
  if (teamId) params.set("teamId", teamId);

  const response = await fetch(
    `${VERCEL_API_BASE}/v10/projects/${projectId}/env?${params.toString()}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(envVars),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to set env vars: ${error}`);
  }
}

export async function removeConfiguration(
  accessToken: string,
  configId: string,
  teamId?: string | null
): Promise<void> {
  const params = new URLSearchParams();
  if (teamId) params.set("teamId", teamId);

  const response = await fetch(
    `${VERCEL_API_BASE}/v1/integrations/configuration/${configId}?${params.toString()}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove configuration");
  }
}
