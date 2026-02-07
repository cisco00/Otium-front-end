import { useState } from "react";
import { UserCheck, Clock, CheckCircle, XCircle, Calendar, MapPin, Phone, Mail, AlertCircle, Plus, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface GuestVerificationProps {
  onNavigate: (view: string) => void;
  userType: "traveler" | "owner" | "admin";
}

export function GuestVerification({ onNavigate, userType }: GuestVerificationProps) {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  
  // Form state for visitor request
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorPhone: "",
    visitorEmail: "",
    propertyName: "",
    propertyLocation: "",
    arrivalDate: "",
    arrivalTime: "14:00",
    departureDate: "",
    departureTime: "18:00",
    numberOfVisitors: 1,
    purposeOfVisit: "",
    message: ""
  });

  // Mock guest verification requests
  const guestRequests = {
    pending: [
      {
        id: "1",
        guestName: "Sarah Johnson",
        propertyName: "Luxury Beachfront Villa",
        propertyLocation: "Lagos Island, Lagos",
        checkIn: "2024-02-15 14:00",
        checkOut: "2024-02-20 11:00",
        requestDate: "2024-02-01",
        guestPhone: "+234 801 234 5678",
        guestEmail: "sarah.j@email.com",
        numberOfGuests: 2,
        status: "pending",
        message: "Arriving from the airport. Looking forward to a relaxing stay!"
      },
      {
        id: "2",
        guestName: "Michael Chen",
        propertyName: "Modern Downtown Apartment",
        propertyLocation: "Victoria Island, Lagos",
        checkIn: "2024-02-18 15:00",
        checkOut: "2024-02-22 10:00",
        requestDate: "2024-02-03",
        guestPhone: "+234 802 345 6789",
        guestEmail: "m.chen@email.com",
        numberOfGuests: 4,
        status: "pending",
        message: "Business trip with family. Need early check-in if possible."
      }
    ],
    approved: [
      {
        id: "3",
        guestName: "Emma Williams",
        propertyName: "Cozy Garden Cottage",
        propertyLocation: "Lekki Phase 1, Lagos",
        checkIn: "2024-02-10 14:00",
        checkOut: "2024-02-15 11:00",
        requestDate: "2024-01-28",
        approvedDate: "2024-01-29",
        guestPhone: "+234 803 456 7890",
        guestEmail: "emma.w@email.com",
        numberOfGuests: 2,
        status: "approved",
        message: "Anniversary celebration. Thank you for approving!"
      },
      {
        id: "4",
        guestName: "David Okonkwo",
        propertyName: "Family Townhouse",
        propertyLocation: "Ajah, Lagos",
        checkIn: "2024-02-08 16:00",
        checkOut: "2024-02-12 12:00",
        requestDate: "2024-01-25",
        approvedDate: "2024-01-26",
        guestPhone: "+234 804 567 8901",
        guestEmail: "d.okonkwo@email.com",
        numberOfGuests: 5,
        status: "approved",
        message: "Family vacation. Kids are excited!"
      }
    ],
    declined: [
      {
        id: "5",
        guestName: "John Smith",
        propertyName: "Penthouse Suite",
        propertyLocation: "Ikoyi, Lagos",
        checkIn: "2024-02-05 14:00",
        checkOut: "2024-02-07 11:00",
        requestDate: "2024-01-30",
        declinedDate: "2024-01-31",
        guestPhone: "+234 805 678 9012",
        guestEmail: "j.smith@email.com",
        numberOfGuests: 8,
        status: "declined",
        declineReason: "Number of guests exceeds property capacity",
        message: "Planning a small party."
      }
    ]
  };

  const handleApprove = (guestId: string, guestName: string) => {
    alert(`Guest verification approved for ${guestName}`);
  };

  const handleDecline = (guestId: string, guestName: string) => {
    const reason = prompt("Please provide a reason for declining:");
    if (reason) {
      alert(`Guest verification declined for ${guestName}\nReason: ${reason}`);
    }
  };

  const handleRegisterGuest = () => {
    // Validate form
    if (!formData.visitorName || !formData.propertyName || !formData.arrivalDate || !formData.departureDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.visitorPhone || !formData.visitorEmail) {
      toast.error("Please provide visitor contact information");
      return;
    }

    // In a real app, this would submit to an API
    toast.success("Visitor request submitted successfully! The property owner will review and approve your request.");
    
    // Reset form
    setFormData({
      visitorName: "",
      visitorPhone: "",
      visitorEmail: "",
      propertyName: "",
      propertyLocation: "",
      arrivalDate: "",
      arrivalTime: "14:00",
      departureDate: "",
      departureTime: "18:00",
      numberOfVisitors: 1,
      purposeOfVisit: "",
      message: ""
    });
    
    setShowRegisterDialog(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending Approval</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "declined":
        return <Badge className="bg-red-500">Declined</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderGuestCard = (guest: any) => (
    <Card key={guest.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" />
              <AvatarFallback className="bg-teal-600 text-white">
                {guest.guestName.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{guest.guestName}</CardTitle>
              <p className="text-sm text-gray-600">{guest.numberOfGuests} Guest{guest.numberOfGuests > 1 ? 's' : ''}</p>
            </div>
          </div>
          {getStatusBadge(guest.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Property Info */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">{guest.propertyName}</h4>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{guest.propertyLocation}</span>
          </div>
        </div>

        {/* Check-in/out Details */}
        <div className="grid grid-cols-2 gap-4 py-3 border-y">
          <div>
            <p className="text-xs text-gray-500 mb-1">Check-in</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-semibold">{new Date(guest.checkIn).toLocaleDateString()}</span>
            </div>
            <p className="text-xs text-gray-600 ml-6">{new Date(guest.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Check-out</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-semibold">{new Date(guest.checkOut).toLocaleDateString()}</span>
            </div>
            <p className="text-xs text-gray-600 ml-6">{new Date(guest.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{guest.guestPhone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{guest.guestEmail}</span>
          </div>
        </div>

        {/* Guest Message */}
        {guest.message && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">{guest.message}</p>
          </div>
        )}

        {/* Decline Reason */}
        {guest.declineReason && (
          <div className="bg-red-50 p-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">Decline Reason:</p>
              <p className="text-sm text-red-700">{guest.declineReason}</p>
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Requested: {new Date(guest.requestDate).toLocaleDateString()}</span>
          {guest.approvedDate && <span>Approved: {new Date(guest.approvedDate).toLocaleDateString()}</span>}
          {guest.declinedDate && <span>Declined: {new Date(guest.declinedDate).toLocaleDateString()}</span>}
        </div>

        {/* Actions for Pending */}
        {guest.status === "pending" && userType === "owner" && (
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => handleApprove(guest.id, guest.guestName)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={() => handleDecline(guest.id, guest.guestName)}
              variant="outline"
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <UserCheck className="h-8 w-8" />
                <h1 className="text-4xl font-bold">
                  {userType === "owner" ? "Manage Guests" : "Guest Verification"}
                </h1>
              </div>
              <p className="text-teal-100">
                {userType === "owner" 
                  ? "Review and approve guest check-in requests for your properties"
                  : "Track your guest verification status and check-in approvals"}
              </p>
            </div>
            {userType === "traveler" && (
              <Button 
                onClick={() => setShowRegisterDialog(true)}
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Request Visitor
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="pending" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({guestRequests.pending.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approved ({guestRequests.approved.length})
            </TabsTrigger>
            <TabsTrigger value="declined" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Declined ({guestRequests.declined.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {guestRequests.pending.length === 0 ? (
              <Card className="p-12 text-center">
                <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Pending Requests</h2>
                <p className="text-gray-600">All guest verification requests have been reviewed.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {guestRequests.pending.map(renderGuestCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved">
            {guestRequests.approved.length === 0 ? (
              <Card className="p-12 text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Approved Guests</h2>
                <p className="text-gray-600">Approved guest verifications will appear here.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {guestRequests.approved.map(renderGuestCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="declined">
            {guestRequests.declined.length === 0 ? (
              <Card className="p-12 text-center">
                <XCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Declined Requests</h2>
                <p className="text-gray-600">Declined guest verifications will appear here.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {guestRequests.declined.map(renderGuestCard)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Register Guest Dialog */}
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Visitor Approval</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="visitorName">Visitor Name *</Label>
              <Input
                id="visitorName"
                value={formData.visitorName}
                onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                placeholder="Enter visitor's full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visitorPhone">Visitor Phone Number *</Label>
              <Input
                id="visitorPhone"
                value={formData.visitorPhone}
                onChange={(e) => setFormData({ ...formData, visitorPhone: e.target.value })}
                placeholder="+234 800 000 0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visitorEmail">Visitor Email Address *</Label>
              <Input
                id="visitorEmail"
                type="email"
                value={formData.visitorEmail}
                onChange={(e) => setFormData({ ...formData, visitorEmail: e.target.value })}
                placeholder="visitor@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyName">Property Name *</Label>
              <Input
                id="propertyName"
                value={formData.propertyName}
                onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                placeholder="Enter property name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyLocation">Property Location</Label>
              <Input
                id="propertyLocation"
                value={formData.propertyLocation}
                onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                placeholder="Enter property address/location"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="arrivalDate">Arrival Date *</Label>
                <Input
                  id="arrivalDate"
                  type="date"
                  value={formData.arrivalDate}
                  onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrivalTime">Arrival Time *</Label>
                <Input
                  id="arrivalTime"
                  type="time"
                  value={formData.arrivalTime}
                  onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departureDate">Departure Date *</Label>
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departureTime">Departure Time *</Label>
                <Input
                  id="departureTime"
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfVisitors">Number of Visitors *</Label>
              <Input
                id="numberOfVisitors"
                type="number"
                min="1"
                value={formData.numberOfVisitors}
                onChange={(e) => setFormData({ ...formData, numberOfVisitors: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purposeOfVisit">Purpose of Visit</Label>
              <Input
                id="purposeOfVisit"
                value={formData.purposeOfVisit}
                onChange={(e) => setFormData({ ...formData, purposeOfVisit: e.target.value })}
                placeholder="e.g., Business meeting, Family visit"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any special requests or information"
                rows={3}
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowRegisterDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRegisterGuest}
              className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}