import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { crops, getMarketResults } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function FarmerDashboard() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedCrop, setSelectedCrop] = useState(state.selectedCrop || 'tomato');
  const farmerName = state.farmerProfile?.name || 'Ravi Kumar';
  const locationName = state.selectedLocation || state.farmerProfile?.district || 'Sangareddy';

  // Calculate live market results for current crop
  const marketResults = getMarketResults(selectedCrop, state.buyerPrices);
  const currentCropObj = crops.find((c) => c.id === selectedCrop) || crops[0];

  const handleCropChange = (cropId: string) => {
    setSelectedCrop(cropId);
    dispatch({ type: 'SET_CROP', crop: cropId });
  };

  const handleStartFlow = (type: 'short-term' | 'long-term') => {
    dispatch({ type: 'SET_CROP_TYPE', cropType: type });
    dispatch({ type: 'SET_CROP', crop: selectedCrop });
    navigate(type === 'short-term' ? '/farmer/short-term' : '/farmer/long-term');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-6 sm:py-8">
        <div className="page-container space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-agri-green via-primary-700 to-agri-lime text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-15 translate-x-6 translate-y-6 text-9xl select-none pointer-events-none">
              🌾
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-3">
                  <span>📍 Baseline Location:</span>
                  <span className="font-bold underline cursor-pointer" onClick={() => navigate('/farmer/profile-settings')}>
                    {locationName}
                  </span>
                </div>
                <h1 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight">
                  {t('welcome')}, {farmerName}!
                </h1>
                <p className="text-white/80 text-sm sm:text-base mt-2 max-w-xl">
                  {t('whatDoYouWant')} Compare active buyer rates, transport expenses, and nearby cold storage before heading to the mandi.
                </p>
              </div>

              {/* Crop Quick Switcher */}
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 min-w-[220px]">
                <label className="block text-[11px] font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Currently Comparing:
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => handleCropChange(e.target.value)}
                  className="w-full bg-white text-gray-900 font-bold text-sm px-3 py-2 rounded-xl shadow-inner focus:outline-none"
                >
                  {crops.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.name} ({c.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Core Decision Paths: Short-Term vs Long-Term */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Short-Term Flow */}
            <div
              onClick={() => handleStartFlow('short-term')}
              className="card-interactive bg-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-100 hover:border-agri-green group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <span className="badge-green text-xs font-bold px-3 py-1">
                  Ready to Harvest
                </span>
              </div>
              <h2 className="font-display font-extrabold text-xl text-gray-900 mb-2">
                {t('shortTermCrop')}
              </h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                {t('shortTermDesc')} For perishable vegetables or immediate harvest needs. Discover highest buyer prices, distance, and net returns after travel costs.
              </p>
              <div className="flex items-center justify-between text-xs font-bold text-agri-green group-hover:translate-x-1 transition-transform">
                <span>Start Short-Term Discovery</span>
                <span>→</span>
              </div>
            </div>

            {/* Long-Term Flow */}
            <div
              onClick={() => handleStartFlow('long-term')}
              className="card-interactive bg-white p-6 sm:p-8 rounded-3xl border-2 border-amber-100 hover:border-agri-gold group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  📦
                </div>
                <span className="badge-yellow text-xs font-bold px-3 py-1">
                  Storable Produce
                </span>
              </div>
              <h2 className="font-display font-extrabold text-xl text-gray-900 mb-2">
                {t('longTermCrop')}
              </h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                {t('longTermDesc')} Evaluate storing grains or pulses in certified warehouses. Compare monthly holding fees against expected seasonal price appreciation.
              </p>
              <div className="flex items-center justify-between text-xs font-bold text-agri-brown group-hover:translate-x-1 transition-transform">
                <span>Evaluate Storage & Future Markets</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card p-4 text-center">
              <span className="text-2xl mb-1 block">🏪</span>
              <span className="text-2xl font-black text-gray-900">{marketResults.length}</span>
              <span className="text-xs text-gray-500 block font-medium">Available Mandis</span>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl mb-1 block">👥</span>
              <span className="text-2xl font-black text-gray-900">
                {marketResults.reduce((acc, m) => acc + m.buyerCount, 0)}
              </span>
              <span className="text-xs text-gray-500 block font-medium">Active Buyer Quotes</span>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl mb-1 block">💰</span>
              <span className="text-2xl font-black text-emerald-600">
                ₹{marketResults.length > 0 ? Math.max(...marketResults.map((m) => m.avgBuyerPrice)) : 0}
              </span>
              <span className="text-xs text-gray-500 block font-medium">Peak Avg Quote / Qtl</span>
            </div>
            <div className="card p-4 text-center">
              <span className="text-2xl mb-1 block">🏬</span>
              <span className="text-2xl font-black text-blue-600">5</span>
              <span className="text-xs text-gray-500 block font-medium">Cold Storage Godowns</span>
            </div>
          </div>

          {/* Live Market Opportunities Preview */}
          <div className="card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display font-bold text-xl text-gray-900 flex items-center gap-2">
                  <span>{currentCropObj.icon}</span>
                  <span>Top Mandis for {currentCropObj.name}</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Ranked by distance from your base in <strong>{locationName}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link to="/farmer/markets" className="btn-secondary text-xs py-2 px-3 font-bold">
                  View All Mandis →
                </Link>
                <Link to="/farmer/compare" className="btn-primary text-xs py-2 px-3 font-bold">
                  ⚖️ Side-by-Side Compare
                </Link>
              </div>
            </div>

            {/* Mandi Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketResults.slice(0, 3).map((res) => {
                const estNet = (res.avgBuyerPrice * 50) - res.estTravelExpense;
                return (
                  <div
                    key={res.market.id}
                    className="border border-gray-200 rounded-2xl p-5 hover:border-agri-green hover:shadow-md transition-all bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">{res.market.name}</h4>
                          <span className="text-xs text-gray-500">{res.market.district}, {res.market.state}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-agri-green">
                          {res.distance} km
                        </span>
                      </div>

                      <div className="my-4 py-3 border-y border-gray-100 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Avg Buyer Rate:</span>
                          <span className="font-bold text-gray-900 text-sm">₹{res.avgBuyerPrice} / qtl</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Est. Travel Expense:</span>
                          <span className="font-semibold text-amber-700">₹{res.estTravelExpense}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Buyers Ready:</span>
                          <span className="font-bold text-emerald-700">{res.buyerCount} active quotes</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-dashed border-gray-200">
                          <span className="text-gray-700 font-semibold">Est. Net (50 Qtl):</span>
                          <span className="font-extrabold text-agri-green text-sm">₹{estNet.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link
                        to={`/farmer/buyer-prices/${res.market.id}`}
                        className="flex-1 text-center py-2 text-xs font-bold bg-primary-50 text-agri-green rounded-xl hover:bg-primary-100 transition-colors"
                      >
                        Quotes ({res.buyerCount})
                      </Link>
                      <button
                        onClick={() => {
                          dispatch({ type: 'TOGGLE_SAVED_MARKET', market: res.market.id });
                        }}
                        className={`p-2 rounded-xl border text-xs ${
                          state.savedMarkets.includes(res.market.id)
                            ? 'bg-amber-50 border-amber-300 text-amber-700'
                            : 'border-gray-200 text-gray-400 hover:text-gray-700'
                        }`}
                        title="Save Market"
                      >
                        ★
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Hub Tools */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              to="/farmer/map"
              className="card-interactive p-5 flex flex-col items-center text-center group"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🗺️</span>
              <h4 className="font-bold text-sm text-gray-900">Interactive Map</h4>
              <p className="text-[11px] text-gray-500 mt-1">Explore mandis & storages visually</p>
            </Link>

            <Link
              to="/farmer/price-trends"
              className="card-interactive p-5 flex flex-col items-center text-center group"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📈</span>
              <h4 className="font-bold text-sm text-gray-900">Price Trends</h4>
              <p className="text-[11px] text-gray-500 mt-1">30-day historical charts & AI insights</p>
            </Link>

            <Link
              to="/farmer/storage"
              className="card-interactive p-5 flex flex-col items-center text-center group"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🏬</span>
              <h4 className="font-bold text-sm text-gray-900">Cold Storage</h4>
              <p className="text-[11px] text-gray-500 mt-1">Find capacity & monthly rates</p>
            </Link>

            <Link
              to="/farmer/saved"
              className="card-interactive p-5 flex flex-col items-center text-center group"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">⭐</span>
              <h4 className="font-bold text-sm text-gray-900">Saved Mandis</h4>
              <p className="text-[11px] text-gray-500 mt-1">{state.savedMarkets.length} bookmarked markets</p>
            </Link>
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
