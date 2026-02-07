import { Heart, MapPin, Star, Trash2, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FavoritesProps {
  onNavigate: (view: string, propertyId?: string) => void;
}

export function Favorites({ onNavigate }: FavoritesProps) {
  // Mock favorite properties data
  const favorites = [
    {
      id: "1",
      name: "Luxury Beachfront Villa",
      location: "Lagos Island, Lagos",
      price: 150000,
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      savedDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Modern Downtown Apartment",
      location: "Victoria Island, Lagos",
      price: 85000,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      savedDate: "2024-01-18"
    },
    {
      id: "3",
      name: "Cozy Garden Cottage",
      location: "Lekki Phase 1, Lagos",
      price: 65000,
      rating: 4.8,
      reviews: 54,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      type: "House",
      bedrooms: 3,
      bathrooms: 2,
      savedDate: "2024-01-20"
    },
    {
      id: "4",
      name: "Penthouse Suite with City View",
      location: "Ikoyi, Lagos",
      price: 200000,
      rating: 5.0,
      reviews: 43,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      type: "Penthouse",
      bedrooms: 5,
      bathrooms: 4,
      savedDate: "2024-01-22"
    },
    {
      id: "5",
      name: "Family Townhouse",
      location: "Ajah, Lagos",
      price: 95000,
      rating: 4.6,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      type: "Townhouse",
      bedrooms: 3,
      bathrooms: 3,
      savedDate: "2024-01-23"
    },
    {
      id: "6",
      name: "Serene Lake House",
      location: "Lekki Phase 2, Lagos",
      price: 120000,
      rating: 4.9,
      reviews: 91,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      type: "House",
      bedrooms: 4,
      bathrooms: 3,
      savedDate: "2024-01-25"
    }
  ];

  const handleRemoveFavorite = (propertyId: string, propertyName: string) => {
    // In a real app, this would make an API call
    alert(`"${propertyName}" removed from favorites`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="h-8 w-8" />
            <h1 className="text-4xl font-bold">My Favorites</h1>
          </div>
          <p className="text-teal-100">
            {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved for later
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {favorites.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Favorites Yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring properties and save your favorites to find them easily later.
            </p>
            <Button
              onClick={() => onNavigate("search")}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
            >
              Browse Properties
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                    {property.type}
                  </Badge>
                  <button
                    onClick={() => handleRemoveFavorite(property.id, property.name)}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-sm">{property.rating}</span>
                    <span className="text-gray-600 text-sm">({property.reviews})</span>
                  </div>
                </div>

                <CardHeader>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{property.bedrooms} Beds</span>
                      <span>•</span>
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-teal-600" />
                    <span className="text-2xl font-bold text-gray-900">
                      ₦{property.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600 text-sm">/ night</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Saved on {new Date(property.savedDate).toLocaleDateString()}
                  </p>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button
                    onClick={() => onNavigate("property-detail", property.id)}
                    className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => onNavigate("reserve-property", property.id)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
