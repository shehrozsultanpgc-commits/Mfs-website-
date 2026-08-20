import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  FileText,
  Bookmark,
  GraduationCap,
  ExternalLink,
  HelpCircle,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface CitationGeneratorToolProps {
  onOpenOrderModal: (serviceId?: string) => void;
  onOpenAIChat?: () => void;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigatePage?: (page: string) => void;
}

type CitationStyle = 'apa7' | 'harvard' | 'mla9' | 'ieee' | 'chicago';
type SourceType = 'journal' | 'book' | 'website' | 'conference';

const SAMPLE_SOURCES = {
  journal1: {
    label: 'AI in Higher Education (Journal)',
    type: 'journal' as SourceType,
    authors: 'Sultan, M. S., & Khan, A. R.',
    year: '2024',
    title: 'Transformative impacts of generative artificial intelligence on academic writing and coursework integrity',
    sourceContainer: 'Journal of Higher Education Technology',
    volume: '38',
    issue: '4',
    pages: '215-230',
    doiUrl: 'https://doi.org/10.1080/03610926.2024.18902',
    publisher: '',
    accessDate: '',
  },
  book1: {
    label: 'Strategic Marketing (Book)',
    type: 'book' as SourceType,
    authors: 'Porter, M. E., & Kramer, M. R.',
    year: '2022',
    title: 'Creating Shared Value: Competitive Advantage and Corporate Social Strategy',
    sourceContainer: '',
    volume: '',
    issue: '',
    pages: '',
    doiUrl: 'https://doi.org/10.4324/9781003184912',
    publisher: 'Harvard Business Review Press',
    accessDate: '',
  },
  website1: {
    label: 'World Economic Forum (Website)',
    type: 'website' as SourceType,
    authors: 'World Economic Forum',
    year: '2025',
    title: 'The Future of Jobs Report 2025: Emerging Skills, Workforce Automation and Digital Transformation',
    sourceContainer: 'World Economic Forum Insights',
    volume: '',
    issue: '',
    pages: '',
    doiUrl: 'https://www.weforum.org/reports/future-of-jobs-2025',
    publisher: '',
    accessDate: 'August 15, 2026',
  },
};

