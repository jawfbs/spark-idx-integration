import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-spark-orange), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-spark-purple), transparent 70%)",
          }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, var(--color-spark-teal), transparent 70%)",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle/50 backdrop-blur-xl bg-surface-primary/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-spark-orange to-spark-pink flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="font-semibold text-text-primary text-lg tracking-tight">
              Spark IDX
            </span>
            <span className="px-2 py-0.5 rounded-full bg-spark-orange/10 text-spark-orange text-xs font-medium border border-spark-orange/20">
              beta
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://sparkplatform.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              API Docs
            </a>
            <a
              href="https://vercel.com/integrations"
              className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
            >
              Install on Vercel
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0ms" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-elevated border border-border-subtle mb-8 text-sm text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Powered by FBS &amp; Flexmls
            </div>
          </div>

          <h1
            className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <span className="text-text-primary">MLS Listings.</span>
            <br />
            <span className="gradient-text">Your Next.js App.</span>
            <br />
            <span className="text-text-primary">Zero Friction.</span>
          </h1>

          <p
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Connect real-time MLS data from Spark API directly into your Vercel
            project. Server Components, ISR caching, image optimization — all
            wired up automatically.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="https://vercel.com/integrations"
              className="group px-8 py-3.5 rounded-xl bg-gradient-to-r from-spark-orange to-spark-pink text-white font-semibold text-base transition-all hover:shadow-lg hover:shadow-spark-orange/25 hover:-translate-y-0.5"
            >
              Add to Vercel
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#features"
              className="px-8 py-3.5 rounded-xl border border-border-default text-text-primary font-medium text-base hover:bg-surface-elevated transition-all"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Code Preview */}
        <div
          className="max-w-3xl mx-auto mt-20 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <div className="glass-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-text-muted font-mono ml-2">
                app/listings/page.tsx
              </span>
            </div>
            <pre className="p-6 text-sm leading-relaxed overflow-x-auto font-mono">
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
                <span className="text-spark-purple">export default</span>
                <span className="text-spark-teal"> async function</span>
                <span className="text-text-primary">
                  {" "}
                  ListingsPage() {"{"}
                </span>
                {"\n"}
                <span className="text-text-secondary">{"  // "}Auto-reads env vars set by integration</span>
                {"\n"}
                <span className="text-spark-purple">{"  const"}</span>
                <span className="text-text-primary"> spark = </span>
                <span className="text-spark-teal">new SparkClient</span>
                <span className="text-text-primary">()</span>
                {"\n"}
                <span className="text-spark-purple">{"  const"}</span>
                <span className="text-text-primary"> listings = </span>
                <span className="text-spark-purple">await</span>
                <span className="text-text-primary">
                  {" "}
                  spark.searchListings({"{"}
                </span>
                {"\n"}
                <span className="text-text-primary">{"    "}status: </span>
                <span className="text-spark-orange">&apos;Active&apos;</span>
                <span className="text-text-primary">,</span>
                {"\n"}
                <span className="text-text-primary">{"    "}limit: </span>
                <span className="text-spark-teal">24</span>
                {"\n"}
                <span className="text-text-primary">{"  "}{"}"}) </span>
                {"\n\n"}
                <span className="text-spark-purple">{"  return"}</span>
                <span className="text-text-primary">
                  {" "}
                  (
                </span>
                {"\n"}
                <span className="text-spark-teal">{"    <"}section{">"}</span>
                {"\n"}
                <span className="text-text-primary">{"      {"}listings.map(listing ={">"} (</span>
                {"\n"}
                <span className="text-spark-teal">{"        <"}ListingCard</span>
                <span className="text-spark-purple"> key</span>
                <span className="text-text-primary">={"{"}listing.Id{"}"}</span>
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

        {/* Features Grid */}
        <div
          id="features"
          className="max-w-5xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: "⚡",
              title: "Auto-Provisioned",
              description:
                "Install the integration and your SPARK_API_KEY, SPARK_API_SECRET, and SPARK_MLS_ID are set automatically as encrypted environment variables.",
            },
            {
              icon: "🔄",
              title: "ISR Native",
              description:
                "Listings are statically generated and revalidated every hour. Your property pages load in milliseconds while staying fresh.",
            },
            {
              icon: "🖼️",
              title: "Image Optimization",
              description:
                "MLS photos flow through Vercel Image Optimization automatically. WebP, AVIF, responsive sizes — all handled.",
            },
            {
              icon: "🔍",
              title: "Full SEO",
              description:
                "Every listing gets its own server-rendered page with structured data, meta tags, and auto-generated sitemaps.",
            },
            {
              icon: "🏠",
              title: "Complete MLS Data",
              description:
                "Active listings, open houses, agent rosters, photos, virtual tours — the full Spark API at your fingertips.",
            },
            {
              icon: "✅",
              title: "MLS Compliant",
              description:
                "Built-in compliance components handle MLS disclaimers, attribution, and display rules automatically.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass-card p-6 animate-fade-in-up"
              style={{ animationDelay: `${500 + i * 100}ms` }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto mt-32 text-center">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Ready to build?
          </h2>
          <p className="text-text-secondary mb-8">
            Install the integration in under a minute. Start rendering MLS listings in your Next.js app today.
          </p>
          <a
            href="https://vercel.com/integrations"
            className="inline-flex px-8 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all"
          >
            Install on Vercel Marketplace →
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <div>© 2025 Spark IDX. Built with Spark API by FBS.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text-secondary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-text-secondary transition-colors">
              Terms
            </a>
            <a
              href="https://sparkplatform.com"
              className="hover:text-text-secondary transition-colors"
            >
              Spark Platform
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
