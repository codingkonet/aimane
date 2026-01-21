
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Language, User } from '../types';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    user?: User;
    onLogout?: () => void;
    onUpdateUser?: (user: User) => void;
    onInstall?: () => void;
    showInstallButton?: boolean;
}

const FintaLogo = () => (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow-sm md:w-10 md:h-10">
        <rect width="40" height="40" rx="12" fill="white" fillOpacity="0.2" />
        <path d="M12 10H28V14H16V18H26V22H16V30H12V10Z" fill="white" />
        <path d="M22 24H28V30H22V24Z" fill="#10b981" />
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
    window.location.hash = '/';
  };

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div 
          onClick={navigateToHome}
          className="flex items-center gap-2 md:gap-3 cursor-pointer group hover:opacity-90 transition-all"
        >
            <FintaLogo />
            <h1 className="text-xl md:text-3xl font-black text-white tracking-tighter">
              Finta
            </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
            {showInstallButton && (
                <button 
                  onClick={onInstall} 
                  className="bg-secondary text-white font-bold py-1.5 px-3 md:py-2 md:px-4 text-xs md:text-base rounded-xl hover:bg-emerald-600 transition-all shadow-md active:scale-95 flex items-center gap-1"
                >
                    <DownloadIconMini />
                    <span className="hidden xs:inline">{t('installApp')}</span>
                </button>
            )}
            <select
                value={language}
                onChange={handleLangChange}
                className="bg-white/10 dark:bg-slate-700/50 text-white font-bold py-1.5 px-2 md:py-2 md:px-3 rounded-xl border border-white/20 focus:outline-none backdrop-blur-md appearance-none cursor-pointer text-xs md:text-base"
            >
                <option value="en" className="text-slate-800">EN</option>
                <option value="fr" className="text-slate-800">FR</option>
                <option value="ar" className="text-slate-800">AR</option>
            </select>
            {user && onUpdateUser && <div className="hidden xs:block"><ThemeToggle theme={user.theme} onToggle={handleThemeToggle} /></div>}
            {onLogout && (
                <button
                    onClick={onLogout}
                    className="bg-white/20 text-white font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-xl hover:bg-white/30 transition-all backdrop-blur-md border border-white/10 active:scale-95 text-xs md:text-base"
                >
                    {t('logout')}
                </button>
            )}
        </div>
      </div>
    </header>
  );
};

const DownloadIconMini = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export default Header;
