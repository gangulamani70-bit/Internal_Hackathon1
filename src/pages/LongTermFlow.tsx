import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { crops, storageFacilities } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

const storableCrops = crops.filter((c) =>
  ['paddy', 'cotton', 'maize', 'wheat', 'soybean', 'turmeric', 'onion', 'groundnut'].includes(c.id)
);

export default function LongTermFlow() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedCrop, setSelectedCrop] = useState(
    storableCrops.some((c) => c.id === state.selectedCrop) ? state.selectedCrop : 'paddy'
  );
  const [duration, setDuration] = useState(3); // months
  const [quantity, setQuantity] = useState(state.quantity || 100); // Quintals

  const currentCropObj = crops.find((c) => c.id === selectedCrop) || crops[1];

  // Base calculation metrics for demonstration
  const basePricePerQtl = selectedCrop === 'cotton' ? 7100 : selectedCrop === 'turmeric' ? 7800 : 2300;
  const expectedMonthlyGainPct = 0.05; // 5% expected rise per month based on seasonal cycles
  const monthlyStorageCostPerQtl = 100; // avg ₹100 / qtl / month

  const sellTodayGross = basePricePerQtl * quantity;
  const futurePricePerQtl = Math.round(basePricePerQtl * (1 + expectedMonthlyGainPct * duration));
  const totalStorageFee = monthlyStorageCostPerQtl * duration * quantity;
  const futureGross = futurePricePerQtl * quantity;
  const netGainAfterStorage = futureGross - totalStorageFee - sellTodayGross;

  const relevantFacilities = storageFacilities.filter((sf) =>
    sf.cropSupported.includes(selectedCrop)
  );

  const handleProceedToStorage = () => {
    dispatch({ type: 'SET_CROP', crop: selectedCrop });
    dispatch({ type: 'SET_QUANTITY', quantity });
    dispatch({ type: 'SET_CROP_TYPE', cropType: 'long-term' });
    navigate('/farmer/storage');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-earth-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-amber-200 mb-2">
              <span>📦 Storable Commodities Analysis</span>
              <span>•</span>
              <span>WDRA Certified Warehousing</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl">
              {t('longTermCrop')} Decision Calculator
            </h1>
            <p className="text-white/80 text-sm mt-1 max-w-2xl">
              Compare immediate distress sale vs storing in government/private certified godowns to benefit from seasonal price appreciation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-1 card p-6 space-y-6">
              <h2 className="font-bold text-lg text-gray-900 pb-3 border-b border-gray-100">
                Crop & Storage Period
              </h2>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Select Storable Crop
                </label>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {storableCrops.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCrop(c.id)}
                      className={`w-full p-2.5 rounded-xl border text-left text-sm flex items-center justify-between transition-all ${
                        selectedCrop === c.id
                          ? 'border-agri-green bg-primary-50 text-agri-green font-bold'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="text-[10px] text-gray-400">{c.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Harvest Volume: {quantity} Quintals
                </label>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Holding Period: {duration} Months
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 3, 6].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDuration(m)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        duration === m
                          ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {m} {m === 1 ? 'Month' : 'Months'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToStorage}
                className="w-full btn-gold py-3 text-sm font-bold shadow-md"
              >
                Find Certified Storages →
              </button>
            </div>

            {/* Analysis & Financial Comparison */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6 sm:p-8">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-6">
                  Sell Today vs. Store & Sell in {duration} Months
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Option A: Sell Today */}
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Option A
                    </span>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Sell Right Now</h4>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Current Mandi Price:</span>
                        <span className="font-semibold text-gray-900">₹{basePricePerQtl} / qtl</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span>{quantity} qtl</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage & Holding Fee:</span>
                        <span className="text-emerald-700 font-bold">₹0</span>
                      </div>
                      <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                        <span className="font-bold text-gray-700">Gross Realization:</span>
                        <span className="text-xl font-extrabold text-gray-900">
                          ₹{sellTodayGross.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Option B: Store & Sell Later */}
                  <div className="p-5 rounded-2xl bg-primary-50/70 border-2 border-agri-green/40 shadow-sm relative overflow-hidden">
                    <span className="absolute top-2 right-2 text-xs bg-agri-green text-white font-bold px-2 py-0.5 rounded-full">
                      Projected Gain
                    </span>
                    <span className="text-xs font-bold text-agri-green uppercase tracking-wider block mb-1">
                      Option B
                    </span>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">
                      Store for {duration} Months
                    </h4>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Expected Future Price:</span>
                        <span className="font-bold text-emerald-700">₹{futurePricePerQtl} / qtl</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Holding Fee ({duration} mo):</span>
                        <span className="text-amber-800 font-semibold">-₹{totalStorageFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Projected Future Gross:</span>
                        <span className="font-semibold">₹{futureGross.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-primary-200 flex justify-between items-baseline">
                        <span className="font-bold text-gray-800">Net Realization:</span>
                        <span className="text-xl font-extrabold text-agri-green">
                          ₹{(futureGross - totalStorageFee).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Difference Callout */}
                <div className={`p-4 rounded-2xl flex items-center justify-between ${
                  netGainAfterStorage > 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-100 border border-gray-200'
                }`}>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                      Estimated Net Benefit of Storing:
                    </span>
                    <p className="text-xs text-gray-600 mt-0.5">
                      After paying all warehouse rent and quality protection fees
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-agri-green">
                      +₹{Math.max(0, netGainAfterStorage).toLocaleString()}
                    </span>
                    <span className="text-[11px] text-gray-500 block">Additional profit</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/farmer/price-trends"
                    className="btn-secondary text-xs py-2 px-4 font-bold"
                  >
                    📈 View 30-Day Price Trends
                  </Link>
                  <Link
                    to="/farmer/markets"
                    className="btn-primary text-xs py-2 px-4 font-bold"
                  >
                    🏪 Check Today's Mandi Rates
                  </Link>
                </div>
              </div>

              {/* Nearest Storage Facility Quick Peek */}
              <div className="card p-6">
                <h4 className="font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
                  <span>🏬</span>
                  <span>Certified Godowns for {currentCropObj.name}</span>
                </h4>
                <div className="space-y-2">
                  {relevantFacilities.slice(0, 2).map((sf) => (
                    <div key={sf.id} className="p-3 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-gray-900 text-sm block">{sf.name}</strong>
                        <span className="text-gray-500">📍 {sf.location} • Capacity: {sf.capacity} Tonnes</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-gray-800">₹{sf.estimatedCost} / qtl / month</span>
                        <span className="badge-green text-[10px] block mt-0.5">{sf.availability}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
