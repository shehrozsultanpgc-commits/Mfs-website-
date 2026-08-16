import React, { useState } from 'react';
import {
  FileText,
  Layout,
  Type,
  Table,
  BarChart2,
  CheckCircle2,
  ListChecks,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  Share2,
  Check,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Layers,
  FileCheck,
  FileSpreadsheet,
  PieChart,
  Eye,
  Sliders,
  AlignLeft,
  ChevronRight,
  Briefcase,
  Globe,
  Award,
  HelpCircle
} from 'lucide-react';

export default function CorporateReportGuidePage() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleChecklist = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const tableOfContents = [
    { id: 'definition', title: '1. What is Corporate Formatting?' },
    { id: 'structure', title: '2. Standard Report Structure' },
    { id: 'page-layout', title: '3. Page Layout & Margins' },
    { id: 'typography', title: '4. Typography & Font Hierarchy' },
    { id: 'exec-summary', title: '5. Executive Summary Rules' },
    { id: 'navigation', title: '6. TOC & Section Numbering' },
    { id: 'data-presentation', title: '7. Tables, Charts & Visual Data' },
    { id: 'headers-footers', title: '8. Headers, Footers & Control' },
    { id: 'color-system', title: '9. Color & Palette Rules' },
    { id: 'report-types', title: '10. Report Types Comparison' },
    { id: 'quality-control', title: '11. Quality Control Framework' },
    { id: 'checklist', title: '12. 20-Point Interactive Checklist' },
    { id: 'mistakes', title: '13. 10 Critical Formatting Errors' },
    { id: 'final-audit', title: '14. 5-Minute Pre-Flight Audit' },
    { id: 'takeaways', title: '15. Key Takeaways' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const checklistItems = [
    { id: 1, label: 'Document purpose, target audience, and scope explicitly stated on title page or introduction.' },
    { id: 2, label: 'Professional title page includes title, subtitle, author, department, date, and document version.' },
    { id: 3, label: 'Consistent page margins maintained across all pages (minimum 1.0 inch / 2.54 cm).' },
    { id: 4, label: 'Heading hierarchy strictly adheres to sequential H1 > H2 > H3 structure without skipping levels.' },
    { id: 5, label: 'Body font selection utilizes highly legible corporate sans-serif or serif (10pt–11.5pt).' },
    { id: 6, label: 'Line height set between 1.25 and 1.5 with consistent paragraph spacing (6pt–8pt after).' },
    { id: 7, label: 'Functional Table of Contents with accurate, automated page numbers and clear dot leaders.' },
    { id: 8, label: 'Page numbers formatted correctly (Roman numerals for front matter, Arabic for main body).' },
    { id: 9, label: 'Headers and footers contain report title, confidentiality notice, and date stamp.' },
    { id: 10, label: 'Executive summary contains standalone key findings, metrics, and decision-required items.' },
    { id: 11, label: 'Tables feature explicit column headers, right-aligned numeric data, and clear units of measure.' },
    { id: 12, label: 'Charts contain descriptive titles, legend keys, explicit axis labels, and source attributions.' },
    { id: 13, label: 'Corporate color palette applied conservatively (max 2–3 brand accents plus neutral grays).' },
    { id: 14, label: 'Pages maintain generous negative space without overcrowded blocks or orphaned lines.' },
    { id: 15, label: 'Consistent left-alignment for all body text; avoiding full-justification uneven rivers.' },
    { id: 16, label: 'Bibliographic references and citations follow a standardized style (APA 7, Harvard, or IEEE).' },
    { id: 17, label: 'Appendices labeled sequentially (Appendix A, Appendix B) and cross-referenced in main body.' },
    { id: 18, label: 'No accidental trailing blank pages, widowed section headings, or isolated single lines.' },
    { id: 19, label: 'Document proofread for zero typographical, grammatical, or numerical alignment errors.' },
    { id: 20, label: 'Final PDF export verified for font embedding, clickable TOC links, and high resolution.' },
  ];

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = Math.round((checkedCount / checklistItems.length) * 100);

  const reportStructures = [
    { section: '1. Cover / Title Page', purpose: 'Establishes document identity, author, date, and corporate branding.', rule: 'Full page layout; no headers/footers; includes title, subtitle, author, date, & status.' },
    { section: '2. Executive Summary', purpose: 'Provides a standalone overview for C-suite decision-makers.', rule: '1–2 pages max; standalone synthesis; includes metrics, findings, & recommendations.' },
    { section: '3. Table of Contents', purpose: 'Enables instant document navigation and structural scanning.', rule: 'Automated fields; dot leaders; includes H1/H2 headings, figures, & tables lists.' },
    { section: '4. Introduction & Purpose', purpose: 'Defines project background, scope, objectives, and limitations.', rule: 'Concise context setting; defines core business problem and reporting boundary.' },
    { section: '5. Background / Context', purpose: 'Outlines historical data, prior initiatives, or market context.', rule: 'Fact-based narrative; objective tone; references prior corporate documentation.' },
    { section: '6. Methodology & Data Sources', purpose: 'Validates reporting integrity and analytical rigor.', rule: 'Explicitly discloses data gathering channels, sample sizes, & audit boundaries.' },
    { section: '7. Findings & Analysis', purpose: 'Presents primary evidence, operational data, and core insights.', rule: 'Organized by theme or KPI; supported by structured tables and visual charts.' },
    { section: '8. Tables & Visual Evidence', purpose: 'Translates complex datasets into digestible executive visualizations.', rule: 'Numbered sequentially (Table 1, Figure 1); captioned with source attribution.' },
    { section: '9. Recommendations', purpose: 'Provides actionable, prioritized steps for strategic decision-making.', rule: 'Numbered bullet lists; cost-benefit impact indicators; clear ownership.' },
    { section: '10. Conclusion', purpose: 'Summarizes key analytical conclusions without introducing new data.', rule: '1–3 paragraphs; reinforces core strategic direction established in analysis.' },
    { section: '11. References / Sources', purpose: 'Ensures compliance, auditability, and academic/corporate rigor.', rule: 'Standardized citation style (APA, Harvard, or IEEE); consistent indentation.' },
    { section: '12. Appendices', purpose: 'Houses detailed raw datasets, survey samples, or technical specifications.', rule: 'Labeled sequentially (Appendix A, B); cited explicitly within body text.' },
  ];

  const reportTypes = [
    { type: 'Annual Report', audience: 'Shareholders, Board & Public', length: '30–120 Pages', focus: 'Financial performance, governance, strategic vision, compliance disclosures.' },
    { type: 'Management Report', audience: 'Executive Leadership & C-Suite', length: '10–30 Pages', focus: 'Operational KPIs, resource allocation, variance analysis, strategic risks.' },
    { type: 'Financial Report', audience: 'Auditors, Finance Team, Investors', length: '15–50 Pages', focus: 'Balance sheets, P&L statements, cash flows, auditing notes, GAAP compliance.' },
    { type: 'Research / Market Analysis', audience: 'Strategy Teams & Investors', length: '15–40 Pages', focus: 'Market sizing, competitive benchmarking, survey results, trend forecasts.' },
    { type: 'Project Status Report', audience: 'Project Sponsors & PMO', length: '5–15 Pages', focus: 'Milestone tracking, budget utilization, risk register, immediate blockers.' },
    { type: 'Business Proposal / Pitch', audience: 'Prospective Clients & Partners', length: '10–25 Pages', focus: 'Value proposition, implementation scope, pricing schedules, SLAs.' },
    { type: 'Executive Briefing Note', audience: 'Senior Decision-Makers', length: '2–5 Pages', focus: 'Rapid decision synthesis, background, option appraisal, key recommendation.' },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-[#CFCFCF] selection:bg-[#E5C158] selection:text-[#050507] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#9FA0A7] font-mono">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <ChevronRight className="w-3 h-3 text-[#9FA0A7]/50" />
          <a href="/guides" className="hover:text-white transition-colors">
            Guides
          </a>
          <ChevronRight className="w-3 h-3 text-[#9FA0A7]/50" />
          <span className="text-[#E5C158] truncate">Corporate Report Formatting Standards Guide</span>
        </nav>

        {/* HERO SECTION */}
        <header className="relative bg-[#0F0F14] border border-[#22222E] rounded-2xl p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#E5C158] uppercase tracking-wider mb-4">
            <span className="flex items-center gap-1.5 bg-[#E5C158]/10 px-3 py-1 rounded-full border border-[#E5C158]/20">
              <FileCheck className="w-3.5 h-3.5" /> Corporate Knowledge Guide
            </span>
            <span className="text-[#9FA0A7]">•</span>
            <span className="flex items-center gap-1 text-[#9FA0A7]">
              <Clock className="w-3.5 h-3.5" /> 18 Min Read
            </span>
            <span className="text-[#9FA0A7]">•</span>
            <span className="text-[#9FA0A7]">Updated 2026 Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Corporate Report Formatting Standards Guide: <span className="text-[#E5C158]">Professional Structure, Layout & Presentation Rules</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9FA0A7] leading-relaxed max-w-3xl mb-8">
            A comprehensive, industry-aligned handbook for business leaders, consultants, analysts, and project teams. Learn how to format high-impact corporate reports with executive visual hierarchy, rigorous data tables, clean typography, and seamless navigation.
          </p>

          {/* Guide Metadata Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#22222E] text-xs">
            <div>
              <span className="block text-[#9FA0A7] uppercase font-mono">Primary Focus</span>
              <span className="text-white font-medium text-sm">Executive Document Formatting</span>
            </div>
            <div>
              <span className="block text-[#9FA0A7] uppercase font-mono">Standard Scope</span>
              <span className="text-white font-medium text-sm">Business, Finance & Strategy</span>
            </div>
            <div>
              <span className="block text-[#9FA0A7] uppercase font-mono">Audience</span>
              <span className="text-white font-medium text-sm">Executives & Analysts</span>
            </div>
            <div>
              <span className="block text-[#9FA0A7] uppercase font-mono">Quality Standard</span>
              <span className="text-[#28C76F] font-medium text-sm flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Audit Verified
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[#22222E]">
            <button
              onClick={() => scrollToSection('checklist')}
              className="inline-flex items-center gap-2 bg-[#E5C158] hover:bg-[#D4AF37] text-[#050507] font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-lg"
            >
              <ListChecks className="w-4 h-4" /> Go to 20-Point Checklist
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-[#1A1A22] hover:bg-[#252530] text-white text-xs px-4 py-2.5 rounded-lg border border-[#2A2A38] transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#28C76F]" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Link Copied!' : 'Share Guide'}
            </button>
          </div>

          {/* Top Author Attribution Block */}
          <div className="mt-6 pt-4 border-t border-[#22222E] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#E5C158]/20 border border-[#E5C158]/40 flex items-center justify-center text-[#E5C158] font-bold text-xs shrink-0 font-poppins">
              MS
            </div>
            <div className="text-xs">
              <span className="text-[#9FA0A7] block font-mono">Written & Reviewed by</span>
              <span className="font-semibold text-white font-poppins flex flex-wrap items-center gap-2">
                Muhammad Shehroz Sultan
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 font-mono font-normal">
                  Founder & Lead Director, MFS Growth Agency
                </span>
              </span>
            </div>
          </div>
        </header>

        {/* TABLE OF CONTENTS CARD */}
        <nav aria-label="Guide Table of Contents" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6">
          <div className="flex items-center gap-2 text-white font-semibold text-base mb-4 border-b border-[#22222E] pb-3">
            <BookOpen className="w-5 h-5 text-[#E5C158]" />
            <span>Table of Contents & Quick Navigation</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            {tableOfContents.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-[#9FA0A7] hover:text-[#E5C158] hover:bg-[#1A1A22] p-2 rounded transition-colors flex items-center justify-between group"
              >
                <span className="truncate">{item.title}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#E5C158]" />
              </button>
            ))}
          </div>
        </nav>

        {/* SECTION 1: WHAT IS CORPORATE REPORT FORMATTING */}
        <section id="definition" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4" /> Section 01
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">1. What is Corporate Report Formatting?</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Corporate report formatting is the systematic application of typographic hierarchy, grid layout rules, page geometry, visual data presentation, and brand consistency to business documentation. Unlike informal emails or basic internal memos, executive corporate reports serve as formal records of organizational performance, strategic appraisals, financial audits, and regulatory submissions.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Decision-makers at board and executive levels digest dozens of complex reports weekly. Professional formatting translates dense raw business data into structured, highly readable intelligence—drastically reducing cognitive friction, accelerating comprehension, and building organizational credibility. For custom document design and template creation, explore MFS Growth Agency's <a href="/services#reports" className="text-[#E5C158] font-medium underline hover:text-white transition-colors">business & corporate report formatting service</a>.
          </p>

          {/* At a Glance Callout Box */}
          <div className="bg-[#12121A] border-l-4 border-[#E5C158] p-5 rounded-r-xl space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-[#E5C158]" />
              <span>At a Glance: Why Executive Formatting Matters</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#9FA0A7] pt-2">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#E5C158] shrink-0 mt-0.5" />
                <span><strong className="text-white">Reduces Executive Scanning Time:</strong> Clear section anchors allow C-suite skimming in under 3 minutes.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#E5C158] shrink-0 mt-0.5" />
                <span><strong className="text-white">Establishes Institutional Trust:</strong> Clean typography signals meticulous research and analytical rigor.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#E5C158] shrink-0 mt-0.5" />
                <span><strong className="text-white">Eliminates Ambiguity:</strong> Standardized tables and labeled charts prevent data misinterpretation.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#E5C158] shrink-0 mt-0.5" />
                <span><strong className="text-white">Ensures Regulatory Compliance:</strong> Aligns governance disclosures with corporate archiving standards.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: STANDARD REPORT STRUCTURE */}
        <section id="structure" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" /> Section 02
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">2. The Standard Structure of a Professional Corporate Report</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            While internal brand guidelines vary across multinational firms, authoritative business documentation follows a universally recognized 12-part structural sequence. Adhering to this architecture ensures that readers immediately know where to locate background data, strategic analysis, financial impact models, and actionable recommendations.
          </p>

          {/* Structure Table */}
          <div className="overflow-x-auto border border-[#22222E] rounded-lg">
            <table className="w-full text-left text-xs text-[#CFCFCF]">
              <thead className="bg-[#1A1A22] text-white uppercase font-mono border-b border-[#22222E]">
                <tr>
                  <th className="p-3">Section Name</th>
                  <th className="p-3">Core Purpose</th>
                  <th className="p-3">Key Formatting Consideration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22222E] bg-[#0F0F14]">
                {reportStructures.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#14141C] transition-colors">
                    <td className="p-3 font-semibold text-white whitespace-nowrap">{item.section}</td>
                    <td className="p-3 text-[#9FA0A7]">{item.purpose}</td>
                    <td className="p-3 text-[#CFCFCF] font-mono">{item.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: PAGE LAYOUT & MARGINS */}
        <section id="page-layout" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <Layout className="w-4 h-4" /> Section 03
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">3. Corporate Report Page Layout Standards</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Page geometry establishes the visual container for your text and data. Poor margin choices, cramped line spacing, or inconsistent page dimensions immediately undermine report professionalism.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-2">
              <div className="text-white font-semibold text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#E5C158]" /> Page Dimensions & Margins
              </div>
              <p className="text-[#9FA0A7]">
                Standard Letter (8.5&quot; x 11&quot;) or A4 (210 x 297mm). Margins must be set to a minimum of <strong className="text-white">1.0 inch (2.54 cm)</strong> on all sides. Binding margins require an additional 0.25&quot; gutter if hardcopy printing is required.
              </p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-2">
              <div className="text-white font-semibold text-sm flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-[#E5C158]" /> Alignment & Grid System
              </div>
              <p className="text-[#9FA0A7]">
                Use <strong className="text-white">left-aligned text</strong> for body paragraphs. Avoid full-justification in narrow columns, as it introduces awkward, uneven horizontal gaps (&quot;rivers&quot;) that disrupt eye movements.
              </p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-2">
              <div className="text-white font-semibold text-sm flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#E5C158]" /> White Space & Density
              </div>
              <p className="text-[#9FA0A7]">
                Maintain 20%–30% negative space on every page. Ensure major H1 sections begin on a fresh page using explicit hard page breaks rather than repeated manual paragraph breaks.
              </p>
            </div>
          </div>

          <p className="text-xs text-[#9FA0A7] italic bg-[#12121A] p-3 rounded border border-[#22222E]">
            * Note: While 1.0-inch margins represent international corporate standard, always defer to your organization&apos;s master brand identity system or client specification sheets where explicit dimensional overrides are provided.
          </p>
        </section>

        {/* SECTION 4: TYPOGRAPHY & FONT HIERARCHY */}
        <section id="typography" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <Type className="w-4 h-4" /> Section 04
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">4. Typography & Font Hierarchy</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Typographic hierarchy guides the reader through document architecture. A professional corporate report relies on at most two complementary font families: a clean, geometric sans-serif for headings (e.g., Arial, Helvetica, Segoe UI, Inter, Poppins) and a highly readable body font (e.g., Calibri, Times New Roman, Georgia, Inter).
          </p>

          {/* Example Hierarchy Box */}
          <div className="bg-[#0A0A0E] border border-[#22222E] rounded-xl p-6 space-y-4">
            <div className="text-xs font-mono uppercase text-[#E5C158]">Standard Corporate Typographic Scale</div>
            
            <div className="space-y-3 font-sans border-t border-[#1E1E2A] pt-4">
              <div className="border-b border-[#1A1A24] pb-2">
                <span className="text-2xl font-bold text-white block">Document Title (Cover Page) — 28pt–36pt Bold</span>
                <span className="text-xs text-[#9FA0A7]">Tracking: -0.02em | Leading: 1.15 | Color: Primary Dark / Corporate Gold</span>
              </div>

              <div className="border-b border-[#1A1A24] pb-2">
                <span className="text-xl font-bold text-white block">Heading 1 (H1 Section Header) — 18pt–22pt SemiBold</span>
                <span className="text-xs text-[#9FA0A7]">Space Before: 18pt | Space After: 8pt | Page Break Before</span>
              </div>

              <div className="border-b border-[#1A1A24] pb-2">
                <span className="text-lg font-semibold text-[#E5C158] block">Heading 2 (H2 Sub-section) — 14pt–16pt Medium</span>
                <span className="text-xs text-[#9FA0A7]">Space Before: 12pt | Space After: 6pt</span>
              </div>

              <div className="border-b border-[#1A1A24] pb-2">
                <span className="text-base font-medium text-white block">Heading 3 (H3 Topic Lead) — 12pt–13pt SemiBold</span>
                <span className="text-xs text-[#9FA0A7]">Space Before: 8pt | Space After: 4pt</span>
              </div>

              <div className="border-b border-[#1A1A24] pb-2">
                <p className="text-sm text-[#CFCFCF] leading-relaxed">
                  Body Text — 10.5pt–11.5pt Regular. Line spacing: 1.25x–1.4x. Paragraph spacing after: 6pt. Left-aligned, no first-line indents when using paragraph block spacing.
                </p>
                <span className="text-xs text-[#9FA0A7]">Primary body text block container. Max line width: 75 characters.</span>
              </div>

              <div>
                <span className="text-xs text-[#9FA0A7] block italic">Table Text / Captions / Footnotes — 8.5pt–9.5pt Regular</span>
                <span className="text-[10px] text-[#9FA0A7]">Single line spacing | Muted gray or secondary neutral color</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: EXECUTIVE SUMMARY RULES */}
        <section id="exec-summary" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <Zap className="w-4 h-4" /> Section 05
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">5. Executive Summary Formatting</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            The Executive Summary is the most critical 2% of your document. Over 70% of C-level executives read only the executive summary before deciding whether to commission deeper review or approve recommendations. It must function as an independent, standalone mini-report.
          </p>

          {/* Comparison Cards: Good vs Poor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Poor Example */}
            <div className="bg-[#181012] border border-[#3D1A1D] p-5 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-[#EA5455] font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" /> Poor Executive Summary
              </div>
              <p className="text-xs text-[#CFCFCF] leading-relaxed">
                &quot;This report discusses the third quarter operational results and examines various departments. We looked into supply chain issues, marketing expenditures, and HR hiring metrics over the past six months. Several meetings were held with team leaders to gather data and discuss possible improvements...&quot;
              </p>
              <ul className="text-[11px] text-[#EA5455] space-y-1 pt-2 border-t border-[#3D1A1D]">
                <li>❌ Vague narrative without concrete data or metrics</li>
                <li>❌ Focuses on process and meetings rather than outcomes</li>
                <li>❌ Lacks explicit, actionable recommendations</li>
              </ul>
            </div>

            {/* Good Example */}
            <div className="bg-[#101914] border border-[#1B3B2B] p-5 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-[#28C76F] font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Professional Executive Summary
              </div>
              <p className="text-xs text-[#CFCFCF] leading-relaxed">
                &quot;Q3 supply chain bottlenecks reduced gross margin by 3.2% ($1.4M impact). To recover profitability, we recommend restructuring vendor contracts with Tier-1 logistics partners by Q4, yielding an estimated $2.1M annualized cost recovery.&quot;
              </p>
              <ul className="text-[11px] text-[#28C76F] space-y-1 pt-2 border-t border-[#1B3B2B]">
                <li>✅ Lead with quantifiable financial & operational impact</li>
                <li>✅ Clear cause-and-effect structure</li>
                <li>✅ Includes explicit recommendation, timeline, & ROI</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: TOC & SECTION NUMBERING */}
        <section id="navigation" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Section 06
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">6. Table of Contents & Document Navigation</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Any corporate report exceeding 5 pages requires an automated Table of Contents (TOC). Use legal-style decimal section numbering (e.g., 1.0, 1.1, 1.1.1) for technical and financial reports to ensure unambiguous cross-referencing during board discussions.
          </p>

          <div className="bg-[#0A0A0E] border border-[#22222E] rounded-lg p-5 text-xs font-mono space-y-2 text-[#9FA0A7]">
            <div className="text-white font-bold mb-3">Sample Decimal Navigation Architecture</div>
            <div className="flex justify-between border-b border-[#1A1A24] pb-1">
              <span>1.0 Executive Summary ................................................................</span>
              <span className="text-[#E5C158]">Page 3</span>
            </div>
            <div className="flex justify-between border-b border-[#1A1A24] pb-1 pl-4">
              <span>2.0 Market Analysis & Outlook .....................................................</span>
              <span className="text-[#E5C158]">Page 5</span>
            </div>
            <div className="flex justify-between border-b border-[#1A1A24] pb-1 pl-8">
              <span>2.1 Macroeconomic Headwinds .............................................</span>
              <span className="text-[#E5C158]">Page 6</span>
            </div>
            <div className="flex justify-between border-b border-[#1A1A24] pb-1 pl-8">
              <span>2.2 Competitor Market Share Shift .........................................</span>
              <span className="text-[#E5C158]">Page 8</span>
            </div>
            <div className="flex justify-between border-b border-[#1A1A24] pb-1">
              <span>3.0 Operational Performance & KPI Audits ................................</span>
              <span className="text-[#E5C158]">Page 11</span>
            </div>
          </div>
        </section>

        {/* SECTION 7: TABLES, CHARTS & VISUAL DATA */}
        <section id="data-presentation" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <BarChart2 className="w-4 h-4" /> Section 07
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">7. Tables, Charts & Visual Data Presentation</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Data presentation can make or break an executive report. Visual elements must follow rigorous numerical display rules. Never insert raw unformatted spreadsheets or low-resolution chart screenshots into a formal corporate document.
          </p>

          {/* Data Comparison Table */}
          <div className="overflow-x-auto border border-[#22222E] rounded-lg">
            <table className="w-full text-left text-xs text-[#CFCFCF]">
              <thead className="bg-[#1A1A22] text-white uppercase font-mono border-b border-[#22222E]">
                <tr>
                  <th className="p-3 text-[#EA5455]">Poor Data Presentation (Amateur)</th>
                  <th className="p-3 text-[#28C76F]">Professional Data Presentation (Executive)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22222E] bg-[#0F0F14]">
                <tr>
                  <td className="p-3 text-[#9FA0A7]">Numbers left-aligned or center-aligned in table columns</td>
                  <td className="p-3 text-white font-medium">Numbers strictly right-aligned to maintain decimal column alignment</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#9FA0A7]">Missing currency symbols, units (K, M, B), or fiscal year labels</td>
                  <td className="p-3 text-white font-medium">Explicit column header units e.g., &quot;Revenue ($ in Millions, USD)&quot;</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#9FA0A7]">Overly saturated 3D pie charts or heavy grid lines</td>
                  <td className="p-3 text-white font-medium">Clean 2D bar/line charts with subtle horizontal gridlines only</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#9FA0A7]">Unlabeled chart axes or missing source attribution</td>
                  <td className="p-3 text-white font-medium">Explicit chart titles, axis labels, legend key, & Source: [Dataset Name]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 8: HEADERS, FOOTERS & CONTROL */}
        <section id="headers-footers" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <FileSpreadsheet className="w-4 h-4" /> Section 08
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">8. Headers, Footers & Document Control Information</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Headers and footers maintain document control across printed and digital copies. Every page in the main body must display the document title, current section name, page number, and formal confidentiality classification.
          </p>

          <div className="bg-[#14141C] border border-[#22222E] p-5 rounded-xl space-y-4 text-xs">
            <div className="text-white font-semibold text-sm">Header & Footer Layout Anatomy</div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0A0A0E] p-3 rounded border border-[#22222E] space-y-1">
                <span className="text-[#E5C158] font-mono uppercase block text-[10px]">Running Header (Top Margin)</span>
                <p className="text-[#CFCFCF]">Left: Document Title | Right: Current Section Name</p>
                <span className="text-[10px] text-[#9FA0A7]">Separated from main body by a thin 0.5pt hairline border</span>
              </div>

              <div className="bg-[#0A0A0E] p-3 rounded border border-[#22222E] space-y-1">
                <span className="text-[#E5C158] font-mono uppercase block text-[10px]">Running Footer (Bottom Margin)</span>
                <p className="text-[#CFCFCF]">Left: &quot;CONFIDENTIAL — INTERNAL USE ONLY&quot; | Right: Page X of Y</p>
                <span className="text-[10px] text-[#9FA0A7]">Confidentiality labels should strictly match authorized company classifications</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: COLOR & PALETTE RULES */}
        <section id="color-system" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Section 09
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">9. Corporate Report Color & Visual System</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Restraint is the hallmark of professional corporate report design. Limit your color palette to two brand colors (a dominant primary corporate shade and an accent shade) plus a suite of neutral grays for typography and borders.
          </p>

          {/* Visual Consistency Rules Checklist Card */}
          <div className="bg-[#12121A] border border-[#22222E] rounded-xl p-5 space-y-3">
            <div className="text-white font-semibold text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E5C158]" /> Visual Consistency Rules
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9FA0A7]">
              <div className="flex items-start gap-2">
                <span className="text-[#E5C158] font-bold">•</span>
                <span><strong className="text-white">60-30-10 Rule:</strong> 60% dominant neutral background/text, 30% primary brand color, 10% accent highlight.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#E5C158] font-bold">•</span>
                <span><strong className="text-white">Semantic Color Usage:</strong> Use green (#28C76F) strictly for positive growth/profit and red (#EA5455) for loss/risk.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#E5C158] font-bold">•</span>
                <span><strong className="text-white">High Contrast Ratio:</strong> Ensure text-to-background contrast meets WCAG AA standard (4.5:1 minimum).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#E5C158] font-bold">•</span>
                <span><strong className="text-white">Greyscale Print Test:</strong> Verify all charts remain legible when printed on monochrome office printers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: REPORT TYPES COMPARISON */}
        <section id="report-types" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <Briefcase className="w-4 h-4" /> Section 10
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">10. Reporting Standards for Different Corporate Report Types</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Different corporate report formats serve distinct stakeholder audiences and require tailored length, formatting density, and visual emphasis.
          </p>

          <div className="overflow-x-auto border border-[#22222E] rounded-lg">
            <table className="w-full text-left text-xs text-[#CFCFCF]">
              <thead className="bg-[#1A1A22] text-white uppercase font-mono border-b border-[#22222E]">
                <tr>
                  <th className="p-3">Report Category</th>
                  <th className="p-3">Primary Audience</th>
                  <th className="p-3">Typical Length</th>
                  <th className="p-3">Formatting Focus Area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22222E] bg-[#0F0F14]">
                {reportTypes.map((row, i) => (
                  <tr key={i} className="hover:bg-[#14141C] transition-colors">
                    <td className="p-3 font-semibold text-white whitespace-nowrap">{row.type}</td>
                    <td className="p-3 text-[#9FA0A7]">{row.audience}</td>
                    <td className="p-3 text-[#E5C158] font-mono">{row.length}</td>
                    <td className="p-3 text-[#CFCFCF]">{row.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 11: QUALITY CONTROL FRAMEWORK */}
        <section id="quality-control" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" /> Section 11
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">11. Professional Report Quality Control Framework</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Before submitting an executive report to senior management or external auditors, execute a rigorous 4-pass quality control audit covering Content, Structure, Typography, and Digital Export integrity.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-2">
              <span className="text-[#E5C158] font-mono uppercase text-[10px] block">Pass 1 — Structural</span>
              <span className="text-white font-semibold block">Architecture Check</span>
              <p className="text-[#9FA0A7]">Verify presence of Cover Page, Exec Summary, TOC, Section Numbers, & Appendices.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-2">
              <span className="text-[#E5C158] font-mono uppercase text-[10px] block">Pass 2 — Typographic</span>
              <span className="text-white font-semibold block">Hierarchy Audit</span>
              <p className="text-[#9FA0A7]">Check font consistency, line height, margins, heading scale, & zero orphaned lines.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-2">
              <span className="text-[#E5C158] font-mono uppercase text-[10px] block">Pass 3 — Data Integrity</span>
              <span className="text-white font-semibold block">Table & Chart Audit</span>
              <p className="text-[#9FA0A7]">Cross-check numeric column alignment, unit labels, figure numbers, & source links.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-2">
              <span className="text-[#E5C158] font-mono uppercase text-[10px] block">Pass  pass 4 — Export</span>
              <span className="text-white font-semibold block">Digital PDF Inspection</span>
              <p className="text-[#9FA0A7]">Verify embedded fonts, clickable TOC links, resolution, & print bleed dimensions.</p>
            </div>
          </div>
        </section>

        {/* SECTION 12: 20-POINT INTERACTIVE CHECKLIST */}
        <section id="checklist" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#22222E] pb-4">
            <div>
              <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
                <ListChecks className="w-4 h-4" /> Section 12
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">12. 20-Point Corporate Report Formatting Checklist</h2>
            </div>
            {/* Interactive Progress Counter */}
            <div className="bg-[#1A1A22] border border-[#2A2A38] px-4 py-2 rounded-lg text-right">
              <div className="text-xs text-[#9FA0A7]">Checklist Progress</div>
              <div className="text-lg font-bold text-[#E5C158]">{checkedCount} / 20 ({completionPercentage}%)</div>
            </div>
          </div>

          <p className="text-sm text-[#CFCFCF]">
            Use this interactive audit tool to review your document before sending it to stakeholders. Check off each item as you verify compliance.
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-[#1A1A22] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#E5C158] h-full transition-all duration-300 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* Checklist Items Grid */}
          <div className="space-y-2 pt-2">
            {checklistItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <label
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-all select-none ${
                    isChecked
                      ? 'bg-[#121A15] border-[#1E422C] text-white'
                      : 'bg-[#14141C] border-[#22222E] text-[#9FA0A7] hover:border-[#333344]'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? 'bg-[#28C76F] border-[#28C76F] text-black' : 'border-[#444455] bg-[#0A0A0E]'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={isChecked ? 'line-through text-[#A0A0A0]' : 'text-[#CFCFCF]'}>
                    <strong className="text-white mr-1.5">#{item.id < 10 ? `0${item.id}` : item.id}</strong>
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* SECTION 13: 10 COMMON FORMATTING MISTAKES */}
        <section id="mistakes" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#EA5455] font-mono text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" /> Section 13
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">13. 10 Common Corporate Report Formatting Mistakes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-1">
              <span className="text-[#EA5455] font-bold block">1. Inconsistent Heading Hierarchy</span>
              <p className="text-[#9FA0A7]">Skipping from H1 directly to H3 or changing heading font sizes randomly across sections.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-1">
              <span className="text-[#EA5455] font-bold block">2. Random Font Combinations</span>
              <p className="text-[#9FA0A7]">Mixing three or four different font families in a single document creating visual clutter.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-1">
              <span className="text-[#EA5455] font-bold block">3. Excessive Color Usage</span>
              <p className="text-[#9FA0A7]">Using multiple bright primary colors in text and tables rather than a muted corporate palette.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-1">
              <span className="text-[#EA5455] font-bold block">4. Overcrowded Text Density</span>
              <p className="text-[#9FA0A7]">Eliminating paragraph margins to cram text onto a single page, resulting in heavy wall-of-text fatigue.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-1">
              <span className="text-[#EA5455] font-bold block">5. Weak Executive Summary</span>
              <p className="text-[#9FA0A7]">Writing an executive summary that describes the report structure instead of synthesizing key findings & ROI.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-1">
              <span className="text-[#EA5455] font-bold block">6. Poor Table Numeric Alignment</span>
              <p className="text-[#9FA0A7]">Left-aligning numerical data columns, making decimal alignment and mathematical comparison difficult.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-1">
              <span className="text-[#EA5455] font-bold block">7. Low-Resolution Chart Graphics</span>
              <p className="text-[#9FA0A7]">Pasting pixelated screen grabs of charts instead of inserting crisp vector visuals or high-res exports.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-1">
              <span className="text-[#EA5455] font-bold block">8. Missing Page Numbers in TOC</span>
              <p className="text-[#9FA0A7]">Manual Table of Contents entries with broken or misaligned page numbers that do not match the main body.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-1">
              <span className="text-[#EA5455] font-bold block">9. Broken Pagination & Orphaned Headings</span>
              <p className="text-[#9FA0A7]">Leaving section headings isolated at the bottom of a page without at least two lines of body text underneath.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-1">
              <span className="text-[#EA5455] font-bold block">10. Unstructured Appendices</span>
              <p className="text-[#9FA0A7]">Dumping raw datasets at the end of the document without formal appendix labeling or body text cross-references.</p>
            </div>
          </div>
        </section>

        {/* SECTION 14: 5-MINUTE REPORT AUDIT */}
        <section id="final-audit" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4" /> Section 14
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">14. Corporate Report Final Audit: The 5-Minute Pre-Flight Sequence</h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#CFCFCF]">
            Before converting your report to its final digital PDF distribution format, run this rapid 7-step inspection sequence:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#14141C] border border-[#22222E] p-3.5 rounded-lg">
              <span className="text-[#E5C158] font-mono font-bold block mb-1">Step 1 — Hierarchy Scan</span>
              <p className="text-[#9FA0A7]">Scroll at 200% zoom. Ensure section headers stand out clearly from body blocks.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-3.5 rounded-lg">
              <span className="text-[#E5C158] font-mono font-bold block mb-1">Step 2 — Navigation Check</span>
              <p className="text-[#9FA0A7]">Click every TOC link to confirm exact page jumping and correct page numbers.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-3.5 rounded-lg">
              <span className="text-[#E5C158] font-mono font-bold block mb-1">Step 3 — Typography Test</span>
              <p className="text-[#9FA0A7]">Confirm font consistency; check that body font size remains uniform across all pages.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-3.5 rounded-lg">
              <span className="text-[#E5C158] font-mono font-bold block mb-1">Step 4 — Data Alignment</span>
              <p className="text-[#9FA0A7]">Scan table right-alignment and verify explicit units on all chart axes.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-3.5 rounded-lg">
              <span className="text-[#E5C158] font-mono font-bold block mb-1">Step 5 — Pagination Audit</span>
              <p className="text-[#9FA0A7]">Verify Roman numerals on front matter and Arabic numbers starting on Page 1 of body.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-3.5 rounded-lg">
              <span className="text-[#E5C158] font-mono font-bold block mb-1">Step 6 — Header/Footer Check</span>
              <p className="text-[#9FA0A7]">Verify running headers and confidentiality classification on every body page.</p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-3.5 rounded-lg col-span-1 sm:col-span-2">
              <span className="text-[#28C76F] font-mono font-bold block mb-1">Step 7 — PDF Export Inspection</span>
              <p className="text-[#9FA0A7]">Open final exported PDF in a standalone reader. Verify font embedding and zero page layout shifts.</p>
            </div>
          </div>
        </section>

        {/* SECTION 15: KEY TAKEAWAYS */}
        <section id="takeaways" className="bg-[#0F0F14] border border-[#22222E] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#E5C158] font-mono text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" /> Section 15
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">15. Key Takeaways</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#CFCFCF]">
            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-2">
              <span className="text-white font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E5C158]" /> Executive Priority
              </span>
              <p className="text-[#9FA0A7] leading-relaxed">
                Corporate formatting is an executive communication tool, not just visual decoration. Professional visual hierarchy directly influences C-suite decision-making and institutional trust.
              </p>
            </div>

            <div className="bg-[#14141C] border border-[#22222E] p-4 rounded-lg space-y-2">
              <span className="text-white font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E5C158]" /> Structure & Discipline
              </span>
              <p className="text-[#9FA0A7] leading-relaxed">
                Adhere strictly to the 12-part document sequence, legal decimal numbering, right-aligned table numbers, and conservative corporate color palettes.
              </p>
            </div>
          </div>

          {/* Styled Contextual CTA Placeholder for Future Integration */}
          <div className="mt-8 bg-[#12121C] border border-[#2A2A3E] rounded-xl p-6 sm:p-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#E5C158]/10 text-[#E5C158] text-xs font-semibold px-3 py-1 rounded-full border border-[#E5C158]/20">
              <Briefcase className="w-3.5 h-3.5" /> Professional Execution Services
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Need Professional Corporate Document Formatting?
            </h3>
            
            <p className="text-xs sm:text-sm text-[#9FA0A7] max-w-2xl mx-auto leading-relaxed">
              If your team requires executive document formatting, financial report polishing, or corporate proposal design with 24–48 hour turnaround, explore our specialized <a href="/services#reports" className="text-[#E5C158] font-semibold underline hover:text-white transition-colors">corporate report formatting and document design services</a>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
              <a
                href="/services#reports"
                className="inline-flex items-center gap-2 bg-[#E5C158] hover:bg-[#D4AF37] text-[#050507] font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                <span>Corporate Report Formatting & Layout Service</span> <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 bg-[#1A1A22] hover:bg-[#252530] text-white px-4 py-2.5 rounded-lg border border-[#2A2A38] transition-colors"
              >
                View Transparent Pricing
              </a>
              <a
                href="/order"
                className="inline-flex items-center gap-2 bg-[#1A1A22] hover:bg-[#252530] text-[#E5C158] px-4 py-2.5 rounded-lg border border-[#2A2A38] transition-colors"
              >
                Place Custom Order
              </a>
            </div>

            <div className="pt-4 mt-6 border-t border-[#2A2A3E] flex flex-wrap items-center justify-center gap-2 text-xs text-[#9FA0A7]">
              <BookOpen className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Presenting your report findings in an executive slide presentation? Read our </span>
              <a
                href="/guides/executive-pitch-deck-structure"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({ page: 'guide-pitch-deck' }, '', '/guides/executive-pitch-deck-structure');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="text-[#E5C158] hover:underline font-semibold"
              >
                Executive Pitch Deck Structure Guide →
              </a>
            </div>
          </div>
        </section>

        {/* Bottom Author Bio Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 bg-gradient-to-br from-[#0F0F12] to-[#050507]">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E5C158]/20 to-[#E5C158]/40 border border-[#E5C158]/50 flex items-center justify-center text-[#E5C158] font-bold text-lg shrink-0 font-poppins shadow-lg shadow-[#E5C158]/10">
              MS
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono text-[#E5C158] uppercase tracking-wider mb-1">
                Author & Lead Editorial Reviewer
              </div>
              <h3 className="text-lg font-bold font-poppins text-white mb-1">
                Muhammad Shehroz Sultan
              </h3>
              <p className="text-xs text-[#E5C158]/80 font-mono mb-3">
                Founder & Lead Director, MFS Growth Agency
              </p>
              <p className="text-xs sm:text-sm text-[#9FA0A7] leading-relaxed">
                Written & Reviewed by Muhammad Shehroz Sultan, Founder & Lead Director, MFS Growth Agency. Specialist in executive presentation design, academic document formatting, and ATS-optimized career assets helping students and professionals achieve growth worldwide.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
