
import React, { useState, ChangeEvent, useContext } from 'react';
import { Currency } from '../types';
import { formatCurrency } from '../utils/formatting';
import { LanguageContext } from '../context/LanguageContext';

interface BudgetTrackerProps {
  totalExpenses: number;
  budget: number;
  setBudget: (newBudget: number) => void;
  currency: Currency;
}

const EditIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
    </svg>
);


const BudgetTracker: React.FC<BudgetTrackerProps> = ({ totalExpenses, budget, setBudget, currency }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState(budget.toString());
    const { language, t } = useContext(LanguageContext);

    const percentage = budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;
    const remaining = budget - totalExpenses;

    const progressBarColor = percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-emerald-500';

    const handleSave = () => {
        const budgetValue = parseFloat(newBudget);
        if (!isNaN(budgetValue) && budgetValue > 0) {
            setBudget(budgetValue);
            setIsEditing(false);
        }
    };

    const localFormatCurrency = (amount: number) => {
        return new Intl.NumberFormat(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">{t('monthlyBudget')}</h2>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition">
                         <EditIcon className="w-5 h-5" />
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={newBudget}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewBudget(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        placeholder={t('monthlyBudget')}
                    />
                    <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">{t('save')}</button>
                    <button onClick={() => setIsEditing(false)} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition">{t('cancel')}</button>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">{formatCurrency(totalExpenses, currency, language)}</span>
                        <span className="text-slate-500 dark:text-slate-400">{t('of')} {localFormatCurrency(budget)}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                        <div
                            className={`h-4 rounded-full transition-all duration-500 ${progressBarColor}`}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                     <div className="text-right mt-2 font-medium">
                        <span className={remaining >= 0 ? 'text-slate-600 dark:text-slate-300' : 'text-red-600 dark:text-red-400'}>
                            {localFormatCurrency(Math.abs(remaining))} {remaining >= 0 ? t('left') : t('overspent')}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetTracker;
