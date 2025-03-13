
import React from "react";
import ChartContainer from "../ui/ChartContainer";
import { 
  ratingsData, 
  reviewSentimentData, 
  reviewTopicsData, 
  reviewVolumeData,
  featuredReviewsData 
} from "@/utils/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { MessageSquare, Star, ThumbsDown, ThumbsUp } from "lucide-react";

const COLORS = ['#10b981', '#0ea5e9', '#6366f1', '#f59e0b', '#ef4444'];

const ReviewsTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-medium">Reviews & Ratings Analysis</h1>
          <p className="text-muted-foreground mt-1">Analyze user feedback and sentiment trends</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-lg border border-border p-2">
            <div className="flex items-center px-3 py-1">
              <Star className="h-4 w-4 text-warning mr-2 fill-warning" />
              <span className="font-medium">4.7</span>
              <span className="text-muted-foreground ml-1">/ 5</span>
            </div>
            <div className="h-8 border-r border-border mx-2"></div>
            <div className="px-3 py-1">
              <span className="font-medium">1,231</span>
              <span className="text-muted-foreground ml-1">reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Rating Distribution" 
          subtitle="Breakdown by star rating"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={ratingsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="percentage"
                  >
                    {ratingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center">
              {ratingsData.map((entry, index) => (
                <div key={index} className="flex items-center mb-2 last:mb-0">
                  <div className="flex items-center w-16">
                    <Star className="h-4 w-4 mr-1 fill-warning text-warning" />
                    <span className="text-sm">{entry.rating}</span>
                  </div>
                  <div className="flex-1 h-2 bg-secondary/70 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${entry.percentage}%`,
                        backgroundColor: COLORS[index] 
                      }}
                    ></div>
                  </div>
                  <span className="w-12 text-right text-sm ml-2">{entry.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>

        <ChartContainer 
          title="Sentiment Analysis" 
          subtitle="Positive vs negative sentiment"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={reviewSentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="percentage"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#6366f1" />
                    <Cell fill="#ef4444" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
                  <span className="font-medium">Positive</span>
                  <span className="ml-auto">{reviewSentimentData[0].percentage}%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {reviewSentimentData[0].count.toLocaleString()} reviews
                </p>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                  <span className="font-medium">Neutral</span>
                  <span className="ml-auto">{reviewSentimentData[1].percentage}%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {reviewSentimentData[1].count.toLocaleString()} reviews
                </p>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                  <span className="font-medium">Negative</span>
                  <span className="ml-auto">{reviewSentimentData[2].percentage}%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {reviewSentimentData[2].count.toLocaleString()} reviews
                </p>
              </div>
            </div>
          </div>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Review Volume Trends" 
          subtitle="6-month rolling data"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={reviewVolumeData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#4338ca" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer 
          title="Common Review Topics" 
          subtitle="Sentiment by feature/topic"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={reviewTopicsData.slice(0, 5)}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis 
                dataKey="topic" 
                type="category" 
                axisLine={false} 
                tickLine={false}
                width={100}
                tick={{ fontSize: 14 }}
              />
              <Tooltip />
              <Bar 
                dataKey="count" 
                radius={[0, 4, 4, 0]}
                barSize={20}
              >
                {reviewTopicsData.slice(0, 5).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.sentiment === 'positive' 
                        ? '#10b981' 
                        : entry.sentiment === 'negative'
                        ? '#ef4444'
                        : '#6366f1'
                    } 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ChartContainer 
          title="Featured Reviews" 
          subtitle="Notable user feedback"
        >
          <div className="space-y-4">
            {featuredReviewsData.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-lg border border-border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{review.author}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={`${
                              i < review.rating ? 'fill-warning text-warning' : 'text-muted'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    review.sentiment === 'positive' 
                      ? 'bg-success/20 text-success' 
                      : review.sentiment === 'negative'
                      ? 'bg-destructive/20 text-destructive'
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {review.sentiment}
                  </div>
                </div>
                <h4 className="font-medium mb-1">{review.title}</h4>
                <p className="text-sm text-muted-foreground">{review.content}</p>
                <div className="flex mt-3 gap-2">
                  <button className="text-xs flex items-center gap-1 px-2 py-1 rounded bg-secondary/50 hover:bg-secondary text-muted-foreground transition-colors">
                    <ThumbsUp size={12} />
                    Helpful
                  </button>
                  <button className="text-xs flex items-center gap-1 px-2 py-1 rounded bg-secondary/50 hover:bg-secondary text-muted-foreground transition-colors">
                    <MessageSquare size={12} />
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ReviewsTab;
