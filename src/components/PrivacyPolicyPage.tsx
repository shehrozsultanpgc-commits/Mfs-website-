import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileText,
  CreditCard,
  Eye,
  Database,
  Server,
  UserCheck,
  Mail,
  Phone,
  ArrowLeft,
  ArrowRight,
  Globe,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigatePage?: (page: any, targetSection?: string) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
  onShowToast?: (msg: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onNavigatePage,
  onOpenAIChat,
  onShowToast,
}) => {
  return (
    <main className="min-h-screen bg-[#050507] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-[#E5C158]/30 selection:text-[#E5C158]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Breadcrumb / Back Button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <button
            onClick={() => onNavigatePage?.('home')}
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#E5C158] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[11px] font-mono text-[#E5C158]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Agency Policy</span>
            </span>
          </div>
        </div>

        {/* Header Section */}
        <header className="space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-poppins tracking-tight text-white">
            Privacy <span className="gold-pure-gradient">Policy</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
            MFS Growth Agency is committed to protecting your personal information, project files, and financial details. This Privacy Policy outlines how data is handled with strict confidentiality.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
            <span>Last Updated: August 2026</span>
            <span>•</span>
            <span>Effective Date: Immediate</span>
            <span>•</span>
            <span className="text-[#28C76F]">Status: Active & Enforced</span>
          </div>
        </header>

        {/* Policy Highlights Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold font-poppins text-white uppercase tracking-wider">File Privacy</h3>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Uploaded project guidelines and materials are stored on encrypted servers and never shared externally.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F]">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold font-poppins text-white uppercase tracking-wider">Zero Data Selling</h3>
            <p className="text-[11px] text-neutral-400 leading-normal">
              We never sell, trade, or monetize customer contact details or project deliverables to third parties.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold font-poppins text-white uppercase tracking-wider">Encrypted Storage</h3>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Payment proofs and order metadata are protected with role-based access controls and SSL encryption.
            </p>
          </div>
        </div>

        {/* Detailed Content Sections */}
        <article className="space-y-10 text-sm leading-relaxed text-neutral-300">
          
          {/* Section 1: Information We Collect */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <UserCheck className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">1. Information We Collect</h2>
            </div>
            <p>
              When you interact with MFS Growth Agency—whether submitting an order, calculating pricing, requesting a consultation, or communicating via WhatsApp/Email—we collect only necessary details required to fulfill your digital service request:
            </p>
            <ul className="space-y-2 text-xs list-disc list-inside text-neutral-300">
              <li><strong className="text-white">Contact Details:</strong> Your name, email address, and phone/WhatsApp number submitted via order forms, contact inquiries, or account authentication.</li>
              <li><strong className="text-white">Project Files & Briefs:</strong> Documents, PDF rubrics, DOCX guidelines, PPTX reference slides, images, or ZIP archives uploaded during the order process.</li>
              <li><strong className="text-white">Payment Proofs:</strong> Transaction screenshots, EasyPaisa/JazzCash reference IDs, or bank transfer slips provided for manual payment verification.</li>
              <li><strong className="text-white">Order Identifiers:</strong> Automatically generated Order IDs (e.g. <code className="text-[#E5C158] font-mono">#MFS-XXXXX</code>) used to track progress in your Client Dashboard.</li>
              <li><strong className="text-white">AI Concierge Queries:</strong> Text or voice prompts submitted to the MFS AI Assistant to assist with service selection and pricing guidance.</li>
            </ul>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <FileText className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">2. How Your Information Is Used</h2>
            </div>
            <p>
              Your data is processed strictly for legitimate agency service operations and client fulfillment:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-bold text-white block">Project Delivery</span>
                <p className="text-neutral-400">Designing pitch decks, drafting academic research assistance, formatting ATS resumes, and engineering corporate reports.</p>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-bold text-white block">Order Notifications</span>
                <p className="text-neutral-400">Sending real-time project status updates, payment confirmations, and completed download links via WhatsApp or email.</p>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-bold text-white block">Customer Support</span>
                <p className="text-neutral-400">Responding to inquiry messages, answering pre-sale questions, and processing revision requests efficiently.</p>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-bold text-white block">Payment Verification</span>
                <p className="text-neutral-400">Matching manual EasyPaisa, JazzCash, or Askari Bank transfer proofs with pending order invoices.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Project File Confidentiality */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Lock className="w-5 h-5 text-[#28C76F]" />
              <h2 className="text-lg font-bold font-poppins text-white">3. Project File Confidentiality & Protection</h2>
            </div>
            <p>
              We recognize that project files—including academic coursework briefs, executive business pitch decks, and personal resumes—contain sensitive information.
            </p>
            <ul className="space-y-2 text-xs list-disc list-inside text-neutral-300">
              <li><strong className="text-white">Strict Internal Access:</strong> Only designated production specialists assigned to your project have access to your uploaded guidelines.</li>
              <li><strong className="text-white">No Public Exposure:</strong> Client deliverables are never published, resold, or repurposed as public templates unless explicitly anonymized for our sample showcase with your permission.</li>
              <li><strong className="text-white">Secured Preview Controls:</strong> Samples in "Our Work" feature watermarking and context protection to prevent unauthorized distribution.</li>
            </ul>
          </section>

          {/* Section 4: Cookies & Local Storage */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Server className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">4. Cookies & Local Storage Usage</h2>
            </div>
            <p>
              Our application uses standard client-side browser storage (such as <code className="text-[#E5C158] font-mono">localStorage</code>) solely for functional preferences:
            </p>
            <ul className="space-y-2 text-xs list-disc list-inside text-neutral-300">
              <li>Storing your selected currency preference (PKR, USD, GBP, EUR, AED).</li>
              <li>Maintaining active session state for your Client Dashboard login token.</li>
              <li>Preserving temporary progress in the pricing calculator and order submission wizard.</li>
            </ul>
            <p className="text-xs text-neutral-400">
              We do not track cross-site browsing history or inject third-party ad-tracking cookies.
            </p>
          </section>

          {/* Section 5: Data Retention & Security */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">5. Data Retention & Safeguards</h2>
            </div>
            <p>
              Project deliverables and order records are retained securely to allow you to download past files and request revisions. You may request permanent deletion of your project files from our servers at any time by contacting support.
            </p>
            <p className="text-xs text-neutral-400">
              While we enforce SSL/TLS encryption for all data transmissions and apply strict administrative permissions, no internet system can guarantee 100% absolute security against external breaches. We continuously maintain proactive security measures to safeguard client data.
            </p>
          </section>

          {/* Section 6: Remote Operating Model */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Globe className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">6. Online Remote Agency Operating Model</h2>
            </div>
            <p>
              MFS Growth Agency operates as a digital-first, online remote service platform serving clients across Pakistan, the United Arab Emirates, Saudi Arabia, the United Kingdom, the United States, and globally. All orders, project updates, and deliveries are conducted electronically.
            </p>
          </section>

          {/* Section 7: User Rights & Contact */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/5 border border-[#E5C158]/30">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Mail className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">7. Your Rights & Privacy Enquiries</h2>
            </div>
            <p className="text-xs text-neutral-300">
              You have the right to request access to the personal information we hold about you, request corrections to inaccurate data, or ask for file deletion once your order is fulfilled.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-white block font-poppins">Official Privacy Contact</span>
                <span className="text-xs font-mono text-[#E5C158] block">mfsmedia.agency@gmail.com</span>
                <span className="text-[11px] font-mono text-neutral-400 block">+92 301 5323689 (WhatsApp Support)</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigatePage?.('contact')}
                  className="px-4 py-2 rounded-xl bg-[#E5C158] hover:bg-[#D4AF37] text-[#050507] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#E5C158]/10"
                >
                  <span>Contact Support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>

        </article>

        {/* Footer Navigation CTAs */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <button
            onClick={() => onNavigatePage?.('terms')}
            className="text-neutral-400 hover:text-[#E5C158] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Read Terms of Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigatePage?.('refund-policy')}
            className="text-neutral-400 hover:text-[#E5C158] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Read Refund Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </main>
  );
};
