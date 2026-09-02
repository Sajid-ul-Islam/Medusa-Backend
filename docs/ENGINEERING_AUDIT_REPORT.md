# Next.js + REST API — Full Engineering Architecture & Security Audit Report

**Target Codebase:** `Medusa-Backend` (`apps/web` + `apps/backend`)  
**Auditor:** Senior Next.js Architect, Web Security Engineer & Performance Engineer  
**Date of Audit:** September 2, 2026  
**Next.js Version:** `16.3.3` (Turbopack) | **React Version:** `19.2.8` | **Language:** TypeScript 5  
**Backend:** Medusa v1 / Express / Supabase PostgreSQL / Supabase Auth  

---

# Executive Summary

This codebase is a hybrid e-commerce marketplace ("BookHub") designed for book publishers, physical delivery, and digital eBook distribution. While the UI is rich and feature-packed, the architecture suffers from **treating Next.js as a traditional React Single Page Application (SPA)**, bypassing almost all modern Next.js App Router benefits (Server Components, Data Cache, ISR, Server Actions, SEO prerendering), while introducing **critical security risks** in authentication, authorization, payment verification, and secret handling.

### Scorecard

| Dimension | Score | Rating | Primary Root Cause |
|---|:---:|:---:|---|
| **Overall Architecture** | **5.2 / 10** | Needs Refactoring | 95%+ pages are Client Components fetching data via `useEffect` (SPA pattern). |
| **Security & Auth** | **3.5 / 10** | ⚠️ Critical Risk | Client-side admin bypass, base64 unhashed tokens, unauthenticated publisher dashboard, auto-completing payments. |
| **Next.js Architecture** | **4.0 / 10** | Poor | Bypasses RSC, SSR, Data Cache, and Server Actions. Zero e-commerce SEO prerendering. |
| **Performance** | **6.5 / 10** | Moderate | Fast local rendering, but client bundle bloated with 30KB+ embedded JSON mocks. |
| **Maintainability** | **5.8 / 10** | Moderate | 1,369-line monolithic dashboard, 813-line monolithic API helper, 35+ `: any` types. |
| **Data/API Architecture** | **5.0 / 10** | Moderate | Client-side Axios fetching with client-side localStorage fallback mutation engine. |

---

# Architecture Diagram

```text
┌────────────────────────────────────────────────────────────────────────┐
│                                BROWSER                                 │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Client Contexts: AuthContext, CartContext, RewardsContext, Theme │  │
│  │ LocalStorage / SessionStorage: admin_session, cart, tokens       │  │
│  └─────────────────────────────────┬────────────────────────────────┘  │
└────────────────────────────────────┼───────────────────────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼ (Client-side Axios / Fetch)           ▼ (Direct OAuth)
┌───────────────────────────────────────────────────┐  ┌─────────────────┐
│              Next.js 16 Frontend App              │  │  Supabase Auth  │
│                                                   │  │  (OAuth popup   │
│  • Edge Proxy: apps/web/src/proxy.ts              │  │   & Callback)   │
│  • Client Components (95% of routes):             │  └─────────────────┘
│    - /books, /books/[handle] (useEffect fetch)    │
│    - /publishers, /publishers/[id]                │
│    - /admin/*, /publisher/* (Client auth gate)    │
│  • Server Components (5%):                        │
│    - Root layout.tsx & home page shell            │
│  • Route Handler: /auth/callback (OAuth code ex)  │
│  • Client Mock Fallback: lib/medusa.ts (30KB mock)│
└─────────────────────────┬─────────────────────────┘
                          │ (HTTP REST / JSON)
                          ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Medusa v1 Express REST API (Port 9000)                │
│                                                                        │
│  • Custom Store Endpoints: /store/publishers, /store/payments/verify   │
│  • Admin Endpoints: /admin/auth, /admin/onboarding                     │
│  • TypeORM Data Layer                                                  │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │ (PostgreSQL Connection Pool)
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│               Supabase Cloud Database (PostgreSQL 15)                  │
│                                                                        │
│  • 102 E-commerce & Publisher Tables                                  │
│  • Host: aws-0-ap-southeast-1.pooler.supabase.com:5432                 │
└────────────────────────────────────────────────────────────────────────┘
```

---

# Critical Findings (P0 / P1)

