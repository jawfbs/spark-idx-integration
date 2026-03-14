<div align="center">

![Spark IDX](https://img.shields.io/badge/Spark_IDX-FF6B35?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAxNFY4TDEwIDZMMTQgOFYxNEwxMCAxMkw2IDE0WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=&logoColor=white)
![Vercel Marketplace](https://img.shields.io/badge/Vercel_Marketplace-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Next.js 15](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind v4](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

<br />

# 🏠 Spark IDX

### Headless IDX Integration for the Vercel Marketplace

**Connect real-time MLS listing data from [Spark API by FBS](https://sparkplatform.com) directly into any Vercel project. Server Components, ISR caching, image optimization — all wired up automatically.**

[Install on Vercel](#-quick-start) · [View Demo](#-live-demo) · [Starter Template](https://github.com/yourusername/spark-idx-starter) · [Spark API Docs](https://sparkplatform.com/docs/overview/api)

<br />

---

</div>

<br />

## 🤔 The Problem

Every real estate website needs **IDX** (Internet Data Exchange) — the ability to display MLS listings. Today's options are terrible:

| Traditional IDX | What's Wrong |
|---|---|
| **iFrame embeds** | Slow, ugly, zero SEO value, can't style them |
| **IDX Broker / iHomefinder** | Cookie-cutter designs, separate servers, poor Core Web Vitals |
| **Custom API integrations** | Weeks of development, auth complexity, caching headaches |

**Spark IDX changes this.** Install one integration. Get MLS data in your Next.js app in minutes.

<br />

## ✨ What This Integration Does

Developer installs from Vercel Marketplace
│
▼
OAuth flow auto-provisions credentials
│
▼
SPARK_API_KEY, SPARK_API_SECRET, SPARK_MLS_ID
set as encrypted env vars on their project
│
▼
Developer imports SparkClient, fetches listings
│
▼
Production-ready property search — done.

markdown
Copy code

### For Developers
- **One-click install** from the Vercel Marketplace
- **Encrypted env vars** auto-injected into your project
- **Zero config** — `SparkClient` reads credentials automatically
- **Full TypeScript** types for all MLS data

### For Real Estate Businesses
- **Every listing gets its own SEO-optimized page**
- **Sub-second page loads** with ISR + Edge caching
- **MLS photos** served through Vercel Image Optimization (WebP/AVIF)
- **Lead capture** built in, ready to connect to any CRM
- **MLS compliance** handled automatically with disclaimer components


## 🚀 Quick Start

### Prerequisites

- A [Vercel](https://vercel.com) account
- A [Spark API](https://sparkplatform.com/register) key from FBS
- A Next.js project deployed on Vercel (or use our [starter template](https://github.com/yourusername/spark-idx-starter))

### Install from Vercel Marketplace

1. Go to the [Vercel Marketplace](https://vercel.com/integrations)
2. Search for **Spark IDX**
3. Click **Add Integration**
4. Select your account or team
5. Walk through the configuration wizard:
   - Pick a project
   - Paste your Spark API key
   - Click **Validate & Continue**
   - Review and **Save & Deploy**
6. Done — your project now has MLS access 🎉

### Use in Your Code

```tsx
// app/listings/page.tsx — this is a React Server Component

import { SparkClient } from "@/lib/spark";

export const revalidate = 3600; // ISR: regenerate every hour

export default async function ListingsPage() {
  const spark = new SparkClient(); // auto-reads env vars

  const { listings, total } = await spark.searchListings({
    status: "Active",
    city: "Scottsdale",
    priceMin: 500000,
    limit: 24,
  });

  return (
    <section>
      <h1>{total.toLocaleString()} Homes for Sale in Scottsdale</h1>
      {listings.map((listing) => (
        <article key={listing.Id}>
          <h2>{listing.UnparsedAddress}</h2>
          <p>${listing.ListPrice.toLocaleString()}</p>
          <p>
            {listing.BedroomsTotal} bed · {listing.BathroomsTotalInteger} bath ·{" "}
            {listing.LivingArea?.toLocaleString()} sqft
          </p>
        </article>
      ))}
    </section>
  );
}
<br />
🖥️ Integration Dashboard
The configuration wizard guides users through 4 steps:

Step 1 — Select Project
Users choose which Vercel project should receive the Spark API credentials. Projects are fetched from the Vercel API using the OAuth access token.

Step 2 — Enter Credentials
Users paste their Spark API key and secret. The integration validates these against the live Spark API before proceeding.

Step 3 — Review & Save
Users review the environment variables that will be set and optionally configure their MLS ID. Clicking Save & Deploy writes encrypted env vars to the selected project via the Vercel API.

Step 4 — Success
Users see next steps: install the SDK, deploy the starter template, or read the docs.

<br />
🔑 API Routes
GET /api/callback
Handles the Vercel OAuth redirect. Exchanges the authorization code for an access token and redirects to the dashboard.

Parameter	Source	Description
code	Query	Authorization code from Vercel
configurationId	Query	The integration configuration ID
teamId	Query	Team ID (if team-scoped install)
next	Query	URL to redirect back to Vercel after setup
POST /api/validate-spark
Validates Spark API credentials before saving them.

json
Copy code
// Request
{
  "apiKey": "your_spark_api_key",
  "apiSecret": "your_spark_api_secret"
}

// Response (success)
{
  "valid": true,
  "message": "Connected successfully",
  "mlsName": "ARMLS",
  "systemName": "Arizona Regional MLS",
  "listingCount": 42387
}

// Response (failure)
{
  "valid": false,
  "message": "Authentication failed (401)"
}
POST /api/save-config
Saves Spark credentials as encrypted environment variables to a Vercel project.

json
Copy code
// Request
{
  "accessToken": "vercel_oauth_token",
  "projectId": "prj_xxxxxxxxxxxx",
  "teamId": "team_xxxxxxxxxxxx",
  "sparkApiKey": "spark_key",
  "sparkApiSecret": "spark_secret",
  "sparkMlsId": "optional_mls_id"
}

// Response
{
  "success": true
}
<br />
🧩 Companion: Starter Template
The spark-idx-starter is a fully functional Next.js 15 app that showcases the integration:

Page	What It Does
/	Hero section + 6 featured listings from MLS
/listings	Full search with city, price, beds, and property type filters
/listings/[id]	Detail page with photo gallery, stats, description, lead form, schema.org structured data
/sitemap.xml	Auto-generated sitemap with all active listing URLs
Starter Features
✅ Server Components — Listings fetched at build/request time, zero client JS for data
✅ ISR — Pages revalidate every 3600s, always fresh without rebuilding
✅ Suspense Boundaries — Skeleton loading states while data streams in
✅ Image Optimization — MLS photos served as WebP/AVIF via next/image
✅ SEO — Dynamic <title>, <meta>, Open Graph tags, JSON-LD structured data per listing
✅ Auto Sitemap — Every active listing gets a URL in sitemap.xml
✅ MLS Compliance — <MlsDisclaimer /> component with proper attribution
✅ Lead Capture — Contact form on every listing detail page
✅ Dark Theme — Glass morphism UI with Geist fonts
✅ Responsive — Mobile-first, works on all devices
<br />
⚡ Why Spark IDX + Vercel?
<table> <tr> <th width="50%">Traditional IDX</th> <th width="50%">Spark IDX on Vercel</th> </tr> <tr> <td>
❌ iFrame embedded from third-party server

❌ Google can't crawl listings (no SEO)

❌ Separate server = slow TTFB

❌ Generic template, can't customize

❌ Heavy JavaScript, poor Core Web Vitals

❌ No mobile optimization

❌ Cookie-cutter widget design

❌ Basic lead capture

</td> <td>
✅ Native React Server Components

✅ Full SSR/ISR — every page indexed by Google

✅ Edge-cached, sub-100ms TTFB

✅ Fully customizable with Tailwind

✅ Minimal JS, 90+ Lighthouse scores

✅ Responsive, mobile-first

✅ Your design system, headless data

✅ Webhooks → any CRM, Flexmls, HubSpot

</td> </tr> </table> <br />
🛠️ Tech Stack
Technology	Version	Purpose
Next.js	15	App Router, Server Components, ISR, API Routes
React	19	UI rendering
TypeScript	5.7	Type safety
Tailwind CSS	4.0	Utility-first styling with CSS-first config
Framer Motion	11	Animations (available, not required)
Lucide Icons	Latest	Icon set (available, not required)
Geist Font	1.3	Typography
Spark API	v1	MLS listing data
Vercel API	v9/v10	OAuth, projects, environment variables
<br />
🔒 Security
Concern	How It's Handled
API Credentials	Stored as Vercel encrypted environment variables — never exposed to the browser
OAuth Tokens	Exchanged server-side via /api/callback — client never sees the secret
Spark API Calls	Made from Server Components / API Routes only — keys stay on the server
Validation	Credentials validated against live Spark API before being saved
Scopes	Integration requests only read-projects and write-env-vars — minimal permissions
<br />
📊 Environment Variables
Required on the Integration App
Variable	Description
INTEGRATION_CLIENT_ID	From Vercel Integration Console
INTEGRATION_CLIENT_SECRET	From Vercel Integration Console
NEXT_PUBLIC_APP_URL	Your deployed integration URL
SPARK_API_KEY	Your partner Spark API key (for validation)
SPARK_API_SECRET	Your partner Spark API secret
Set on User's Project (by the integration)
Variable	Type	Description
SPARK_API_KEY	Encrypted	User's Spark API key
SPARK_API_SECRET	Encrypted	User's Spark API secret
SPARK_MLS_ID	Plain	Target MLS system ID
NEXT_PUBLIC_SPARK_IDX_ENABLED	Plain	Feature flag ("true")
<br />
📈 Market Opportunity
Metric	Number
Real estate agents in the US	1.5 million+
Active brokerages	~100,000
Real estate web dev agencies	Thousands
MLS systems connected to Spark	200+
Active listings accessible	Millions
IDX is the #1 most requested feature for real estate websites. This integration is the first headless IDX solution on the Vercel Marketplace.

<br />
🗺️ Roadmap
 @spark-idx/next npm package — Dedicated SDK with React hooks and server helpers
 Map search — Interactive map-based listing search with clustering
 Saved searches — Users save criteria, get notified on new matches
 Agent pages — /agents/[id] with roster data from Spark API
 Open house calendar — /open-houses with upcoming events
 VOW mode — Virtual Office Website with registration-gated features
 Webhook receiver — Real-time listing updates from Spark push notifications
 Analytics dashboard — Listing views, search trends, lead metrics
 Multi-MLS — Support for multiple MLS systems per project
 Vercel KV caching — Hot listings cached in Vercel KV for instant loads
 AI description rewriting — Use Vercel AI SDK to enhance listing descriptions
<br />
🤝 Contributing
Contributions are welcome! This is an open-source integration.

Fork the repository
Create a feature branch (feature/amazing-thing)
Commit your changes
Push to the branch
Open a Pull Request
<br />
📄 License
MIT License — see LICENSE for details.

<br />
🙏 Acknowledgments
FBS / Flexmls — Creators of the Spark API platform
Vercel — Next.js, hosting, and the Marketplace platform
Spark Platform — API documentation and developer support
MLS organizations — For making listing data accessible through IDX
<br />
<div align="center">
Built with 🧡 for the real estate developer community

Spark Platform · Vercel Marketplace · Next.js

<br />
Spark IDX
License
PRs Welcome

</div>
