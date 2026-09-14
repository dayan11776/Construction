import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const HERO_IMAGE_SRC = '/hero-bg.png';
const HERO_IMAGE_FALLBACK = 'https://res.cloudinary.com/hjftuhnr/image/upload/v1789023635/Codex_Image_Sep_10_2026_02_13_27_PM.png';

interface HeroSectionProps {
  onOpenInquiry: () => void;
  onOpenPortfolio: () => void;
}

export function HeroSection({ onOpenInquiry, onOpenPortfolio }: HeroSectionProps) {
  return (
    <section 
      id="hero-section"
      className="relative w-full min-h-screen bg-[#06080e] select-none flex flex-col justify-end overflow-hidden"
    >
      {/* 
        ========================================================================
        MAXIMIZED FULL-WIDTH HERO BACKGROUND
        - Spans 100% edge-to-edge width across all viewports (mobile, tablet, desktop)
        - object-cover ensures zero pillarboxing or black bars on left and right
        - Seamless dark gradient vignette on bottom-left for crisp typography contrast
        ========================================================================
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#06080e]">
        {/* Atmospheric ambient glow backdrop */}
        <img
          src={HERO_IMAGE_SRC}
          onError={(e) => {
            if (e.currentTarget.src !== HERO_IMAGE_FALLBACK) {
              e.currentTarget.src = HERO_IMAGE_FALLBACK;
            }
          }}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25 blur-3xl pointer-events-none"
        />

        {/* Maximized edge-to-edge hero scene image */}
        <img
          src={HERO_IMAGE_SRC}
          onError={(e) => {
            if (e.currentTarget.src !== HERO_IMAGE_FALLBACK) {
              e.currentTarget.src = HERO_IMAGE_FALLBACK;
            }
          }}
          alt="Modern Architectural Construction Scene with Excavator and BUILD Lettering"
          className="w-full h-full object-cover object-center z-0"
          referrerPolicy="no-referrer"
        />

        {/* Global ambient gradient for seamless top/bottom transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-transparent to-[#06080e]/60 pointer-events-none z-[1]" />

        {/* 
          Localized dark vignette on the LOWER LEFT corner behind the hero copy.
          Ensures high contrast for text while keeping the BUILD letters, excavator, and house bright.
        */}
        <div 
          className="absolute bottom-0 left-0 w-full sm:w-[720px] h-[480px] bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-[2]"
          style={{
            maskImage: 'radial-gradient(ellipse at 15% 90%, black 45%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 15% 90%, black 45%, transparent 85%)',
          }}
        />
      </div>

      {/* 
        ========================================================================
        HERO CONTENT & CALL TO ACTION
        - Positioned cleanly at the lower-left over the ground terrain
        - Fully responsive across mobile, tablet, and desktop viewports
        ========================================================================
      */}
      <div className="relative z-10 w-full flex flex-col justify-end px-5 sm:px-8 lg:px-14 xl:px-20 pb-10 sm:pb-12 lg:pb-14 xl:pb-16 pt-28 sm:pt-32 pointer-events-none">
        <div className="max-w-xl xl:max-w-2xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3.5 sm:space-y-4 text-left"
          >
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/80 bg-neutral-950/75 backdrop-blur-md shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                MODERN CONSTRUCTION
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_18px_rgba(0,0,0,0.95)]">
              Built for What’s Next.
            </h1>

            {/* Short Description */}
            <p className="text-xs sm:text-sm lg:text-base text-stone-200 font-normal leading-relaxed max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              From vision and planning to precision construction, we create spaces made to last.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-3.5">
              {/* Primary Button */}
              <button
                id="start-project-btn"
                onClick={onOpenInquiry}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-amber-950/60 hover:shadow-amber-500/30 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>START YOUR PROJECT</span>
                <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </button>

              {/* Secondary Button */}
              <button
                id="view-work-btn"
                onClick={onOpenPortfolio}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-neutral-950/80 hover:bg-stone-900/95 text-white border border-white/20 hover:border-white/40 font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>VIEW OUR WORK</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
