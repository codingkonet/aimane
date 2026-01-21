
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
    // Data Management
    exportData: { en: 'Export Data', fr: 'Exporter les données', ar: 'تصدير البيانات' },
    importData: { en: 'Import Data', fr: 'Importer des données', ar: 'استيراد البيانات' },
    importSuccess: { en: 'Data imported successfully!', fr: 'Données importées avec succès !', ar: 'تم استيراد البيانات بنجاح!' },
    importError: { en: 'Invalid file format.', fr: 'Format de fichier invalide.', ar: 'تنسيق ملف غير صالح.' },
    confirmImport: { en: 'This will replace your current data. Continue?', fr: 'Cela remplacera vos données actuelles. Continuer ?', ar: 'سيؤدي هذا إلى استبدال بياناتك الحالية. هل تريد الاستمرار؟' },
    // Blog
    community: { en: 'Community Blog', fr: 'Blog Communautaire', ar: 'مدونة المجتمع' },
    createPost: { en: 'Write Article', fr: 'Écrire un article', ar: 'كتابة مقال' },
    readMore: { en: 'Read More', fr: 'Lire la suite', ar: 'اقرأ المزيد' },
    publish: { en: 'Publish Article', fr: 'Publier l\'article', ar: 'نشر المقال' },
    postTitle: { en: 'Article Title', fr: 'Titre de l\'article', ar: 'عنوان المقال' },
    postContent: { en: 'Content', fr: 'Contenu', ar: 'المحتوى' },
    postCategory: { en: 'Category', fr: 'Catégorie', ar: 'الفئة' },
    comments: { en: 'Comments', fr: 'Commentaires', ar: 'تعليقات' },
    addComment: { en: 'Add Comment', fr: 'Ajouter un commentaire', ar: 'إضافة تعليق' },
    noArticles: { en: 'No articles yet. Be the first to share!', fr: 'Aucun article pour le moment. Soyez le premier à partager !', ar: 'لا توجد مقالات بعد. كن أول من يشارك!' },
    backToBlog: { en: 'Back to Blog', fr: 'Retour au Blog', ar: 'العودة للمدونة' },
    // PWA Banner
    pwaBannerTitle: { en: 'Install KoinCLICK App', fr: 'Installer l\'appli KoinCLICK', ar: 'تثبيت تطبيق KoinCLICK' },
    pwaAndroidInstructions: { en: 'Add to home screen for a better experience and offline access.', fr: 'Ajoutez à l\'écran d\'accueil pour une meilleure expérience.', ar: 'أضفه إلى الشاشة الرئيسية للحصول على تجربة أفضل.' },
    pwaIOSInstructions: { en: 'Tap the share button and select "Add to Home Screen".', fr: 'Appuyez sur "Partager" puis sur "Sur l\'écran d\'accueil".', ar: 'اضغط على زر المشاركة واختر "إضافة إلى الشاشة الرئيسية".' },
    // Home Page
    homeWelcome: { en: 'Welcome to KoinCLICK', fr: 'Bienvenue sur KoinCLICK', ar: 'مرحباً بك في KoinCLICK' },
    homeTitle: { en: 'Master Your Money, Simply.', fr: 'Maîtrisez votre argent, simplement.', ar: 'تحكم في أموالك ببساطة.' },
    homeSubtitle: { en: 'Your personal finance companion. Take control of your money by tracking your income, managing expenses, and visualizing your spending habits.', fr: 'Votre compagnon financier personnel. Prenez le contrôle de votre argent en suivant vos revenus, en gérant vos dépenses et en visualisant vos habitudes de consommation.', ar: 'رفيقك المالي الشخصي. تحكم في أموالك عن طريق تتبع دخلك وإدارة نفقاتك وتصور عادات الإنفاق لديك.' },
    featuresTitle: { en: 'Why You\'ll Love KoinCLICK', fr: 'Pourquoi vous allez adorer KoinCLICK', ar: 'لماذا ستحب KoinCLICK' },
    featureBudgeting: { en: 'Smart Budgeting', fr: 'Budgétisation Intelligente', ar: 'ميزانية ذكية' },
    featureBudgetingDesc: { en: 'Create monthly budgets and track your spending to stay on top of your financial goals.', fr: 'Créez des budgets mensuels et suivez vos dépenses pour atteindre vos objectifs financiers.', ar: 'أنشئ ميزانيات شهرية وتتبع إنفاقك لتحقيق أهدافك المالية.' },
    featureMultiCurrency: { en: 'Multi-Currency', fr: 'Multi-devises', ar: 'متعدد العملات' },
    featureMultiCurrencyDesc: { en: 'Manage your finances in multiple currencies with real-time conversion rates.', fr: 'Gérez vos finances en plusieurs devises avec des taux de conversion en temps réel.', ar: 'أدر أموالك بعملات متعددة مع أسعار تحويل فورية.' },
    featureDarkMode: { en: 'Dark Mode', fr: 'Mode Sombre', ar: 'الوضع الداكن' },
    featureDarkModeDesc: { en: 'Enjoy a comfortable viewing experience in low-light environments with our sleek dark theme.', fr: 'Profitez d\'une expérience visuelle confortable dans des environnements peu éclairés avec notre thème sombre élégant.', ar: 'استمتع بتجربة مشاهدة مريحة في البيئات منخفضة الإضاءة مع تصميمنا الداكن الأنيق.' },
    featurePWA: { en: 'Installable App', fr: 'Application Installable', ar: 'تطبيق قابل للتثبيت' },
    featurePWADesc: { en: 'Install KoinCLICK on any device for a native app experience, including offline access.', fr: 'Installez KoinCLICK sur n\'importe quel appareil pour une expérience d\'application native, y compris l\'accès hors ligne.', ar: 'ثبت KoinCLICK على أي جهاز لتجربة تشبه التطبيقات الأصلية، بما في ذلك الوصول دون اتصال بالإنترنت.' },
    liveDemoTitle: { en: 'See It In Action', fr: 'Voyez-le en action', ar: 'شاهده قيد التشغيل' },
    // Admin Dashboard
    adminPanel: { en: 'Admin Panel', fr: 'Panneau Admin', ar: 'لوحة التحكم' },
    totalUsers: { en: 'Total Users', fr: 'Total Utilisateurs', ar: 'إجمالي المستخدمين' },
    platformStats: { en: 'Platform Statistics', fr: 'Statistiques Plateforme', ar: 'إحصائيات المنصة' },
    userManagement: { en: 'User Management', fr: 'Gestion Utilisateurs', ar: 'إدارة المستخدمين' },
    backToDashboard: { en: 'Back to Dashboard', fr: 'Retour au Tableau de bord', ar: 'العودة إلى لوحة القيادة' },
    registeredDate: { en: 'Registered On', fr: 'Inscrit le', ar: 'تاريخ التسجيل' },
    noUsersFound: { en: 'No users registered yet.', fr: 'Aucun utilisateur inscrit.', ar: 'لا يوجد مستخدمين مسجلين بعد.' },
    // Login Page
    loginWelcome: { en: 'Welcome Back!', fr: 'Content de vous revoir !', ar: 'مرحبا بعودتك!' },
    loginSubtitle: { en: 'Sign in to manage your finances.', fr: 'Connectez-vous pour gérer vos finances.', ar: 'سجل الدخول لإدارة أموالك.' },
    emailLabel: { en: 'Email', fr: 'E-mail', ar: 'البريد الإلكتروني' },
    passwordLabel: { en: 'Password', fr: 'Mot de passe', ar: 'كلمة المرور' },
    loginError: { en: 'Invalid email or password.', fr: 'Email ou mot de passe invalide.', ar: 'البريد الإلكتروني أو كلمة المرور غير صالحة.' },
    noAccount: { en: 'Don\'t have an account?', fr: 'Pas encore de compte ?', ar: 'ليس لديك حساب؟' },
    registerHere: { en: 'Register here', fr: 'Inscrivez-vous ici', ar: 'سجل هنا' },
    // Register Page
    registerTitle: { en: 'Create Your Account', fr: 'Créez votre compte', ar: 'أنشئ حسابك' },
    // Fix: Removed duplicate 'ar' property and cleaned up text.
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
    noMatchingTransactions: { en: 'No matching transactions found.', fr: 'Aucune transaction correspondante trouvée.', ar: 'لم يتم العثور على معاملات مطابقة.' },
    // FIX: Removed duplicate 'ar' property which caused a syntax error.
    noExpenseData: { en: 'No expense data to display.', fr: 'Aucune donnée de dépense à afficher.', ar: 'لا توجد بيانات نفقات لعرضها.' },
    language: { en: 'Language', fr: 'Langue', ar: 'اللغة' },
    currency: { en: 'Currency', fr: 'Devise', ar: 'العملة' },
    filters: { en: 'Filters', fr: 'Filtres', ar: 'عوامل التصفية' },
    searchPlaceholder: { en: 'Search by description...', fr: 'Rechercher par description...', ar: 'البحث بالوصف...' },
    allCategories: { en: 'All Categories', fr: 'Toutes les catégories', ar: 'جميع الفئات' },
    startDate: { en: 'Start Date', fr: 'Date de début', ar: 'تاريخ البدء' },
    endDate: { en: 'End Date', fr: 'Date de fin', ar: 'تاريخ الانتهاء' },
    resetFilters: { en: 'Reset Filters', fr: 'Réinitialiser les filtres', ar: 'إعادة تعيين عوامل التصفية' },
    currencyConverter: { en: 'Currency Converter', fr: 'Convertisseur de devises', ar: 'محول العملات' },
    amountToConvert: { en: 'Amount to Convert', fr: 'Montant à convertir', ar: 'المبلغ المراد تحويله' },
    convertTo: { en: 'Convert to', fr: 'Convertir en', ar: 'تحويل الى' },
    convertButton: { en: 'Convert', fr: 'Convertir', ar: 'تحويل' },
    convertedAmount: { en: 'Converted Amount', fr: 'Montant converti', ar: 'المبلغ المحول' },
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
