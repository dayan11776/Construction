import { useState, useRef, useEffect, type PointerEvent } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: string;
  category: string;
  name: string;
  location: string;
  year: string;
  description: string;
  image: string;
  specs: {
    area: string;
    scope: string;
    materials: string;
    structuralType: string;
  };
  highlights: string[];
}

interface FeaturedProjectsSectionProps {
  onOpenPortfolio: () => void;
  onOpenInquiry: (projectTitle?: string) => void;
}

const PROJECTS_BG_IMAGE = 'https://res.cloudinary.com/hjftuhnr/image/upload/v1789027291/Codex_Image_Sep_10_2026_03_55_24_PM.png';

// Flagship centerpiece project
const FEATURED_PRIMARY: Project = {
  id: 'horizon-residence',
  category: 'Residential Construction',
  name: 'Horizon Residence',
  location: 'Manila, Philippines',
  year: 'Completed 2026',
  description: 'A modern two-story residence combining concrete, glass, and warm natural finishes with seamless indoor-outdoor living.',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  specs: {
    area: '9,200 sq.ft',
    scope: 'Ground-Up Turnkey Build',
    materials: 'Architectural Fair-Faced Concrete, Low-E Glass, Teak',
    structuralType: 'Post-Tensioned Concrete & Steel Cantilever',
  },
  highlights: [
    'Custom cantilevered second floor with 18-foot clear overhang',
    'Acoustic triple glazing with motorized solar shading louvers',
    'Integrated rainwater harvesting & 16kW rooftop solar array',
  ],
};

// Carousel projects capped at maximum 5 cards
const CAROUSEL_PROJECTS: Project[] = [
  {
    id: 'northpoint-hub',
    category: 'Commercial Construction',
    name: 'Northpoint Business Hub',
    location: 'Makati, Philippines',
    year: 'Completed 2025',
    description: 'A flexible commercial workspace designed for growing teams, collaborative breakout zones, and modern operations.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    specs: {
      area: '34,000 sq.ft',
      scope: 'Commercial Base & Fit-Out',
      materials: 'Structural Steel, Unitized Curtain Wall, Acoustic Slats',
      structuralType: 'Composite Steel Frame with Concrete Core',
    },
    highlights: [
      'LEED Gold compliant energy monitoring system',
      'Double-height entry atrium with post-tensioned staircase',
      'Column-free floor plates offering maximum leasing agility',
    ],
  },
  {
    id: 'veranda-renewal',
    category: 'Renovation & Remodeling',
    name: 'The Veranda Renewal',
    location: 'Quezon City, Philippines',
    year: 'Completed 2025',
    description: 'A full-home renovation that improved natural light, circulation flow, and high-efficiency thermal performance.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    specs: {
      area: '6,800 sq.ft',
      scope: 'Full Structural Modernization',
      materials: 'Polished Microcement, Engineered Oak, Black Anodized Aluminum',
      structuralType: 'Reinforced Masonry Retrofit & Seismic Bracing',
    },
    highlights: [
      'Removal of central load-bearing partitions with concealed flitch beams',
      'Climatic passive cross-ventilation system throughout living areas',
      'Bespoke architectural joinery and hidden storage wall systems',
    ],
  },
  {
    id: 'crestview-villa',
    category: 'Design-Build',
    name: 'Crestview Villa',
    location: 'Taguig, Philippines',
    year: 'Completed 2024',
    description: 'A complete design-build project from early concept planning through structural handover and final architectural finishes.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
    specs: {
      area: '11,500 sq.ft',
      scope: 'Integrated Design-Build Delivery',
      materials: 'Travertine Stone, Board-Formed Concrete, Bronze Louvers',
      structuralType: 'Monolithic Reinforced Concrete Foundation',
    },
    highlights: [
      'Full turnkey single-point responsibility delivered 3 weeks ahead of schedule',
      'Negative-edge infinity lap pool with cantilevered structural deck',
      'Smart building automation managing climate, security, and illumination',
    ],
  },
  {
    id: 'solaria-campus',
    category: 'Sustainable Infrastructure',
    name: 'Solaria Innovation Campus',
    location: 'Pasig City, Philippines',
    year: 'Completed 2026',
    description: 'An eco-engineered mixed-use campus integrating smart climate systems, mass-timber beams, and vertical garden envelopes.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    specs: {
      area: '28,500 sq.ft',
      scope: 'Turnkey Sustainable Build',
      materials: 'Mass Timber (Glulam), Low-Iron Solar Glazing, Terrazzo',
      structuralType: 'Hybrid Glulam & Post-Tensioned Concrete Core',
    },
    highlights: [
      'Biophilic atrium with 4-story indoor vertical living wall',
      'Net-zero operational readiness with 45kW photovoltaic canopy',
      'Automated daylight harvesting and displacement ventilation',
    ],
  },
  {
    id: 'aura-botanical',
    category: 'Civic & Mixed-Use',
    name: 'Aura Botanical Pavilion',
    location: 'Mandaluyong, Philippines',
    year: 'Completed 2025',
    description: 'A civic pavilion blending bio-responsive architecture, lush interior biomes, and cantilevered observation decks.',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80',
    specs: {
      area: '18,200 sq.ft',
      scope: 'Civic Architectural Fit-Out',
      materials: 'Weathering Corten Steel, Curved Acoustic Glass, Teak',
      structuralType: 'Sculptural Exposed Steel Space Frame',
    },
    highlights: [
      'Parametric timber roof canopy mimicking native foliage canopy',
      'Geothermal ground-source heat pump for energy-efficient climate control',
      'Rainwater circulation reflecting pool with natural filtration',
    ],
  },
];

