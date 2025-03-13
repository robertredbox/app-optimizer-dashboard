import React, { useRef, useEffect } from "react";
import { useRouting } from "@/contexts/RoutingContext";
import MetricCard from "../ui/MetricCard";
import ChartContainer from "../ui/ChartContainer";
import DataTable from "../ui/DataTable";
import InsightsPanel from "../ui/InsightsPanel";
import { 
  appPerformanceData, 
  monthlyStatsCards,
  topKeywordsData,
  optimizationOpportunitiesData,
  overviewInsightsData,
  overviewRecommendationsData,
  monthlyReportData
} from "@/utils/mockData";
import { 
  ArrowDown,
  ArrowUp, 
  Calendar, 
  Download, 
  DollarSign, 
  Percent, 
  Search,
  Star,
  Eye
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, LineChart, Line } from "recharts";

const OverviewTab = () => {
  const { activeSection, highlightSection, activeDataPoint, resetRouting } = useRouting();
  
  // Create refs for each section
  const appInfoRef = useRef<HTMLDivElement>(null);
  const downloadStatsRef = useRef<HTMLDivElement>(null);
  const categoryPerformanceRef = useRef<HTMLDivElement>(null);
  const performanceTrendsRef = useRef<HTMLDivElement>(null);
  const conversionRateRef = useRef<HTMLDivElement>(null);
  const topKeywordsRef = useRef<HTMLDivElement>(null);
  const optimizationOpportunitiesRef = useRef<HTMLDivElement>(null);
  
  // Map section IDs to refs
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    "app-info": appInfoRef,
    "download-statistics": downloadStatsRef,
    "category-performance": categoryPerformanceRef,
    "performance-trends": performanceTrendsRef,
    "conversion-rate": conversionRateRef,
    "top-keywords": topKeywordsRef,
    "optimization-opportunities": optimizationOpportunitiesRef
  };
  
  // Scroll to active section when it changes
  useEffect(() => {
    if (activeSection && sectionRefs[activeSection]?.current) {
      // Scroll to the section
      sectionRefs[activeSection].current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Add a highlight effect if requested
      if (highlightSection) {
        const element = sectionRefs[activeSection].current;
        
        // Add highlight class
        element?.classList.add('highlight-section');
        
        // Remove highlight after animation completes
        setTimeout(() => {
          element?.classList.remove('highlight-section');
          resetRouting();
        }, 2000);
      }
    }
  }, [activeSection, highlightSection, resetRouting]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary text-xs font-medium rounded-full px-2.5 py-1">
              Monthly Report
            </div>
            <span className="text-sm text-muted-foreground">Updated 1 hour ago</span>
          </div>
          <h1 className="text-2xl font-medium mt-1">App Performance Overview</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm bg-white border border-border rounded-md p-2">
            <Calendar size={16} className="text-muted-foreground" />
            <span>June 2023</span>
          </div>
          <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* App Info Section */}
      <div ref={appInfoRef} id="app-info" className="section-container">
        <InsightsPanel 
          insights={overviewInsightsData}
          recommendations={overviewRecommendationsData}
          monthlyReport={monthlyReportData}
          className="mb-8"
        />
      </div>

      {/* Download Statistics Section */}
      <div ref={downloadStatsRef} id="download-statistics" className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard 
            title="Total Downloads" 
            value={monthlyStatsCards[0].value} 
            change={monthlyStatsCards[0].change} 
            trend={monthlyStatsCards[0].trend as 'up' | 'down'} 
            icon={<Download size={18} />} 
          />
          <MetricCard 
            title="Revenue" 
            value={monthlyStatsCards[1].value} 
            change={monthlyStatsCards[1].change} 
            trend={monthlyStatsCards[1].trend as 'up' | 'down'} 
            icon={<DollarSign size={18} />} 
          />
          <MetricCard 
            title="Conversion Rate" 
            value={monthlyStatsCards[2].value} 
            change={monthlyStatsCards[2].change} 
            trend={monthlyStatsCards[2].trend as 'up' | 'down'} 
            icon={<Percent size={18} />} 
          />
          <MetricCard 
            title="Average Rating" 
            value={monthlyStatsCards[3].value} 
            change={monthlyStatsCards[3].change} 
            trend={monthlyStatsCards[3].trend as 'up' | 'down'} 
            icon={<Star size={18} />} 
          />
          <MetricCard 
            title="Visibility Score" 
            value={monthlyStatsCards[4].value} 
            change={monthlyStatsCards[4].change} 
            trend={monthlyStatsCards[4].trend as 'up' | 'down'} 
            icon={<Eye size={18} />} 
          />
          <MetricCard 
            title="Review Volume" 
            value={monthlyStatsCards[5].value} 
            change={monthlyStatsCards[5].change} 
            trend={monthlyStatsCards[5].trend as 'up' | 'down'} 
            icon={<Search size={18} />} 
          />
        </div>
      </div>

      {/* Performance Trends Section */}
      <div ref={performanceTrendsRef} id="performance-trends" className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartContainer 
            title="Performance Trends" 
            subtitle="6-month rolling data"
            className="lg:col-span-2"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={appPerformanceData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4338ca" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4338ca" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="downloads" 
                  stroke="#4338ca" 
                  fillOpacity={1} 
                  fill="url(#colorDownloads)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0ea5e9" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div ref={conversionRateRef} id="conversion-rate" className="section-container">
            <ChartContainer 
              title="Conversion Rate" 
              subtitle="Month-over-month comparison"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={appPerformanceData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="conversion" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Keywords Section */}
        <div ref={topKeywordsRef} id="top-keywords" className="section-container">
          <ChartContainer 
            title="Top Keywords Performance" 
            subtitle="Current rankings and changes"
          >
            <DataTable 
              data={topKeywordsData.slice(0, 5)} 
              columns={[
                { key: 'keyword', label: 'Keyword' },
                { 
                  key: 'rank', 
                  label: 'Rank',
                  render: (value) => (
                    <span className="font-medium">#{value}</span>
                  )
                },
                { 
                  key: 'change', 
                  label: 'Change',
                  render: (value) => (
                    <div className="flex items-center">
                      {value > 0 ? (
                        <>
                          <ArrowUp size={14} className="text-success mr-1" />
                          <span className="text-success">+{value}</span>
                        </>
                      ) : value < 0 ? (
                        <>
                          <ArrowDown size={14} className="text-destructive mr-1" />
                          <span className="text-destructive">{value}</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </div>
                  )
                },
                { 
                  key: 'volume', 
                  label: 'Volume',
                  render: (value) => (
                    <span>{value.toLocaleString()}</span>
                  )
                },
              ]} 
            />
          </ChartContainer>
        </div>

        {/* Optimization Opportunities Section */}
        <div ref={optimizationOpportunitiesRef} id="optimization-opportunities" className="section-container">
          <ChartContainer 
            title="Optimization Opportunities" 
            subtitle="High impact recommendations"
          >
            <div className="space-y-3 h-full overflow-y-auto">
              {optimizationOpportunitiesData.map((item) => (
                <div key={item.id} className="bg-secondary/30 rounded-lg p-3 border border-border">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <div className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      item.impact === 'high' 
                        ? 'bg-success/20 text-success' 
                        : item.impact === 'medium'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-muted-foreground/20 text-muted-foreground'
                    }`}>
                      {item.impact} impact
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;