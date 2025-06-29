import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Smartphone, AlertTriangle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const ADMIN_EMAIL = 'admin@optikcoin.com';
  const ADMIN_PASSWORD = 'OptikAdmin2025!';

  const generate2FACode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const [generatedCode, setGeneratedCode] = useState('');

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        const code = generate2FACode();
        setGeneratedCode(code);
        console.log('2FA Code:', code); // This would be sent via email or text in production
        setStep('2fa');
      } else {
        setError('Invalid admin credentials. Please check your email and password.');
      }
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (formData.twoFactorCode === generatedCode) {
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminLoginTime', Date.now().toString());
        onLogin(true);
      } else {
        setError('Invalid 2FA code. Please try again.');
      }
    } catch {
      setError('2FA verification failed. Please try again.');
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
              <div className="bg-red-600/20 p-4 rounded-full inline-flex mb-4">
                <Shield className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Admin Login</h2>
              <p className="text-gray-400">Enter credentials to continue</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-700/50 border border-red-600/30 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-700/50 border border-red-600/30 rounded-lg px-4 py-3 pr-10 text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
            >
              {isLoading ? 'Logging in...' : 'Continue'}
            </button>
          </form>
        )}

        {step === '2fa' && (
          <form onSubmit={handle2FASubmit} className="bg-gray-800/50 border border-red-700/30 rounded-xl p-8 space-y-6">
            <div className="text-center">
              <div className="bg-red-600/20 p-4 rounded-full inline-flex mb-4">
                <Smartphone className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Two-Factor Code</h2>
              <p className="text-gray-400">Enter the 6-digit code: <span className="text-white font-mono">{generatedCode}</span></p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">2FA Code</label>
              <input
                type="text"
                maxLength={6}
                value={formData.twoFactorCode}
                onChange={(e) => setFormData({ ...formData, twoFactorCode: e.target.value.replace(/\D/g, '') })}
                className="w-full bg-gray-700/50 border border-red-600/30 rounded-lg px-4 py-3 text-white text-center text-xl font-mono tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || formData.twoFactorCode.length !== 6}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Login'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="text-gray-400 hover:text-white text-sm"
              >
                Back to login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}