/**
 * Data API Service
 * 
 * This service provides functions to update the app dashboard with real data from AppTweak.
 * It handles data fetching, transformation, and updating the dashboard components.
 */

import { mcpRoutingMap } from './appTweakRouting';

// Type definitions
interface AppMetadata {
  appId: string;
  platform: 'ios' | 'android';
  country: string;
  timeframe: {
    startDate: string;
    endDate: string;
  };
}

interface DataPayload {
  metadata: AppMetadata;
  [key: string]: any;
}

// Current data store
let currentData: DataPayload | null = null;

// Flag to track initialization state
let isInitialized = false;

/**
 * Initialize the data service
 */
export const initializeDataService = () => {
  if (!isInitialized) {
    // Register event listeners or other initialization steps
    window.addEventListener('storage', handleStorageEvent);
    isInitialized = true;
    console.log('Data API Service initialized');
  }
};

/**
 * Handle storage events (for cross-tab communication)
 */
const handleStorageEvent = (event: StorageEvent) => {
  if (event.key === 'app_dashboard_data') {
    try {
      const data = JSON.parse(event.newValue || '{}');
      updateDashboardData(data);
    } catch (error) {
      console.error('Error processing storage event:', error);
    }
  }
};

/**
 * Update dashboard with new data
 */
export const updateDashboardData = (data: DataPayload) => {
  // Store the current data
  currentData = data;
  
  // Save to localStorage for persistence and cross-tab communication
  localStorage.setItem('app_dashboard_data', JSON.stringify(data));
  
  // Dispatch a custom event that components can listen for
  window.dispatchEvent(new CustomEvent('dashboard_data_updated', { detail: data }));
  
  console.log('Dashboard data updated:', data);
  
  return true;
};

/**
 * Get current dashboard data
 */
export const getCurrentData = (): DataPayload | null => {
  if (!currentData) {
    // Try to load from localStorage
    try {
      const stored = localStorage.getItem('app_dashboard_data');
      if (stored) {
        currentData = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  }
  
  return currentData;
};

/**
 * Clear all dashboard data
 */
export const clearDashboardData = () => {
  currentData = null;
  localStorage.removeItem('app_dashboard_data');
  window.dispatchEvent(new CustomEvent('dashboard_data_updated', { detail: null }));
  
  return true;
};

/**
 * Simulate AppTweak MCP calls for loading data
 * This function can be called externally to run multiple MCP calls with proper routing
 */
export const loadAppTweakData = async (appId: string, platform: 'ios' | 'android', country: string, startDate: string, endDate: string) => {
  // Basic validation
  if (!appId || !platform || !country || !startDate || !endDate) {
    throw new Error('Missing required parameters');
  }
  
  // Create metadata object
  const metadata: AppMetadata = {
    appId,
    platform,
    country,
    timeframe: {
      startDate,
      endDate
    }
  };
  
  // Initialize data payload
  const dataPayload: DataPayload = {
    metadata,
    appInfo: {},
    reviews: {},
    keywords: {},
    competitors: {},
    downloads: {}
  };
  
  // Call each relevant AppTweak MCP function
  try {
    // App Info
    if (typeof window.get_app_details === 'function') {
      const appDetails = await window.get_app_details({
        appId,
        platform,
        country
      });
      dataPayload.appInfo = appDetails;
    }
    
    // Reviews
    if (typeof window.get_reviews === 'function') {
      const reviews = await window.get_reviews({
        appId,
        platform,
        country
      });
      dataPayload.reviews.recent = reviews;
    }
    
    if (typeof window.analyze_ratings === 'function') {
      const ratings = await window.analyze_ratings({
        appId,
        platform,
        country,
        startDate,
        endDate
      });
      dataPayload.reviews.analysis = ratings;
    }
    
    // Keywords
    if (typeof window.analyze_top_keywords === 'function') {
      const keywords = await window.analyze_top_keywords({
        appIds: [appId],
        platform,
        country
      });
      dataPayload.keywords.top = keywords;
    }
    
    // Downloads
    if (typeof window.get_downloads === 'function') {
      const downloads = await window.get_downloads({
        appId,
        platform,
        country,
        startDate,
        endDate
      });
      dataPayload.downloads = downloads;
    }
    
    // Update the dashboard with all collected data
    updateDashboardData(dataPayload);
    
    return {
      success: true,
      data: dataPayload
    };
  } catch (error) {
    console.error('Error loading AppTweak data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Export the MCP routing map for reference
export { mcpRoutingMap };

// Initialize on import
initializeDataService();