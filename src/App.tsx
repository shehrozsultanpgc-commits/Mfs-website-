import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Currency, DeliverySpeed } from './types';
import { SEOManager } from './components/common/SEOManager';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { ServicesSection } from './components/ServicesSection';
import { ServicesPage } from './components/ServicesPage';
import { PricingPage } from './components/PricingPage';
import { ReviewsPage } from './components/ReviewsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { FaqPage } from './components/FaqPage';
import { HowItWorks } from './components/HowItWorks';
import { WhyUsSection } from './components/WhyUsSection';
import { PriceCalculator } from './components/PriceCalculator';
import { PortfolioSection } from './components/PortfolioSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { OrderPage } from './components/OrderPage';
import { PaymentPage } from './components/PaymentPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { ClientDashboard } from './components/ClientDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Footer } from './components/Footer';
import { AIAssistantWidget } from './components/ai/AIAssistantWidget';
import { OrderModal } from './components/OrderModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { AuthProvider } from './context/AuthContext';
import { RequireAdmin, RequireClient } from './components/AuthGuards';
import { AdminGuard } from './components/admin/AdminGuard';

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
  | 'admin';

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
];

function getPageFromRoute(): { page: PageType; targetSection?: string } {
  const hashRaw = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  const pathRaw = window.location.pathname.toLowerCase().replace(/^\//, '');

  const [hashPart] = hashRaw.split('?');
  const [pathPart] = pathRaw.split('/');

  if (VALID_PAGES.includes(hashPart as PageType)) {
    return { page: hashPart as PageType };
  }
  if (VALID_PAGES.includes(pathPart as PageType)) {
    return { page: pathPart as PageType };
  }
  if (hashPart === 'portfolio' || hashPart === 'calculator' || hashPart === 'reviews-section') {
    return { page: 'home', targetSection: hashPart };
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
          window.location.hash || undefined
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
        window.location.hash || undefined
      );
    }

    // 2. Switch current page view
    setCurrentPage(page);

    const targetHash =
      page === 'home'
        ? targetSection
          ? `#${targetSection}`
          : '#home'
        : `#${page}`;

    if (!isFromHistoryPop) {
      // If navigating to the exact same page & section, replace state instead of pushing duplicate
      if (
        window.history.state?.page === page &&
        window.history.state?.targetSection === targetSection
      ) {
        window.history.replaceState({ page, targetSection, scrollY: 0 }, '', targetHash);
      } else {
        // ALWAYS push state for sequential multi-step navigation trail (e.g., Home -> Pricing -> Reviews)
        window.history.pushState({ page, targetSection, scrollY: 0 }, '', targetHash);
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
    const initialHash =
      route.page === 'home'
        ? route.targetSection
          ? `#${route.targetSection}`
          : '#home'
        : `#${route.page}`;

    if (!window.history.state || !window.history.state.page) {
      window.history.replaceState({ page: route.page, targetSection: route.targetSection, scrollY: window.scrollY }, '', initialHash);
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

  // Order Modal History Integration for Mobile Back Button
  useEffect(() => {
    if (isOrderModalOpen) {
      window.history.pushState({ isOverlay: true, name: 'orderModal' }, '', window.location.hash || '#');

      const handlePopState = () => {
        isOrderModalClosingViaBack.current = true;
        setIsOrderModalOpen(false);
      };

      window.addEventListener('popstate', handlePopState, { once: true });

      return () => {
        window.removeEventListener('popstate', handlePopState);
        if (!isOrderModalClosingViaBack.current && window.history.state?.isOverlay) {
          window.history.back();
        }
        isOrderModalClosingViaBack.current = false;
      };
    }
  }, [isOrderModalOpen]);

  // Auth Modal History Integration for Mobile Back Button
  useEffect(() => {
    if (isAuthModalOpen) {
      window.history.pushState({ isOverlay: true, name: 'authModal' }, '', window.location.hash || '#');

      const handlePopState = () => {
        isAuthModalClosingViaBack.current = true;
        setIsAuthModalOpen(false);
      };

      window.addEventListener('popstate', handlePopState, { once: true });

      return () => {
        window.removeEventListener('popstate', handlePopState);
        if (!isAuthModalClosingViaBack.current && window.history.state?.isOverlay) {
          window.history.back();
        }
        isAuthModalClosingViaBack.current = false;
      };
    }
  }, [isAuthModalOpen]);

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
          ) : (
            <FaqPage
              onOpenOrderModal={() => setIsOrderModalOpen(true)}
              onOpenAIChat={handleOpenAIChat}
              onShowToast={triggerToast}
              onNavigatePage={handleNavigatePage}
            />
          )}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <Footer onOpenOrderModal={() => handleNavigatePage('order')} onNavigatePage={handleNavigatePage} onOpenAIChat={handleOpenAIChat} />

      {/* Floating 24/7 AI Chatbot & WhatsApp Floating Actions */}
      <AIAssistantWidget 
        externalIsOpen={aiTrigger.isOpen}
        externalMode={aiTrigger.mode}
        onCloseExternal={() => setAiTrigger((prev) => ({ ...prev, isOpen: false }))}
      />

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
