import { Search, MapPin, Calendar, Users, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Lock, ShieldCheck, Eye, FileText, Globe } from "lucide-react";

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onLogin?: () => void;
  onRegisterRenter?: () => void;
  onRegisterOwner?: () => void;
}

export function LandingPage({ onNavigate, onLogin, onRegisterRenter, onRegisterOwner }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-20 sm:py-32"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1493134799591-2c9eed26201a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3Njg0NjM2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')` 
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Verified properties, trusted hosts, and seamless booking experiences across Nigeria
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12">Why Choose Otium?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl mb-2">Verified Users & Properties</h3>
                <p className="text-gray-600">
                  All users and listings are verified for safety, cleanliness, and accuracy
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl mb-2">Easy Booking</h3>
                <p className="text-gray-600">
                  Seamless booking process with instant confirmation and flexible payment options
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl mb-2">Verified Reviews</h3>
                <p className="text-gray-600">
                  Read authentic reviews from verified guests to make informed decisions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl">Featured Properties</h2>
            <Button variant="outline" onClick={() => onNavigate("search")}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg0NzE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                title: "Modern Apartment in Lagos",
                price: "₦50,000",
                rating: 4.8,
                reviews: 124
              },
              {
                image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2ODQxMTIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                title: "Luxury Villa in Abuja",
                price: "₦120,000",
                rating: 4.9,
                reviews: 89
              },
              {
                image: "https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbXxlbnwxfHx8fDE3Njg0NTQ2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                title: "Cozy Studio in Ibadan",
                price: "₦25,000",
                rating: 4.6,
                reviews: 67
              }
            ].map((property, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 right-2 bg-white text-black">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg mb-2">{property.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{property.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({property.reviews} reviews)</span>
                  </div>
                  <p className="text-lg">
                    <span className="font-semibold">{property.price}</span> / night
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Safety & Privacy Section */}
      <div className="py-16 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Your Safety & Privacy, Guaranteed
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              We take security seriously with enterprise-grade protection for all users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ID Verification */}
            <Card className="bg-teal-800/40 border-teal-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 p-3 rounded-lg flex-shrink-0">
                    <UserCheck className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">ID Verification</h3>
                    <p className="text-white/80 text-sm">
                      All users verify their identity with government-issued IDs and biometric address verification.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Encryption */}
            <Card className="bg-teal-800/40 border-teal-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 p-3 rounded-lg flex-shrink-0">
                    <Lock className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Data Encryption</h3>
                    <p className="text-white/80 text-sm">
                      SSL/TLS encryption for all data transmission and secure storage of sensitive information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2FA Security */}
            <Card className="bg-teal-800/40 border-teal-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 p-3 rounded-lg flex-shrink-0">
                    <ShieldCheck className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">2FA Security</h3>
                    <p className="text-white/80 text-sm">
                      Multi-factor authentication and biometric options to protect your account.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Controls */}
            <Card className="bg-teal-800/40 border-teal-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 p-3 rounded-lg flex-shrink-0">
                    <Eye className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Privacy Controls</h3>
                    <p className="text-white/80 text-sm">
                      Full control over your data with the ability to view, download, and delete your information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GDPR Compliant */}
            <Card className="bg-teal-800/40 border-teal-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 p-3 rounded-lg flex-shrink-0">
                    <FileText className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">GDPR Compliant</h3>
                    <p className="text-white/80 text-sm">
                      Compliance with GDPR, CCPA, and Nigerian data protection regulations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accessible Design */}
            <Card className="bg-teal-800/40 border-teal-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 p-3 rounded-lg flex-shrink-0">
                    <Globe className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Accessible Design</h3>
                    <p className="text-white/80 text-sm">
                      WCAG compliant platform accessible to users with disabilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-[#0F5257] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Start Your Journey Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of verified users finding their perfect accommodation
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-900 font-semibold px-8 py-6 text-lg"
            onClick={() => onNavigate("signup-selection")}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}