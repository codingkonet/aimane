
import React, { useMemo, useCallback, useContext, useState } from 'react';
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
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout, onUpdateUser }) => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(`transactions_${user.email}`, []);
  const [budget, setBudget] = useLocalStorage<number>(`budget_${user.email}`, 2000);
  const { t } = useContext(LanguageContext);

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800">
      <Header user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} />
      <main className="container mx-auto p-4 md:p-8">
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 justify-end">
            <div className="flex items-center gap-2">
                <label htmlFor="language-select" className="font-semibold text-slate-600 dark:text-slate-300">{t('language')}:</label>
                <select id="language-select" value={user.language} onChange={handleLanguageChange} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="currency-select" className="font-semibold text-slate-600 dark:text-slate-300">{t('currency')}:</label>
                <select id="currency-select" value={user.currency} onChange={handleCurrencyChange} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="MAD">MAD (DH)</option>
                </select>
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
             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
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

export default DashboardPage;
