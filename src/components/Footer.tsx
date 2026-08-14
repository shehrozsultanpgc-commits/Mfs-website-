import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Mail, Phone, MapPin, Bot, Mic } from 'lucide-react';

interface FooterProps {
  onOpenOrderModal: () => void;
  onNavigatePage?: (page: any) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal, onNavigatePage, onOpenAIChat }) => {
  return (
    <footer className="bg-[#050507] border-t border-white/5 pt-16 pb-8 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Col 1: Brand & Desc */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E5C158] to-[#C5A847] flex items-center justify-center text-[#050507] font-extrabold text-sm shadow-md">
                MFS
              </div>
              <span className="font-bold text-lg text-white font-poppins">
                MFS <span className="gold-pure-gradient">Growth</span>
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Premium digital agency focused on delivering executive presentations, custom assignments, ATS resumes, and reports globally with speed and transparency.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-2">
              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="https://instagram.com/mfsgrowth"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#050507] hover:bg-[#E5C158] hover:border-[#E5C158] transition-all"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="https://facebook.com/MFSGrowth"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#050507] hover:bg-[#E5C158] hover:border-[#E5C158] transition-all"
                title="Follow on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-poppins font-bold uppercase tracking-wider text-white text-xs mb-2">
              Services
            </h4>
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('services') : onOpenOrderModal(); }}
              className="text-left hover:text-[#E5C158] transition-colors"
            >
              Presentation Design
            </a>
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('services') : onOpenOrderModal(); }}
              className="text-left hover:text-[#E5C158] transition-colors"
            >
              Assignment Writing
            </a>
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('services') : onOpenOrderModal(); }}
              className="text-left hover:text-[#E5C158] transition-colors"
            >
              Resume Optimization
            </a>
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('services') : onOpenOrderModal(); }}
              className="text-left hover:text-[#E5C158] transition-colors"
            >
              Report Formatting
            </a>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-poppins font-bold uppercase tracking-wider text-white text-xs mb-2">
              Quick Links
            </h4>
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('services') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Our Services
            </a>
            <a
              href="/#portfolio"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('home', 'portfolio') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Our Work
            </a>
            <a
              href="/pricing"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('pricing') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Pricing Tool
            </a>
            <a
              href="/reviews"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('reviews') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Client Reviews
            </a>
            <a
              href="/about"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('about') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              About Agency
            </a>
            <a
              href="/faq"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('faq') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              FAQ & Support
            </a>
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('contact') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Contact Us
            </a>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-poppins font-bold uppercase tracking-wider text-white text-xs mb-2">
              Contact Info
            </h4>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#E5C158]" />
              <a href="mailto:mfsmedia.agency@gmail.com" className="hover:text-[#E5C158]">mfsmedia.agency@gmail.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#E5C158]" />
              <a href="tel:+923015323689" className="hover:text-[#E5C158]">+92 301 5323689</a>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={(e) => { e.preventDefault(); onOpenAIChat?.('chat'); }} className="flex items-center gap-2 text-neutral-400 hover:text-[#E5C158] transition-colors cursor-pointer">
                <Bot className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Ask AI Chatbot</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.preventDefault(); onOpenAIChat?.('voice'); }} className="flex items-center gap-2 text-neutral-400 hover:text-[#28C76F] transition-colors cursor-pointer">
                <Mic className="w-3.5 h-3.5 text-[#28C76F]" />
                <span>AI Voice Assistant</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© 2026 MFS Growth Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#E5C158] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#E5C158] transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-[#E5C158] transition-colors">Refund Policy</a>
            {onNavigatePage && (
              <button
                onClick={() => onNavigatePage('admin')}
                className="text-neutral-400 hover:text-[#E5C158] transition-colors font-mono flex items-center gap-1 cursor-pointer"
              >
                <span>MFS Admin HQ</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
