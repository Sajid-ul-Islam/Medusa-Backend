# 📚 BookHub: Multi-Store Book Publishing & Author Marketplace

A production-grade, SaaS-enabled multi-publisher book marketplace platform built with **Medusa.js v1 Backend**, **Next.js 16 (Turbopack) Frontend**, and **Supabase Cloud PostgreSQL**.

---

## 🌟 Key Platform Features

### 🛒 1. B2C Consumer & Reader Experience Suite
* **Slide-Over Quick Cart Drawer**: Opens automatically upon adding books with quantity adjustments, promo inputs, and **1-Click bKash Express Checkout**.
* **🚚 Free Delivery Threshold Tracker**: Live visual progress meter encouraging cart additions (e.g. *"Add ৳320 more for FREE Delivery across Bangladesh! 🚚"*).
* **🎁 "Gift a Book" with Custom Greeting Note**: 1-click gift option with luxury ribbon wrapping (+৳50) and customized handwritten messages, automatically hiding price invoices on packing slips.
* **📦 Frequently Bought Together (Bundle & Save)**: Dynamic companion book packs with 1-click bundle addition and savings badges (Save ৳150).
* **💬 1-Click WhatsApp Quick Order**: Instant order trigger for non-tech readers, pre-populating WhatsApp with book title, variant price, and delivery address templates.
* **📖 In-Browser Interactive eBook Reader**: Distraction-free web reader with Warm Sepia, Classic White, and Midnight Dark themes, font scaling (`A-` / `A+`), chapter navigators, and dynamic anti-piracy watermarking.
* **🪙 BookHub Rewards & Daily Reading Streaks**: Reader coin wallet (🪙 150 welcome bonus), daily reading streak bonuses (🔥 +25 coins/day), and 1-click coin redemption at checkout.
* **📖 Customer "Request a Book" Portal (`/request-book`)**: Sourcing portal where readers can request rare, out-of-print, Islamic, academic, or foreign titles broadcasted across 15+ publisher warehouses.
* **💖 Personal Bookshelf Wishlist**: 1-click heart button saving physical books and eBooks to localStorage reading lists.
* **🎙️ Audiobook Voice Preview Player**: Embedded sample player with waveform scrubber and variable playback speeds (`1x`, `1.25x`, `1.5x`, `2x`).
* **⭐ Customer Reviews & Verified Buyer Badges**: 1–5 star rating distributions with verified purchaser badges.

---

### 🏪 2. Publisher SaaS Portal & Power Tools
* **👑 SaaS Tier Subscriptions & Billing**:
  * **Starter (Free)**: 15% marketplace commission, up to 25 titles, standard dropoff.
  * **Pro Publisher (৳1,499/mo)**: 8% platform cut, unlimited titles, branded subdomain (`pub.bookhub.bd`), 48h direct bKash payouts, priority Pathao pickup.
  * **Enterprise Flagship (৳4,999/mo)**: **4% lowest platform cut**, custom domain (`books.pub.com`), instant bank settlement, dedicated DRM watermarking, bulk barcode thermal printers.
  * Monthly invoice billing history with 1-click PDF receipt downloads.
* **🎨 Storefront & Branding Customizer**: Custom banner, logo, brand tagline, bio/story, physical address, and official Facebook page with a **Live Customer Storefront Preview Canvas**.
* **📊 Visual Sales Analytics & Telemetry**: 7-day revenue trend bar charts, physical paperback (64%) vs. digital eBook (36%) format splits, and courier dispatch velocity trackers.
* **📁 30-Second Excel/CSV Bulk Book Importer**: 1-click sample CSV template download (`bookhub_bulk_catalog_template.csv`), drag-and-drop parser, preview table, and bulk upload.
* **🖥️ 1-Click Desktop Mode Switcher on Mobile**: Dedicated toggle allowing mobile publishers to inspect spreadsheets and management tables in full desktop layout.

---

### 🇧🇩 3. Bangladeshi Payment Gateways & Localized Currency (BDT ৳)
* **bKash Tokenized Checkout**: Fast mobile payment with OTP/PIN flow & TrxID verification.
* **Nagad Direct Pay**: Direct mobile wallet checkout.
* **SSLCommerz Multi-Gateway**: Visa, Mastercard, AMEX, DBBL Nexus Card, City Bank, BRAC Bank, Internet Banking.
* **Cash on Delivery (COD)**: Physical doorstep delivery payment across all 64 districts in Bangladesh.
* **Currency**: Standardized **Bangladeshi Taka (BDT - ৳)** across storefront, database, carts, and invoices.

---

### 🔌 4. SaaS Modular Provider Architecture (`apps/web/src/lib/providers/`)
* **Modular Courier Provider (`ICourierProvider`)**: Pluggable adapters for **Pathao Express** and **Steadfast Courier** with automatic fee calculation and 4-step live tracking.
* **Modular Payment Provider (`IPaymentProvider`)**: Swappable adapters for **bKash**, **Nagad**, and **SSLCommerz**.
* **Modular DRM & Anti-Piracy Engine (`IDRMProvider`)**: Dynamic watermarking stamping customer email, order ID, TrxID, and SHA256 verification hashes into eBooks.
* **Multi-Tenant Subdomain Edge Router (`proxy.ts`)**: Next.js 16 Edge proxy router resolving publisher subdomains (`batighar.bookhub.com.bd`) to tenant storefronts with SaaS security headers.

