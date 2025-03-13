/**
 * Dashboard Updater
 * 
 * This module provides the interface for updating the dashboard with new data.
 * It leverages the GitHub API to store data files and orchestrates the AppTweak MCP calls.
 */

import { loadAppTweakData } from './dataApiService';
import { storeJsonData } from './githubApiClient';
import { generateDataFilename } from './githubDataStorage';

/**
 * Interface for app data request parameters
 */
export interface AppDataRequest {
  appId: string;
  platform: 'ios' | 'android';
  country: string;
  startDate: string;
  endDate: string;
}

/**
 * Process a new app data request
 * 
 * This function will:
 * 1. Fetch data from AppTweak MCPs
 * 2. Store the data in a JSON file in GitHub
 * 3. Update the dashboard with the new data
 */
export const processAppDataRequest = async (request: AppDataRequest) => {
  // Validate request
  const { appId, platform, country, startDate, endDate } = request;
  
  if (!appId || !platform || !country || !startDate || !endDate) {
    throw new Error('Missing required parameters');
  }
  
  try {
    // Step 1: Fetch data using AppTweak MCPs
    console.log(`Fetching data for ${platform} app ${appId} (${country}) from ${startDate} to ${endDate}...`);
    
    const result = await loadAppTweakData(appId, platform, country, startDate, endDate);
    
    if (!result.success) {
      throw new Error(`Error fetching AppTweak data: ${result.error}`);
    }
    
    // Step 2: Generate file path for storing in GitHub
    const filePath = `data/${platform}/${appId}_${country}_${startDate.replace(/-/g, '')}_${endDate.replace(/-/g, '')}.json`;
    
    // Step 3: Store data in GitHub repository
    const commitMessage = `Update data for ${platform} app ${appId} (${country}) - ${startDate} to ${endDate}`;
    
    const storageResult = await storeJsonData(
      'robertredbox',  // Owner
      'app-optimizer-dashboard',  // Repo
      filePath,
      result.data,
      commitMessage
    );
    
    if (!storageResult.success) {
      console.warn(`Warning: Failed to store data in GitHub: ${storageResult.error}`);
    } else {
      console.log(`Data successfully stored in GitHub: ${filePath}`);
    }
    
    return {
      success: true,
      message: 'Dashboard updated successfully',
      data: result.data,
      githubResult: storageResult
    };
  } catch (error) {
    console.error('Error processing app data request:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    };
  }
};

/**
 * Format a month and year into proper date range format
 * 
 * Example: formatDateRange(6, 2023) returns:
 * { startDate: '2023-06-01', endDate: '2023-06-30' }
 */
export const formatDateRange = (month: number, year: number) => {
  // Validate inputs
  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12');
  }
  
  if (year < 2000 || year > 2100) {
    throw new Error('Year must be between 2000 and 2100');
  }
  
  // Format start date (first day of month)
  const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
  
  // Calculate end date (last day of month)
  // Create a date for the first day of the next month, then subtract 1 day
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
  
  return { startDate, endDate };
};

/**
 * Update dashboard for a specific app and month/year
 */
export const updateDashboardForMonthYear = async (
  appId: string, 
  platform: 'ios' | 'android', 
  country: string,
  month: number,
  year: number
) => {
  try {
    const { startDate, endDate } = formatDateRange(month, year);
    
    return await processAppDataRequest({
      appId,
      platform,
      country,
      startDate,
      endDate
    });
  } catch (error) {
    console.error('Error updating dashboard for month/year:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    };
  }
};