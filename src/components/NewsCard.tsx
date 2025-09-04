import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import type { PageDoc, NewsFrontmatter } from '../types';

interface NewsCardProps {
  newsItem: PageDoc<NewsFrontmatter>;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem }) => {
  const handleClick = () => {
    const formattedDate = format(new Date(newsItem.fm.date), 'yyyy-MM-dd');
    window.location.href = `/news/${formattedDate}-${newsItem.fm.slug}`;
  };

  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6">
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <Calendar className="w-4 h-4 mr-2" />
        {format(new Date(newsItem.fm.date), 'MMMM d, yyyy')}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
        {newsItem.fm.title}
      </h3>
      
      {newsItem.fm.summary && (
        <p className="text-gray-600 mb-4 leading-relaxed">
          {newsItem.fm.summary}
        </p>
      )}
      
      <button
        onClick={handleClick}
        className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
      >
        Read More
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </button>
    </article>
  );
};

export default NewsCard;