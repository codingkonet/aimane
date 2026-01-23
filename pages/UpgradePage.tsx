
import React, { useState, useContext } from 'react';
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
  const { t, language } = useContext(LanguageContext);
  const [method, setMethod] = useState<'stripe' | 'paypal' | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
        onUpdateUser({ ...user, plan: 'Pro' });
        setLoading(false);
        window.location.hash = '/dashboard';
        alert(t('paymentSuccess'));
    }, 2000);
  };

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
                    {!method ? (
                        <div className="space-y-4">
                            {settings.stripeEnabled && (
                                <button 
                                    onClick={() => setMethod('stripe')}
                                    className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                                >
                                    <StripeLogo /> {t('payWithStripe')}
                                </button>
                            )}
                            {settings.paypalEnabled && (
                                <button 
                                    onClick={() => setMethod('paypal')}
                                    className="w-full flex items-center justify-center gap-3 bg-[#ffc439] text-[#003087] py-4 rounded-2xl font-bold hover:bg-[#f4bb30] transition-all shadow-lg active:scale-95"
                                >
                                    <PaypalLogo /> {t('payWithPaypal')}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            <button onClick={() => setMethod(null)} className="text-sm font-bold text-slate-400 hover:text-primary transition">← Back to options</button>
                            
                            {method === 'stripe' ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">{t('cardNumber')}</label>
                                        <div className="relative">
                                            <input type="text" placeholder="4242 4242 4242 4242" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white font-mono" />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2"><StripeLogo color="#6366f1" size={32} /></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase">{t('expiry')}</label>
                                            <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white font-mono" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase">{t('cvc')}</label>
                                            <input type="text" placeholder="123" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none dark:text-white font-mono" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl text-center border border-slate-200 dark:border-slate-700">
                                    <PaypalLogo size={48} />
                                    <p className="mt-4 text-slate-600 dark:text-slate-400">You will be redirected to PayPal to complete your purchase safely.</p>
                                </div>
                            )}

                            <button 
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-primary/30 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? t('processing') : `Pay ${settings.proPrice}${user.currency === 'USD' ? '$' : '€'}`}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StripeLogo = ({color = "white", size=24}: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.911 8.875c0-.62-.511-.908-1.289-.908-1.144 0-2.433.376-3.411.916l-.422-2.126c1.077-.521 2.655-.917 4.143-.917 2.622 0 4.167 1.344 4.167 3.511 0 3.391-4.644 3.968-4.644 5.393 0 .736.578 1.054 1.488 1.054 1.256 0 2.678-.5 3.689-1.09l.433 2.112c-1.122.61-2.811 1.066-4.522 1.066-2.733 0-4.322-1.388-4.322-3.6 0-3.533 4.689-4.144 4.689-5.411z" fill={color}/>
    </svg>
);

const PaypalLogo = ({size=24}: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.076 21.337H2.47L5.411 2.663h7.245c3.55 0 5.487 1.706 5.487 4.293 0 1.24-.316 2.361-1.01 3.267-1.123 1.47-3.044 2.277-5.524 2.277H8.562L7.076 21.337z" fill="#253B80"/>
        <path d="M10.748 13.911h-2.18l-1.486 8.74h4.606l1.487-8.74h-2.427z" fill="#179BD7"/>
    </svg>
);

export default UpgradePage;