### 🚨 Finding 1 [CRITICAL - Auth]: Client-Side Admin Bypass & Plaintext LocalStorage Session
* **Location:** [`apps/web/src/app/admin/login/page.tsx`](file:///home/bearded/Public/Medusa-Backend/apps/web/src/app/admin/login/page.tsx#L47-L70), [`apps/web/src/app/admin/dashboard/page.tsx`](file:///home/bearded/Public/Medusa-Backend/apps/web/src/app/admin/dashboard/page.tsx#L58-L68)
* **Severity:** `P0 - CRITICAL`
* **Problem:** Admin authentication checks if credentials match `"admin@medusa-test.com"` and `"supersecret"`. If so, it writes `{ user, token: "adm_token_supersecret_verified" }` to `localStorage` under `medusa_admin_session`. The admin dashboard merely checks `localStorage.getItem("medusa_admin_session")` without any server-side validation.
* **Impact:** Any visitor can open browser DevTools, execute `localStorage.setItem("medusa_admin_session", "{}")`, refresh the page, and gain access to the platform administrative dashboard.
* **Fix:** Transition Admin authentication to HttpOnly encrypted session cookies validated via Next.js Server Components / Middleware with real backend signature validation.

---

### 🚨 Finding 2 [CRITICAL - Auth]: Publisher Token is Unsigned Base64 Email
* **Location:** [`apps/backend/src/api/store/publishers/auth/route.ts`](file:///home/bearded/Public/Medusa-Backend/apps/backend/src/api/store/publishers/auth/route.ts#L27), [`apps/web/src/app/publisher/login/page.tsx`](file:///home/bearded/Public/Medusa-Backend/apps/web/src/app/publisher/login/page.tsx#L62)
* **Severity:** `P0 - CRITICAL`
* **Problem:** The backend generates publisher tokens using:
  ```typescript
  token: "pub_token_" + Buffer.from(email).toString("base64")
  ```
* **Impact:** Complete identity spoofing. Any malicious actor who knows a publisher's email address (e.g. `oreilly@media.com`) can generate `"pub_token_b3JlaWxseUBtZWRpYS5jb20="` and forge API requests.
* **Fix:** Issue real cryptographically signed JWTs with expiration (`exp`), signed by `JWT_SECRET`, or leverage Supabase Auth sessions with Row Level Security (RLS).

---

### 🚨 Finding 3 [CRITICAL - Auth]: Publisher Dashboard Has Zero Authentication Protection
* **Location:** [`apps/web/src/app/publisher/dashboard/page.tsx`](file:///home/bearded/Public/Medusa-Backend/apps/web/src/app/publisher/dashboard/page.tsx#L33-L75)
* **Severity:** `P0 - CRITICAL`
* **Problem:** There is NO authentication gate, cookie check, session check, or token check in `PublisherDashboard`.
* **Impact:** Anyone visiting `/publisher/dashboard` can access the entire publisher management interface, modify mock inventory, access payout tabs, and view seller settings.
* **Fix:** Add an authentication guard checking for a valid publisher session, redirecting unauthenticated users to `/publisher/login`.

---

### 🚨 Finding 4 [CRITICAL - Payment]: Payment Verification Auto-Approves Arbitrary Transactions
* **Location:** [`apps/backend/src/api/store/payments/verify/route.ts`](file:///home/bearded/Public/Medusa-Backend/apps/backend/src/api/store/payments/verify/route.ts#L48-L53)
* **Severity:** `P0 - CRITICAL`
* **Problem:**
  ```typescript
  // Default manual/instant verification
  res.status(200).json({
    success: true,
    provider: provider || "manual",
    status: "COMPLETED",
    verifiedAt: new Date().toISOString(),
  });
  ```
* **Impact:** If an attacker posts an invalid or fake payment provider payload, the backend automatically flags the payment as `COMPLETED`, allowing unauthorized order completion without actual fund capture.
* **Fix:** Enforce strict provider matching, server-side HMAC validation for bKash / SSLCommerz callbacks, and reject unverified requests.

---

### 🚨 Finding 5 [HIGH - Security]: Database Connection String & Password in Local Files
* **Location:** [`apps/backend/.env`](file:///home/bearded/Public/Medusa-Backend/apps/backend/.env#L7-L10)
* **Severity:** `P1 - HIGH`
* **Problem:** The direct Supabase PostgreSQL password (`Tt2khyJ7OGwjk1H2`) and connection pooler string are stored in plain text in `apps/backend/.env`.
* **Impact:** Risk of credential leakage if `.env` is inadvertently committed or server backups are exposed.
* **Fix:** Rotate the database password, keep only `.env.example` in repositories, and inject secrets via environment secret managers (Vercel / Render Environment Vaults).

---

# Next.js Architecture Findings

### Anti-Pattern 1: React SPA inside Next.js (Missing Server Components)
* **Evidence:** 32 out of 34 components/pages in `apps/web/src` start with `"use client";`.
* **Problem:**
  - `apps/web/src/app/books/page.tsx`
  - `apps/web/src/app/books/[handle]/page.tsx`
  - `apps/web/src/app/publishers/page.tsx`
  - `apps/web/src/app/publishers/[id]/page.tsx`
  All catalog and book detail pages are client components that render an empty loading skeleton on the server and fetch data in the browser with `useEffect`.
* **Impact:**
  1. **Zero SEO Indexability:** Web crawlers received empty skeletons. Product titles, descriptions, pricing, open-graph tags, and structured schema (`JSON-LD`) are absent from initial HTML.
  2. **Layout Shift (CLS):** Users experience content popping after client-side network roundtrips.
  3. **Performance Penalty:** The browser must download, parse, and execute client JavaScript before starting the data fetch.
* **Recommended Fix:**
  Convert `books/[handle]/page.tsx` and `books/page.tsx` to **Async Server Components**:
  ```tsx
  // app/books/[handle]/page.tsx (Server Component)
  export async function generateMetadata({ params }): Promise<Metadata> {
    const { product } = await getProduct(params.handle);
    return {
      title: `${product.title} | BookHub`,
      description: product.description,
      openGraph: { images: [product.thumbnail] },
    };
  }

  export default async function BookDetailPage({ params }) {
    const { product } = await getProduct(params.handle);
    if (!product) notFound();
    return (
      <BookView product={product}>
        <ClientInteractiveSection productId={product.id} />
      </BookView>
    );
  }
  ```

---

# Backend / REST API Architecture Findings

### 1. Monolithic 813-Line API File (`apps/web/src/lib/medusa.ts`)
* **Problem:** Combines Axios client creation, cart token storage in `localStorage`, 28 static sample books (with chapters), sample publishers, cart mutation logic, fallback calculations, and API wrappers in a single file.
* **Impact:** Bloats the client bundle by importing 30KB+ of static mock JSON into every page that references `lib/medusa.ts`.
* **Fix:** Separate into:
  - `lib/api/client.ts` (fetch-based typed client)
  - `lib/api/products.ts`
  - `lib/api/cart.ts`
  - `lib/api/publishers.ts`
  - `lib/mock/data.ts` (only imported conditionally on server or dev)

### 2. Client-Side Mock Mutation Engine
* **Problem:** When backend API calls fail (e.g. backend offline or slow), `medusa.ts` simulates cart operations by reading/writing to `localStorage.getItem("bookhub_mock_cart")`.
* **Impact:** Leads to state drift where the client believes an item is in the cart or an order is completed, but the backend database has no record of it.

---

# Authentication & Authorization Findings

| Auth Scope | Current Implementation | Security Risk | Recommended Architecture |
|---|---|---|---|
| **Admin Auth** | `localStorage.getItem("medusa_admin_session")` with hardcoded test credentials | Critical (Client-side bypass) | HttpOnly Cookie + Next.js Server Component verification with backend `/admin/auth` verification. |
| **Publisher Auth** | Unsigned `Buffer.from(email).toString("base64")` | Critical (Identity Spoofing) | Signed JWT with expiration or Supabase Auth with publisher role claims. |
| **Customer Auth** | Supabase OAuth (Google/Facebook) + `/auth/callback` code exchange | Good foundation | Persist Supabase session in Secure HttpOnly cookies (using `@supabase/ssr`). |
| **Guest Checkout** | Form inputs prefilled from client state | Safe for guests | Validate shipping address & calculate server-side pricing before charge. |

---

# Security Findings

### 1. Missing Rate Limiting on Authentication Routes
* The Medusa backend endpoints (`/admin/auth`, `/store/publishers/auth`) do not implement rate limiting (e.g. `express-rate-limit`).
* **Vulnerability:** Susceptible to brute-force credential stuffing.

### 2. Loose CORS Configuration
* `apps/backend/medusa-config.js` sets `STORE_CORS` to include `https://vercel.app` (which matches any subdomain on vercel.app).
* **Fix:** Restrict CORS specifically to exact domains (e.g. `https://bookhub.vercel.app`, `http://localhost:3000`).

### 3. Missing Content Security Policy (CSP)
* `next.config.ts` sets `X-Frame-Options`, `X-Content-Type-Options`, and `Strict-Transport-Security`, but lacks a Content Security Policy (`Content-Security-Policy`).

---

# Caching & Data Fetching Findings

### Current Caching Score: 2 / 10
* **Problem:** Because data fetching is performed via client-side Axios inside `useEffect`, Next.js 16's Data Cache and fetch memoization are **completely unused**.
* **Target Caching Strategy:**
  1. **Products Catalog (`/books`):** ISR with `revalidate: 300` (5 minutes) or cache tags `['products']`.
  2. **Product Detail (`/books/[handle]`):** ISR with `revalidate: 60` or on-demand revalidation on publisher product update.
  3. **Publishers List (`/publishers`):** Static / ISR with `revalidate: 3600` (1 hour).
  4. **Cart & User Orders:** Dynamic Server Components (`no-store` / `cookies()`).

---

# State Management Findings

* **Context Proliferation:** 4 client context providers (`ThemeProvider`, `ToastProvider`, `RewardsContext`, `CartContext`) wrap the root layout.
* **Storage Fragmentation:**
  - `localStorage`: `medusa_cart_id`, `medusa_admin_session`, `publisher_session`, `bookhub_theme`, `bookhub_rewards_*`, `bookhub_mock_cart`.
  - `sessionStorage`: `bookhub_applied_discount`, `bookhub_gift_option`, `order_*`.
* **Impact:** Potential hydration mismatches between SSR and client-side storage, plus risk of stale discount/gift state across browser tabs.

---

# Performance & Asset Audit

### Top 5 Performance Bottlenecks:
1. **Embedded Mock Data in Client Bundles:** 30KB+ of `SAMPLE_BOOKS` and `SAMPLE_PUBLISHERS` imported into client chunks.
2. **Missing Server-Side Render for SEO & LCP:** Largest Contentful Paint (LCP) waits for client hydration and secondary Axios network call.
3. **Unoptimized `<img>` Tags:** `Header.tsx`, `MobileBottomNav.tsx`, and `FeaturedPublishers.tsx` use raw `<img>` instead of `next/image`, losing automatic WebP/AVIF compression and responsive srcsets.
4. **Monolithic Components:** `PublisherDashboard` is 1,369 lines and includes charts, forms, and CSV parsers in a single bundle.
5. **No Code-Splitting for Reader/Audiobook Modals:** `EBookReaderModal` and `AudiobookPlayer` are loaded eagerly on product detail pages even when not opened.

---

# AI-Code & Over-Engineering Findings

1. **Client-Side Fake Provider Engine (`lib/providers/*`):**
   `courier.ts`, `drm.ts`, and `payment.ts` implement full TypeScript interfaces with simulated delay loops, random transaction IDs, and client-generated DRM hashes. While functional for UI demos, having client-side code simulate payment approval is dangerous if connected directly to checkout flows without server confirmation.
2. **Duplicated Formatting Logic:** Multiple components had duplicate BDT currency formatting before `utils.ts` was introduced.
3. **Hardcoded Mock Fallbacks:** Almost every API method in `medusa.ts` silently falls back to mock data on network failure without notifying the user of offline status.

---

# Quick Wins (High Impact, Low Effort)

1. **Gate `/publisher/dashboard` with Auth Check:** Add session check to prevent unauthorized dashboard access.
2. **Replace `<img>` with `next/image`:** In `Header.tsx`, `FeaturedPublishers.tsx`, and `MobileBottomNav.tsx`.
3. **Lazy-Load Heavy Modals:** Use `dynamic(() => import(...))` for `EBookReaderModal` and `AudiobookPlayer`.
4. **Fix CORS Regex:** Remove wildcard `https://vercel.app` from `apps/backend/medusa-config.js` and specify exact domains.
5. **Add Rate Limiting:** Add `express-rate-limit` on `/admin/auth` and `/store/publishers/auth`.

---

# Recommended Target Architecture

```text
Browser
   │
   ▼
Next.js 16 App Router (Edge & Node Runtime)
   ├── Server Components (Default)
   │     ├── /books/[handle] (Server-rendered + ISR + Metadata + JSON-LD)
   │     ├── /books (Server-rendered catalog + URL search params)
   │     └── /publishers (Static / ISR)
   │
   ├── Client Component Islands (Interactive only)
   │     ├── AddToCartButton & CartDrawer
   │     ├── LiveSearchBar
   │     └── CategoryPills
   │
   ├── Server Actions & Route Handlers
   │     ├── Server Action: addToCart(), applyCoupon()
   │     ├── Server Action: initiatePayment() (Secured with backend credentials)
   │     └── Route Handler: /auth/callback (Supabase OAuth session exchange)
   │
   └── Data Access Layer (DAL) + Next.js Data Cache
         ├── fetch(url, { next: { tags: ['products'], revalidate: 300 } })
         └── Authenticated DAL (HttpOnly Cookie token forwarding)
                   │
                   ▼
     Medusa Backend & Supabase Cloud PostgreSQL
```

---

# Prioritized Roadmap

### Phase 1 — Security & Critical Authentication (P0)
1. Remove client-side admin bypass (`medusa_admin_session` in `localStorage`).
2. Implement cryptographic JWT generation and verification for Publisher Auth.
3. Enforce authentication guards on `/publisher/dashboard` and `/admin/dashboard`.
4. Secure the backend `/store/payments/verify` endpoint against unverified auto-completion.
5. Restrict CORS origins in `medusa-config.js`.

### Phase 2 — Next.js App Router Architecture & SEO (P1)
1. Convert `app/books/[handle]/page.tsx` to an **Async Server Component** with `generateMetadata`.
2. Convert `app/books/page.tsx` and `app/publishers/page.tsx` to Server Components with server-side data fetching.
3. Isolate client interactive elements (`AddToCartButton`, `CategoryFilterTabs`, `ReviewsModal`) into small leaf client components.
4. Separate `lib/medusa.ts` into modular, typed API files.

### Phase 3 — Caching & Performance Optimization (P2)
1. Implement Next.js Data Cache tags (`next: { tags: ['products'] }`) with on-demand revalidation.
2. Dynamically import heavy interactive modals (`EBookReaderModal`, `AudiobookPlayer`).
3. Replace all raw `<img>` instances with Next.js `<Image />`.
4. Move `SAMPLE_BOOKS` out of the client bundle into server-only data files.

### Phase 4 — Maintainability & Type Safety (P3)
1. Decompose `PublisherDashboard` (1,369 lines) into modular subcomponents (`OverviewTab`, `InventoryTab`, `PayoutsTab`, `SaaSSubscriptionTab`).
2. Replace all 35+ `: any` types with strict TypeScript interfaces and Zod schemas.
3. Consolidate `sessionStorage` and `localStorage` state into structured storage utilities.

---

# Final Verdict: 10 Critical Architectural Questions

1. **Is this actually using Next.js properly?**  
   *No.* It is currently structured as a React SPA running inside Next.js App Router. Almost all pages use `"use client"` and `useEffect` fetching.

2. **Where is it behaving like a traditional React SPA?**  
   Every product catalog page (`/books`), book detail page (`/books/[handle]`), and publisher page renders empty loading state on the server and fetches data from the browser.

3. **Are Server/Client boundaries correct?**  
   *No.* Boundaries are drawn at the page root level rather than at interactive leaf components.

4. **Is the REST API architecture sound?**  
   *Partially.* Medusa + Supabase provides a solid database model, but the frontend API layer (`medusa.ts`) is a giant monolithic file with client-side mock mutations.

5. **Is authentication secure?**  
   *No.* Admin login has a client-side bypass, Publisher tokens are unhashed base64 strings, and the Publisher dashboard lacks an auth gate.

6. **Is authorization secure?**  
   *No.* Object-level authorization and role-based route protection are enforced only on the client.

7. **Is sensitive data exposed?**  
   *Yes.* Production DB connection parameters exist in `.env`, and unhashed tokens expose email addresses.

8. **Is caching correctly designed?**  
   *No.* Next.js Data Cache and ISR are 0% utilized because fetching happens in browser Axios calls.

9. **Is state management justified?**  
   *Mostly.* The React Contexts (Cart, Rewards, Theme, Auth) are appropriate, but state is fragmented across `localStorage` and `sessionStorage`.

10. **What are the 5 most important things to fix first?**  
    1. Fix Admin and Publisher Authentication & Authorization (remove client-side bypass).
    2. Secure the Payment Verification backend endpoint.
    3. Convert Book Detail & Catalog pages to Next.js Server Components for SEO and performance.
    4. Modularize `lib/medusa.ts` and remove static mock data from the client bundle.
    5. Add Next.js Data Cache & ISR revalidation.
