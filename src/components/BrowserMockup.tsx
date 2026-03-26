import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + projects.length) % projects.length);
  };

  const activeProject = projects[current];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -6 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 110, delay: 0.4 }}
      className={`relative ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div className="rounded-2xl overflow-hidden border border-[hsl(0,0%,14%)] shadow-[0_20px_60px_-15px_hsl(262,80%,50%,0.15)] bg-[hsl(240,6%,8%)]">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(240,6%,10%)] border-b border-[hsl(0,0%,14%)]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(0,70%,55%)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(45,80%,55%)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(130,50%,45%)]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-lg bg-[hsl(240,6%,14%)] text-[11px] text-[hsl(220,10%,50%)] font-mono truncate max-w-[220px] flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(130,50%,45%,0.6)]" />
              {activeProject.url}
            </div>
          </div>
          <span className="text-[10px] text-[hsl(220,10%,35%)] font-mono tabular-nums">
            {current + 1}/{projects.length}
          </span>
        </div>

        {/* Screenshot area */}
        <div className="relative overflow-hidden aspect-[16/10]">
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
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
              width={1280}
              height={960}
            />
          </AnimatePresence>

          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-[hsl(240,6%,4%)] via-[hsl(240,6%,4%,0.7)] to-transparent flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{activeProject.title}</p>
              <p className="text-[10px] text-[hsl(220,10%,45%)] font-mono">{activeProject.url}</p>
            </div>
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 font-medium transition-colors bg-[hsl(240,6%,12%)] px-3 py-1.5 rounded-lg border border-[hsl(0,0%,18%)] hover:border-primary/30"
            >
              Visit <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[hsl(240,6%,8%,0.8)] backdrop-blur-sm border border-[hsl(0,0%,18%)] flex items-center justify-center text-white/70 hover:text-white hover:border-primary/30 transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[hsl(240,6%,8%,0.8)] backdrop-blur-sm border border-[hsl(0,0%,18%)] flex items-center justify-center text-white/70 hover:text-white hover:border-primary/30 transition-all"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 py-2.5 bg-[hsl(240,6%,8%)] border-t border-[hsl(0,0%,12%)]">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-primary w-6' : 'bg-[hsl(220,10%,25%)] w-1.5 hover:bg-[hsl(220,10%,40%)]'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-primary/8 blur-[40px]" />
    </motion.div>
  );
};

export default BrowserMockup;
