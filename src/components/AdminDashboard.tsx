import { useState } from "react";
import {
  Users, Building2, Shield, CheckCircle, XCircle, Clock, 
  Calendar, MapPin, Phone, Mail, Eye, AlertCircle,
  TrendingUp, DollarSign, Home, FileText, UserCheck,
  Search, Filter, Download, MoreVertical, Ban, CheckCheck, Star,
  AlertOctagon, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { PropertyVerificationCenter } from "@/components/PropertyVerificationCenter";

interface AdminDashboardProps {
  onNavigate: (view: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [showGuestDialog, setShowGuestDialog] = useState(false);
  const [selectedPropertyForVerification, setSelectedPropertyForVerification] = useState<any>(null);
  const [showVerificationCenter, setShowVerificationCenter] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);

  // Emergency Alerts Data (Admin sees all emergency alerts from all properties)
  const emergencyAlerts = [
    {
      id: 1,
      renterName: "Alex Johnson",
      renterAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      renterEmail: "alex.johnson@email.com",
      renterPhone: "+234 803 456 7890",
      property: "Modern Apartment in Lagos",
      propertyOwner: "Adebayo Johnson",
      ownerPhone: "+234 803 123 4567",
      emergencyType: "panic",
      emergencyLabel: "Panic Attack / Mental Health",
      emergencyIcon: "💔",
      details: "I'm experiencing severe anxiety and need immediate assistance. I'm in the bedroom, feeling overwhelmed and having difficulty breathing.",
      timestamp: "5 minutes ago",
      status: "active", // active, acknowledged, resolved
      severity: "high",
      location: "Bedroom, Unit 3B",
      reportedAt: new Date().toISOString()
    },
    {
      id: 2,
      renterName: "Maria Santos",
      renterAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      renterEmail: "maria.santos@email.com",
      renterPhone: "+234 805 987 6543",
      property: "Luxury Villa in Abuja",
      propertyOwner: "Grace Okonkwo",
      ownerPhone: "+234 805 987 6543",
      emergencyType: "utility",
      emergencyLabel: "Utility Emergency",
      emergencyIcon: "⚡",
      details: "Main water pipe burst in the kitchen. Water is flooding the kitchen area. I've turned off the main valve but need urgent plumbing assistance.",
      timestamp: "12 minutes ago",
      status: "acknowledged",
      severity: "medium",
      location: "Kitchen",
      reportedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      renterName: "Chioma Eze",
      renterAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      renterEmail: "chioma.eze@email.com",
      renterPhone: "+234 807 234 5678",
      property: "Beach House in Lekki",
      propertyOwner: "Ibrahim Yusuf",
      ownerPhone: "+234 809 876 5432",
      emergencyType: "medical",
      emergencyLabel: "Medical Emergency",
      emergencyIcon: "🏥",
      details: "Guest slipped and fell in the bathroom. Possible ankle injury, experiencing severe pain and unable to walk. Need medical assistance.",
      timestamp: "25 minutes ago",
      status: "resolved",
      severity: "high",
      location: "Bathroom, Ground Floor",
      reportedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
    }
  ];

  const handleAcknowledgeEmergency = (alertId: number) => {
    toast.success("Emergency alert acknowledged. Owner has been notified of your response.");
  };

  const handleResolveEmergency = (alertId: number) => {
    toast.success("Emergency marked as resolved.");
  };

  const handleContactRenterEmergency = (alertId: number) => {
    toast.info("Initiating contact with renter...");
  };

  const handleContactOwnerEmergency = (alertId: number) => {
    toast.info("Initiating contact with property owner...");
  };

  // Mock data for pending property owners
  const pendingOwners = [
    {
      id: 1,
      name: "Adebayo Johnson",
      email: "adebayo.johnson@email.com",
      phone: "+234 803 123 4567",
      businessType: "Individual Host",
      properties: 1,
      registeredDate: "2026-01-14",
      status: "pending",
      idType: "National ID",
      idNumber: "123456789",
      address: "15 Allen Avenue, Ikeja, Lagos"
    },
    {
      id: 2,
      name: "Grace Okonkwo",
      email: "grace.okonkwo@email.com",
      phone: "+234 805 987 6543",
      businessType: "Registered Business",
      businessName: "Premium Stays Ltd",
      properties: 3,
      registeredDate: "2026-01-15",
      status: "pending",
      idType: "Passport",
      idNumber: "A12345678",
      address: "45 Admiralty Way, Lekki, Lagos"
    }
  ];

  // Mock data for renters
  const renters = [
    {
      id: 1,
      name: "Chioma Eze",
      email: "chioma.eze@email.com",
      phone: "+234 807 234 5678",
      joinedDate: "2025-12-01",
      totalBookings: 8,
      status: "active",
      verified: true,
      address: "20 Victoria Island, Lagos"
    },
    {
      id: 2,
      name: "Tunde Akinola",
      email: "tunde.akinola@email.com",
      phone: "+234 809 876 5432",
      joinedDate: "2026-01-10",
      totalBookings: 2,
      status: "active",
      verified: true,
      address: "12 Bodija Estate, Ibadan"
    }
  ];

  // Mock data for all properties
  const allProperties = [
    {
      id: 1,
      name: "Modern Apartment in Lagos",
      owner: "Adebayo Johnson",
      ownerEmail: "adebayo.johnson@email.com",
      location: "15 Allen Avenue, Ikeja, Lagos",
      price: "₦50,000",
      status: "active",
      verified: true,
      bedrooms: 2,
      bathrooms: 2,
      listedDate: "2025-11-15",
      totalBookings: 24,
      rating: 4.8
    },
    {
      id: 2,
      name: "Luxury Villa in Abuja",
      owner: "Grace Okonkwo",
      ownerEmail: "grace.okonkwo@email.com",
      location: "45 Admiralty Way, Lekki, Lagos",
      price: "₦120,000",
      status: "active",
      verified: true,
      bedrooms: 4,
      bathrooms: 3,
      listedDate: "2025-10-20",
      totalBookings: 38,
      rating: 4.9
    },
    {
      id: 3,
      name: "Cozy Studio Apartment",
      owner: "Ibrahim Yusuf",
      ownerEmail: "ibrahim.y@email.com",
      location: "12 Bodija Estate, Ibadan",
      price: "₦25,000",
      status: "pending",
      verified: false,
      bedrooms: 1,
      bathrooms: 1,
      listedDate: "2026-01-18",
      totalBookings: 0,
      rating: 0
    }
  ];

  // Mock data for guest visits (pending approval)
  const pendingGuestVisits = [
    {
      id: 1,
      guestName: "Ibrahim Musa",
      guestPhone: "+234 803 456 7890",
      guestEmail: "ibrahim.musa@email.com",
      hostName: "Adebayo Johnson",
      propertyName: "Modern Apartment in Victoria Island",
      propertyAddress: "15 Allen Avenue, Ikeja, Lagos",
      arrivalDate: "2026-01-20",
      arrivalTime: "14:00",
      departureDate: "2026-01-22",
      departureTime: "11:00",
      purposeOfVisit: "Business trip",
      numberOfGuests: 1,
      requestDate: "2026-01-16",
      status: "pending",
      idDocument: "National ID",
      idNumber: "NIN987654321"
    },
    {
      id: 2,
      guestName: "Fatima Abdullahi",
      guestPhone: "+234 805 123 9876",
      guestEmail: "fatima.a@email.com",
      hostName: "Grace Okonkwo",
      propertyName: "Luxury Villa in Lekki",
      propertyAddress: "45 Admiralty Way, Lekki, Lagos",
      arrivalDate: "2026-01-18",
      arrivalTime: "16:00",
      departureDate: "2026-01-21",
      departureTime: "10:00",
      purposeOfVisit: "Vacation",
      numberOfGuests: 2,
      requestDate: "2026-01-16",
      status: "pending",
      idDocument: "Passport",
      idNumber: "A98765432"
    }
  ];

  // Approved guest visits
  const approvedGuestVisits = [
    {
      id: 3,
      guestName: "Kemi Williams",
      propertyName: "Beach House in Lekki",
      arrivalDate: "2026-01-17",
      departureDate: "2026-01-19",
      status: "approved",
      approvedBy: "Admin",
      approvedDate: "2026-01-16"
    }
  ];

  const handleApproveOwner = (ownerId: number) => {
    toast.success("Property owner approved successfully!");
    setShowUserDialog(false);
  };

  const handleRejectOwner = (ownerId: number) => {
    toast.error("Property owner rejected");
    setShowUserDialog(false);
  };

  const handleApproveGuest = (guestId: number) => {
    toast.success("Guest visit approved! Host and guest have been notified.");
    setShowGuestDialog(false);
  };

  const handleRejectGuest = (guestId: number) => {
    toast.error("Guest visit rejected");
    setShowGuestDialog(false);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserDialog(true);
  };

  const handleViewGuest = (guest: any) => {
    setSelectedGuest(guest);
    setShowGuestDialog(true);
  };

  const handleSuspendUser = (userId: number) => {
    toast.warning("User account suspended");
  };

  const handleOpenVerificationCenter = (property: any) => {
    setSelectedPropertyForVerification(property);
    setShowVerificationCenter(true);
  };

  const handleViewProperty = (property: any) => {
    setSelectedProperty(property);
    setShowPropertyDialog(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2 flex items-center gap-2">
          <Shield className="h-8 w-8 text-blue-600" />
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Manage property owners, renters, and guest verifications</p>
      </div>

      {/* Emergency Alerts Section - Critical Priority */}
      {emergencyAlerts.filter(a => a.status !== 'resolved').length > 0 && (
        <Card className="mb-8 border-red-300 bg-red-50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-2 rounded-full animate-pulse">
                  <AlertOctagon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-red-900 text-xl">🚨 Emergency Alerts Monitor</CardTitle>
                  <p className="text-sm text-red-800 mt-1">
                    {emergencyAlerts.filter(a => a.status === 'active').length} Active Emergency {emergencyAlerts.filter(a => a.status === 'active').length === 1 ? 'Alert' : 'Alerts'} - Platform-Wide Monitoring
                  </p>
                </div>
              </div>
              <Badge className="bg-red-600 text-white px-3 py-1">
                {emergencyAlerts.length} Total Alerts
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyAlerts.slice(0, 2).map((alert) => (
              <Card key={alert.id} className={`border-2 ${
                alert.status === 'active' ? 'border-red-500 bg-white' :
                alert.status === 'acknowledged' ? 'border-yellow-400 bg-yellow-50' :
                'border-green-400 bg-green-50'
              }`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={alert.renterAvatar}
                        alt={alert.renterName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{alert.renterName}</h3>
                            <Badge className={`${
                              alert.status === 'active' ? 'bg-red-600' :
                              alert.status === 'acknowledged' ? 'bg-yellow-500' :
                              'bg-green-600'
                            } text-white`}>
                              {alert.status === 'active' ? '🚨 ACTIVE' :
                               alert.status === 'acknowledged' ? '⏳ Acknowledged' :
                               '✅ Resolved'}
                            </Badge>
                            <Badge variant="outline" className="border-red-400 text-red-700">
                              {alert.severity === 'high' ? '🔴 HIGH' :
                               alert.severity === 'medium' ? '🟡 MEDIUM' :
                               '🟢 LOW'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{alert.property}</p>
                          <p className="text-xs text-gray-500">Owner: {alert.propertyOwner}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-100 border border-red-200 rounded-lg">
                        <span className="text-2xl">{alert.emergencyIcon}</span>
                        <div>
                          <p className="font-semibold text-red-900">{alert.emergencyLabel}</p>
                          <p className="text-xs text-red-700 flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            Location: {alert.location}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 mb-1">Emergency Details:</p>
                        <p className="text-sm text-gray-700">{alert.details}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleContactRenterEmergency(alert.id)}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call Renter
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleContactOwnerEmergency(alert.id)}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call Owner
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleContactRenterEmergency(alert.id)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        {alert.status === 'active' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                            onClick={() => handleAcknowledgeEmergency(alert.id)}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Acknowledge
                          </Button>
                        )}
                        {alert.status === 'acknowledged' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-500 text-green-700 hover:bg-green-50"
                            onClick={() => handleResolveEmergency(alert.id)}
                          >
                            Mark as Resolved
                          </Button>
                        )}
                      </div>
                      {alert.severity === 'high' && (
                        <div className="p-2 bg-yellow-50 border border-yellow-300 rounded">
                          <p className="text-xs text-yellow-900">
                            ⚠️ <strong>Critical Emergency:</strong> Ensure all parties and emergency services have been contacted if needed.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {emergencyAlerts.length > 2 && (
              <div className="text-center py-3">
                <Button variant="outline" size="sm">
                  View All {emergencyAlerts.length} Emergency Alerts
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Property Owners</p>
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl mb-1">247</p>
            <p className="text-sm text-gray-600">
              <span className="text-yellow-600 font-semibold">{pendingOwners.length} pending</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Renters</p>
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl mb-1">1,432</p>
            <p className="text-sm text-green-600">+15 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Pending Guest Approvals</p>
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-2xl mb-1">{pendingGuestVisits.length}</p>
            <p className="text-sm text-gray-600">Requires action</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Active Properties</p>
              <Home className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl mb-1">892</p>
            <p className="text-sm text-purple-600">Verified & Listed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="owners" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="owners">Pending Owners ({pendingOwners.length})</TabsTrigger>
          <TabsTrigger value="properties">All Properties</TabsTrigger>
          <TabsTrigger value="renters">All Renters</TabsTrigger>
          <TabsTrigger value="guests">Guest Approvals ({pendingGuestVisits.length})</TabsTrigger>
        </TabsList>

        {/* Pending Property Owners */}
        <TabsContent value="owners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Property Owner Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingOwners.map((owner) => (
                  <Card key={owner.id} className="border-2 border-yellow-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-4 justify-between">
                        <div className="flex gap-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-blue-600 text-white">
                              {owner.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{owner.name}</h3>
                              <Badge variant="outline" className="bg-yellow-50">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {owner.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {owner.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {owner.businessType}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Registered: {new Date(owner.registeredDate).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 text-sm">
                              <Badge variant="secondary">
                                <Home className="h-3 w-3 mr-1" />
                                {owner.properties} {owner.properties === 1 ? 'Property' : 'Properties'}
                              </Badge>
                              <Badge variant="secondary">
                                <Shield className="h-3 w-3 mr-1" />
                                {owner.idType}: {owner.idNumber}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex lg:flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 lg:flex-none"
                            onClick={() => handleViewUser(owner)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveOwner(owner.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1 lg:flex-none"
                            onClick={() => handleRejectOwner(owner.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {pendingOwners.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <p>No pending owner verifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guest Visit Approvals */}
        <TabsContent value="guests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Guest Visit Approvals</CardTitle>
              <p className="text-sm text-gray-600">
                Review and approve guest visits before they can check in to properties
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingGuestVisits.map((guest) => (
                  <Card key={guest.id} className="border-2 border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-4 justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="font-semibold text-lg">{guest.guestName}</h3>
                            <Badge variant="outline" className="bg-orange-50">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending Approval
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Guest Contact</p>
                              <div className="text-sm space-y-1">
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3 text-gray-400" />
                                  {guest.guestPhone}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3 text-gray-400" />
                                  {guest.guestEmail}
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500 mb-1">Property Details</p>
                              <div className="text-sm space-y-1">
                                <p className="font-medium">{guest.propertyName}</p>
                                <p className="text-gray-600">Host: {guest.hostName}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500 mb-1">Visit Schedule</p>
                              <div className="text-sm space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-green-600 font-medium">Check-in:</span>
                                  <span>{new Date(guest.arrivalDate).toLocaleDateString()} at {guest.arrivalTime}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-red-600 font-medium">Check-out:</span>
                                  <span>{new Date(guest.departureDate).toLocaleDateString()} at {guest.departureTime}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500 mb-1">Additional Info</p>
                              <div className="text-sm space-y-1">
                                <p><strong>Guests:</strong> {guest.numberOfGuests}</p>
                                <p><strong>Purpose:</strong> {guest.purposeOfVisit}</p>
                                <p><strong>ID:</strong> {guest.idDocument} - {guest.idNumber}</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                            <p>
                              <strong>Request submitted:</strong> {new Date(guest.requestDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex lg:flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 lg:flex-none"
                            onClick={() => handleViewGuest(guest)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Full Details
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveGuest(guest.id)}
                          >
                            <CheckCheck className="h-4 w-4 mr-2" />
                            Approve Visit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1 lg:flex-none"
                            onClick={() => handleRejectGuest(guest.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {pendingGuestVisits.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <p>No pending guest approvals</p>
                  </div>
                )}
              </div>

              {/* Approved Visits */}
              {approvedGuestVisits.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="font-semibold mb-4">Recently Approved Visits</h3>
                    <div className="space-y-2">
                      {approvedGuestVisits.map((visit) => (
                        <div key={visit.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium">{visit.guestName}</p>
                              <p className="text-sm text-gray-600">{visit.propertyName}</p>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <p className="text-gray-600">
                              {new Date(visit.arrivalDate).toLocaleDateString()} - {new Date(visit.departureDate).toLocaleDateString()}
                            </p>
                            <p className="text-green-600">Approved by {visit.approvedBy}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Properties Management */}
        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>All Properties</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage and oversee all listed properties on the platform
                  </p>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by property name, owner, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {allProperties.map((property) => (
                  <Card key={property.id} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-4 justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{property.name}</h3>
                            {property.verified ? (
                              <Badge className="bg-green-600">
                                <CheckCheck className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-50">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending Verification
                              </Badge>
                            )}
                            <Badge variant={property.status === "active" ? "default" : "secondary"}>
                              {property.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-sm text-gray-600">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Owner</p>
                              <p className="font-medium text-gray-900">{property.owner}</p>
                              <p className="text-xs">{property.ownerEmail}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Location</p>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{property.location}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Pricing & Bookings</p>
                              <p className="font-semibold text-teal-700">{property.price}/night</p>
                              <p className="text-xs">{property.totalBookings} total bookings</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Property Details</p>
                              <p>{property.bedrooms} bed • {property.bathrooms} bath</p>
                              {property.rating > 0 && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold">{property.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 text-sm">
                            <Badge variant="secondary">
                              <Calendar className="h-3 w-3 mr-1" />
                              Listed: {new Date(property.listedDate).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex lg:flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 lg:flex-none"
                            onClick={() => handleViewProperty(property)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          {!property.verified && (
                            <Button
                              size="sm"
                              className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700"
                              onClick={() => handleOpenVerificationCenter(property)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Verify
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                View Reviews
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend Property
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {allProperties.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Home className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No properties found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Renters Management */}
        <TabsContent value="renters" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Registered Renters</CardTitle>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search renters..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {renters.map((renter) => (
                  <Card key={renter.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Avatar>
                            <AvatarFallback className="bg-green-600 text-white">
                              {renter.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{renter.name}</h4>
                              {renter.verified && (
                                <Badge variant="secondary" className="bg-green-50 text-green-700">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {renter.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {renter.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {renter.totalBookings} bookings
                              </div>
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewUser(renter)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSuspendUser(renter.id)}>
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Details Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Complete information about the user
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <p className="text-sm font-medium mt-1">{selectedUser.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm font-medium mt-1">{selectedUser.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-sm font-medium mt-1">{selectedUser.phone}</p>
                </div>
                <div>
                  <Label>Address</Label>
                  <p className="text-sm font-medium mt-1">{selectedUser.address}</p>
                </div>
                {selectedUser.businessType && (
                  <div>
                    <Label>Business Type</Label>
                    <p className="text-sm font-medium mt-1">{selectedUser.businessType}</p>
                  </div>
                )}
                {selectedUser.idType && (
                  <>
                    <div>
                      <Label>ID Type</Label>
                      <p className="text-sm font-medium mt-1">{selectedUser.idType}</p>
                    </div>
                    <div>
                      <Label>ID Number</Label>
                      <p className="text-sm font-medium mt-1">{selectedUser.idNumber}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Guest Details Dialog */}
      <Dialog open={showGuestDialog} onOpenChange={setShowGuestDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Guest Visit Details</DialogTitle>
            <DialogDescription>
              Complete information about the guest visit request
            </DialogDescription>
          </DialogHeader>
          {selectedGuest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Guest Name</Label>
                  <p className="text-sm font-medium mt-1">{selectedGuest.guestName}</p>
                </div>
                <div>
                  <Label>Guest Phone</Label>
                  <p className="text-sm font-medium mt-1">{selectedGuest.guestPhone}</p>
                </div>
                <div>
                  <Label>Property</Label>
                  <p className="text-sm font-medium mt-1">{selectedGuest.propertyName}</p>
                </div>
                <div>
                  <Label>Host</Label>
                  <p className="text-sm font-medium mt-1">{selectedGuest.hostName}</p>
                </div>
                <div>
                  <Label>Check-in</Label>
                  <p className="text-sm font-medium mt-1">
                    {new Date(selectedGuest.arrivalDate).toLocaleDateString()} at {selectedGuest.arrivalTime}
                  </p>
                </div>
                <div>
                  <Label>Check-out</Label>
                  <p className="text-sm font-medium mt-1">
                    {new Date(selectedGuest.departureDate).toLocaleDateString()} at {selectedGuest.departureTime}
                  </p>
                </div>
                <div>
                  <Label>Number of Guests</Label>
                  <p className="text-sm font-medium mt-1">{selectedGuest.numberOfGuests}</p>
                </div>
                <div>
                  <Label>Purpose</Label>
                  <p className="text-sm font-medium mt-1">{selectedGuest.purposeOfVisit}</p>
                </div>
                <div>
                  <Label>ID Document</Label>
                  <p className="text-sm font-medium mt-1">
                    {selectedGuest.idDocument} - {selectedGuest.idNumber}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowGuestDialog(false)}>
              Close
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleRejectGuest(selectedGuest?.id)}
            >
              Reject
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleApproveGuest(selectedGuest?.id)}
            >
              Approve Visit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Property Verification Center */}
      <PropertyVerificationCenter
        open={showVerificationCenter}
        onOpenChange={setShowVerificationCenter}
        property={selectedPropertyForVerification}
      />

      {/* Property Details Dialog */}
      <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
            <DialogDescription>
              Complete information about the property
            </DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Property Name</Label>
                  <p className="text-sm font-medium mt-1">{selectedProperty.name}</p>
                </div>
                <div>
                  <Label>Owner</Label>
                  <p className="text-sm font-medium mt-1">{selectedProperty.owner}</p>
                </div>
                <div>
                  <Label>Owner Email</Label>
                  <p className="text-sm font-medium mt-1">{selectedProperty.ownerEmail}</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="text-sm font-medium mt-1">{selectedProperty.location}</p>
                </div>
                <div>
                  <Label>Price</Label>
                  <p className="text-sm font-medium mt-1">{selectedProperty.price}/night</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p className="text-sm font-medium mt-1">{selectedProperty.status}</p>
                </div>
                <div>
                  <Label>Bedrooms</Label>
                  <p className="text-sm font-medium mt-1">{selectedProperty.bedrooms}</p>
                </div>
                <div>
                  <Label>Bathrooms</Label>
                  <p className="text-sm font-medium mt-1">{selectedProperty.bathrooms}</p>
                </div>
                <div>
                  <Label>Listed Date</Label>
                  <p className="text-sm font-medium mt-1">{new Date(selectedProperty.listedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label>Total Bookings</Label>
                  <p className="text-sm font-medium mt-1">{selectedProperty.totalBookings}</p>
                </div>
                <div>
                  <Label>Rating</Label>
                  <p className="text-sm font-medium mt-1">{selectedProperty.rating}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPropertyDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}