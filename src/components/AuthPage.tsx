import { useState } from "react";
import { 
  Mail, Lock, Eye, EyeOff, Home, ArrowRight, 
  CheckCircle, User, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface AuthPageProps {
  onLogin: (userType: "traveler" | "owner") => void;
  onRegister: () => void;
}

export function AuthPage({ onLogin, onRegister }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    toast.success("Login successful! Welcome back!");
    // For demo purposes, default to traveler
    setTimeout(() => {
      onLogin("traveler");
    }, 500);
  };

  const handleQuickLogin = (userType: "traveler" | "owner") => {
    toast.success(`Logged in as ${userType}!`);
    onLogin(userType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-white space-y-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <Home className="h-12 w-12" />
            <span className="text-4xl font-bold">StayConnect</span>
          </div>
          
          <h1 className="text-5xl font-bold leading-tight">
            Find Your Perfect Stay, Anywhere
          </h1>
          
          <p className="text-xl text-blue-100">
            Connect with amazing properties and hosts around Nigeria and beyond. 
            Your next adventure starts here.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold mb-1">10,000+</p>
              <p className="text-blue-100">Properties Listed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold mb-1">50,000+</p>
              <p className="text-blue-100">Happy Travelers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold mb-1">4.8/5</p>
              <p className="text-blue-100">Average Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-3xl font-bold mb-1">24/7</p>
              <p className="text-blue-100">Customer Support</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">StayConnect</span>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="cursor-pointer text-sm">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => toast.info("Password reset feature coming soon!")}
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign In
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>

            <div className="my-6">
              <Separator className="relative">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                  OR
                </span>
              </Separator>
            </div>

            {/* Quick Demo Login */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600 text-center mb-2">Quick demo access:</p>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleQuickLogin("traveler")}
              >
                <User className="h-4 w-4 mr-2" />
                Continue as Traveler
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleQuickLogin("owner")}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Continue as Property Owner
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={onRegister}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Create one now
                </button>
              </p>
            </div>

            {/* Security Note */}
            <div className="mt-6 bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                🔒 Secure login with encryption. Compliant with GDPR, CCPA, and Nigerian data protection regulations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
