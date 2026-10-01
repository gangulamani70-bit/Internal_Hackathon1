import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { state, dispatch } = useApp();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = location.pathname === '/';
  const unreadCount = state.notifications.filter((n) => !n.read).length;

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    dispatch({ type: 'SET_LANGUAGE', language: code });
    setLangMenuOpen(false);
  };

  const navLinks = state.role === 'buyer'
    ? [
        { path: '/buyer/dashboard', label: 'Dashboard' },
        { path: '/buyer/add-requirement', label: '+ Post Requirement' },
        { path: '/buyer/published', label: 'My Rates' },
        { path: '/buyer/market-info', label: 'Market Intel' },
      ]
    : [
        { path: '/farmer/dashboard', label: 'Dashboard' },
        { path: '/farmer/markets', label: 'Mandis' },
        { path: '/farmer/compare', label: 'Compare' },
        { path: '/farmer/price-trends', label: 'Trends' },
        { path: '/farmer/map', label: 'Map' },
        { path: '/farmer/storage', label: 'Storage' },
      ];

  return (
    <header className={`w-full z-40 sticky top-0 transition-colors ${
      isLanding 
        ? 'bg-agri-green/95 backdrop-blur-md text-white shadow-md' 
        : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
    }`}>
      <div className="page-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to={state.isAuthenticated ? (state.role === 'buyer' ? '/buyer/dashboard' : '/farmer/dashboard') : '/'} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
            🌾
          </div>
          <div>
            <span className={`font-display font-bold text-lg leading-tight block ${isLanding ? 'text-white' : 'text-agri-green'}`}>
              AgriPrice Connect
            </span>
            <span className={`text-[10px] tracking-wider uppercase font-semibold block ${isLanding ? 'text-white/70' : 'text-gray-400'}`}>
              SIH 2026 • Mandi Discovery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links when Authenticated */}
        {state.isAuthenticated && (
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? isLanding
                        ? 'bg-white/20 text-white font-semibold'
                        : 'bg-primary-50 text-agri-green font-semibold shadow-xs'
                      : isLanding
                      ? 'text-white/80 hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                isLanding
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
              }`}
              title="Change Language"
            >
              <span>🌐</span>
              <span className="uppercase">{state.language || 'en'}</span>
              <span className="text-[10px]">▼</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 text-gray-800">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageChange(l.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex justify-between items-center hover:bg-primary-50 ${
                      state.language === l.code ? 'font-bold text-agri-green bg-primary-50/50' : 'text-gray-700'
                    }`}
                  >
                    <span>{l.native}</span>
                    <span className="text-[10px] text-gray-400">{l.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Demo Switcher if not authenticated */}
          {!state.isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: 'DEMO_LOGIN' });
                  navigate('/farmer/dashboard');
                }}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 text-amber-950 hover:bg-amber-300 shadow-sm transition-all"
              >
                ⚡ Farmer Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: 'DEMO_BUYER_LOGIN' });
                  navigate('/buyer/dashboard');
                }}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm transition-all"
              >
                🏢 Buyer Demo
              </button>
              <button
                type="button"
                onClick={() => navigate('/role')}
                className="btn-secondary text-xs sm:text-sm py-2 px-3 sm:px-4 font-semibold"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4 font-semibold"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Role Badge */}
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-100 text-agri-green">
                {state.role === 'buyer' ? '🏢 Buyer' : '🧑‍🌾 Farmer'}
              </span>

              {/* Location indicator */}
              <span className="text-xs text-gray-500 hidden xl:inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                📍 {state.selectedLocation}
              </span>

              {/* Notifications Link */}
              <Link
                to={state.role === 'buyer' ? '/buyer/notifications' : '/farmer/notifications'}
                className="relative p-2 rounded-lg text-gray-600 hover:text-agri-green hover:bg-gray-100 transition-colors"
                title="Notifications"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Profile icon */}
              <Link
                to={state.role === 'buyer' ? '/buyer/profile-settings' : '/farmer/profile-settings'}
                className="w-8 h-8 rounded-full gradient-bg text-white flex items-center justify-center text-xs font-bold shadow-sm hover:scale-105 transition-transform"
                title="Profile"
              >
                {state.role === 'buyer' ? 'B' : 'F'}
              </Link>

              {/* Logout button */}
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: 'LOGOUT' });
                  navigate('/');
                }}
                className="hidden md:inline-flex px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                title="Logout"
              >
                Logout
              </button>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                ☰
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && state.isAuthenticated && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 shadow-lg space-y-2 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 text-xs text-gray-500">
            <span>Signed in as <strong className="text-gray-800">{state.role === 'buyer' ? 'Buyer / Trader' : 'Farmer / Seller'}</strong></span>
            <span>📍 {state.selectedLocation}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-medium text-gray-700 bg-gray-50 hover:bg-primary-50 hover:text-agri-green"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                dispatch({ type: 'TOGGLE_DEMO_MODE' });
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-1.5 text-xs text-amber-800 bg-amber-50 rounded-lg font-medium"
            >
              Toggle Demo Flag
            </button>
            <button
              onClick={() => {
                dispatch({ type: 'LOGOUT' });
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 text-xs text-red-600 bg-red-50 rounded-lg font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
