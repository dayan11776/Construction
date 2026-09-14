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
      className="relative w-full min-h-screen bg-[#06080e] select-none flex flex-col justify-between overflow-hidden"
    >
      {/* 
        ========================================================================
        DESKTOP HERO SCENE (lg & above)
        - Pristine reference background with BUILD lettering, excavator, and house
        - Uncropped object-contain rendering on deep dark canvas
        - BUILD letters completely unobstructed across the center
        - Localized shadow strictly on the lower left behind the copy
        ========================================================================
      */}
      <div className="hidden lg:flex absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden items-center justify-center bg-[#06080e]">
        {/* Subtle atmospheric ambient glow */}
        <img
          src={HERO_IMAGE_SRC}
          onError={(e) => {
            if (e.currentTarget.src !== HERO_IMAGE_FALLBACK) {
              e.currentTarget.src = HERO_IMAGE_FALLBACK;
            }
          }}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20 blur-3xl pointer-events-none"
        />

        {/* 
          High-fidelity, uncropped hero scene:
          object-contain guarantees that the full 1672x941 frame—including the full width 
          of the "BUILD" lettering—is never cropped or truncated!
        */}
        <img
          src={HERO_IMAGE_SRC}
          onError={(e) => {
            if (e.currentTarget.src !== HERO_IMAGE_FALLBACK) {
              e.currentTarget.src = HERO_IMAGE_FALLBACK;
            }
          }}
          alt="Modern Architectural Construction Scene with Excavator and BUILD Lettering"
          className="relative w-full h-full object-contain object-center z-0"
          referrerPolicy="no-referrer"
        />

        {/* 
          Subtle, localized vignette strictly on the LOWER LEFT corner behind the hero copy.
          Never touches or darkens the BUILD letters, excavator, or illuminated residence.
        */}
        <div 
          className="absolute bottom-0 left-0 w-[620px] h-[420px] bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none z-[5]"
          style={{
            maskImage: 'radial-gradient(ellipse at 15% 90%, black 35%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 15% 90%, black 35%, transparent 80%)',
          }}
        />
      </div>

      {/* 
        ========================================================================
        MOBILE & TABLET RESPONSIVE LAYOUT (< lg)
        - Displays uncropped hero scene
        - Places the second reference hero block cleanly below/at lower area
        - Never overlays or blocks the word "BUILD"
        ========================================================================
      */}
      <div className="lg:hidden relative z-10 w-full px-5 sm:px-8 pt-20 sm:pt-24 pb-8 flex flex-col space-y-6">
        {/* 
          Mobile Hero Image Frame:
          Uses exact 1672/941 aspect ratio container so that the entire "BUILD" letters, 
          excavator, house, and night lights are 100% visible and uncropped!
        */}
        <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-neutral-950 aspect-[1672/941]">
          <img
            src={HERO_IMAGE_SRC}
            onError={(e) => {
              if (e.currentTarget.src !== HERO_IMAGE_FALLBACK) {
                e.currentTarget.src = HERO_IMAGE_FALLBACK;
              }
            }}
            alt="Modern Construction Hero - Excavator and BUILD lettering"
            className="w-full h-full object-contain object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Hero copy block on mobile / tablet */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4 max-w-lg mx-auto w-full text-left"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/80 bg-neutral-950/70 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
              MODERN CONSTRUCTION
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-md">
            Built for What’s Next.
          </h1>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-stone-300 font-normal leading-relaxed drop-shadow">
            From vision and planning to precision construction, we create spaces made to last.
          </p>

          {/* Action Buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              id="mobile-start-project-btn"
              onClick={onOpenInquiry}
              className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/50 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="mobile-view-work-btn"
              onClick={onOpenPortfolio}
              className="px-5 py-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-white/20 font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>VIEW OUR WORK</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* 
        ========================================================================
        DESKTOP HERO COPY (lg & above)
        Positioned strictly at the LOWER LEFT as requested in the second reference.
        Sits neatly over the ground terrain below the word "BUILD" without blocking it!
        ========================================================================
      */}
      <div className="hidden lg:block absolute bottom-10 xl:bottom-14 left-8 lg:left-14 xl:left-20 z-20 max-w-lg xl:max-w-xl pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 text-left"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/80 bg-neutral-950/70 backdrop-blur-md shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              MODERN CONSTRUCTION
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_18px_rgba(0,0,0,0.95)]">
            Built for What’s Next.
          </h1>

          {/* Short Description */}
          <p className="text-sm xl:text-base text-stone-200 font-normal leading-relaxed max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            From vision and planning to precision construction, we create spaces made to last.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3.5">
            {/* Primary Button */}
            <button
              id="start-project-btn"
              onClick={onOpenInquiry}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-amber-950/60 hover:shadow-amber-500/30 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Button */}
            <button
              id="view-work-btn"
              onClick={onOpenPortfolio}
              className="px-6 py-3 rounded-full bg-neutral-950/80 hover:bg-stone-900/95 text-white border border-white/20 hover:border-white/40 font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>VIEW OUR WORK</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
