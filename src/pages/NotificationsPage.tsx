import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function NotificationsPage() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const notifications = state.notifications || [];
  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                <span>Alerts & Price Updates</span>
                <span>•</span>
                <span>Live Feed</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 flex items-center gap-2">
                <span>🔔</span>
                <span>{t('notifications')}</span>
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-gray-200 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filter === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
                  }`}
                >
                  All ({notifications.length})
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filter === 'unread' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
                  }`}
                >
                  Unread ({notifications.filter((n) => !n.read).length})
                </button>
              </div>

              <button
                onClick={() => dispatch({ type: 'CLEAR_NOTIFICATIONS' })}
                className="px-3 py-1.5 text-xs font-bold text-agri-green hover:underline"
              >
                Mark all read
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card p-12 text-center space-y-3">
              <span className="text-4xl block">✨</span>
              <h3 className="font-bold text-gray-700">No new notifications</h3>
              <p className="text-xs text-gray-500">
                You're all caught up with price surges and mandi alerts.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((n) => (
                <div
                  key={n.id}
                  onClick={() => dispatch({ type: 'MARK_NOTIFICATION_READ', id: n.id })}
                  className={`card p-4 sm:p-5 flex items-start justify-between gap-4 transition-all cursor-pointer ${
                    !n.read ? 'border-l-4 border-l-agri-green bg-primary-50/30' : 'opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">
                      {n.message.includes('price') || n.message.includes('Price') ? '💰' : '📢'}
                    </span>
                    <div>
                      <p className={`text-sm text-gray-800 ${!n.read ? 'font-bold' : 'font-normal'}`}>
                        {n.message}
                      </p>
                      <span className="text-[11px] text-gray-400 mt-1 block">
                        🕒 {n.time}
                      </span>
                    </div>
                  </div>

                  {!n.read && (
                    <span className="w-2.5 h-2.5 rounded-full bg-agri-green flex-shrink-0 mt-1.5" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
