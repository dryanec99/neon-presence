import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  title: string;
  url: string;
  image: string;
}

interface BrowserMockupProps {
  projects?: Project[];
  imageSrc?: string;
  title?: string;
  className?: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    title: 'Femme Wardrobe',
    url: 'femme-wardrobe.bg',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
  },
  {
    title: 'DNK Store',
    url: 'dnk-store.bg',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  },
  {
    title: 'SmilePro Dental',
    url: 'smilepro-clinic.bg',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
  },
  {
    title: 'NEXUS Digital',
    url: 'nexus-digital.bg',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
];

const BrowserMockup = ({ projects = DEFAULT_PROJECTS, imageSrc, title = 'miforgiX-project.dev', className = '' }: BrowserMockupProps) => {
  const isSingle = !!imageSrc;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-rotate every 4s
  useEffect(() => {
    if (isSingle) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % projects.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [projects.length, isSingle]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + projects.length) % projects.length);
  };

  const activeProject = isSingle ? { title, url: title, image: imageSrc! } : projects[current];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 120, delay: 0.4 }}
      className={`relative ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Browser chrome */}
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
          {!isSingle && (
            <div className="text-xs text-muted-foreground font-medium">
              {current + 1}/{projects.length}
            </div>
          )}
        </div>

        {/* Content with slide animation */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.img
              key={isSingle ? 'single' : current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              src={activeProject.image}
              alt={activeProject.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/30 via-transparent to-transparent pointer-events-none" />

          {/* Project name overlay */}
          {!isSingle && (
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-background/90 to-transparent">
              <p className="text-sm font-semibold text-foreground">{activeProject.title}</p>
            </div>
          )}

          {/* Navigation arrows */}
          {!isSingle && (
            <>
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
            </>
          )}
        </div>

        {/* Dots indicator */}
        {!isSingle && (
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
        )}
      </div>

      {/* Floating glow effect behind */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-3xl" />
    </motion.div>
  );
};

export default BrowserMockup;
