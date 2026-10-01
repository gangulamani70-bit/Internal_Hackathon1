import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { states, districts, crops } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FarmerProfilePage() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState(state.farmerProfile?.name || 'Ravi Kumar');
  const [phone, setPhone] = useState(state.phone || state.farmerProfile?.phone || '9876543210');
  const [selectedState, setSelectedState] = useState(state.farmerProfile?.state || 'Telangana');
  const [district, setDistrict] = useState(state.farmerProfile?.district || 'Sangareddy');
  const [village, setVillage] = useState(state.farmerProfile?.village || 'Kandi Village');
  const [crop, setCrop] = useState(state.selectedCrop || 'tomato');
  const [lang, setLang] = useState(state.language || 'en');

  const districtList = districts[selectedState] || [];

  const handleStateChange = (st: string) => {
    setSelectedState(st);
    const dList = districts[st] || [];
    setDistrict(dList[0] || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile = {
      name,
      phone,
      state: selectedState,
      district,
      village,
      location: district || village,
      language: lang,
    };
    dispatch({ type: 'SET_FARMER_PROFILE', profile });
    dispatch({ type: 'SET_CROP', crop });
    dispatch({ type: 'SET_LOCATION', location: district });
    dispatch({ type: 'SET_ROLE', role: 'farmer' });
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="card p-8 sm:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl shadow-sm">
                🧑‍🌾
              </div>
              <div>
                <h1 className="font-display font-extrabold text-2xl text-gray-900">
                  {t('farmerProfile')}
                </h1>
                <p className="text-sm text-gray-500">
                  Setup your location to discover nearby mandis & transport expenses
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="e.g. Ramesh Patel"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {t('mobileNumber')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    placeholder="10-digit mobile"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {t('state')} *
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="select-field"
                  >
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {t('district')} *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="select-field"
                  >
                    {districtList.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {t('villageTown')}
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="input-field"
                    placeholder="e.g. Kandi Village"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Primary Crop
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="select-field"
                  >
                    {crops.map((c) => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {t('preferredLanguage')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिन्दी' },
                    { code: 'te', label: 'తెలుగు' },
                    { code: 'mr', label: 'मराठी' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLang(l.code)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        lang === l.code
                          ? 'border-agri-green bg-primary-50 text-agri-green'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full btn-primary py-3.5 text-base shadow-md font-bold">
                  {t('saveAndContinue')} →
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
