
import React, { useContext, useMemo, useState } from 'react';
import { User, PlatformSettings } from '../types';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';

interface AdminDashboardPageProps {
  user: User;
  users: User[];
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onInstall: () => void;
  showInstallButton: boolean;
  settings: PlatformSettings;
  onUpdateSettings: (settings: PlatformSettings) => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ user, users, onLogout, onUpdateUser, onInstall, showInstallButton, settings, onUpdateSettings }) => {
  const { t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState<'users' | 'settings'>('users');

  const stats = useMemo(() => ({
      totalUsers: users.length,
      proUsers: users.filter(u => u.plan === 'Pro').length,
      revenue: users.filter(u => u.plan === 'Pro').length * settings.proPrice
  }), [users, settings.proPrice]);
  
  const toggleUserPlan = (userToUpdate: User) => {
    if (userToUpdate.email === 'hello@ouaglabs.com') {
        alert("Cannot change the admin's plan.");
        return;
    }
    const newPlan = userToUpdate.plan === 'Pro' ? 'Free' : 'Pro';
    onUpdateUser({ ...userToUpdate, plan: newPlan });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800">
      <Header user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} onInstall={onInstall} showInstallButton={showInstallButton} />
      <main className="container mx-auto p-4 md:p-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('adminPanel')}</h2>
            <button onClick={() => window.location.hash = '/dashboard'} className="bg-primary text-white font-bold py-2 px-6 rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
                {t('backToDashboard')}
            </button>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('totalUsers')}</p>
                <p className="text-4xl font-black text-primary mt-2">{stats.totalUsers}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Pro Plans</p>
                <p className="text-4xl font-black text-secondary mt-2">{stats.proUsers}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Est. Monthly Revenue</p>
                <p className="text-4xl font-black text-amber-500 mt-2">{stats.revenue} {user.currency}</p>
            </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-6">
            <button 
                onClick={() => setActiveTab('users')}
                className={`py-2 px-6 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500'}`}
            >
                {t('userManagement')}
            </button>
            <button 
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-6 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500'}`}
            >
                {t('platformSettings')}
            </button>
        </div>

        {activeTab === 'users' ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('userManagement')}</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('nameLabel')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Plan</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('language')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('currency')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">{t('adminActions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {users.map((u) => (
                                <tr key={u.email} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                                        <div className="text-xs text-slate-400">{u.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${u.plan === 'Pro' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            {u.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm uppercase text-slate-500">{u.language}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-emerald-600">{u.currency}</td>
                                    <td className="px-6 py-4">
                                        {u.email !== 'hello@ouaglabs.com' && (
                                            u.plan === 'Free' ? (
                                                <button onClick={() => toggleUserPlan(u)} className="bg-secondary text-white font-bold text-xs py-1 px-3 rounded-lg hover:bg-emerald-600 transition">{t('adminUpgrade')}</button>
                                            ) : (
                                                <button onClick={() => toggleUserPlan(u)} className="bg-amber-500 text-white font-bold text-xs py-1 px-3 rounded-lg hover:bg-amber-600 transition">{t('adminDowngrade')}</button>
                                            )
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pricing Settings */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('proPricing')}</h3>
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-slate-500">Monthly Cost ({user.currency})</label>
                        <input 
                            type="number" 
                            value={settings.proPrice} 
                            onChange={e => onUpdateSettings({...settings, proPrice: parseFloat(e.target.value)})}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white text-2xl font-black"
                        />
                    </div>
                </div>

                {/* Gateway Settings */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('paymentGateways')}</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                            <div className="font-bold text-slate-700 dark:text-slate-200">PayPal</div>
                            <button 
                                onClick={() => onUpdateSettings({...settings, paypalEnabled: !settings.paypalEnabled})}
                                className={`w-12 h-6 rounded-full transition-all relative ${settings.paypalEnabled ? 'bg-[#ffc439]' : 'bg-slate-300'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.paypalEnabled ? 'right-1' : 'left-1'}`} />
                            </button>
                        </div>
                        {settings.paypalEnabled && (
                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-2">{t('paypalEmailLabel')}</label>
                                <input 
                                    type="email" 
                                    value={settings.paypalEmail} 
                                    onChange={e => onUpdateSettings({...settings, paypalEmail: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
                                    placeholder="your-paypal-business@email.com"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardPage;
