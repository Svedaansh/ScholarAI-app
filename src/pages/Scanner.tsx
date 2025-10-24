import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, X, Check } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";

const Scanner = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <DesktopSidebar />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="font-heading font-bold text-3xl">Smart Scanner</h1>
              <p className="text-muted-foreground">
                Scan problems with your camera for instant solutions
              </p>
            </div>

            <Card className="p-8">
              <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center space-y-4 border-2 border-dashed">
                <Camera className="w-16 h-16 text-muted-foreground" />
                <div className="text-center space-y-2">
                  <p className="font-medium">Camera Feed Will Appear Here</p>
                  <p className="text-sm text-muted-foreground">
                    Position the problem within the frame
                  </p>
                </div>
                <Button className="gradient-hero text-white">
                  Open Camera
                </Button>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">📸 Tips for Best Results</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ensure good lighting</li>
                  <li>• Keep camera steady</li>
                  <li>• Capture entire problem</li>
                  <li>• Avoid shadows and glare</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2">⚡ Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Check className="mr-2 w-4 h-4" />
                    View Scan History
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <X className="mr-2 w-4 h-4" />
                    Scan Multiple Problems
                  </Button>
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

export default Scanner;
