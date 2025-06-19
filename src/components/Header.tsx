import React, { useState } from 'react';
import { TrendingUp, MessageSquare, ArrowRightLeft, Wallet, Rocket, BarChart3, CreditCard, FileText, Map, Pickaxe, Coins, Gift, Menu, X, ExternalLink } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, type: 'internal' },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare, type: 'internal' },
    { id: 'creator', label: 'Meme Creator', icon: Rocket, type: 'internal' },
    { id: 'chart', label: 'Live Trading', icon: BarChart3, type: 'internal' },
    { id: 'swap', label: 'Token Swap', icon: ArrowRightLeft, type: 'internal' },
    { id: 'subscription', label: 'Subscribe', icon: CreditCard, type: 'internal' },
    { id: 'whitepaper', label: 'Whitepaper', icon: FileText, type: 'internal' },
    { id: 'roadmap', label: 'Roadmap', icon: Map, type: 'internal' },
    { id: 'mining', label: 'Mining', icon: Pickaxe, type: 'internal' },
    { id: 'staking', label: 'Staking', icon: Coins, type: 'internal' },
    { id: 'airdrop', label: 'Airdrop', icon: Gift, type: 'internal' },
    { id: 'telegram', label: 'Telegram', icon: ExternalLink, type: 'external', url: 'https://t.me/optikcoingpt' },
    { id: 'twitter', label: 'Twitter', icon: ExternalLink, type: 'external', url: 'https://twitter.com/optikcoingpt' },
  ];

  const handleMenuItemClick = (item: any) => {
    if (item.type === 'internal') {
      setActiveTab(item.id);
    } else if (item.type === 'external') {
      window.open(item.url, '_blank');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
                OptikCoinGPT
              </h1>
              <p className="text-xs text-gray-400">Meme Coin Creation Platform</p>
            </div>
          </div>

          {/* Right Side - Wallet and Menu */}
          <div className="flex items-center space-x-3">
            {/* OPTK Balance */}
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400">OPTK Balance</p>
              <p className="text-sm font-semibold text-green-400">1,250.00</p>
            </div>

            {/* Wallet Connect */}
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-purple-500/25">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Connect Wallet</span>
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-700/50 hover:bg-gray-600/50 text-white p-2 rounded-lg transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay for mobile */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute right-4 top-16 w-80 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl z-50 lg:w-72">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700/50 pb-2">
                Navigation
              </h3>
              
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id && item.type === 'internal';
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                      {item.type === 'external' && (
                        <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Social Links Section */}
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Connect With Us</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open('https://t.me/optikcoingpt', '_blank')}
                    className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border border-blue-500/30"
                  >
                    Telegram
                  </button>
                  <button
                    onClick={() => window.open('https://twitter.com/optikcoingpt', '_blank')}
                    className="flex-1 bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border border-sky-500/30"
                  >
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}