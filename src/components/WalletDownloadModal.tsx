import React, { useState } from 'react';
import { 
  X, Wallet, Download, Smartphone, Shield, Globe, Zap, 
  Star, CheckCircle, ExternalLink, Copy, AlertTriangle 
} from 'lucide-react';

interface WalletDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletDownloadModal({ isOpen, onClose }: WalletDownloadModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'windows' | 'mac' | 'android' | 'ios'>('windows');
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  if (!isOpen) return null;

  const platforms = {
    windows: {
      name: 'Windows',
      fileName: 'OptikWallet-Setup-2.0.0.exe',
      size: '125 MB',
      requirements: 'Windows 10 or later',
      steps: [
        'Download OptikWallet-Setup-2.0.0.exe',
        'Run the installer as administrator',
        'Follow the setup wizard',
        'Create or import your wallet',
        'Set up security features'
      ],
      downloadUrl: 'https://github.com/optikcoin/wallet/releases/download/v2.0.0/OptikWallet-Setup-2.0.0.exe'
    },
    mac: {
      name: 'macOS',
      fileName: 'OptikWallet-2.0.0.dmg',
      size: '118 MB',
      requirements: 'macOS 10.15 or later',
      steps: [
        'Download OptikWallet-2.0.0.dmg',
        'Open the DMG file',
        'Drag OPTIK Wallet to Applications',
        'Launch from Applications folder',
        'Create or import your wallet'
      ],
      downloadUrl: 'https://github.com/optikcoin/wallet/releases/download/v2.0.0/OptikWallet-2.0.0.dmg'
    },
    android: {
      name: 'Android',
      fileName: 'OPTIK Wallet',
      size: '45 MB',
      requirements: 'Android 8.0+',
      store: 'Google Play Store',
      steps: [
        'Download from Google Play Store',
        'Install the application',
        'Open and create new wallet',
        'Secure with biometric authentication',
        'Start using your wallet'
      ],
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.optikcoin.wallet'
    },
    ios: {
      name: 'iOS',
      fileName: 'OPTIK Wallet',
      size: '52 MB',
      requirements: 'iOS 13.0+',
      store: 'App Store',
      steps: [
        'Download from App Store',
        'Install the application',
        'Open and create new wallet',
        'Secure with biometric authentication',
        'Start using your wallet'
      ],
      downloadUrl: 'https://apps.apple.com/app/optik-wallet/id1234567890'
    }
  };

  const handleDownload = () => {
    // For demo purposes, we'll just show a success notification
    // and open a new tab with the download URL for mobile platforms
    if (selectedPlatform === 'android' || selectedPlatform === 'ios') {
      window.open(platforms[selectedPlatform].downloadUrl, '_blank');
    } else {
      // For desktop platforms, we'll simulate a download
      const link = document.createElement('a');
      link.href = platforms[selectedPlatform].downloadUrl;
      link.setAttribute('download', platforms[selectedPlatform].fileName);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Show success notification
    setDownloadStarted(true);
    setTimeout(() => setDownloadStarted(false), 3000);
  };

  const copyDownloadLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-white">OPTIK Wallet Download</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Platform Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {(Object.keys(platforms) as Array<keyof typeof platforms>).map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedPlatform === platform
                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                    : 'bg-gray-700/30 border-gray-600/30 hover:border-gray-500/50 text-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  {platform === 'windows' || platform === 'mac' ? (
                    <Download className="w-8 h-8 mb-2" />
                  ) : (
                    <Smartphone className="w-8 h-8 mb-2" />
                  )}
                  <span>{platforms[platform].name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Platform Details */}
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{platforms[selectedPlatform].name}</h3>
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm">
                    <span className="text-gray-400">File:</span> {platforms[selectedPlatform].fileName}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="text-gray-400">Size:</span> {platforms[selectedPlatform].size}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="text-gray-400">Requirements:</span> {platforms[selectedPlatform].requirements}
                  </p>
                  {(selectedPlatform === 'android' || selectedPlatform === 'ios') && (
                    <p className="text-gray-300 text-sm">
                      <span className="text-gray-400">Store:</span> {platforms[selectedPlatform].store}
                    </p>
                  )}
                </div>
              </div>
              {selectedPlatform === 'windows' || selectedPlatform === 'mac' ? (
                <Download className="w-12 h-12 text-blue-400" />
              ) : (
                <Smartphone className="w-12 h-12 text-green-400" />
              )}
            </div>

            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">Installation Steps:</h4>
              <ol className="space-y-2">
                {platforms[selectedPlatform].steps.map((step, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Now</span>
              </button>
              <button
                onClick={() => copyDownloadLink(platforms[selectedPlatform].downloadUrl)}
                className="p-3 bg-gray-600/50 hover:bg-gray-500/50 text-gray-300 rounded-lg transition-all duration-200"
                title="Copy download link"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>

            {downloadStarted && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">Download started! Check your downloads folder or browser.</p>
              </div>
            )}

            {copiedToClipboard && (
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-blue-400 text-sm">Download link copied to clipboard!</p>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { icon: Globe, text: 'Multi-chain support' },
                { icon: Shield, text: 'Military-grade security' },
                { icon: Star, text: 'AI-powered insights' },
                { icon: Zap, text: 'Lightning fast transactions' },
                { icon: Wallet, text: 'DeFi integration' },
                { icon: CheckCircle, text: 'Cross-chain swaps' }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-800/50 rounded-lg">
                    <Icon className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-400 font-medium">Secure & Trusted</p>
                <p className="text-green-300/80 text-sm mt-1">
                  OPTIK Wallet uses industry-leading security standards to keep your assets safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}