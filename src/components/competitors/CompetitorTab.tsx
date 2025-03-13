
import React from "react";
import ChartContainer from "../ui/ChartContainer";
import DataTable from "../ui/DataTable";
import { competitorData } from "@/utils/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Download, Star } from "lucide-react";

const CompetitorTab = () => {
  const radarData = [
    { subject: 'Keywords', 'Your App': 90, 'Competitor A': 65, 'Competitor B': 75, fullMark: 100 },
    { subject: 'Reviews', 'Your App': 80, 'Competitor A': 90, 'Competitor B': 60, fullMark: 100 },
    { subject: 'Ratings', 'Your App': 95, 'Competitor A': 85, 'Competitor B': 70, fullMark: 100 },
    { subject: 'Downloads', 'Your App': 70, 'Competitor A': 65, 'Competitor B': 85, fullMark: 100 },
    { subject: 'Revenue', 'Your App': 75, 'Competitor A': 70, 'Competitor B': 80, fullMark: 100 },
    { subject: 'Visibility', 'Your App': 85, 'Competitor A': 75, 'Competitor B': 70, fullMark: 100 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-medium">Competitor Analysis</h1>
          <p className="text-muted-foreground mt-1">Compare your app's performance against competitors</p>
        </div>
        <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Download size={16} />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Market Share Comparison" 
          subtitle="Downloads and revenue"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={competitorData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="downloads" name="Downloads" fill="#4338ca" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" name="Revenue ($)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer 
          title="Competitive Performance" 
          subtitle="Relative strength across key metrics"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Your App" dataKey="Your App" stroke="#4338ca" fill="#4338ca" fillOpacity={0.6} />
              <Radar name="Competitor A" dataKey="Competitor A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
              <Radar name="Competitor B" dataKey="Competitor B" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ChartContainer 
          title="Competitor Comparison" 
          subtitle="Key metrics side-by-side"
        >
          <DataTable 
            data={competitorData} 
            columns={[
              { key: 'name', label: 'App Name' },
              { 
                key: 'downloads', 
                label: 'Downloads',
                render: (value) => (
                  <span>{value.toLocaleString()}</span>
                )
              },
              { 
                key: 'revenue', 
                label: 'Revenue',
                render: (value) => (
                  <span>${value.toLocaleString()}</span>
                )
              },
              { 
                key: 'rating', 
                label: 'Rating',
                render: (value) => (
                  <div className="flex items-center">
                    <span className="mr-2">{value}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={`${
                            i < Math.floor(value) ? 'fill-warning text-warning' : 'text-muted'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                )
              },
              { 
                key: 'keywords', 
                label: 'Keywords',
                render: (value) => (
                  <span>{value}</span>
                )
              },
            ]} 
          />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-medium">Keyword Overlap</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Shared keywords with competitors</p>
          <div className="relative h-40">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center bg-primary/10 z-10">
                <span className="font-medium">Your App</span>
              </div>
              <div className="absolute top-0 left-0 w-28 h-28 rounded-full border-4 border-info bg-info/10 flex items-center justify-center transform -translate-x-1/4 -translate-y-1/4">
                <span className="font-medium text-sm">Comp A</span>
              </div>
              <div className="absolute bottom-0 right-0 w-28 h-28 rounded-full border-4 border-success bg-success/10 flex items-center justify-center transform translate-x-1/4 translate-y-1/4">
                <span className="font-medium text-sm">Comp B</span>
              </div>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 text-center text-sm">
            <div>
              <div className="font-medium">42</div>
              <div className="text-muted-foreground">Unique</div>
            </div>
            <div>
              <div className="font-medium">36</div>
              <div className="text-muted-foreground">Shared A</div>
            </div>
            <div>
              <div className="font-medium">28</div>
              <div className="text-muted-foreground">Shared B</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-medium">Update Frequency</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">App store listing updates</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Your App</span>
                <span className="text-xs text-success font-medium">4 days ago</span>
              </div>
              <div className="w-full bg-secondary/70 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Competitor A</span>
                <span className="text-xs text-muted-foreground font-medium">18 days ago</span>
              </div>
              <div className="w-full bg-secondary/70 rounded-full h-1.5">
                <div className="bg-info h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Competitor B</span>
                <span className="text-xs text-muted-foreground font-medium">7 days ago</span>
              </div>
              <div className="w-full bg-secondary/70 rounded-full h-1.5">
                <div className="bg-success h-1.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Competitor C</span>
                <span className="text-xs text-destructive font-medium">32 days ago</span>
              </div>
              <div className="w-full bg-secondary/70 rounded-full h-1.5">
                <div className="bg-destructive h-1.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-medium">Feature Comparison</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Key features across competitors</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-1 border-b border-border">
              <span className="text-sm">Keyword Tracking</span>
              <div className="flex space-x-4">
                <span className="text-success">✓</span>
                <span className="text-success">✓</span>
                <span className="text-destructive">✗</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-border">
              <span className="text-sm">Competitor Analysis</span>
              <div className="flex space-x-4">
                <span className="text-success">✓</span>
                <span className="text-success">✓</span>
                <span className="text-success">✓</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-border">
              <span className="text-sm">Review Sentiment</span>
              <div className="flex space-x-4">
                <span className="text-success">✓</span>
                <span className="text-destructive">✗</span>
                <span className="text-destructive">✗</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-border">
              <span className="text-sm">A/B Testing</span>
              <div className="flex space-x-4">
                <span className="text-success">✓</span>
                <span className="text-destructive">✗</span>
                <span className="text-success">✓</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm">Localization</span>
              <div className="flex space-x-4">
                <span className="text-success">✓</span>
                <span className="text-success">✓</span>
                <span className="text-success">✓</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div>You</div>
              <div>Comp A</div>
              <div>Comp B</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorTab;
