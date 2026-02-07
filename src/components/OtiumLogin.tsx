import { useState } from "react";
import { 
  Mail, Lock, Eye, EyeOff, Home, ArrowRight, 
  User, Building2, Shield, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface OtiumLoginProps {
  onLogin: (userType: "traveler" | "owner" | "admin") => void;
  onRegisterRenter: () => void;
  onRegisterOwner: () => void;
  onBack: () => void;
}

export function OtiumLogin({ onLogin, onRegisterRenter, onRegisterOwner, onBack }: OtiumLoginProps) {
  const [activeTab, setActiveTab] = useState<"renter" | "owner" | "admin">("renter");
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
    
    if (activeTab === "owner") {
      userType = "owner";
    } else if (activeTab === "admin") {
      userType = "admin";
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

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="renter" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Renter</span>
                </TabsTrigger>
                <TabsTrigger value="owner" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Owner</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="renter" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="renter-email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="renter-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="renter-password">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="renter-password"
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
                    Sign In as Renter
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
                        Register as Renter
                      </button>
                    </p>
                  </div>

                  {/* Quick Demo */}
                  <div className="pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleQuickLogin("traveler")}
                    >
                      Quick Demo Login (Renter)
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="owner" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="owner-email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="owner-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="owner-password">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="owner-password"
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
                        id="remember-owner"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember-owner" className="cursor-pointer text-sm">
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

                  <Button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-900" size="lg">
                    Sign In as Owner
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={onRegisterOwner}
                        className="text-teal-600 hover:underline font-semibold"
                      >
                        Register as Owner
                      </button>
                    </p>
                  </div>

                  {/* Quick Demo */}
                  <div className="pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleQuickLogin("owner")}
                    >
                      Quick Demo Login (Owner)
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="mb-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                    <div className="flex items-center gap-2 text-teal-700">
                      <Shield className="h-5 w-5" />
                      <p className="text-sm font-semibold">Admin Access</p>
                    </div>
                    <p className="text-xs text-teal-600 mt-1">
                      Restricted access for platform administrators only
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="admin-email">Admin Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@otium.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter admin password"
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
                        id="remember-admin"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember-admin" className="cursor-pointer text-sm">
                        Remember me
                      </Label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-teal-600 hover:underline"
                      onClick={() => toast.info("Contact system administrator for password reset")}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button type="submit" className="w-full bg-[#0F5257] hover:bg-[#0a3a3e] text-white" size="lg">
                    <Shield className="h-4 w-4 mr-2" />
                    Sign In as Admin
                  </Button>

                  {/* Quick Demo */}
                  <div className="pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-teal-300"
                      onClick={() => handleQuickLogin("admin")}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Quick Demo Login (Admin)
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

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