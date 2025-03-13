
import { cn } from "@/lib/utils";
import { 
  BarChart2, 
  Layers, 
  LineChart, 
  Search, 
  Settings, 
  Star, 
  Users 
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const Sidebar = ({ activeTab, onTabChange, className }: SidebarProps) => {
  const navigationItems = [
    { id: "overview", label: "Overview", icon: <BarChart2 size={18} /> },
    { id: "keywords", label: "Keywords", icon: <Search size={18} /> },
    { id: "reviews", label: "Reviews", icon: <Star size={18} /> },
    { id: "competitors", label: "Competitors", icon: <Users size={18} /> },
    { id: "metadata", label: "Metadata", icon: <Layers size={18} /> },
    { id: "reports", label: "Reports", icon: <LineChart size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className={cn(
      "bg-sidebar h-screen w-64 flex flex-col animate-fade-in shadow-lg",
      className
    )}>
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-sidebar-foreground text-2xl font-heading font-medium">ASO Dashboard</h1>
        <p className="text-sidebar-foreground/70 text-sm mt-1">June 2023</p>
      </div>
      
      <nav className="mt-6 flex-1">
        <ul className="space-y-1 px-3">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <Link 
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange(item.id);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sidebar-foreground/80 rounded-md transition-all duration-200",
                  "hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  activeTab === item.id && "bg-sidebar-accent text-sidebar-foreground font-medium"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="rounded-lg bg-sidebar-accent p-4 text-sidebar-foreground">
          <h4 className="font-medium text-sm">App Profile</h4>
          <div className="flex items-center mt-3 gap-3">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center text-white font-medium">
              A
            </div>
            <div>
              <p className="font-medium text-sm">App Optimizer Pro</p>
              <p className="text-xs text-sidebar-foreground/70">Status: Active</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
