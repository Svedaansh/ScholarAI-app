import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      toast.success(`Signed in with ${provider}!`);
      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem("onboardingComplete");
      
      if (hasCompletedOnboarding) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-hero opacity-5"></div>
      
      {/* Back button */}
      <Link to="/" className="absolute top-4 left-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </Link>

      {/* Auth Card */}
      <div className="w-full max-w-md relative animate-scale-in">
        <div className="glassmorphism rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="font-heading font-bold text-3xl">Welcome Back!</h1>
            <p className="text-muted-foreground">Sign in to continue your learning journey</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md"
              variant="outline"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              onClick={() => handleSocialLogin("Microsoft")}
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md"
              variant="outline"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 23 23">
                <path fill="#f25022" d="M0 0h11v11H0z" />
                <path fill="#00a4ef" d="M12 0h11v11H12z" />
                <path fill="#7fba00" d="M0 12h11v11H0z" />
                <path fill="#ffb900" d="M12 12h11v11H12z" />
              </svg>
              Continue with Microsoft
            </Button>

            <Button
              onClick={() => handleSocialLogin("Apple")}
              disabled={isLoading}
              className="w-full h-12 bg-black hover:bg-gray-900 text-white shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Continue with Apple
            </Button>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-muted-foreground">Signing you in...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
