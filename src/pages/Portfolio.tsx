import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;

  const getLocalizedPath = (path: string) => {
    return `/${currentLang}${path ? `/${path}` : ''}`;
  };

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
      description: 'Modern e-commerce solution with advanced filtering and payment integration.',
    },
    {
      id: 2,
      title: 'SaaS Dashboard',
      category: 'UI/UX Design',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      description: 'Analytics dashboard with real-time data visualization.',
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'Mobile Development',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
      description: 'Secure banking application with biometric authentication.',
    },
    {
      id: 4,
      title: 'Restaurant Website',
      category: 'Web Design',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      description: 'Elegant website with online reservations and menu management.',
    },
    {
      id: 5,
      title: 'Fitness Tracker',
      category: 'Mobile App',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      description: 'Health and fitness tracking with social features.',
    },
    {
      id: 6,
      title: 'Real Estate Portal',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      description: 'Property listing platform with virtual tours.',
    },
  ];

  return (
    <>
      <SEOHead 
        title={`${t('portfolio.title')} - WebBuilder`}
        description={t('portfolio.subtitle')}
      />

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('portfolio.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('portfolio.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bento-item p-0 overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <button className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                        {t('portfolio.viewProject')}
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-primary text-xs font-medium mb-2">{project.category}</span>
                    <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-lg text-muted-foreground mb-10">{t('cta.subtitle')}</p>
            <Link
              to={getLocalizedPath('contact')}
              className="btn-primary px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group"
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
