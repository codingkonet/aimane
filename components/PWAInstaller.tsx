
import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

interface PWAInstallerProps {
    onInstall: () => void;
    showInstallButton: boolean;
}

const PWAInstaller: React.FC<PWAInstallerProps> = ({ onInstall, showInstallButton }) => {
    const { t } = useContext(LanguageContext);
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect if it's iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(isIOSDevice);

        // Check if app is already running in standalone mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;

        // Show banner after a short delay if not installed and (is installable OR is iOS)
        const timer = setTimeout(() => {
            if (!isStandalone) {
                if (showInstallButton || isIOSDevice) {
                    setIsVisible(true);
                }
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [showInstallButton]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-[100] animate-bounce-in">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                        <AppIconSmall />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">{t('pwaBannerTitle')}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {isIOS ? t('pwaIOSInstructions') : t('pwaAndroidInstructions')}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    {!isIOS && showInstallButton && (
                        <button 
                            onClick={() => { onInstall(); setIsVisible(false); }}
                            className="flex-1 md:flex-none bg-primary text-white font-bold py-2 px-6 rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                        >
                            {t('installNow')}
                        </button>
                    )}
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="flex-1 md:flex-none bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold py-2 px-6 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                    >
                        {t('dismiss')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AppIconSmall = () => (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <rect width="40" height="40" rx="12" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 10H28V14H16V18H26V22H16V30H12V10Z" fill="currentColor" />
        <path d="M22 24H28V30H22V24Z" fill="#10b981" />
    </svg>
);

export default PWAInstaller;
