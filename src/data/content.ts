import { ServiceItem, ReviewItem, FaqItem, ContactCardItem, Currency, DeliverySpeed } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'presentation',
    badge: 'Popular',
    icon: '📊',
    title: 'Presentation Design',
    description: 'Executive pitch decks and academic slide decks engineered with modern visual structures, custom layouts, and compelling data graphics.',
    pricePkr: 1250,
    priceUsd: 7.50,
    originalPricePkr: 2500,
    originalPriceUsd: 15.00,
    unit: '/ 10 slides',
    category: 'Academic',
    deliveryTime: '24 - 48 Hours',
    rating: 4.9,
    features: [
      'Custom Slide Layouts & Typography',
      'Charts & Visual Data Graphics',
      'Editable PPTX & Exported High-Res PDF',
      '100% Original & Confidential'
    ]
  },
  {
    id: 'assignment',
    badge: 'Popular',
    icon: '✍️',
    title: 'Assignment Writing',
    description: 'Accurate academic assignment structures mapped to university parameters, delivered with meticulous research, references, and formatting.',
    pricePkr: 1000,
    priceUsd: 7.50,
    originalPricePkr: 2000,
    originalPriceUsd: 15.00,
    unit: '/ 1,000 words',
    category: 'Academic',
    deliveryTime: '24 - 48 Hours',
    rating: 5.0,
    features: [
      'Strict APA / Harvard / MLA Referencing',
      '100% Plagiarism-Free Content',
      'Deep Subject Matter Research',
      'Turnitin Compatibility Checked'
    ]
  },
  {
    id: 'resume',
    badge: 'Essential',
    icon: '👔',
    title: 'Resume Writing',
    description: 'Professional resume crafting tailored to highlight your achievements, skill matrix, and career trajectory for maximum hiring impact.',
    pricePkr: 1250,
    priceUsd: 10.00,
    originalPricePkr: 2500,
    originalPriceUsd: 20.00,
    unit: '/ Professional Resume',
    category: 'Career',
    deliveryTime: '24 Hours',
    rating: 4.9,
    features: [
      'Tailored Professional Summary',
      'Achievement-Oriented Bullet Points',
      'Modern Clean Layouts',
      'Editable DOCX & PDF Formats'
    ]
  },
  {
    id: 'ats-resume',
    badge: 'Popular',
    icon: '⚡',
    title: 'ATS Resume Engineering',
    description: 'ATS-compliant resume engineering designed with precise keywords, clean structural hierarchy, and parser-friendly formatting.',
    pricePkr: 1500,
    priceUsd: 12.00,
    originalPricePkr: 3000,
    originalPriceUsd: 24.00,
    unit: '/ ATS Standard',
    category: 'Career',
    deliveryTime: '24 Hours',
    rating: 5.0,
    features: [
      'ATS Keyword Optimization',
      'Scannable Single/Double Column Layout',
      'Recruiter-Screening Compatible',
      'Industry-Specific Targeting'
    ]
  },
  {
    id: 'cv-design',
    badge: 'Essential',
    icon: '📄',
    title: 'CV Design',
    description: 'High-impact visual curriculum vitae design for academic applications, medical professionals, executives, and international positions.',
    pricePkr: 1250,
    priceUsd: 10.00,
    originalPricePkr: 2500,
    originalPriceUsd: 20.00,
    unit: '/ Modern CV',
    category: 'Career',
    deliveryTime: '24 - 48 Hours',
    rating: 4.8,
    features: [
      'Executive & Academic CV Layouts',
      'Multi-Page Hierarchy Design',
      'Custom Color Accents',
      'PDF Print-Ready High Res'
    ]
  },
  {
    id: 'cover-letter',
    badge: 'Essential',
    icon: '✉️',
    title: 'Cover Letter Writing',
    description: 'Persuasive, job-tailored cover letters that connect your qualifications directly to job description requirements and recruiters.',
    pricePkr: 800,
    priceUsd: 6.00,
    originalPricePkr: 1600,
    originalPriceUsd: 12.00,
    unit: '/ Tailored Letter',
    category: 'Career',
    deliveryTime: '24 Hours',
    rating: 4.9,
    features: [
      'Company & Role Specific Customization',
      'Compelling Opening Hook',
      'Matching Resume Header Styling',
      'DOCX & PDF Deliverables'
    ]
  },
  {
    id: 'reports',
    badge: 'Corporate',
    icon: '📈',
    title: 'Report Formatting & Writing',
    description: 'In-depth corporate, financial, and technical business reports structured with executive summaries, data charts, and clean typography.',
    pricePkr: 1500,
    priceUsd: 12.00,
    originalPricePkr: 3000,
    originalPriceUsd: 24.00,
    unit: '/ 1,000 words',
    category: 'Business',
    deliveryTime: '2 - 3 Days',
    rating: 4.9,
    features: [
      'Executive Summaries & Analysis',
      'Custom Data Visualizations',
      'Professional Cover Page & TOC',
      'Full Reference List'
    ]
  },
  {
    id: 'case-studies',
    badge: 'Essential',
    icon: '🔍',
    title: 'Case Study Solutions',
    description: 'Analytical case study write-ups solving real-world business challenges, market dilemmas, and academic scenarios with structured frameworks.',
    pricePkr: 1500,
    priceUsd: 12.00,
    originalPricePkr: 3000,
    originalPriceUsd: 24.00,
    unit: '/ 1,000 words',
    category: 'Academic',
    deliveryTime: '2 - 3 Days',
    rating: 5.0,
    features: [
      'SWOT & PESTEL Framework Integration',
      'Problem Statement Analysis',
      'Actionable Strategic Recommendations',
      'Academic & Professional Formats'
    ]
  },
  {
    id: 'pitch-deck',
    badge: 'Corporate',
    icon: '🚀',
    title: 'Investor Pitch Decks',
    description: 'High-stakes startup investor pitch decks structured for seed & Series A funding, business model clarity, and market traction.',
    pricePkr: 2500,
    priceUsd: 20.00,
    originalPricePkr: 5000,
    originalPriceUsd: 40.00,
    unit: '/ 10 slides',
    category: 'Business',
    deliveryTime: '2 - 3 Days',
    rating: 5.0,
    features: [
      'Investor Narrative Flow',
      'Financial Forecast Visuals',
      'Market Size & Traction Graphics',
      'Source File PPTX + PDF'
    ]
  },
  {
    id: 'document-formatting',
    badge: 'Essential',
    icon: '📝',
    title: 'Document Formatting & Cleanup',
    description: 'Comprehensive document cleanup, heading styles standardization, table of contents generation, margin alignment, and typography polish.',
    pricePkr: 800,
    priceUsd: 6.00,
    originalPricePkr: 1600,
    originalPriceUsd: 12.00,
    unit: '/ 1,500 words',
    category: 'Business',
    deliveryTime: '24 Hours',
    rating: 4.9,
    features: [
      'Automated Table of Contents',
      'Consistent Heading & Font Hierarchy',
      'Margin & Page Break Corrections',
      'Reference List Standardisation'
    ]
  },
  {
    id: 'infographics',
    badge: 'Corporate',
    icon: '🖼️',
    title: 'Infographics & Data Graphics',
    description: 'Custom visual infographics turning complex data, timelines, and processes into engaging graphics for presentations, web, and reports.',
    pricePkr: 1500,
    priceUsd: 12.00,
    originalPricePkr: 3000,
    originalPriceUsd: 24.00,
    unit: '/ Infographic Graphic',
    category: 'Business',
    deliveryTime: '24 - 48 Hours',
    rating: 4.9,
    features: [
      'Custom Vector Artwork & Icons',
      'High-Res Export (PNG, PDF, SVG)',
      'Brand Color Palette Integration',
      'Social & Print Ready'
    ]
  }
];

