import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  navProducts: string;
  navDevelopers: string;
  navPricing: string;
  navSignIn: string;
  navStartNow: string;
  heroHeadline: string;
  heroSub: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  featuresHeading: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  metrics1: string;
  metrics2: string;
  metrics3: string;
  metrics4: string;
  paymentMethodsTitle: string;
  paymentMethodsSub: string;
  checkoutTitle: string;
  checkoutSummary: string;
  checkoutPayNow: string;
  checkoutSecure: string;
  startBuilding: string;
  createAccount: string;
  talkToSales: string;
  company: string;
  legal: string;
  copyright: string;
  howItWorksTitle: string;
  howItWorksSub: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  merchantTitle: string;
  merchantSub: string;
  merchant1Name: string;
  merchant1Desc: string;
  merchant2Name: string;
  merchant2Desc: string;
  merchant3Name: string;
  merchant3Desc: string;
  merchant4Name: string;
  merchant4Desc: string;
  devTitle: string;
  devSub: string;
  devBadge: string;
  pricingTitle: string;
  pricingSub: string;
  pricingCard: string;
  pricingNote: string;
  footerTagline: string;
  // Developer section
  devFeature1: string;
  devFeature2: string;
  devFeature3: string;
  devFeature4: string;
  devFeature5: string;
  devViewDocs: string;
  // Pricing section
  pricingLabel: string;
  pricingPerCharge: string;
  pricingFeature1: string;
  pricingFeature2: string;
  pricingFeature3: string;
  pricingFeature4: string;
  pricingFeature5: string;
  pricingFeature6: string;
  pricingGetStarted: string;
  pricingVolumeNote2: string;
  // Checkout
  checkoutSuccessTitle: string;
  checkoutSuccessDesc: string;
  checkoutReturnHome: string;
  checkoutPlanName: string;
  checkoutSubtotal: string;
  checkoutVat: string;
  checkoutTotal: string;
  checkoutEmailError: string;
  checkoutBadge1: string;
  checkoutBadge2: string;
  checkoutBadge3: string;
  checkoutPoweredBy: string;
  // Footer links
  footerAbout: string;
  footerCustomers: string;
  footerJobs: string;
  footerDocumentation: string;
  footerApiRef: string;
  footerStatus: string;
  footerPrivacy: string;
  footerTerms: string;
  footerSwitchToAr: string;
  footerSwitchToEn: string;
  // Pay link page
  payOrderDetails: string;
  paySecuredBy: string;
  payCompletePayment: string;
  paySelectMethod: string;
  payCard: string;
  payPayPal: string;
  payApplePay: string;
  payBankTransfer: string;
  payEmail: string;
  payEmailError: string;
  payCardNumber: string;
  payNameOnCard: string;
  payExpiry: string;
  payCvc: string;
  payNow: string;
  payCancel: string;
  payProcessing: string;
  paySuccessTitle: string;
  paySuccessDesc: string;
  payBackHome: string;
  payNotFound: string;
  payNotFoundDesc: string;
  payPayPalDesc: string;
  payApplePayDesc: string;
  payBankName: string;
  payBankIban: string;
  payBankRef: string;
  payBankNote: string;
  payMerchant: string;
  payAmount: string;
  payDescription: string;
}

