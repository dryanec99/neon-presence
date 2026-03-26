import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import TextReveal from '@/components/motion/TextReveal';
import StaggerChildren from '@/components/motion/StaggerChildren';
import MouseGlowCard from '@/components/motion/MouseGlowCard';
import MagneticButton from '@/components/motion/MagneticButton';
import ParallaxLayer from '@/components/motion/ParallaxLayer';

const BLOG_TITLES: Record<string, Record<string, string>> = {
  1: { en: 'How to Choose the Right Web Agency', bg: 'Как да изберете правилната уеб агенция', ru: 'Как выбрать правильное веб-агентство', fr: 'Comment choisir la bonne agence web' },
  2: { en: 'SEO Trends for 2025', bg: 'SEO тенденции за 2025 година', ru: 'SEO тренды на 2025 год', fr: 'Tendances SEO pour 2025' },
  3: { en: 'Why Mobile Experience is Critical', bg: 'Защо мобилното изживяване е критично', ru: 'Почему мобильный опыт критически важен', fr: "Pourquoi l'expérience mobile est essentielle" },
  4: { en: 'E-Commerce Growth Strategies', bg: 'Стратегии за растеж на електронната търговия', ru: 'Стратегии роста электронной торговли', fr: "Stratégies de croissance e-commerce" },
  5: { en: 'UI/UX Design Principles', bg: 'Принципи на UI/UX дизайна', ru: 'Принципы UI/UX дизайна', fr: 'Principes de design UI/UX' },
  6: { en: 'PPC Campaigns - Complete Guide', bg: 'PPC кампании - пълен гайд', ru: 'PPC кампании - полное руководство', fr: 'Campagnes PPC - Guide complet' },
};

const BLOG_EXCERPTS: Record<string, Record<string, string>> = {
  1: { en: 'Learn the key factors when selecting a web development partner.', bg: 'Научете ключовите фактори при избора на партньор за уеб разработка.', ru: 'Узнайте ключевые факторы при выборе партнёра для веб-разработки.', fr: 'Découvrez les facteurs clés pour choisir un partenaire de développement web.' },
  2: { en: "Discover what's new in the world of search engines this year.", bg: 'Открийте какво е ново в света на търсачките тази година.', ru: 'Откройте для себя новинки в мире поисковых систем в этом году.', fr: 'Découvrez les nouveautés dans le monde des moteurs de recherche cette année.' },
  3: { en: "Mobile users are the majority. Here's how to serve them better.", bg: 'Мобилните потребители са мнозинство. Ето как да ги обслужите по-добре.', ru: 'Мобильные пользователи составляют большинство. Вот как лучше их обслуживать.', fr: 'Les utilisateurs mobiles sont majoritaires. Voici comment mieux les servir.' },
  4: { en: 'Practical tips for increasing online sales.', bg: 'Практически съвети за увеличаване на онлайн продажбите.', ru: 'Практические советы для увеличения онлайн-продаж.', fr: 'Conseils pratiques pour augmenter vos ventes en ligne.' },
  5: { en: 'Core principles for creating intuitive interfaces.', bg: 'Основни принципи за създаване на интуитивни интерфейси.', ru: 'Основные принципы создания интуитивных интерфейсов.', fr: 'Principes fondamentaux pour créer des interfaces intuitives.' },
  6: { en: 'Everything you need to know about paid advertising.', bg: 'Всичко, което трябва да знаете за платената реклама.', ru: 'Всё, что нужно знать о платной рекламе.', fr: 'Tout ce que vous devez savoir sur la publicité payante.' },
};

const Blog = () => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'en') as LanguageCode;
  const getLocalizedPath = (path: string) => `/${currentLang}${path ? `/${path}` : ''}`;
  const getTitle = (id: number) => BLOG_TITLES[id]?.[currentLang] || BLOG_TITLES[id]?.en || '';
  const getExcerpt = (id: number) => BLOG_EXCERPTS[id]?.[currentLang] || BLOG_EXCERPTS[id]?.en || '';

  const blogPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop', author: 'Alex Petrov', date: '2025-02-01', readTime: '5 min', category: 'Business' },
    { id: 2, image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop', author: 'Maria Ivanova', date: '2025-01-28', readTime: '7 min', category: 'SEO' },
    { id: 3, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop', author: 'Ivan Georgiev', date: '2025-01-25', readTime: '4 min', category: 'Mobile' },
    { id: 4, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop', author: 'Elena Dimitrova', date: '2025-01-20', readTime: '6 min', category: 'E-Commerce' },
    { id: 5, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop', author: 'Stefan Kolev', date: '2025-01-15', readTime: '8 min', category: 'Design' },
    { id: 6, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop', author: 'Nikolay Todorov', date: '2025-01-10', readTime: '10 min', category: 'Marketing' },
  ];

  return (
    <>
      <SEOHead title={`${t('blog.title')} - MiForgiX Dev`} description={t('blog.subtitle')} />

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h1" className="font-bold mb-6">{t('blog.title')}</TextReveal>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground">
              {t('blog.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Post with Parallax */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="group">
            <div className="bento-item p-0 overflow-hidden grid md:grid-cols-2 gap-0">
              <ParallaxLayer offset={15} className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                <img src={blogPosts[0].image} alt={getTitle(blogPosts[0].id)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </ParallaxLayer>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <span className="text-primary text-sm font-medium mb-3">{blogPosts[0].category}</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{getTitle(blogPosts[0].id)}</h2>
                <p className="text-muted-foreground mb-6">{getExcerpt(blogPosts[0].id)}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1"><User className="w-4 h-4" />{blogPosts[0].author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{blogPosts[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{blogPosts[0].readTime}</span>
                </div>
                <MagneticButton>
                  <button className="btn-primary px-6 py-3 rounded-lg text-sm self-start flex items-center gap-2">
                    {t('blog.readMore')} <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.slice(1).map((post) => (
              <MouseGlowCard key={post.id} className="rounded-2xl">
                <div className="bento-item p-0 overflow-hidden h-full flex flex-col group">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={post.image} alt={getTitle(post.id)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-primary text-xs font-medium mb-2">{post.category}</span>
                    <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{getTitle(post.id)}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">{getExcerpt(post.id)}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </MouseGlowCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h2" className="font-bold mb-6">{t('cta.title')}</TextReveal>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-lg text-muted-foreground mb-10">
              {t('cta.subtitle')}
            </motion.p>
            <MagneticButton>
              <Link to={getLocalizedPath('contact')} className="btn-primary px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group">
                {t('cta.button')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
