import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Users,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
  Building2,
  MapPin,
  Star,
  Wifi,
  Car,
  Tv,
  Wind,
} from "lucide-react";
import { toast } from "sonner";

interface Property {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  image: string;
  amenities: string[];
  cleaningFee?: number;
  securityDeposit?: number;
}

interface ReservePropertyProps {
  property: Property;
  onNavigate: (view: string) => void;
  onBack: () => void;
}

export function ReserveProperty({ property, onNavigate, onBack }: ReservePropertyProps) {
  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: "1",
    specialRequests: "",
    
    // Guest Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Payment
    paymentMethod: "",
    
    // Agreement
    propertyRulesAccepted: false,
    cancellationPolicyAccepted: false,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [nights, setNights] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const updateBookingData = (field: string, value: any) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Calculate nights and total cost when dates change
    if (field === "checkInDate" || field === "checkOutDate") {
      const newData = { ...bookingData, [field]: value };
      if (newData.checkInDate && newData.checkOutDate) {
        const checkIn = new Date(newData.checkInDate);
        const checkOut = new Date(newData.checkOutDate);
        const nightsCount = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        
        if (nightsCount > 0) {
          setNights(nightsCount);
          const subtotal = property.pricePerNight * nightsCount;
          const cleaningFee = property.cleaningFee || 0;
          const total = subtotal + cleaningFee;
          setTotalCost(total);
        }
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Dates
    if (!bookingData.checkInDate) newErrors.checkInDate = "Check-in date is required";
    if (!bookingData.checkOutDate) newErrors.checkOutDate = "Check-out date is required";
    
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      const checkIn = new Date(bookingData.checkInDate);
      const checkOut = new Date(bookingData.checkOutDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkIn < today) {
        newErrors.checkInDate = "Check-in date cannot be in the past";
      }
      if (checkOut <= checkIn) {
        newErrors.checkOutDate = "Check-out must be after check-in";
      }
    }

    // Guests
    if (!bookingData.guests || parseInt(bookingData.guests) < 1) {
      newErrors.guests = "Number of guests is required";
    }

    // Guest Details
    if (!bookingData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!bookingData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!bookingData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!bookingData.phone.trim()) newErrors.phone = "Phone number is required";

    // Payment
    if (!bookingData.paymentMethod) newErrors.paymentMethod = "Please select a payment method";

    // Agreements
    if (!bookingData.propertyRulesAccepted) {
      newErrors.propertyRulesAccepted = "You must accept the property rules";
    }
    if (!bookingData.cancellationPolicyAccepted) {
      newErrors.cancellationPolicyAccepted = "You must accept the cancellation policy";
    }
    if (!bookingData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReserve = () => {
    if (validateForm()) {
      // Simulate payment processing
      toast.success("Reservation Confirmed!", {
        description: `Your booking at ${property.name} has been confirmed. Check your email for details.`,
      });
      
      setTimeout(() => {
        onNavigate("bookings");
      }, 2000);
    } else {
      toast.error("Please complete all required fields");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const amenityIcons: Record<string, any> = {
    wifi: Wifi,
    parking: Car,
    tv: Tv,
    ac: Wind,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Property
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700">
                  <Calendar className="h-6 w-6" />
                  Reservation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkInDate">Check-in Date *</Label>
                    <Input
                      id="checkInDate"
                      type="date"
                      value={bookingData.checkInDate}
                      onChange={(e) => updateBookingData("checkInDate", e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                    {errors.checkInDate && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.checkInDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="checkOutDate">Check-out Date *</Label>
                    <Input
                      id="checkOutDate"
                      type="date"
                      value={bookingData.checkOutDate}
                      onChange={(e) => updateBookingData("checkOutDate", e.target.value)}
                      min={bookingData.checkInDate || new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                    {errors.checkOutDate && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.checkOutDate}
                      </p>
                    )}
                  </div>
                </div>

                {nights > 0 && (
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                    <p className="text-sm text-teal-700">
                      <strong>{nights}</strong> night{nights > 1 ? 's' : ''} selected
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="guests">Number of Guests *</Label>
                  <Select
                    value={bookingData.guests}
                    onValueChange={(value) => updateBookingData("guests", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Guest{num > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.guests && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.guests}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any special requests or requirements (optional)"
                    value={bookingData.specialRequests}
                    onChange={(e) => updateBookingData("specialRequests", e.target.value)}
                    className="mt-1 h-24"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700">
                  <Users className="h-6 w-6" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      value={bookingData.firstName}
                      onChange={(e) => updateBookingData("firstName", e.target.value)}
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
                      placeholder="Last name"
                      value={bookingData.lastName}
                      onChange={(e) => updateBookingData("lastName", e.target.value)}
                      className="mt-1"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={bookingData.email}
                      onChange={(e) => updateBookingData("email", e.target.value)}
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
                      placeholder="+234 800 000 0000"
                      value={bookingData.phone}
                      onChange={(e) => updateBookingData("phone", e.target.value)}
                      className="mt-1"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700">
                  <CreditCard className="h-6 w-6" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Payment Method *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => updateBookingData("paymentMethod", "paystack")}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        bookingData.paymentMethod === "paystack"
                          ? "border-teal-600 bg-teal-50"
                          : "border-gray-200 hover:border-teal-300"
                      }`}
                    >
                      <CreditCard className={`h-6 w-6 mx-auto mb-2 ${
                        bookingData.paymentMethod === "paystack" ? "text-teal-600" : "text-gray-400"
                      }`} />
                      <p className={`text-sm font-semibold ${
                        bookingData.paymentMethod === "paystack" ? "text-teal-700" : "text-gray-700"
                      }`}>
                        Paystack
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Card Payment</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateBookingData("paymentMethod", "flutterwave")}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        bookingData.paymentMethod === "flutterwave"
                          ? "border-teal-600 bg-teal-50"
                          : "border-gray-200 hover:border-teal-300"
                      }`}
                    >
                      <CreditCard className={`h-6 w-6 mx-auto mb-2 ${
                        bookingData.paymentMethod === "flutterwave" ? "text-teal-600" : "text-gray-400"
                      }`} />
                      <p className={`text-sm font-semibold ${
                        bookingData.paymentMethod === "flutterwave" ? "text-teal-700" : "text-gray-700"
                      }`}>
                        Flutterwave
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Multiple Options</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateBookingData("paymentMethod", "bank_transfer")}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        bookingData.paymentMethod === "bank_transfer"
                          ? "border-teal-600 bg-teal-50"
                          : "border-gray-200 hover:border-teal-300"
                      }`}
                    >
                      <Building2 className={`h-6 w-6 mx-auto mb-2 ${
                        bookingData.paymentMethod === "bank_transfer" ? "text-teal-600" : "text-gray-400"
                      }`} />
                      <p className={`text-sm font-semibold ${
                        bookingData.paymentMethod === "bank_transfer" ? "text-teal-700" : "text-gray-700"
                      }`}>
                        Bank Transfer
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Direct Deposit</p>
                    </button>
                  </div>
                  {errors.paymentMethod && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.paymentMethod}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Secure Payment</p>
                    <p>
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-700">
                  <Shield className="h-6 w-6" />
                  Agreements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingData.propertyRulesAccepted}
                      onChange={(e) => updateBookingData("propertyRulesAccepted", e.target.checked)}
                      className="h-4 w-4 text-teal-600 rounded mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        I agree to follow the property rules and house guidelines *
                      </p>
                    </div>
                  </label>
                  {errors.propertyRulesAccepted && (
                    <p className="text-sm text-red-600 ml-7 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.propertyRulesAccepted}
                    </p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingData.cancellationPolicyAccepted}
                      onChange={(e) => updateBookingData("cancellationPolicyAccepted", e.target.checked)}
                      className="h-4 w-4 text-teal-600 rounded mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        I have read and accept the{" "}
                        <a href="#" className="text-teal-600 hover:underline">
                          cancellation policy
                        </a>{" "}
                        *
                      </p>
                    </div>
                  </label>
                  {errors.cancellationPolicyAccepted && (
                    <p className="text-sm text-red-600 ml-7 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.cancellationPolicyAccepted}
                    </p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingData.termsAccepted}
                      onChange={(e) => updateBookingData("termsAccepted", e.target.checked)}
                      className="h-4 w-4 text-teal-600 rounded mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        I agree to Otium's{" "}
                        <a href="#" className="text-teal-600 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-teal-600 hover:underline">
                          Privacy Policy
                        </a>{" "}
                        *
                      </p>
                    </div>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-sm text-red-600 ml-7 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Property Summary & Cost Breakdown */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Property Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video w-full bg-gray-200 rounded-lg mb-3 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{property.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 4).map((amenity) => {
                      const Icon = amenityIcons[amenity] || Wifi;
                      return (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          <Icon className="h-3 w-3 mr-1" />
                          {amenity}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Price Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {nights > 0 ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {formatCurrency(property.pricePerNight)} × {nights} night{nights > 1 ? 's' : ''}
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(property.pricePerNight * nights)}
                        </span>
                      </div>
                      
                      {property.cleaningFee && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Cleaning fee</span>
                          <span className="font-semibold">{formatCurrency(property.cleaningFee)}</span>
                        </div>
                      )}

                      <div className="border-t pt-3 flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-teal-600 text-lg">
                          {formatCurrency(totalCost)}
                        </span>
                      </div>

                      {property.securityDeposit && (
                        <div className="text-xs text-gray-500 border-t pt-2">
                          Security deposit: {formatCurrency(property.securityDeposit)} (refundable)
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-sm text-gray-500 text-center py-4">
                      Select dates to see pricing
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button
                onClick={handleReserve}
                className="w-full bg-teal-600 hover:bg-teal-700"
                size="lg"
                disabled={nights === 0}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Confirm Reservation
              </Button>

              <p className="text-xs text-gray-500 text-center">
                You won't be charged yet. Review your booking before payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
