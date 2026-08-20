import React, { useEffect } from 'react';
import { COMPREHENSIVE_FAQS } from '../../data/faqData';
import { REVIEWS } from '../../data/content';
import { BRAND_VISUAL_ASSETS } from '../../data/brandAssets';

interface SEOProps {
  currentPage:
    | 'home'
    | 'services'
    | 'pricing'
    | 'reviews'
    | 'about'
    | 'contact'
    | 'faq'
    | 'order'
    | 'payment'
    | 'confirmation'
    | 'dashboard'
    | 'admin'
    | 'privacy'
    | 'terms'
    | 'refund-policy'
    | 'refundpolicy'
    | 'hub-presentation'
    | 'hub-assignment'
    | 'hub-resume'
    | 'hub-formatting'
    | 'guides'
    | 'guide-ats-resume'
    | 'guide-pitch-deck'
    | 'guide-academic-formatting'
    | 'guide-corporate-report'
    | 'tools'
    | 'tool-ats-scanner'
    | 'tool-pitch-deck'
    | 'tool-citation-gen'
    | 'tool-doc-estimator'
    | 'case-studies'
    | 'referrals'
    | 'review-canvas'
    | 'brand-assets'
    | 'notFound';
}

const PAGE_SEO_DATA: Record<string, {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  robots: string;
  pageName: string;
  parentRoute?: { name: string; url: string };
  ogImage?: string;
}> = {
  home: {
    title: 'MFS Growth Agency | Presentation Design, Academic Assignments & ATS Resumes in Pakistan',
    description: 'MFS Growth Agency provides executive presentation design, custom academic assignment writing, ATS resume engineering, CV writing, and corporate report formatting in Pakistan & worldwide.',
    keywords: 'MFS Growth Agency, MFS Growth, MFS Growth Pakistan, Muhammad Shehroz Sultan, presentation design, presentation design services, assignment writing, assignment writing service Pakistan, ATS resume, ATS resume engineering, CV writing, report formatting, infographics design',
    canonical: 'https://mfsgrowth.online/',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    pageName: 'Home',
  },
  services: {
    title: 'Digital Services — Presentation Design, Assignment Writing & ATS Resumes | MFS Growth Agency',
    description: 'Explore digital services by MFS Growth Agency: pitch deck presentation design, academic assignments (APA/Harvard/MLA), ATS resume engineering, CV design, and corporate reports with 50% Grand Launch discount.',
    keywords: 'MFS Growth Agency services, presentation design, pitch deck design, assignment writing service, ATS resume engineering, CV design, corporate report writing, cover letter writing, document formatting Pakistan',
    canonical: 'https://mfsgrowth.online/services',
    robots: 'index, follow',
    pageName: 'Services',
  },
  pricing: {
    title: 'Pricing & Rates — 50% Grand Launch Offer | MFS Growth Agency',
    description: 'Transparent pricing calculator for presentation design, assignment writing, ATS resumes, CV design, and business reports. 50% Grand Launch discount active across PKR, USD, GBP, EUR, and AED.',
    keywords: 'MFS Growth Agency pricing, presentation design rates, assignment writing cost Pakistan, ATS resume price, CV writing rates, report formatting fees',
    canonical: 'https://mfsgrowth.online/pricing',
    robots: 'index, follow',
    pageName: 'Pricing',
  },
  reviews: {
    title: 'Client Reviews & Verified Testimonials | MFS Growth Agency',
    description: 'Read verified client reviews and feedback for MFS Growth Agency from students, job seekers, and corporate professionals across Pakistan and internationally.',
    keywords: 'MFS Growth Agency reviews, MFS Growth client feedback, student reviews Pakistan, assignment writing feedback, presentation design reviews',
    canonical: 'https://mfsgrowth.online/reviews',
    robots: 'index, follow',
    pageName: 'Reviews',
  },
  about: {
    title: 'About Us — Muhammad Shehroz Sultan & MFS Growth Agency Pakistan',
    description: 'Learn about MFS Growth Agency, founded by Muhammad Shehroz Sultan. Premium digital services agency in Islamabad, Pakistan offering presentation design, academic writing, and ATS resume engineering.',
    keywords: 'About MFS Growth Agency, Muhammad Shehroz Sultan, Muhammad Shahroz Sultan, Shehroz Sultan MFS Growth, MFS Growth Agency Pakistan, digital services agency Islamabad',
    canonical: 'https://mfsgrowth.online/about',
    robots: 'index, follow',
    pageName: 'About Us',
  },
  contact: {
    title: 'Contact Us — 24/7 Support & WhatsApp | MFS Growth Agency',
    description: 'Contact MFS Growth Agency for presentation design, assignment writing, or resume assistance. 24/7 support via WhatsApp (+92 301 5323689) and email.',
    keywords: 'Contact MFS Growth Agency, MFS Growth Agency WhatsApp, MFS Growth email, customer support Pakistan',
    canonical: 'https://mfsgrowth.online/contact',
    robots: 'index, follow',
    pageName: 'Contact Us',
  },
  faq: {
    title: 'Frequently Asked Questions (FAQ) | MFS Growth Agency',
    description: 'Find answers to common questions about MFS Growth Agency services, turnaround speeds (24-48 hours), EasyPaisa / JazzCash payments, and plagiarism guarantees.',
    keywords: 'MFS Growth Agency FAQ, EasyPaisa payment, JazzCash payment, turnaround time, revision policy',
    canonical: 'https://mfsgrowth.online/faq',
    robots: 'index, follow',
    pageName: 'Frequently Asked Questions',
  },
  order: {
    title: 'Order Now — Presentations, Assignments & ATS Resumes | MFS Growth Agency',
    description: 'Place your order online with MFS Growth Agency. Choose your service, select delivery speed, calculate 50% discount rates, and upload project guidelines securely.',
    keywords: 'order assignment online, order presentation design, order ATS resume, MFS Growth Agency order',
    canonical: 'https://mfsgrowth.online/order',
    robots: 'index, follow',
    pageName: 'Order Online',
  },
  privacy: {
    title: 'Privacy Policy | MFS Growth Agency',
    description: 'Read the MFS Growth Agency privacy policy covering customer information, project files, payment information, communications, and data security.',
    keywords: 'MFS Growth Agency privacy policy, data security, client confidentiality, project file protection',
    canonical: 'https://mfsgrowth.online/privacy',
    robots: 'index, follow',
    pageName: 'Privacy Policy',
  },
  terms: {
    title: 'Terms of Service | MFS Growth Agency',
    description: 'Review the MFS Growth Agency terms of service covering orders, payments, services, revisions, delivery, responsibilities, and service policies.',
    keywords: 'MFS Growth Agency terms of service, service agreement, revision policy, payment terms',
    canonical: 'https://mfsgrowth.online/terms',
    robots: 'index, follow',
    pageName: 'Terms of Service',
  },
  'refund-policy': {
    title: 'Refund & Cancellation Policy | MFS Growth Agency',
    description: 'Review MFS Growth Agency refund, cancellation, revision, payment, and service dispute policies.',
    keywords: 'MFS Growth Agency refund policy, cancellation policy, revision guarantee, order refund',
    canonical: 'https://mfsgrowth.online/refund-policy',
    robots: 'index, follow',
    pageName: 'Refund Policy',
  },
  refundpolicy: {
    title: 'Refund & Cancellation Policy | MFS Growth Agency',
    description: 'Review MFS Growth Agency refund, cancellation, revision, payment, and service dispute policies.',
    keywords: 'MFS Growth Agency refund policy, cancellation policy, revision guarantee, order refund',
    canonical: 'https://mfsgrowth.online/refund-policy',
    robots: 'index, follow',
    pageName: 'Refund Policy',
  },
  'hub-presentation': {
    title: 'Presentation Design & Pitch Deck Services | MFS Growth Agency',
    description: 'Executive presentation design, investor pitch decks, and academic slide design with custom charts, data visualization, and 24h delivery at 50% discount.',
    keywords: 'presentation design services, pitch deck design, academic presentation slides, investor pitch deck Pakistan, custom PPTX slides, slide deck redesign',
    canonical: 'https://mfsgrowth.online/services/presentation-design',
    robots: 'index, follow',
    pageName: 'Presentation Design Services',
    parentRoute: { name: 'Services', url: 'https://mfsgrowth.online/services' }
  },
  'hub-assignment': {
    title: 'Academic Assignment & Coursework Writing Services | MFS Growth Agency',
    description: '100% original academic assignment writing and coursework solutions formatted in APA 7, Harvard, MLA, and IEEE with verified literature citations and 50% Grand Launch rate.',
    keywords: 'assignment writing service, academic coursework writing, university assignment help Pakistan, APA referencing essay, Turnitin safe assignment',
    canonical: 'https://mfsgrowth.online/services/assignment-writing',
    robots: 'index, follow',
    pageName: 'Academic Assignment Writing',
    parentRoute: { name: 'Services', url: 'https://mfsgrowth.online/services' }
  },
  'hub-resume': {
    title: 'ATS Resume Engineering & Executive CV Design | MFS Growth Agency',
    description: 'Pass 95%+ of applicant tracking system filters with ATS resume engineering, executive CV design, and keyword-targeted cover letters delivered in 24h.',
    keywords: 'ATS resume writing, ATS resume engineering, executive CV design, cover letter writing Pakistan, LinkedIn profile optimization, Workday ATS resume',
    canonical: 'https://mfsgrowth.online/services/resume-cv-services',
    robots: 'index, follow',
    pageName: 'ATS Resume & CV Services',
    parentRoute: { name: 'Services', url: 'https://mfsgrowth.online/services' }
  },
  'hub-formatting': {
    title: 'Corporate Report & Document Formatting Services | MFS Growth Agency',
    description: 'Executive document formatting, corporate annual reports, business proposals, and case study solutions with automated TOC, heading styles, and 50% discount.',
    keywords: 'document formatting services, corporate report formatting, business proposal formatting, case study writing, Word document cleanup Pakistan',
    canonical: 'https://mfsgrowth.online/services/report-formatting',
    robots: 'index, follow',
    pageName: 'Report & Document Formatting',
    parentRoute: { name: 'Services', url: 'https://mfsgrowth.online/services' }
  },
  guides: {
    title: 'Knowledge & Resource Guides | MFS Growth Agency',
    description: 'Explore comprehensive, expert-reviewed master guides on ATS resume engineering, executive pitch decks, academic citation standards (APA, Harvard, MLA), and corporate report formatting.',
    keywords: 'MFS Growth guides, ATS resume guide, pitch deck framework, academic formatting standards, corporate report standards, professional career guides',
    canonical: 'https://mfsgrowth.online/guides',
    robots: 'index, follow',
    pageName: 'Knowledge & Resource Guides',
  },
  'guide-ats-resume': {
    title: 'ATS Resume Engineering Master Guide: How to Pass Recruiter Filters | MFS Growth',
    description: 'Learn how Applicant Tracking Systems (ATS) parse resumes. Discover single-column formatting rules, keyword optimization, and common layout mistakes to improve ATS readability and recruiter visibility.',
    keywords: 'ATS resume formatting guide, ATS resume template, how ATS scanners work, single column resume ATS, CV vs resume ATS, ATS resume engineering, applicant tracking system resume, ATS-friendly resume',
    canonical: 'https://mfsgrowth.online/guides/ats-resume-engineering',
    robots: 'index, follow',
    pageName: 'ATS Resume Engineering Master Guide',
    parentRoute: { name: 'Guides', url: 'https://mfsgrowth.online/guides' },
    ogImage: 'https://mfsgrowth.online/images/blog/ats-compliant-executive-resume-og.jpg',
  },
  'guide-pitch-deck': {
    title: 'Executive Pitch Deck Structure Guide: The Essential 10-Slide Framework | MFS Growth',
    description: 'Master the essential investor pitch deck structure. Learn slide sequencing, narrative flow, data visualization principles, and executive presentation rules for startup fundraising and professional meetings.',
    keywords: 'investor pitch deck structure, 10 slide pitch deck, executive presentation design, pitch deck slide sequence, startup pitch deck structure, investor presentation, pitch deck framework, executive pitch deck',
    canonical: 'https://mfsgrowth.online/guides/executive-pitch-deck-structure',
    robots: 'index, follow',
    pageName: 'Executive Pitch Deck Structure Guide',
    parentRoute: { name: 'Guides', url: 'https://mfsgrowth.online/guides' }
  },
  'guide-academic-formatting': {
    title: 'Academic Formatting & Citation Standards Guide: APA 7, Harvard & MLA | MFS Growth',
    description: 'Complete guide to academic formatting and citation standards. Learn APA 7th edition, Harvard, MLA, IEEE and Oxford referencing principles, literature review structure, and common citation mistakes.',
    keywords: 'academic citation and formatting guide, APA 7th edition formatting, Harvard referencing guide, MLA citation rules, IEEE citation guide, Oxford referencing, literature review structure, academic formatting guide',
    canonical: 'https://mfsgrowth.online/guides/academic-formatting-citation',
    robots: 'index, follow',
    pageName: 'Academic Formatting & Citation Standards Guide',
    parentRoute: { name: 'Guides', url: 'https://mfsgrowth.online/guides' }
  },
  'guide-corporate-report': {
    title: 'Corporate Report Formatting Standards Guide: Professional Structure & Layout | MFS Growth',
    description: 'Learn professional corporate report formatting standards, including report structure, typography, page layout, tables, charts, executive summaries, and quality-control rules.',
    keywords: 'corporate report formatting standards, corporate report formatting guide, business report formatting, professional report layout, executive report structure, corporate document formatting, professional report design, business report structure',
    canonical: 'https://mfsgrowth.online/guides/corporate-report-formatting-standards',
    robots: 'index, follow',
    pageName: 'Corporate Report Formatting Standards Guide',
    parentRoute: { name: 'Guides', url: 'https://mfsgrowth.online/guides' }
  },
  tools: {
    title: 'Free Interactive Tools & Lead Utilities | MFS Growth Agency',
    description: 'Free student & professional utilities: ATS resume scanner, pitch deck storyline architect, APA 7/Harvard citation generator, and document metric calculator.',
    keywords: 'free ATS resume scanner, pitch deck builder, APA citation generator, Harvard referencing tool, word count turnaround calculator, free academic tools',
    canonical: 'https://mfsgrowth.online/tools',
    robots: 'index, follow',
    pageName: 'Free Tools & Utilities',
  },
  'tool-ats-scanner': {
    title: 'Free ATS Resume Scanner & Keyword Matcher | MFS Growth Agency',
    description: 'Test your resume compatibility against recruiter ATS filters (Workday, Taleo, Greenhouse). Identify missing target keywords, action verbs, and structural errors.',
    keywords: 'free ATS resume scanner, ATS resume checker, resume keyword matcher, applicant tracking system test, resume score calculator, ATS optimizer',
    canonical: 'https://mfsgrowth.online/tools/ats-resume-scanner',
    robots: 'index, follow',
    pageName: 'ATS Resume Scanner Tool',
    parentRoute: { name: 'Tools', url: 'https://mfsgrowth.online/tools' }
  },
  'tool-pitch-deck': {
    title: 'Interactive Pitch Deck & Slide Storyline Architect | MFS Growth Agency',
    description: 'Generate slide-by-slide storyline outlines, psychological objectives, data requirements, and visual layout blueprints for investor pitch decks and sales proposals.',
    keywords: 'pitch deck builder, slide structure architect, investor pitch deck outline, 10 slide deck builder, sales proposal presentation outline',
    canonical: 'https://mfsgrowth.online/tools/pitch-deck-builder',
    robots: 'index, follow',
    pageName: 'Pitch Deck Architect Tool',
    parentRoute: { name: 'Tools', url: 'https://mfsgrowth.online/tools' }
  },
  'tool-citation-gen': {
    title: 'Academic Citation & Reference Formatter (APA 7, Harvard, MLA, IEEE) | MFS Growth',
    description: 'Instantly format peer-reviewed journal articles, books, and web reports into APA 7th, Harvard, MLA 9th, IEEE, and Chicago styles with paired in-text citations.',
    keywords: 'APA 7 citation generator, Harvard reference generator, MLA 9 citation tool, IEEE reference formatter, academic bibliography builder, in-text citation generator',
    canonical: 'https://mfsgrowth.online/tools/citation-generator',
    robots: 'index, follow',
    pageName: 'Citation Generator Tool',
    parentRoute: { name: 'Tools', url: 'https://mfsgrowth.online/tools' }
  },
  'tool-doc-estimator': {
    title: 'Document Metric & Turnaround Calculator | MFS Growth Agency',
    description: 'Calculate page counts (single/double spaced), reading duration, speech presentation timing, and dynamic project pricing across PKR, USD, GBP, EUR, and AED.',
    keywords: 'word count to pages calculator, reading time estimator, speech duration calculator, document turnaround speed, assignment price calculator',
    canonical: 'https://mfsgrowth.online/tools/document-estimator',
    robots: 'index, follow',
    pageName: 'Document Metric Estimator Tool',
    parentRoute: { name: 'Tools', url: 'https://mfsgrowth.online/tools' }
  },
  'case-studies': {
    title: 'Client Success Stories & Enterprise Case Studies | MFS Growth Agency',
    description: 'Explore verified client transformations: $1.4M seed pitch decks, 96% ATS resume passes, and distinction-grade academic dissertations with before/after breakdowns.',
    keywords: 'MFS case studies, presentation design portfolio, ATS resume before after, academic dissertation distinction, corporate ESG report case study',
    canonical: 'https://mfsgrowth.online/case-studies',
    robots: 'index, follow',
    pageName: 'Case Studies & Transformations',
  },
  referrals: {
    title: 'Client Growth & VIP Referral Rewards Hub | MFS Growth Agency',
    description: 'Refer peers to MFS Growth Agency and earn 15% wallet credit. Explore VIP loyalty tiers from Bronze to Diamond VIP Elite.',
    keywords: 'MFS referral program, earn student rewards, agency affiliate credit, VIP loyalty tiers',
    canonical: 'https://mfsgrowth.online/referrals',
    robots: 'index, follow',
    pageName: 'Referral & Loyalty Rewards',
  },
  'review-canvas': {
    title: 'Interactive Deliverable Review Canvas | MFS Growth Agency',
    description: 'Pinpoint visual annotations, review live slide decks and reports, approve master deliverables, and submit revision requests directly.',
    keywords: 'MFS review canvas, interactive deliverable approval, client revision portal',
    canonical: 'https://mfsgrowth.online/review-canvas',
    robots: 'noindex, nofollow',
    pageName: 'Interactive Review Canvas',
  },
  payment: {
    title: 'Secure Payment Submission | MFS Growth Agency',
    description: 'Complete your MFS Growth Agency order with local EasyPaisa, JazzCash, or Askari Bank manual transfer proof submission.',
    keywords: 'MFS payment gateway, EasyPaisa order payment, JazzCash order payment',
    canonical: 'https://mfsgrowth.online/payment',
    robots: 'noindex, nofollow',
    pageName: 'Payment Submission',
  },
  confirmation: {
    title: 'Order Confirmation & Tracking | MFS Growth Agency',
    description: 'Order receipt and confirmation details for MFS Growth Agency client project.',
    keywords: 'MFS order confirmation, order tracking',
    canonical: 'https://mfsgrowth.online/confirmation',
    robots: 'noindex, nofollow',
    pageName: 'Order Confirmation',
  },
  dashboard: {
    title: 'Client Dashboard | MFS Growth Agency',
    description: 'Manage active projects, submit revision requests, download completed files, and communicate with support.',
    keywords: 'MFS client portal, client project dashboard',
    canonical: 'https://mfsgrowth.online/dashboard',
    robots: 'noindex, nofollow',
    pageName: 'Client Dashboard',
  },
  admin: {
    title: 'Private Admin Headquarters | MFS Growth Agency',
    description: 'Internal MFS Growth Agency operations command center.',
    keywords: 'MFS admin portal',
    canonical: 'https://mfsgrowth.online/admin',
    robots: 'noindex, nofollow',
    pageName: 'Admin Portal',
  },
  'brand-assets': {
    title: 'Official Brand Cards & Google Image Media Hub | MFS Growth Agency',
    description: 'Explore official high-resolution vector brand cards for MFS Growth Agency, Founder Muhammad Shehroz Sultan, presentation design, academic assignments, and ATS resumes.',
    keywords: 'MFS Growth Agency brand images, Muhammad Shehroz Sultan images, growth agency logo, presentation design cards, assignment writing graphics, digital agency media kit',
    canonical: 'https://mfsgrowth.online/brand-assets',
    robots: 'index, follow, max-image-preview:large',
    pageName: 'Official Brand Assets',
    ogImage: 'https://mfsgrowth.online/images/brand-cards/mfs-growth-agency-official-brand-card.svg',
  },
  notFound: {
    title: 'Page Not Found (404) | MFS Growth Agency',
    description: 'The requested page could not be found on MFS Growth Agency. Return to our homepage to explore presentation design, assignment writing, and ATS resumes.',
    keywords: 'MFS Growth Agency 404, page not found',
    canonical: 'https://mfsgrowth.online/404',
    robots: 'noindex, nofollow',
    pageName: 'Page Not Found',
  },
};

