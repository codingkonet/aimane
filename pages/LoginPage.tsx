
import React, { useContext } from 'react';
import { User } from '../types';
import { LanguageContext } from '../context/LanguageContext';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

interface LoginPageProps {
    users: User[];
    onLogin: (user: User) => void;
}

const AppLogoLarge = () => (
    <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary drop-shadow-xl">
        <rect width="40" height="40" rx="12" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 10H28V14H16V18H26V22H16V30H12V10Z" fill="currentColor" />
        <path d="M22 24H28V30H22V24Z" fill="#10b981" />
    </svg>
);


const LoginPage: React.FC<LoginPageProps> = ({ users, onLogin }) => {
    const { t } = useContext(LanguageContext);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col justify-center items-center p-4">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center mb-8 flex flex-col items-center">
                        <AppLogoLarge />
                        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 mt-4 tracking-tight">{t('loginWelcome')}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">{t('loginSubtitle')}</p>
                    </div>
                    <LoginForm users={users} onLogin={onLogin} />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;