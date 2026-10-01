import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { storageFacilities, crops } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function StoragePage() {
  const { state } = useApp();
  const { t } = useTranslation();

  const [selectedCropFilter, setSelectedCropFilter] = useState(state.selectedCrop || 'all');
  const [selectedFacilityModal, setSelectedFacilityModal] = useState<typeof storageFacilities[0] | null>(null);
  const [inquirySent, setInquirySent] = useState(false);

  const filteredFacilities = storageFacilities.filter((sf) => {
    if (selectedCropFilter === 'all') return true;
    return sf.cropSupported.includes(selectedCropFilter);
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setSelectedFacilityModal(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="page-container space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                <span>WDRA Certified Warehousing</span>
                <span>•</span>
                <span>Post-Harvest Protection</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 flex items-center gap-2">
                <span>🏬</span>
                <span>Cold Storage & Warehousing Locator</span>
              </h1>
            </div>

            {/* Filter by Crop */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">Filter by Crop:</span>
              <select
                value={selectedCropFilter}
                onChange={(e) => setSelectedCropFilter(e.target.value)}
                className="select-field text-xs font-bold py-2 bg-white"
              >
                <option value="all">🌾 All Crops</option>
                {crops.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card p-4 bg-emerald-50/60 border-emerald-100 flex items-center gap-3">
              <span className="text-3xl">🛡️</span>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Zero Distress Selling</h4>
                <p className="text-[11px] text-gray-600">Hold stock when market gluts cause prices to plunge</p>
              </div>
            </div>

            <div className="card p-4 bg-blue-50/60 border-blue-100 flex items-center gap-3">
              <span className="text-3xl">🏦</span>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Pledge Loans (e-NWR)</h4>
                <p className="text-[11px] text-gray-600">Avail 70% instant bank credit against stored produce</p>
              </div>
            </div>

            <div className="card p-4 bg-amber-50/60 border-amber-100 flex items-center gap-3">
              <span className="text-3xl">❄️</span>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Climate Controlled</h4>
                <p className="text-[11px] text-gray-600">Optimal temperature & humidity for tomatoes & onions</p>
              </div>
            </div>
          </div>

          {/* Facilities List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((sf) => (
              <div
                key={sf.id}
                className="card p-6 flex flex-col justify-between border border-gray-200 hover:border-agri-green hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-gray-900">
                        {sf.name}
                      </h3>
                      <p className="text-xs text-gray-500">📍 {sf.location}, {sf.district}</p>
                    </div>
                    <span className={`badge text-[10px] font-bold ${
                      sf.availability === 'available'
                        ? 'badge-green'
                        : sf.availability === 'limited'
                        ? 'badge-yellow'
                        : 'badge-red'
                    }`}>
                      {sf.availability}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 mb-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Storage Capacity:</span>
                      <span className="font-bold text-gray-900">{sf.capacity.toLocaleString()} Tonnes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Estimated Monthly Fee:</span>
                      <span className="font-bold text-agri-green text-sm">₹{sf.estimatedCost} / qtl / month</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                      Supported Produce:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sf.cropSupported.map((cId) => {
                        const cObj = crops.find((c) => c.id === cId);
                        return (
                          <span
                            key={cId}
                            className="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium flex items-center gap-1"
                          >
                            <span>{cObj?.icon || '🌾'}</span>
                            <span className="capitalize">{cId}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setSelectedFacilityModal(sf)}
                    className="w-full btn-gold py-2.5 text-xs font-bold text-center block shadow-xs"
                  >
                    Reserve / Inquire Space →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedFacilityModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Warehouse Space Inquiry
                    </span>
                    <h3 className="font-display font-bold text-xl text-gray-900 mt-0.5">
                      {selectedFacilityModal.name}
                    </h3>
                    <p className="text-xs text-gray-500">📍 {selectedFacilityModal.location}</p>
                  </div>
                  <button
                    onClick={() => setSelectedFacilityModal(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm hover:bg-gray-200"
                  >
                    ✕
                  </button>
                </div>

                {inquirySent ? (
                  <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <span className="text-4xl block">✅</span>
                    <h4 className="font-bold text-emerald-900 text-base">Inquiry Submitted!</h4>
                    <p className="text-xs text-emerald-700">
                      The warehouse manager will contact you at +91 {state.phone || '9876543210'} within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="p-3 rounded-xl bg-amber-50 text-xs text-amber-900 flex justify-between">
                      <span>Rate: <strong>₹{selectedFacilityModal.estimatedCost}/qtl/month</strong></span>
                      <span>Total Capacity: <strong>{selectedFacilityModal.capacity} Tonnes</strong></span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Produce to Store
                      </label>
                      <select className="select-field text-xs">
                        {selectedFacilityModal.cropSupported.map((c) => (
                          <option key={c} value={c}>
                            {c.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Quantity (in Quintals)
                      </label>
                      <input
                        type="number"
                        defaultValue={50}
                        min={10}
                        className="input-field text-sm font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Anticipated Storage Duration
                      </label>
                      <select className="select-field text-xs">
                        <option>1 Month</option>
                        <option>3 Months (Recommended)</option>
                        <option>6 Months</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full btn-primary py-3 text-xs font-bold shadow-md">
                      Send Booking Request →
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
            ⚠️ <strong>{t('noStorage')}</strong> Warehousing rates and slot availability are subject to daily entry and discharge schedules at each terminal.
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
