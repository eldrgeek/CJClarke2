import { Handler } from '@netlify/functions';

interface VisitData {
  totalVisits: number;
  uniqueVisits: number;
  pageViews: { [key: string]: number };
  lastVisit: string;
  visitors: { [key: string]: { count: number; lastSeen: string; pages: string[] } };
}

// Simple in-memory store for local development
// In production, this will be replaced with persistent storage
let analyticsStore: VisitData = {
  totalVisits: 0,
  uniqueVisits: 0,
  pageViews: {},
  lastVisit: new Date().toISOString(),
  visitors: {}
};

// For production, we'll use Netlify Blobs
async function loadAnalyticsData(): Promise<VisitData> {
  // In production, this would load from Netlify Blobs
  // For now, return the in-memory store
  return analyticsStore;
}

async function saveAnalyticsData(data: VisitData): Promise<void> {
  // In production, this would save to Netlify Blobs
  // For now, update the in-memory store
  analyticsStore = data;
}

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod === 'POST') {
    try {
      const { page, visitorId } = JSON.parse(event.body || '{}');
      
      // Load current data from persistent storage
      const analyticsData = await loadAnalyticsData();

      // Increment total visits
      analyticsData.totalVisits++;
      
      // Track page views
      analyticsData.pageViews[page] = (analyticsData.pageViews[page] || 0) + 1;
      
      // Track unique visitors
      if (!analyticsData.visitors[visitorId]) {
        analyticsData.uniqueVisits++;
        analyticsData.visitors[visitorId] = {
          count: 0,
          lastSeen: new Date().toISOString(),
          pages: []
        };
      }
      
      analyticsData.visitors[visitorId].count++;
      analyticsData.visitors[visitorId].lastSeen = new Date().toISOString();
      
      if (!analyticsData.visitors[visitorId].pages.includes(page)) {
        analyticsData.visitors[visitorId].pages.push(page);
      }
      
      analyticsData.lastVisit = new Date().toISOString();

      // Save back to persistent storage
      await saveAnalyticsData(analyticsData);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, visitNumber: analyticsData.totalVisits }),
      };
    } catch (error) {
      console.error('Error tracking visit:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to track visit' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};


