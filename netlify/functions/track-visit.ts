import { Handler } from '@netlify/functions';
import { getBlob, putBlob } from '@netlify/blobs';

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
    const data = await getBlob({
      store: STORE_NAME,
      key: DATA_KEY,
    });
    
    if (data) {
      const text = await data.text();
      const parsed = JSON.parse(text);
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

async function saveAnalyticsData(data: VisitData): Promise<void> {
  try {
    console.log('Saving analytics data to Blobs store:', STORE_NAME, 'key:', DATA_KEY);
    console.log('Data to save:', data);
    
    await putBlob({
      store: STORE_NAME,
      key: DATA_KEY,
      data: JSON.stringify(data),
    });
    
    console.log('Successfully saved analytics data');
  } catch (error) {
    console.error('Failed to save analytics data:', error);
    throw error;
  }
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
      console.log('Track visit request received:', event.body);
      const { page, visitorId } = JSON.parse(event.body || '{}');
      console.log('Parsed request - page:', page, 'visitorId:', visitorId);
      
      // Load current data from persistent storage
      const analyticsData = await loadAnalyticsData();
      console.log('Loaded analytics data:', analyticsData);

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