export function calculateServicePrice(
  serviceId: string,
  quantity: number = 1,
  speed: DeliverySpeed = 'standard',
  currency: Currency = 'PKR'
) {
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const sanitizedQty = Math.max(1, Number(quantity) || 1);

  let basePkr = service.pricePkr;
  let baseUsd = service.priceUsd;
  let origPkr = service.originalPricePkr;
  let origUsd = service.originalPriceUsd;

  if (service.id === 'presentation' || service.id === 'pitch-deck') {
    const factor = sanitizedQty / 10;
    basePkr = service.pricePkr * factor;
    baseUsd = service.priceUsd * factor;
    origPkr = service.originalPricePkr * factor;
    origUsd = service.originalPriceUsd * factor;
  } else if (service.id === 'assignment' || service.id === 'reports' || service.id === 'case-studies') {
    const factor = sanitizedQty / 1000;
    basePkr = service.pricePkr * factor;
    baseUsd = service.priceUsd * factor;
    origPkr = service.originalPricePkr * factor;
    origUsd = service.originalPriceUsd * factor;
  } else if (service.id === 'document-formatting') {
    const factor = sanitizedQty / 1500;
    basePkr = service.pricePkr * factor;
    baseUsd = service.priceUsd * factor;
    origPkr = service.originalPricePkr * factor;
    origUsd = service.originalPriceUsd * factor;
  }

  let speedMultiplier = 1.0;
  if (speed === 'express') speedMultiplier = 1.30;
  if (speed === 'priority') speedMultiplier = 1.50;
  if (speed === 'sameday' || (speed as any) === 'same-day') speedMultiplier = 1.75;

  const calculatedOrigPkr = Math.round(origPkr * speedMultiplier);
  const calculatedOrigUsd = parseFloat((origUsd * speedMultiplier).toFixed(2));
  const calculatedPromoPkr = Math.round(basePkr * speedMultiplier);
  const calculatedPromoUsd = parseFloat((baseUsd * speedMultiplier).toFixed(2));

  const isPkr = currency === 'PKR';
  const basePromoPkr = Math.round(basePkr);
  const basePromoUsd = parseFloat(baseUsd.toFixed(2));
  const basePromoPrice = isPkr ? basePromoPkr : basePromoUsd;
  const rushFeePkr = Math.max(0, calculatedPromoPkr - basePromoPkr);
  const rushFeeUsd = Math.max(0, parseFloat((calculatedPromoUsd - basePromoUsd).toFixed(2)));
  const rushFee = isPkr ? rushFeePkr : rushFeeUsd;

  const finalPrice = isPkr ? calculatedPromoPkr : calculatedPromoUsd;
  const originalPrice = isPkr ? calculatedOrigPkr : calculatedOrigUsd;
  const formattedFinal = isPkr ? `PKR ${calculatedPromoPkr.toLocaleString()}` : `USD ${calculatedPromoUsd.toFixed(2)}`;
  const formattedOriginal = isPkr ? `PKR ${calculatedOrigPkr.toLocaleString()}` : `USD ${calculatedOrigUsd.toFixed(2)}`;

  return {
    service,
    sanitizedQty,
    basePromoPrice,
    rushFee,
    finalPrice,
    originalPrice,
    calculatedPromoPkr,
    calculatedPromoUsd,
    calculatedOrigPkr,
    calculatedOrigUsd,
    formattedFinal,
    formattedOriginal,
    currencySymbol: isPkr ? 'PKR' : '$'
  };
}

