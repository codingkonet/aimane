
import React, { useMemo, useCallback, useContext, useState, useRef } from 'react';
import { Transaction, TransactionType, User, Language, Currency, Category } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import BudgetTracker from '../components/BudgetTracker';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import BudgetChart from '../components/BudgetChart';
import TransactionFilter from '../components/TransactionFilter';
import CurrencyConverter from '../components/CurrencyConverter';
import { LanguageContext } from '../context/LanguageContext';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onInstall: () => void;
  showInstallButton: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout, onUpdateUser, onInstall, showInstallButton }) => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(`transactions_${user.email}`, []);
  const [budget, setBudget] = useLocalStorage<number>(`budget_${user.email}`, 2000);
  const { t } = useContext(LanguageContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = user.email === 'hello@ouaglabs.com';

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    };
  }, [transactions]);
  
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if(start) start.setHours(0,0,0,0);
        if(end) end.setHours(23,59,59,999);

        const isAfterStartDate = start ? transactionDate >= start : true;
        const isBeforeEndDate = end ? transactionDate <= end : true;
        
        return (
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'all' || transaction.category === selectedCategory) &&
            isAfterStartDate &&
            isBeforeEndDate
        );
    });
  }, [transactions, searchTerm, selectedCategory, startDate, endDate]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }, [setTransactions]);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, [setTransactions]);
  
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateUser({ ...user, currency: e.target.value as Currency });
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateUser({ ...user, language: e.target.value as Language });
  }
  
  const handleResetFilters = () => {
      setSearchTerm('');
      setSelectedCategory('all');
      setStartDate('');
      setEndDate('');
  }

  const handleExport = () => {
    const dataToExport = {
        transactions,
        budget,
        exportDate: new Date().toISOString(),
        userName: user.name,
        version: "1.0"
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fintacloud_backup_${user.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm(t('confirmImport'))) {
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedData = JSON.parse(event.target?.result as string);
            
            // Validation
            if (importedData && Array.isArray(importedData.transactions)) {
                setTransactions(importedData.transactions);
                if (typeof importedData.budget === 'number') {
                    setBudget(importedData.budget);
                }
                alert(t('importSuccess'));
            } else {
                throw new Error("Invalid format");
            }
        } catch (error) {
            console.error("Import error:", error);
            alert(t('importError'));
        }
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800">
      <Header user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} onInstall={onInstall} showInstallButton={showInstallButton} />
      <main className="container mx-auto p-4 md:p-8">
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
                {isAdmin && (
                    <button 
                        onClick={() => window.location.hash = '/admin'}
                        className="bg-amber-500 text-white font-bold py-2 px-5 rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center gap-2"
                    >
                        <AdminIcon /> {t('adminPanel')}
                    </button>
                )}
                <button 
                    onClick={() => window.location.hash = '/blog'}
                    className="bg-primary text-white font-bold py-2 px-5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center gap-2"
                >
                    <BlogIcon /> {t('community')}
                </button>
                <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden md:block"></div>
                <button 
                    onClick={handleExport}
                    className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all active:scale-95 flex items-center gap-2"
                >
                    <ExportIcon /> {t('exportData')}
                </button>
                <button 
                    onClick={handleImportClick}
                    className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all active:scale-95 flex items-center gap-2"
                >
                    <ImportIcon /> {t('importData')}
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImportFile} 
                    accept=".json" 
                    className="hidden" 
                />
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2">
                    <label htmlFor="language-select" className="font-semibold text-slate-600 dark:text-slate-300 text-sm">{t('language')}:</label>
                    <select id="language-select" value={user.language} onChange={handleLanguageChange} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-1.5 px-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none text-sm">
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="ar">العربية</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="currency-select" className="font-semibold text-slate-600 dark:text-slate-300 text-sm">{t('currency')}:</label>
                    <select id="currency-select" value={user.currency} onChange={handleCurrencyChange} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-1.5 px-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none text-sm">
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="MAD">MAD (DH)</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard titleKey="totalIncome" amount={totalIncome} type="income" currency={user.currency} />
          <SummaryCard titleKey="totalExpenses" amount={totalExpenses} type="expense" currency={user.currency} />
          <SummaryCard titleKey="balance" amount={balance} type="balance" currency={user.currency} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BudgetTracker totalExpenses={totalExpenses} budget={budget} setBudget={setBudget} currency={user.currency}/>
            <TransactionForm onAddTransaction={addTransaction} />
            <CurrencyConverter balance={balance} baseCurrency={user.currency} />
          </div>
          <div className="lg:col-span-3">
             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg h-full">
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">{t('spendingOverview')}</h2>
                <BudgetChart transactions={transactions} currency={user.currency} theme={user.theme} />
              </div>
          </div>
        </div>

        <div className="mt-8">
          <TransactionFilter 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
            handleReset={handleResetFilters}
          />
          <TransactionList 
            transactions={filteredTransactions} 
            onDeleteTransaction={deleteTransaction}
            currency={user.currency}
            isFiltered={!!searchTerm || selectedCategory !== 'all' || !!startDate || !!endDate}
           />
        </div>
      </main>
    </div>
  );
};

const AdminIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const BlogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
);

const ExportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ImportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export default DashboardPage;