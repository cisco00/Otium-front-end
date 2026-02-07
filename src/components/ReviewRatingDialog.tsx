import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

interface ReviewRatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  userType: "renter" | "owner";
  onReviewSubmitted?: () => void;
}

export function ReviewRatingDialog({ isOpen, onClose, booking, userType, onReviewSubmitted }: ReviewRatingDialogProps) {
  const [propertyRating, setPropertyRating] = useState(0);
  const [hostRating, setHostRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [accuracyRating, setAccuracyRating] = useState(0);

  // For owners reviewing renters
  const [renterRating, setRenterRating] = useState(0);
  const [respectRating, setRespectRating] = useState(0);
  const [cleanlinessRenterRating, setCleanlinessRenterRating] = useState(0);
  const [rulesComplianceRating, setRulesComplianceRating] = useState(0);

  const handleSubmitReview = () => {
    if (userType === "renter") {
      if (propertyRating === 0 || hostRating === 0) {
        toast.error("Please provide ratings for property and host");
        return;
      }
      if (!reviewText.trim()) {
        toast.error("Please write a review");
        return;
      }
      toast.success(`Thank you for reviewing ${booking?.property || 'the property'}! Your feedback helps the community.`);
    } else {
      if (renterRating === 0) {
        toast.error("Please provide a rating for the renter");
        return;
      }
      if (!reviewText.trim()) {
        toast.error("Please write a review");
        return;
      }
      toast.success(`Thank you for reviewing the renter! Your feedback has been submitted.`);
    }
    
    // Reset form
    setPropertyRating(0);
    setHostRating(0);
    setRenterRating(0);
    setReviewText("");
    setCleanlinessRating(0);
    setCommunicationRating(0);
    setAccuracyRating(0);
    setRespectRating(0);
    setCleanlinessRenterRating(0);
    setRulesComplianceRating(0);
    onClose();
    if (onReviewSubmitted) {
      onReviewSubmitted();
    }
  };

  const StarRating = ({ rating, setRating, label }: { rating: number; setRating: (r: number) => void; label: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none transition-all"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              } hover:scale-110`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 ? `${rating}/5` : "Not rated"}
        </span>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            {userType === "renter" ? "Leave a Review" : "Review Renter"}
          </DialogTitle>
          <DialogDescription>
            {userType === "renter" 
              ? `Share your experience at: ${booking?.property}`
              : `Rate your renter's stay at: ${booking?.property}`
            }
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {userType === "renter" ? (
            <>
              {/* Renter reviewing property and host */}
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <h4 className="font-semibold text-sm text-teal-900 mb-3">Overall Ratings</h4>
                <div className="space-y-4">
                  <StarRating rating={propertyRating} setRating={setPropertyRating} label="Property Rating" />
                  <StarRating rating={hostRating} setRating={setHostRating} label="Host Rating" />
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Detailed Ratings</h4>
                <div className="space-y-4">
                  <StarRating rating={cleanlinessRating} setRating={setCleanlinessRating} label="Cleanliness" />
                  <StarRating rating={communicationRating} setRating={setCommunicationRating} label="Communication" />
                  <StarRating rating={accuracyRating} setRating={setAccuracyRating} label="Accuracy (matches listing)" />
                </div>
              </div>

              <div>
                <Label htmlFor="reviewText">Your Review</Label>
                <Textarea
                  id="reviewText"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share details of your experience... What did you like? What could be improved?"
                  rows={6}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your review will be public and help other renters make informed decisions.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Owner reviewing renter */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-sm text-blue-900 mb-3">Overall Renter Rating</h4>
                <StarRating rating={renterRating} setRating={setRenterRating} label="Overall Experience" />
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Detailed Ratings</h4>
                <div className="space-y-4">
                  <StarRating rating={cleanlinessRenterRating} setRating={setCleanlinessRenterRating} label="Cleanliness (Property Condition)" />
                  <StarRating rating={communicationRating} setRating={setCommunicationRating} label="Communication" />
                  <StarRating rating={respectRating} setRating={setRespectRating} label="Respect for Property" />
                  <StarRating rating={rulesComplianceRating} setRating={setRulesComplianceRating} label="Rules Compliance" />
                </div>
              </div>

              <div>
                <Label htmlFor="reviewText">Your Feedback</Label>
                <Textarea
                  id="reviewText"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this renter... Were they respectful? Did they follow property rules?"
                  rows={6}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your review will help other property owners make informed decisions.
                </p>
              </div>
            </>
          )}

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-900">
              <strong>Review Guidelines:</strong> Please be honest and constructive. Reviews cannot be edited once submitted.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={handleSubmitReview}
          >
            <Star className="h-4 w-4 mr-1" />
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}