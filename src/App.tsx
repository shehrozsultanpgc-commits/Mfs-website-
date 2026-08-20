import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Currency, DeliverySpeed } from './types';
import { SEOManager } from './components/common/SEOManager';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { WhyUsSection } from './components/WhyUsSection';
import { PriceCalculator } from './components/PriceCalculator';
import { PortfolioSection } from './components/PortfolioSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { AuthModal } from './components/AuthModal';
import { useModalHistory } from './hooks/useModalHistory';
import { Toast } from './components/Toast';
import { AuthProvider } from './context/AuthContext';
import { RequireAdmin, RequireClient } from './components/AuthGuards';
import { AdminGuard } from './components/admin/AdminGuard';

// Lazy-loaded secondary pages & widgets for optimal LCP, TTI & bundle size
const ServicesPage = React.lazy(() => import('./components/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PricingPage = React.lazy(() => import('./components/PricingPage').then(m => ({ default: m.PricingPage })));
const ReviewsPage = React.lazy(() => import('./components/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const AboutPage = React.lazy(() => import('./components/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = React.lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const FaqPage = React.lazy(() => import('./components/FaqPage').then(m => ({ default: m.FaqPage })));
const OrderPage = React.lazy(() => import('./components/OrderPage').then(m => ({ default: m.OrderPage })));
const PaymentPage = React.lazy(() => import('./components/PaymentPage').then(m => ({ default: m.PaymentPage })));
const OrderConfirmationPage = React.lazy(() => import('./components/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage })));
const ClientDashboard = React.lazy(() => import('./components/ClientDashboard').then(m => ({ default: m.ClientDashboard })));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const PrivacyPolicyPage = React.lazy(() => import('./components/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = React.lazy(() => import('./components/TermsOfServicePage').then(m => ({ default: m.TermsOfServicePage })));
const RefundPolicyPage = React.lazy(() => import('./components/RefundPolicyPage').then(m => ({ default: m.RefundPolicyPage })));
const AtsResumeGuidePage = React.lazy(() => import('./components/guides/AtsResumeGuidePage'));
const PitchDeckGuidePage = React.lazy(() => import('./components/guides/PitchDeckGuidePage'));
const AcademicFormattingGuidePage = React.lazy(() => import('./components/guides/AcademicFormattingGuidePage'));
const CorporateReportGuidePage = React.lazy(() => import('./components/guides/CorporateReportGuidePage'));
const GuidesIndexPage = React.lazy(() => import('./components/guides/GuidesIndexPage'));
const PresentationDesignHub = React.lazy(() => import('./components/hubs/PresentationDesignHub').then(m => ({ default: m.PresentationDesignHub })));
const AssignmentWritingHub = React.lazy(() => import('./components/hubs/AssignmentWritingHub').then(m => ({ default: m.AssignmentWritingHub })));
const ResumeCvHub = React.lazy(() => import('./components/hubs/ResumeCvHub').then(m => ({ default: m.ResumeCvHub })));
const ReportFormattingHub = React.lazy(() => import('./components/hubs/ReportFormattingHub').then(m => ({ default: m.ReportFormattingHub })));
const ToolsIndexPage = React.lazy(() => import('./components/tools/ToolsIndexPage').then(m => ({ default: m.ToolsIndexPage })));
const AtsResumeScannerTool = React.lazy(() => import('./components/tools/AtsResumeScannerTool').then(m => ({ default: m.AtsResumeScannerTool })));
const PitchDeckBuilderTool = React.lazy(() => import('./components/tools/PitchDeckBuilderTool').then(m => ({ default: m.PitchDeckBuilderTool })));
const CitationGeneratorTool = React.lazy(() => import('./components/tools/CitationGeneratorTool').then(m => ({ default: m.CitationGeneratorTool })));
const DocumentEstimatorTool = React.lazy(() => import('./components/tools/DocumentEstimatorTool').then(m => ({ default: m.DocumentEstimatorTool })));
const CaseStudiesPage = React.lazy(() => import('./components/growth/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const ClientReferralRewardsHub = React.lazy(() => import('./components/growth/ClientReferralRewardsHub').then(m => ({ default: m.ClientReferralRewardsHub })));
const ProjectInteractiveReviewCanvas = React.lazy(() => import('./components/growth/ProjectInteractiveReviewCanvas').then(m => ({ default: m.ProjectInteractiveReviewCanvas })));
const BrandMediaAssetsPage = React.lazy(() => import('./components/BrandMediaAssetsPage').then(m => ({ default: m.BrandMediaAssetsPage })));
const AIAssistantWidget = React.lazy(() => import('./components/ai/AIAssistantWidget').then(m => ({ default: m.AIAssistantWidget })));

const PageSkeleton = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-4 bg-[#050507]">
    <div className="w-10 h-10 rounded-full border-2 border-[#E5C158] border-t-transparent animate-spin mb-4" />
    <div className="h-4 w-40 bg-white/10 rounded animate-pulse" />
  </div>
);

type PageType =
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

const VALID_PAGES: PageType[] = [
  'home',
  'services',
  'pricing',
  'reviews',
  'about',
  'contact',
  'faq',
  'order',
  'payment',
  'confirmation',
  'dashboard',
  'admin',
  'privacy',
  'terms',
  'refund-policy',
  'refundpolicy',
  'hub-presentation',
  'hub-assignment',
  'hub-resume',
  'hub-formatting',
  'guides',
  'guide-ats-resume',
  'guide-pitch-deck',
  'guide-academic-formatting',
  'guide-corporate-report',
  'tools',
  'tool-ats-scanner',
  'tool-pitch-deck',
  'tool-citation-gen',
  'tool-doc-estimator',
  'case-studies',
  'referrals',
  'review-canvas',
  'brand-assets',
];

function getPageFromRoute(): { page: PageType; targetSection?: string } {
  const pathRaw = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  const hashRaw = window.location.hash.toLowerCase().replace(/^#\/?/, '');

    if (pathRaw === 'brand-assets' || pathRaw === 'media-assets' || pathRaw === 'brand-images' || pathRaw === 'images' || hashRaw === 'brand-assets' || hashRaw === 'media-assets') {
      return { page: 'brand-assets' };
    }
    if (pathRaw === 'case-studies' || pathRaw === 'case-study' || pathRaw === 'transformations' || hashRaw === 'case-studies') {
      return { page: 'case-studies' };
    }
    if (pathRaw === 'referrals' || pathRaw === 'referral' || pathRaw === 'rewards' || pathRaw === 'loyalty' || hashRaw === 'referrals') {
      return { page: 'referrals' };
    }
    if (pathRaw === 'review-canvas' || pathRaw === 'review' || pathRaw === 'annotations' || hashRaw === 'review-canvas') {
      return { page: 'review-canvas' };
    }

    if (pathRaw === 'services/presentation-design' || pathRaw === 'services/presentation' || hashRaw === 'services/presentation-design') {
      return { page: 'hub-presentation' };
    }
    if (pathRaw === 'services/assignment-writing' || pathRaw === 'services/assignment' || hashRaw === 'services/assignment-writing') {
      return { page: 'hub-assignment' };
    }
    if (pathRaw === 'services/resume-cv-services' || pathRaw === 'services/resume' || pathRaw === 'services/cv' || hashRaw === 'services/resume-cv-services') {
      return { page: 'hub-resume' };
    }
    if (pathRaw === 'services/report-formatting' || pathRaw === 'services/reports' || pathRaw === 'services/formatting' || hashRaw === 'services/report-formatting') {
      return { page: 'hub-formatting' };
    }

    if (pathRaw === 'guides' || pathRaw === 'guides/') {
      return { page: 'guides' };
    }
    if (pathRaw === 'guides/ats-resume-engineering') {
      return { page: 'guide-ats-resume' };
    }
    if (pathRaw === 'guides/executive-pitch-deck-structure') {
      return { page: 'guide-pitch-deck' };
    }
    if (pathRaw === 'guides/academic-formatting-citation') {
      return { page: 'guide-academic-formatting' };
    }
    if (pathRaw === 'guides/corporate-report-formatting-standards') {
      return { page: 'guide-corporate-report' };
    }

    if (pathRaw === 'tools' || pathRaw === 'tools/' || hashRaw === 'tools') {
      return { page: 'tools' };
    }
    if (pathRaw === 'tools/ats-resume-scanner' || pathRaw === 'tools/ats-scanner' || pathRaw === 'ats-resume-scanner' || hashRaw === 'tools/ats-resume-scanner') {
      return { page: 'tool-ats-scanner' };
    }
    if (pathRaw === 'tools/pitch-deck-builder' || pathRaw === 'tools/pitch-deck' || pathRaw === 'pitch-deck-builder' || hashRaw === 'tools/pitch-deck-builder') {
      return { page: 'tool-pitch-deck' };
    }
    if (pathRaw === 'tools/citation-generator' || pathRaw === 'tools/citation' || pathRaw === 'citation-generator' || hashRaw === 'tools/citation-generator') {
      return { page: 'tool-citation-gen' };
    }
    if (pathRaw === 'tools/document-estimator' || pathRaw === 'tools/estimator' || pathRaw === 'document-estimator' || hashRaw === 'tools/document-estimator') {
      return { page: 'tool-doc-estimator' };
    }

  const [pathPart] = pathRaw.split('/');
  const [hashPart] = hashRaw.split('?');

  if (pathPart && VALID_PAGES.includes(pathPart as PageType) && pathPart !== 'home') {
    return { page: pathPart as PageType };
  }
  if (hashPart && VALID_PAGES.includes(hashPart as PageType) && hashPart !== 'home') {
    return { page: hashPart as PageType };
  }
  if (hashPart === 'portfolio' || hashPart === 'our-work' || hashPart === 'calculator' || hashPart === 'reviews-section') {
    return { page: 'home', targetSection: hashPart === 'our-work' ? 'portfolio' : hashPart };
  }

  return { page: 'home' };
}

function AppContent() {
  const initialRoute = getPageFromRoute();
  const [currentPage, setCurrentPage] = useState<PageType>(initialRoute.page);
  const [currency, setCurrency] = useState<Currency>('PKR');

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('presentation');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AI Chat External Trigger State
  const [aiTrigger, setAiTrigger] = useState<{ isOpen: boolean; mode: 'chat' | 'voice' }>({
    isOpen: false,
    mode: 'chat',
  });

  // Track modal closing via hardware back button vs manual UI click
  const isOrderModalClosingViaBack = React.useRef(false);
  const isAuthModalClosingViaBack = React.useRef(false);

  // Scroll positions cache by page key
  const pageScrollPositions = React.useRef<Record<string, number>>({});

  // Enforce manual scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Continuously record scroll position for current active page
  useEffect(() => {
    const handleScrollSave = () => {
      const scrollY = window.scrollY;
      pageScrollPositions.current[currentPage] = scrollY;
      if (window.history.state && !window.history.state.isOverlay) {
        window.history.replaceState(
          { ...window.history.state, scrollY },
          '',
          window.location.pathname + window.location.hash + window.location.search
        );
      }
    };

    window.addEventListener('scroll', handleScrollSave, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSave);
  }, [currentPage]);

  // Main Page Navigation & Browser History Stack Sync
  const handleNavigatePage = (
    page: PageType,
    targetSection?: string,
    isFromHistoryPop = false,
    restoredY?: number
  ) => {
    // 1. Save scroll position of page being left
    const currentY = window.scrollY;
    pageScrollPositions.current[currentPage] = currentY;

    if (window.history.state && !window.history.state.isOverlay) {
      window.history.replaceState(
        { ...window.history.state, scrollY: currentY },
        '',
        window.location.pathname + window.location.hash + window.location.search
      );
    }

    // 2. Switch current page view
    setCurrentPage(page);

    const targetUrl =
      page === 'home'
        ? targetSection
          ? `/#${targetSection}`
          : '/'
        : page === 'guide-ats-resume'
        ? '/guides/ats-resume-engineering'
        : page === 'guide-pitch-deck'
        ? '/guides/executive-pitch-deck-structure'
        : page === 'guide-academic-formatting'
        ? '/guides/academic-formatting-citation'
        : page === 'guide-corporate-report'
        ? '/guides/corporate-report-formatting-standards'
        : page === 'tools'
        ? '/tools'
        : page === 'tool-ats-scanner'
        ? '/tools/ats-resume-scanner'
        : page === 'tool-pitch-deck'
        ? '/tools/pitch-deck-builder'
        : page === 'tool-citation-gen'
        ? '/tools/citation-generator'
        : page === 'tool-doc-estimator'
        ? '/tools/document-estimator'
        : page === 'case-studies'
        ? '/case-studies'
        : page === 'referrals'
        ? '/referrals'
        : page === 'review-canvas'
        ? '/review-canvas'
        : page === 'brand-assets'
        ? '/brand-assets'
        : `/${page}`;

    if (!isFromHistoryPop) {
      // If navigating to the exact same page & section, replace state instead of pushing duplicate
      if (
        window.history.state?.page === page &&
        window.history.state?.targetSection === targetSection
      ) {
        window.history.replaceState({ page, targetSection, scrollY: 0 }, '', targetUrl);
      } else {
        // ALWAYS push state for sequential multi-step navigation trail (e.g., Home -> Pricing -> Reviews)
        window.history.pushState({ page, targetSection, scrollY: 0 }, '', targetUrl);
      }

      if (page === 'home' && targetSection) {
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      // 3. Handle Back/Forward History Pop State Restoration
      const targetY = restoredY ?? window.history.state?.scrollY ?? pageScrollPositions.current[page];

      if (targetY !== undefined && targetY > 0) {
        setTimeout(() => {
          window.scrollTo({ top: targetY, behavior: 'instant' });
        }, 50);
      } else if (page === 'home' && targetSection) {
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  // URL Hash, PopState & Secret Admin Shortcut Listener
  useEffect(() => {
    const handleRouteSync = (e?: Event) => {
      const popState = (e as PopStateEvent)?.state || window.history.state;
      if (popState?.isOverlay) {
        return;
      }

      let targetPage: PageType;
      let targetSection: string | undefined;
      let restoredY: number | undefined;

      if (popState?.page && VALID_PAGES.includes(popState.page as PageType)) {
        targetPage = popState.page as PageType;
        targetSection = popState.targetSection;
        restoredY = popState.scrollY;
      } else {
        const route = getPageFromRoute();
        targetPage = route.page;
        targetSection = route.targetSection;
      }

      handleNavigatePage(
        targetPage,
        targetSection,
        true,
        restoredY
      );
    };

    // Ensure initial history state is registered
    const route = getPageFromRoute();
    const initialUrl =
      route.page === 'home'
        ? route.targetSection
          ? `/#${route.targetSection}`
          : '/'
        : route.page === 'guide-ats-resume'
        ? '/guides/ats-resume-engineering'
        : route.page === 'guide-pitch-deck'
        ? '/guides/executive-pitch-deck-structure'
        : route.page === 'guide-academic-formatting'
        ? '/guides/academic-formatting-citation'
        : route.page === 'guide-corporate-report'
        ? '/guides/corporate-report-formatting-standards'
        : route.page === 'tools'
        ? '/tools'
        : route.page === 'tool-ats-scanner'
        ? '/tools/ats-resume-scanner'
        : route.page === 'tool-pitch-deck'
        ? '/tools/pitch-deck-builder'
        : route.page === 'tool-citation-gen'
        ? '/tools/citation-generator'
        : route.page === 'tool-doc-estimator'
        ? '/tools/document-estimator'
        : `/${route.page}`;

    if (!window.history.state || !window.history.state.page) {
      window.history.replaceState({ page: route.page, targetSection: route.targetSection, scrollY: window.scrollY }, '', initialUrl);
    }

    window.addEventListener('hashchange', handleRouteSync);
    window.addEventListener('popstate', handleRouteSync);

    // Secret Admin Shortcut (Ctrl+Shift+A or Cmd+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleNavigatePage('admin');
        triggerToast('🔒 Private MFS Admin HQ Activated');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleRouteSync);
      window.removeEventListener('popstate', handleRouteSync);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Order & Auth Modal History Integration for Mobile Physical Back Button
  useModalHistory(isOrderModalOpen, () => setIsOrderModalOpen(false), 'orderModal');
  useModalHistory(isAuthModalOpen, () => setIsAuthModalOpen(false), 'authModal');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleOpenAIChat = (mode: 'chat' | 'voice' = 'chat') => {
    setAiTrigger({ isOpen: true, mode });
  };

  const handleOpenOrderWithService = (serviceId: string) => {
    setPrefilledService(serviceId);
    handleNavigatePage('order');
  };

  const handleBookFromCalculator = (details: {
    service: string;
    qty: number;
    speed: DeliverySpeed;
    currency: Currency;
    finalPrice: number;
  }) => {
    setPrefilledService(details.service);
    handleNavigatePage('order');
  };

  const scrollToPortfolio = () => {
    handleNavigatePage('home', 'portfolio');
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white selection:bg-[#E5C158] selection:text-[#050507] relative font-sans">
      {/* Dynamic Technical SEO & Structured Data */}
      <SEOManager currentPage={currentPage} />

      {/* Toast Notification */}
      <Toast message={toastMessage} />

      {/* Global Header */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        onOpenOrderModal={() => handleNavigatePage('order')}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
      />

      {/* Main Content Area with Motion Graphics Page Transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <Suspense fallback={<PageSkeleton />}>
            {currentPage === 'home' ? (
              <>
                {/* Hero Section */}
                <Hero
                  onOpenOrderModal={() => handleNavigatePage('order')}
                  onViewWork={scrollToPortfolio}
                />

                {/* Trust Badges */}
                <TrustBadges />

                {/* Popular Services Section */}
                <ServicesSection
                  currency={currency}
                  onSelectService={handleOpenOrderWithService}
                  onOpenCalculator={(serviceId) => {
                    if (serviceId) setPrefilledService(serviceId);
                    const el = document.getElementById('calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onNavigatePage={handleNavigatePage}
                />

                {/* How It Works Timeline */}
                <HowItWorks />

                {/* Why Choose Us */}
                <WhyUsSection />

                {/* Live Interactive Price Calculator */}
                <PriceCalculator
                  currency={currency}
                  setCurrency={setCurrency}
                  selectedServiceId={prefilledService}
                  onBookOrder={handleBookFromCalculator}
                />

                {/* Portfolio Deliverables Preview */}
                <PortfolioSection 
                  onShowToast={triggerToast} 
                  onOpenOrderModal={() => setIsOrderModalOpen(true)}
                  onNavigatePage={handleNavigatePage}
                />

                {/* Verified Reviews */}
                <ReviewsSection onViewAllReviews={() => handleNavigatePage('reviews')} />

                {/* FAQ Accordion */}
                <FaqSection />

                {/* 5-Card Contact Grid */}
                <ContactSection onOpenAIChat={handleOpenAIChat} />
              </>
            ) : currentPage === 'services' ? (
              <ServicesPage
                currency={currency}
                onSelectService={handleOpenOrderWithService}
                onOpenCalculator={() => {
                  setCurrentPage('home');
                  setTimeout(() => {
                    const el = document.getElementById('calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              />
            ) : currentPage === 'pricing' ? (
              <PricingPage
                currency={currency}
                setCurrency={setCurrency}
                onSelectService={handleOpenOrderWithService}
                onOpenCalculator={() => {
                  setCurrentPage('home');
                  setTimeout(() => {
                    const el = document.getElementById('calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              />
            ) : currentPage === 'reviews' ? (
              <ReviewsPage
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
                onShowToast={triggerToast}
              />
            ) : currentPage === 'about' ? (
              <AboutPage
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'contact' ? (
              <ContactPage
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'order' ? (
              <OrderPage
                currency={currency}
                setCurrency={setCurrency}
                prefilledServiceId={prefilledService}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
                onOpenAIChat={handleOpenAIChat}
              />
            ) : currentPage === 'payment' ? (
              <PaymentPage
                currency={currency}
                setCurrency={setCurrency}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
                onOpenAIChat={handleOpenAIChat}
              />
            ) : currentPage === 'confirmation' ? (
              <OrderConfirmationPage
                currency={currency}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
                onOpenAIChat={handleOpenAIChat}
              />
            ) : currentPage === 'dashboard' ? (
              <RequireClient>
                <ClientDashboard
                  currency={currency}
                  setCurrency={setCurrency}
                  onShowToast={triggerToast}
                  onNavigatePage={handleNavigatePage}
                  onOpenAIChat={handleOpenAIChat}
                />
              </RequireClient>
            ) : currentPage === 'admin' ? (
              <AdminGuard onShowToast={triggerToast}>
                <AdminDashboard
                  currency={currency}
                  setCurrency={setCurrency}
                  onShowToast={triggerToast}
                  onNavigatePage={handleNavigatePage}
                />
              </AdminGuard>
            ) : currentPage === 'faq' ? (
              <FaqPage
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'privacy' ? (
              <PrivacyPolicyPage
                onNavigatePage={handleNavigatePage}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
              />
            ) : currentPage === 'terms' ? (
              <TermsOfServicePage
                onNavigatePage={handleNavigatePage}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
              />
            ) : currentPage === 'refund-policy' || currentPage === 'refundpolicy' ? (
              <RefundPolicyPage
                onNavigatePage={handleNavigatePage}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
              />
            ) : currentPage === 'hub-presentation' ? (
              <PresentationDesignHub
                currency={currency}
                setCurrency={setCurrency}
                onOpenOrderModal={(serviceId, slides) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'hub-assignment' ? (
              <AssignmentWritingHub
                currency={currency}
                setCurrency={setCurrency}
                onOpenOrderModal={(serviceId, words) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'hub-resume' ? (
              <ResumeCvHub
                currency={currency}
                setCurrency={setCurrency}
                onOpenOrderModal={(serviceId) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'hub-formatting' ? (
              <ReportFormattingHub
                currency={currency}
                setCurrency={setCurrency}
                onOpenOrderModal={(serviceId, words) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'guides' ? (
              <GuidesIndexPage
                onNavigatePage={handleNavigatePage}
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
              />
            ) : currentPage === 'guide-ats-resume' ? (
              <AtsResumeGuidePage
                onNavigatePage={handleNavigatePage}
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
              />
            ) : currentPage === 'guide-pitch-deck' ? (
              <PitchDeckGuidePage
                onNavigatePage={handleNavigatePage}
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
              />
            ) : currentPage === 'guide-academic-formatting' ? (
              <AcademicFormattingGuidePage
                onNavigatePage={handleNavigatePage}
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
              />
            ) : currentPage === 'guide-corporate-report' ? (
              <CorporateReportGuidePage
                onNavigatePage={handleNavigatePage}
                onOpenOrderModal={() => setIsOrderModalOpen(true)}
              />
            ) : currentPage === 'tools' ? (
              <ToolsIndexPage
                onNavigatePage={handleNavigatePage}
                onOpenOrderModal={(serviceId) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
              />
            ) : currentPage === 'tool-ats-scanner' ? (
              <AtsResumeScannerTool
                onOpenOrderModal={(serviceId) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'tool-pitch-deck' ? (
              <PitchDeckBuilderTool
                onOpenOrderModal={(serviceId, slides) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'tool-citation-gen' ? (
              <CitationGeneratorTool
                onOpenOrderModal={(serviceId) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'tool-doc-estimator' ? (
              <DocumentEstimatorTool
                currency={currency}
                setCurrency={setCurrency}
                onOpenOrderModal={(serviceId, words) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
                onOpenAIChat={handleOpenAIChat}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'case-studies' ? (
              <CaseStudiesPage
                currency={currency}
                onNavigatePage={handleNavigatePage}
                onOpenOrderModal={(serviceId) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
              />
            ) : currentPage === 'referrals' ? (
              <ClientReferralRewardsHub
                currency={currency}
                userEmail="client@mfsgrowth.online"
                userName="Valued Client"
                onOpenOrderModal={(serviceId) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'review-canvas' ? (
              <ProjectInteractiveReviewCanvas
                onApproveProject={() => {
                  triggerToast('Master files approved & delivered!');
                }}
                onRequestRevision={(comments) => {
                  triggerToast(`Revision submitted with ${comments.length} items. Lead designer notified!`);
                }}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'brand-assets' ? (
              <BrandMediaAssetsPage
                onOpenOrderModal={(serviceId) => {
                  if (serviceId) setPrefilledService(serviceId);
                  setIsOrderModalOpen(true);
                }}
                onShowToast={triggerToast}
                onNavigatePage={handleNavigatePage}
                onOpenAIChat={handleOpenAIChat}
              />
            ) : (
              <NotFoundPage onNavigatePage={handleNavigatePage} />
            )}
          </Suspense>
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <Footer onOpenOrderModal={() => handleNavigatePage('order')} onNavigatePage={handleNavigatePage} onOpenAIChat={handleOpenAIChat} />

      {/* Floating 24/7 AI Chatbot & WhatsApp Floating Actions */}
      <Suspense fallback={null}>
        <AIAssistantWidget 
          externalIsOpen={aiTrigger.isOpen}
          externalMode={aiTrigger.mode}
          onCloseExternal={() => setAiTrigger((prev) => ({ ...prev, isOpen: false }))}
        />
      </Suspense>

      {/* Order Booking Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        currency={currency}
        prefilledService={prefilledService}
      />

      {/* Social & Email Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onShowToast={triggerToast}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
