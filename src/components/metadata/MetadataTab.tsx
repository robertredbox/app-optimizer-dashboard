
import React from "react";
import ChartContainer from "../ui/ChartContainer";
import { 
  abTestResultsData, 
  conversionFunnelData, 
  optimizationOpportunitiesData 
} from "@/utils/mockData";
import { FunnelChart, Funnel, LabelList, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { ArrowRight, CheckCircle2, Camera, FileText, Languages, XCircle } from "lucide-react";

const MetadataTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-medium">Metadata Optimization</h1>
          <p className="text-muted-foreground mt-1">Optimize your app store listing elements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              App Title
            </h3>
            <div className="bg-success/20 text-success text-xs font-medium rounded-full px-2 py-0.5">
              Optimized
            </div>
          </div>
          <p className="text-sm mb-3">
            "App Optimizer Pro - ASO Tool for App Growth"
          </p>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Character count</div>
            <div className="text-sm font-medium">42 / 50</div>
          </div>
          <div className="w-full bg-secondary/70 rounded-full h-1.5 mt-1 mb-3">
            <div className="bg-success h-1.5 rounded-full" style={{ width: '84%' }}></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Keyword density</div>
            <div className="text-sm font-medium">85%</div>
          </div>
          <div className="w-full bg-secondary/70 rounded-full h-1.5 mt-1">
            <div className="bg-success h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Short Description
            </h3>
            <div className="bg-warning/20 text-warning text-xs font-medium rounded-full px-2 py-0.5">
              Needs attention
            </div>
          </div>
          <p className="text-sm mb-3">
            "Track your app's performance with our advanced ASO tools."
          </p>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Character count</div>
            <div className="text-sm font-medium">58 / 80</div>
          </div>
          <div className="w-full bg-secondary/70 rounded-full h-1.5 mt-1 mb-3">
            <div className="bg-warning h-1.5 rounded-full" style={{ width: '73%' }}></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Keyword density</div>
            <div className="text-sm font-medium">62%</div>
          </div>
          <div className="w-full bg-secondary/70 rounded-full h-1.5 mt-1">
            <div className="bg-warning h-1.5 rounded-full" style={{ width: '62%' }}></div>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center">
              <Camera className="h-4 w-4 mr-2" />
              Screenshots
            </h3>
            <div className="bg-success/20 text-success text-xs font-medium rounded-full px-2 py-0.5">
              Optimized
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="aspect-[9/16] bg-secondary rounded flex items-center justify-center text-xs text-muted-foreground"
              >
                {i+1}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Engagement score</div>
            <div className="text-sm font-medium">92%</div>
          </div>
          <div className="w-full bg-secondary/70 rounded-full h-1.5 mt-1">
            <div className="bg-success h-1.5 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="A/B Test Results" 
          subtitle="Latest test outcomes"
        >
          <div className="space-y-4 p-2">
            {abTestResultsData.map((test) => (
              <div key={test.id} className="bg-secondary/30 p-4 rounded-lg border border-border">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{test.element}</h4>
                  <div className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    test.winner === 'A' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-success/20 text-success'
                  }`}>
                    {test.winner === 'A' ? 'Variant A wins' : 'Variant B wins'}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Variant A: {test.variantA}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">{test.impressionsA.toLocaleString()}</span> impressions
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{test.conversionA}%</span> CVR
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Variant B: {test.variantB}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">{test.impressionsB.toLocaleString()}</span> impressions
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{test.conversionB}%</span> CVR
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {test.winner === 'A' 
                      ? `+${((test.conversionA / test.conversionB - 1) * 100).toFixed(1)}% improvement`
                      : `+${((test.conversionB / test.conversionA - 1) * 100).toFixed(1)}% improvement`
                    }
                  </div>
                  <button className="text-xs bg-primary text-white px-2 py-1 rounded flex items-center gap-1">
                    Apply winner
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer 
          title="Localization Performance" 
          subtitle="Conversion by language"
        >
          <div className="flex items-center mb-4">
            <Languages className="h-5 w-5 mr-2 text-primary" />
            <h4 className="font-medium">Supported languages: <span className="text-muted-foreground">8</span></h4>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { language: 'English', conversion: 3.8 },
                { language: 'Spanish', conversion: 3.2 },
                { language: 'French', conversion: 2.9 },
                { language: 'German', conversion: 3.5 },
                { language: 'Japanese', conversion: 4.2 },
                { language: 'Korean', conversion: 3.7 },
                { language: 'Chinese', conversion: 3.9 },
                { language: 'Portuguese', conversion: 2.7 },
              ]}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="language" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="conversion" name="Conversion Rate (%)" radius={[4, 4, 0, 0]}>
                {[
                  { language: 'English', conversion: 3.8 },
                  { language: 'Spanish', conversion: 3.2 },
                  { language: 'French', conversion: 2.9 },
                  { language: 'German', conversion: 3.5 },
                  { language: 'Japanese', conversion: 4.2 },
                  { language: 'Korean', conversion: 3.7 },
                  { language: 'Chinese', conversion: 3.9 },
                  { language: 'Portuguese', conversion: 2.7 },
                ].map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.conversion > 3.5 ? '#10b981' : '#6366f1'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between mt-4">
            <div className="text-sm">
              <span className="font-medium">Japanese</span>
              <span className="text-muted-foreground ml-1">- Best performing</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">French</span>
              <span className="text-muted-foreground ml-1">- Needs improvement</span>
            </div>
          </div>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Conversion Funnel" 
          subtitle="From impression to install"
        >
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip />
              <Funnel
                dataKey="count"
                data={conversionFunnelData}
                isAnimationActive
              >
                <LabelList 
                  position="right"
                  fill="#6b7280"
                  stroke="none"
                  dataKey="stage"
                />
                <LabelList
                  position="left"
                  fill="#111827"
                  stroke="none"
                  dataKey="count"
                  formatter={(value: number) => value.toLocaleString()}
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-sm mt-2">
            <div>
              <div className="font-medium">39.2%</div>
              <div className="text-muted-foreground">Impression to Page View</div>
            </div>
            <div>
              <div className="font-medium">44.4%</div>
              <div className="text-muted-foreground">Page View to Initiation</div>
            </div>
            <div>
              <div className="font-medium">78.2%</div>
              <div className="text-muted-foreground">Initiation to Install</div>
            </div>
          </div>
        </ChartContainer>

        <ChartContainer 
          title="Optimization Opportunities" 
          subtitle="Recommended improvements"
        >
          <div className="space-y-3">
            {optimizationOpportunitiesData.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg border border-border">
                {item.impact === 'high' ? (
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                      Impact: <span className="font-medium">{item.impact}</span>
                    </span>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                      Effort: <span className="font-medium">{item.effort}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export default MetadataTab;
