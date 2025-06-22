import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Volume2, 
  Settings, 
  Maximize2, 
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Target,
  Activity,
  Zap,
  Eye,
  BarChart3
} from 'lucide-react';

interface TradingData {
  time: string;
  timestamp: number;
  price: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
  sma20?: number;
  sma50?: number;
  rsi?: number;
  macd?: number;
  signal?: number;
}

interface InteractiveTradingChartProps {
  selectedPair: string;
}

export default function InteractiveTradingChart({ selectedPair }: InteractiveTradingChartProps) {
  const [chartData, setChartData] = useState<TradingData[]>([]);
  const [timeframe, setTimeframe] = useState('1H');
  const [chartType, setChartType] = useState<'line' | 'area' | 'candlestick'>('area');
  const [showVolume, setShowVolume] = useState(true);
  const [showIndicators, setShowIndicators] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Generate realistic trading data
  const generateTradingData = (basePrice: number = 0.0245, points: number = 100): TradingData[] => {
    const data: TradingData[] = [];
    let price = basePrice;
    const now = new Date();
    
    for (let i = points; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * getTimeframeMs());
      const volatility = 0.03;
      const trend = Math.sin(i * 0.1) * 0.001; // Add some trending behavior
      const randomChange = (Math.random() - 0.5) * volatility;
      
      const open = price;
      const change = trend + randomChange;
      const close = Math.max(0.001, price * (1 + change));
      const high = Math.max(open, close) * (1 + Math.random() * 0.02);
      const low = Math.min(open, close) * (1 - Math.random() * 0.02);
      const volume = Math.floor(Math.random() * 2000000) + 500000;
      
      price = close;
      
      const dataPoint: TradingData = {
        time: formatTime(timestamp),
        timestamp: timestamp.getTime(),
        price: parseFloat(close.toFixed(6)),
        volume,
        high: parseFloat(high.toFixed(6)),
        low: parseFloat(low.toFixed(6)),
        open: parseFloat(open.toFixed(6)),
        close: parseFloat(close.toFixed(6))
      };
      
      data.push(dataPoint);
    }
    
    // Calculate technical indicators
    return calculateIndicators(data);
  };

  const getTimeframeMs = (): number => {
    const timeframes: Record<string, number> = {
      '1M': 60 * 1000,
      '5M': 5 * 60 * 1000,
      '15M': 15 * 60 * 1000,
      '1H': 60 * 60 * 1000,
      '4H': 4 * 60 * 60 * 1000,
      '1D': 24 * 60 * 60 * 1000
    };
    return timeframes[timeframe] || timeframes['1H'];
  };

  const formatTime = (date: Date): string => {
    if (timeframe === '1D') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const calculateIndicators = (data: TradingData[]): TradingData[] => {
    return data.map((point, index) => {
      const newPoint = { ...point };
      
      // Simple Moving Averages
      if (index >= 19) {
        const sma20 = data.slice(index - 19, index + 1)
          .reduce((sum, p) => sum + p.close, 0) / 20;
        newPoint.sma20 = parseFloat(sma20.toFixed(6));
      }
      
      if (index >= 49) {
        const sma50 = data.slice(index - 49, index + 1)
          .reduce((sum, p) => sum + p.close, 0) / 50;
        newPoint.sma50 = parseFloat(sma50.toFixed(6));
      }
      
      // RSI calculation (simplified)
      if (index >= 14) {
        const changes = data.slice(index - 13, index + 1)
          .map((p, i, arr) => i > 0 ? p.close - arr[i - 1].close : 0);
        const gains = changes.filter(c => c > 0).reduce((sum, c) => sum + c, 0) / 14;
        const losses = Math.abs(changes.filter(c => c < 0).reduce((sum, c) => sum + c, 0)) / 14;
        const rs = gains / (losses || 0.001);
        newPoint.rsi = parseFloat((100 - (100 / (1 + rs))).toFixed(2));
      }
      
      return newPoint;
    });
  };

  // Initialize and update data
  useEffect(() => {
    const basePrice = selectedPair.includes('OPTK') ? 0.0245 : 
                     selectedPair.includes('SOL') ? 98.45 :
                     selectedPair.includes('ETH') ? 2345.67 : 0.0245;
    
    const initialData = generateTradingData(basePrice);
    setChartData(initialData);
    
    if (initialData.length > 0) {
      const latest = initialData[initialData.length - 1];
      const previous = initialData[initialData.length - 2];
      setCurrentPrice(latest.close);
      
      if (previous) {
        const change = latest.close - previous.close;
        const changePercent = (change / previous.close) * 100;
        setPriceChange(change);
        setPriceChangePercent(changePercent);
      }
    }
  }, [selectedPair, timeframe]);

  // Live data updates
  useEffect(() => {
    if (isLive) {
      intervalRef.current = setInterval(() => {
        setChartData(prevData => {
          if (prevData.length === 0) return prevData;
          
          const lastPoint = prevData[prevData.length - 1];
          const now = new Date();
          const volatility = 0.02;
          const change = (Math.random() - 0.5) * volatility;
          const newPrice = Math.max(0.001, lastPoint.close * (1 + change));
          
          const newPoint: TradingData = {
            time: formatTime(now),
            timestamp: now.getTime(),
            price: parseFloat(newPrice.toFixed(6)),
            volume: Math.floor(Math.random() * 1000000) + 500000,
            high: Math.max(lastPoint.close, newPrice),
            low: Math.min(lastPoint.close, newPrice),
            open: lastPoint.close,
            close: parseFloat(newPrice.toFixed(6))
          };
          
          const updatedData = [...prevData.slice(1), newPoint];
          const calculatedData = calculateIndicators(updatedData);
          
          // Update current price and change
          setCurrentPrice(newPrice);
          const change = newPrice - lastPoint.close;
          const changePercent = (change / lastPoint.close) * 100;
          setPriceChange(change);
          setPriceChangePercent(changePercent);
          
          return calculatedData;
        });
      }, 2000); // Update every 2 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLive, timeframe]);

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D'];
  const chartTypes = [
    { id: 'area', label: 'Area', icon: BarChart3 },
    { id: 'line', label: 'Line', icon: Activity },
    { id: 'candlestick', label: 'Candles', icon: Target }
  ];

  const renderChart = () => {
    if (chartType === 'area') {
      return (
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
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
            tickFormatter={(value) => `$${value.toFixed(4)}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
            labelStyle={{ color: '#9CA3AF' }}
            formatter={(value: any, name: string) => [
              `$${parseFloat(value).toFixed(6)}`,
              name === 'close' ? 'Price' : name
            ]}
          />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#06B6D4"
            strokeWidth={2}
            fill="url(#priceGradient)"
          />
          {showIndicators && (
            <>
              <Line
                type="monotone"
                dataKey="sma20"
                stroke="#F59E0B"
                strokeWidth={1}
                dot={false}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="sma50"
                stroke="#EF4444"
                strokeWidth={1}
                dot={false}
                strokeDasharray="5 5"
              />
            </>
          )}
        </AreaChart>
      );
    }

    return (
      <LineChart data={chartData}>
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
          tickFormatter={(value) => `$${value.toFixed(4)}`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB'
          }}
          labelStyle={{ color: '#9CA3AF' }}
          formatter={(value: any, name: string) => [
            `$${parseFloat(value).toFixed(6)}`,
            name === 'close' ? 'Price' : name
          ]}
        />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#06B6D4"
          strokeWidth={2}
          dot={false}
        />
        {showIndicators && (
          <>
            <Line
              type="monotone"
              dataKey="sma20"
              stroke="#F59E0B"
              strokeWidth={1}
              dot={false}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="sma50"
              stroke="#EF4444"
              strokeWidth={1}
              dot={false}
              strokeDasharray="5 5"
            />
          </>
        )}
      </LineChart>
    );
  };

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm border border-cyan-700/30 rounded-xl transition-all duration-300 ${
      isFullscreen ? 'fixed inset-4 z-50' : ''
    }`}>
      {/* Chart Header */}
      <div className="p-6 border-b border-cyan-700/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-white">{selectedPair}</h2>
            <div className="flex items-center space-x-2">
              {priceChange >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-400" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-400" />
              )}
              <span className={`text-lg font-semibold ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-3xl font-bold text-white">${currentPrice.toFixed(6)}</p>
              <p className="text-gray-400 text-sm">Last: {new Date().toLocaleTimeString()}</p>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isLive ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
            }`}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{isLive ? 'LIVE' : 'PAUSED'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Timeframe Selector */}
            <div className="flex space-x-1 bg-gray-700/30 rounded-lg p-1">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                    timeframe === tf
                      ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart Type Selector */}
            <div className="flex space-x-1 bg-gray-700/30 rounded-lg p-1">
              {chartTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setChartType(type.id as any)}
                    className={`px-3 py-1 text-sm rounded-md transition-all duration-200 flex items-center space-x-1 ${
                      chartType === type.id
                        ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Indicators Toggle */}
            <button
              onClick={() => setShowIndicators(!showIndicators)}
              className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${
                showIndicators
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  : 'bg-gray-700/30 text-gray-300 hover:text-white hover:bg-gray-600/50'
              }`}
            >
              Indicators
            </button>

            {/* Volume Toggle */}
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                showVolume
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'bg-gray-700/30 text-gray-300 hover:text-white hover:bg-gray-600/50'
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Live Toggle */}
            <button
              onClick={() => setIsLive(!isLive)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isLive
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-700/30 text-gray-300 hover:text-white hover:bg-gray-600/50'
              }`}
            >
              {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-gray-700/30 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className={`p-6 ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-96'}`}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      {showVolume && (
        <div className="px-6 pb-6">
          <div className="h-24 border-t border-cyan-700/30 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value: any) => [value.toLocaleString(), 'Volume']}
                />
                <Bar dataKey="volume" fill="#06B6D4" opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Technical Indicators Panel */}
      {showIndicators && (
        <div className="px-6 pb-6 border-t border-cyan-700/30">
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Technical Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-3">
                <p className="text-gray-400 text-sm">RSI (14)</p>
                <p className="text-white font-semibold">
                  {chartData.length > 0 && chartData[chartData.length - 1].rsi 
                    ? chartData[chartData.length - 1].rsi?.toFixed(2) 
                    : '--'}
                </p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-3">
                <p className="text-gray-400 text-sm">SMA 20</p>
                <p className="text-yellow-400 font-semibold">
                  {chartData.length > 0 && chartData[chartData.length - 1].sma20 
                    ? `$${chartData[chartData.length - 1].sma20?.toFixed(6)}` 
                    : '--'}
                </p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-3">
                <p className="text-gray-400 text-sm">SMA 50</p>
                <p className="text-red-400 font-semibold">
                  {chartData.length > 0 && chartData[chartData.length - 1].sma50 
                    ? `$${chartData[chartData.length - 1].sma50?.toFixed(6)}` 
                    : '--'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}