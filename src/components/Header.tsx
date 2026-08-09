import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ArrowRight, UserCheck, Shield, LogOut } from 'lucide-react';
import { Currency } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenOrderModal: () => void;
  onOpenAuthModal?: () => void;
  onSelectSearchService?: (serviceId: string) => void;
  currentPage?: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard' | 'admin';
  onNavigatePage?: (page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard' | 'admin', targetSection?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  setCurrency,
  onOpenOrderModal,
  onOpenAuthModal,
  currentPage = 'home',
  onNavigatePage,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { role, isSuperAdmin, signOut, profile, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchItems = [
    { label: 'Presentation Design', target: 'presentation' },
    { label: 'Assignment Writing', target: 'assignment' },
    { label: 'Resume / CV Writing', target: 'resume' },
    { label: 'ATS Resume Engineering', target: 'ats-resume' },
    { label: 'Report Formatting', target: 'reports' },
    { label: 'Investor Pitch Decks', target: 'pitch-deck' },
  ];

  const filteredSearch = searchItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavClick = (
    page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard' | 'admin',
    targetSection?: string
  ) => {
    setMobileMenuOpen(false);
    if (onNavigatePage) {
      onNavigatePage(page, targetSection);
    } else if (targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (id: string) => {
    handleNavClick('home', id);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050507]/85 backdrop-blur-2xl border-b border-[#E5C158]/15 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E5C158] to-[#C5A847] flex items-center justify-center text-[#050507] font-extrabold text-sm shadow-[0_0_18px_rgba(229,193,88,0.35)] group-hover:scale-105 transition-transform">
            MFS
          </div>
          <span className="font-bold text-lg tracking-tight text-white font-poppins">
            MFS <span className="gold-pure-gradient">Growth</span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 xl:gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentPage === 'home' ? 'text-[#E5C158] font-semibold' : 'text-neutral-300 hover:text-[#E5C158]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentPage === 'services' ? 'text-[#E5C158] font-semibold' : 'text-neutral-300 hover:text-[#E5C158]'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentPage === 'pricing' ? 'text-[#E5C158] font-semibold' : 'text-neutral-300 hover:text-[#E5C158]'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-sm font-medium text-neutral-300 hover:text-[#E5C158] transition-colors cursor-pointer"
          >
            Our Work
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentPage === 'reviews' ? 'text-[#E5C158] font-semibold' : 'text-neutral-300 hover:text-[#E5C158]'
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentPage === 'contact' ? 'text-[#E5C158] font-semibold' : 'text-neutral-300 hover:text-[#E5C158]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Actions: Currency Toggle, Search & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Currency Toggle */}
          <div className="flex items-center bg-[#0d0d10] border border-white/10 rounded-full p-1 text-xs">
            <button
              onClick={() => setCurrency('PKR')}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                currency === 'PKR'
                  ? 'bg-[#E5C158] text-[#050507] shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              PKR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#E5C158] text-[#050507] shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              USD
            </button>
          </div>

          {/* Search Input */}
          <div className="relative" ref={searchRef}>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                className="pl-9 pr-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158] focus:bg-black/40 w-40 focus:w-52 transition-all"
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSearchSuggestions && searchQuery.trim().length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-60 bg-[#0d0d10]/95 backdrop-blur-2xl border border-[#E5C158]/20 rounded-xl overflow-hidden shadow-2xl z-50">
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setShowSearchSuggestions(false);
                        setSearchQuery('');
                        handleNavClick('services');
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs text-neutral-200 hover:bg-[#E5C158]/10 hover:text-[#E5C158] transition-colors flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-xs text-neutral-500">
                    No service matches found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Client Portal Button */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`px-3.5 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 'dashboard'
                ? 'bg-[#E5C158]/20 border-[#E5C158] text-[#E5C158]'
                : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white hover:border-white/20'
            }`}
          >
            Client Portal
          </button>

          {/* Account / Sign In Button */}
          {profile ? (
            <div className="flex items-center gap-2 bg-[#E5C158]/10 border border-[#E5C158]/40 px-3 py-1.5 rounded-full">
              <UserCheck className="w-3.5 h-3.5 text-[#E5C158]" />
              <span className="text-xs text-white font-bold max-w-[100px] truncate">
                {profile.full_name?.split(' ')[0] || 'User'}
              </span>
              <button
                onClick={() => signOut()}
                title="Sign Out"
                className="text-neutral-400 hover:text-red-400 transition-colors ml-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuthModal && onOpenAuthModal()}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Sign In</span>
            </button>
          )}

          {/* CTA Order Button */}
          <button
            onClick={onOpenOrderModal}
            className="px-5 py-2.5 rounded-full bg-[#E5C158] text-[#050507] font-bold text-xs hover:bg-[#fce888] hover:scale-105 transition-all shadow-[0_0_20px_rgba(229,193,88,0.25)] cursor-pointer flex items-center gap-1.5"
          >
            <span>Order Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0d]/98 border-b border-white/10 px-6 py-6 space-y-3 animate-fadeIn backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs text-neutral-400">Currency</span>
            <div className="flex items-center bg-black border border-white/10 rounded-full p-0.5 text-xs">
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-3 py-1 rounded-full font-semibold ${
                  currency === 'PKR' ? 'bg-[#E5C158] text-[#050507]' : 'text-neutral-400'
                }`}
              >
                PKR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-full font-semibold ${
                  currency === 'USD' ? 'bg-[#E5C158] text-[#050507]' : 'text-neutral-400'
                }`}
              >
                USD
              </button>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left py-1.5 text-sm text-neutral-300 hover:text-[#E5C158]"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="w-full text-left py-1.5 text-sm text-neutral-300 hover:text-[#E5C158]"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="w-full text-left py-1.5 text-sm text-neutral-300 hover:text-[#E5C158]"
          >
            Pricing
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left py-1.5 text-sm text-neutral-300 hover:text-[#E5C158]"
          >
            Why Us / About
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="w-full text-left py-1.5 text-sm text-neutral-300 hover:text-[#E5C158]"
          >
            Our Work
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="w-full text-left py-1.5 text-sm text-neutral-300 hover:text-[#E5C158]"
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="w-full text-left py-1.5 text-sm text-neutral-300 hover:text-[#E5C158]"
          >
            FAQ & Support
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className="w-full text-left py-1.5 text-sm text-[#E5C158] hover:underline font-semibold"
          >
            Client Dashboard
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-left py-1.5 text-sm text-neutral-300 hover:text-[#E5C158]"
          >
            Contact Us
          </button>

          {/* Account/Sign in button mobile */}
          {!profile ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAuthModal) onOpenAuthModal();
              }}
              className="w-full text-left py-2 px-3 rounded-lg bg-white/10 text-white font-bold text-sm flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#E5C158]" />
                <span>Sign In / Create Account</span>
              </span>
              <ArrowRight className="w-4 h-4 text-[#E5C158]" />
            </button>
          ) : (
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#E5C158]/10 border border-[#E5C158]/30 text-white text-xs">
              <span className="font-bold flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#E5C158]" />
                <span>{profile.full_name}</span>
              </span>
              <button
                onClick={() => signOut()}
                className="text-neutral-400 hover:text-red-400 text-xs underline"
              >
                Sign Out
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrderModal();
            }}
            className="w-full py-3 mt-2 rounded-lg bg-[#E5C158] text-[#050507] font-bold text-sm text-center shadow-lg"
          >
            Order Now
          </button>
        </div>
      )}
    </header>
  );
};
