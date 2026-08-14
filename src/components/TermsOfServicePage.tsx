import React from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Award,
  Lock,
  Globe,
  Sparkles,
  Scale,
} from 'lucide-react';

interface TermsOfServicePageProps {
  onNavigatePage?: (page: any, targetSection?: string) => void;
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
  onShowToast?: (msg: string) => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({
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
              <Scale className="w-3.5 h-3.5" />
              <span>Service Agreement</span>
            </span>
          </div>
        </div>

        {/* Header Section */}
        <header className="space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-poppins tracking-tight text-white">
            Terms of <span className="gold-pure-gradient">Service</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
            Please review the terms and conditions governing all service orders, project deliverables, payment processing, and customer responsibilities with MFS Growth Agency.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
            <span>Last Updated: August 2026</span>
            <span>•</span>
            <span>Effective Date: Immediate</span>
            <span>•</span>
            <span className="text-[#28C76F]">Status: Active & Binding</span>
          </div>
        </header>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold font-poppins text-white uppercase tracking-wider">50% Launch Discount</h3>
            <p className="text-[11px] text-neutral-400 leading-normal">
              All listed rates reflect active 50% Grand Launch promotional pricing applied automatically.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#28C76F]/10 border border-[#28C76F]/30 flex items-center justify-center text-[#28C76F]">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold font-poppins text-white uppercase tracking-wider">Fast Turnaround</h3>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Express delivery available in 12–24 hours; Standard delivery in 24–48 hours depending on scope.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold font-poppins text-white uppercase tracking-wider">Free Revisions</h3>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Complimentary revisions provided within 7 days of delivery to align with original order guidelines.
            </p>
          </div>
        </div>

        {/* Detailed Articles */}
        <article className="space-y-10 text-sm leading-relaxed text-neutral-300">

          {/* 1. Acceptance & Agreement */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <FileText className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">1. Acceptance of Terms</h2>
            </div>
            <p>
              By accessing the website at <code className="text-[#E5C158] font-mono">https://mfsgrowth.online/</code>, submitting an order, uploading files, or engaging with our support channels, you confirm that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of our platform.
            </p>
          </section>

          {/* 2. Scope of Agency Digital Services */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Award className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">2. Scope of Digital Services Offered</h2>
            </div>
            <p>
              MFS Growth Agency provides high-quality digital solutions for students and working professionals, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <span className="font-bold text-[#E5C158] block font-poppins">Presentation Design</span>
                <p className="text-neutral-400">Executive pitch decks, academic slide presentations, corporate slide decks, and infographics in PPTX, PDF, or Google Slides format.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <span className="font-bold text-[#E5C158] block font-poppins">Academic Assignment Assistance</span>
                <p className="text-neutral-400">Custom academic research assistance, formatting, proofreading, model solutions, and reference styling (APA, Harvard, MLA, IEEE, Oxford).</p>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <span className="font-bold text-[#E5C158] block font-poppins">ATS Resume & CV Engineering</span>
                <p className="text-neutral-400">ATS-compliant single-column resume design, professional CV writing, cover letters, and LinkedIn profile optimization.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <span className="font-bold text-[#E5C158] block font-poppins">Corporate Report Formatting</span>
                <p className="text-neutral-400">Business proposals, case studies, whitepapers, formatting, and executive document styling.</p>
              </div>
            </div>
          </section>

          {/* 3. Academic Service Positioning & Integrity */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <BookOpen className="w-5 h-5 text-[#3B82F6]" />
              <h2 className="text-lg font-bold font-poppins text-white">3. Academic Services Disclaimer & Responsible Use</h2>
            </div>
            <p>
              Our academic assignment assistance, proofreading, and research services are designed as educational support tools, reference materials, model research solutions, and formatting guidance to assist students in mastering their coursework.
            </p>
            <ul className="space-y-2 text-xs list-disc list-inside text-neutral-300">
              <li>Clients are responsible for utilizing delivered materials in accordance with their respective institutional academic integrity policies and guidelines.</li>
              <li>We do not guarantee specific academic grades, university admission outcomes, or examination scores.</li>
              <li>Delivered model research papers and assignments serve as reference material to assist in personal study and preparation.</li>
            </ul>
          </section>

          {/* 4. Client Responsibilities & Project Briefs */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <CheckCircle2 className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">4. Client Responsibilities & Project Briefs</h2>
            </div>
            <p>
              To ensure timely and accurate completion of your project, clients agree to:
            </p>
            <ul className="space-y-2 text-xs list-disc list-inside text-neutral-300">
              <li>Provide complete and accurate project briefs, rubrics, word counts, slide requirements, and deadline details at the time of order placement.</li>
              <li>Upload all necessary source documents, reference papers, guidelines, or branding materials required to execute the work.</li>
              <li>Respond promptly to support queries or clarification requests sent via WhatsApp or email. Delays in client communication will adjust delivery schedules accordingly.</li>
            </ul>
          </section>

          {/* 5. Pricing, Rates & Payment Terms */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <CreditCard className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">5. Pricing, Currency Rates & Payment Requirements</h2>
            </div>
            <p>
              All prices displayed on the website or calculated using our Live Pricing Tool incorporate our active 50% Grand Launch discount.
            </p>
            <ul className="space-y-2 text-xs list-disc list-inside text-neutral-300">
              <li><strong className="text-white">Supported Currencies:</strong> Rates can be viewed and paid in PKR, USD, GBP, EUR, or AED.</li>
              <li><strong className="text-white">Payment Accounts:</strong> Manual payment transfers are accepted via EasyPaisa (<code className="text-[#E5C158] font-mono">03116191234</code>), JazzCash (<code className="text-[#E5C158] font-mono">03015323688</code>), or Askari Bank (<code className="text-[#E5C158] font-mono">00553230017265</code>) under Title: <strong className="text-white">Muhammad Shehroz Sultan</strong>.</li>
              <li><strong className="text-white">Production Start:</strong> Orders enter active production queue immediately upon receipt and verification of the payment transfer proof screenshot and transaction ID.</li>
            </ul>
          </section>

          {/* 6. Delivery Timelines & Revisions */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Clock className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">6. Delivery Timelines & Revision Policy</h2>
            </div>
            <p>
              Project delivery times correspond to the speed tier selected during order placement (Express, Priority, or Standard). Completed deliverables are delivered electronically via the Client Dashboard and WhatsApp/Email.
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <span className="font-bold text-white block">Free Revision Window</span>
              <p className="text-neutral-400">
                Clients are entitled to free revisions within <strong className="text-white">7 days</strong> of deliverable receipt, provided the revision request aligns with the original project brief and guidelines submitted during order placement. Scope additions or structural changes requested after order placement may incur additional fees.
              </p>
            </div>
          </section>

          {/* 7. Intellectual Property & Deliverables */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Lock className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">7. Intellectual Property & Deliverable Ownership</h2>
            </div>
            <p>
              Upon receipt of full payment, all customized project deliverables (presentation slides, formatted resumes, research reports) become the property of the client for personal, academic, or commercial use. MFS Growth Agency retains the right to display non-confidential, anonymized visual previews in our "Our Work" showcase unless the client requests an NDA opt-out.
            </p>
          </section>

          {/* 8. Limitation of Liability */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <AlertCircle className="w-5 h-5 text-[#FF9F43]" />
              <h2 className="text-lg font-bold font-poppins text-white">8. Limitation of Liability & Service Disclaimers</h2>
            </div>
            <p className="text-xs text-neutral-300">
              MFS Growth Agency strives for exceptional quality in every project. However, the agency shall not be held liable for indirect, consequential, or incidental outcomes, including but not limited to academic grading decisions, employment hiring outcomes, investor capital decisions, or third-party platform actions. Total agency liability under any circumstance is strictly capped at the total fee paid for the specific order.
            </p>
          </section>

          {/* 9. Contact Section */}
          <section className="space-y-4 p-6 rounded-2xl bg-white/5 border border-[#E5C158]/30">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <HelpCircle className="w-5 h-5 text-[#E5C158]" />
              <h2 className="text-lg font-bold font-poppins text-white">9. Questions & Support Contacts</h2>
            </div>
            <p className="text-xs text-neutral-300">
              If you have any questions or require clarification regarding these Terms of Service, please contact our support team:
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-white block font-poppins">Official Support Desk</span>
                <span className="text-xs font-mono text-[#E5C158] block">mfsmedia.agency@gmail.com</span>
                <span className="text-[11px] font-mono text-neutral-400 block">+92 301 5323689 (WhatsApp Line)</span>
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
            onClick={() => onNavigatePage?.('privacy')}
            className="text-neutral-400 hover:text-[#E5C158] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Read Privacy Policy</span>
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
