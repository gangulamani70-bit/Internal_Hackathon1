import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="page-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-xs">AP</div>
              <span className="font-display font-bold text-white text-lg">{t('appName')}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{t('footerMessage')}</p>
          </div>
          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#how-it-works" className="hover:text-primary-400 transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#roles" className="hover:text-primary-400 transition-colors">User Roles</a></li>
            </ul>
          </div>
          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-3">Information</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              SIH 2026 — Problem Statement SIH26132<br />
              Government of Maharashtra<br />
              Agriculture, FoodTech & Rural Development
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            {t('platformDisclaimer')}
          </p>
          <p className="text-xs text-gray-600 mt-2">© 2026 AgriPrice Connect — SIH Prototype</p>
        </div>
      </div>
    </footer>
  );
}
