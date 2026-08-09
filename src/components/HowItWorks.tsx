import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/content';
import { FileEdit, CreditCard, Cpu, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const stepIcons = [FileEdit, CreditCard, Cpu, CheckCircle];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            Seamless Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white mb-4">
            How It <span className="gold-pure-gradient">Works</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            We’ve structured our workflow to be transparent, straightforward, and completely online.
          </p>
        </div>

        {/* Horizontal Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-[#E5C158]/5 via-[#E5C158]/30 to-[#E5C158]/5 z-0" />

          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx % stepIcons.length];
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover p-8 rounded-2xl relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step badge counter */}
                <div className="absolute top-4 right-5 font-poppins font-black text-2xl text-[#E5C158]/15 group-hover:text-[#E5C158]/30 transition-colors">
                  {step.number}
                </div>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-full bg-[#E5C158]/5 border border-[#E5C158]/20 flex items-center justify-center mb-6 text-[#E5C158] group-hover:bg-[#E5C158] group-hover:text-[#050507] group-hover:border-[#E5C158] transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_rgba(229,193,88,0.3)]">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="font-poppins font-bold text-white text-base mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-xs leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
