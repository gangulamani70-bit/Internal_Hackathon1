import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { crops, markets, getPriceHistory } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function PriceTrends() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();

  const [selectedCrop, setSelectedCrop] = useState(state.selectedCrop || 'tomato');
  const [selectedMarket, setSelectedMarket] = useState('sangareddy');
  const [timeRange, setTimeRange] = useState<'7d' | '15d' | '30d'>('30d');

  const currentCropObj = crops.find((c) => c.id === selectedCrop) || crops[0];
  const currentMarketObj = markets.find((m) => m.id === selectedMarket) || markets[0];

  const fullHistory = getPriceHistory(selectedCrop, selectedMarket);
  const slicedHistory = timeRange === '7d' 
    ? fullHistory.slice(-7) 
    : timeRange === '15d' 
    ? fullHistory.slice(-15) 
    : fullHistory;

  const currentPrice = fullHistory[fullHistory.length - 1]?.avg || 2400;
  const startPrice = slicedHistory[0]?.avg || currentPrice;
  const priceChange = currentPrice - startPrice;
  const priceChangePct = ((priceChange / startPrice) * 100).toFixed(1);
  const peakPrice = Math.max(...slicedHistory.map((h) => h.max));
  const lowPrice = Math.min(...slicedHistory.map((h) => h.min));

  const handleCropChange = (cropId: string) => {
    setSelectedCrop(cropId);
    dispatch({ type: 'SET_CROP', crop: cropId });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="page-container space-y-6">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                <span>Agri Market Intelligence</span>
                <span>•</span>
                <span>Historical mandi trends</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 flex items-center gap-2">
                <span>📈</span>
                <span>Price Trends & Forecasting</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
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

              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="select-field font-bold text-sm bg-white"
              >
                {markets.map((m) => (
                  <option key={m.id} value={m.id}>
                    📍 {m.name} Mandi
                  </option>
                ))}
              </select>

              <div className="flex bg-gray-200 p-1 rounded-xl text-xs font-bold">
                {(['7d', '15d', '30d'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      timeRange === r ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Latest Benchmark
              </span>
              <span className="font-display font-black text-2xl text-gray-900">
                ₹{currentPrice} <span className="text-xs font-normal text-gray-500">/ qtl</span>
              </span>
              <span className={`text-xs font-bold block mt-1 ${
                priceChange >= 0 ? 'text-emerald-600' : 'text-red-500'
              }`}>
                {priceChange >= 0 ? '▲ +' : '▼ '}{priceChange} ({priceChangePct}%) in {timeRange}
              </span>
            </div>

            <div className="card p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Highest Quote
              </span>
              <span className="font-display font-black text-2xl text-emerald-600">
                ₹{peakPrice}
              </span>
              <span className="text-xs text-gray-400 block mt-1">Period peak</span>
            </div>

            <div className="card p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Lowest Quote
              </span>
              <span className="font-display font-black text-2xl text-amber-700">
                ₹{lowPrice}
              </span>
              <span className="text-xs text-gray-400 block mt-1">Period bottom</span>
            </div>

            <div className="card p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Price Volatility
              </span>
              <span className="font-display font-black text-2xl text-blue-600">
                Moderate
              </span>
              <span className="text-xs text-emerald-600 font-semibold block mt-1">Stable demand</span>
            </div>
          </div>

          {/* Recharts Chart Card */}
          <div className="card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-gray-900">
                  {currentCropObj.name} Daily Price Band in {currentMarketObj.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Showing Daily Max, Average, and Minimum buyer prices in ₹ per Quintal
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-primary-100 text-agri-green rounded-full self-start sm:self-center">
                Live Mock Feeds
              </span>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={slicedHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(str) => str.slice(5)}
                    stroke="#9ca3af"
                    fontSize={11}
                  />
                  <YAxis
                    domain={['auto', 'auto']}
                    stroke="#9ca3af"
                    fontSize={11}
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '1rem',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      fontSize: '12px',
                    }}
                    formatter={(val: number) => [`₹${val} / qtl`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey="max"
                    name="Max Grade A"
                    stroke="#16a34a"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorMax)"
                  />
                  <Area
                    type="monotone"
                    dataKey="avg"
                    name="Average Modal"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={0.1}
                    fill="#2563eb"
                  />
                  <Area
                    type="monotone"
                    dataKey="min"
                    name="Min Base"
                    stroke="#d97706"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#colorMin)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights & Seasonal Advisory */}
          <div className="card p-6 sm:p-8 bg-gradient-to-r from-primary-50/70 to-emerald-50/50 border border-primary-100 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h4 className="font-display font-bold text-base text-gray-900">
                Market Advisory for {currentCropObj.name} in {currentMarketObj.name}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Wholesale arrivals have dipped 12% across neighbouring mandis due to recent rain spells in the northern belts, causing modal rates to rise by <strong>+{priceChangePct}%</strong> over the past 30 days. Traders in {currentMarketObj.name} are actively seeking dry, moisture-tested produce with quick settlement.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold text-agri-green">
              <span>🌾 Best selling window: Next 2–4 days</span>
              <span>•</span>
              <span>⚡ High buyer competition in Zaheerabad & Pune</span>
            </div>
          </div>

          {/* SIH Statutory Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            ⚠️ <strong>Disclaimer:</strong> {t('historicalDisclaimer')} {t('platformDisclaimer')}
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
