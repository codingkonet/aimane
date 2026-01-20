
import React, { useContext } from 'react';
import { Currency } from '../types';
import { formatCurrency } from '../utils/formatting';
import { LanguageContext } from '../context/LanguageContext';
import { TranslationKey } from '../translations';

interface SummaryCardProps {
  titleKey: TranslationKey;
  amount: number;
  type: 'income' | 'expense' | 'balance';
  currency: Currency;
}

const typeStyles = {
    income: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
    },
    expense: {
        bg: 'bg-red-50',
        text: 'text-red-600',
        border: 'border-red-200',
    },
    balance: {
        bg: 'bg-indigo-50',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
    }
};

const SummaryCard: React.FC<SummaryCardProps> = ({ titleKey, amount, type, currency }) => {
  const styles = typeStyles[type];
  const { language, t } = useContext(LanguageContext);
  
  return (
    <div className={`p-6 rounded-2xl shadow-lg transition-transform hover:scale-105 ${styles.bg}`}>
      <h3 className="text-lg font-semibold text-slate-600">{t(titleKey)}</h3>
      <p className={`text-3xl font-bold mt-2 ${styles.text}`}>
        {formatCurrency(amount, currency, language)}
      </p>
    </div>
  );
};

export default SummaryCard;
