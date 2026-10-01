import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { crops, markets, BuyerPrice } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function BuyerAddRequirement() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const buyerName = state.buyerProfile?.businessName || 'Zaheerabad Fresh Agro Trading';
  const buyerType = state.buyerProfile?.buyerType || 'Wholesaler';

  const [cropId, setCropId] = useState('tomato');
  const [marketId, setMarketId] = useState('zaheerabad');
  const [price, setPrice] = useState(2750);
  const [quantity, setQuantity] = useState(100);
  const [quality, setQuality] = useState('Grade A');
  const [validUntil, setValidUntil] = useState('2026-09-30');
  const [paymentTerms, setPaymentTerms] = useState('Same-day Bank Transfer / UPI upon weighment');
  const [success, setSuccess] = useState(false);

  const selectedCropObj = crops.find((c) => c.id === cropId) || crops[0];
  const selectedMarketObj = markets.find((m) => m.id === marketId) || markets[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newQuote: BuyerPrice = {
      id: 'bp-' + Date.now(),
      buyerName,
      buyerType,
      cropId,
      marketId,
      price: Number(price),
      quantity: Number(quantity),
      quality,
      publishedAt: new Date().toISOString(),
      validUntil,
      status: 'buyer-published',
    };

    dispatch({ type: 'ADD_BUYER_PRICE', price: newQuote });
    setSuccess(true);

    setTimeout(() => {
      navigate('/buyer/published');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              <span>Procurement Management</span>
              <span>•</span>
              <span>Live Market Broadcast</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>{t('publishPrice')}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Your price and volume quote will be immediately accessible to farmers searching in this mandi.
            </p>
          </div>

          {success && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 animate-fade-in">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="block font-bold">Requirement Published Successfully!</strong>
                <span className="text-xs text-emerald-700">
                  Farmers in {selectedMarketObj.name} can now view your quote. Redirecting...
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 card p-6 sm:p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Select Commodity *
                    </label>
                    <select
                      value={cropId}
                      onChange={(e) => setCropId(e.target.value)}
                      className="select-field font-bold text-sm"
                    >
                      {crops.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.icon} {c.name} ({c.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Target Mandi Yard *
                    </label>
                    <select
                      value={marketId}
                      onChange={(e) => setMarketId(e.target.value)}
                      className="select-field font-bold text-sm"
                    >
                      {markets.map((m) => (
                        <option key={m.id} value={m.id}>
                          📍 {m.name} ({m.district})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Procurement Rate (₹ / Quintal) *
                    </label>
                    <div className="relative rounded-xl shadow-xs">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 font-bold text-base">
                        ₹
                      </div>
                      <input
                        type="number"
                        required
                        min={100}
                        max={100000}
                        step={10}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="input-field pl-8 font-black text-lg text-agri-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Quantity Required (Quintals) *
                    </label>
                    <input
                      type="number"
                      required
                      min={5}
                      max={10000}
                      step={5}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="input-field font-extrabold text-lg text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Produce Quality Specification
                    </label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="select-field font-medium text-xs"
                    >
                      <option value="Grade A">Grade A (Export / Supermarket Premium)</option>
                      <option value="Grade A/B">Grade A/B (Standard Wholesale)</option>
                      <option value="Grade B">Grade B (Processing / Puree / Milling)</option>
                      <option value="Organic Certified">Organic Certified Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Quote Valid Until
                    </label>
                    <input
                      type="date"
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                      className="input-field text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Settlement & Payment Terms
                  </label>
                  <input
                    type="text"
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="input-field text-xs"
                    placeholder="e.g. Immediate bank transfer on weighment slip"
                  />
                </div>

                <button
                  type="submit"
                  disabled={success}
                  className="w-full btn-primary py-3.5 text-sm font-bold shadow-md"
                >
                  {success ? 'Broadcasting Quote...' : 'Broadcast Quote to Mandi Network →'}
                </button>
              </form>
            </div>

            {/* Live Farmer View Preview */}
            <div className="lg:col-span-1 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                Farmer View Preview
              </span>

              <div className="card p-5 border-2 border-agri-green/30 bg-primary-50/20 shadow-md space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-500 font-medium block">Merchant:</span>
                    <strong className="text-gray-900 text-sm block">{buyerName}</strong>
                    <span className="text-[11px] text-gray-500">{buyerType} • {selectedMarketObj.name}</span>
                  </div>
                  <span className="badge-green text-[10px] font-bold">Live Bid</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-primary-200 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Commodity:</span>
                    <span className="font-bold text-gray-900">{selectedCropObj.icon} {selectedCropObj.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Offered Rate:</span>
                    <span className="font-black text-agri-green text-sm">₹{price} / qtl</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Seeking:</span>
                    <span className="font-bold text-gray-800">{quantity} Quintals</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Quality:</span>
                    <span className="font-semibold text-gray-700">{quality}</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 italic">
                  Payment: {paymentTerms}
                </p>

                <div className="w-full py-2 bg-agri-green/10 text-agri-green font-bold text-xs text-center rounded-xl">
                  📞 Contact Details Disclosed to Verified Farmers
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
