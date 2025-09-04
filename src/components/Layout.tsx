import React from 'react';
import { Heart, Facebook, Instagram, Twitter, Mail } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  lang?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPath, lang = 'en' }) => {
  const navItems = [
    { label: 'Home', href: '/', labelEs: 'Inicio' },
    { label: 'Meet Chris', href: '/meet', labelEs: 'Conoce a Chris' },
    { label: 'Issues', href: '/issues', labelEs: 'Temas' },
    { label: 'News', href: '/news', labelEs: 'Noticias' },
    { label: 'Get Involved', href: '/get-involved', labelEs: 'Participa' },
  ];

  const isSpanish = lang === 'es';

  const handleNavigation = (href: string) => {
    window.location.href = href;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center space-x-2 text-xl font-bold text-blue-900 hover:text-blue-700 transition-colors"
              >
                <Heart className="h-6 w-6 text-red-500" />
                <span>CJ Clarke</span>
              </button>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    currentPath === item.href
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-gray-700'
                  }`}
                >
                  {isSpanish ? item.labelEs : item.label}
                </button>
              ))}
              
              {/* Language Toggle */}
              <button
                onClick={() => handleNavigation(isSpanish ? '/' : '/es')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 px-2 py-1 border rounded transition-colors"
              >
                {isSpanish ? 'EN' : 'ES'}
              </button>

              {/* Donate Button */}
              <button
                onClick={() => handleNavigation('/donate')}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105 shadow-md"
              >
                {isSpanish ? 'Donar' : 'Donate'}
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => handleNavigation('/donate')}
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                {isSpanish ? 'Donar' : 'Donate'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === item.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isSpanish ? item.labelEs : item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigation(isSpanish ? '/' : '/es')}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {isSpanish ? 'English' : 'Español'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Campaign Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">CJ Clarke</span>
              </div>
              <p className="text-gray-300 mb-4">
                {isSpanish 
                  ? 'Por un Sheridan más saludable y seguro'
                  : 'For a Healthier, Safer Sheridan'
                }
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Mail className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {isSpanish ? 'Enlaces Rápidos' : 'Quick Links'}
              </h3>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {isSpanish ? item.labelEs : item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {isSpanish ? 'Contacto' : 'Contact'}
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>info@cjclarkeforcouncil.org</p>
                <p>PO Box TBD, Sheridan, CO</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Paid for by CJ Clarke for City Council</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;