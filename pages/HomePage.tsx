
import React, { useContext } from 'react';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';
import Footer from '../components/Footer';

interface HomePageProps {
    onInstall: () => void;
    showInstallButton: boolean;
}

const FeatureCard: React.FC<{ title: string, description: string, icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex justify-center items-center h-16 w-16 mx-auto bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ onInstall, showInstallButton }) => {
  const { t } = useContext(LanguageContext);
  
  const features = [
    { key: 'featureBudgeting', icon: <ChartBarIcon /> },
    { key: 'featureMultiCurrency', icon: <GlobeAltIcon /> },
    { key: 'featureDarkMode', icon: <MoonIcon /> },
    { key: 'featurePWA', icon: <DevicePhoneMobileIcon /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col">
        <Header onInstall={onInstall} showInstallButton={showInstallButton} />
        <main className="flex-grow">
            {/* Hero Section */}
            <section className="text-center py-20 px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 dark:text-slate-100">
                    {t('homeTitle')}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mt-4 max-w-3xl mx-auto">
                    {t('homeSubtitle')}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a href="#/register" className="w-full sm:w-auto bg-primary text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg">
                        {t('getStarted')}
                    </a>
                    {showInstallButton && (
                        <button onClick={onInstall} className="w-full sm:w-auto bg-secondary text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-emerald-600 transition-colors duration-300 shadow-lg flex items-center justify-center gap-2">
                           <DownloadIcon /> {t('installApp')}
                        </button>
                    )}
                </div>
            </section>
            
            {/* Features Section */}
            <section id="features" className="py-20 bg-white dark:bg-slate-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">{t('featuresTitle')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map(feature => (
                            <FeatureCard key={feature.key} title={t(feature.key as any)} description={t((feature.key + 'Desc') as any)} icon={feature.icon} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Demo Section */}
            <section id="demo" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">{t('liveDemoTitle')}</h2>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 md:p-8 overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="bg-slate-200 dark:bg-slate-700 h-8 rounded-t-lg flex items-center gap-2 px-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <img src="/assets/images/finta-demo.png" alt="Finta App Demo" className="w-full h-auto rounded-b-lg" />
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </div>
  );
};

// SVG Icons
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const GlobeAltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const DevicePhoneMobileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;


export default HomePage;
