
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

const PiggyBankIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.883 8.05C18.232 5.025 15.42.925 12.015 2.05c-2.733.901-4.28 3.208-4.998 5.42C3.172 7.82.25 10.66.25 14.125c0 3.313 2.686 6 6 6h11.5c3.038 0 5.5-2.463 5.5-5.5 0-2.954-2.33-5.367-5.25-5.492l-.117-.008zM10.5 12.125c-.414 0-.75.336-.75.75s.336.75.75.75.75-.336.75-.75-.336-.75-.75-.75zm-1-3.5h5v-1h-5v1z" />
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

  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <PiggyBankIcon />
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Finta
            </h1>
        </div>
        <div className="flex items-center gap-4">
            {showInstallButton && (
                <button onClick={onInstall} className="bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors">
                    {t('installApp')}
                </button>
            )}
            <select
                value={language}
                onChange={handleLangChange}
                className="bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none"
            >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
            </select>
            {user && onUpdateUser && <ThemeToggle theme={user.theme} onToggle={handleThemeToggle} />}
            {onLogout && (
                <button
                    onClick={onLogout}
                    className="bg-white text-primary font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                    {t('logout')}
                </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
