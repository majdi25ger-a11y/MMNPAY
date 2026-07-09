import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SiVisa, SiMastercard, SiAmericanexpress } from 'react-icons/si';

interface PaymentCardProps {
  cardNumber: string;
  holderName: string;
  expiry: string;
  network: 'visa' | 'mastercard' | 'amex';
  variant: 'dark' | 'gradient' | 'light';
  isFlipped?: boolean;
  cvc?: string;
  className?: string;
}

export function PaymentCard({
  cardNumber,
  holderName,
  expiry,
  network,
  variant,
  isFlipped = false,
  cvc = '•••',
  className = ''
}: PaymentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    dark: 'bg-[#0a2540] text-white shadow-2xl',
    gradient: 'bg-gradient-to-br from-[#635bff] to-[#0a2540] text-white shadow-2xl',
    light: 'bg-white text-[#0a2540] border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
  };

  const NetworkIcon = network === 'visa' ? SiVisa : network === 'mastercard' ? SiMastercard : SiAmericanexpress;

  return (
    <div className={`perspective-1000 ${className}`} style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        className={`relative w-80 h-48 sm:w-96 sm:h-56 rounded-xl sm:rounded-2xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer ${variantStyles[variant]}`}
      >
        {/* Shine effect */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([mx, my]) => `radial-gradient(circle at ${(mx as number + 0.5) * 100}% ${(my as number + 0.5) * 100}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
            )
          }}
        />

        {/* Front of card */}
        <div 
          className="absolute inset-0 p-6 flex flex-col justify-between backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-start z-10 relative">
            <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="30" rx="4" fill="#FFD700" fillOpacity="0.8"/>
              <path d="M0 10H40M0 20H40M12 0V30M28 0V30" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
            </svg>
            <NetworkIcon className="text-4xl" />
          </div>
          
          <div className="z-10 relative mt-auto">
            <div className="font-mono text-xl sm:text-2xl tracking-widest mb-4">
              {cardNumber || '•••• •••• •••• ••••'}
            </div>
            <div className="flex justify-between text-xs sm:text-sm uppercase tracking-wider opacity-80 font-medium">
              <div>
                <div className="text-[10px] opacity-60 mb-1">Cardholder Name</div>
                <div>{holderName || 'NAME ON CARD'}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] opacity-60 mb-1">Expires</div>
                <div>{expiry || 'MM/YY'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 flex flex-col backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-10 sm:h-12 bg-black mt-6"></div>
          <div className="px-6 mt-4">
            <div className="w-full h-8 sm:h-10 bg-white rounded flex justify-end items-center px-4 text-black font-mono">
              {cvc}
            </div>
            <div className="mt-4 text-[8px] sm:text-[10px] opacity-60 max-w-[80%]">
              This card is issued by MMNPAY Bank pursuant to a license from {network.toUpperCase()}. Use of this card is governed by the cardholder agreement.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
