import { Calendar, MapPin, Star, Users, Shield, MessageCircle, Heart, TrendingUp, UserPlus, Clock, CheckCircle, XCircle, Home, LogOut, AlertTriangle, AlertOctagon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { ReviewRatingDialog } from "@/components/ReviewRatingDialog";

interface TravelerDashboardProps {
  onNavigate: (view: string) => void;
}

export function TravelerDashboard({ onNavigate }: TravelerDashboardProps) {
  const upcomingBookings = [
    {
      id: 1,
      property: "Modern Apartment in Lagos",
      image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      checkIn: "2026-01-20",
      checkOut: "2026-01-30",
      status: "Active", // Currently staying at this property
      isActive: true, // Only active bookings show emergency button
      pricePerNight: 12500,
      checkoutStatus: "pending", // pending, completed, overdue
      owner: {
        name: "Sarah Adeyemi",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        verified: true,
        rating: 4.9,
        totalReviews: 127,
        joinedDate: "Jan 2024",
        responseTime: "Within 1 hour",
        languages: ["English", "Yoruba"]
      }
    },
    {
      id: 2,
      property: "Luxury Villa in Abuja",
      image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      checkIn: "2026-02-10",
      checkOut: "2026-02-17",
      status: "Confirmed",
      isActive: false,
      pricePerNight: 85000,
      checkoutStatus: "not-started",
      owner: {
        name: "Chukwudi Okonkwo",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        verified: true,
        rating: 4.8,
        totalReviews: 89,
        joinedDate: "Mar 2023",
        responseTime: "Within 2 hours",
        languages: ["English", "Igbo"]
      }
    }
  ];

  const recommendations = [
    {
      title: "Cozy Studio in Ibadan",
      price: "₦25,000",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbXxlbnwxfHx8fDE3Njg0NTQ2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Beach House with Pool",
      price: "₦85,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1565548182543-8d8852e6acc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNhdGlvbiUyMHJlbnRhbCUyMHBvb2x8ZW58MXx8fHwxNzY4NTA1NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];



  const [isVisitorDialogOpen, setIsVisitorDialogOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorPurpose, setVisitorPurpose] = useState("");
  const [visitorDate, setVisitorDate] = useState("");
  const [visitorTime, setVisitorTime] = useState("");

  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);

  // Message Host Dialog
  const [isMessageHostDialogOpen, setIsMessageHostDialogOpen] = useState(false);
  const [selectedBookingForMessage, setSelectedBookingForMessage] = useState<any>(null);
  const [messageToHost, setMessageToHost] = useState("");

  // Add Guest Dialog
  const [isAddGuestDialogOpen, setIsAddGuestDialogOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestRelationship, setGuestRelationship] = useState("");

  // Booking Details Dialog
  const [isBookingDetailsDialogOpen, setIsBookingDetailsDialogOpen] = useState(false);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<any>(null);

  // Checkout Dialog
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [selectedBookingForCheckout, setSelectedBookingForCheckout] = useState<any>(null);

  // Review Dialog
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<any>(null);
  const [propertyRating, setPropertyRating] = useState(0);
  const [hostRating, setHostRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [accuracyRating, setAccuracyRating] = useState(0);

  // Emergency Alert Dialog
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false);
  const [selectedBookingForEmergency, setSelectedBookingForEmergency] = useState<any>(null);
  const [emergencyType, setEmergencyType] = useState("");
  const [emergencyDetails, setEmergencyDetails] = useState("");

  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      title: "Coastal Paradise Villa",
      location: "Malibu, California",
      price: "$750",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      isSaved: true
    },
    {
      id: 2,
      title: "Historic Brownstone",
      location: "Boston, Massachusetts",
      price: "$320",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      isSaved: true
    },
    {
      id: 3,
      title: "Modern Loft Downtown",
      location: "Lagos, Nigeria",
      price: "₦85,000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      isSaved: true
    },
    {
      id: 4,
      title: "Beachfront Apartment",
      location: "Lekki, Lagos",
      price: "₦120,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      isSaved: true
    }
  ]);

  const myVisitorRequests = [
    {
      id: 1,
      visitorName: "Sarah Chen",
      property: "Modern Apartment in Lagos",
      purpose: "Family visit",
      date: "Jan 24",
      time: "1:00 PM - 5:00 PM",
      status: "approved"
    },
    {
      id: 2,
      visitorName: "John Williams",
      property: "Modern Apartment in Lagos",
      purpose: "Business meeting",
      date: "Jan 25",
      time: "3:00 PM - 7:00 PM",
      status: "pending"
    }
  ];



  const handleSubmitVisitorRequest = () => {
    if (!visitorName || !visitorPurpose || !visitorDate || !visitorTime) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Visitor request submitted to property owner for approval");
    setIsVisitorDialogOpen(false);
    setVisitorName("");
    setVisitorPurpose("");
    setVisitorDate("");
    setVisitorTime("");
  };

  const handleToggleFavorite = (propertyId: number) => {
    setSavedProperties(savedProperties.map(prop => 
      prop.id === propertyId ? { ...prop, isSaved: !prop.isSaved } : prop
    ));
    const property = savedProperties.find(p => p.id === propertyId);
    if (property?.isSaved) {
      toast.success("Removed from favorites");
    } else {
      toast.success("Added to favorites");
    }
  };

  const handleOpenMessageHost = (booking: any) => {
    setSelectedBookingForMessage(booking);
    setIsMessageHostDialogOpen(true);
  };

  const handleSendMessageToHost = () => {
    if (!messageToHost.trim()) {
      toast.error("Please enter a message");
      return;
    }
    toast.success(`Message sent to host of ${selectedBookingForMessage?.property || 'property'}`);
    setMessageToHost("");
    setIsMessageHostDialogOpen(false);
    setSelectedBookingForMessage(null);
  };

  const handleAddGuest = () => {
    if (!guestName || !guestEmail || !guestPhone) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success(`Guest ${guestName} added successfully! Awaiting host approval.`);
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setGuestRelationship("");
    setIsAddGuestDialogOpen(false);
  };

  const handleSendEmergencyAlert = () => {
    if (!emergencyType || !emergencyDetails.trim()) {
      toast.error("Please select an emergency type and provide details");
      return;
    }
    toast.error(`🚨 EMERGENCY ALERT sent to ${selectedBookingForEmergency?.owner?.name}! They will be notified immediately.`, {
      duration: 5000,
    });
    setEmergencyType("");
    setEmergencyDetails("");
    setIsEmergencyDialogOpen(false);
    setSelectedBookingForEmergency(null);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Welcome back, Alex!</h1>
        <p className="text-gray-600">Here's what's happening with your bookings</p>
      </div>

      {/* Verification Status Card */}
      <Card className="mb-8 border-teal-200 bg-teal-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-teal-600 p-3 rounded-full">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-teal-900">Verify Your Identity</h3>
                <Badge className="bg-yellow-500 text-white">Action Required</Badge>
              </div>
              <p className="text-sm text-teal-800 mb-4">
                Become a verified renter to unlock full access to all properties and gain host trust. 
                Complete your identity verification to get a verified badge on your profile.
              </p>
              <div className="flex flex-wrap gap-3">
                <Dialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      <Shield className="h-4 w-4 mr-2" />
                      Start Verification
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Identity Verification</DialogTitle>
                      <DialogDescription>
                        To become a verified renter, please complete the following verification steps
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-3">
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-teal-600" />
                            Government ID Verification
                          </h4>
                          <p className="text-xs text-gray-600 mb-3">Upload a clear photo of your ID (National ID, Passport, or Driver's License)</p>
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">Upload ID</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-gray-400" />
                            Address Verification
                          </h4>
                          <p className="text-xs text-gray-600 mb-3">Upload a utility bill or bank statement (dated within last 3 months)</p>
                          <Button size="sm" variant="outline">Upload Document</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-gray-400" />
                            Phone Verification
                          </h4>
                          <p className="text-xs text-gray-600 mb-3">Verify your phone number via SMS</p>
                          <Button size="sm" variant="outline">Verify Phone</Button>
                        </div>
                      </div>
                      <div className="bg-teal-50 p-3 rounded-lg">
                        <p className="text-xs text-teal-900">
                          <Shield className="h-3 w-3 inline mr-1" />
                          Your documents are encrypted and securely stored in compliance with GDPR and Nigerian data protection regulations.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button size="sm" variant="outline" onClick={() => setIsVerificationDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => {
                        toast.success("Verification process started! Please upload your documents.");
                        setIsVerificationDialogOpen(false);
                      }}>
                        Start Process
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button size="sm" variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-100" onClick={() => {
                  toast.info("Verification helps build trust with property owners and increases booking success rates.");
                }}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Upcoming Trips</p>
                <p className="text-2xl">2</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
                <p className="text-2xl">14</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>



        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Verification</p>
                <Badge variant="secondary" className="mt-1">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">


          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <img 
                    src={booking.image} 
                    alt={booking.property}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{booking.property}</h3>
                      <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Check-in: {booking.checkIn}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Check-out: {booking.checkOut}</span>
                      </div>
                    </div>
                    {booking.isActive && booking.checkoutStatus === "pending" && (
                      <div className="mt-2 mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <p className="text-xs text-yellow-800">
                          Check-out date approaching. Please initiate checkout to avoid penalties.
                        </p>
                      </div>
                    )}
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <Button size="sm" variant="outline" onClick={() => {
                        setSelectedBookingForDetails(booking);
                        setIsBookingDetailsDialogOpen(true);
                      }}>View Details</Button>
                      <Button size="sm" variant="ghost" onClick={() => handleOpenMessageHost(booking)}>
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Contact Host
                      </Button>
                      {booking.isActive && (
                        <Button 
                          size="sm" 
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => {
                            setSelectedBookingForEmergency(booking);
                            setIsEmergencyDialogOpen(true);
                          }}
                        >
                          <AlertOctagon className="h-4 w-4 mr-1" />
                          Emergency
                        </Button>
                      )}
                      {booking.isActive && booking.checkoutStatus === "pending" && (
                        <Button 
                          size="sm" 
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                          onClick={() => {
                            setSelectedBookingForCheckout(booking);
                            setSelectedBookingForReview(booking);
                            setIsReviewDialogOpen(true);
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-1" />
                          Checkout
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Properties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recommended For You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((property, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-semibold mb-1">{property.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{property.rating}</span>
                        </div>
                        <span className="font-semibold">{property.price}/night</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Visitor Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Visitor Requests</CardTitle>
              <Dialog open={isVisitorDialogOpen} onOpenChange={setIsVisitorDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Request Visitor
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Request Visitor Access</DialogTitle>
                    <DialogDescription>
                      Submit a visitor request for approval by the property host
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="visitorName">Visitor Name</Label>
                      <Input
                        id="visitorName"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="Enter visitor name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="purpose">Purpose of Visit</Label>
                      <Textarea
                        id="purpose"
                        value={visitorPurpose}
                        onChange={(e) => setVisitorPurpose(e.target.value)}
                        placeholder="e.g., Family visit, Business meeting"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="visitDate">Date</Label>
                      <Input
                        id="visitDate"
                        value={visitorDate}
                        onChange={(e) => setVisitorDate(e.target.value)}
                        type="date"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="visitTime">Time Range</Label>
                      <Input
                        id="visitTime"
                        value={visitorTime}
                        onChange={(e) => setVisitorTime(e.target.value)}
                        placeholder="e.g., 2:00 PM - 6:00 PM"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button size="sm" variant="outline" onClick={() => setIsVisitorDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSubmitVisitorRequest} className="bg-teal-600 hover:bg-teal-700">
                      Submit Request
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myVisitorRequests.map((request) => (
                  <div key={request.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <UserPlus className="h-5 w-5 text-teal-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold">{request.visitorName}</h4>
                        <Badge variant={request.status === "approved" ? "default" : "secondary"} className={request.status === "approved" ? "bg-green-600" : ""}>
                          {request.status === "approved" ? (
                            <><CheckCircle className="h-3 w-3 mr-1" /> Approved</>
                          ) : (
                            <><Clock className="h-3 w-3 mr-1" /> Pending</>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{request.property}</p>
                      <p className="text-sm text-gray-800 mb-2">Purpose: {request.purpose}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{request.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{request.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {myVisitorRequests.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <UserPlus className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>No visitor requests yet</p>
                    <p className="text-sm mt-1">Request visitor access for your guests</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">85% Complete</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <Shield className="h-4 w-4" />
                    <span>ID Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Shield className="h-4 w-4" />
                    <span>Address Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Shield className="h-4 w-4" />
                    <span>Phone Number Pending</span>
                  </div>
                </div>
                <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Complete Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Complete Your Profile</DialogTitle>
                      <DialogDescription>
                        Complete verification steps to unlock full platform features
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Verification Steps</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="font-medium text-sm">ID Verification</p>
                                <p className="text-xs text-gray-600">Government-issued ID verified</p>
                              </div>
                            </div>
                            <Badge className="bg-green-600">Complete</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="font-medium text-sm">Address Verification</p>
                                <p className="text-xs text-gray-600">Residential address confirmed</p>
                              </div>
                            </div>
                            <Badge className="bg-green-600">Complete</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                            <div className="flex items-center gap-3">
                              <Clock className="h-5 w-5 text-yellow-600" />
                              <div>
                                <p className="font-medium text-sm">Phone Verification</p>
                                <p className="text-xs text-gray-600">Add and verify phone number</p>
                              </div>
                            </div>
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                              Verify Now
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Shield className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="font-medium text-sm">Email Verification</p>
                                <p className="text-xs text-gray-600">Optional: Add backup email</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Add Email
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="text-xs text-gray-600">
                          Completing your profile increases your chances of booking approval and helps hosts trust you more.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button size="sm" variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
                        Close
                      </Button>
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => {
                        toast.success("Phone verification started!");
                        setIsProfileDialogOpen(false);
                      }}>
                        Complete Verification
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>


        </div>
      </div>

      {/* Message Host Dialog */}
      <Dialog open={isMessageHostDialogOpen} onOpenChange={setIsMessageHostDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Message Host</DialogTitle>
            <DialogDescription>
              Send a message about: <span className="font-semibold">{selectedBookingForMessage?.property}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="hostMessage">Your Message</Label>
              <Textarea
                id="hostMessage"
                value={messageToHost}
                onChange={(e) => setMessageToHost(e.target.value)}
                placeholder="Type your message to the host here..."
                rows={5}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button size="sm" variant="outline" onClick={() => setIsMessageHostDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSendMessageToHost} className="bg-teal-600 hover:bg-teal-700">
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Details Dialog */}
      <Dialog open={isBookingDetailsDialogOpen} onOpenChange={setIsBookingDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              View complete information about your booking
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedBookingForDetails && (
              <>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img 
                    src={selectedBookingForDetails.image} 
                    alt={selectedBookingForDetails.property}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{selectedBookingForDetails.property}</h3>
                    <Badge variant={selectedBookingForDetails.status === "Confirmed" ? "default" : "secondary"}>
                      {selectedBookingForDetails.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Check-in</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <p className="font-semibold">{selectedBookingForDetails.checkIn}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Check-out</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <p className="font-semibold">{selectedBookingForDetails.checkOut}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Property Owner Section */}
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 mb-3">Property Owner</p>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={selectedBookingForDetails.owner?.avatar} alt={selectedBookingForDetails.owner?.name} />
                        <AvatarFallback>{selectedBookingForDetails.owner?.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{selectedBookingForDetails.owner?.name}</h4>
                          {selectedBookingForDetails.owner?.verified && (
                            <Badge variant="default" className="bg-teal-600 text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{selectedBookingForDetails.owner?.rating}</span>
                          </div>
                          <span className="text-gray-500">({selectedBookingForDetails.owner?.totalReviews} reviews)</span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>Response time: {selectedBookingForDetails.owner?.responseTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span>Joined: {selectedBookingForDetails.owner?.joinedDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-3 w-3" />
                            <span>Languages: {selectedBookingForDetails.owner?.languages.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button size="sm" variant="outline" onClick={() => setIsBookingDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => handleOpenMessageHost(selectedBookingForDetails)}>
              <MessageCircle className="h-4 w-4 mr-1" />
              Contact Host
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Rating Dialog - Must be completed before checkout */}
      <ReviewRatingDialog 
        isOpen={isReviewDialogOpen}
        onClose={() => {
          setIsReviewDialogOpen(false);
          setSelectedBookingForReview(null);
        }}
        booking={selectedBookingForReview}
        userType="renter"
        onReviewSubmitted={() => {
          // After review is submitted, open checkout dialog
          setIsReviewDialogOpen(false);
          setIsCheckoutDialogOpen(true);
        }}
      />

      {/* Emergency Alert Dialog */}
      <Dialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertOctagon className="h-6 w-6" />
              Emergency Alert
            </DialogTitle>
            <DialogDescription>
              Send an emergency alert to the property owner: <span className="font-semibold">{selectedBookingForEmergency?.owner?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedBookingForEmergency && (
              <>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertOctagon className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-red-900">Emergency Contact</h4>
                      <p className="text-xs text-red-800 mt-1">
                        This alert will be sent immediately to the property owner via SMS, email, and push notification. 
                        Use this feature only for genuine emergencies.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="emergencyType">Emergency Type *</Label>
                  <div className="mt-2 space-y-2">
                    {[
                      { value: "medical", label: "Medical Emergency", icon: "🏥" },
                      { value: "safety", label: "Safety/Security Issue", icon: "🚨" },
                      { value: "panic", label: "Panic Attack / Mental Health", icon: "💔" },
                      { value: "fire", label: "Fire/Smoke", icon: "🔥" },
                      { value: "break-in", label: "Break-in/Intrusion", icon: "🚪" },
                      { value: "utility", label: "Utility Emergency (Gas/Water/Electric)", icon: "⚡" },
                      { value: "other", label: "Other Emergency", icon: "⚠️" }
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setEmergencyType(type.value)}
                        className={`w-full p-3 border rounded-lg text-left transition-all ${
                          emergencyType === type.value 
                            ? 'border-red-500 bg-red-50 ring-2 ring-red-200' 
                            : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{type.icon}</span>
                          <span className={`text-sm font-medium ${emergencyType === type.value ? 'text-red-900' : 'text-gray-900'}`}>
                            {type.label}
                          </span>
                          {emergencyType === type.value && (
                            <CheckCircle className="h-4 w-4 text-red-600 ml-auto" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="emergencyDetails">Emergency Details *</Label>
                  <Textarea
                    id="emergencyDetails"
                    value={emergencyDetails}
                    onChange={(e) => setEmergencyDetails(e.target.value)}
                    placeholder="Please describe the emergency situation in detail..."
                    rows={4}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Include your location in the property, what happened, and any immediate assistance needed.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Property Owner Contact</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-600" />
                      <span>{selectedBookingForEmergency.owner?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <span>Response time: {selectedBookingForEmergency.owner?.responseTime}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-900">
                    <AlertTriangle className="h-3 w-3 inline mr-1" />
                    For life-threatening emergencies, please call local emergency services immediately (911 or local equivalent).
                  </p>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button size="sm" variant="outline" onClick={() => {
              setIsEmergencyDialogOpen(false);
              setEmergencyType("");
              setEmergencyDetails("");
              setSelectedBookingForEmergency(null);
            }}>
              Cancel
            </Button>
            <Button 
              size="sm" 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleSendEmergencyAlert}
            >
              <AlertOctagon className="h-4 w-4 mr-1" />
              Send Emergency Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}