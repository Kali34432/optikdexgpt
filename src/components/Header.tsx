import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { TrendingUp, MessageSquare, ArrowRightLeft, Wallet, Rocket, BarChart3, CreditCard, FileText, Map, Pickaxe, Coins, Gift, Menu, X, ExternalLink } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connected, publicKey } = useWallet();

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

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-gray-900/50 backdrop-blur-md border-b border-cyan-800/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <img 
                src="/src/assets/logo.png" 
                alt="OptikCoin Logo" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
                  OptikCoin DEX
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Trading Platform</p>
              </div>
            </div>
          </div>

          {/* Right Side - OPTK Balance, Wallet and Menu */}
          <div className="flex items-center space-x-3">
            {/* OPTK Balance - only show when connected */}
            {connected && (
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-400">OPTK Balance</p>
                <p className="text-sm font-semibold text-cyan-400">1,250.00</p>
              </div>
            )}

            {/* Wallet Connect Button */}
            <div className="wallet-adapter-button-trigger">
              <WalletMultiButton className="!bg-gradient-to-r !from-cyan-600 !to-blue-600 hover:!from-cyan-700 hover:!to-blue-700 !text-white !px-4 !py-2 !rounded-lg !font-medium !transition-all !duration-200 !flex !items-center !space-x-2 !shadow-lg hover:!shadow-cyan-500/25 !border-0 !text-sm" />
            </div>

            {/* Connected Wallet Info */}
            {connected && publicKey && (
              <div className="hidden lg:flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg border border-cyan-600/30">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">
                  {formatWalletAddress(publicKey.toString())}
                </span>
              </div>
            )}

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-700/50 hover:bg-gray-600/50 text-white p-2 rounded-lg transition-all duration-200 border border-cyan-600/30 hover:border-cyan-500/50"
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
          <div className="absolute right-4 top-16 w-80 bg-gray-800/95 backdrop-blur-md border border-cyan-700/30 rounded-xl shadow-2xl z-50 lg:w-72">
            <div className="p-4">
              {/* Wallet Status in Menu */}
              {connected && publicKey && (
                <div className="mb-4 p-3 bg-cyan-600/10 border border-cyan-500/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-cyan-400 text-sm font-medium">Wallet Connected</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-1">
                    {formatWalletAddress(publicKey.toString())}
                  </p>
                </div>
              )}

              <h3 className="text-lg font-semibold text-white mb-4 border-b border-cyan-700/30 pb-2">
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
                          ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
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
              <div className="mt-6 pt-4 border-t border-cyan-700/30">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Connect With Us</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open('https://t.me/optikcoingpt', '_blank')}
                    className="flex-1 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border border-cyan-500/30"
                  >
                    Telegram
                  </button>
                  <button
                    onClick={() => window.open('https://twitter.com/optikcoingpt', '_blank')}
                    className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border border-blue-500/30"
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