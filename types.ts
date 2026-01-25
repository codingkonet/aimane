
export type Language = 'en' | 'fr' | 'ar';
export type Currency = 'USD' | 'EUR' | 'MAD';
export type Theme = 'light' | 'dark';
export type Plan = 'Free' | 'Pro';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum Category {
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
  password: string;
  language: Language;
  currency: Currency;
  theme: Theme;
  plan: Plan;
}

export interface Comment {
  id: string;
  authorEmail: string;
  authorName: string;
  content: string;
  date: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  authorEmail: string;
  authorName: string;
  category: string;
  date: string;
  comments: Comment[];
  likes: string[];
}

export interface PlatformSettings {
  proPrice: number;
  stripeEnabled: boolean;
  paypalEnabled: boolean;
}

export interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  category: Category;
}
