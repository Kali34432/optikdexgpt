import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  ReferenceLine, Legend
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Volume2, DollarSign, 
  Activity, Eye, ChevronDown, BarChart2, CandlestickChart,
  RefreshCw, ZoomIn, ZoomOut, ArrowLeft, ArrowRight, 
  Maximize, Minimize, Settings, List, AlertCircle
} from 'lucide-react';

export default function TradingChart() {
  const [selectedToken, setSelectedToken] = useState('OPTK/SOL');
  const [timeframe, setTimeframe] = useState('1H');
  const [chartType, setChartType] = useState('candle');
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(true);
  const [orderType, setOrderType] = useState('limit');
  const [orderSide, setOrderSide] = useState('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('0.00');
  const [showDepth, setShowDepth] = useState(true);
  const [showIndicators, setShowIndicators] = useState(false);
  const [selectedIndicators, setSelectedIndicators] = useState(['MA', 'Volume']);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  const tokens = [
    { pair: 'OPTK/SOL', name: 'OptikCoin', price: 0.0245, change: 5.67, volume: '$2.4M', positive: true },
    { pair: 'OPTK/USDT', name: 'OptikCoin', price: 0.0892, change: 5.67, volume: '$2.1M', positive: true },
    { pair: 'ETH/USDT', name: 'Ethereum', price: 2222.64, change: -0.23, volume: '$24.01B', positive: false },
    { pair: 'BTC/USDT', name: 'Bitcoin', price: 100697.60, change: -0.24, volume: '$29.28B', positive: false },
  ];

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'];
  const chartTypes = [
    { id: 'candle', name: 'Candlestick', icon: CandlestickChart },
    { id: 'line', name: 'Line', icon: TrendingUp },
    { id: 'area', name: 'Area', icon: BarChart2 },
    { id: 'bar', name: 'Bar', icon: BarChart2 },
  ];

  const indicators = [
    { id: 'MA', name: 'Moving Average' },
    { id: 'EMA', name: 'Exponential Moving Average' },
    { id: 'MACD', name: 'MACD' },
    { id: 'RSI', name: 'RSI' },
    { id: 'BB', name: 'Bollinger Bands' },
    { id: 'Volume

The error occurred because there was already a `change` variable in the scope (likely from the destructuring of the data point), and then another variable with the same name was being declared when calculating the price difference.

<boltArtifact id="fix-interactive-trading-chart" title="Fix Interactive Trading Chart">