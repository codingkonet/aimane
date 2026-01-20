
import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Footer: React.FC = () => {
    const { t } = useContext(LanguageContext);
    return (
        <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 md:px-8 py-6 text-center text-slate-500 dark:text-slate-400">
                <p>{t('copyright')}</p>
            </div>
        </footer>
    );
};

export default Footer;
