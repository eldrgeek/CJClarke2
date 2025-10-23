import { useEffect } from 'react';

// Google Analytics 4 configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize GA4
export const initGA4 = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return;
  }

  // Load GA4 script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll send manually
  });

  // Make gtag available globally
  (window as any).gtag = gtag;
};

// Track page view
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

// Get or create visitor ID
const getVisitorId = (): string => {
  try {
    let visitorId = localStorage.getItem('cj-clark-visitor-id');
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cj-clark-visitor-id', visitorId);
    }
    return visitorId;
  } catch {
    return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};

// Track visit with custom analytics
const trackCustomVisit = async (path: string) => {
  try {
    const visitorId = getVisitorId();
    await fetch('/.netlify/functions/track-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: path, visitorId }),
    });
  } catch (error) {
    console.error('Failed to track visit:', error);
  }
};

// Main Analytics Tracker Component
interface AnalyticsTrackerProps {
  currentPath: string;
}

export default function AnalyticsTracker({ currentPath }: AnalyticsTrackerProps) {
  useEffect(() => {
    // Track with GA4
    trackPageView(currentPath);
    
    // Track with custom analytics
    trackCustomVisit(currentPath);
  }, [currentPath]);

  return null; // This component doesn't render anything
}

// Add type declaration for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}


