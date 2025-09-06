import React from 'react';

interface HeroProps {
  image?: string;
  alt?: string;
  title: string;
  summary?: string;
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ image, alt, title, summary, children }) => {
  return (
    <div className="relative bg-gradient-to-br from-cj-blue via-cj-blue/90 to-cj-blue/80 text-cj-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {title}
              </h1>
              
              {summary && (
                <p className="text-xl md:text-2xl text-cj-blue-100 leading-relaxed">
                  {summary}
                </p>
              )}
              
              {children}
            </div>

            {/* Image */}
            {image && (
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={image}
                    alt={alt || title}
                    className="w-full h-96 lg:h-[500px] object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-cj-red/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cj-blue/20 rounded-full blur-xl"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;