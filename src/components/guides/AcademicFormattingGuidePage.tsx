import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Bookmark,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ListChecks,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronRight,
  Share2,
  Check,
  ShieldCheck,
  Globe2,
  Search,
  Award,
  Layers,
  HelpCircle,
  Edit3,
} from 'lucide-react';

export default function AcademicFormattingGuidePage() {
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
    { id: 'integrity', title: 'Citation Integrity' },
    { id: 'apa7', title: 'APA 7th Edition' },
    { id: 'harvard', title: 'Harvard Referencing' },
    { id: 'mla9', title: 'MLA 9th Edition' },
    { id: 'ieee', title: 'IEEE Citation Style' },
    { id: 'oxford', title: 'Oxford Style' },
    { id: 'comparison', title: 'Styles Comparison' },
    { id: 'lit-review', title: 'Literature Review' },
    { id: 'paper-structure', title: 'Paper Structure' },
    { id: 'mistakes', title: '10 Citation Mistakes' },
    { id: 'checklist', title: 'Audit Checklist' },
    { id: 'rubric', title: 'Rubric Alignment' },
    { id: 'assistance', title: 'Academic Services' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const checklistItems = [
    { id: 1, label: 'Assignment brief and institutional style guide explicitly reviewed.' },
    { id: 2, label: 'In-text citations correctly match all reference list / Works Cited entries.' },
    { id: 3, label: 'Author names, publication years, and page numbers accurately formatted.' },
    { id: 4, label: 'Reference list entries arranged in required alphabetical or numerical order.' },
    { id: 5, label: 'Direct quotations accompanied by exact page/paragraph numbers and quotation marks.' },
    { id: 6, label: 'Paraphrased statements properly attributed without mechanical line copying.' },
    { id: 7, label: 'Heading hierarchy follows mandated font sizes, weights, and case rules.' },
    { id: 8, label: 'Page numbers, running heads, and margins conform to style specifications.' },
    { id: 9, label: 'DOIs and URLs formatted according to target style guide (e.g., https://doi.org/...).' },
    { id: 10, label: 'Tables, figures, and charts sequentially numbered with proper captions.' },
    { id: 11, label: 'Formatting is consistent across all sections without style blending.' },
    { id: 12, label: 'All referenced sources actually consulted during research and drafting.' },
    { id: 13, label: 'Institutional academic integrity and responsible research policies honored.' },
    { id: 14, label: 'Document proofread for grammatical clarity, academic tone, and typographical accuracy.' },
    { id: 15, label: 'Final file exported in mandated format (.docx or .pdf) prior to submission.' },
  ];

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = Math.round((checkedCount / checklistItems.length) * 100);

  const styleComparisons = [
    {
      style: 'APA 7th Edition',
      method: 'Author-Date System',
      referenceList: 'Alphabetical "References" list with hanging indents',
      disciplines: 'Psychology, Education, Social Sciences, Business, Nursing',
      exampleInText: '(Smith, 2024, p. 42)',
      exampleRef: 'Smith, A. B. (2024). Academic writing principles. Journal of Higher Education, 12(2), 101–115.',
    },
    {
      style: 'Harvard Style',
      method: 'Author-Date System',
      referenceList: 'Alphabetical "Reference List" (variations by university)',
      disciplines: 'Business, Management, Humanities, Social Sciences (UK/AU/International)',
      exampleInText: '(Smith 2024, p. 42)',
      exampleRef: 'Smith, A.B., 2024. Academic writing principles. Journal of Higher Education, 12(2), pp.101-115.',
    },
    {
      style: 'MLA 9th Edition',
      method: 'Author-Page System',
      referenceList: 'Alphabetical "Works Cited" list with container model',
      disciplines: 'Literature, Languages, Cultural Studies, Humanities',
      exampleInText: '(Smith 42)',
      exampleRef: 'Smith, A. B. "Academic Writing Principles." Journal of Higher Education, vol. 12, no. 2, 2024, pp. 101-15.',
    },
    {
      style: 'IEEE Style',
      method: 'Numbered Brackets System',
      referenceList: 'Numerical "References" list in order of appearance',
      disciplines: 'Engineering, Computer Science, Information Technology, Physics',
      exampleInText: '[1, p. 42]',
      exampleRef: '[1] A. B. Smith, "Academic writing principles," Journal of Higher Education, vol. 12, no. 2, pp. 101–115, 2024.',
    },
    {
      style: 'Oxford Style',
      method: 'Footnotes / Endnotes System',
      referenceList: 'Alphabetical "Bibliography" + numbered bottom-of-page footnotes',
      disciplines: 'History, Philosophy, Law, Fine Arts, Humanities',
      exampleInText: '1. A. B. Smith, Academic Writing Principles (London: Academic Press, 2024), 42.',
      exampleRef: 'Smith, A. B., Academic Writing Principles (London: Academic Press, 2024).',
    },
  ];

  const commonMistakes = [
    { title: 'Missing Citations for Borrowed Ideas', desc: 'Failing to cite source ideas that have been paraphrased in your own words.' },
    { title: 'Inconsistent Author & Year Data', desc: 'Discrepancies between in-text citation dates and reference list publication years.' },
    { title: 'Mixing Citation Styles', desc: 'Blending APA author-date format with MLA page-only numbers within the same document.' },
    { title: 'Incorrect Reference List Sorting', desc: 'Sorting reference lists by publication year or order of appearance instead of style requirements.' },
    { title: 'Omitting Page Numbers for Quotes', desc: 'Including direct quotes without providing exact page, paragraph, or section numbers.' },
    { title: 'Inconsistent Title Capitalization', desc: 'Mixing sentence case and title case across journal article titles in the reference list.' },
    { title: 'Misformatting Block Quotes', desc: 'Failing to indent extended quotations (40+ words in APA, 4+ lines in MLA) properly.' },
    { title: 'Citing Unconsulted Secondary Sources', desc: 'Listing primary research papers without consulting them directly or acknowledging the secondary source.' },
    { title: 'Stale or Broken Digital Identifiers', desc: 'Providing dead web links instead of permanent DOI (Digital Object Identifier) URLs.' },
    { title: 'Ignoring Institutional Style Sheets', desc: 'Following generic online blog advice instead of your university\'s official course rubric.' },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20 font-sans selection:bg-[#E5C158]/30 selection:text-[#E5C158]">
      {/* Background Decorative Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#E5C158]/10 via-[#E5C158]/05 to-transparent blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#9FA0A7] font-mono">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <ChevronRight className="w-3 h-3 text-[#9FA0A7]/50" />
          <span className="text-[#9FA0A7]">Guides</span>
          <ChevronRight className="w-3 h-3 text-[#9FA0A7]/50" />
          <span className="text-[#E5C158] truncate">Academic Formatting & Citation Standards Guide</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12 border-b border-white/10 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-mono font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ACADEMIC KNOWLEDGE & CITATION REFERENCE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white tracking-tight leading-tight mb-6">
            Academic Formatting & Citation Standards Guide:{' '}
            <span className="gold-text-gradient">
              APA 7, Harvard, MLA & IEEE
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#9FA0A7] leading-relaxed max-w-4xl mb-8 font-light">
            A master educational reference on academic style conventions, literature review synthesis, structural research paper frameworks, and precise in-text referencing across international university standards.
          </p>

          {/* Article Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9FA0A7] pt-4 border-t border-white/05">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#E5C158]" />
                16 Min Read
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                Academic Integrity Compliant
              </span>
              <span className="hidden sm:inline-block text-[#9FA0A7]/40">•</span>
              <span className="hidden sm:inline-block">Updated February 2026</span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/05 hover:bg-white/10 border border-white/10 text-white text-xs transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#28C76F]" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Share Guide</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Reading Intent Summary Box */}
        <section className="mb-12 glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-l-[#E5C158]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#E5C158]/10 text-[#E5C158] shrink-0 hidden sm:block">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold font-poppins text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E5C158] sm:hidden" />
                Guide Scope & Academic Principles
              </h2>
              <p className="text-sm text-[#9FA0A7] leading-relaxed">
                Academic citation systems provide the foundational architecture for scholarly attribution, intellectual traceability, and peer-reviewed rigor. This guide presents objective formatting rules for APA 7, Harvard, MLA 9, IEEE, and Oxford referencing. All concepts are designed to support legitimate academic research, literature synthesis, and structural editing in accordance with university academic integrity frameworks.
              </p>
            </div>
          </div>
        </section>

        {/* Layout Grid: Sticky TOC + Main Article */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28 glass-card rounded-xl p-5 border border-white/10">
              <h3 className="text-xs font-mono font-bold text-[#E5C158] uppercase tracking-wider mb-4 flex items-center gap-2">
                <ListChecks className="w-4 h-4" />
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {tableOfContents.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-[#9FA0A7] hover:text-white hover:bg-white/05 transition-all flex items-center gap-2 cursor-pointer group"
                  >
                    <span className="font-mono text-[10px] text-[#9FA0A7]/50 group-hover:text-[#E5C158]">
                      0{idx + 1}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-white/10 text-center">
                <p className="text-[11px] text-[#9FA0A7] mb-3">Need guidance with research formatting or editing?</p>
                <a
                  href="/services#assignments"
                  className="w-full py-2 px-3 rounded-lg bg-[#E5C158]/10 hover:bg-[#E5C158]/20 border border-[#E5C158]/30 text-[#E5C158] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Academic Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content Column */}
          <main className="lg:col-span-9 space-y-16 text-slate-200 leading-relaxed">
            {/* SECTION 1: WHY ACADEMIC CITATION & FORMATTING INTEGRITY MATTERS */}
            <section id="integrity" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Why Academic Citation & Formatting Integrity Matters
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  Academic citation is far more than a technical compliance exercise; it is the formal mechanism by which scholars attribute intellectual property, contextualize new empirical findings within established literature, and enable readers to independently verify claims.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="p-4 glass-card rounded-xl border border-white/10">
                    <h3 className="text-sm font-bold text-white font-poppins mb-1 flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-[#E5C158]" />
                      Intellectual Traceability
                    </h3>
                    <p className="text-xs text-[#9FA0A7]">
                      Proper citations allow readers to trace every statement, statistical claim, or theoretical model back to its original peer-reviewed source.
                    </p>
                  </div>

                  <div className="p-4 glass-card rounded-xl border border-white/10">
                    <h3 className="text-sm font-bold text-white font-poppins mb-1 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#28C76F]" />
                      Accidental Plagiarism Avoidance
                    </h3>
                    <p className="text-xs text-[#9FA0A7]">
                      Clear, consistent attribution distinguishes a scholar's original analysis from borrowed ideas, protecting academic integrity.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#E5C158]/05 border border-[#E5C158]/20 text-xs sm:text-sm text-[#E5C158]">
                  <strong>Always Check Institutional Guidelines First:</strong> While general style manuals (e.g. APA 7 or MLA 9) define global standards, specific university faculties, departments, or course instructors frequently issue customized style sheets. Institutional briefs always take precedence over general guidelines.
                </div>
              </div>
            </section>

            {/* SECTION 2: APA 7TH EDITION FORMATTING RULES */}
            <section id="apa7" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  APA 7th Edition Formatting Rules
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  Published by the American Psychological Association, <strong className="text-white">APA 7th Edition</strong> is the most widely adopted citation system across social sciences, psychology, business, education, and health sciences.
                </p>

                <div className="p-6 glass-card rounded-2xl border border-white/10 my-4 space-y-4 text-xs sm:text-sm">
                  <h3 className="text-sm font-bold font-poppins text-white uppercase text-[#E5C158]">Key APA 7 Structural Rules</h3>
                  <ul className="space-y-2 text-[#9FA0A7]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0 mt-0.5" />
                      <span><strong className="text-white">In-Text System:</strong> Author-Date citation method. Include page numbers for direct quotes: <code className="text-[#E5C158] bg-white/05 px-1 py-0.5 rounded">(Author, 2024, p. 45)</code>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0 mt-0.5" />
                      <span><strong className="text-white">Reference List Title:</strong> Titled "References" (bold, centered, not underlined).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0 mt-0.5" />
                      <span><strong className="text-white">Hanging Indent:</strong> All entries use a 0.5-inch hanging indent with double-spacing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#28C76F] shrink-0 mt-0.5" />
                      <span><strong className="text-white">DOI Formatting:</strong> Always format DOIs as active HTTPS links: <code className="text-[#E5C158] bg-white/05 px-1 py-0.5 rounded">https://doi.org/10.xxxx/xxxx</code>.</span>
                    </li>
                  </ul>

                  {/* Illustrative Example Card */}
                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/05 font-mono text-xs">
                    <span className="text-[#E5C158] block font-bold mb-1">// Illustrative Example (Journal Article in Reference List)</span>
                    <p className="text-white">Author, A. A., & Writer, B. B. (2024). Title of journal article in sentence case. <em>Journal Title in Title Case</em>, 15(3), 101–120. https://doi.org/10.xxxx/example</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: HARVARD REFERENCING RULES */}
            <section id="harvard" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 03
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Harvard Referencing Rules
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  Unlike APA or MLA, <strong className="text-white">Harvard Referencing</strong> is not maintained by a single central governing body. Instead, it refers to a broad family of author-date citation styles widely used in UK, European, Australian, and international universities.
                </p>

                <div className="p-5 glass-card rounded-xl border border-white/10 my-4 text-xs sm:text-sm">
                  <h3 className="text-xs font-bold text-[#E5C158] font-mono uppercase mb-2">Institutional Variation Warning</h3>
                  <p className="text-[#9FA0A7] leading-relaxed mb-3">
                    Because Harvard lacks one universal style manual, different universities publish their own institutional style sheets (e.g., Cite Them Right Harvard, Harvard Imperial, Harvard UTS). Always consult your specific university library guide.
                  </p>

                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/05 font-mono text-xs">
                    <span className="text-[#E5C158] block font-bold mb-1">// Illustrative Example (Book in Harvard Reference List)</span>
                    <p className="text-white">Surname, A.B., 2024. <em>Title of book in italics</em>. 2nd ed. City of Publication: Publisher Name.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: MLA 9TH EDITION RULES */}
            <section id="mla9" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 04
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  MLA 9th Edition Rules
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  Developed by the Modern Language Association, <strong className="text-white">MLA 9th Edition</strong> is tailored for literary analysis, cultural studies, humanities, and languages.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs">
                  <div className="p-4 glass-card rounded-xl border border-white/10">
                    <h3 className="font-bold text-white mb-2 font-poppins">Author-Page In-Text Citations</h3>
                    <p className="text-[#9FA0A7] mb-2">
                      MLA uses author surname and page number without commas or "p." prefixes:
                    </p>
                    <code className="text-[#E5C158] bg-white/05 p-2 rounded block font-mono">(Author 42)</code>
                  </div>

                  <div className="p-4 glass-card rounded-xl border border-white/10">
                    <h3 className="font-bold text-white mb-2 font-poppins">Container Model Framework</h3>
                    <p className="text-[#9FA0A7] mb-2">
                      MLA 9 structures citations around 9 core elements contained within larger works (e.g. essay inside an anthology).
                    </p>
                    <code className="text-[#E5C158] bg-white/05 p-2 rounded block font-mono">Titled "Works Cited"</code>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: IEEE CITATION STYLE */}
            <section id="ieee" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 05
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  IEEE Citation Style
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  The Institute of Electrical and Electronics Engineers (<strong className="text-white">IEEE</strong>) system is the standard citation framework across engineering, computer science, software development, and technical disciplines.
                </p>

                <div className="p-5 glass-card rounded-xl border border-white/10 my-4 text-xs sm:text-sm">
                  <h3 className="text-xs font-bold text-[#E5C158] font-mono uppercase mb-2">Numerical Brackets Mechanics</h3>
                  <p className="text-[#9FA0A7] mb-3">
                    References are numbered in the order they are first mentioned in the text using square brackets <code className="text-[#E5C158] bg-white/05 px-1 rounded">[1]</code>. The reference list follows this exact numerical sequence rather than alphabetical order.
                  </p>

                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/05 font-mono text-xs">
                    <span className="text-[#E5C158] block font-bold mb-1">// Illustrative Example (IEEE Reference Entry)</span>
                    <p className="text-white">[1] A. B. Author, "Title of conference paper," in <em>Proc. IEEE Conf. Computer Vision</em>, 2024, pp. 10–18.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: OXFORD CITATION STYLE */}
            <section id="oxford" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 06
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Oxford Citation Style
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#9FA0A7] mb-4">
                The <strong className="text-white">Oxford style</strong> utilizes superscript numbers in the main text matching detailed footnotes at the bottom of the page, combined with a comprehensive bibliography at the document's end.
              </p>
            </section>

            {/* SECTION 7: STYLES COMPARISON TABLE */}
            <section id="comparison" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 07
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Comprehensive Citation Style Comparison
                </h2>
              </div>

              <div className="overflow-x-auto my-6">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-[#E5C158] font-mono">
                      <th scope="col" className="p-3">Style</th>
                      <th scope="col" className="p-3">In-Text System</th>
                      <th scope="col" className="p-3">Reference List</th>
                      <th scope="col" className="p-3">Primary Disciplines</th>
                      <th scope="col" className="p-3">In-Text Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/05 text-[#9FA0A7]">
                    {styleComparisons.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.01]">
                        <th scope="row" className="p-3 font-bold text-white font-poppins">{item.style}</th>
                        <td className="p-3">{item.method}</td>
                        <td className="p-3">{item.referenceList}</td>
                        <td className="p-3">{item.disciplines}</td>
                        <td className="p-3 font-mono text-[#E5C158]">{item.exampleInText}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: HOW TO STRUCTURE A LITERATURE REVIEW */}
            <section id="lit-review" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 08
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  How to Structure a Literature Review
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#9FA0A7]">
                <p>
                  A high-scoring literature review goes beyond listing individual study summaries sequentially. It synthesizes multiple research streams, evaluates methodological strengths, identifies knowledge gaps, and builds a theoretical foundation for your research.
                </p>

                {/* Synthesis Flow Graphic */}
                <div className="my-6 p-6 glass-card rounded-2xl border border-white/10">
                  <h3 className="text-xs font-mono font-bold text-[#E5C158] uppercase tracking-wider mb-4">
                    The Synthesis vs Summary Pipeline
                  </h3>
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-center text-xs font-mono">
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/05 w-full">
                      <span className="text-white block font-bold">1. Source Ingestion</span>
                      <span className="text-[10px] text-[#9FA0A7]">Read & Extract</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#E5C158] shrink-0 hidden sm:block" />
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/05 w-full">
                      <span className="text-white block font-bold">2. Thematic Grouping</span>
                      <span className="text-[10px] text-[#9FA0A7]">Cluster Concepts</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#E5C158] shrink-0 hidden sm:block" />
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/05 w-full">
                      <span className="text-white block font-bold">3. Critical Analysis</span>
                      <span className="text-[10px] text-[#9FA0A7]">Evaluate Gaps</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#E5C158] shrink-0 hidden sm:block" />
                    <div className="p-3 rounded-lg bg-[#E5C158]/10 border border-[#E5C158]/30 w-full text-[#E5C158]">
                      <span className="block font-bold">4. Synthesis</span>
                      <span className="text-[10px]">New Perspective</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: HOW TO STRUCTURE AN ACADEMIC RESEARCH PAPER */}
            <section id="paper-structure" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 09
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Standard Academic Research Paper Structure (IMRaD)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                {[
                  { section: '1. Abstract & Title', detail: 'Concise 150-250 word summary covering research question, methodology, key findings, and conclusion.' },
                  { section: '2. Introduction', detail: 'Background context, problem statement, research significance, hypotheses, and paper roadmap.' },
                  { section: '3. Literature Review', detail: 'Thematic synthesis of existing empirical work identifying the precise gap your paper addresses.' },
                  { section: '4. Methodology', detail: 'Detailed description of research design, data collection tools, sample size, and analytical framework.' },
                  { section: '5. Results / Findings', detail: 'Objective presentation of collected data, statistical tests, or qualitative thematic analysis.' },
                  { section: '6. Discussion & Implications', detail: 'Interpretation of results relative to literature, practical implications, limitations, and future research.' },
                ].map((sec, idx) => (
                  <div key={idx} className="p-4 glass-card rounded-xl border border-white/10">
                    <h3 className="font-bold text-white mb-1 font-poppins">{sec.section}</h3>
                    <p className="text-[#9FA0A7] text-xs">{sec.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: TOP 10 ACADEMIC CITATION MISTAKES TO AVOID */}
            <section id="mistakes" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 10
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Top 10 Academic Citation Mistakes to Avoid
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonMistakes.map((item, idx) => (
                  <div key={idx} className="p-4 glass-card rounded-xl border border-white/10">
                    <h3 className="text-xs font-bold text-white font-poppins mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      {idx + 1}. {item.title}
                    </h3>
                    <p className="text-xs text-[#9FA0A7]">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-red-500/05 border border-red-500/20 text-xs text-red-300 font-mono">
                <strong>Academic Integrity Alert:</strong> Never fabricate citations, invent bibliographic data, or list unconsulted references. Always maintain honest, accurate academic attribution.
              </div>
            </section>

            {/* SECTION 11: ACADEMIC FORMATTING PRE-SUBMISSION CHECKLIST */}
            <section id="checklist" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 11
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Academic Pre-Submission Audit Checklist
                </h2>
              </div>

              {/* Progress Bar */}
              <div className="glass-card p-4 rounded-xl border border-white/10 mb-6">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#9FA0A7]">Checklist Completion:</span>
                  <span className="text-[#E5C158] font-bold">{checkedCount} / {checklistItems.length} ({completionPercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-white/05 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E5C158] to-[#28C76F] transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-3">
                {checklistItems.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                        isChecked
                          ? 'bg-[#28C76F]/[0.05] border-[#28C76F]/30 text-white'
                          : 'glass-card border-white/10 text-[#9FA0A7] hover:border-white/20 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-[#28C76F] text-black' : 'border border-white/20 bg-white/05'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'text-white line-through opacity-80' : 'text-white'}`}>
                        {item.id}. {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 12: RUBRIC ALIGNMENT & FORMATTING REVIEW */}
            <section id="rubric" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#E5C158] px-2 py-0.5 rounded bg-[#E5C158]/10 border border-[#E5C158]/20">
                  SECTION 12
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                  Rubric Alignment & Formatting Review
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#9FA0A7] leading-relaxed">
                Academic evaluation rubrics assess research papers across four core pillars: <strong className="text-white">Substantive Analysis</strong>, <strong className="text-white">Structural Organization</strong>, <strong className="text-white">Citation Precision</strong>, and <strong className="text-white">Academic Tone & Mechanics</strong>. Ensuring exact alignment between your manuscript and the course rubric guarantees that your research content is evaluated fairly without technical penalties.
              </p>
            </section>

            {/* SECTION 13: WHEN PROFESSIONAL ACADEMIC FORMATTING ASSISTANCE MAY HELP */}
            <section id="assistance" className="scroll-mt-28 border-t border-white/10 pt-12">
              <div className="p-8 glass-card rounded-2xl border border-[#E5C158]/30 bg-gradient-to-br from-[#E5C158]/10 via-transparent to-transparent relative overflow-hidden">
                <div className="max-w-2xl">
                  <span className="font-mono text-xs text-[#E5C158] uppercase font-bold tracking-wider mb-2 block">
                    RESPONSIBLE ACADEMIC SUPPORT
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white mb-4">
                    Need Professional Academic Formatting or Reference Editing?
                  </h2>
                  <p className="text-sm text-[#9FA0A7] leading-relaxed mb-6">
                    MFS Growth Agency provides academic manuscript formatting, reference list audits, citation style conversion, and structural editing designed to align your research paper with institutional guidelines.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="/services#assignments"
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-[#E5C158]/20"
                    >
                      <span>Explore Academic Assistance</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href="/terms"
                      className="py-3 px-6 rounded-xl bg-white/05 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <span>Academic Integrity Policy</span>
                    </a>

                    <a
                      href="/order"
                      className="text-xs text-[#E5C158] hover:underline font-mono ml-2"
                    >
                      Start a Project →
                    </a>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs text-[#9FA0A7]">
                    <BookOpen className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Transitioning academic research into professional executive reports? Read our </span>
                    <a
                      href="/guides/corporate-report-formatting-standards"
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({ page: 'guide-corporate-report' }, '', '/guides/corporate-report-formatting-standards');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className="text-[#E5C158] hover:underline font-semibold"
                    >
                      Corporate Report Formatting Standards Guide →
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
