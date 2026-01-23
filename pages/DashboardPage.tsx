
import React, { useMemo, useCallback, useContext, useState, useRef } from 'react';
import { Transaction, TransactionType, User, Language, Currency, Category, PlatformSettings } from '../types';
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
import { GoogleGenAI } from "@google/genai";
import { formatCurrency } from '../utils/formatting';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  onInstall: () => void;
  showInstallButton: boolean;
  settings: PlatformSettings;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout, onUpdateUser, onInstall, showInstallButton, settings }) => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(`transactions_${user.email}`, []);
  const [budget, setBudget] = useLocalStorage<number>(`budget_${user.email}`, 2000);
  const { t } = useContext(LanguageContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [aiAdvice, setAiAdvice] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);

  const isAdmin = user.email === 'hello@ouaglabs.com';
  const isPro = user.plan === 'Pro' || isAdmin;

  // AI Advisor Logic
  const getAiAdvice = async () => {
    if (!isPro) return;
    setAiLoading(true);
    try {
        if (transactions.length < 3) {
            setAiAdvice(t('addMoreTransactionsForAdvice'));
            setAiLoading(false);
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const summary = transactions.slice(0, 15).map(tx => 
            `${tx.type === TransactionType.EXPENSE ? 'Spent' : 'Earned'} ${tx.amount} ${user.currency} on ${tx.category} (${tx.description})`
        ).join("\n");
        
        const languageMap = {
            'en': 'English',
            'fr': 'French',
            'ar': 'Arabic'
        };
        const languageName = languageMap[user.language] || 'English';

        const prompt = `You are a helpful financial advisor. Analyze the following recent transactions for a user of a budgeting app:\n\n${summary}\n\nBased on this spending, provide exactly 3 short, encouraging, and actionable financial tips to help them improve. The response must be in ${languageName}. Format the tips as a simple, unnumbered list, with each tip on a new line starting with a dash (-).`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        if (response && response.text) {
            setAiAdvice(response.text);
        } else {
            setAiAdvice(t('noAiAdvice'));
        }
    } catch (e) {
        console.error("AI Advisor Error:", e);
        setAiAdvice(t('aiAdvisorError'));
    } finally {
        setAiLoading(false);
    }
  };

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions.filter(t => t.type === TransactionType.INCOME).reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((acc, t) => acc + t.amount, 0);
    return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
  }, [transactions]);
  
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        if(start) start.setHours(0,0,0,0);
        if(end) end.setHours(23,59,59,999);
        return (
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'all' || transaction.category === selectedCategory) &&
            (start ? transactionDate >= start : true) &&
            (end ? transactionDate <= end : true)
        );
    });
  }, [transactions, searchTerm, selectedCategory, startDate, endDate]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = { ...transaction, id: crypto.randomUUID(), date: new Date().toISOString() };
    setTransactions(prev => [newTransaction, ...prev]);
  }, [setTransactions]);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, [setTransactions]);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
              try {
                  const newTxs = results.data.map((row: any) => {
                      const amount = parseFloat(row.amount);
                      if (!row.date || !row.description || isNaN(amount) || !row.type || !row.category) {
                          throw new Error(`Invalid row format: ${JSON.stringify(row)}`);
                      }
                      const newTx: Transaction = {
                          id: crypto.randomUUID(),
                          date: new Date(row.date).toISOString(),
                          description: row.description,
                          amount: amount,
                          type: row.type.toUpperCase() as TransactionType,
                          category: row.category as Category,
                      };
                      if (!Object.values(TransactionType).includes(newTx.type) || !Object.values(Category).includes(newTx.category)) {
                           throw new Error(`Invalid type or category in row: ${JSON.stringify(row)}`);
                      }
                      return newTx;
                  });
                  setTransactions(prev => [...newTxs.reverse(), ...prev]);
                  alert(t('importSuccess'));
              } catch (error) {
                  console.error("Import error:", error);
                  alert(t('importError'));
              }
          },
          error: (error: any) => {
               console.error("CSV parsing error:", error);
               alert(t('importError'));
          }
      });
      if (event.target) event.target.value = '';
  };
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Date", "Description", "Category", "Type", "Amount"];
    const tableRows: any[] = [];

    filteredTransactions.forEach(tx => {
        const txData = [
            new Date(tx.date).toLocaleDateString(user.language),
            tx.description,
            t(tx.category as any),
            tx.type,
            formatCurrency(tx.amount * (tx.type === 'EXPENSE' ? -1 : 1), user.currency, user.language)
        ];
        tableRows.push(txData);
    });

    (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
    });
    doc.text("Transaction Report", 14, 15);
    doc.save("transactions.pdf");
  };

  const handleExportExcel = () => {
    const headers = "Date,Description,Category,Type,Amount";
    const csvContent = [
        headers,
        ...filteredTransactions.map(tx => 
            [
                new Date(tx.date).toISOString(),
                `"${tx.description.replace(/"/g, '""')}"`,
                tx.category,
                tx.type,
                tx.amount
            ].join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 selection:bg-primary selection:text-white">
      <Header user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} onInstall={onInstall} showInstallButton={showInstallButton} />
      <input type="file" ref={fileInputRef} onChange={handleFileImport} style={{ display: 'none' }} accept=".csv" />
      <main className="container mx-auto p-4 md:p-8">
        
        {/* Actions Row */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-xl mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between border border-slate-100 dark:border-slate-700">
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                {isAdmin && (
                    <button onClick={() => window.location.hash = '/admin'} className="bg-amber-500 text-white font-bold py-2 px-5 rounded-2xl hover:bg-amber-600 transition-all shadow-lg active:scale-95 flex items-center gap-2">
                        Admin
                    </button>
                )}
                {!isPro && (
                    <button onClick={() => window.location.hash = '/upgrade'} className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95 flex items-center gap-2">
                         <ProIcon /> {t('upgradeToPro')}
                    </button>
                )}
                <button onClick={() => window.location.hash = '/blog'} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-5 rounded-2xl hover:bg-slate-200 transition-all active:scale-95 flex items-center gap-2">
                     {t('community')}
                </button>
            </div>
            
            {/* AI Advisor Card (Pro Only) */}
            <div className={`flex-1 mx-0 lg:mx-6 p-4 rounded-2xl ${isPro ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800' : 'bg-slate-50 dark:bg-slate-900 opacity-60'} flex items-center gap-4`}>
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><SparklesIcon /></div>
                <div className="flex-1">
                    <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                        {t('aiAdvisor')} {!isPro && <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase">PRO</span>}
                    </h4>
                    <div className="text-xs text-indigo-700/70 dark:text-indigo-300/50 whitespace-pre-wrap">
                        {isPro ? (aiAdvice || t('getAdvisorTips')) : 'Upgrade to unlock AI spending analysis.'}
                    </div>
                </div>
                {isPro && (
                    <button onClick={getAiAdvice} disabled={aiLoading} className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm hover:shadow-md transition disabled:opacity-50">
                        {aiLoading ? <LoadingSpinner size={20} /> : <RefreshIcon size={20} />}
                    </button>
                )}
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
            <TransactionForm onAddTransaction={addTransaction} isPro={isPro} />
            <CurrencyConverter balance={balance} baseCurrency={user.currency} />
          </div>
          <div className="lg:col-span-3">
             <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl h-full border border-slate-100 dark:border-slate-700">
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">{t('spendingOverview')}</h2>
                <BudgetChart transactions={transactions} currency={user.currency} theme={user.theme} />
              </div>
          </div>
        </div>

        <div className="mt-8">
          <TransactionFilter 
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
            handleReset={() => {setSearchTerm(''); setSelectedCategory('all'); setStartDate(''); setEndDate('');}}
          />
          <TransactionList 
            transactions={filteredTransactions} 
            onDeleteTransaction={deleteTransaction}
            currency={user.currency}
            isFiltered={!!searchTerm || selectedCategory !== 'all' || !!startDate || !!endDate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onImportClick={handleImportClick}
            onExportPDF={handleExportPDF}
            onExportExcel={handleExportExcel}
           />
        </div>
      </main>
    </div>
  );
};

const ProIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const RefreshIcon = ({size=24}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
);

const LoadingSpinner = ({size=24}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
);

export default DashboardPage;