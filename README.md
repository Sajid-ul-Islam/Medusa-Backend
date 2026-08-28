# 📚 BookHub: Multi-Store Book Publishing Marketplace

A production-grade, multi-store book publishing marketplace built with **Medusa.js v1 Backend**, **Next.js 16 (Turbopack) Frontend**, and **Supabase Cloud PostgreSQL**.

---

## 🌟 Key Platform Features

### 🇧🇩 1. Bangladeshi Payment Gateways & Localized Currency (BDT ৳)
* **bKash Direct Checkout**: Fast mobile account payment with OTP/PIN flow & instant TrxID confirmation.
* **Nagad Mobile Wallet**: Direct wallet checkout with transaction ID verification.
* **SSLCommerz Multi-Gateway**: Visa, Mastercard, DBBL Nexus Card, City Bank, BRAC Bank, Internet Banking.
* **Cash on Delivery (COD)**: Physical doorstep delivery payment across all 64 districts in Bangladesh.
* **Currency**: Standardized **Bangladeshi Taka (BDT - ৳)** across storefront, database, carts, and invoices.

### 🏪 2. Multi-Store Publisher Architecture
* Independent bookstore and author profiles (*O'Reilly Media, Oxford Academic Press, Penguin Classics*).
* Dedicated **Publisher Portal** (`/publisher/dashboard`) with:
  * Book catalog & physical inventory manager.
  * Automated **85% Publisher / 15% Platform Commission** revenue splits.
  * Configurable **bKash Merchant Account** & **Bangladeshi Bank Account** wire transfers.

### 🎨 3. Dynamic Multi-Theme Switcher (3 Selectable Palettes)
* **Warm Literary** *(Default)*: Amber gold (`#d97706`), warm parchment cream (`#faf8f5`), midnight stone.
* **Oxford Forest**: Academic forest emerald (`#059669`), sage highlights, warm ivory background.
* **Modern Indigo**: Tech indigo (`#4f46e5`), minimalist obsidian, high-contrast dark elements.
* **Persistent Theme Selector**: Switcher in navbar saving user choice to `localStorage` with ambient glow hero lighting.

### 🛡️ 4. Anti-Piracy Digital Watermarking Engine
* Dynamically stamps purchaser identity (*Name, Email, Order #, Payment TrxID, and SHA256 DRM Hash*) directly onto eBook PDF and ePub license downloads.

### 📱 5. Mobile App-Like Bottom Navigation Bar
* Sticky bottom navigation bar for mobile devices (`Home`, `Books`, `Bag Counter`, `Publishers`, `Admin`).

### ⭐ 6. Customer Reviews & Verified Buyer Badges
* 1–5 star rating distributions, verified purchaser badges, and interactive "Write a Review" modal.

### 🎙️ 7. Audiobook Sample Preview Player
* Embedded voice preview player with waveform scrubber and variable playback speeds (`1x`, `1.25x`, `1.5x`, `2x`).

### 🏷️ 8. Promo Codes & Discount Voucher Engine
* Integrated cart voucher validator (`BOIMELA20` for 20% off, `EID100` for ৳100 flat discount).

### 🚚 9. Pathao / Steadfast Courier Live Tracking
* 4-step physical delivery tracker (*Order Placed → Packed → In Transit → Out for Delivery*).

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS STOREFRONT                       │  👉 Deploy to: VERCEL
│  • Public Marketplace (/books, /publishers, /cart)          │
│  • Publisher Portal (/publisher/dashboard)                  │
│  • Admin Management Portal (/admin/login, /admin/dashboard) │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼ (REST API / HTTPS)
┌─────────────────────────────────────────────────────────────┐
│                    MEDUSA.JS ENGINE                         │  👉 Deploy to: RENDER / RAILWAY
│  • Express Server on port 9000                              │
│  • Embedded Admin Portal (https://.../admin)                │
│  • bKash, Nagad, SSLCommerz Services                        │
│  • Multi-Vendor Publisher Route Handlers                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼ (IPv4 Pooler with SSL)
┌─────────────────────────────────────────────────────────────┐
│                 SUPABASE CLOUD POSTGRESQL                   │  👉 Host: SUPABASE
│  • 78 Core Medusa Tables + Publisher Entity                 │
│  • BDT (৳) Default Currency Ledger                          │
│  • Payment & Fulfillment Provider Registries                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔑 Default Master Admin Credentials

* **Admin Portal (Render)**: `https://medusa-backend-p4cl.onrender.com/admin`
* **Admin Portal (Vercel)**: `https://your-frontend.vercel.app/admin/login`
* **Email**: `admin@medusa-test.com`
* **Password**: `supersecret`

---

## 🚀 Local Development Quickstart

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Build backend server
cd apps/backend && npm run build:server

# 3. Start Medusa backend (runs on http://localhost:9000)
node index.js

# 4. In a separate terminal, start Next.js storefront (runs on http://localhost:3000)
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
│   │   └── admin-portal.js    # Self-contained Admin UI served on Render
│   └── web/                   # Next.js 16 storefront
│       ├── src/app/           # App router (/books, /publishers, /cart, /checkout)
│       ├── src/components/    # UI components (AudiobookPlayer, BookReviews, ThemeSwitcher)
│       └── src/context/       # Contexts (CartContext, ThemeContext)
└── package.json               # Root workspace configuration
```
