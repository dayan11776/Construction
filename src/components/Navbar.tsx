import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenInquiry: () => void;
  onOpenPortfolio: () => void;
  onOpenCapabilities?: () => void;
  onOpenLocation: () => void;
}

interface SectionItem {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
}

const NAV_SECTIONS: SectionItem[] = [
  { id: 'hero-section', number: '01', label: 'Home', shortLabel: 'Home' },
  { id: 'services-section', number: '02', label: 'Services', shortLabel: 'Services' },
  { id: 'about-section', number: '03', label: 'About', shortLabel: 'About' },
  { id: 'featured-projects-section', number: '04', label: 'Projects', shortLabel: 'Projects' },
  { id: 'testimonials-section', number: '05', label: 'Testimonials', shortLabel: 'Reviews' },
  { id: 'contact-section', number: '06', label: 'Contact', shortLabel: 'Contact' },
];

export function Navbar({ onOpenInquiry, onOpenPortfolio, onOpenLocation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero-section');
  const [isScrolled, setIsScrolled] = useState(false);

  // Active section scrollspy observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140; // Look slightly ahead of current viewport top
      setIsScrolled(window.scrollY > 20);

      // Check sections in reverse order to find the current active one
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const sec = NAV_SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sec.id);
            return;
          }
        }
      }

      // Default to first section if at the very top
      setActiveSection(NAV_SECTIONS[0].id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler with header offset
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 76; // Accommodate fixed header
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 py-2 sm:py-3">
        <div 
          className={`flex items-center justify-between rounded-full px-4 py-2 sm:px-6 sm:py-2.5 shadow-xl transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#06080e]/90 backdrop-blur-md border border-white/[0.12] shadow-black/80' 
              : 'bg-neutral-950/60 backdrop-blur-sm border border-white/[0.08] shadow-black/40'
          }`}
        >
          
          {/* Brand / Logo */}
          <div 
            id="navbar-brand-logo"
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
            onClick={() => scrollToSection('hero-section')}
            title="Return to Home"
          >
            <div className="relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-black/50 border border-amber-500/30 p-1 shadow-lg shadow-black/50 transition-all duration-300 group-hover:border-amber-400/80 group-hover:scale-105">
              <img
                src="/logo-tight.png"
                onError={(e) => {
                  e.currentTarget.src = 'https://res.cloudinary.com/hjftuhnr/image/upload/v1789024695/Codex_Image_Sep_10__2026__01_54_44_PM-removebg-preview.png';
                }}
                alt="Modern Construction Logo"
                className="h-full w-full object-contain drop-shadow"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-stone-100 font-extrabold tracking-widest text-sm sm:text-base uppercase flex items-center gap-1.5 transition-colors group-hover:text-amber-400">
                VORTEX
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              </span>
              <span className="text-[10px] tracking-wider text-stone-400 uppercase hidden sm:inline-block font-medium font-mono">
                Modern Construction
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop - Based directly on each section) */}
          <nav 
            id="desktop-section-nav"
            className="hidden md:flex items-center gap-1 lg:gap-2 px-2 py-1 rounded-full bg-slate-900/60 border border-slate-800/80 text-xs font-medium tracking-wider uppercase"
            aria-label="Main Section Navigation"
          >
            {NAV_SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  id={`nav-link-${section.id}`}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-400 font-semibold bg-amber-500/10 shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {/* Subtle active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-dot"
                      className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="tel:+18005552845"
              className="hidden xl:inline-flex items-center gap-2 text-xs font-mono font-medium text-stone-300 hover:text-amber-400 transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>(800) 555-BUILD</span>
            </a>

            <button
              id="navbar-location-btn"
              onClick={onOpenLocation}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-orange-500/10 hover:bg-orange-500 hover:text-white text-orange-400 border border-orange-500/30 hover:border-orange-500 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer shadow-sm group"
              title="View Office Location & Directions"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-400 group-hover:text-white transition-colors" />
              <span>Location</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-stone-200 hover:text-amber-400 p-1.5 rounded-lg bg-white/5 border border-white/10 focus:outline-none cursor-pointer transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden mx-4 mt-2 p-5 bg-[#090d16] border border-slate-700/80 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col space-y-4 select-none"
          >
            {/* Mobile Header Brand */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-black/60 border border-amber-500/30 p-1 flex items-center justify-center">
                  <img
                    src="/logo-tight.png"
                    onError={(e) => {
                      e.currentTarget.src = 'https://res.cloudinary.com/hjftuhnr/image/upload/v1789024695/Codex_Image_Sep_10__2026__01_54_44_PM-removebg-preview.png';
                    }}
                    alt="Modern Construction Logo"
                    className="h-full w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-stone-100 font-extrabold tracking-widest text-xs uppercase">
                    VORTEX
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-amber-400 uppercase">
                    Section Navigation
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                6 Sections
              </span>
            </div>

            {/* Mobile Section Items (Strictly based on each section) */}
            <div className="flex flex-col space-y-1">
              {NAV_SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    id={`mobile-nav-link-${section.id}`}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30'
                        : 'text-stone-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-mono ${isActive ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                        {section.number}
                      </span>
                      <span className="text-sm font-medium tracking-wide uppercase">
                        {section.label}
                      </span>
                    </div>

                    {isActive && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                        Current
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                id="mobile-location-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLocation();
                }}
                className="w-full py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-orange-600/25"
              >
                <MapPin className="w-4 h-4 fill-white/20" />
                <span>Visit Our Location</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-2.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-stone-200 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700/80"
              >
                <span>Request Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
              
              <a
                href="tel:+18005552845"
                className="text-center text-xs font-mono text-stone-400 py-1 flex items-center justify-center gap-2 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+1 (800) 555-BUILD</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
