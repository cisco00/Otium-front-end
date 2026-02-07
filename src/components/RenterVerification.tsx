import { useState } from "react";
import { 
  Shield, 
  CheckCircle, 
  Upload, 
  Camera, 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle,
  FileText,
  User,
  Home,
  CreditCard,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

interface RenterVerificationProps {
  onNavigate: (view: string) => void;
}

export function RenterVerification({ onNavigate }: RenterVerificationProps) {
  const [activeStep, setActiveStep] = useState<"id" | "address" | "phone" | "email" | "selfie">("id");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  
  // Verification states
  const [verificationStatus, setVerificationStatus] = useState({
    id: "pending", // pending, verified, rejected
    address: "not-started",
    phone: "not-started",
    email: "verified",
    selfie: "not-started"
  });

  // Form states
  const [idType, setIdType] = useState("national-id");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const calculateProgress = () => {
    const statuses = Object.values(verificationStatus);
    const completed = statuses.filter(s => s === "verified").length;
    return (completed / statuses.length) * 100;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedDocument(file);
      toast.success(`${type} uploaded successfully!`);
    }
  };

  const handleIdVerification = () => {
    if (!idNumber || !selectedDocument) {
      toast.error("Please provide ID number and upload document");
      return;
    }
    
    setVerificationStatus(prev => ({ ...prev, id: "verified" }));
    toast.success("ID verification submitted! Review typically takes 24-48 hours.");
    setIsDialogOpen(false);
  };

  const handleAddressVerification = () => {
    if (!address || !city || !state) {
      toast.error("Please fill in all address fields");
      return;
    }
    
    setVerificationStatus(prev => ({ ...prev, address: "verified" }));
    toast.success("Address verified successfully!");
    setIsDialogOpen(false);
  };

  const handlePhoneVerification = () => {
    if (!phoneNumber) {
      toast.error("Please enter phone number");
      return;
    }
    
    // Simulate sending OTP
    toast.success("Verification code sent to your phone!");
    setPhoneCode("");
  };

  const handlePhoneCodeSubmit = () => {
    if (phoneCode.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    
    setVerificationStatus(prev => ({ ...prev, phone: "verified" }));
    toast.success("Phone number verified!");
    setIsDialogOpen(false);
  };

  const handleSelfieVerification = () => {
    if (!selectedDocument) {
      toast.error("Please upload a selfie");
      return;
    }
    
    setVerificationStatus(prev => ({ ...prev, selfie: "verified" }));
    toast.success("Selfie submitted for verification!");
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Verified</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Under Review</Badge>;
      case "rejected":
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const verificationSteps = [
    {
      id: "id",
      title: "ID Verification",
      description: "Upload a government-issued ID",
      icon: CreditCard,
      status: verificationStatus.id,
      required: true
    },
    {
      id: "address",
      title: "Address Verification",
      description: "Confirm your residential address",
      icon: Home,
      status: verificationStatus.address,
      required: true
    },
    {
      id: "phone",
      title: "Phone Verification",
      description: "Verify your phone number",
      icon: Phone,
      status: verificationStatus.phone,
      required: true
    },
    {
      id: "email",
      title: "Email Verification",
      description: "Confirm your email address",
      icon: Mail,
      status: verificationStatus.email,
      required: true
    },
    {
      id: "selfie",
      title: "Selfie Verification",
      description: "Take a selfie for identity matching",
      icon: Camera,
      status: verificationStatus.selfie,
      required: false
    }
  ];

  const openVerificationDialog = (step: string) => {
    setActiveStep(step as any);
    setIsDialogOpen(true);
    setSelectedDocument(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10" />
            <h1 className="text-4xl">Verification Center</h1>
          </div>
          <p className="text-teal-100 max-w-2xl">
            Complete your verification to unlock the full Otium experience. Verified users get priority bookings and are trusted by property owners.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        {/* Progress Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Verification Progress</h3>
                <p className="text-sm text-gray-600">
                  {Object.values(verificationStatus).filter(s => s === "verified").length} of {Object.values(verificationStatus).length} steps completed
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-teal-600">{Math.round(calculateProgress())}%</p>
                <p className="text-sm text-gray-600">Complete</p>
              </div>
            </div>
            <Progress value={calculateProgress()} className="h-3" />
            
            {calculateProgress() === 100 && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">Fully Verified!</p>
                  <p className="text-sm text-green-800">You're all set to enjoy priority bookings and host trust.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Verification Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {verificationSteps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.id} className={step.status === "verified" ? "border-green-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${
                        step.status === "verified" ? "bg-green-100" : "bg-teal-100"
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          step.status === "verified" ? "text-green-600" : "text-teal-600"
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {step.title}
                          {step.required && <span className="text-red-500 text-sm">*</span>}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                    {getStatusBadge(step.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  {step.status === "verified" ? (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-900 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Verification complete
                      </p>
                    </div>
                  ) : step.status === "pending" ? (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-900 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Under review - typically takes 24-48 hours
                      </p>
                    </div>
                  ) : step.status === "rejected" ? (
                    <div className="bg-red-50 p-4 rounded-lg space-y-3">
                      <p className="text-sm text-red-900 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Verification rejected - please resubmit
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => openVerificationDialog(step.id)}
                      >
                        Resubmit
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      onClick={() => openVerificationDialog(step.id)}
                    >
                      Start Verification
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <Card className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50">
          <CardHeader>
            <CardTitle>Benefits of Being Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Priority Bookings</p>
                  <p className="text-sm text-gray-600">Verified users get priority when multiple requests are made</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Instant Booking</p>
                  <p className="text-sm text-gray-600">Book instantly without waiting for host approval</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Trust Badge</p>
                  <p className="text-sm text-gray-600">Display a verified badge on your profile</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Enhanced Support</p>
                  <p className="text-sm text-gray-600">Get priority customer support 24/7</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Your Privacy is Protected</p>
              <p>
                All verification data is encrypted and stored securely in compliance with GDPR, CCPA, and Nigerian Data Protection Regulation (NDPR). 
                Your information is only used for identity verification and will never be shared with third parties without your consent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Dialogs */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          {/* ID Verification */}
          {activeStep === "id" && (
            <>
              <DialogHeader>
                <DialogTitle>ID Verification</DialogTitle>
                <DialogDescription>
                  Upload a clear photo of your government-issued ID
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>Document Type</Label>
                  <RadioGroup value={idType} onValueChange={setIdType} className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="national-id" id="national-id" />
                      <Label htmlFor="national-id" className="cursor-pointer">National ID Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="passport" id="passport" />
                      <Label htmlFor="passport" className="cursor-pointer">International Passport</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="drivers-license" id="drivers-license" />
                      <Label htmlFor="drivers-license" className="cursor-pointer">Driver's License</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="id-number">ID Number</Label>
                  <Input
                    id="id-number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="Enter your ID number"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Upload ID Document</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
                    <input
                      type="file"
                      id="id-upload"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "ID document")}
                      className="hidden"
                    />
                    <label htmlFor="id-upload" className="cursor-pointer">
                      <Upload className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm font-semibold mb-1">
                        {selectedDocument ? selectedDocument.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </label>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-xs text-yellow-900">
                    <strong>Tips:</strong> Ensure all corners are visible, text is clear, and there's no glare on the document.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleIdVerification}>
                  Submit for Verification
                </Button>
              </DialogFooter>
            </>
          )}

          {/* Address Verification */}
          {activeStep === "address" && (
            <>
              <DialogHeader>
                <DialogTitle>Address Verification</DialogTitle>
                <DialogDescription>
                  Provide your current residential address
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Lagos"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Lagos State"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zip">Postal/Zip Code</Label>
                  <Input
                    id="zip"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="100001"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Upload Proof of Address (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
                    <input
                      type="file"
                      id="address-upload"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileUpload(e, "Proof of address")}
                      className="hidden"
                    />
                    <label htmlFor="address-upload" className="cursor-pointer">
                      <FileText className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm font-semibold mb-1">
                        {selectedDocument ? selectedDocument.name : "Upload utility bill or bank statement"}
                      </p>
                      <p className="text-xs text-gray-500">Must be dated within the last 3 months</p>
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddressVerification}>
                  Verify Address
                </Button>
              </DialogFooter>
            </>
          )}

          {/* Phone Verification */}
          {activeStep === "phone" && (
            <>
              <DialogHeader>
                <DialogTitle>Phone Verification</DialogTitle>
                <DialogDescription>
                  We'll send a 6-digit code to verify your number
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      onClick={handlePhoneVerification}
                      disabled={!phoneNumber}
                    >
                      Send Code
                    </Button>
                  </div>
                </div>

                {phoneCode !== "" || phoneNumber ? (
                  <div>
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Didn't receive the code? <button className="text-teal-600 hover:underline" onClick={handlePhoneVerification}>Resend</button>
                    </p>
                  </div>
                ) : null}

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-900">
                    Standard SMS rates may apply. The code expires in 10 minutes.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button 
                  className="bg-teal-600 hover:bg-teal-700" 
                  onClick={handlePhoneCodeSubmit}
                  disabled={phoneCode.length !== 6}
                >
                  Verify Phone
                </Button>
              </DialogFooter>
            </>
          )}

          {/* Email Verification */}
          {activeStep === "email" && (
            <>
              <DialogHeader>
                <DialogTitle>Email Verification</DialogTitle>
                <DialogDescription>
                  Your email is already verified
                </DialogDescription>
              </DialogHeader>
              <div className="py-6 text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-lg font-semibold mb-2">Email Verified!</p>
                <p className="text-sm text-gray-600">
                  Your email was verified during registration.
                </p>
              </div>
              <DialogFooter>
                <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => setIsDialogOpen(false)}>
                  Done
                </Button>
              </DialogFooter>
            </>
          )}

          {/* Selfie Verification */}
          {activeStep === "selfie" && (
            <>
              <DialogHeader>
                <DialogTitle>Selfie Verification</DialogTitle>
                <DialogDescription>
                  Take a selfie to match with your ID photo
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>Upload Selfie</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
                    <input
                      type="file"
                      id="selfie-upload"
                      accept="image/*"
                      capture="user"
                      onChange={(e) => handleFileUpload(e, "Selfie")}
                      className="hidden"
                    />
                    <label htmlFor="selfie-upload" className="cursor-pointer">
                      <Camera className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm font-semibold mb-1">
                        {selectedDocument ? selectedDocument.name : "Take or upload a selfie"}
                      </p>
                      <p className="text-xs text-gray-500">Face should be clearly visible</p>
                    </label>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg space-y-2">
                  <p className="text-xs font-semibold text-yellow-900">Selfie Guidelines:</p>
                  <ul className="text-xs text-yellow-900 space-y-1 list-disc list-inside">
                    <li>Remove glasses, hats, or face coverings</li>
                    <li>Ensure good lighting without shadows</li>
                    <li>Look directly at the camera with a neutral expression</li>
                    <li>Make sure your full face is visible</li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button 
                  className="bg-teal-600 hover:bg-teal-700" 
                  onClick={handleSelfieVerification}
                  disabled={!selectedDocument}
                >
                  Submit Selfie
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
