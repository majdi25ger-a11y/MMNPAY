import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Shield, Globe, Terminal, Zap, Check, Menu, X, ArrowRight, CheckCircle2, Rocket, ShoppingCart, LayoutGrid, Building2 } from 'lucide-react';
import { SiVisa, SiMastercard, SiPaypal, SiApplepay, SiGooglepay, SiAmericanexpress } from 'react-icons/si';
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
            <a href="#how-it-works" className="text-[#425466] hover:text-[#0a2540] transition-colors">{t.howItWorksTitle}</a>
            <a href="#merchants" className="text-[#425466] hover:text-[#0a2540] transition-colors">{t.navProducts}</a>
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
            <Link href="/checkout" className="px-5 py-2 bg-[#635bff] hover:bg-[#0a2540] rounded-full text-white transition-all text-sm font-semibold flex items-center gap-2 group">
              {t.navStartNow} <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>

          <button className="md:hidden text-[#0a2540]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 p-6 shadow-xl flex flex-col space-y-4 font-semibold text-[#0a2540]">
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>{t.howItWorksTitle}</a>
            <a href="#merchants" onClick={() => setIsMobileMenuOpen(false)}>{t.navProducts}</a>
            <a href="#developers" onClick={() => setIsMobileMenuOpen(false)}>{t.navDevelopers}</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>{t.navPricing}</a>
            <div className="h-px bg-gray-100 my-2"></div>
            <button onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }} className="text-left rtl:text-right">{lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}</button>
            <a href="#signin" onClick={() => setIsMobileMenuOpen(false)}>{t.navSignIn}</a>
            <Link href="/checkout" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3 bg-[#635bff] text-white rounded-full text-center">
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

      {/* How it works */}
      <section id="how-it-works" className="py-24 md:py-32 bg-[#f6f9fc] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0a2540] mb-4">
              {t.howItWorksTitle}
            </h2>
            <p className="text-lg text-[#425466]">{t.howItWorksSub}</p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-10 left-16 right-16 h-[2px] border-t-2 border-dashed border-[#e6ebf1] z-0" />
            
            <div className="grid md:grid-cols-4 gap-12 md:gap-6 relative z-10">
              {[
                { num: "01", title: t.step1Title, desc: t.step1Desc },
                { num: "02", title: t.step2Title, desc: t.step2Desc },
                { num: "03", title: t.step3Title, desc: t.step3Desc },
                { num: "04", title: t.step4Title, desc: t.step4Desc },
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center md:items-start md:text-left rtl:md:items-end rtl:md:text-right"
                >
                  <div className="w-20 h-20 rounded-full bg-[#635bff] text-white flex items-center justify-center text-2xl font-bold font-display shadow-lg mb-6 ring-8 ring-[#f6f9fc]">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-[#0a2540] mb-3">{step.title}</h3>
                  <p className="text-[#425466] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0a2540] mb-16 max-w-2xl">
            {t.featuresHeading}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <Terminal className="text-[#635bff] mb-6" size={32} />
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">{t.feature1Title}</h3>
              <p className="text-[#425466] leading-relaxed">{t.feature1Desc}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <Zap className="text-[#635bff] mb-6" size={32} />
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">{t.feature2Title}</h3>
              <p className="text-[#425466] leading-relaxed">{t.feature2Desc}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <Globe className="text-[#635bff] mb-6" size={32} />
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">{t.feature3Title}</h3>
              <p className="text-[#425466] leading-relaxed">{t.feature3Desc}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <Shield className="text-[#635bff] mb-6" size={32} />
              <h3 className="text-xl font-bold text-[#0a2540] mb-3">{t.feature4Title}</h3>
              <p className="text-[#425466] leading-relaxed">{t.feature4Desc}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Merchant Section */}
      <section id="merchants" className="py-24 md:py-32 px-6 bg-white overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0a2540] mb-6">
              {t.merchantTitle}
            </h2>
            <p className="text-xl text-[#425466] mb-10 max-w-md">
              {t.merchantSub}
            </p>
            <Link href="/checkout" className="inline-flex items-center gap-2 px-8 py-4 bg-[#f6f9fc] hover:bg-[#635bff] text-[#0a2540] hover:text-white rounded-full font-bold transition-all hover:shadow-lg border border-gray-200 hover:border-transparent group">
              {t.navStartNow}
              <ArrowRight size={18} className={`transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </motion.div>

          <div className="flex-1 w-full grid sm:grid-cols-2 gap-6">
            {[
              { icon: Rocket, name: t.merchant1Name, desc: t.merchant1Desc, color: "text-[#635bff]", bg: "bg-[#635bff]/10" },
              { icon: ShoppingCart, name: t.merchant2Name, desc: t.merchant2Desc, color: "text-[#34d399]", bg: "bg-[#34d399]/10" },
              { icon: LayoutGrid, name: t.merchant3Name, desc: t.merchant3Desc, color: "text-[#818cf8]", bg: "bg-[#818cf8]/10" },
              { icon: Building2, name: t.merchant4Name, desc: t.merchant4Desc, color: "text-[#fb923c]", bg: "bg-[#fb923c]/10" },
            ].map((merchant, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-[#e6ebf1] bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${merchant.bg} ${merchant.color}`}>
                  <merchant.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-2">{merchant.name}</h3>
                <p className="text-sm text-[#425466] leading-relaxed">{merchant.desc}</p>
              </motion.div>
            ))}
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
              { icon: SiAmericanexpress, name: 'American Express' },
              { icon: Globe, name: 'SEPA' },
              { name: 'Klarna' },
            ].map((method, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -2, borderColor: '#635bff' }}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-[#e6ebf1] shadow-sm transition-colors cursor-default"
              >
                {method.icon && <method.icon size={24} className="text-[#0a2540]" />}
                <span className="font-bold text-[#0a2540]">{method.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section id="developers" className="py-24 md:py-32 px-6 bg-[#0a2540] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-6 text-[#87b1e2]">
              {t.devBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
              {t.devTitle}
            </h2>
            <p className="text-xl text-[#87b1e2] mb-10 max-w-md">
              {t.devSub}
            </p>
            
            <ul className="space-y-4 mb-10">
              {[t.devFeature1, t.devFeature2, t.devFeature3, t.devFeature4, t.devFeature5].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#87b1e2]">
                  <CheckCircle2 className="text-[#34d399] shrink-0 mt-0.5" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button className="px-6 py-3 rounded-full border border-white/30 hover:bg-white hover:text-[#0a2540] font-bold transition-colors">
              {t.devViewDocs}
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#635bff]/20 to-purple-500/20 blur-3xl rounded-full" />
            <div className="relative rounded-2xl bg-[#0d1f35] border border-white/10 shadow-2xl overflow-hidden font-mono text-sm rtl:text-left rtl:dir-ltr">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-2 text-white/50 text-xs">mmnpay.js</div>
              </div>
              <div className="p-6 overflow-x-auto text-left" dir="ltr">
                <pre className="text-white/80 leading-relaxed">
                  <span className="text-[#697386]">{`// Initialize MMNPAY`}</span><br />
                  <span className="text-[#7c3aed]">const</span> mmnpay = <span className="text-[#7c3aed]">new</span> <span className="text-[#818cf8]">MMNPAY</span>(<span className="text-[#34d399]">'sk_live_...'</span>);<br /><br />
                  
                  <span className="text-[#697386]">{`// Create a payment intent`}</span><br />
                  <span className="text-[#7c3aed]">const</span> intent = <span className="text-[#7c3aed]">await</span> mmnpay.<span className="text-white">paymentIntents</span>.<span className="text-[#818cf8]">create</span>({`{`}<br />
                  {`  `}amount: <span className="text-orange-400">10000</span>,<br />
                  {`  `}currency: <span className="text-[#34d399]">'eur'</span>,<br />
                  {`  `}payment_method_types: [<span className="text-[#34d399]">'card'</span>],<br />
                  {`  `}metadata: {`{`} order_id: <span className="text-[#34d399]">'ord_789'</span> {`}`}<br />
                  {`}`});<br /><br />
                  
                  <span className="text-[#697386]">{`// Confirm payment`}</span><br />
                  <span className="text-[#7c3aed]">await</span> mmnpay.<span className="text-white">paymentIntents</span>.<span className="text-[#818cf8]">confirm</span>(<br />
                  {`  `}intent.id,<br />
                  {`  {`} payment_method: <span className="text-[#34d399]">'pm_card_visa'</span> {`}`}<br />
                  );
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0a2540] mb-4">
            {t.pricingTitle}
          </h2>
          <p className="text-xl text-[#425466] mb-16">{t.pricingSub}</p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-[480px] mx-auto bg-white rounded-3xl border border-[#e6ebf1] shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden text-left rtl:text-right"
          >
            <div className="p-8">
              <div className="text-sm font-bold text-[#635bff] uppercase tracking-wider mb-2">{t.pricingLabel}</div>
              <div className="text-4xl md:text-5xl font-display font-bold text-[#635bff] mb-2">
                1.4% + €0.25
              </div>
              <div className="text-[#425466] font-medium mb-8">{t.pricingPerCharge}</div>
              
              <div className="h-px bg-[#e6ebf1] mb-8" />
              
              <ul className="space-y-4 mb-8">
                {[t.pricingFeature1, t.pricingFeature2, t.pricingFeature3, t.pricingFeature4, t.pricingFeature5, t.pricingFeature6].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#0a2540] font-medium">
                    <CheckCircle2 className="text-[#34d399] shrink-0" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/checkout" className="block w-full py-4 bg-[#635bff] hover:bg-[#0a2540] text-white text-center rounded-xl font-bold transition-colors shadow-lg shadow-[#635bff]/25">
                {t.pricingGetStarted}
              </Link>
            </div>
            <div className="bg-[#f6f9fc] p-6 text-center text-sm text-[#425466] font-medium border-t border-[#e6ebf1]">
              {t.pricingVolumeNote2}
            </div>
          </motion.div>
          <p className="text-[#697386] mt-8 max-w-lg mx-auto">{t.pricingNote}</p>
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
            <button className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
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
              <li><a href="#" className="hover:text-[#635bff]">{t.footerAbout}</a></li>
              <li><a href="#" className="hover:text-[#635bff]">{t.footerCustomers}</a></li>
              <li><a href="#" className="hover:text-[#635bff]">{t.footerJobs}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#0a2540] mb-4">{t.navProducts}</h3>
            <ul className="space-y-3 text-[#425466]">
              <li><a href="#how-it-works" className="hover:text-[#635bff]">{t.howItWorksTitle}</a></li>
              <li><a href="#merchants" className="hover:text-[#635bff]">{t.merchantTitle}</a></li>
              <li><a href="#pricing" className="hover:text-[#635bff]">{t.navPricing}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#0a2540] mb-4">{t.navDevelopers}</h3>
            <ul className="space-y-3 text-[#425466]">
              <li><a href="#developers" className="hover:text-[#635bff]">{t.footerDocumentation}</a></li>
              <li><a href="#" className="hover:text-[#635bff]">{t.footerApiRef}</a></li>
              <li><a href="#" className="hover:text-[#635bff]">{t.footerStatus}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#0a2540] mb-4">{t.legal}</h3>
            <ul className="space-y-3 text-[#425466]">
              <li><a href="#" className="hover:text-[#635bff]">{t.footerPrivacy}</a></li>
              <li><a href="#" className="hover:text-[#635bff]">{t.footerTerms}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="font-display font-bold text-xl text-[#0a2540] mb-4 md:mb-0">MMNPAY</div>
          <div className="text-[#425466] flex flex-col md:flex-row items-center gap-4">
            <button onClick={toggleLang} className="hover:text-[#0a2540] font-bold underline">
              {lang === 'en' ? t.footerSwitchToAr : t.footerSwitchToEn}
            </button>
            <span>{t.copyright}</span>
            <span className="hidden md:inline text-xs opacity-50 ml-2">{t.footerTagline}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
