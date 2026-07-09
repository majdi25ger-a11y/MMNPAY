import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, CreditCard, Building, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/lib/language';
import { PaymentCard } from '@/components/PaymentCard';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';
import { Link } from 'wouter';

export default function Checkout() {
  const { lang, t, toggleLang } = useLang();
  
  const [activeTab, setActiveTab] = useState<'card' | 'bank' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isCvcFocused, setIsCvcFocused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-format card number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += val[i];
    }
    setCardNumber(formatted.slice(0, 19)); // max 16 digits + 3 spaces
  };

  // Auto-format expiry
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4);
    }
    setExpiry(val);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value.replace(/\D/g, '').slice(0, 4));
  };

  const network = cardNumber.startsWith('4') ? 'visa' : cardNumber.startsWith('5') ? 'mastercard' : 'visa';

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f6f9fc] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <h2 className="text-2xl font-bold text-[#0a2540] mb-2">{t.checkoutSuccessTitle}</h2>
          <p className="text-[#425466] mb-8">{t.checkoutSuccessDesc}</p>
          <Link href="/" className="inline-block px-8 py-3 bg-[#f6f9fc] text-[#0a2540] font-bold rounded-full hover:bg-gray-200 transition-colors">
            {t.checkoutReturnHome}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans">
      {/* Left Panel - Summary */}
      <div className="lg:w-[40%] bg-[#0a2540] text-white p-8 lg:p-16 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-16">
            <Link href="/" className="text-2xl font-display font-bold tracking-tight inline-block">
              MMNPAY
            </Link>
            <button onClick={toggleLang} className="text-sm font-bold text-white/80 hover:text-white transition-colors">
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
          </div>

          <h2 className="text-[#87b1e2] font-semibold text-sm tracking-wider uppercase mb-2">
            {t.checkoutSummary}
          </h2>
          <div className="text-3xl font-display font-bold mb-8">
            {t.checkoutPlanName}
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-[#87b1e2]">
              <span>{t.checkoutSubtotal}</span>
              <span>€95.00</span>
            </div>
            <div className="flex justify-between items-center text-[#87b1e2]">
              <span>{t.checkoutVat}</span>
              <span>€5.00</span>
            </div>
            <div className="h-px bg-white/20 my-4"></div>
            <div className="flex justify-between items-center text-xl font-bold">
              <span>{t.checkoutTotal}</span>
              <span>€100.00</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-8">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium text-white">
              <Shield size={12} />
              {t.checkoutBadge1}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium text-white">
              <Lock size={12} />
              {t.checkoutBadge2}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium text-white">
              <Shield size={12} />
              {t.checkoutBadge3}
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-12 lg:mt-0">
          <div className="flex items-center gap-3 text-sm text-[#87b1e2]">
            <Lock size={16} />
            <span>SSL Encrypted Checkout</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#87b1e2]">
            <Shield size={16} />
            <span>PCI DSS Level 1 Certified</span>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-xs text-[#87b1e2]">
            {t.checkoutSecure}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="lg:w-[60%] p-8 lg:p-16 bg-white overflow-y-auto flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-display font-bold text-[#0a2540] mb-8">
            {t.checkoutTitle}
          </h1>

          <div className="flex space-x-2 rtl:space-x-reverse p-1 bg-[#f6f9fc] rounded-lg mb-8">
            {[
              { id: 'card', label: 'Card', icon: CreditCard },
              { id: 'bank', label: 'Bank', icon: Building },
              { id: 'paypal', label: 'PayPal', icon: SiPaypal }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-4 rounded-md flex justify-center items-center gap-2 text-sm font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#0a2540] shadow-sm' 
                    : 'text-[#425466] hover:text-[#0a2540]'
                }`}
              >
                <tab.icon size={16} className={tab.id === 'paypal' ? 'text-[#00457C]' : ''} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handlePay} className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#0a2540] mb-4">Contact information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#425466] mb-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(false);
                    }}
                    className={`w-full px-4 py-3 rounded-md border ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-[#e6ebf1] focus:border-[#635bff] focus:ring-[#635bff]'} focus:ring-1 outline-none transition-shadow text-[#0a2540]`}
                    placeholder="john@example.com"
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1">{t.checkoutEmailError}</p>}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'card' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="mb-8 flex justify-center perspective-1000">
                    <PaymentCard 
                      cardNumber={cardNumber}
                      holderName={name}
                      expiry={expiry}
                      network={network}
                      variant="dark"
                      isFlipped={isCvcFocused}
                      cvc={cvc}
                      className="scale-90 sm:scale-100 origin-center"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#0a2540] mb-4">Payment details</h3>
                    <div className="bg-white border border-[#e6ebf1] rounded-md overflow-hidden shadow-sm">
                      <div className="border-b border-[#e6ebf1] p-3 flex items-center relative">
                        <input 
                          type="text" 
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full outline-none text-[#0a2540] placeholder-[#aab7c4]"
                          placeholder="Card number"
                        />
                        <div className="absolute right-3 flex gap-2">
                          {network === 'visa' ? <SiVisa size={24} className="text-[#1434CB]" /> : <SiMastercard size={24} className="text-[#EB001B]" />}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-1/2 border-r border-[#e6ebf1] p-3">
                          <input 
                            type="text"
                            required
                            value={expiry}
                            onChange={handleExpiryChange}
                            className="w-full outline-none text-[#0a2540] placeholder-[#aab7c4]"
                            placeholder="MM / YY"
                          />
                        </div>
                        <div className="w-1/2 p-3">
                          <input 
                            type="text"
                            required
                            value={cvc}
                            onChange={handleCvcChange}
                            onFocus={() => setIsCvcFocused(true)}
                            onBlur={() => setIsCvcFocused(false)}
                            className="w-full outline-none text-[#0a2540] placeholder-[#aab7c4]"
                            placeholder="CVC"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#425466] mb-1">Name on card</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-md border border-[#e6ebf1] focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff] outline-none transition-shadow text-[#0a2540]"
                      placeholder="JOHN DOE"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'bank' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="py-8 text-center bg-[#f6f9fc] rounded-lg border border-[#e6ebf1]"
                >
                  <Building size={48} className="mx-auto text-[#635bff] mb-4" />
                  <h3 className="font-bold text-[#0a2540] mb-2">SEPA Direct Debit</h3>
                  <p className="text-sm text-[#425466] px-6">
                    You'll be redirected to your bank's secure portal to authorize this payment.
                  </p>
                </motion.div>
              )}

              {activeTab === 'paypal' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="py-8 text-center bg-[#f6f9fc] rounded-lg border border-[#e6ebf1]"
                >
                  <SiPaypal size={48} className="mx-auto text-[#00457C] mb-4" />
                  <h3 className="font-bold text-[#0a2540] mb-2">Pay with PayPal</h3>
                  <p className="text-sm text-[#425466] px-6">
                    You'll be redirected to PayPal to complete your purchase securely.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#635bff] hover:bg-[#0a2540] text-white rounded-md font-bold text-lg transition-colors flex items-center justify-center"
            >
              {isProcessing ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                `${t.checkoutPayNow} €100.00`
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#697386] mt-8">
            {t.checkoutPoweredBy}
          </p>
        </div>
      </div>
    </div>
  );
}
