import { useState } from "react";
import { 
  User, Mail, Lock, Phone, MapPin, Calendar, 
  Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, ArrowLeft,
  Shield, CreditCard, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface UserRegistrationProps {
  onComplete: (userType: "traveler" | "owner") => void;
  onBack: () => void;
}

export function UserRegistration({ onComplete, onBack }: UserRegistrationProps) {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"traveler" | "owner">("traveler");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    // Step 1: Account Type
    accountType: "traveler",
    
    // Step 2: Basic Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Step 3: Security
    password: "",
    confirmPassword: "",
    
    // Step 4: Address
    country: "",
    city: "",
    address: "",
    
    // Step 5: Preferences
    notifications: true,
    termsAccepted: false,
    privacyAccepted: false,
    marketingAccepted: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 2) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    if (currentStep === 3) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (!validatePassword(formData.password)) {
        newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, and number";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (currentStep === 4) {
      if (!formData.country.trim()) newErrors.country = "Country is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
    }

    if (currentStep === 5) {
      if (!formData.termsAccepted) newErrors.terms = "You must accept the terms and conditions";
      if (!formData.privacyAccepted) newErrors.privacy = "You must accept the privacy policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      toast.error("Please fix the errors before continuing");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    if (validateStep(step)) {
      toast.success("Registration successful! Welcome to StayConnect!");
      setTimeout(() => {
        onComplete(userType);
      }, 1000);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    if (strength <= 25) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 50) return { strength, label: "Fair", color: "bg-orange-500" };
    if (strength <= 75) return { strength, label: "Good", color: "bg-yellow-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-semibold">Create Your Account</h1>
            <span className="text-sm text-gray-600">Step {step} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-6 sm:p-8">
            {/* Step 1: Account Type */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl mb-2">Welcome to StayConnect!</h2>
                  <p className="text-gray-600">Let's get started. What brings you here?</p>
                </div>

                <RadioGroup 
                  value={formData.accountType} 
                  onValueChange={(value) => {
                    updateFormData("accountType", value);
                    setUserType(value as "traveler" | "owner");
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="traveler"
                    className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500 ${
                      formData.accountType === "traveler" ? "border-blue-600 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem value="traveler" id="traveler" className="sr-only" />
                    <User className="h-12 w-12 mb-4 text-blue-600" />
                    <h3 className="font-semibold mb-2">I'm a Traveler</h3>
                    <p className="text-sm text-gray-600 text-center">
                      Looking for amazing places to stay
                    </p>
                  </Label>

                  <Label
                    htmlFor="owner"
                    className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-500 ${
                      formData.accountType === "owner" ? "border-purple-600 bg-purple-50" : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem value="owner" id="owner" className="sr-only" />
                    <Home className="h-12 w-12 mb-4 text-purple-600" />
                    <h3 className="font-semibold mb-2">I'm a Property Owner</h3>
                    <p className="text-sm text-gray-600 text-center">
                      Want to list my property and earn
                    </p>
                  </Label>
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Basic Info */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl mb-2">Personal Information</h2>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 800 123 4567"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Security */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h2 className="text-2xl mb-2">Secure Your Account</h2>
                  <p className="text-gray-600">Create a strong password to protect your account</p>
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
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
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Password strength:</span>
                        <span className={`text-xs font-semibold ${
                          passwordStrength.strength <= 50 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Must be at least 8 characters with uppercase, lowercase, and number
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Passwords match
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Address */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h2 className="text-2xl mb-2">Where are you located?</h2>
                  <p className="text-gray-600">This helps us provide better local recommendations</p>
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="country"
                      placeholder="Nigeria"
                      value={formData.country}
                      onChange={(e) => updateFormData("country", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.country && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.country}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="city"
                      placeholder="Lagos"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.city && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      placeholder="123 Main Street, Apartment 4B"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Preferences & Terms */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h2 className="text-2xl mb-2">Almost Done!</h2>
                  <p className="text-gray-600">Just a few more details</p>
                </div>

                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold">Privacy & Communication</h3>
                  
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="notifications"
                      checked={formData.notifications}
                      onCheckedChange={(checked) => updateFormData("notifications", checked)}
                    />
                    <Label htmlFor="notifications" className="cursor-pointer">
                      <span className="font-medium">Enable notifications</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Receive booking updates, property recommendations, and important alerts
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="marketing"
                      checked={formData.marketingAccepted}
                      onCheckedChange={(checked) => updateFormData("marketingAccepted", checked)}
                    />
                    <Label htmlFor="marketing" className="cursor-pointer">
                      <span className="font-medium">Marketing communications</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Get special offers, tips, and travel inspiration (optional)
                      </p>
                    </Label>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-6">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => updateFormData("termsAccepted", checked)}
                    />
                    <Label htmlFor="terms" className="cursor-pointer">
                      <span className="font-medium">I accept the Terms and Conditions *</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Read our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                      </p>
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-red-600 ml-7 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.terms}
                    </p>
                  )}

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacyAccepted}
                      onCheckedChange={(checked) => updateFormData("privacyAccepted", checked)}
                    />
                    <Label htmlFor="privacy" className="cursor-pointer">
                      <span className="font-medium">I accept the Privacy Policy *</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Read our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> 
                        {" "}(GDPR, CCPA, and Nigerian data protection compliant)
                      </p>
                    </Label>
                  </div>
                  {errors.privacy && (
                    <p className="text-sm text-red-600 ml-7 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.privacy}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> This platform is not meant for collecting highly sensitive personal information. 
                    All data is encrypted and handled securely in compliance with international data protection regulations.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              {step < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="flex-1"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button onClick={onBack} className="text-blue-600 hover:underline font-semibold">
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
