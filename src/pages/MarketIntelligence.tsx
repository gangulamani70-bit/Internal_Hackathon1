import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { crops } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function MarketIntelligence() {
  const { state } = useApp();
  const [selectedCrop, setSelectedCrop] = useState(state.selectedCrop || 'tomato');

  const mspData = [
    { crop: 'Paddy (Common)', msp: '₹2,300 / qtl', privateMandi: '₹2,450 / qtl', diff: '+₹150 above MSP' },
    { crop: 'Cotton (Medium Staple)', msp: '₹7,121 / qtl', privateMandi: '₹7,250 / qtl', diff: '+₹129 above MSP' },
    { crop: 'Wheat', msp: '₹2,275 / qtl', privateMandi: '₹2,350 / qtl', diff: '+₹75 above MSP' },
    { crop: 'Maize', msp: '₹2,090 / qtl', privateMandi: '₹1,950 / qtl', diff: '-₹140 below MSP' },
    { crop: 'Soybean (Yellow)', msp: '₹4,892 / qtl', privateMandi: '₹4,950 / qtl', diff: '+₹58 above MSP' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="page-container space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                <span>Agri Macro Insights</span>
                <span>•</span>
                <span>SIH 2026 Analytical Engine</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 flex items-center gap-2">
                <span>🧠</span>
                <span>Market Intelligence & MSP Benchmarks</span>
              </h1>
            </div>

            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="select-field font-bold text-xs py-2 bg-white self-start sm:self-center"
            >
              {crops.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Commodity Intelligence Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
              <span className="text-3xl block mb-2">📊</span>
              <h3 className="font-bold text-base text-gray-900 mb-1">Inter-District Arbitrage</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Significant spread observed in perishable vegetables. Tomato rates in Pune wholesale yards (₹3,100/qtl) exceed Sangareddy local mandis (₹2,200/qtl) by <strong>40.9%</strong>, easily justifying long-distance refrigerated logistics.
              </p>
            </div>

            <div className="card p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
              <span className="text-3xl block mb-2">🌧️</span>
              <h3 className="font-bold text-base text-gray-900 mb-1">Weather & Supply Disruption</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Late rains in central Maharashtra have temporarily delayed onion harvesting in Nashik, tightening mandi inflows across Telangana and Andhra Pradesh for the next 7 to 10 days.
              </p>
            </div>

            <div className="card p-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
              <span className="text-3xl block mb-2">📜</span>
              <h3 className="font-bold text-base text-gray-900 mb-1">Procurement Policy Signals</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Government MSP procurement centers have commenced registration for Kharif paddy. Farmers are advised to maintain moisture levels below 17% for guaranteed Grade-A classification.
              </p>
            </div>
          </div>

          {/* MSP vs Open Mandi Rate Benchmarks Table */}
          <div className="card p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-xl text-gray-900">
                  Government MSP vs Open Mandi Realization
                </h3>
                <p className="text-xs text-gray-500">
                  Benchmarking statutory Minimum Support Prices against private trader quotes
                </p>
              </div>
              <span className="badge-green text-xs font-bold self-start">Kharif Season 2026</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Commodity</th>
                    <th className="py-3 px-3">Govt MSP Rate</th>
                    <th className="py-3 px-3">Open Mandi Modal Rate</th>
                    <th className="py-3 px-3">Price Spread</th>
                    <th className="py-3 px-3">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mspData.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-gray-900">{row.crop}</td>
                      <td className="py-3 px-3 font-semibold text-gray-700">{row.msp}</td>
                      <td className="py-3 px-3 font-extrabold text-agri-green">{row.privateMandi}</td>
                      <td className="py-3 px-3">
                        <span className={`badge text-[10px] font-bold ${
                          row.diff.includes('+') ? 'badge-green' : 'badge-red'
                        }`}>
                          {row.diff}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        {row.diff.includes('+') ? 'Sell in Open Mandi' : 'Sell at Govt MSP Center'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
