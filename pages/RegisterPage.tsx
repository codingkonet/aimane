
import React, { useState, FormEvent, useContext } from 'react';
import { User } from '../types';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';

interface RegisterPageProps {
    users: User[];
    onRegister: (user: User) => void;
}

const PiggyBankIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.883 8.05C18.232 5.025 15.42.925 12.015 2.05c-2.733.901-4.28 3.208-4.998 5.42C3.172 7.82.25 10.66.25 14.125c0 3.313 2.686 6 6 6h11.5c3.038 0 5.5-2.463 5.5-5.5 0-2.954-2.33-5.367-5.25-5.492l-.117-.008zM10.5 12.125c-.414 0-.75.336-.75.75s.336.75.75.75.75-.336.75-.75-.336-.75-.75-.75zm-1-3.5h5v-1h-5v1z" />
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
        onRegister({ name, email, password, language, currency: 'USD', theme: 'light' });
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col justify-center items-center p-4">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center mb-8 flex flex-col items-center">
                        <PiggyBankIcon />
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-2">{t('registerTitle')}</h1>
                        <p className="text-slate-500 dark:text-slate-400">{t('registerSubtitle')}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('nameLabel')}</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('emailLabel')}</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('passwordLabel')}</label>
                                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300">
                                {t('createAccountButton')}
                            </button>
                            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                                {t('hasAccount')} <a href="#/login" className="font-medium text-primary hover:underline">{t('loginHere')}</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
