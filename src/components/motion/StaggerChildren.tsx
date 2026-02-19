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
        // Clone the child directly instead of wrapping in a div to preserve grid item classes (col-span, row-span)
        return cloneElement(child as React.ReactElement<any>, {
          initial: { opacity: 0, y: 40, scale: 0.95 },
          animate: isInView
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  damping: 25,
                  stiffness: 180,
                  delay: i * staggerDelay,
                },
              }
            : { opacity: 0, y: 40, scale: 0.95 },
        });
      })}
    </div>
  );
};

export default StaggerChildren;
