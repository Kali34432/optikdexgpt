# OptikCoin DEX - Backend Setup Guide

A comprehensive backend system built with Supabase and Stripe for the OptikCoin DEX platform.

## 🚀 Features

### Database & Authentication
- **Supabase Integration**: Complete user management, authentication, and database operations
- **Row Level Security (RLS)**: Secure data access with user-specific policies
- **Real-time Updates**: Live data synchronization across the platform

### Payment Processing
- **Stripe Integration**: Secure payment processing for subscriptions and one-time purchases
- **Webhook Handling**: Automated subscription management and payment confirmations
- **Multiple Payment Methods**: Support for cards, digital wallets, and more

### Core Functionality
- **Token Management**: Create, deploy, and manage meme coins
- **Trading System**: Buy/sell tokens with real-time price updates
- **Staking Platform**: Multiple staking pools with different APY rates
- **Mining System**: Simulated mining with rewards distribution
- **Subscription Management**: Pro Creator and Ultimate Bundle plans

### Security Features
- **Encrypted Storage**: Secure handling of sensitive user data
- **API Rate Limiting**: Protection against abuse and spam
- **Transaction Monitoring**: Real-time fraud detection and prevention
- **Audit Logging**: Comprehensive activity tracking

## 📋 Prerequisites

Before setting up the backend, ensure you have:

