import { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube, 
  ArrowUp, 
  ArrowUpRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Building,
  Check,
  X
} from 'lucide-react';

interface FooterProps {
  onOpenInquiry?: () => void;
  onOpenPortfolio?: () => void;
  onOpenLocation?: () => void;
}

type LegalModalType = 'privacy' | 'terms' | 'cookie' | 'accessibility' | null;

export function Footer({ onOpenInquiry, onOpenPortfolio, onOpenLocation }: FooterProps) {
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);
  const currentYear = new Date().getFullYear();

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="site-footer"
      className="relative w-full bg-[#04060a] text-[#fbf8f2] border-t border-slate-800/90 pt-16 sm:pt-20 lg:pt-24 pb-12 overflow-hidden select-none"
    >
      {/* Subtle blueprint grid / concrete texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      {/* Ambient warm orange and cool slate lighting glows */}
      <div 
        className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 left-10 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 z-10">
        
        {/* Main Four-Column Desktop Footer Layout (Stacks on mobile/tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-slate-800/80">
          
          {/* COLUMN 1: Company (4 columns on LG) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Company Logo & Brand Lockup */}
            <div 
              onClick={scrollToTop}
              className="inline-flex items-center gap-3 cursor-pointer group"
              title="Return to top"
            >
              <div className="relative flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-slate-900 border border-amber-500/30 p-1.5 shadow-lg shadow-black/80 transition-all duration-300 group-hover:border-amber-400 group-hover:scale-105">
                <img
                  src="/logo-tight.png"
                  onError={(e) => {
                    e.currentTarget.src = 'https://res.cloudinary.com/hjftuhnr/image/upload/v1789024695/Codex_Image_Sep_10__2026__01_54_44_PM-removebg-preview.png';
                  }}
                  alt="Vortex Modern Construction Logo"
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-stone-100 font-extrabold tracking-widest text-base sm:text-lg uppercase flex items-center gap-1.5 transition-colors group-hover:text-amber-400">
                  VORTEX
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                </span>
                <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                  Modern Construction
                </span>
              </div>
            </div>

            {/* Short Statement */}
            <p className="text-sm text-slate-300 font-normal leading-relaxed max-w-sm">
              “Building durable, meaningful spaces through precision, craftsmanship, and trusted collaboration.”
            </p>

            {/* Primary CTA Link */}
            <div className="pt-1">
              <button
                id="footer-request-consultation-btn"
                onClick={() => {
                  if (onOpenInquiry) {
                    onOpenInquiry();
                  } else {
                    handleScrollToSection('contact-section');
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 hover:bg-amber-400 text-amber-400 hover:text-stone-950 border border-amber-500/40 hover:border-amber-400 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm group"
              >
                <span>Request a Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Accreditation Badge */}
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>PCAB Triple-A Registered · General Contractor</span>
            </div>

          </div>

          {/* COLUMN 2: Contact (3 columns on LG) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <Building className="w-3.5 h-3.5" />
              <span>Contact & Headquarters</span>
            </h3>

            <div className="space-y-3.5 text-xs text-slate-300">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#fbf8f2]">SM City Bacoor</p>
                  <p className="text-slate-400">Tirona Hwy cor. Emilio Aguinaldo Hwy</p>
                  <p className="text-slate-400">Bacoor, Cavite 4102, Philippines</p>
                  {onOpenLocation && (
                    <button
                      type="button"
                      onClick={onOpenLocation}
                      className="mt-1.5 text-[10px] font-mono font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>View Map & Directions</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Toll-Free Direct</span>
                  <a 
                    href="tel:+18005552845" 
                    className="font-semibold text-[#fbf8f2] hover:text-amber-400 transition-colors"
                  >
                    +1 (800) 555-BUILD (2845)
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">+63 (2) 8876-2400</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Electronic Mail</span>
                  <a 
                    href="mailto:inquiries@vortexconstruction.com" 
                    className="font-semibold text-[#fbf8f2] hover:text-amber-400 transition-colors break-all"
                  >
                    inquiries@vortexconstruction.com
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Office & Site Hours</span>
                  <p className="font-medium text-slate-300">Mon – Fri: 8:00 AM – 6:00 PM (PHT)</p>
                  <p className="text-slate-400">Saturday: 9:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Service Areas (3 columns on LG) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Where We Build</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Licensed general contractor delivering high-spec architecture across key metropolitan hubs:
            </p>

            <ul className="space-y-2.5 text-xs font-mono text-slate-300">
              {[
                { name: 'Metro Manila & Bonifacio Global City (BGC)', active: '18 Sites' },
                { name: 'Makati CBD, Forbes Park & Bel-Air', active: '12 Sites' },
                { name: 'New Manila & Quezon City Estates', active: '9 Sites' },
                { name: 'Alabang, Nuvali & Cavite Corridor', active: '14 Sites' },
              ].map((loc, idx) => (
                <li key={idx} className="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-2">
                  <span className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                    <span>{loc.name}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 shrink-0 font-normal">
                    {loc.active}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <button
                onClick={() => handleScrollToSection('contact-section')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors group cursor-pointer"
              >
                <span>View All Service Areas</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* COLUMN 4: Follow Us (2 columns on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              Follow Us
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Stay connected with our live site progress, project reveals, and engineering time-lapses:
            </p>

            {/* Clean outline social icons with orange hover states (Icon only) */}
            <div className="flex items-center flex-wrap gap-3 pt-1">
              {[
                { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
                { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
                { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
                { name: 'YouTube', icon: Youtube, url: 'https://youtube.com' },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                    title={social.name}
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-400 text-slate-300 hover:text-amber-400 hover:bg-amber-400/10 transition-all duration-200 group cursor-pointer shadow-sm active:scale-95"
                  >
                    <Icon className="w-5 h-5 text-slate-300 group-hover:text-amber-400 transition-colors" />
                  </a>
                );
              })}
            </div>

            {/* Industry Accreditation Badges */}
            <div className="pt-3 border-t border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-400">
              <p className="text-slate-300 font-semibold">Quality & Safety Standards:</p>
              <p>• ISO 9001:2015 Structural</p>
              <p>• LEED AP Green Builder</p>
            </div>
          </div>

        </div>

        {/* 
          BOTTOM LEGAL ROW
          - © [YEAR] VORTEX MODERN CONSTRUCTION. All rights reserved.
          - Privacy Policy
          - Terms of Service
          - Cookie Policy
          - Accessibility Statement
          - Back to Top button on the right
        */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          {/* Copyright text */}
          <div className="text-center lg:text-left font-mono">
            <span>© {currentYear} VORTEX MODERN CONSTRUCTION. All rights reserved.</span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveLegalModal('cookie')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveLegalModal('accessibility')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Accessibility Statement
            </button>
          </div>

          {/* Small Back to Top Button on the right side of the footer */}
          <div className="shrink-0">
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-400 text-xs font-mono transition-all duration-200 cursor-pointer shadow-md group"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Accessible Legal Modals */}
      {activeLegalModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0c1220] border border-slate-700 p-6 sm:p-8 text-left shadow-2xl text-slate-200">
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {activeLegalModal === 'privacy' && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#fbf8f2]">Privacy Policy</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Vortex Modern Construction is dedicated to safeguarding client architectural blueprints, site assessments, and personal communications. All project briefs submitted through our consultation portal are handled confidentially by licensed project leads and are never sold or distributed to third parties.
                </p>
                <div className="pt-2 text-xs font-mono text-amber-400">
                  Data Protection Officer: privacy@vortexconstruction.com
                </div>
              </div>
            )}

            {activeLegalModal === 'terms' && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#fbf8f2]">Terms of Service</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All construction estimates, timeline schedules, and digital structural renderings provided via this website are preliminary feasibility indicators. Official contracting follows standard PCAB and FIDIC construction contracts executed in person with engineering seals.
                </p>
                <div className="pt-2 text-xs font-mono text-amber-400">
                  Contract Administration: legal@vortexconstruction.com
                </div>
              </div>
            )}

            {activeLegalModal === 'cookie' && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#fbf8f2]">Cookie Policy</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We use strictly essential cookies and anonymous analytics to assess site performance, load 4K video streams efficiently, and preserve your portfolio filter preferences across browsing sessions.
                </p>
                <div className="pt-2 text-xs font-mono text-amber-400">
                  Preferences: Essential Only (Active)
                </div>
              </div>
            )}

            {activeLegalModal === 'accessibility' && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#fbf8f2]">Accessibility Statement</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We strive to meet WCAG 2.1 AA standards across our digital experience, ensuring high color contrast ratios, screen-reader semantic elements, keyboard navigation, and scalable fonts.
                </p>
                <div className="pt-2 text-xs font-mono text-amber-400">
                  Accessibility Lead: accessibility@vortexconstruction.com
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-mono uppercase tracking-wider text-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
