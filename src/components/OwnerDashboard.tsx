import { Home, TrendingUp, Download, Plus, Info, Building2, DollarSign, Users, ShoppingCart, AlertOctagon, Clock, MessageCircle, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState } from "react";
import { CheckoutRequestsSection } from "@/components/CheckoutRequestsSection";

interface OwnerDashboardProps {
  onNavigate: (view: string) => void;
}

export function OwnerDashboard({ onNavigate }: OwnerDashboardProps) {
  const [selectedDate, setSelectedDate] = useState("26 June 2024");
  const [selectedStatusPeriod, setSelectedStatusPeriod] = useState("Last year");
  const [selectedRevenuePeriod, setSelectedRevenuePeriod] = useState("Last year");

  // Emergency Alerts Data
  const emergencyAlerts = [
    {
      id: 1,
      renterName: "Alex Johnson",
      renterAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      property: "Modern Apartment in Lagos",
      emergencyType: "panic",
      emergencyLabel: "Panic Attack / Mental Health",
      emergencyIcon: "���",
      details: "I'm experiencing severe anxiety and need immediate assistance. I'm in the bedroom, feeling overwhelmed and having difficulty breathing.",
      timestamp: "5 minutes ago",
      status: "active", // active, acknowledged, resolved
      severity: "high",
      location: "Bedroom, Unit 3B"
    },
    {
      id: 2,
      renterName: "Maria Santos",
      renterAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      property: "Luxury Villa in Abuja",
      emergencyType: "utility",
      emergencyLabel: "Utility Emergency",
      emergencyIcon: "⚡",
      details: "Main water pipe burst in the kitchen. Water is flooding the kitchen area. I've turned off the main valve but need urgent plumbing assistance.",
      timestamp: "12 minutes ago",
      status: "acknowledged",
      severity: "medium",
      location: "Kitchen"
    }
  ];

  const handleAcknowledgeAlert = (alertId: number) => {
    // Handle acknowledging the alert
    console.log("Acknowledged alert:", alertId);
  };

  const handleResolveAlert = (alertId: number) => {
    // Handle resolving the alert
    console.log("Resolved alert:", alertId);
  };

  const handleContactRenter = (alertId: number) => {
    // Handle contacting the renter
    console.log("Contacting renter for alert:", alertId);
  };

  // Status Analysis Data
  const statusData = [
    { name: 'Accepted', value: 1037, color: '#8B5CF6' },
    { name: 'Rejected', value: 486, color: '#F59E0B' },
    { name: 'Classifier', value: 165, color: '#3B82F6' },
    { name: 'Pending', value: 405, color: '#14B8A6' }
  ];

  // Revenue Generation Data
  const revenueData = [
    { month: 'Jan', deals: 420, dealValue: 450 },
    { month: 'Feb', deals: 480, dealValue: 520 },
    { month: 'Mar', deals: 380, dealValue: 420 },
    { month: 'Apr', deals: 520, dealValue: 580 },
    { month: 'May', deals: 460, dealValue: 510 },
    { month: 'Jun', deals: 380, dealValue: 420 },
    { month: 'Jul', deals: 340, dealValue: 380 },
    { month: 'Aug', deals: 580, dealValue: 620 },
    { month: 'Sep', deals: 680, dealValue: 720 },
    { month: 'Oct', deals: 520, dealValue: 560 },
    { month: 'Nov', deals: 420, dealValue: 460 },
    { month: 'Dec', deals: 480, dealValue: 520 }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl mb-1">Dashboard Overview</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Selector */}
          <Button variant="outline" className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
              <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 6h12M5 1v2M11 1v2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>{selectedDate}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </Button>

          {/* Export Button */}
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>

          {/* Add Property Button */}
          <Button 
            onClick={() => onNavigate("add-property")} 
            className="bg-black hover:bg-gray-800 text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </Button>
        </div>
      </div>

      {/* Emergency Alerts Section */}
      {emergencyAlerts.length > 0 && (
        <Card className="mb-8 border-red-300 bg-red-50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-2 rounded-full animate-pulse">
                  <AlertOctagon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-red-900 text-xl">🚨 Emergency Alerts</CardTitle>
                  <p className="text-sm text-red-800 mt-1">
                    {emergencyAlerts.filter(a => a.status === 'active').length} Active Emergency {emergencyAlerts.filter(a => a.status === 'active').length === 1 ? 'Alert' : 'Alerts'} - Immediate Action Required
                  </p>
                </div>
              </div>
              <Badge className="bg-red-600 text-white px-3 py-1">
                {emergencyAlerts.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyAlerts.map((alert) => (
              <Card key={alert.id} className={`border-2 ${
                alert.status === 'active' ? 'border-red-500 bg-white' : 
                alert.status === 'acknowledged' ? 'border-yellow-400 bg-yellow-50' : 
                'border-green-400 bg-green-50'
              }`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Renter Avatar */}
                    <div className="flex-shrink-0">
                      <img 
                        src={alert.renterAvatar} 
                        alt={alert.renterName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
                      />
                    </div>

                    {/* Alert Content */}
                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{alert.renterName}</h3>
                            <Badge className={`${
                              alert.status === 'active' ? 'bg-red-600' :
                              alert.status === 'acknowledged' ? 'bg-yellow-500' :
                              'bg-green-600'
                            } text-white`}>
                              {alert.status === 'active' ? '🚨 ACTIVE' :
                               alert.status === 'acknowledged' ? '⏳ Acknowledged' :
                               '✅ Resolved'}
                            </Badge>
                            <Badge variant="outline" className="border-red-400 text-red-700">
                              {alert.severity === 'high' ? '🔴 HIGH' : 
                               alert.severity === 'medium' ? '🟡 MEDIUM' : 
                               '🟢 LOW'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{alert.property}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </p>
                        </div>
                      </div>

                      {/* Emergency Type */}
                      <div className="flex items-center gap-3 p-3 bg-red-100 border border-red-200 rounded-lg">
                        <span className="text-2xl">{alert.emergencyIcon}</span>
                        <div>
                          <p className="font-semibold text-red-900">{alert.emergencyLabel}</p>
                          <p className="text-xs text-red-700 flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            Location: {alert.location}
                          </p>
                        </div>
                      </div>

                      {/* Emergency Details */}
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 mb-1">Emergency Details:</p>
                        <p className="text-sm text-gray-700">{alert.details}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleContactRenter(alert.id)}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call Renter Now
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleContactRenter(alert.id)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Send Message
                        </Button>
                        {alert.status === 'active' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                            onClick={() => handleAcknowledgeAlert(alert.id)}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Acknowledge Alert
                          </Button>
                        )}
                        {alert.status === 'acknowledged' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-green-500 text-green-700 hover:bg-green-50"
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            Mark as Resolved
                          </Button>
                        )}
                      </div>

                      {/* Emergency Services Reminder */}
                      {alert.severity === 'high' && (
                        <div className="p-2 bg-yellow-50 border border-yellow-300 rounded">
                          <p className="text-xs text-yellow-900">
                            ⚠️ <strong>Critical Emergency:</strong> If life-threatening, ensure emergency services (911) have been contacted.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Properties Managed */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-4xl font-bold mb-1">4860</h3>
                <p className="text-sm text-gray-600">Properties Managed</p>
              </div>
              <div className="bg-teal-100 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-teal-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center text-teal-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-semibold">38%</span>
              </div>
              <span className="text-gray-500">Last year</span>
            </div>
            {/* Mini Progress Chart */}
            <div className="mt-4 relative">
              <svg width="100%" height="40" viewBox="0 0 120 40" className="overflow-visible">
                <path
                  d="M 10 35 Q 30 10, 50 20 T 110 15"
                  fill="none"
                  stroke="#14B8A6"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Asset Value */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-4xl font-bold mb-1">$2B</h3>
                <p className="text-sm text-gray-600">Asset Value</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center text-blue-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-semibold">72%</span>
              </div>
              <span className="text-gray-500">Last year</span>
            </div>
            {/* Mini Bar Chart */}
            <div className="mt-4 flex items-end gap-1 h-10">
              {[15, 25, 18, 30, 22, 35, 28, 40, 32, 38].map((height, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 bg-gradient-to-t from-blue-400 to-blue-200 rounded-t"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Properties Sold */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-4xl font-bold mb-1">1037</h3>
                <p className="text-sm text-gray-600">Properties Sold</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center text-yellow-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-semibold">44.2%</span>
              </div>
              <span className="text-gray-500">Last year</span>
            </div>
            {/* Mini Bar Chart */}
            <div className="mt-4 flex items-end gap-1 h-10">
              {[20, 15, 25, 18, 22, 30, 35, 40, 38, 42].map((height, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* New Clients */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-4xl font-bold mb-1">895</h3>
                <p className="text-sm text-gray-600">New Clients</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center text-purple-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="font-semibold">70%</span>
              </div>
              <span className="text-gray-500">Last year</span>
            </div>
            {/* Mini Bar Chart */}
            <div className="mt-4 flex items-end gap-1 h-10">
              {[18, 22, 28, 35, 30, 38, 42, 40, 38, 35].map((height, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 bg-gradient-to-t from-purple-400 to-purple-200 rounded-t"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Analysis - Donut Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>Status Analysis</CardTitle>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              <Button variant="outline" size="sm" className="text-sm">
                {selectedStatusPeriod}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
                  <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-8">
              {/* Donut Chart */}
              <div className="relative w-48 h-48">
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
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-3 rounded-full shadow-lg">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M4 10h24v14a2 2 0 01-2 2H6a2 2 0 01-2-2V10z" fill="#8B5CF6" opacity="0.3"/>
                      <path d="M4 8a2 2 0 012-2h20a2 2 0 012 2v2H4V8z" fill="#14B8A6"/>
                      <rect x="10" y="14" width="12" height="2" rx="1" fill="#8B5CF6"/>
                      <rect x="10" y="19" width="8" height="2" rx="1" fill="#8B5CF6"/>
                    </svg>
                  </div>
                </div>
                {/* Outer Labels */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-center">
                  <p className="text-xs text-gray-500">165</p>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 text-center">
                  <p className="text-xs text-gray-500">1037</p>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-center">
                  <p className="text-xs text-gray-500">486</p>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 text-center">
                  <p className="text-xs text-gray-500">405</p>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-4">
                {statusData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-semibold text-lg">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Generation - Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>Revenue Generation</CardTitle>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-teal-300" />
                    <span className="text-sm text-gray-600">Deals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-teal-500" />
                    <span className="text-sm text-gray-600">Deal value</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-sm">
                  {selectedRevenuePeriod}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
                    <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={revenueData} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                  formatter={(value: number) => [`$${value}k`, '']}
                />
                <Bar dataKey="deals" fill="#5EEAD4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dealValue" fill="#14B8A6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Checkout Requests Section */}
      <CheckoutRequestsSection />
    </div>
  );
}