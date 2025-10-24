import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Camera, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: BookOpen, label: "Library", path: "/library" },
    { icon: Camera, label: "Scan", path: "/scanner" },
    { icon: TrendingUp, label: "Progress", path: "/progress" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "animate-pulse-glow")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
