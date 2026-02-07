import { Calendar, Clock, User, MapPin, DollarSign, CheckCircle, XCircle, Home, Phone, Mail, Users, Bed, Bath, Star, AlertCircle, Filter, Search, Download, Plane, BellRing, Sparkles, Gift, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FlagUserDialog } from "@/components/FlagUserDialog";
import { toast } from "sonner";
import { useState } from "react";

interface BookingRequestsProps {
  onNavigate: (view: string) => void;
}

export function BookingRequests({ onNavigate }: BookingRequestsProps) {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock booking requests data
  const bookingRequests = [
    {
      id: 1,
      bookingRef: "OTM-2026-001",
      guest: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+234 803 456 7890",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        verified: true,
        joinDate: "2025-06-15",
        previousBookings: 3,
        rating: 4.5
      },
      property: {
        name: "Modern Apartment in Lagos",
        location: "Victoria Island, Lagos",
        image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        pricePerNight: 50000,
        rating: 4.8
      },
      checkIn: "2026-02-15",
      checkOut: "2026-02-20",
      nights: 5,
      guests: 4,
      totalAmount: 250000,
      bookingFee: 25000,
      cleaningFee: 15000,
      serviceFee: 10000,
      finalAmount: 300000,
      status: "Pending",
      requestDate: "2026-01-26",
      specialRequests: "Early check-in if possible (arriving at 10 AM). Traveling with 2 children (ages 5 and 8).",
      hasAirportPickup: false,
      hasEarlyCheckin: true,
      paymentMethod: "Paystack",
      cancellationPolicy: "Flexible - Free cancellation 48 hours before check-in"
    },
    {
      id: 2,
      bookingRef: "OTM-2026-002",
      guest: {
        name: "Sarah Williams",
        email: "sarah.williams@email.com",
        phone: "+234 805 789 1234",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?w=100&h=100&fit=crop",
        verified: true,
        joinDate: "2024-03-10",
        previousBookings: 12,
        rating: 4.9
      },
      property: {
        name: "Luxury Villa in Abuja",
        location: "Maitama, Abuja",
        image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
        bedrooms: 5,
        bathrooms: 4,
        maxGuests: 10,
        pricePerNight: 120000,
        rating: 4.9
      },
      checkIn: "2026-03-01",
      checkOut: "2026-03-08",
      nights: 7,
      guests: 8,
      totalAmount: 840000,
      bookingFee: 84000,
      cleaningFee: 30000,
      serviceFee: 46000,
      finalAmount: 1000000,
      status: "Pending",
      requestDate: "2026-01-25",
      specialRequests: "🚗 AIRPORT PICK-UP REQUESTED: Arriving at Nnamdi Azikiwe International Airport on March 1st at 2:30 PM (Flight BA 083). Need transportation for 8 people with luggage. Will also need parking for 3 vehicles during stay. Celebrating wedding anniversary - would appreciate if room could be decorated.",
      hasAirportPickup: true,
      hasEarlyCheckin: false,
      arrivalFlight: "BA 083 - 2:30 PM",
      paymentMethod: "Flutterwave",
      cancellationPolicy: "Moderate - Free cancellation 7 days before check-in",
      specialServices: [
        {
          name: "Airport Pick-Up Service",
          description: "Private transportation for 8 passengers from Nnamdi Azikiwe International Airport",
          price: 45000,
          icon: "plane"
        },
        {
          name: "Anniversary Decoration",
          description: "Romantic room decoration with flowers, candles, and champagne",
          price: 35000,
          icon: "gift"
        }
      ],
      specialServicesFee: 80000
    },
    {
      id: 3,
      bookingRef: "OTM-2026-003",
      guest: {
        name: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+234 807 234 5678",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        verified: true,
        joinDate: "2025-08-20",
        previousBookings: 5,
        rating: 4.7
      },
      property: {
        name: "Modern Apartment in Lagos",
        location: "Victoria Island, Lagos",
        image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        pricePerNight: 50000,
        rating: 4.8
      },
      checkIn: "2026-02-05",
      checkOut: "2026-02-08",
      nights: 3,
      guests: 2,
      totalAmount: 150000,
      bookingFee: 15000,
      cleaningFee: 15000,
      serviceFee: 10000,
      finalAmount: 190000,
      status: "Approved",
      requestDate: "2026-01-20",
      specialRequests: "Business trip. Need excellent WiFi for remote work and video conferences. Quiet workspace required.",
      hasAirportPickup: false,
      hasEarlyCheckin: false,
      paymentMethod: "Bank Transfer",
      cancellationPolicy: "Flexible - Free cancellation 48 hours before check-in"
    },
    {
      id: 4,
      bookingRef: "OTM-2026-004",
      guest: {
        name: "Fatima Bello",
        email: "fatima.bello@email.com",
        phone: "+234 809 876 5432",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        verified: false,
        joinDate: "2026-01-10",
        previousBookings: 0,
        rating: 0
      },
      property: {
        name: "Luxury Villa in Abuja",
        location: "Maitama, Abuja",
        image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
        bedrooms: 5,
        bathrooms: 4,
        maxGuests: 10,
        pricePerNight: 120000,
        rating: 4.9
      },
      checkIn: "2026-02-20",
      checkOut: "2026-02-23",
      nights: 3,
      guests: 6,
      totalAmount: 360000,
      bookingFee: 36000,
      cleaningFee: 30000,
      serviceFee: 26000,
      finalAmount: 452000,
      status: "Pending",
      requestDate: "2026-01-26",
      specialRequests: "🚗 AIRPORT PICK-UP REQUESTED: First time visiting Abuja. Need pick-up from airport on Feb 20th at 11 AM. Family vacation with elderly parents - please ensure ground floor rooms are available for accessibility.",
      hasAirportPickup: true,
      hasEarlyCheckin: false,
      arrivalFlight: "To be confirmed",
      paymentMethod: "Paystack",
      cancellationPolicy: "Moderate - Free cancellation 7 days before check-in"
    },
    {
      id: 5,
      bookingRef: "OTM-2025-189",
      guest: {
        name: "David Okonkwo",
        email: "david.okonkwo@email.com",
        phone: "+234 802 345 6789",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        verified: true,
        joinDate: "2024-11-05",
        previousBookings: 7,
        rating: 4.6
      },
      property: {
        name: "Modern Apartment in Lagos",
        location: "Victoria Island, Lagos",
        image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        pricePerNight: 50000,
        rating: 4.8
      },
      checkIn: "2026-01-10",
      checkOut: "2026-01-15",
      nights: 5,
      guests: 3,
      totalAmount: 250000,
      bookingFee: 25000,
      cleaningFee: 15000,
      serviceFee: 15000,
      finalAmount: 305000,
      status: "Declined",
      requestDate: "2025-12-28",
      specialRequests: "None",
      hasAirportPickup: false,
      hasEarlyCheckin: false,
      paymentMethod: "Paystack",
      cancellationPolicy: "Flexible - Free cancellation 48 hours before check-in",
      declineReason: "Property unavailable for requested dates"
    }
  ];

  const handleApprove = (booking: any) => {
    toast.success(`Booking ${booking.bookingRef} approved! Payment processing initiated.`);
    setIsDetailsOpen(false);
  };

  const handleDecline = (booking: any) => {
    toast.error(`Booking ${booking.bookingRef} declined.`);
    setIsDetailsOpen(false);
  };

  const viewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const filteredBookings = bookingRequests.filter(booking => {
    const matchesSearch = 
      booking.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.property.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === "all" || 
      booking.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const pendingCount = bookingRequests.filter(b => b.status === "Pending").length;
  const approvedCount = bookingRequests.filter(b => b.status === "Approved").length;
  const declinedCount = bookingRequests.filter(b => b.status === "Declined").length;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Booking Requests</h1>
        <p className="text-gray-600">Manage all property rental requests and view detailed booking information</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Requests</p>
                <p className="text-2xl font-semibold">{bookingRequests.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-semibold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-2xl font-semibold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Declined</p>
                <p className="text-2xl font-semibold text-red-600">{declinedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by guest name, booking ref, or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border rounded-md bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
              </select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Requests List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No booking requests found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Property Image */}
                  <div className="lg:w-48 flex-shrink-0">
                    <img 
                      src={booking.property.image} 
                      alt={booking.property.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 space-y-4">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{booking.property.name}</h3>
                          <Badge variant={
                            booking.status === "Pending" ? "secondary" :
                            booking.status === "Approved" ? "default" : "outline"
                          } className={
                            booking.status === "Pending" ? "bg-yellow-500 text-white" :
                            booking.status === "Approved" ? "bg-green-600" : "bg-red-600 text-white"
                          }>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {booking.property.location}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Booking Ref: {booking.bookingRef}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-teal-700">₦{booking.finalAmount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Total Amount</p>
                      </div>
                    </div>

                    {/* Guest Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.guest.avatar} alt={booking.guest.name} />
                        <AvatarFallback>{booking.guest.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{booking.guest.name}</p>
                          {booking.guest.verified && (
                            <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {booking.guest.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {booking.guest.phone}
                          </span>
                          {booking.guest.previousBookings > 0 && (
                            <span className="flex items-center gap-1">
                              <Home className="h-3 w-3" />
                              {booking.guest.previousBookings} previous bookings
                            </span>
                          )}
                          {booking.guest.rating > 0 && (
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {booking.guest.rating} rating
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Booking Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Check-in</p>
                        <p className="font-semibold text-sm">{new Date(booking.checkIn).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Check-out</p>
                        <p className="font-semibold text-sm">{new Date(booking.checkOut).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Nights</p>
                        <p className="font-semibold text-sm">{booking.nights} nights</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Guests</p>
                        <p className="font-semibold text-sm flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {booking.guests}
                        </p>
                      </div>
                    </div>

                    {/* Airport Pickup Alert Banner */}
                    {booking.hasAirportPickup && (
                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <Plane className="h-6 w-6 text-orange-600 animate-pulse" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <BellRing className="h-4 w-4 text-orange-600" />
                              <h4 className="font-semibold text-orange-900">Airport Pick-Up Required</h4>
                            </div>
                            <p className="text-sm text-orange-800">
                              Guest has requested airport transportation service.
                              {booking.arrivalFlight && (
                                <span className="block mt-1 font-semibold">
                                  Flight: {booking.arrivalFlight}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Early Check-in Alert */}
                    {booking.hasEarlyCheckin && !booking.hasAirportPickup && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <Clock className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <BellRing className="h-4 w-4 text-purple-600" />
                              <h4 className="font-semibold text-purple-900">Early Check-In Requested</h4>
                            </div>
                            <p className="text-sm text-purple-800">
                              Guest has requested early check-in. Please review special requests for details.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 mb-1 flex items-center gap-1">
                          <BellRing className="h-3 w-3" />
                          Special Requests:
                        </p>
                        <p className="text-sm text-gray-800">{booking.specialRequests}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => viewDetails(booking)}
                      >
                        View Full Details
                      </Button>
                      {booking.status === "Pending" && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(booking)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve Booking
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleDecline(booking)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Request Details</DialogTitle>
            <DialogDescription>
              Complete information about this rental booking request
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6 py-4">
              {/* Booking Reference & Status */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-100">
                <div>
                  <p className="text-sm text-gray-600">Booking Reference</p>
                  <p className="text-xl font-bold text-teal-700">{selectedBooking.bookingRef}</p>
                  <p className="text-xs text-gray-600 mt-1">Requested on {new Date(selectedBooking.requestDate).toLocaleDateString()}</p>
                </div>
                <Badge variant={
                  selectedBooking.status === "Pending" ? "secondary" :
                  selectedBooking.status === "Approved" ? "default" : "outline"
                } className={`${
                  selectedBooking.status === "Pending" ? "bg-yellow-500 text-white" :
                  selectedBooking.status === "Approved" ? "bg-green-600" : "bg-red-600 text-white"
                } text-base px-4 py-2`}>
                  {selectedBooking.status}
                </Badge>
              </div>

              {/* Property Details */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Home className="h-5 w-5 text-teal-600" />
                  Property Information
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={selectedBooking.property.image} 
                    alt={selectedBooking.property.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg">{selectedBooking.property.name}</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {selectedBooking.property.location}
                      </p>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4 text-gray-600" />
                        <span>{selectedBooking.property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="h-4 w-4 text-gray-600" />
                        <span>{selectedBooking.property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span>Max {selectedBooking.property.maxGuests}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{selectedBooking.property.rating}</span>
                      </div>
                    </div>
                    <div className="bg-teal-50 p-3 rounded-lg">
                      <p className="text-sm">
                        <span className="font-semibold">₦{selectedBooking.property.pricePerNight.toLocaleString()}</span>
                        <span className="text-gray-600"> per night</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="h-5 w-5 text-teal-600" />
                  Guest Information
                </h3>
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedBooking.guest.avatar} alt={selectedBooking.guest.name} />
                      <AvatarFallback>{selectedBooking.guest.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">{selectedBooking.guest.name}</h4>
                        {selectedBooking.guest.verified ? (
                          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Unverified
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-600" />
                          {selectedBooking.guest.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-600" />
                          {selectedBooking.guest.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          Member since {new Date(selectedBooking.guest.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-600">Previous Bookings</p>
                          <p className="font-semibold">{selectedBooking.guest.previousBookings}</p>
                        </div>
                        {selectedBooking.guest.rating > 0 && (
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs text-gray-600">Guest Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <p className="font-semibold">{selectedBooking.guest.rating}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  Booking Details
                </h3>
                <div className="border rounded-lg p-4 space-y-4">
                  {/* Airport Pickup Alert Banner in Modal */}
                  {selectedBooking.hasAirportPickup && (
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 p-4 rounded-lg shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <Plane className="h-7 w-7 text-orange-600 animate-pulse" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <BellRing className="h-5 w-5 text-orange-600" />
                            <h4 className="font-bold text-orange-900 text-base">Airport Pick-Up Required</h4>
                          </div>
                          <p className="text-sm text-orange-800 mb-2">
                            Guest has requested airport transportation service. Please arrange or coordinate pickup details.
                          </p>
                          {selectedBooking.arrivalFlight && (
                            <div className="bg-white/60 p-2 rounded border border-orange-200">
                              <p className="text-xs text-orange-700 font-semibold">
                                Flight Information: {selectedBooking.arrivalFlight}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Early Check-in Alert in Modal */}
                  {selectedBooking.hasEarlyCheckin && !selectedBooking.hasAirportPickup && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 p-4 rounded-lg shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <Clock className="h-7 w-7 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <BellRing className="h-5 w-5 text-purple-600" />
                            <h4 className="font-bold text-purple-900 text-base">Early Check-In Requested</h4>
                          </div>
                          <p className="text-sm text-purple-800">
                            Guest has requested early check-in. Please review special requests below for specific time details.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Check-in Date</p>
                      <p className="font-semibold">{new Date(selectedBooking.checkIn).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Check-out Date</p>
                      <p className="font-semibold">{new Date(selectedBooking.checkOut).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Duration</p>
                      <p className="font-semibold">{selectedBooking.nights} nights</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Number of Guests</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {selectedBooking.guests} guests
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-600 mb-1">Payment Method</p>
                      <p className="font-semibold">{selectedBooking.paymentMethod}</p>
                    </div>
                  </div>

                  {selectedBooking.specialRequests && (
                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                      <div className="flex items-start gap-2 mb-2">
                        <BellRing className="h-4 w-4 text-blue-600 mt-0.5" />
                        <p className="text-sm font-bold text-blue-900">Special Requests from Guest:</p>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">{selectedBooking.specialRequests}</p>
                    </div>
                  )}

                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <p className="text-xs text-amber-900 font-semibold mb-1">Cancellation Policy:</p>
                    <p className="text-sm text-amber-800">{selectedBooking.cancellationPolicy}</p>
                  </div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-teal-600" />
                  Payment Breakdown
                </h3>
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">₦{selectedBooking.property.pricePerNight.toLocaleString()} × {selectedBooking.nights} nights</span>
                      <span className="font-semibold">₦{selectedBooking.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cleaning Fee</span>
                      <span className="font-semibold">₦{selectedBooking.cleaningFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-semibold">₦{selectedBooking.serviceFee.toLocaleString()}</span>
                    </div>

                    {/* Special Services Section */}
                    {selectedBooking.specialServices && selectedBooking.specialServices.length > 0 && (
                      <div className="border-t pt-3 mt-3">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-300 mb-3">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-5 w-5 text-purple-600" />
                            <h4 className="font-bold text-purple-900">Additional Services Requested</h4>
                          </div>
                          <div className="space-y-3">
                            {selectedBooking.specialServices.map((service: any, index: number) => (
                              <div key={index} className="bg-white/80 p-3 rounded-lg border border-purple-200">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-3 flex-1">
                                    {service.icon === "plane" && <Plane className="h-5 w-5 text-purple-700 mt-0.5" />}
                                    {service.icon === "gift" && <Gift className="h-5 w-5 text-purple-700 mt-0.5" />}
                                    {service.icon === "sparkles" && <Sparkles className="h-5 w-5 text-purple-700 mt-0.5" />}
                                    <div className="flex-1">
                                      <p className="font-semibold text-sm text-purple-900">{service.name}</p>
                                      <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                                    </div>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="font-bold text-purple-700">₦{service.price.toLocaleString()}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-purple-200">
                            <span className="text-sm font-semibold text-purple-900">Total Special Services</span>
                            <span className="text-lg font-bold text-purple-700">₦{selectedBooking.specialServicesFee.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between text-sm border-t pt-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₦{(
                        selectedBooking.totalAmount + 
                        selectedBooking.cleaningFee + 
                        selectedBooking.serviceFee + 
                        (selectedBooking.specialServicesFee || 0)
                      ).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-lg border border-teal-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-xs text-gray-500 mt-1">Guest will be charged</p>
                      </div>
                      <p className="text-3xl font-bold text-teal-700">₦{(
                        selectedBooking.finalAmount + (selectedBooking.specialServicesFee || 0)
                      ).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-green-900">Your Earnings (90%)</span>
                      <span className="text-lg font-bold text-green-700">₦{(
                        (selectedBooking.finalAmount + (selectedBooking.specialServicesFee || 0)) * 0.9
                      ).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">Platform fee: ₦{(
                      (selectedBooking.finalAmount + (selectedBooking.specialServicesFee || 0)) * 0.1
                    ).toLocaleString()} (10%)</p>
                  </div>

                  {selectedBooking.specialServices && selectedBooking.specialServices.length > 0 && (
                    <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-amber-900 mb-1">Note on Special Services:</p>
                          <p className="text-xs text-amber-800">
                            The guest has requested additional services that are not typically provided by your property. 
                            You can coordinate these services directly with the guest or decline them if unavailable.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedBooking.declineReason && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm font-semibold text-red-900 mb-1">Decline Reason:</p>
                  <p className="text-sm text-red-800">{selectedBooking.declineReason}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
            <Button 
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => {
                setIsFlagDialogOpen(true);
              }}
            >
              <Flag className="h-4 w-4 mr-2" />
              Flag User
            </Button>
            {selectedBooking?.status === "Pending" && (
              <>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(selectedBooking)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Booking
                </Button>
                <Button 
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => handleDecline(selectedBooking)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Decline
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Flag User Dialog */}
      <FlagUserDialog 
        isOpen={isFlagDialogOpen} 
        onClose={() => setIsFlagDialogOpen(false)}
        userName={selectedBooking?.guest?.name || ""}
        userEmail={selectedBooking?.guest?.email}
        userAvatar={selectedBooking?.guest?.avatar}
        userType="renter"
        propertyName={selectedBooking?.property?.name}
        bookingRef={selectedBooking?.bookingRef}
      />
    </div>
  );
}