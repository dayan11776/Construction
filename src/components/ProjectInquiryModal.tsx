import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Building2, Home, Hammer, Ruler, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  { id: 'residential', label: 'Custom Residential', icon: Home, desc: 'Luxury homes & modern villas' },
  { id: 'commercial', label: 'Commercial & Civic', icon: Building2, desc: 'Offices, retail, mixed-use' },
  { id: 'structural', label: 'Structural Engineering', icon: Ruler, desc: 'Foundations, concrete & mass timber' },
  { id: 'renovation', label: 'Architectural Renovation', icon: Hammer, desc: 'Major structural transformations' },
];

export function ProjectInquiryModal({ isOpen, onClose }: ProjectInquiryModalProps) {
  const [selectedType, setSelectedType] = useState('residential');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    budget: '$1M - $3M',
    timeframe: 'Immediate (1-3 months)',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-stone-100 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <span>Project Consultation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-100">
                  Start Your Project
                </h2>
                <p className="text-stone-400 text-sm mt-1">
                  Connect directly with our senior architectural engineering and build team.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Project Category Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Project Scope
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PROJECT_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id)}
                          className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-white'
                              : 'bg-neutral-950/60 border-white/5 text-stone-400 hover:border-white/20'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mt-0.5 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                          <div>
                            <div className="text-xs font-semibold text-stone-200">{type.label}</div>
                            <div className="text-[11px] text-stone-400 leading-tight mt-0.5">{type.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harrison Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="harrison@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Location & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                      Site / Location
                    </label>
                    <input
                      type="text"
                      placeholder="City, State / Region"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                      Target Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option>$500k - $1M</option>
                      <option>$1M - $3M</option>
                      <option>$3M - $8M</option>
                      <option>$8M+ High-Spec Architectural</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Brief Project Details
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about the site, architectural vision, or schedule..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-950/40"
                  >
                    <span>Submit Consultation Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-stone-100">Consultation Received</h3>
              <p className="text-stone-300 text-sm max-w-md mx-auto">
                Thank you, <span className="text-amber-400 font-semibold">{formData.name || 'Client'}</span>. A partner architect and construction lead will review your requirements and reach out within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Return to Site
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
