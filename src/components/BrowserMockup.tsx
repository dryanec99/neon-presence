import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Eye } from 'lucide-react';
import PreviewModal from './PreviewModal';

import femmeImg from '@/assets/projects/femme-wardrobe.jpg';
import dnkImg from '@/assets/projects/dnk-store.jpg';
import smileImg from '@/assets/projects/smilepro-dental.jpg';
import nexusImg from '@/assets/projects/nexus-digital.jpg';

interface Project {
  title: string;
  url: string;
  liveUrl: string;
  image: string;
}

interface BrowserMockupProps {
  projects?: Project[];
  className?: string;
}

const DEFAULT_PROJECTS: Project[] = [
  { title: 'Femme Wardrobe', url: 'femme-wardrobe.bg', liveUrl: 'https://femme-wardrobe.bg', image: femmeImg },
  { title: 'DNK Store', url: 'dnk-store.bg', liveUrl: 'https://dnk-store.bg', image: dnkImg },
  { title: 'SmilePro Dental', url: 'smilepro-clinic.bg', liveUrl: 'https://smilepro-clinic.bg', image: smileImg },
  { title: 'NEXUS Digital', url: 'nexus-digital.bg', liveUrl: 'https://nexus-digital.bg', image: nexusImg },
];

const BrowserMockup = ({ projects = DEFAULT_PROJECTS, className = '' }: BrowserMockupProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (previewOpen) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length, previewOpen]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + projects.length) % projects.length);
  };

  const activeProject = projects[current];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 110, delay: 0.4 }}
        className={`relative group ${className}`}
      >
        {/* Main card */}
        <div className="rounded-2xl overflow-hidden border border-border/40 bg-card shadow-2xl shadow-primary/5">
          {/* Minimal top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-background/80 border border-border/30">
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                <span className="text-[11px] text-muted-foreground font-mono truncate max-w-[160px]">
                  {activeProject.url}
                </span>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground/60 font-mono tabular-nums">
              {current + 1}/{projects.length}
            </span>
          </div>

          {/* Image area */}
          <div className="relative overflow-hidden aspect-[16/10] bg-background cursor-pointer" onClick={() => setPreviewOpen(true)}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.img
                key={current}
                src={activeProject.image}
                alt={activeProject.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
                width={1280}
                height={960}
              />
            </AnimatePresence>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30"
              >
                <Eye className="w-4 h-4" />
                Preview
              </motion.div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-background via-background/70 to-transparent flex items-end justify-between pointer-events-none">
              <div>
                <p className="text-sm font-semibold text-foreground">{activeProject.title}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{activeProject.url}</p>
              </div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom bar with dots + visit */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-t border-border/30">
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-primary w-6' : 'bg-muted-foreground/25 w-1.5 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Visit <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Glow */}
        <div className="absolute -inset-6 -z-10 rounded-3xl bg-primary/5 blur-[40px]" />
      </motion.div>

      {/* Preview Modal */}
      <PreviewModal
        url={activeProject.liveUrl}
        title={activeProject.title}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
};

export default BrowserMockup;
