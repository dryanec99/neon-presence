interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'slant';
  flip?: boolean;
  className?: string;
}

const SectionDivider = ({ variant = 'wave', flip = false, className = '' }: SectionDividerProps) => {
  const paths = {
    wave: 'M0,64 C320,120 640,0 960,64 C1280,128 1600,20 1920,64 L1920,0 L0,0 Z',
    curve: 'M0,96 Q960,0 1920,96 L1920,0 L0,0 Z',
    slant: 'M0,0 L1920,80 L1920,0 L0,0 Z',
  };

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1920 100"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16"
      >
        <path
          d={paths[variant]}
          className="fill-background"
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
