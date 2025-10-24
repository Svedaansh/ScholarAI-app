import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, Camera, FileText, TestTube, TrendingUp, Trophy, 
  Flame, Sparkles, Brain, Target, Clock, Award
} from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { getUserProgress, updateStreak } from "@/lib/userProgress";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
  const userName = userProfile.fullName || "Student";
  const userClass = userProfile.class || "Class 10";
  const userBoard = userProfile.board || "CBSE";
  
  const [progress, setProgress] = useState(getUserProgress());
  
  useEffect(() => {
    // Update streak on dashboard visit
    const updated = updateStreak();
    setProgress(updated);
  }, []);
  
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const quickActions = [
    { icon: Brain, label: "Ask Doubt", to: "/doubt-solver", color: "bg-primary" },
    { icon: FileText, label: "Start Practice", to: "/library", color: "bg-science" },
    { icon: TestTube, label: "Take Test", to: "/mock-tests", color: "bg-warning" },
    { icon: Camera, label: "Scan Problem", to: "/scanner", color: "bg-english" },
  ];

  const subjects = [
    { name: "Mathematics", progress: 75, color: "text-math", bgColor: "bg-math/10" },
    { name: "Science", progress: 82, color: "text-science", bgColor: "bg-science/10" },
    { name: "English", progress: 68, color: "text-english", bgColor: "bg-english/10" },
    { name: "Social Studies", progress: 90, color: "text-social", bgColor: "bg-social/10" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <DesktopSidebar />
        
        <main className="flex-1 pb-20 md:pb-8">
          {/* Header */}
          <div className="gradient-hero text-white p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="font-heading font-bold text-2xl md:text-3xl">
                    {greeting()}, {userName}! 👋
                  </h1>
                  <p className="text-white/90">
                    Ready to ace {userClass} {userBoard} today?
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="text-center">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <Flame className="w-5 h-5 text-warning" />
                      <span className="font-bold text-lg">{progress.streak}</span>
                    </div>
                    <p className="text-xs mt-1 text-white/80">Day Streak</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <Sparkles className="w-5 h-5 text-warning" />
                      <span className="font-bold text-lg">{progress.points}</span>
                    </div>
                    <p className="text-xs mt-1 text-white/80">Points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            {/* Quick Actions */}
            <section className="space-y-4">
              <h2 className="font-heading font-semibold text-xl">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.to}>
                    <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-semibold text-sm">{action.label}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Subject Progress */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-xl">Subject Progress</h2>
                <Link to="/progress">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {subjects.map((subject) => (
                  <Card key={subject.name} className={`p-4 ${subject.bgColor}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-semibold ${subject.color}`}>{subject.name}</h3>
                      <span className="text-sm font-bold">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${subject.color.replace('text-', 'bg-')}`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Today's Goals */}
            <section className="space-y-4">
              <h2 className="font-heading font-semibold text-xl">Today's Goals</h2>
              <Card className="p-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Complete 10 practice questions</p>
                      <p className="text-sm text-muted-foreground">6/10 completed</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-primary flex items-center justify-center">
                    <span className="text-xs font-bold">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Study for 30 minutes</p>
                      <p className="text-sm text-muted-foreground">25 mins done</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-success flex items-center justify-center">
                    <span className="text-xs font-bold">83%</span>
                  </div>
                </div>
              </Card>
            </section>

            {/* Recent Achievements */}
            <section className="space-y-4">
              <h2 className="font-heading font-semibold text-xl">Recent Achievements</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-warning/10 flex items-center justify-center mb-2 animate-pulse-glow">
                    <Award className="w-8 h-8 text-warning" />
                  </div>
                  <p className="font-semibold text-sm">Week Warrior</p>
                  <p className="text-xs text-muted-foreground">7-day streak!</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-2">
                    <Trophy className="w-8 h-8 text-success" />
                  </div>
                  <p className="font-semibold text-sm">Math Master</p>
                  <p className="text-xs text-muted-foreground">100 questions!</p>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default Dashboard;
