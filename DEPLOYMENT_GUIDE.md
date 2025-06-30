# Production Deployment Guide

## 1. Supabase Setup (Backend & Database)

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key
3. Go to Settings > API and copy:
   - Project URL
   - Anon public key
   - Service role key (keep secure!)

### Deploy Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Run the migration files in order:
   - `supabase/migrations/20250628121428_holy_rain.sql`
   - `supabase/migrations/20250628121440_purple_math.sql`

### Deploy Edge Functions
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy all functions
supabase functions deploy create-payment-intent
supabase functions deploy create-subscription
supabase functions deploy stripe-webhook
supabase functions deploy token-operations
supabase functions deploy mining-operations
supabase functions deploy staking-operations
```

### Set Environment Variables in Supabase
Go to Settings > Edge Functions and add:
```
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

## 2. Stripe Setup (Payment Processing)

### Create Stripe Account
1. Sign up at [stripe.com](https://stripe.com)
2. Get your API keys from Dashboard > Developers > API keys
3. Create webhook endpoint: `https://YOUR_SUPABASE_URL/functions/v1/stripe-webhook`
4. Select events: `customer.*`, `payment_intent.*`, `invoice.*`, `subscription.*`

### Create Products & Prices
```bash
# Pro Creator Monthly
stripe products create --name="Pro Creator" --description="Monthly subscription for pro features"
stripe prices create --product=PRODUCT_ID --unit-amount=4999 --currency=usd --recurring[interval]=month --lookup-key=pro_creator

# Ultimate Bundle
stripe products create --name="Ultimate Creator Bundle" --description="One-time purchase with monthly access"
stripe prices create --product=PRODUCT_ID --unit-amount=79999 --currency=usd --lookup-key=ultimate_bundle
```

## 3. Environment Configuration

### Create Production .env
```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key

# OpenAI (optional)
VITE_OPENAI_API_KEY=your_openai_api_key

# Solana
SOLANA_RPC=https://api.mainnet-beta.solana.com
```

## 4. Frontend Deployment Options

### Option A: Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Option B: Vercel
1. Connect GitHub repository to Vercel
2. Framework preset: Vite
3. Add environment variables in Vercel dashboard

### Option C: Traditional Hosting
1. Run `npm run build`
2. Upload `dist` folder to your web server
3. Configure server for SPA routing

## 5. Domain & SSL

### Custom Domain
1. Purchase domain from registrar
2. Point DNS to your hosting provider
3. Configure SSL certificate (usually automatic)

### Subdomain Setup
- Main app: `app.yourdomain.com`
- API: `api.yourdomain.com` (points to Supabase)
- Docs: `docs.yourdomain.com`

## 6. Production Optimizations

### Performance
- Enable gzip compression
- Configure CDN (Cloudflare)
- Optimize images and assets
- Enable caching headers

### Security
- Configure CORS properly
- Set up rate limiting
- Enable security headers
- Regular security audits

### Monitoring
- Set up error tracking (Sentry)
- Configure analytics
- Monitor API performance
- Set up uptime monitoring

## 7. Testing Before Launch

### Functionality Tests
- [ ] User registration/login
- [ ] Payment processing
- [ ] Token creation
- [ ] Wallet connections
- [ ] All AI features
- [ ] Mobile responsiveness

### Security Tests
- [ ] SQL injection protection
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Authentication flows

## 8. Launch Checklist

### Pre-Launch
- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] Stripe webhooks configured
- [ ] SSL certificate active
- [ ] Error monitoring setup
- [ ] Backup strategy in place

### Post-Launch
- [ ] Monitor error rates
- [ ] Check payment flows
- [ ] Verify email delivery
- [ ] Test user registration
- [ ] Monitor performance metrics

## 9. Maintenance & Updates

### Regular Tasks
- Monitor server performance
- Update dependencies
- Review security logs
- Backup database
- Update documentation

### Scaling Considerations
- Database connection pooling
- CDN for static assets
- Load balancing if needed
- Caching strategies
- API rate limiting

## Cost Estimates (Monthly)

### Basic Setup
- Supabase Pro: $25/month
- Netlify Pro: $19/month
- Domain: $1-2/month
- **Total: ~$45-50/month**

### With Traffic (1000+ users)
- Supabase: $25-100/month
- Hosting: $19-50/month
- Stripe fees: 2.9% + 30¢ per transaction
- **Total: $50-200/month + transaction fees**

## Support & Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [React Production Build](https://reactjs.org/docs/optimizing-performance.html)