
import React, { useState } from "react";
import TabNavigation from "@/components/ui/TabNavigation";
import OverviewTab from "@/components/overview/OverviewTab";
import KeywordTab from "@/components/keywords/KeywordTab";
import ReviewsTab from "@/components/reviews/ReviewsTab";
import CompetitorTab from "@/components/competitors/CompetitorTab";
import MetadataTab from "@/components/metadata/MetadataTab";
import {
  BarChart3,
  Search,
  Star,
  Users,
  FileText,
  FileSpreadsheet
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

// Define tab types for the dashboard
type TabId = "overview" | "keywords" | "reviews" | "competitors" | "metadata" | "reports" | "settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Define our tabs with icons
  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 size={16} /> },
    { id: "keywords", label: "Keywords", icon: <Search size={16} /> },
    { id: "reviews", label: "Reviews", icon: <Star size={16} /> },
    { id: "competitors", label: "Competitors", icon: <Users size={16} /> },
    { id: "metadata", label: "Metadata", icon: <FileText size={16} /> },
    { id: "reports", label: "Reports", icon: <FileSpreadsheet size={16} /> }
  ];

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
      {/* Sidebar navigation - Fixed the missing props */}
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
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
        
        {/* Tab navigation */}
        <div className="px-6 py-4 border-b bg-muted/30">
          <TabNavigation 
            tabs={tabs} 
            activeTab={activeTab} 
            onChange={(value) => setActiveTab(value as TabId)} 
          />
        </div>
        
        {/* Tab content with scrollable area */}
        <main className="flex-1 overflow-auto p-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default Index;
