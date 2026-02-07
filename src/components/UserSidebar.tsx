import { 
  User, Home, Search, Calendar, Heart, Settings, 
  Building2, BarChart3, Bell, LogOut,
  Shield, CreditCard, MessageSquare, HelpCircle, FileText, UserCheck,
  ChevronLeft, ChevronRight, Star, MapPin, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface UserSidebarProps {
  userType: "traveler" | "owner" | "admin";
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function UserSidebar({ userType, currentView, onNavigate, onLogout }: UserSidebarProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  // Mock property owner data
  const ownerInfo = {
    name: "Aisha Mohammed",
    email: "aisha.mohammed@otium.com",
    phone: "+234 801 234 5678",
    memberSince: "January 2024",
    verified: true,
    rating: 4.8,
    totalReviews: 127,
    properties: 5,
    totalBookings: 342,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  };

  // Mock renter/traveler data
  const travelerInfo = {
    name: "David Okafor",
    email: "david.okafor@otium.com",
    phone: "+234 803 567 8901",
    memberSince: "March 2025",
    verified: true,
    rating: 4.6,
    totalReviews: 18,
    totalBookings: 12,
    upcomingTrips: 2,
    favoriteProperties: 8,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  };

  const travelerMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "search", label: "Browse Properties", icon: Search },
    { id: "my-bookings", label: "My Bookings", icon: Calendar },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "verification", label: "Verification", icon: Shield },
    { id: "guest-verification", label: "Guest Verification", icon: UserCheck },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "profile", label: "Profile Settings", icon: Settings },
    { id: "help-center", label: "Help Center", icon: HelpCircle },
  ];

  const ownerMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "search", label: "My Properties", icon: Building2 },
    { id: "booking-requests", label: "Booking Requests", icon: Calendar },
    { id: "extension-requests", label: "Extension Requests", icon: Clock },
    { id: "guest-verification", label: "Manage Guests", icon: UserCheck },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "payment", label: "Payments", icon: CreditCard },
    { id: "profile", label: "Profile Settings", icon: Settings },
    { id: "help-center", label: "Help Center", icon: HelpCircle },
  ];

  const adminMenuItems = [
    { id: "admin", label: "Dashboard", icon: Home },
    { id: "users", label: "Manage Users", icon: User },
    { id: "properties", label: "Manage Properties", icon: Building2 },
    { id: "verification", label: "Verifications", icon: Shield },
    { id: "guest-verification", label: "Guest Management", icon: UserCheck },
    { id: "analytics", label: "Platform Analytics", icon: BarChart3 },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const menuItems = 
    userType === "admin" ? adminMenuItems : 
    userType === "owner" ? ownerMenuItems : 
    travelerMenuItems;

  return (
    <aside className={`${isMinimized ? 'w-20' : 'w-80'} bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto flex flex-col transition-all duration-300`}>
      <div className="flex-1 flex flex-col">
        {/* Logo and Toggle */}
        <div className={`p-6 flex items-center ${isMinimized ? 'justify-center' : 'justify-between'}`}>
          {!isMinimized && (
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Otium
              </span>
            </div>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
          >
            {isMinimized ? (
              <ChevronRight className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Property Owner Information - Only for owners and not minimized */}
        {userType === "owner" && !isMinimized && (
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <img 
                    src={ownerInfo.avatar} 
                    alt={ownerInfo.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-white"
                  />
                  {ownerInfo.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-teal-500 rounded-full p-1">
                      <Shield className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{ownerInfo.name}</h3>
                  <p className="text-xs text-gray-600 truncate">{ownerInfo.email}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-semibold text-gray-700">{ownerInfo.rating}</span>
                    <span className="text-xs text-gray-500">({ownerInfo.totalReviews})</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-white/70 rounded-lg p-2">
                  <p className="text-xs text-gray-600">Properties</p>
                  <p className="text-lg font-bold text-teal-700">{ownerInfo.properties}</p>
                </div>
                <div className="bg-white/70 rounded-lg p-2">
                  <p className="text-xs text-gray-600">Total Bookings</p>
                  <p className="text-lg font-bold text-teal-700">{ownerInfo.totalBookings}</p>
                </div>
              </div>

              <div className="text-xs text-gray-600 flex items-center gap-1">
                <User className="h-3 w-3" />
                Member since {ownerInfo.memberSince}
              </div>
            </div>
          </div>
        )}

        {/* Traveler/Renter Information - Only for travelers and not minimized */}
        {userType === "traveler" && !isMinimized && (
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <img 
                    src={travelerInfo.avatar} 
                    alt={travelerInfo.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-white"
                  />
                  {travelerInfo.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                      <Shield className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{travelerInfo.name}</h3>
                  <p className="text-xs text-gray-600 truncate">{travelerInfo.email}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-semibold text-gray-700">{travelerInfo.rating}</span>
                    <span className="text-xs text-gray-500">({travelerInfo.totalReviews})</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-white/70 rounded-lg p-2">
                  <p className="text-xs text-gray-600">Upcoming Trips</p>
                  <p className="text-lg font-bold text-blue-700">{travelerInfo.upcomingTrips}</p>
                </div>
                <div className="bg-white/70 rounded-lg p-2">
                  <p className="text-xs text-gray-600">Total Trips</p>
                  <p className="text-lg font-bold text-blue-700">{travelerInfo.totalBookings}</p>
                </div>
              </div>

              <div className="bg-white/70 rounded-lg p-2 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Heart className="h-3 w-3" />
                    <span>Favorites</span>
                  </div>
                  <span className="text-sm font-bold text-blue-700">{travelerInfo.favoriteProperties}</span>
                </div>
              </div>

              <div className="text-xs text-gray-600 flex items-center gap-1">
                <User className="h-3 w-3" />
                Member since {travelerInfo.memberSince}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className={`space-y-1 ${isMinimized ? 'px-2' : 'px-6'} flex-1`}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center ${isMinimized ? 'justify-center px-3' : 'gap-3 px-4'} py-3 rounded-lg transition-all text-left ${
                  isActive
                    ? "bg-teal-50 text-teal-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                title={isMinimized ? item.label : undefined}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-teal-600" : "text-gray-500"}`} />
                {!isMinimized && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button at Bottom */}
      <div className={`${isMinimized ? 'p-2' : 'p-6'} border-t border-gray-200`}>
        <Button
          onClick={onLogout}
          variant="ghost"
          className={`w-full ${isMinimized ? 'justify-center px-3' : 'justify-start'} text-gray-600 hover:text-red-600 hover:bg-red-50`}
          title={isMinimized ? "Logout" : undefined}
        >
          <LogOut className={`h-5 w-5 ${isMinimized ? '' : 'mr-3'}`} />
          {!isMinimized && <span className="text-sm">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}