import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data/content';
import { ChevronDown, ArrowRight, BookOpen } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            Resolve Doubts
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white mb-4">
            Frequently Asked <span className="gold-pure-gradient">Questions</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Answers to common questions before placing your order.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`glass-card rounded-xl border transition-all duration-300 ${
                  isOpen ? 'border-[#E5C158]/40 bg-white/[0.03]' : 'border-white/5'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-poppins font-semibold text-sm sm:text-base text-white hover:text-[#E5C158] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#E5C158] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6 text-neutral-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4 overflow-hidden"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Knowledge Center / Guides Callout */}
        <div className="mt-10 text-center">
          <a
            href="/faq"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({ page: 'faq' }, '', '/faq');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E5C158]/10 hover:bg-[#E5C158]/20 border border-[#E5C158]/30 text-xs font-semibold text-[#E5C158] transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#E5C158]" />
            <span>Explore Full Knowledge Center & In-Depth Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

