
import React, { useMemo, useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction, TransactionType } from '../types';
import { LanguageContext } from '../context/LanguageContext';

interface BudgetChartProps {
  transactions: Transaction[];
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', 
  '#FF19A3', '#19D4FF', '#FFD419', '#19FF5A', '#A319FF'
];

const BudgetChart: React.FC<BudgetChartProps> = ({ transactions }) => {
  const { t } = useContext(LanguageContext);

  const expenseData = useMemo(() => {
    const expenseByCategory = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, transaction) => {
        const category = transaction.category;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
      }, {} as { [key: string]: number });

    return Object.entries(expenseByCategory)
      .map(([name, value]) => ({ name: t(name as any), value }))
      // Fix: Explicitly convert values to numbers before sorting to prevent arithmetic errors on potentially non-number types.
      .sort((a, b) => Number(b.value) - Number(a.value));
  }, [transactions, t]);
  
  if (expenseData.length === 0) {
    return (
        <div className="flex items-center justify-center h-64 text-slate-500">
            <p>{t('noExpenseData')}</p>
        </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;
