import React, { useState } from 'react';
import { Crown, Shield, Zap, TrendingUp, Bot, Star, Check, X } from 'lucide-react';

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      id: 'free',
      name: 'Free Tier',
      price: '$0',
      period: 'forever',
      description: 'Basic access to OptikCoinGPT',
      features: [
        'Limited AI chat (10 messages/day)',
        'Basic market analytics',
        'Token swap (with fees)',
        'Community access',
      ],
      limitations: [
        'No meme coin creation',
        'No advanced trading tools',
        'No priority support',
        'Limited chart features',
      ],
      buttonText: 'Current Plan',
      buttonClass: 'bg-gray-600 text-gray-300 cursor-not-allowed',
      icon: Star,
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro Creator',
      price: '$49.99',
      period: 'per month',
      description: 'Complete meme coin creation toolkit',
      features: [
        'Unlimited AI assistance',
        'Advanced trading analytics',
        'Anti-bot protection tools',
        'Smart contract templates',
        'Priority customer support',
        'Advanced chart features',
        'Portfolio tracking',
        'Market alerts',
      ],
      limitations: [],
      buttonText: 'Subscribe Now',
      buttonClass: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
      icon: Crown,
      popular: true,
    },
    {
      id: 'launch',
      name: 'Launch Package',
      price: '$99.99',
      period: 'one-time',
      description: 'Complete token launch with liquidity',
      features: [
        'Everything in Pro Creator',
        'Token creation & deployment',
        'Minimum liquidity funding',
        'OPTK backing support',
        'Launch marketing boost',
        'Dedicated launch support',
        'Post-launch monitoring',
        '30-day premium support',
      ],
      limitations: [],
      buttonText: 'Launch Token',
      buttonClass: 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white',
      icon: Zap,
      popular: false,
    },
  ];

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Anti-Bot Protection',
      description: 'Advanced algorithms to detect and prevent malicious sniping bots',
    },
    {
      icon: TrendingUp,
      title: 'Smart Contract Auditing',
      description: 'Automated security checks for your smart contracts',
    },
    {
      icon: Bot,
      title: 'AI-Powered Analysis',
      description: 'Real-time detection of pump and dump schemes',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Choose Your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">OptikCoin</span> Plan
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          From free exploration to professional meme coin creation, we have the perfect plan for your crypto journey.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.id}
              className={`relative bg-gray-800/50 backdrop-blur-sm border rounded-xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-lg mb-4 ${
                  plan.popular ? 'bg-blue-600/20' : 'bg-gray-700/50'
                }`}>
                  <Icon className={`w-8 h-8 ${plan.popular ? 'text-blue-400' : 'text-gray-400'}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-white font-medium mb-3">Features Included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="text-gray-400 font-medium mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-400">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${plan.buttonClass}`}
                disabled={plan.id === 'free'}
              >
                {plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>

      {/* Security Features */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Advanced Security & Protection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-blue-600/20 p-4 rounded-lg inline-flex mb-4">
                  <Icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* OPTK Benefits */}
      <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/20 rounded-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">OPTK Token Benefits</h2>
          <p className="text-gray-300">Exclusive advantages for OPTK holders</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-green-600/20 p-3 rounded-lg inline-flex mb-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-medium mb-1">Liquidity Backing</h3>
            <p className="text-gray-400 text-sm">OPTK reserves support your token launches</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600/20 p-3 rounded-lg inline-flex mb-3">
              <Crown className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-medium mb-1">Premium Features</h3>
            <p className="text-gray-400 text-sm">Exclusive access to advanced tools</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600/20 p-3 rounded-lg inline-flex mb-3">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-medium mb-1">Reduced Fees</h3>
            <p className="text-gray-400 text-sm">Lower transaction costs for holders</p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-600/20 p-3 rounded-lg inline-flex mb-3">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-medium mb-1">Early Access</h3>
            <p className="text-gray-400 text-sm">First access to new features and launches</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">What's included in the Launch Package?</h3>
            <p className="text-gray-400">
              The Launch Package includes token creation, smart contract deployment, minimum liquidity funding, 
              OPTK backing support, and 30 days of premium support to ensure a successful launch.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">How does anti-bot protection work?</h3>
            <p className="text-gray-400">
              Our AI-powered system analyzes trading patterns, wallet behaviors, and transaction timing to 
              identify and prevent malicious bot activities that could harm your token's launch.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Can I upgrade or downgrade my plan?</h3>
            <p className="text-gray-400">
              Yes, you can upgrade to Pro Creator at any time. The Launch Package is a one-time purchase 
              that can be added to any subscription level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}