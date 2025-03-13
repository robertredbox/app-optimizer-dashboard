import { mcpRoutingMap } from './appTweakRouting';

// Store for the routing context setter functions
let routingSetters: {
  setActiveTab: (tab: string) => void;
  setActiveSection: (section: string | null) => void;
  setHighlightSection: (highlight: boolean) => void;
  setActiveDataPoint: (dataPoint: string | null) => void;
} | null = null;

// Initialize with routing context setters
export const initAppTweakWrapper = (setters: typeof routingSetters) => {
  routingSetters = setters;
};

// Store original functions
const originalFunctions: Record<string, Function> = {};

// Function to register an MCP function and create its wrapper
export const registerAppTweakMcp = (mcpName: string, originalFn: Function) => {
  originalFunctions[mcpName] = originalFn;
  
  return async (...args: any[]) => {
    // Log the MCP invocation (optional)
    console.log(`AppTweak MCP called: ${mcpName}`, args);
    
    try {
      // Call the original function
      const result = await originalFn(...args);
      
      // Handle routing if this MCP is in our mapping
      if (routingSetters && mcpRoutingMap[mcpName]) {
        const { tabId, sectionId, highlightEffect, dataPoint } = mcpRoutingMap[mcpName];
        
        // Schedule routing after the current execution completes
        setTimeout(() => {
          routingSetters?.setActiveTab(tabId);
          routingSetters?.setActiveSection(sectionId);
          routingSetters?.setHighlightSection(!!highlightEffect);
          
          if (dataPoint) {
            routingSetters?.setActiveDataPoint(dataPoint);
          }
          
          console.log(`Routed to tab: ${tabId}, section: ${sectionId}`);
        }, 0);
      }
      
      return result;
    } catch (error) {
      console.error(`Error in AppTweak MCP ${mcpName}:`, error);
      throw error;
    }
  };
};

// Initialize all AppTweak MCP functions - call this during app initialization
export const initializeAppTweakWrappers = () => {
  // Get all available MCP functions
  const mcpFunctions = Object.keys(mcpRoutingMap);
  
  // Wrap each function
  mcpFunctions.forEach(mcpName => {
    if (typeof window[mcpName as keyof Window] === 'function') {
      // Store original and replace with wrapped version
      const originalFn = window[mcpName as keyof Window] as unknown as Function;
      originalFunctions[mcpName] = originalFn;
      (window as any)[mcpName] = registerAppTweakMcp(mcpName, originalFn);
    }
  });
  
  console.log('AppTweak MCP functions wrapped for routing');
};