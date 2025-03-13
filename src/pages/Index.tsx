
import React, { useState } from "react";
import OverviewTab from "@/components/overview/OverviewTab";
import KeywordTab from "@/components/keywords/KeywordTab";
import ReviewsTab from "@/components/reviews/ReviewsTab";
import CompetitorTab from "@/components/competitors/CompetitorTab";
import MetadataTab from "@/components/metadata/MetadataTab";
import Sidebar from "@/components/layout/Sidebar";

// Define tab types for the dashboard
type TabId = "overview" | "keywords" | "reviews" | "competitors" | "metadata" | "reports" | "settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Render the active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "keywords":
        return <KeywordTab />;
      case "reviews":
        return <ReviewsTab />;
      case "competitors":
        return <CompetitorTab />;
      case "metadata":
        return <MetadataTab />;
      case "reports":
        return <div className="p-6">Custom Reports functionality coming soon</div>;
      case "settings":
        return <div className="p-6">Settings content coming soon</div>;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as TabId)}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* App header */}
        <header className="border-b bg-white py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">ASO Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">Last updated: June 10, 2023</div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                JS
              </div>
            </div>
          </div>
        </header>
        
        {/* Tab content with scrollable area */}
        <main className="flex-1 overflow-auto p-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default Index;
