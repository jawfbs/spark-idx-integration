<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jawfbs/spark-idx/main/.github/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/jawfbs/spark-idx/main/.github/assets/logo-light.svg">
  <img alt="Spark IDX" src="https://raw.githubusercontent.com/jawfbs/spark-idx/main/.github/assets/logo-light.svg" width="280">
</picture>

<br />
<br />

**Headless IDX for the modern web.**
<br />
Connect real-time MLS listing data from [Spark API](https://sparkplatform.com) to any Vercel project.
<br />
Server Components · ISR caching · Image optimization — all wired up automatically.

<br />

[![Install on Vercel](https://img.shields.io/badge/Install_on_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/integrations/spark-idx)
[![View Live Demo](https://img.shields.io/badge/Live_Demo-FF6B35?style=for-the-badge&logo=googlechrome&logoColor=white)](https://spark-idx-demo.vercel.app)
[![Starter Template](https://img.shields.io/badge/Starter_Template-171515?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jawfbs/spark-idx-starter)

<br />

![Next.js 15](https://img.shields.io/badge/Next.js_15-000?style=flat-square&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind v4](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)

<br />

<img src="https://raw.githubusercontent.com/jawfbs/spark-idx/main/.github/assets/hero-screenshot.png" alt="Spark IDX property search screenshot" width="720" />

</div>

<br />

---

<br />

## The Problem

Every real estate website needs **IDX** (Internet Data Exchange) — the ability to display MLS listings on a broker's site. The existing options are awful:

| Approach | Pain |
| :--- | :--- |
| **iFrame embeds** | Slow, unstyled, zero SEO value, no control over UX |
| **IDX Broker / iHomefinder** | Cookie-cutter templates, separate hosting, poor Core Web Vitals |
| **Roll your own** | Weeks of dev work, OAuth complexity, caching headaches, MLS compliance gotchas |

<br />

## The Solution

**Spark IDX** is a Vercel Marketplace integration that eliminates all of that. Install it once, get production-ready MLS search in minutes — not weeks.

<br />

<div align="center">

```mermaid
flowchart LR
    A["🛒 Install from\nVercel Marketplace"] --> B["🔐 OAuth provisions\ncredentials"]
    B --> C["⚙️ Env vars injected\ninto your project"]
    C --> D["📦 Import SparkClient\nfetch listings"]
    D --> E["🚀 Production-ready\nproperty search"]

    style A fill:#000,stroke:#333,color:#fff
    style B fill:#1a1a2e,stroke:#333,color:#fff
    style C fill:#16213e,stroke:#333,color:#fff
    style D fill:#0f3460,stroke:#333,color:#fff
    style E fill:#FF6B35,stroke:#e55a2b,color:#fff
