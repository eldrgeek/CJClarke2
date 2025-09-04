import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { PageDoc, IssueFrontmatter } from '../types';

interface IssueCardProps {
  issue: PageDoc<IssueFrontmatter>;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const handleClick = () => {
    window.location.href = `/issues/${issue.fm.slug}`;
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {issue.fm.hero?.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={issue.fm.hero.image}
            alt={issue.fm.hero.alt || issue.fm.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {issue.fm.title}
          </h3>
          {issue.fm.priority && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
              Priority {issue.fm.priority}
            </span>
          )}
        </div>
        
        {issue.fm.summary && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {issue.fm.summary}
          </p>
        )}
        
        <button
          onClick={handleClick}
          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
        >
          Learn More
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default IssueCard;