import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OtpPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const { state } = useApp();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (val: string, index: number) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleAutoFill = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 6) {
      setError('Please enter complete 6-digit OTP code');
      return;
    }
    // Verify OTP success
    if (state.role) {
      navigate(state.role === 'buyer' ? '/buyer/dashboard' : '/farmer/dashboard');
    } else {
      navigate('/language');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md">
          <div className="card p-8 sm:p-10 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-100 text-agri-green flex items-center justify-center text-3xl shadow-sm">
                📲
              </div>
              <h1 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">
                {t('verifyOtp')}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                We sent a 6-digit verification code to <br />
                <strong className="text-gray-800 font-semibold">+91 {state.phone || '98765 43210'}</strong>
              </p>
            </div>

            {/* Demo Helper Banner */}
            <div className="mb-6 p-3 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-between text-xs text-primary-900">
              <span>Demo OTP: <strong>123456</strong></span>
              <button
                type="button"
                onClick={handleAutoFill}
                className="underline font-bold text-agri-green hover:text-primary-800"
              >
                Auto-fill
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-center text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  {t('enterOtp')}
                </label>
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border border-gray-300 focus:border-agri-green focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    />
                  ))}
                </div>
                {error && <p className="text-xs text-red-500 mt-2 text-center font-medium">{error}</p>}
              </div>

              <button type="submit" className="w-full btn-primary py-3.5 text-base shadow-md">
                {t('verifyOtp')} →
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              {timer > 0 ? (
                <p>Resend OTP in <span className="font-bold text-gray-700">{timer}s</span></p>
              ) : (
                <button
                  onClick={() => setTimer(30)}
                  className="text-agri-green font-bold hover:underline"
                >
                  Resend OTP now
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
