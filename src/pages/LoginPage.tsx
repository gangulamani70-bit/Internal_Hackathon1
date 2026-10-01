import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    dispatch({ type: 'LOGIN', phone: cleanPhone });
    navigate('/otp');
  };

  const handleDemoFarmer = () => {
    dispatch({ type: 'DEMO_LOGIN' });
    navigate('/farmer/dashboard');
  };

  const handleDemoBuyer = () => {
    dispatch({ type: 'DEMO_BUYER_LOGIN' });
    navigate('/buyer/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="card p-8 sm:p-10 shadow-xl border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center text-3xl shadow-lg">
                🌾
              </div>
              <h1 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">
                {t('login')} to AgriPrice Connect
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Transparent mandi rates & buyer price comparison for Indian farmers
              </p>
            </div>

            {/* Quick Demo Acccess for evaluators */}
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
                <span>⚡</span>
                <span>SIH 2026 Evaluation / Quick Demo</span>
              </div>
              <p className="text-xs text-amber-800 mb-3">
                Skip OTP verification and test with pre-configured mock data:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDemoFarmer}
                  className="py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>🧑‍🌾</span>
                  <span>Farmer Mode</span>
                </button>
                <button
                  type="button"
                  onClick={handleDemoBuyer}
                  className="py-2 px-3 bg-agri-green hover:bg-primary-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>🏢</span>
                  <span>Buyer Mode</span>
                </button>
              </div>
            </div>

            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Or login with Mobile
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Form */}
            <form onSubmit={handlePhoneSubmit} className="space-y-5">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {t('mobileNumber')}
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 font-semibold text-sm">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError('');
                    }}
                    className={`input-field pl-16 text-base tracking-wider font-medium ${
                      error ? 'border-red-400 focus:ring-red-200' : ''
                    }`}
                  />
                </div>
                {error && <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>}
                <p className="text-[11px] text-gray-400 mt-1">
                  We'll send a 6-digit OTP to verify your account
                </p>
              </div>

              <button type="submit" className="w-full btn-primary py-3.5 text-base shadow-md">
                {t('sendOtp')} →
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <Link to="/language" className="text-xs text-agri-green font-semibold hover:underline">
                🌐 Change Preferred Language
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