export const OFFICIAL_AI_PRICING_PROMPT_TEXT = SERVICES.map(
  (s) => `- ${s.title} (${s.unit}): Official Base Rate = PKR ${s.originalPricePkr.toLocaleString()} / $${s.originalPriceUsd.toFixed(2)} | Active 50% Grand Launch Discounted Price = PKR ${s.pricePkr.toLocaleString()} / $${s.priceUsd.toFixed(2)}`
).join('\n');

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Place Your Order',
    description: 'Choose your service and fill in your project specifications on our simple order form.'
  },
  {
    number: '02',
    title: 'Complete Payment',
    description: 'Transfer funds via EasyPaisa, JazzCash, or Bank Transfer and upload your screenshot.'
  },
  {
    number: '03',
    title: 'We Start Working',
    description: 'Our team formatting experts handle your task based on strict evaluation metrics.'
  },
  {
    number: '04',
    title: 'Receive Project',
    description: 'Get your premium completed file delivered directly to your client dashboard on time.'
  }
];

export const WHY_US_ITEMS = [
  {
    icon: '🛡️',
    title: 'Originality Assured',
    description: 'Every presentation, assignment, and document is custom-formatted from scratch. Zero templates, zero duplicates.'
  },
  {
    icon: '🎯',
    title: 'Technical Precision',
    description: 'We respect deadlines, match strict criteria outlines, and manage citation schemas (Harvard, APA, MLA) securely.'
  },
  {
    icon: '🔄',
    title: 'Policy-Based Revisions',
    description: 'Enjoy free revisions inside reasonable bounds of your original project brief until requirements are satisfied.'
  }
];

