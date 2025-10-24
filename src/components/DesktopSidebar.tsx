import { Link, useLocation } from "react-router-dom";
import { 
  Home, BookOpen, Camera, FileText, TestTube, TrendingUp, 
  User, Settings, Mic, Brain
} from "lucide-react";
import { cn } from "@/lib/utils";

export const DesktopSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Brain, label: "Doubt Solver", path: "/doubt-solver" },
    { icon: Camera, label: "Smart Scanner", path: "/scanner" },
    { icon: BookOpen, label: "Library", path: "/library" },
    { icon: FileText, label: "Notes & Cards", path: "/notes" },
    { icon: TestTube, label: "Mock Tests", path: "/mock-tests" },
    { icon: TrendingUp, label: "Progress", path: "/progress" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b">
        <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <span className="font-heading font-bold text-lg">Study Scholar</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "gradient-hero text-white shadow-md"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
