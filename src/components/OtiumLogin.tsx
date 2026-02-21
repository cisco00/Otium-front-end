import { useState } from "react";
import {
  Mail, Lock, Eye, EyeOff, Home, ArrowRight,
  Shield, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface OtiumLoginProps {
  onLogin: (userType: "traveler" | "owner" | "admin") => void;
  onRegisterRenter: () => void;
  onRegisterOwner: () => void;
  onBack: () => void;
}

export function OtiumLogin({ onLogin, onRegisterRenter, onRegisterOwner, onBack }: OtiumLoginProps) {
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

    let userType: "traveler" | "owner" | "admin" = "traveler";

    // Simple heuristic for role determination
    if (email.toLowerCase().includes("admin")) {
      userType = "admin";
    } else if (email.toLowerCase().includes("owner")) {
      userType = "owner";
    }

    toast.success(`Login successful! Welcome to Otium!`);
    setTimeout(() => {
      onLogin(userType);
    }, 500);
  };

  const handleQuickLogin = (type: "traveler" | "owner" | "admin") => {
    toast.success(`Logged in as ${type}!`);
    onLogin(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-700 to-emerald-600 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-white space-y-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <Home className="h-16 w-16 text-yellow-400" />
            <div>
              <span className="text-5xl font-bold text-white">Otium</span>
              <p className="text-yellow-400 text-sm">Your Perfect Stay Awaits</p>
            </div>
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Discover Exceptional Properties Across Nigeria
          </h1>

          <p className="text-xl text-teal-100">
            Whether you're looking for a weekend getaway or listing your property,
            Otium connects you with verified hosts and travelers.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-yellow-400/30">
              <p className="text-4xl font-bold mb-2 text-yellow-400">15,000+</p>
              <p className="text-teal-100">Properties Listed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-yellow-400/30">
              <p className="text-4xl font-bold mb-2 text-yellow-400">80,000+</p>
              <p className="text-teal-100">Happy Travelers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-yellow-400/30">
              <p className="text-4xl font-bold mb-2 text-yellow-400">4.9/5</p>
              <p className="text-teal-100">Average Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-yellow-400/30">
              <p className="text-4xl font-bold mb-2 text-yellow-400">24/7</p>
              <p className="text-teal-100">Support</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-6 text-yellow-400">
            <Shield className="h-5 w-5" />
            <p className="text-sm">Verified hosts & secure payments with Paystack & Flutterwave</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="shadow-2xl border-2 border-yellow-400/30">
          <CardContent className="p-8">
            {/* Back to Home Button */}
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 text-teal-600 hover:bg-teal-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>

            {/* Mobile Logo */}
            <div className="flex items-center justify-center gap-2 mb-6 lg:hidden">
              <Home className="h-10 w-10 text-yellow-400" />
              <div className="text-center">
                <span className="text-3xl font-bold text-teal-600">Otium</span>
                <p className="text-xs text-gray-600">Your Perfect Stay Awaits</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account</p>
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
                  className="text-sm text-teal-600 hover:underline"
                  onClick={() => toast.info("Password reset coming soon!")}
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" size="lg">
                Sign In
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={onRegisterRenter}
                    className="text-teal-600 hover:underline font-semibold"
                  >
                    Register
                  </button>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Looking to list your property?{" "}
                  <button
                    type="button"
                    onClick={onRegisterOwner}
                    className="text-teal-600 hover:underline font-semibold"
                  >
                    Register as Owner
                  </button>
                </p>
              </div>
            </form>

            {/* Security Note */}
            <div className="mt-6 bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600 text-center flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                Secure login with encryption. GDPR, CCPA & Nigerian data protection compliant.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}