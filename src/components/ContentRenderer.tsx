import React from 'react';

interface ContentRendererProps {
  html: string;
  className?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ html, className = '' }) => {
  return (
    <div
      className={`prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-6 prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-li:mb-2 prose-strong:text-gray-900 prose-strong:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default ContentRenderer;