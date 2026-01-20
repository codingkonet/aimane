
import { Category } from './types';

const translationStrings = {
    // General
    login: { en: 'Login', fr: 'Connexion', ar: 'تسجيل الدخول' },
    register: { en: 'Register', fr: 'S\'inscrire', ar: 'تسجيل' },
    logout: { en: 'Logout', fr: 'Déconnexion', ar: 'تسجيل الخروج' },
    save: { en: 'Save', fr: 'Enregistrer', ar: 'حفظ' },
    cancel: { en: 'Cancel', fr: 'Annuler', ar: 'إلغاء' },
    // Home Page
    homeWelcome: { en: 'Welcome to Mizani', fr: 'Bienvenue sur Mizani', ar: 'مرحباً بك في ميزاني' },
    homeSubtitle: { en: 'Your personal finance companion. Take control of your money by tracking your income, managing expenses, and visualizing your spending habits.', fr: 'Votre compagnon financier personnel. Prenez le contrôle de votre argent en suivant vos revenus, en gérant vos dépenses et en visualisant vos habitudes de consommation.', ar: 'رفيقك المالي الشخصي. تحكم في أموالك عن طريق تتبع دخلك وإدارة نفقاتك وتصور عادات الإنفاق لديك.' },
    // Login Page
    loginWelcome: { en: 'Welcome Back!', fr: 'Content de vous revoir !', ar: 'مرحبا بعودتك!' },
    loginSubtitle: { en: 'Sign in to manage your finances.', fr: 'Connectez-vous pour gérer vos finances.', ar: 'سجل الدخول لإدارة أموالك.' },
    emailLabel: { en: 'Email', fr: 'E-mail', ar: 'البريد الإلكتروني' },
    passwordLabel: { en: 'Password', fr: 'Mot de passe', ar: 'كلمة المرور' },
    loginError: { en: 'Invalid email or password.', fr: 'Email ou mot de passe invalide.', ar: 'البريد الإلكتر الإلكتروني أو كلمة المرور غير صالحة.' },
    noAccount: { en: 'Don\'t have an account?', fr: 'Pas encore de compte ?', ar: 'ليس لديك حساب؟' },
    registerHere: { en: 'Register here', fr: 'Inscrivez-vous ici', ar: 'سجل هنا' },
    // Register Page
    registerTitle: { en: 'Create Your Account', fr: 'Créez votre compte', ar: 'أنشئ حسابك' },
    registerSubtitle: { en: 'Start your journey to financial freedom.', fr: 'Commencez votre voyage vers la liberté financière.', ar: 'ابدأ رحلتك نحو الحرية المالية.' },
    nameLabel: { en: 'Name', fr: 'Nom', ar: 'الاسم' },
    registerError: { en: 'An account with this email already exists.', fr: 'Un compte avec cet email existe déjà.', ar: 'يوجد حساب بهذا البريد الإلكتروني بالفعل.' },
    createAccountButton: { en: 'Create Account', fr: 'Créer un compte', ar: 'إنشاء حساب' },
    hasAccount: { en: 'Already have an account?', fr: 'Vous avez déjà un compte ?', ar: 'هل لديك حساب بالفعل؟' },
    loginHere: { en: 'Login here', fr: 'Connectez-vous ici', ar: 'سجل الدخول هنا' },
    // Dashboard
    totalIncome: { en: 'Total Income', fr: 'Revenu Total', ar: 'إجمالي الدخل' },
    totalExpenses: { en: 'Total Expenses', fr: 'Dépenses Totales', ar: 'إجمالي المصروفات' },
    balance: { en: 'Balance', fr: 'Solde', ar: 'الرصيد' },
    spendingOverview: { en: 'Spending Overview', fr: 'Aperçu des dépenses', ar: 'نظرة عامة على الإنفاق' },
    monthlyBudget: { en: 'Monthly Budget', fr: 'Budget Mensuel', ar: 'الميزانية الشهرية' },
    of: { en: 'of', fr: 'de', ar: 'من' },
    left: { en: 'left', fr: 'restant', ar: 'متبقي' },
    overspent: { en: 'overspent', fr: 'dépassé', ar: 'متجاوز' },
    addTransaction: { en: 'Add Transaction', fr: 'Ajouter une transaction', ar: 'إضافة معاملة' },
    expense: { en: 'Expense', fr: 'Dépense', ar: 'مصروف' },
    income: { en: 'Income', fr: 'Revenu', ar: 'دخل' },
    description: { en: 'Description', fr: 'Description', ar: 'الوصف' },
    amount: { en: 'Amount', fr: 'Montant', ar: 'المبلغ' },
    category: { en: 'Category', fr: 'Catégorie', ar: 'الفئة' },
    addTransactionButton: { en: 'Add Transaction', fr: 'Ajouter la transaction', ar: 'إضافة المعاملة' },
    recentTransactions: { en: 'Recent Transactions', fr: 'Transactions récentes', ar: 'المعاملات الأخيرة' },
    noTransactions: { en: 'No transactions yet. Add one to get started!', fr: 'Aucune transaction pour le moment. Ajoutez-en une pour commencer !', ar: 'لا توجد معاملات حتى الآن. أضف واحدة للبدء!' },
    noExpenseData: { en: 'No expense data to display.', fr: 'Aucune donnée de dépense à afficher.', ar: 'لا توجد بيانات نفقات لعرضها.' },
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
