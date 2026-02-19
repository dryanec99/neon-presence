import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
}

const TextReveal = ({ children, className = '', as: Tag = 'h2', delay = 0 }: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          delay,
        }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
};

export default TextReveal;
