import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  
  Home,
  MapPin,
  DollarSign,
  ImagePlus,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Wifi,
  Car,
  Tv,
  Wind,
  Coffee,
  Waves,
  Dumbbell,
  Camera,
  AlertCircle,
  Video,
  Upload,
  X,
  Play,
} from "lucide-react";
import { toast } from "sonner";

interface AddPropertyProps {
  onNavigate: (view: string) => void;
  propertyId?: number | null;
}

export function AddProperty({ onNavigate, propertyId }: AddPropertyProps) {
  const isEditMode = propertyId !== undefined && propertyId !== null;
  const [step, setStep] = useState(1);
  const totalSteps = 5; // Back to 5 steps - video upload moved to owner registration
  const progress = (step / totalSteps) * 100;

  const [formData, setFormData] = useState({
    // Basic Information
    propertyName: "",
    propertyType: "",
    description: "",
    
    // Location
    country: "Nigeria",
    state: "",
    city: "",
    address: "",
    postalCode: "",
    
    // Property Details
    bedrooms: "",
    bathrooms: "",
    maxGuests: "",
    propertySize: "",
    
    // Pricing
    pricePerNight: "",
    cleaningFee: "",
    securityDeposit: "",
    
    // Amenities
    amenities: [] as string[],
    
    // Property Rules
    checkInTime: "14:00",
    checkOutTime: "11:00",
    minimumStay: "1",
    maximumStay: "",
    smokingAllowed: false,
    petsAllowed: false,
    partiesAllowed: false,
    childrenAllowed: true,
    additionalRules: "",
    
    // Images (mock - would integrate with file upload)
    images: [] as string[],
    
    // Verification
    ownershipProof: "",
    taxId: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableAmenities = [
    { id: "wifi", name: "WiFi", icon: Wifi },
    { id: "parking", name: "Free Parking", icon: Car },
    { id: "tv", name: "TV", icon: Tv },
    { id: "ac", name: "Air Conditioning", icon: Wind },
    { id: "kitchen", name: "Kitchen", icon: Coffee },
    { id: "pool", name: "Swimming Pool", icon: Waves },
    { id: "gym", name: "Gym", icon: Dumbbell },
    { id: "security", name: "24/7 Security", icon: Camera },
  ];

  // Load property data when in edit mode
  useEffect(() => {
    if (isEditMode && propertyId) {
      // Mock property data - in a real app, this would fetch from API
      const mockProperties: Record<number, any> = {
        1: {
          propertyName: "Modern Apartment in Lagos",
          propertyType: "apartment",
          description: "A beautifully designed modern apartment in the heart of Victoria Island, featuring contemporary finishes and world-class amenities.",
          state: "Lagos",
          city: "Victoria Island",
          address: "23 Ahmadu Bello Way",
          postalCode: "101241",
          bedrooms: "3",
          bathrooms: "2",
          maxGuests: "6",
          propertySize: "120",
          pricePerNight: "35000",
          cleaningFee: "5000",
          securityDeposit: "50000",
          amenities: ["wifi", "ac", "parking", "security"],
          checkInTime: "14:00",
          checkOutTime: "11:00",
          minimumStay: "1",
          maximumStay: "30",
          smokingAllowed: false,
          petsAllowed: false,
          partiesAllowed: false,
          childrenAllowed: true,
          additionalRules: "Quiet hours: 10 PM - 7 AM",
          termsAccepted: true,
        },
        2: {
          propertyName: "Luxury Villa in Abuja",
          propertyType: "villa",
          description: "An exquisite luxury villa located in the prestigious Maitama district, offering unparalleled comfort and elegance with stunning city views.",
          state: "Abuja FCT",
          city: "Maitama",
          address: "45 Aguiyi Ironsi Street",
          postalCode: "900103",
          bedrooms: "5",
          bathrooms: "4",
          maxGuests: "10",
          propertySize: "350",
          pricePerNight: "97500",
          cleaningFee: "15000",
          securityDeposit: "150000",
          amenities: ["wifi", "ac", "parking", "security", "pool", "gym"],
          checkInTime: "15:00",
          checkOutTime: "12:00",
          minimumStay: "2",
          maximumStay: "60",
          smokingAllowed: false,
          petsAllowed: true,
          partiesAllowed: false,
          childrenAllowed: true,
          additionalRules: "No loud music after 11 PM",
          termsAccepted: true,
        },
        3: {
          propertyName: "Cozy Bungalow in Port Harcourt",
          propertyType: "house",
          description: "A charming and cozy bungalow in the Garden City, perfect for families and small groups seeking a peaceful getaway with modern comforts.",
          state: "Rivers",
          city: "GRA",
          address: "12 Forces Avenue",
          postalCode: "500102",
          bedrooms: "2",
          bathrooms: "2",
          maxGuests: "4",
          propertySize: "95",
          pricePerNight: "28000",
          cleaningFee: "3500",
          securityDeposit: "40000",
          amenities: ["wifi", "ac", "parking", "tv"],
          checkInTime: "14:00",
          checkOutTime: "11:00",
          minimumStay: "1",
          maximumStay: "14",
          smokingAllowed: false,
          petsAllowed: false,
          partiesAllowed: false,
          childrenAllowed: true,
          additionalRules: "",
          termsAccepted: true,
        },
        4: {
          propertyName: "Penthouse Suite in Lekki",
          propertyType: "apartment",
          description: "Experience luxury living in this stunning penthouse suite with panoramic ocean views, modern amenities, and premium finishes throughout.",
          state: "Lagos",
          city: "Lekki Phase 1",
          address: "78 Admiralty Way",
          postalCode: "101245",
          bedrooms: "4",
          bathrooms: "3",
          maxGuests: "8",
          propertySize: "200",
          pricePerNight: "75000",
          cleaningFee: "8000",
          securityDeposit: "100000",
          amenities: ["wifi", "ac", "parking", "security", "gym", "pool"],
          checkInTime: "15:00",
          checkOutTime: "12:00",
          minimumStay: "2",
          maximumStay: "45",
          smokingAllowed: false,
          petsAllowed: false,
          partiesAllowed: false,
          childrenAllowed: true,
          additionalRules: "Maximum 2 cars in parking area",
          termsAccepted: true,
        },
      };

      const propertyData = mockProperties[propertyId];
      if (propertyData) {
        setFormData(propertyData);
        toast.success("Property data loaded for editing");
      }
    }
  }, [isEditMode, propertyId]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.propertyName.trim()) newErrors.propertyName = "Property name is required";
      if (!formData.propertyType) newErrors.propertyType = "Property type is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (formData.description.length < 50) newErrors.description = "Description must be at least 50 characters";
    }

    if (currentStep === 2) {
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
    }

    if (currentStep === 3) {
      if (!formData.bedrooms) newErrors.bedrooms = "Number of bedrooms is required";
      if (!formData.bathrooms) newErrors.bathrooms = "Number of bathrooms is required";
      if (!formData.maxGuests) newErrors.maxGuests = "Maximum guests is required";
      if (!formData.propertySize) newErrors.propertySize = "Property size is required";
    }

    if (currentStep === 4) {
      if (!formData.pricePerNight) newErrors.pricePerNight = "Price per night is required";
      if (parseFloat(formData.pricePerNight) < 1000) newErrors.pricePerNight = "Minimum price is ₦1,000";
    }

    if (currentStep === 5) {
      if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const successMessage = isEditMode 
      ? "Property Updated Successfully!"
      : "Property Listed Successfully!";
    const successDescription = isEditMode
      ? "Your property changes have been saved."
      : "Your property is now live and available for bookings.";
    
    toast.success(successMessage, {
      description: successDescription,
    });
    setTimeout(() => {
      onNavigate("search"); // Navigate to My Properties page
    }, 2000);
  };

  const nigeriaStates = [
    "Lagos", "Abuja FCT", "Rivers", "Kano", "Oyo", "Delta", "Edo",
    "Ogun", "Kaduna", "Anambra", "Imo", "Enugu", "Abia", "Katsina",
    "Bauchi", "Jigawa", "Benue", "Niger", "Plateau", "Akwa Ibom"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-700 to-emerald-600 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Home className="h-10 w-10 text-yellow-400" />
            <span className="text-4xl font-bold text-white">Otium</span>
          </div>
          <h1 className="text-2xl text-white mb-2">
            {isEditMode ? "Edit Your Property" : "List Your Property"}
          </h1>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <span>Step {step} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2 mt-4 bg-teal-800" />
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-teal-700">
              {step === 1 && "Basic Information"}
              {step === 2 && "Location Details"}
              {step === 3 && "Property Details"}
              {step === 4 && "Pricing & Amenities"}
              {step === 5 && "Property Rules & Confirmation"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Home className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Tell us about your property</h2>
                  <p className="text-gray-600">Provide basic information</p>
                </div>

                <div>
                  <Label htmlFor="propertyName">Property Name *</Label>
                  <Input
                    id="propertyName"
                    placeholder="e.g., Luxury Lekki Apartment"
                    value={formData.propertyName}
                    onChange={(e) => updateFormData("propertyName", e.target.value)}
                    className="mt-1"
                  />
                  {errors.propertyName && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.propertyName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => updateFormData("propertyType", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="guesthouse">Guest House</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.propertyType && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.propertyType}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Property Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property in detail (minimum 50 characters)"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className="mt-1 h-32"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">
                      {formData.description.length} / 50 characters minimum
                    </p>
                    {errors.description && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Where is your property?</h2>
                  <p className="text-gray-600">Help guests find you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      disabled
                      className="mt-1 bg-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => updateFormData("state", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigeriaStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      placeholder="e.g., Victoria Island"
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

                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      placeholder="Full street address"
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

                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      placeholder="Optional"
                      value={formData.postalCode}
                      onChange={(e) => updateFormData("postalCode", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Property Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Home className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Property Specifications</h2>
                  <p className="text-gray-600">Tell us about the space</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms *</Label>
                    <Select
                      value={formData.bedrooms}
                      onValueChange={(value) => updateFormData("bedrooms", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Number of bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4 Bedrooms</SelectItem>
                        <SelectItem value="5+">5+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.bedrooms && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.bedrooms}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bathrooms">Bathrooms *</Label>
                    <Select
                      value={formData.bathrooms}
                      onValueChange={(value) => updateFormData("bathrooms", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Number of bathrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                        <SelectItem value="3">3 Bathrooms</SelectItem>
                        <SelectItem value="3.5+">3.5+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.bathrooms && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.bathrooms}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="maxGuests">Maximum Guests *</Label>
                    <Input
                      id="maxGuests"
                      type="number"
                      min="1"
                      placeholder="e.g., 4"
                      value={formData.maxGuests}
                      onChange={(e) => updateFormData("maxGuests", e.target.value)}
                      className="mt-1"
                    />
                    {errors.maxGuests && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.maxGuests}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="propertySize">Property Size (sqm) *</Label>
                    <Input
                      id="propertySize"
                      type="number"
                      placeholder="e.g., 120"
                      value={formData.propertySize}
                      onChange={(e) => updateFormData("propertySize", e.target.value)}
                      className="mt-1"
                    />
                    {errors.propertySize && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.propertySize}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Pricing & Amenities */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Pricing & Features</h2>
                  <p className="text-gray-600">Set your rates and amenities</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pricePerNight">Price Per Night (₦) *</Label>
                    <Input
                      id="pricePerNight"
                      type="number"
                      min="1000"
                      placeholder="e.g., 25000"
                      value={formData.pricePerNight}
                      onChange={(e) => updateFormData("pricePerNight", e.target.value)}
                      className="mt-1"
                    />
                    {errors.pricePerNight && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.pricePerNight}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cleaningFee">Cleaning Fee (₦)</Label>
                      <Input
                        id="cleaningFee"
                        type="number"
                        placeholder="Optional"
                        value={formData.cleaningFee}
                        onChange={(e) => updateFormData("cleaningFee", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="securityDeposit">Security Deposit (₦)</Label>
                      <Input
                        id="securityDeposit"
                        type="number"
                        placeholder="Optional"
                        value={formData.securityDeposit}
                        onChange={(e) => updateFormData("securityDeposit", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Select Amenities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availableAmenities.map((amenity) => {
                        const Icon = amenity.icon;
                        const isSelected = formData.amenities.includes(amenity.id);
                        return (
                          <button
                            key={amenity.id}
                            type="button"
                            onClick={() => toggleAmenity(amenity.id)}
                            className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                              isSelected
                                ? "border-teal-600 bg-teal-50"
                                : "border-gray-200 hover:border-teal-300"
                            }`}
                          >
                            <Icon
                              className={`h-6 w-6 ${
                                isSelected ? "text-teal-600" : "text-gray-400"
                              }`}
                            />
                            <span
                              className={`text-xs text-center ${
                                isSelected ? "text-teal-700 font-semibold" : "text-gray-600"
                              }`}
                            >
                              {amenity.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Rules & Confirmation */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                  <h2 className="text-2xl mb-2">Property Rules</h2>
                  <p className="text-gray-600">Set your house rules</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkInTime">Check-in Time</Label>
                    <Input
                      id="checkInTime"
                      type="time"
                      value={formData.checkInTime}
                      onChange={(e) => updateFormData("checkInTime", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="checkOutTime">Check-out Time</Label>
                    <Input
                      id="checkOutTime"
                      type="time"
                      value={formData.checkOutTime}
                      onChange={(e) => updateFormData("checkOutTime", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="minimumStay">Minimum Stay (nights)</Label>
                    <Input
                      id="minimumStay"
                      type="number"
                      min="1"
                      value={formData.minimumStay}
                      onChange={(e) => updateFormData("minimumStay", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maximumStay">Maximum Stay (nights)</Label>
                    <Input
                      id="maximumStay"
                      type="number"
                      placeholder="Optional"
                      value={formData.maximumStay}
                      onChange={(e) => updateFormData("maximumStay", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <Label className="text-base">Guest Policies</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.smokingAllowed}
                        onChange={(e) => updateFormData("smokingAllowed", e.target.checked)}
                        className="h-4 w-4 text-teal-600 rounded"
                      />
                      <span className="text-sm">Smoking Allowed</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.petsAllowed}
                        onChange={(e) => updateFormData("petsAllowed", e.target.checked)}
                        className="h-4 w-4 text-teal-600 rounded"
                      />
                      <span className="text-sm">Pets Allowed</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.partiesAllowed}
                        onChange={(e) => updateFormData("partiesAllowed", e.target.checked)}
                        className="h-4 w-4 text-teal-600 rounded"
                      />
                      <span className="text-sm">Parties/Events Allowed</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.childrenAllowed}
                        onChange={(e) => updateFormData("childrenAllowed", e.target.checked)}
                        className="h-4 w-4 text-teal-600 rounded"
                      />
                      <span className="text-sm">Children Allowed</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalRules">Additional Rules</Label>
                  <Textarea
                    id="additionalRules"
                    placeholder="Any other rules or requirements (optional)"
                    value={formData.additionalRules}
                    onChange={(e) => updateFormData("additionalRules", e.target.value)}
                    className="mt-1 h-24"
                  />
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => updateFormData("termsAccepted", e.target.checked)}
                      className="h-5 w-5 text-teal-600 rounded mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        I confirm that I have the legal right to list this property and that all
                        information provided is accurate. I agree to Otium's{" "}
                        <a href="#" className="text-teal-600 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-teal-600 hover:underline">
                          Property Listing Agreement
                        </a>
                        .
                      </p>
                    </div>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 bg-teal-600 hover:bg-teal-700"
              >
                {step === totalSteps ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isEditMode ? "Update Property" : "List Property"}
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {step === 1 && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => onNavigate("dashboard")}
                  className="text-sm text-teal-600 hover:underline"
                >
                  Cancel and return to dashboard
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}