
import { cn } from "@/lib/utils";
import React from "react";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const ChartContainer = ({ title, subtitle, children, className, action }: ChartContainerProps) => {
  return (
    <div className={cn("chart-container animate-fade-in", className)}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-base font-medium">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}
      </div>
      <div className="h-[calc(100%-60px)] min-h-[200px]">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;
