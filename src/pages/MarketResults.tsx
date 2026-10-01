import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { crops, getMarketResults, MarketResult } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function MarketResults() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedCrop, setSelectedCrop] = useState(state.selectedCrop || 'tomato');
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'net' | 'travel'>('net');
  const [maxDistance, setMaxDistance] = useState<number>(600);
  const [compareList, setCompareList] = useState<string[]>([]);

  const quantity = state.quantity || 50;
  const currentCropObj = crops.find((c) => c.id === selectedCrop) || crops[0];

  // Live market results
  const rawResults = getMarketResults(selectedCrop, state.buyerPrices);

  // Filter & Sort
  const filteredAndSorted = useMemo(() => {
    let list = rawResults.filter((r) => r.distance <= maxDistance);

    list.sort((a, b) => {
      const netA = a.avgBuyerPrice * quantity - a.estTravelExpense;
      const netB = b.avgBuyerPrice * quantity - b.estTravelExpense;

      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'price') return b.avgBuyerPrice - a.avgBuyerPrice;
      if (sortBy === 'net') return netB - netA;
      if (sortBy === 'travel') return a.estTravelExpense - b.estTravelExpense;
      return 0;
    });

    return list;
  }, [rawResults, maxDistance, sortBy, quantity]);

  const handleCropChange = (cropId: string) => {
    setSelectedCrop(cropId);
    dispatch({ type: 'SET_CROP', crop: cropId });
  };

  const toggleCompare = (marketId: string) => {
    if (compareList.includes(marketId)) {
      setCompareList(compareList.filter((id) => id !== marketId));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare up to 3 markets simultaneously.');
        return;
      }
      setCompareList([...compareList, marketId]);
    }
  };

  const handleProceedToCompare = () => {
    navigate('/farmer/compare', { state: { marketIds: compareList } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-6 sm:py-8 px-4 sm:px-6">
        <div className="page-container space-y-6">
          {/* Top Bar with title and Crop pill */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span>Discovery for:</span>
                <span className="font-bold text-gray-800">📍 {state.selectedLocation || 'Sangareddy'}</span>
                <span>•</span>
                <span>Quantity: {quantity} Qtl</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 flex items-center gap-2">
                <span>{currentCropObj.icon}</span>
                <span>{t('marketResults')} for {currentCropObj.name}</span>
              </h1>
            </div>

            {/* Crop Selector & Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedCrop}
                onChange={(e) => handleCropChange(e.target.value)}
                className="select-field font-bold text-sm py-2 px-3 bg-white"
              >
                {crops.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>

              <Link to="/farmer/compare" className="btn-secondary text-xs py-2 px-3 font-bold">
                ⚖️ Side-by-Side Compare
              </Link>
              <Link to="/farmer/map" className="btn-primary text-xs py-2 px-3 font-bold">
                🗺️ View on Map
              </Link>
            </div>
          </div>

          {/* Filtering & Sorting Controls Bar */}
          <div className="card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Sort By:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'net', label: '🌟 Highest Net Profit' },
                  { id: 'price', label: '💰 Highest Quote' },
                  { id: 'distance', label: '📍 Nearest First' },
                  { id: 'travel', label: '🚗 Lowest Travel Cost' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSortBy(s.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      sortBy === s.id
                        ? 'bg-agri-green text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Slider */}
            <div className="flex items-center gap-3 min-w-[240px]">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                Max Radius: <strong className="text-gray-900">{maxDistance} km</strong>
              </span>
              <input
                type="range"
                min={30}
                max={600}
                step={20}
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-agri-green"
              />
            </div>
          </div>

          {/* Compare Floating Banner if items selected */}
          {compareList.length > 0 && (
            <div className="sticky top-18 z-30 p-4 rounded-2xl bg-amber-400 text-amber-950 shadow-xl flex items-center justify-between animate-slide-up">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>⚖️</span>
                <span>{compareList.length} markets selected for comparison</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCompareList([])}
                  className="px-3 py-1 text-xs text-amber-900 hover:underline"
                >
                  Clear
                </button>
                <button
                  onClick={handleProceedToCompare}
                  className="px-4 py-1.5 rounded-xl bg-amber-950 text-white font-bold text-xs shadow-sm hover:bg-amber-900"
                >
                  Compare Now →
                </button>
              </div>
            </div>
          )}

          {/* Results List */}
          {filteredAndSorted.length === 0 ? (
            <div className="card p-12 text-center space-y-4">
              <div className="text-5xl">🔍</div>
              <h3 className="font-bold text-lg text-gray-800">
                {t('noResults')}
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                No active buyer quotes found within {maxDistance} km for {currentCropObj.name}. Try expanding the distance radius or selecting another crop.
              </p>
              <button
                onClick={() => setMaxDistance(600)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Expand Search to All Mandis
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSorted.map((res, index) => {
                const isSelectedForCompare = compareList.includes(res.market.id);
                const isSaved = state.savedMarkets.includes(res.market.id);
                const grossValue = res.avgBuyerPrice * quantity;
                const netEstimated = grossValue - res.estTravelExpense;
                const isTopNet = index === 0 && sortBy === 'net';

                return (
                  <div
                    key={res.market.id}
                    className={`card p-6 flex flex-col justify-between relative transition-all border-2 ${
                      isTopNet
                        ? 'border-emerald-500 bg-gradient-to-b from-emerald-50/30 to-white shadow-lg'
                        : isSelectedForCompare
                        ? 'border-amber-400 bg-amber-50/20'
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {isTopNet && (
                      <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-md">
                        🏆 Best Net Returns
                      </span>
                    )}

                    <div>
                      {/* Top Row: Mandi info & Distance */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-display font-extrabold text-xl text-gray-900">
                            {res.market.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {res.market.district}, {res.market.state}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-extrabold bg-primary-100 text-agri-green">
                            {res.distance} km away
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">
                            from {state.selectedLocation || 'Sangareddy'}
                          </span>
                        </div>
                      </div>

                      {/* Main Financials Card */}
                      <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-2 mb-4 text-xs">
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-600 font-medium">Avg Buyer Rate:</span>
                          <span className="text-lg font-black text-gray-900">
                            ₹{res.avgBuyerPrice} <span className="text-xs font-normal text-gray-500">/ qtl</span>
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Est. Travel Expense:</span>
                          <span className="font-semibold text-amber-800">
                            -₹{res.estTravelExpense.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Active Buyers:</span>
                          <span className="font-bold text-emerald-700">
                            {res.buyerCount} quotes available
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Storage Facility:</span>
                          <span className={`badge text-[10px] font-bold ${
                            res.storageAvailability === 'available'
                              ? 'badge-green'
                              : res.storageAvailability === 'limited'
                              ? 'badge-yellow'
                              : 'badge-red'
                          }`}>
                            {res.storageAvailability}
                          </span>
                        </div>

                        {/* Net Realization Formula */}
                        <div className="pt-2 border-t border-dashed border-gray-200">
                          <div className="flex justify-between items-baseline">
                            <div>
                              <span className="font-extrabold text-gray-800 block text-xs">
                                Est. Net Realization ({quantity} Qtl):
                              </span>
                              <span className="text-[10px] text-gray-400">
                                (₹{res.avgBuyerPrice} × {quantity}) - ₹{res.estTravelExpense}
                              </span>
                            </div>
                            <span className="text-xl font-black text-agri-green">
                              ₹{netEstimated.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Timestamp & Verification */}
                      <div className="flex items-center justify-between text-[11px] text-gray-400 mb-4 px-1">
                        <span>Updated: {res.lastUpdated.split('T')[0] || 'Today'}</span>
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          ✓ Verified Mandi
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <div className="flex gap-2">
                        <Link
                          to={`/farmer/buyer-prices/${res.market.id}`}
                          className="flex-1 btn-primary py-2.5 text-center text-xs font-bold shadow-xs"
                        >
                          View Buyer Quotes ({res.buyerCount}) →
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            dispatch({ type: 'TOGGLE_SAVED_MARKET', market: res.market.id });
                          }}
                          className={`p-2.5 rounded-xl border transition-colors ${
                            isSaved
                              ? 'bg-amber-50 border-amber-300 text-amber-600'
                              : 'border-gray-200 text-gray-400 hover:text-gray-700'
                          }`}
                          title={isSaved ? 'Bookmarked' : 'Save Market'}
                        >
                          ★
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCompare(res.market.id)}
                        className={`w-full py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          isSelectedForCompare
                            ? 'bg-amber-100 border-amber-400 text-amber-900'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {isSelectedForCompare ? '✓ Selected for Compare' : '+ Select for Comparison'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Legal and Platform Disclaimer Bar */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <span>⚠️</span>
              <span>Important Market Disclaimer for Farmers:</span>
            </p>
            <p className="text-amber-800">
              {t('pricesIndicative')} {t('estTravelDisclaimer')} {t('platformDisclaimer')}
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
