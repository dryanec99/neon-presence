import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreviewModalProps {
  url: string;
  title: string;
  open: boolean;
  onClose: () => void;
}

const DEVICES = [
  { key: 'desktop', icon: Monitor, width: '100%', label: 'Desktop' },
  { key: 'tablet', icon: Tablet, width: '768px', label: 'Tablet' },
  { key: 'mobile', icon: Smartphone, width: '375px', label: 'Mobile' },
] as const;

const PreviewModal = ({ url, title, open, onClose }: PreviewModalProps) => {
  const { t } = useTranslation();
  const [activeDevice, setActiveDevice] = useState<string>('desktop');

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  const currentWidth = DEVICES.find(d => d.key === activeDevice)?.width || '100%';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[hsl(240,6%,4%,0.97)] backdrop-blur-md flex flex-col"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-[hsl(0,0%,14%)] bg-[hsl(240,6%,8%)]">
            <h3 className="text-sm font-semibold text-foreground truncate max-w-[200px] md:max-w-none">
              {title}
            </h3>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              {DEVICES.map((device) => (
                <button
                  key={device.key}
                  onClick={() => setActiveDevice(device.key)}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    activeDevice === device.key
                      ? 'bg-primary text-primary-foreground shadow-[0_0_12px_hsl(152_100%_50%/0.4)]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={device.label}
                >
                  <device.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Close button - prominent */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30 hover:border-red-500 font-semibold text-sm transition-all duration-200"
            >
              <X className="w-4 h-4" />
              Close
              <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/30 font-mono">ESC</kbd>
            </button>
          </div>

          {/* Iframe */}
          <div className="flex-1 flex items-start justify-center overflow-auto p-4 md:p-6">
            <motion.div
              layout
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full rounded-xl overflow-hidden border border-[hsl(0,0%,14%)] shadow-[0_0_60px_-15px_hsl(0,0%,0%,0.5)] bg-background"
              style={{ width: currentWidth, maxWidth: '100%' }}
            >
              <iframe
                src={url}
                title={title}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </motion.div>
          </div>

          {/* Floating close — always visible */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-[101] w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-[0_0_20px_hsl(0,80%,50%,0.4)] hover:scale-110 transition-transform md:hidden"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewModal;
