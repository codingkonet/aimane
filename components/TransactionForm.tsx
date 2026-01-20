
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Transaction, TransactionType, Category } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const incomeCategories = [Category.SALARY, Category.BUSINESS, Category.INVESTMENTS, Category.GIFT, Category.OTHER_INCOME];
const expenseCategories = [Category.FOOD, Category.TRANSPORT, Category.HOUSING, Category.UTILITIES, Category.ENTERTAINMENT, Category.HEALTH, Category.SHOPPING, Category.EDUCATION, Category.SAVINGS, Category.DEBT, Category.OTHER_EXPENSE];

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState<Category>(Category.FOOD);
  
  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    if (newType === TransactionType.INCOME) {
        setCategory(Category.SALARY);
    } else {
        setCategory(Category.FOOD);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!description || !amount) {
        alert("Please fill in all fields.");
        return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }

    onAddTransaction({ description, amount: numericAmount, type, category });
    
    setDescription('');
    setAmount('');
    setType(TransactionType.EXPENSE);
    setCategory(Category.FOOD);
  };

  const categories = type === TransactionType.INCOME ? incomeCategories : expenseCategories;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex rounded-lg border border-slate-300 p-1">
            <button type="button" onClick={() => handleTypeChange(TransactionType.EXPENSE)} className={`w-1/2 p-2 rounded-md font-semibold transition ${type === TransactionType.EXPENSE ? 'bg-red-500 text-white' : 'text-slate-600'}`}>Expense</button>
            <button type="button" onClick={() => handleTypeChange(TransactionType.INCOME)} className={`w-1/2 p-2 rounded-md font-semibold transition ${type === TransactionType.INCOME ? 'bg-emerald-500 text-white' : 'text-slate-600'}`}>Income</button>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-600 mb-1">Description</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" placeholder="e.g., Groceries" />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-600 mb-1">Amount</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" placeholder="0.00" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-600 mb-1">Category</label>
          <select id="category" value={category} onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value as Category)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white">
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
