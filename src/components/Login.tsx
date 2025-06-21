import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Shield, Smartphone, Mail, Lock } from 'lucide-react';
import logo from '../assets/logo.png'; // Adjust path as needed

interface LoginProps {
  onLogin: (status: boolean) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    twoFactorCode: '',
  });

  useEffect(() => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      twoFactorCode: '',
    });
    setError('');
  }, [isLogin, show2FA]);

  useEffect(() => {
    if (show2FA) {
      setTimeout(() => {
        document.getElementById('twoFactorInput')?.focus();
      }, 100);
    }
  }, [show2FA]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (formData.email && formData.password) {
        setError('');
        setShow2FA(true);
      } else {
        setError('Email and password are required.');
      }
    } else {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('All fields are required.');
      } else if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
      } else {
        setError('');
        onLogin(true);
      }
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(formData.twoFactorCode)) {
      setError('Invalid 2FA code.');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      onLogin(true);
    }, 1000); // simulate API call
  };

  if (show2FA) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-700/30 rounded-xl p-8">
            <div className="text-center mb-8">
              <div className="bg-cyan-600/20 p-4 rounded-full inline-flex mb-4">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h2>
              <p className="text-gray-400">Enter the 6-digit code from your authenticator app</p>
            </div>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <form onSubmit={handle2FASubmit} className="space-y-6">
              <div>
                <label htmlFor="twoFactorInput" className="block text-sm font-medium text-gray-300 mb-2">
                  Authentication Code
                </label>
                <div className="relative">
                  <input
                    id="twoFactorInput"
                    type="text"
                    maxLength={6}
                    value={formData.twoFactorCode}
                    onChange={(e) => setFormData({ ...formData, twoFactorCode: e.target.value.replace(/\D/g, '') })}
                    className="w-full bg-gray-700/50 border border-cyan-600/30 rounded-lg px-4 py-3 text-white text-center text-2xl font-mono tracking-widest placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                    placeholder="000000"
                  />
                  <Smartphone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={formData.twoFactorCode.length !== 6 || isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg"
              >
                {isLoading ? 'Verifying...' : 'Verify & Login'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShow2FA(false)}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Back to login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={logo} alt="OptikCoin Logo" className="w-12 h-12" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
              OptikCoin DEX
            </h1>
          </div>
          <p className="text-gray-400">AI-Powered Trading Platform</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-700/30 rounded-xl p-8">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                isLogin ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30' : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                !isLogin ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-700/50 border border-cyan-600/30 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-700/50 border border-cyan-600/30 rounded-lg px-4 py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50
        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-gray-700/50 border border-cyan-600/30 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                placeholder="Confirm your password"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg"
        >
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>

      {isLogin && (
        <div className="mt-6 text-center">
          <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-200">
            Forgot your password?
          </a>
        </div>
      )}
    </div>
  </div>
</div>
