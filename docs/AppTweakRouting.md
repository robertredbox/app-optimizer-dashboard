# AppTweak MCP Routing System

## Overview

This system automatically routes users to the relevant dashboard tab and section whenever an AppTweak MCP function is called. For example, when `get_reviews` is called, the system will automatically navigate to the Reviews tab and scroll to the Recent Reviews section, highlighting it briefly to draw the user's attention.

## Key Features

- **Automatic Navigation**: Instantly navigates to the relevant dashboard section when an AppTweak function is called
- **Visual Highlighting**: Briefly highlights the target component to draw the user's attention
- **Seamless Integration**: Works with existing components without requiring significant modifications
- **Extensible Mapping**: Easy to add new AppTweak functions and dashboard sections

## How It Works

1. The system wraps all AppTweak MCP functions with routing logic
2. When a function is called, the system looks up its corresponding dashboard location
3. The user is automatically navigated to the appropriate tab
4. The relevant section is scrolled into view and briefly highlighted

## Implementation Details

The system consists of several components:

1. **Mapping Configuration** (`appTweakRouting.ts`): Each AppTweak function is mapped to a specific tab and section
2. **Routing Context** (`RoutingContext.tsx`): Manages the active tab, section, and highlight state
3. **MCP Wrapper** (`appTweakWrapper.ts`): Intercepts AppTweak function calls and triggers routing
4. **Tab Components**: Respond to routing changes by scrolling to the appropriate section

## Usage Examples

### Basic Usage

The system works automatically once installed. Simply call any AppTweak function normally:

```javascript
// This will execute the AppTweak function and then route to the Reviews tab
get_reviews({ appId: "123456789", platform: "ios" });
```

### When Adding New AppTweak Functions

If adding a new AppTweak function, update the mapping in `appTweakRouting.ts`:

```typescript
// Add a new mapping
export const mcpRoutingMap: Record<string, RoutingTarget> = {
  // Existing mappings...
  
  // New mapping
  "new_apptweak_function": { 
    tabId: "keywords", 
    sectionId: "new-feature-section",
    highlightEffect: true
  }
};
```

### When Adding New Dashboard Sections

When adding a new section to the dashboard:

1. Add a new ref in the tab component:
```typescript
const newSectionRef = useRef<HTMLDivElement>(null);
```

2. Map the section ID to the ref:
```typescript
const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
  // Existing refs...
  "new-section-id": newSectionRef
};
```

3. Add the ref to the section in the JSX:
```jsx
<div ref={newSectionRef} id="new-section-id" className="section-container">
  {/* Section content */}
</div>
```

## Troubleshooting

### Section Not Highlighting

1. Ensure the section ID in the mapping matches the ID in the component
2. Check that the ref is properly applied to the section
3. Verify that the section has the `section-container` class

### Navigation Not Working

1. Check the browser console for errors
2. Ensure the AppTweak function is properly wrapped
3. Verify that the mapping includes the function being called