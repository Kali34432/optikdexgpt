import React, { useState } from 'react';
import { Rocket, Code, DollarSign, Shield, Zap, Upload, Sparkles, AlertTriangle } from 'lucide-react';

export default function MemeCreator() {
  const [step, setStep] = useState(1);
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '',
    decimals: '9',
    image: null,
  });

  const steps = [
    { id: 1, title: 'Token Details', icon: Sparkles },
    { id: 2, title: 'Smart Contract', icon: Code },
    { id: 3, title: 'Liquidity Pool', icon: DollarSign },
    { id: 4, title: 'Launch', icon: Rocket },
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Token Name</label>
                <input
                  type="text"
                  placeholder="e.g., DogeCoin Supreme"
                  value={tokenData.name}
                  onChange={(e) => setTokenData({...tokenData, name: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Token Symbol</label>
                <input
                  type="text"
                  placeholder="e.g., DOGES"
                  value={tokenData.symbol}
                  onChange={(e) => setTokenData({...tokenData, symbol: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                placeholder="Describe your meme coin's purpose and community..."
                value={tokenData.description}
                onChange={(e) => setTokenData({...tokenData, description: e.target.value})}
                rows={4}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Total Supply</label>
                <input
                  type="text"
                  placeholder="1000000000"
                  value={tokenData.totalSupply}
                  onChange={(e) => setTokenData({...tokenData, totalSupply: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Decimals</label>
                <select
                  value={tokenData.decimals}
                  onChange={(e) => setTokenData({...tokenData, decimals: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                >
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="18">18</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Token Image</label>
              <div className="border-2 border-dashed border-gray-600/50 rounded-lg p-8 text-center hover:border-blue-500/50 transition-colors duration-200">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Upload your token image</p>
                <p className="text-gray-500 text-sm">PNG, JPG up to 2MB</p>
                <input type="file" className="hidden" accept="image/*" />
                <button className="mt-4 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg transition-colors duration-200">
                  Choose File
                </button>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-400" />
                Smart Contract Configuration
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Mint Authority</p>
                    <p className="text-gray-400 text-sm">Control token minting after launch</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Freeze Authority</p>
                    <p className="text-gray-400 text-sm">Ability to freeze token accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Anti-Bot Protection</p>
                    <p className="text-gray-400 text-sm">Protect against malicious sniping bots</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-400 font-medium">Security Recommendations</p>
                  <p className="text-amber-300/80 text-sm mt-1">
                    We recommend enabling anti-bot protection and disabling mint authority after launch for maximum trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                Liquidity Pool Setup
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Initial SOL Liquidity</label>
                  <input
                    type="text"
                    placeholder="10.0"
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20"
                  />
                  <p className="text-gray-400 text-xs mt-1">Minimum 5 SOL required</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Allocation (%)</label>
                  <input
                    type="text"
                    placeholder="80"
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20"
                  />
                  <p className="text-gray-400 text-xs mt-1">% of total supply for liquidity</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="text-green-400 font-medium mb-2">OPTK Backing Benefits</h4>
                <ul className="text-green-300/80 text-sm space-y-1">
                  <li>• Additional liquidity backing from OPTK reserves</li>
                  <li>• Enhanced price stability during launch</li>
                  <li>• Protection against initial volatility</li>
                  <li>• Increased trading confidence</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium">Launch Package Included</p>
                  <p className="text-blue-300/80 text-sm mt-1">
                    Your $99.99 payment includes minimum liquidity funding and launch support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Launch!</h3>
              <p className="text-gray-400">Your meme coin is configured and ready for deployment</p>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h4 className="text-lg font-semibold text-white mb-4">Launch Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Token Name:</span>
                  <span className="text-white">{tokenData.name || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Symbol:</span>
                  <span className="text-white">{tokenData.symbol || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Supply:</span>
                  <span className="text-white">{tokenData.totalSupply || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Launch Cost:</span>
                  <span className="text-green-400 font-semibold">$99.99</span>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium">Important Notice</p>
                  <p className="text-red-300/80 text-sm mt-1">
                    Once launched, certain token parameters cannot be changed. Please review all settings carefully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => {
            const Icon = stepItem.icon;
            const isActive = step === stepItem.id;
            const isCompleted = step > stepItem.id;
            
            return (
              <div key={stepItem.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : isCompleted 
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-gray-400'}`}>
                    Step {stepItem.id}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    {stepItem.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-600'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {steps.find(s => s.id === step)?.title}
          </h2>
          <p className="text-gray-400">
            {step === 1 && "Configure your meme coin's basic properties"}
            {step === 2 && "Set up smart contract security features"}
            {step === 3 && "Configure liquidity pool and funding"}
            {step === 4 && "Review and launch your token"}
          </p>
        </div>

        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-700/50">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-2 bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200"
          >
            Previous
          </button>
          
          {step < 4 ? (
            <button
              onClick={() => setStep(Math.min(4, step + 1))}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              Next Step
            </button>
          ) : (
            <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25 flex items-center space-x-2">
              <Rocket className="w-5 h-5" />
              <span>Launch Token ($99.99)</span>
            </button>
          )}
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <div className="mt-8 bg-purple-600/10 border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Meme Coin Assistant</h3>
            <p className="text-purple-300/80 text-sm">Get personalized advice for your token</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors duration-200">
            <p className="text-purple-300 font-medium text-sm">💡 Generate viral token name ideas</p>
          </button>
          <button className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors duration-200">
            <p className="text-purple-300 font-medium text-sm">🚀 Optimize tokenomics for growth</p>
          </button>
          <button className="w-full text-left p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors duration-200">
            <p className="text-purple-300 font-medium text-sm">🛡️ Security best practices</p>
          </button>
        </div>
      </div>
    </div>
  );
}