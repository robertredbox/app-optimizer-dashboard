import React, { createContext, useContext, useState, useEffect } from 'react';

interface RoutingContextType {
  activeTab: string;
  activeSection: string | null;
  highlightSection: boolean;
  activeDataPoint: string | null;
  setActiveTab: (tab: string) => void;
  setActiveSection: (section: string | null) => void;
  setHighlightSection: (highlight: boolean) => void;
  setActiveDataPoint: (dataPoint: string | null) => void;
  resetRouting: () => void;
}

const RoutingContext = createContext<RoutingContextType | undefined>(undefined);

export const RoutingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [highlightSection, setHighlightSection] = useState<boolean>(false);
  const [activeDataPoint, setActiveDataPoint] = useState<string | null>(null);

  const resetRouting = () => {
    setActiveSection(null);
    setHighlightSection(false);
    setActiveDataPoint(null);
  };

  useEffect(() => {
    // When tab changes, clear section highlighting
    resetRouting();
  }, [activeTab]);

  return (
    <RoutingContext.Provider value={{
      activeTab,
      activeSection,
      highlightSection,
      activeDataPoint,
      setActiveTab,
      setActiveSection,
      setHighlightSection,
      setActiveDataPoint,
      resetRouting
    }}>
      {children}
    </RoutingContext.Provider>
  );
};

export const useRouting = () => {
  const context = useContext(RoutingContext);
  if (context === undefined) {
    throw new Error('useRouting must be used within a RoutingProvider');
  }
  return context;
};