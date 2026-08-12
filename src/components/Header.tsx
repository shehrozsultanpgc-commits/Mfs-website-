import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Menu,
  X,
  ArrowRight,
  UserCheck,
  LogOut,
  ChevronDown,
  Sparkles,
  Briefcase,
  FileText,
  GraduationCap,
  Presentation,
  Award,
  LayoutDashboard,
} from 'lucide-react';
import { Currency } from '../types';
import { useAuth } from '../context/AuthContext';
import { MFSLogo } from './common/MFSLogo';

export interface HeaderProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenOrderModal: () => void;
  onOpenAuthModal?: () => void;
  onSelectSearchService?: (serviceId: string) => void;
  currentPage?:
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
  onNavigatePage?: (
    page:
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
      | 'admin',
    targetSection?: string
  ) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  setCurrency,
  onOpenOrderModal,
  onOpenAuthModal,
  onSelectSearchService,
  currentPage = 'home',
  onNavigatePage,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  const { role, isSuperAdmin, signOut, profile } = useAuth();

  // Handle scroll effect for glass navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobileMenuClosingViaBackRef = useRef(false);

  // Lock body scroll and handle history stack for mobile navigation drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      window.history.pushState(
        { isOverlay: true, name: 'mobileMenu' },
        '',
        window.location.hash || '#'
      );

      const handlePopState = () => {
        isMobileMenuClosingViaBackRef.current = true;
        setMobileMenuOpen(false);
      };

      window.addEventListener('popstate', handlePopState, { once: true });

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('popstate', handlePopState);

        if (!isMobileMenuClosingViaBackRef.current && window.history.state?.isOverlay) {
          window.history.back();
        }
        isMobileMenuClosingViaBackRef.current = false;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Click outside listener for search & dropdown overlays
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target as Node)
      ) {
        setShowServicesDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility: Close overlays on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSearchSuggestions(false);
        setShowServicesDropdown(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const servicesList = [
    {
      id: 'presentation',
      label: 'Presentation Design',
      category: 'Slides & Pitch Decks',
      icon: Presentation,
      desc: 'Executive pitch decks & academic slide decks',
    },
    {
      id: 'assignment',
      label: 'Assignment Writing',
      category: 'Academic Writing',
      icon: GraduationCap,
      desc: 'Custom academic assignments with APA/Harvard citations',
    },
    {
      id: 'resume',
      label: 'Resume & CV Services',
      category: 'Career Documents',
      icon: Briefcase,
      desc: 'Professional resume engineering & CV layouts',
    },
    {
      id: 'ats-resume',
      label: 'ATS Resume Engineering',
      category: 'Career Documents',
      icon: Award,
      desc: 'AI-optimized ATS resume architecture & formatting',
    },
    {
      id: 'reports',
      label: 'Report Formatting',
      category: 'Executive Reports',
      icon: FileText,
      desc: 'Corporate document formatting, case studies & whitepapers',
    },
    {
      id: 'pitch-deck',
      label: 'Investor Pitch Decks',
      category: 'Slides & Pitch Decks',
      icon: Sparkles,
      desc: 'High-converting investor decks & startup proposals',
    },
  ];

  const filteredSearch = servicesList.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavClick = (
    page:
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
      | 'admin',
    targetSection?: string
  ) => {
    setMobileMenuOpen(false);
    setShowServicesDropdown(false);
    setShowSearchSuggestions(false);

    if (onNavigatePage) {
      onNavigatePage(page, targetSection);
    } else if (targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectService = (serviceId: string) => {
    setShowSearchSuggestions(false);
    setShowServicesDropdown(false);
    setSearchQuery('');
    setMobileMenuOpen(false);

    if (onSelectSearchService) {
      onSelectSearchService(serviceId);
    } else if (onNavigatePage) {
      onNavigatePage('services');
    }
  };

  const desktopNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'portfolio', label: 'Our Work', isScroll: true, targetSection: 'portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const mobileNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Our Work', isScroll: true, targetSection: 'portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ & Support' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050507]/95 backdrop-blur-2xl border-b border-[#E5C158]/20 shadow-[0_12px_40px_rgba(0,0,0,0.85)] py-2.5 sm:py-3'
          : 'bg-[#050507]/75 backdrop-blur-md border-b border-white/[0.08] py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo Anchor */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C158] rounded-lg p-1"
          aria-label="MFS Growth Agency - Return to Home"
        >
          <MFSLogo size={36} className="group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-poppins flex items-center gap-1.5 leading-none">
              MFS <span className="gold-pure-gradient">Growth</span>
            </span>
            <span className="text-[10px] tracking-widest text-neutral-400 font-medium uppercase mt-0.5">
              Digital Agency
            </span>
          </div>
        </button>

        {/* Desktop Navigation Link Hierarchy */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {desktopNavItems.map((item) => {
            const isActive =
              currentPage === item.id && item.id !== 'portfolio';

            return (
              <div
                key={item.id}
                className="relative"
                ref={item.hasDropdown ? servicesDropdownRef : undefined}
                onMouseEnter={() => item.hasDropdown && setShowServicesDropdown(true)}
                onMouseLeave={() => item.hasDropdown && setShowServicesDropdown(false)}
              >
                <button
                  onClick={() => {
                    if (item.isScroll) {
                      handleNavClick('home', item.targetSection);
                    } else {
                      handleNavClick(item.id as any);
                    }
                  }}
                  className={`px-3 py-1.5 text-xs xl:text-sm font-medium transition-colors cursor-pointer rounded-lg relative flex items-center gap-1 ${
                    isActive
                      ? 'text-[#E5C158] font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        showServicesDropdown ? 'rotate-180 text-[#E5C158]' : 'text-neutral-400'
                      }`}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-2 left-2 right-2 h-[2px] bg-gradient-to-r from-[#E5C158] via-[#FFF3B0] to-[#E5C158] rounded-full shadow-[0_0_10px_rgba(229,193,88,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                {/* Services Hover Dropdown */}
                {item.hasDropdown && showServicesDropdown && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-2 w-80 bg-[#08080d] border border-[#E5C158]/35 rounded-2xl p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[10000]"
                    >
                      <div className="px-3 py-2 border-b border-white/[0.06] flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-wider text-[#E5C158] uppercase">
                          Our Growth Solutions
                        </span>
                        <span className="text-[10px] text-neutral-400">Direct Selection</span>
                      </div>
                      <div className="py-1.5 space-y-0.5">
                        {servicesList.map((svc) => {
                          const IconComp = svc.icon;
                          return (
                            <button
                              key={svc.id}
                              onClick={() => handleSelectService(svc.id)}
                              className="w-full px-3 py-2 rounded-xl text-left hover:bg-[#E5C158]/10 group transition-all flex items-start gap-3 cursor-pointer"
                            >
                              <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 group-hover:border-[#E5C158]/40 text-[#E5C158] transition-colors mt-0.5 flex-shrink-0">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-neutral-200 group-hover:text-[#E5C158] transition-colors flex items-center justify-between">
                                  <span>{svc.label}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                </div>
                                <p className="text-[10px] text-neutral-400 leading-snug line-clamp-1 mt-0.5">
                                  {svc.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="pt-2 border-t border-white/[0.06] mt-1">
                        <button
                          onClick={() => {
                            setShowServicesDropdown(false);
                            handleNavClick('services');
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-[#E5C158]/20 border border-white/10 hover:border-[#E5C158]/40 text-xs font-semibold text-center text-[#E5C158] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Explore All Services & Pricing</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Action Controls: Search, Currency, Client Portal, Auth, Order CTA */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          {/* Currency Segmented Toggle */}
          <div className="flex items-center bg-[#09090d] border border-white/10 rounded-full p-0.5 text-xs shadow-inner">
            <button
              onClick={() => setCurrency('PKR')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                currency === 'PKR'
                  ? 'bg-[#E5C158] text-[#050507] shadow-[0_0_10px_rgba(229,193,88,0.3)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              PKR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#E5C158] text-[#050507] shadow-[0_0_10px_rgba(229,193,88,0.3)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              USD
            </button>
          </div>

          {/* Service Search Component */}
          <div className="relative" ref={searchRef}>
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-3 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                className="pl-8 pr-7 py-1.5 bg-white/[0.04] border border-white/10 rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] focus:bg-black/60 focus:ring-1 focus:ring-[#E5C158]/50 w-32 focus:w-48 lg:w-36 lg:focus:w-56 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Live Search Panel */}
            <AnimatePresence>
              {showSearchSuggestions && searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-72 bg-[#08080d] border border-[#E5C158]/35 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[10000] p-2"
                >
                  <div className="px-3 py-1.5 border-b border-white/[0.06] flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                    <span>MATCHING SERVICES</span>
                    <span>ESC TO CLOSE</span>
                  </div>
                  <div className="mt-1 space-y-0.5 max-h-64 overflow-y-auto">
                    {filteredSearch.length > 0 ? (
                      filteredSearch.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelectService(item.id)}
                            className="w-full px-3 py-2 rounded-xl text-left text-xs text-neutral-200 hover:bg-[#E5C158]/15 hover:text-[#E5C158] transition-colors flex items-center justify-between cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="p-1 rounded-md bg-white/[0.05] border border-white/10 group-hover:border-[#E5C158]/40 text-[#E5C158]">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <p className="font-semibold">{item.label}</p>
                                <span className="text-[10px] text-neutral-400 group-hover:text-neutral-300">
                                  {item.category}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-4 py-4 text-center text-xs text-neutral-400">
                        No matching services found
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Client Portal Direct Nav Button */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
              currentPage === 'dashboard'
                ? 'bg-[#E5C158]/20 border-[#E5C158] text-[#E5C158] shadow-[0_0_12px_rgba(229,193,88,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white hover:border-white/20 hover:bg-white/[0.08]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Client Portal</span>
          </button>

          {/* Auth State Control */}
          {profile ? (
            <div className="flex items-center gap-2 bg-[#E5C158]/10 border border-[#E5C158]/30 px-3 py-1.5 rounded-full shadow-sm">
              <UserCheck className="w-3.5 h-3.5 text-[#E5C158]" />
              <span className="text-xs text-white font-bold max-w-[100px] truncate">
                {profile.full_name?.split(' ')[0] || 'User'}
              </span>
              {isSuperAdmin && (
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                  Admin
                </span>
              )}
              <button
                onClick={() => signOut()}
                title="Sign Out"
                className="text-neutral-400 hover:text-red-400 transition-colors ml-0.5 cursor-pointer p-0.5 rounded hover:bg-white/10"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuthModal && onOpenAuthModal()}
              className="px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/15 text-white font-semibold text-xs border border-white/15 hover:border-white/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Sign In</span>
            </button>
          )}

          {/* Primary Navbar Action CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenOrderModal}
            className="group px-4 py-2 rounded-full bg-[#E5C158] hover:bg-[#F5D77F] text-[#050507] font-extrabold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(229,193,88,0.3)] hover:shadow-[0_0_28px_rgba(229,193,88,0.5)] cursor-pointer flex items-center gap-1.5"
          >
            <span>Order Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </motion.button>
        </div>

        {/* Mobile Header Toggle Control */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:border-[#E5C158]/40 transition-colors cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#E5C158]" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay Portaled to document.body */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[999999] bg-[#050507] text-white flex flex-col justify-between overflow-y-auto px-6 py-6 border-t border-[#E5C158]/30 shadow-[0_30px_90px_rgba(0,0,0,1)]"
              >
                {/* Mobile Drawer Top Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <button
                    onClick={() => handleNavClick('home')}
                    className="flex items-center gap-2.5 group text-left cursor-pointer"
                  >
                    <MFSLogo size={34} />
                    <div className="flex flex-col">
                      <span className="font-extrabold text-base tracking-tight text-white font-poppins flex items-center gap-1 leading-none">
                        MFS <span className="gold-pure-gradient">Growth</span>
                      </span>
                      <span className="text-[9px] tracking-widest text-neutral-400 font-medium uppercase mt-0.5">
                        Digital Agency
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-white/[0.08] border border-white/15 text-white hover:text-[#E5C158] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Close Navigation Menu"
                  >
                    <X className="w-5 h-5 text-[#E5C158]" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Mobile Service Search */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]"
                    />
                    {searchQuery.trim() && (
                      <div className="mt-2 bg-[#0d0d12] border border-[#E5C158]/20 rounded-xl p-2 space-y-1">
                        {filteredSearch.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSelectService(item.id)}
                            className="w-full text-left px-3 py-2 text-xs text-neutral-200 hover:text-[#E5C158] flex items-center justify-between cursor-pointer"
                          >
                            <span>{item.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Navigation Hierarchy */}
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#E5C158] uppercase block mb-3">
                      Navigation
                    </span>
                    <div className="grid grid-cols-1 gap-1">
                      {mobileNavLinks.map((link) => {
                        const isActive =
                          currentPage === link.id && link.id !== 'portfolio';
                        return (
                          <button
                            key={link.id}
                            onClick={() => {
                              if (link.isScroll) {
                                handleNavClick('home', link.targetSection);
                              } else {
                                handleNavClick(link.id as any);
                              }
                            }}
                            className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold transition-all flex items-center justify-between cursor-pointer ${
                              isActive
                                ? 'bg-[#E5C158]/15 text-[#E5C158] border border-[#E5C158]/30'
                                : 'text-neutral-200 hover:bg-white/[0.05] hover:text-white'
                            }`}
                          >
                            <span>{link.label}</span>
                            <ArrowRight
                              className={`w-4 h-4 ${
                                isActive ? 'text-[#E5C158]' : 'text-neutral-500'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Client Account Section */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <span className="text-[10px] font-bold tracking-widest text-[#E5C158] uppercase block">
                      Client Account
                    </span>

                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full text-left py-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-200 font-semibold text-sm flex items-center justify-between cursor-pointer hover:border-[#E5C158]/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <LayoutDashboard className="w-4 h-4 text-[#E5C158]" />
                        <span>Client Dashboard</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-500" />
                    </button>

                    {!profile ? (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (onOpenAuthModal) onOpenAuthModal();
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <UserCheck className="w-4 h-4 text-[#E5C158]" />
                          <span>Sign In / Register</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#E5C158]" />
                      </button>
                    ) : (
                      <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 text-white">
                        <div className="flex items-center gap-2.5">
                          <UserCheck className="w-4 h-4 text-[#E5C158]" />
                          <div>
                            <p className="text-sm font-bold">{profile.full_name}</p>
                            <p className="text-[10px] text-neutral-400">{profile.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            signOut();
                          }}
                          className="text-xs text-red-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Currency Selector */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-400">Select Currency</span>
                    <div className="flex items-center bg-black border border-white/15 rounded-full p-1">
                      <button
                        onClick={() => setCurrency('PKR')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          currency === 'PKR'
                            ? 'bg-[#E5C158] text-[#050507] shadow-md'
                            : 'text-neutral-400'
                        }`}
                      >
                        PKR
                      </button>
                      <button
                        onClick={() => setCurrency('USD')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          currency === 'USD'
                            ? 'bg-[#E5C158] text-[#050507] shadow-md'
                            : 'text-neutral-400'
                        }`}
                      >
                        USD
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Primary CTA */}
                <div className="pt-6 border-t border-white/10 mt-6 pb-6">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenOrderModal();
                    }}
                    className="w-full py-4 rounded-xl bg-[#E5C158] text-[#050507] font-extrabold text-base text-center shadow-[0_0_25px_rgba(229,193,88,0.4)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Order Your Project</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
};
