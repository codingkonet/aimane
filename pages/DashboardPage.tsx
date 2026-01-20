
import React, { useMemo, useCallback, useContext } from 'react';
import { Transaction, TransactionType, User, Language, Currency } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import BudgetTracker from '../components/BudgetTracker';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import BudgetChart from '../components/BudgetChart';
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


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header onLogout={onLogout} />
      <main className="container mx-auto p-4 md:p-8">
        
        <div className="bg-white p-4 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 justify-end">
            <div className="flex items-center gap-2">
                <label htmlFor="language-select" className="font-semibold text-slate-600">{t('language')}:</label>
                <select id="language-select" value={user.language} onChange={handleLanguageChange} className="bg-slate-100 text-slate-700 font-semibold py-2 px-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="currency-select" className="font-semibold text-slate-600">{t('currency')}:</label>
                <select id="currency-select" value={user.currency} onChange={handleCurrencyChange} className="bg-slate-100 text-slate-700 font-semibold py-2 px-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none">
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
          </div>
          <div className="lg:col-span-3">
             <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-slate-700 mb-4">{t('spendingOverview')}</h2>
                <BudgetChart transactions={transactions} />
              </div>
          </div>
        </div>

        <div className="mt-8">
          <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
