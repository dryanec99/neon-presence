import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineStep {
  num: string;
  title: string;
  desc: string;
}

const TimelineItem = ({ step, index }: { step: TimelineStep; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', damping: 20, stiffness: 200, delay: index * 0.15 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-black z-10 transition-colors duration-500 ${
            isInView
              ? 'bg-primary text-primary-foreground border-2 border-primary shadow-[0_0_20px_hsl(262_100%_62%/0.3)]'
              : 'bg-card text-muted-foreground border-2 border-border'
          }`}
        >
          <span className="text-accent">{step.num}</span>
        </motion.div>
        {index < 2 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            className="w-0.5 flex-1 origin-top bg-gradient-to-b from-primary/50 to-border min-h-[60px]"
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ type: 'spring', damping: 25, stiffness: 180, delay: index * 0.15 + 0.1 }}
        className={`pb-12 flex-1 p-6 rounded-2xl border-2 transition-all duration-500 ${
          isInView
            ? 'border-primary/30 bg-primary/5'
            : 'border-border bg-card'
        }`}
      >
        <h3 className={`text-lg font-bold mb-2 transition-colors duration-500 ${
          isInView ? 'text-primary' : 'text-foreground'
        }`}>
          {step.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
      </motion.div>
    </div>
  );
};

const ScrollTimeline = ({ steps }: { steps: TimelineStep[] }) => {
  return (
    <div className="max-w-2xl mx-auto">
      {steps.map((step, i) => (
        <TimelineItem key={step.num} step={step} index={i} />
      ))}
    </div>
  );
};

export default ScrollTimeline;
