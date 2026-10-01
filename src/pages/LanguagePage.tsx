import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const languages = [
  { code: 'en', name: 'English', native: 'English', greeting: 'Welcome', region: 'All India', script: 'Latin' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', greeting: 'नमस्ते', region: 'North / Central India', script: 'Devanagari' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', greeting: 'নমস্কার', region: 'West Bengal & Tripura', script: 'Bengali' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', greeting: 'నమస్కారం', region: 'Telangana & Andhra Pradesh', script: 'Telugu' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', greeting: 'नमस्कार', region: 'Maharashtra', script: 'Devanagari' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', greeting: 'வணக்கம்', region: 'Tamil Nadu', script: 'Tamil' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', greeting: 'નમસ્તે', region: 'Gujarat', script: 'Gujarati' },
  { code: 'ur', name: 'Urdu', native: 'اردو', greeting: 'آداب', region: 'Jammu & Kashmir / UP', script: 'Perso-Arabic' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', greeting: 'ನಮಸ್ಕಾರ', region: 'Karnataka', script: 'Kannada' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', greeting: 'ନମସ୍କାର', region: 'Odisha', script: 'Odia' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', greeting: 'നമസ്കാരം', region: 'Kerala', script: 'Malayalam' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', greeting: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', region: 'Punjab', script: 'Gurmukhi' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', greeting: 'নমস্কাৰ', region: 'Assam', script: 'Bengali' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली', greeting: 'प्रणाम', region: 'Bihar (Mithilanchal)', script: 'Devanagari' },
  { code: 'bho', name: 'Bhojpuri', native: 'भोजपुरी', greeting: 'प्रनाम', region: 'Eastern UP & Bihar', script: 'Devanagari' },
  { code: 'raj', name: 'Rajasthani', native: 'राजस्थानी', greeting: 'खम्मा घणी', region: 'Rajasthan', script: 'Devanagari' },
  { code: 'hne', name: 'Chhattisgarhi', native: 'छत्तीसगढ़ी', greeting: 'जोहार', region: 'Chhattisgarh', script: 'Devanagari' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृत', greeting: 'नमस्कारः', region: 'Classical', script: 'Devanagari' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي / सिन्धी', greeting: 'भले आयो', region: 'Sindhi communities', script: 'Devanagari' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी', greeting: 'नमस्कार', region: 'Goa & Karnataka', script: 'Devanagari' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी', greeting: 'सत श्री अकाल', region: 'Jammu', script: 'Devanagari' },
  { code: 'mni', name: 'Manipuri', native: 'ꯃꯩꯇꯩꯂꯣꯟ', greeting: 'ꯈꯨꯔꯨꯝꯖꯔꯤ', region: 'Manipur', script: 'Meitei' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', greeting: 'ᱡᱚᱦᱟᱨ', region: 'Jharkhand & Odisha', script: 'Ol Chiki' },
  { code: 'brx', name: 'Bodo', native: 'बड़ो', greeting: 'फैगौ मोनहो', region: 'Assam (Bodoland)', script: 'Devanagari' },
];

export default function LanguagePage() {
  const { state, dispatch } = useApp();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    dispatch({ type: 'SET_LANGUAGE', language: code });
    navigate('/role');
  };

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.native.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      <Header />

      <main className="flex-1 flex items-start justify-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-3xl">
          <div className="card p-6 sm:p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl shadow-sm">
                🌐
              </div>
              <h1 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">
                {t('selectLanguage')}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Choose your preferred language — the entire interface and input will adapt to your selection
              </p>
              <p className="text-xs text-amber-600 mt-1 font-medium">
                🇮🇳 All {languages.length} Indian languages supported
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search language or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              />
            </div>

            {/* Language Grid - scrollable */}
            <div className="max-h-[55vh] overflow-y-auto pr-1 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredLanguages.map((lang) => {
                  const isSelected = state.language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-agri-green bg-primary-50/60 shadow-md ring-2 ring-primary-300'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-agri-green text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                      <div>
                        <span className="text-[10px] font-semibold text-agri-green uppercase tracking-wider block mb-0.5">
                          {lang.greeting}
                        </span>
                        <h3 className="font-display font-bold text-lg text-gray-900 leading-tight">
                          {lang.native}
                        </h3>
                        <p className="text-xs text-gray-600 font-medium">{lang.name}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-2 block">
                        📍 {lang.region}
                      </span>
                    </button>
                  );
                })}
              </div>
              {filteredLanguages.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No languages match your search.
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => navigate('/role')}
                className="btn-primary w-full py-3.5 text-base text-center"
              >
                {t('saveAndContinue')} →
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
