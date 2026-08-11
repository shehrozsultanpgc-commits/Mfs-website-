import React from 'react';
import { motion } from 'motion/react';
import { WHY_US_ITEMS } from '../data/content';

export const WhyUsSection: React.FC = () => {
  return (
    <section id="why-us" className="py-20 relative bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            Value Proposition
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white mb-4">
            Why Choose <span className="gold-pure-gradient">MFS Growth</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            We combine professional visual aesthetics with robust operational execution and zero plagiarism.
          </p>
        </motion.div>

        {/* Clean Feature Rows with Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {WHY_US_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ x: 4 }}
              className={`flex flex-col space-y-3 transition-transform ${idx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl text-[#E5C158]">
                  {item.icon}
                </div>
                <h3 className="font-poppins font-bold text-white text-base">
                  {item.title}
                </h3>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

