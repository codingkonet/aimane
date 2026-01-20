
import React, { useState, useContext, useEffect } from 'react';
import { Currency } from '../types';
import { LanguageContext } from '../context/LanguageContext';
import { convertCurrency } from '../utils/currencyConverter';
import { formatCurrency } from '../utils/formatting';

interface CurrencyConverterProps {
    balance: number;
    baseCurrency: Currency;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ balance, baseCurrency }) => {
    const { language, t } = useContext(LanguageContext);
    const [amount, setAmount] = useState(balance.toFixed(2));
    const [targetCurrency, setTargetCurrency] = useState<Currency>('EUR');
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    
    // Update amount in input when balance changes
    useEffect(() => {
        setAmount(balance.toFixed(2));
        setConvertedAmount(null); // Reset conversion result when balance changes
    }, [balance]);

    const handleConvert = () => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) {
            setConvertedAmount(null);
            return;
        }
        const result = convertCurrency(numericAmount, baseCurrency, targetCurrency);
        setConvertedAmount(result);
    };
    
    const availableCurrencies = (['USD', 'EUR', 'MAD'] as Currency[]).filter(c => c !== baseCurrency);
    
    // Ensure target currency is always valid
    useEffect(() => {
        if (!availableCurrencies.includes(targetCurrency)) {
            setTargetCurrency(availableCurrencies[0] || 'EUR');
        }
    }, [baseCurrency, availableCurrencies, targetCurrency]);


    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">{t('currencyConverter')}</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="amount-to-convert" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        {t('amountToConvert')} ({baseCurrency})
                    </label>
                    <input
                        id="amount-to-convert"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="target-currency" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        {t('convertTo')}
                    </label>
                    <select
                        id="target-currency"
                        value={targetCurrency}
                        onChange={(e) => setTargetCurrency(e.target.value as Currency)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    >
                        {availableCurrencies.map(curr => (
                           <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleConvert}
                    className="w-full bg-secondary text-white py-3 rounded-lg font-semibold text-lg hover:bg-emerald-600 transition-colors duration-300"
                >
                    {t('convertButton')}
                </button>
                {convertedAmount !== null && (
                    <div className="text-center pt-2">
                        <p className="text-slate-600 dark:text-slate-400">{t('convertedAmount')}:</p>
                        <p className="text-2xl font-bold text-primary">
                            {formatCurrency(convertedAmount, targetCurrency, language)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencyConverter;
