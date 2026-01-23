
import { Category } from './types';

const translationStrings = {
    // General
    login: { en: 'Login', fr: 'Connexion', ar: 'تسجيل الدخول' },
    register: { en: 'Register', fr: 'S\'inscrire', ar: 'تسجيل' },
    logout: { en: 'Logout', fr: 'Déconnexion', ar: 'تسجيل الخروج' },
    save: { en: 'Save', fr: 'Enregistrer', ar: 'حفظ' },
    cancel: { en: 'Cancel', fr: 'Annuler', ar: 'إلغاء' },
    dismiss: { en: 'Not Now', fr: 'Pas maintenant', ar: 'ليس الآن' },
    installNow: { en: 'Install Now', fr: 'Installer', ar: 'تثبيت الآن' },
    getStarted: { en: 'Get Started', fr: 'Commencer', ar: 'ابدأ الآن' },
    installApp: { en: 'Install', fr: 'Installer', ar: 'تثبيت' },
    copyright: { en: '© 2024 KoinCLICK. All rights reserved.', fr: '© 2024 KoinCLICK. Tous droits réservés.', ar: '© 2024 KoinCLICK. جميع الحقوق محفوظة.' },
    
    // Pro Plan & Payments
    upgradeToPro: { en: 'Upgrade to Pro', fr: 'Passer au Pro', ar: 'الترقية إلى Pro' },
    goPro: { en: 'Go Pro', fr: 'Devenir Pro', ar: 'كن Pro' },
    proFeatures: { en: 'Pro Features', fr: 'Fonctionnalités Pro', ar: 'ميزات Pro' },
    aiAdvisor: { en: 'AI Financial Advisor', fr: 'Conseiller Financier IA', ar: 'مستشار مالي بالذكاء الاصطناعي' },
    getAdvisorTips: { en: 'Get AI insights on your spending habits.', fr: 'Obtenez des conseils IA sur vos habitudes.', ar: 'احصل على رؤى الذكاء الاصطناعي حول عاداتك.' },
    proPlanTitle: { en: 'Unlock Your Full Potential', fr: 'Débloquez tout votre potentiel', ar: 'أطلق العنان لإمكانياتك الكاملة' },
    proPlanSubtitle: { en: 'Take control with advanced analytics and AI-powered insights.', fr: 'Prenez le contrôle avec des analyses avancées et l\'IA.', ar: 'تحكم مع التحليلات المتقدمة ورؤى الذكاء الاصطناعي.' },
    perMonth: { en: '/ month', fr: '/ mois', ar: '/ شهر' },
    payWithStripe: { en: 'Pay with Card', fr: 'Payer par Carte', ar: 'الدفع بالبطاقة' },
    payWithPaypal: { en: 'Pay with PayPal', fr: 'Payer avec PayPal', ar: 'الدفع بواسطة PayPal' },
    cardNumber: { en: 'Card Number', fr: 'Numéro de carte', ar: 'رقم البطاقة' },
    expiry: { en: 'Expiry (MM/YY)', fr: 'Expiration (MM/AA)', ar: 'انتهاء الصلاحية' },
    cvc: { en: 'CVC', fr: 'CVC', ar: 'رمز الأمان' },
    processing: { en: 'Processing...', fr: 'Traitement...', ar: 'جاري المعالجة...' },
    paymentSuccess: { en: 'Welcome to Pro!', fr: 'Bienvenue au Pro !', ar: 'مرحباً بك في Pro!' },

    // Admin
    adminPanel: { en: 'Admin Panel', fr: 'Panneau Admin', ar: 'لوحة التحكم' },
    platformSettings: { en: 'Platform Settings', fr: 'Paramètres Plateforme', ar: 'إعدادات المنصة' },
    proPricing: { en: 'Pro Plan Price', fr: 'Prix du plan Pro', ar: 'سعر باقة Pro' },
    paymentGateways: { en: 'Payment Gateways', fr: 'Passerelles de paiement', ar: 'بوابات الدفع' },
    totalUsers: { en: 'Total Users', fr: 'Total Utilisateurs', ar: 'إجمالي المستخدمين' },
    backToDashboard: { en: 'Back to Dashboard', fr: 'Retour au Tableau de bord', ar: 'العودة إلى لوحة القيادة' },

    // Dashboard
    totalIncome: { en: 'Total Income', fr: 'Revenu Total', ar: 'إجمالي الدخل' },
    totalExpenses: { en: 'Total Expenses', fr: 'Dépenses Totales', ar: 'إجمالي المصروفات' },
    balance: { en: 'Balance', fr: 'Solde', ar: 'الرصيد' },
    spendingOverview: { en: 'Spending Overview', fr: 'Aperçu des dépenses', ar: 'نظرة عامة على الإنفاق' },
    monthlyBudget: { en: 'Monthly Budget', fr: 'Budget Mensuel', ar: 'الميزانية الشهرية' },
    addTransaction: { en: 'Add Transaction', fr: 'Ajouter une transaction', ar: 'إضافة معاملة' },
    expense: { en: 'Expense', fr: 'Dépense', ar: 'مصروف' },
    income: { en: 'Income', fr: 'Revenu', ar: 'دخل' },
    description: { en: 'Description', fr: 'Description', ar: 'الوصف' },
    amount: { en: 'Amount', fr: 'Montant', ar: 'المبلغ' },
    category: { en: 'Category', fr: 'Catégorie', ar: 'الفئة' },
    addTransactionButton: { en: 'Add Transaction', fr: 'Ajouter la transaction', ar: 'إضافة المعاملة' },
    recentTransactions: { en: 'Recent Transactions', fr: 'Transactions récentes', ar: 'المعاملات الأخيرة' },
    language: { en: 'Language', fr: 'Langue', ar: 'اللغة' },
    currency: { en: 'Currency', fr: 'Devise', ar: 'العملة' },

    // Categories
    [Category.GROCERIES]: { en: 'Groceries', fr: 'Courses', ar: 'البقالة' },
    [Category.RESTAURANTS]: { en: 'Restaurants', fr: 'Restaurants', ar: 'مطاعم' },
    [Category.TRANSPORT]: { en: 'Transport', fr: 'Transport', ar: 'المواصلات' },
    [Category.RENT_MORTGAGE]: { en: 'Rent/Mortgage', fr: 'Loyer/Hypothèque', ar: 'إيجار/رهن عقاري' },
    [Category.UTILITIES]: { en: 'Utilities', fr: 'Services publics', ar: 'فواتير' },
    [Category.ENTERTAINMENT]: { en: 'Entertainment', fr: 'Divertissement', ar: 'ترفيه' },
    [Category.HEALTH]: { en: 'Health', fr: 'Santé', ar: 'صحة' },
    [Category.SHOPPING]: { en: 'Shopping', fr: 'Shopping', ar: 'تسوق' },
    [Category.EDUCATION]: { en: 'Education', fr: 'Éducation', ar: 'تعليم' },
    [Category.SAVINGS]: { en: 'Savings', fr: 'Épargne', ar: 'مدخرات' },
    [Category.DEBT_PAYMENT]: { en: 'Debt Payment', fr: 'Remboursement de dette', ar: 'سداد الديون' },
    [Category.OTHER_EXPENSE]: { en: 'Other Expense', fr: 'Autre dépense', ar: 'مصروفات أخرى' },
    [Category.SALARY]: { en: 'Salary', fr: 'Salaire', ar: 'راتب' },
    [Category.FREELANCE_INCOME]: { en: 'Freelance Income', fr: 'Revenu freelance', ar: 'دخل مستقل' },
    [Category.INVESTMENT_RETURNS]: { en: 'Investment Returns', fr: 'Revenus d\'investissement', ar: 'عوائد الاستثمار' },
    [Category.BUSINESS]: { en: 'Business', fr: 'Affaires', ar: 'أعمال' },
    [Category.GIFT]: { en: 'Gift', fr: 'Cadeau', ar: 'هدية' },
    [Category.OTHER_INCOME]: { en: 'Other Income', fr: 'Autre revenu', ar: 'دخل آخر' },
};

type TranslationSet = {
    [K in keyof typeof translationStrings]: string;
};

export type TranslationKey = keyof typeof translationStrings;

export const translations: { en: TranslationSet, fr: TranslationSet, ar: TranslationSet } = {
    en: {} as TranslationSet,
    fr: {} as TranslationSet,
    ar: {} as TranslationSet,
};

for (const key in translationStrings) {
    translations.en[key as TranslationKey] = translationStrings[key as TranslationKey].en;
    translations.fr[key as TranslationKey] = translationStrings[key as TranslationKey].fr;
    translations.ar[key as TranslationKey] = translationStrings[key as TranslationKey].ar;
}
