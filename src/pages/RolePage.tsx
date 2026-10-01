import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RolePage() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSelectRole = (role: 'farmer' | 'buyer') => {
    dispatch({ type: 'SET_ROLE', role });
    if (role === 'farmer') {
      if (state.farmerProfile) {
        navigate('/farmer/dashboard');
      } else {
        navigate('/farmer/profile');
      }
    } else {
      if (state.buyerProfile) {
        navigate('/buyer/dashboard');
      } else {
        navigate('/buyer/profile');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight mb-3">
              {t('chooseAccount')}
            </h1>
            <p className="text-base text-gray-600 max-w-lg mx-auto">
              Select how you will be using AgriPrice Connect to customize your dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Farmer Card */}
            <div
              onClick={() => handleSelectRole('farmer')}
              className="card-interactive border-2 border-transparent hover:border-agri-green bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-20 h-20 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                  🧑‍🌾
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-100 text-agri-green mb-3">
                  Seller
                </div>
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">
                  {t('farmerSeller')}
                </h2>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {t('farmerRoleDesc')} Compare mandi prices across districts, estimate diesel and transport expenses, discover nearby cold storages, and maximize your net returns.
                </p>
                <ul className="space-y-2 text-xs text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-agri-green font-bold">✓</span> Live buyer quotes with timestamps
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-agri-green font-bold">✓</span> Net profit calculator (Price - Travel cost)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-agri-green font-bold">✓</span> Certified cold storage & godown locator
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="w-full btn-primary py-3 text-center text-sm font-bold shadow-md"
              >
                {t('continueAsFarmer')} →
              </button>
            </div>

            {/* Buyer Card */}
            <div
              onClick={() => handleSelectRole('buyer')}
              className="card-interactive border-2 border-transparent hover:border-agri-green bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-20 h-20 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                  🏢
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 mb-3">
                  Trader / Mandi Merchant
                </div>
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">
                  {t('buyerRole')}
                </h2>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {t('buyerRoleDesc')} Publish procurement rates directly to registered farmers, specify quality grades, and source agricultural commodities effortlessly.
                </p>
                <ul className="space-y-2 text-xs text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">✓</span> Direct price publishing to mandi network
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">✓</span> Grade-wise volume requirements (Quintals)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">✓</span> Real-time mandi price benchmark intelligence
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="w-full btn-gold py-3 text-center text-sm font-bold shadow-md"
              >
                {t('continueAsBuyer')} →
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
