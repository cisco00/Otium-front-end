import { useState } from "react";
import { ChevronLeft, CreditCard, Building2, CheckCircle, Shield, Calendar, Users, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

interface BookingCheckoutProps {
  bookingData: any;
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
}

export function BookingCheckout({ bookingData, onNavigate, onBack }: BookingCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [specialRequests, setSpecialRequests] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const { property, checkIn, checkOut, guests, nights, total } = bookingData;
  const serviceFee = Math.round(total * 0.05);
  const finalTotal = total + serviceFee;

  const handlePayment = async () => {
    // Validation
    if (!fullName || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (paymentMethod === "paystack" || paymentMethod === "flutterwave") {
      if (!cardNumber || !expiryDate || !cvv) {
        toast.error("Please enter card details");
        return;
      }
    }

    if (paymentMethod === "bank-transfer") {
      if (!accountNumber || !bankName) {
        toast.error("Please enter bank transfer details");
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessOpen(true);
      toast.success("Payment successful!");
    }, 2000);
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    onNavigate("traveler-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to property
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="full-name">Full Name *</Label>
                  <Input
                    id="full-name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                  <Textarea
                    id="special-requests"
                    placeholder="Any special requests or requirements..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {/* Paystack */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="paystack" id="paystack" />
                    <Label htmlFor="paystack" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Paystack</p>
                          <p className="text-sm text-gray-600">Pay with credit/debit card via Paystack</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* Flutterwave */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="flutterwave" id="flutterwave" />
                    <Label htmlFor="flutterwave" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-2 rounded">
                          <CreditCard className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Flutterwave</p>
                          <p className="text-sm text-gray-600">Pay with credit/debit card via Flutterwave</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* Bank Transfer */}
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded">
                          <Building2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Bank Transfer</p>
                          <p className="text-sm text-gray-600">Direct bank transfer</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {/* Payment Details Forms */}
                <div className="mt-6">
                  {(paymentMethod === "paystack" || paymentMethod === "flutterwave") && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="mt-1"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            type="text"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="mt-1"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="text"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="mt-1"
                            maxLength={3}
                          />
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-2">
                        <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                        <p className="text-xs text-blue-900">
                          Your payment information is encrypted and secure. We comply with PCI-DSS standards.
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "bank-transfer" && (
                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Bank Transfer Details</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-semibold">Bank Name:</span> First Bank of Nigeria</p>
                          <p><span className="font-semibold">Account Name:</span> Otium Properties Ltd</p>
                          <p><span className="font-semibold">Account Number:</span> 0123456789</p>
                          <p><span className="font-semibold">Amount:</span> ₦{finalTotal.toLocaleString()}</p>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="account-number">Your Account Number</Label>
                        <Input
                          id="account-number"
                          type="text"
                          placeholder="Enter your account number"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bank-name">Your Bank Name</Label>
                        <Input
                          id="bank-name"
                          type="text"
                          placeholder="Enter your bank name"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-blue-900">
                          After completing the transfer, your booking will be confirmed once we verify the payment (usually within 24 hours).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the <a href="#" className="text-teal-600 hover:underline">Terms and Conditions</a>, 
                    <a href="#" className="text-teal-600 hover:underline"> Cancellation Policy</a>, and 
                    <a href="#" className="text-teal-600 hover:underline"> Privacy Policy</a>. I understand that my 
                    personal information will be processed in accordance with GDPR, CCPA, and Nigerian data protection regulations.
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Confirm Button */}
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700"
              size="lg"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing Payment..." : `Confirm and Pay ₦${finalTotal.toLocaleString()}`}
            </Button>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Preview */}
                <div className="space-y-3">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold mb-1">{property.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{property.rating}</span>
                      <span className="text-sm text-gray-600">({property.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-3 py-4 border-y">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Check-in</p>
                      <p className="font-semibold">{new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Check-out</p>
                      <p className="font-semibold">{new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Guests</p>
                      <p className="font-semibold">{guests} {guests === 1 ? 'Guest' : 'Guests'}</p>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>₦{property.price.toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>₦{serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-3 border-t">
                    <span>Total (NGN)</span>
                    <span>₦{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-teal-50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-teal-600 mt-0.5" />
                    <div className="text-xs text-teal-900">
                      <p className="font-semibold mb-1">Safe & Secure</p>
                      <p>Your payment is protected and your data is encrypted according to international standards.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-center">
              Your booking has been confirmed. A confirmation email has been sent to {email}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm"><span className="font-semibold">Property:</span> {property.name}</p>
              <p className="text-sm"><span className="font-semibold">Check-in:</span> {new Date(checkIn).toLocaleDateString()}</p>
              <p className="text-sm"><span className="font-semibold">Check-out:</span> {new Date(checkOut).toLocaleDateString()}</p>
              <p className="text-sm"><span className="font-semibold">Total Paid:</span> ₦{finalTotal.toLocaleString()}</p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Next Steps:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>You'll receive detailed check-in instructions 24 hours before arrival</li>
                <li>Contact the host directly through the messaging system</li>
                <li>Review the house rules before your stay</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="bg-teal-600 hover:bg-teal-700 px-12" onClick={handleSuccessClose}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}