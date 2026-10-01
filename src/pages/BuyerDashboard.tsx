import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { crops, markets } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function BuyerDashboard() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const buyerName = state.buyerProfile?.businessName || 'Zaheerabad Fresh Agro Trading';
  const buyerLocation = state.buyerProfile?.city || state.selectedLocation || 'Zaheerabad';

  // Buyer's published quotes
  const myQuotes = state.buyerPrices.filter((bp) =>
    bp.buyerName.toLowerCase().includes(buyerName.toLowerCase()) || bp.status === 'buyer-published'
  );

  const totalQuintals = myQuotes.reduce((acc, q) => acc + q.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="page-container space-y-6">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-amber-700 via-earth-700 to-amber-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-3">
                  <span>🏢 Operating Base:</span>
                  <span className="font-bold">{buyerLocation} Mandi Yard</span>
                  <span>•</span>
                  <span>APMC Registered Trader</span>
                </div>
                <h1 className="font-display font-extrabold text-2xl sm:text-4xl">
                  {buyerName}
                </h1>
                <p className="text-white/80 text-sm mt-1 max-w-xl">
                  Publish direct procurement bids to farmers across regional mandis and ensure seamless harvest supply.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  to="/buyer/add-requirement"
                  className="px-6 py-3.5 bg-white text-earth-800 font-extrabold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm flex items-center gap-2"
                >
                  <span>📝</span>
                  <span>+ Post Buy Requirement</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Active Buy Orders
              </span>
              <span className="font-display font-black text-3xl text-gray-900">
                {myQuotes.length}
              </span>
              <span className="text-xs text-emerald-600 font-semibold block mt-1">Live in mandis</span>
            </div>

            <div className="card p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Total Volume Seeking
              </span>
              <span className="font-display font-black text-3xl text-agri-green">
                {totalQuintals.toLocaleString()} <span className="text-xs font-normal text-gray-500">Qtl</span>
              </span>
              <span className="text-xs text-gray-500 block mt-1">Across 3 commodities</span>
            </div>

            <div className="card p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Farmer Responses
              </span>
              <span className="font-display font-black text-3xl text-blue-600">
                42
              </span>
              <span className="text-xs text-blue-700 font-semibold block mt-1">Direct inquiries</span>
            </div>

            <div className="card p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Settlement Status
              </span>
              <span className="font-display font-black text-3xl text-emerald-600">
                100%
              </span>
              <span className="text-xs text-gray-500 block mt-1">Zero disputes</span>
            </div>
          </div>

          {/* My Published Rates Table */}
          <div className="card p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-bold text-xl text-gray-900">
                  Your Active Procurement Quotes
                </h3>
                <p className="text-xs text-gray-500">
                  These prices and quantities are visible to farmers searching in respective mandis
                </p>
              </div>

              <Link to="/buyer/published" className="btn-secondary text-xs py-2 px-3 font-bold">
                Manage All Quotes →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-2">Crop</th>
                    <th className="py-3 px-2">Target Mandi</th>
                    <th className="py-3 px-2">Offered Rate</th>
                    <th className="py-3 px-2">Required Qty</th>
                    <th className="py-3 px-2">Quality Grade</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {myQuotes.slice(0, 5).map((q) => {
                    const cObj = crops.find((c) => c.id === q.cropId);
                    const mObj = markets.find((m) => m.id === q.marketId);
                    return (
                      <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-2 font-bold text-gray-900 flex items-center gap-1.5">
                          <span>{cObj?.icon || '🌾'}</span>
                          <span>{cObj?.name || q.cropId}</span>
                        </td>
                        <td className="py-3 px-2 text-gray-700 font-medium">
                          {mObj?.name || q.marketId} Mandi
                        </td>
                        <td className="py-3 px-2 font-extrabold text-agri-green text-sm">
                          ₹{q.price} / qtl
                        </td>
                        <td className="py-3 px-2 text-gray-800 font-semibold">
                          {q.quantity} Qtl
                        </td>
                        <td className="py-3 px-2">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-700">
                            {q.quality}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="badge-green text-[10px]">Active</span>
                        </td>
                        <td className="py-3 px-2 text-right space-x-1">
                          <Link
                            to="/buyer/published"
                            className="text-xs font-bold text-agri-green hover:underline"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regional Mandi Inflow Radar & Market Intel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h4 className="font-bold text-base text-gray-900 mb-2 flex items-center gap-2">
                <span>📡</span>
                <span>Mandi Arrival Inflow Radar</span>
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Real-time truck arrivals across neighboring wholesale yards
              </p>
              <div className="space-y-3 text-xs">
                {[
                  { mandi: 'Zaheerabad Mandi', crop: 'Tomato', volume: '1,200 Qtl arriving', trend: 'High Supply' },
                  { mandi: 'Hyderabad Hub', crop: 'Paddy', volume: '3,800 Qtl arriving', trend: 'Normal' },
                  { mandi: 'Nagpur Central', crop: 'Cotton', volume: '950 Qtl arriving', trend: 'Tight Supply' },
                  { mandi: 'Nashik Mandi', crop: 'Onion', volume: '4,500 Qtl arriving', trend: 'Heavy Glut' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
                    <div>
                      <strong className="text-gray-900 block">{item.mandi}</strong>
                      <span className="text-gray-500">{item.crop} • {item.volume}</span>
                    </div>
                    <span className="badge-blue text-[10px] font-bold">{item.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-gray-900 mb-2 flex items-center gap-2">
                  <span>📊</span>
                  <span>State Agricultural Intelligence</span>
                </h4>
                <p className="text-xs text-gray-500 mb-4">
                  Benchmarking your offered quotes against daily modal prices
                </p>
                <div className="p-4 rounded-2xl bg-primary-50 text-xs text-primary-950 space-y-2">
                  <p>
                    Your tomato buying quote in <strong>Zaheerabad</strong> (₹2,750/qtl) is <strong>+12% above</strong> local Sangareddy modal rate. This currently attracts top-tier Grade A farmers within a 90km catchment radius.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex gap-2">
                <Link
                  to="/buyer/market-info"
                  className="flex-1 btn-primary py-2.5 text-xs font-bold text-center"
                >
                  Open Market Intelligence Hub →
                </Link>
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
