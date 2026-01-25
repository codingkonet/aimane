
import React, { useState, FormEvent, useContext } from 'react';
import { IncomeSource, User, Category } from '../types';
import { LanguageContext } from '../context/LanguageContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatCurrency } from '../utils/formatting';

interface IncomeSourceManagerProps {
  user: User;
}

const incomeCategories = [Category.SALARY, Category.FREELANCE_INCOME, Category.INVESTMENT_RETURNS, Category.BUSINESS, Category.GIFT, Category.OTHER_INCOME];

const EditIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
    </svg>
);

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const IncomeSourceManager: React.FC<IncomeSourceManagerProps> = ({ user }) => {
  const [sources, setSources] = useLocalStorage<IncomeSource[]>(`income_sources_${user.email}`, []);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(Category.SALARY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { t, language } = useContext(LanguageContext);

  const clearForm = () => {
    setName('');
    setAmount('');
    setCategory(Category.SALARY);
    setEditingId(null);
  };

  const handleEdit = (source: IncomeSource) => {
    setEditingId(source.id);
    setName(source.name);
    setAmount(source.amount.toString());
    setCategory(source.category);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this income source?')) {
        setSources(sources.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!name || isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid name and positive amount.');
      return;
    }

    if (editingId) {
      setSources(sources.map(s => s.id === editingId ? { id: s.id, name, amount: numericAmount, category } : s));
    } else {
      setSources([...sources, { id: crypto.randomUUID(), name, amount: numericAmount, category }]);
    }
    clearForm();
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">{t('incomeSourcesTitle')}</h2>
      
      {/* List of Sources */}
      <div className="mb-6 space-y-3">
        {sources.length > 0 ? (
            sources.map(source => (
                <div key={source.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100">{source.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t(source.category as any)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(source.amount, user.currency, language)}</span>
                        <button onClick={() => handleEdit(source)} className="text-slate-400 hover:text-primary p-1"><EditIcon className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(source.id)} className="text-slate-400 hover:text-red-500 p-1"><TrashIcon className="w-4 h-4" /></button>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-4">{t('noIncomeSources')}</p>
        )}
      </div>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-4 border-t border-slate-100 dark:border-slate-700 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{t('sourceName')}</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Monthly Salary" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{t('expectedAmount')}</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{t('category')}</label>
            <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                {incomeCategories.map(cat => (
                    <option key={cat} value={cat}>{t(cat as any)}</option>
                ))}
            </select>
        </div>
        <div className="flex items-center gap-2">
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                {editingId ? t('updateSource') : t('addSource')}
            </button>
            {editingId && (
                <button type="button" onClick={clearForm} className="w-full bg-slate-200 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition">
                    {t('cancel')}
                </button>
            )}
        </div>
      </form>
    </div>
  );
};

export default IncomeSourceManager;