const translations: Record<Language, Translations> = {
  en: {
    navProducts: "Products",
    navDevelopers: "Developers",
    navPricing: "Pricing",
    navSignIn: "Sign In",
    navStartNow: "Start now",
    heroHeadline: "Payments infrastructure for the internet",
    heroSub: "Millions of businesses of all sizes use MMNPAY to accept payments, send payouts, and automate financial processes.",
    heroCtaPrimary: "Start now",
    heroCtaSecondary: "Contact sales",
    featuresHeading: "Why businesses choose MMNPAY",
    feature1Title: "Unified platform",
    feature1Desc: "Accept payments online, in person, and around the world with a single integration.",
    feature2Title: "Built for developers",
    feature2Desc: "Extensive APIs and SDKs to get you up and running in minutes.",
    feature3Title: "Global by default",
    feature3Desc: "135+ currencies, local payment methods, and automatic currency conversion.",
    feature4Title: "Enterprise security",
    feature4Desc: "PCI DSS Level 1 certified. Bank-grade encryption on every transaction.",
    metrics1: "135+ currencies",
    metrics2: "99.99% uptime",
    metrics3: "2M+ businesses",
    metrics4: "190+ countries",
    paymentMethodsTitle: "Accept every payment type",
    paymentMethodsSub: "Support the payment methods your customers prefer.",
    checkoutTitle: "Complete payment",
    checkoutSummary: "Order summary",
    checkoutPayNow: "Pay now",
    checkoutSecure: "Secure payment powered by MMNPAY",
    startBuilding: "Start building today",
    createAccount: "Create account",
    talkToSales: "Talk to sales",
    company: "Company",
    legal: "Legal",
    copyright: "© 2026 MMNPAY. All rights reserved.",
    howItWorksTitle: "How it works",
    howItWorksSub: "Simple, fast, and built for scale.",
    step1Title: "Create your account",
    step1Desc: "Sign up in minutes. No paperwork, no waiting.",
    step2Title: "Integrate once",
    step2Desc: "Use our APIs and SDKs to connect MMNPAY to your platform in any language.",
    step3Title: "Accept payments",
    step3Desc: "Start collecting payments globally the moment you go live.",
    step4Title: "Get paid",
    step4Desc: "Funds settle to your bank account on a predictable schedule.",
    merchantTitle: "Built for every business",
    merchantSub: "From solo founders to enterprise. MMNPAY scales with you.",
    merchant1Name: "Startups",
    merchant1Desc: "Launch fast with our no-code tools and instant approval.",
    merchant2Name: "E-commerce",
    merchant2Desc: "Sell online globally with optimised conversion checkout flows.",
    merchant3Name: "Marketplaces",
    merchant3Desc: "Split payments and pay out sellers automatically.",
    merchant4Name: "Enterprise",
    merchant4Desc: "Custom contracts, dedicated support, and volume pricing.",
    devTitle: "Built for developers",
    devSub: "Integrate in minutes. Ship in hours.",
    devBadge: "REST API · SDKs · Webhooks · CLI",
    pricingTitle: "Simple, transparent pricing",
    pricingSub: "No setup fees. No monthly fees. Pay only when you earn.",
    pricingCard: "1.4% + €0.25 per successful card charge",
    pricingNote: "Volume discounts available for high-growth businesses.",
    footerTagline: "The payments infrastructure for the internet.",
    devFeature1: "Comprehensive REST API with OpenAPI spec",
    devFeature2: "Official SDKs: Node.js, Python, PHP, Ruby, Go, Java",
    devFeature3: "Real-time webhooks and event streaming",
    devFeature4: "Interactive API explorer and sandbox environment",
    devFeature5: "PCI DSS Level 1 certified infrastructure",
    devViewDocs: "View documentation",
    pricingLabel: "Card payments",
    pricingPerCharge: "per successful charge",
    pricingFeature1: "All major card networks",
    pricingFeature2: "135+ currencies accepted",
    pricingFeature3: "Real-time fraud protection",
    pricingFeature4: "Instant settlement options",
    pricingFeature5: "Free dashboard and reporting",
    pricingFeature6: "24/7 technical support",
    pricingGetStarted: "Get started free",
    pricingVolumeNote2: "Volume pricing available — contact sales",
    checkoutSuccessTitle: "Payment Successful",
    checkoutSuccessDesc: "Thank you for your purchase. A receipt has been sent to your email.",
    checkoutReturnHome: "Return to Home",
    checkoutPlanName: "MMNPAY Pro Plan",
    checkoutSubtotal: "Subtotal",
    checkoutVat: "VAT (5%)",
    checkoutTotal: "Total",
    checkoutEmailError: "Please enter a valid email address",
    checkoutBadge1: "PCI DSS Level 1",
    checkoutBadge2: "256-bit SSL",
    checkoutBadge3: "3D Secure",
    checkoutPoweredBy: "Powered by MMNPAY",
    footerAbout: "About",
    footerCustomers: "Customers",
    footerJobs: "Jobs",
    footerDocumentation: "Documentation",
    footerApiRef: "API Reference",
    footerStatus: "Status",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
    footerSwitchToAr: "Arabic",
    footerSwitchToEn: "English",
    payOrderDetails: "Order details",
    paySecuredBy: "Secured by MMNPAY",
    payCompletePayment: "Complete your payment",
    paySelectMethod: "Payment method",
    payCard: "Card",
    payPayPal: "PayPal",
    payApplePay: "Apple Pay",
    payBankTransfer: "Bank Transfer",
    payEmail: "Email address",
    payEmailError: "Please enter a valid email address",
    payCardNumber: "Card number",
    payNameOnCard: "Name on card",
    payExpiry: "Expiry",
    payCvc: "CVC",
    payNow: "Pay now",
    payCancel: "Cancel",
    payProcessing: "Processing...",
    paySuccessTitle: "Payment complete",
    paySuccessDesc: "Your payment was processed successfully.",
    payBackHome: "Back to home",
    payNotFound: "Payment link not found",
    payNotFoundDesc: "This payment link is invalid or has expired.",
    payPayPalDesc: "You'll be redirected to PayPal to complete your purchase securely.",
    payApplePayDesc: "Tap the button below to complete your purchase with Apple Pay.",
    payBankName: "Bank name",
    payBankIban: "IBAN",
    payBankRef: "Reference",
    payBankNote: "Include the reference number with your transfer.",
    payMerchant: "Merchant",
    payAmount: "Amount",
    payDescription: "Description",
  },
  ar: {
    navProducts: "المنتجات",
    navDevelopers: "المطورين",
    navPricing: "الأسعار",
    navSignIn: "تسجيل الدخول",
    navStartNow: "ابدأ الآن",
    heroHeadline: "البنية التحتية للمدفوعات عبر الإنترنت",
    heroSub: "تستخدم ملايين الشركات بمختلف أحجامها MMNPAY لقبول المدفوعات وإرسال العوائد وأتمتة العمليات المالية.",
    heroCtaPrimary: "ابدأ الآن",
    heroCtaSecondary: "اتصل بالمبيعات",
    featuresHeading: "لماذا تختار الشركات MMNPAY",
    feature1Title: "منصة موحدة",
    feature1Desc: "اقبل المدفوعات عبر الإنترنت، شخصيًا، وحول العالم من خلال تكامل واحد.",
    feature2Title: "مصمم للمطورين",
    feature2Desc: "واجهات برمجة تطبيقات وحزم تطوير برمجيات شاملة لتبدأ في دقائق.",
    feature3Title: "عالمي افتراضياً",
    feature3Desc: "أكثر من 135 عملة، طرق دفع محلية، وتحويل تلقائي للعملات.",
    feature4Title: "أمان على مستوى المؤسسات",
    feature4Desc: "حاصل على شهادة PCI DSS المستوى 1. تشفير على مستوى البنوك لكل معاملة.",
    metrics1: "+135 عملة",
    metrics2: "99.99% وقت التشغيل",
    metrics3: "+2 مليون شركة",
    metrics4: "+190 دولة",
    paymentMethodsTitle: "اقبل جميع أنواع الدفع",
    paymentMethodsSub: "ادعم طرق الدفع التي يفضلها عملاؤك.",
    checkoutTitle: "إتمام الدفع",
    checkoutSummary: "ملخص الطلب",
    checkoutPayNow: "ادفع الآن",
    checkoutSecure: "دفع آمن مدعوم من MMNPAY",
    startBuilding: "ابدأ البناء اليوم",
    createAccount: "إنشاء حساب",
    talkToSales: "تحدث إلى المبيعات",
    company: "الشركة",
    legal: "قانوني",
    copyright: "© 2026 MMNPAY. جميع الحقوق محفوظة.",
    howItWorksTitle: "كيف يعمل",
    howItWorksSub: "بسيط، سريع، ومصمم للتوسع.",
    step1Title: "أنشئ حسابك",
    step1Desc: "سجل في دقائق. بدون أوراق، وبدون انتظار.",
    step2Title: "دمج مرة واحدة",
    step2Desc: "استخدم واجهات برمجة التطبيقات وحزم التطوير الخاصة بنا لربط MMNPAY بمنصتك بأي لغة.",
    step3Title: "اقبل المدفوعات",
    step3Desc: "ابدأ في تحصيل المدفوعات عالمياً بمجرد إطلاق خدمتك.",
    step4Title: "احصل على أموالك",
    step4Desc: "تستقر الأموال في حسابك البنكي وفق جدول زمني متوقع.",
    merchantTitle: "مصمم لكل الأعمال",
    merchantSub: "من المؤسسين المستقلين إلى الشركات الكبرى. MMNPAY يتوسع معك.",
    merchant1Name: "الشركات الناشئة",
    merchant1Desc: "انطلق بسرعة مع أدواتنا الخالية من التعليمات البرمجية والموافقة الفورية.",
    merchant2Name: "التجارة الإلكترونية",
    merchant2Desc: "بع عبر الإنترنت عالمياً مع تدفقات دفع محسنة لزيادة التحويل.",
    merchant3Name: "الأسواق",
    merchant3Desc: "قسّم المدفوعات وادفع للبائعين تلقائياً.",
    merchant4Name: "الشركات الكبرى",
    merchant4Desc: "عقود مخصصة، دعم مخصص، وأسعار تعتمد على الحجم.",
    devTitle: "مصمم للمطورين",
    devSub: "ادمج في دقائق. أطلق في ساعات.",
    devBadge: "REST API · حزم SDK · Webhooks · واجهة سطر الأوامر (CLI)",
    pricingTitle: "تسعير بسيط وشفاف",
    pricingSub: "بدون رسوم إعداد. بدون رسوم شهرية. ادفع فقط عندما تكسب.",
    pricingCard: "1.4% + 0.25 يورو لكل عملية دفع ناجحة بالبطاقة",
    pricingNote: "تتوفر خصومات على الحجم للشركات ذات النمو السريع.",
    footerTagline: "البنية التحتية للمدفوعات عبر الإنترنت.",
    devFeature1: "واجهة برمجة REST شاملة مع مواصفات OpenAPI",
    devFeature2: "حزم SDK رسمية: Node.js، Python، PHP، Ruby، Go، Java",
    devFeature3: "الإشعارات الفورية عبر Webhooks وبث الأحداث",
    devFeature4: "مستكشف API تفاعلي وبيئة اختبار",
    devFeature5: "بنية تحتية معتمدة بـ PCI DSS المستوى 1",
    devViewDocs: "عرض التوثيق",
    pricingLabel: "مدفوعات البطاقات",
    pricingPerCharge: "لكل عملية ناجحة",
    pricingFeature1: "جميع شبكات البطاقات الرئيسية",
    pricingFeature2: "أكثر من 135 عملة مقبولة",
    pricingFeature3: "حماية فورية من الاحتيال",
    pricingFeature4: "خيارات تسوية فورية",
    pricingFeature5: "لوحة تحكم وتقارير مجانية",
    pricingFeature6: "دعم تقني على مدار الساعة",
    pricingGetStarted: "ابدأ مجاناً",
    pricingVolumeNote2: "أسعار الحجم متاحة — تواصل مع فريق المبيعات",
    checkoutSuccessTitle: "تمت عملية الدفع بنجاح",
    checkoutSuccessDesc: "شكراً لشرائك. تم إرسال إيصال إلى بريدك الإلكتروني.",
    checkoutReturnHome: "العودة إلى الرئيسية",
    checkoutPlanName: "خطة MMNPAY الاحترافية",
    checkoutSubtotal: "المجموع الجزئي",
    checkoutVat: "ضريبة القيمة المضافة (5%)",
    checkoutTotal: "الإجمالي",
    checkoutEmailError: "يرجى إدخال عنوان بريد إلكتروني صحيح",
    checkoutBadge1: "PCI DSS المستوى 1",
    checkoutBadge2: "تشفير 256-bit",
    checkoutBadge3: "3D Secure",
    checkoutPoweredBy: "مدعوم من MMNPAY",
    footerAbout: "من نحن",
    footerCustomers: "عملاؤنا",
    footerJobs: "وظائف",
    footerDocumentation: "التوثيق",
    footerApiRef: "مرجع API",
    footerStatus: "الحالة",
    footerPrivacy: "الخصوصية",
    footerTerms: "الشروط",
    footerSwitchToAr: "العربية",
    footerSwitchToEn: "الإنجليزية",
  }
};

interface LanguageContextType {
  lang: Language;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LanguageProvider');
  }
  return context;
}
