import { useState } from "react";
import { 
  User, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft,
  Home, Upload, FileText, MapPin, CreditCard, Briefcase, Video, X, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface OwnerRegistrationProps {
  onComplete: () => void;
  onBack: () => void;
}

export function OwnerRegistration({ onComplete, onBack }: OwnerRegistrationProps) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Info (Step 1)
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    
    // Security (Step 2)
    password: "",
    confirmPassword: "",
    
    // Business Info (Step 3)
    businessType: "individual",
    businessName: "",
    businessRegNumber: "",
    taxId: "",
    
    // Address & ID (Step 4)
    country: "Nigeria",
    state: "",
    city: "",
    address: "",
    idType: "national_id",
    idNumber: "",
    
    // Banking (Step 5)
    bankName: "",
    accountNumber: "",
    accountName: "",
    
    // Property Info (Step 6)
    propertyTypes: {
      apartment: false,
      house: false,
      villa: false,
      condo: false,
      townhouse: false,
      penthouse: false,
    },
    primaryLocations: "",
    experience: "",
    
    // Documents (Step 7)
    idDocument: null as File | null,
    proofOfOwnership: null as File | null,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSteps = 7;

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
      if (formData.businessType === "business" && !formData.businessName.trim()) {
        newErrors.businessName = "Business name is required";
      }
    }

    if (currentStep === 4) {
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.idNumber.trim()) newErrors.idNumber = "ID number is required";
    }

    if (currentStep === 5) {
      if (!formData.bankName.trim()) newErrors.bankName = "Bank name is required";
      if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required";
      if (!formData.accountName.trim()) newErrors.accountName = "Account name is required";
    }

    if (currentStep === 6) {
      const hasSelectedType = Object.values(formData.propertyTypes).some(val => val);
      if (!hasSelectedType) {
        newErrors.propertyTypes = "Please select at least one property type";
      }
      if (!formData.primaryLocations.trim()) {
        newErrors.primaryLocations = "Please enter at least one location";
      }
      if (!formData.experience) {
        newErrors.experience = "Please select your experience level";
      }
    }

    if (currentStep === 7) {
      if (!formData.idDocument) {
        newErrors.idDocument = "Please upload an ID document";
      }
      if (!formData.proofOfOwnership) {
        newErrors.proofOfOwnership = "Please upload proof of ownership";
      }
      if (!formData.termsAccepted) {
        newErrors.terms = "You must accept the terms and conditions";
      }
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
      toast.success("Registration successful! Your account is pending verification.");
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

  const updatePropertyType = (type: string, checked: boolean) => {
    setFormData({
      ...formData,
      propertyTypes: {
        ...formData.propertyTypes,
        [type]: checked,
      }
    });
    if (errors.propertyTypes) {
      const newErrors = { ...errors };
      delete newErrors.propertyTypes;
      setErrors(newErrors);
    }
  };

  const handleFileUpload = (field: 'idDocument' | 'proofOfOwnership', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFormData(field, file);
      toast.success(`${field === 'idDocument' ? 'ID Document' : 'Proof of Ownership'} uploaded successfully`);
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

  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step === 1 ? "Back to Home" : "Back"}
          </Button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Create Owner Account</h1>
            <p className="text-white/90">Step {step} of {totalSteps}</p>
          </div>

          {/* Progress Indicators */}
          <Progress value={(step / totalSteps) * 100} className="h-2" />
        </div>

        <Card className="shadow-2xl">
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
              </div>
            )}

            {/* Step 2: Security */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-teal-600" />
                  </div>
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

            {/* Step 3: Business Information */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Business Information</h2>
                  <p className="text-gray-600">Tell us about your business</p>
                </div>

                <div>
                  <Label>Business Type *</Label>
                  <RadioGroup 
                    value={formData.businessType} 
                    onValueChange={(value) => updateFormData("businessType", value)}
                    className="mt-2 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="cursor-pointer">Individual Host</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="business" id="business" />
                      <Label htmlFor="business" className="cursor-pointer">Registered Business</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.businessType === "business" && (
                  <>
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Enter your business name"
                        value={formData.businessName}
                        onChange={(e) => updateFormData("businessName", e.target.value)}
                        className="mt-1"
                      />
                      {errors.businessName && (
                        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.businessName}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="businessRegNumber">Business Registration Number (Optional)</Label>
                      <Input
                        id="businessRegNumber"
                        placeholder="RC123456"
                        value={formData.businessRegNumber}
                        onChange={(e) => updateFormData("businessRegNumber", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="taxId">Tax ID / TIN (Optional)</Label>
                      <Input
                        id="taxId"
                        placeholder="Enter your tax identification number"
                        value={formData.taxId}
                        onChange={(e) => updateFormData("taxId", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 4: Address & ID Verification */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Address & Verification</h2>
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
                    placeholder="123 Main Street"
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

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Identity Verification</h3>
                  
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

                  <div className="mt-4">
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
                </div>
              </div>
            )}

            {/* Step 5: Banking Information */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Banking Information</h2>
                  <p className="text-gray-600">For receiving payments</p>
                </div>

                <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Secure Payment:</strong> Your banking information is encrypted and secure. 
                    We support Paystack, Flutterwave, and direct bank transfers.
                  </p>
                </div>

                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    placeholder="Select or enter your bank"
                    value={formData.bankName}
                    onChange={(e) => updateFormData("bankName", e.target.value)}
                    className="mt-1"
                  />
                  {errors.bankName && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.bankName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    placeholder="0123456789"
                    value={formData.accountNumber}
                    onChange={(e) => updateFormData("accountNumber", e.target.value)}
                    className="mt-1"
                  />
                  {errors.accountNumber && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.accountNumber}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="accountName">Account Name *</Label>
                  <Input
                    id="accountName"
                    placeholder="John Doe"
                    value={formData.accountName}
                    onChange={(e) => updateFormData("accountName", e.target.value)}
                    className="mt-1"
                  />
                  {errors.accountName && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.accountName}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 6: Property Types, Locations, Experience */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Home className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Property Details</h2>
                  <p className="text-gray-600">Tell us about your properties</p>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Property Types You Own</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="apartment"
                        checked={formData.propertyTypes.apartment}
                        onCheckedChange={(checked) => updatePropertyType("apartment", checked as boolean)}
                      />
                      <label htmlFor="apartment" className="text-sm font-medium cursor-pointer">
                        Apartment
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="house"
                        checked={formData.propertyTypes.house}
                        onCheckedChange={(checked) => updatePropertyType("house", checked as boolean)}
                      />
                      <label htmlFor="house" className="text-sm font-medium cursor-pointer">
                        House
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="villa"
                        checked={formData.propertyTypes.villa}
                        onCheckedChange={(checked) => updatePropertyType("villa", checked as boolean)}
                      />
                      <label htmlFor="villa" className="text-sm font-medium cursor-pointer">
                        Villa
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="condo"
                        checked={formData.propertyTypes.condo}
                        onCheckedChange={(checked) => updatePropertyType("condo", checked as boolean)}
                      />
                      <label htmlFor="condo" className="text-sm font-medium cursor-pointer">
                        Condo
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="townhouse"
                        checked={formData.propertyTypes.townhouse}
                        onCheckedChange={(checked) => updatePropertyType("townhouse", checked as boolean)}
                      />
                      <label htmlFor="townhouse" className="text-sm font-medium cursor-pointer">
                        Townhouse
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="penthouse"
                        checked={formData.propertyTypes.penthouse}
                        onCheckedChange={(checked) => updatePropertyType("penthouse", checked as boolean)}
                      />
                      <label htmlFor="penthouse" className="text-sm font-medium cursor-pointer">
                        Penthouse
                      </label>
                    </div>
                  </div>
                  {errors.propertyTypes && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.propertyTypes}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="primaryLocations" className="text-base font-semibold">Primary Locations</Label>
                  <Textarea
                    id="primaryLocations"
                    placeholder="List the cities/areas where your properties are located"
                    value={formData.primaryLocations}
                    onChange={(e) => updateFormData("primaryLocations", e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                  {errors.primaryLocations && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.primaryLocations}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="experience" className="text-base font-semibold">Experience</Label>
                  <Select value={formData.experience} onValueChange={(value) => updateFormData("experience", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.experience}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 7: Document Upload & Terms */}
            {step === 7 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h2 className="text-2xl mb-2">Final Step</h2>
                  <p className="text-gray-600">Upload required documents</p>
                </div>

                {/* Upload ID Document */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-semibold mb-1">Upload ID Document</h3>
                  <p className="text-sm text-gray-600 mb-4">Passport or Government ID</p>
                  <div className="relative">
                    <input
                      type="file"
                      id="idDocument"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('idDocument', e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button variant="outline" className="relative pointer-events-none">
                      Choose File
                    </Button>
                  </div>
                  {formData.idDocument && (
                    <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {formData.idDocument.name}
                    </p>
                  )}
                  {errors.idDocument && (
                    <p className="text-sm text-red-600 mt-2 flex items-center justify-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.idDocument}
                    </p>
                  )}
                </div>

                {/* Upload Proof of Ownership */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-semibold mb-1">Proof of Ownership</h3>
                  <p className="text-sm text-gray-600 mb-4">Property deed or rental agreement</p>
                  <div className="relative">
                    <input
                      type="file"
                      id="proofOfOwnership"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('proofOfOwnership', e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button variant="outline" className="relative pointer-events-none">
                      Choose File
                    </Button>
                  </div>
                  {formData.proofOfOwnership && (
                    <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {formData.proofOfOwnership.name}
                    </p>
                  )}
                  {errors.proofOfOwnership && (
                    <p className="text-sm text-red-600 mt-2 flex items-center justify-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.proofOfOwnership}
                    </p>
                  )}
                </div>

                {/* Upload Property Video */}
                <Card className="border-2 border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                      <div className="space-y-2">
                        <h3 className="font-semibold text-yellow-900">Property Verification Video Required</h3>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• <strong>Duration:</strong> 2 minutes maximum</li>
                          <li>• <strong>Format:</strong> MP4, MOV, AVI, or WebM</li>
                          <li>• <strong>Maximum file size:</strong> 500MB</li>
                          <li>• <strong>Content must show:</strong> All bedrooms, bathrooms, living areas, kitchen, parking, gym/pool (if listed)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {!uploadedVideo ? (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="videoUpload"
                      className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-teal-300 rounded-lg cursor-pointer bg-teal-50 hover:bg-teal-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <Video className="h-16 w-16 text-teal-600 mb-4" />
                        <p className="mb-2 text-lg font-semibold text-teal-700">
                          Click to upload property video
                        </p>
                        <p className="text-sm text-teal-600">
                          MP4, MOV, AVI or WebM (MAX. 500MB, 2 minutes)
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                          <span className="text-xs font-semibold text-teal-700">REQUIRED FOR VERIFICATION</span>
                        </div>
                      </div>
                      <input
                        id="videoUpload"
                        type="file"
                        accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Validate file size (500MB = 524288000 bytes)
                            if (file.size > 524288000) {
                              toast.error("File too large", {
                                description: "Please upload a video smaller than 500MB",
                              });
                              return;
                            }
                            
                            setUploadedVideo(file);
                            setVideoPreviewUrl(URL.createObjectURL(file));
                            
                            // Simulate upload progress
                            setIsUploading(true);
                            setUploadProgress(0);
                            const interval = setInterval(() => {
                              setUploadProgress((prev) => {
                                if (prev >= 100) {
                                  clearInterval(interval);
                                  setIsUploading(false);
                                  toast.success("Video uploaded successfully!");
                                  return 100;
                                }
                                return prev + 10;
                              });
                            }, 200);
                          }
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative bg-black rounded-lg overflow-hidden">
                      <video
                        src={videoPreviewUrl}
                        controls
                        className="w-full h-auto max-h-96 object-contain"
                      >
                        Your browser does not support the video tag.
                      </video>
                      <button
                        onClick={() => {
                          setUploadedVideo(null);
                          setVideoPreviewUrl("");
                          setUploadProgress(0);
                        }}
                        className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                          <div>
                            <p className="font-semibold text-green-900">Video uploaded successfully!</p>
                            <p className="text-sm text-green-700">{uploadedVideo.name}</p>
                            <p className="text-xs text-green-600 mt-1">
                              File size: {(uploadedVideo.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-teal-700 font-medium">Uploading video...</span>
                      <span className="text-teal-600">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Camera className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Pro Tips for Great Videos:</p>
                      <ul className="text-xs text-blue-800 space-y-1 mt-2">
                        <li>• Record in landscape mode (horizontal)</li>
                        <li>• Use good lighting (natural light is best)</li>
                        <li>• Walk slowly through each room</li>
                        <li>• Speak clearly to describe features</li>
                        <li>• Show storage spaces and closets</li>
                        <li>• Highlight unique features and amenities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-3 pt-4">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => updateFormData("termsAccepted", checked)}
                  />
                  <Label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed">
                    I agree to the{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                      Terms of Service
                    </a>
                    ,{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                      Privacy Policy
                    </a>
                    , and{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                      Host Agreement
                    </a>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.terms}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Back
              </Button>
              
              {step < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-semibold"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-semibold"
                >
                  Complete Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}