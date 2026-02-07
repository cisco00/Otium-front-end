import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Check, Search, Shield, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface OnboardingTourProps {
  onComplete: () => void;
  userType: "traveler" | "owner";
}

export function OnboardingTour({ onComplete, userType }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const travelerSteps = [
    {
      icon: Search,
      title: "Welcome to StayConnect!",
      description: "Find verified properties across Nigeria with our easy-to-use search. Filter by location, price, amenities, and more to find your perfect stay.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Verified & Safe",
      description: "All properties and users are verified for your safety. We verify ID, address, and property details to ensure a secure booking experience.",
      color: "green"
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book instantly with real-time availability. Multiple payment options including Paystack, Flutterwave, and bank transfers are available.",
      color: "purple"
    },
    {
      icon: Users,
      title: "Find Roommates",
      description: "Looking to share accommodation? Browse verified users seeking roommates and connect directly through our platform.",
      color: "orange"
    }
  ];

  const ownerSteps = [
    {
      icon: Search,
      title: "Welcome Property Owner!",
      description: "List your properties and reach thousands of verified travelers. Manage bookings, track revenue, and grow your rental business.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Verified Guests",
      description: "All guests are verified before booking. Check their ID verification, reviews, and booking history before accepting reservations.",
      color: "green"
    },
    {
      icon: Calendar,
      title: "Manage Bookings",
      description: "Accept or decline booking requests, manage your calendar, set property rules, and communicate with guests all in one place.",
      color: "purple"
    },
    {
      icon: Users,
      title: "Track Performance",
      description: "Monitor occupancy rates, revenue, reviews, and get insights to optimize your listings and increase bookings.",
      color: "orange"
    }
  ];

  const steps = userType === "traveler" ? travelerSteps : ownerSteps;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600"
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={handleSkip}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardContent className="p-8 sm:p-12">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                Skip tour
              </Button>
            </div>
            <Progress value={progress} />
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${colorClasses[currentStepData.color]}`}>
              <IconComponent className="h-10 w-10" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-4">{currentStepData.title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? "w-8 bg-blue-600" 
                    : index < currentStep 
                    ? "w-2 bg-blue-600" 
                    : "w-2 bg-gray-300"
                }`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Quick Tips */}
          {currentStep === steps.length - 1 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900 text-center">
                💡 <strong>Pro Tip:</strong> Complete your profile verification to unlock instant booking and build trust with the community!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