export const SEOManager: React.FC<SEOProps> = ({ currentPage }) => {
  useEffect(() => {
    const seo = PAGE_SEO_DATA[currentPage] || PAGE_SEO_DATA.home;

    // 1. Update Document Title
    document.title = seo.title;

    // Helper to update or set meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Meta Description
    setMetaTag('meta[name="description"]', 'name', 'description', seo.description);

    // 3. Meta Keywords
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', seo.keywords);

    // 4. Meta Robots
    setMetaTag('meta[name="robots"]', 'name', 'robots', seo.robots);

    const ogImg = seo.ogImage || 'https://mfsgrowth.online/og-image.svg';

    // 5. OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', seo.canonical);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'MFS Growth Agency');
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', currentPage.startsWith('guide-') ? 'article' : 'website');
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImg);
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', 'MFS Growth Agency - Official Executive Digital Agency & Leadership');

    // 6. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImg);
    setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', 'MFS Growth Agency by Muhammad Shehroz Sultan');

    // 7. Canonical URL Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seo.canonical);

    // 8. Dynamic Nested JSON-LD Structured Data Graph 3.0
    let schemaScript = document.querySelector('#mfs-jsonld-schema') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'mfs-jsonld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    // Build verified customer reviews sub-schema
    const reviewItemsSchema = REVIEWS.slice(0, 6).map((rev) => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': rev.name,
      },
      'datePublished': '2026-07-20',
      'reviewBody': rev.text,
      'name': `${rev.service} Review by ${rev.name}`,
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': rev.rating.toString(),
        'bestRating': '5',
        'worstRating': '1'
      }
    }));

    // Interconnected Semantic Web Graph
    const graphElements: any[] = [
      {
        '@type': ['ProfessionalService', 'Organization', 'EducationalOrganization'],
        '@id': 'https://mfsgrowth.online/#organization',
        'name': 'MFS Growth Agency',
        'legalName': 'MFS Growth Agency',
        'alternateName': ['MFS Growth Agency Pakistan', 'MFS Growth Online', 'MFS Growth', 'MFS Agency'],
        'url': 'https://mfsgrowth.online/',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://mfsgrowth.online/android-chrome-512x512.png',
          'width': 512,
          'height': 512,
          'caption': 'MFS Growth Agency Official Gold Shield'
        },
        'image': {
          '@type': 'ImageObject',
          'url': 'https://mfsgrowth.online/og-image.svg',
          'width': 1200,
          'height': 630,
          'caption': 'MFS Growth Agency Official Brand Card & Founder Leadership'
        },
        'description': 'MFS Growth Agency provides executive presentation design, custom academic assignment writing, ATS resume engineering, CV writing, and corporate report formatting for students and professionals globally.',
        'disambiguatingDescription': 'MFS Growth Agency is an online digital services agency providing presentation design, academic writing assistance, ATS resume engineering, and report formatting. Operating 100% online as an early-stage digital startup, it is not affiliated with any financial investment management firm.',
        'telephone': '+923015323689',
        'email': 'mfsmedia.agency@gmail.com',
        'priceRange': '$$',
        'currenciesAccepted': 'PKR, USD, GBP, EUR, AED',
        'paymentAccepted': 'EasyPaisa, JazzCash, Bank Transfer, Credit Card',
        'sameAs': [
          'https://www.crunchbase.com/organization/mfs-growth-agency',
          'https://www.linkedin.com/company/mfsgrowth',
          'https://www.instagram.com/mfsgrowth?igsh=M2JwbWJ5M2txc2Z1',
          'https://www.facebook.com/share/1G4CCwakiW/',
          'https://clutch.co/profile/mfs-growth-agency',
          'https://www.trustpilot.com/review/mfsgrowth.online'
        ],
        'founder': {
          '@id': 'https://mfsgrowth.online/#founder'
        },
        'areaServed': [
          { '@type': 'Country', 'name': 'Pakistan' },
          { '@type': 'Country', 'name': 'United States' },
          { '@type': 'Country', 'name': 'United Kingdom' },
          { '@type': 'Country', 'name': 'United Arab Emirates' },
          { '@type': 'Country', 'name': 'Saudi Arabia' },
          { '@type': 'Country', 'name': 'Canada' },
          { '@type': 'Country', 'name': 'Australia' }
        ],
        'knowsLanguage': ['English', 'Urdu', 'Roman Urdu', 'Arabic'],
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '00:00',
          'closes': '23:59'
        },
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'telephone': '+923015323689',
            'contactType': 'customer support',
            'email': 'mfsmedia.agency@gmail.com',
            'availableLanguage': ['English', 'Urdu'],
            'contactOption': 'TollFree',
            'hoursAvailable': {
              '@type': 'OpeningHoursSpecification',
              'opens': '00:00',
              'closes': '23:59',
              'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            }
          }
        ],
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.98',
          'bestRating': '5',
          'worstRating': '1',
          'ratingCount': '284',
          'reviewCount': '284'
        },
        'review': reviewItemsSchema,
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'MFS Growth Digital Services Catalog',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                '@id': 'https://mfsgrowth.online/services/presentation-design#service',
                'name': 'Presentation Design & Pitch Decks',
                'description': 'Executive pitch decks and academic slide presentations with custom visual design, data charts, and 50% discount.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                '@id': 'https://mfsgrowth.online/services/assignment-writing#service',
                'name': 'Assignment Writing & Academic Assistance',
                'description': 'Custom academic assignments, case studies, and research writing with APA, Harvard, and MLA references.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                '@id': 'https://mfsgrowth.online/services/resume-cv-services#service',
                'name': 'ATS Resume & CV Engineering',
                'description': 'ATS-compliant resume engineering, CV design, cover letters, and LinkedIn optimization.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                '@id': 'https://mfsgrowth.online/services/report-formatting#service',
                'name': 'Corporate Document Formatting & Reports',
                'description': 'Executive and corporate document formatting, business proposals, financial briefs, and whitepapers.'
              }
            }
          ]
        }
      },
      {
        '@type': 'Person',
        '@id': 'https://mfsgrowth.online/#founder',
        'name': 'Muhammad Shehroz Sultan',
        'alternateName': ['Shahroz Sultan', 'Muhammad Shahroz Sultan', 'Shehroz Sultan'],
        'jobTitle': 'Founder & Executive Director',
        'description': 'Muhammad Shehroz Sultan is an entrepreneur, digital agency director, and specialist in executive presentation design, academic document formatting, ATS resume engineering, and corporate report design. He is the Founder & Lead Director of MFS Growth Agency.',
        'url': 'https://mfsgrowth.online/about',
        'image': {
          '@type': 'ImageObject',
          'url': 'https://mfsgrowth.online/android-chrome-512x512.png',
          'caption': 'Muhammad Shehroz Sultan - Founder & Executive Director of MFS Growth Agency'
        },
        'nationality': {
          '@type': 'Country',
          'name': 'Pakistan'
        },
        'knowsAbout': [
          'Executive Presentation Design',
          'Pitch Deck Architecture',
          'ATS Resume Engineering & Parser Optimization',
          'Academic Assignment Formatting (APA 7, Harvard, MLA, IEEE)',
          'Corporate Report Formatting & Financial Layouts',
          'Digital Agency Leadership & AI Operations'
        ],
        'sameAs': [
          'https://www.linkedin.com/in/muhammad-shehroz-sultan-1237543a9',
          'https://www.crunchbase.com/person/muhammad-shehroz-sultan',
          'https://www.instagram.com/mfsgrowth?igsh=M2JwbWJ5M2txc2Z1',
          'https://www.facebook.com/share/1G4CCwakiW/'
        ],
        'worksFor': {
          '@type': 'Organization',
          'name': 'MFS Growth Agency',
          '@id': 'https://mfsgrowth.online/#organization',
          'url': 'https://mfsgrowth.online/'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://mfsgrowth.online/#website',
        'url': 'https://mfsgrowth.online/',
        'name': 'MFS Growth Agency',
        'publisher': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'inLanguage': 'en-US',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://mfsgrowth.online/?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${seo.canonical}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://mfsgrowth.online/'
          },
          ...(seo.parentRoute ? [{
            '@type': 'ListItem',
            'position': 2,
            'name': seo.parentRoute.name,
            'item': seo.parentRoute.url
          }, {
            '@type': 'ListItem',
            'position': 3,
            'name': seo.pageName,
            'item': seo.canonical
          }] : currentPage !== 'home' ? [{
            '@type': 'ListItem',
            'position': 2,
            'name': seo.pageName,
            'item': seo.canonical
          }] : [])
        ]
      }
    ];

    // Page-Specific Graph Nodes
    if (currentPage === 'home') {
      graphElements.push({
        '@type': 'WebPage',
        '@id': 'https://mfsgrowth.online/#webpage',
        'url': 'https://mfsgrowth.online/',
        'name': 'MFS Growth Agency | Academic Assignments, Presentations & ATS Resumes in Pakistan',
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'about': { '@id': 'https://mfsgrowth.online/#organization' },
        'primaryImageOfPage': 'https://mfsgrowth.online/android-chrome-512x512.png'
      });
    } else if (currentPage === 'services') {
      graphElements.push(
        {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/services#webpage',
          'url': 'https://mfsgrowth.online/services',
          'name': 'Digital Services — Presentation Design, Assignment Writing & ATS Resumes',
          'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
          'about': { '@id': 'https://mfsgrowth.online/#organization' }
        },
        {
          '@type': 'Service',
          '@id': 'https://mfsgrowth.online/services#presentation',
          'name': 'Executive Presentation Design & Pitch Decks',
          'description': 'Executive pitch decks and academic slide presentations engineered with modern visual structures, custom layouts, and compelling data graphics.',
          'provider': { '@id': 'https://mfsgrowth.online/#organization' },
          'serviceType': 'Presentation Design',
          'offers': {
            '@type': 'Offer',
            'price': '1250',
            'priceCurrency': 'PKR',
            'priceValidUntil': '2026-12-31',
            'availability': 'https://schema.org/InStock'
          }
        },
        {
          '@type': 'Service',
          '@id': 'https://mfsgrowth.online/services#assignment',
          'name': 'Academic Assignment Writing & Referencing',
          'description': 'Custom academic assignments, case studies, and research writing with APA, Harvard, MLA, and IEEE references.',
          'provider': { '@id': 'https://mfsgrowth.online/#organization' },
          'serviceType': 'Academic Writing Assistance',
          'offers': {
            '@type': 'Offer',
            'price': '1000',
            'priceCurrency': 'PKR',
            'priceValidUntil': '2026-12-31',
            'availability': 'https://schema.org/InStock'
          }
        },
        {
          '@type': 'Service',
          '@id': 'https://mfsgrowth.online/services#resume',
          'name': 'ATS Resume & CV Engineering',
          'description': 'ATS-compliant resume engineering, CV design, cover letters, and LinkedIn profile optimization.',
          'provider': { '@id': 'https://mfsgrowth.online/#organization' },
          'serviceType': 'Resume & Career Engineering',
          'offers': {
            '@type': 'Offer',
            'price': '1500',
            'priceCurrency': 'PKR',
            'priceValidUntil': '2026-12-31',
            'availability': 'https://schema.org/InStock'
          }
        },
        {
          '@type': 'Service',
          '@id': 'https://mfsgrowth.online/services#reports',
          'name': 'Corporate Document Formatting & Layout',
          'description': 'Executive and corporate document formatting, business proposals, financial briefs, and whitepapers.',
          'provider': { '@id': 'https://mfsgrowth.online/#organization' },
          'serviceType': 'Document Formatting',
          'offers': {
            '@type': 'Offer',
            'price': '1500',
            'priceCurrency': 'PKR',
            'priceValidUntil': '2026-12-31',
            'availability': 'https://schema.org/InStock'
          }
        }
      );
    } else if (currentPage === 'about') {
      graphElements.push({
        '@type': 'AboutPage',
        '@id': 'https://mfsgrowth.online/about#webpage',
        'url': 'https://mfsgrowth.online/about',
        'name': 'About Us — MFS Growth Agency Pakistan',
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'about': { '@id': 'https://mfsgrowth.online/#organization' },
        'author': { '@id': 'https://mfsgrowth.online/#founder' }
      });
    } else if (currentPage === 'contact') {
      graphElements.push({
        '@type': 'ContactPage',
        '@id': 'https://mfsgrowth.online/contact#webpage',
        'url': 'https://mfsgrowth.online/contact',
        'name': 'Contact Us — 24/7 Support & WhatsApp | MFS Growth Agency',
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'mainEntity': { '@id': 'https://mfsgrowth.online/#organization' }
      });
    } else if (currentPage === 'pricing') {
      graphElements.push({
        '@type': 'WebPage',
        '@id': 'https://mfsgrowth.online/pricing#webpage',
        'url': 'https://mfsgrowth.online/pricing',
        'name': 'Pricing & Rates — 50% Grand Launch Discount | MFS Growth Agency',
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'mainEntity': { '@id': 'https://mfsgrowth.online/#organization' }
      });
    } else if (currentPage === 'reviews') {
      graphElements.push({
        '@type': 'ItemPage',
        '@id': 'https://mfsgrowth.online/reviews#webpage',
        'url': 'https://mfsgrowth.online/reviews',
        'name': 'Client Reviews & Verified Testimonials | MFS Growth Agency',
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'itemReviewed': { '@id': 'https://mfsgrowth.online/#organization' }
      });
    } else if (currentPage === 'faq') {
      graphElements.push({
        '@type': 'FAQPage',
        '@id': 'https://mfsgrowth.online/faq#faqpage',
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'publisher': { '@id': 'https://mfsgrowth.online/#organization' },
        'mainEntity': COMPREHENSIVE_FAQS.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      });
    } else if (currentPage === 'guides') {
      graphElements.push({
        '@type': 'CollectionPage',
        '@id': 'https://mfsgrowth.online/guides#webpage',
        'url': 'https://mfsgrowth.online/guides',
        'name': 'Knowledge & Resource Guides | MFS Growth Agency',
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'publisher': { '@id': 'https://mfsgrowth.online/#organization' },
        'author': { '@id': 'https://mfsgrowth.online/#founder' }
      });
    } else if (currentPage === 'guide-ats-resume') {
      graphElements.push({
        '@type': 'TechArticle',
        '@id': 'https://mfsgrowth.online/guides/ats-resume-engineering#article',
        'headline': 'ATS Resume Engineering Master Guide: How Applicant Tracking Systems Parse Your Resume',
        'description': 'Learn how Applicant Tracking Systems (ATS) parse resumes, including single-column formatting, keyword optimization, and ATS readability principles.',
        'image': 'https://mfsgrowth.online/images/blog/ats-compliant-executive-resume-og.jpg',
        'datePublished': '2026-08-18T00:00:00+00:00',
        'dateModified': '2026-08-20T00:00:00+00:00',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/guides/ats-resume-engineering'
        },
        'author': {
          '@type': 'Person',
          'name': 'Muhammad Shehroz Sultan',
          '@id': 'https://mfsgrowth.online/#founder',
          'url': 'https://mfsgrowth.online/about'
        },
        'publisher': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'inLanguage': 'en-US'
      });
    } else if (currentPage === 'guide-pitch-deck') {
      graphElements.push({
        '@type': 'TechArticle',
        '@id': 'https://mfsgrowth.online/guides/executive-pitch-deck-structure#article',
        'headline': 'Executive Pitch Deck Structure Guide: The Essential 10-Slide Framework for Investors',
        'description': 'Learn the essential investor pitch deck sequence, narrative structure, visual hierarchy, and data presentation principles.',
        'image': 'https://mfsgrowth.online/android-chrome-512x512.png',
        'datePublished': '2026-08-18T00:00:00+00:00',
        'dateModified': '2026-08-20T00:00:00+00:00',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/guides/executive-pitch-deck-structure'
        },
        'author': {
          '@type': 'Person',
          'name': 'Muhammad Shehroz Sultan',
          '@id': 'https://mfsgrowth.online/#founder',
          'url': 'https://mfsgrowth.online/about'
        },
        'publisher': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'inLanguage': 'en-US'
      });
    } else if (currentPage === 'guide-academic-formatting') {
      graphElements.push({
        '@type': 'TechArticle',
        '@id': 'https://mfsgrowth.online/guides/academic-formatting-citation#article',
        'headline': 'Academic Formatting & Citation Standards Guide: APA 7, Harvard, MLA & IEEE',
        'description': 'Learn academic formatting and citation principles across APA 7, Harvard, MLA, IEEE and Oxford referencing systems.',
        'image': 'https://mfsgrowth.online/android-chrome-512x512.png',
        'datePublished': '2026-08-18T00:00:00+00:00',
        'dateModified': '2026-08-20T00:00:00+00:00',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/guides/academic-formatting-citation'
        },
        'author': {
          '@type': 'Person',
          'name': 'Muhammad Shehroz Sultan',
          '@id': 'https://mfsgrowth.online/#founder',
          'url': 'https://mfsgrowth.online/about'
        },
        'publisher': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'inLanguage': 'en-US'
      });
    } else if (currentPage === 'guide-corporate-report') {
      graphElements.push({
        '@type': 'TechArticle',
        '@id': 'https://mfsgrowth.online/guides/corporate-report-formatting-standards#article',
        'headline': 'Corporate Report Formatting Standards Guide: Professional Structure & Layout',
        'description': 'Learn professional corporate report formatting standards, including report structure, typography, page layout, tables, charts, and executive summaries.',
        'image': 'https://mfsgrowth.online/android-chrome-512x512.png',
        'datePublished': '2026-08-18T00:00:00+00:00',
        'dateModified': '2026-08-20T00:00:00+00:00',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/guides/corporate-report-formatting-standards'
        },
        'author': {
          '@type': 'Person',
          'name': 'Muhammad Shehroz Sultan',
          '@id': 'https://mfsgrowth.online/#founder',
          'url': 'https://mfsgrowth.online/about'
        },
        'publisher': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
        'inLanguage': 'en-US'
      });
    } else if (currentPage === 'hub-presentation') {
      graphElements.push(
        {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/services/presentation-design#webpage',
          'url': 'https://mfsgrowth.online/services/presentation-design',
          'name': 'Presentation Design & Pitch Deck Services | MFS Growth Agency',
          'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
          'about': { '@id': 'https://mfsgrowth.online/#organization' }
        },
        {
          '@type': 'Service',
          '@id': 'https://mfsgrowth.online/services/presentation-design#service',
          'name': 'Executive Presentation Design & Pitch Decks',
          'description': 'Executive pitch decks and academic slide presentations with custom visual design, data charts, and 50% discount.',
          'provider': { '@id': 'https://mfsgrowth.online/#organization' },
          'serviceType': 'Presentation Design',
          'offers': {
            '@type': 'Offer',
            'price': '1250',
            'priceCurrency': 'PKR',
            'priceValidUntil': '2026-12-31',
            'availability': 'https://schema.org/InStock'
          }
        }
      );
    } else if (currentPage === 'hub-assignment') {
      graphElements.push(
        {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/services/assignment-writing#webpage',
          'url': 'https://mfsgrowth.online/services/assignment-writing',
          'name': 'Academic Assignment Writing Services | MFS Growth Agency',
          'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
          'about': { '@id': 'https://mfsgrowth.online/#organization' }
        },
        {
          '@type': 'Service',
          '@id': 'https://mfsgrowth.online/services/assignment-writing#service',
          'name': 'Academic Assignment Writing & Coursework',
          'description': '100% original academic assignment writing with APA, Harvard, MLA, and IEEE references and Turnitin compatibility.',
          'provider': { '@id': 'https://mfsgrowth.online/#organization' },
          'serviceType': 'Academic Writing',
          'offers': {
            '@type': 'Offer',
            'price': '1000',
            'priceCurrency': 'PKR',
            'priceValidUntil': '2026-12-31',
            'availability': 'https://schema.org/InStock'
          }
        }
      );
    } else if (currentPage === 'hub-resume') {
      graphElements.push(
        {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/services/resume-cv-services#webpage',
          'url': 'https://mfsgrowth.online/services/resume-cv-services',
          'name': 'ATS Resume Engineering & Executive CV Design | MFS Growth Agency',
          'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
          'about': { '@id': 'https://mfsgrowth.online/#organization' }
        },
        {
          '@type': 'Service',
          '@id': 'https://mfsgrowth.online/services/resume-cv-services#service',
          'name': 'ATS Resume Engineering & Executive CV Design',
          'description': 'Applicant tracking system optimized resume engineering, executive CV design, and targeted cover letters.',
          'provider': { '@id': 'https://mfsgrowth.online/#organization' },
          'serviceType': 'Resume Writing',
          'offers': {
            '@type': 'Offer',
            'price': '1500',
            'priceCurrency': 'PKR',
            'priceValidUntil': '2026-12-31',
            'availability': 'https://schema.org/InStock'
          }
        }
      );
    } else if (currentPage === 'hub-formatting') {
      graphElements.push(
        {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/services/report-formatting#webpage',
          'url': 'https://mfsgrowth.online/services/report-formatting',
          'name': 'Corporate Report & Document Formatting Services | MFS Growth Agency',
          'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
          'about': { '@id': 'https://mfsgrowth.online/#organization' }
        },
        {
          '@type': 'Service',
          '@id': 'https://mfsgrowth.online/services/report-formatting#service',
          'name': 'Corporate Report & Document Formatting',
          'description': 'Executive document formatting, corporate annual reports, business proposals, and case study solutions.',
          'provider': { '@id': 'https://mfsgrowth.online/#organization' },
          'serviceType': 'Document Formatting',
          'offers': {
            '@type': 'Offer',
            'price': '800',
            'priceCurrency': 'PKR',
            'priceValidUntil': '2026-12-31',
            'availability': 'https://schema.org/InStock'
          }
        }
      );
    } else if (currentPage === 'case-studies') {
      graphElements.push(
        {
          '@type': 'CollectionPage',
          '@id': 'https://mfsgrowth.online/case-studies#webpage',
          'url': 'https://mfsgrowth.online/case-studies',
          'name': 'Client Success Stories & Enterprise Case Studies | MFS Growth Agency',
          'description': 'Verified transformations: $1.4M seed pitch decks, 96% ATS resume passes, and distinction-grade academic dissertations.',
          'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
          'publisher': { '@id': 'https://mfsgrowth.online/#organization' }
        }
      );
    } else if (currentPage === 'referrals') {
      graphElements.push(
        {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/referrals#webpage',
          'url': 'https://mfsgrowth.online/referrals',
          'name': 'Client Growth & VIP Referral Rewards Hub | MFS Growth Agency',
          'description': 'Earn 15% lifetime wallet credit on client referrals. VIP loyalty tiers from Bronze to Diamond VIP Elite.',
          'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
          'publisher': { '@id': 'https://mfsgrowth.online/#organization' }
        }
      );
    } else if (currentPage === 'tools') {
      graphElements.push(
        {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/tools#webpage',
          'url': 'https://mfsgrowth.online/tools',
          'name': 'Free Interactive Tools & Lead Utilities | MFS Growth Agency',
          'description': 'Free student and professional tools: ATS resume scanner, pitch deck builder, APA/Harvard citation generator, and turnaround calculator.',
          'isPartOf': { '@id': 'https://mfsgrowth.online/#website' }
        }
      );
    } else if (currentPage === 'tool-ats-scanner') {
      graphElements.push(
        {
          '@type': 'WebApplication',
          '@id': 'https://mfsgrowth.online/tools/ats-resume-scanner#app',
          'url': 'https://mfsgrowth.online/tools/ats-resume-scanner',
          'name': 'ATS Resume Scanner & Keyword Matcher',
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'browserRequirements': 'Requires JavaScript. Requires HTML5.',
          'description': 'Free client-side ATS resume scanner and job description keyword matcher.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'provider': { '@id': 'https://mfsgrowth.online/#organization' }
        }
      );
    } else if (currentPage === 'tool-pitch-deck') {
      graphElements.push(
        {
          '@type': 'WebApplication',
          '@id': 'https://mfsgrowth.online/tools/pitch-deck-builder#app',
          'url': 'https://mfsgrowth.online/tools/pitch-deck-builder',
          'name': 'Pitch Deck & Slide Storyline Architect',
          'applicationCategory': 'DesignApplication',
          'operatingSystem': 'All',
          'description': 'Interactive presentation storyline builder and slide layout blueprint architect.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'provider': { '@id': 'https://mfsgrowth.online/#organization' }
        }
      );
    } else if (currentPage === 'tool-citation-gen') {
      graphElements.push(
        {
          '@type': 'WebApplication',
          '@id': 'https://mfsgrowth.online/tools/citation-generator#app',
          'url': 'https://mfsgrowth.online/tools/citation-generator',
          'name': 'Academic Citation & Reference Generator',
          'applicationCategory': 'EducationalApplication',
          'operatingSystem': 'All',
          'description': 'Multi-style academic citation formatter supporting APA 7th, Harvard, MLA 9th, IEEE, and Chicago styles.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'provider': { '@id': 'https://mfsgrowth.online/#organization' }
        }
      );
    } else if (currentPage === 'tool-doc-estimator') {
      graphElements.push(
        {
          '@type': 'WebApplication',
          '@id': 'https://mfsgrowth.online/tools/document-estimator#app',
          'url': 'https://mfsgrowth.online/tools/document-estimator',
          'name': 'Document Metric & Turnaround Calculator',
          'applicationCategory': 'UtilitiesApplication',
          'operatingSystem': 'All',
          'description': 'Interactive document metric calculator for page count, reading time, and turnaround pricing.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'provider': { '@id': 'https://mfsgrowth.online/#organization' }
        }
      );
    } else if (currentPage === 'brand-assets') {
      graphElements.push(
        {
          '@type': 'ImageGallery',
          '@id': 'https://mfsgrowth.online/brand-assets#gallery',
          'url': 'https://mfsgrowth.online/brand-assets',
          'name': 'Official Brand Cards & Google Image Media Hub | MFS Growth Agency',
          'description': 'High-resolution vector brand assets and service thumbnails for MFS Growth Agency, directed by Muhammad Shehroz Sultan.',
          'isPartOf': { '@id': 'https://mfsgrowth.online/#website' },
          'author': { '@id': 'https://mfsgrowth.online/#founder' },
          'publisher': { '@id': 'https://mfsgrowth.online/#organization' },
          'image': BRAND_VISUAL_ASSETS.map((asset) => ({
            '@type': 'ImageObject',
            '@id': `https://mfsgrowth.online${asset.imageUrl}#image`,
            'url': `https://mfsgrowth.online${asset.imageUrl}`,
            'name': asset.title,
            'caption': asset.caption,
            'description': asset.description,
            'width': 1200,
            'height': 675,
            'author': {
              '@type': 'Person',
              'name': 'Muhammad Shehroz Sultan'
            },
            'copyrightHolder': {
              '@type': 'Organization',
              'name': 'MFS Growth Agency'
            }
          }))
        }
      );
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': graphElements
    };

    schemaScript.textContent = JSON.stringify(structuredData);
  }, [currentPage]);

  return null;
};
