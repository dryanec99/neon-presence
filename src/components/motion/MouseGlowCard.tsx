import { useRef, useState } from 'react';

interface MouseGlowCardProps {
  children: React.ReactNode;
  className?: string;
}

const MouseGlowCard = ({ children, className = '' }: MouseGlowCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0, opacity: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setGlowPos({ x, y, opacity: 1 });
    setTilt({
      rotateX: ((y - centerY) / centerY) * -6,
      rotateY: ((x - centerX) / centerX) * 6,
    });
  };

  const handleMouseLeave = () => {
    setGlowPos((p) => ({ ...p, opacity: 0 }));
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-500 z-10"
          style={{
            opacity: glowPos.opacity,
            background: `radial-gradient(500px circle at ${glowPos.x}px ${glowPos.y}px, hsl(var(--primary) / 0.1), transparent 50%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default MouseGlowCard;
