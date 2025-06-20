import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { 
  Wallet, 
  Send, 
  Download, 
  Eye, 
  EyeOff, 
  Copy, 
  QrCode, 
  History, 
  Shield, 
  Settings, 
  Plus, 
  Minus,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ExternalLink,
  Lock,
  Unlock,
  Star,
  Gift,
  Zap,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function OptikWallet() {
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [activeTab, setActiveTab] = useState('overview');
  const [showBalance, setShowBalance] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Mock wallet data
  const [walletData, setWalletData] = useState({
    optk: { balance: 1250.00, usdValue: 3125.00, change24h: 8.5 },
    sol: { balance: 12.45, usdValue: 1220.25, change24h: -2.1 },
    usdc: { balance: 500.00, usdValue: 500.00, change24h: 0.0 },
    totalValue: 4845.25,
    totalChange24h: 5.2
  });

  const transactions = [
    {
      id: 1,
      type: 'receive',
      token: 'OPTK',
      amount: 50.0,
      from: '7xKX...9mPq',
      timestamp: '2025-01-15 14:30',
      status: 'confirmed',
      txHash: 'abc123...def456'
    },
    {
      id: 2,
      type: 'send',
      token: 'SOL',
      amount: 2.5,
      to: '9mPq...7xKX',
      timestamp: '2025-01-15 12:15',
      status: 'confirmed',
      txHash: 'def456...abc123'
    },
    {
      id: 3,
      type: 'mining',
      token: 'OPTK',
      amount: 0.0245,
      timestamp: '2025-01-15 10:00',
      status: 'confirmed',
      txHash: 'ghi789...jkl012'
    },
    {
      id: 4,
      type: 'stake',
      token: 'OPTK',
      amount: 100.0,
      timestamp: '2025-01-14 16:45',
      status: 'pending',
      txHash: 'mno345...pqr678'
    }
  ];

  const stakingPools = [
    {
      name: 'OPTK Flexible Pool',
      apy: '8.5%',
      staked: 500.0,
      rewards: 12.45,
      status: 'active'
    },
    {
      name: 'OPTK 30-Day Lock',
      apy: '12.0%',
      staked: 1000.0,
      rewards: 45.67,
      status: 'locked',
      unlockDate: '2025-02-15'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleSend = () => {
    if (!sendAmount || !sendAddress) return;
    alert(`Sending ${sendAmount} OPTK to ${sendAddress}`);
    setSendAmount('');
    setSendAddress('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send': return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case 'receive': return <ArrowDownLeft className="w-4 h-4 text-green-400" />;
      case 'mining': return <Zap className="w-4 h-4 text-orange-400" />;
      case 'stake': return <Lock className="w-4 h-4 text-blue-400" />;
      default: return <History className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!connected) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
          <div className="bg-blue-600/20 p-4 rounded-full inline-flex mb-6">
            <Wallet className="w-12 h-12 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">OPTIK Wallet</h2>
          <p className="text-gray-400 mb-6">
            Connect your wallet to access the full OPTIK ecosystem
          </p>
          <button
            onClick={() => setVisible(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
          <div className="bg-red-600/20 p-4 rounded-full inline-flex mb-6">
            <Lock className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Locked</h2>
          <p className="text-gray-400 mb-6">
            Enter your password to unlock your OPTIK wallet
          </p>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 mb-4"
          />
          <button
            onClick={() => setIsLocked(false)}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Unlock Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600/20 p-3 rounded-lg">
              <Wallet className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">OPTIK Wallet</h1>
              <p className="text-gray-400 text-sm">
                {formatAddress(publicKey?.toString() || '')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-gray-400 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={() => setIsLocked(true)}
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
            >
              <Lock className="w-5 h-5 text-gray-400" />
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2">
        <div className="flex space-x-1">
          {[
            { id: 'overview', label: 'Overview', icon: Wallet },
            { id: 'send', label: 'Send', icon: Send },
            { id: 'receive', label: 'Receive', icon: Download },
            { id: 'history', label: 'History', icon: History },
            { id: 'staking', label: 'Staking', icon: Star },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Portfolio Overview */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Portfolio</h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
              >
                {showBalance ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-white mb-2">
                {showBalance ? `$${walletData.totalValue.toLocaleString()}` : '••••••'}
              </p>
              <div className="flex items-center justify-center space-x-2">
                {walletData.totalChange24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-medium ${
                  walletData.totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {walletData.totalChange24h >= 0 ? '+' : ''}{walletData.totalChange24h}% (24h)
                </span>
              </div>
            </div>

            {/* Token Balances */}
            <div className="space-y-4">
              {Object.entries(walletData).filter(([key]) => !['totalValue', 'totalChange24h'].includes(key)).map(([token, data]) => (
                <div key={token} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{token.toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{token.toUpperCase()}</p>
                      <p className="text-gray-400 text-sm">
                        {showBalance ? `$${data.usdValue.toLocaleString()}` : '••••••'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-medium">
                      {showBalance ? `${data.balance.toLocaleString()} ${token.toUpperCase()}` : '••••••'}
                    </p>
                    <div className="flex items-center space-x-1">
                      {data.change24h >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <span className={`text-xs ${
                        data.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {data.change24h >= 0 ? '+' : ''}{data.change24h}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setActiveTab('send')}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 text-center"
            >
              <Send className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-white font-medium">Send</p>
            </button>
            
            <button
              onClick={() => setActiveTab('receive')}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300 text-center"
            >
              <Download className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-white font-medium">Receive</p>
            </button>
            
            <button
              onClick={() => setActiveTab('staking')}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 text-center"
            >
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <p className="text-white font-medium">Stake</p>
            </button>
            
            <button
              onClick={() => window.open('/mining', '_blank')}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-orange-500/30 transition-all duration-300 text-center"
            >
              <Zap className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <p className="text-white font-medium">Mine</p>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'send' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Send Tokens</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Token</label>
              <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20">
                <option value="optk">OPTK</option>
                <option value="sol">SOL</option>
                <option value="usdc">USDC</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Address</label>
              <input
                type="text"
                placeholder="Enter wallet address"
                value={sendAddress}
                onChange={(e) => setSendAddress(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="0.0"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 pr-16 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 text-sm">
                  MAX
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-1">Available: 1,250.00 OPTK</p>
            </div>
            
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Network Fee:</span>
                <span className="text-white">~0.001 SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total:</span>
                <span className="text-white">{sendAmount || '0'} OPTK + 0.001 SOL</span>
              </div>
            </div>
            
            <button
              onClick={handleSend}
              disabled={!sendAmount || !sendAddress}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Send Tokens
            </button>
          </div>
        </div>
      )}

      {activeTab === 'receive' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Receive Tokens</h2>
          
          <div className="text-center space-y-6">
            <div className="bg-white p-6 rounded-lg inline-block">
              <QrCode className="w-32 h-32 text-black" />
            </div>
            
            <div>
              <p className="text-gray-400 mb-2">Your OPTIK Wallet Address</p>
              <div className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
                <span className="text-white font-mono text-sm">
                  {publicKey?.toString()}
                </span>
                <button
                  onClick={() => copyToClipboard(publicKey?.toString() || '')}
                  className="ml-3 p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all duration-200"
                >
                  <Copy className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <p className="text-amber-400 text-sm">
                Only send OPTK, SOL, or SPL tokens to this address. Sending other tokens may result in permanent loss.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Transaction History</h2>
          
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-600/50 p-2 rounded-lg">
                    {getTransactionIcon(tx.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-white font-medium capitalize">{tx.type}</p>
                      {getStatusIcon(tx.status)}
                    </div>
                    <p className="text-gray-400 text-sm">{tx.timestamp}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-medium ${
                    tx.type === 'receive' || tx.type === 'mining' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {tx.type === 'receive' || tx.type === 'mining' ? '+' : '-'}{tx.amount} {tx.token}
                  </p>
                  <button
                    onClick={() => window.open(`https://solscan.io/tx/${tx.txHash}`, '_blank')}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'staking' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Staking Pools</h2>
            
            <div className="space-y-4">
              {stakingPools.map((pool, index) => (
                <div key={index} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{pool.name}</h3>
                      <p className="text-green-400 font-medium">{pool.apy} APY</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pool.status === 'active' 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-orange-600/20 text-orange-400'
                    }`}>
                      {pool.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Staked Amount</p>
                      <p className="text-white font-medium">{pool.staked} OPTK</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Earned Rewards</p>
                      <p className="text-green-400 font-medium">{pool.rewards} OPTK</p>
                    </div>
                  </div>
                  
                  {pool.unlockDate && (
                    <p className="text-orange-400 text-sm mb-4">
                      Unlocks on: {pool.unlockDate}
                    </p>
                  )}
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 py-2 rounded-lg transition-all duration-200 border border-green-500/30">
                      Claim Rewards
                    </button>
                    {pool.status === 'active' && (
                      <button className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 rounded-lg transition-all duration-200 border border-red-500/30">
                        Unstake
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Stake More OPTK</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Amount to Stake</label>
                <input
                  type="text"
                  placeholder="0.0"
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200">
                Stake OPTK
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Wallet Settings</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Security</h3>
              
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Auto-lock</p>
                  <p className="text-gray-400 text-sm">Lock wallet after inactivity</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Transaction Notifications</p>
                  <p className="text-gray-400 text-sm">Get notified of transactions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Network</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">RPC Endpoint</label>
                <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20">
                  <option value="mainnet">Mainnet Beta</option>
                  <option value="devnet">Devnet</option>
                  <option value="testnet">Testnet</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Backup & Recovery</h3>
              
              <button className="w-full bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 font-semibold py-3 rounded-lg transition-all duration-200 border border-amber-500/30">
                Export Private Key
              </button>
              
              <button className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-semibold py-3 rounded-lg transition-all duration-200 border border-blue-500/30">
                View Seed Phrase
              </button>
            </div>
            
            <div className="pt-6 border-t border-gray-700/50">
              <button
                onClick={disconnect}
                className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold py-3 rounded-lg transition-all duration-200 border border-red-500/30"
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}