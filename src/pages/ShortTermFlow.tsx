import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { crops, districts } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function ShortTermFlow() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedCrop, setSelectedCrop] = useState(state.selectedCrop || 'tomato');
  const [location, setLocation] = useState(state.selectedLocation || 'Sangareddy');
  const [quantity, setQuantity] = useState(state.quantity || 50);
  const [quality, setQuality] = useState('Grade A');
  const [transportType, setTransportType] = useState('hired'); // own, hired, tractor

  const currentCropObj = crops.find((c) => c.id === selectedCrop) || crops[0];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      dispatch({ type: 'SET_CROP', crop: selectedCrop });
      dispatch({ type: 'SET_LOCATION', location });
      dispatch({ type: 'SET_QUANTITY', quantity });
      dispatch({ type: 'SET_CROP_TYPE', cropType: 'short-term' });
      navigate('/farmer/markets');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <span className={step >= 1 ? 'text-agri-green' : ''}>1. Select Crop</span>
              <span className={step >= 2 ? 'text-agri-green' : ''}>2. Quantity & Quality</span>
              <span className={step >= 3 ? 'text-agri-green' : ''}>3. Transport & Summary</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-agri-green h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="card p-6 sm:p-10 shadow-xl border border-gray-100">
            {/* Step 1: Crop Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-gray-900 mb-1">
                    What crop are you selling today?
                  </h2>
                  <p className="text-sm text-gray-500">
                    Select your harvested crop to discover nearby mandis and active buyer bids
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-1">
                  {crops.map((c) => {
                    const isSelected = selectedCrop === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCrop(c.id)}
                        className={`p-4 rounded-2xl border-2 text-center transition-all ${
                          isSelected
                            ? 'border-agri-green bg-primary-50/70 shadow-sm ring-2 ring-primary-300'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-3xl mb-1.5 block">{c.icon}</span>
                        <span className="font-bold text-sm text-gray-900 block">{c.name}</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">{c.category}</span>
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Starting Mandi / Village Location:
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="select-field font-semibold"
                  >
                    {Object.values(districts).flat().map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Quantity & Quality */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-gray-900 mb-1">
                    Estimated Quantity & Quality Grade
                  </h2>
                  <p className="text-sm text-gray-500">
                    Accurate volume helps calculate realistic transport expenses and matched buyer requirements
                  </p>
                </div>

                <div className="bg-primary-50 p-4 rounded-2xl border border-primary-100 flex items-center gap-3">
                  <span className="text-3xl">{currentCropObj.icon}</span>
                  <div>
                    <h3 className="font-bold text-base text-gray-900">{currentCropObj.name}</h3>
                    <p className="text-xs text-gray-600">Starting from {location}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Harvest Volume (in Quintals)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={5}
                      max={500}
                      step={5}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="flex-1 accent-agri-green h-2 bg-gray-200 rounded-lg cursor-pointer"
                    />
                    <div className="w-28 flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white">
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        className="w-full font-extrabold text-lg text-gray-900 outline-none"
                      />
                      <span className="text-xs font-semibold text-gray-500 ml-1">Qtl</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>5 Qtl (Small)</span>
                    <span>50 Qtl (Standard Tractor)</span>
                    <span>200+ Qtl (Commercial Truck)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Produce Quality Grade
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'Grade A', title: 'Grade A (Premium)', desc: 'Uniform size, fresh color, zero pest damage' },
                      { id: 'Grade A/B', title: 'Grade A/B (Standard)', desc: 'General wholesale grade, minor variations' },
                      { id: 'Grade B', title: 'Grade B (Processing)', desc: 'Suitable for puree, milling or processing' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setQuality(g.id)}
                        className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                          quality === g.id
                            ? 'border-agri-green bg-primary-50 text-agri-green'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-bold text-sm block">{g.title}</span>
                        <span className="text-[11px] text-gray-500 mt-0.5 block">{g.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Transport & Calculation Summary */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-gray-900 mb-1">
                    Transport Option & Net Realization
                  </h2>
                  <p className="text-sm text-gray-500">
                    Travel cost is calculated based on vehicle type and road distance
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Select Transport Mode
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'tractor', name: 'Own Tractor', rate: '₹18 / km', icon: '🚜' },
                      { id: 'hired', name: 'Hired Mini Truck', rate: '₹25 / km', icon: '🚚' },
                      { id: 'commercial', name: 'Heavy Lorry', rate: '₹35 / km', icon: '🚛' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTransportType(t.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          transportType === t.id
                            ? 'border-agri-green bg-primary-50 text-agri-green'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl mb-1 block">{t.icon}</span>
                        <span className="font-bold text-xs block">{t.name}</span>
                        <span className="text-[11px] text-gray-500">{t.rate}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary Card */}
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 text-sm">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-600">Selected Crop:</span>
                    <span className="font-bold text-gray-900">{currentCropObj.icon} {currentCropObj.name}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-600">Harvest Quantity:</span>
                    <span className="font-bold text-gray-900">{quantity} Quintals</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-600">Quality:</span>
                    <span className="font-bold text-gray-900">{quality}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-600">Starting Location:</span>
                    <span className="font-bold text-gray-900">📍 {location}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                  ⚠️ <strong>Disclaimer:</strong> {t('platformDisclaimer')}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50"
                >
                  ← Back
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleNext}
                className="btn-primary py-3 px-8 text-sm font-bold shadow-md"
              >
                {step === 3 ? 'Discover Best Mandis →' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
