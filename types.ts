
export type Language = 'en' | 'fr' | 'ar';
export type Currency = 'USD' | 'EUR' | 'MAD';
export type Theme = 'light' | 'dark';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum Category {
  // Expenses
  GROCERIES = 'Groceries',
  RESTAURANTS = 'Restaurants',
  TRANSPORT = 'Transport',
  RENT_MORTGAGE = 'Rent/Mortgage',
  UTILITIES = 'Utilities',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  SHOPPING = 'Shopping',
  EDUCATION = 'Education',
  SAVINGS = 'Savings',
  DEBT_PAYMENT = 'Debt Payment',
  OTHER_EXPENSE = 'Other Expense',

  // Income
  SALARY = 'Salary',
  FREELANCE_INCOME = 'Freelance Income',
  INVESTMENT_RETURNS = 'Investment Returns',
  BUSINESS = 'Business',
  GIFT = 'Gift',
  OTHER_INCOME = 'Other Income',
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
}

export interface User {
  name: string;
  email: string;
  password: string; // In a real app, this should be a secure hash
  language: Language;
  currency: Currency;
  theme: Theme;
}
