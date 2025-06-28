import React, { useState, useEffect } from 'react';
import {
  Rocket, Code, DollarSign, Upload, Sparkles, AlertTriangle,
  Globe, TrendingUp, Bot, Megaphone, Shield
} from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import SubscriptionGate from './SubscriptionGate';
import { createToken } from '../services/supabaseClient';

export default function MemeCreator() {
  const { hasAccess } = useSubscription();
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [tokenData, setTokenData] = useState({
    name: '', symbol: '', description: '',
    totalSupply: '', decimals: '9',
    image: null as File | null,
    websiteUrl: '', telegramUrl: '',
    twitterUrl: '', liquidityPoolSol: '',
    liquidityPoolTokens: ''
  });

  const [includeWebsiteBuilder, setIncludeWebsiteBuilder] = useState(false);
  const [includeViralGPT, setIncludeViralGPT] = useState(false);
  const [includeSocialMediaPosts, setIncludeSocialMediaPosts] = useState(false);
  const [includeAdvancedLLM, setIncludeAdvancedLLM] = useState(false);
  const [includePromotionGPT, setIncludePromotionGPT] = useState(false);
  const [isUltimateBundleSelected, setIsUltimateBundleSelected] = useState(false);

  useEffect(() => {
    if (isUltimateBundleSelected) {
      setIncludeWebsiteBuilder(true);
      setIncludeViralGPT(true);
      setIncludeSocialMediaPosts(true);
      setIncludeAdvancedLLM(true);
      setIncludePromotionGPT(true);
    }
  }, [isUltimateBundleSelected]);

  useEffect(() => {
    if (isUltimateBundleSelected &&
        (!includeWebsiteBuilder || !includeViralGPT || !includeSocialMediaPosts || !includeAdvancedLLM || !includePromotionGPT)) {
      setIsUltimateBundleSelected(false);
    }
  }, [includeWebsiteBuilder, includeViralGPT, includeSocialMediaPosts, includeAdvancedLLM, includePromotionGPT, isUltimateBundleSelected]);

  const calculateTotalCost = () => {
    if (isUltimateBundleSelected) return 799.99;
    let total = 499.99;
    includeWebsiteBuilder && (total += 99.99);
    includeViralGPT && (total += 99.99);
    includeSocialMediaPosts && (total += 99.99);
    includeAdvancedLLM && (total += 99.99);
    includePromotionGPT && (total += 99.99);
    return total;
  };

  const addOns = [
    { id: 'website', name: 'Optik Website Builder AI', desc: 'AI website creation', price: 99.99, icon: Globe, state: includeWebsiteBuilder, setState: setIncludeWebsiteBuilder },
    { id: 'viral', name: 'Optik Viral GPT', desc: 'Viral marketing GPT', price: 99.99, icon: TrendingUp, state: includeViralGPT, setState: setIncludeViralGPT },
    { id: 'social', name: 'Social Media Posts', desc: 'Viral content creation', price: 99.99, icon: Megaphone, state: includeSocialMediaPosts, setState: setIncludeSocialMediaPosts },
    { id: 'advancedLLM', name: 'Advanced LLM GPT', desc: 'Market strategy GPT', price: 99.99, icon: Bot, state: includeAdvancedLLM, setState: setIncludeAdvancedLLM },
    { id: 'promotion', name: 'Promotion GPT', desc: 'Community growth GPT', price: 99.99, icon: Sparkles, state: includePromotionGPT, setState: setIncludePromotionGPT },
  ];

  const steps = [
    { id: 1, title: 'Token Details', icon: Sparkles },
    { id: 2, title: 'Smart Contract', icon: Code },
    { id: 3, title: 'Liquidity Pool', icon: DollarSign },
    { id: 4, title: 'Launch', icon: Rocket },
  ];

  const handleCreateToken = async () => {
    if (!hasAccess('token_creation')) {
      alert('Token creation requires Ultimate Bundle subscription');
      return;
    }
    setIsCreating(true);
    try {
      const result = await createToken({
        name: tokenData.name,
        symbol: tokenData.symbol,
        description: tokenData.description,
        totalSupply: parseInt(tokenData.totalSupply),
        decimals: parseInt(tokenData.decimals),
        websiteUrl: tokenData.websiteUrl,
        telegramUrl: tokenData.telegramUrl,
        twitterUrl: tokenData.twitterUrl,
        liquidityPoolSol: parseFloat(tokenData.liquidityPoolSol),
        liquidityPoolTokens: parseFloat(tokenData.liquidityPoolTokens),
        image: tokenData.image
      });
      alert(`Token created successfully! Contract address: ${result.contract_address}`);
      // reset form
      setTokenData({
        name: '', symbol: '', description: '', totalSupply: '', decimals: '9',
        image: null, websiteUrl: '', telegramUrl: '',
        twitterUrl: '', liquidityPoolSol: '', liquidityPoolTokens: ''
      });
      setStep(1);
    } catch (e: any) {
      alert(`Failed to create token: ${e.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Token Details Form */}
            {/* Name, Symbol, Description, Supply, Decimals fields here... */}
            <div>
              <label>Token Image</label>
              <div className="border-dashed border-gray-600 p-6 rounded text-center">
                <Upload className="w-12 h-12 mx-auto mb-2" />
                <p>Upload your token image (PNG/JPG up to 2MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={e => setTokenData({...tokenData, image: e.target.files?.[0] || null})}
                />
                <label htmlFor="image-upload"
                  className="mt-4 inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:opacity-90">
                  {tokenData.image ? tokenData.image.name : 'Choose File'}
                </label>
              </div>
            </div>
          </div>
        );
      // cases 2,3: similar clean layouts
      case 4:
        return (
          <div className="space-y-6">
            {/* Summary, Add-ons selection */}
          </div>
        );
      default: return null;
    }
  };

  return (
    <SubscriptionGate feature="token_creation">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress Navigation */}
        {/* renderStepContent */}
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="bg-gray-700 px-6 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg hover:opacity-90"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleCreateToken}
              disabled={isCreating}
              className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 rounded-lg text-white flex items-center space-x-2 hover:opacity-90 disabled:opacity-50"
            >
              <Rocket className="w-5 h-5" />
              <span>{isCreating ? 'Creating Token...' : `Launch Token ($${calculateTotalCost().toFixed(2)})`}</span>
            </button>
          )}
        </div>
      </div>
    </SubscriptionGate>
  );
}
