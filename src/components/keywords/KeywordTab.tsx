import React from "react";
import ChartContainer from "../ui/ChartContainer";
import DataTable from "../ui/DataTable";
import InsightsPanel from "../ui/InsightsPanel";
import { 
  keywordDifficultyData, 
  keywordRankingHistoryData, 
  topKeywordsData,
  keywordInsightsData,
  keywordRecommendationsData,
  monthlyReportData
} from "@/utils/mockData";
import { ArrowDown, ArrowUp, Filter, Search } from "lucide-react";
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

const KeywordTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-medium">Keyword Performance</h1>
          <p className="text-muted-foreground mt-1">Track and analyze your keyword rankings and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search keywords" 
              className="pl-9 pr-4 py-2 rounded-md border border-border bg-white w-64"
            />
          </div>
          <button className="bg-white text-foreground border border-border rounded-md px-4 py-2 text-sm flex items-center gap-2 hover:bg-secondary/50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <InsightsPanel 
        insights={keywordInsightsData}
        recommendations={keywordRecommendationsData}
        monthlyReport={monthlyReportData}
      />

      <div className="grid grid-cols-1 gap-6">
        <ChartContainer 
          title="Keyword Ranking History" 
          subtitle="Track position changes over time"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={keywordRankingHistoryData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis reversed axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="app store optimization" 
                stroke="#4338ca" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="aso tool" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="keyword tracker" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Keyword Opportunity Matrix" 
          subtitle="Difficulty vs. opportunity analysis"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="difficulty" 
                name="Difficulty" 
                unit="%" 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                label={{ value: 'Difficulty', position: 'bottom', offset: 5 }}
              />
              <YAxis 
                type="number" 
                dataKey="opportunity" 
                name="Opportunity" 
                unit="%" 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                label={{ value: 'Opportunity', angle: -90, position: 'left', offset: 10 }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter 
                name="Keywords" 
                data={keywordDifficultyData} 
                fill="#4338ca"
                shape={(props) => {
                  const { cx, cy } = props;
                  const size = Math.sqrt(props.payload.volume) / 10;
                  
                  return (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={size < 5 ? 5 : size > 15 ? 15 : size} 
                      fill="#4338ca" 
                      opacity={0.7}
                    />
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer 
          title="Top Ranking Keywords" 
          subtitle="Your best performing keywords"
        >
          <DataTable 
            data={topKeywordsData} 
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
    </div>
  );
};

export default KeywordTab;
