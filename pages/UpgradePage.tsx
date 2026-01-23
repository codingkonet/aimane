
import React, { useContext } from 'react';
import { User, PlatformSettings } from '../types';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';
import Footer from '../components/Footer';

interface UpgradePageProps {
  user: User;
  onUpdateUser: (user: User) => void;
  settings: PlatformSettings;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

const UpgradePage: React.FC<UpgradePageProps> = ({ user, onUpdateUser, settings }) => {
  const { t } = useContext(LanguageContext);
  
  const price = settings.proPrice;
  const currency = user.currency;
  const itemName = "KoinCLICK Pro Subscription";
  const paypalEmail = "hello@ouaglabs.com";
  
  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&currency_code=${currency}&amount=${price}&item_name=${encodeURIComponent(itemName)}&custom=${user.email}`;


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header user={user} />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Benefits Column */}
            <div className="space-y-8 p-4">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                    {t('proPlanTitle')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                    {t('proPlanSubtitle')}
                </p>
                <ul className="space-y-4">
                    {[
                        'AI Financial Advisor (Gemini powered)',
                        'Unlimited Detailed Analytics',
                        'Multi-Currency Real-time Converter',
                        'Priority Community Support',
                        'Dark & Light Mode Included',
                        'No Ads, Ever'
                    ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-semibold">
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1 rounded-full"><CheckIcon /></div>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Payment Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-primary p-8 text-center text-white">
                    <span className="text-sm font-bold uppercase tracking-widest opacity-80">Premium Access</span>
                    <div className="flex justify-center items-baseline gap-1 mt-2">
                        <span className="text-5xl font-black">{settings.proPrice}</span>
                        <span className="text-2xl font-bold">{user.currency === 'USD' ? '$' : user.currency === 'EUR' ? '€' : 'DH'}</span>
                        <span className="text-sm font-medium opacity-80">{t('perMonth')}</span>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
                        {t('upgradeManualInstructions')}
                    </p>

                    {settings.paypalEnabled ? (
                        <a
                            href={paypalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 bg-[#ffc439] text-[#003087] py-4 rounded-2xl font-bold hover:bg-[#f4bb30] transition-all shadow-lg active:scale-95"
                        >
                            <PaypalLogo /> {t('payWithPaypal')}
                        </a>
                    ) : (
                        <div className="text-center p-4 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-600 dark:text-slate-300">
                            Online payments are currently disabled. Please contact support to upgrade.
                        </div>
                    )}
                    
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                        {t('contactSupport')}
                    </p>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const PaypalLogo = ({size=24}: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.076 21.337H2.47L5.411 2.663h7.245c3.55 0 5.487 1.706 5.487 4.293 0 1.24-.316 2.361-1.01 3.267-1.123 1.47-3.044 2.277-5.524 2.277H8.562L7.076 21.337z" fill="#253B80"/>
        <path d="M10.748 13.911h-2.18l-1.486 8.74h4.606l1.487-8.74h-2.427z" fill="#179BD7"/>
    </svg>
);

export default UpgradePage;
