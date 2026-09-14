import { useState, type FormEvent } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  Building,
  Compass,
  Lock,
  ArrowUp
} from 'lucide-react';
import { motion } from 'motion/react';

interface ContactSectionProps {
  onOpenPortfolio?: () => void;
  onOpenLocation?: () => void;
}

const CONTACT_BG_IMAGE = 'https://res.cloudinary.com/hjftuhnr/image/upload/v1789027291/Codex_Image_Sep_10_2026_03_55_24_PM.png';

const PROJECT_TYPES = [
  'Residential Construction',
  'Commercial Construction',
  'Renovation & Remodeling',
  'Design-Build',
  'Other',
];

const BUDGET_RANGES = [
  'Select estimated range...',
  '$150,000 - $350,000 (Renovations / Light Builds)',
  '$350,000 - $750,000 (Custom Residences / Medium Fit-Outs)',
  '$750,000 - $2,000,000 (Flagship Estates / Commercial Floors)',
  '$2,000,000+ (Institutional / Multi-Story Structures)',
  'Undetermined / Feasibility Phase',
];

const TIMELINE_OPTIONS = [
  'Select preferred start...',
  'Immediate (Next 30 days)',
  '1 - 3 Months',
  '3 - 6 Months',
  'Planning & Permitting Phase',
];

const SERVICE_REGIONS = [
  { name: 'Makati CBD & Bel-Air', status: 'Active Deployments', count: '12 Sites' },
  { name: 'Bonifacio Global City (BGC)', status: 'Active Deployments', count: '18 Sites' },
  { name: 'New Manila & Quezon City', status: 'Active Deployments', count: '9 Sites' },
  { name: 'Alabang & Cavite Corridor', status: 'Active Deployments', count: '14 Sites' },
];

