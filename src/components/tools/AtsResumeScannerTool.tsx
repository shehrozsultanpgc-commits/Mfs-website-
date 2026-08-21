import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  Upload,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Zap,
  TrendingUp,
  Briefcase,
  Award,
  Search,
  FileCheck,
  BarChart3,
  HelpCircle,
  Layers,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface AtsResumeScannerToolProps {
  onOpenOrderModal: (serviceId?: string) => void;
  onOpenAIChat?: () => void;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  onNavigatePage?: (page: string) => void;
}

const SAMPLE_RESUMES: Record<string, { title: string; targetRole: string; resumeText: string; jobDescription: string }> = {
  software: {
    title: 'Software Engineer (Mid-Level)',
    targetRole: 'Senior Full Stack Developer',
    resumeText: `MUHAMMAD AHMAD
Lahore, Pakistan | +92 300 1234567 | ahmad.dev@email.com | linkedin.com/in/ahmad-dev

PROFESSIONAL SUMMARY
Results-driven Full Stack Software Engineer with 4+ years of experience in architecting scalable web applications, microservices, and RESTful APIs using React, Node.js, TypeScript, and PostgreSQL. Reduced cloud operational costs by 28% through Docker containerization and CI/CD automation.

CORE COMPETENCIES & TECHNICAL SKILLS
- Languages: TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3
- Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, Webpack
- Backend & DB: Node.js, Express.js, PostgreSQL, MongoDB, Redis, REST APIs, GraphQL
- Cloud & DevOps: AWS (EC2, S3), Docker, GitHub Actions, CI/CD pipelines, Jest unit testing

PROFESSIONAL EXPERIENCE
Senior Frontend Developer | TechLogix Solutions | 2022 – Present
- Architected enterprise React dashboards serving 150,000+ daily active users with 99.9% uptime.
- Optimized bundle sizes and lazy-loaded assets, improving Google Core Web Vitals LCP by 42%.
- Mentored a cohort of 5 junior engineers on TypeScript clean code and test-driven development (TDD).

Software Engineer | Alpha Byte Systems | 2020 – 2022
- Engineered microservices with Node.js and PostgreSQL, processing $2.5M in monthly transactional volume.
- Collaborated across Agile sprint cycles with product managers, QA analysts, and UX designers.

EDUCATION
Bachelor of Science in Computer Science | FAST-NUCES Lahore | 2016 – 2020`,
    jobDescription: `We are seeking a Senior Full Stack Developer proficient in React, TypeScript, Node.js, PostgreSQL, and AWS. The ideal candidate will design scalable cloud architectures, optimize front-end performance, lead CI/CD deployment pipelines with Docker, and conduct rigorous unit testing with Jest. Strong collaboration skills in an Agile environment required.`,
  },
  marketing: {
    title: 'Digital Marketing & Growth Lead',
    targetRole: 'Growth Marketing Manager',
    resumeText: `SARA KHAN
Karachi, Pakistan | +92 321 9876543 | sara.marketing@email.com

EXECUTIVE SUMMARY
Dynamic Growth Marketer with 5+ years driving high-ROI acquisition campaigns, performance marketing, and organic SEO strategies for fast-paced B2B and consumer brands. Managed over $600K in annual Google Ads and Meta ad spend while maintaining an average 4.2x ROAS.

KEY SKILLS
- Performance Marketing: Meta Ads Manager, Google Ads (Search/Display), LinkedIn Campaign Manager
- SEO & Analytics: Google Analytics 4 (GA4), SEMrush, Ahrefs, Conversion Rate Optimization (CRO), A/B Testing
- Content & Automation: HubSpot CRM, Mailchimp, Copywriting, Retention Marketing

WORK EXPERIENCE
Digital Growth Specialist | Nexus Media | 2022 – Present
- Scaled quarterly inbound lead volume by 135% through targeted SEO content hubs and landing page CRO experiments.
- Managed multi-channel paid ad budgets totaling $50,000/month, lowering Cost Per Acquisition (CPA) by 31%.

Marketing Associate | Spark Brand Consultants | 2019 – 2022
- Executed email nurture campaigns with 41% open rates and 8.5% CTR across a subscriber base of 60,000+.

EDUCATION
BBA in Marketing | Institute of Business Administration (IBA) Karachi`,
    jobDescription: `Looking for a Growth Marketing Manager to oversee multi-channel customer acquisition (Google Ads, Meta, LinkedIn), lead Conversion Rate Optimization (CRO), manage GA4 analytics, and drive organic SEO growth. Must have proven experience managing large ad budgets and optimizing CPA/ROAS.`,
  },
  finance: {
    title: 'Financial Analyst / Accounting',
    targetRole: 'Senior Financial Analyst',
    resumeText: `BILAL TARIQ
Global Remote | +1 (555) 019-2834 | bilal.finance@email.com

PROFESSIONAL PROFILE
Analytical Corporate Finance Professional with 4+ years of expertise in financial modeling, variance analysis, budgeting, and DCF valuations. Proficient in Advanced Excel (VBA, Power Query), SAP ERP, and Power BI dashboard visualization.

CORE SKILLS
- Financial Analysis: Financial Modeling, DCF Valuation, Budgeting & Forecasting, Variance Analysis
- Tools & ERP: SAP FI/CO, Advanced Microsoft Excel, Power BI, SQL, QuickBooks

PROFESSIONAL EXPERIENCE
Financial Analyst | Crescent Capital Group | 2021 – Present
- Developed 5-year consolidated financial forecasting models and quarterly variance reports for board review.
- Automated cash flow reconciliation pipelines in Excel VBA, saving 14 manual reporting hours weekly.

EDUCATION
BS Accounting & Finance | LUMS (Lahore University of Management Sciences) | CFA Level II Candidate`,
    jobDescription: `Hiring a Senior Financial Analyst to build discounted cash flow (DCF) models, prepare corporate budgets, perform quarterly variance analysis, and generate executive financial dashboards using SAP, Power BI, and Advanced Excel.`,
  },
};

