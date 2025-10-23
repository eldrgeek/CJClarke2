import { useEffect } from 'react';

// Google Analytics 4 configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize GA4
export const initGA4 = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.log('GA4: Skipping initialization - no valid measurement ID');
    return;
  }

  console.log('GA4: Initializing with ID:', GA_MEASUREMENT_ID);

  // Load GA4 script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  script.onload = () => {
    console.log('GA4: Script loaded successfully');
  };
  script.onerror = (error) => {
    console.error('GA4: Failed to load script:', error);
  };
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
  console.log('GA4: Initialization complete');
};

// Track page view
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    console.log('GA4: Tracking page view:', path);
    (window as any).gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  } else {
    console.log('GA4: Skipping page view - gtag not available');
  }
};

// Get or create visitor ID
const getVisitorId = (): string => {
  try {
    let visitorId = localStorage.getItem('cj-clark-visitor-id');
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cj-clark-visitor-id', visitorId);
      console.log('Analytics: Created new visitor ID:', visitorId);
    } else {
      console.log('Analytics: Using existing visitor ID:', visitorId);
    }
    return visitorId;
  } catch (error) {
    const fallbackId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('Analytics: Using fallback visitor ID:', fallbackId);
    return fallbackId;
  }
};

// Track visit with custom analytics
const trackCustomVisit = async (path: string) => {
  try {
    const visitorId = getVisitorId();
    console.log('Analytics: Tracking visit for path:', path, 'visitor:', visitorId);
    
    const response = await fetch('/.netlify/functions/track-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: path, visitorId }),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Analytics: Visit tracked successfully:', data);
    } else {
      console.error('Analytics: Failed to track visit - status:', response.status);
    }
  } catch (error) {
    console.error('Analytics: Failed to track visit:', error);
  }
};

// Main Analytics Tracker Component
interface AnalyticsTrackerProps {
  currentPath: string;
}

export default function AnalyticsTracker({ currentPath }: AnalyticsTrackerProps) {
  useEffect(() => {
    console.log('AnalyticsTracker: Effect triggered for path:', currentPath);
    
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


