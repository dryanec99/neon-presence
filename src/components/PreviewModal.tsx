import { useState } from 'react';
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

  if (!open) return null;

  const currentWidth = DEVICES.find(d => d.key === activeDevice)?.width || '100%';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
        >
          {/* Control Bar */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border glass">
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

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Iframe Container */}
          <div className="flex-1 flex items-start justify-center overflow-auto p-4 md:p-6">
            <motion.div
              layout
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full rounded-xl overflow-hidden border border-border shadow-elevated bg-background"
              style={{
                width: currentWidth,
                maxWidth: '100%',
              }}
            >
              <iframe
                src={url}
                title={title}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewModal;
