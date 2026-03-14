export default function HomePage() {
  return (
    <div className="min-h-screen grid-bg relative">
      {/* ── Ambient Orbs ─────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="orb w-[700px] h-[700px] bg-accent/10 top-[-15%] left-1/2 -translate-x-1/2" />
        <div className="orb w-[500px] h-[500px] bg-hot/8 bottom-[10%] left-[-5%]" />
        <div className="orb w-[400px] h-[400px] bg-mint/6 top-[40%] right-[-5%]" />
      </div>

      {/* ── Nav ──────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-bg/70 border-b border-stroke">
        <div className="max-w-6xl mx-auto h-[60px] px-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round">
                <path d="M6 14V8L10 6L14 8V14L10 12L6 14Z" />
                <path d="M10 6V12" />
              </svg>
            </div>
            <span className="text-t1 font-semibold tracking-tight">Spark IDX</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#how" className="text-[13px] text-t3 hover:text-t2 transition-colors hidden sm:block">How It Works</a>
            <a href="#features" className="text-[13px] text-t3 hover:text-t2 transition-colors hidden sm:block">Features</a>
            <a href="https://sparkplatform.com/docs" target="_blank" rel="noopener noreferrer" className="text-[13px] text-t3 hover:text-t2 transition-colors hidden sm:block">Docs</a>
            <a href="https://vercel.com/integrations" className="btn-primary !py-2 !px-4 !text-[13px] !rounded-lg">
              Install
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="pt-[140px] pb-[80px] px-5">
        <div className="max-w-[680px] mx-auto flex flex-col items-center text-center">
          <div className="pill mb-8 anim-fade-up" style={{ animationDelay: "0ms" }}>
            <span className="relative flex h-[6px] w-[6px]">
              <span className="absolute inset-0 rounded-full bg-mint animate-ping opacity-75" />
              <span className="relative rounded-full h-[6px] w-[6px] bg-mint" />
            </span>
            <span className="text-t2">Real-time MLS data for Next.js</span>
          </div>

          <h1
            className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6 anim-fade-up"
            style={{ animationDelay: "80ms", fontFamily: "var(--font-display)" }}
          >
            <span className="text-t1">The modern</span>
            <br />
            <span className="text-gradient">IDX platform</span>
            <br />
            <span className="text-t1">for Vercel</span>
          </h1>

          <p
            className="text-[17px] text-t2 leading-relaxed max-w-[480px] mb-10 anim-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            One integration connects Spark API to your Vercel project.
            Encrypted env vars, ISR caching, optimized images — ship
            a blazing-fast property search without the legacy baggage.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto anim-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <a href="https://vercel.com/integrations" className="btn-primary w-full sm:w-auto">
              <svg width="16" height="16" viewBox="0 0 76 65" fill="currentColor"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" /></svg>
              Add to Vercel
            </a>
            <a href="https://github.com/jawfbs/spark-idx-starter" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              Starter Template
            </a>
          </div>
        </div>
      </section>

      {/* ── Logos ────────────────────────────────────── */}
      <section className="pb-[80px] px-5">
        <div className="max-w-[500px] mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-t3 font-medium mb-5 anim-fade-up" style={{ animationDelay: "300ms" }}>
            Built on
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-t3 anim-fade-up" style={{ animationDelay: "360ms" }}>
            <span className="text-[13px] font-medium flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 76 65" fill="currentColor"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" /></svg>
              Vercel
            </span>
            <span className="text-[13px] font-medium">⚡ Spark API</span>
            <span className="text-[13px] font-medium">🏢 FBS</span>
            <span className="text-[13px] font-medium">📊 200+ MLS</span>
          </div>
        </div>
      </section>

      {/* ── Code Preview ────────────────────────────── */}
      <section className="pb-[100px] px-5">
        <div className="max-w-[600px] mx-auto anim-fade-up" style={{ animationDelay: "420ms" }}>
          <div className="gradient-border">
            <div className="code-window">
              <div className="titlebar">
                <div className="dots">
                  <span style={{ background: "#ff5f57" }} />
                  <span style={{ background: "#febc2e" }} />
                  <span style={{ background: "#28c840" }} />
                </div>
                <span className="text-[11px] text-t3 font-mono ml-2">app/listings/page.tsx</span>
              </div>
              <pre>
                <code>
                  <span className="text-accent-light">import</span>
                  <span className="text-t1">{" { SparkClient } "}</span>
                  <span className="text-accent-light">from</span>
                  <span className="text-gold">{" '@spark-idx/next'"}</span>
                  {"\n\n"}
                  <span className="text-t3">{"// Revalidate every hour"}</span>
                  {"\n"}
                  <span className="text-accent-light">export const</span>
                  <span className="text-t1">{" revalidate = "}</span>
                  <span className="text-mint">3600</span>
                  {"\n\n"}
                  <span className="text-accent-light">export default</span>
                  <span className="text-sky">{" async function"}</span>
                  <span className="text-t1">{" Page() {"}</span>
                  {"\n"}
                  <span className="text-accent-light">{"  const"}</span>
                  <span className="text-t1">{" spark = "}</span>
                  <span className="text-sky">new SparkClient</span>
                  <span className="text-t1">()</span>
                  {"\n\n"}
                  <span className="text-accent-light">{"  const"}</span>
                  <span className="text-t1">{" { listings } = "}</span>
                  <span className="text-accent-light">await</span>
                  <span className="text-t1">{" spark.search({"}</span>
                  {"\n"}
                  <span className="text-t1">{"    status: "}</span>
                  <span className="text-gold">{"'Active'"}</span>
                  <span className="text-t1">,</span>
                  {"\n"}
                  <span className="text-t1">{"    city: "}</span>
                  <span className="text-gold">{"'Scottsdale'"}</span>
                  <span className="text-t1">,</span>
                  {"\n"}
                  <span className="text-t1">{"    limit: "}</span>
                  <span className="text-mint">24</span>
                  {"\n"}
                  <span className="text-t1">{"  })"}</span>
                  {"\n\n"}
                  <span className="text-accent-light">{"  return"}</span>
                  <span className="text-t1">{" ("}</span>
                  {"\n"}
                  <span className="text-hot">{"    <"}</span>
                  <span className="text-sky">Grid</span>
                  <span className="text-hot">{">"}</span>
                  {"\n"}
                  <span className="text-t1">{"      {listings.map(l => ("}</span>
                  {"\n"}
                  <span className="text-hot">{"        <"}</span>
                  <span className="text-sky">PropertyCard</span>
                  <span className="text-accent-light">{" key"}</span>
                  <span className="text-t1">{"={l.Id}"}</span>
                  <span className="text-accent-light">{" data"}</span>
                  <span className="text-t1">{"={l}"}</span>
                  <span className="text-hot">{" />"}</span>
                  {"\n"}
                  <span className="text-t1">{"      ))}"}</span>
                  {"\n"}
                  <span className="text-hot">{"    </"}</span>
                  <span className="text-sky">Grid</span>
                  <span className="text-hot">{">"}</span>
                  {"\n"}
                  <span className="text-t1">{"  )"}</span>
                  {"\n"}
                  <span className="text-t1">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────── */}
      <section id="how" className="pb-[100px] px-5">
        <div className="max-w-[800px] mx-auto flex flex-col items-center text-center">
          <p className="pill mb-4 text-t3">⚡ Simple setup</p>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight mb-3 text-t1" style={{ fontFamily: "var(--font-display)" }}>
            Three commands. Zero config.
          </h2>
          <p className="text-t2 mb-14 max-w-[440px]">
            Install from the Marketplace and start fetching live MLS data in your Server Components.
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                icon: "📦",
                title: "Install",
                desc: "Add Spark IDX from the Vercel Marketplace. One click, pick a project.",
                color: "accent",
              },
              {
                num: "02",
                icon: "🔑",
                title: "Authenticate",
                desc: "Paste your Spark API key. We validate it live and encrypt it on Vercel.",
                color: "gold",
              },
              {
                num: "03",
                icon: "🚀",
                title: "Ship",
                desc: "Import the client. Fetch listings. Deploy. Your IDX is live.",
                color: "mint",
              },
            ].map((step, i) => (
              <div key={i} className="card p-6 flex flex-col items-center text-center anim-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-10 h-10 rounded-xl bg-${step.color}/10 border border-${step.color}/20 flex items-center justify-center text-xl mb-4`}>
                  {step.icon}
                </div>
                <div className={`text-[10px] font-bold text-${step.color} uppercase tracking-[0.15em] mb-2`}>
                  Step {step.num}
                </div>
                <h3 className="text-[15px] font-semibold text-t1 mb-2">{step.title}</h3>
                <p className="text-[13px] text-t3 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Env Vars ────────────────────────────────── */}
      <section className="pb-[100px] px-5">
        <div className="max-w-[540px] mx-auto flex flex-col items-center text-center">
          <h2 className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold tracking-tight mb-3 text-t1" style={{ fontFamily: "var(--font-display)" }}>
            What gets provisioned
          </h2>
          <p className="text-t2 text-[15px] mb-10 max-w-[400px]">
            Encrypted environment variables, automatically set on your Vercel project.
          </p>

          <div className="w-full code-window text-left anim-fade-up">
            <div className="titlebar">
              <span className="text-[11px] text-t3 font-mono">Environment Variables</span>
              <div className="flex-1" />
              <span className="text-[10px] text-mint font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                auto-provisioned
              </span>
            </div>
            <div className="p-4 space-y-2.5">
              {[
                { name: "SPARK_API_KEY", badge: "encrypted", badgeColor: "accent" },
                { name: "SPARK_API_SECRET", badge: "encrypted", badgeColor: "accent" },
                { name: "SPARK_MLS_ID", badge: "plain", badgeColor: "sky" },
                { name: "NEXT_PUBLIC_SPARK_IDX_ENABLED", badge: "true", badgeColor: "mint" },
              ].map((v, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-bg-raised/60 border border-stroke/50 font-mono text-[12px] anim-slide-right" style={{ animationDelay: `${i * 60}ms` }}>
                  <span className={`text-${v.badgeColor}`}>
                    {v.badge === "encrypted" ? "🔒" : v.badge === "true" ? "✓" : "📋"}
                  </span>
                  <span className="text-t1 flex-1 text-left">{v.name}</span>
                  <span className={`text-[10px] text-${v.badgeColor} bg-${v.badgeColor}/10 px-2 py-0.5 rounded-full`}>
                    {v.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ───────────────────────────── */}
      <section id="features" className="pb-[100px] px-5">
        <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
          <p className="pill mb-4 text-t3">🏗️ Built for developers</p>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight mb-3 text-t1" style={{ fontFamily: "var(--font-display)" }}>
            Everything you need for{" "}
            <span className="text-gradient">headless IDX</span>
          </h2>
          <p className="text-t2 mb-14 max-w-[460px]">
            No iFrames, no legacy plugins. Just clean data and modern rendering.
          </p>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "⚡",
                title: "Auto-Provisioned Credentials",
                desc: "Install once — API keys are set as encrypted env vars. Your code just reads them.",
                color: "accent",
              },
              {
                icon: "🔁",
                title: "ISR Built In",
                desc: "Listings revalidate every hour. Instant loads with always-fresh MLS data.",
                color: "mint",
              },
              {
                icon: "📸",
                title: "Image Pipeline",
                desc: "MLS photos served as WebP/AVIF via Vercel Image Optimization. Responsive, lazy-loaded.",
                color: "sky",
              },
              {
                icon: "🔍",
                title: "SEO by Default",
                desc: "Every listing is a server-rendered page. Meta tags, Open Graph, JSON-LD, auto sitemap.",
                color: "gold",
              },
              {
                icon: "🏠",
                title: "Full MLS Data",
                desc: "Listings, photos, open houses, agents, offices — everything Spark API offers.",
                color: "hot",
              },
              {
                icon: "✅",
                title: "MLS Compliant",
                desc: "Built-in disclaimer component handles attribution, copyright, and display rules.",
                color: "accent",
              },
            ].map((f, i) => (
              <div key={i} className="card p-5 flex flex-col items-start text-left anim-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className={`w-9 h-9 rounded-xl bg-${f.color}/10 border border-${f.color}/20 flex items-center justify-center text-lg mb-3`}>
                  {f.icon}
                </div>
                <h3 className="text-[14px] font-semibold text-t1 mb-1.5">{f.title}</h3>
                <p className="text-[13px] text-t3 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ──────────────────────────────── */}
      <section className="pb-[100px] px-5">
        <div className="max-w-[700px] mx-auto flex flex-col items-center text-center">
          <h2 className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold tracking-tight mb-3 text-t1" style={{ fontFamily: "var(--font-display)" }}>
            Legacy IDX vs. <span className="text-gradient">Spark IDX</span>
          </h2>
          <p className="text-t2 text-[15px] mb-10 max-w-[400px]">
            Stop shipping slow iFrames. Ship fast, indexable, beautiful pages.
          </p>

          <div className="w-full card overflow-hidden text-left">
            <div className="grid grid-cols-[1fr_1fr_1fr] text-[12px] border-b border-stroke">
              <div className="p-3.5 font-medium text-t3 uppercase tracking-wider" />
              <div className="p-3.5 font-medium text-t3 uppercase tracking-wider border-l border-stroke text-center">Legacy</div>
              <div className="p-3.5 font-medium text-accent uppercase tracking-wider border-l border-stroke text-center bg-accent/[0.03]">Spark IDX</div>
            </div>
            {[
              ["Rendering", "iFrame embed", "Server Components"],
              ["SEO", "Not crawlable", "Full SSR + ISR"],
              ["TTFB", "2–5 seconds", "<100ms"],
              ["Design", "Fixed template", "Your design system"],
              ["Images", "Unoptimized JPG", "WebP/AVIF auto"],
              ["Mobile", "Barely responsive", "Mobile-first"],
              ["Setup", "Days or weeks", "5 minutes"],
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-[1fr_1fr_1fr] text-[13px] ${i < 6 ? "border-b border-stroke/40" : ""}`}>
                <div className="p-3.5 text-t2 font-medium">{row[0]}</div>
                <div className="p-3.5 text-t3 border-l border-stroke/40 text-center">
                  <span className="text-hot/70">✕</span> {row[1]}
                </div>
                <div className="p-3.5 text-t1 border-l border-stroke/40 text-center bg-accent/[0.02]">
                  <span className="text-mint">✓</span> {row[2]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────── */}
      <section className="pb-[100px] px-5">
        <div className="max-w-[700px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: "200+", label: "MLS Systems", color: "accent" },
            { val: "1.5M+", label: "Agents Served", color: "hot" },
            { val: "<100ms", label: "Avg TTFB", color: "mint" },
            { val: "5 min", label: "Setup Time", color: "gold" },
          ].map((s, i) => (
            <div key={i} className="card p-5 flex flex-col items-center text-center anim-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className={`text-[clamp(1.4rem,3vw,1.8rem)] font-bold text-${s.color} mb-1`}>
                {s.val}
              </div>
              <div className="text-[11px] text-t3 uppercase tracking-wider font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="pb-[100px] px-5">
        <div className="max-w-[600px] mx-auto">
          <div className="gradient-border">
            <div className="relative overflow-hidden rounded-[20px] bg-bg-card px-8 py-14 sm:px-14 sm:py-20 flex flex-col items-center text-center">
              {/* Glow */}
              <div className="orb w-[400px] h-[300px] bg-accent/15 top-[-30%] left-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold tracking-tight mb-4 text-t1" style={{ fontFamily: "var(--font-display)" }}>
                  Ready to <span className="text-gradient">ship?</span>
                </h2>
                <p className="text-t2 mb-10 max-w-[380px] text-[15px]">
                  Install the integration in under a minute.
                  Deploy the starter template. Go live with MLS listings today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://vercel.com/integrations" className="btn-primary w-full sm:w-auto">
                    <svg width="15" height="15" viewBox="0 0 76 65" fill="currentColor"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" /></svg>
                    Install on Vercel
                  </a>
                  <a href="https://sparkplatform.com/docs/overview/api" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto">
                    Read the Docs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="border-t border-stroke py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round">
                <path d="M6 14V8L10 6L14 8V14L10 12L6 14Z" />
              </svg>
            </div>
            <span className="text-t2 text-[13px] font-medium">Spark IDX</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-t3">
            <a href="https://sparkplatform.com" className="hover:text-t2 transition-colors">Spark Platform</a>
            <a href="https://sparkplatform.com/docs" className="hover:text-t2 transition-colors">Docs</a>
            <a href="https://github.com/jawfbs/spark-idx-integration" className="hover:text-t2 transition-colors">GitHub</a>
            <a href="#" className="hover:text-t2 transition-colors">Privacy</a>
            <a href="#" className="hover:text-t2 transition-colors">Terms</a>
          </div>
          <p className="text-[11px] text-t3/50">
            © 2025 Spark IDX · Built with Spark API by FBS · Not affiliated with Vercel Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
