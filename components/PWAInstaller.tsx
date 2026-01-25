
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
        <div className="fixed bottom-0 left-0 right-0 z-[100] animate-slide-up p-4 md:p-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto ring-1 ring-slate-900/5">
                <div className="flex items-center gap-5 w-full">
                    <div className="bg-primary/10 p-4 rounded-2xl flex-shrink-0">
                        <AppIconSmall />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t('pwaBannerTitle')}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {isIOS ? t('pwaIOSInstructions') : t('pwaAndroidInstructions')}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="flex-1 md:flex-none py-3 px-6 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
                    >
                        {t('dismiss')}
                    </button>
                    {!isIOS && showInstallButton && (
                        <button 
                            onClick={() => { onInstall(); setIsVisible(false); }}
                            className="flex-1 md:flex-none bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-primary/25 active:scale-95 whitespace-nowrap"
                        >
                            {t('installNow')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const AppIconSmall = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <rect width="40" height="40" rx="12" fill="currentColor" fillOpacity="0.1" />
        <path d="M12 10H28V14H16V18H26V22H16V30H12V10Z" fill="currentColor" />
        <path d="M22 24H28V30H22V24Z" fill="#10b981" />
    </svg>
);

export default PWAInstaller;
