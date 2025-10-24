import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, FileText, Video } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { toast } from "sonner";

const Library = () => {
  const subjects = [
    { name: "Mathematics", icon: "📐", color: "bg-math/10", chapters: 12, questions: 250 },
    { name: "Science", icon: "🔬", color: "bg-science/10", chapters: 10, questions: 180 },
    { name: "English", icon: "📚", color: "bg-english/10", chapters: 8, questions: 120 },
    { name: "Social Studies", icon: "🌍", color: "bg-social/10", chapters: 15, questions: 200 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <DesktopSidebar />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
            <div className="space-y-4">
              <h1 className="font-heading font-bold text-3xl">Resource Library</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search chapters, topics, questions..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {subjects.map((subject) => (
                <Card key={subject.name} className={`p-6 ${subject.color} hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{subject.icon}</div>
                      <div>
                        <h3 className="font-heading font-bold text-xl">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {subject.chapters} Chapters • {subject.questions} Questions
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => toast.info(`${subject.name} practice questions coming soon!`)}
                    >
                      <BookOpen className="mr-2 w-4 h-4" />
                      Practice Questions
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => toast.info(`${subject.name} sample papers coming soon!`)}
                    >
                      <FileText className="mr-2 w-4 h-4" />
                      Sample Papers
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => toast.info(`${subject.name} video lessons coming soon!`)}
                    >
                      <Video className="mr-2 w-4 h-4" />
                      Video Lessons
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default Library;
