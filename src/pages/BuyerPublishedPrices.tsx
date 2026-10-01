import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { crops, markets, BuyerPrice } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function BuyerPublishedPrices() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();

  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPriceVal, setNewPriceVal] = useState<number>(0);

  const buyerName = state.buyerProfile?.businessName || 'Zaheerabad Fresh Agro Trading';

  // Buyer's published quotes
  const quotes = state.buyerPrices.filter((bp) =>
    bp.buyerName.toLowerCase().includes(buyerName.toLowerCase()) || bp.status === 'buyer-published'
  );

  const handleStartEdit = (quote: BuyerPrice) => {
    setEditingPriceId(quote.id);
    setNewPriceVal(quote.price);
  };

  const handleSaveEdit = (id: string) => {
    dispatch({
      type: 'UPDATE_BUYER_PRICE',
      id,
      updates: { price: Number(newPriceVal) },
    });
    setEditingPriceId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to deactivate and remove this quote?')) {
      dispatch({ type: 'DELETE_BUYER_PRICE', id });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="page-container space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                <span>Active Mandi Quotes</span>
                <span>•</span>
                <span>{quotes.length} Published Rates</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 flex items-center gap-2">
                <span>💰</span>
                <span>{t('publishedPrices')}</span>
              </h1>
            </div>

            <Link
              to="/buyer/add-requirement"
              className="btn-primary py-2 px-4 text-xs font-bold self-start"
            >
              + Post New Requirement
            </Link>
          </div>

          {quotes.length === 0 ? (
            <div className="card p-12 text-center space-y-4">
              <span className="text-5xl block">📝</span>
              <h3 className="font-bold text-lg text-gray-800">No published quotes right now</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Post your commodity rates so farmers across surrounding districts can discover your procurement requirements.
              </p>
              <Link to="/buyer/add-requirement" className="btn-primary text-xs py-2.5 px-4 font-bold inline-block">
                Publish First Requirement
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((q) => {
                const cObj = crops.find((c) => c.id === q.cropId);
                const mObj = markets.find((m) => m.id === q.marketId);
                const isEditing = editingPriceId === q.id;

                return (
                  <div
                    key={q.id}
                    className="card p-6 flex flex-col justify-between border-2 border-gray-100 hover:border-amber-300 hover:shadow-lg transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{cObj?.icon || '🌾'}</span>
                          <div>
                            <h3 className="font-display font-extrabold text-lg text-gray-900">
                              {cObj?.name || q.cropId}
                            </h3>
                            <span className="text-xs text-gray-500">
                              📍 {mObj?.name || q.marketId} Mandi Yard
                            </span>
                          </div>
                        </div>
                        <span className="badge-green text-[10px] font-bold">Active</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-primary-50/60 border border-primary-100 space-y-2 mb-4 text-xs">
                        {isEditing ? (
                          <div className="space-y-2">
                            <label className="block text-[11px] font-bold text-gray-700">
                              Update Rate (₹/qtl):
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                value={newPriceVal}
                                onChange={(e) => setNewPriceVal(Number(e.target.value))}
                                className="input-field py-1 px-2 text-sm font-bold text-agri-green"
                              />
                              <button
                                onClick={() => handleSaveEdit(q.id)}
                                className="px-3 py-1 bg-agri-green text-white font-bold rounded-lg text-xs"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-baseline">
                            <span className="text-gray-600 font-medium">Offered Rate:</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-black text-agri-green">₹{q.price}</span>
                              <span className="text-xs text-gray-500">/ qtl</span>
                              <button
                                onClick={() => handleStartEdit(q)}
                                className="text-xs text-blue-600 underline font-bold ml-1"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Quantity Required:</span>
                          <span className="font-bold text-gray-800">{q.quantity} Quintals</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Produce Grade:</span>
                          <span className="font-semibold text-gray-700">{q.quality}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Valid Until:</span>
                          <span className="text-gray-700">{q.validUntil}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-gray-400">
                        Broadcast on: {new Date(q.publishedAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(q)}
                        className="btn-secondary py-1.5 px-3 text-xs font-bold"
                      >
                        {t('updatePrice')}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(q.id)}
                        className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg font-semibold"
                      >
                        {t('deactivate')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
