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

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard' | 'admin'>('home');
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

  // URL Hash & Admin Shortcut Listener for Private Admin Access
  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();

      if (hash === '#admin' || hash === '#/admin' || pathname.startsWith('/admin')) {
        setCurrentPage('admin');
      } else if (hash === '#dashboard' || hash === '#/dashboard' || pathname.startsWith('/dashboard')) {
        setCurrentPage('dashboard');
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);

    // Secret Admin Shortcut (Ctrl+Shift+A or Cmd+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentPage('admin');
        window.location.hash = 'admin';
        triggerToast('🔒 Private MFS Admin HQ Activated');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
    setCurrentPage('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookFromCalculator = (details: {
    service: string;
    qty: number;
    speed: DeliverySpeed;
    currency: Currency;
    finalPrice: number;
  }) => {
    setPrefilledService(details.service);
    setCurrentPage('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePage = (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard' | 'admin',
    targetSection?: string
  ) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'home' && targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const scrollToPortfolio = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('portfolio');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
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
