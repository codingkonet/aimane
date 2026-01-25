
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
    publish: { en: 'Publish', fr: 'Publier', ar: 'نشر' },
    
    // Auth Pages
    loginWelcome: { en: 'Welcome Back!', fr: 'Bon retour !', ar: 'مرحباً بعودتك!' },
    loginSubtitle: { en: 'Sign in to manage your budget.', fr: 'Connectez-vous pour gérer votre budget.', ar: 'سجل دخولك لإدارة ميزانيتك.' },
    loginError: { en: 'Invalid email or password.', fr: 'Email ou mot de passe invalide.', ar: 'البريد الإلكتروني أو كلمة المرور غير صالحة.' },
    emailLabel: { en: 'Email Address', fr: 'Adresse Email', ar: 'البريد الإلكتروني' },
    passwordLabel: { en: 'Password', fr: 'Mot de passe', ar: 'كلمة المرور' },
    noAccount: { en: "Don't have an account?", fr: "Pas encore de compte ?", ar: "ليس لديك حساب؟" },
    registerHere: { en: 'Register here', fr: 'Inscrivez-vous ici', ar: 'سجل هنا' },
    registerTitle: { en: 'Create Account', fr: 'Créer un compte', ar: 'إنشاء حساب' },
    registerSubtitle: { en: 'Join us and start saving today.', fr: 'Rejoignez-nous et commencez à épargner.', ar: 'انضم إلينا وابدأ التوفير اليوم.' },
    registerError: { en: 'Email already exists.', fr: 'Cet email existe déjà.', ar: 'البريد الإلكتروني موجود بالفعل.' },
    nameLabel: { en: 'Full Name', fr: 'Nom complet', ar: 'الاسم الكامل' },
    createAccountButton: { en: 'Create Account', fr: 'Créer le compte', ar: 'إنشاء الحساب' },
    hasAccount: { en: 'Already have an account?', fr: 'Déjà un compte ?', ar: 'لديك حساب بالفعل؟' },
    loginHere: { en: 'Login here', fr: 'Connectez-vous ici', ar: 'سجل دخولك هنا' },
    launchDemo: { en: 'Launch Demo', fr: 'Lancer la démo', ar: 'تشغيل العرض' },

    // Home Page
    homeWelcome: { en: 'Welcome to KoinCLICK', fr: 'Bienvenue sur KoinCLICK', ar: 'مرحباً بكم في KoinCLICK' },
    homeTitle: { en: 'Smart Budgeting for Everyone', fr: 'Le budget intelligent pour tous', ar: 'ميزانية ذكية للجميع' },
    homeSubtitle: { en: 'Track expenses, manage income, and visualize your wealth in multiple currencies with AI insights.', fr: 'Suivez vos dépenses, gérez vos revenus et visualisez votre richesse avec l\'IA.', ar: 'تتبع النفقات وإدارة الدخل وتصور ثروتك بعملات متعددة مع رؤى الذكاء الاصطناعي.' },
    featuresTitle: { en: 'Powerful Features', fr: 'Fonctionnalités puissantes', ar: 'ميزات قوية' },
    featureBudgeting: { en: 'Budgeting', fr: 'Budgétisation', ar: 'الميزانية' },
    featureBudgetingDesc: { en: 'Set monthly limits and stay on track with smart alerts.', fr: 'Fixez des limites mensuelles et suivez vos progrès.', ar: 'ضع حدوداً شهرية وابقَ على المسار الصحيح.' },
    featureMultiCurrency: { en: 'Multi-Currency', fr: 'Multi-devises', ar: 'عملات متعددة' },
    featureMultiCurrencyDesc: { en: 'Support for USD, EUR, and MAD with real-time conversion.', fr: 'Support de l\'USD, EUR et MAD avec conversion.', ar: 'دعم الدولار واليورو والدرهم مع تحويل مباشر.' },
    featureDarkMode: { en: 'Dark Mode', fr: 'Mode Sombre', ar: 'الوضع الليلي' },
    featureDarkModeDesc: { en: 'Easy on the eyes, day or night.', fr: 'Confortable pour vos yeux, jour et nuit.', ar: 'مريح للعين، ليلاً أو نهاراً.' },
    featurePWA: { en: 'PWA Support', fr: 'Support PWA', ar: 'دعم PWA' },
    featurePWADesc: { en: 'Install as a native app and use it offline.', fr: 'Installez comme une app native et utilisez hors ligne.', ar: 'ثبته كتطبيق واستخدمه بدون إنترنت.' },
    liveDemoTitle: { en: 'Manage Like a Pro', fr: 'Gérez comme un Pro', ar: 'أدر أموالك كمحترف' },
    plansTitle: { en: 'Choose Your Plan', fr: 'Choisissez Votre Plan', ar: 'اختر خطتك' },
    plansSubtitle: { en: 'Start for free and upgrade when you are ready for more power.', fr: 'Commencez gratuitement et mettez à niveau lorsque vous êtes prêt.', ar: 'ابدأ مجانًا وقم بالترقية عندما تكون جاهزًا لمزيد من القوة.' },
    freePlanTitle: { en: 'Free', fr: 'Gratuit', ar: 'مجاني' },
    freePlanPrice: { en: '$0', fr: '0€', ar: '0 د.م' },
    freePlanDesc: { en: 'For individuals starting their budgeting journey.', fr: 'Pour les particuliers qui commencent leur parcours budgétaire.', ar: 'للأفراد الذين يبدأون رحلتهم في الميزانية.' },
    proPlanName: { en: 'Pro', fr: 'Pro', ar: 'Pro' }, // Added for plan card title
    proPlanPrice: { en: '$5', fr: '5€', ar: '50 د.م' },
    proPlanDesc: { en: 'For power users who want advanced features.', fr: 'Pour les utilisateurs avancés qui veulent des fonctionnalités de pointe.', ar: 'للمستخدمين المتميزين الذين يريدون ميزات متقدمة.' },
    ctaGetStartedFree: { en: 'Get Started for Free', fr: 'Commencer Gratuitement', ar: 'ابدأ مجانًا' },
    ctaUpgradePro: { en: 'Upgrade to Pro', fr: 'Passer à Pro', ar: 'الترقية إلى Pro' },
    recommended: { en: 'Recommended', fr: 'Recommandé', ar: 'موصى به' },
    featureBasicTracking: { en: 'Basic Transaction Tracking', fr: 'Suivi des transactions de base', ar: 'تتبع المعاملات الأساسية' },
    featureStandardBudgeting: { en: 'Standard Budgeting Tools', fr: 'Outils de budgétisation standard', ar: 'أدوات الميزانية القياسية' },
    featureMultiCurrencySupport: { en: 'Multi-Currency Support', fr: 'Support multi-devises', ar: 'دعم متعدد العملات' },
    featureCommunityAccess: { en: 'Community Forum Access', fr: 'Accès au forum communautaire', ar: 'الوصول إلى منتدى المجتمع' },
    featureEverythingInFree: { en: 'Everything in Free, plus:', fr: 'Tout du plan Gratuit, plus :', ar: 'كل شيء في الخطة المجانية، بالإضافة إلى:' },
    featureAiAdvisor: { en: 'AI Financial Advisor', fr: 'Conseiller Financier IA', ar: 'مستشار مالي بالذكاء الاصطناعي' },
    featureUnlimitedAnalytics: { en: 'Unlimited Detailed Analytics', fr: 'Analyses détaillées illimitées', ar: 'تحليلات مفصلة غير محدودة' },
    featureRealtimeConverter: { en: 'Real-time Currency Converter', fr: 'Convertisseur de devises en temps réel', ar: 'محول عملات في الوقت الحقيقي' },
    featurePrioritySupport: { en: 'Priority Support', fr: 'Support prioritaire', ar: 'دعم ذو أولوية' },
    orGetTheApp: { en: 'Or get the app', fr: 'Ou obtenez l\'application', ar: 'أو احصل على التطبيق' },
    getAppEverywhere: { en: 'Get the App Everywhere', fr: 'Obtenez l\'application partout', ar: 'احصل على التطبيق في كل مكان' },
    appDescription: { en: 'Access your finances anywhere, anytime. Our app is available on modern browsers for a seamless experience.', fr: 'Accédez à vos finances partout, à tout moment. Notre application est disponible sur les navigateurs modernes pour une expérience fluide.', ar: 'الوصول إلى أموالك في أي مكان وفي أي وقت. تطبيقنا متاح على المتصفحات الحديثة لتجربة سلسة.' },
    installWebApp: { en: 'Install Web App', fr: 'Installer l\'App Web', ar: 'تثبيت تطبيق الويب' },

    // Pro Plan & Payments
    upgradeToPro: { en: 'Upgrade to Pro', fr: 'Passer au Pro', ar: 'الترقية إلى Pro' },
    goPro: { en: 'Go Pro', fr: 'Devenir Pro', ar: 'كن Pro' },
    proFeatures: { en: 'Pro Features', fr: 'Fonctionnalités Pro', ar: 'ميزات Pro' },
    aiAdvisor: { en: 'AI Financial Advisor', fr: 'Conseiller Financier IA', ar: 'مستشار مالي بالذكاء الاصilني' },
    aiSuggestedCategory: { en: 'Category suggested by AI', fr: 'Catégorie suggérée par l\'IA', ar: 'الفئة المقترحة بواسطة الذكاء الاصطناعي' },
    getAdvisorTips: { en: 'Get AI insights on your spending habits.', fr: 'Obtenez des conseils IA sur vos habitudes.', ar: 'احصل على رؤى الذكاء الاصطناعي حول عاداتك.' },
    addMoreTransactionsForAdvice: { en: 'Add at least 3 transactions to get personalized advice.', fr: 'Ajoutez au moins 3 transactions pour des conseils personnalisés.', ar: 'أضف 3 معاملات على الأقل للحصول على نصائح شخصية.' },
    noAiAdvice: { en: 'No specific advice at this time. Keep tracking your finances!', fr: 'Pas de conseil spécifique pour le moment. Continuez à suivre vos finances !', ar: 'لا توجد نصيحة محددة في هذا الوقت. استمر في تتبع أموالك!' },
    aiAdvisorError: { en: 'The AI Advisor is currently unavailable. Please try again later.', fr: 'Le conseiller IA est indisponible. Veuillez réessayer plus tard.', ar: 'مستشار الذكاء الاصطناعي غير متوفر حاليًا. يرجى المحاولة مرة أخرى لاحقًا.' },
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
    upgradeManualInstructions: { en: 'To upgrade, please complete the payment via PayPal. Your account will be manually upgraded by an administrator within 24 hours.', fr: 'Pour mettre à niveau, veuillez effectuer le paiement via PayPal. Votre compte sera mis à niveau manuellement par un administrateur dans les 24 heures.', ar: 'للترقية، يرجى إتمام الدفع عبر PayPal. سيتم ترقية حسابك يدويًا من قبل مسؤول في غضون 24 ساعة.' },
    contactSupport: { en: 'For faster processing, please contact support with your transaction ID.', fr: 'Pour un traitement plus rapide, veuillez contacter le support avec votre ID de transaction.', ar: ' لمعالجة أسرع، يرجى الاتصال بالدعم مع معرف المعاملة الخاص بك.' },

    // Admin
    adminPanel: { en: 'Admin Panel', fr: 'Panneau Admin', ar: 'لوحة التحكم' },
    platformSettings: { en: 'Platform Settings', fr: 'Paramètres Plateforme', ar: 'إعدادات المنصة' },
    proPricing: { en: 'Pro Plan Price', fr: 'Prix du plan Pro', ar: 'سعر باقة Pro' },
    paymentGateways: { en: 'Payment Gateways', fr: 'Passerelles de paiement', ar: 'بوابات الدفع' },
    totalUsers: { en: 'Total Users', fr: 'Total Utilisateurs', ar: 'إجمالي المستخدمين' },
    backToDashboard: { en: 'Back to Dashboard', fr: 'Retour au Tableau de bord', ar: 'العودة إلى لوحة القيادة' },
    userManagement: { en: 'User Management', fr: 'Gestion Utilisateurs', ar: 'إدارة المستخدمين' },
    adminActions: { en: 'Actions', fr: 'Actions', ar: 'إجراءات' },
    adminUpgrade: { en: 'Upgrade to Pro', fr: 'Passer en Pro', ar: 'الترقية إلى Pro' },
    adminDowngrade: { en: 'Downgrade to Free', fr: 'Rétrograder', ar: 'العودة إلى مجاني' },

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
    community: { en: 'Community', fr: 'Communauté', ar: 'المجتمع' },
    of: { en: 'of', fr: 'sur', ar: 'من' },
    left: { en: 'left', fr: 'restant', ar: 'متبقي' },
    overspent: { en: 'overspent', fr: 'dépassé', ar: 'تم تجاوزها' },
    noTransactions: { en: 'No transactions yet.', fr: 'Aucune transaction pour le moment.', ar: 'لا توجد معاملات بعد.' },
    noMatchingTransactions: { en: 'No matching transactions found.', fr: 'Aucune transaction correspondante.', ar: 'لا توجد معاملات مطابقة.' },
    noExpenseData: { en: 'No expense data to display.', fr: 'Aucune donnée de dépense.', ar: 'لا توجد بيانات نفقات لعرضها.' },

    // Import/Export
    import: { en: 'Import', fr: 'Importer', ar: 'استيراد' },
    export: { en: 'Export', fr: 'Exporter', ar: 'تصدير' },
    exportPDF: { en: 'Export as PDF', fr: 'Exporter en PDF', ar: 'تصدير كـ PDF' },
    exportExcel: { en: 'Export as CSV', fr: 'Exporter en CSV', ar: 'تصدير كـ CSV' },
    importSuccess: { en: 'Transactions imported successfully!', fr: 'Transactions importées avec succès !', ar: 'تم استيراد المعاملات بنجاح!' },
    importError: { en: 'Failed to import. Please check file format and content.', fr: 'Échec de l\'importation. Vérifiez le format et le contenu.', ar: 'فشل الاستيراد. يرجى التحقق من تنسيق الملف ومحتواه.' },

    // Filters
    filters: { en: 'Filters', fr: 'Filtres', ar: 'الفلاتر' },
    searchPlaceholder: { en: 'Search description...', fr: 'Rechercher une description...', ar: 'بحث في الوصف...' },
    allCategories: { en: 'All Categories', fr: 'Toutes les catégories', ar: 'جميع الفئات' },
    startDate: { en: 'Start Date', fr: 'Date de début', ar: 'تاريخ البدء' },
    endDate: { en: 'End Date', fr: 'Date de fin', ar: 'تاريخ الانتهاء' },
    resetFilters: { en: 'Reset', fr: 'Réinitialiser', ar: 'إعادة تعيين' },

    // Converter
    currencyConverter: { en: 'Currency Converter', fr: 'Convertisseur de devise', ar: 'محول العملات' },
    amountToConvert: { en: 'Amount to convert', fr: 'Montant à convertir', ar: 'المبلغ المراد تحويله' },
    convertTo: { en: 'Convert to', fr: 'Convertir en', ar: 'تحويل إلى' },
    convertButton: { en: 'Convert', fr: 'Convertir', ar: 'تحويل' },
    convertedAmount: { en: 'Converted Amount', fr: 'Montant converti', ar: 'المبلغ المحول' },

    // Income Sources (Pro)
    incomeSourcesTitle: { en: 'Income Sources', fr: 'Sources de Revenus', ar: 'مصادر الدخل' },
    addSource: { en: 'Add Source', fr: 'Ajouter Source', ar: 'إضافة مصدر' },
    updateSource: { en: 'Update Source', fr: 'Mettre à jour', ar: 'تحديث المصدر' },
    sourceName: { en: 'Source Name', fr: 'Nom de la source', ar: 'اسم المصدر' },
    expectedAmount: { en: 'Expected Amount', fr: 'Montant Attendu', ar: 'المبلغ المتوقع' },
    noIncomeSources: { en: 'No income sources added yet. Add one to start tracking!', fr: 'Aucune source de revenus. Ajoutez-en une pour commencer!', ar: 'لم تتم إضافة مصادر دخل بعد. أضف واحدة لبدء التتبع!' },

    // Blog
    createPost: { en: 'Create Post', fr: 'Créer un article', ar: 'إنشاء منشور' },
    backToBlog: { en: 'Back to Community', fr: 'Retour à la communauté', ar: 'العودة للمجتمع' },
    postTitle: { en: 'Title', fr: 'Titre', ar: 'العنوان' },
    postCategory: { en: 'Category', fr: 'Catégorie', ar: 'الفئة' },
    postContent: { en: 'Content', fr: 'Contenu', ar: 'المحتوى' },
    noArticles: { en: 'No posts yet. Be the first to share!', fr: 'Aucun article. Soyez le premier !', ar: 'لا توجد منشورات بعد. كن أول من يشارك!' },
    comments: { en: 'Comments', fr: 'Commentaires', ar: 'التعليقات' },
    addComment: { en: 'Post Comment', fr: 'Commenter', ar: 'إضافة تعليق' },
    readMore: { en: 'Read More', fr: 'Lire la suite', ar: 'اقرأ المزيد' },

    // PWA
    pwaBannerTitle: { en: 'Install KoinCLICK', fr: 'Installer KoinCLICK', ar: 'تثبيت KoinCLICK' },
    pwaAndroidInstructions: { en: 'Get a native experience and offline access.', fr: 'Accès hors ligne et expérience native.', ar: 'احصل على تجربة أصلية ووصول بدون إنترنت.' },
    pwaIOSInstructions: { en: 'Tap Share and then "Add to Home Screen".', fr: 'Appuyez sur Partager puis "Sur l\'écran d\'accueil".', ar: 'اضغط على مشاركة ثم "إضافة إلى الشاشة الرئيسية".' },

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
