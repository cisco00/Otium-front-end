import { useState } from "react";
import { 
  User, Mail, Lock, Phone, MapPin, Calendar, 
  Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, ArrowLeft,
  Shield, Home, Upload, CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface RenterRegistrationProps {
  onComplete: () => void;
  onBack: () => void;
}

export function RenterRegistration({ onComplete, onBack }: RenterRegistrationProps) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    occupation: "",
    password: "",
    confirmPassword: "",
    country: "Nigeria",
    state: "",
    city: "",
    address: "",
    idType: "national_id",
    idNumber: "",
    emergencyContact: "",
    emergencyPhone: "",
    termsAccepted: false,
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => phone.length >= 10 && /^[\d\s\-\+\(\)]+$/.test(phone);
  const validatePassword = (password: string) => 
    password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
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
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    }

    if (currentStep === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (!validatePassword(formData.password)) {
        newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, and number";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (currentStep === 3) {
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
    }

    if (currentStep === 4) {
      if (!formData.idNumber.trim()) newErrors.idNumber = "ID number is required";
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact name is required";
      if (!formData.emergencyPhone.trim()) {
        newErrors.emergencyPhone = "Emergency contact phone is required";
      } else if (!validatePhone(formData.emergencyPhone)) {
        newErrors.emergencyPhone = "Please enter a valid phone number";
      }
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
      toast.success("Registration successful! Welcome to Otium!");
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
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
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-700 to-emerald-600 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Home className="h-10 w-10 text-yellow-400" />
            <span className="text-4xl font-bold text-white">Otium</span>
          </div>
          <h1 className="text-2xl text-white mb-2">Renter Registration</h1>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <span>Step {step} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2 mt-4 bg-teal-800" />
        </div>

        <Card className="shadow-2xl border-2 border-yellow-400/20">
          <CardContent className="p-6 sm:p-8">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <User className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Personal Information</h2>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      className="mt-1"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      className="mt-1"
                    />
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
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 123 4567"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="mt-1"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    className="mt-1"
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="e.g., Software Engineer, Teacher, Business Owner"
                    value={formData.occupation}
                    onChange={(e) => updateFormData("occupation", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional - helps us serve you better</p>
                </div>
              </div>
            )}

            {/* Step 2: Security */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Secure Your Account</h2>
                  <p className="text-gray-600">Create a strong password</p>
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
                      className="pr-10"
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
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                      className="pr-10"
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

            {/* Step 3: Address */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Address Information</h2>
                  <p className="text-gray-600">Where are you located?</p>
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => updateFormData("country", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="Lagos"
                      value={formData.state}
                      onChange={(e) => updateFormData("state", e.target.value)}
                      className="mt-1"
                    />
                    {errors.state && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Ikeja"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      className="mt-1"
                    />
                    {errors.city && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street, Apartment 4B"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    className="mt-1"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Verification & Emergency Contact */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Verification & Emergency Contact</h2>
                  <p className="text-gray-600">For your safety and security</p>
                </div>

                <div>
                  <Label htmlFor="idType">ID Type *</Label>
                  <RadioGroup 
                    value={formData.idType} 
                    onValueChange={(value) => updateFormData("idType", value)}
                    className="mt-2 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="national_id" id="national_id" />
                      <Label htmlFor="national_id" className="cursor-pointer">National ID</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="passport" id="passport" />
                      <Label htmlFor="passport" className="cursor-pointer">International Passport</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="drivers_license" id="drivers_license" />
                      <Label htmlFor="drivers_license" className="cursor-pointer">Driver's License</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter your ID number"
                    value={formData.idNumber}
                    onChange={(e) => updateFormData("idNumber", e.target.value)}
                    className="mt-1"
                  />
                  {errors.idNumber && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.idNumber}
                    </p>
                  )}
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Emergency Contact</h3>
                  
                  <div>
                    <Label htmlFor="emergencyContact">Contact Name *</Label>
                    <Input
                      id="emergencyContact"
                      placeholder="Jane Doe"
                      value={formData.emergencyContact}
                      onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                      className="mt-1"
                    />
                    {errors.emergencyContact && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.emergencyContact}
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      placeholder="+234 800 123 4567"
                      value={formData.emergencyPhone}
                      onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                      className="mt-1"
                    />
                    {errors.emergencyPhone && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.emergencyPhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Terms & Conditions */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h2 className="text-2xl mb-2">Terms & Conditions</h2>
                  <p className="text-gray-600">Almost done!</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 border p-4 rounded-lg">
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
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.terms}
                    </p>
                  )}

                  <div className="flex items-start gap-3 border p-4 rounded-lg">
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
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.privacy}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Data Protection:</strong> Your information is encrypted and securely stored. 
                    We comply with GDPR, CCPA, and Nigerian data protection regulations.
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
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-900"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-white mt-6">
          Already have an account?{" "}
          <button onClick={onBack} className="text-yellow-400 hover:underline font-semibold">
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}