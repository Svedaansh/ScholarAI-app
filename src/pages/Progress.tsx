import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Target, Award, Clock } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";

const Progress = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <DesktopSidebar />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="font-heading font-bold text-3xl">Progress Analytics</h1>
                <p className="text-muted-foreground">
                  Track your learning journey and achievements
                </p>
              </div>
              <Select defaultValue="week">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-primary" />
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Questions Attempted</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-8 h-8 text-success" />
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <p className="text-2xl font-bold">84%</p>
                <p className="text-sm text-muted-foreground">Overall Accuracy</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-warning" />
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <p className="text-2xl font-bold">24.5h</p>
                <p className="text-sm text-muted-foreground">Study Hours</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-8 h-8 text-secondary" />
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Concepts Mastered</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Performance Chart</h3>
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization would appear here</p>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Strong Topics 💪</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Algebra</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-success/20 rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: "92%" }}></div>
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chemistry</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-success/20 rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: "88%" }}></div>
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Topics to Improve 📈</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Geometry</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-error/20 rounded-full overflow-hidden">
                        <div className="h-full bg-error" style={{ width: "65%" }}></div>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Physics</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-warning/20 rounded-full overflow-hidden">
                        <div className="h-full bg-warning" style={{ width: "70%" }}></div>
                      </div>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default Progress;
