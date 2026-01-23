
import React, { useState, FormEvent, useContext } from 'react';
import { User } from '../types';
import { LanguageContext } from '../context/LanguageContext';

interface LoginFormProps {
    users: User[];
    onLogin: (user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ users, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useContext(LanguageContext);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        const user = users.find(u => u.email === email);
        if (user && user.password === password) {
            onLogin(user);
        } else {
            setError(t('loginError'));
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    {t('login')}
                </button>
                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                    {t('noAccount')} <a href="#/register" className="font-bold text-primary hover:underline">{t('registerHere')}</a>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;