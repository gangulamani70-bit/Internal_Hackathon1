import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { markets, crops, getDistance, getEstTravelExpense, BuyerPrice } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function BuyerPrices() {
  const { marketId } = useParams<{ marketId: string }>();
  const { state } = useApp();
  const { t } = useTranslation();

  const [activeContactModal, setActiveContactModal] = useState<BuyerPrice | null>(null);

  const cropId = (state.selectedCrop || 'tomato').toLowerCase();
  const currentCropObj = crops.find((c) => c.id === cropId) || crops[0];
  const market = markets.find((m) => m.id === marketId) || {
    id: marketId || 'sangareddy',
    name: (marketId || 'Sangareddy').charAt(0).toUpperCase() + (marketId || 'sangareddy').slice(1),
    district: 'Sangareddy',
    state: 'Telangana',
    lat: 17.6,
    lng: 78.1,
  };

  const distance = getDistance(market.id);
  const travelCost = getEstTravelExpense(market.id);
  const farmerQty = state.quantity || 50;

  // Filter buyer quotes for this crop and this market
  const quotes = state.buyerPrices.filter(
    (bp) => bp.cropId.toLowerCase() === cropId && bp.marketId.toLowerCase() === market.id.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Navigation & Breadcrumb */}
          <div className="flex items-center justify-between">
            <Link
              to="/farmer/markets"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-agri-green transition-colors"
            >
              ← Back to Mandi Results
            </Link>
            <div className="text-xs text-gray-500">
              Mandi: <strong className="text-gray-900">{market.name}</strong> • Distance: <strong>{distance} km</strong>
            </div>
          </div>

          {/* Mandi Overview Header Banner */}
          <div className="bg-gradient-to-r from-agri-green to-primary-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-2">
                <span>{currentCropObj.icon} {currentCropObj.name}</span>
                <span>•</span>
                <span>{market.district}, {market.state}</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl">
                Buyer Quotes in {market.name} Mandi
              </h1>
              <p className="text-white/80 text-sm mt-1">
                {quotes.length} registered merchant bids currently open for procurement
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right sm:min-w-[180px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 block">
                Est. Travel Expense
              </span>
              <span className="text-2xl font-black text-amber-300">
                ₹{travelCost.toLocaleString()}
              </span>
              <span className="text-[10px] text-white/70 block">
                for {distance} km from base
              </span>
            </div>
          </div>

          {/* Quotes List */}
          {quotes.length === 0 ? (
            <div className="card p-12 text-center space-y-4">
              <span className="text-5xl">📦</span>
              <h3 className="font-bold text-lg text-gray-800">
                No active buyer quotes right now for {currentCropObj.name} in {market.name}
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Buyers publish new rates during morning auction hours (6:00 AM - 11:00 AM). Check nearby mandis for other quotes.
              </p>
              <Link to="/farmer/markets" className="btn-primary text-xs py-2.5 px-4 font-bold inline-block">
                Explore Other Mandis
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map((quote) => {
                const totalGross = quote.price * farmerQty;
                const netAmount = totalGross - travelCost;

                return (
                  <div
                    key={quote.id}
                    className="card p-6 border-2 border-gray-100 hover:border-primary-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Left: Buyer details */}
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="font-display font-extrabold text-lg text-gray-900">
                            {quote.buyerName}
                          </h3>
                          <span className={`badge text-[10px] font-bold ${
                            quote.status === 'verified' ? 'badge-green' : 'badge-yellow'
                          }`}>
                            ✓ {quote.status === 'verified' ? 'APMC Verified' : 'Direct Buyer Bid'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-700">
                            🏢 {quote.buyerType}
                          </span>
                          <span>Quality: <strong className="text-gray-800">{quote.quality}</strong></span>
                          <span>Quantity Seeking: <strong className="text-gray-800">{quote.quantity} Quintals</strong></span>
                        </div>
                      </div>

                      {/* Right: Offered Price Pill */}
                      <div className="text-left sm:text-right bg-primary-50 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none">
                        <span className="text-xs text-gray-500 font-semibold block">Offered Rate</span>
                        <div className="text-2xl font-black text-agri-green">
                          ₹{quote.price}{' '}
                          <span className="text-xs font-normal text-gray-500">/ quintal</span>
                        </div>
                        <span className="text-[11px] text-gray-400 block mt-0.5">
                          Valid until: {quote.validUntil}
                        </span>
                      </div>
                    </div>

                    {/* Breakdown for Farmer's Volume */}
                    <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50/70 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-gray-500 font-medium">
                          Calculation for your volume ({farmerQty} Qtl):
                        </span>
                        <div className="text-gray-700 mt-0.5">
                          Gross: <strong>₹{totalGross.toLocaleString()}</strong> — Travel: <strong className="text-amber-800">₹{travelCost.toLocaleString()}</strong>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-gray-500 font-medium block">Estimated Net Realization:</span>
                        <span className="text-lg font-extrabold text-agri-green">
                          ₹{netAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="text-[11px] text-gray-400">
                        Published at: {new Date(quote.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveContactModal(quote)}
                          className="btn-primary py-2 px-4 text-xs font-bold shadow-xs flex items-center gap-1.5"
                        >
                          <span>📞</span>
                          <span>Contact Buyer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Contact Buyer Modal */}
          {activeContactModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-scale-up space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-agri-green">
                      Direct Trader Connect
                    </span>
                    <h3 className="font-display font-bold text-xl text-gray-900 mt-0.5">
                      {activeContactModal.buyerName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {activeContactModal.buyerType} • {market.name} Mandi Yard
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveContactModal(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm hover:bg-gray-200"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-primary-50 border border-primary-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Procuring:</span>
                    <span className="font-bold text-gray-900">{currentCropObj.name} ({activeContactModal.quality})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Offered Rate:</span>
                    <span className="font-bold text-agri-green text-sm">₹{activeContactModal.price} / qtl</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">APMC Trader Code:</span>
                    <span className="font-mono text-gray-800 font-bold">APMC-{market.id.slice(0, 3).toUpperCase()}-4028</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href="tel:+919876543210"
                    className="w-full py-3 rounded-xl bg-agri-green text-white font-bold text-xs text-center flex items-center justify-center gap-2 hover:bg-primary-800 transition-colors shadow-sm"
                  >
                    <span>📞</span> Call Buyer (+91 98765 43210)
                  </a>
                  <a
                    href={`https://wa.me/919876543210?text=Hello%20${encodeURIComponent(activeContactModal.buyerName)},%20I%20saw%20your%20requirement%20for%20${currentCropObj.name}%20at%20Rs.${activeContactModal.price}%20on%20AgriPrice%20Connect.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <span>💬</span> WhatsApp Inquiry
                  </a>
                </div>

                <p className="text-[11px] text-gray-400 text-center">
                  Always inspect weighing scales and obtain APMC receipts during physical transactions.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
