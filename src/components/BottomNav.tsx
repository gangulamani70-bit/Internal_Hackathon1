import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';

const farmerNav = [
  { path: '/farmer/dashboard', icon: '🏠', labelKey: 'home' },
  { path: '/farmer/markets', icon: '🏪', labelKey: 'markets' },
  { path: '/farmer/price-trends', icon: '📊', labelKey: 'prices' },
  { path: '/farmer/storage', icon: '🏬', labelKey: 'storage' },
  { path: '/farmer/profile-settings', icon: '👤', labelKey: 'profile' },
];

const buyerNav = [
  { path: '/buyer/dashboard', icon: '🏠', labelKey: 'home' },
  { path: '/buyer/add-requirement', icon: '📝', labelKey: 'requirements' },
  { path: '/buyer/published', icon: '💰', labelKey: 'prices' },
  { path: '/buyer/market-info', icon: '🏪', labelKey: 'markets' },
  { path: '/buyer/profile-settings', icon: '👤', labelKey: 'profile' },
];

export default function BottomNav() {
  const { state } = useApp();
  const { t } = useTranslation();
  const location = useLocation();
  const items = state.role === 'buyer' ? buyerNav : farmerNav;

  if (!state.isAuthenticated) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors
                ${active ? 'text-agri-green' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
