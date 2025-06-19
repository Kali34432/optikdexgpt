import React from 'react';
import { TrendingUp, MessageSquare, ArrowRightLeft, Wallet, Rocket, BarChart3, CreditCard, FileText, Map, Pickaxe, Coins, Gift } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const mainTabs = [
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'creator', label: 'Meme Creator', icon: Rocket },
    { id: 'chart', label: 'Live Trading', icon: BarChart3 },
    { id: 'swap', label: 'Token Swap', icon: ArrowRightLeft },
  ];

  const utilityTabs = [
    { id: 'subscription', label: 'Subscribe', icon: CreditCard },
    { id: 'whitepaper', label: 'Whitepaper', icon: FileText },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'mining', label: 'Mining', icon: Pickaxe },
    { id: 'staking', label: 'Staking', icon: Coins },
    { id: 'airdrop', label: 'Airdrop', icon: Gift },
  ];

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

          {/* Main Navigation */}
          <nav className="hidden lg:block">
            <div className="flex items-center space-x-2">
              {mainTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Utility Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {utilityTabs.slice(0, 3).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                    activeTab === tab.id
                      ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Wallet Connect */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400">OPTK Balance</p>
              <p className="text-sm font-semibold text-green-400">1,250.00</p>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-purple-500/25">
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-gray-800/50 border-t border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2 py-2 rounded-md text-xs font-medium transition-all duration-200 flex flex-col items-center space-y-1 ${
                    activeTab === tab.id
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-6 gap-1">
            {utilityTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-1 py-2 rounded-md text-xs font-medium transition-all duration-200 flex flex-col items-center space-y-1 ${
                    activeTab === tab.id
                      ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}