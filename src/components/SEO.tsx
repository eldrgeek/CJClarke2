import React from 'react';
import type { BaseFrontmatter } from '../types';

interface SEOProps {
  frontmatter: BaseFrontmatter;
  baseUrl?: string;
}

const SEO: React.FC<SEOProps> = ({ frontmatter, baseUrl = 'https://example.org' }) => {
  const seoTitle = frontmatter.seo?.title || frontmatter.title;
  const seoDescription = frontmatter.seo?.description || frontmatter.summary || '';
  const seoImage = frontmatter.seo?.image || frontmatter.hero?.image || `${baseUrl}/og-default.jpg`;
  
  React.useEffect(() => {
    // Set document title with language-specific suffix
    const isSpanish = frontmatter.lang === 'es';
    const titleSuffix = isSpanish
      ? ' - CJ Clark para el Concejo Municipal de Sheridan'
      : ' - CJ Clark for Sheridan City Council';
    document.title = seoTitle + titleSuffix;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoDescription);

    // Set language
    document.documentElement.lang = frontmatter.lang || 'en';
    
    // Set Open Graph tags
    const ogTags = [
      { property: 'og:title', content: seoTitle },
      { property: 'og:description', content: seoDescription },
      { property: 'og:image', content: seoImage },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'CJ Clark for Sheridan City Council' }
    ];
    
    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Set Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoTitle },
      { name: 'twitter:description', content: seoDescription },
      { name: 'twitter:image', content: seoImage }
    ];
    
    twitterTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Add structured data for Person schema
    if (frontmatter.schema?.type === 'Person') {
      const scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (scriptTag) {
        scriptTag.remove();
      }
      
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        ...frontmatter.schema.data
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [frontmatter, seoTitle, seoDescription, seoImage, baseUrl]);

  return null;
};

export default SEO;