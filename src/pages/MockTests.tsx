import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, FileText, Trophy, Sparkles, Download, Trash2, Eye } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { getUserProgress } from "@/lib/userProgress";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { getGeneratedTests, saveGeneratedTest, deleteGeneratedTest, GeneratedTest } from "@/lib/mockTestStorage";

const MockTests = () => {
  const progress = getUserProgress();
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedTests, setGeneratedTests] = useState<GeneratedTest[]>(getGeneratedTests());
  const [selectedTest, setSelectedTest] = useState<GeneratedTest | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    subject: "",
    className: "",
    chapter: "",
    topics: "",
    maxMarks: "100"
  });

  const handleGenerate = async () => {
    if (!formData.subject || !formData.className || !formData.chapter || !formData.topics) {
      toast.error("Please fill all fields");
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-mock-test', {
        body: {
          subject: formData.subject,
          className: formData.className,
          chapter: formData.chapter,
          topics: formData.topics,
          maxMarks: parseInt(formData.maxMarks)
        }
      });

      if (error) throw error;
      
      if (data?.success && data?.testData) {
        const generatedTest: GeneratedTest = {
          id: `test_${Date.now()}`,
          title: data.testData.title || `${formData.subject} - ${formData.chapter}`,
          subject: formData.subject,
          className: formData.className,
          chapter: formData.chapter,
          topics: formData.topics,
          maxMarks: parseInt(formData.maxMarks),
          sections: data.testData.sections || [],
          generatedAt: new Date().toISOString(),
          metadata: data.metadata
        };
        
        saveGeneratedTest(generatedTest);
        setGeneratedTests(getGeneratedTests());
        toast.success("Mock test generated successfully! 🎉");
        setIsGenerateOpen(false);
        setFormData({ subject: "", className: "", chapter: "", topics: "", maxMarks: "100" });
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error?.message || "Failed to generate test. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = (id: string) => {
    deleteGeneratedTest(id);
    setGeneratedTests(getGeneratedTests());
    toast.success("Test deleted");
  };

  const handleDownloadPDF = (test: GeneratedTest) => {
    let pdfContent = `${test.title}\n`;
    pdfContent += `Subject: ${test.subject} | Class: ${test.className} | Chapter: ${test.chapter}\n`;
    pdfContent += `Maximum Marks: ${test.maxMarks}\n`;
    pdfContent += `Generated: ${new Date(test.generatedAt).toLocaleDateString()}\n\n`;
    pdfContent += `Topics Covered: ${test.topics}\n\n`;
    pdfContent += "=".repeat(80) + "\n\n";

    test.sections.forEach((section) => {
      pdfContent += `${section.name}\n`;
      pdfContent += "-".repeat(80) + "\n\n";
      
      section.questions.forEach((q) => {
        pdfContent += `Q${q.number}. ${q.question} [${q.marks} marks]\n`;
        if (q.options && q.options.length > 0) {
          q.options.forEach(opt => pdfContent += `   ${opt}\n`);
        }
        if (q.diagram) {
          pdfContent += `   [Diagram: ${q.diagram}]\n`;
        }
        pdfContent += "\n";
      });
      pdfContent += "\n";
    });

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${test.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Test downloaded!");
  };

  const handleView = (test: GeneratedTest) => {
    setSelectedTest(test);
    setIsViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="flex w-full">
        <DesktopSidebar />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="font-heading font-bold text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI Mock Test Generator
                </h1>
                <p className="text-muted-foreground">
                  Generate custom tests with AI in seconds
                </p>
              </div>
              <Button 
                className="gradient-hero text-white shadow-lg hover:shadow-xl transition-all"
                onClick={() => setIsGenerateOpen(true)}
              >
                <Sparkles className="mr-2 w-4 h-4" />
                Generate Test
              </Button>
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

            {/* Generated Tests Repository */}
            <div className="space-y-4">
              <h2 className="font-heading font-semibold text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Generated Test Repository
              </h2>
              
              {generatedTests.length === 0 ? (
                <Card className="p-12 text-center">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
                  <h3 className="font-semibold text-lg mb-2">No tests generated yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use AI to generate custom mock tests based on your syllabus
                  </p>
                  <Button onClick={() => setIsGenerateOpen(true)} className="gradient-hero text-white">
                    <Sparkles className="mr-2 w-4 h-4" />
                    Generate Your First Test
                  </Button>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {generatedTests.map((test) => (
                    <Card key={test.id} className="p-6 hover:shadow-xl transition-all duration-300 group bg-gradient-to-br from-card to-card/50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{test.title}</h3>
                            <p className="text-sm text-muted-foreground">Class {test.className} • {test.subject}</p>
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary">{test.maxMarks} marks</Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium">Chapter:</span>
                          <span>{test.chapter}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Topics:</span> {test.topics}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Generated: {new Date(test.generatedAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleView(test)}
                        >
                          <Eye className="mr-1 w-4 h-4" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDownloadPDF(test)}
                        >
                          <Download className="mr-1 w-4 h-4" />
                          Download
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => handleDelete(test.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Generate Test Dialog */}
      <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Generate AI Mock Test
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="e.g., Mathematics, Science, English"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="class">Class/Grade *</Label>
              <Input
                id="class"
                placeholder="e.g., Class 10, Grade 12"
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="chapter">Chapter *</Label>
              <Input
                id="chapter"
                placeholder="e.g., Algebra, Thermodynamics"
                value={formData.chapter}
                onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="topics">Topics to Cover *</Label>
              <Textarea
                id="topics"
                placeholder="e.g., Quadratic equations, Linear inequalities, Graphs"
                value={formData.topics}
                onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="marks">Maximum Marks *</Label>
              <Input
                id="marks"
                type="number"
                placeholder="100"
                value={formData.maxMarks}
                onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
              />
            </div>
            <Button 
              className="w-full gradient-hero text-white"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? (
                <>Generating Test...</>
              ) : (
                <>
                  <Sparkles className="mr-2 w-4 h-4" />
                  Generate Test with AI
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Test Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTest?.title}</DialogTitle>
          </DialogHeader>
          {selectedTest && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <Badge variant="outline">Class {selectedTest.className}</Badge>
                <Badge variant="outline">{selectedTest.subject}</Badge>
                <Badge variant="outline">{selectedTest.chapter}</Badge>
                <Badge className="bg-primary/10 text-primary">{selectedTest.maxMarks} marks</Badge>
              </div>
              
              {selectedTest.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">{section.name}</h3>
                  {section.questions.map((q, qIdx) => (
                    <Card key={qIdx} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">Q{q.number}. {q.question}</p>
                        <Badge variant="outline" className="ml-2">{q.marks} marks</Badge>
                      </div>
                      {q.options && q.options.length > 0 && (
                        <div className="ml-6 space-y-1 text-sm">
                          {q.options.map((opt, optIdx) => (
                            <div key={optIdx} className={opt.startsWith(q.correctAnswer || '') ? 'text-success font-medium' : ''}>
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                      {q.diagram && (
                        <div className="ml-6 mt-2 p-2 bg-muted/50 rounded text-sm italic">
                          📊 Diagram: {q.diagram}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <MobileNav />
    </div>
  );
};

export default MockTests;
