# Vercel Deployment Guide for BookHub Storefront

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code must be pushed to GitHub
3. **Medusa Backend**: Must be deployed and accessible via HTTPS

## Step 1: Prepare Environment Variables

Create a `.env.production` file in the `storefront` directory with production values:

```bash
# Medusa Backend URL (MUST be HTTPS in production)
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-medusa-backend.herokuapp.com

# Stripe Public Key
NEXT_PUBLIC_STRIPE_KEY=pk_live_your_stripe_key_here

# App Configuration
NEXT_PUBLIC_APP_NAME=BookHub
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

**Important**: Never commit `.env.production` to Git. It's already in `.gitignore`.

## Step 2: Deploy via Vercel CLI

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login to Vercel

```bash
vercel login
```

### Deploy

Navigate to the storefront directory and deploy:

```bash
cd storefront
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Choose your account
- **Link to existing project?** → No (for first deployment)
- **What's your project's name?** → bookhub-storefront
- **In which directory is your code located?** → ./
- **Want to override the settings?** → No

### Deploy to Production

After the preview deployment succeeds, deploy to production:

```bash
vercel --prod
```

## Step 3: Configure Environment Variables in Vercel Dashboard

1. Go to your project on [vercel.com](https://vercel.com)
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - Your deployed Medusa backend URL
   - `NEXT_PUBLIC_STRIPE_KEY` - Your Stripe public key
   - `NEXT_PUBLIC_APP_NAME` - BookHub
   - `NEXT_PUBLIC_APP_URL` - Your Vercel app URL

4. Redeploy after adding environment variables

## Step 4: Configure CORS on Medusa Backend

Your Medusa backend must allow requests from your Vercel domain. Update `medusa-config.js`:

```javascript
const STORE_CORS = "https://your-app-name.vercel.app"
const ADMIN_CORS = "https://your-app-name.vercel.app/admin"
```

Redeploy your Medusa backend after this change.

## Step 5: Verify Deployment

1. Visit your Vercel app URL
2. Test the following:
   - Homepage loads correctly
   - Product listings display
   - Cart functionality works
   - Checkout process initiates

## Common Issues & Solutions

### Issue: API Calls Fail
**Solution**: Ensure your Medusa backend has CORS configured for your Vercel domain.

### Issue: Images Not Loading
**Solution**: Check that `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is correct and images are accessible.

### Issue: Build Fails
**Solution**: Run `npm run build` locally to identify build errors before deploying.

### Issue: Environment Variables Not Working
**Solution**: 
- Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side use
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)

## Continuous Deployment

Once connected to GitHub, Vercel will automatically deploy on every push to the main branch:

1. Push code to GitHub: `git push origin master`
2. Vercel detects the change and deploys automatically
3. Preview deployments for pull requests
4. Production deployments for merges to main/master

## Custom Domain (Optional)

To add a custom domain:

1. Go to **Settings** → **Domains** in Vercel dashboard
2. Add your domain (e.g., `www.bookhub.com`)
3. Configure DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain

## Monitoring & Logs

- View deployment logs in Vercel dashboard
- Check runtime logs under **Deployment** → **View Logs**
- Monitor performance in **Analytics** tab

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure custom domain
3. Enable Vercel Analytics
4. Set up error tracking (Sentry, etc.)
5. Implement CI/CD pipeline
