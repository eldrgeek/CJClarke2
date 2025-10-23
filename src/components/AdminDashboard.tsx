import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, Clock, RefreshCw, Lock, Unlock } from 'lucide-react';

interface AnalyticsData {
  totalVisits: number;
  uniqueVisits: number;
  lastVisit: string;
  topPages: { page: string; views: number }[];
  pageViews: { [key: string]: number };
  note?: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Simple password protection (for production, use proper authentication)
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'cjclark2025';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError(null);
      fetchAnalytics();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/.netlify/functions/get-analytics');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setAnalytics(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchAnalytics, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Admin Access</h1>
          <p className="text-gray-600 text-center mb-8">Enter password to view analytics</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Unlock className="w-5 h-5 mr-2" />
              Access Dashboard
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Default password: <code className="bg-gray-100 px-2 py-1 rounded">cjclark2025</code>
            </p>
            <p className="text-xs text-gray-500 text-center mt-2">
              Set <code className="bg-gray-100 px-2 py-1 rounded">VITE_ADMIN_PASSWORD</code> in .env to change
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">CJ Clark Campaign Website</p>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Updated {lastUpdated.toLocaleTimeString()}
                </div>
              )}
              <button
                onClick={fetchAnalytics}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Lock className="w-4 h-4 mr-2" />
                Lock
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        )}

        {analytics?.note && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg">
            <strong>Note:</strong> {analytics.note}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Visits */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {analytics?.totalVisits.toLocaleString() || '0'}
            </div>
            <div className="text-gray-600 text-sm">Total Page Views</div>
          </div>

          {/* Unique Visitors */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {analytics?.uniqueVisits.toLocaleString() || '0'}
            </div>
            <div className="text-gray-600 text-sm">Unique Visitors</div>
          </div>

          {/* Pages per Visit */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {analytics && analytics.uniqueVisits > 0
                ? (analytics.totalVisits / analytics.uniqueVisits).toFixed(1)
                : '0'}
            </div>
            <div className="text-gray-600 text-sm">Pages per Visit</div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Pages</h2>
          {analytics?.topPages && analytics.topPages.length > 0 ? (
            <div className="space-y-4">
              {analytics.topPages.map((page, index) => {
                const maxViews = analytics.topPages[0]?.views || 1;
                const percentage = (page.views / maxViews) * 100;
                return (
                  <div key={page.page}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-semibold text-gray-500 w-6">#{index + 1}</span>
                        <span className="text-gray-900 font-medium">{page.page || '/'}</span>
                      </div>
                      <span className="text-gray-600 font-semibold">{page.views.toLocaleString()} views</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No page view data available yet
            </div>
          )}
        </div>

        {/* Google Analytics Link */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Google Analytics 4</h3>
              <p className="text-gray-600 mb-4">
                For comprehensive analytics including traffic sources, user demographics, and real-time data,
                set up Google Analytics 4 and add your measurement ID to the <code className="bg-white px-2 py-1 rounded text-sm">VITE_GA_MEASUREMENT_ID</code> environment variable.
              </p>
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open Google Analytics
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


