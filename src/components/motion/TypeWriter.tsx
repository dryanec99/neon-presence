import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TypeWriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypeWriter = ({ text, className = '', delay = 0, speed = 0.03 }: TypeWriterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + i * speed, duration: 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default TypeWriter;
