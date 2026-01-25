
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Language, User, Currency } from '../types';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    user?: User;
    onLogout?: () => void;
    onUpdateUser?: (user: User) => void;
    onInstall?: () => void;
    showInstallButton?: boolean;
}

const AppLogo = () => (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow-sm md:w-10 md:h-10">
        <rect width="40" height="40" rx="12" fill="white" fillOpacity="0.2" />
        <path d="M12 10H28V14H16V18H26V22H16V30H12V10Z" fill="white" />
        <path d="M22 24H28V30H22V24Z" fill="#10b981" />
    </svg>
);

const DownloadIconMini = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ user, onLogout, onUpdateUser, onInstall, showInstallButton }) => {
  const { language, setLanguage, t } = useContext(LanguageContext);
  
  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  }
  
  const handleThemeToggle = () => {
    if (user && onUpdateUser) {
        onUpdateUser({ ...user, theme: user.theme === 'light' ? 'dark' : 'light' });
    }
  }

  const navigateToHome = () => {
    window.location.hash = user ? '/dashboard' : '/';
  };

  const isPro = user?.plan === 'Pro' || user?.email === 'hello@ouaglabs.com';

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div 
          onClick={navigateToHome}
          className="flex items-center gap-2 md:gap-3 cursor-pointer group hover:opacity-90 transition-all"
        >
            <AppLogo />
            <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <h1 className="text-xl md:text-3xl font-black text-white tracking-tighter leading-none">
                  KoinCLICK
                </h1>
                {user && (
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${isPro ? 'bg-indigo-800 text-indigo-100 shadow-lg' : 'bg-white/20 text-white'}`}>
                        {isPro ? 'Pro' : 'Free'}
                    </span>
                )}
            </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
            {showInstallButton && (
                <button 
                  onClick={onInstall} 
                  className="bg-secondary text-white font-bold py-1.5 px-3 md:py-2 md:px-4 text-xs md:text-base rounded-xl hover:bg-emerald-600 transition-all shadow-md active:scale-95 flex items-center gap-1"
                >
                    <DownloadIconMini />
                    <span className="hidden sm:inline">{t('installApp')}</span>
                </button>
            )}
            
            <select
                value={language}
                onChange={handleLangChange}
                className="bg-white/10 dark:bg-slate-700/50 text-white font-bold py-1.5 px-2 md:py-2 md:px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer appearance-none text-xs md:text-base"
            >
                <option value="en" className="text-slate-800">EN</option>
                <option value="fr" className="text-slate-800">FR</option>
                <option value="ar" className="text-slate-800">AR</option>
            </select>

            {user && (
                <>
                    <ThemeToggle theme={user.theme} onToggle={handleThemeToggle} />
                    <button 
                        onClick={onLogout}
                        className="bg-white/10 hover:bg-white/20 text-white font-bold py-1.5 px-3 md:py-2 md:px-4 text-xs md:text-base rounded-xl transition-all"
                    >
                        {t('logout')}
                    </button>
                </>
            )}
            {!user && (
                 <a 
                    href="#/login"
                    className="bg-white text-primary font-bold py-1.5 px-3 md:py-2 md:px-4 text-xs md:text-base rounded-xl hover:bg-indigo-50 transition-all shadow-lg"
                 >
                     {t('login')}
                 </a>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