// Maximum view is 5 cards only
const DISPLAY_PROJECTS: Project[] = CAROUSEL_PROJECTS.slice(0, 5);

export function FeaturedProjectsSection({ onOpenPortfolio, onOpenInquiry }: FeaturedProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [offsetPx, setOffsetPx] = useState<number>(0);

  // Touch and pointer dragging state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, DISPLAY_PROJECTS.length - visibleCount);

  // ResizeObserver to calculate visible cards and exact translation offsets in pixels
  useEffect(() => {
    const calculateLayout = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      let count = 3;
      if (width < 640) {
        count = 1;
      } else if (width < 1024) {
        count = 2;
      } else {
        count = 3;
      }
      setVisibleCount(count);

      const maxIdx = Math.max(0, DISPLAY_PROJECTS.length - count);
      const safeIndex = Math.min(currentIndex, maxIdx);
      if (safeIndex !== currentIndex) {
        setCurrentIndex(safeIndex);
      }

      const gap = 24; // gap-6 = 24px
      const step = (width + gap) / count;
      setOffsetPx(Math.round(safeIndex * step));
    };

    calculateLayout();

    const ro = new ResizeObserver(() => {
      calculateLayout();
    });

    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    return () => ro.disconnect();
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIdx = prev >= maxIndex ? 0 : prev + 1;
      return nextIdx;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const prevIdx = prev <= 0 ? maxIndex : prev - 1;
      return prevIdx;
    });
  };

  const handleDotClick = (index: number) => {
    const targetIdx = Math.min(index, maxIndex);
    setCurrentIndex(targetIdx);
  };

  // Pointer drag / swipe handlers
  const handlePointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    // Add light resistance at edges
    if ((currentIndex === 0 && delta > 0) || (currentIndex === maxIndex && delta < 0)) {
      setDragOffset(delta * 0.35);
    } else {
      setDragOffset(delta);
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset < -45) {
      handleNext();
    } else if (dragOffset > 45) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section 
      id="featured-projects-section"
      className="relative w-full bg-[#070a12] text-[#fbf8f2] py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-slate-800/80 select-none scroll-mt-16 sm:scroll-mt-20"
    >
      {/* 
        Background Layer using the provided Codex architectural reference image
        Blended with a dark navy & charcoal gradient and blueprint grid texture
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transform scale-105 transition-transform duration-1000 ease-out"
        style={{ backgroundImage: `url(${PROJECTS_BG_IMAGE})` }}
        aria-hidden="true"
      />
      {/* Dark protective backdrop tint ensuring maximum WCAG AA text contrast */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#070a12]/96 via-[#080d1a]/92 to-[#070a12]/97 pointer-events-none" 
        aria-hidden="true" 
      />
      {/* Blueprint grid texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px]" 
        aria-hidden="true" 
      />
      {/* Architectural ambient illumination */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-32 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 z-10">
        
        {/* Section Heading & Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 lg:mb-20 gap-6">
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
              <span>Selected Portfolio</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f2] leading-[1.12]">
              Featured Projects
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Explore a selection of completed spaces built with precision, purpose, and lasting quality.
            </p>
          </div>

          <button
            onClick={onOpenPortfolio}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors pb-1 border-b border-amber-500/40 hover:border-amber-400 self-start md:self-end cursor-pointer group"
          >
            <span>Explore All Works</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 
          1. TOP LARGE FEATURED PROJECT CARD
          - Full-width immersive project image
          - Cinematic overlay with architectural specs
          - Subtle hover zoom and orange accent line
        */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-slate-950 border border-slate-700/70 hover:border-amber-500/50 transition-all duration-500 shadow-2xl shadow-black/80 mb-14 sm:mb-16 cursor-pointer"
          onClick={() => setSelectedProject(FEATURED_PRIMARY)}
        >
          {/* Top orange hover accent line */}
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/80 transition-all duration-500 z-30" />

          {/* Full-Width Project Image Container */}
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] overflow-hidden">
            <img
              src={FEATURED_PRIMARY.image}
              alt={FEATURED_PRIMARY.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Gradient Scrim for crisp text contrast */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/60 to-[#060911]/25 pointer-events-none" 
              aria-hidden="true" 
            />

            {/* Subtle Blueprint Grid Pattern Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" 
              aria-hidden="true" 
            />

            {/* Top Badges */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 z-20 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-amber-400 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{FEATURED_PRIMARY.category}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-mono text-slate-200">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{FEATURED_PRIMARY.year}</span>
              </div>
            </div>

            {/* Bottom Content Card on the Featured Hero */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-10 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{FEATURED_PRIMARY.location}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-amber-400/90 font-mono">Flagship Residential Build</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#fbf8f2] group-hover:text-white tracking-tight leading-tight">
                  {FEATURED_PRIMARY.name}
                </h3>

                <p className="mt-2.5 text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal max-w-xl">
                  {FEATURED_PRIMARY.description}
                </p>
              </div>

              {/* View Project Action */}
              <div className="shrink-0">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs uppercase tracking-wider shadow-xl transition-all duration-200 transform group-hover:-translate-y-0.5">
                  <span>View Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 
          2. FIXED & SMOOTH INTERACTIVE CAROUSEL
          - Transform-based calculation (no scroll snap conflicts, zero vertical page jumps)
          - Visible cards: 3 on desktop, 2 on tablet, 1 on mobile
          - Prominent side floating chevron arrows + header controls
          - Touch swipe & mouse drag support
          - Card design matching the user's reference screenshot
        */}
        <div className="space-y-6">
          
          {/* Carousel Header & Counter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Completed Spaces Carousel
              </span>
              <span className="text-slate-600">•</span>
              {/* Active slide counter */}
              <div className="text-xs font-mono">
                <span className="font-bold text-amber-400">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-slate-500"> / </span>
                <span className="text-slate-400">
                  {String(DISPLAY_PROJECTS.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Nav Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3 self-end sm:self-auto">
              {/* Instead of Manual button, View All Projects button */}
              <button
                id="carousel-view-all-projects-btn"
                onClick={onOpenPortfolio}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-stone-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-200 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 cursor-pointer group active:scale-95"
                title="View All Projects"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-slate-700/80 hover:border-amber-400 bg-slate-900/90 hover:bg-amber-500 hover:text-stone-950 text-slate-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md active:scale-95 group"
                aria-label="Previous project slide"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-slate-700/80 hover:border-amber-400 bg-slate-900/90 hover:bg-amber-500 hover:text-stone-950 text-slate-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md active:scale-95 group"
                aria-label="Next project slide"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* 
            Carousel Viewport Container:
            Houses the sliding track, touch drag events, and prominent floating side navigation arrows
          */}
          <div className="relative group/carousel">
            
            {/* Left Floating Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#080d1a]/95 hover:bg-amber-500 border border-slate-700/80 hover:border-amber-400 text-slate-200 hover:text-stone-950 flex items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur-md cursor-pointer active:scale-95 group"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Right Floating Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#080d1a]/95 hover:bg-amber-500 border border-slate-700/80 hover:border-amber-400 text-slate-200 hover:text-stone-950 flex items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur-md cursor-pointer active:scale-95 group"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Sliding Track Viewport */}
            <div 
              ref={containerRef}
              className="w-full overflow-hidden pt-2 pb-4 cursor-grab active:cursor-grabbing"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <div 
                className="flex gap-6"
                style={{
                  transform: `translateX(-${offsetPx - dragOffset}px)`,
                  transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform',
                }}
              >
                {DISPLAY_PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    style={{
                      width: visibleCount === 1 
                        ? '100%' 
                        : visibleCount === 2 
                          ? 'calc((100% - 24px) / 2)' 
                          : 'calc((100% - 48px) / 3)'
                    }}
                    className="shrink-0 group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#0c1220]/95 hover:bg-[#10182b] border border-slate-700/60 hover:border-amber-500/60 p-0 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/70 cursor-pointer backdrop-blur-md"
                    onClick={() => {
                      if (Math.abs(dragOffset) < 10) {
                        setSelectedProject(project);
                      }
                    }}
                  >
                    {/* Top amber accent line on hover */}
                    <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/80 transition-all duration-500 z-30" />

                    {/* Project Image */}
                    <div className="relative w-full h-64 sm:h-72 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        draggable={false}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                      />
                      
                      {/* Gradient vignette on image */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-[#0c1220]/40 to-transparent pointer-events-none" 
                        aria-hidden="true" 
                      />

                      {/* Top Badge: Category */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="inline-block px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-amber-500/40 text-[10px] font-bold text-amber-400 uppercase tracking-wider shadow-md">
                          {project.category}
                        </span>
                      </div>

                      {/* Top Badge: Year */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[10px] font-mono text-slate-200 shadow-md">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>{project.year.replace('Completed ', '')}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </div>

                        {/* Project Name */}
                        <h3 className="text-xl sm:text-2xl font-bold text-[#fbf8f2] group-hover:text-white tracking-tight leading-snug">
                          {project.name}
                        </h3>

                        {/* Project Description */}
                        <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {project.description}
                        </p>
                      </div>

                      {/* Card Footer: View Project Link with Arrow */}
                      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-amber-400 transition-colors">
                          VIEW PROJECT
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[#0a0f1d] border border-slate-700/80 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-stone-950 flex items-center justify-center text-amber-400 group-hover:translate-x-1 transition-all shadow-md">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 
            Carousel Pagination Indicators:
            Interactive dots/pills allowing users to jump directly to any project card
          */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {DISPLAY_PROJECTS.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => handleDotClick(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-9 h-2.5 bg-amber-400 shadow-md shadow-amber-500/50' 
                    : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${project.name}`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* 
        Interactive Project Detail Modal:
        Allows users to inspect architectural specifications, engineering highlights, and request similar builds
      */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#0b101c] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl z-10 text-stone-100 max-h-[90vh] flex flex-col"
            >
              {/* Modal Image Header */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b101c] via-[#0b101c]/40 to-transparent" />
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
                  aria-label="Close project modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#fbf8f2]">
                    {selectedProject.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-mono mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {selectedProject.location}
                    </span>
                    <span>•</span>
                    <span>{selectedProject.year}</span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Specs Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Total Footprint</span>
                    <p className="text-xs font-bold text-[#fbf8f2] mt-0.5">{selectedProject.specs.area}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Project Scope</span>
                    <p className="text-xs font-bold text-[#fbf8f2] mt-0.5 truncate">{selectedProject.specs.scope}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Structural System</span>
                    <p className="text-xs font-bold text-[#fbf8f2] mt-0.5 truncate">{selectedProject.specs.structuralType}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Key Materials</span>
                    <p className="text-xs font-bold text-[#fbf8f2] mt-0.5 truncate">{selectedProject.specs.materials}</p>
                  </div>
                </div>

                {/* Architectural Highlights */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Engineering Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
                <span className="text-xs text-slate-400">
                  Interested in a similar build for your site?
                </span>
                <button
                  onClick={() => {
                    const title = selectedProject.name;
                    setSelectedProject(null);
                    onOpenInquiry(title);
                  }}
                  className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Inquire for This Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
