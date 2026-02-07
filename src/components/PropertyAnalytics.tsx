import { useState } from "react";
import { 
  TrendingUp, TrendingDown, MapPin, Star, DollarSign, Calendar, 
  Users, Eye, Heart, MessageCircle, ArrowUpRight, ArrowDownRight,
  Filter, Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

interface PropertyAnalyticsProps {
  onNavigate: (view: string) => void;
  propertyId?: number | null;
}

export function PropertyAnalytics({ onNavigate, propertyId }: PropertyAnalyticsProps) {
  const [timeRange, setTimeRange] = useState("3months");
  const [selectedProperty, setSelectedProperty] = useState<string>(propertyId ? propertyId.toString() : "all");

  // Properties data with location
  const properties = [
    {
      id: "1",
      name: "Modern Apartment in Lagos",
      location: "Victoria Island, Lagos",
      image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      city: "Lagos",
      area: "Victoria Island",
      occupancy: 85,
      revenue: 420000,
      bookings: 12,
      views: 1234,
      saves: 89,
      avgRating: 4.8,
      totalReviews: 124,
      responseRate: 98,
      avgResponseTime: "1 hour"
    },
    {
      id: "2",
      name: "Luxury Villa in Abuja",
      location: "Maitama, Abuja",
      image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      city: "Abuja",
      area: "Maitama",
      occupancy: 92,
      revenue: 780000,
      bookings: 8,
      views: 2156,
      saves: 145,
      avgRating: 4.9,
      totalReviews: 89,
      responseRate: 100,
      avgResponseTime: "30 minutes"
    },
    {
      id: "3",
      name: "Cozy Studio in Ibadan",
      location: "Bodija, Ibadan",
      image: "https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbXxlbnwxfHx8fDE3Njg0NTQ2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      city: "Ibadan",
      area: "Bodija",
      occupancy: 78,
      revenue: 175000,
      bookings: 15,
      views: 876,
      saves: 45,
      avgRating: 4.6,
      totalReviews: 67,
      responseRate: 95,
      avgResponseTime: "2 hours"
    },
    {
      id: "4",
      name: "Beach House with Pool",
      location: "Lekki, Lagos",
      image: "https://images.unsplash.com/photo-1565548182543-8d8852e6acc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNhdGlvbiUyMHJlbnRhbCUyMHBvb2x8ZW58MXx8fHwxNzY4NTA1NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      city: "Lagos",
      area: "Lekki",
      occupancy: 88,
      revenue: 595000,
      bookings: 10,
      views: 1567,
      saves: 112,
      avgRating: 4.9,
      totalReviews: 156,
      responseRate: 99,
      avgResponseTime: "45 minutes"
    }
  ];

  // Revenue trend data
  const revenueData = [
    { month: "Aug", Lagos: 380000, Abuja: 720000, Ibadan: 145000 },
    { month: "Sep", Lagos: 425000, Abuja: 765000, Ibadan: 158000 },
    { month: "Oct", Lagos: 510000, Abuja: 780000, Ibadan: 162000 },
    { month: "Nov", Lagos: 485000, Abuja: 745000, Ibadan: 170000 },
    { month: "Dec", Lagos: 620000, Abuja: 850000, Ibadan: 180000 },
    { month: "Jan", Lagos: 1015000, Abuja: 780000, Ibadan: 175000 }
  ];

  // Occupancy trend data
  const occupancyData = [
    { month: "Aug", "Modern Apt": 82, "Luxury Villa": 90, "Cozy Studio": 75, "Beach House": 85 },
    { month: "Sep", "Modern Apt": 84, "Luxury Villa": 91, "Cozy Studio": 76, "Beach House": 87 },
    { month: "Oct", "Modern Apt": 83, "Luxury Villa": 93, "Cozy Studio": 77, "Beach House": 86 },
    { month: "Nov", "Modern Apt": 86, "Luxury Villa": 92, "Cozy Studio": 78, "Beach House": 89 },
    { month: "Dec", "Modern Apt": 84, "Luxury Villa": 94, "Cozy Studio": 79, "Beach House": 88 },
    { month: "Jan", "Modern Apt": 85, "Luxury Villa": 92, "Cozy Studio": 78, "Beach House": 88 }
  ];

  // Location performance data
  const locationData = [
    { location: "Lagos", revenue: 1015000, bookings: 22, avgOccupancy: 86.5 },
    { location: "Abuja", revenue: 780000, bookings: 8, avgOccupancy: 92 },
    { location: "Ibadan", revenue: 175000, bookings: 15, avgOccupancy: 78 }
  ];

  // Booking sources
  const bookingSourceData = [
    { name: "Direct Search", value: 45 },
    { name: "Recommendations", value: 25 },
    { name: "Saved Properties", value: 20 },
    { name: "Social Media", value: 10 }
  ];

  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];

  // Filter properties if a specific property is selected
  const filteredProperties = selectedProperty === "all" 
    ? properties 
    : properties.filter(p => p.id === selectedProperty);

  // Calculate totals based on filtered properties
  const totalRevenue = filteredProperties.reduce((sum, p) => sum + p.revenue, 0);
  const totalBookings = filteredProperties.reduce((sum, p) => sum + p.bookings, 0);
  const avgOccupancy = Math.round(filteredProperties.reduce((sum, p) => sum + p.occupancy, 0) / filteredProperties.length);
  const totalViews = filteredProperties.reduce((sum, p) => sum + p.views, 0);

  // Property reviews
  const propertyReviews: Record<string, any[]> = {
    "1": [
      {
        author: "John Doe",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg0Nzc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 5,
        date: "Jan 10, 2026",
        comment: "Amazing property! Everything was exactly as described.",
        ratings: { cleanliness: 5, accuracy: 5, communication: 5, location: 4.5, checkin: 5, value: 4.5 }
      },
      {
        author: "Sarah Williams",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg0Nzc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 5,
        date: "Jan 8, 2026",
        comment: "Perfect location, clean, and well-maintained!",
        ratings: { cleanliness: 5, accuracy: 5, communication: 5, location: 5, checkin: 5, value: 4 }
      },
      {
        author: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg0Nzc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4,
        date: "Jan 5, 2026",
        comment: "Great apartment with excellent amenities.",
        ratings: { cleanliness: 5, accuracy: 4, communication: 5, location: 4.5, checkin: 4.5, value: 4 }
      }
    ],
    "2": [
      {
        author: "Emma Johnson",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg0Nzc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 5,
        date: "Jan 12, 2026",
        comment: "Absolutely stunning villa! Worth every penny.",
        ratings: { cleanliness: 5, accuracy: 5, communication: 5, location: 5, checkin: 5, value: 5 }
      },
      {
        author: "David Brown",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg0Nzc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 5,
        date: "Jan 9, 2026",
        comment: "Luxury at its finest. Host was very accommodating.",
        ratings: { cleanliness: 5, accuracy: 5, communication: 5, location: 4.5, checkin: 5, value: 4.5 }
      }
    ],
    "3": [
      {
        author: "Lisa Anderson",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg0Nzc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 5,
        date: "Jan 11, 2026",
        comment: "Perfect for a solo stay. Very comfortable and cozy.",
        ratings: { cleanliness: 5, accuracy: 4.5, communication: 5, location: 4, checkin: 5, value: 5 }
      },
      {
        author: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg0Nzc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4,
        date: "Jan 7, 2026",
        comment: "Great value for money. Good location in Ibadan.",
        ratings: { cleanliness: 4.5, accuracy: 4.5, communication: 4.5, location: 4, checkin: 4.5, value: 5 }
      }
    ],
    "4": [
      {
        author: "Olivia Martinez",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg0Nzc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 5,
        date: "Jan 13, 2026",
        comment: "Dream vacation home! Pool was amazing, beach access perfect.",
        ratings: { cleanliness: 5, accuracy: 5, communication: 5, location: 5, checkin: 5, value: 4.5 }
      },
      {
        author: "Robert Taylor",
        avatar: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg0Nzc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 5,
        date: "Jan 6, 2026",
        comment: "Family loved it! Will definitely come back.",
        ratings: { cleanliness: 5, accuracy: 5, communication: 5, location: 5, checkin: 4.5, value: 4.5 }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl mb-2">Property Analytics</h1>
          <p className="text-gray-600">
            {selectedProperty === "all" 
              ? "Performance insights across all your properties" 
              : `Performance insights for ${filteredProperties[0]?.name}`
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl mb-1">₦{totalRevenue.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>+15.3% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Bookings</p>
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl mb-1">{totalBookings}</p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>+8.2% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Avg. Occupancy</p>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl mb-1">{avgOccupancy}%</p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>+3.1% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Views</p>
              <Eye className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-2xl mb-1">{totalViews.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12.5% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue by Location */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => `₦${value.toLocaleString()}`}
                />
                <Legend />
                <Area type="monotone" dataKey="Lagos" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="Abuja" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                <Area type="monotone" dataKey="Ibadan" stackId="1" stroke="#ec4899" fill="#ec4899" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trends by Property</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
                <Line type="monotone" dataKey="Modern Apt" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="Luxury Villa" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="Cozy Studio" stroke="#ec4899" strokeWidth={2} />
                <Line type="monotone" dataKey="Beach House" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue (₦)" />
                <Bar yAxisId="right" dataKey="avgOccupancy" fill="#8b5cf6" name="Avg Occupancy (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bookingSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Individual Property Performance */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Individual Property Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="border rounded-lg p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Property Info */}
                  <div className="flex gap-4 flex-1">
                    <img 
                      src={property.image}
                      alt={property.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{property.avgRating}</span>
                          <span className="text-gray-600">({property.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Revenue</p>
                      <p className="font-semibold">₦{property.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Occupancy</p>
                      <p className="font-semibold">{property.occupancy}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Bookings</p>
                      <p className="font-semibold">{property.bookings}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Views</p>
                      <p className="font-semibold">{property.views}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Detailed Ratings */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-3">Rating Breakdown</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {propertyReviews[property.id]?.[0]?.ratings && Object.entries(propertyReviews[property.id][0].ratings).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs capitalize">{key}</span>
                          <span className="text-xs font-semibold">{value}</span>
                        </div>
                        <Progress value={(value as number) * 20} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Reviews */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold">Recent Reviews</h4>
                    <Button variant="outline" size="sm">View All ({property.totalReviews})</Button>
                  </div>
                  <div className="space-y-4">
                    {propertyReviews[property.id]?.slice(0, 2).map((review, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.avatar} alt={review.author} />
                            <AvatarFallback>{review.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-sm">{review.author}</p>
                                <p className="text-xs text-gray-600">{review.date}</p>
                              </div>
                              <div className="flex gap-0.5">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm mt-2">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Indicators */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span>{property.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-gray-500" />
                    <span>{property.saves} saves</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-gray-500" />
                    <span>{property.responseRate}% response rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Avg response: {property.avgResponseTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Location Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {locationData.map((location, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">{location.location}</h3>
                  </div>
                  <Badge variant={location.avgOccupancy > 85 ? "default" : "secondary"}>
                    {location.avgOccupancy > 85 ? "High Performance" : "Good"}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                    <p className="text-xl font-semibold">₦{location.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                    <p className="text-xl font-semibold">{location.bookings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Avg Occupancy</p>
                    <p className="text-xl font-semibold">{location.avgOccupancy}%</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={location.avgOccupancy} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}