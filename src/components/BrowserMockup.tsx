import { motion } from 'framer-motion';

interface BrowserMockupProps {
  imageSrc: string;
  title?: string;
  className?: string;
}

const BrowserMockup = ({ imageSrc, title = 'miforgiX-project.dev', className = '' }: BrowserMockupProps) => {
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
              {title}
            </div>
          </div>
          <div className="w-12" />
        </div>
        {/* Content */}
        <div className="relative overflow-hidden">
          <img
            src={imageSrc}
            alt="Project preview"
            className="w-full h-auto object-cover"
            width={1280}
            height={800}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Floating glow effect behind */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-3xl" />
    </motion.div>
  );
};

export default BrowserMockup;
