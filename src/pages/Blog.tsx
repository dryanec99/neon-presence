import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;

  const getLocalizedPath = (path: string) => {
    return `/${currentLang}${path ? `/${path}` : ''}`;
  };

  const blogPosts = [
    {
      id: 1,
      title: currentLang === 'bg' 
        ? 'Как да Изберете Правилната Уеб Агенция' 
        : currentLang === 'ru'
        ? 'Как Выбрать Правильное Веб-Агентство'
        : 'How to Choose the Right Web Agency',
      excerpt: currentLang === 'bg'
        ? 'Научете ключовите фактори при избора на партньор за уеб разработка.'
        : currentLang === 'ru'
        ? 'Узнайте ключевые факторы при выборе партнёра для веб-разработки.'
        : 'Learn the key factors when selecting a web development partner.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
      author: 'Alex Petrov',
      date: '2025-02-01',
      readTime: '5 min',
      category: 'Business',
    },
    {
      id: 2,
      title: currentLang === 'bg'
        ? 'SEO Тенденции за 2025 Година'
        : currentLang === 'ru'
        ? 'SEO Тренды на 2025 Год'
        : 'SEO Trends for 2025',
      excerpt: currentLang === 'bg'
        ? 'Открийте какво е ново в света на търсачките тази година.'
        : currentLang === 'ru'
        ? 'Откройте для себя новинки в мире поисковых систем в этом году.'
        : 'Discover what\'s new in the world of search engines this year.',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop',
      author: 'Maria Ivanova',
      date: '2025-01-28',
      readTime: '7 min',
      category: 'SEO',
    },
    {
      id: 3,
      title: currentLang === 'bg'
        ? 'Защо Мобилното Изживяване е Критично'
        : currentLang === 'ru'
        ? 'Почему Мобильный Опыт Критически Важен'
        : 'Why Mobile Experience is Critical',
      excerpt: currentLang === 'bg'
        ? 'Мобилните потребители са мнозинство. Ето как да ги обслужите по-добре.'
        : currentLang === 'ru'
        ? 'Мобильные пользователи составляют большинство. Вот как лучше их обслуживать.'
        : 'Mobile users are the majority. Here\'s how to serve them better.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
      author: 'Ivan Georgiev',
      date: '2025-01-25',
      readTime: '4 min',
      category: 'Mobile',
    },
    {
      id: 4,
      title: currentLang === 'bg'
        ? 'E-Commerce Стратегии за Ръст'
        : currentLang === 'ru'
        ? 'Стратегии Роста E-Commerce'
        : 'E-Commerce Growth Strategies',
      excerpt: currentLang === 'bg'
        ? 'Практически съвети за увеличаване на онлайн продажбите.'
        : currentLang === 'ru'
        ? 'Практические советы для увеличения онлайн-продаж.'
        : 'Practical tips for increasing online sales.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
      author: 'Elena Dimitrova',
      date: '2025-01-20',
      readTime: '6 min',
      category: 'E-Commerce',
    },
    {
      id: 5,
      title: currentLang === 'bg'
        ? 'UI/UX Дизайн Принципи'
        : currentLang === 'ru'
        ? 'Принципы UI/UX Дизайна'
        : 'UI/UX Design Principles',
      excerpt: currentLang === 'bg'
        ? 'Основни принципи за създаване на интуитивни интерфейси.'
        : currentLang === 'ru'
        ? 'Основные принципы создания интуитивных интерфейсов.'
        : 'Core principles for creating intuitive interfaces.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
      author: 'Stefan Kolev',
      date: '2025-01-15',
      readTime: '8 min',
      category: 'Design',
    },
    {
      id: 6,
      title: currentLang === 'bg'
        ? 'PPC Кампании - Пълен Гайд'
        : currentLang === 'ru'
        ? 'PPC Кампании - Полное Руководство'
        : 'PPC Campaigns - Complete Guide',
      excerpt: currentLang === 'bg'
        ? 'Всичко, което трябва да знаете за платената реклама.'
        : currentLang === 'ru'
        ? 'Всё, что нужно знать о платной рекламе.'
        : 'Everything you need to know about paid advertising.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      author: 'Nikolay Todorov',
      date: '2025-01-10',
      readTime: '10 min',
      category: 'Marketing',
    },
  ];

  return (
    <>
      <SEOHead 
        title={`${t('blog.title')} - WebBuilder`}
        description={t('blog.subtitle')}
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
              {t('blog.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="bento-item p-0 overflow-hidden grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <span className="text-primary text-sm font-medium mb-3">{blogPosts[0].category}</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </span>
                </div>
                <button className="btn-primary px-6 py-3 rounded-lg text-sm self-start flex items-center gap-2">
                  {t('blog.readMore')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bento-item p-0 overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-primary text-xs font-medium mb-2">{post.category}</span>
                    <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
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

export default Blog;