---

### 🎨 5. 3-Palette Theme Switcher & PWA Support
* **Warm Literary** *(Default)*: Amber gold (`#d97706`), warm parchment cream (`#faf8f5`), midnight stone.
* **Oxford Forest**: Academic forest emerald (`#059669`), sage highlights, warm ivory background.
* **Modern Indigo**: Tech indigo (`#4f46e5`), minimalist obsidian, high-contrast dark elements.
* **Progressive Web App (PWA)**: Silent background Service Worker caching, web app manifest, and crisp vector icons.

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS 16 STOREFRONT                    │  👉 Host: VERCEL
│  • Public Marketplace (/books, /publishers, /cart)          │
│  • Customer Book Request Portal (/request-book)             │
│  • Publisher SaaS Portal (/publisher/dashboard)             │
│  • Admin Management Portal (/admin/login, /admin/dashboard) │
│  • Multi-Tenant Edge Router (proxy.ts)                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼ (REST API / HTTPS)
┌─────────────────────────────────────────────────────────────┐
│                    MEDUSA.JS ENGINE                         │  👉 Host: RENDER / RAILWAY
│  • Express Server on port 9000                              │
│  • Embedded Admin Portal (https://.../admin)                │
│  • bKash, Nagad, SSLCommerz Provider Services               │
│  • Multi-Vendor Publisher Route Handlers                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼ (IPv4 Pooler with SSL)
┌─────────────────────────────────────────────────────────────┐
│                 SUPABASE CLOUD POSTGRESQL                   │  👉 Host: SUPABASE
│  • 15 Verified Publishers & 20+ Physical/Digital Books     │
│  • 78 Core Medusa Tables + Publisher Entity                 │
│  • BDT (৳) Default Currency Ledger                          │
│  • Payment & Fulfillment Provider Registries                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📚 Seeded Catalog Summary

The database and storefront include **15 verified publishing houses** and **20+ curated titles**:

* **Islamic Literature & Hadith**: Guardian Publications, Somokalin Prokashon, Islamic Foundation Bangladesh, Shian Publications (*Paradoxical Sajid, Bela Phurabar Age, Ar-Raheeq Al-Makhtum, Tafsir Maariful Quran, Sahih Bukhari*).
* **Bengali Classics & Fiction**: Batighar, Prothoma, Mawla Brothers, Somoy, Anyaprokash, Tamralipi (*Jochhona O Jononir Golpo, Devi, Shongkhonil Karagar, Dipaboli, Ekattorer Dinguli, Cratcher Colonel*).
* **Technology & Computer Science**: O'Reilly Media, MIT Press, Oxford Academic (*Designing Data-Intensive Applications, Clean Architecture, Introduction to Algorithms CLRS 4th Ed, Deep Learning, Grokking Algorithms*).
* **Global Classics & Self-Improvement**: Penguin Classics, HarperCollins (*Atomic Habits, Sapiens, The Alchemist, The Great Gatsby*).

---

## 🔑 Default Master Admin Credentials

* **Admin Portal (Render)**: `https://medusa-backend-p4cl.onrender.com/admin`
* **Admin Portal (Storefront)**: `https://your-frontend.vercel.app/admin/login`
* **Email**: `admin@medusa-test.com`
* **Password**: `supersecret`

---

## 🚀 Local Development Quickstart

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Build backend server
cd apps/backend && npm run build:server

# 3. Seed live database catalog (Publishers & Books)
node seed-catalog.js

# 4. Start Medusa backend (runs on http://localhost:9000)
node index.js

# 5. In a separate terminal, start Next.js storefront (runs on http://localhost:3000)
cd apps/web && npm run dev
```

---

## 📂 Monorepo Structure

```
/
├── apps/
│   ├── backend/               # Medusa.js backend & embedded admin portal
│   │   ├── src/api/           # REST endpoints (publishers, payments, auth)
│   │   ├── src/models/        # TypeORM entities (Publisher, Onboarding)
│   │   ├── src/services/      # Business logic (bKash, SSLCommerz, Publisher)
│   │   ├── seed-catalog.js    # PostgreSQL catalog enrichment script
│   │   └── admin-portal.js    # Self-contained Admin UI served on Render
│   └── web/                   # Next.js 16 storefront (Turbopack)
│       ├── src/app/           # App router (/books, /publishers, /cart, /checkout, /request-book)
│       ├── src/components/    # UI components (CartDrawer, EBookReaderModal, FlashSaleCountdown)
│       ├── src/context/       # Contexts (CartContext, ThemeContext, RewardsContext)
│       ├── src/lib/providers/ # Modular adapters (courier.ts, payment.ts, drm.ts)
│       └── src/proxy.ts       # Next.js 16 Multi-tenant edge router
└── package.json               # Root workspace configuration
```