export function ContactSection({ onOpenPortfolio, onOpenLocation }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'Residential Construction',
    projectLocation: '',
    estimatedBudget: BUDGET_RANGES[2],
    preferredStartDate: TIMELINE_OPTIONS[2],
    projectDetails: '',
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Please enter a valid email address';
    if (!formData.phone.trim()) errors.phone = 'Please enter a valid telephone number';
    if (!formData.consent) errors.consent = 'Consent is required to proceed with your inquiry';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      projectType: 'Residential Construction',
      projectLocation: '',
      estimatedBudget: BUDGET_RANGES[2],
      preferredStartDate: TIMELINE_OPTIONS[2],
      projectDetails: '',
      consent: true,
    });
  };

  return (
    <section 
      id="contact-section"
      className="relative w-full bg-[#070a12] text-[#fbf8f2] pt-20 sm:pt-28 lg:pt-32 pb-12 overflow-hidden border-t border-slate-800/80 select-none scroll-mt-16 sm:scroll-mt-20"
    >
      {/* 
        Background Layer using provided reference image
        Layered with dark charcoal-navy gradient and blueprint matrix
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transform scale-105"
        style={{ backgroundImage: `url(${CONTACT_BG_IMAGE})` }}
        aria-hidden="true"
      />
      
      {/* Dark protective backdrop tint ensuring maximum WCAG AA text contrast */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#070a12]/98 via-[#080d1a]/95 to-[#04060a]/99 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Blueprint grid texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px]" 
        aria-hidden="true" 
      />

      {/* Ambient warm orange and cool steel lighting accents */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-1/3 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 z-10">
        
        {/* Section Heading & Eyebrow */}
        <div className="max-w-3xl text-left mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Consultation & Feasibility</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f2] leading-[1.12]">
            Let’s Build Something Exceptional.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            Tell us about your project, and our team will get back to you to discuss the next steps.
          </p>
        </div>

        {/* 
          Main Two-Column Layout:
          - Left: Contact details, service-area information, project inquiry message, call button
          - Right: Polished project inquiry form with subtle grid texture, rounded fields, orange focus states
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch mb-20">
          
          {/* LEFT COLUMN: Contact Details & Service Area Information (5 columns) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Project Inquiry Message Card */}
            <div className="rounded-3xl bg-[#0c1220]/90 border border-slate-700/60 p-6 sm:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2.5 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Compass className="w-4 h-4" />
                <span>Architectural Partnership</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                Whether you are planning a ground-up residential estate, a modern commercial fit-out, or a complex structural renovation, our licensed engineers and project directors provide transparent estimations, site inspections, and turnkey delivery.
              </p>

              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Direct Contractor Access</span>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                  No Broker Markups
                </span>
              </div>
            </div>

            {/* Structured Contact Details */}
            <div className="rounded-3xl bg-[#0c1220]/90 border border-slate-700/60 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800/80">
                Direct Contact Information
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/70 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Telephone & WhatsApp</span>
                  <a 
                    href="tel:+18005552845" 
                    className="text-base sm:text-lg font-bold text-[#fbf8f2] hover:text-amber-400 transition-colors"
                  >
                    +1 (800) 555-BUILD
                  </a>
                  <span className="text-xs text-slate-400 block mt-0.5">Regional Direct: +63 (2) 8876-2400</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/70 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Project Estimation Inquiries</span>
                  <a 
                    href="mailto:inquiries@vortexconstruction.com" 
                    className="text-sm sm:text-base font-bold text-[#fbf8f2] hover:text-amber-400 transition-colors break-all"
                  >
                    inquiries@vortexconstruction.com
                  </a>
                  <span className="text-xs text-slate-400 block mt-0.5">Tenders & RFPs: bids@vortexconstruction.com</span>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/70 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Building className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Office & Design Studio</span>
                    {onOpenLocation && (
                      <button
                        type="button"
                        onClick={onOpenLocation}
                        className="text-[10px] font-mono font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer transition-colors bg-orange-500/10 hover:bg-orange-500/20 px-2 py-0.5 rounded-full border border-orange-500/30"
                        title="Open Location & Directions"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>View Directions</span>
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-[#fbf8f2] font-medium leading-snug mt-1">
                    SM City Bacoor
                  </p>
                  <span className="text-xs text-slate-400 block mt-0.5">Tirona Hwy corner Emilio Aguinaldo Hwy, Bacoor, Cavite 4102</span>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/70 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Business & Estimating Hours</span>
                  <p className="text-xs sm:text-sm text-[#fbf8f2] font-semibold">
                    Monday – Friday: 8:00 AM – 6:00 PM (PHT)
                  </p>
                  <span className="text-xs text-slate-400 block mt-0.5">Saturday: 9:00 AM – 2:00 PM (By Consultation)</span>
                </div>
              </div>

              {/* Call Us Now Secondary Button */}
              <div className="pt-2">
                <a
                  href="tel:+18005552845"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400 text-stone-100 hover:text-amber-400 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md group"
                >
                  <Phone className="w-4 h-4 text-amber-400 transition-transform group-hover:scale-110" />
                  <span>Call Us Now: (800) 555-BUILD</span>
                </a>
              </div>
            </div>

            {/* Service-Area Illustration Card */}
            <div className="rounded-3xl bg-[#0c1220]/90 border border-slate-700/60 p-6 sm:p-7 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    Primary Service Regions
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Active Hubs</span>
                </span>
              </div>

              {/* Stylized Architectural Radar Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {SERVICE_REGIONS.map((region, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#fbf8f2] mb-1">
                      <span className="truncate">{region.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{region.count}</span>
                      <span className="text-amber-400/90 font-medium">On-Site</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 font-normal leading-relaxed mt-2">
                Available for major turnkey commercial developments and high-end residential builds across regional island hubs upon feasibility review.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Polished Project Inquiry Form (7 columns) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#0d1424]/95 via-[#0b101c]/95 to-[#080d1a]/95 border border-slate-700/70 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/80 backdrop-blur-md flex-1 flex flex-col justify-between">
              
              {/* Top Subtle Amber Line */}
              <div className="absolute top-0 inset-x-10 h-[2px] bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />

              {/* Blueprint Grid pattern inside card */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] rounded-3xl" 
                aria-hidden="true" 
              />

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-4 text-center space-y-6 flex-1 flex flex-col items-center justify-center my-auto"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#fbf8f2] tracking-tight">
                      Inquiry Received Successfully
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Thank you, <span className="text-amber-400 font-bold">{formData.fullName}</span>. Your project brief has been assigned to our senior estimating team. We will review site viability and reach out to you within 24 business hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left max-w-md mx-auto space-y-2 text-xs font-mono text-slate-300">
                    <div className="flex justify-between pb-1 border-b border-slate-800">
                      <span className="text-slate-500">Project Type:</span>
                      <span className="text-amber-400 font-semibold">{formData.projectType}</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-slate-800">
                      <span className="text-slate-500">Contact Email:</span>
                      <span className="text-slate-200">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Budget:</span>
                      <span className="text-slate-200 truncate max-w-[200px]">{formData.estimatedBudget}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6 flex-1 flex flex-col justify-between">
                  
                  <div className="border-b border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#fbf8f2] tracking-tight">
                        Project Consultation Request
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Fill out the fields below for a preliminary timeline and structural scope evaluation.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 self-start sm:self-auto shrink-0">
                      Confidential
                    </span>
                  </div>

                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-full-name" className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
                        Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="contact-full-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g., Jonathan Mercer"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-stone-100 text-sm placeholder-slate-500 outline-none transition-all shadow-inner"
                      />
                      {formErrors.fullName && (
                        <span className="text-xs text-rose-400 mt-1 block font-mono">{formErrors.fullName}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g., client@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-stone-100 text-sm placeholder-slate-500 outline-none transition-all shadow-inner"
                      />
                      {formErrors.email && (
                        <span className="text-xs text-rose-400 mt-1 block font-mono">{formErrors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
                        Phone Number <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g., +1 (555) 019-2834"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-stone-100 text-sm placeholder-slate-500 outline-none transition-all shadow-inner"
                      />
                      {formErrors.phone && (
                        <span className="text-xs text-rose-400 mt-1 block font-mono">{formErrors.phone}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-project-type" className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
                        Project Type <span className="text-amber-400">*</span>
                      </label>
                      <select
                        id="contact-project-type"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-stone-100 text-sm outline-none transition-all shadow-inner cursor-pointer"
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type} className="bg-slate-900 text-stone-100">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Project Location & Estimated Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-location" className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
                        Project Location
                      </label>
                      <input
                        id="contact-location"
                        type="text"
                        value={formData.projectLocation}
                        onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                        placeholder="e.g., Forbes Park, Makati City"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-stone-100 text-sm placeholder-slate-500 outline-none transition-all shadow-inner"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
                        Estimated Budget
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.estimatedBudget}
                        onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-stone-100 text-sm outline-none transition-all shadow-inner cursor-pointer"
                      >
                        {BUDGET_RANGES.map((b, idx) => (
                          <option key={idx} value={b} className="bg-slate-900 text-stone-100">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Preferred Start Date */}
                  <div>
                    <label htmlFor="contact-timeline" className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
                      Preferred Start Date
                    </label>
                    <select
                      id="contact-timeline"
                      value={formData.preferredStartDate}
                      onChange={(e) => setFormData({ ...formData, preferredStartDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-stone-100 text-sm outline-none transition-all shadow-inner cursor-pointer"
                    >
                      {TIMELINE_OPTIONS.map((t, idx) => (
                        <option key={idx} value={t} className="bg-slate-900 text-stone-100">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 5: Tell Us About Your Project */}
                  <div className="flex-1 flex flex-col min-h-[140px]">
                    <label htmlFor="contact-details" className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
                      Tell Us About Your Project
                    </label>
                    <textarea
                      id="contact-details"
                      rows={5}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Share details regarding architectural plans, square footage, structural aspirations, or site conditions..."
                      className="w-full flex-1 min-h-[120px] lg:min-h-[140px] px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-stone-100 text-sm placeholder-slate-500 outline-none transition-all shadow-inner resize-none"
                    />
                  </div>

                  {/* Row 6: Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        id="contact-consent-checkbox"
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400/50 bg-slate-900"
                      />
                      <span className="text-xs text-slate-300 leading-relaxed">
                        I agree to be contacted about my inquiry. We respect your privacy and will never share your contact details.
                      </span>
                    </label>
                    {formErrors.consent && (
                      <span className="text-xs text-rose-400 mt-1 block font-mono">{formErrors.consent}</span>
                    )}
                  </div>

                  {/* Reassurance Message & Submit Button */}
                  <div className="pt-2 space-y-4">
                    {/* Short reassurance message */}
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Your inquiry is confidential. We’ll respond within 24 business hours.</span>
                    </div>

                    <button
                      id="submit-consultation-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 rounded-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-600/50 text-stone-950 font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-amber-950/60 hover:shadow-amber-500/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-stone-950 border-t-transparent animate-spin" />
                          <span>Transmitting Project Brief...</span>
                        </span>
                      ) : (
                        <>
                          <span>Request a Consultation</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
