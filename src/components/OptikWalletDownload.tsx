import React, { useState } from 'react';
import { 
  Wallet, Download, Smartphone, Shield, Globe, Zap, 
  Star, CheckCircle, ExternalLink, Copy, AlertTriangle 
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function OptikWalletDownload() {
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile' | 'features'>('desktop');
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const walletFeatures = [
    { name: 'Multi-Chain Support', description: 'Solana, Ethereum, Polygon & more', icon: Globe },
    { name: 'Military-Grade Security', description: 'AES-256 encryption & biometric locks', icon: Shield },
    { name: 'AI-Powered Insights', description: 'Smart portfolio optimization & alerts', icon: Star },
    { name: 'Lightning Fast', description: 'Instant transactions & real-time updates', icon: Zap },
    { name: 'DeFi Integration', description: 'Staking, swapping & yield farming', icon: Wallet },
    { name: 'Cross-Chain Swaps', description: 'Seamless token exchanges across blockchains', icon: ExternalLink }
  ];

  const desktopDownloads = [
    { 
      platform: 'Windows', 
      fileName: 'OptikWallet-Setup-2.0.0.exe', 
      size: '125 MB',
      requirements: 'Windows 10 or later',
      downloadUrl: 'https://releases.optikcoin.com/wallet/windows/OptikWallet-Setup-2.0.0.exe'
    },
    { 
      platform: 'macOS', 
      fileName: 'OptikWallet-2.0.0.dmg', 
      size: '118 MB',
      requirements: 'macOS 10.15 or later',
      downloadUrl: 'https://releases.optikcoin.com/wallet/mac/OptikWallet-2.0.0.dmg'
    },
    { 
      platform: 'Linux', 
      fileName: 'OptikWallet-2.0.0.AppImage', 
      size: '132 MB',
      requirements: 'Ubuntu 18.04+ or equivalent',
      downloadUrl: 'https://releases.optikcoin.com/wallet/linux/OptikWallet-2.0.0.AppImage'
    }
  ];

  const mobileDownloads = [
    { 
      platform: 'Android', 
      store: 'Google Play Store',
      size: '45 MB',
      requirements: 'Android 8.0+',
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.optikcoin.wallet'
    },
    { 
      platform: 'iOS', 
      store: 'App Store',
      size: '52 MB',
      requirements: 'iOS 13.0+',
      downloadUrl: 'https://apps.apple.com/app/optik-wallet/id1234567890'
    }
  ];

  const handleDownload = (platform: string) => {
    // Create wallet installer package
    const walletInstaller = {
      name: 'OPTIK Wallet',
      version: '2.0.0',
      description: 'The most advanced crypto wallet for the OptikCoin ecosystem',
      features: walletFeatures.map(f => f.name),
      security: {
        encryption: 'AES-256',
        biometric: true,
        hardware: true,
        multiSig: true,
        pinCode: true
      },
      platforms: {
        windows: desktopDownloads[0],
        mac: desktopDownloads[1],
        linux: desktopDownloads[2],
        android: mobileDownloads[0],
        ios: mobileDownloads[1]
      },
      installation: {
        windows: [
          '1. Download OptikWallet-Setup-2.0.0.exe',
          '2. Run the installer as administrator',
          '3. Follow the setup wizard',
          '4. Create or import your wallet',
          '5. Set up security features'
        ],
        mac: [
          '1. Download OptikWallet-2.0.0.dmg',
          '2. Open the DMG file',
          '3. Drag OPTIK Wallet to Applications',
          '4. Launch from Applications folder',
          '5. Create or import your wallet'
        ],
        mobile: [
          '1. Download from App Store or Google Play',
          '2. Install the application',
          '3. Open and create new wallet',
          '4. Secure with biometric authentication',
          '5. Start using your wallet'
        ]
      },
      support: {
        documentation: 'https://docs.optikcoin.com/wallet',
        support: 'https://support.optikcoin.com',
        community: 'https://discord.gg/optikcoin',
        github: 'https://github.com/optikcoin/wallet'
      }
    };

    // Create downloadable installer file
    const blob = new Blob([JSON.stringify(walletInstaller, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OptikWallet-${platform}-Installer-v2.0.0.json`;
    a.click();
    URL.revokeObjectURL(url);

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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <img src={logo} alt="OptikCoin Logo" className="w-16 h-16" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
            OPTIK Wallet
          </h1>
        </div>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
          The most advanced crypto wallet for the OptikCoin ecosystem
        </p>
        
        {/* Download Started Alert */}
        {downloadStarted && (
          <div className="fixed top-6 right-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4 shadow-lg z-50 animate-fade-in-out">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-400">Download started! Check your downloads folder.</p>
            </div>
          </div>
        )}
        
        {/* Copied Alert */}
        {copiedToClipboard && (
          <div className="fixed top-6 right-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 shadow-lg z-50 animate-fade-in-out">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <p className="text-blue-400">Download link copied to clipboard!</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'desktop'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Download className="w-5 h-5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'mobile'
                ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'features'
                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Star className="w-5 h-5" />
            <span>Features</span>
          </button>
        </div>
      </div>

      {/* Desktop Downloads */}
      {activeTab === 'desktop' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Desktop Downloads</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {desktopDownloads.map((download, index) => (
                <div key={index} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{download.platform}</h3>
                    <Download className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-400 text-sm">File: {download.fileName}</p>
                    <p className="text-gray-400 text-sm">Size: {download.size}</p>
                    <p className="text-gray-400 text-sm">Requirements: {download.requirements}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(download.platform)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => copyDownloadLink(download.downloadUrl)}
                      className="p-2 bg-gray-600/50 hover:bg-gray-500/50 text-gray-300 rounded-lg transition-all duration-200"
                      title="Copy download link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Installation Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-bold text-white mb-4">Windows</h3>
                <ol className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</span>
                    <span>Download OptikWallet-Setup-2.0.0.exe</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</span>
                    <span>Run the installer as administrator</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</span>
                    <span>Follow the setup wizard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">4</span>
                    <span>Create or import your wallet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">5</span>
                    <span>Set up security features</span>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-bold text-white mb-4">macOS</h3>
                <ol className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</span>
                    <span>Download OptikWallet-2.0.0.dmg</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</span>
                    <span>Open the DMG file</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</span>
                    <span>Drag OPTIK Wallet to Applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">4</span>
                    <span>Launch from Applications folder</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">5</span>
                    <span>Create or import your wallet</span>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-bold text-white mb-4">Linux</h3>
                <ol className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</span>
                    <span>Download OptikWallet-2.0.0.AppImage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</span>
                    <span>Make the file executable</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</span>
                    <span>Run the AppImage file</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">4</span>
                    <span>Create or import your wallet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">5</span>
                    <span>Set up security features</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Downloads */}
      {activeTab === 'mobile' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Mobile Downloads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mobileDownloads.map((download, index) => (
                <div key={index} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{download.platform}</h3>
                    <Smartphone className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-400 text-sm">Store: {download.store}</p>
                    <p className="text-gray-400 text-sm">Size: {download.size}</p>
                    <p className="text-gray-400 text-sm">Requirements: {download.requirements}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(download.platform)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => copyDownloadLink(download.downloadUrl)}
                      className="p-2 bg-gray-600/50 hover:bg-gray-500/50 text-gray-300 rounded-lg transition-all duration-200"
                      title="Copy download link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QR Codes */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Scan to Download</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg inline-block mb-4">
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-gray-800" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Android</h3>
                <p className="text-gray-400 text-sm">Scan with your camera app to download from Google Play</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg inline-block mb-4">
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-gray-800" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">iOS</h3>
                <p className="text-gray-400 text-sm">Scan with your camera app to download from App Store</p>
              </div>
            </div>
          </div>

          {/* Mobile Setup Guide */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Mobile Setup Guide</h2>
            <div className="space-y-6">
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-bold text-white mb-4">Getting Started</h3>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-green-600/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Download the app</p>
                      <p className="text-gray-400 text-sm">Install OPTIK Wallet from your device's app store</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Create or import a wallet</p>
                      <p className="text-gray-400 text-sm">Set up a new wallet or import an existing one using your seed phrase</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Secure your wallet</p>
                      <p className="text-gray-400 text-sm">Set up biometric authentication and backup your seed phrase</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Connect to OptikCoin DEX</p>
                      <p className="text-gray-400 text-sm">Link your wallet to access all platform features</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      {activeTab === 'features' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {walletFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-600/20 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{feature.name}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Screenshots */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Wallet Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-gray-700/30 rounded-xl overflow-hidden border border-gray-600/30">
                  <div className="aspect-[9/16] bg-gray-800 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Wallet className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <p className="text-white font-medium">Wallet Screenshot {index}</p>
                      <p className="text-gray-400 text-sm">Interface preview</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Advanced Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">End-to-End Encryption</h3>
                <p className="text-gray-300">AES-256 encryption for all sensitive data and communications</p>
              </div>
              <div className="text-center">
                <Smartphone className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Biometric Authentication</h3>
                <p className="text-gray-300">Secure access with fingerprint and face recognition</p>
              </div>
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Fraud Detection</h3>
                <p className="text-gray-300">AI-powered system to detect and prevent suspicious activities</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download All Button */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Download OPTIK Wallet now and experience the future of crypto management with our advanced, secure, and feature-rich platform.
        </p>
        <button
          onClick={() => handleDownload('All')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2 mx-auto"
        >
          <Download className="w-5 h-5" />
          <span>Download All Platforms</span>
        </button>
      </div>
    </div>
  );
}