
import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Brain, TrendingUp, LightbulbIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type InsightItem = {
  id: string;
  title: string;
  description: string;
  type: "insight" | "recommendation" | "trend";
  impact?: "high" | "medium" | "low";
};

interface InsightsPanelProps {
  insights: InsightItem[];
  recommendations: InsightItem[];
  monthlyReport?: {
    summary: string;
    date: string;
  };
  className?: string;
}

const InsightsPanel = ({ 
  insights, 
  recommendations, 
  monthlyReport,
  className 
}: InsightsPanelProps) => {
  // Get icon based on type
  const getIcon = (type: string) => {
    switch (type) {
      case 'insight':
        return <Brain className="h-4 w-4 text-brand-deep-indigo" />;
      case 'recommendation':
        return <LightbulbIcon className="h-4 w-4 text-warning" />;
      case 'trend':
        return <TrendingUp className="h-4 w-4 text-primary" />;
      default:
        return <Sparkles className="h-4 w-4 text-primary" />;
    }
  };

  // Get badge color based on impact
  const getBadgeClass = (impact?: string) => {
    switch (impact) {
      case 'high':
        return 'bg-success/20 text-success';
      case 'medium':
        return 'bg-warning/20 text-warning';
      case 'low':
        return 'bg-muted-foreground/20 text-muted-foreground';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {monthlyReport && (
        <Alert className="bg-brand-deep-indigo/10 border-brand-deep-indigo/20">
          <Sparkles className="h-4 w-4 text-brand-deep-indigo" />
          <AlertTitle className="text-brand-deep-indigo font-heading">
            Monthly Intelligence Report — {monthlyReport.date}
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {monthlyReport.summary}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-heading flex items-center gap-2">
              <Brain className="h-5 w-5 text-brand-deep-indigo" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {insights.map((insight) => (
                <AccordionItem key={insight.id} value={insight.id}>
                  <AccordionTrigger className="text-sm hover:no-underline py-3">
                    <div className="flex items-center gap-2 text-left">
                      {getIcon(insight.type)}
                      <span>{insight.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {insight.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-heading flex items-center gap-2">
              <LightbulbIcon className="h-5 w-5 text-warning" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {recommendations.map((recommendation) => (
                <AccordionItem key={recommendation.id} value={recommendation.id}>
                  <AccordionTrigger className="text-sm hover:no-underline py-3">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-2 text-left">
                        {getIcon(recommendation.type)}
                        <span>{recommendation.title}</span>
                      </div>
                      {recommendation.impact && (
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getBadgeClass(recommendation.impact)}`}>
                          {recommendation.impact}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {recommendation.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsPanel;
