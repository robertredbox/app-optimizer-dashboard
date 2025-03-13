# AppTweak MCP Routing System

This document provides an overview of the AppTweak MCP (Mobile Console Platform) routing system implementation in the App Optimizer Dashboard.

## Overview

The AppTweak MCP routing system provides automatic navigation within the dashboard when specific AppTweak API functions are called. This creates a seamless experience by automatically focusing the user's attention on the relevant section of the dashboard that pertains to the data being queried or displayed.

## Components

The routing system consists of the following components:

1. **RoutingContext.tsx** - React context that manages the active tab, section, and highlighting state.
2. **appTweakWrapper.ts** - Provides wrapper functions for AppTweak MCP calls to integrate with the routing system.
3. **appTweakRouting.ts** - Configuration mapping that connects AppTweak MCP functions to specific dashboard sections.

## How It Works

The system works by intercepting AppTweak MCP function calls and applying routing logic based on a predefined mapping:

1. When the application initializes, the `initializeAppTweakWrappers()` function wraps all available AppTweak MCP functions.
2. When an MCP function is called, the wrapper intercepts the call and allows the original function to execute.
3. After execution, the wrapper looks up the function name in the routing map to determine which tab and section to navigate to.
4. The context state is updated to trigger navigation to the appropriate tab and section.
5. The receiving component (e.g., OverviewTab) listens for changes in the routing context and scrolls to the right section.
6. If highlighting is enabled, a brief visual effect is applied to draw attention to the relevant section.

## Configuration

MCP functions are mapped to dashboard routes in `appTweakRouting.ts`. Each function has a corresponding routing target:

```typescript
export const mcpRoutingMap: Record<string, RoutingTarget> = {
  "search_app": { tabId: "overview", sectionId: "app-info", highlightEffect: true },
  "get_reviews": { tabId: "reviews", sectionId: "recent-reviews", highlightEffect: true },
  // More mappings...
};
```

## Testing

A testing interface is available at `/test` to verify the routing functionality without needing to make actual API calls:

1. Navigate to the `/test` page from the dashboard
2. Select a tab and corresponding MCP function to test
3. Click "Test Routing" to simulate the MCP call
4. Observe the dashboard navigation and highlighting behavior

## Adding New MCP Functions

To add a new AppTweak MCP function to the routing system:

1. Add an entry to the `mcpRoutingMap` in `appTweakRouting.ts`
2. Ensure the target tab and section IDs exist in the dashboard components
3. Add the necessary refs and scroll handling in the relevant tab component if needed

## Troubleshooting

If routing is not working as expected:

1. Check the browser console for any error messages
2. Verify that the function name in `mcpRoutingMap` exactly matches the API function name
3. Ensure the target section ID exists in the DOM with the correct reference
4. Verify that the AppTweak MCP wrappers were properly initialized at startup

## Future Enhancements

Potential enhancements to consider:

1. Persistence of routing state across page reloads
2. Deeper integration with browser history and URL parameters
3. Animation customizations for different types of content
4. Analytics tracking for MCP function usage patterns