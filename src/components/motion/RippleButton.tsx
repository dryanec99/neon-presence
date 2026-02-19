import { useState, useCallback } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const RippleButton = ({ children, className = '', onClick, ...props }: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const ripple = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 600);
      onClick?.(e);
    },
    [onClick]
  );

  return (
    <button className={`relative overflow-hidden ${className}`} onClick={handleClick} {...props}>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-foreground/20 animate-[ripple_0.6s_ease-out_forwards] pointer-events-none"
          style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
        />
      ))}
      {children}
    </button>
  );
};

export default RippleButton;
