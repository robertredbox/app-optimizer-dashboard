import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mcpRoutingMap } from '@/utils/appTweakRouting';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// Mock the AppTweak MCP functions to simulate API calls
const mockMcpCall = (mcpName: string, ...args: any[]) => {
  console.log(`Mock ${mcpName} called with:`, args);
  // This will trigger the wrapped function if our routing is working
  if (typeof (window as any)[mcpName] === 'function') {
    return (window as any)[mcpName](...args);
  } else {
    console.error(`MCP function ${mcpName} not found in window object`);
    return Promise.reject(new Error(`MCP function ${mcpName} not found`));
  }
};

const AppTweakTestPanel: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<string>('overview');
  const [selectedMcp, setSelectedMcp] = React.useState<string>('');
  const { toast } = useToast();

  // Group MCP functions by tab
  const mcpByTab = Object.entries(mcpRoutingMap).reduce((acc, [mcpName, config]) => {
    if (!acc[config.tabId]) {
      acc[config.tabId] = [];
    }
    acc[config.tabId].push({ name: mcpName, config });
    return acc;
  }, {} as Record<string, { name: string; config: typeof mcpRoutingMap[keyof typeof mcpRoutingMap] }[]>);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setSelectedMcp('');
  };

  const handleMcpChange = (value: string) => {
    setSelectedMcp(value);
  };

  const handleTestClick = () => {
    if (!selectedMcp) {
      toast({
        title: "No MCP function selected",
        description: "Please select an MCP function to test",
        variant: "destructive"
      });
      return;
    }

    // Create mock arguments based on the MCP function
    const mockArgs = createMockArgs(selectedMcp);
    
    toast({
      title: "Testing MCP Routing",
      description: `Testing ${selectedMcp} → ${mcpRoutingMap[selectedMcp].tabId}/${mcpRoutingMap[selectedMcp].sectionId}`
    });

    // Call the mock function
    mockMcpCall(selectedMcp, mockArgs)
      .then(() => {
        console.log('MCP call completed successfully');
      })
      .catch((error) => {
        console.error('Error in MCP call:', error);
        toast({
          title: "Error Testing Route",
          description: error.message,
          variant: "destructive"
        });
      });
  };

  // Create appropriate mock arguments based on the MCP function
  const createMockArgs = (mcpName: string) => {
    const commonArgs = {
      platform: 'ios',
      appId: '12345678',
      country: 'US'
    };

    // Customize arguments based on the specific MCP function
    switch (mcpName) {
      case 'search_app':
        return { ...commonArgs, query: 'fitness app' };
      case 'get_reviews':
      case 'get_top_displayed_reviews':
        return commonArgs;
      case 'search_reviews':
        return { ...commonArgs, term: 'great app' };
      case 'analyze_ratings':
        return { ...commonArgs, startDate: '2023-01-01', endDate: '2023-12-31' };
      case 'discover_keywords':
        return { ...commonArgs, query: 'fitness tracker' };
      case 'get_competitors':
        return commonArgs;
      case 'get_downloads':
        return { ...commonArgs, startDate: '2023-01-01', endDate: '2023-12-31' };
      default:
        return commonArgs;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AppTweak MCP Routing Test Panel</CardTitle>
        <CardDescription>
          Test the routing functionality by simulating MCP function calls
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Tab</label>
            <Select value={selectedTab} onValueChange={handleTabChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a tab" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(mcpByTab).map((tab) => (
                  <SelectItem key={tab} value={tab}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Tab
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select MCP Function</label>
            <Select value={selectedMcp} onValueChange={handleMcpChange} disabled={!selectedTab}>
              <SelectTrigger>
                <SelectValue placeholder="Select an MCP function" />
              </SelectTrigger>
              <SelectContent>
                {selectedTab && mcpByTab[selectedTab]?.map(({ name, config }) => (
                  <SelectItem key={name} value={name}>
                    {name} → {config.sectionId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <Button onClick={handleTestClick} disabled={!selectedMcp} className="w-full">
              Test Routing
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppTweakTestPanel;
