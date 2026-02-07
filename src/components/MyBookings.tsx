import { Calendar, Clock, MapPin, Home, CheckCircle, XCircle, AlertCircle, Filter, Search, Star, Users, DollarSign, Plus, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RequestExtensionDialog } from "@/components/RequestExtensionDialog";
import { FlagUserDialog } from "@/components/FlagUserDialog";
import { toast } from "sonner";
import { useState } from "react";

interface MyBookingsProps {
  onNavigate: (view: string) => void;
}

export function MyBookings({ onNavigate }: MyBookingsProps) {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isExtensionDialogOpen, setIsExtensionDialogOpen] = useState(false);
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      bookingRef: "OTM-2026-001",
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
      owner: {
        name: "Aisha Mohammed",
        email: "aisha.mohammed@otium.com",
        phone: "+234 801 234 5678",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        verified: true
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
      status: "Confirmed",
      bookingDate: "2026-01-26",
      paymentMethod: "Paystack",
      paymentStatus: "Paid"
    },
    {
      id: 2,
      bookingRef: "OTM-2026-002",
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
      owner: {
        name: "Chukwudi Eze",
        email: "chukwudi.eze@otium.com",
        phone: "+234 802 345 6789",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        verified: true
      },
      checkIn: "2026-03-10",
      checkOut: "2026-03-17",
      nights: 7,
      guests: 8,
      totalAmount: 840000,
      bookingFee: 84000,
      cleaningFee: 25000,
      serviceFee: 42000,
      finalAmount: 991000,
      status: "Pending",
      bookingDate: "2026-01-27",
      paymentMethod: "Bank Transfer",
      paymentStatus: "Pending"
    },
    {
      id: 3,
      bookingRef: "OTM-2025-089",
      property: {
        name: "Cozy Studio in Ibadan",
        location: "Bodija, Ibadan",
        image: "https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbXxlbnwxfHx8fDE3Njg0NTQ2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        pricePerNight: 25000,
        rating: 4.6
      },
      owner: {
        name: "Funmi Adebayo",
        email: "funmi.adebayo@otium.com",
        phone: "+234 805 678 9012",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?w=150&h=150&fit=crop",
        verified: true
      },
      checkIn: "2026-01-10",
      checkOut: "2026-01-15",
      nights: 5,
      guests: 2,
      totalAmount: 125000,
      bookingFee: 12500,
      cleaningFee: 8000,
      serviceFee: 6250,
      finalAmount: 151750,
      status: "Completed",
      bookingDate: "2025-12-28",
      paymentMethod: "Flutterwave",
      paymentStatus: "Paid"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const canRequestExtension = (booking: any) => {
    // Can request extension if booking is confirmed and not yet completed
    return booking.status === "Confirmed";
  };

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const handleRequestExtension = (booking: any) => {
    setSelectedBooking(booking);
    setIsExtensionDialogOpen(true);
  };

  const handleCancelBooking = (booking: any) => {
    toast.success(`Cancellation request submitted for ${booking.bookingRef}`);
    setIsDetailsOpen(false);
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || booking.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your property reservations</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by property name, location, or booking reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filterStatus === "confirmed" ? "default" : "outline"}
            onClick={() => setFilterStatus("confirmed")}
            size="sm"
          >
            Confirmed
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "outline"}
            onClick={() => setFilterStatus("pending")}
            size="sm"
          >
            Pending
          </Button>
          <Button
            variant={filterStatus === "completed" ? "default" : "outline"}
            onClick={() => setFilterStatus("completed")}
            size="sm"
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || filterStatus !== "all" 
                  ? "Try adjusting your filters or search query"
                  : "You don't have any bookings yet"}
              </p>
              <Button onClick={() => onNavigate("search")}>
                Browse Properties
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Property Image */}
                  <div className="lg:w-64 flex-shrink-0">
                    <img
                      src={booking.property.image}
                      alt={booking.property.name}
                      className="w-full h-48 lg:h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{booking.property.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{booking.property.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{booking.bookingRef}</Badge>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-teal-700">₦{booking.finalAmount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{booking.paymentStatus}</p>
                      </div>
                    </div>

                    {/* Dates and Guests */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Check-in</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{new Date(booking.checkIn).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Check-out</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{new Date(booking.checkOut).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Guests</p>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{booking.guests} guests</span>
                        </div>
                      </div>
                    </div>

                    {/* Property Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span>{booking.property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span>{booking.property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{booking.property.rating}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => handleViewDetails(booking)}
                      >
                        View Details
                      </Button>
                      {canRequestExtension(booking) && (
                        <Button 
                          variant="outline"
                          className="border-teal-300 text-teal-700 hover:bg-teal-50"
                          onClick={() => handleRequestExtension(booking)}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Request Extension
                        </Button>
                      )}
                      {booking.status === "Pending" && (
                        <Button 
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          onClick={() => handleCancelBooking(booking)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Booking
                        </Button>
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
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Reference: {selectedBooking?.bookingRef}
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6 py-4">
              {/* Property Information */}
              <div>
                <h3 className="font-semibold mb-3">Property Information</h3>
                <div className="flex gap-4">
                  <img 
                    src={selectedBooking.property.image} 
                    alt={selectedBooking.property.name}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold mb-1">{selectedBooking.property.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{selectedBooking.property.location}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>{selectedBooking.property.bedrooms} Bedrooms</span>
                      <span>•</span>
                      <span>{selectedBooking.property.bathrooms} Bathrooms</span>
                      <span>•</span>
                      <span>Max {selectedBooking.property.maxGuests} guests</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div>
                <h3 className="font-semibold mb-3">Property Owner</h3>
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedBooking.owner.avatar} 
                    alt={selectedBooking.owner.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{selectedBooking.owner.name}</p>
                      {selectedBooking.owner.verified && (
                        <CheckCircle className="h-4 w-4 text-teal-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{selectedBooking.owner.email}</p>
                  </div>
                </div>
              </div>

              {/* Stay Details */}
              <div>
                <h3 className="font-semibold mb-3">Stay Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Check-in</p>
                    <p className="font-medium">{new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Check-out</p>
                    <p className="font-medium">{new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nights</p>
                    <p className="font-medium">{selectedBooking.nights} nights</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Guests</p>
                    <p className="font-medium">{selectedBooking.guests} guests</p>
                  </div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div>
                <h3 className="font-semibold mb-3">Payment Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">₦{selectedBooking.property.pricePerNight.toLocaleString()} × {selectedBooking.nights} nights</span>
                    <span className="font-medium">₦{selectedBooking.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cleaning fee</span>
                    <span className="font-medium">₦{selectedBooking.cleaningFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-medium">₦{selectedBooking.serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">₦{selectedBooking.finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
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
              Flag Host
            </Button>
            {selectedBooking && canRequestExtension(selectedBooking) && (
              <Button 
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => {
                  setIsDetailsOpen(false);
                  setIsExtensionDialogOpen(true);
                }}
              >
                <Clock className="h-4 w-4 mr-2" />
                Request Extension
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Extension Request Dialog */}
      {selectedBooking && (
        <RequestExtensionDialog
          isOpen={isExtensionDialogOpen}
          onClose={() => setIsExtensionDialogOpen(false)}
          booking={selectedBooking}
        />
      )}

      {/* Flag Host Dialog */}
      {selectedBooking && (
        <FlagUserDialog
          isOpen={isFlagDialogOpen}
          onClose={() => setIsFlagDialogOpen(false)}
          userName={selectedBooking.owner?.name || ""}
          userEmail={selectedBooking.owner?.email}
          userAvatar={selectedBooking.owner?.avatar}
          userType="host"
          propertyName={selectedBooking.property?.name}
          bookingRef={selectedBooking.bookingRef}
        />
      )}
    </div>
  );
}
