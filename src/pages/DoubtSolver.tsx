import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Image as ImageIcon, Mic, Upload } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { toast } from "sonner";

const DoubtSolver = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      setAnswer(`**Step-by-step Solution:**

1. **Understanding the Problem**
   This appears to be a mathematics problem. Let's break it down systematically.

2. **Key Concepts**
   - We need to identify the core mathematical principles involved
   - Apply relevant formulas and theorems

3. **Solution Process**
   - Start by organizing the given information
   - Apply the appropriate method to solve
   - Verify the answer

4. **Final Answer**
   The solution demonstrates the complete working with proper justification.

**Need more clarity?** Feel free to ask follow-up questions!`);
      setIsLoading(false);
      toast.success("Solution generated!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <DesktopSidebar />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="font-heading font-bold text-3xl">AI Doubt Solver</h1>
              <p className="text-muted-foreground">
                Get instant explanations for any question, 24/7
              </p>
            </div>

            {/* Input Methods */}
            <Card className="p-6">
              <Tabs defaultValue="type" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="type">Type</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="voice">Voice</TabsTrigger>
                  <TabsTrigger value="scan">Scan</TabsTrigger>
                </TabsList>
                
                <TabsContent value="type" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Enter your question</label>
                    <Textarea
                      placeholder="Type your question here... e.g., Solve: 2x + 5 = 15"
                      rows={6}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="resize-none"
                    />
                  </div>
                  <Button 
                    onClick={handleSubmit} 
                    className="w-full gradient-hero text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Solving..." : "Get Solution"}
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-1">Upload an image</p>
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="voice" className="space-y-4">
                  <div className="border-2 rounded-lg p-12 text-center">
                    <Mic className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
                    <p className="font-medium mb-1">Voice Input</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tap to start recording your question
                    </p>
                    <Button variant="outline">Start Recording</Button>
                  </div>
                </TabsContent>

                <TabsContent value="scan" className="space-y-4">
                  <div className="border-2 rounded-lg p-12 text-center">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-1">Scan with Camera</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use your camera to scan the problem
                    </p>
                    <Button>Open Camera</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Answer Display */}
            {answer && (
              <Card className="p-6 animate-fade-in">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center">
                      <span className="text-white text-sm font-bold">AI</span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg">Solution</h3>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    {answer.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('**') ? 'font-semibold' : ''}>
                        {line.replace(/\*\*/g, '')}
                      </p>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm">Save to Library</Button>
                    <Button variant="outline" size="sm">Share</Button>
                    <Button variant="outline" size="sm">Need More Help?</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default DoubtSolver;
