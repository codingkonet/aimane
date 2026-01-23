
import React, { useContext, useState, useRef, useEffect } from 'react';
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
  onImportClick: () => void;
  onExportPDF: () => void;
  onExportExcel: () => void;
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

const UploadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
);

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
);

const FileTextIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);

const SheetIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
);

const ChevronDownIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
);

const TransactionItem: React.FC<{transaction: Transaction; currency: Currency; onDelete: (id: string) => void}> = ({ transaction, currency, onDelete }) => {
    const { language, t } = useContext(LanguageContext);
    const isExpense = transaction.type === TransactionType.EXPENSE;
    const amountColor = isExpense ? 'text-red-500' : 'text-emerald-500';

    return (
        <li className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isExpense ? 'bg-red-100 dark:bg-red-900/50' : 'bg-emerald-100 dark:bg-emerald-900/50'}`}>
                    <span className="text-xl">{isExpense ? '💸' : '💰'}</span>
                </div>
                <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">{transaction.description}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {t(transaction.category as any)} • {new Date(transaction.date).toLocaleDateString(language)}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className={`font-bold text-lg ${amountColor}`}>
                    {isExpense ? '-' : '+'}{formatCurrency(transaction.amount, currency, language)}
                </span>
                <button onClick={() => onDelete(transaction.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </li>
    );
};

const TransactionList: React.FC<TransactionListProps> = ({
    transactions, onDeleteTransaction, currency, isFiltered, searchTerm, setSearchTerm, onImportClick, onExportPDF, onExportExcel
}) => {
    const { t } = useContext(LanguageContext);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const exportMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
                setIsExportOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">{t('recentTransactions')}</h2>
                <div className="flex items-center gap-2 w-full md:w-auto flex-wrap justify-end">
                    <div className="relative flex-grow md:flex-grow-0">
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                    <button onClick={onImportClick} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition flex items-center gap-2">
                        <UploadIcon className="w-5 h-5" /> {t('import')}
                    </button>
                    <div className="relative" ref={exportMenuRef}>
                        <button onClick={() => setIsExportOpen(!isExportOpen)} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition flex items-center gap-2">
                            <DownloadIcon className="w-5 h-5" /> {t('export')} <ChevronDownIcon className={`w-4 h-4 transition-transform ${isExportOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isExportOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border dark:border-slate-700 z-10">
                                <button onClick={() => { onExportPDF(); setIsExportOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 rounded-t-lg">
                                    <FileTextIcon className="w-4 h-4" /> {t('exportPDF')}
                                </button>
                                <button onClick={() => { onExportExcel(); setIsExportOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 rounded-b-lg">
                                    <SheetIcon className="w-4 h-4" /> {t('exportExcel')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {transactions.length > 0 ? (
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                    {transactions.map(transaction => (
                        <TransactionItem key={transaction.id} transaction={transaction} currency={currency} onDelete={onDeleteTransaction} />
                    ))}
                </ul>
            ) : (
                <div className="text-center py-10">
                    <p className="text-slate-500 dark:text-slate-400">
                        {isFiltered ? t('noMatchingTransactions') : t('noTransactions')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TransactionList;
