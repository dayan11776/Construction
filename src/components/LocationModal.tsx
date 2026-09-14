import { useState, useEffect } from 'react';
import { X, MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DESTINATION_NAME = 'SM City Bacoor';
const DESTINATION_ADDRESS = 'Tirona Highway corner Emilio Aguinaldo Highway, Bacoor, Cavite 4102, Philippines';
const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  'SM City Bacoor, Tirona Highway corner Emilio Aguinaldo Highway, Bacoor, Cavite, Philippines'
)}`;

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle address copy to clipboard
  const handleCopyAddress = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(DESTINATION_ADDRESS);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = DESTINATION_ADDRESS;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-modal-title"
        >
          {/* Backdrop with soft dark overlay & blurred page background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card - Desktop width approx 600px; full-width bottom sheet on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className="relative w-full sm:max-w-[600px] bg-[#fcfbf9] text-stone-900 rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-black/60 border border-stone-200/90 z-10 overflow-hidden my-0 sm:my-auto max-sm:mt-auto max-sm:max-h-[92vh] max-sm:flex max-sm:flex-col"
          >
            {/* Top Accent Construction-Orange Stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500" />

            {/* Close Button in Upper-Right Corner */}
            <button
              id="close-location-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/70 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Close location dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 max-sm:overflow-y-auto">
              
              {/* Header */}
              <div className="flex items-start gap-3.5 mb-5 pr-8">
                {/* Small Orange Location-Pin Icon Badge */}
                <div className="h-10 w-10 rounded-2xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-600 shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 fill-orange-500/20 text-orange-600" />
                </div>

                <div>
                  <h2 
                    id="location-modal-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-sans"
                  >
                    Visit Our Location
                  </h2>
                  <p className="text-sm text-stone-600 mt-0.5 font-medium">
                    Find us at <span className="text-stone-900 font-semibold">{DESTINATION_NAME}</span>.
                  </p>
                </div>
              </div>

              {/* Map Area: Light, simplified street-map style panel inspired by the reference image */}
              <div className="relative rounded-2xl bg-[#eef1f5] border border-stone-200/90 overflow-hidden shadow-inner mb-6">
                
                {/* Visual SVG Map Render matching the provided reference perspective */}
                <div className="relative w-full h-[230px] sm:h-[260px] bg-[#edf1f5] select-none overflow-hidden">
                  
                  {/* Vector Map Graphic */}
                  <svg
                    viewBox="0 0 600 300"
                    className="w-full h-full object-cover"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Perspective gradient for street surface */}
                      <linearGradient id="mapBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f4f6f8" />
                        <stop offset="50%" stopColor="#edf0f4" />
                        <stop offset="100%" stopColor="#e5e9ef" />
                      </linearGradient>

                      {/* Route line glow */}
                      <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563eb" floodOpacity="0.28" />
                      </filter>

                      {/* Pin Drop Shadow */}
                      <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="170%">
                        <feDropShadow dx="0" dy="5" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.32" />
                      </filter>

                      {/* Pattern for city parcels */}
                      <pattern id="parcelPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <rect width="36" height="36" fill="#e2e7ee" rx="2" opacity="0.65" />
                      </pattern>
                    </defs>

                    {/* Background Base */}
                    <rect width="600" height="300" fill="url(#mapBgGrad)" />

                    {/* Urban Parcel Grid Blocks (Light gray building outlines inspired by reference) */}
                    <g opacity="0.85">
                      {/* Top Left Parcels */}
                      <rect x="25" y="15" width="70" height="60" fill="#e2e7ee" rx="3" />
                      <rect x="105" y="15" width="55" height="60" fill="#dee3eb" rx="3" />
                      <rect x="170" y="15" width="90" height="60" fill="#e2e7ee" rx="3" />
                      <rect x="270" y="15" width="80" height="60" fill="#dbe1ea" rx="3" />
                      <rect x="360" y="15" width="110" height="60" fill="#e2e7ee" rx="3" />
                      <rect x="480" y="15" width="95" height="60" fill="#dee3eb" rx="3" />

                      {/* Mid Section Parcels */}
                      <rect x="25" y="105" width="80" height="55" fill="#dee3eb" rx="3" />
                      <rect x="25" y="170" width="80" height="55" fill="#e2e7ee" rx="3" />
                      
                      <rect x="135" y="105" width="60" height="120" fill="#e1e6ed" rx="3" />
                      <rect x="205" y="105" width="85" height="55" fill="#dee3eb" rx="3" />
                      <rect x="205" y="170" width="85" height="55" fill="#e5e9f0" rx="3" />

                      {/* Center Right Parcels */}
                      <rect x="320" y="105" width="60" height="120" fill="#dee3eb" rx="3" />
                      <rect x="390" y="105" width="75" height="55" fill="#e2e7ee" rx="3" />
                      <rect x="390" y="170" width="75" height="55" fill="#dbe1ea" rx="3" />
                      
                      {/* Destination block (SM City Bacoor Mall Complex) */}
                      <rect x="475" y="105" width="105" height="120" fill="#d9e0ea" rx="4" stroke="#cbd5e1" strokeWidth="1" />
                      {/* Mall footprint detailing */}
                      <rect x="485" y="115" width="85" height="100" fill="#cfd8e5" rx="3" opacity="0.6" />
                      <circle cx="527" cy="165" r="18" fill="#c3cfdd" opacity="0.7" />

                      {/* Bottom row parcels */}
                      <rect x="25" y="255" width="80" height="35" fill="#e2e7ee" rx="2" />
                      <rect x="135" y="255" width="155" height="35" fill="#dee3eb" rx="2" />
                      <rect x="320" y="255" width="145" height="35" fill="#e2e7ee" rx="2" />
                      <rect x="475" y="255" width="105" height="35" fill="#dee3eb" rx="2" />
                    </g>

                    {/* Secondary Local Street Grid Lines */}
                    <g stroke="#ffffff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
                      {/* Top Horizontal Avenue */}
                      <line x1="10" y1="88" x2="590" y2="88" />
                      {/* Bottom Horizontal Street (Tirona Highway corridor) */}
                      <line x1="10" y1="240" x2="590" y2="240" />
                      {/* Left Vertical Street */}
                      <line x1="118" y1="10" x2="118" y2="290" />
                      {/* Mid Vertical Connector (Aguinaldo corridor) */}
                      <line x1="305" y1="10" x2="305" y2="290" />
                      {/* Right Vertical Boulevard */}
                      <line x1="470" y1="10" x2="470" y2="290" />
                    </g>

                    {/* Primary Road Casing / Inner Surface */}
                    <g stroke="#fcfcfd" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="10" y1="88" x2="590" y2="88" />
                      <line x1="10" y1="240" x2="590" y2="240" />
                      <line x1="118" y1="10" x2="118" y2="290" />
                      <line x1="305" y1="10" x2="305" y2="290" />
                      <line x1="470" y1="10" x2="470" y2="290" />
                    </g>

                    {/* Subtle Street Labels on Roads */}
                    <text x="175" y="84" fontSize="9" fill="#94a3b8" fontWeight="600" letterSpacing="0.5">
                      EMILIO AGUINALDO HIGHWAY
                    </text>
                    <text x="145" y="244" fontSize="9" fill="#94a3b8" fontWeight="600" letterSpacing="0.5">
                      TIRONA HIGHWAY
                    </text>
                    <text x="312" y="165" fontSize="8" fill="#94a3b8" fontWeight="500" letterSpacing="0.5" transform="rotate(90 312 165)">
                      AGUINALDO ACCESS
                    </text>

                    {/* 
                      HIGHLIGHTED BLUE ROUTE (From "Your Current Location" to Destination)
                      Following reference image aesthetic: clear street path with 90-degree turn
                    */}
                    {/* Route Background Stroke */}
                    <path
                      d="M 118 88 L 305 88 L 305 240 L 490 240"
                      fill="none"
                      stroke="#93c5fd"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.5"
                    />

                    {/* Vibrant Blue Main Route */}
                    <path
                      d="M 118 88 L 305 88 L 305 240 L 490 240"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#routeGlow)"
                    />

                    {/* Direction Flow Dots along route */}
                    <circle cx="210" cy="88" r="2.5" fill="#ffffff" />
                    <circle cx="305" cy="164" r="2.5" fill="#ffffff" />
                    <circle cx="400" cy="240" r="2.5" fill="#ffffff" />

                    {/* STARTING PIN: Muted gray/blue (Your Current Location) */}
                    <g transform="translate(118, 88)">
                      {/* Cast shadow under pin */}
                      <ellipse cx="0" cy="3" rx="9" ry="3.5" fill="#64748b" opacity="0.35" />

                      {/* Teardrop Pin Body */}
                      <path
                        d="M 0 0 C -10 -15 -14 -22 -14 -31 C -14 -40 -7 -46 0 -46 C 7 -46 14 -40 14 -31 C 14 -22 10 -15 0 0 Z"
                        fill="#475569"
                        filter="url(#pinShadow)"
                      />
                      {/* Inner White Disc (matching reference image) */}
                      <circle cx="0" cy="-31" r="5.5" fill="#ffffff" />
                      <circle cx="0" cy="-31" r="2.5" fill="#2563eb" />
                    </g>

                    {/* DESTINATION PIN: Construction-orange / red (at SM City Bacoor) */}
                    <g transform="translate(490, 240)">
                      {/* Ground shadow under destination pin */}
                      <ellipse cx="0" cy="3" rx="12" ry="4.5" fill="#0f172a" opacity="0.4" />

                      {/* Construction-Orange / Red Teardrop Pin Body */}
                      <path
                        d="M 0 0 C -12 -18 -17 -26 -17 -37 C -17 -47 -9 -55 0 -55 C 9 -55 17 -47 17 -37 C 17 -26 12 -18 0 0 Z"
                        fill="#ea580c"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        filter="url(#pinShadow)"
                      />
                      {/* Inner White Disc (Iconic reference styling) */}
                      <circle cx="0" cy="-37" r="7" fill="#ffffff" />
                      <circle cx="0" cy="-37" r="3" fill="#ea580c" />
                    </g>
                  </svg>

                  {/* STARTING LOCATION BADGE: Upper Left overlay */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-stone-200 shadow-sm flex items-center gap-1.5 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    <span className="text-[11px] font-semibold text-stone-700 tracking-wide font-sans">
                      Your Current Location
                    </span>
                  </div>

                  {/* DESTINATION LABEL BESIDE PIN: Clear map label "SM City Bacoor" */}
                  <div className="absolute bottom-5 right-24 sm:right-28 bg-stone-900/95 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-stone-700 shadow-lg flex items-center gap-2 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold tracking-tight text-white leading-tight">
                        SM City Bacoor
                      </span>
                      <span className="text-[9px] font-mono text-orange-300 uppercase tracking-wider leading-tight">
                        Bacoor, Cavite
                      </span>
                    </div>
                  </div>

                  {/* Route Duration Indicator Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-200/80 shadow-xs flex items-center gap-1.5 text-[11px] font-medium text-stone-600">
                    <Navigation className="w-3 h-3 text-blue-600" />
                    <span>Fastest Route • Cavite Junction</span>
                  </div>
                </div>

                {/* Subtle Map Bottom bar with Google Maps indicator */}
                <div className="bg-white/80 backdrop-blur-xs px-4 py-2 border-t border-stone-200/70 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Interactive Route Preview
                  </span>
                  <span className="font-mono text-[10px] text-stone-400 uppercase">
                    14.4552° N, 120.9482° E
                  </span>
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-stone-50/90 rounded-2xl border border-stone-200/80 p-4 sm:p-5 mb-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-600">
                      Destination
                    </span>
                    <span className="text-[11px] font-mono text-stone-600 bg-stone-200/60 px-2 py-0.5 rounded-full">
                      Cavite 4102
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {DESTINATION_NAME}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {DESTINATION_ADDRESS}
                  </p>

                  <div className="pt-2 border-t border-stone-200/60 flex items-center gap-2 text-xs text-stone-600 font-medium">
                    <Navigation className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Get turn-by-turn directions from your current location.</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Primary Orange Button: Get Directions */}
                <a
                  id="modal-get-directions-btn"
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-orange-600/25 hover:shadow-lg hover:shadow-orange-500/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  <Navigation className="w-4 h-4 fill-white" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                {/* Secondary Text Button: Copy Address */}
                <button
                  id="modal-copy-address-btn"
                  type="button"
                  onClick={handleCopyAddress}
                  className="w-full sm:w-auto py-3 px-5 rounded-full bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-500" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
