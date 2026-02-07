import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Page not found
        </p>
        <Link
          to="/en"
          className="btn-primary px-6 py-3 rounded-xl inline-flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
