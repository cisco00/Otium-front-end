import { Home, User, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SignupSelectionProps {
  onSelectRenter: () => void;
  onSelectOwner: () => void;
  onBack: () => void;
}

export function SignupSelection({ onSelectRenter, onSelectOwner, onBack }: SignupSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl mb-4 bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent">
            Join Otium Today
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose how you'd like to use our platform. You can always explore properties without signing up.
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Renter Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-teal-400">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-teal-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Sign Up as a Renter</h2>
                <p className="text-gray-600">
                  Find and book verified properties across Nigeria
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-teal-600" />
                  </div>
                  <p className="text-sm text-gray-700">Browse thousands of verified properties</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-teal-600" />
                  </div>
                  <p className="text-sm text-gray-700">Secure booking and payment system</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-teal-600" />
                  </div>
                  <p className="text-sm text-gray-700">24/7 customer support</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-teal-600" />
                  </div>
                  <p className="text-sm text-gray-700">Review and rate properties</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-teal-600" />
                  </div>
                  <p className="text-sm text-gray-700">Manage bookings and extend stays</p>
                </div>
              </div>

              <Button 
                onClick={onSelectRenter}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white h-12 text-base"
              >
                Continue as Renter
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Property Owner Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-yellow-400">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-10 w-10 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Sign Up as a Property Owner</h2>
                <p className="text-gray-600">
                  List your property and start earning income
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-700">List unlimited properties</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-700">Advanced analytics and insights</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-700">Guest verification system</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-700">Emergency alert system</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-700">Flexible pricing and availability control</p>
                </div>
              </div>

              <Button 
                onClick={onSelectOwner}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 h-12 text-base"
              >
                Continue as Property Owner
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="px-8"
          >
            Back to Home
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={onBack}
              className="text-teal-600 hover:text-teal-700 font-semibold hover:underline"
            >
              Log In
            </button>
          </p>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500 mb-3">Trusted by thousands of users across Nigeria</p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Verified Properties</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
