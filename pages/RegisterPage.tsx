
import React, { useState, FormEvent, useContext } from 'react';
import { User } from '../types';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';

interface RegisterPageProps {
    users: User[];
    onRegister: (user: User) => void;
}

const AppLogoLarge = () => (
    <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary drop-shadow-xl">
        <rect width="40" height="40" rx="12" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 10H28V14H16V18H26V22H16V30H12V10Z" fill="currentColor" />
        <path d="M22 24H28V30H22V24Z" fill="#10b981" />
    </svg>
);

const RegisterPage: React.FC<RegisterPageProps> = ({ users, onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { language, t } = useContext(LanguageContext);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (users.some(u => u.email === email)) {
            setError(t('registerError'));
            return;
        }
        onRegister({ name, email, password, language, currency: 'USD', theme: 'light', plan: 'Free' });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col justify-center items-center p-4">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center mb-8 flex flex-col items-center">
                        <AppLogoLarge />
                        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 mt-4 tracking-tight">{t('registerTitle')}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">{t('registerSubtitle')}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{t('nameLabel')}</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-2 w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white transition-all" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{t('emailLabel')}</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-2 w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white transition-all" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{t('passwordLabel')}</label>
                                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-2 w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white transition-all" />
                            </div>
                            {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
                            <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-xl shadow-primary/20 active:scale-95">
                                {t('createAccountButton')}
                            </button>
                            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                                {t('hasAccount')} <a href="#/login" className="font-bold text-primary hover:underline">{t('loginHere')}</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
