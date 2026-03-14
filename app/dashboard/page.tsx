"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
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
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken") || "";
  const teamId = searchParams.get("teamId") || null;
  const configurationId = searchParams.get("configurationId") || "";
  const nextUrl = searchParams.get("next") || "";

  const [step, setStep] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [sparkApiKey, setSparkApiKey] = useState("");
  const [sparkApiSecret, setSparkApiSecret] = useState("");
  const [sparkMlsId, setSparkMlsId] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [saveResult, setSaveResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    if (!accessToken) return;
    try {
      const params = new URLSearchParams();
      if (teamId) params.set("teamId", teamId);

      const response = await fetch(
        `https://api.vercel.com/v9/projects?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setProjectsLoading(false);
    }
  }, [accessToken, teamId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  async function validateSparkKey() {
    setIsValidating(true);
    setValidation(null);

    try {
      const response = await fetch("/api/validate-spark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: sparkApiKey,
          apiSecret: sparkApiSecret,
        }),
      });
      const result = await response.json();
      setValidation(result);
      if (result.valid) {
        setStep(3);
      }
    } catch {
      setValidation({ valid: false, message: "Validation request failed" });
    } finally {
      setIsValidating(false);
    }
  }

  async function saveConfiguration() {
    setIsSaving(true);
    setSaveResult(null);

    try {
      const response = await fetch("/api/save-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken,
          projectId: selectedProject,
          teamId,
          sparkApiKey,
          sparkApiSecret,
          sparkMlsId,
        }),
      });

      if (response.ok) {
        setSaveResult({
          success: true,
          message: "Environment variables set successfully!",
        });
        setStep(4);
      } else {
        const error = await response.json();
        setSaveResult({
          success: false,
          message: error.error || "Failed to save",
        });
      }
    } catch {
      setSaveResult({ success: false, message: "Network error" });
    } finally {
      setIsSaving(false);
    }
  }

  if (!accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-primary p-6">
        <div className="glass-card p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Authentication Required
          </h2>
          <p className="text-text-secondary text-sm">
            Please install this integration from the Vercel Marketplace to get
            started.
          </p>
          <a
            href="https://vercel.com/integrations"
            className="inline-block mt-6 px-6 py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
          >
            Go to Vercel Marketplace
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary p-6">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-spark-orange), transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-spark-orange to-spark-pink flex items-center justify-center text-white font-bold">
            S
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">
              Spark IDX Configuration
            </h1>
            <p className="text-sm text-text-secondary">
              Connect your Spark API credentials to this Vercel project
            </p>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-3 mb-10">
          {["Select Project", "Spark Credentials", "MLS Settings", "Done"].map(
            (label, i) => (
              <div key={i} className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      step > i + 1
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : step === i + 1
                          ? "bg-spark-orange/20 text-spark-orange border border-spark-orange/30"
                          : "bg-surface-tertiary text-text-muted border border-border-subtle"
                    }`}
                  >
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs hidden sm:block ${step === i + 1 ? "text-text-primary" : "text-text-muted"}`}
                  >
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div
                    className={`h-px flex-1 ${step > i + 1 ? "bg-green-500/30" : "bg-border-subtle"}`}
                  />
                )}
              </div>
            )
          )}
        </div>

        {/* Step 1: Select Project */}
        {step === 1 && (
          <div className="glass-card p-6 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-text-primary mb-1">
              Select a project
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Choose which Vercel project should receive the Spark API
              environment variables.
            </p>

            {projectsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 rounded-xl bg-surface-tertiary animate-pulse"
                  />
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-10 text-text-muted">
                <p className="text-3xl mb-2">📁</p>
                <p>No projects found. Create a Next.js project on Vercel first.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project.id);
                      setStep(2);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all hover:border-spark-orange/40 hover:bg-spark-orange/5 ${
                      selectedProject === project.id
                        ? "border-spark-orange/50 bg-spark-orange/5"
                        : "border-border-subtle bg-surface-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-primary">
                          {project.name}
                        </div>
                        <div className="text-xs text-text-muted mt-1">
                          {project.framework || "No framework detected"}
                        </div>
                      </div>
                      <span className="text-text-muted text-lg">→</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Spark API Credentials */}
        {step === 2 && (
          <div className="glass-card p-6 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-text-primary mb-1">
              Spark API Credentials
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Enter your Spark API credentials from{" "}
              <a
                href="https://sparkplatform.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="text-spark-orange hover:underline"
              >
                sparkplatform.com
              </a>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  API Key <span className="text-spark-orange">*</span>
                </label>
                <input
                  type="text"
                  value={sparkApiKey}
                  onChange={(e) => setSparkApiKey(e.target.value)}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-subtle text-text-primary placeholder-text-muted font-mono text-sm focus:outline-none focus:ring-2 focus:ring-spark-orange/40 focus:border-spark-orange/40 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  API Secret
                </label>
                <input
                  type="password"
                  value={sparkApiSecret}
                  onChange={(e) => setSparkApiSecret(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-subtle text-text-primary placeholder-text-muted font-mono text-sm focus:outline-none focus:ring-2 focus:ring-spark-orange/40 focus:border-spark-orange/40 transition-all"
                />
              </div>

              {validation && !validation.valid && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  ✕ {validation.message}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-border-default text-text-secondary text-sm font-medium hover:bg-surface-elevated transition-all"
                >
                  Back
                </button>
                <button
                  onClick={validateSparkKey}
                  disabled={!sparkApiKey || isValidating}
                  className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-spark-orange to-spark-pink text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-spark-orange/20 transition-all"
                >
                  {isValidating ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Validating...
                    </span>
                  ) : (
                    "Validate & Continue"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: MLS Configuration */}
        {step === 3 && (
          <div className="glass-card p-6 animate-fade-in-up">
            {/* Validation Success Banner */}
            {validation?.valid && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">✓</span>
                  <div>
                    <div className="font-medium text-green-400 text-sm">
                      Connected to Spark API
                    </div>
                    <div className="text-xs text-green-400/70 mt-1">
                      {validation.systemName || validation.mlsName} •{" "}
                      {validation.listingCount?.toLocaleString() || "?"}{" "}
                      listings available
                    </div>
                  </div>
                </div>
              </div>
            )}

            <h2 className="text-lg font-semibold text-text-primary mb-1">
              MLS Configuration
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Optional. Specify which MLS to pull listings from.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  MLS ID
                  <span className="text-text-muted font-normal ml-1">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={sparkMlsId}
                  onChange={(e) => setSparkMlsId(e.target.value)}
                  placeholder="e.g., 20140101135053834684000000"
                  className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-subtle text-text-primary placeholder-text-muted font-mono text-sm focus:outline-none focus:ring-2 focus:ring-spark-orange/40 focus:border-spark-orange/40 transition-all"
                />
                <p className="text-xs text-text-muted mt-2">
                  Leave blank to use the default MLS associated with your API
                  key.
                </p>
              </div>

              {/* What will be set */}
              <div className="p-4 rounded-xl bg-surface-secondary border border-border-subtle">
                <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">
                  Environment variables to be set
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-spark-teal">SPARK_API_KEY</span>
                    <span className="text-text-muted">
                      {sparkApiKey.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-spark-teal">SPARK_API_SECRET</span>
                    <span className="text-text-muted">
                      {sparkApiSecret ? "••••••••" : "(empty)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-spark-teal">SPARK_MLS_ID</span>
                    <span className="text-text-muted">
                      {sparkMlsId || "(default)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-spark-teal">
                      NEXT_PUBLIC_SPARK_IDX_ENABLED
                    </span>
                    <span className="text-green-400">true</span>
                  </div>
                </div>
              </div>

              {saveResult && !saveResult.success && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  ✕ {saveResult.message}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-border-default text-text-secondary text-sm font-medium hover:bg-surface-elevated transition-all"
                >
                  Back
                </button>
                <button
                  onClick={saveConfiguration}
                  disabled={isSaving}
                  className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-spark-orange to-spark-pink text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-spark-orange/20 transition-all"
                >
                  {isSaving ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save & Deploy"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="glass-card p-8 text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              You&apos;re all set!
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Spark API credentials have been saved as encrypted environment
              variables to your Vercel project. Your next deployment will have
              access to MLS data.
            </p>

            {/* Next steps */}
            <div className="text-left max-w-md mx-auto mb-8 space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-secondary">
                <span className="text-spark-orange font-bold">1</span>
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    Install the SDK
                  </div>
                  <code className="text-xs text-text-muted font-mono">
                    npm install @spark-idx/next
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-secondary">
                <span className="text-spark-orange font-bold">2</span>
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    Import and use in Server Components
                  </div>
                  <code className="text-xs text-text-muted font-mono">
                    {`import { SparkClient } from '@spark-idx/next'`}
                  </code>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-secondary">
                <span className="text-spark-orange font-bold">3</span>
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    Or deploy our starter template
                  </div>
                  <code className="text-xs text-text-muted font-mono">
                    github.com/you/spark-idx-starter
                  </code>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              {nextUrl && (
                <a
                  href={nextUrl}
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
                >
                  Return to Vercel →
                </a>
              )}
              <a
                href="https://sparkplatform.com/docs/overview/api"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl border border-border-default text-text-primary font-medium text-sm hover:bg-surface-elevated transition-all"
              >
                View Spark API Docs
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-surface-primary">
          <div className="w-8 h-8 border-2 border-spark-orange/30 border-t-spark-orange rounded-full animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
