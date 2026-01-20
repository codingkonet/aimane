
import React, { useState, ChangeEvent } from 'react';

interface BudgetTrackerProps {
  totalExpenses: number;
  budget: number;
  setBudget: (newBudget: number) => void;
}

const EditIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
    </svg>
);


const BudgetTracker: React.FC<BudgetTrackerProps> = ({ totalExpenses, budget, setBudget }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState(budget.toString());

    const percentage = budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;
    const remaining = budget - totalExpenses;

    const progressBarColor = percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-emerald-500';

    const handleSave = () => {
        const budgetValue = parseFloat(newBudget);
        if (!isNaN(budgetValue) && budgetValue > 0) {
            setBudget(budgetValue);
            setIsEditing(false);
        }
    };
    
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
      }).format(amount);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-700">Monthly Budget</h2>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="text-slate-500 hover:text-primary transition">
                         <EditIcon className="w-5 h-5" />
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={newBudget}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewBudget(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Enter new budget"
                    />
                    <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Save</button>
                    <button onClick={() => setIsEditing(false)} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300 transition">Cancel</button>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-3xl font-bold text-slate-800">{formatCurrency(totalExpenses)}</span>
                        <span className="text-slate-500">of {formatCurrency(budget)}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                        <div
                            className={`h-4 rounded-full transition-all duration-500 ${progressBarColor}`}
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                     <div className="text-right mt-2 font-medium">
                        <span className={remaining >= 0 ? 'text-slate-600' : 'text-red-600'}>
                            {formatCurrency(remaining)} {remaining >= 0 ? 'left' : 'overspent'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetTracker;
