<div align="center">

![Spark IDX](https://img.shields.io/badge/Spark_IDX-FF6B35?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAxNFY4TDEwIDZMMTQgOFYxNEwxMCAxMkw2IDE0WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=&logoColor=white)
![Vercel Marketplace](https://img.shields.io/badge/Vercel_Marketplace-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Next.js 15](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind v4](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

# 🏠 Spark IDX

### Headless IDX Integration for the Vercel Marketplace

**Connect real-time MLS listing data from [Spark API by FBS](https://sparkplatform.com) directly into any Vercel project. Server Components, ISR caching, image optimization — all wired up automatically.**

[Install on Vercel](#-quick-start) · [View Demo](#-live-demo) · [Starter Template](https://github.com/jawfbs/spark-idx-starter) · [Spark API Docs](https://sparkplatform.com/docs/overview/api)

## 🤔 The Problem

Every real estate website needs **IDX** (Internet Data Exchange) — the ability to display MLS listings. Today's options are terrible:

| Traditional IDX | What's Wrong |
|---|---|
| **iFrame embeds** | Slow, ugly, zero SEO value, can't style them |
| **IDX Broker / iHomefinder** | Cookie-cutter designs, separate servers, poor Core Web Vitals |
| **Custom API integrations** | Weeks of development, auth complexity, caching headaches |

**Spark IDX changes this.** Install one integration. Get MLS data in your Next.js app in minutes.

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

## 🏗️ Architecture

┌──────────────────────────────────────────────────────────┐
│                   VERCEL MARKETPLACE                      │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │             Spark IDX Integration                  │  │
│  │                                                    │  │
│  │  OAuth Callback ─→ Token Exchange ─→ Dashboard     │  │
│  │                                                    │  │
│  │  Dashboard:                                        │  │
│  │  ├─ Select Vercel project                         │  │
│  │  ├─ Enter & validate Spark API credentials        │  │
│  │  ├─ Configure MLS settings                        │  │
│  │  └─ Save encrypted env vars to project            │  │
│  └──────────────────────┬─────────────────────────────┘  │
│                         │                                │
└─────────────────────────┼────────────────────────────────┘
│
Environment variables injected:
• SPARK_API_KEY (encrypted)
• SPARK_API_SECRET (encrypted)
• SPARK_MLS_ID
• NEXT_PUBLIC_SPARK_IDX_ENABLED
│
▼
┌──────────────────────────────────────────────────────────┐
│              YOUR NEXT.JS APP ON VERCEL                   │
│                                                          │
│  ┌─────────────────┐    ┌─────────────────────────────┐  │
│  │  Spark Client   │    │   Vercel Platform Features  │  │
│  │                 │    │                             │  │
│  │  • searchList-  │    │  • ISR revalidation         │  │
│  │    ings()       │◄──►│  • Image optimization       │  │
│  │  • getListing() │    │  • Edge caching             │  │
│  │  • validate()   │    │  • Auto-sitemap generation  │  │
│  │  • getSystem()  │    │  • Streaming + Suspense     │  │
│  └─────────────────┘    └─────────────────────────────┘  │
│                                                          │
│  Routes:                                                 │
│  /                    → Hero + featured listings         │
│  /listings            → Search with filters + pagination │
│  /listings/[id]       → Detail page + photos + SEO       │
│  /sitemap.xml         → Auto-generated MLS sitemap       │
└──────────────────────────────────────────────────────────┘
│
▼
┌───────────────────────┐
│     SPARK API (FBS)   │
│                       │
│  sparkapi.com/v1      │
│                       │
│  • Listings           │
│  • Photos / Media     │
│  • Open Houses        │
│  • Agents / Offices   │
│  • MLS System Info    │
└───────────────────────┘

## 📁 Project Structure

spark-idx-integration/
│
├── app/
│   ├── layout.tsx                    # Root layout — dark theme, Geist fonts
│   ├── globals.css                   # Tailwind v4, glass morphism, animations
│   ├── page.tsx                      # Marketing landing page
│   │
│   ├── dashboard/
│   │   ├── layout.tsx                # Dashboard layout
│   │   └── page.tsx                  # 4-step configuration wizard
│   │                                 #   Step 1: Select Vercel project
│   │                                 #   Step 2: Enter Spark API credentials
│   │                                 #   Step 3: Configure MLS + review
│   │                                 #   Step 4: Success + next steps
│   │
│   └── api/
│       ├── callback/route.ts         # Vercel OAuth callback handler
│       ├── validate-spark/route.ts   # Validates Spark API credentials
│       └── save-config/route.ts      # Saves env vars to Vercel project
│
├── lib/
│   ├── constants.ts                  # API URLs, scopes, env var definitions
│   ├── vercel-api.ts                 # Vercel API: token exchange, projects, env vars
│   └── spark-api.ts                  # Spark API: auth, search, listings, validation
│
├── public/
│   └── logo.svg                      # Integration logo
│
├── .env.example                      # Required environment variables
├── next.config.ts                    # Image domains for Spark photos
├── tsconfig.json                     # TypeScript strict mode
├── postcss.config.mjs                # Tailwind v4 PostCSS
├── package.json                      # Dependencies
└── README.md                         # You are her

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
