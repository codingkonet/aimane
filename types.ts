
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum Category {
  // Expenses
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  HOUSING = 'Housing',
  UTILITIES = 'Utilities',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  SHOPPING = 'Shopping',
  EDUCATION = 'Education',
  SAVINGS = 'Savings',
  DEBT = 'Debt Payment',
  OTHER_EXPENSE = 'Other',
  // Income
  SALARY = 'Salary',
  BUSINESS = 'Business',
  INVESTMENTS = 'Investments',
  GIFT = 'Gift',
  OTHER_INCOME = 'Other',
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
}
