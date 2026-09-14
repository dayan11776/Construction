import { useState } from 'react';
import { 
  Star, 
  Quote, 
  ShieldCheck, 
  Building2, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

// Authentic Filipino profile photos
import daniloSantosImg from '../assets/images/danilo_santos_1789352000919.jpg';
import patriciaDizonImg from '../assets/images/patricia_dizon_1789352017859.jpg';
import miguelVillanuevaImg from '../assets/images/miguel_villanueva_1789352031300.jpg';
import robertoRosarioImg from '../assets/images/roberto_rosario_1789352044485.jpg';

interface TestimonialsSectionProps {
  onOpenInquiry: () => void;
  onOpenPortfolio: () => void;
}

const TESTIMONIALS_BG_IMAGE = 'https://res.cloudinary.com/hjftuhnr/image/upload/v1789027291/Codex_Image_Sep_10_2026_03_55_24_PM.png';

interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  clientType: 'Residential Client' | 'Commercial Client' | 'Renovation Client' | 'Design-Build Client';
  projectRef: string;
  location: string;
  rating: number;
  avatarUrl?: string;
  initials: string;
  verified: boolean;
  metric?: string;
}

const FEATURED_TESTIMONIAL: Testimonial = {
  id: 't-featured',
  quote:
    'Mula sa unang konsultasyon hanggang sa mismong turnover, napaka-organisado at tapat ng buong team. Bawat detalye ng aming bahay ay pulido ang pagkakagawa at natapos nang eksakto sa itinakdang oras nang walang aberya.',
  clientName: 'Danilo at Maria Elena Santos',
  clientRole: 'May-ari ng Bahay · Horizon Residence',
  clientType: 'Residential Client',
  projectRef: 'Horizon Residence · 9,200 sq.ft Ground-Up Build',
  location: 'Manila, Philippines',
  rating: 5,
  avatarUrl: daniloSantosImg,
  initials: 'DS',
  verified: true,
  metric: 'Natapos sa Oras at Ayon sa Badyet',
};

const ADDITIONAL_REVIEWS: Testimonial[] = [
  {
    id: 't-commercial',
    quote:
      'Napakataas ng kalidad ng kanilang trabaho. Maagap at malinaw ang bawat update sa aming commercial space, kaya naman lampas sa aming inaasahan ang naging resulta.',
    clientName: 'Patricia Dizon',
    clientRole: 'VP of Development · Dizon Asset Group',
    clientType: 'Commercial Client',
    projectRef: 'Northpoint Business Hub',
    location: 'Makati, Philippines',
    rating: 5,
    avatarUrl: patriciaDizonImg,
    initials: 'PD',
    verified: true,
    metric: 'LEED Gold Standard Natamo',
  },
  {
    id: 't-renovation',
    quote:
      'Binago nila ang lumang bahay namin at ginawang isang modernong tahanan na komportable at perpekto para sa aming buong pamilya. Napakagaling ng pagkakagawa!',
    clientName: 'Dr. Miguel at Sarah Villanueva',
    clientRole: 'May-ari ng Bahay · Private Estate',
    clientType: 'Renovation Client',
    projectRef: 'The Veranda Renewal',
    location: 'Quezon City, Philippines',
    rating: 5,
    avatarUrl: miguelVillanuevaImg,
    initials: 'MV',
    verified: true,
    metric: 'Mahusay na Bentilasyon at Liwanag',
  },
  {
    id: 't-design-build',
    quote:
      'Iisang team lang ang humawak mula sa plano, permit, hanggang sa mismong construction. Walang sakit sa ulo at naging napakaginhawa ng buong proseso para sa amin.',
    clientName: 'Ar. Roberto Del Rosario',
    clientRole: 'Principal Architect at Private Owner',
    clientType: 'Design-Build Client',
    projectRef: 'Crestview Villa',
    location: 'Taguig, Philippines',
    rating: 5,
    avatarUrl: robertoRosarioImg,
    initials: 'RD',
    verified: true,
    metric: 'Turnover 3 Linggo Bago ang Deadline',
  },
];