export const PORTFOLIO_SAMPLES = [
  {
    id: '1',
    title: 'Fintech Pitch Deck & Growth Strategy',
    category: 'Presentation Design',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    scope: '24 Custom Slides',
    tools: 'PowerPoint & Illustrator',
    clientType: 'Corporate / Startup',
    summary: 'Executive pitch deck engineered for Series A funding with clean custom data charts, financial projections, and competitor comparison matrices.'
  },
  {
    id: '2',
    title: 'Managerial Economics Thesis & Analysis',
    category: 'Assignment Writing',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    scope: '4,500 Words + Harvard Citations',
    tools: 'MS Word & EndNote',
    clientType: 'Academic / Postgraduate',
    summary: 'Master level economics analysis report mapped to university guidelines with structured literature review and empirical data tables.'
  },
  {
    id: '3',
    title: 'ATS Executive Resume & Cover Letter',
    category: 'Resume Writing',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    scope: '2-Page ATS Layout + Cover Letter',
    tools: 'ATS Parsing Engine',
    clientType: 'Professional Career',
    summary: 'ATS-optimized resume engineering featuring targeted skill matrices, metric-driven achievements, and clean single-column hierarchy.'
  },
  {
    id: '4',
    title: 'Healthcare AI Medical Case Study',
    category: 'Assignment Writing',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    scope: '3,000 Words + APA 7th Edition',
    tools: 'MS Word & Zotero',
    clientType: 'Academic / Medical',
    summary: 'Comprehensive clinical case study report with problem diagnostic frameworks and evidence-based healthcare recommendations.'
  },
  {
    id: '5',
    title: 'Corporate Financial Audit Report',
    category: 'Document Formatting',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    scope: '48 Pages Corporate Cleanup',
    tools: 'MS Word & Adobe Acrobat',
    clientType: 'Corporate Firm',
    summary: 'Complete executive document formatting, heading hierarchy standardization, automated table of contents, and custom cover design.'
  },
  {
    id: '6',
    title: 'Global Supply Chain Infographics',
    category: 'Infographics',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80',
    scope: '5 Vector Infographic Graphics',
    tools: 'Adobe Illustrator & Figma',
    clientType: 'Corporate / Logistics',
    summary: 'Custom visual vector graphics converting complex multi-tier supply chain routes into clear, digestible presentation graphics.'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Ayesha Malik',
    location: 'Lahore, Pakistan',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    service: 'Presentation Design',
    date: 'July 20, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Delivered my university thesis slides ahead of time. The charts were easy to read and formatting matched the supervisor instructions.',
    verified: true,
    orderRef: 'ORD-849201'
  },
  {
    id: 'rev-2',
    name: 'Tariq Al-Mansoor',
    location: 'Dubai, UAE',
    country: 'UAE',
    countryFlag: '🇦🇪',
    service: 'Investor Pitch Decks',
    date: 'July 15, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 4,
    text: 'Polished our pitch deck for investors. We asked for a quick adjustment on the financial slide colors which they corrected in 2 hours. Very responsive support team.',
    verified: true,
    orderRef: 'ORD-719302'
  },
  {
    id: 'rev-3',
    name: 'Dr. Liam Vance',
    location: 'London, UK',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    service: 'Assignment Writing',
    date: 'July 08, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'The Harvard citation layout and research report formatting were handled accurately according to module guidelines.',
    verified: false
  },
  {
    id: 'rev-4',
    name: 'Amara Jenkins',
    location: 'Chicago, USA',
    country: 'United States',
    countryFlag: '🇺🇸',
    service: 'ATS Resume Engineering',
    date: 'June 28, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Updated my resume structure with ATS-friendly formatting and clear keyword sections. Passed recruiter screening for a senior analyst position within 2 weeks.',
    verified: true,
    orderRef: 'ORD-628104'
  },
  {
    id: 'rev-5',
    name: 'Fahad Al-Saud',
    location: 'Riyadh, Saudi Arabia',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    service: 'Business Documents',
    date: 'June 21, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Quick service for our corporate proposal. Clean margins and branding alignment.',
    verified: false
  },
  {
    id: 'rev-6',
    name: 'Dr. Marcus Weber',
    location: 'Munich, Germany',
    country: 'Germany',
    countryFlag: '🇩🇪',
    service: 'Research Reports',
    date: 'June 14, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Exceptional document cleanup and executive summary formatting. The typography, margins, and citation lists strictly adhered to German university standards.',
    verified: false
  },
  {
    id: 'rev-7',
    name: 'Zainab Chaudhry',
    location: 'Pakistan',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    service: 'CV Design & Cover Letter',
    date: 'June 05, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Super fast turnaround! I needed my CV and cover letter formatted urgently for a job application. Received both files formatted flawlessly in 6 hours.',
    verified: true,
    orderRef: 'ORD-503912'
  },
  {
    id: 'rev-8',
    name: 'Chloe Tremblay',
    location: 'Toronto, Canada',
    country: 'Canada',
    countryFlag: '🇨🇦',
    service: 'Assignment Writing',
    date: 'May 29, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Flawless APA referencing and structured argument flow for my university paper. Customer service on WhatsApp answered my questions in minutes.',
    verified: false
  },
  {
    id: 'rev-9',
    name: 'Oliver Hughes',
    location: 'Sydney, Australia',
    country: 'Australia',
    countryFlag: '🇦🇺',
    service: 'Proposal Writing',
    date: 'May 22, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'MFS Growth crafted an executive business proposal for our Sydney agency. The structure, visual infographics, and clear value propositions helped us close a major client contract.',
    verified: false
  },
  {
    id: 'rev-10',
    name: 'Ahmad Razak',
    location: 'Kuala Lumpur, Malaysia',
    country: 'Malaysia',
    countryFlag: '🇲🇾',
    service: 'Presentation Design',
    date: 'May 15, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Great experience! The slides were modern, clean, and contained no clutter. Perfect color palette match for our corporate brand.',
    verified: false
  },
  {
    id: 'rev-11',
    name: 'Bilal Hassan',
    location: 'Karachi, Pakistan',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    service: 'Proposal Writing',
    date: 'May 08, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'The project proposal design was sleek and high quality. Paying via EasyPaisa was seamless and the receipt confirmation was instant.',
    verified: true,
    orderRef: 'ORD-410928'
  },
  {
    id: 'rev-12',
    name: 'Sophie Taylor',
    location: 'Manchester, UK',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    service: 'ATS Resume Engineering',
    date: 'April 29, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Transformed my outdated two-page CV into a crisp, ATS-compliant masterwork. Received interview calls within the first week of applying.',
    verified: false
  },
  {
    id: 'rev-13',
    name: 'Hamdan Abdullah',
    location: 'Abu Dhabi, UAE',
    country: 'UAE',
    countryFlag: '🇦🇪',
    service: 'Research Reports',
    date: 'April 22, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Professional case study analysis and document formatting. Very communicative support team on WhatsApp.',
    verified: false
  },
  {
    id: 'rev-14',
    name: 'Jessica Miller',
    location: 'New York, USA',
    country: 'United States',
    countryFlag: '🇺🇸',
    service: 'Presentation Design',
    date: 'April 14, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Converted our dense financial report into a gorgeous 15-slide executive presentation. High-contrast typography and subtle animations made it stand out.',
    verified: false
  },
  {
    id: 'rev-15',
    name: 'Usman Khan',
    location: 'Rawalpindi, Pakistan',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    service: 'Assignment Writing',
    date: 'April 05, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Exceptional assistance with my MBA managerial economics assignment. Zero plagiarism, perfectly cited references, and formatted as requested.',
    verified: true,
    orderRef: 'ORD-305192'
  },
  {
    id: 'rev-16',
    name: 'Noura Al-Otaibi',
    location: 'Jeddah, Saudi Arabia',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    service: 'CV Design & Cover Letter',
    date: 'March 28, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Clear layout, elegant formatting, and fast delivery. I am very satisfied with my new CV design.',
    verified: true
  },
  {
    id: 'rev-17',
    name: 'Lucas Schmidt',
    location: 'Berlin, Germany',
    country: 'Germany',
    countryFlag: '🇩🇪',
    service: 'Investor Pitch Decks',
    date: 'March 19, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'Highly methodical approach to startup slide design. They condensed 30 pages of technical documentation into an impactful 10-slide deck.',
    verified: true
  },
  {
    id: 'rev-18',
    name: 'Sarah Farooq',
    location: 'Peshawar, Pakistan',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    service: 'ATS Resume Engineering',
    date: 'March 10, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    avatarBg: '#1A1A1D',
    rating: 5,
    text: 'MFS Growth helped me transition into a senior role by tailoring my resume keywords for multinational job portals. Worth the investment!',
    verified: true
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What digital services does MFS Growth Agency offer?',
    answer: 'MFS Growth Agency provides executive presentation design (PowerPoint & pitch decks), custom academic assignment writing, ATS-compliant resume & CV engineering, cover letters, corporate report formatting, and custom infographics for students and professionals.'
  },
  {
    id: 'faq-2',
    question: 'What payment methods do you accept?',
    answer: 'We accept local and international payment proof submissions via EasyPaisa (03116191234), JazzCash (03015323688), and Askari Bank direct transfer. Simply upload your transaction screenshot during checkout for instant admin verification.'
  },
  {
    id: 'faq-3',
    question: 'Are academic assignments plagiarism-free and formatted with proper references?',
    answer: 'Yes, 100%. Every academic assignment is written and formatted from scratch according to your required referencing schema (APA 7th, Harvard, MLA, Chicago) and undergoes strict Turnitin originality verification.'
  },
  {
    id: 'faq-4',
    question: 'How fast can you complete express project orders?',
    answer: 'We offer Flexible (3-4 Days), Express (48 Hours), Priority (24 Hours), and Same-Day (12-24 Hours) turnaround schedules to accommodate urgent deadlines.'
  },
  {
    id: 'faq-5',
    question: 'Can I request revisions after project delivery?',
    answer: 'Yes, free revisions are supported if the delivered work requires minor adjustments to align with your original project submission instructions.'
  },
  {
    id: 'faq-6',
    question: 'How are completed files delivered to clients?',
    answer: 'Final project files (PPTX, DOCX, PDF) are delivered directly to your confidential Client Dashboard, where you can preview and download them securely 24/7.'
  },
  {
    id: 'faq-7',
    question: 'Is my personal information and project data confidential?',
    answer: 'All client guidelines, uploaded documents, and contact details are strictly encrypted and protected under our non-disclosure policy. We never share files or details with third parties.'
  }
];

export const CONTACT_CARDS: ContactCardItem[] = [
  {
    id: 'contact-1',
    title: 'Agency Email',
    value: 'mfsmedia.agency@gmail.com',
    link: 'mailto:mfsmedia.agency@gmail.com',
    iconName: 'mail'
  },
  {
    id: 'contact-3',
    title: 'Phone Number',
    value: '+92 301 5323689',
    link: 'tel:+923015323689',
    iconName: 'phone'
  },
  {
    id: 'contact-4',
    title: 'Business Hours',
    value: '24 Hours (Online Support)',
    iconName: 'clock'
  }
];