1. **Supabase Account**: [Sign up at supabase.com](https://supabase.com)
2. **Stripe Account**: [Sign up at stripe.com](https://stripe.com)
3. **Node.js**: Version 18 or higher
4. **Git**: For version control

## 🛠️ Setup Instructions

### 1. Supabase Setup

1. **Create a new Supabase project**:
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose your organization and enter project details

2. **Get your project credentials**:
   - Go to Settings > API
   - Copy your Project URL and anon public key
   - Copy your service role key (keep this secure!)

3. **Run database migrations**:
   - Go to SQL Editor in your Supabase dashboard
   - Run each migration file in order:
     1. `create_users_and_auth.sql`
     2. `create_tokens_and_transactions.sql`

4. **Deploy Edge Functions**:
   - Install Supabase CLI: `npm install -g supabase`
   - Login: `supabase login`
   - Link your project: `supabase link --project-ref YOUR_PROJECT_REF`
   - Deploy functions: `supabase functions deploy`

### 2. Stripe Setup

1. **Create a Stripe account** and get your API keys:
   - Go to [dashboard.stripe.com](https://dashboard.stripe.com)
   - Navigate to Developers > API keys
   - Copy your Publishable key and Secret key

2. **Create webhook endpoint**:
   - Go to Developers > Webhooks
   - Add endpoint: `https://YOUR_SUPABASE_URL/functions/v1/stripe-webhook`
   - Select events: `customer.*`, `payment_intent.*`, `invoice.*`, `subscription.*`
   - Copy the webhook signing secret

3. **Create products and prices**:
   ```bash
   # Pro Creator Monthly
   stripe products create --name="Pro Creator" --description="Monthly subscription for pro features"
   stripe prices create --product=PRODUCT_ID --unit-amount=4999 --currency=usd --recurring[interval]=month --lookup-key=pro_creator

   # Ultimate Bundle
   stripe products create --name="Ultimate Creator Bundle" --description="One-time purchase with monthly access"
   stripe prices create --product=PRODUCT_ID --unit-amount=79999 --currency=usd --lookup-key=ultimate_bundle
   ```

### 3. Environment Variables

1. **Create `.env` file** in your project root:
   ```bash
   cp .env.example .env
   ```

2. **Fill in your credentials**:
   ```env
   # Supabase
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key

   # Stripe
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key

   # OpenAI (optional)
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

3. **Set Supabase Edge Function secrets**:
   ```bash
   supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

## 🏗️ Architecture Overview

### Database Schema

#### Core Tables
- **user_profiles**: User information and subscription status
- **tokens**: Created meme coins and their metadata
- **transactions**: All platform transactions (trades, stakes, etc.)
- **subscriptions**: Stripe subscription management
- **payments**: Payment history and status
- **staking**: Staking positions and rewards
- **mining**: Mining statistics and earnings

#### Security
- Row Level Security (RLS) enabled on all tables
- User-specific access policies
- Encrypted sensitive data storage

### API Endpoints

#### Authentication
- User registration and login via Supabase Auth
- Profile management and KYC status
- Wallet connection integration

#### Payment Processing
- `/functions/v1/create-payment-intent`: One-time payments
- `/functions/v1/create-subscription`: Recurring subscriptions
- `/functions/v1/stripe-webhook`: Webhook handling

#### Token Operations
- `/functions/v1/token-operations/create`: Deploy new tokens
- `/functions/v1/token-operations/trade`: Buy/sell tokens
- `/functions/v1/token-operations/list`: Get all tokens

#### Staking & Mining
- `/functions/v1/staking-operations/*`: Staking management
- `/functions/v1/mining-operations/*`: Mining operations

### Real-time Features

The platform uses Supabase's real-time capabilities for:
- Live price updates
- Transaction confirmations
- Balance changes
- Mining statistics
- Staking rewards

## 💳 Payment Integration

### Subscription Plans

1. **Pro Creator** ($49.99/month):
   - Unlimited AI assistance
   - Advanced trading analytics
   - Priority support

2. **Ultimate Bundle** ($799.99 one-time + $99.99/month):
   - Everything in Pro Creator
   - Token creation and deployment
   - All AI-powered tools
   - Launch support

### One-time Purchases
- Website Builder AI: $99.99
- Viral GPT: $99.99
- Social Media Posts: $99.99
- Advanced LLM: $99.99
- Promotion GPT: $99.99

### Payment Flow

1. User selects plan/product
2. Frontend creates payment intent via Supabase function
3. Stripe processes payment
4. Webhook updates user subscription status
5. User gains access to premium features

## 🔒 Security Best Practices

### Data Protection
- All sensitive data encrypted at rest
- API keys stored as environment variables
- Row Level Security for data access
- Regular security audits

### Payment Security
- PCI DSS compliant via Stripe
- No card data stored on servers
- Webhook signature verification
- Fraud detection and prevention

### Access Control
- JWT-based authentication
- Role-based permissions
- API rate limiting
- CORS protection

## 📊 Monitoring & Analytics

### Database Monitoring
- Query performance tracking
- Connection pool monitoring
- Error rate analysis
- Usage statistics

### Payment Monitoring
- Transaction success rates
- Failed payment analysis
- Churn rate tracking
- Revenue analytics

### System Health
- API response times
- Error logging
- Uptime monitoring
- Performance metrics

## 🚀 Deployment

### Production Checklist

1. **Environment Setup**:
   - Set production environment variables
   - Configure Stripe live keys
   - Set up monitoring and alerts

2. **Database**:
   - Run migrations on production
   - Set up automated backups
   - Configure connection pooling

3. **Security**:
   - Enable SSL/TLS
   - Set up firewall rules
   - Configure rate limiting

4. **Monitoring**:
   - Set up error tracking
   - Configure performance monitoring
   - Set up alerting

### Scaling Considerations

- **Database**: Use read replicas for heavy read workloads
- **Functions**: Edge functions auto-scale with demand
- **Caching**: Implement Redis for frequently accessed data
- **CDN**: Use CDN for static assets and API responses

## 🛠️ Development

### Local Development

1. **Start Supabase locally**:
   ```bash
   supabase start
   ```

2. **Run migrations**:
   ```bash
   supabase db reset
   ```

3. **Deploy functions locally**:
   ```bash
   supabase functions serve
   ```

### Testing

1. **Unit Tests**:
   ```bash
   npm run test
   ```

2. **Integration Tests**:
   ```bash
   npm run test:integration
   ```

3. **E2E Tests**:
   ```bash
   npm run test:e2e
   ```

## 📚 API Documentation

### Authentication

All API calls require authentication via Supabase Auth:

```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})
```

### Error Handling

All API responses follow this format:

```json
{
  "success": true,
  "data": {...},
  "error": null
}
```

Error responses:

```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@optikcoin.com
- Discord: [OptikCoin Community](https://discord.gg/optikcoin)
- Documentation: [docs.optikcoin.com](https://docs.optikcoin.com)

---

Built with ❤️ by the OptikCoin team