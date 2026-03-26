import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import SmoothScroll from './motion/SmoothScroll';
import ScrollProgress from './ScrollProgress';

const Layout = () => {
  const location = useLocation();

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col relative">
        {/* Global floating orbs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="floating-orb floating-orb-1 opacity-50" />
          <div className="floating-orb floating-orb-2 opacity-50" />
          <div className="floating-orb floating-orb-3 opacity-40" />
          <div className="gradient-mesh-animated absolute inset-0 opacity-50" />
        </div>

        <ScrollProgress />
        <Header />
        <main className="flex-1 pt-16 md:pt-20 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Layout;
