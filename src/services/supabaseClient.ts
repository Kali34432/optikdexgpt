import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  wallet_address?: string
  subscription_tier: 'free' | 'pro_creator' | 'ultimate_bundle'
  subscription_status: 'active' | 'inactive' | 'cancelled' | 'past_due'
  stripe_customer_id?: string
  optk_balance: number
  total_spent: number
  referral_code?: string
  referred_by?: string
  kyc_status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface Token {
  id: string
  creator_id: string
  name: string
  symbol: string
  description?: string
  total_supply: number
  decimals: number
  contract_address?: string
  image_url?: string
  website_url?: string
  telegram_url?: string
  twitter_url?: string
  market_cap: number
  current_price: number
  holders_count: number
  trading_volume_24h: number
  price_change_24h: number
  liquidity_pool_sol: number
  liquidity_pool_tokens: number
  status: 'pending' | 'active' | 'suspended' | 'flagged'
  flagged_reason?: string
  audit_score?: number
  risk_level: 'low' | 'medium' | 'high'
  launch_date?: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  token_id?: string
  type: 'buy' | 'sell' | 'swap' | 'stake' | 'unstake' | 'mining_reward' | 'referral_bonus'
  amount: number
  price?: number
  total_value?: number
  fee: number
  from_token?: string
  to_token?: string
  transaction_hash?: string
  status: 'pending' | 'confirmed' | 'failed'
  block_number?: number
  gas_used?: number
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id?: string
  plan_type: 'pro_creator' | 'ultimate_bundle'
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid'
  current_period_start?: string
  current_period_end?: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  stripe_payment_intent_id?: string
  stripe_charge_id?: string
  amount: number
  currency: string
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled'
  payment_method?: string
  description?: string
  metadata?: any
  created_at: string
}

export interface Staking {
  id: string
  user_id: string
  amount: number
  pool_type: 'flexible' | '30_day' | '90_day'
  apy: number
  start_date: string
  end_date?: string
  status: 'active' | 'completed' | 'withdrawn'
  rewards_earned: number
  last_reward_date: string
  created_at: string
}

export interface Mining {
  id: string
  user_id: string
  hash_rate: number
  earnings_today: number
  total_earnings: number
  pool_name: string
  status: 'active' | 'inactive' | 'paused'
  last_mining_date: string
  created_at: string
  updated_at: string
}

// Auth helpers
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

// Token operations
export const createToken = async (tokenData: any) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/token-operations/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({ userId: user.id, ...tokenData })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create token')
  }

  return response.json()
}

export const getTokens = async () => {
  const response = await fetch(`${supabaseUrl}/functions/v1/token-operations/list`, {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tokens')
  }

  return response.json()
}

export const getUserTokens = async (userId: string) => {
  const response = await fetch(`${supabaseUrl}/functions/v1/token-operations/user-tokens?userId=${userId}`, {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user tokens')
  }

  return response.json()
}

// Payment operations
export const createPaymentIntent = async (amount: number, description: string, planType?: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      userId: user.id,
      amount,
      description,
      planType
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create payment intent')
  }

  return response.json()
}

export const createSubscription = async (planType: string, paymentMethodId: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/create-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      userId: user.id,
      planType,
      paymentMethodId
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create subscription')
  }

  return response.json()
}

// Staking operations
export const stakeTokens = async (amount: number, poolType: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/staking-operations/stake`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      userId: user.id,
      amount,
      poolType
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to stake tokens')
  }

  return response.json()
}

export const unstakeTokens = async (stakeId: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/staking-operations/unstake`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      userId: user.id,
      stakeId
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to unstake tokens')
  }

  return response.json()
}

export const claimStakingRewards = async (stakeId: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/staking-operations/claim-rewards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      userId: user.id,
      stakeId
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to claim rewards')
  }

  return response.json()
}

// Mining operations
export const startMining = async (poolName?: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/mining-operations/start-mining`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      userId: user.id,
      poolName
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to start mining')
  }

  return response.json()
}

export const stopMining = async () => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/mining-operations/stop-mining`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      userId: user.id
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to stop mining')
  }

  return response.json()
}

export const claimMiningRewards = async () => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/mining-operations/claim-mining-rewards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      userId: user.id
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to claim mining rewards')
  }

  return response.json()
}