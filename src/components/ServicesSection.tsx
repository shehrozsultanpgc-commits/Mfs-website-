import React from 'react';
import { SERVICES } from '../data/content';
import { Currency } from '../types';
import { ArrowRight, Check } from 'lucide-react';

interface ServicesSectionProps {
  currency: Currency;
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currency,
  onSelectService,
}) => {
  return (
    <section id="services" className="py-24 relative bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            Our Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white mb-4">
            Our Popular <span className="gold-pure-gradient">Services</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            We provide executive solutions designed to meet your target formatting, citation, and delivery metrics.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const priceDisplay =
              currency === 'PKR'
                ? `PKR ${service.pricePkr.toLocaleString()}`
                : `USD ${service.priceUsd.toFixed(2)}`;

            return (
              <div
                key={service.id}
                className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between relative group border border-[#E5C158]/15"
              >
                {/* Badge */}
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/20 text-[#E5C158] font-semibold text-[11px]">
                  {service.badge}
                </div>

                <div>
                  {/* Service Icon */}
                  <div className="text-4xl mb-6 filter drop-shadow-[0_0_10px_rgba(229,193,88,0.2)]">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-poppins text-white mb-3 group-hover:text-[#E5C158] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  {/* Pricing line */}
                  <div className="pt-6 border-t border-white/10 mb-6 flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-poppins text-[#E5C158]">
                      {priceDisplay}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">
                      {service.unit}
                    </span>
                  </div>

                  {/* Action CTA */}
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="w-full py-3 rounded-xl bg-[#E5C158] hover:bg-[#fce888] text-[#050507] font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
