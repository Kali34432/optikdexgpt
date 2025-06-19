import React, { useState, useEffect } from 'react';
import { Pickaxe, Zap, TrendingUp, Settings, Play, Pause, Award } from 'lucide-react';

export default function Mining() {
  const [isMining, setIsMining] = useState(false);
  const [hashRate, setHashRate] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [difficulty, setDifficulty] = useState(1.2);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMining) {
      interval = setInterval(() => {
        setHashRate(prev => prev + Math.random() * 10);
        setEarnings(prev => prev + Math.random() * 0.001);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMining]);

  const miningPools = [
    {
      name: 'OPTK Main Pool',
      hashRate: '2.4 TH/s',
      miners: 1247,
      fee: '1%',
      reward: '0.0024 OPTK/day',
      status: 'active',
    },
    {
      name: 'Community Pool',
      hashRate: '1.8 TH/s',
      miners: 892,
      fee: '0.5%',
      reward: '0.0018 OPTK/day',
      status: 'active',
    },
    {
      name: 'Solo Mining',
      hashRate: 'Variable',
      miners: 1,
      fee: '0%',
      reward: 'Variable',
      status: 'available',
    },
  ];

  const miningStats = [
    { label: 'Hash Rate', value: `${hashRate.toFixed(2)} MH/s`, icon: Zap },
    { label: 'Earnings Today', value: `${earnings.toFixed(6)} OPTK`, icon: TrendingUp },
    { label: 'Network Difficulty', value: difficulty.toFixed(2), icon: Settings },
    { label: 'Active Miners', value: '2,139', icon: Award },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-orange-600/20 p-4 rounded-full inline-flex mb-6">
          <Pickaxe className="w-12 h-12 text-orange-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          OPTK <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Mining</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Mine OPTK tokens to support the network and earn rewards
        </p>
      </div>

      {/* Mining Control Panel */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Mining Control</h2>
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isMining 
                ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-600/20 text-gray-400 border border-gray-500/30'
            }`}>
              {isMining ? 'Mining Active' : 'Mining Stopped'}
            </div>
            <button
              onClick={() => setIsMining(!isMining)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                isMining
                  ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30'
                  : 'bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30'
              }`}
            >
              {isMining ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isMining ? 'Stop Mining' : 'Start Mining'}</span>
            </button>
          </div>
        </div>

        {/* Mining Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {miningStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-lg font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className="bg-orange-600/20 p-2 rounded-lg">
                    <Icon className="w-4 h-4 text-orange-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mining Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Mining Intensity</label>
            <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20">
              <option value="low">Low (25% CPU)</option>
              <option value="medium">Medium (50% CPU)</option>
              <option value="high">High (75% CPU)</option>
              <option value="max">Maximum (100% CPU)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Mining Pool</label>
            <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20">
              <option value="main">OPTK Main Pool</option>
              <option value="community">Community Pool</option>
              <option value="solo">Solo Mining</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mining Pools */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Available Mining Pools</h2>
        <div className="space-y-4">
          {miningPools.map((pool, index) => (
            <div
              key={index}
              className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{pool.name}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pool.status === 'active' 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-blue-600/20 text-blue-400'
                    }`}>
                      {pool.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Hash Rate</p>
                      <p className="text-white font-medium">{pool.hashRate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Miners</p>
                      <p className="text-white font-medium">{pool.miners}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Pool Fee</p>
                      <p className="text-white font-medium">{pool.fee}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Est. Reward</p>
                      <p className="text-green-400 font-medium">{pool.reward}</p>
                    </div>
                  </div>
                </div>
                
                <button className="ml-6 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 px-4 py-2 rounded-lg transition-all duration-200 border border-orange-500/30">
                  Join Pool
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mining Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Mining Rewards</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Today's Earnings</span>
              <span className="text-green-400 font-semibold">{earnings.toFixed(6)} OPTK</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">This Week</span>
              <span className="text-green-400 font-semibold">0.0156 OPTK</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">This Month</span>
              <span className="text-green-400 font-semibold">0.0672 OPTK</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Total Earned</span>
              <span className="text-green-400 font-semibold">0.2847 OPTK</span>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200">
            Claim Rewards
          </button>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Mining Hardware</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">CPU Mining</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="text-sm text-gray-400">
                <p>Cores: 8 | Threads: 16</p>
                <p>Temperature: 65°C</p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">GPU Mining</span>
                <span className="text-gray-400">Not Available</span>
              </div>
              <div className="text-sm text-gray-400">
                <p>Upgrade to Pro for GPU mining</p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 font-semibold py-3 rounded-lg transition-all duration-200 border border-orange-500/30">
            Optimize Settings
          </button>
        </div>
      </div>

      {/* Mining Tips */}
      <div className="bg-gradient-to-r from-orange-600/10 to-yellow-600/10 border border-orange-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Mining Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-orange-400 font-medium mb-2">Maximize Earnings</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Join pools with lower fees</li>
              <li>• Mine during off-peak hours</li>
              <li>• Keep your hardware cool</li>
              <li>• Update mining software regularly</li>
            </ul>
          </div>
          <div>
            <h4 className="text-orange-400 font-medium mb-2">Energy Efficiency</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Use renewable energy sources</li>
              <li>• Optimize power settings</li>
              <li>• Monitor electricity costs</li>
              <li>• Consider mining profitability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}