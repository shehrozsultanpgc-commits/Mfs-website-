import React, { useEffect } from 'react';
import { FAQS } from '../../data/content';

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
    | 'guide-ats-resume'
    | 'guide-pitch-deck'
    | 'guide-academic-formatting'
    | 'guide-corporate-report'
    | 'notFound';
}

const PAGE_SEO_DATA: Record<string, {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  robots: string;
  pageName: string;
}> = {
  home: {
    title: 'MFS Growth Agency | Academic Assignments, Presentations & ATS Resumes in Pakistan',
    description: 'MFS Growth Agency is a digital services agency based in Pakistan offering custom academic assignment writing, executive presentation design, ATS resume engineering, and report formatting worldwide.',
    keywords: 'MFS Growth Agency, MFS Growth Agency Pakistan, assignment writing service Pakistan, presentation design service, ATS resume writing, CV design, corporate report writing, MFS Growth Online',
    canonical: 'https://mfsgrowth.online/',
    robots: 'index, follow',
    pageName: 'Home',
  },
  services: {
    title: 'Services — Presentation Design, Assignment Writing & ATS Resumes | MFS Growth Agency',
    description: 'Explore MFS Growth Agency digital services: executive presentation design, custom assignment writing, ATS resume engineering, and corporate reports with 50% Grand Launch discount.',
    keywords: 'assignment writing service, presentation design, ATS resume engineering, CV writing, corporate report writing, MFS Growth Agency services',
    canonical: 'https://mfsgrowth.online/services',
    robots: 'index, follow',
    pageName: 'Services',
  },
  pricing: {
    title: 'Pricing & Rates — 50% Grand Launch Discount | MFS Growth Agency',
    description: 'View transparent pricing for presentation design, assignment writing, ATS resumes, and reports. 50% Grand Launch discount active across PKR, USD, GBP, EUR, and AED.',
    keywords: 'MFS Growth Agency pricing, assignment writing cost, presentation design rate, ATS resume price, 50% discount offer',
    canonical: 'https://mfsgrowth.online/pricing',
    robots: 'index, follow',
    pageName: 'Pricing',
  },
  reviews: {
    title: 'Client Reviews & Verified Testimonials | MFS Growth Agency',
    description: 'Read verified client reviews and feedback for MFS Growth Agency from students, job seekers, and corporate professionals across Pakistan and internationally.',
    keywords: 'MFS Growth Agency reviews, MFS Growth client feedback, student reviews Pakistan, assignment writing feedback',
    canonical: 'https://mfsgrowth.online/reviews',
    robots: 'index, follow',
    pageName: 'Reviews',
  },
  about: {
    title: 'About Us — MFS Growth Agency Pakistan',
    description: 'Learn about MFS Growth Agency, a leading digital services agency in Pakistan dedicated to assisting students and professionals with presentations, assignments, and ATS resumes.',
    keywords: 'About MFS Growth Agency, MFS Growth Agency Pakistan, digital services team, academic writing team, presentation designers',
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
  'guide-ats-resume': {
    title: 'ATS Resume Engineering Master Guide: How to Pass Recruiter Filters | MFS Growth',
    description: 'Learn how Applicant Tracking Systems (ATS) parse resumes. Discover single-column formatting rules, keyword optimization, and common layout mistakes to improve ATS readability and recruiter visibility.',
    keywords: 'ATS resume formatting guide, ATS resume template, how ATS scanners work, single column resume ATS, CV vs resume ATS, ATS resume engineering, applicant tracking system resume, ATS-friendly resume',
    canonical: 'https://mfsgrowth.online/guides/ats-resume-engineering',
    robots: 'index, follow',
    pageName: 'ATS Resume Engineering Master Guide',
  },
  'guide-pitch-deck': {
    title: 'Executive Pitch Deck Structure Guide: The Essential 10-Slide Framework | MFS Growth',
    description: 'Master the essential investor pitch deck structure. Learn slide sequencing, narrative flow, data visualization principles, and executive presentation rules for startup fundraising and professional meetings.',
    keywords: 'investor pitch deck structure, 10 slide pitch deck, executive presentation design, pitch deck slide sequence, startup pitch deck structure, investor presentation, pitch deck framework, executive pitch deck',
    canonical: 'https://mfsgrowth.online/guides/executive-pitch-deck-structure',
    robots: 'index, follow',
    pageName: 'Executive Pitch Deck Structure Guide',
  },
  'guide-academic-formatting': {
    title: 'Academic Formatting & Citation Standards Guide: APA 7, Harvard & MLA | MFS Growth',
    description: 'Complete guide to academic formatting and citation standards. Learn APA 7th edition, Harvard, MLA, IEEE and Oxford referencing principles, literature review structure, and common citation mistakes.',
    keywords: 'academic citation and formatting guide, APA 7th edition formatting, Harvard referencing guide, MLA citation rules, IEEE citation guide, Oxford referencing, literature review structure, academic formatting guide',
    canonical: 'https://mfsgrowth.online/guides/academic-formatting-citation',
    robots: 'index, follow',
    pageName: 'Academic Formatting & Citation Standards Guide',
  },
  'guide-corporate-report': {
    title: 'Corporate Report Formatting Standards Guide: Professional Structure & Layout | MFS Growth',
    description: 'Learn professional corporate report formatting standards, including report structure, typography, page layout, tables, charts, executive summaries, and quality-control rules.',
    keywords: 'corporate report formatting standards, corporate report formatting guide, business report formatting, professional report layout, executive report structure, corporate document formatting, professional report design, business report structure',
    canonical: 'https://mfsgrowth.online/guides/corporate-report-formatting-standards',
    robots: 'index, follow',
    pageName: 'Corporate Report Formatting Standards Guide',
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

    // 5. OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', seo.canonical);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'MFS Growth Agency');

    // 6. Twitter Card Tags
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);

    // 7. Canonical URL Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', seo.canonical);

    // 8. Dynamic JSON-LD Structured Data Graph
    let schemaScript = document.querySelector('#mfs-jsonld-schema') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'mfs-jsonld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const graphElements: any[] = [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://mfsgrowth.online/#organization',
        'name': 'MFS Growth Agency',
        'alternateName': ['MFS Growth Agency Pakistan', 'MFS Growth Online'],
        'url': 'https://mfsgrowth.online/',
        'logo': 'https://mfsgrowth.online/android-chrome-512x512.png',
        'description': 'MFS Growth Agency provides executive presentation design, custom academic assignment writing, ATS resume engineering, and corporate report formatting for students and professionals in Pakistan and globally.',
        'telephone': '+923015323689',
        'email': 'mfsmedia.agency@gmail.com',
        'priceRange': '$$',
        'paymentAccepted': 'EasyPaisa, JazzCash, Bank Transfer',
        'sameAs': [
          'https://www.instagram.com/mfsgrowth',
          'https://www.facebook.com/MFSGrowth'
        ],
        'areaServed': [
          { '@type': 'Country', 'name': 'Pakistan' },
          { '@type': 'Country', 'name': 'United States' },
          { '@type': 'Country', 'name': 'United Kingdom' },
          { '@type': 'Country', 'name': 'United Arab Emirates' },
          { '@type': 'Country', 'name': 'Saudi Arabia' }
        ],
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '00:00',
          'closes': '23:59'
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'MFS Growth Digital Services Catalog',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Presentation Design',
                'description': 'Executive pitch decks and academic slide presentations with custom visual design and data charts.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Assignment Writing & Academic Assistance',
                'description': 'Custom academic assignments, case studies, and research writing with APA, Harvard, and MLA references.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'ATS Resume & CV Engineering',
                'description': 'ATS-compliant resume engineering, CV design, cover letters, and LinkedIn optimization.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Corporate Document Formatting',
                'description': 'Executive and corporate document formatting, business proposals, financial briefs, and whitepapers.'
              }
            }
          ]
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://mfsgrowth.online/#website',
        'url': 'https://mfsgrowth.online/',
        'name': 'MFS Growth Agency',
        'publisher': {
          '@id': 'https://mfsgrowth.online/#organization'
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
          ...(currentPage !== 'home' ? [{
            '@type': 'ListItem',
            'position': 2,
            'name': seo.pageName,
            'item': seo.canonical
          }] : [])
        ]
      }
    ];

    // Append FAQPage Schema if on FAQ page
    if (currentPage === 'faq') {
      graphElements.push({
        '@type': 'FAQPage',
        '@id': 'https://mfsgrowth.online/faq#faqpage',
        'mainEntity': FAQS.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      });
    }

    // Append Article Schema for Guide routes
    if (currentPage === 'guide-ats-resume') {
      graphElements.push({
        '@type': 'Article',
        '@id': 'https://mfsgrowth.online/guides/ats-resume-engineering#article',
        'headline': 'ATS Resume Engineering Master Guide: How Applicant Tracking Systems Parse Your Resume',
        'description': 'Learn how Applicant Tracking Systems (ATS) parse resumes, including single-column formatting, keyword optimization, and ATS readability principles.',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/guides/ats-resume-engineering'
        },
        'author': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'publisher': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'inLanguage': 'en-US'
      });
    } else if (currentPage === 'guide-pitch-deck') {
      graphElements.push({
        '@type': 'Article',
        '@id': 'https://mfsgrowth.online/guides/executive-pitch-deck-structure#article',
        'headline': 'Executive Pitch Deck Structure Guide: The Essential 10-Slide Framework for Investors',
        'description': 'Learn the essential investor pitch deck sequence, narrative structure, visual hierarchy, and data presentation principles.',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/guides/executive-pitch-deck-structure'
        },
        'author': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'publisher': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'inLanguage': 'en-US'
      });
    } else if (currentPage === 'guide-academic-formatting') {
      graphElements.push({
        '@type': 'Article',
        '@id': 'https://mfsgrowth.online/guides/academic-formatting-citation#article',
        'headline': 'Academic Formatting & Citation Standards Guide: APA 7, Harvard, MLA & IEEE',
        'description': 'Learn academic formatting and citation principles across APA 7, Harvard, MLA, IEEE and Oxford referencing systems.',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://mfsgrowth.online/guides/academic-formatting-citation'
        },
        'author': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'publisher': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'inLanguage': 'en-US'
      });
    } else if (currentPage === 'guide-corporate-report') {
      graphElements.push({
        '@type': 'Article',
        '@id': 'https://mfsgrowth.online/guides/corporate-report-formatting-standards#article',
        'headline': 'Corporate Report Formatting Standards Guide: Professional Structure, Layout & Presentation Rules',
        'description': 'Learn professional corporate report formatting standards, including report structure, typography, page layout, tables, charts, executive summaries, and quality-control rules.',
        'mainEntityOfPage': 'https://mfsgrowth.online/guides/corporate-report-formatting-standards',
        'author': {
          '@type': 'Organization',
          'name': 'MFS Growth Agency',
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'publisher': {
          '@id': 'https://mfsgrowth.online/#organization'
        },
        'inLanguage': 'en-US'
      });
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': graphElements
    };

    schemaScript.textContent = JSON.stringify(structuredData);
  }, [currentPage]);

  return null;
};
