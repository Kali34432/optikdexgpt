import { useState, useEffect } from 'react';
import { supabase, UserProfile } from '../services/supabaseClient';

export interface SubscriptionData {
  isSubscribed: boolean;
  subscriptionTier: 'free' | 'pro_creator' | 'ultimate_bundle';
  subscriptionStatus: 'active' | 'inactive' | 'cancelled' | 'past_due';
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    isSubscribed: false,
    subscriptionTier: 'free',
    subscriptionStatus: 'inactive'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSubscription({
          isSubscribed: false,
          subscriptionTier: 'free',
          subscriptionStatus: 'inactive'
        });
        return;
      }

      // Get user profile with subscription info
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('subscription_tier, subscription_status')
        .eq('id', user.id)
        .single();

      if (profileError) {
        // If profile doesn't exist, user might be newly registered
        if (profileError.code === 'PGRST116') {
          setSubscription({
            isSubscribed: false,
            subscriptionTier: 'free',
            subscriptionStatus: 'inactive'
          });
          return;
        }
        throw profileError;
      }

      // Get detailed subscription info
      const { data: subscriptionDetails, error: subError } = await supabase
        .from('subscriptions')
        .select('current_period_end, cancel_at_period_end, status')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      setSubscription({
        isSubscribed: profile?.subscription_status === 'active',
        subscriptionTier: profile?.subscription_tier || 'free',
        subscriptionStatus: profile?.subscription_status || 'inactive',
        currentPeriodEnd: subscriptionDetails?.current_period_end,
        cancelAtPeriodEnd: subscriptionDetails?.cancel_at_period_end
      });
    } catch (err: any) {
      console.error('Error fetching subscription:', err);
      setError(err.message);
      // Set default values on error
      setSubscription({
        isSubscribed: false,
        subscriptionTier: 'free',
        subscriptionStatus: 'inactive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          fetchSubscription();
        }
      }
    );

    // Listen for subscription changes
    const subscriptionChannel = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles'
        },
        () => {
          fetchSubscription();
        }
      )
      .subscribe();

    return () => {
      authSubscription.unsubscribe();
      subscriptionChannel.unsubscribe();
    };
  }, []);

  const hasAccess = (feature: string): boolean => {
    if (!subscription.isSubscribed) return false;

    const featureAccess = {
      'ai_chat': ['pro_creator', 'ultimate_bundle'],
      'token_creation': ['ultimate_bundle'],
      'advanced_analytics': ['pro_creator', 'ultimate_bundle'],
      'website_builder': ['ultimate_bundle'],
      'viral_gpt': ['ultimate_bundle'],
      'social_media_posts': ['ultimate_bundle'],
      'advanced_llm': ['ultimate_bundle'],
      'promotion_gpt': ['ultimate_bundle'],
      'priority_support': ['pro_creator', 'ultimate_bundle'],
      'anti_bot_protection': ['pro_creator', 'ultimate_bundle']
    };

    const allowedTiers = featureAccess[feature as keyof typeof featureAccess];
    return allowedTiers ? allowedTiers.includes(subscription.subscriptionTier) : false;
  };

  const canUpgrade = (): boolean => {
    return subscription.subscriptionTier === 'free' || subscription.subscriptionTier === 'pro_creator';
  };

  const getUpgradeOptions = () => {
    if (subscription.subscriptionTier === 'free') {
      return ['pro_creator', 'ultimate_bundle'];
    }
    if (subscription.subscriptionTier === 'pro_creator') {
      return ['ultimate_bundle'];
    }
    return [];
  };

  return {
    subscription,
    loading,
    error,
    hasAccess,
    canUpgrade,
    getUpgradeOptions,
    refetch: fetchSubscription
  };
};