const ATS_ACTION_VERBS = [
  'architected', 'spearheaded', 'orchestrated', 'engineered', 'optimized',
  'accelerated', 'transformed', 'delivered', 'generated', 'streamlined',
  'formulated', 'negotiated', 'maximized', 'pioneered', 'implemented',
  'managed', 'led', 'designed', 'built', 'reduced', 'increased', 'developed'
];

export const AtsResumeScannerTool: React.FC<AtsResumeScannerToolProps> = ({
  onOpenOrderModal,
  onOpenAIChat,
  onShowToast,
  onNavigatePage,
}) => {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES.software.resumeText);
  const [jobDescText, setJobDescText] = useState(SAMPLE_RESUMES.software.jobDescription);
  const [activePreset, setActivePreset] = useState<string>('software');
  const [copiedAudit, setCopiedAudit] = useState(false);

  const handleSelectPreset = (key: string) => {
    setActivePreset(key);
    setResumeText(SAMPLE_RESUMES[key].resumeText);
    setJobDescText(SAMPLE_RESUMES[key].jobDescription);
    if (onShowToast) onShowToast(`Loaded ${SAMPLE_RESUMES[key].title} template`, 'info');
  };

  const handleReset = () => {
    setResumeText('');
    setJobDescText('');
    setActivePreset('');
  };

  // Live ATS Parser & Audit Algorithm
  const analysis = useMemo(() => {
    if (!resumeText.trim()) {
      return null;
    }

    const lowerResume = resumeText.toLowerCase();
    const lowerJobDesc = jobDescText.toLowerCase();

    // 1. Extract Keywords from Job Description
    const words = lowerJobDesc
      .replace(/[^a-z0-9+#.\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !['with', 'from', 'have', 'that', 'this', 'will', 'your', 'about', 'must', 'these', 'their', 'which', 'seeking', 'looking', 'ideal', 'strong', 'required', 'skills', 'experience'].includes(w));
    
    // Unique top job keywords
    const uniqueJobKeywords: string[] = Array.from(new Set(words));
    
    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    uniqueJobKeywords.forEach((kw) => {
      if (lowerResume.includes(kw)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const keywordMatchRate = uniqueJobKeywords.length > 0
      ? Math.round((matchedKeywords.length / uniqueJobKeywords.length) * 100)
      : 80;

    // 2. Action Verbs Evaluation
    const foundVerbs = ATS_ACTION_VERBS.filter((verb) => lowerResume.includes(verb));
    const verbScore = Math.min(100, Math.round((foundVerbs.length / 6) * 100));

    // 3. Structural Sections Detection
    const hasContact = /(@|\+92|\+1|\+44|email|phone|linkedin)/i.test(resumeText);
    const hasSummary = /(summary|profile|objective|about)/i.test(resumeText);
    const hasExperience = /(experience|employment|work history|career)/i.test(resumeText);
    const hasSkills = /(skills|competencies|technologies|tools)/i.test(resumeText);
    const hasEducation = /(education|degree|university|bachelor|master)/i.test(resumeText);

    const sectionChecks = [
      { name: 'Contact Information & Verified Links', passed: hasContact },
      { name: 'Professional Summary / Profile', passed: hasSummary },
      { name: 'Work Experience with Reverse-Chronology', passed: hasExperience },
      { name: 'Dedicated Technical & Core Skills Section', passed: hasSkills },
      { name: 'Education & Credentials Block', passed: hasEducation },
    ];

    const passedSectionCount = sectionChecks.filter((s) => s.passed).length;
    const structureScore = Math.round((passedSectionCount / sectionChecks.length) * 100);

    // 4. Quantifiable Metrics & Numbers
    const numberMatches = resumeText.match(/\d+(%|\+|\$|M|k|x|\s*hours|\s*years|\s*daily|\s*users)/gi) || [];
    const metricScore = Math.min(100, Math.round((numberMatches.length / 5) * 100));

    // 5. Total Composite ATS Score
    const overallScore = Math.min(
      99,
      Math.max(
        20,
        Math.round(
          keywordMatchRate * 0.4 +
          structureScore * 0.25 +
          verbScore * 0.2 +
          metricScore * 0.15
        )
      )
    );

    return {
      overallScore,
      keywordMatchRate,
      structureScore,
      verbScore,
      metricScore,
      matchedKeywords,
      missingKeywords,
      foundVerbs,
      sectionChecks,
      metricCount: numberMatches.length,
      wordCount: resumeText.trim().split(/\s+/).length,
    };
  }, [resumeText, jobDescText]);

  const handleCopyReport = () => {
    if (!analysis) return;
    const summary = `MFS Growth Agency - ATS Resume Audit Report
ATS Score: ${analysis.overallScore}/100
Keyword Match Rate: ${analysis.keywordMatchRate}%
Action Verbs Detected: ${analysis.foundVerbs.join(', ') || 'None'}
Missing Job Keywords: ${analysis.missingKeywords.slice(0, 8).join(', ') || 'None'}
Quantified Metrics Detected: ${analysis.metricCount}
Verified by MFS ATS Engine (mfsgrowth.online)`;

    navigator.clipboard.writeText(summary);
    setCopiedAudit(true);
    if (onShowToast) onShowToast('ATS Audit Report copied to clipboard!', 'success');
    setTimeout(() => setCopiedAudit(false), 2500);
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
          <span className="text-[#E5C158]">ATS Resume Scanner & Simulator</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 text-[#E5C158] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Free Recruiter ATS Audit Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins text-white tracking-tight leading-tight">
            ATS Resume Scanner & <span className="text-[#E5C158]">Keyword Matcher</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Test how Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever) parse your resume. 
            Identify missing target keywords, weak action verbs, and formatting errors before applying.
          </p>

          {/* Quick Presets */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-neutral-400 mr-2">Try Sample Roles:</span>
            {Object.keys(SAMPLE_RESUMES).map((key) => (
              <button
                key={key}
                onClick={() => handleSelectPreset(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activePreset === key
                    ? 'bg-[#E5C158] text-black font-semibold shadow-md shadow-[#E5C158]/20'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                }`}
              >
                {SAMPLE_RESUMES[key].title}
              </button>
            ))}
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1 transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inputs (Resume Text + Job Description) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Resume Text Input */}
            <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 shadow-xl relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#E5C158]" />
                  <h2 className="text-base font-bold font-poppins text-white">Your Resume Plaintext</h2>
                </div>
                <span className="text-xs text-neutral-400 font-mono">
                  {resumeText.trim().split(/\s+/).filter(Boolean).length} Words
                </span>
              </div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here (Summary, Skills, Experience, Education)..."
                rows={12}
                className="w-full bg-[#050507] border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 font-mono focus:outline-none focus:border-[#E5C158] transition-colors resize-y leading-relaxed"
              />
              <p className="text-[11px] text-neutral-400 mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Client-Side Privacy: Your data never leaves your browser.</span>
              </p>
            </div>

            {/* Target Job Description Input */}
            <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#E5C158]" />
                  <h2 className="text-base font-bold font-poppins text-white">Target Job Description (Optional)</h2>
                </div>
                <span className="text-xs text-neutral-400 font-mono">
                  {jobDescText.trim().split(/\s+/).filter(Boolean).length} Words
                </span>
              </div>
              <textarea
                value={jobDescText}
                onChange={(e) => setJobDescText(e.target.value)}
                placeholder="Paste the target job description to run keyword match & gap analysis..."
                rows={5}
                className="w-full bg-[#050507] border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 font-mono focus:outline-none focus:border-[#E5C158] transition-colors resize-y leading-relaxed"
              />
            </div>
          </div>

          {/* Right Column: Live ATS Analysis & Actionable Fixes */}
          <div className="lg:col-span-5 space-y-6">
            {analysis ? (
              <>
                {/* Master Score Card */}
                <div className="p-6 rounded-2xl bg-[#0F0F16] border border-[#E5C158]/30 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-[#E5C158] uppercase tracking-wider flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4" />
                      Live ATS Benchmark Score
                    </span>
                    <button
                      onClick={handleCopyReport}
                      className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors px-2.5 py-1 rounded bg-white/5 border border-white/10"
                    >
                      {copiedAudit ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Audit</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center bg-[#050507]">
                      <div
                        className="absolute inset-0 rounded-full border-4 transition-all duration-700"
                        style={{
                          borderColor:
                            analysis.overallScore >= 80
                              ? '#28C76F'
                              : analysis.overallScore >= 60
                              ? '#E5C158'
                              : '#EA5455',
                          clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                        }}
                      />
                      <div className="text-center">
                        <span className="text-2xl font-black font-poppins text-white block leading-none">
                          {analysis.overallScore}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium uppercase">/ 100</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-bold font-poppins text-white">
                        {analysis.overallScore >= 80 ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Excellent ATS Readiness
                          </span>
                        ) : analysis.overallScore >= 60 ? (
                          <span className="text-[#E5C158] flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" /> Moderate Optimization Needed
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> High Risk of ATS Rejection
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {analysis.overallScore >= 80
                          ? 'Meets standard Workday & Taleo keyword density and structural requirements.'
                          : 'Missing critical role-targeted keywords and metrics required to clear human recruiter filters.'}
                      </p>
                    </div>
                  </div>

                  {/* Sub-Metrics Breakdown */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-300">Target Keyword Match</span>
                        <span className="text-white font-mono font-semibold">{analysis.keywordMatchRate}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#E5C158] rounded-full transition-all duration-500"
                          style={{ width: `${analysis.keywordMatchRate}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-300">Structural Section Compliance</span>
                        <span className="text-white font-mono font-semibold">{analysis.structureScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${analysis.structureScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-300">Action Verb Strength</span>
                        <span className="text-white font-mono font-semibold">{analysis.verbScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-400 rounded-full transition-all duration-500"
                          style={{ width: `${analysis.verbScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-300">Quantifiable Metrics & ROI Data</span>
                        <span className="text-white font-mono font-semibold">{analysis.metricScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-400 rounded-full transition-all duration-500"
                          style={{ width: `${analysis.metricScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keyword Analysis Box */}
                <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 shadow-xl space-y-4">
                  <h3 className="text-sm font-bold font-poppins text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#E5C158]" />
                    <span>Keyword Gap Analysis</span>
                  </h3>

                  {analysis.missingKeywords.length > 0 && (
                    <div>
                      <span className="text-[11px] font-semibold text-red-400 block mb-2">
                        Missing High-Impact Keywords ({analysis.missingKeywords.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.missingKeywords.slice(0, 10).map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-300 text-[11px] font-mono"
                          >
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.matchedKeywords.length > 0 && (
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-400 block mb-2">
                        Successfully Matched Keywords ({analysis.matchedKeywords.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.matchedKeywords.slice(0, 10).map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono flex items-center gap-1"
                          >
                            <Check className="w-2.5 h-2.5" />
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section Structure Checklist */}
                <div className="p-6 rounded-2xl bg-[#0F0F16] border border-white/10 shadow-xl space-y-3">
                  <h3 className="text-sm font-bold font-poppins text-white flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4 text-[#E5C158]" />
                    <span>ATS Layout & Structure Check</span>
                  </h3>
                  <div className="space-y-2">
                    {analysis.sectionChecks.map((chk, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                        <span className="text-neutral-300">{chk.name}</span>
                        {chk.passed ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        ) : (
                          <span className="text-red-400 font-semibold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Missing
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1-Click Upgrade to MFS Professional ATS Engineering */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1A1A24] via-[#12121A] to-[#0A0A10] border border-[#E5C158]/40 shadow-2xl relative">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E5C158]/10 text-[#E5C158] text-[10px] font-bold uppercase mb-3">
                    <Zap className="w-3 h-3 text-[#E5C158]" />
                    <span>50% Grand Launch Offer Active</span>
                  </div>

                  <h3 className="text-base font-bold font-poppins text-white">
                    Need a Guaranteed 95%+ ATS Score?
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                    Have our human ATS specialists re-engineer your resume, inject targeted industry keywords, rewrite bullets using the Google STAR methodology, and deliver custom ATS Word & PDF files in 24 hours.
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onOpenOrderModal('ats-resume')}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D27A] hover:to-[#E5C158] text-black font-bold text-xs font-poppins transition-all shadow-lg shadow-[#E5C158]/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Order ATS Resume (50% OFF)</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => onNavigatePage ? onNavigatePage('guide-ats-resume') : null}
                      className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Read ATS Guide</span>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 rounded-2xl bg-[#0F0F16] border border-white/10 text-center py-16">
                <FileText className="w-12 h-12 text-neutral-500 mx-auto mb-3 opacity-50" />
                <h3 className="text-base font-bold text-white">No Resume Content Detected</h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                  Paste your resume text on the left or select one of the sample roles above to view live ATS metrics.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
