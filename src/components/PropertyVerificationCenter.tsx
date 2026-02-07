import { useState } from "react";
import {
  Video, Wifi, Coffee, Tv, Wind, Car, Utensils, 
  Waves, Dumbbell, ShieldCheck, X, CheckCircle,
  XCircle, AlertTriangle, Play, Pause, Maximize2,
  MapPin, Home, Users, Calendar, DollarSign, Star,
  ChevronLeft, ChevronRight, Eye, EyeOff, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface PropertyVerificationCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: any;
}

export function PropertyVerificationCenter({ 
  open,
  onOpenChange,
  property
}: PropertyVerificationCenterProps) {
  const [activeVideoRoom, setActiveVideoRoom] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [verificationChecklist, setVerificationChecklist] = useState({
    videoQuality: false,
    roomsMatch: false,
    amenitiesVerified: false,
    safetyCompliant: false,
    documentsValid: false,
  });

  // Property owner uploaded videos/images for different rooms
  const roomVideos = [
    {
      id: 1,
      name: "Living Room",
      status: "live",
      thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      videoUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80", // Owner uploaded video/photo
    },
    {
      id: 2,
      name: "Master Bedroom",
      status: "live",
      thumbnail: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      videoUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80", // Owner uploaded video/photo
    },
    {
      id: 3,
      name: "Kitchen",
      status: "live",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      videoUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80", // Owner uploaded video/photo
    },
    {
      id: 4,
      name: "Bathroom",
      status: "live",
      thumbnail: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      videoUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80", // Owner uploaded video/photo
    },
  ];

  // Available amenities
  const amenitiesList = [
    { id: "wifi", icon: Wifi, label: "WiFi", available: true },
    { id: "tv", icon: Tv, label: "TV", available: true },
    { id: "ac", icon: Wind, label: "Air Conditioning", available: true },
    { id: "kitchen", icon: Utensils, label: "Kitchen", available: true },
    { id: "parking", icon: Car, label: "Free Parking", available: true },
    { id: "pool", icon: Waves, label: "Swimming Pool", available: false },
    { id: "gym", icon: Dumbbell, label: "Gym", available: false },
    { id: "coffee", icon: Coffee, label: "Coffee Maker", available: true },
  ];

  const handleChecklistChange = (key: string) => {
    setVerificationChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isAllChecked = Object.values(verificationChecklist).every(v => v);

  const handleApprove = () => {
    if (!isAllChecked) {
      toast.error("Please complete all verification checks before approving");
      return;
    }
    onOpenChange(false);
  };

  const handleReject = () => {
    onOpenChange(false);
  };

  if (!open || !property) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white p-6 rounded-t-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Property Verification Center</h2>
              </div>
              <p className="text-teal-100">Live inspection and amenities verification</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Property Info Summary */}
          <Card className="border-2 border-teal-200">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-500">Property</p>
                    <p className="font-semibold">{property.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-500">Owner</p>
                    <p className="font-semibold">{property.owner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold text-sm">{property.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-gray-500">Price/Night</p>
                    <p className="font-semibold">{property.price}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section - Live Video Feeds */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-red-600" />
                      Live Room Inspection
                      <Badge className="bg-red-600 animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full inline-block mr-1"></span>
                        LIVE
                      </Badge>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Main Video Player */}
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                    <img
                      src={roomVideos[activeVideoRoom].thumbnail}
                      alt={roomVideos[activeVideoRoom].name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20">
                      {/* Top Bar */}
                      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-600">
                            <Camera className="h-3 w-3 mr-1" />
                            LIVE
                          </Badge>
                          <Badge variant="secondary">
                            {roomVideos[activeVideoRoom].name}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Play/Pause Control */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? (
                            <Pause className="h-8 w-8 text-white" />
                          ) : (
                            <Play className="h-8 w-8 text-white ml-1" />
                          )}
                        </Button>
                      </div>

                      {/* Room Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-semibold">
                          {roomVideos[activeVideoRoom].name} - Real-time Feed
                        </p>
                        <p className="text-white/70 text-xs">
                          Verify room condition and features
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Room Selector */}
                  <div className="grid grid-cols-4 gap-3">
                    {roomVideos.map((room, index) => (
                      <button
                        key={room.id}
                        onClick={() => setActiveVideoRoom(index)}
                        className={`relative rounded-lg overflow-hidden aspect-video border-2 transition-all ${
                          activeVideoRoom === index
                            ? "border-teal-600 ring-2 ring-teal-300"
                            : "border-gray-200 hover:border-teal-400"
                        }`}
                      >
                        <img
                          src={room.thumbnail}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                          <div className="flex items-center justify-between w-full">
                            <p className="text-white text-xs font-semibold">{room.name}</p>
                            {room.status === "live" && (
                              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveVideoRoom(Math.max(0, activeVideoRoom - 1))}
                      disabled={activeVideoRoom === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous Room
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveVideoRoom(Math.min(roomVideos.length - 1, activeVideoRoom + 1))}
                      disabled={activeVideoRoom === roomVideos.length - 1}
                    >
                      Next Room
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Checklist */}
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Verification Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="videoQuality"
                      checked={verificationChecklist.videoQuality}
                      onCheckedChange={() => handleChecklistChange("videoQuality")}
                    />
                    <label htmlFor="videoQuality" className="text-sm cursor-pointer">
                      Video quality is clear and all rooms are visible
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="roomsMatch"
                      checked={verificationChecklist.roomsMatch}
                      onCheckedChange={() => handleChecklistChange("roomsMatch")}
                    />
                    <label htmlFor="roomsMatch" className="text-sm cursor-pointer">
                      Rooms match property description and photos
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="amenitiesVerified"
                      checked={verificationChecklist.amenitiesVerified}
                      onCheckedChange={() => handleChecklistChange("amenitiesVerified")}
                    />
                    <label htmlFor="amenitiesVerified" className="text-sm cursor-pointer">
                      All listed amenities are present and functional
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="safetyCompliant"
                      checked={verificationChecklist.safetyCompliant}
                      onCheckedChange={() => handleChecklistChange("safetyCompliant")}
                    />
                    <label htmlFor="safetyCompliant" className="text-sm cursor-pointer">
                      Property meets safety and security standards
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="documentsValid"
                      checked={verificationChecklist.documentsValid}
                      onCheckedChange={() => handleChecklistChange("documentsValid")}
                    />
                    <label htmlFor="documentsValid" className="text-sm cursor-pointer">
                      Owner documents and ID verification complete
                    </label>
                  </div>

                  {isAllChecked && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-5 w-5" />
                        <p className="text-sm font-semibold">All verification checks completed!</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Section - Amenities & Details */}
            <div className="space-y-4">
              {/* Basic Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {amenitiesList.map((amenity) => {
                      const Icon = amenity.icon;
                      return (
                        <div
                          key={amenity.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            amenity.available
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`h-5 w-5 ${
                                amenity.available ? "text-green-600" : "text-gray-400"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium ${
                                amenity.available ? "text-gray-900" : "text-gray-500"
                              }`}
                            >
                              {amenity.label}
                            </span>
                          </div>
                          {amenity.available ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Property Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Bedrooms</span>
                    <span className="font-semibold">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Bathrooms</span>
                    <span className="font-semibold">{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Total Bookings</span>
                    <span className="font-semibold">{property.totalBookings}</span>
                  </div>
                  {property.rating > 0 && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{property.rating}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Listed Date</span>
                    <span className="font-semibold text-sm">
                      {new Date(property.listedDate).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Owner Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Owner Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-semibold">{property.owner}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm">{property.ownerEmail}</p>
                  </div>
                  <Badge className="bg-green-600 mt-2">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Email Verified
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close Without Action
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="destructive"
                size="lg"
                onClick={handleReject}
              >
                <XCircle className="h-5 w-5 mr-2" />
                Reject Property
              </Button>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={handleApprove}
                disabled={!isAllChecked}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Approve Property
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}