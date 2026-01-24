
import React, { useContext } from 'react';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import { User } from '../types';

interface HomePageProps {
    onInstall: () => void;
    showInstallButton: boolean;
    users: User[];
    onLogin: (user: User) => void;
}

const FeatureCard: React.FC<{ title: string, description: string, icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="group bg-white dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
        <div className="flex items-center justify-center h-14 w-14 bg-primary/10 dark:bg-primary/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
);

const StatItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="text-center px-4">
        <div className="text-3xl md:text-4xl font-black text-primary mb-1">{value}</div>
        <div className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">{label}</div>
    </div>
);

const StepItem: React.FC<{ number: string, title: string, desc: string }> = ({ number, title, desc }) => (
    <div className="flex gap-6 items-start">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/30">
            {number}
        </div>
        <div>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h4>
            <p className="text-slate-600 dark:text-slate-400">{desc}</p>
        </div>
    </div>
);

const CheckIconMini = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;

const PlanCard: React.FC<{
    title: string;
    price: string;
    desc: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    isRecommended?: boolean;
    t: (key: any) => string;
}> = ({ title, price, desc, features, ctaText, ctaLink, isRecommended, t }) => (
    <div className={`relative bg-white dark:bg-slate-800 p-8 rounded-3xl border ${isRecommended ? 'border-primary shadow-2xl shadow-primary/20' : 'border-slate-200 dark:border-slate-700 shadow-lg'} flex flex-col`}>
        {isRecommended && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                {t('recommended')}
            </div>
        )}
        <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">{title}</h3>
        <p className="text-center text-slate-500 dark:text-slate-400 mt-2">{desc}</p>
        <div className="my-8 text-center">
            <span className="text-5xl font-black text-slate-900 dark:text-white">{price}</span>
            <span className="text-slate-500 dark:text-slate-400">/ month</span>
        </div>
        <ul className="space-y-4 mb-10 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                    <CheckIconMini />
                    <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                </li>
            ))}
        </ul>
        <a 
            href={ctaLink}
            className={`w-full text-center font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 active:scale-95 ${isRecommended ? 'bg-primary text-white hover:bg-indigo-700 shadow-xl shadow-primary/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200'}`}
        >
            {ctaText}
        </a>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ onInstall, showInstallButton, users, onLogin }) => {
  const { t } = useContext(LanguageContext);
  
  const features = [
    { key: 'featureBudgeting', icon: <ChartBarIcon /> },
    { key: 'featureMultiCurrency', icon: <GlobeAltIcon /> },
    { key: 'featureDarkMode', icon: <MoonIcon /> },
    { key: 'featurePWA', icon: <DevicePhoneMobileIcon /> },
  ];

  const freeFeatures = [
    t('featureBasicTracking'),
    t('featureStandardBudgeting'),
    t('featureMultiCurrencySupport'),
    t('featureCommunityAccess'),
  ];
  
  const proFeatures = [
    t('featureEverythingInFree'),
    t('featureAiAdvisor'),
    t('featureUnlimitedAnalytics'),
    t('featureRealtimeConverter'),
    t('featurePrioritySupport'),
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col selection:bg-primary selection:text-white">
        <Header onInstall={onInstall} showInstallButton={showInstallButton} />
        
        <main className="flex-grow">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-20 px-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 dark:bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            {t('homeWelcome')}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[1.1]">
                            {t('homeTitle')}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            {t('homeSubtitle')}
                        </p>
                    </div>
                    
                    <div className="w-full max-w-md mx-auto">
                        <LoginForm users={users} onLogin={onLogin} />
                        {showInstallButton && (
                            <>
                                <div className="my-6 flex items-center">
                                    <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
                                    <span className="flex-shrink mx-4 text-xs font-bold uppercase text-slate-400">{t('orGetTheApp')}</span>
                                    <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
                                </div>
                                <button
                                    onClick={onInstall}
                                    className="w-full flex items-center justify-center gap-3 bg-secondary text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-xl shadow-secondary/20 active:scale-95"
                                >
                                    <DesktopIcon /> {t('installWebApp')}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="container mx-auto flex flex-wrap justify-around gap-8">
                    <StatItem label="Active Users" value="15k+" />
                    <StatItem label="Currencies" value="5+" />
                    <StatItem label="Uptime" value="99.9%" />
                    <StatItem label="Rating" value="4.9/5" />
                </div>
            </section>
            
            {/* Features Grid */}
            <section id="features" className="py-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">{t('featuresTitle')}</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">Powerful tools built for modern finance management, available across all your devices.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map(feature => (
                            <FeatureCard 
                                key={feature.key} 
                                title={t(feature.key as any)} 
                                description={t((feature.key + 'Desc') as any)} 
                                icon={feature.icon} 
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans Section */}
            <section id="plans" className="py-32 bg-slate-100 dark:bg-slate-950/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">{t('plansTitle')}</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">{t('plansSubtitle')}</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <PlanCard
                            t={t}
                            title={t('freePlanTitle')}
                            price={t('freePlanPrice')}
                            desc={t('freePlanDesc')}
                            features={freeFeatures}
                            ctaText={t('ctaGetStartedFree')}
                            ctaLink="#/register"
                        />
                        <PlanCard
                            t={t}
                            title="Pro"
                            price={t('proPlanPrice')}
                            desc={t('proPlanDesc')}
                            features={proFeatures}
                            ctaText={t('ctaUpgradePro')}
                            ctaLink="#/register"
                            isRecommended
                        />
                    </div>
                </div>
            </section>

            {/* Interactive Preview / Live Demo */}
            <section id="demo" className="py-32 bg-slate-900 dark:bg-slate-950 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px]"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">{t('liveDemoTitle')}</h2>
                            <div className="space-y-12">
                                <StepItem 
                                    number="1" 
                                    title="Connect & Categorize" 
                                    desc="Add your income streams and daily expenses. Our smart categorization does the heavy lifting." 
                                />
                                <StepItem 
                                    number="2" 
                                    title="Visualize Your Growth" 
                                    desc="Watch your wealth grow with beautiful charts that reveal your spending patterns over time." 
                                />
                                <StepItem 
                                    number="3" 
                                    title="Stay Within Limits" 
                                    desc="Set smart budgets for different categories and get notified before you overspend." 
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-30 blur-2xl group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                                    <div className="bg-slate-700/50 h-10 flex items-center gap-2 px-6 border-b border-slate-700/50">
                                        <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-400/80 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
                                        <div className="ml-4 bg-slate-600/50 px-4 py-1 rounded text-[10px] text-slate-400 font-mono">app.koinclick.io</div>
                                    </div>
                                    <div className="p-2 bg-slate-800">
                                        <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center border border-slate-700">
                                            {/* In a real scenario, this would be a high-quality mockup image or a component preview */}
                                            <div className="text-center p-8">
                                                <PiggyBankIconLarge />
                                                <div className="mt-4 text-slate-500 font-mono text-sm">Dashboard Preview</div>
                                                <div className="mt-2 h-2 w-32 bg-slate-700 rounded-full mx-auto"></div>
                                                <div className="mt-2 h-2 w-24 bg-slate-700 rounded-full mx-auto opacity-50"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        {/* Get App Section */}
        <section id="install" className="py-32 bg-slate-100 dark:bg-slate-800">
            <div className="container mx-auto px-4 text-center max-w-3xl flex flex-col items-center">
                <DownloadCloudIcon />
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">{t('getAppEverywhere')}</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-12">
                    {t('appDescription')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {showInstallButton && (
                        <button 
                            onClick={onInstall}
                            className="w-full sm:w-auto bg-primary text-white font-bold py-4 px-10 rounded-2xl text-lg hover:bg-indigo-700 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 flex items-center justify-center gap-3"
                        >
                           <DesktopIcon /> {t('installWebApp')}
                        </button>
                    )}
                </div>
            </div>
        </section>

        <Footer />
    </div>
  );
};

// SVG Icons
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const GlobeAltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const DevicePhoneMobileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const DownloadCloudIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>;
const PiggyBankIconLarge = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary/40 mx-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.883 8.05C18.232 5.025 15.42.925 12.015 2.05c-2.733.901-4.28 3.208-4.998 5.42C3.172 7.82.25 10.66.25 14.125c0 3.313 2.686 6 6 6h11.5c3.038 0 5.5-2.463 5.5-5.5 0-2.954-2.33-5.367-5.25-5.492l-.117-.008zM10.5 12.125c-.414 0-.75.336-.75.75s.336.75.75.75.75-.336.75-.75-.336-.75-.75-.75zm-1-3.5h5v-1h-5v1z" />
    </svg>
);
const DesktopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);


export default HomePage;
