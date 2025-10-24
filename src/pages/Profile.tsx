import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Flame, Star, Settings, LogOut } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getUserProgress } from "@/lib/userProgress";

const Profile = () => {
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
  const progress = getUserProgress();
  
  const handleLogout = () => {
    localStorage.removeItem("onboardingComplete");
    localStorage.removeItem("userProfile");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <DesktopSidebar />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="gradient-hero text-white text-2xl">
                    {userProfile.fullName?.charAt(0) || "S"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-heading font-bold text-2xl">{userProfile.fullName || "Student"}</h2>
                  <p className="text-muted-foreground mb-2">
                    {userProfile.class || "Class 10"} • {userProfile.board || "CBSE"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {userProfile.city ? `${userProfile.city}, ${userProfile.state}` : "India"}
                  </p>
                </div>
                <Button variant="outline">
                  <Settings className="mr-2 w-4 h-4" />
                  Edit Profile
                </Button>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <Flame className="w-10 h-10 mx-auto mb-2 text-warning" />
                <p className="text-2xl font-bold">{progress.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </Card>
              <Card className="p-4 text-center">
                <Star className="w-10 h-10 mx-auto mb-2 text-warning fill-warning" />
                <p className="text-2xl font-bold">{progress.points}</p>
                <p className="text-sm text-muted-foreground">Scholar Points</p>
              </Card>
              <Card className="p-4 text-center">
                <Trophy className="w-10 h-10 mx-auto mb-2 text-success" />
                <p className="text-2xl font-bold">{progress.badges.length}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Achievement Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Week Warrior", icon: "🔥", unlocked: progress.badges.includes("Week Warrior") },
                  { name: "Math Master", icon: "🧮", unlocked: progress.badges.includes("Math Master") },
                  { name: "Study Champion", icon: "🏆", unlocked: progress.badges.includes("Study Champion") },
                  { name: "Streak Legend", icon: "⚡", unlocked: progress.badges.includes("Streak Legend") },
                ].map((badge) => (
                  <div
                    key={badge.name}
                    className={`p-4 rounded-lg text-center ${
                      badge.unlocked ? "bg-primary/10" : "bg-muted/30 opacity-50"
                    }`}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <p className="text-sm font-medium">{badge.name}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Account Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 w-4 h-4" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="mr-2 w-4 h-4" />
                  Logout
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default Profile;
