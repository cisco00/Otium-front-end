import { Search, Plus, Building2, Star, MoreHorizontal, Edit, Trash2, MapPin, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface OwnerPropertiesProps {
    onNavigate: (view: string) => void;
}

export function OwnerProperties({ onNavigate }: OwnerPropertiesProps) {
    const properties = [
        {
            id: 1,
            title: "Luxury Villa in Abuja",
            location: "Asokoro, Abuja",
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
            price: "₦150,000",
            status: "Listed",
            rating: 4.8,
            reviews: 42,
            occupancy: "85%"
        },
        {
            id: 2,
            title: "Modern Apartment in Lagos",
            location: "Victoria Island, Lagos",
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
            price: "₦85,000",
            status: "Listed",
            rating: 4.9,
            reviews: 128,
            occupancy: "92%"
        },
        {
            id: 3,
            title: "Seaside Retreat",
            location: "Lekki Phase 1, Lagos",
            image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop",
            price: "₦120,000",
            status: "Maintenance",
            rating: 4.7,
            reviews: 64,
            occupancy: "78%"
        },
        {
            id: 4,
            title: "City Center Loft",
            location: "Wuse 2, Abuja",
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
            price: "₦65,000",
            status: "Draft",
            rating: 0,
            reviews: 0,
            occupancy: "0%"
        },
        {
            id: 5,
            title: "Cozy Studio in Ikeja",
            location: "Ikeja GRA, Lagos",
            image: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&auto=format&fit=crop",
            price: "₦45,000",
            status: "Listed",
            rating: 4.6,
            reviews: 35,
            occupancy: "88%"
        }
    ];

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<any>(null);

    const handleEditClick = (property: any) => {
        setSelectedProperty(property);
        setIsEditOpen(true);
    };

    const handleCalendarClick = (property: any) => {
        setSelectedProperty(property);
        setIsCalendarOpen(true);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">My Properties</h1>
                    <p className="text-gray-600">Manage your listings, update availability, and track performance.</p>
                </div>
                <Button
                    className="bg-black hover:bg-gray-800 text-white flex items-center gap-2"
                    onClick={() => {
                        toast.info("Add Property wizard coming soon!");
                        onNavigate("add-property");
                    }}
                >
                    <Plus className="h-4 w-4" />
                    <span>Add New Property</span>
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search properties by name or location..."
                        className="pl-10 max-w-md"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <Card key={property.id} className="overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="relative h-48">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3">
                                <Badge className={`${property.status === 'Listed' ? 'bg-green-500' :
                                    property.status === 'Maintenance' ? 'bg-yellow-500' :
                                        'bg-gray-500'
                                    } text-white border-0`}>
                                    {property.status}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                        <MapPin className="h-3 w-3" />
                                        {property.location}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                            <div className="flex items-center justify-between text-sm mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    <span className="font-medium">{property.rating > 0 ? property.rating : 'New'}</span>
                                    <span className="text-gray-500">({property.reviews})</span>
                                </div>
                                <div className="font-bold text-lg text-teal-600">
                                    {property.price}<span className="text-sm text-gray-400 font-normal">/night</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="bg-gray-50 p-2 rounded text-center">
                                    <p className="text-gray-500 text-xs">Occupancy</p>
                                    <p className="font-semibold">{property.occupancy}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded text-center">
                                    <p className="text-gray-500 text-xs">Views</p>
                                    <p className="font-semibold">2.4k</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex gap-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleEditClick(property)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleCalendarClick(property)}
                            >
                                Calendar
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => toast.success(`Promoting ${property.title}`)}>
                                        Promote Listing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => toast.info(`Snoozing ${property.title}`)}>
                                        Snooze Listing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => toast.error(`Deactivating ${property.title}`)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Deactivate
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Edit Property Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit Property</DialogTitle>
                        <DialogDescription>
                            Update the details for {selectedProperty?.title}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Property Title</Label>
                                <Input id="title" defaultValue={selectedProperty?.title} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price per night</Label>
                                <Input id="price" defaultValue={selectedProperty?.price} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" defaultValue={selectedProperty?.location} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Simulated)</Label>
                            <Input id="description" defaultValue="Beautiful property in a central location..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                        <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => {
                            toast.success("Property updated successfully");
                            setIsEditOpen(false);
                        }}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Calendar Dialog */}
            <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Availability Calendar</DialogTitle>
                        <DialogDescription>
                            Manage availability for {selectedProperty?.title}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Interactive Calendar Component would go here.</p>
                        <p className="text-sm text-gray-400">Showing availability for current month.</p>
                        <div className="mt-4 flex justify-center gap-2">
                            <Badge variant="outline" className="bg-white">Available</Badge>
                            <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-100">Booked</Badge>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100">Blocked</Badge>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsCalendarOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
