import { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Leaf, 
  HardHat, 
  ArrowRight, 
  Compass, 
  ExternalLink,
  Users,
  Building,
  Calendar,
  Sparkles,
  FileText,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutSectionProps {
  onOpenInquiry: () => void;
  onOpenPortfolio?: () => void;
}

const ABOUT_BG_IMAGE = 'https://res.cloudinary.com/hjftuhnr/image/upload/v1789027291/Codex_Image_Sep_10_2026_03_55_24_PM.png';

const STATS = [
  { value: '25+', label: 'Years of Experience', note: 'Founded in 1999' },
  { value: '350+', label: 'Projects Completed', note: 'Commercial & Residential' },
  { value: '85+', label: 'Skilled Professionals', note: 'In-House Master Trades' },
  { value: '99%', label: 'Client Satisfaction', note: 'On-Time & On-Budget' },
];

const CERTIFICATIONS = [
  {
    id: 'licensed',
    title: 'Fully Licensed Contractor',
    subtitle: 'State Class-A General Contractor #GC-982410',
    icon: ShieldCheck,
    status: 'Active / Verified',
  },
  {
    id: 'insured',
    title: 'Fully Insured',
    subtitle: '$10M Comprehensive Commercial Liability & Bonding',
    icon: CheckCircle2,
    status: 'Bonded',
  },
  {
    id: 'master-builders',
    title: 'Master Builders Association Certified',
    subtitle: 'Premier Regional Quality & Craftsmanship Standard',
    icon: Award,
    status: 'Certified',
  },
  {
    id: 'safety',
    title: 'OSHA 30-Hour Safety Certified',
    subtitle: 'Zero-Harm Site Protocol & Gold Safety Excellence',
    icon: HardHat,
    status: 'Excellence',
  },
  {
    id: 'green',
    title: 'LEED & USGBC Green Building Certified',
    subtitle: 'Low-Carbon Materials, Solar & Energy Optimization',
    icon: Leaf,
    status: 'Accredited',
  },
];

const TEAM_MEMBERS = [
  {
    name: 'Marcus Sterling',
    role: 'Managing Principal & Founder',
    experience: '28 Yrs Experience',
    bio: 'Oversees complex structural delivery, site planning, and strategic development across premier commercial & residential builds.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Elena Rostova, PE',
    role: 'Lead Structural Engineer',
    experience: '18 Yrs Experience',
    bio: 'Specialist in post-tensioned concrete, mass-timber seismic engineering, and precision architectural framing.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'David Vance',
    role: 'Director of Field Operations',
    experience: '22 Yrs Experience',
    bio: 'Leads our 85+ on-site craftsman trades, strict OSHA protocols, milestone staging, and turnkey client handovers.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Aria Chen, AIA',
    role: 'Design-Build Project Director',
    experience: '15 Yrs Experience',
    bio: 'Unifies early client architectural vision with structural budgeting, bespoke finishes, and sustainable LEED standards.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
];

export function AboutSection({ onOpenInquiry }: AboutSectionProps) {
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);

  return (
    <section 
      id="about-section"
      className="relative w-full bg-[#070b14] text-[#fbf8f2] py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-slate-800/80 scroll-mt-16 sm:scroll-mt-20"
    >
      {/* 
        Background Layer using the provided Codex architectural reference image
        Blended with a refined dark navy and charcoal gradient and blueprint grid texture
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transform scale-105 transition-transform duration-1000 ease-out"
        style={{ backgroundImage: `url(${ABOUT_BG_IMAGE})` }}
        aria-hidden="true"
      />
      {/* Dark protective backdrop tint ensuring maximum WCAG AA text contrast */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#070b14]/95 via-[#080d1a]/90 to-[#070b14]/97 pointer-events-none" 
        aria-hidden="true" 
      />
      {/* Blueprint grid texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px]" 
        aria-hidden="true" 
      />
      {/* Subtle atmospheric orange/amber warmth */}
      <div 
        className="absolute top-1/3 -left-28 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-32 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 z-10">
        
        {/* Section Heading & Eyebrow */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            <span>About The Company</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f2] leading-[1.12]">
            Built on Experience. Driven by Purpose.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            VORTEX brings together skilled builders, designers, and project managers to deliver spaces that are built to perform, made to last, and tailored to each client’s vision.
          </p>
        </div>

        {/* 
          Two-Column Desktop Layout
          - Left: Large architectural/construction image and subtle project-detail visual
          - Right: Company story, mission, statistics, and certifications
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-stretch">
          
          {/* 
            LEFT COLUMN (Desktop):
            Large Architectural Visual Panel with Project-Detail Specs
          */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between space-y-6">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-slate-950 border border-slate-700/70 shadow-2xl shadow-black/80 group h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] flex flex-col justify-between p-6 sm:p-8">
              
              {/* Foreground architectural project visual */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                alt="Architectural modern structure engineered by Vortex Construction"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Protective gradient scrim */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-[#060a12]/50 to-[#060a12]/30 pointer-events-none" 
                aria-hidden="true" 
              />
              
              {/* Subtle blueprint grid overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#fbf8f2_1px,transparent_1px)] [background-size:20px_20px]" 
                aria-hidden="true" 
              />

              {/* Top Architectural Spec Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-200 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>PROJECT DETAIL // SPEC 042</span>
                </div>

                <div className="px-2.5 py-1 rounded-md bg-amber-500/90 text-stone-950 text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                  TOLERANCE ±1.5MM
                </div>
              </div>

              {/* Center Focal Stamp */}
              <div className="relative z-10 my-auto py-6">
                <div className="max-w-xs p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-xl">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-1">
                    <Compass className="w-4 h-4" />
                    <span>Architectural Precision</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Exposed structural concrete, mass-timber joints, and seamless thermal envelope glazing executed to the highest standard.
                  </p>
                </div>
              </div>

              {/* Bottom Project Detail Card */}
              <div className="relative z-10 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-4 sm:p-5 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                    Site Field Engineering
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Est. 1999
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#fbf8f2] tracking-tight">
                  The Obsidian Pavilion Build
                </h4>
                <p className="mt-1 text-xs text-slate-300">
                  Cantilevered reinforced concrete engineered into mountain bedrock with zero structural deflection.
                </p>
              </div>

            </div>
          </div>

          {/* 
            RIGHT COLUMN (Desktop):
            Experience Stats, Mission Statement, Certifications, and CTA
          */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-8 lg:space-y-10">
            
            {/* 
              1. EXPERIENCE AREA:
              “Over 25 Years of Construction Expertise” + 4 Stats
            */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/90 pb-3 mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#fbf8f2] tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Over 25 Years of Construction Expertise</span>
                </h3>
                <span className="hidden sm:inline text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Proven Track Record
                </span>
              </div>

              {/* 4 Stats Grid with Clean Concrete Spacing */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {STATS.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="relative rounded-2xl bg-[#0c1220]/80 hover:bg-[#11192a] border border-slate-700/60 p-4 sm:p-5 transition-all duration-200 shadow-md flex flex-col justify-between group"
                  >
                    {/* Top orange notch on hover */}
                    <div className="absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/70 transition-all duration-300" />

                    <div className="text-3xl sm:text-4xl font-extrabold text-[#fbf8f2] group-hover:text-amber-300 font-mono tracking-tight transition-colors">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs font-semibold text-slate-300 leading-snug">
                      {stat.label}
                    </div>
                    <div className="mt-1 text-[10px] font-mono text-slate-400">
                      {stat.note}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 
              2. MISSION AREA:
              Heading: “Our Mission”
              Copy: “To build lasting spaces through quality craftsmanship, transparent collaboration, and a commitment to doing every detail right.”
            */}
            <div className="relative rounded-2xl bg-gradient-to-r from-[#0c1220]/90 via-[#0e1628]/90 to-[#0c1220]/90 border border-slate-700/70 p-6 sm:p-7 shadow-lg">
              {/* Left Orange Accent Notch */}
              <div className="absolute top-4 bottom-4 left-0 w-1 bg-amber-500 rounded-r" />

              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400">
                  Our Mission
                </span>
              </div>

              <blockquote className="text-base sm:text-lg font-medium text-[#fbf8f2] leading-relaxed italic">
                “To build lasting spaces through quality craftsmanship, transparent collaboration, and a commitment to doing every detail right.”
              </blockquote>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>The VORTEX Building Standard</span>
                <span className="font-mono text-amber-400/90">Integrity • Precision • Accountability</span>
              </div>
            </div>

            {/* 
              3. LICENSES & CERTIFICATIONS AREA:
              Heading: “Licensed, Insured, and Certified”
              Display clean badge-style items
            */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/90 pb-3 mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#fbf8f2] tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Licensed, Insured, and Certified</span>
                </h3>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Active & Verified</span>
                </span>
              </div>

              {/* Clean Badge-Style List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CERTIFICATIONS.map((cert) => {
                  const Icon = cert.icon;
                  return (
                    <div
                      key={cert.id}
                      className="rounded-xl bg-[#0c1220]/70 hover:bg-[#11192a] border border-slate-800/80 hover:border-slate-700 p-3.5 sm:p-4 flex items-start gap-3 transition-colors shadow-sm group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 group-hover:border-amber-500/40">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#fbf8f2] truncate">
                            {cert.title}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                            {cert.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {cert.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 
              4. CALL TO ACTION (CTA):
              Text: “Let’s build something exceptional.”
              Primary button: “Meet Our Team”
              Secondary text link: “View Our Credentials”
            */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Ready to Start?
                </span>
                <p className="text-xl sm:text-2xl font-extrabold text-[#fbf8f2] tracking-tight">
                  Let’s build something exceptional.
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  id="about-meet-team-btn"
                  onClick={() => setTeamModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl shadow-amber-950/50 hover:shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Users className="w-4 h-4" />
                  <span>Meet Our Team</span>
                </button>

                <button
                  id="about-view-credentials-link"
                  onClick={() => setCredentialsModalOpen(true)}
                  className="text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors underline underline-offset-4 decoration-slate-600 hover:decoration-amber-400 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Our Credentials</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 
        Interactive Credentials Modal:
        Provides real verification details for licensing, insurance, and green accreditation
      */}
      <AnimatePresence>
        {credentialsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCredentialsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0b101c] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-stone-100 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400">
                    Official Verification
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#fbf8f2]">
                    Licenses, Insurance & Certifications
                  </h3>
                </div>
                <button
                  onClick={() => setCredentialsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close credentials modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#fbf8f2]">State Class-A General Contractor</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Active</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">License #GC-982410-B • Valid through 2028 • Unrestricted Commercial & Residential Building</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#fbf8f2]">Comprehensive Insurance & Surety Bonding</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Underwritten</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">$10,000,000 General Commercial Liability Policy • Travelers Indemnity Syndicate • Full Builder’s Risk & Workers' Comp</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <HardHat className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#fbf8f2]">OSHA 30-Hour Safety & Zero-Harm Program</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Certified</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">100% On-Site Supervisory Compliance • Zero Lost-Time Incidents Record • Certified Rigging & Heavy Lift Qualified</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#fbf8f2]">USGBC & LEED Accredited Builders</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">LEED AP</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">Certified Sustainable Sourcing, Recycled Aggregate Protocol, High-Efficiency Thermal Envelope Specialists</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    setCredentialsModalOpen(false);
                    onOpenInquiry();
                  }}
                  className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Request Official Certificate Pack
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 
        Interactive Meet Our Team Modal:
        Displays key leadership and engineering leads
      */}
      <AnimatePresence>
        {teamModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTeamModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#0b101c] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-stone-100 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400">
                    Leadership & Engineering
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#fbf8f2]">
                    Meet the VORTEX Team
                  </h3>
                </div>
                <button
                  onClick={() => setTeamModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close team modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TEAM_MEMBERS.map((member) => (
                  <div
                    key={member.name}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex gap-4 items-start"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-14 h-14 rounded-xl object-cover border border-amber-500/30 shrink-0"
                    />
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#fbf8f2]">{member.name}</h4>
                      </div>
                      <p className="text-xs text-amber-400 font-medium">{member.role}</p>
                      <span className="inline-block text-[10px] font-mono text-slate-400 mt-0.5">{member.experience}</span>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-slate-400">
                  Backed by 85+ licensed carpenters, concrete specialists, and certified project supervisors.
                </p>
                <button
                  onClick={() => {
                    setTeamModalOpen(false);
                    onOpenInquiry();
                  }}
                  className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Consult With Leadership</span>
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
