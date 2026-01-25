
import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { translations, TranslationKey } from '../translations';
import { Language } from '../types';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => {},
    t: () => '',
});

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const storedLang = localStorage.getItem('language') as Language;
        if (storedLang && ['en', 'fr', 'ar'].includes(storedLang)) {
            setLanguageState(storedLang);
        }
    }, []);

    const handleSetLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    }, []);
    
    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);


    const t = useCallback((key: TranslationKey): string => {
        const translation = translations[language][key] || translations['en'][key];
        return translation || `[${key}]`;
    }, [language]);

    const value = useMemo(() => ({
        language,
        setLanguage: handleSetLanguage,
        t
    }), [language, handleSetLanguage, t]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
