import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export const SEOHead = ({ title, description }: SEOHeadProps) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Set document language
    document.documentElement.lang = currentLang;

    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // Generate hreflang tags
    const languages = ['en', 'bg', 'ru'];
    const baseUrl = window.location.origin;
    const pathWithoutLang = location.pathname.replace(/^\/(en|bg|ru)/, '') || '/';

    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Add hreflang tags for each language
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${baseUrl}/${lang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
      document.head.appendChild(link);
    });

    // Add x-default hreflang
    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = `${baseUrl}/en${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    document.head.appendChild(xDefaultLink);

    // Cleanup on unmount
    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    };
  }, [currentLang, location.pathname, title, description]);

  return null;
};

export default SEOHead;
