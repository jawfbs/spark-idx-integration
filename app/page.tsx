export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        color: "#e4e4e7",
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ─── NAVIGATION ─── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
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
            <span style={{ fontWeight: 600, fontSize: 15, color: "#ffffff", letterSpacing: "-0.01em" }}>
              Spark IDX
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a
              href="#how"
              style={{ fontSize: 13, color: "#71717a", textDecoration: "none" }}
            >
              How It Works
            </a>
            <a
              href="#features"
              style={{ fontSize: 13, color: "#71717a", textDecoration: "none" }}
            >
              Features
            </a>
            <a
              href="https://github.com/jawfbs/spark-idx-integration"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                textDecoration: "none",
                background: "#6366f1",
                padding: "8px 16px",
                borderRadius: 8,
              }}
            >
              Install
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section
        style={{
          position: "relative",
          paddingTop: 160,
          paddingBottom: 100,
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.08)",
              backgroundColor: "rgba(255,255,255,0.03)",
              fontSize: 12,
              fontWeight: 500,
              color: "#a1a1aa",
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
              }}
            />
            Powered by Spark API &amp; FBS
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2.8rem, 8vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              marginBottom: 24,
              color: "#ffffff",
            }}
          >
            The modern IDX
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              for Next.js
            </span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: 18,
              color: "#a1a1aa",
              maxWidth: 500,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Connect MLS listing data to your Vercel project with one click.
            Encrypted credentials, ISR caching, image optimization — all automatic.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <a
              href="https://github.com/jawfbs/spark-idx-integration"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 76 65" fill="currentColor">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
              Add to Vercel
            </a>
            <a
              href="https://github.com/jawfbs/spark-idx-starter"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e4e4e7",
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "none",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            >
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Starter Template
            </a>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section style={{ paddingBottom: 80 }}>
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#52525b",
              marginBottom: 16,
            }}
          >
            Built on trusted infrastructure
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              fontSize: 13,
              fontWeight: 500,
              color: "#52525b",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="12" height="12" viewBox="0 0 76 65" fill="currentColor">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
              Vercel
            </span>
            <span>⚡ Spark API</span>
            <span>🏢 FBS / Flexmls</span>
            <span>📊 200+ MLS</span>
          </div>
        </div>
      </section>

      {/* ─── CODE PREVIEW ─── */}
      <section style={{ paddingBottom: 100 }}>
        <div
          style={{
            maxWidth: 620,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
              background: "#0a0a0a",
            }}
          >
            {/* Title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 18px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#ff5f57",
                  }}
                />
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#febc2e",
                  }}
                />
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#28c840",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#52525b",
                  marginLeft: 6,
                }}
              >
                app/listings/page.tsx
              </span>
            </div>

            {/* Code */}
            <pre
              style={{
                padding: 24,
                overflowX: "auto",
                fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
                fontSize: 13,
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              <code>
                <span style={{ color: "#c084fc" }}>import</span>
                <span style={{ color: "#e4e4e7" }}>{" { SparkClient } "}</span>
                <span style={{ color: "#c084fc" }}>from</span>
                <span style={{ color: "#fbbf24" }}>{" '@spark-idx/next'"}</span>
                {"\n\n"}
                <span style={{ color: "#52525b" }}>{"// ISR: revalidate hourly"}</span>
                {"\n"}
                <span style={{ color: "#c084fc" }}>export const</span>
                <span style={{ color: "#e4e4e7" }}>{" revalidate = "}</span>
                <span style={{ color: "#34d399" }}>3600</span>
                {"\n\n"}
                <span style={{ color: "#c084fc" }}>export default</span>
                <span style={{ color: "#60a5fa" }}>{" async function"}</span>
                <span style={{ color: "#e4e4e7" }}>{" Page() {"}</span>
                {"\n"}
                <span style={{ color: "#c084fc" }}>{"  const"}</span>
                <span style={{ color: "#e4e4e7" }}>{" spark = "}</span>
                <span style={{ color: "#60a5fa" }}>new SparkClient</span>
                <span style={{ color: "#e4e4e7" }}>()</span>
                {"\n\n"}
                <span style={{ color: "#c084fc" }}>{"  const"}</span>
                <span style={{ color: "#e4e4e7" }}>{" { listings } = "}</span>
                <span style={{ color: "#c084fc" }}>await</span>
                <span style={{ color: "#e4e4e7" }}>{" spark.search({"}</span>
                {"\n"}
                <span style={{ color: "#e4e4e7" }}>{"    status: "}</span>
                <span style={{ color: "#fbbf24" }}>{"'Active'"}</span>
                <span style={{ color: "#e4e4e7" }}>,</span>
                {"\n"}
                <span style={{ color: "#e4e4e7" }}>{"    city: "}</span>
                <span style={{ color: "#fbbf24" }}>{"'Scottsdale'"}</span>
                <span style={{ color: "#e4e4e7" }}>,</span>
                {"\n"}
                <span style={{ color: "#e4e4e7" }}>{"    limit: "}</span>
                <span style={{ color: "#34d399" }}>24</span>
                {"\n"}
                <span style={{ color: "#e4e4e7" }}>{"  })"}</span>
                {"\n\n"}
                <span style={{ color: "#c084fc" }}>{"  return"}</span>
                <span style={{ color: "#e4e4e7" }}>{" <"}</span>
                <span style={{ color: "#60a5fa" }}>Grid</span>
                <span style={{ color: "#e4e4e7" }}>{">{listings.map(l =>"}</span>
                {"\n"}
                <span style={{ color: "#e4e4e7" }}>{"    <"}</span>
                <span style={{ color: "#60a5fa" }}>PropertyCard</span>
                <span style={{ color: "#c084fc" }}>{" key"}</span>
                <span style={{ color: "#e4e4e7" }}>{"={l.Id}"}</span>
                <span style={{ color: "#c084fc" }}>{" data"}</span>
                <span style={{ color: "#e4e4e7" }}>{"={l} />"}</span>
                {"\n"}
                <span style={{ color: "#e4e4e7" }}>{"  )}</"}</span>
                <span style={{ color: "#60a5fa" }}>Grid</span>
                <span style={{ color: "#e4e4e7" }}>{">"}</span>
                {"\n"}
                <span style={{ color: "#e4e4e7" }}>{"}"}</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" style={{ paddingBottom: 100 }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: 8,
            }}
          >
            How it works
          </h2>
          <p style={{ fontSize: 16, color: "#71717a", marginBottom: 48, maxWidth: 400 }}>
            From install to live MLS listings in under five minutes.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
              width: "100%",
            }}
          >
            {[
              {
                num: "01",
                emoji: "📦",
                title: "Install",
                desc: "Add Spark IDX from the Vercel Marketplace. Select a project to connect.",
                gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
              },
              {
                num: "02",
                emoji: "🔑",
                title: "Authenticate",
                desc: "Enter your Spark API key. We validate it live, then encrypt and store it on Vercel.",
                gradient: "linear-gradient(135deg, #a855f7, #c084fc)",
              },
              {
                num: "03",
                emoji: "🚀",
                title: "Ship",
                desc: "Import SparkClient in a Server Component. Fetch listings. Deploy. Done.",
                gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
              },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: step.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 16,
                    boxShadow: `0 8px 24px ${step.gradient.includes("6366") ? "rgba(99,102,241,0.2)" : step.gradient.includes("a855") ? "rgba(168,85,247,0.2)" : "rgba(236,72,153,0.2)"}`,
                  }}
                >
                  {step.emoji}
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "#6366f1",
                    marginBottom: 8,
                  }}
                >
                  Step {step.num}
                </span>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#ffffff", marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENV VARS ─── */}
      <section style={{ paddingBottom: 100 }}>
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: 8,
            }}
          >
            What gets provisioned
          </h2>
          <p style={{ fontSize: 15, color: "#71717a", marginBottom: 32, maxWidth: 380 }}>
            Encrypted environment variables, automatically set on your project.
          </p>

          <div
            style={{
              width: "100%",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
              background: "#0a0a0a",
            }}
          >
            <div
              style={{
                padding: "12px 18px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#52525b",
                }}
              >
                Environment Variables
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "#22c55e",
                  fontFamily: "monospace",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                  }}
                />
                auto-provisioned
              </span>
            </div>
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { name: "SPARK_API_KEY", tag: "encrypted", icon: "🔒", color: "#818cf8" },
                { name: "SPARK_API_SECRET", tag: "encrypted", icon: "🔒", color: "#818cf8" },
                { name: "SPARK_MLS_ID", tag: "plain", icon: "📋", color: "#60a5fa" },
                { name: "NEXT_PUBLIC_SPARK_IDX_ENABLED", tag: "true", icon: "✓", color: "#22c55e" },
              ].map((v) => (
                <div
                  key={v.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    fontFamily: "monospace",
                    fontSize: 12,
                  }}
                >
                  <span>{v.icon}</span>
                  <span style={{ flex: 1, textAlign: "left", color: "#e4e4e7" }}>{v.name}</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: v.color,
                      backgroundColor: `${v.color}15`,
                      padding: "2px 8px",
                      borderRadius: 100,
                    }}
                  >
                    {v.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" style={{ paddingBottom: 100 }}>
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: 8,
            }}
          >
            Everything for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              headless IDX
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "#71717a", marginBottom: 48, maxWidth: 440 }}>
            No iFrames, no legacy plugins. Just clean data and real performance.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: 12,
              width: "100%",
            }}
          >
            {[
              {
                icon: "⚡",
                title: "Auto-Provisioned",
                desc: "API keys are set as encrypted env vars on install. Zero manual setup.",
                border: "#6366f1",
              },
              {
                icon: "🔁",
                title: "ISR Built In",
                desc: "Listings revalidate every hour. Instant loads, always-fresh MLS data.",
                border: "#22c55e",
              },
              {
                icon: "📸",
                title: "Image Pipeline",
                desc: "MLS photos served as WebP/AVIF through Vercel Image Optimization.",
                border: "#0ea5e9",
              },
              {
                icon: "🔍",
                title: "SEO by Default",
                desc: "Server-rendered pages with meta tags, Open Graph, JSON-LD, auto sitemap.",
                border: "#eab308",
              },
              {
                icon: "🏠",
                title: "Full MLS Data",
                desc: "Listings, photos, open houses, agents — everything Spark API offers.",
                border: "#f43f5e",
              },
              {
                icon: "✅",
                title: "MLS Compliant",
                desc: "Built-in disclaimer component handles attribution and display rules.",
                border: "#a855f7",
              },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: 28,
                  textAlign: "left",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 24,
                    right: 24,
                    height: 2,
                    borderRadius: "0 0 2px 2px",
                    background: f.border,
                    opacity: 0.5,
                  }}
                />
                <div
                  style={{
                    fontSize: 28,
                    marginBottom: 12,
                    marginTop: 4,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: 6,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARISON ─── */}
      <section style={{ paddingBottom: 100 }}>
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: 8,
            }}
          >
            Legacy IDX vs.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Spark IDX
            </span>
          </h2>
          <p style={{ fontSize: 15, color: "#71717a", marginBottom: 40, maxWidth: 400 }}>
            Stop shipping slow iFrames. Ship fast, indexable, beautiful pages.
          </p>

          <div
            style={{
              width: "100%",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
              background: "#0a0a0a",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ padding: 14 }} />
              <div
                style={{
                  padding: 14,
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#52525b",
                  textAlign: "center",
                }}
              >
                Legacy
              </div>
              <div
                style={{
                  padding: 14,
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#818cf8",
                  textAlign: "center",
                  background: "rgba(99,102,241,0.03)",
                }}
              >
                Spark IDX
              </div>
            </div>

            {/* Rows */}
            {[
              ["Rendering", "iFrame embed", "Server Components"],
              ["SEO", "Not crawlable", "Full SSR + ISR"],
              ["TTFB", "2–5 seconds", "<100ms"],
              ["Design", "Fixed template", "Your design system"],
              ["Images", "Unoptimized JPG", "WebP/AVIF auto"],
              ["Mobile", "Barely responsive", "Mobile-first"],
              ["Setup", "Days or weeks", "5 minutes"],
            ].map((row, i, arr) => (
              <div
                key={row[0]}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  borderBottom:
                    i < arr.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                  fontSize: 13,
                }}
              >
                <div style={{ padding: "12px 14px", color: "#a1a1aa", fontWeight: 500, textAlign: "left" }}>
                  {row[0]}
                </div>
                <div
                  style={{
                    padding: "12px 14px",
                    borderLeft: "1px solid rgba(255,255,255,0.04)",
                    color: "#52525b",
                    textAlign: "center",
                  }}
                >
                  <span style={{ color: "#f43f5e", marginRight: 6 }}>✕</span>
                  {row[1]}
                </div>
                <div
                  style={{
                    padding: "12px 14px",
                    borderLeft: "1px solid rgba(255,255,255,0.04)",
                    color: "#e4e4e7",
                    textAlign: "center",
                    background: "rgba(99,102,241,0.02)",
                  }}
                >
                  <span style={{ color: "#22c55e", marginRight: 6 }}>✓</span>
                  {row[2]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ paddingBottom: 100 }}>
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 12,
          }}
        >
          {[
            { val: "200+", label: "MLS Systems", color: "#818cf8" },
            { val: "1.5M+", label: "Agents Served", color: "#f472b6" },
            { val: "<100ms", label: "Avg TTFB", color: "#34d399" },
            { val: "5 min", label: "Setup Time", color: "#fbbf24" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "28px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  fontWeight: 700,
                  color: s.color,
                  marginBottom: 4,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#52525b",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ paddingBottom: 100 }}>
        <div
          style={{
            maxWidth: 620,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#0a0a0a",
              padding: "64px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {/* Background glow */}
            <div
              style={{
                position: "absolute",
                top: -80,
                left: "50%",
                transform: "translateX(-50%)",
                width: 400,
                height: 300,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  marginBottom: 12,
                }}
              >
                Ready to{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ship?
                </span>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "#71717a",
                  maxWidth: 380,
                  marginBottom: 32,
                  lineHeight: 1.7,
                }}
              >
                Install the integration in under a minute. Deploy the starter
                template. Go live with MLS listings today.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <a
                  href="https://github.com/jawfbs/spark-idx-integration"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 28px",
                    borderRadius: 12,
                    background: "#ffffff",
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 76 65" fill="currentColor">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                  Install on Vercel
                </a>
                <a
                  href="https://sparkplatform.com/docs/overview/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 28px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e4e4e7",
                    fontWeight: 500,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  Read the Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 20 20"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinejoin="round"
              >
                <path d="M6 14V8L10 6L14 8V14L10 12L6 14Z" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#a1a1aa" }}>
              Spark IDX
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 20,
              fontSize: 12,
              color: "#52525b",
            }}
          >
            <a href="https://sparkplatform.com" style={{ color: "inherit", textDecoration: "none" }}>
              Spark Platform
            </a>
            <a href="https://sparkplatform.com/docs" style={{ color: "inherit", textDecoration: "none" }}>
              Docs
            </a>
            <a href="https://github.com/jawfbs/spark-idx-integration" style={{ color: "inherit", textDecoration: "none" }}>
              GitHub
            </a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy
            </a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Terms
            </a>
          </div>
          <p style={{ fontSize: 11, color: "#3f3f46" }}>
            © 2025 Spark IDX · Built with Spark API by FBS · Not affiliated with Vercel Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
