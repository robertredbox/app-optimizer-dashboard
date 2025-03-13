
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
  className?: string;
}

const TabNavigation = ({ tabs, activeTab, onChange, className }: TabNavigationProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onChange} className={cn("w-full", className)}>
      <TabsList className="w-full bg-white border border-border p-1 h-auto rounded-lg">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={cn(
              "flex items-center gap-2 h-9 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            )}
          >
            {tab.icon && <span className="mr-1">{tab.icon}</span>}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabNavigation;