export const CitationGeneratorTool: React.FC<CitationGeneratorToolProps> = ({
  onOpenOrderModal,
  onOpenAIChat,
  onShowToast,
  onNavigatePage,
}) => {
  const [style, setStyle] = useState<CitationStyle>('apa7');
  const [sourceType, setSourceType] = useState<SourceType>('journal');

  const [authors, setAuthors] = useState(SAMPLE_SOURCES.journal1.authors);
  const [year, setYear] = useState(SAMPLE_SOURCES.journal1.year);
  const [title, setTitle] = useState(SAMPLE_SOURCES.journal1.title);
  const [sourceContainer, setSourceContainer] = useState(SAMPLE_SOURCES.journal1.sourceContainer);
  const [volume, setVolume] = useState(SAMPLE_SOURCES.journal1.volume);
  const [issue, setIssue] = useState(SAMPLE_SOURCES.journal1.issue);
  const [pages, setPages] = useState(SAMPLE_SOURCES.journal1.pages);
  const [publisher, setPublisher] = useState(SAMPLE_SOURCES.journal1.publisher);
  const [doiUrl, setDoiUrl] = useState(SAMPLE_SOURCES.journal1.doiUrl);
  const [accessDate, setAccessDate] = useState(SAMPLE_SOURCES.journal1.accessDate);

  const [copiedBib, setCopiedBib] = useState(false);
  const [copiedParenthetical, setCopiedParenthetical] = useState(false);
  const [copiedNarrative, setCopiedNarrative] = useState(false);

  const handleLoadSample = (key: keyof typeof SAMPLE_SOURCES) => {
    const s = SAMPLE_SOURCES[key];
    setSourceType(s.type);
    setAuthors(s.authors);
    setYear(s.year);
    setTitle(s.title);
    setSourceContainer(s.sourceContainer);
    setVolume(s.volume);
    setIssue(s.issue);
    setPages(s.pages);
    setPublisher(s.publisher);
    setDoiUrl(s.doiUrl);
    setAccessDate(s.accessDate);
    if (onShowToast) onShowToast(`Loaded ${s.label}`, 'info');
  };

  const handleReset = () => {
    setAuthors('');
    setYear('');
    setTitle('');
    setSourceContainer('');
    setVolume('');
    setIssue('');
    setPages('');
    setPublisher('');
    setDoiUrl('');
    setAccessDate('');
  };

  // Live Citation Generator Logic
  const generatedCitations = useMemo(() => {
    const safeAuthors = authors.trim() || 'Author, A. A.';
    const safeYear = year.trim() || '2024';
    const safeTitle = title.trim() || 'Document Title';
    const safeContainer = sourceContainer.trim() || 'Journal/Publication Name';
    const safeVol = volume.trim();
    const safeIssue = issue.trim();
    const safePages = pages.trim();
    const safePublisher = publisher.trim() || 'Publisher Name';
    const safeDoi = doiUrl.trim();

    // Extract first author surname for in-text citations
    let firstAuthorSurname = safeAuthors.split(',')[0].trim() || 'Author';
    if (firstAuthorSurname.includes(' ')) {
      const parts = firstAuthorSurname.split(' ');
      firstAuthorSurname = parts[parts.length - 1];
    }
    const hasMultipleAuthors = safeAuthors.includes('&') || safeAuthors.includes('and') || safeAuthors.includes(',');

    let inTextParenthetical = '';
    let inTextNarrative = '';
    let bibliographyHtml = '';
    let bibliographyPlain = '';

    if (style === 'apa7') {
      // In-Text APA 7
      if (hasMultipleAuthors) {
        inTextParenthetical = `(${firstAuthorSurname} et al., ${safeYear})`;
        inTextNarrative = `${firstAuthorSurname} et al. (${safeYear})`;
      } else {
        inTextParenthetical = `(${firstAuthorSurname}, ${safeYear})`;
        inTextNarrative = `${firstAuthorSurname} (${safeYear})`;
      }

      // Bibliography APA 7
      if (sourceType === 'journal') {
        const volIssuePart = safeVol ? `${safeVol}${safeIssue ? `(${safeIssue})` : ''}` : '';
        const pagesPart = safePages ? `, ${safePages}` : '';
        const doiPart = safeDoi ? ` ${safeDoi}` : '';
        bibliographyPlain = `${safeAuthors} (${safeYear}). ${safeTitle}. ${safeContainer}, ${volIssuePart}${pagesPart}.${doiPart}`;
        bibliographyHtml = `${safeAuthors} (${safeYear}). ${safeTitle}. <em>${safeContainer}</em>, <em>${volIssuePart}</em>${pagesPart}.${doiPart}`;
      } else if (sourceType === 'book') {
        const doiPart = safeDoi ? ` ${safeDoi}` : '';
        bibliographyPlain = `${safeAuthors} (${safeYear}). ${safeTitle}. ${safePublisher}.${doiPart}`;
        bibliographyHtml = `${safeAuthors} (${safeYear}). <em>${safeTitle}</em>. ${safePublisher}.${doiPart}`;
      } else if (sourceType === 'website') {
        const urlPart = safeDoi ? ` ${safeDoi}` : '';
        bibliographyPlain = `${safeAuthors} (${safeYear}). ${safeTitle}. ${safeContainer}.${urlPart}`;
        bibliographyHtml = `${safeAuthors} (${safeYear}). <em>${safeTitle}</em>. ${safeContainer}.${urlPart}`;
      } else {
        bibliographyPlain = `${safeAuthors} (${safeYear}). ${safeTitle}. Proceedings of the ${safeContainer}.${safeDoi ? ` ${safeDoi}` : ''}`;
        bibliographyHtml = `${safeAuthors} (${safeYear}). ${safeTitle}. <em>Proceedings of the ${safeContainer}</em>.${safeDoi ? ` ${safeDoi}` : ''}`;
      }
    } else if (style === 'harvard') {
      // Harvard
      if (hasMultipleAuthors) {
        inTextParenthetical = `(${firstAuthorSurname} et al. ${safeYear})`;
        inTextNarrative = `${firstAuthorSurname} et al. (${safeYear})`;
      } else {
        inTextParenthetical = `(${firstAuthorSurname} ${safeYear})`;
        inTextNarrative = `${firstAuthorSurname} (${safeYear})`;
      }

      if (sourceType === 'journal') {
        const volPart = safeVol ? `${safeVol}` : '';
        const issuePart = safeIssue ? `(${safeIssue})` : '';
        const ppPart = safePages ? `, pp. ${safePages}` : '';
        bibliographyPlain = `${safeAuthors}, ${safeYear}. ${safeTitle}. ${safeContainer}, ${volPart}${issuePart}${ppPart}. Available at: <${safeDoi}>.`;
        bibliographyHtml = `${safeAuthors}, ${safeYear}. '${safeTitle}', <em>${safeContainer}</em>, ${volPart}${issuePart}${ppPart}. Available at: &lt;${safeDoi}&gt;.`;
      } else if (sourceType === 'book') {
        bibliographyPlain = `${safeAuthors}, ${safeYear}. ${safeTitle}. ${safePublisher}.`;
        bibliographyHtml = `${safeAuthors}, ${safeYear}. <em>${safeTitle}</em>. ${safePublisher}.`;
      } else {
        bibliographyPlain = `${safeAuthors}, ${safeYear}. ${safeTitle}. [online] ${safeContainer}. Available at: <${safeDoi}> [Accessed ${accessDate || '20 Aug. 2026'}].`;
        bibliographyHtml = `${safeAuthors}, ${safeYear}. <em>${safeTitle}</em>. [online] ${safeContainer}. Available at: &lt;${safeDoi}&gt; [Accessed ${accessDate || '20 Aug. 2026'}].`;
      }
    } else if (style === 'mla9') {
      // MLA 9th
      inTextParenthetical = `(${firstAuthorSurname} ${safePages.split('-')[0] || ''})`.replace(/\s+\)/, ')');
      inTextNarrative = `${firstAuthorSurname} explains that... (${safePages.split('-')[0] || ''})`.replace(/\s+\)/, ')');

      if (sourceType === 'journal') {
        const volPart = safeVol ? `vol. ${safeVol}, ` : '';
        const noPart = safeIssue ? `no. ${safeIssue}, ` : '';
        const ppPart = safePages ? `pp. ${safePages}.` : '';
        bibliographyPlain = `${safeAuthors}. "${safeTitle}." ${safeContainer}, ${volPart}${noPart}${safeYear}, ${ppPart} ${safeDoi}`;
        bibliographyHtml = `${safeAuthors}. "${safeTitle}." <em>${safeContainer}</em>, ${volPart}${noPart}${safeYear}, ${ppPart} ${safeDoi}`;
      } else if (sourceType === 'book') {
        bibliographyPlain = `${safeAuthors}. ${safeTitle}. ${safePublisher}, ${safeYear}.`;
        bibliographyHtml = `${safeAuthors}. <em>${safeTitle}</em>. ${safePublisher}, ${safeYear}.`;
      } else {
        bibliographyPlain = `${safeAuthors}. "${safeTitle}." ${safeContainer}, ${safeYear}, ${safeDoi}. Accessed ${accessDate || '20 Aug. 2026'}.`;
        bibliographyHtml = `${safeAuthors}. "${safeTitle}." <em>${safeContainer}</em>, ${safeYear}, ${safeDoi}. Accessed ${accessDate || '20 Aug. 2026'}.`;
      }
    } else if (style === 'ieee') {
      // IEEE
      inTextParenthetical = `[1]`;
      inTextNarrative = `As shown in [1], ...`;

      if (sourceType === 'journal') {
        bibliographyPlain = `${safeAuthors}, "${safeTitle}," ${safeContainer}, vol. ${safeVol || '1'}, no. ${safeIssue || '1'}, pp. ${safePages || '1-10'}, ${safeYear}, doi: ${safeDoi}.`;
        bibliographyHtml = `${safeAuthors}, "${safeTitle}," <em>${safeContainer}</em>, vol. ${safeVol || '1'}, no. ${safeIssue || '1'}, pp. ${safePages || '1-10'}, ${safeYear}, doi: ${safeDoi}.`;
      } else {
        bibliographyPlain = `${safeAuthors}, ${safeTitle}. ${safePublisher}, ${safeYear}.`;
        bibliographyHtml = `${safeAuthors}, <em>${safeTitle}</em>. ${safePublisher}, ${safeYear}.`;
      }
    } else {
      // Chicago Author-Date
      inTextParenthetical = `(${firstAuthorSurname} ${safeYear})`;
      inTextNarrative = `${firstAuthorSurname} (${safeYear})`;

      bibliographyPlain = `${safeAuthors}. ${safeYear}. "${safeTitle}." ${safeContainer} ${safeVol} (${safeIssue}): ${safePages}. ${safeDoi}.`;
      bibliographyHtml = `${safeAuthors}. ${safeYear}. "${safeTitle}." <em>${safeContainer}</em> ${safeVol} (${safeIssue}): ${safePages}. ${safeDoi}.`;
    }

    return {
      inTextParenthetical,
      inTextNarrative,
      bibliographyPlain,
      bibliographyHtml,
    };
  }, [style, sourceType, authors, year, title, sourceContainer, volume, issue, pages, publisher, doiUrl, accessDate]);

  const handleCopy = (text: string, type: 'bib' | 'parenthetical' | 'narrative') => {
    navigator.clipboard.writeText(text);
    if (type === 'bib') setCopiedBib(true);
    if (type === 'parenthetical') setCopiedParenthetical(true);
    if (type === 'narrative') setCopiedNarrative(true);

    if (onShowToast) onShowToast('Citation copied to clipboard!', 'success');

    setTimeout(() => {
      setCopiedBib(false);
      setCopiedParenthetical(false);
      setCopiedNarrative(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <button
            onClick={() => onNavigatePage ? onNavigatePage('home') : null}
            className="hover:text-[#E5C158] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigatePage ? onNavigatePage('tools') : null}
            className="hover:text-[#E5C158] transition-colors"
          >
            Free Tools & Utilities
          </button>
          <span>/</span>
          <span className="text-[#E5C158]">Academic Citation & Reference Formatter</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Multi-Style Bibliography & In-Text Formatter</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins text-white tracking-tight leading-tight">
            Academic Citation & <span className="text-[#E5C158]">Reference Generator</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Instantly format peer-reviewed journal articles, books, and web reports into APA 7th, Harvard, MLA 9th, IEEE, and Chicago styles with verified in-text citations.
          </p>

          {/* Style Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'apa7', label: 'APA 7th Edition' },
              { id: 'harvard', label: 'Harvard Standard' },
              { id: 'mla9', label: 'MLA 9th Edition' },
              { id: 'ieee', label: 'IEEE Style' },
              { id: 'chicago', label: 'Chicago (Author-Date)' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStyle(st.id as CitationStyle)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  style === st.id
                    ? 'bg-[#E5C158] text-black shadow-lg shadow-[#E5C158]/20'
                    : 'bg-[#0F0F16] text-neutral-300 border border-white/10 hover:border-white/25'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Source Input Fields */}
          <div className="lg:col-span-7 space-y-6">
            {/* Source Type Selector & Samples */}
            <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Source Material Type:
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">Load sample:</span>
                  <button
                    onClick={() => handleLoadSample('journal1')}
                    className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[#E5C158] border border-white/10"
                  >
                    Journal
                  </button>
                  <button
                    onClick={() => handleLoadSample('book1')}
                    className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[#E5C158] border border-white/10"
                  >
                    Book
                  </button>
                  <button
                    onClick={() => handleLoadSample('website1')}
                    className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[#E5C158] border border-white/10"
                  >
                    Web
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-xs p-1 rounded hover:bg-red-500/10 text-red-400"
                    title="Clear All Fields"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'journal', label: 'Journal Article' },
                  { id: 'book', label: 'Book / Monograph' },
                  { id: 'website', label: 'Web Page / Report' },
                  { id: 'conference', label: 'Conference Paper' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSourceType(st.id as SourceType)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                      sourceType === st.id
                        ? 'bg-[#161624] border-[#E5C158] text-[#E5C158]'
                        : 'bg-[#08080C] border-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Form Input Fields */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Authors (e.g. Sultan, M. S., & Khan, A. R. or World Health Organization)
                  </label>
                  <input
                    type="text"
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                    placeholder="Surname, Initial., & Surname, Initial."
                    className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Year of Publication</label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="e.g. 2024"
                      className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      {sourceType === 'book' ? 'Book Title' : 'Article / Page Title'}
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title of the research work"
                      className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                    />
                  </div>
                </div>

                {sourceType !== 'book' && (
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Journal Name / Source Container / Website Title
                    </label>
                    <input
                      type="text"
                      value={sourceContainer}
                      onChange={(e) => setSourceContainer(e.target.value)}
                      placeholder="e.g. Journal of Financial Economics"
                      className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                    />
                  </div>
                )}

                {sourceType === 'book' && (
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Publisher</label>
                    <input
                      type="text"
                      value={publisher}
                      onChange={(e) => setPublisher(e.target.value)}
                      placeholder="e.g. Oxford University Press"
                      className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                    />
                  </div>
                )}

                {sourceType === 'journal' && (
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Volume</label>
                      <input
                        type="text"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        placeholder="e.g. 14"
                        className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Issue</label>
                      <input
                        type="text"
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        placeholder="e.g. 2"
                        className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Page Range</label>
                      <input
                        type="text"
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                        placeholder="e.g. 120-135"
                        className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    DOI or Direct URL
                  </label>
                  <input
                    type="text"
                    value={doiUrl}
                    onChange={(e) => setDoiUrl(e.target.value)}
                    placeholder="e.g. https://doi.org/10.xxxx/xxxx or https://example.com"
                    className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Formatted Outputs & In-Text Citations */}
          <div className="lg:col-span-5 space-y-6">
            {/* Formatted Reference Box */}
            <div className="p-6 rounded-2xl bg-[#0F0F16] border border-[#E5C158]/30 shadow-2xl space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4" />
                  <span>Bibliography / Reference Entry</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase bg-white/5 px-2 py-0.5 rounded">
                  {style}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#050507] border border-white/10 text-xs sm:text-sm text-neutral-200 leading-relaxed font-serif select-all">
                <div
                  dangerouslySetHtml={{
                    __html: generatedCitations.bibliographyHtml,
                  }}
                />
              </div>

              <button
                onClick={() => handleCopy(generatedCitations.bibliographyPlain, 'bib')}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedBib ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Reference Entry Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy Full Reference Entry</span>
                  </>
                )}
              </button>
            </div>

            {/* In-Text Citations Box */}
            <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 shadow-xl space-y-4">
              <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#E5C158]" />
                <span>In-Text Citation Pairs</span>
              </span>

              {/* Parenthetical */}
              <div className="p-3.5 rounded-xl bg-[#050507] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-semibold">
                    Parenthetical Citation:
                  </span>
                  <span className="text-xs font-mono font-medium text-white">
                    {generatedCitations.inTextParenthetical}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(generatedCitations.inTextParenthetical, 'parenthetical')}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  title="Copy Parenthetical Citation"
                >
                  {copiedParenthetical ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Narrative */}
              <div className="p-3.5 rounded-xl bg-[#050507] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-semibold">
                    Narrative Citation:
                  </span>
                  <span className="text-xs font-mono font-medium text-white">
                    {generatedCitations.inTextNarrative}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(generatedCitations.inTextNarrative, 'narrative')}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  title="Copy Narrative Citation"
                >
                  {copiedNarrative ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Turnitin & Academic Assignment Funnel */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1A1A24] via-[#12121A] to-[#0A0A10] border border-[#E5C158]/40 shadow-2xl relative">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E5C158]/10 text-[#E5C158] text-[10px] font-bold uppercase mb-3">
                <GraduationCap className="w-3 h-3 text-[#E5C158]" />
                <span>Academic Writing Solutions</span>
              </div>

              <h3 className="text-base font-bold font-poppins text-white">
                Need Complete Assignment & Essay Solutions?
              </h3>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                Our academic subject specialists provide 100% original, Turnitin-verified coursework with rigorous literature reviews, methodology design, and precise APA 7/Harvard references.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenOrderModal('assignment')}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs font-poppins transition-all shadow-lg shadow-[#E5C158]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Order Assignment (50% OFF)</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
                <button
                  onClick={() => onNavigatePage ? onNavigatePage('guide-academic-formatting') : null}
                  className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Academic Guide</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
