
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
    <div className={cn(
      "chart-container rounded-lg border border-border bg-white p-6 shadow-md animate-fade-in",
      className
    )}>
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-base font-heading font-medium text-brand-deep-indigo">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}
      </div>
      <div className="h-[calc(100%-70px)] min-h-[200px]">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;
