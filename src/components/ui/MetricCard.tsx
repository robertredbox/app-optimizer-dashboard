
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

const MetricCard = ({ title, value, change, trend, icon, className }: MetricCardProps) => {
  return (
    <div className={cn(
      "glass-card p-4 card-hover flex flex-col gap-2 animate-fade-in",
      className
    )}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-primary/80">{icon}</div>}
      </div>
      <div className="mt-1">
        <div className="metric-value">{value}</div>
        {change && (
          <div className="flex items-center mt-1 text-sm">
            {trend === 'up' && <ArrowUp className="h-4 w-4 mr-1 text-success" />}
            {trend === 'down' && <ArrowDown className="h-4 w-4 mr-1 text-destructive" />}
            <span className={cn(
              "font-medium",
              trend === 'up' ? "text-success" : trend === 'down' ? "text-destructive" : "text-muted-foreground"
            )}>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
