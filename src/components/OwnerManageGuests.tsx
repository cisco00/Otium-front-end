import { Search, Filter, MoreHorizontal, User, Calendar, Clock, CheckCircle, XCircle, MapPin, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OwnerManageGuestsProps {
    onNavigate: (view: string) => void;
}

export function OwnerManageGuests({ onNavigate }: OwnerManageGuestsProps) {
    const guests = [
        {
            id: 1,
            name: "Sarah Williams",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
            property: "Luxury Villa in Abuja",
            checkIn: "Oct 12, 2024",
            checkOut: "Oct 18, 2024",
            status: "active", // active, upcoming, past
            guests: 4,
            amount: "₦450,000",
            rating: 4.9
        },
        {
            id: 2,
            name: "Michael Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            property: "Modern Apartment in Lagos",
            checkIn: "Oct 24, 2024",
            checkOut: "Oct 28, 2024",
            status: "upcoming",
            guests: 2,
            amount: "₦180,000",
            rating: 5.0
        },
        {
            id: 3,
            name: "Amara Okeke",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            property: "Seaside Retreat",
            checkIn: "Sep 28, 2024",
            checkOut: "Oct 05, 2024",
            status: "past",
            guests: 3,
            amount: "₦320,000",
            rating: 4.8
        }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Manage Guests</h1>
                    <p className="text-gray-600">Track current stays and prepare for upcoming arrivals.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="flex items-center gap-2" onClick={() => toast.info("Filter options coming soon")}>
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                    </Button>
                    <Button
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                        onClick={() => toast.success("Guest list exported to CSV")}
                    >
                        Export Guest List
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search guests by name or booking ID..."
                            className="pl-10"
                        />
                    </div>
                    <Select defaultValue="all" onValueChange={(val) => toast.info(`Filtered by: ${val}`)}>
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Guests</SelectItem>
                            <SelectItem value="active">Currently Hosting</SelectItem>
                            <SelectItem value="upcoming">Arriving Soon</SelectItem>
                            <SelectItem value="past">Past Guests</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4">
                {guests.map((guest) => (
                    <Card key={guest.id} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                                {/* Guest Info */}
                                <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={guest.avatar}
                                            alt={guest.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-lg">{guest.name}</h3>
                                                    <Badge className={`${guest.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' :
                                                        guest.status === 'upcoming' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                            'bg-gray-100 text-gray-700 border-gray-200'
                                                        } border shadow-none`}>
                                                        {guest.status === 'active' ? 'Currently Hosting' :
                                                            guest.status === 'upcoming' ? 'Arriving Soon' : 'Past Guest'}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {guest.property}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-lg">{guest.amount}</p>
                                                <p className="text-sm text-gray-500">{guest.guests} guests · {7} nights</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t pt-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span>Check-in: <span className="font-medium text-gray-900">{guest.checkIn}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-400" />
                                                <span>Check-out: <span className="font-medium text-gray-900">{guest.checkOut}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="bg-gray-50 p-6 flex flex-row md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 min-w-[200px]">
                                    <Button variant="outline" className="flex-1 bg-white" onClick={() => onNavigate("owner-messages")}>
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Message
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 bg-white"
                                        onClick={() => toast.success(`Calling ${guest.name}...`)}
                                    >
                                        <Phone className="h-4 w-4 mr-2" />
                                        Call
                                    </Button>
                                    {guest.status === 'active' && (
                                        <Button
                                            variant="default"
                                            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                                            onClick={() => toast.info(`Viewing details for ${guest.name}`)}
                                        >
                                            View Details
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
