import { useRef, useState } from 'react';

interface MouseGlowCardProps {
  children: React.ReactNode;
  className?: string;
}

const MouseGlowCard = ({ children, className = '' }: MouseGlowCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => setGlowPos((p) => ({ ...p, opacity: 0 }));

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, hsl(152 100% 50% / 0.12), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};

export default MouseGlowCard;
