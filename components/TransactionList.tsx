
import React, { useContext } from 'react';
import { Transaction, TransactionType, Currency } from '../types';
import { LanguageContext } from '../context/LanguageContext';
import { formatCurrency } from '../utils/formatting';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  currency: Currency;
  isFiltered: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const TransactionItem: React.FC<{transaction: Transaction; onDelete: (id: string) => void, currency: Currency}> = ({ transaction, onDelete, currency }) => {
    const { language, t } = useContext(LanguageContext);
    const isIncome = transaction.type === TransactionType.INCOME;
    const amountColor = isIncome ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400';
    
    const formatDate = (dateString: string) => {
        const locale = language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-CA' : 'en-US';
        return new Date(dateString).toLocaleDateString(locale, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    const formattedAmount = isIncome 
        ? `+${formatCurrency(transaction.amount, currency, language)}`
        : formatCurrency(-transaction.amount, currency, language);

    return (
        <li className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                <div className={`w-2 h-10 rounded-full ${isIncome ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{transaction.description}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t(transaction.category as any)} &bull; {formatDate(transaction.date)}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <p className={`font-bold text-lg ${amountColor}`}>
                    {formattedAmount}
                </p>
                <button onClick={() => onDelete(transaction.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-slate-700">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </li>
    );
};


const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction, currency, isFiltered, searchTerm, setSearchTerm }) => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">{t('recentTransactions')}</h2>
            <div className="relative w-full md:w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-slate-400" />
                </span>
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
            </div>
        </div>
      {transactions.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-8">
            {isFiltered ? t('noMatchingTransactions') : t('noTransactions')}
        </p>
      ) : (
        <ul className="space-y-3">
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDeleteTransaction} currency={currency} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;