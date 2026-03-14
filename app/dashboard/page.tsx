"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Project {
  id: string;
  name: string;
  framework: string | null;
}

interface ValidationResult {
  valid: boolean;
  message: string;
  mlsName?: string;
  systemName?: string;
  listingCount?: number;
  mode?: string;
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || searchParams.get("accessToken");
  const configurationId = searchParams.get("configurationId");
  const teamId = searchParams.get("teamId");
  const userId = searchParams.get("userId");
  const next = searchParams.get("next");

  const [step, setStep] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auth mode
  const [authMode, setAuthMode] = useState<"standard" | "replication">("standard");

  // Standard fields
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  // Replication fields
  const [oauthKey, setOauthKey] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // Common
  const [mlsId, setMlsId] = useState("");
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const teamQuery = teamId ? `?teamId=${teamId}` : "";
      const res = await fetch(
        `https://api.vercel.com/v9/projects${teamQuery}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(
        data.projects?.map((p: { id: string; name: string; framework: string | null }) => ({
          id: p.id,
          name: p.name,
          framework: p.framework,
        })) || []
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [token, teamId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Validate credentials
  const handleValidate = async () => {
    setLoading(true);
    setError("");
    setValidation(null);
    try {
      const body =
        authMode === "replication"
          ? { mode: "replication", oauthKey, accessToken }
          : { mode: "standard", apiKey, apiSecret };

      const res = await fetch("/api/validate-spark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setValidation(data);
      if (data.valid) {
        setStep(3);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Validation failed");
    } finally {
      setLoading(false);
    }
  };

  // Save configuration
  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const body: Record<string, string | undefined> = {
        accessToken: token || "",
        projectId: selectedProject,
        teamId: teamId || undefined,
        mode: authMode,
        sparkMlsId: mlsId || undefined,
      };

      if (authMode === "replication") {
        body.sparkOauthKey = oauthKey;
        body.sparkAccessToken = accessToken;
      } else {
        body.sparkApiKey = apiKey;
        body.sparkApiSecret = apiSecret;
      }

      const res = await fetch("/api/save-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setStep(4);
      } else {
        setError(data.error || "Failed to save");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#e4e4e7",
    fontFamily: "'Inter', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 560,
    backgroundColor: "#0a0a0a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "40px 32px",
    marginTop: 40,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#a1a1aa",
    marginBottom: 8,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.03)",
    color: "#e4e4e7",
    fontSize: 14,
    fontFamily: "'Geist Mono', monospace",
    outline: "none",
    marginBottom: 16,
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: "pointer",
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2371717a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center",
    paddingRight: 40,
  };

  const primaryBtnStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 24px",
    borderRadius: 12,
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    border: "none",
    cursor: "pointer",
    marginTop: 8,
    opacity: loading ? 0.6 : 1,
  };

  const secondaryBtnStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 24px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "transparent",
    color: "#e4e4e7",
    fontWeight: 500,
    fontSize: 14,
    cursor: "pointer",
    marginTop: 8,
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "12px 16px",
    borderRadius: 10,
    border: active ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.06)",
    backgroundColor: active ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.02)",
    color: active ? "#818cf8" : "#71717a",
    fontWeight: 500,
    fontSize: 13,
    cursor: "pointer",
    textAlign: "center" as const,
    transition: "all 0.2s",
  });

  const envRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.04)",
    fontFamily: "monospace",
    fontSize: 12,
    marginBottom: 8,
  };

  const stepIndicatorStyle = (s: number): React.CSSProperties => ({
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 600,
    backgroundColor:
      s < step ? "#22c55e" : s === step ? "#6366f1" : "rgba(255,255,255,0.05)",
    color: s <= step ? "#fff" : "#52525b",
    border:
      s === step
        ? "2px solid rgba(99,102,241,0.4)"
        : "2px solid transparent",
  });

  const stepLabelStyle = (s: number): React.CSSProperties => ({
    fontSize: 11,
    fontWeight: 500,
    color: s <= step ? "#a1a1aa" : "#3f3f46",
    marginTop: 6,
  });

  if (!token) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 8 }}>
              No Access Token
            </h2>
            <p style={{ fontSize: 14, color: "#71717a", marginBottom: 24, lineHeight: 1.6 }}>
              This page should be accessed through the Vercel integration install flow.
              Please install the integration from the Vercel Marketplace.
            </p>
            <a
              href="https://vercel.com/integrations/spark-idx/new"
              style={{
                ...primaryBtnStyle,
                display: "inline-block",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Install from Marketplace
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 24,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            <path d="M6 14V8L10 6L14 8V14L10 12L6 14Z" />
            <path d="M10 6V12" />
          </svg>
        </div>
        <span style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>
          Spark IDX Setup
        </span>
      </div>

      {/* Step Indicators */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 32,
          marginTop: 32,
          width: "100%",
          maxWidth: 560,
        }}
      >
        {[
          { num: 1, label: "Project" },
          { num: 2, label: "Credentials" },
          { num: 3, label: "Review" },
          { num: 4, label: "Done" },
        ].map((s) => (
          <div
            key={s.num}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={stepIndicatorStyle(s.num)}>
              {s.num < step ? "✓" : s.num}
            </div>
            <span style={stepLabelStyle(s.num)}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Card */}
      <div style={cardStyle}>
        {/* Error */}
        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              backgroundColor: "rgba(244,63,94,0.1)",
              border: "1px solid rgba(244,63,94,0.2)",
              color: "#fb7185",
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            {error}
          </div>
        )}

        {/* ─── STEP 1: Select Project ─── */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 4 }}>
              Select a Project
            </h2>
            <p style={{ fontSize: 14, color: "#71717a", marginBottom: 24 }}>
              Choose the Vercel project that will receive MLS data.
            </p>

            {loading ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#71717a", fontSize: 14 }}>
                Loading projects...
              </div>
            ) : projects.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#71717a", fontSize: 14 }}>
                No projects found. Create a project on Vercel first.
              </div>
            ) : (
              <>
                <label style={labelStyle}>Project</label>
                <select
                  style={selectStyle}
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option value="">Select a project...</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} {p.framework ? `(${p.framework})` : ""}
                    </option>
                  ))}
                </select>

                <button
                  style={{
                    ...primaryBtnStyle,
                    opacity: !selectedProject ? 0.4 : 1,
                    cursor: !selectedProject ? "not-allowed" : "pointer",
                  }}
                  onClick={() => selectedProject && setStep(2)}
                  disabled={!selectedProject}
                >
                  Continue
                </button>
              </>
            )}
          </div>
        )}

        {/* ─── STEP 2: Credentials ─── */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 4 }}>
              Spark API Credentials
            </h2>
            <p style={{ fontSize: 14, color: "#71717a", marginBottom: 24 }}>
              Enter your credentials from{" "}
              <a
                href="https://sparkplatform.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#818cf8", textDecoration: "none" }}
              >
                sparkplatform.com
              </a>
            </p>

            {/* Auth Mode Tabs */}
            <label style={{ ...labelStyle, marginBottom: 12 }}>Authentication Method</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <button
                style={tabStyle(authMode === "standard")}
                onClick={() => setAuthMode("standard")}
              >
                🔑 API Key + Secret
              </button>
              <button
                style={tabStyle(authMode === "replication")}
                onClick={() => setAuthMode("replication")}
              >
                🔄 Replication Token
              </button>
            </div>

            {authMode === "standard" ? (
              <>
                <label style={labelStyle}>API Key</label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Your Spark API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />

                <label style={labelStyle}>API Secret</label>
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="Your Spark API Secret"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                />
              </>
            ) : (
              <>
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    backgroundColor: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.15)",
                    color: "#a1a1aa",
                    fontSize: 12,
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  <strong style={{ color: "#818cf8" }}>Replication Mode</strong>
                  <br />
                  Uses a bearer token to access the replication endpoint at{" "}
                  <code style={{ color: "#c084fc", fontSize: 11 }}>
                    replication.sparkapi.com
                  </code>
                  .{" "}
                  <a
                    href="http://sparkplatform.com/docs/authentication/access_token"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#818cf8", textDecoration: "underline" }}
                  >
                    Learn more
                  </a>
                </div>

                <label style={labelStyle}>OAuth Key</label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Your OAuth Key"
                  value={oauthKey}
                  onChange={(e) => setOauthKey(e.target.value)}
                />

                <label style={labelStyle}>Access Token (Bearer Token)</label>
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="Your Access Token"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                />
              </>
            )}

            <label style={labelStyle}>MLS ID (optional)</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="e.g. Demomls"
              value={mlsId}
              onChange={(e) => setMlsId(e.target.value)}
            />

            {/* Validation result */}
            {validation && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  backgroundColor: validation.valid
                    ? "rgba(34,197,94,0.1)"
                    : "rgba(244,63,94,0.1)",
                  border: `1px solid ${
                    validation.valid
                      ? "rgba(34,197,94,0.2)"
                      : "rgba(244,63,94,0.2)"
                  }`,
                  color: validation.valid ? "#4ade80" : "#fb7185",
                  fontSize: 13,
                  marginBottom: 16,
                }}
              >
                {validation.valid ? "✓" : "✕"} {validation.message}
                {validation.mlsName && (
                  <span style={{ display: "block", fontSize: 12, marginTop: 4, opacity: 0.8 }}>
                    MLS: {validation.mlsName}
                    {validation.listingCount !== undefined &&
                      ` · ${validation.listingCount.toLocaleString()} listings`}
                  </span>
                )}
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button style={secondaryBtnStyle} onClick={() => setStep(1)}>
                Back
              </button>
              <button
                style={{
                  ...primaryBtnStyle,
                  opacity:
                    loading ||
                    (authMode === "standard" ? !apiKey || !apiSecret : !oauthKey || !accessToken)
                      ? 0.4
                      : 1,
                }}
                onClick={handleValidate}
                disabled={
                  loading ||
                  (authMode === "standard" ? !apiKey || !apiSecret : !oauthKey || !accessToken)
                }
              >
                {loading ? "Validating..." : "Validate & Continue"}
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: Review ─── */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 4 }}>
              Review & Save
            </h2>
            <p style={{ fontSize: 14, color: "#71717a", marginBottom: 24 }}>
              These environment variables will be set on your project.
            </p>

            {/* Project name */}
            <div
              style={{
                ...envRowStyle,
                backgroundColor: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.12)",
                marginBottom: 16,
              }}
            >
              <span>📁</span>
              <span style={{ flex: 1, color: "#a1a1aa", fontSize: 11 }}>PROJECT</span>
              <span style={{ color: "#fff", fontSize: 13 }}>
                {projects.find((p) => p.id === selectedProject)?.name}
              </span>
            </div>

            <div
              style={{
                ...envRowStyle,
                backgroundColor: "rgba(168,85,247,0.06)",
                border: "1px solid rgba(168,85,247,0.12)",
                marginBottom: 20,
              }}
            >
              <span>🔄</span>
              <span style={{ flex: 1, color: "#a1a1aa", fontSize: 11 }}>AUTH MODE</span>
              <span style={{ color: "#c084fc", fontSize: 13 }}>
                {authMode === "replication" ? "Replication Token" : "API Key + Secret"}
              </span>
            </div>

            {/* Env vars preview */}
            {authMode === "replication" ? (
              <>
                <div style={envRowStyle}>
                  <span>🔒</span>
                  <span style={{ flex: 1, textAlign: "left", color: "#e4e4e7" }}>SPARK_OAUTH_KEY</span>
                  <span style={{ fontSize: 10, color: "#818cf8" }}>encrypted</span>
                </div>
                <div style={envRowStyle}>
                  <span>🔒</span>
                  <span style={{ flex: 1, textAlign: "left", color: "#e4e4e7" }}>SPARK_ACCESS_TOKEN</span>
                  <span style={{ fontSize: 10, color: "#818cf8" }}>encrypted</span>
                </div>
                <div style={envRowStyle}>
                  <span>📋</span>
                  <span style={{ flex: 1, textAlign: "left", color: "#e4e4e7" }}>SPARK_REPLICATION_URL</span>
                  <span style={{ fontSize: 10, color: "#60a5fa" }}>plain</span>
                </div>
              </>
            ) : (
              <>
                <div style={envRowStyle}>
                  <span>🔒</span>
                  <span style={{ flex: 1, textAlign: "left", color: "#e4e4e7" }}>SPARK_API_KEY</span>
                  <span style={{ fontSize: 10, color: "#818cf8" }}>encrypted</span>
                </div>
                <div style={envRowStyle}>
                  <span>🔒</span>
                  <span style={{ flex: 1, textAlign: "left", color: "#e4e4e7" }}>SPARK_API_SECRET</span>
                  <span style={{ fontSize: 10, color: "#818cf8" }}>encrypted</span>
                </div>
              </>
            )}

            <div style={envRowStyle}>
              <span>📋</span>
              <span style={{ flex: 1, textAlign: "left", color: "#e4e4e7" }}>SPARK_AUTH_MODE</span>
              <span style={{ fontSize: 10, color: "#60a5fa" }}>{authMode}</span>
            </div>

            {mlsId && (
              <div style={envRowStyle}>
                <span>📋</span>
                <span style={{ flex: 1, textAlign: "left", color: "#e4e4e7" }}>SPARK_MLS_ID</span>
                <span style={{ fontSize: 10, color: "#60a5fa" }}>{mlsId}</span>
              </div>
            )}

            <div style={envRowStyle}>
              <span>✓</span>
              <span style={{ flex: 1, textAlign: "left", color: "#e4e4e7" }}>
                NEXT_PUBLIC_SPARK_IDX_ENABLED
              </span>
              <span style={{ fontSize: 10, color: "#22c55e" }}>true</span>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button style={secondaryBtnStyle} onClick={() => setStep(2)}>
                Back
              </button>
              <button
                style={{ ...primaryBtnStyle, opacity: loading ? 0.4 : 1 }}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save & Deploy"}
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: Success ─── */}
        {step === 4 && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.1)",
                border: "2px solid rgba(34,197,94,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                margin: "0 auto 20px",
              }}
            >
              ✓
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 8 }}>
              You&apos;re all set!
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#71717a",
                marginBottom: 32,
                lineHeight: 1.6,
                maxWidth: 360,
                margin: "0 auto 32px",
              }}
            >
              Environment variables have been saved to your project.
              {authMode === "replication"
                ? " Your replication token is encrypted and ready to use."
                : " Your API credentials are encrypted and ready to use."}
            </p>

            <div
              style={{
                padding: 20,
                borderRadius: 12,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                textAlign: "left",
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#a1a1aa",
                  marginBottom: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Next Steps
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: "#818cf8", fontSize: 14, marginTop: 1 }}>1.</span>
                  <span style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.5 }}>
                    Install the{" "}
                    <code
                      style={{
                        fontSize: 12,
                        color: "#c084fc",
                        background: "rgba(139,92,246,0.1)",
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                    >
                      @spark-idx/next
                    </code>{" "}
                    package in your project
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: "#818cf8", fontSize: 14, marginTop: 1 }}>2.</span>
                  <span style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.5 }}>
                    Import <code style={{ fontSize: 12, color: "#c084fc", background: "rgba(139,92,246,0.1)", padding: "2px 6px", borderRadius: 4 }}>SparkClient</code> and start fetching listings
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: "#818cf8", fontSize: 14, marginTop: 1 }}>3.</span>
                  <span style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.5 }}>
                    Deploy your project — env vars are already provisioned
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <a
                href="https://sparkplatform.com/docs/overview/api"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...secondaryBtnStyle,
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                }}
              >
                Read Docs
              </a>
              <a
                href={`https://vercel.com/dashboard/${teamId ? `team_${teamId}/` : ""}${projects.find((p) => p.id === selectedProject)?.name || ""}`}
                style={{
                  ...primaryBtnStyle,
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                }}
              >
                Go to Project →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Configuration ID */}
      {configurationId && (
        <p
          style={{
            fontSize: 10,
            color: "#3f3f46",
            marginTop: 16,
            fontFamily: "monospace",
          }}
        >
          Configuration: {configurationId}
        </p>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#71717a",
            fontSize: 14,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Loading...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
