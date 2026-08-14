import React, { useEffect } from 'react';
import { FAQS } from '../../data/content';

interface SEOProps {
  currentPage: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard' | 'admin' | 'notFound';
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
        'logo': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
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

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': graphElements
    };

    schemaScript.textContent = JSON.stringify(structuredData);
  }, [currentPage]);

  return null;
};
