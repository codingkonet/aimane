
import { Currency, Language } from '../types';

const localeMap: Record<Language, string> = {
    en: 'en-US',
    fr: 'fr-FR',
    ar: 'ar-MA'
};

export const formatCurrency = (amount: number, currency: Currency, language: Language) => {
    const locale = localeMap[language] || 'en-US';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
};
