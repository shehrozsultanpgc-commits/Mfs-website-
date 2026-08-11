import React, { useEffect } from 'react';

interface SEOProps {
  currentPage: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard' | 'admin';
}

const PAGE_SEO_DATA: Record<string, {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  robots: string;
  schemaType?: string;
}> = {
  home: {
    title: 'MFS Growth Agency | Assignment Writing, Presentation Design & ATS Resumes',
    description: 'MFS Growth Agency provides high-quality assignment writing, executive presentation design, ATS resume engineering, and corporate report formatting for students & professionals in Pakistan and worldwide.',
    keywords: 'MFS Growth Agency, assignment writing service, professional presentation design, PowerPoint presentation design, resume writing service, ATS resume service, CV writing service, professional report writing, custom academic documents, Pakistan digital agency',
    canonical: 'https://mfsgrowthpk.netlify.app/',
    robots: 'index, follow',
  },
  services: {
    title: 'Our Digital Services | Presentation Design, Assignment Writing & ATS Resumes - MFS Growth',
    description: 'Explore MFS Growth Agency services: custom presentation design, academic assignment writing, ATS-optimized CVs & resumes, corporate report formatting, and pitch decks with 50% Grand Launch discount.',
    keywords: 'assignment writing service, professional presentation design, PowerPoint presentation design, ATS resume service, CV writing service, corporate report writing, custom academic documents',
    canonical: 'https://mfsgrowthpk.netlify.app/#services',
    robots: 'index, follow',
  },
  pricing: {
    title: 'Transparent Pricing & 50% Grand Launch Discount | MFS Growth Agency',
    description: 'View transparent rates for presentation design, assignment writing, ATS resumes, and corporate reports. Automatic 50% Grand Launch discount applied across PKR, USD, GBP, EUR, and AED.',
    keywords: 'MFS Growth pricing, assignment writing cost, presentation design rate, ATS resume cost, 50% grand launch offer, PKR USD currency rates',
    canonical: 'https://mfsgrowthpk.netlify.app/#pricing',
    robots: 'index, follow',
  },
  reviews: {
    title: 'Verified Client Success Stories & Reviews | MFS Growth Agency',
    description: 'Read verified reviews from university students and working professionals who trust MFS Growth Agency for academic assignment assistance, slide decks, and career resume engineering.',
    keywords: 'MFS Growth reviews, client feedback, student reviews, assignment writing feedback, presentation design reviews, verified testimonials',
    canonical: 'https://mfsgrowthpk.netlify.app/#reviews',
    robots: 'index, follow',
  },
  about: {
    title: 'About MFS Growth Agency | Empowering Students & Professionals Globally',
    description: 'MFS Growth Agency is a premium online digital services brand dedicated to helping students and professionals grow through executive presentation design, assignment assistance, and career engineering.',
    keywords: 'About MFS Growth Agency, digital solutions, academic writing team, presentation designers, career resume engineers, MFS Growth Pakistan',
    canonical: 'https://mfsgrowthpk.netlify.app/#about',
    robots: 'index, follow',
  },
  contact: {
    title: 'Contact MFS Growth Agency | 24/7 Support & WhatsApp Assistance',
    description: 'Get in touch with MFS Growth Agency. 24/7 online support via WhatsApp (+92 301 5323689) and email (mfsmedia.agency@gmail.com). Instant AI Voice & Chat Assistant available.',
    keywords: 'Contact MFS Growth, MFS Growth WhatsApp, customer support, mfsmedia.agency@gmail.com, 24/7 online assistance',
    canonical: 'https://mfsgrowthpk.netlify.app/#contact',
    robots: 'index, follow',
  },
  faq: {
    title: 'Frequently Asked Questions | MFS Growth Agency',
    description: 'Answers to common questions about turnaround timelines (3-48 hours), payment methods (EasyPaisa, JazzCash, Bank Transfer), policy-backed revisions, plagiarism guarantees, and privacy.',
    keywords: 'MFS Growth FAQ, EasyPaisa payment, JazzCash payment, delivery timeline, revision guarantee, plagiarism policy',
    canonical: 'https://mfsgrowthpk.netlify.app/#faq',
    robots: 'index, follow',
  },
  order: {
    title: 'Order Custom Presentation, Assignment or ATS Resume | MFS Growth Agency',
    description: 'Submit your project guidelines to MFS Growth Agency. Calculate instant prices with 50% Grand Launch offer, select turnaround speed, and receive expert-crafted documents on time.',
    keywords: 'order assignment online, order presentation design, order ATS resume, MFS order form, custom project booking',
    canonical: 'https://mfsgrowthpk.netlify.app/#order',
    robots: 'index, follow',
  },
  payment: {
    title: 'Secure Payment Submission | MFS Growth Agency',
    description: 'Complete your MFS Growth Agency order with local EasyPaisa, JazzCash, or Askari Bank manual transfer proof submission.',
    keywords: 'MFS payment gateway, EasyPaisa order payment, JazzCash order payment',
    canonical: 'https://mfsgrowthpk.netlify.app/#payment',
    robots: 'noindex, nofollow',
  },
  confirmation: {
    title: 'Order Confirmation & Tracking | MFS Growth Agency',
    description: 'Order receipt and confirmation details for MFS Growth Agency client project.',
    keywords: 'MFS order confirmation, order tracking',
    canonical: 'https://mfsgrowthpk.netlify.app/#confirmation',
    robots: 'noindex, nofollow',
  },
  dashboard: {
    title: 'Client Dashboard | MFS Growth Agency',
    description: 'Manage active projects, submit revision requests, download completed files, and communicate with support.',
    keywords: 'MFS client portal, client project dashboard',
    canonical: 'https://mfsgrowthpk.netlify.app/#dashboard',
    robots: 'noindex, nofollow',
  },
  admin: {
    title: 'Private Admin Headquarters | MFS Growth Agency',
    description: 'Internal MFS Growth Agency operations command center.',
    keywords: 'MFS admin portal',
    canonical: 'https://mfsgrowthpk.netlify.app/#admin',
    robots: 'noindex, nofollow',
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

    // 8. Dynamic JSON-LD Structured Data
    let schemaScript = document.querySelector('#mfs-jsonld-schema') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'mfs-jsonld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfessionalService',
          '@id': 'https://mfsgrowthpk.netlify.app/#organization',
          'name': 'MFS Growth Agency',
          'alternateName': 'MFS Growth',
          'url': 'https://mfsgrowthpk.netlify.app',
          'logo': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
          'description': 'Helping Students & Professionals Grow with High-Quality Presentation Design, Assignment Writing, ATS Resumes, and Corporate Reports.',
          'telephone': '+923015323689',
          'email': 'mfsmedia.agency@gmail.com',
          'priceRange': '$$',
          'paymentAccepted': 'EasyPaisa, JazzCash, Bank Transfer',
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
                  'description': 'Executive pitch decks and academic slide presentations with custom visual design.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Assignment Writing',
                  'description': 'Custom academic assignments, case studies, and research writing with APA/Harvard/MLA references.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Resume & CV Writing',
                  'description': 'ATS-compliant resume engineering, CV formatting, and cover letters.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Report Formatting',
                  'description': 'Executive and corporate document formatting, financial briefs, and whitepapers.'
                }
              }
            ]
          }
        },
        {
          '@type': 'WebSite',
          '@id': 'https://mfsgrowthpk.netlify.app/#website',
          'url': 'https://mfsgrowthpk.netlify.app',
          'name': 'MFS Growth Agency',
          'publisher': {
            '@id': 'https://mfsgrowthpk.netlify.app/#organization'
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://mfsgrowthpk.netlify.app/#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://mfsgrowthpk.netlify.app/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': currentPage.toUpperCase(),
              'item': seo.canonical
            }
          ]
        }
      ]
    };

    schemaScript.textContent = JSON.stringify(structuredData);
  }, [currentPage]);

  return null;
};
