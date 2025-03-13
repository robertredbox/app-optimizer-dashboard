import React from 'react';
import AppTweakTestPanel from '@/components/testing/AppTweakTestPanel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Test = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AppTweak MCP Routing Test</h1>
        <Button asChild variant="outline">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AppTweakTestPanel />
        </div>
        <div>
          <div className="bg-secondary/30 p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-4">How to Use This Test Page</h2>
            <ol className="space-y-3 list-decimal pl-5">
              <li>
                <strong>Select a tab</strong> corresponding to one of the dashboard tabs (Overview, Keywords, etc.)
              </li>
              <li>
                <strong>Choose an MCP function</strong> from the dropdown to test the routing for that specific function
              </li>
              <li>
                <strong>Click "Test Routing"</strong> to simulate the MCP call with mock data
              </li>
              <li>
                The dashboard should automatically navigate to the proper tab and section, with a brief highlight effect
              </li>
            </ol>

            <div className="mt-6 p-4 bg-primary/10 rounded-md">
              <h3 className="font-medium mb-2">Testing Notes:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>This test uses simulated MCP calls with mock data</li>
                <li>If routing fails, check the browser console for error messages</li>
                <li>Each test will show a toast notification indicating which route is being tested</li>
                <li>Ensure that the AppTweak wrappers are properly initialized in your environment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
