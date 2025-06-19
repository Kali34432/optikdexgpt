import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AIChat from './components/AIChat';
import TokenSwap from './components/TokenSwap';
import MemeCreator from './components/MemeCreator';
import TradingChart from './components/TradingChart';
import Subscription from './components/Subscription';
import Login from './components/Login';
import Whitepaper from './components/Whitepaper';
import Roadmap from './components/Roadmap';
import Mining from './components/Mining';
import Staking from './components/Staking';
import Airdrop from './components/Airdrop';

function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'chat':
        return <AIChat />;
      case 'swap':
        return <TokenSwap />;
      case 'creator':
        return <MemeCreator />;
      case 'chart':
        return <TradingChart />;
      case 'subscription':
        return <Subscription />;
      case 'whitepaper':
        return <Whitepaper />;
      case 'roadmap':
        return <Roadmap />;
      case 'mining':
        return <Mining />;
      case 'staking':
        return <Staking />;
      case 'airdrop':
        return <Airdrop />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveComponent()}
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default App;