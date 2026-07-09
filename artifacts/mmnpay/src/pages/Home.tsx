import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Shield, Globe, Terminal, Zap, Check, Menu, X, ArrowRight } from 'lucide-react';
import { SiVisa, SiMastercard, SiPaypal, SiApplepay, SiGooglepay } from 'react-icons/si';
import { useLang } from '@/lib/language';
import { PaymentCard } from '@/components/PaymentCard';

export default function Home() {
  const { lang, t, toggleLang } = useLang();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRtl = lang === 'ar';

  return (
    <div className="min-h-screen bg-white font-sans text-[#425466] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-bold tracking-tight text-[#0a2540]">
            MMNPAY
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse text-sm font-semibold">
            <a href="#products" className="text-[#425466] hover:text-[#0a2540] transition-colors">{t.navProducts}</a>
            <a href="#developers" className="text-[#425466] hover:text-[#0a2540] transition-colors">{t.navDevelopers}</a>
            <a href="#pricing" className="text-[#425466] hover:text-[#0a2540] transition-colors">{t.navPricing}</a>
          </div>

          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <button onClick={toggleLang} className="text-sm font-bold text-[#425466] hover:text-[#0a2540]">
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <a href="#signin" className="text-sm font-semibold text-[#425466] hover:text-[#0a2540] transition-colors">
              {t.navSignIn}
            </a>
            <Link href="/checkout" className="px-5 py-2 bg-[#635bff] hover:bg-[#0a2540] rounded-full text-white transition-all text-sm font-semibold flex items-center gap-2">
              {t.navStartNow} <ArrowRight size={16} className={isRtl ? 'rotate-180' : ''} />
            </Link>
          </div>

          <button className="md:hidden text-[#0a2540]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 p-6 shadow-xl flex flex-col space-y-4 font-semibold text-[#0a2540]">
            <a href="#products">{t.navProducts}</a>
            <a href="#developers">{t.navDevelopers}</a>
            <a href="#pricing">{t.navPricing}</a>
            <div className="h-px bg-gray-100 my-2"></div>
            <button onClick={toggleLang} className="text-left rtl:text-right">{lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}</button>
            <a href="#signin">{t.navSignIn}</a>
            <Link href="/checkout" className="px-5 py-3 bg-[#635bff] text-white rounded-full text-center">
              {t.navStartNow}
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-[#635bff]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 text-[#0a2540] tracking-tight">
              {t.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-[#425466] mb-10 max-w-lg leading-relaxed">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/checkout" className="px-8 py-4 bg-[#635bff] hover:bg-[#0a2540] text-white rounded-full font-bold transition-all text-lg w-full sm:w-auto text-center flex justify-center items-center gap-2 group">
                {t.heroCtaPrimary}
                <ArrowRight size={20} className={`transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
              <a href="#sales" className="px-8 py-4 bg-transparent text-[#0a2540] hover:text-[#635bff] font-bold transition-all text-lg w-full sm:w-auto text-center flex justify-center items-center gap-2 group">
                {t.heroCtaSecondary}
                <ArrowRight size={20} className={`transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </a>
            </div>
          </motion.div>

          <div className="relative hidden lg:block h-[500px]">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <PaymentCard 
                cardNumber="•••• •••• •••• 4242"
                holderName="J. DOE"
                expiry="12/28"
                network="visa"
                variant="dark"
              />
            </motion.div>

            {/* Floating Toast */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-10 -left-10 bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center gap-4 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Check size={20} strokeWidth={3} />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0a2540]">Payment successful</div>
                <div className="text-sm text-[#425466]">€2,400.00 EUR</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="border-y border-gray-200 bg-[#f6f9fc] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-16 gap-y-8">
          {[t.metrics1, t.metrics2, t.metrics3, t.metrics4].map((metric, i) => (
            <div key={i} className="text-xl md:text-2xl font-display font-bold text-[#0a2540]">
              {metric}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0a2540] mb-16 max-w-2xl">
            {t.featuresHeading}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow">
              <Terminal className="text-[#635bff] mb-6" size={32} />
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">{t.feature1Title}</h3>
              <p className="text-[#425466] leading-relaxed">{t.feature1Desc}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow">
              <Zap className="text-[#635bff] mb-6" size={32} />
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">{t.feature2Title}</h3>
              <p className="text-[#425466] leading-relaxed">{t.feature2Desc}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow">
              <Globe className="text-[#635bff] mb-6" size={32} />
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">{t.feature3Title}</h3>
              <p className="text-[#425466] leading-relaxed">{t.feature3Desc}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow">
              <Shield className="text-[#635bff] mb-6" size={32} />
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">{t.feature4Title}</h3>
              <p className="text-[#425466] leading-relaxed">{t.feature4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-24 bg-[#f6f9fc]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0a2540] mb-4">
            {t.paymentMethodsTitle}
          </h2>
          <p className="text-lg text-[#425466] mb-16">{t.paymentMethodsSub}</p>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { icon: SiVisa, name: 'Visa' },
              { icon: SiMastercard, name: 'Mastercard' },
              { icon: SiPaypal, name: 'PayPal' },
              { icon: SiApplepay, name: 'Apple Pay' },
              { icon: SiGooglepay, name: 'Google Pay' },
              { icon: Shield, name: 'Bank Transfer' },
              { icon: Globe, name: 'SEPA' },
            ].map((method, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <method.icon size={24} className="text-[#0a2540]" />
                <span className="font-bold text-[#0a2540]">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Centerpiece */}
      <section className="py-32 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0a2540] leading-tight">
              Designed for conversion.
            </h2>
            <p className="text-xl text-[#425466] max-w-md">
              A meticulously engineered checkout experience that increases your revenue. Every input, transition, and animation is optimized to build trust.
            </p>
          </div>
          <div className="flex-1 relative h-[600px] w-full perspective-1000">
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <PaymentCard 
                cardNumber="•••• •••• •••• 8899"
                holderName="ALICE SMITH"
                expiry="09/25"
                network="mastercard"
                variant="gradient"
                className="-rotate-6"
              />
            </motion.div>
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mt-16 ml-16"
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <PaymentCard 
                cardNumber="•••• •••• •••• 1234"
                holderName="BOB JONES"
                expiry="11/27"
                network="visa"
                variant="light"
                className="rotate-6 scale-95"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0a2540] to-[#635bff] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            {t.startBuilding}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/checkout" className="px-8 py-4 bg-white text-[#0a2540] rounded-full font-bold text-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              {t.createAccount}
            </Link>
            <button className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              {t.talkToSales}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f6f9fc] pt-16 pb-8 px-6 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="font-bold text-[#0a2540] mb-4">{t.company}</h3>
            <ul className="space-y-3 text-[#425466]">
              <li><a href="#" className="hover:text-[#635bff]">About</a></li>
              <li><a href="#" className="hover:text-[#635bff]">Customers</a></li>
              <li><a href="#" className="hover:text-[#635bff]">Jobs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#0a2540] mb-4">{t.navProducts}</h3>
            <ul className="space-y-3 text-[#425466]">
              <li><a href="#" className="hover:text-[#635bff]">Payments</a></li>
              <li><a href="#" className="hover:text-[#635bff]">Billing</a></li>
              <li><a href="#" className="hover:text-[#635bff]">Connect</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#0a2540] mb-4">{t.navDevelopers}</h3>
            <ul className="space-y-3 text-[#425466]">
              <li><a href="#" className="hover:text-[#635bff]">Documentation</a></li>
              <li><a href="#" className="hover:text-[#635bff]">API Reference</a></li>
              <li><a href="#" className="hover:text-[#635bff]">Status</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#0a2540] mb-4">{t.legal}</h3>
            <ul className="space-y-3 text-[#425466]">
              <li><a href="#" className="hover:text-[#635bff]">Privacy</a></li>
              <li><a href="#" className="hover:text-[#635bff]">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="font-display font-bold text-xl text-[#0a2540] mb-4 md:mb-0">MMNPAY</div>
          <div className="text-[#425466] flex flex-col md:flex-row items-center gap-4">
            <button onClick={toggleLang} className="hover:text-[#0a2540] font-bold underline">
              {lang === 'en' ? 'Arabic' : 'English'}
            </button>
            <span>{t.copyright}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
