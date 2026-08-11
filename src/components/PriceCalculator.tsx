import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Currency, DeliverySpeed } from '../types';
import { SERVICES, calculateServicePrice } from '../data/content';
import { CheckCircle, Shield, ArrowRight } from 'lucide-react';

interface PriceCalculatorProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  selectedServiceId?: string;
  onBookOrder: (details: {
    service: string;
    qty: number;
    speed: DeliverySpeed;
    currency: Currency;
    finalPrice: number;
  }) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  currency,
  setCurrency,
  selectedServiceId,
  onBookOrder,
}) => {
  const [service, setService] = useState<string>('presentation');
  const [qty, setQty] = useState<number>(10);
  const [speed, setSpeed] = useState<DeliverySpeed>('standard');
  const [isRecalculating, setIsRecalculating] = useState(false);

  useEffect(() => {
    setIsRecalculating(true);
    const timer = setTimeout(() => setIsRecalculating(false), 300);
    return () => clearTimeout(timer);
  }, [service, qty, speed, currency]);

  useEffect(() => {
    if (selectedServiceId) {
      setService(selectedServiceId);
      if (selectedServiceId === 'presentation' || selectedServiceId === 'pitch-deck') {
        setQty(10);
      } else if (selectedServiceId === 'assignment' || selectedServiceId === 'reports' || selectedServiceId === 'case-studies') {
        setQty(1000);
      } else if (selectedServiceId === 'document-formatting') {
        setQty(1500);
      } else {
        setQty(1);
      }
    }
  }, [selectedServiceId]);

  // Handle service change defaults
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newService = e.target.value;
    setService(newService);
    if (newService === 'presentation' || newService === 'pitch-deck') {
      setQty(10);
    } else if (newService === 'assignment' || newService === 'reports' || newService === 'case-studies') {
      setQty(1000);
    } else if (newService === 'document-formatting') {
      setQty(1500);
    } else {
      setQty(1);
    }
  };

  // Price Calculation Logic
  const priceResult = calculateServicePrice(service, qty, speed, currency);
  const original = priceResult.originalPrice;
  const final = priceResult.finalPrice;
  const formattedFinal = priceResult.formattedFinal;
  const formattedOriginal = priceResult.formattedOriginal;

  return (
    <section id="calculator" className="py-24 relative bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            Interactive Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white mb-4">
            Calculate Your <span className="gold-pure-gradient">Project Rate</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Estimate your baseline rate transparently, including our active 50% Grand Launch promotions.
          </p>
        </div>

        {/* Currency Selector Switch */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#0d0d10] border border-white/10 rounded-full p-1.5 flex items-center shadow-lg">
            <button
              onClick={() => setCurrency('PKR')}
              className={`px-6 py-2.5 rounded-full font-poppins font-semibold text-xs transition-all cursor-pointer ${
                currency === 'PKR'
                  ? 'bg-[#E5C158] text-[#050507] shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Pakistan (PKR)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-6 py-2.5 rounded-full font-poppins font-semibold text-xs transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#E5C158] text-[#050507] shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              International (USD)
            </button>
          </div>
        </div>

        {/* Calculator Main Box */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-[#E5C158]/20 grid grid-cols-1 lg:grid-cols-12 gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Controls Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Service Select */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-poppins font-bold uppercase tracking-wider text-neutral-300">
                1. Select Service
              </label>
              <select
                value={service}
                onChange={handleServiceChange}
                className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.unit})
                  </option>
                ))}
              </select>
            </div>

            {/* Scope Size Range & Direct Typing */}
            {service !== 'resume' && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-poppins font-bold uppercase tracking-wider text-neutral-300">
                    2. Scope Quantity ({service === 'presentation' ? 'Slides' : 'Words'})
                  </label>
                  <span className="text-[11px] text-[#28C76F] font-semibold flex items-center gap-1">
                    <span>✨ Unlimited Scope Supported</span>
                  </span>
                </div>

                {/* Direct Number Typing Input + Quick Badge Indicator */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-6 relative">
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-[#050507] border border-[#E5C158]/40 focus:border-[#E5C158] text-white font-bold text-base rounded-xl px-4 py-2.5 focus:outline-none transition-colors"
                      placeholder={service === 'presentation' ? 'e.g. 15, 50, 100' : 'e.g. 2500, 10000'}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#E5C158] pointer-events-none">
                      {service === 'presentation' ? 'Slides' : 'Words'}
                    </span>
                  </div>

                  {/* Range Slider for Quick Adjusting */}
                  <div className="sm:col-span-6 flex flex-col justify-center">
                    <input
                      type="range"
                      min={service === 'presentation' ? 1 : 250}
                      max={service === 'presentation' ? 100 : 20000}
                      step={service === 'presentation' ? 1 : 250}
                      value={Math.min(qty, service === 'presentation' ? 100 : 20000)}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E5C158]"
                    />
                  </div>
                </div>

                {/* Quick Presets for Bulk / Common Sizes */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-neutral-400 font-medium self-center mr-1">Quick Presets:</span>
                  {service === 'presentation' ? (
                    <>
                      <button type="button" onClick={() => setQty(10)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${qty === 10 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>10 Slides</button>
                      <button type="button" onClick={() => setQty(25)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${qty === 25 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>25 Slides</button>
                      <button type="button" onClick={() => setQty(50)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${qty === 50 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>50 Slides</button>
                      <button type="button" onClick={() => setQty(100)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${qty === 100 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>100+ Bulk Deck</button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => setQty(1000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${qty === 1000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>1,000 Words</button>
                      <button type="button" onClick={() => setQty(3000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${qty === 3000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>3,000 Words</button>
                      <button type="button" onClick={() => setQty(5000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${qty === 5000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>5,000 Words</button>
                      <button type="button" onClick={() => setQty(10000)} className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${qty === 10000 ? 'bg-[#E5C158] text-black border-[#E5C158]' : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#E5C158]'}`}>10,000+ Words (Bulk)</button>
                    </>
                  )}
                </div>

                {/* Unlimited Scope Line */}
                <p className="text-[11px] text-gray-400 bg-white/[0.03] border border-white/10 p-2.5 rounded-xl leading-relaxed mt-1">
                  <strong className="text-[#E5C158] font-semibold">Bulk & Large Scope Guarantee:</strong> We accept orders of any scale with no maximum limits! You can type any custom word count or slide count above.
                </p>
              </div>
            )}

            {/* Speed Options */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-poppins font-bold uppercase tracking-wider text-neutral-300">
                {service === 'resume' ? '2. Delivery Speed' : '3. Delivery Speed'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'standard', label: 'Standard Schedule', tag: 'Standard' },
                  { id: 'express', label: 'Express (+30%)', tag: 'Fast' },
                  { id: 'priority', label: 'Priority (+50%)', tag: 'Urgent' },
                  { id: 'sameday', label: 'Same-Day (+75%)', tag: 'Immediate' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      speed === item.id
                        ? 'bg-[#E5C158]/10 border-[#E5C158] text-white'
                        : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="speed"
                      value={item.id}
                      checked={speed === item.id}
                      onChange={() => setSpeed(item.id as DeliverySpeed)}
                      className="accent-[#E5C158]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">{item.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#E5C158]/5 via-[#0d0d10] to-[#050507] border border-[#E5C158]/30 rounded-xl p-8 flex flex-col items-center text-center justify-between relative shadow-xl">
            
            {/* Promo Tag & Savings Badge */}
            <div className="flex flex-col items-center gap-1.5 mb-4">
              <div className="px-3.5 py-1 rounded-full bg-[#28C76F] text-[#050507] text-[11px] font-extrabold uppercase tracking-widest shadow-md">
                50% Grand Launch Promo Active
              </div>
              <span className="text-[11px] font-mono font-bold text-[#28C76F] bg-[#28C76F]/10 px-2.5 py-0.5 rounded-md border border-[#28C76F]/30">
                You Save {currency === 'PKR' ? `PKR ${Math.round(original - final).toLocaleString()}` : `USD ${(original - final).toFixed(2)}`}
              </span>
            </div>

            <div className="my-auto space-y-1">
              <p className="text-xs font-poppins uppercase tracking-wider text-neutral-400">
                Estimated Launch Cost
              </p>
              
              <p className={`text-4xl sm:text-5xl font-black font-poppins text-[#E5C158] my-3 drop-shadow-[0_0_20px_rgba(229,193,88,0.25)] transition-all duration-300 ${isRecalculating ? 'scale-105 text-white' : ''}`}>
                {formattedFinal}
              </p>

              <p className="text-xs text-neutral-500 line-through">
                Original Rate: {formattedOriginal}
              </p>
            </div>

            <div className="w-full pt-6 border-t border-white/10 my-6 flex justify-around text-xs text-neutral-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#28C76F]" /> Revisions Included
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#E5C158]" /> Quality Guarantee
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                onBookOrder({
                  service,
                  qty: service === 'resume' ? 1 : qty,
                  speed,
                  currency,
                  finalPrice: final,
                })
              }
              className="w-full py-3.5 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-[#050507] font-bold text-xs tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(229,193,88,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book This Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

        </div>

      </div>
    </section>
  );
};
