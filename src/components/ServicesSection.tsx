import { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Building2, 
  Wrench, 
  Compass, 
  Play, 
  Pause, 
  ArrowRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesSectionProps {
  onOpenInquiry: () => void;
  onOpenPortfolio?: () => void;
}

const SERVICES = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Construction',
    description: 'Custom homes and architecturally engineered living spaces built to endure.',
    icon: Home,
    badge: 'Custom Living',
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Construction',
    description: 'Scalable infrastructure for corporate offices, retail developments, and industrial sites.',
    icon: Building2,
    badge: 'Enterprise',
  },
  {
    id: 'renovation',
    number: '03',
    title: 'Renovation & Remodeling',
    description: 'Comprehensive structural remodeling and interior transformations.',
    icon: Wrench,
    badge: 'Modernization',
  },
  {
    id: 'design-build',
    number: '04',
    title: 'Design-Build Delivery',
    description: 'Turnkey architectural guidance from initial blueprinting to final occupancy certification.',
    icon: Compass,
    badge: 'Turnkey Delivery',
  },
];

const VIDEO_SOURCE = 'https://res.cloudinary.com/hjftuhnr/video/upload/v1789027046/Construction_time-lapse_of_moder__20260910142539.mp4';
const SERVICES_BG_IMAGE = 'https://res.cloudinary.com/hjftuhnr/image/upload/v1789027291/Codex_Image_Sep_10_2026_03_55_24_PM.png';

