import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    class: "",
    board: "",
    school: "",
    subjects: [] as string[],
    country: "India",
    state: "",
    city: "",
    language: "English",
    goals: [] as string[],
  });

  const totalSteps = 4;

  const boards = ["CBSE", "ICSE", "State Board", "IB", "IGCSE", "Other"];
  const subjects = ["Mathematics", "Science", "English", "Social Studies", "Hindi", "Computer Science"];
  const goals = ["Board Exams", "Competitive Exams", "Daily Improvement"];

  const handleNext = () => {
    if (step === 2 && !formData.fullName) {
      toast.error("Please enter your name");
      return;
    }
    if (step === 3 && (!formData.class || !formData.board)) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem("onboardingComplete", "true");
    localStorage.setItem("userProfile", JSON.stringify(formData));
    
    // Celebration
    toast.success("You're all set! Let's start learning 🚀");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "subjects" | "goals", item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-5"></div>

      {/* Onboarding Card */}
      <div className="w-full max-w-2xl relative animate-scale-in">
        <div className="glassmorphism rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full gradient-hero transition-all duration-500 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in text-center py-8">
              <div className="w-20 h-20 mx-auto rounded-full gradient-hero flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="font-heading font-bold text-3xl">Welcome to Smart Study Scholar! 👋</h1>
                <p className="text-muted-foreground text-lg">
                  Let's personalize your learning experience in just a few quick steps
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 text-left">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="font-semibold mb-1">🎯 Personalized Learning</p>
                  <p className="text-sm text-muted-foreground">Content tailored to your board & class</p>
                </div>
                <div className="p-4 bg-success/5 rounded-lg border border-success/10">
                  <p className="font-semibold mb-1">📊 Track Progress</p>
                  <p className="text-sm text-muted-foreground">See your improvement over time</p>
                </div>
                <div className="p-4 bg-warning/5 rounded-lg border border-warning/10">
                  <p className="font-semibold mb-1">🏆 Earn Rewards</p>
                  <p className="text-sm text-muted-foreground">Maintain streaks & unlock badges</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                  <p className="font-semibold mb-1">💬 24/7 AI Help</p>
                  <p className="text-sm text-muted-foreground">Get doubts solved anytime</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="font-heading font-bold text-2xl">Tell Us About Yourself</h2>
                <p className="text-muted-foreground">Help us get to know you better</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="5"
                    max="20"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Academic Details */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="font-heading font-bold text-2xl">Academic Information</h2>
                <p className="text-muted-foreground">Help us customize your learning experience</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Class / Grade *</Label>
                  <Select value={formData.class} onValueChange={(val) => updateFormData("class", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your class" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                        <SelectItem key={num} value={`Class ${num}`}>Class {num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Board of Education *</Label>
                  <Select value={formData.board} onValueChange={(val) => updateFormData("board", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your board" />
                    </SelectTrigger>
                    <SelectContent>
                      {boards.map(board => (
                        <SelectItem key={board} value={board}>{board}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School Name</Label>
                  <Input
                    id="school"
                    placeholder="Enter your school name"
                    value={formData.school}
                    onChange={(e) => updateFormData("school", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Primary Subjects (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {subjects.map(subject => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={subject}
                          checked={formData.subjects.includes(subject)}
                          onCheckedChange={() => toggleArrayItem("subjects", subject)}
                        />
                        <label htmlFor={subject} className="text-sm cursor-pointer">
                          {subject}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Location & Preferences */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="font-heading font-bold text-2xl">Almost Done!</h2>
                <p className="text-muted-foreground">Just a few more details</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Your city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="Your state"
                      value={formData.state}
                      onChange={(e) => updateFormData("state", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Study Goals (Select all that apply)</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {goals.map(goal => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={formData.goals.includes(goal)}
                          onCheckedChange={() => toggleArrayItem("goals", goal)}
                        />
                        <label htmlFor={goal} className="text-sm cursor-pointer">
                          {goal}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={`gradient-hero text-white hover:opacity-90 ${step === 1 ? 'w-full' : 'ml-auto'}`}
            >
              {step === totalSteps ? "Complete Setup" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
