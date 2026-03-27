import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X, Monitor, Tablet, Smartphone, ArrowUpRight } from 'lucide-react';

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
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.95 }),
  };

  return (
    <>
      {/* ── Showcase Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 110, delay: 0.4 }}
        className={`relative ${className}`}
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-[1px] rounded-[20px] bg-gradient-to-br from-primary/30 via-transparent to-primary/10 p-[1px]">
          <div className="w-full h-full rounded-[20px] bg-background" />
        </div>

        <div className="relative rounded-[20px] overflow-hidden">
          {/* Image */}
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
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
                width={1280}
                height={960}
              />
            </AnimatePresence>

            {/* Permanent bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <motion.div
                initial={false}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium text-sm shadow-2xl translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <span>Preview</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Project title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between pointer-events-none z-10">
              <div>
                <p className="text-base font-bold text-white tracking-tight drop-shadow-lg">{activeProject.title}</p>
                <p className="text-[11px] text-white/50 font-mono mt-0.5">{activeProject.url}</p>
              </div>
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="pointer-events-auto flex items-center gap-1.5 text-[11px] text-white/70 hover:text-white font-medium transition-colors bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30"
              >
                Visit <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Nav arrows — appear on hover */}
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 duration-300"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 duration-300"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots bar */}
          <div className="flex items-center justify-center gap-2 py-3 bg-background/80 backdrop-blur-sm border-t border-border/10">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`rounded-full transition-all duration-400 ${
                  i === current
                    ? 'bg-primary w-7 h-2 shadow-[0_0_8px_hsl(var(--primary)/0.5)]'
                    : 'bg-muted-foreground/20 w-2 h-2 hover:bg-muted-foreground/40'
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Background glow */}
        <div className="absolute -inset-10 -z-10 rounded-3xl bg-primary/5 blur-[60px]" />
      </motion.div>

      {/* ── Premium Preview Modal ── */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col"
            onClick={() => setPreviewOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />

            {/* Content — prevent click-through */}
            <div className="relative z-10 flex flex-col h-full" onClick={(e) => e.stopPropagation()}>
              {/* Top bar */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center justify-between px-5 md:px-8 py-4"
              >
                {/* Project info */}
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{activeProject.title}</h3>
                    <span className="text-[11px] text-white/40 font-mono">{activeProject.url}</span>
                  </div>
                </div>

                {/* Center — Device switcher */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
                  {DEVICES.map((device) => (
                    <button
                      key={device.key}
                      onClick={() => setActiveDevice(device.key)}
                      className={`p-2.5 rounded-lg transition-all duration-300 ${
                        activeDevice === device.key
                          ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]'
                          : 'text-white/40 hover:text-white/70'
                      }`}
                      title={device.key}
                    >
                      <device.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                {/* Close */}
                <motion.button
                  onClick={() => setPreviewOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium text-sm transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                  <kbd className="hidden md:inline text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-white/30">ESC</kbd>
                </motion.button>
              </motion.div>

              {/* Iframe area */}
              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 40, opacity: 0, scale: 0.92 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex items-start justify-center overflow-auto px-4 md:px-8 pb-6"
              >
                <motion.div
                  layout
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-2xl overflow-hidden shadow-[0_0_80px_-20px_hsl(var(--primary)/0.15),0_25px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                  style={{ width: currentWidth, maxWidth: '100%' }}
                >
                  <iframe
                    src={activeProject.liveUrl}
                    title={activeProject.title}
                    className="w-full h-full border-0 bg-white"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </motion.div>
              </motion.div>

              {/* Mobile floating close */}
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.3, type: 'spring', damping: 15 }}
                onClick={() => setPreviewOpen(false)}
                className="fixed bottom-6 right-6 z-[101] w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] hover:scale-110 transition-all md:hidden"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BrowserMockup;