export function ServicesSection({ onOpenInquiry }: ServicesSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isTheater, setIsTheater] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleTheater = () => {
    setIsTheater(!isTheater);
  };

  return (
    <section 
      id="services-section"
      className="relative w-full bg-[#080c14] text-[#fbf8f2] py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-slate-800/80 scroll-mt-16 sm:scroll-mt-20"
    >
      {/* 
        Background Layer using the provided Codex architectural reference image
        Blended with a rich dark architectural gradient and blueprint overlay
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transform scale-105 transition-transform duration-1000 ease-out"
        style={{ backgroundImage: `url(${SERVICES_BG_IMAGE})` }}
        aria-hidden="true"
      />
      {/* Dark tint & contrast protective overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#080c14]/94 via-[#090d16]/88 to-[#080c14]/96 pointer-events-none" 
        aria-hidden="true" 
      />
      {/* Blueprint grid texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px]" 
        aria-hidden="true" 
      />
      {/* Subtle architectural atmosphere illumination */}
      <div 
        className="absolute -top-40 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-40 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-18 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            <span>Comprehensive Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f2] leading-[1.12]">
            Construction Built Around Your Vision
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            From custom homes to large-scale commercial spaces, our team manages every phase with precision, quality, and care.
          </p>
        </div>

        {/* 
          Theater Mode (when toggled active): Expands the video full-width with maximum prominence
          Default Mode: Two-column layout where the video takes the dominant 7-column span on desktop
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
          
          {/* 
            LEFT COLUMN (Desktop):
            2x2 Service cards with high-contrast text and warm-amber accents
          */}
          <div className={`${isTheater ? 'order-2 lg:col-span-12' : 'order-2 lg:order-1 lg:col-span-5 xl:col-span-5'} flex flex-col justify-between`}>
            <div className={`grid grid-cols-1 ${isTheater ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'} gap-4 sm:gap-4.5 h-full`}>
              {SERVICES.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    className="group relative rounded-2xl bg-[#0c1220]/85 hover:bg-[#11192c] border border-slate-700/60 hover:border-amber-500/50 p-5 sm:p-6 transition-all duration-300 shadow-lg shadow-black/50 flex flex-col justify-between backdrop-blur-md"
                  >
                    {/* Top gradient notch on hover */}
                    <div className="absolute top-0 left-5 right-5 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/70 transition-all duration-500" />

                    <div>
                      {/* Card Header: Icon + Number */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:text-amber-300 transition-colors shadow-sm">
                          <IconComponent className="w-4.5 h-4.5" />
                        </div>
                        <span className="font-mono text-xs font-semibold text-slate-500 tracking-wider">
                          {service.number}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-base sm:text-lg font-bold text-[#fbf8f2] group-hover:text-white tracking-tight leading-snug">
                        {service.title}
                      </h3>

                      {/* Card Description */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal">
                        {service.description}
                      </p>
                    </div>

                    {/* Card Footer Badge */}
                    <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider">
                        {service.badge}
                      </span>
                      <span className="text-amber-400/80 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 
            RIGHT COLUMN (Desktop) / FIRST ON MOBILE:
            EXPANDED CINEMATIC VIDEO PANEL:
            - Now given the dominant 7-column span (or 12 in Theater Mode)
            - Expanded minimum height (520px+ on desktop)
            - High-definition 4K construction timelapse
            - Interactive Theater Mode toggle, Volume toggle, and scrubber progress bar
          */}
          <div className={`${isTheater ? 'order-1 lg:col-span-12' : 'order-1 lg:order-2 lg:col-span-7 xl:col-span-7'} flex flex-col justify-between`}>
            <div className="flex flex-col space-y-3 h-full">
              
              {/* Header Above Video with Status & Action */}
              <div className="flex items-center justify-between px-1">
                <div className="inline-flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-200">
                    See the Process
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleTheater}
                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-[11px] font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title={isTheater ? 'Standard View' : 'Cinema Theater View'}
                  >
                    {isTheater ? (
                      <>
                        <Minimize2 className="w-3 h-3 text-amber-400" />
                        <span>Standard View</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3 h-3 text-amber-400" />
                        <span>Cinema View</span>
                      </>
                    )}
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Site Time-Lapse
                  </span>
                </div>
              </div>

              {/* 
                Large High-Impact Video Container:
                - Substantially taller and wider
                - Rounded corners with concrete-accent border
                - Full height filling on desktop
              */}
              <div 
                ref={containerRef}
                className={`relative w-full ${isTheater ? 'aspect-[21/9] min-h-[420px] lg:min-h-[580px]' : 'h-[320px] sm:h-[420px] lg:h-full lg:min-h-[520px] xl:min-h-[560px]'} rounded-2xl md:rounded-3xl overflow-hidden bg-slate-950 border border-slate-700/70 shadow-2xl shadow-black/80 group transition-all duration-500`}
              >
                <video
                  ref={videoRef}
                  src={VIDEO_SOURCE}
                  poster={SERVICES_BG_IMAGE}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover cursor-pointer"
                  aria-label="Modern construction time-lapse video"
                  onClick={togglePlayPause}
                />

                {/* Top Subtle Vignette */}
                <div 
                  className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none" 
                  aria-hidden="true"
                />

                {/* Bottom Gradient for Control Bar Visibility */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" 
                  aria-hidden="true"
                />

                {/* Progress bar along bottom edge */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10 overflow-hidden z-20">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Top-Right Badge: Resolution & Live Status */}
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>4K TIME-LAPSE</span>
                  </div>
                </div>

                {/* Top-Left Play State Overlay on Pause */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-10 cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-amber-500/90 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all">
                      <Play className="w-7 h-7 fill-stone-950 translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Bottom Controls Bar */}
                <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-20 flex items-center justify-between">
                  {/* Left: Play/Pause & Mute */}
                  <div className="flex items-center gap-2">
                    <button
                      id="video-play-pause-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/75 hover:bg-black/95 border border-white/20 text-[#fbf8f2] hover:text-white backdrop-blur-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-[11px]">Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-[11px]">Play</span>
                        </>
                      )}
                    </button>

                    <button
                      id="video-mute-toggle-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/75 hover:bg-black/95 border border-white/20 text-[#fbf8f2] hover:text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  </div>

                  {/* Right: Theater Mode button (Mobile & Desktop) */}
                  <button
                    id="video-expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheater();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/75 hover:bg-black/95 border border-white/20 text-[#fbf8f2] hover:text-white backdrop-blur-md text-xs font-semibold transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                    aria-label={isTheater ? 'Exit theater mode' : 'Expand to theater mode'}
                  >
                    {isTheater ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline text-[11px]">Contract</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline text-[11px]">Expand Size</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Architectural Video Caption */}
              <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
                <span>Phase-by-phase execution on active commercial and residential sites</span>
                <span className="hidden sm:inline text-slate-500 font-mono">1080p • 24 FPS • ProRes Capture</span>
              </div>
            </div>
          </div>

        </div>

        {/* 
          BOTTOM CTA:
          “Have a project in mind?” with primary orange button: “Talk to Our Team”
        */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-12 border-t border-slate-800/80">
          <div className="rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0c1220]/95 to-slate-900/90 border border-slate-700/60 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md">
            <div className="text-center md:text-left space-y-1.5 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                Ready to Build?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#fbf8f2] tracking-tight">
                Have a project in mind?
              </h3>
              <p className="text-sm text-slate-300 font-normal">
                Speak directly with our structural estimators and project managers to plan your vision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto">
              <button
                id="cta-talk-to-team-btn"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-amber-950/60 hover:shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Talk to Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
