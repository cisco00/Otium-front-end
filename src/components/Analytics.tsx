import { Home, TrendingUp, Download, Info, Building2, DollarSign, Users, ShoppingCart, BarChart3, Calendar, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { useState } from "react";

interface AnalyticsProps {
    onNavigate: (view: string) => void;
}

export function Analytics({ onNavigate }: AnalyticsProps) {
    const [selectedDate, setSelectedDate] = useState("2024");
    const [selectedPeriod, setSelectedPeriod] = useState("Last 12 Months");

    // Status Analysis Data
    const statusData = [
        { name: 'Accepted', value: 1037, color: '#8B5CF6' },
        { name: 'Rejected', value: 486, color: '#F59E0B' },
        { name: 'Classifier', value: 165, color: '#3B82F6' },
        { name: 'Pending', value: 405, color: '#14B8A6' }
    ];

    // Revenue Generation Data
    const revenueData = [
        { month: 'Jan', deals: 420, dealValue: 450, expenses: 120 },
        { month: 'Feb', deals: 480, dealValue: 520, expenses: 140 },
        { month: 'Mar', deals: 380, dealValue: 420, expenses: 110 },
        { month: 'Apr', deals: 520, dealValue: 580, expenses: 160 },
        { month: 'May', deals: 460, dealValue: 510, expenses: 130 },
        { month: 'Jun', deals: 380, dealValue: 420, expenses: 125 },
        { month: 'Jul', deals: 340, dealValue: 380, expenses: 115 },
        { month: 'Aug', deals: 580, dealValue: 620, expenses: 180 },
        { month: 'Sep', deals: 680, dealValue: 720, expenses: 210 },
        { month: 'Oct', deals: 520, dealValue: 560, expenses: 150 },
        { month: 'Nov', deals: 420, dealValue: 460, expenses: 130 },
        { month: 'Dec', deals: 480, dealValue: 520, expenses: 140 }
    ];

    // Occupancy Data (Mock)
    const occupancyData = [
        { name: 'Mon', rate: 65 },
        { name: 'Tue', rate: 58 },
        { name: 'Wed', rate: 62 },
        { name: 'Thu', rate: 75 },
        { name: 'Fri', rate: 92 },
        { name: 'Sat', rate: 95 },
        { name: 'Sun', rate: 85 },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Analytics Dashboard</h1>
                    <p className="text-gray-600">Detailed insights into your property performance and revenue.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span>{selectedPeriod}</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        <span>Export Report</span>
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                                <h3 className="text-2xl font-bold mt-1">₦45.2M</h3>
                            </div>
                            <div className="p-2 bg-teal-100 rounded-lg">
                                <DollarSign className="h-5 w-5 text-teal-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-xs">
                            <span className="text-green-600 flex items-center font-medium">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                12.5%
                            </span>
                            <span className="text-gray-500 ml-1">vs last period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                                <h3 className="text-2xl font-bold mt-1">78%</h3>
                            </div>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Home className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-xs">
                            <span className="text-green-600 flex items-center font-medium">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                5.2%
                            </span>
                            <span className="text-gray-500 ml-1">vs last period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                                <h3 className="text-2xl font-bold mt-1">1,245</h3>
                            </div>
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Calendar className="h-5 w-5 text-purple-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-xs">
                            <span className="text-red-600 flex items-center font-medium">
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                                2.1%
                            </span>
                            <span className="text-gray-500 ml-1">vs last period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Avg. Rating</p>
                                <h3 className="text-2xl font-bold mt-1">4.8</h3>
                            </div>
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Activity className="h-5 w-5 text-yellow-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-xs">
                            <span className="text-green-600 flex items-center font-medium">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                0.2
                            </span>
                            <span className="text-gray-500 ml-1">vs last period</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Revenue Chart - Taking up 2 columns */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Revenue & Expenses</CardTitle>
                        <CardDescription>Monthly financial performance for the current year</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `₦${value}k`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                        formatter={(value: number) => [`₦${value}k`, '']}
                                    />
                                    <Legend />
                                    <Bar dataKey="dealValue" name="Revenue" fill="#14B8A6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="expenses" name="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Status Donut Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Booking Status</CardTitle>
                        <CardDescription>Distribution of booking requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">2,093</p>
                                    <p className="text-xs text-gray-500">Total</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mt-4">
                            {statusData.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-gray-600">{item.name}</span>
                                    </div>
                                    <span className="font-semibold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Average Occupancy by Day</CardTitle>
                        <CardDescription>Weekly occupancy trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={occupancyData}>
                                    <defs>
                                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} unit="%" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="rate" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRate)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Properties</CardTitle>
                        <CardDescription>Highest revenue generating assets</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { name: "Luxury Villa in Abuja", revenue: "₦12.5M", bookings: 45, trend: "+15%" },
                                { name: "Modern Apartment in Lagos", revenue: "₦8.2M", bookings: 82, trend: "+8%" },
                                { name: "Seaside Retreat", revenue: "₦6.8M", bookings: 38, trend: "+12%" },
                                { name: "City Center Loft", revenue: "₦5.4M", bookings: 65, trend: "-3%" },
                            ].map((property, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{property.name}</p>
                                            <p className="text-xs text-gray-500">{property.bookings} bookings</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm">{property.revenue}</p>
                                        <p className={`text-xs ${property.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                            {property.trend}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
