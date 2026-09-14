import React, { useState } from 'react';
import { X, ArrowUpRight, MapPin, Maximize2, Calendar, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FEATURED_PROJECTS } from '../data/projects';
import { PortfolioProject } from '../types';

interface PortfolioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProjectForInquiry?: (projectTitle: string) => void;
}

export function PortfolioDrawer({ isOpen, onClose, onSelectProjectForInquiry }: PortfolioDrawerProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const categories = ['All', ...Array.from(new Set(FEATURED_PROJECTS.map(p => p.category)))];

  const filteredProjects = activeFilter === 'All'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-2xl bg-neutral-950 border-l border-white/10 h-full shadow-2xl z-10 flex flex-col overflow-hidden text-stone-100"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-neutral-900/50">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
                Selected Works
              </div>
              <h2 className="text-xl font-bold tracking-tight text-stone-100 mt-0.5">
                Modern Architectural Portfolio
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close portfolio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="px-6 py-3 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'bg-white/5 text-stone-400 hover:text-stone-200 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl bg-neutral-900/80 border border-white/10 overflow-hidden hover:border-amber-500/40 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                    {project.tag}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-stone-100">{project.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-4 sm:p-5 space-y-3">
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs text-stone-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      <span>Completed {project.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-stone-500" />
                      <span>{project.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-white/10 bg-neutral-900/60 flex items-center justify-between text-xs text-stone-400">
            <span>Viewing {filteredProjects.length} Selected Projects</span>
            <button
              onClick={() => {
                onClose();
                if (onSelectProjectForInquiry) onSelectProjectForInquiry('Portfolio Selection');
              }}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Commission a Similar Build</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
