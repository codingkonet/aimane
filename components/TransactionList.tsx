
import React from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


const TransactionItem: React.FC<{transaction: Transaction; onDelete: (id: string) => void}> = ({ transaction, onDelete }) => {
    const isIncome = transaction.type === TransactionType.INCOME;
    const amountColor = isIncome ? 'text-emerald-500' : 'text-red-500';
    const sign = isIncome ? '+' : '-';

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    return (
        <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                <div className={`w-2 h-10 rounded-full ${isIncome ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <div>
                    <p className="font-bold text-slate-800">{transaction.description}</p>
                    <p className="text-sm text-slate-500">{transaction.category} &bull; {formatDate(transaction.date)}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <p className={`font-bold text-lg ${amountColor}`}>
                    {sign}${transaction.amount.toFixed(2)}
                </p>
                <button onClick={() => onDelete(transaction.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </li>
    );
};


const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-center text-slate-500 py-8">No transactions yet. Add one to get started!</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDeleteTransaction} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
