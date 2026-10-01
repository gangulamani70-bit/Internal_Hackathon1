import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { crops, markets, getMarketResults } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function MarketComparison() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const location = useLocation();

  const passedMarketIds = (location.state as any)?.marketIds as string[] | undefined;

  const [selectedCrop, setSelectedCrop] = useState(state.selectedCrop || 'tomato');
  const [comparedMarketIds, setComparedMarketIds] = useState<string[]>(() => {
    if (passedMarketIds && passedMarketIds.length > 0) {
      const unique = [...new Set(passedMarketIds)].slice(0, 3);
      while (unique.length < 3) {
        const fallback = ['sangareddy', 'zaheerabad', 'hyderabad', 'pune'].find((m) => !unique.includes(m));
        if (fallback) unique.push(fallback);
        else break;
      }
      return unique;
    }
    return ['sangareddy', 'zaheerabad', 'hyderabad'];
  });

  const quantity = state.quantity || 50;
  const currentCropObj = crops.find((c) => c.id === selectedCrop) || crops[0];

  const allMarketResults = getMarketResults(selectedCrop, state.buyerPrices);

  // Grab the results for compared markets
  const comparedResults = comparedMarketIds
    .map((id) => allMarketResults.find((r) => r.market.id === id))
    .filter(Boolean) as typeof allMarketResults;

  // Find the top net earner
  const bestMarket = [...comparedResults].sort((a, b) => {
    const netA = a.avgBuyerPrice * quantity - a.estTravelExpense;
    const netB = b.avgBuyerPrice * quantity - b.estTravelExpense;
    return netB - netA;
  })[0];

  const handleCropChange = (cropId: string) => {
    setSelectedCrop(cropId);
    dispatch({ type: 'SET_CROP', crop: cropId });
    const cropResults = getMarketResults(cropId, state.buyerPrices);
    if (cropResults.length > 0) {
      const activeIds = cropResults.map((r) => r.market.id);
      const hasOverlap = comparedMarketIds.some((id) => activeIds.includes(id));
      if (!hasOverlap) {
        const newSelection = activeIds.slice(0, 3);
        while (newSelection.length < 3) {
          const extra = markets.find((m) => !newSelection.includes(m.id));
          if (extra) newSelection.push(extra.id);
          else break;
        }
        setComparedMarketIds(newSelection);
      }
    }
  };

  const handleMarketChange = (index: number, newId: string) => {
    const updated = [...comparedMarketIds];
    updated[index] = newId;
    setComparedMarketIds(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="page-container space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                <span>Side-by-Side Analysis</span>
                <span>•</span>
                <span>Base Location: {state.selectedLocation || 'Sangareddy'}</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
                Mandi Price & Travel Comparison
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedCrop}
                onChange={(e) => handleCropChange(e.target.value)}
                className="select-field font-bold text-sm bg-white"
              >
                {crops.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs">
                <span className="text-gray-500">Volume:</span>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => dispatch({ type: 'SET_QUANTITY', quantity: Math.max(1, Number(e.target.value)) })}
                  className="w-12 font-bold text-gray-900 outline-none"
                />
                <span className="font-semibold text-gray-600">Qtl</span>
              </div>
            </div>
          </div>

          {/* AI Recommendation Banner */}
          {bestMarket && (
            <div className="bg-gradient-to-r from-emerald-600 to-agri-green text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/20 text-white mb-2">
                    💡 Decision Engine Recommendation
                  </span>
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl">
                    Selling in {bestMarket.market.name} yields highest net returns
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl">
                    Even after accounting for {bestMarket.distance} km travel (₹{bestMarket.estTravelExpense} expense), higher buyer rates in {bestMarket.market.name} (₹{bestMarket.avgBuyerPrice}/qtl) result in estimated net revenue of <strong>₹{((bestMarket.avgBuyerPrice * quantity) - bestMarket.estTravelExpense).toLocaleString()}</strong>.
                  </p>
                </div>
                <Link
                  to={`/farmer/buyer-prices/${bestMarket.market.id}`}
                  className="px-5 py-3 rounded-xl bg-white text-agri-green font-bold text-xs shadow-md hover:bg-emerald-50 transition-colors whitespace-nowrap self-start sm:self-center"
                >
                  View {bestMarket.market.name} Quotes →
                </Link>
              </div>
            </div>
          )}

          {/* Side-by-Side Comparison Table / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparedMarketIds.map((mId, index) => {
              const res = allMarketResults.find((r) => r.market.id === mId);
              const isBest = bestMarket?.market.id === mId;
              const gross = res ? res.avgBuyerPrice * quantity : 0;
              const net = res ? gross - res.estTravelExpense : 0;

              return (
                <div
                  key={index}
                  className={`card p-6 flex flex-col justify-between border-2 transition-all ${
                    isBest
                      ? 'border-emerald-500 ring-2 ring-emerald-200 shadow-xl bg-gradient-to-b from-emerald-50/20 to-white'
                      : 'border-gray-200'
                  }`}
                >
                  <div>
                    {/* Header: Mandi Selector */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                          Market {index + 1}
                        </span>
                        {isBest && (
                          <span className="badge-green text-[10px] font-bold">
                            ★ Recommended
                          </span>
                        )}
                      </div>
                      <select
                        value={mId}
                        onChange={(e) => handleMarketChange(index, e.target.value)}
                        className="select-field font-extrabold text-base py-2.5 bg-gray-50 border-gray-300"
                      >
                        {markets.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name} ({m.district})
                          </option>
                        ))}
                      </select>
                    </div>

                    {res ? (
                      <div className="space-y-4 pt-2">
                        {/* Financial Net Pill */}
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                          <span className="text-xs text-gray-500 font-semibold block">
                            Est. Net Returns ({quantity} Qtl)
                          </span>
                          <span className="font-display font-black text-2xl text-agri-green block mt-0.5">
                            ₹{net.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            (₹{res.avgBuyerPrice} × {quantity}) - ₹{res.estTravelExpense}
                          </span>
                        </div>

                        {/* Comparative rows */}
                        <div className="space-y-2.5 text-xs text-gray-600">
                          <div className="flex justify-between py-1.5 border-b border-gray-100">
                            <span className="text-gray-500">Road Distance:</span>
                            <span className="font-bold text-gray-900">{res.distance} km</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-gray-100">
                            <span className="text-gray-500">Est. Transport Cost:</span>
                            <span className="font-bold text-amber-800">₹{res.estTravelExpense.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-gray-100">
                            <span className="text-gray-500">Avg Offered Quote:</span>
                            <span className="font-bold text-emerald-700">₹{res.avgBuyerPrice} / qtl</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-gray-100">
                            <span className="text-gray-500">Registered Buyers:</span>
                            <span className="font-semibold text-gray-900">{res.buyerCount} Active</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-gray-100">
                            <span className="text-gray-500">Cold Storage Access:</span>
                            <span className={`badge text-[10px] ${
                              res.storageAvailability === 'available' ? 'badge-green' : 'badge-red'
                            }`}>
                              {res.storageAvailability}
                            </span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-500">Last Bid Updated:</span>
                            <span className="text-gray-700">{res.lastUpdated.split('T')[0] || 'Today'}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 py-8 text-center">
                        No price data available for {selectedCrop} in this mandi.
                      </p>
                    )}
                  </div>

                  {res && (
                    <div className="pt-4 mt-4 border-t border-gray-100">
                      <Link
                        to={`/farmer/buyer-prices/${res.market.id}`}
                        className="w-full btn-primary py-2.5 text-center text-xs font-bold block"
                      >
                        View {res.market.name} Quotes →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
            ⚠️ <strong>{t('pricesIndicative')}</strong> {t('estTravelDisclaimer')} {t('platformDisclaimer')}
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
