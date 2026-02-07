import { Home, Star, MapPin, Edit, Trash2, Eye, BarChart3, Calendar, DollarSign, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MyPropertiesProps {
  onNavigate: (view: string, propertyId?: number) => void;
}

export function MyProperties({ onNavigate }: MyPropertiesProps) {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEmergencyAlertOpen, setIsEmergencyAlertOpen] = useState(false);
  const [emergencyType, setEmergencyType] = useState("");
  const [emergencyDetails, setEmergencyDetails] = useState("");

  const properties = [
    {
      id: 1,
      name: "Modern Apartment in Lagos",
      image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Victoria Island, Lagos",
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      price: "₦35,000",
      occupancy: 85,
      rating: 4.8,
      reviews: 24,
      revenue: "₦420,000",
      bookings: 12,
      status: "Active",
      featured: true
    },
    {
      id: 2,
      name: "Luxury Villa in Abuja",
      image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Maitama, Abuja",
      type: "Villa",
      bedrooms: 5,
      bathrooms: 4,
      price: "₦97,500",
      occupancy: 92,
      rating: 4.9,
      reviews: 18,
      revenue: "₦780,000",
      bookings: 8,
      status: "Active",
      featured: false
    },
    {
      id: 3,
      name: "Cozy Bungalow in Port Harcourt",
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidW5nYWxvdyUyMGhvdXNlfGVufDF8fHx8MTc2ODQ3MTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "GRA, Port Harcourt",
      type: "Bungalow",
      bedrooms: 2,
      bathrooms: 2,
      price: "₦28,000",
      occupancy: 70,
      rating: 4.6,
      reviews: 15,
      revenue: "₦280,000",
      bookings: 10,
      status: "Active",
      featured: false
    },
    {
      id: 4,
      name: "Penthouse Suite in Lekki",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjBsdXh1cnl8ZW58MXx8fHwxNzY4NDcxOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Lekki Phase 1, Lagos",
      type: "Penthouse",
      bedrooms: 4,
      bathrooms: 3,
      price: "₦75,000",
      occupancy: 60,
      rating: 4.7,
      reviews: 12,
      revenue: "₦540,000",
      bookings: 7,
      status: "Inactive",
      featured: false
    }
  ];

  const handleDeleteProperty = (property: any) => {
    setSelectedProperty(property);
    setIsDeleteDialogOpen(true);
  };

  const handleEmergencyAlert = (property: any) => {
    console.log("Emergency Alert clicked for:", property.name);
    toast.info(`Opening emergency alert for ${property.name}`);
    setSelectedProperty(property);
    setIsEmergencyAlertOpen(true);
    setEmergencyType("");
    setEmergencyDetails("");
  };

  const submitEmergencyAlert = () => {
    if (!emergencyType || !emergencyDetails.trim()) {
      toast.error("Please select emergency type and provide details");
      return;
    }

    // Submit emergency alert
    toast.success(
      `Emergency alert submitted for ${selectedProperty?.name}. Support team will contact you immediately.`,
      { duration: 5000 }
    );
    
    setIsEmergencyAlertOpen(false);
    setSelectedProperty(null);
    setEmergencyType("");
    setEmergencyDetails("");
  };

  const confirmDelete = () => {
    toast.success(`${selectedProperty?.name} has been removed from your listings`);
    setIsDeleteDialogOpen(false);
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent">
              My Properties
            </h1>
            <p className="text-gray-600">Manage and monitor your property listings</p>
          </div>
          <Button onClick={() => onNavigate("add-property")} className="bg-teal-600 hover:bg-teal-700">
            <Home className="h-4 w-4 mr-2" />
            Add New Property
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Properties</p>
                  <p className="text-2xl">{properties.length}</p>
                </div>
                <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Home className="h-6 w-6 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Listings</p>
                  <p className="text-2xl">{properties.filter(p => p.status === "Active").length}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl">₦2.02M</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                  <p className="text-2xl">{properties.reduce((sum, p) => sum + p.bookings, 0)}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {property.featured && (
                    <Badge className="bg-yellow-500 text-gray-900">Featured</Badge>
                  )}
                  <Badge variant={property.status === "Active" ? "default" : "secondary"}>
                    {property.status}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="font-semibold text-lg mb-2">{property.name}</h3>
                
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-600">{property.type}</span>
                  <span className="text-gray-600">{property.bedrooms} beds • {property.bathrooms} baths</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Rating</p>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{property.rating}</span>
                    </div>
                  </div>
                  <div className="text-center border-x">
                    <p className="text-xs text-gray-600 mb-1">Occupancy</p>
                    <p className="text-sm font-semibold">{property.occupancy}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Bookings</p>
                    <p className="text-sm font-semibold">{property.bookings}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-600">Price per night</p>
                    <p className="text-lg font-semibold text-teal-600">{property.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Monthly Revenue</p>
                    <p className="text-sm font-semibold">{property.revenue}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onNavigate("analytics", property.id)}
                    className="w-full"
                    title="View Analytics"
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onNavigate("edit-property", property.id)}
                    className="w-full"
                    title="Edit Property"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEmergencyAlert(property)}
                    className="w-full hover:bg-orange-50 hover:text-orange-600 hover:border-orange-600"
                    title="Emergency Alert"
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteProperty(property)}
                    className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-600"
                    title="Delete Property"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center">
              <Home className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
              <p className="text-sm text-gray-600 mb-4">Start by adding your first property to the platform</p>
              <Button onClick={() => onNavigate("add-property")} className="bg-teal-600 hover:bg-teal-700">
                <Home className="h-4 w-4 mr-2" />
                Add Your First Property
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedProperty?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Emergency Alert Dialog */}
      <Dialog open={isEmergencyAlertOpen} onOpenChange={setIsEmergencyAlertOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">Emergency Alert</DialogTitle>
                <DialogDescription className="mt-1">
                  Report an urgent issue for "{selectedProperty?.name}"
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Property Info */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <p className="text-sm font-semibold mb-1">Property Details</p>
              <p className="text-sm text-gray-600">{selectedProperty?.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {selectedProperty?.location}
              </p>
            </div>

            {/* Emergency Type */}
            <div className="space-y-2">
              <Label htmlFor="emergency-type">Emergency Type *</Label>
              <Select
                value={emergencyType}
                onValueChange={setEmergencyType}
              >
                <SelectTrigger id="emergency-type">
                  <SelectValue placeholder="Select emergency type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">🔥 Fire Emergency</SelectItem>
                  <SelectItem value="flood">💧 Flood / Water Damage</SelectItem>
                  <SelectItem value="theft">🚨 Theft / Break-in</SelectItem>
                  <SelectItem value="structural">🏚️ Structural Damage</SelectItem>
                  <SelectItem value="electrical">⚡ Electrical Hazard</SelectItem>
                  <SelectItem value="gas">💨 Gas Leak</SelectItem>
                  <SelectItem value="medical">🏥 Medical Emergency (Guest)</SelectItem>
                  <SelectItem value="security">🔒 Security Concern</SelectItem>
                  <SelectItem value="natural-disaster">🌪️ Natural Disaster</SelectItem>
                  <SelectItem value="other">📋 Other Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Emergency Details */}
            <div className="space-y-2">
              <Label htmlFor="emergency-details">Detailed Description *</Label>
              <Textarea
                id="emergency-details"
                value={emergencyDetails}
                onChange={(e) => setEmergencyDetails(e.target.value)}
                placeholder="Describe the emergency situation in detail. Include:&#10;• What happened?&#10;• When did it occur?&#10;• Current status&#10;• Any immediate actions taken&#10;• Guests affected (if any)"
                className="resize-none min-h-[120px]"
              />
              <p className="text-xs text-gray-500">
                {emergencyDetails.length} / 500 characters
              </p>
            </div>

            {/* Warning Message */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-xs text-orange-800">
                <strong>⚠️ Important:</strong> Our support team will be notified immediately and will contact you within minutes. 
                For life-threatening emergencies, please call emergency services (911 or local equivalent) first.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsEmergencyAlertOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={submitEmergencyAlert}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Submit Emergency Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}