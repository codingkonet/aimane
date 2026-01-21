
import React, { useContext, useMemo } from 'react';
import { User } from '../types';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';

interface AdminDashboardPageProps {
  user: User;
  users: User[];
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onInstall: () => void;
  showInstallButton: boolean;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ user, users, onLogout, onUpdateUser, onInstall, showInstallButton }) => {
  const { t } = useContext(LanguageContext);

  const stats = useMemo(() => {
    return {
      totalUsers: users.length,
    };
  }, [users]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800">
      <Header user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} onInstall={onInstall} showInstallButton={showInstallButton} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('adminPanel')}</h2>
            <button 
                onClick={() => window.location.hash = '/dashboard'}
                className="bg-primary text-white font-bold py-2 px-6 rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
            >
                {t('backToDashboard')}
            </button>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('totalUsers')}</p>
                <p className="text-4xl font-black text-primary mt-2">{stats.totalUsers}</p>
            </div>
            {/* Additional platform stats could be added here */}
        </div>

        {/* User Management */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('userManagement')}</h3>
            </div>
            <div className="overflow-x-auto">
                {users.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                        {t('noUsersFound')}
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('nameLabel')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('emailLabel')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('language')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('currency')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {users.map((u) => (
                                <tr key={u.email} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4 text-slate-900 dark:text-white font-semibold">{u.name}</td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-sm">{u.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs font-bold uppercase">
                                            {u.language}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded text-xs font-bold">
                                            {u.currency}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
