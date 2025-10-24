import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Trophy } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { getUserProgress } from "@/lib/userProgress";
import { toast } from "sonner";

const MockTests = () => {
  const progress = getUserProgress();
  const tests = [
    {
      title: "Mathematics Full-Length Board Exam",
      duration: "3 hours",
      marks: 100,
      questions: 40,
      difficulty: "Hard",
      lastScore: null,
    },
    {
      title: "Science Chapter Test: Physics",
      duration: "45 mins",
      marks: 30,
      questions: 15,
      difficulty: "Medium",
      lastScore: 24,
    },
    {
      title: "English Grammar Quick Quiz",
      duration: "15 mins",
      marks: 20,
      questions: 10,
      difficulty: "Easy",
      lastScore: 18,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <DesktopSidebar />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="font-heading font-bold text-3xl">Mock Test Simulator</h1>
              <p className="text-muted-foreground">
                Practice with realistic exam simulations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center bg-primary/5 border-primary/20">
                <Trophy className="w-10 h-10 mx-auto mb-2 text-primary" />
                <p className="font-bold text-2xl">{progress.testsCompleted}</p>
                <p className="text-sm text-muted-foreground">Tests Completed</p>
              </Card>
              <Card className="p-4 text-center bg-success/5 border-success/20">
                <FileText className="w-10 h-10 mx-auto mb-2 text-success" />
                <p className="font-bold text-2xl">{progress.averageScore > 0 ? `${progress.averageScore}%` : '0%'}</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </Card>
              <Card className="p-4 text-center bg-warning/5 border-warning/20">
                <Clock className="w-10 h-10 mx-auto mb-2 text-warning" />
                <p className="font-bold text-2xl">{progress.totalStudyTime}</p>
                <p className="text-sm text-muted-foreground">Total Study Time</p>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-semibold text-xl">Available Tests</h2>
              {tests.map((test) => (
                <Card key={test.title} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-primary mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{test.title}</h3>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {test.duration}
                            </span>
                            <span>•</span>
                            <span>{test.marks} marks</span>
                            <span>•</span>
                            <span>{test.questions} questions</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={test.difficulty === "Hard" ? "destructive" : test.difficulty === "Medium" ? "secondary" : "default"}>
                          {test.difficulty}
                        </Badge>
                        {test.lastScore !== null && (
                          <Badge variant="outline">
                            Last Score: {test.lastScore}/{test.marks}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {test.lastScore !== null ? (
                        <>
                          <Button variant="outline" onClick={() => toast.info("Review feature coming soon!")}>Review</Button>
                          <Button className="gradient-hero text-white" onClick={() => toast.success("Starting test...")}>Retake</Button>
                        </>
                      ) : (
                        <Button className="gradient-hero text-white" onClick={() => toast.success("Starting test...")}>Start Test</Button>
                      )}
                    </div>
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

export default MockTests;
