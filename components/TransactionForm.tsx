
import React, { useState, FormEvent, ChangeEvent, useContext, useEffect, useRef } from 'react';
import { Transaction, TransactionType, Category } from '../types';
import { LanguageContext } from '../context/LanguageContext';
import { GoogleGenAI } from "@google/genai";

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  isPro: boolean;
}

const incomeCategories = [Category.SALARY, Category.FREELANCE_INCOME, Category.INVESTMENT_RETURNS, Category.BUSINESS, Category.GIFT, Category.OTHER_INCOME];
const expenseCategories = [Category.GROCERIES, Category.RESTAURANTS, Category.TRANSPORT, Category.RENT_MORTGAGE, Category.UTILITIES, Category.ENTERTAINMENT, Category.HEALTH, Category.SHOPPING, Category.EDUCATION, Category.SAVINGS, Category.DEBT_PAYMENT, Category.OTHER_EXPENSE];

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction, isPro }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState<Category>(Category.GROCERIES);
  const { t } = useContext(LanguageContext);
  
  const [isSuggestingCategory, setIsSuggestingCategory] = useState(false);
  const [isCategorySuggested, setIsCategorySuggested] = useState(false);
  const debounceTimeout = useRef<number | null>(null);

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    setIsCategorySuggested(false);
    if (newType === TransactionType.INCOME) {
        setCategory(Category.SALARY);
    } else {
        setCategory(Category.GROCERIES);
    }
  };

  const getCategorySuggestion = async (text: string) => {
    if (!isPro || text.trim().length < 3) return;
    
    setIsSuggestingCategory(true);
    setIsCategorySuggested(false);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const categoriesForPrompt = type === TransactionType.INCOME ? incomeCategories : expenseCategories;
        const prompt = `Given the transaction description "${text}", which of the following categories fits best? Respond with ONLY ONE category name from this list: ${categoriesForPrompt.join(', ')}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        const suggestedCategoryText = response.text?.trim().replace(/["'.]/g, '');

        if (suggestedCategoryText) {
            const foundCategory = (Object.values(Category) as string[]).find(cat => cat.toLowerCase() === suggestedCategoryText.toLowerCase());
            
            if (foundCategory && categoriesForPrompt.includes(foundCategory as Category)) {
                setCategory(foundCategory as Category);
                setIsCategorySuggested(true);
            }
        }

    } catch (e) {
        console.error("Error getting category suggestion:", e);
    } finally {
        setIsSuggestingCategory(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    
    debounceTimeout.current = window.setTimeout(() => {
      if (description.trim()) {
        getCategorySuggestion(description);
      }
    }, 1000);
    
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [description, type, isPro]);


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
    setCategory(Category.GROCERIES);
    setIsCategorySuggested(false);
  };

  const categories = type === TransactionType.INCOME ? incomeCategories : expenseCategories;

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as Category);
    setIsCategorySuggested(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">{t('addTransaction')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 p-1">
            <button type="button" onClick={() => handleTypeChange(TransactionType.EXPENSE)} className={`w-1/2 p-2 rounded-md font-semibold transition ${type === TransactionType.EXPENSE ? 'bg-red-500 text-white' : 'text-slate-600 dark:text-slate-300'}`}>{t('expense')}</button>
            <button type="button" onClick={() => handleTypeChange(TransactionType.INCOME)} className={`w-1/2 p-2 rounded-md font-semibold transition ${type === TransactionType.INCOME ? 'bg-emerald-500 text-white' : 'text-slate-600 dark:text-slate-300'}`}>{t('income')}</button>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{t('description')}</label>
          {/* FIX: Use a valid translation key for the placeholder. `Category.GROCERIES` is a valid key. */}
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder={t(Category.GROCERIES)} />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{t('amount')}</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="0.00" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <label htmlFor="category" className="block text-sm font-medium text-slate-600 dark:text-slate-400">{t('category')}</label>
            {isPro && isSuggestingCategory && <LoadingSpinner size={16} />}
            {isPro && isCategorySuggested && <SparklesIcon size={16} title={t('aiSuggestedCategory')} />}
          </div>
          <select id="category" value={category} onChange={handleCategoryChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white">
            {categories.map(cat => (
              <option key={cat} value={cat}>{t(cat as any)}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300">
          {t('addTransactionButton')}
        </button>
      </form>
    </div>
  );
};

const SparklesIcon = ({size=24, title=""}: {size?: number, title?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-500" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <title>{title}</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const LoadingSpinner = ({size=24}: {size?: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-slate-400"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
);

export default TransactionForm;