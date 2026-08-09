import React from 'react';
import { Award, Clock, Globe, ShieldCheck } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const trustCards = [
    {
      icon: Award,
      title: 'Executive Quality',
      description: 'Precision formatting, custom graphics, and strict criteria adherence.',
    },
    {
      icon: Clock,
      title: 'Guaranteed Turnaround',
      description: 'Flexible options for urgent 12h, 24h, and standard delivery windows.',
    },
    {
      icon: Globe,
      title: 'International Reach',
      description: 'Serving clients across Pakistan, Middle East, Europe, and North America.',
    },
    {
      icon: ShieldCheck,
      title: 'Protected Privacy',
      description: 'Encrypted client briefs, NDA-grade privacy, and verified payment audits.',
    },
  ];

  return (
    <section className="py-8 relative z-10 border-y border-white/10 bg-[#0A0A0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {trustCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`flex items-start gap-4 p-2 ${idx > 0 ? 'pt-4 sm:pt-2 sm:pl-6' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 text-[#E5C158]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-poppins font-bold text-white text-sm">
                    {card.title}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
