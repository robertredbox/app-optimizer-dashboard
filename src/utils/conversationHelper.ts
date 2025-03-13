/**
 * Conversation Helper
 * 
 * This module provides helper functions specifically designed to be called
 * from the conversation interface to update the dashboard with app data.
 */

import { updateDashboardForMonthYear } from './dashboardUpdater';

/**
 * Interface for update request parameters from the conversation
 */
export interface ConversationUpdateRequest {
  appId: string;
  platform: 'ios' | 'android';
  country: string;
  month: number;
  year: number;
}

/**
 * Process an update request from the conversation
 */
export const processConversationUpdate = async (request: ConversationUpdateRequest) => {
  const { appId, platform, country, month, year } = request;
  
  // Basic validation
  if (!appId) {
    return {
      success: false,
      message: 'App ID is required'
    };
  }
  
  if (platform !== 'ios' && platform !== 'android') {
    return {
      success: false,
      message: 'Platform must be either "ios" or "android"'
    };
  }
  
  if (!country || country.length !== 2) {
    return {
      success: false,
      message: 'Country must be a valid 2-letter country code (e.g., US, GB)'
    };
  }
  
  if (!month || month < 1 || month > 12 || !Number.isInteger(month)) {
    return {
      success: false,
      message: 'Month must be an integer between 1 and 12'
    };
  }
  
  if (!year || year < 2000 || year > 2100 || !Number.isInteger(year)) {
    return {
      success: false,
      message: 'Year must be an integer between 2000 and 2100'
    };
  }
  
  try {
    // Process the update
    const result = await updateDashboardForMonthYear(
      appId,
      platform,
      country,
      month,
      year
    );
    
    if (result.success) {
      return {
        success: true,
        message: `Successfully updated dashboard for ${platform} app ${appId} (${country}) for ${month}/${year}`,
        data: result.data
      };
    } else {
      return {
        success: false,
        message: `Failed to update dashboard: ${result.message}`,
        error: result.error
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    };
  }
};

/**
 * Quick helper function to update the dashboard
 * This function can be called directly from a conversation
 */
export const updateDashboard = async (
  appId: string,
  platform: 'ios' | 'android',
  country: string = 'US',
  month: number = new Date().getMonth() + 1,
  year: number = new Date().getFullYear()
) => {
  return await processConversationUpdate({
    appId,
    platform,
    country,
    month,
    year
  });
};