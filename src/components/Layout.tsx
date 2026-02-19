import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SmoothScroll from './motion/SmoothScroll';

const Layout = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        {/* Noise overlay for premium texture */}
        <div className="noise-overlay" aria-hidden="true" />
        <Header />
        <main className="flex-1 pt-16 md:pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Layout;
