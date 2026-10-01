import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { states, districts } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';

const buyerTypes = [
  'Wholesaler',
  'Mandi Commission Agent / Trader',
  'Food Processing Industry',
  'Agri Exporter',
  'Retail Chain / Modern Trade',
  'Farmer Producer Org (FPO)',
];

export default function BuyerProfilePage() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState(state.buyerProfile?.businessName || 'Zaheerabad Fresh Agro Trading');
  const [phone, setPhone] = useState(state.phone || state.buyerProfile?.phone || '9812345678');
  const [buyerType, setBuyerType] = useState(state.buyerProfile?.buyerType || buyerTypes[0]);
  const [selectedState, setSelectedState] = useState(state.buyerProfile?.state || 'Telangana');
  const [district, setDistrict] = useState(state.buyerProfile?.district || 'Sangareddy');
  const [city, setCity] = useState(state.buyerProfile?.city || 'Zaheerabad');
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
      businessName,
      phone,
      state: selectedState,
      district,
      city,
      location: city || district,
      buyerType,
      language: lang,
    };
    dispatch({ type: 'SET_BUYER_PROFILE', profile });
    dispatch({ type: 'SET_ROLE', role: 'buyer' });
    dispatch({ type: 'SET_LOCATION', location: city || district });
    navigate('/buyer/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="card p-8 sm:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl shadow-sm">
                🏢
              </div>
              <div>
                <h1 className="font-display font-extrabold text-2xl text-gray-900">
                  {t('buyerProfile')}
                </h1>
                <p className="text-sm text-gray-500">
                  Register your business to publish procurement rates to regional farmers
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {t('businessName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="input-field"
                    placeholder="e.g. Kisan Mandi Traders"
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

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {t('buyerType')} *
                </label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value)}
                  className="select-field"
                >
                  {buyerTypes.map((bt) => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    City / Mandi Yard *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-field"
                    placeholder="e.g. Zaheerabad"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full btn-gold py-3.5 text-base shadow-md font-bold">
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
