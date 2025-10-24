import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, TrendingUp, Award, Users, Star } from "lucide-react";

const Landing = () => {
  const features = [
    { icon: Brain, title: "AI Doubt Solver", description: "Get instant explanations 24/7" },
    { icon: BookOpen, title: "Unlimited Practice", description: "Access thousands of questions" },
    { icon: TrendingUp, title: "Progress Tracking", description: "See your improvement daily" },
    { icon: Award, title: "Gamified Learning", description: "Earn badges and maintain streaks" },
  ];

  const testimonials = [
    { name: "Priya Sharma", class: "Class 10, CBSE", text: "Improved my math score from 72% to 95% in 3 months!", rating: 5 },
    { name: "Arjun Patel", class: "Class 12, ICSE", text: "The mock tests helped me ace my boards. Highly recommend!", rating: 5 },
    { name: "Sneha Reddy", class: "Class 8, State Board", text: "Best study app ever! Makes learning actually fun.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl">Smart Study Scholar</span>
          </div>
          <Link to="/auth">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Star className="w-4 h-4" />
              Trusted by 100,000+ students
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
              Your AI Study Partner for{" "}
              <span className="text-gradient">Academic Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              24/7 doubt solving • Unlimited practice questions • Smart progress tracking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button size="lg" className="gradient-hero text-white hover:opacity-90 transition-opacity">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>100K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">
              Everything You Need to Excel
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to help K-12 students achieve their academic goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4 animate-pulse-glow">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">
              Students Love Smart Study Scholar
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of students improving their grades every day
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-card p-6 rounded-xl border shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.class}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container text-center space-y-6">
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            Ready to Transform Your Studies?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join 100,000+ students who are already scoring higher with Smart Study Scholar
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="mt-4">
              Start Learning for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">Smart Study Scholar</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Smart Study Scholar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
