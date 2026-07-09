import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'wouter';
import { Globe2, ShieldCheck, Zap, ArrowRight, Check, Landmark, ChevronRight } from 'lucide-react';
import { SiPaypal, SiApplepay, SiVisa, SiMastercard } from 'react-icons/si';

// Define container animation variants for staggered children
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isProcessing || isSuccess) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
            MMNPAY
          </Link>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#home" className="text-white/80 hover:text-white transition-colors">Home</a>
            <a href="#payments" className="text-white/80 hover:text-white transition-colors">Payments</a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
            <a href="#checkout" className="px-5 py-2.5 bg-primary hover:bg-blue-500 rounded-full text-white transition-all font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-60"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="text-left"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-xs font-medium uppercase tracking-wider text-blue-100">Global Payment Infrastructure</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
              Secure Payments with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">MMNPAY</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
              Simple payment solutions for businesses worldwide. Accept international payments with military-grade security and uncompromising speed.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href="#checkout" className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-primary hover:bg-blue-500 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-primary/50 text-lg w-full sm:w-auto">
                <span>Start Payment</span>
                <ArrowRight size={20} />
              </a>
              <a href="#features" className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-semibold transition-all text-lg w-full sm:w-auto">
                <span>Learn More</span>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl transform rotate-3"></div>
            <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex justify-between items-center mb-10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-xs text-slate-500 font-mono">dashboard.mmnpay.com</div>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-end pb-6 border-b border-white/10">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Total Revenue</p>
                    <p className="text-4xl font-display font-bold text-white">€124,500.00</p>
                  </div>
                  <div className="text-emerald-400 text-sm font-medium flex items-center">
                    +14.5% <ChevronRight size={14} className="ml-1" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300">
                          <SiVisa size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200">Payment Received</p>
                          <p className="text-xs text-slate-500">Today, 14:32</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-white">+€850.00</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-10 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by forward-thinking companies</p>
          <div className="flex justify-center flex-wrap gap-8 md:gap-16 opacity-50 grayscale">
             {/* Fake logos using text for design purposes */}
             {['Acme Corp', 'Nexus', 'Stellar', 'Quantum', 'Horizon'].map(company => (
               <div key={company} className="text-xl md:text-2xl font-display font-bold text-slate-800">{company}</div>
             ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why MMNPAY?</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-secondary max-w-2xl mx-auto leading-tight">
              A financial infrastructure built for the future
            </h3>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="text-primary" size={28} strokeWidth={2} />
              </div>
              <h4 className="text-xl font-display font-bold text-secondary mb-4">Fast Payments</h4>
              <p className="text-slate-600 leading-relaxed">
                Accept payments easily from customers around the world. Settlement happens in seconds, giving you access to capital faster than ever.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-primary" size={28} strokeWidth={2} />
              </div>
              <h4 className="text-xl font-display font-bold text-secondary mb-4">Secure</h4>
              <p className="text-slate-600 leading-relaxed">
                Built with modern payment security standards. End-to-end encryption and PCI compliance protect your business and your customers.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Globe2 className="text-primary" size={28} strokeWidth={2} />
              </div>
              <h4 className="text-xl font-display font-bold text-secondary mb-4">Global</h4>
              <p className="text-slate-600 leading-relaxed">
                Designed for international businesses. Support for over 135 currencies and local payment methods everywhere your customers are.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Checkout Demo Section */}
      <section id="checkout" className="py-24 md:py-32 px-6 bg-slate-100 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary mb-6 leading-tight">
              Frictionless checkout experience
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-md">
              Try our interactive demo. MMNPAY adapts to your customers' preferred payment methods, increasing conversion rates globally.
            </p>
            <ul className="space-y-4 mb-10">
              {['Optimized for conversion', 'Fraud protection built-in', 'Customizable to your brand'].map((item, i) => (
                <li key={i} className="flex items-center text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center mr-3">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden relative">
              
              {/* Payment Success Overlay */}
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mb-6"
                  >
                    <Check size={40} strokeWidth={3} />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold text-secondary mb-2">Payment Successful!</h3>
                  <p className="text-slate-500">Receipt sent to your email.</p>
                </motion.div>
              )}
              
              <div className="p-8 pb-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Checkout Demo</span>
                  <span className="text-xs font-mono bg-slate-200 text-slate-600 px-2 py-1 rounded">TEST MODE</span>
                </div>
                <p className="text-slate-500 text-sm mb-1">Payment Amount</p>
                <h3 className="text-4xl font-display font-bold text-secondary">€100.00</h3>
              </div>
              
              <div className="p-8 space-y-4">
                {/* Method: Card */}
                <button 
                  onClick={() => setSelectedMethod('card')}
                  className={`w-full flex items-center p-4 border rounded-2xl transition-all ${selectedMethod === 'card' ? 'border-primary ring-1 ring-primary bg-blue-50/30' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${selectedMethod === 'card' ? 'border-primary' : 'border-slate-300'}`}>
                    {selectedMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-medium text-slate-700">Visa / Mastercard</span>
                    <div className="flex space-x-2 text-slate-400">
                      <SiVisa size={24} />
                      <SiMastercard size={24} />
                    </div>
                  </div>
                </button>
                
                {/* Method: PayPal */}
                <button 
                  onClick={() => setSelectedMethod('paypal')}
                  className={`w-full flex items-center p-4 border rounded-2xl transition-all ${selectedMethod === 'paypal' ? 'border-primary ring-1 ring-primary bg-blue-50/30' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${selectedMethod === 'paypal' ? 'border-primary' : 'border-slate-300'}`}>
                    {selectedMethod === 'paypal' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-medium text-slate-700">PayPal</span>
                    <SiPaypal size={20} className="text-[#00457C]" />
                  </div>
                </button>

                {/* Method: Apple Pay */}
                <button 
                  onClick={() => setSelectedMethod('apple')}
                  className={`w-full flex items-center p-4 border rounded-2xl transition-all ${selectedMethod === 'apple' ? 'border-primary ring-1 ring-primary bg-blue-50/30' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${selectedMethod === 'apple' ? 'border-primary' : 'border-slate-300'}`}>
                    {selectedMethod === 'apple' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-medium text-slate-700">Apple Pay</span>
                    <SiApplepay size={28} className="text-black" />
                  </div>
                </button>

                {/* Method: Bank Transfer */}
                <button 
                  onClick={() => setSelectedMethod('bank')}
                  className={`w-full flex items-center p-4 border rounded-2xl transition-all ${selectedMethod === 'bank' ? 'border-primary ring-1 ring-primary bg-blue-50/30' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${selectedMethod === 'bank' ? 'border-primary' : 'border-slate-300'}`}>
                    {selectedMethod === 'bank' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-medium text-slate-700">Bank Transfer</span>
                    <Landmark size={20} className="text-slate-500" />
                  </div>
                </button>
                
                <button 
                  onClick={handlePayment}
                  className="w-full mt-6 py-4 bg-secondary hover:bg-slate-800 text-white rounded-2xl font-medium transition-all flex items-center justify-center shadow-lg"
                >
                  {isProcessing ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Pay Now</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arabic Section */}
      <section className="py-24 bg-white border-y border-slate-100" dir="rtl" style={{ fontFamily: 'var(--font-arabic)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8 leading-tight text-balance">
              بوابة الدفع <span className="text-primary" style={{ fontFamily: 'var(--font-display)' }}>MMNPAY</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 mb-6 leading-relaxed">
              حلول دفع سهلة وآمنة للتجار والعملاء حول العالم.
            </p>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
              نوفر تجربة دفع احترافية وقابلة للتطوير.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            Ready to scale globally?
          </h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that trust MMNPAY to power their global payments infrastructure.
          </p>
          <a href="#checkout" className="inline-block px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Create Free Account
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-secondary text-slate-400 py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-white tracking-tight">MMNPAY</span>
          </div>
          
          <div className="flex space-x-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 MMNPAY. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center">
             <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
             All systems operational
          </div>
        </div>
      </footer>
    </div>
  );
}
