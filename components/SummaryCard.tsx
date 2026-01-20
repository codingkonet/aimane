
import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
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

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
  const styles = typeStyles[type];
  
  return (
    <div className={`p-6 rounded-2xl shadow-lg transition-transform hover:scale-105 ${styles.bg}`}>
      <h3 className="text-lg font-semibold text-slate-600">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${styles.text}`}>
        {formatCurrency(amount)}
      </p>
    </div>
  );
};

export default SummaryCard;
