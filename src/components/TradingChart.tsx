import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Volume2, DollarSign, Activity, Eye } from 'lucide-react';

export default function TradingChart() {
  const [selectedToken, setSelectedToken] = useState('OPTK/SOL');
  const [timeframe, setTimeframe] = useState('1H');
  const [chartData, setChartData] = useState([]);

  // Generate realistic trading data
  useEffect(() => {
    const generateData = () => {
      const data = [];
      let basePrice = 0.0245;
      const now = new Date();
      
      for (let i = 100; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60000); // 1 minute intervals
        const volatility = 0.02;
        const change = (Math.random() - 0.5) * volatility;
        basePrice = Math.max(0.001, basePrice * (1 + change));
        
        data.push({
          time: timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          price: parseFloat(basePrice.toFixed(6)),
          volume: Math.floor(Math.random() * 1000000) + 500000,
        });
      }
      return data;
    };

    setChartData(generateData());
    const interval = setInterval(() => {
      setChartData(generateData());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [selectedToken, timeframe]);

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0;
  const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].price : currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice > 0 ? (priceChange / previousPrice) * 100 : 0;

  const tokens = [
    { pair: 'OPTK/SOL', name: 'OptikCoin', price: currentPrice, change: priceChangePercent },
    { pair: 'DOGE/SOL', name: 'Dogecoin', price: 0.0892, change: 5.67 },
    { pair: 'PEPE/SOL', name: 'Pepe', price: 0.000012, change: -2.34 },
    { pair: 'SHIB/SOL', name: 'Shiba Inu', price: 0.000008, change: 12.45 },
  ];

  const marketStats = [
    { label: '24h Volume', value: '$2.4M', icon: Volume2, change: '+15.2%' },
    { label: 'Market Cap', value: '$45.2M', icon: DollarSign, change: '+8.7%' },
    { label: 'Holders', value: '12,847', icon: Activity, change: '+234' },
    { label: 'Watchers', value: '3,421', icon: Eye, change: '+89' },
  ];

  return (
    <div className="space-y-6">
      {/* Token Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {tokens.map((token) => (
            <button
              key={token.pair}
              onClick={() => setSelectedToken(token.pair)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedToken === token.pair
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-600/50'
              }`}
            >
              <span>{token.pair}</span>
              <span className={`text-xs ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {token.change >= 0 ? '+' : ''}{token.change.toFixed(2)}%
              </span>
            </button>
          ))}
        </div>

        <div className="flex space-x-2">
          {['1M', '5M', '15M', '1H', '4H', '1D'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                timeframe === tf
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-600/50'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Price Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <span>{selectedToken}</span>
              <div className="flex items-center space-x-1">
                {priceChange >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-400" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-400" />
                )}
                <span className={`text-lg ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
                </span>
              </div>
            </h2>
            <p className="text-3xl font-bold text-white mt-2">
              ${currentPrice.toFixed(6)}
            </p>
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
          
          <div className="text-right">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
              <p className="text-green-400 font-medium">LIVE</p>
              <p className="text-green-300/80 text-xs">Real-time data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {marketStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-lg font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-xs mt-1">{stat.change}</p>
                </div>
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trading Chart */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Price Chart</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">Price</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">Volume</span>
            </div>
          </div>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                domain={['dataMin - 0.001', 'dataMax + 0.001']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order Book Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Buy Orders</h3>
          <div className="space-y-2">
            {[
              { price: 0.0244, amount: 1250, total: 30.5 },
              { price: 0.0243, amount: 2100, total: 51.03 },
              { price: 0.0242, amount: 890, total: 21.54 },
              { price: 0.0241, amount: 1560, total: 37.6 },
            ].map((order, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-green-500/10 rounded">
                <span className="text-green-400 font-mono text-sm">{order.price.toFixed(4)}</span>
                <span className="text-white text-sm">{order.amount}</span>
                <span className="text-gray-400 text-sm">{order.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Sell Orders</h3>
          <div className="space-y-2">
            {[
              { price: 0.0246, amount: 980, total: 24.11 },
              { price: 0.0247, amount: 1340, total: 33.1 },
              { price: 0.0248, amount: 750, total: 18.6 },
              { price: 0.0249, amount: 2200, total: 54.78 },
            ].map((order, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-red-500/10 rounded">
                <span className="text-red-400 font-mono text-sm">{order.price.toFixed(4)}</span>
                <span className="text-white text-sm">{order.amount}</span>
                <span className="text-gray-400 text-sm">{order.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}