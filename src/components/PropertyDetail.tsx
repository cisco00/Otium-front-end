import { useState } from "react";
import { MapPin, Users, Bed, Bath, Star, Heart, Wifi, Car, Dumbbell, Shield, ChevronLeft, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface PropertyDetailProps {
  property: any;
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
}

export function PropertyDetail({ property, onNavigate, onBack }: PropertyDetailProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const toggleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from favorites" : "Added to favorites");
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * (property?.price || 0);
  };

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    if (guests > (property?.guests || 0)) {
      toast.error(`Maximum ${property?.guests || 0} guests allowed`);
      return;
    }
    
    const bookingData = {
      property,
      checkIn,
      checkOut,
      guests,
      nights: calculateNights(),
      total: calculateTotal()
    };
    
    onNavigate("booking-checkout", bookingData);
  };

  const reviews = [
    {
      id: 1,
      userName: "Sarah Johnson",
      userAvatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?w=100&h=100&fit=crop",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely amazing stay! The property exceeded all expectations. Clean, comfortable, and the host was very responsive."
    },
    {
      id: 2,
      userName: "Michael Chen",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 5,
      date: "1 month ago",
      comment: "Perfect location and beautifully decorated. Would definitely recommend to anyone visiting the area!"
    },
    {
      id: 3,
      userName: "Emily Rodriguez",
      userAvatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?w=100&h=100&fit=crop",
      rating: 4,
      date: "2 months ago",
      comment: "Great property overall. Minor issue with WiFi speed but everything else was fantastic."
    }
  ];

  const amenitiesIcons: { [key: string]: any } = {
    "WiFi": Wifi,
    "Parking": Car,
    "Gym": Dumbbell,
    "Pool": Users,
    "Air Conditioning": Shield,
    "Security": Shield,
    "Garden": Users,
    "Beach Access": Users,
    "Balcony": Users,
    "Kitchenette": Users,
    "Concierge": Users,
    "City View": Users,
    "Generator": Users
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to properties
          </Button>
        </div>
      </div>

      {/* Property Images */}
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-96 md:h-full object-cover rounded-lg"
            />
            {property.verified && (
              <Badge className="absolute top-4 left-4 bg-teal-600">
                <Shield className="h-3 w-3 mr-1" />
                Verified Property
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={property.image} alt="View 2" className="w-full h-44 object-cover rounded-lg" />
            <img src={property.image} alt="View 3" className="w-full h-44 object-cover rounded-lg" />
            <img src={property.image} alt="View 4" className="w-full h-44 object-cover rounded-lg" />
            <div className="relative">
              <img src={property.image} alt="View 5" className="w-full h-44 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <Button variant="secondary">View All Photos</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl mb-2">{property.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-5 w-5" />
                        <span>{property.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{property.rating}</span>
                        <span>({property.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-gray-600" />
                        <span>{property.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="h-5 w-5 text-gray-600" />
                        <span>{property.bathrooms} Bathrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-600" />
                        <span>Up to {property.guests} Guests</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" onClick={toggleSave}>
                    <Heart
                      className={`h-5 w-5 ${
                        isSaved ? "fill-yellow-500 text-yellow-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Hosted by John Doe</p>
                      <p className="text-sm text-gray-600">Superhost • Joined in 2020</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Property */}
            <Card>
              <CardHeader>
                <CardTitle>About this property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to this beautiful {property?.name?.toLowerCase() || 'property'}! This stunning property offers the perfect blend of luxury and comfort, 
                  featuring modern amenities and a prime location. Whether you're here for business or leisure, this space provides 
                  everything you need for a comfortable and memorable stay.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The property is professionally managed and maintained to the highest standards. Our dedicated team ensures 
                  that every guest enjoys a seamless experience from check-in to check-out.
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(property?.amenities || []).map((amenity: string, index: number) => {
                    const IconComponent = amenitiesIcons[amenity] || CheckCircle;
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-teal-600" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* House Rules */}
            <Card>
              <CardHeader>
                <CardTitle>House Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Check-in: After 2:00 PM
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Check-out: Before 11:00 AM
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    No smoking inside the property
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    No pets allowed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    No parties or events
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={review.userAvatar} alt={review.userName} />
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold">{review.userName}</p>
                            <span className="text-sm text-gray-600">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: review.rating }, (_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All {property.reviews} Reviews
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl">₦{(property?.price || 0).toLocaleString()}</span>
                    <span className="text-gray-600">/night</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{property?.rating || 0}</span>
                    <span className="text-gray-600">({property?.reviews || 0} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="check-in">Check-in</Label>
                    <Input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="mt-1"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="check-out">Check-out</Label>
                    <Input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="mt-1"
                      min={checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max={property.guests}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-600 mt-1">Maximum {property.guests} guests</p>
                  </div>
                </div>

                {checkIn && checkOut && (
                  <div className="space-y-2 mb-6 pb-6 border-b">
                    <div className="flex justify-between text-sm">
                      <span>₦{(property?.price || 0).toLocaleString()} × {calculateNights()} nights</span>
                      <span>₦{((property?.price || 0) * calculateNights()).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>₦{Math.round(calculateTotal() * 0.05).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Total</span>
                      <span>₦{Math.round(calculateTotal() * 1.05).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700 mb-3"
                  size="lg"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
                <p className="text-xs text-center text-gray-600">
                  You won't be charged yet
                </p>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 text-center mb-3">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Safe and secure booking
                  </p>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Free cancellation within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Verified property owner</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}