import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { markets, crops, getDistance, getEstTravelExpense, getMarketResults } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function SavedMarkets() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();

  const selectedCrop = state.selectedCrop || 'tomato';
  const currentCropObj = crops.find((c) => c.id === selectedCrop) || crops[0];
  const marketResults = getMarketResults(selectedCrop, state.buyerPrices);

  const savedList = state.savedMarkets
    .map((mId) => {
      const res = marketResults.find((r) => r.market.id === mId);
      const marketObj = markets.find((m) => m.id === mId);
      return {
        id: mId,
        market: marketObj || { id: mId, name: mId, district: mId, state: 'Telangana', lat: 17.5, lng: 78.2 },
        result: res,
        distance: getDistance(mId),
        travelCost: getEstTravelExpense(mId),
      };
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="page-container space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                <span>Personalized Watchlist</span>
                <span>•</span>
                <span>{savedList.length} Mandis Bookmarked</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 flex items-center gap-2">
                <span>⭐</span>
                <span>{t('savedMarkets')}</span>
              </h1>
            </div>

            <Link to="/farmer/markets" className="btn-primary text-xs py-2 px-4 font-bold self-start">
              + Discover More Mandis
            </Link>
          </div>

          {savedList.length === 0 ? (
            <div className="card p-12 text-center space-y-4">
              <span className="text-5xl block">⭐</span>
              <h3 className="font-bold text-lg text-gray-800">No saved mandis yet</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Bookmark mandis you frequently sell at to track their buyer rates and price alerts in one place.
              </p>
              <Link to="/farmer/markets" className="btn-primary text-xs py-2.5 px-4 font-bold inline-block">
                Browse Mandi Results
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedList.map((item) => (
                <div
                  key={item.id}
                  className="card p-6 border-2 border-gray-100 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display font-extrabold text-xl text-gray-900">
                          {item.market.name}
                        </h3>
                        <p className="text-xs text-gray-500">{item.market.district}, {item.market.state}</p>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_SAVED_MARKET', market: item.id })}
                        className="text-amber-500 hover:text-gray-400 text-lg"
                        title="Remove from saved"
                      >
                        ★
                      </button>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-gray-50 space-y-2 mb-4 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Distance from base:</span>
                        <span className="font-bold text-gray-900">{item.distance} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Est. Travel Cost:</span>
                        <span className="font-bold text-amber-800">₹{item.travelCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{currentCropObj.name} Avg Rate:</span>
                        <span className="font-black text-agri-green text-sm">
                          {item.result ? `₹${item.result.avgBuyerPrice} / qtl` : 'No active bids'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex gap-2">
                    <Link
                      to={`/farmer/buyer-prices/${item.id}`}
                      className="flex-1 btn-primary py-2 text-center text-xs font-bold"
                    >
                      View Quotes →
                    </Link>
                    <Link
                      to="/farmer/compare"
                      className="btn-secondary py-2 px-3 text-center text-xs font-bold"
                    >
                      Compare
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
