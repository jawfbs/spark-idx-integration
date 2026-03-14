export default function HomePage() {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-15 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-spark-orange), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[15%] w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-spark-purple), transparent 70%)",
          }}
        />
        <div
          className="absolute top-[50%] right-[10%] w-[400px] h-[400px] rounded-full opacity-8 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-spark-teal), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[30%] w-[300px] h-[300px] rounded-full opacity-6 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-spark-pink), transparent 70%)",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle/50 backdrop-blur-2xl bg-surface-primary/60">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-spark-orange to-spark-pink flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="font-semibold text-text-primary text-lg tracking-tight">
              Spark IDX
            </span>
            <span className="px-2 py-0.5 rounded-full bg-spark-orange/10 text-spark-orange text-[10px] font-semibold border border-spark-orange/20 uppercase tracking-wider">
              beta
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors hidden sm:block"
            >
              Features
            </a>
            <a
              href="#code"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors hidden sm:block"
            >
              Code
            </a>
            <a
              href="https://sparkplatform.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors hidden sm:block"
            >
              API Docs
            </a>
            <a
              href="https://vercel.com/integrations"
              className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/10"
            >
              Install on Vercel
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1">
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0ms" }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-elevated/80 border border-border-subtle mb-10 text-sm text-text-secondary backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                Powered by FBS &amp; Flexmls
              </div>
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-8 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <span className="text-text-primary block">MLS Listings.</span>
              <span className="gradient-text block mt-1">Your Next.js App.</span>
              <span className="text-text-primary block mt-1">Zero Friction.</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Connect real-time MLS data from Spark API directly into your
              Vercel project. Server Components, ISR caching, image
              optimization — all wired up automatically.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <a
                href="https://vercel.com/integrations"
                className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-spark-orange to-spark-pink text-white font-semibold text-base transition-all hover:shadow-xl hover:shadow-spark-orange/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                Add to Vercel
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl border border-border-default text-text-primary font-medium text-base hover:bg-surface-elevated hover:border-border-default transition-all"
              >
                See How It Works
              </a>
            </div>
          </div>
        </section>

        {/* Logos / Trust Bar */}
        <section className="pb-20 px-6">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <p
              className="text-xs uppercase tracking-widest text-text-muted mb-6 font-medium animate-fade-in-up"
              style={{ animationDelay: "350ms" }}
            >
              Built on trusted real estate infrastructure
            </p>
            <div
              className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-text-muted animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <svg className="w-5 h-5" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                Vercel
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-lg">⚡</span>
                Spark API
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-lg">🏢</span>
                FBS / Flexmls
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-lg">📊</span>
                200+ MLS Systems
              </div>
            </div>
          </div>
        </section>

        {/* Code Preview */}
        <section id="code" className="pb-28 px-6">
          <div
            className="max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "450ms" }}
          >
            <div className="glass-card overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border-subtle/80 bg-surface-secondary/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-text-muted font-mono ml-3">
                  app/listings/page.tsx
                </span>
                <div className="flex-1" />
                <span className="text-[10px] text-text-muted/50 font-mono">
                  Next.js 15 · Server Component
                </span>
              </div>
              <pre className="p-6 text-[13px] leading-[1.7] overflow-x-auto font-mono">
                <code>
                  <span className="text-spark-purple">import</span>
                  <span className="text-text-primary">
                    {" "}
                    {"{"} SparkClient {"}"}{" "}
                  </span>
                  <span className="text-spark-purple">from</span>
                  <span className="text-spark-orange">
                    {" "}
                    &apos;@spark-idx/next&apos;
                  </span>
                  {"\n\n"}
                  <span className="text-text-muted">{"// "}Revalidate every hour via ISR</span>
                  {"\n"}
                  <span className="text-spark-purple">export const</span>
                  <span className="text-text-primary"> revalidate = </span>
                  <span className="text-spark-teal">3600</span>
                  {"\n\n"}
                  <span className="text-spark-purple">export default</span>
                  <span className="text-spark-teal"> async function</span>
                  <span className="text-text-primary">
                    {" "}
                    Listings() {"{"}
                  </span>
                  {"\n"}
                  <span className="text-text-muted">{"  // "}Reads env vars set by integration</span>
                  {"\n"}
                  <span className="text-spark-purple">{"  const"}</span>
                  <span className="text-text-primary"> spark = </span>
                  <span className="text-spark-teal">new SparkClient</span>
                  <span className="text-text-primary">()</span>
                  {"\n\n"}
                  <span className="text-spark-purple">{"  const"}</span>
                  <span className="text-text-primary"> {"{ listings }"} = </span>
                  <span className="text-spark-purple">await</span>
                  <span className="text-text-primary">
                    {" "}
                    spark.search({"{"}
                  </span>
                  {"\n"}
                  <span className="text-text-primary">{"    "}status: </span>
                  <span className="text-spark-orange">&apos;Active&apos;</span>
                  <span className="text-text-primary">,</span>
                  {"\n"}
                  <span className="text-text-primary">{"    "}city: </span>
                  <span className="text-spark-orange">&apos;Scottsdale&apos;</span>
                  <span className="text-text-primary">,</span>
                  {"\n"}
                  <span className="text-text-primary">{"    "}limit: </span>
                  <span className="text-spark-teal">24</span>
                  {"\n"}
                  <span className="text-text-primary">{"  "}{"}"}) </span>
                  {"\n\n"}
                  <span className="text-spark-purple">{"  return"}</span>
                  <span className="text-text-primary"> (</span>
                  {"\n"}
                  <span className="text-spark-teal">{"    <"}section</span>
                  <span className="text-spark-purple"> className</span>
                  <span className="text-spark-orange">=&quot;grid&quot;</span>
                  <span className="text-spark-teal">{">"}</span>
                  {"\n"}
                  <span className="text-text-primary">
                    {"      {"}listings.map(l ={">"} (
                  </span>
                  {"\n"}
                  <span className="text-spark-teal">{"        <"}ListingCard</span>
                  <span className="text-spark-purple"> key</span>
                  <span className="text-text-primary">={"{"}l.Id{"}"}</span>
                  <span className="text-spark-purple"> data</span>
                  <span className="text-text-primary">={"{"}l{"}"}</span>
                  <span className="text-spark-teal"> /{">"}</span>
                  {"\n"}
                  <span className="text-text-primary">{"      ))"}</span>
                  <span className="text-text-primary">{"}"}</span>
                  {"\n"}
                  <span className="text-spark-teal">{"    </"}section{">"}</span>
                  {"\n"}
                  <span className="text-text-primary">{"  )"}</span>
                  {"\n"}
                  <span className="text-text-primary">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="pb-28 px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              <span className="gradient-text">Three steps.</span>{" "}
              <span className="text-text-primary">That&apos;s it.</span>
            </h2>
            <p className="text-text-secondary mb-16 max-w-lg">
              From install to live MLS listings on your site in under five
              minutes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
              {[
                {
                  step: "01",
                  title: "Install",
                  description:
                    "Add Spark IDX from the Vercel Marketplace. Select your project.",
                  icon: "📦",
                },
                {
                  step: "02",
                  title: "Connect",
                  description:
                    "Enter your Spark API key. We validate it and save encrypted env vars.",
                  icon: "🔗",
                },
                {
                  step: "03",
                  title: "Ship",
                  description:
                    "Import SparkClient in your code. Deploy. MLS listings are live.",
                  icon: "🚀",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center animate-fade-in-up"
                  style={{ animationDelay: `${550 + i * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-[10px] font-bold text-spark-orange uppercase tracking-widest mb-2">
                    Step {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="pb-28 px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              <span className="text-text-primary">Everything you need for</span>{" "}
              <span className="gradient-text">modern IDX</span>
            </h2>
            <p className="text-text-secondary mb-16 max-w-lg">
              Stop fighting iFrames. Start building with real data, real
              components, and real performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
              {[
                {
                  icon: "⚡",
                  title: "Auto-Provisioned",
                  description:
                    "Install the integration and your API credentials are set automatically as encrypted environment variables. Zero manual config.",
                },
                {
                  icon: "🔄",
                  title: "ISR Native",
                  description:
                    "Listings are statically generated and revalidated every hour. Property pages load in milliseconds while staying fresh.",
                },
                {
                  icon: "🖼️",
                  title: "Image Optimization",
                  description:
                    "MLS photos flow through Vercel Image Optimization. WebP, AVIF, responsive sizes, lazy loading — all automatic.",
                },
                {
                  icon: "🔍",
                  title: "Full SEO",
                  description:
                    "Every listing gets a server-rendered page with meta tags, Open Graph, JSON-LD structured data, and auto-generated sitemaps.",
                },
                {
                  icon: "🏠",
                  title: "Complete MLS Data",
                  description:
                    "Active listings, photos, virtual tours, open houses, agent rosters — the full Spark API at your fingertips.",
                },
                {
                  icon: "✅",
                  title: "MLS Compliant",
                  description:
                    "Built-in compliance components handle MLS disclaimers, attribution, and display rules so you don't have to.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="glass-card p-6 flex flex-col items-center text-center animate-fade-in-up"
                  style={{ animationDelay: `${600 + i * 80}ms` }}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="pb-28 px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              <span className="text-text-primary">Not your grandma&apos;s</span>{" "}
              <span className="gradient-text">IDX</span>
            </h2>
            <p className="text-text-secondary mb-12 max-w-lg">
              See how headless IDX on Vercel compares to legacy iframe solutions.
            </p>

            <div className="w-full glass-card overflow-hidden">
              <div className="grid grid-cols-3 border-b border-border-subtle">
                <div className="p-4" />
                <div className="p-4 border-l border-border-subtle">
                  <div className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                    Traditional IDX
                  </div>
                </div>
                <div className="p-4 border-l border-border-subtle bg-spark-orange/5">
                  <div className="text-xs uppercase tracking-wider text-spark-orange font-semibold">
                    Spark IDX
                  </div>
                </div>
              </div>
              {[
                { feature: "Rendering", old: "iFrame embed", new: "Server Components" },
                { feature: "SEO", old: "Not crawlable", new: "Full SSR + ISR" },
                { feature: "Speed", old: "2-5s TTFB", new: "<100ms TTFB" },
                { feature: "Design", old: "Fixed template", new: "Your design system" },
                { feature: "Images", old: "Unoptimized", new: "WebP/AVIF via Vercel" },
                { feature: "Mobile", old: "Basic responsive", new: "Mobile-first" },
                { feature: "Setup Time", old: "Days/weeks", new: "5 minutes" },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 ${i < 6 ? "border-b border-border-subtle/50" : ""}`}
                >
                  <div className="p-4 text-sm font-medium text-text-primary text-left">
                    {row.feature}
                  </div>
                  <div className="p-4 border-l border-border-subtle/50 text-sm text-text-muted">
                    ❌ {row.old}
                  </div>
                  <div className="p-4 border-l border-border-subtle/50 bg-spark-orange/5 text-sm text-text-primary">
                    ✅ {row.new}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-28 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {[
                { value: "200+", label: "MLS Systems" },
                { value: "1.5M+", label: "Agents Served" },
                { value: "<100ms", label: "Avg TTFB" },
                { value: "5 min", label: "Setup Time" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-card p-6 flex flex-col items-center text-center animate-fade-in-up"
                  style={{ animationDelay: `${700 + i * 80}ms` }}
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Env Vars Preview */}
        <section className="pb-28 px-6">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              <span className="gradient-text">One install.</span>{" "}
              <span className="text-text-primary">Four env vars.</span>
            </h2>
            <p className="text-text-secondary mb-10 max-w-lg">
              The integration securely provisions these encrypted environment
              variables on your Vercel project. Your code just works.
            </p>

            <div className="w-full glass-card overflow-hidden text-left">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border-subtle/80 bg-surface-secondary/30">
                <span className="text-xs text-text-muted font-mono">
                  Vercel → Project → Settings → Environment Variables
                </span>
              </div>
              <div className="p-5 space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary/50">
                  <span className="text-green-400">🔒</span>
                  <span className="text-spark-teal flex-1 text-left">SPARK_API_KEY</span>
                  <span className="text-text-muted text-xs">encrypted</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary/50">
                  <span className="text-green-400">🔒</span>
                  <span className="text-spark-teal flex-1 text-left">SPARK_API_SECRET</span>
                  <span className="text-text-muted text-xs">encrypted</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary/50">
                  <span className="text-blue-400">📋</span>
                  <span className="text-spark-teal flex-1 text-left">SPARK_MLS_ID</span>
                  <span className="text-text-muted text-xs">plain</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary/50">
                  <span className="text-blue-400">📋</span>
                  <span className="text-spark-teal flex-1 text-left">NEXT_PUBLIC_SPARK_IDX_ENABLED</span>
                  <span className="text-green-400 text-xs">true</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-32 px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <div className="glass-card p-12 sm:p-16 w-full relative overflow-hidden">
              {/* CTA Background Glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-20 blur-[80px]"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-spark-orange), transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  <span className="gradient-text">Ready to build?</span>
                </h2>
                <p className="text-text-secondary mb-10 max-w-md mx-auto text-lg">
                  Install the integration in under a minute. Start rendering MLS
                  listings in your Next.js app today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://vercel.com/integrations"
                    className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition-all hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Install on Vercel Marketplace
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <a
                    href="https://github.com/yourusername/spark-idx-starter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-border-default text-text-primary font-medium hover:bg-surface-elevated transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    View Starter Template
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle/50 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-spark-orange to-spark-pink flex items-center justify-center text-white font-bold text-[10px]">
              S
            </div>
            <span className="font-medium text-text-secondary text-sm">
              Spark IDX
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
            <a
              href="https://sparkplatform.com"
              className="hover:text-text-secondary transition-colors"
            >
              Spark Platform
            </a>
            <a
              href="https://sparkplatform.com/docs"
              className="hover:text-text-secondary transition-colors"
            >
              API Docs
            </a>
            <a href="#" className="hover:text-text-secondary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-text-secondary transition-colors">
              Terms
            </a>
            <a
              href="https://github.com/yourusername/spark-idx-integration"
              className="hover:text-text-secondary transition-colors"
            >
              GitHub
            </a>
          </div>
          <p className="text-xs text-text-muted/60">
            © 2025 Spark IDX. Built with Spark API by FBS. Not affiliated with
            Vercel Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
