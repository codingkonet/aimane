
import React, { useState, useMemo, useCallback } from 'react';
import { Transaction, TransactionType } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import BudgetTracker from './components/BudgetTracker';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BudgetChart from './components/BudgetChart';

const App: React.FC = () => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [budget, setBudget] = useLocalStorage<number>('budget', 2000);

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Total Income" amount={totalIncome} type="income" />
          <SummaryCard title="Total Expenses" amount={totalExpenses} type="expense" />
          <SummaryCard title="Balance" amount={balance} type="balance" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BudgetTracker totalExpenses={totalExpenses} budget={budget} setBudget={setBudget} />
            <TransactionForm onAddTransaction={addTransaction} />
          </div>
          <div className="lg:col-span-3">
             <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-slate-700 mb-4">Spending Overview</h2>
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

export default App;
