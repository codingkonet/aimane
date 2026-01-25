
import React, { useContext } from 'react';
import { Category } from '../types';
import { LanguageContext } from '../context/LanguageContext';

interface TransactionFilterProps {
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    startDate: string;
    setStartDate: (value: string) => void;
    endDate: string;
    setEndDate: (value: string) => void;
    handleReset: () => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const TransactionFilter: React.FC<TransactionFilterProps> = ({
    selectedCategory, setSelectedCategory,
    startDate, setStartDate, endDate, setEndDate, handleReset,
    searchTerm, setSearchTerm
}) => {
    const { t } = useContext(LanguageContext);
    const allCategories = Object.values(Category);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8">
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4">{t('filters')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>

                {/* Category Select */}
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                >
                    <option value="all">{t('allCategories')}</option>
                    {allCategories.map(cat => (
                        <option key={cat} value={cat}>{t(cat as any)}</option>
                    ))}
                </select>

                {/* Date Inputs */}
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        aria-label={t('startDate')}
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    />
                    <span className="text-slate-500 dark:text-slate-400">-</span>
                    <input
                        type="date"
                        aria-label={t('endDate')}
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        min={startDate}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    />
                </div>

                {/* Reset Button */}
                <button
                    onClick={handleReset}
                    className="w-full bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300 transition dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
                >
                    {t('resetFilters')}
                </button>
            </div>
        </div>
    );
};

export default TransactionFilter;
