import React, { useState, useEffect, Suspense } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import CTAButtons from './components/CTAButtons';
import ContentRenderer from './components/ContentRenderer';
import SEO from './components/SEO';

// Lazy load components to reduce initial bundle size
const IssueCard = React.lazy(() => import('./components/IssueCard'));
const NewsCard = React.lazy(() => import('./components/NewsCard'));
import { loadSite, resolveRoute } from './lib/content';
import type { SiteIndex, RouteResult } from './types';
import { ArrowLeft, Users, Target, Heart, Building2, CheckCircle2 } from 'lucide-react';

function App() {
  const [site, setSite] = useState<SiteIndex | null>(null);
  const [currentRoute, setCurrentRoute] = useState<RouteResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Get preferred language from localStorage
  const getPreferredLanguage = (): string => {
    try {
      const stored = localStorage.getItem('cj-clark-language');
      return stored === 'es' ? 'es' : 'en';
    } catch (error) {
      return 'en';
    }
  };

  useEffect(() => {
    const initSite = async () => {
      try {
        const siteData = await loadSite();
        setSite(siteData);
        
        const route = resolveRoute(siteData, currentPath, getPreferredLanguage());
        setCurrentRoute(route);
      } catch (error) {
        console.error('Failed to load site:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set a timeout to show loading spinner only if loading takes longer than 300ms
    const loadingTimer = setTimeout(() => {
      setShowLoading(true);
    }, 300);

    initSite();

    return () => {
      clearTimeout(loadingTimer);
      setShowLoading(false);
    };
  }, [currentPath]);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      if (site) {
        const route = resolveRoute(site, window.location.pathname, getPreferredLanguage());
        setCurrentRoute(route);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [site]);

  // Show loading screen if still loading or if data isn't ready
  if (isLoading || !site || !currentRoute) {
    if (showLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }
    // Return null if loading but not showing loading screen yet
    return null;
  }

  if (currentRoute.kind === "notfound") {
    return (
      <Layout currentPath={currentPath}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-lg text-gray-600 mb-8">Page not found</p>
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const { doc } = currentRoute;

  return (
    <Layout currentPath={currentPath} lang={doc.fm.lang}>
      <SEO frontmatter={doc.fm} />
      
      {/* Hero Section */}
      <Hero
        image={currentPath === '/' ? undefined : doc.fm.hero?.image}
        alt={doc.fm.hero?.alt}
        title={doc.fm.title}
        summary={doc.fm.summary}
        videoId={currentPath === '/' ? 'WzqnAeOxoZY' : doc.fm.hero?.videoId}
        videoTitle={currentPath === '/' ? 'CJ Clark Campaign Video' : doc.fm.hero?.videoTitle}
        autoplay={currentPath === '/video'}
        language={getPreferredLanguage()}
      >
        <CTAButtons primary={doc.fm.cta?.primary} secondary={doc.fm.cta?.secondary} />
      </Hero>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Special handling for different page types */}
        {currentRoute.kind === 'page' && currentPath === '/issues' && (
          <div className="space-y-12">
            <ContentRenderer html={doc.html} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>}>
                {site?.issues?.filter(issue => 
                  issue != null && 
                  issue.fm != null && 
                  issue.fm.slug && 
                  typeof issue.fm.slug === 'string' &&
                  issue.fm.title
                ).map((issue) => (
                  <IssueCard key={issue.fm.slug} issue={issue} />
                )) || []}
              </Suspense>
            </div>
          </div>
        )}

        {currentRoute.kind === 'page' && currentPath === '/news' && (
          <div className="space-y-12">
            <ContentRenderer html={doc.html} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-48 rounded-xl"></div>}>
                {site.news.map((newsItem) => (
                  <NewsCard key={`${newsItem.fm.date}-${newsItem.fm.slug}`} newsItem={newsItem} />
                ))}
              </Suspense>
            </div>
          </div>
        )}

        {currentRoute.kind === 'page' && currentPath === '/' && (
          <div className="space-y-16">
            {/* Main content */}
            <ContentRenderer html={doc.html} />
            
            {/* Features section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why CJ Clark?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Community Leader</h3>
                  <p className="text-gray-600">Over 20 years mentoring youth and building community through martial arts.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Small Business Owner</h3>
                  <p className="text-gray-600">Understands the challenges local entrepreneurs face and how to help them thrive.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Results-Focused</h3>
                  <p className="text-gray-600">Committed to practical solutions that make a real difference in daily life.</p>
                </div>
              </div>
            </div>

            {/* Top Issues Preview */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Priorities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>}>
                  {site?.issues?.filter(issue => 
                    issue != null && 
                    issue.fm != null && 
                    issue.fm.slug && 
                    typeof issue.fm.slug === 'string' &&
                    issue.fm.title
                  ).slice(0, 4).map((issue) => (
                    <IssueCard key={issue.fm.slug} issue={issue} />
                  )) || []}
                </Suspense>
              </div>
              <div className="text-center mt-12">
                <button
                  onClick={() => window.location.href = '/issues'}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors transform hover:scale-105"
                >
                  View All Issues
                  <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentRoute.kind === 'page' && currentPath === '/get-involved' && (
          <div className="space-y-12">
            <ContentRenderer html={doc.html} />
            
            {/* Volunteer Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Join Our Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                    Volunteer Opportunities
                  </h4>
                  <ul className="space-y-2 text-gray-600 pl-7">
                    <li>Door-to-door canvassing</li>
                    <li>Phone banking</li>
                    <li>Event support</li>
                    <li>Social media outreach</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2" />
                    Other Ways to Help
                  </h4>
                  <ul className="space-y-2 text-gray-600 pl-7">
                    <li>Host a house chat</li>
                    <li>Display a yard sign</li>
                    <li>Share on social media</li>
                    <li>Tell your neighbors</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Get Started Today</h4>
                <p className="text-gray-600 mb-6">Fill out this form and we'll be in touch within 24 hours with ways you can help.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="How would you like to help? Any questions?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                ></textarea>
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Count Me In!
                </button>
              </div>
            </div>
          </div>
        )}

        {currentRoute.kind === 'page' && currentPath === '/donate' && (
          <div className="space-y-12">
            <ContentRenderer html={doc.html} />
            
            {/* Donation Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Support CJ's Campaign</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[25, 50, 100, 250].map((amount) => (
                  <button
                    key={amount}
                    className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <span className="text-2xl font-bold text-gray-900">${amount}</span>
                  </button>
                ))}
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h4 className="font-semibold text-blue-900 mb-2">Your Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>• $25 covers literature for one precinct</div>
                  <div>• $50 supports a community event</div>
                  <div>• $100 funds voter outreach efforts</div>
                  <div>• $250 major campaign support</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Custom Amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors transform hover:scale-105">
                  Donate Securely
                </button>
              </div>
              
              <p className="text-sm text-gray-500 text-center mt-6">
                Contributions are subject to local campaign finance limits and reporting requirements.
              </p>
            </div>
          </div>
        )}

        {/* Default content renderer for other pages */}
        {!(currentPath === '/issues' || currentPath === '/news' || currentPath === '/' || currentPath === '/get-involved' || currentPath === '/donate') && (
          <>
            {/* Check for component field in frontmatter */}
            {doc.fm.component ? (
              (() => {
                const ComponentName = doc.fm.component;
                if (ComponentName === 'CampaignFlyer') {
                  const CampaignFlyer = React.lazy(() => import('./components/CampaignFlyer'));
                  return (
                    <React.Suspense fallback={<div className="text-center py-8">Loading flyer...</div>}>
                      <CampaignFlyer />
                    </React.Suspense>
                  );
                } else if (ComponentName === 'CampaignCard') {
                  const CampaignCard = React.lazy(() => import('./components/CampaignCard'));
                  return (
                    <React.Suspense fallback={<div className="text-center py-8">Loading card...</div>}>
                      <CampaignCard lang={doc.fm.lang} />
                    </React.Suspense>
                  );
                } else if (ComponentName === 'BusinessCard') {
                  const BusinessCard = React.lazy(() => import('./components/BusinessCard'));
                  return (
                    <React.Suspense fallback={<div className="text-center py-8">Loading business card...</div>}>
                      <BusinessCard lang={doc.fm.lang} />
                    </React.Suspense>
                  );
                } else if (ComponentName === 'Card3') {
                  const Card3 = React.lazy(() => import('./components/Card3'));
                  return (
                    <React.Suspense fallback={<div className="text-center py-8">Loading Card3...</div>}>
                      <Card3 />
                    </React.Suspense>
                  );
                }
                return (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Component Error</h3>
                    <p className="text-red-700">
                      Component <code className="bg-red-100 px-2 py-1 rounded text-sm">{ComponentName}</code> not found.
                    </p>
                  </div>
                );
              })()
            ) : doc.html && doc.html.trim() ? (
              <ContentRenderer html={doc.html} />
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Developer Notice</h3>
                <p className="text-yellow-700 mb-4">
                  Content is missing for this page: <code className="bg-yellow-100 px-2 py-1 rounded text-sm">{currentPath}</code>
                </p>
                <div className="text-sm text-yellow-600">
                  <p className="mb-2"><strong>To fix this:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Check the mock data in <code>src/lib/content.ts</code></li>
                    <li>Ensure the content for route <code>{currentPath}</code> has markdown content</li>
                    <li>Verify the route resolution logic in <code>resolveRoute()</code></li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation for issue/news detail pages */}
      {(currentRoute.kind === 'issue' || currentRoute.kind === 'news') && (
        <div className="bg-gray-100 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <button
                onClick={() => window.location.href = currentRoute.kind === 'issue' ? '/issues' : '/news'}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {currentRoute.kind === 'issue' ? 'Issues' : 'News'}
              </button>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => window.location.href = '/get-involved'}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
                >
                  Get Involved
                </button>
                <button
                  onClick={() => window.location.href = '/donate'}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;