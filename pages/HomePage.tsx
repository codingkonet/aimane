
import React, { useContext } from 'react';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';

const PiggyBankIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.883 8.05C18.232 5.025 15.42.925 12.015 2.05c-2.733.901-4.28 3.208-4.998 5.42C3.172 7.82.25 10.66.25 14.125c0 3.313 2.686 6 6 6h11.5c3.038 0 5.5-2.463 5.5-5.5 0-2.954-2.33-5.367-5.25-5.492l-.117-.008zM10.5 12.125c-.414 0-.75.336-.75.75s.336.75.75.75.75-.336.75-.75-.336-.75-.75-.75zm-1-3.5h5v-1h-5v1z" />
    </svg>
);

const HomePage: React.FC = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
            <div className="max-w-2xl">
                <PiggyBankIcon />
                <h1 className="text-5xl font-extrabold text-slate-800 mt-4">
                {t('homeWelcome')}
                </h1>
                <p className="text-slate-600 text-lg mt-4">
                {t('homeSubtitle')}
                </p>
                <div className="mt-8 flex justify-center gap-4">
                <a
                    href="#/login"
                    className="bg-primary text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
                >
                    {t('login')}
                </a>
                <a
                    href="#/register"
                    className="bg-white text-primary font-semibold py-3 px-8 rounded-lg text-lg hover:bg-slate-200 transition-colors duration-300 shadow-lg"
                >
                    {t('register')}
                </a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;
