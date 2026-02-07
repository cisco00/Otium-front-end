import { useState } from "react";
import { Search, MapPin, Calendar, Users, Shield, Star, SlidersHorizontal, Map, List, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PropertySearchProps {
  onNavigate: (view: string, propertyId?: number) => void;
}

export function PropertySearch({ onNavigate }: PropertySearchProps) {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [priceRange, setPriceRange] = useState([10000, 150000]);

  const properties = [
    {
      id: 1,
      title: "Modern Apartment in Lagos",
      location: "Victoria Island, Lagos",
      price: 50000,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      amenities: ["WiFi", "AC", "Kitchen", "Parking"],
      verified: true,
      instantBook: true
    },
    {
      id: 2,
      title: "Luxury Villa in Abuja",
      location: "Maitama, Abuja",
      price: 120000,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      amenities: ["WiFi", "Pool", "Gym", "Security"],
      verified: true,
      instantBook: true
    },
    {
      id: 3,
      title: "Cozy Studio in Ibadan",
      location: "Bodija, Ibadan",
      price: 25000,
      rating: 4.6,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbXxlbnwxfHx8fDE3Njg0NTQ2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      amenities: ["WiFi", "AC", "Kitchen"],
      verified: true,
      instantBook: false
    },
    {
      id: 4,
      title: "Beach House with Pool",
      location: "Lekki, Lagos",
      price: 85000,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1565548182543-8d8852e6acc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNhdGlvbiUyMHJlbnRhbCUyMHBvb2x8ZW58MXx8fHwxNzY4NTA1NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      amenities: ["WiFi", "Pool", "Beach Access", "BBQ"],
      verified: true,
      instantBook: true
    }
  ];

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <Label className="mb-4 block">Price Range (per night)</Label>
        <Slider 
          value={priceRange}
          onValueChange={setPriceRange}
          min={5000}
          max={200000}
          step={5000}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₦{priceRange[0].toLocaleString()}</span>
          <span>₦{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Property Type */}
      <div>
        <Label className="mb-3 block">Property Type</Label>
        <div className="space-y-2">
          {["Apartment", "House", "Villa", "Studio", "Condo"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={type} />
              <label htmlFor={type} className="text-sm cursor-pointer">{type}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <Label className="mb-3 block">Bedrooms</Label>
        <div className="flex gap-2 flex-wrap">
          {["Any", "1+", "2+", "3+", "4+"].map((bedroom) => (
            <Button key={bedroom} variant="outline" size="sm">{bedroom}</Button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <Label className="mb-3 block">Amenities</Label>
        <div className="space-y-2">
          {["WiFi", "Air Conditioning", "Kitchen", "Parking", "Pool", "Gym", "Security", "Pet Friendly"].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox id={amenity} />
              <label htmlFor={amenity} className="text-sm cursor-pointer">{amenity}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Property Rules */}
      <div>
        <Label className="mb-3 block">Property Rules</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="pets" />
            <label htmlFor="pets" className="text-sm cursor-pointer">Pets Allowed</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="children" />
            <label htmlFor="children" className="text-sm cursor-pointer">Children Allowed</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="smoking" />
            <label htmlFor="smoking" className="text-sm cursor-pointer">Smoking Allowed</label>
          </div>
        </div>
      </div>

      {/* Instant Book */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox id="instant" />
          <label htmlFor="instant" className="text-sm cursor-pointer">Instant Book Only</label>
        </div>
      </div>

      {/* Verified Only */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox id="verified" defaultChecked />
          <label htmlFor="verified" className="text-sm cursor-pointer">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Verified Properties Only
            </span>
          </label>
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Inputs */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white">
                <MapPin className="h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Location" 
                  className="border-0 p-0 focus-visible:ring-0"
                  defaultValue="Lagos"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Check In" 
                  type="date"
                  className="border-0 p-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white">
                <Users className="h-4 w-4 text-gray-500" />
                <Select defaultValue="2">
                  <SelectTrigger className="border-0 p-0 focus:ring-0">
                    <SelectValue placeholder="Guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* View Toggle & Filters */}
            <div className="flex gap-2">
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="rounded-l-none"
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your property search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">{properties.length} properties found in Lagos</p>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </h3>
                <FilterPanel />
              </CardContent>
            </Card>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card 
                    key={property.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => onNavigate("property-detail", property.id)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <div className="absolute top-2 left-2 flex gap-2">
                        {property.verified && (
                          <Badge className="bg-white text-black flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                        {property.instantBook && (
                          <Badge variant="secondary">Instant Book</Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{property.title}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{property.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                        <span>{property.bedrooms} beds</span>
                        <span>•</span>
                        <span>{property.bathrooms} baths</span>
                        <span>•</span>
                        <span>{property.guests} guests</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {property.amenities.slice(0, 3).map((amenity, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.amenities.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-lg">
                          <span className="font-semibold">₦{property.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-600"> / night</span>
                        </p>
                        <span className="text-xs text-gray-600">({property.reviews} reviews)</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="h-[600px] flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Map className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Map view would be integrated here</p>
                  <p className="text-sm text-gray-500 mt-2">Using Google Maps or Mapbox API</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
