import React from 'react';
import { Mail, Phone, Clock, MapPin, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  onOpenAIChat?: (_mode?: 'chat' | 'voice') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  return (
    <section id="contact" className="py-24 relative bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            Connect with Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white mb-4">
            Get in Touch <span className="gold-pure-gradient">Today</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Reach out through our official channels. Our executive team is online around the clock to support your academic and professional projects.
          </p>
        </div>

        {/* Clean Communication Panel */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Direct Communication Channels */}
          <div className="space-y-4">
            <h3 className="text-sm font-poppins font-bold uppercase tracking-wider text-[#E5C158] mb-4">
              Direct Communication Channels
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 py-2 border-b border-white/5">
                <Mail className="w-4 h-4 text-[#E5C158] shrink-0" />
                <span className="text-neutral-400 font-medium w-28">Agency Email:</span>
                <a href="mailto:mfsmedia.agency@gmail.com" className="text-white font-mono hover:text-[#E5C158] transition-colors">
                  mfsmedia.agency@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-white/5">
                <Phone className="w-4 h-4 text-[#28C76F] shrink-0" />
                <span className="text-neutral-400 font-medium w-28">WhatsApp / Call:</span>
                <a href="https://wa.me/923015323689" target="_blank" rel="noreferrer" className="text-white font-mono hover:text-[#28C76F] transition-colors">
                  +92 301 5323689
                </a>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-white/5">
                <Clock className="w-4 h-4 text-[#E5C158] shrink-0" />
                <span className="text-neutral-400 font-medium w-28">Support Desk:</span>
                <span className="text-white font-medium">24/7 Online Support</span>
              </div>
              <div className="flex items-start gap-3 py-2 bg-[#E5C158]/5 p-3 rounded-xl border border-[#E5C158]/20 mt-2">
                <MapPin className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#E5C158] block mb-0.5">Corporate Operations &amp; Workspace</span>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    MFS Growth Agency operates as an agile, digital-first agency delivering 24/7 client solutions worldwide. Our dedicated physical headquarters is currently in development and official premises details will be formally published upon inauguration. All consultations, project workflows, and deliverables are managed seamlessly online.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Instant Priority WhatsApp Desk */}
          <div className="pt-6 lg:pt-0 lg:pl-8 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-ping" />
                <h3 className="text-sm font-poppins font-bold uppercase tracking-wider text-[#28C76F]">
                  Instant WhatsApp Desk (24/7 Online)
                </h3>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                Chat directly with our senior project managers on WhatsApp for instant price quotes, custom deadlines, sample viewings, or urgent 1-hour deliveries.
              </p>
              <div className="bg-[#28C76F]/10 border border-[#28C76F]/20 rounded-xl p-3 mb-4 space-y-1.5 text-xs text-neutral-300">
                <div className="flex items-center gap-1.5 text-[#E5C158] font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>50% Grand Launch Offer Active</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Enjoy flat 50% discount across Presentation Design, Assignment Writing, ATS Resumes, and Corporate Reports.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/923015323689?text=Hello%20MFS%20Growth%20Agency!%20I%20would%20like%20to%20discuss%20a%20project%20and%20claim%20the%2050%25%20Grand%20Launch%20Discount."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#28C76F] to-[#20B05F] hover:from-[#25D366] hover:to-[#28C76F] text-[#050507] font-bold text-xs font-poppins flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(40,199,111,0.3)] hover:shadow-[0_6px_25px_rgba(40,199,111,0.5)] transition-all cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Start WhatsApp Conversation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
