import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';

interface CTA {
  label: string;
  href: string;
}

interface CTAButtonsProps {
  primary?: CTA;
  secondary?: CTA;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ primary, secondary }) => {
  const handleClick = (href: string) => {
    window.location.href = href;
  };

  if (!primary && !secondary) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6">
      {primary && (
        <button
          onClick={() => handleClick(primary.href)}
          className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Heart className="w-5 h-5 mr-2" />
          {primary.label}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      )}
      
      {secondary && (
        <button
          onClick={() => handleClick(secondary.href)}
          className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 border-2 border-white/30 hover:border-white/50 transform hover:scale-105 transition-all duration-200 backdrop-blur-sm"
        >
          {secondary.label}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      )}
    </div>
  );
};

export default CTAButtons;