import { useState } from "react";
import { Search, MapPin, Users, Bed, Bath, Star, Heart, Filter, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface PropertyBrowseProps {
  onNavigate: (view: string, data?: any) => void;
}

export function PropertyBrowse({ onNavigate }: PropertyBrowseProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [savedProperties, setSavedProperties] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [bedrooms, setBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const properties = [
    {
      id: 1,
      name: "Modern Apartment in Lagos",
      location: "Victoria Island, Lagos",
      image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 35000,
      rating: 4.8,
      reviews: 124,
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      verified: true,
      amenities: ["WiFi", "Air Conditioning", "Pool", "Parking"]
    },
    {
      id: 2,
      name: "Luxury Villa in Abuja",
      location: "Maitama, Abuja",
      image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      price: 75000,
      rating: 4.9,
      reviews: 89,
      bedrooms: 5,
      bathrooms: 4,
      guests: 10,
      verified: true,
      amenities: ["WiFi", "Pool", "Gym", "Garden", "Security"]
    },
    {
      id: 3,
      name: "Beachfront Apartment",
      location: "Lekki, Lagos",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaGZyb250JTIwaG91c2V8ZW58MXx8fHwxNzY4NDcyMDEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 45000,
      rating: 4.7,
      reviews: 156,
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      verified: true,
      amenities: ["WiFi", "Beach Access", "Air Conditioning", "Balcony"]
    },
    {
      id: 4,
      name: "Cozy Studio in Ikeja",
      location: "GRA Ikeja, Lagos",
      image: "https://images.unsplash.com/photo-1502672260066-6bc355edcb11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzY4NDcyMDM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 25000,
      rating: 4.6,
      reviews: 98,
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      verified: false,
      amenities: ["WiFi", "Air Conditioning", "Kitchenette"]
    },
    {
      id: 5,
      name: "Penthouse Suite",
      location: "Ikoyi, Lagos",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzIwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 95000,
      rating: 5.0,
      reviews: 67,
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      verified: true,
      amenities: ["WiFi", "Pool", "Gym", "Concierge", "Parking", "City View"]
    },
    {
      id: 6,
      name: "Family House in Port Harcourt",
      location: "GRA Phase 2, Port Harcourt",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob3VzZXxlbnwxfHx8fDE3Njg0NzIwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 40000,
      rating: 4.8,
      reviews: 112,
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      verified: true,
      amenities: ["WiFi", "Garden", "Parking", "Generator"]
    }
  ];

  const toggleSaveProperty = (propertyId: number) => {
    if (savedProperties.includes(propertyId)) {
      setSavedProperties(savedProperties.filter(id => id !== propertyId));
      toast.success("Property removed from favorites");
    } else {
      setSavedProperties([...savedProperties, propertyId]);
      toast.success("Property added to favorites");
    }
  };

  const handleApplyFilters = () => {
    toast.success("Filters applied");
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setPriceRange({ min: "", max: "" });
    setBedrooms("");
    setPropertyType("");
    toast.info("Filters reset");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl mb-2 text-center">Find Your Perfect Stay</h1>
          <p className="text-teal-100 text-center mb-8">Discover verified properties across Nigeria</p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 px-3 border-r">
              <MapPin className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Where do you want to stay?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 text-gray-900"
              />
            </div>
            <div className="flex gap-2">
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-gray-700 border-gray-300">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Filter Properties</DialogTitle>
                    <DialogDescription>Refine your search with these filters</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Price Range (₦ per night)</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <Input
                          type="number"
                          placeholder="Min price"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Max price"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bedrooms-filter">Bedrooms</Label>
                      <select
                        id="bedrooms-filter"
                        className="w-full p-2 border rounded-md mt-2"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                      >
                        <option value="">Any</option>
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4+ Bedrooms</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="property-type-filter">Property Type</Label>
                      <select
                        id="property-type-filter"
                        className="w-full p-2 border rounded-md mt-2"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                      >
                        <option value="">All Types</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="house">House</option>
                        <option value="studio">Studio</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={handleResetFilters}>
                      Reset
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleApplyFilters}>
                      Apply Filters
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl mb-1">Available Properties</h2>
            <p className="text-gray-600">{properties.length} properties found</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Sort by
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card 
              key={property.id} 
              className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  onClick={() => onNavigate("property-detail", property)}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveProperty(property.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      savedProperties.includes(property.id)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                {property.verified && (
                  <Badge className="absolute top-3 left-3 bg-teal-600">
                    Verified
                  </Badge>
                )}
              </div>
              <CardContent className="p-4" onClick={() => onNavigate("property-detail", property)}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{property.rating}</span>
                    <span className="text-sm text-gray-600">({property.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{property.guests} guests</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {property.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{property.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <span className="text-2xl">₦{property.price.toLocaleString()}</span>
                    <span className="text-gray-600 text-sm">/night</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("property-detail", property);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}