import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import LanguagePage from './pages/LanguagePage';
import RolePage from './pages/RolePage';
import FarmerProfilePage from './pages/FarmerProfilePage';
import BuyerProfilePage from './pages/BuyerProfilePage';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import ShortTermFlow from './pages/ShortTermFlow';
import LongTermFlow from './pages/LongTermFlow';
import MarketResults from './pages/MarketResults';
import BuyerPrices from './pages/BuyerPrices';
import PriceTrends from './pages/PriceTrends';
import MapView from './pages/MapView';
import StoragePage from './pages/StoragePage';
import MarketComparison from './pages/MarketComparison';
import SavedMarkets from './pages/SavedMarkets';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import BuyerAddRequirement from './pages/BuyerAddRequirement';
import BuyerPublishedPrices from './pages/BuyerPublishedPrices';
import MarketIntelligence from './pages/MarketIntelligence';
import DemoBanner from './components/DemoBanner';

export default function App() {
  const { state } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      {state.demoMode && <DemoBanner />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/language" element={<LanguagePage />} />
        <Route path="/role" element={<RolePage />} />

        {/* Farmer */}
        <Route path="/farmer/profile" element={<FarmerProfilePage />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/short-term" element={<ShortTermFlow />} />
        <Route path="/farmer/long-term" element={<LongTermFlow />} />
        <Route path="/farmer/markets" element={<MarketResults />} />
        <Route path="/farmer/buyer-prices/:marketId" element={<BuyerPrices />} />
        <Route path="/farmer/compare" element={<MarketComparison />} />
        <Route path="/farmer/price-trends" element={<PriceTrends />} />
        <Route path="/farmer/map" element={<MapView />} />
        <Route path="/farmer/storage" element={<StoragePage />} />
        <Route path="/farmer/saved" element={<SavedMarkets />} />
        <Route path="/farmer/notifications" element={<NotificationsPage />} />
        <Route path="/farmer/profile-settings" element={<ProfilePage />} />
        <Route path="/farmer/intelligence" element={<MarketIntelligence />} />

        {/* Buyer */}
        <Route path="/buyer/profile" element={<BuyerProfilePage />} />
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/add-requirement" element={<BuyerAddRequirement />} />
        <Route path="/buyer/published" element={<BuyerPublishedPrices />} />
        <Route path="/buyer/market-info" element={<MarketIntelligence />} />
        <Route path="/buyer/notifications" element={<NotificationsPage />} />
        <Route path="/buyer/profile-settings" element={<ProfilePage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
