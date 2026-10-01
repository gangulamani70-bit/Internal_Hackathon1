import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function ProfilePage() {
  const { state, dispatch } = useApp();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isFarmer = state.role !== 'buyer';
  const name = isFarmer
    ? state.farmerProfile?.name || 'Ravi Kumar'
    : state.buyerProfile?.businessName || 'Zaheerabad Fresh Agro Trading';
  const phone = state.phone || state.farmerProfile?.phone || state.buyerProfile?.phone || '9876543210';
  const location = state.selectedLocation || 'Sangareddy';

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    dispatch({ type: 'SET_LANGUAGE', language: code });
  };

  const handleSwitchRole = () => {
    const newRole = isFarmer ? 'buyer' : 'farmer';
    dispatch({ type: 'SET_ROLE', role: newRole });
    navigate(newRole === 'buyer' ? '/buyer/dashboard' : '/farmer/dashboard');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="card p-8 border border-gray-100 shadow-xl space-y-6">
            {/* Header with Avatar */}
            <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-2xl gradient-bg text-white flex items-center justify-center text-3xl font-extrabold shadow-md">
                {isFarmer ? '🧑‍🌾' : '🏢'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-display font-extrabold text-2xl text-gray-900">
                    {name}
                  </h1>
                  <span className={`badge text-xs font-bold ${isFarmer ? 'badge-green' : 'badge-yellow'}`}>
                    {isFarmer ? 'Farmer / Seller' : 'Buyer / Trader'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  📱 +91 {phone} • 📍 {location}
                </p>
              </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50">
                <span className="text-gray-500 block">Current Operating Crop:</span>
                <span className="font-bold text-gray-900 capitalize text-sm">{state.selectedCrop || 'Tomato'}</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50">
                <span className="text-gray-500 block">Baseline Mandi:</span>
                <span className="font-bold text-gray-900 text-sm">{location}</span>
              </div>
            </div>

            {/* Settings Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Preferred App Language
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिन्दी' },
                    { code: 'te', label: 'తెలుగు' },
                    { code: 'mr', label: 'मराठी' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        state.language === l.code
                          ? 'border-agri-green bg-primary-50 text-agri-green'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Switcher */}
              <div className="p-4 rounded-2xl bg-primary-50/70 border border-primary-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Switch Account Persona</h4>
                  <p className="text-xs text-gray-600">
                    Currently in {isFarmer ? 'Farmer' : 'Buyer'} mode
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSwitchRole}
                  className="btn-secondary py-1.5 px-3 text-xs font-bold bg-white"
                >
                  Switch to {isFarmer ? 'Buyer' : 'Farmer'} Mode
                </button>
              </div>

              {/* Demo Mode Toggle */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-amber-950">Prototype / Demo Flag</h4>
                  <p className="text-xs text-amber-800">
                    State: {state.demoMode ? 'Active (Displaying SIH 2026 Demo banner)' : 'Inactive'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'TOGGLE_DEMO_MODE' })}
                  className="px-3 py-1.5 rounded-xl bg-amber-200 text-amber-950 font-bold text-xs hover:bg-amber-300"
                >
                  Toggle
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate(isFarmer ? '/farmer/profile' : '/buyer/profile')}
                className="text-xs font-bold text-gray-600 hover:underline"
              >
                ✏️ Edit Full Profile Details
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition-colors"
              >
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
