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
