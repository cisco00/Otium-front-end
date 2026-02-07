import { LogOut, Calendar, User, CheckCircle, XCircle, Clock, AlertTriangle, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { ReviewRatingDialog } from "@/components/ReviewRatingDialog";

export function CheckoutRequestsSection() {
  const [checkoutRequests, setCheckoutRequests] = useState([
    {
      id: 1,
      property: "Modern Apartment in Lagos",
      propertyImage: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      renter: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        email: "alex.johnson@email.com",
        phone: "+234 801 234 5678",
        verified: true
      },
      checkIn: "2026-01-20",
      checkOut: "2026-01-30",
      requestedCheckoutDate: "2026-01-30",
      totalAmount: "₦125,000",
      bookingId: "OT-12026",
      status: "pending", // pending, approved, rejected
      daysStayed: 10,
      pricePerNight: 12500,
      isOnTime: true
    },
    {
      id: 2,
      property: "Luxury Villa in Abuja",
      propertyImage: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      renter: {
        name: "Maria Santos",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        email: "maria.santos@email.com",
        phone: "+234 802 345 6789",
        verified: true
      },
      checkIn: "2026-01-15",
      checkOut: "2026-01-25",
      requestedCheckoutDate: "2026-01-27",
      totalAmount: "₦850,000",
      bookingId: "OT-22026",
      status: "pending",
      daysStayed: 10,
      extraDays: 2,
      pricePerNight: 85000,
      isOnTime: false,
      latePenalty: 170000
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsDetailsDialogOpen(true);
  };

  const handleApproveCheckout = (request: any) => {
    setIsDetailsDialogOpen(false);
    setSelectedRequest(request);
    setIsReviewDialogOpen(true);
  };

  const handleRejectCheckout = (requestId: number) => {
    setCheckoutRequests(prev =>
      prev.map(req => req.id === requestId ? { ...req, status: "rejected" } : req)
    );
    setIsDetailsDialogOpen(false);
    toast.error("Checkout request rejected. The renter has been notified.");
  };

  const handleReviewSubmitted = () => {
    // After review is submitted, approve the checkout
    if (selectedRequest) {
      setCheckoutRequests(prev =>
        prev.map(req => req.id === selectedRequest.id ? { ...req, status: "approved" } : req)
      );
      toast.success("Checkout approved! The renter has been notified.");
    }
    setIsReviewDialogOpen(false);
    setSelectedRequest(null);
  };

  const pendingRequests = checkoutRequests.filter(req => req.status === "pending");

  return (
    <>
      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-teal-600" />
              <CardTitle>Checkout Requests</CardTitle>
              {pendingRequests.length > 0 && (
                <Badge className="bg-red-600 text-white">
                  {pendingRequests.length} Pending
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <div className="text-center py-12">
              <LogOut className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No pending checkout requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Property Image */}
                    <div className="w-full lg:w-48 h-32 overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        src={request.propertyImage}
                        alt={request.property}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Request Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{request.property}</h3>
                          <p className="text-sm text-gray-500">Booking ID: {request.bookingId}</p>
                        </div>
                        {!request.isOnTime && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Late Checkout
                          </Badge>
                        )}
                      </div>

                      {/* Renter Info */}
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.renter.avatar} alt={request.renter.name} />
                          <AvatarFallback>{request.renter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm">{request.renter.name}</p>
                            {request.renter.verified && (
                              <Badge variant="default" className="bg-teal-600 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{request.renter.email}</p>
                        </div>
                      </div>

                      {/* Dates Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-teal-600" />
                          <div>
                            <p className="text-xs text-gray-500">Check-in</p>
                            <p className="font-semibold">{request.checkIn}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-teal-600" />
                          <div>
                            <p className="text-xs text-gray-500">Expected Checkout</p>
                            <p className="font-semibold">{request.checkOut}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-teal-600" />
                          <div>
                            <p className="text-xs text-gray-500">Days Stayed</p>
                            <p className="font-semibold">
                              {request.daysStayed} nights
                              {request.extraDays && (
                                <span className="text-red-600"> +{request.extraDays} extra</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {request.latePenalty && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-900">
                            <strong>Late Checkout Penalty:</strong> ₦{request.latePenalty.toLocaleString()} ({request.extraDays} extra days)
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 lg:justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(request)}
                        className="flex-1 lg:flex-none"
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700 flex-1 lg:flex-none"
                        onClick={() => handleApproveCheckout(request)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRejectCheckout(request.id)}
                        className="flex-1 lg:flex-none"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Checkout Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-teal-600" />
              Checkout Request Details
            </DialogTitle>
            <DialogDescription>
              Review the checkout request before approval
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 py-4">
              {/* Property Image */}
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={selectedRequest.propertyImage}
                  alt={selectedRequest.property}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Property Info */}
              <div>
                <h3 className="font-semibold text-lg mb-1">{selectedRequest.property}</h3>
                <p className="text-sm text-gray-500">Booking ID: {selectedRequest.bookingId}</p>
              </div>

              {/* Renter Details */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Renter Information</p>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedRequest.renter.avatar} alt={selectedRequest.renter.name} />
                    <AvatarFallback>{selectedRequest.renter.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{selectedRequest.renter.name}</h4>
                      {selectedRequest.renter.verified && (
                        <Badge variant="default" className="bg-teal-600 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Email: {selectedRequest.renter.email}</p>
                      <p>Phone: {selectedRequest.renter.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <p className="text-sm text-gray-600 mb-2">Booking Details</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Check-in Date</p>
                    <p className="font-semibold">{selectedRequest.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expected Checkout</p>
                    <p className="font-semibold">{selectedRequest.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Days Stayed</p>
                    <p className="font-semibold">{selectedRequest.daysStayed} nights</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Price per Night</p>
                    <p className="font-semibold">₦{selectedRequest.pricePerNight.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Amount</p>
                    <p className="font-semibold text-teal-600">{selectedRequest.totalAmount}</p>
                  </div>
                  {selectedRequest.extraDays && (
                    <div>
                      <p className="text-gray-500">Extra Days</p>
                      <p className="font-semibold text-red-600">{selectedRequest.extraDays} days</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Late Checkout Warning */}
              {!selectedRequest.isOnTime && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-yellow-900 mb-1">Late Checkout</h4>
                      <p className="text-sm text-yellow-800">
                        The renter is checking out {selectedRequest.extraDays} day(s) late. 
                        A penalty of <strong>₦{selectedRequest.latePenalty?.toLocaleString()}</strong> has been applied.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Checkout Checklist */}
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <h4 className="font-semibold text-sm text-teal-900 mb-2">Before Approving:</h4>
                <ul className="space-y-1 text-sm text-teal-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Verify property condition
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Check all keys/access cards returned
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Confirm no damages to property
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Ensure all utilities are turned off
                  </li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button size="sm" variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => selectedRequest && handleRejectCheckout(selectedRequest.id)}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Button
              size="sm"
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => selectedRequest && handleApproveCheckout(selectedRequest)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve Checkout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Rating Dialog - Must be completed after approval */}
      <ReviewRatingDialog
        isOpen={isReviewDialogOpen}
        onClose={() => {
          setIsReviewDialogOpen(false);
          setSelectedRequest(null);
        }}
        booking={selectedRequest}
        userType="owner"
        onReviewSubmitted={handleReviewSubmitted}
      />
    </>
  );
}
