import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const features = [
  { icon: '💰', key: 'buyerPriceTransparency' },
  { icon: '📊', key: 'marketComparison' },
  { icon: '📍', key: 'locationDiscovery' },
  { icon: '🚗', key: 'travelExpense' },
  { icon: '🏬', key: 'storageDiscovery' },
  { icon: '📈', key: 'priceTrends' },
  { icon: '🌐', key: 'multilingualSupport' },
  { icon: '🧑‍🌾', key: 'farmerFriendly' },
];

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Header />

      {/* ── Hero ── */}
      <section className="relative gradient-bg text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🌾</div>
          <div className="absolute bottom-10 right-10 text-8xl">🍅</div>
          <div className="absolute top-1/2 left-1/2 text-9xl -translate-x-1/2 -translate-y-1/2 opacity-5">🌿</div>
        </div>
        <div className="page-container relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in">
            {t('tagline')}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-slide-up">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link to="/login" className="px-8 py-4 bg-white text-agri-green font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-lg">
              {t('getStarted')} →
            </Link>
            <a href="#how-it-works" className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300 text-lg">
              {t('exploreHow')}
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f8faf8] to-transparent" />
      </section>

      {/* ── Why This Platform ── */}
      <section className="py-16 md:py-24">
        <div className="page-container">
          <h2 className="section-title text-center mb-4">{t('whyPlatform')}</h2>
          <p className="section-subtitle text-center mb-12 max-w-xl mx-auto">
            Empowering farmers with transparent market information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💰', title: t('transparentPrices'), desc: t('transparentPricesDesc') },
              { icon: '📊', title: t('compareMarkets'), desc: t('compareMarketsDesc') },
              { icon: '🔍', title: t('discoverOpportunities'), desc: t('discoverOpportunitiesDesc') },
              { icon: '🧠', title: t('informedDecisions'), desc: t('informedDecisionsDesc') },
            ].map((item, i) => (
              <div key={i} className={`card-interactive text-center animate-in animate-in-delay-${i + 1}`}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-16 md:py-24 bg-primary-50/50">
        <div className="page-container">
          <h2 className="section-title text-center mb-12">{t('howItWorks')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', icon: '📍', title: t('step1Title'), desc: t('step1Desc') },
              { step: '2', icon: '🌾', title: t('step2Title'), desc: t('step2Desc') },
              { step: '3', icon: '📊', title: t('step3Title'), desc: t('step3Desc') },
              { step: '4', icon: '✅', title: t('step4Title'), desc: t('step4Desc') },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-full gradient-bg text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section id="features" className="py-16 md:py-24">
        <div className="page-container">
          <h2 className="section-title text-center mb-12">{t('keyFeatures')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card text-center py-8">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-medium text-sm text-gray-700">{t(f.key)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── User Roles ── */}
      <section id="roles" className="py-16 md:py-24 bg-primary-50/50">
        <div className="page-container">
          <h2 className="section-title text-center mb-12">{t('userRoles')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="card-interactive text-center py-10">
              <div className="text-6xl mb-4">🧑‍🌾</div>
              <h3 className="font-display font-bold text-xl mb-2">{t('farmerSeller')}</h3>
              <p className="text-gray-500 mb-6">{t('farmerRoleDesc')}</p>
              <Link to="/login" className="btn-primary">{t('getStarted')}</Link>
            </div>
            <div className="card-interactive text-center py-10">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="font-display font-bold text-xl mb-2">{t('buyerRole')}</h3>
              <p className="text-gray-500 mb-6">{t('buyerRoleDesc')}</p>
              <Link to="/login" className="btn-primary">{t('getStarted')}</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
