import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Smartphone, AlertTriangle } from 'lucide-react';
import { Keypair } from '@solana/web3.js';

interface AdminLoginProps {
  onLogin: (success: boolean, publicKey: string) => void;
}

function downloadWalletKeypair(secretKey: number[], filename = 'optik-wallet-keypair.json') {
  const blob = new Blob([JSON.stringify(secretKey)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [step, setStep] = useState<'credentials' | '2fa' | 'kyc'>('credentials');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: '',
    fullName: '',
    country: '',
    idNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const ADMIN_EMAIL = 'admin@optikcoin.com';
  const ADMIN_PASSWORD = 'OptikAdmin2025!';
  const [generatedCode, setGeneratedCode] = useState('');
  const generate2FACode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      const code = generate2FACode();
      setGeneratedCode(code);
      setStep('2fa');
    } else {
      setError('Invalid admin credentials.');
    }
    setIsLoading(false);
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (formData.twoFactorCode === generatedCode) {
      setStep('kyc');
    } else {
      setError('Invalid 2FA code.');
    }
    setIsLoading(false);
  };

  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/kyc/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          country: formData.country,
          idNumber: formData.idNumber,
          email: formData.email
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'KYC verification failed.');

      const keypair = Keypair.generate();
      const secretKey = Array.from(keypair.secretKey);
      const publicKey = keypair.publicKey.toBase58();
      downloadWalletKeypair(secretKey);
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      localStorage.setItem('adminPublicKey', publicKey);
      onLogin(true, publicKey);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {step === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit} className="bg-gray-800/50 border border-red-700/30 rounded-xl p-8 space-y-6">
            <div className="text-center">
              <Shield className="w-10 h-10 text-red-400 mb-4 mx-auto bg-red-600/20 p-2 rounded-full" />
              <h2 className="text-2xl font-bold text-white">Admin Login</h2>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <input type="email" placeholder="Email" className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 rounded-lg text-white" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 pr-10 rounded-lg text-white" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
            </div>
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">{isLoading ? 'Checking...' : 'Continue'}</button>
          </form>
        )}

        {step === '2fa' && (
          <form onSubmit={handle2FASubmit} className="bg-gray-800/50 border border-red-700/30 rounded-xl p-8 space-y-6">
            <div className="text-center">
              <Smartphone className="w-10 h-10 text-red-400 mb-4 mx-auto bg-red-600/20 p-2 rounded-full" />
              <h2 className="text-2xl font-bold text-white">Two-Factor Code</h2>
              <p className="text-gray-400">Enter code: <span className="text-white font-mono">{generatedCode}</span></p>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <input type="text" maxLength={6} className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 text-white text-center rounded-lg" value={formData.twoFactorCode} onChange={e => setFormData({ ...formData, twoFactorCode: e.target.value.replace(/\D/g, '') })} required />
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">{isLoading ? 'Verifying...' : 'Verify'}</button>
          </form>
        )}

        {step === 'kyc' && (
          <form onSubmit={handleKYCSubmit} className="bg-gray-800/50 border border-red-700/30 rounded-xl p-8 space-y-6">
            <div className="text-center">
              <Shield className="w-10 h-10 text-red-400 mb-4 mx-auto bg-red-600/20 p-2 rounded-full" />
              <h2 className="text-2xl font-bold text-white">KYC Verification</h2>
              <p className="text-gray-400 text-sm">Please complete the fields below to generate your wallet</p>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <input type="text" placeholder="Full Name" className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 text-white rounded-lg" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} required />
            <input type="text" placeholder="Country" className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 text-white rounded-lg" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} required />
            <input type="text" placeholder="Government ID Number" className="w-full bg-gray-700/50 border border-red-600/30 px-4 py-3 text-white rounded-lg" value={formData.idNumber} onChange={e => setFormData({ ...formData, idNumber: e.target.value })} required />
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">{isLoading ? 'Verifying KYC...' : 'Download Wallet & Login'}</button>
          </form>
        )}
      </div>
    </div>
  );
}
