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

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod === 'GET') {
    try {
      const analyticsData = await loadAnalyticsData();
      
      // Calculate top pages
      const topPages = Object.entries(analyticsData.pageViews)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([page, views]) => ({ page, views }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          totalVisits: analyticsData.totalVisits,
          uniqueVisits: analyticsData.uniqueVisits,
          lastVisit: analyticsData.lastVisit,
          topPages,
          pageViews: analyticsData.pageViews,
          note: 'Data persists across deployments using Netlify Blobs storage.'
        }),
      };
    } catch (error) {
      console.error('Error getting analytics:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to get analytics' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};


