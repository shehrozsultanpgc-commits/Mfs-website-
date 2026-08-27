import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Mail, Phone, MapPin, MessageCircle, Linkedin, Globe } from 'lucide-react';
import { MFSLogo } from './common/MFSLogo';
import { GooglePreferredSourceBadge } from './common/GooglePreferredSourceBadge';

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
            <MFSLogo variant="full" size={40} />

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              MFS Growth Agency is a modern online digital services agency delivering executive presentations, custom academic writing, ATS resumes, and corporate reports to students and professionals globally.
            </p>

            {/* Socials & Verified Citations */}
            <div className="flex items-center gap-2 mt-2">
              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/muhammad-shehroz-sultan-1237543a9"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#050507] hover:bg-[#E5C158] hover:border-[#E5C158] transition-all"
                title="Muhammad Shehroz Sultan — Official LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/mfsgrowth?igsh=M2JwbWJ5M2txc2Z1"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#050507] hover:bg-[#E5C158] hover:border-[#E5C158] transition-all"
                title="Follow on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.facebook.com/share/1G4CCwakiW/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#050507] hover:bg-[#E5C158] hover:border-[#E5C158] transition-all"
                title="Follow on Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.crunchbase.com/organization/mfs-growth-agency"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#050507] hover:bg-[#E5C158] hover:border-[#E5C158] transition-all"
                title="Crunchbase Organization Directory"
              >
                <Globe className="w-3.5 h-3.5" />
              </motion.a>
            </div>

            {/* Google Preferred Source Feature */}
            <div className="pt-2">
              <GooglePreferredSourceBadge variant="compact" />
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-poppins font-bold uppercase tracking-wider text-white text-xs mb-2">
              Services
            </h4>
            <a
              href="/services/presentation-design"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('hub-presentation') : onOpenOrderModal(); }}
              className="text-left hover:text-[#E5C158] transition-colors"
            >
              Presentation Design
            </a>
            <a
              href="/services/assignment-writing"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('hub-assignment') : onOpenOrderModal(); }}
              className="text-left hover:text-[#E5C158] transition-colors"
            >
              Assignment Writing
            </a>
            <a
              href="/services/resume-cv-services"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('hub-resume') : onOpenOrderModal(); }}
              className="text-left hover:text-[#E5C158] transition-colors"
            >
              Resume & CV Services
            </a>
            <a
              href="/services/report-formatting"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('hub-formatting') : onOpenOrderModal(); }}
              className="text-left hover:text-[#E5C158] transition-colors"
            >
              Report Formatting
            </a>
          </div>

          {/* Col 3: Knowledge & Tools */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-poppins font-bold uppercase tracking-wider text-white text-xs mb-2">
              Free Utilities
            </h4>
            <a
              href="/tools"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigatePage) onNavigatePage('tools');
              }}
              className="text-left text-[#E5C158] hover:underline font-semibold transition-colors cursor-pointer"
            >
              All Free Tools
            </a>
            <a
              href="/tools/ats-resume-scanner"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigatePage) onNavigatePage('tool-ats-scanner');
              }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              ATS Resume Scanner
            </a>
            <a
              href="/tools/pitch-deck-builder"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigatePage) onNavigatePage('tool-pitch-deck');
              }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Pitch Deck Architect
            </a>
            <a
              href="/tools/citation-generator"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigatePage) onNavigatePage('tool-citation-gen');
              }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Citation Generator
            </a>
            <a
              href="/tools/document-estimator"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigatePage) onNavigatePage('tool-doc-estimator');
              }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Turnaround Calculator
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
              href="/our-work"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('our-work') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Our Work
            </a>
            <a
              href="/brand-assets"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('brand-assets') : undefined; }}
              className="text-left text-[#E5C158] hover:underline font-semibold transition-colors cursor-pointer"
            >
              Brand Media Hub
            </a>
            <a
              href="/case-studies"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('case-studies') : undefined; }}
              className="text-left text-[#E5C158] hover:underline font-semibold transition-colors cursor-pointer"
            >
              Case Studies
            </a>
            <a
              href="/referrals"
              onClick={(e) => { e.preventDefault(); onNavigatePage ? onNavigatePage('referrals') : undefined; }}
              className="text-left hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Referral Rewards (15%)
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
            <div className="flex items-start gap-2 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#E5C158] shrink-0 mt-0.5" />
              <div className="text-[11px] text-neutral-300 leading-relaxed">
                <span className="text-[#E5C158] font-semibold block">Global Operations:</span>
                Digital-first agency serving clients worldwide 24/7. Physical headquarters is in progress; official premises details will be announced upon launch.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#E5C158]" />
              <a href="mailto:mfsmedia.agency@gmail.com" className="hover:text-[#E5C158]">mfsmedia.agency@gmail.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#E5C158]" />
              <a href="tel:+923015323689" className="hover:text-[#E5C158]">+92 301 5323689</a>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <a
                href="https://wa.me/923015323689?text=Hello%20MFS%20Growth%20Agency!%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%2050%25%20Launch%20Discount."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#28C76F] hover:text-[#25D366] font-semibold transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp (24/7 Support)</span>
              </a>
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
