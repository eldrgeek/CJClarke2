import { Handler } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

interface VisitData {
  totalVisits: number;
  uniqueVisits: number;
  pageViews: { [key: string]: number };
  lastVisit: string;
  visitors: { [key: string]: { count: number; lastSeen: string; pages: string[] } };
}

// Persistent storage using Netlify Blobs
const STORE_NAME = 'analytics-data';
const DATA_KEY = 'visit-analytics';

async function loadAnalyticsData(): Promise<VisitData> {
  try {
    console.log('Loading analytics data from Blobs store:', STORE_NAME, 'key:', DATA_KEY);
    const store = getStore(STORE_NAME);
    const data = await store.get(DATA_KEY);
    
    if (data) {
      const parsed = JSON.parse(data);
      console.log('Successfully loaded analytics data:', parsed);
      return parsed;
    } else {
      console.log('No existing analytics data found, starting fresh');
    }
  } catch (error) {
    console.error('Error loading analytics data:', error);
    console.log('Starting with fresh data due to error');
  }
  
  // Return default data structure
  return {
    totalVisits: 0,
    uniqueVisits: 0,
    pageViews: {},
    lastVisit: new Date().toISOString(),
    visitors: {}
  };
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


