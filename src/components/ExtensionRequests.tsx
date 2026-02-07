import { Calendar, Clock, User, MapPin, DollarSign, CheckCircle, XCircle, Home, Phone, Mail, AlertCircle, Filter, Search, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";

interface ExtensionRequestsProps {
  onNavigate: (view: string) => void;
}

export function ExtensionRequests({ onNavigate }: ExtensionRequestsProps) {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock extension requests data
  const extensionRequests = [
    {
      id: 1,
      bookingRef: "OTM-2026-045",
      guest: {
        name: "Emma Johnson",
        email: "emma.johnson@email.com",
        phone: "+234 803 567 8901",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?w=100&h=100&fit=crop",
        verified: true,
        rating: 4.9
      },
      property: {
        name: "Luxury Villa in Abuja",
        location: "Maitama, Abuja",
        image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
        pricePerNight: 78000
      },
      originalCheckIn: "2026-01-20",
      originalCheckOut: "2026-01-25",
      requestedCheckOut: "2026-01-30",
      originalAmount: 390000,
      extensionAmount: 195000,
      totalAmount: 585000,
      extensionDays: 5,
      extensionNights: 5,
      reason: "Flight rescheduled due to weather conditions. International airline confirmed delays for all flights to UK. Would greatly appreciate if you can accommodate the extension.",
      status: "Pending",
      requestDate: "2026-01-24",
      paymentMethod: "Flutterwave"
    },
    {
      id: 2,
      bookingRef: "OTM-2026-038",
      guest: {
        name: "David Okonkwo",
        email: "david.okonkwo@email.com",
        phone: "+234 802 345 6789",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        verified: true,
        rating: 4.6
      },
      property: {
        name: "Modern Apartment in Lagos",
        location: "Victoria Island, Lagos",
        image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        pricePerNight: 40000
      },
      originalCheckIn: "2026-01-15",
      originalCheckOut: "2026-01-22",
      requestedCheckOut: "2026-01-25",
      originalAmount: 280000,
      extensionAmount: 120000,
      totalAmount: 400000,
      extensionDays: 3,
      extensionNights: 3,
      reason: "Business meetings extended, need to stay longer. Client requested additional presentation sessions that will run until January 25th.",
      status: "Pending",
      requestDate: "2026-01-21",
      paymentMethod: "Paystack"
    },
    {
      id: 3,
      bookingRef: "OTM-2026-032",
      guest: {
        name: "Chioma Adebayo",
        email: "chioma.adebayo@email.com",
        phone: "+234 809 123 4567",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        verified: true,
        rating: 4.8
      },
      property: {
        name: "Luxury Villa in Abuja",
        location: "Maitama, Abuja",
        image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
        pricePerNight: 78000
      },
      originalCheckIn: "2026-01-10",
      originalCheckOut: "2026-01-17",
      requestedCheckOut: "2026-01-20",
      originalAmount: 546000,
      extensionAmount: 234000,
      totalAmount: 780000,
      extensionDays: 3,
      extensionNights: 3,
      reason: "Family reunion extended, relatives are staying for 3 more days.",
      status: "Approved",
      requestDate: "2026-01-15",
      approvedDate: "2026-01-15",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 4,
      bookingRef: "OTM-2025-198",
      guest: {
        name: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+234 807 234 5678",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        verified: false,
        rating: 4.7
      },
      property: {
        name: "Modern Apartment in Lagos",
        location: "Victoria Island, Lagos",
        image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        pricePerNight: 40000
      },
      originalCheckIn: "2025-12-20",
      originalCheckOut: "2025-12-27",
      requestedCheckOut: "2025-12-30",
      originalAmount: 280000,
      extensionAmount: 120000,
      totalAmount: 400000,
      extensionDays: 3,
      extensionNights: 3,
      reason: "Would like to celebrate New Year's Eve in Lagos.",
      status: "Declined",
      requestDate: "2025-12-25",
      declinedDate: "2025-12-25",
      declineReason: "Property already booked for the requested extension period.",
      paymentMethod: "Paystack"
    }
  ];

  const handleApprove = (request: any) => {
    toast.success(`Extension request for ${request.guest.name} approved! Payment processing initiated.`);
    setIsDetailsOpen(false);
  };

  const handleDecline = (request: any) => {
    toast.error(`Extension request for ${request.guest.name} declined.`);
    setIsDetailsOpen(false);
  };

  const viewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  const filteredRequests = extensionRequests.filter(request => {
    const matchesSearch = 
      request.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.property.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === "all" || 
      request.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const pendingCount = extensionRequests.filter(r => r.status === "Pending").length;
  const approvedCount = extensionRequests.filter(r => r.status === "Approved").length;
  const declinedCount = extensionRequests.filter(r => r.status === "Declined").length;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Extension Requests</h1>
        <p className="text-gray-600">Manage guest requests to extend their current bookings</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Requests</p>
                <p className="text-2xl font-semibold">{extensionRequests.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
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
              <AlertCircle className="h-8 w-8 text-yellow-600" />
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

      {/* Extension Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No extension requests found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Property Image */}
                  <div className="lg:w-48 flex-shrink-0">
                    <img 
                      src={request.property.image} 
                      alt={request.property.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 space-y-4">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{request.property.name}</h3>
                          <Badge variant={
                            request.status === "Pending" ? "secondary" :
                            request.status === "Approved" ? "default" : "outline"
                          } className={
                            request.status === "Pending" ? "bg-yellow-500 text-white" :
                            request.status === "Approved" ? "bg-green-600" : "bg-red-600 text-white"
                          }>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {request.property.location}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Booking Ref: {request.bookingRef}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-teal-700">₦{request.extensionAmount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Extension Amount</p>
                      </div>
                    </div>

                    {/* Guest Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.guest.avatar} alt={request.guest.name} />
                        <AvatarFallback>{request.guest.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{request.guest.name}</p>
                          {request.guest.verified && (
                            <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {request.guest.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {request.guest.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Extension Info */}
                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Original Checkout</p>
                          <p className="font-semibold text-sm">{new Date(request.originalCheckOut).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Requested Checkout</p>
                          <p className="font-semibold text-sm text-teal-700">{new Date(request.requestedCheckOut).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Extension</p>
                          <p className="font-semibold text-sm flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            +{request.extensionDays} days
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-teal-600" />
                        <span className="font-semibold">New Total:</span>
                        <span className="text-teal-700 font-bold">₦{request.totalAmount.toLocaleString()}</span>
                        <span className="text-gray-600 text-xs">
                          (Original: ₦{request.originalAmount.toLocaleString()})
                        </span>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                      <p className="text-xs font-semibold text-amber-900 mb-1">Guest's Reason:</p>
                      <p className="text-sm text-gray-800">{request.reason}</p>
                    </div>

                    {/* Decline Reason (if declined) */}
                    {request.status === "Declined" && request.declineReason && (
                      <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <p className="text-xs font-semibold text-red-900 mb-1">Decline Reason:</p>
                        <p className="text-sm text-red-800">{request.declineReason}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => viewDetails(request)}
                      >
                        View Full Details
                      </Button>
                      {request.status === "Pending" && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(request)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve Extension
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleDecline(request)}
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

      {/* Request Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Extension Request Details</DialogTitle>
            <DialogDescription>
              Complete information about this stay extension request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6 py-4">
              {/* Request Info */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                <div>
                  <p className="text-sm text-gray-600">Booking Reference</p>
                  <p className="text-xl font-bold text-teal-700">{selectedRequest.bookingRef}</p>
                  <p className="text-xs text-gray-600 mt-1">Requested on {new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                </div>
                <Badge variant={
                  selectedRequest.status === "Pending" ? "secondary" :
                  selectedRequest.status === "Approved" ? "default" : "outline"
                } className={`${
                  selectedRequest.status === "Pending" ? "bg-yellow-500 text-white" :
                  selectedRequest.status === "Approved" ? "bg-green-600" : "bg-red-600 text-white"
                } text-base px-4 py-2`}>
                  {selectedRequest.status}
                </Badge>
              </div>

              {/* Extension Timeline */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-teal-600" />
                  Extension Timeline
                </h3>
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Check-in</p>
                      <p className="font-semibold">{new Date(selectedRequest.originalCheckIn).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                      <p className="text-xs text-gray-600 mb-1">Original Checkout</p>
                      <p className="font-semibold text-orange-700">{new Date(selectedRequest.originalCheckOut).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-teal-50 p-3 rounded-lg border-2 border-teal-300">
                      <p className="text-xs text-gray-600 mb-1">New Checkout</p>
                      <p className="font-semibold text-teal-700">{new Date(selectedRequest.requestedCheckOut).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">Extension Duration:</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-700">+{selectedRequest.extensionDays} days</span>
                    </div>
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
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Original Booking Amount</span>
                    <span className="font-semibold">₦{selectedRequest.originalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Extension ({selectedRequest.extensionNights} nights × ₦{selectedRequest.property.pricePerNight.toLocaleString()})</span>
                    <span className="font-semibold text-teal-700">₦{selectedRequest.extensionAmount.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-lg border border-teal-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">New Total Amount</p>
                          <p className="text-xs text-gray-500 mt-1">Guest will be charged</p>
                        </div>
                        <p className="text-3xl font-bold text-teal-700">₦{selectedRequest.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-green-900">Your Additional Earnings (90%)</span>
                      <span className="text-lg font-bold text-green-700">₦{(selectedRequest.extensionAmount * 0.9).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest's Reason */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-teal-600" />
                  Guest's Reason for Extension
                </h3>
                <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
                  <p className="text-sm text-gray-800 leading-relaxed">{selectedRequest.reason}</p>
                </div>
              </div>

              {/* Guest Information */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="h-5 w-5 text-teal-600" />
                  Guest Information
                </h3>
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedRequest.guest.avatar} alt={selectedRequest.guest.name} />
                      <AvatarFallback>{selectedRequest.guest.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">{selectedRequest.guest.name}</h4>
                        {selectedRequest.guest.verified && (
                          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-600" />
                          {selectedRequest.guest.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-600" />
                          {selectedRequest.guest.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedRequest.declineReason && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm font-semibold text-red-900 mb-1">Decline Reason:</p>
                  <p className="text-sm text-red-800">{selectedRequest.declineReason}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
            {selectedRequest?.status === "Pending" && (
              <>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(selectedRequest)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Extension
                </Button>
                <Button 
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => handleDecline(selectedRequest)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Decline
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
