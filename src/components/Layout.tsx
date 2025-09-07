import React, { useState } from 'react';
import { Heart, Facebook, Instagram, Twitter, Mail, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  lang?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPath, lang = 'en' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/', labelEs: 'Inicio' },
    { label: 'Meet CJ', href: '/meet', labelEs: 'Conoce a CJ' },
    { label: 'Issues', href: '/issues', labelEs: 'Temas' },
    { label: 'News', href: '/news', labelEs: 'Noticias' },
    { label: 'Get Involved', href: '/get-involved', labelEs: 'Participa' },
  ];

  const isSpanish = lang === 'es';

  const handleNavigation = (href: string) => {
    window.location.href = href;
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
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
                className="flex items-center space-x-2 text-xl font-bold text-cj-blue hover:text-cj-blue/80 transition-colors"
              >
                <Heart className="h-6 w-6 text-cj-red" />
                <span>CJ Clarke</span>
              </button>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-cj-blue ${
                    currentPath === item.href
                      ? 'text-cj-blue border-b-2 border-cj-blue pb-1'
                      : 'text-cj-gray-900'
                  }`}
                >
                  {isSpanish ? item.labelEs : item.label}
                </button>
              ))}
              
              {/* Language Toggle - More Prominent */}
              <button
                onClick={() => handleNavigation(isSpanish ? '/' : '/es')}
                className="bg-cj-blue text-cj-white px-4 py-2 rounded-full font-semibold hover:bg-cj-blue/90 transition-colors transform hover:scale-105 shadow-md text-sm"
                title={isSpanish ? 'Switch to English' : 'Cambiar a Español'}
              >
                {isSpanish ? 'EN' : 'Español'}
              </button>

              {/* Donate Button */}
              <button
                onClick={() => handleNavigation('/donate')}
                className="bg-cj-red text-cj-white px-6 py-2 rounded-full font-semibold hover:bg-cj-red/90 transition-colors transform hover:scale-105 shadow-md"
              >
                {isSpanish ? 'Donar' : 'Donate'}
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Language Toggle - Prominent on mobile */}
              <button
                onClick={() => handleNavigation(isSpanish ? '/' : '/es')}
                className="bg-cj-blue text-cj-white px-3 py-2 rounded-full font-semibold hover:bg-cj-blue/90 transition-colors text-sm"
              >
                {isSpanish ? 'EN' : 'Español'}
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-cj-gray-100 text-cj-gray-900 p-2 rounded-lg hover:bg-cj-gray-200 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-out Menu */}
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-cj-red" />
                  <span className="text-xl font-bold text-cj-blue">CJ Clarke</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="px-4 py-6 space-y-4">
                {/* Navigation Links */}
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        currentPath === item.href
                          ? 'bg-cj-blue/10 text-cj-blue border-l-4 border-cj-blue'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {isSpanish ? item.labelEs : item.label}
                    </button>
                  ))}
                </div>

                {/* Language Toggle */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleNavigation(isSpanish ? '/' : '/es')}
                    className="flex items-center justify-between w-full px-4 py-3 bg-cj-blue/5 rounded-lg text-cj-blue font-medium hover:bg-cj-blue/10 transition-colors"
                  >
                    <span>{isSpanish ? 'Switch to English' : 'Cambiar a Español'}</span>
                    <span className="bg-cj-blue text-white px-3 py-1 rounded-full text-sm font-bold">
                      {isSpanish ? 'EN' : 'Español'}
                    </span>
                  </button>
                </div>

                {/* Donate Button */}
                <div className="pt-4">
                  <button
                    onClick={() => handleNavigation('/donate')}
                    className="w-full bg-cj-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-cj-red/90 transition-colors transform hover:scale-105 shadow-md"
                  >
                    {isSpanish ? 'Donar' : 'Donate'}
                  </button>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3 px-4">
                    {isSpanish ? 'Síguenos' : 'Follow Us'}
                  </p>
                  <div className="flex justify-center space-x-6">
                    <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
                    <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-600 cursor-pointer transition-colors" />
                    <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                    <Mail className="h-6 w-6 text-gray-400 hover:text-green-600 cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Floating Language Toggle Button - Extra Prominent */}
      <div className="fixed bottom-6 right-6 z-30 md:hidden lg:block">
        <button
          onClick={() => handleNavigation(isSpanish ? '/' : '/es')}
          className="bg-gradient-to-r from-cj-blue to-cj-blue/80 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          title={isSpanish ? 'Switch to English' : 'Cambiar a Español'}
          aria-label={isSpanish ? 'Switch to English' : 'Cambiar a Español'}
        >
          <span className="text-lg font-bold">
            {isSpanish ? 'EN' : 'Español'}
          </span>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-cj-blue text-cj-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Campaign Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-cj-red" />
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

          <div className="border-t border-cj-blue/30 mt-8 pt-8 text-center text-cj-white/70">
            <p>&copy; {new Date().getFullYear()} Paid for by CJ Clarke for City Council</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;