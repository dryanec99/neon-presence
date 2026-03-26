import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  url: string;
  liveUrl: string;
}

interface BrowserMockupProps {
  projects?: Project[];
  className?: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    title: 'Femme Wardrobe',
    url: 'femme-wardrobe.bg',
    liveUrl: 'https://femme-wardrobe.bg',
  },
  {
    title: 'DNK Store',
    url: 'dnk-store.bg',
    liveUrl: 'https://dnk-store.bg',
  },
  {
    title: 'SmilePro Dental',
    url: 'smilepro-clinic.bg',
    liveUrl: 'https://smilepro-clinic.bg',
  },
  {
    title: 'NEXUS Digital',
    url: 'nexus-digital.bg',
    liveUrl: 'https://nexus-digital.bg',
  },
];

const BrowserMockup = ({ projects = DEFAULT_PROJECTS, className = '' }: BrowserMockupProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + projects.length) % projects.length);
  };

  const activeProject = projects[current];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 120, delay: 0.4 }}
      className={`relative ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div className="rounded-2xl overflow-hidden border-2 border-border shadow-deep bg-card">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/80 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <div className="w-3 h-3 rounded-full bg-primary/40" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-md bg-background/60 text-xs text-muted-foreground font-mono truncate max-w-[200px]">
              {activeProject.url}
            </div>
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            {current + 1}/{projects.length}
          </div>
        </div>

        {/* Iframe content */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <iframe
                src={activeProject.liveUrl}
                title={activeProject.title}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
                style={{ pointerEvents: 'none' }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/30 via-transparent to-transparent pointer-events-none" />

          {/* Project name + visit link */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-background/90 to-transparent flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{activeProject.title}</p>
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-mono transition-colors"
            >
              Visit <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 py-3 bg-secondary/40 border-t border-border">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating glow */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-3xl" />
    </motion.div>
  );
};

export default BrowserMockup;
