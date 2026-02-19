import { motion, useInView } from 'framer-motion';
import { useRef, Children, cloneElement, isValidElement } from 'react';

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

const childVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 180,
      delay: i * 0.05,
    },
  }),
};

const StaggerChildren = ({ children, className = '', staggerDelay = 0.05 }: StaggerChildrenProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        return (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  damping: 25,
                  stiffness: 180,
                  delay: i * staggerDelay,
                },
              },
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

export default StaggerChildren;
