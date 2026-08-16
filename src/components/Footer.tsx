import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Mail, Phone, MapPin, Bot, Mic } from 'lucide-react';
import { MFSLogo } from './common/MFSLogo';

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
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <MFSLogo size={40} />
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
                href="https://www.instagram.com/mfsgrowth"
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
                href="https://www.facebook.com/MFSGrowth"
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
          <div className="lg:col-span-2 flex flex-col gap-3">
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

          {/* Col 3: Knowledge Center / Our Guides */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-poppins font-bold uppercase tracking-wider text-white text-xs mb-2">
              Our Guides
            </h4>
            <a
              href="/guides/ats-resume-engineering"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigatePage) {
                  onNavigatePage('guide-ats-resume');
                } else {
                  window.history.pushState({ page: 'guide-ats-resume' }, '', '/guides/ats-resume-engineering');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              ATS Resume Guide
            </a>
            <a
              href="/guides/executive-pitch-deck-structure"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigatePage) {
                  onNavigatePage('guide-pitch-deck');
                } else {
                  window.history.pushState({ page: 'guide-pitch-deck' }, '', '/guides/executive-pitch-deck-structure');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Pitch Deck Guide
            </a>
            <a
              href="/guides/academic-formatting-citation"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigatePage) {
                  onNavigatePage('guide-academic-formatting');
                } else {
                  window.history.pushState({ page: 'guide-academic-formatting' }, '', '/guides/academic-formatting-citation');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Academic Formatting
            </a>
            <a
              href="/guides/corporate-report-formatting-standards"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigatePage) {
                  onNavigatePage('guide-corporate-report');
                } else {
                  window.history.pushState({ page: 'guide-corporate-report' }, '', '/guides/corporate-report-formatting-standards');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Corporate Reports
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

          {/* Col 4: Legal & Policies */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-poppins font-bold uppercase tracking-wider text-white text-xs mb-2">
              Legal & Policies
            </h4>
            <a
              href="/privacy"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('privacy') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('terms') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Terms of Service
            </a>
            <a
              href="/refund-policy"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('refund-policy') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Refund Policy
            </a>
          </div>

          {/* Col 5: Contact Info */}
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
            <a
              href="/privacy"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('privacy') : undefined; }}
              className="hover:text-[#E5C158] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('terms') : undefined; }}
              className="hover:text-[#E5C158] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/refund-policy"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('refund-policy') : undefined; }}
              className="hover:text-[#E5C158] transition-colors"
            >
              Refund Policy
            </a>
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
