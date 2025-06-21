import React, { useState } from 'react';
import { 
  Moon, 
  Star, 
  Sparkles, 
  Heart, 
  Gamepad2, 
  Gift, 
  Users, 
  TrendingUp,
  Shield,
  Flame,
  Crown,
  Rocket,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { lunaLolaCoinDescription } from '../data/lunaLolaCoin';

export default function LunaLolaShowcase() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Moon },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'tokenomics', label: 'Tokenomics', icon: TrendingUp },
    { id: 'roadmap', label: 'Roadmap', icon: Rocket },
    { id: 'community', label: 'Community', icon: Users }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center text-4xl animate-pulse">
                🌙
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                👑
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {lunaLolaCoinDescription.name}
            </span>
            <span className="text-white ml-4">({lunaLolaCoinDescription.symbol})</span>
          </h1>
          
          <p className="text-2xl text-purple-300 mb-6 font-medium">
            {lunaLolaCoinDescription.tagline}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {lunaLolaCoinDescription.marketingHooks.slice(0, 3).map((hook, index) => (
              <div key={index} className="bg-purple-600/20 border border-purple-500/30 rounded-full px-6 py-2">
                <span className="text-purple-300 text-sm font-medium">{hook}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2">
              <Rocket className="w-6 h-6" />
              <span>Launch on OptikDexGPT</span>
            </button>
            
            <button 
              onClick={() => copyToClipboard(lunaLolaCoinDescription.symbol)}
              className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50 flex items-center space-x-2"
            >
              {copied ? <Check className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6" />}
              <span>Copy Symbol</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Description */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-6 h-6 text-purple-400 mr-3" />
              About LunaLola
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              {lunaLolaCoinDescription.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🌙</div>
              <h3 className="text-lg font-bold text-white mb-1">Lunar Powered</h3>
              <p className="text-purple-300 text-sm">Moon cycle rewards</p>
            </div>
            
            <div className="bg-gradient-to-r from-pink-600/10 to-red-600/10 border border-pink-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🔥</div>
              <h3 className="text-lg font-bold text-white mb-1">Deflationary</h3>
              <p className="text-pink-300 text-sm">Auto-burn mechanism</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🎮</div>
              <h3 className="text-lg font-bold text-white mb-1">Gaming Ready</h3>
              <p className="text-blue-300 text-sm">P2E integration</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">❤️</div>
              <h3 className="text-lg font-bold text-white mb-1">Charity Focused</h3>
              <p className="text-green-300 text-sm">Animal welfare support</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lunaLolaCoinDescription.features.map((feature, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'tokenomics' && (
        <div className="space-y-6">
          {/* Supply Info */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-green-400 mr-3" />
              Token Supply & Distribution
            </h2>
            <div className="text-center mb-8">
              <p className="text-4xl font-bold text-purple-400 mb-2">
                {lunaLolaCoinDescription.tokenomics.totalSupply}
              </p>
              <p className="text-gray-400">Total Supply</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(lunaLolaCoinDescription.tokenomics.distribution).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-300">{key}</span>
                      <span className="text-purple-400 font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Transaction Tax (8%)</h3>
                <div className="space-y-3">
                  {Object.entries(lunaLolaCoinDescription.tokenomics.transactionTax).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-300">{key}</span>
                      <span className="text-pink-400 font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          {lunaLolaCoinDescription.roadmap.map((phase, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                {phase.phase}
              </h3>
              <ul className="space-y-2">
                {phase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-300">
                    <Star className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'community' && (
        <div className="space-y-6">
          {/* Social Links */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Users className="w-6 h-6 text-blue-400 mr-3" />
              Join the Lola Squad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(lunaLolaCoinDescription.community).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-600/50 rounded-lg transition-all duration-200 border border-gray-600/30 hover:border-purple-500/30"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 font-bold text-sm">
                        {platform.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white font-medium capitalize">{platform}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Shield className="w-6 h-6 text-green-400 mr-3" />
              Technical Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(lunaLolaCoinDescription.technical).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                  <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-green-400 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimers */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
            <h3 className="text-amber-400 font-bold mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Important Disclaimers
            </h3>
            <ul className="space-y-2">
              {lunaLolaCoinDescription.disclaimers.map((disclaimer, index) => (
                <li key={index} className="text-amber-300/80 text-sm flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  {disclaimer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}