const TRUST_SIGNALS = [
  {
    icon: Star,
    value: '4.9 / 5.0',
    label: 'Average Client Rating',
    subtext: 'Based on 180+ verified reviews across Google & Houzz',
    highlight: true,
  },
  {
    icon: Building2,
    value: '350+',
    label: 'Completed Projects',
    subtext: 'Across residential, commercial, and adaptive reuse',
    highlight: false,
  },
  {
    icon: ShieldCheck,
    value: 'Fully Licensed',
    label: '& Comprehensively Insured',
    subtext: 'PCAB Triple-A certified & full worker indemnity',
    highlight: false,
  },
  {
    icon: Award,
    value: '25+ Years',
    label: 'Of Building Experience',
    subtext: 'Delivering architectural mastery since 2001',
    highlight: false,
  },
];

export function TestimonialsSection({ onOpenInquiry, onOpenPortfolio }: TestimonialsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredReviews = activeFilter === 'all' 
    ? ADDITIONAL_REVIEWS 
    : ADDITIONAL_REVIEWS.filter(r => r.clientType.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section
      id="testimonials-section"
      className="relative w-full bg-[#070a12] text-[#fbf8f2] py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-slate-800/80 select-none scroll-mt-16 sm:scroll-mt-20"
    >
      {/* 
        Background Layer using the provided Codex architectural reference image
        Layered with dark navy, charcoal, and blueprint grid texture
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transform scale-105"
        style={{ backgroundImage: `url(${TESTIMONIALS_BG_IMAGE})` }}
        aria-hidden="true"
      />

      {/* Deep dark tint overlay ensuring WCAG AA contrast */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#070a12]/97 via-[#080d1a]/94 to-[#070a12]/98 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Blueprint grid texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px]" 
        aria-hidden="true" 
      />

      {/* Ambient warm orange and cool steel lighting accents */}
      <div 
        className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 z-10">
        
        {/* Section Heading & Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 lg:mb-20 gap-6">
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Client Endorsements</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f2] leading-[1.12]">
              Trusted by Clients. Built on Results.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Every project is a partnership. Hear from homeowners and businesses who trusted us to bring their vision to life.
            </p>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'renovation', label: 'Renovation' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/30'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 
          Main Grid Layout:
          - Left: Large Featured Testimonial Card
          - Right: Two or Three Smaller Review Cards Stacked
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch mb-16 sm:mb-20">
          
          {/* 
            LEFT: LARGE FEATURED TESTIMONIAL
            - Spans 7 columns on desktop
            - Prominent quote icon, client portrait, verified badge, project details
          */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 group relative rounded-3xl bg-gradient-to-b from-[#0d1424]/95 via-[#0b101c]/95 to-[#070b14]/95 border border-slate-700/70 hover:border-amber-500/60 p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-2xl shadow-black/80 transition-all duration-300 backdrop-blur-md"
          >
            {/* Top Amber Accent Line */}
            <div className="absolute top-0 inset-x-10 h-[2px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/80 transition-all duration-500" />

            {/* Subtle Blueprint Grid pattern inside card */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] rounded-3xl" 
              aria-hidden="true" 
            />

            <div>
              {/* Header Badges & Star Rating */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Featured Homeowner Story</span>
                </div>

                {/* 5 Golden Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(FEATURED_TESTIMONIAL.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow" />
                  ))}
                  <span className="ml-2 text-xs font-mono font-bold text-amber-400">5.0 / 5.0</span>
                </div>
              </div>

              {/* Decorative Subtle Quote Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                  <Quote className="w-6 h-6 transform -scale-x-100" />
                </div>
              </div>

              {/* Quote Body */}
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#fbf8f2] leading-snug tracking-tight mb-8">
                “{FEATURED_TESTIMONIAL.quote}”
              </blockquote>

              {/* Highlight Metric Pill */}
              {FEATURED_TESTIMONIAL.metric && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 mb-8">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{FEATURED_TESTIMONIAL.metric}</span>
                </div>
              )}
            </div>

            {/* Client Profile Footer */}
            <div className="pt-8 border-t border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Client Profile Image or Monogram Initials */}
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/40 bg-slate-800 shrink-0 shadow-lg">
                  {FEATURED_TESTIMONIAL.avatarUrl ? (
                    <img
                      src={FEATURED_TESTIMONIAL.avatarUrl}
                      alt={FEATURED_TESTIMONIAL.clientName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold font-mono">
                      {FEATURED_TESTIMONIAL.initials}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#fbf8f2] leading-tight">
                      {FEATURED_TESTIMONIAL.clientName}
                    </h3>
                    {FEATURED_TESTIMONIAL.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    {FEATURED_TESTIMONIAL.clientRole} · <span className="text-amber-400/90">{FEATURED_TESTIMONIAL.clientType}</span>
                  </p>
                  <p className="text-xs text-slate-500 font-mono mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{FEATURED_TESTIMONIAL.location}</span>
                  </p>
                </div>
              </div>

              {/* Jump to Project Case Study */}
              <button
                onClick={onOpenPortfolio}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors self-start sm:self-center py-1 cursor-pointer group/link"
              >
                <span>View Case Study</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </button>
            </div>

          </motion.div>

          {/* 
            RIGHT: TWO OR THREE SMALLER REVIEW CARDS
            - Spans 5 columns on desktop
            - Stacked vertically with high-end card hover effects, star ratings, and client badges
          */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-2xl bg-[#0c1220]/95 hover:bg-[#10182b] border border-slate-700/60 hover:border-amber-500/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/60 backdrop-blur-md"
              >
                {/* Top Subtle Amber Accent Line on Hover */}
                <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/70 transition-all duration-500" />

                <div>
                  {/* Card Header: Client Type Pill & Stars */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400">
                      {review.clientType}
                    </span>

                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed mb-5">
                    “{review.quote}”
                  </p>
                </div>

                {/* Client Profile Row */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar with Initials Fallback */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/30 bg-slate-800 shrink-0 shadow-sm">
                      {review.avatarUrl ? (
                        <img
                          src={review.avatarUrl}
                          alt={review.clientName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold font-mono text-xs">
                          {review.initials}
                        </div>
                      )}
                    </div>

                    <div className="truncate">
                      <h4 className="text-sm font-bold text-[#fbf8f2] truncate">
                        {review.clientName}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        {review.clientRole}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-[10px] font-mono text-slate-400 uppercase tracking-wider bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {review.location.split(',')[0]}
                  </span>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

        {/* 
          TRUST SIGNALS BAR
          - 4.9/5 Average Client Rating
          - 350+ Completed Projects
          - Fully Licensed & Insured
          - 25+ Years of Experience
        */}
        <div className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_SIGNALS.map((signal, idx) => {
              const Icon = signal.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 border transition-all duration-300 backdrop-blur-md ${
                    signal.highlight
                      ? 'bg-gradient-to-b from-amber-500/10 via-slate-900/80 to-slate-950 border-amber-500/40 shadow-lg shadow-amber-950/20'
                      : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#fbf8f2] tracking-tight font-mono">
                        {signal.value}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    {signal.label}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {signal.subtext}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 
          BOTTOM CALL TO ACTION (CTA):
          “Ready to Build With Confidence?”
          Primary button: “Start Your Project”
        */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900/95 via-[#0c1220]/95 to-slate-900/95 border border-slate-700/70 p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Subtle Top Amber Glow Accent */}
          <div className="absolute top-0 inset-x-16 h-[2px] bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-3">
                Collaborative General Contracting
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#fbf8f2] tracking-tight">
                Ready to Build With Confidence?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                Schedule a consultation with our principal architects and project managers to review your plans, site feasibility, and transparent cost breakdown.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
              <button
                id="testimonials-start-project-btn"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-amber-950/60 hover:shadow-amber-500/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPortfolio}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Explore Portfolio</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
