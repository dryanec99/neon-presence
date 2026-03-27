import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X, Monitor, Tablet, Smartphone } from 'lucide-react';

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

const DEVICES = [
  { key: 'desktop', icon: Monitor, width: '100%' },
  { key: 'tablet', icon: Tablet, width: '768px' },
  { key: 'mobile', icon: Smartphone, width: '375px' },
] as const;

const BrowserMockup = ({ projects = DEFAULT_PROJECTS, className = '' }: BrowserMockupProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeDevice, setActiveDevice] = useState<string>('desktop');

  useEffect(() => {
    if (previewOpen) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length, previewOpen]);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setPreviewOpen(false);
  }, []);

  useEffect(() => {
    if (previewOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [previewOpen, handleEscape]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + projects.length) % projects.length);
  };

  const activeProject = projects[current];
  const currentWidth = DEVICES.find(d => d.key === activeDevice)?.width || '100%';

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
        className={`relative ${className}`}
      >
        {/* Clean card — no browser chrome */}
        <div className="rounded-2xl overflow-hidden border border-border/30 bg-card/50 backdrop-blur-sm shadow-2xl shadow-black/20">
          {/* Image area */}
          <div
            className="relative overflow-hidden aspect-[16/10] cursor-pointer group"
            onClick={() => setPreviewOpen(true)}
          >
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
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <motion.span
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm tracking-wide shadow-lg shadow-primary/25"
              >
                Click to Preview
              </motion.span>
            </div>

            {/* Nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Info bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-card/80 border-t border-border/20">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{activeProject.title}</p>
                <p className="text-[11px] text-muted-foreground font-mono">{activeProject.url}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === current ? 'bg-primary w-5 h-1.5' : 'bg-muted-foreground/25 w-1.5 h-1.5 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Visit <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Subtle glow */}
        <div className="absolute -inset-8 -z-10 rounded-3xl bg-primary/4 blur-[50px]" />
      </motion.div>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border/20 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-foreground truncate max-w-[200px] md:max-w-none">
                  {activeProject.title}
                </h3>
                <span className="text-xs text-muted-foreground font-mono hidden sm:inline">{activeProject.url}</span>
              </div>

              {/* Device switcher */}
              <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                {DEVICES.map((device) => (
                  <button
                    key={device.key}
                    onClick={() => setActiveDevice(device.key)}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      activeDevice === device.key
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title={device.key}
                  >
                    <device.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Close */}
              <button
                onClick={() => setPreviewOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/15 text-destructive hover:bg-destructive hover:text-white border border-destructive/30 hover:border-destructive font-semibold text-sm transition-all duration-200"
              >
                <X className="w-4 h-4" />
                Close
                <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-destructive/20 border border-destructive/30 font-mono">ESC</kbd>
              </button>
            </div>

            {/* Iframe */}
            <div className="flex-1 flex items-start justify-center overflow-auto p-4 md:p-6">
              <motion.div
                layout
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full rounded-xl overflow-hidden border border-border/20 shadow-2xl bg-white"
                style={{ width: currentWidth, maxWidth: '100%' }}
              >
                <iframe
                  src={activeProject.liveUrl}
                  title={activeProject.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
            </div>

            {/* Mobile floating close */}
            <button
              onClick={() => setPreviewOpen(false)}
              className="fixed top-4 right-4 z-[101] w-12 h-12 rounded-full bg-destructive text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform md:hidden"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BrowserMockup;
