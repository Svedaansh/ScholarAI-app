import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, X, Check, StopCircle } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

const Scanner = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraActive(true);
      toast.success("Camera started!");
    } catch (error) {
      toast.error("Could not access camera. Please check permissions.");
      console.error("Camera error:", error);
    }
  };
  
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
      toast.info("Camera stopped");
    }
  };
  
  const captureImage = () => {
    if (videoRef.current) {
      toast.success("Problem captured! Analyzing...");
      setTimeout(() => {
        toast.info("AI solution will be available soon!");
      }, 1500);
    }
  };
  
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
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
              <div className="aspect-video bg-black rounded-lg flex flex-col items-center justify-center space-y-4 border-2 border-dashed relative overflow-hidden">
                {isCameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 border-4 border-primary/50 m-8 rounded-lg pointer-events-none" />
                    <div className="absolute bottom-4 left-0 right-0 flex gap-3 justify-center z-10">
                      <Button 
                        onClick={captureImage}
                        className="gradient-hero text-white"
                        size="lg"
                      >
                        <Camera className="mr-2 w-5 h-5" />
                        Capture
                      </Button>
                      <Button 
                        onClick={stopCamera}
                        variant="destructive"
                        size="lg"
                      >
                        <StopCircle className="mr-2 w-5 h-5" />
                        Stop
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Camera className="w-16 h-16 text-muted-foreground" />
                    <div className="text-center space-y-2">
                      <p className="font-medium text-foreground">Camera Feed Will Appear Here</p>
                      <p className="text-sm text-muted-foreground">
                        Position the problem within the frame
                      </p>
                    </div>
                    <Button 
                      onClick={startCamera}
                      className="gradient-hero text-white"
                    >
                      <Camera className="mr-2 w-4 h-4" />
                      Open Camera
                    </Button>
                  </>
                )}
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => toast.info("No scans in history yet")}
                  >
                    <Check className="mr-2 w-4 h-4" />
                    View Scan History
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => toast.info("Multiple scan mode coming soon!")}
                  >
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
