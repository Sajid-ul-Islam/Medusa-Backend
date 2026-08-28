# Vercel Deployment Guide for BookHub Storefront (`apps/web`)

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code must be pushed to GitHub (`project-and-codebase-understanding-063c2` or `master`)
3. **Medusa Backend**: Deployed and accessible via HTTPS (or locally for testing)

---

## Method 1: Deploy via Vercel Web Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new) and select the `Medusa-Backend` repository.
2. Under **Project Configuration**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click **Edit** and choose:
     ```
     apps/web
     ```
   - **Build Command**: Default (`next build`)
   - **Output Directory**: Default (`.next`)
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_MEDUSA_BACKEND_URL`: Your live Medusa backend URL (e.g. `https://api.yourdomain.com`)
   - `NEXT_PUBLIC_APP_NAME`: `BookHub`
   - `NEXT_PUBLIC_APP_URL`: `https://your-storefront.vercel.app`
   - `NEXT_PUBLIC_STRIPE_KEY`: *(Optional)* Your Stripe Publishable key
4. Click **Deploy**.

---

## Method 2: Deploy via Vercel CLI from Terminal

### 1. Install & Login
```bash
npm install -g vercel
vercel login
```

### 2. Deploy from `apps/web`
```bash
cd apps/web
vercel
```

Follow the interactive prompts:
- **Set up and deploy?** → `Yes`
- **Which scope?** → Select your account
- **Link to existing project?** → `No` (or `Yes` if updating)
- **What's your project's name?** → `bookhub-storefront`
- **In which directory is your code located?** → `./`
- **Want to modify build settings?** → `No`

### 3. Deploy to Production
```bash
vercel --prod
```

---

## Step 3: Configure CORS on Medusa Backend

In your backend environment variables (e.g. on Render / Railway / Supabase) or in `apps/backend/medusa-config.js`:

```env
STORE_CORS=https://your-storefront.vercel.app,http://localhost:3000
AUTH_CORS=https://your-storefront.vercel.app
```

Restart or redeploy your Medusa backend after saving CORS values.

---

## Verification Checklist

- [ ] Homepage (`/`) loads with hero, featured books, and featured publishers.
- [ ] Catalog (`/books`) search, category pills, format filter (Physical vs eBook), and sorting work.
- [ ] Dynamic Book Detail (`/books/[handle]`) format selector and sample chapter modal open smoothly.
- [ ] Cart (`/cart`) groups line items by publisher and warns for split shipments.
- [ ] Checkout (`/checkout`) validates customer address, shipping method, and card/COD.
- [ ] Order confirmation (`/order-success/[id]`) presents digital eBook download links and receipt invoice.
- [ ] Publisher store (`/publishers/[id]`) and registration (`/publisher/register`) work.
