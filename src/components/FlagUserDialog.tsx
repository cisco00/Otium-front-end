import { AlertTriangle, Flag, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";

interface FlagUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail?: string;
  userAvatar?: string;
  userType: "renter" | "host";
  propertyName?: string;
  bookingRef?: string;
}

export function FlagUserDialog({ 
  isOpen, 
  onClose, 
  userName, 
  userEmail, 
  userAvatar, 
  userType,
  propertyName,
  bookingRef
}: FlagUserDialogProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isSevere, setIsSevere] = useState(false);

  const renterReasons = [
    "Property damage",
    "Noise complaints from neighbors",
    "Violated house rules",
    "Unauthorized guests",
    "Late checkout without permission",
    "Smoking in non-smoking property",
    "Pets without permission",
    "Disrespectful behavior",
    "Left property in poor condition",
    "Failed to pay additional fees",
    "Fraudulent payment attempt",
    "Safety concerns"
  ];

  const hostReasons = [
    "Property not as described",
    "False or misleading listing",
    "Unclean or unsafe property",
    "Missing advertised amenities",
    "Harassment or inappropriate behavior",
    "Refused entry after payment",
    "Unlawful eviction attempt",
    "Hidden fees not disclosed",
    "Privacy violations (cameras, etc.)",
    "Failed to address maintenance issues",
    "Discrimination",
    "Safety hazards in property"
  ];

  const reasons = userType === "renter" ? renterReasons : hostReasons;

  const toggleReason = (reason: string) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const handleSubmitFlag = () => {
    if (selectedReasons.length === 0) {
      toast.error("Please select at least one reason for flagging");
      return;
    }

    // Submit flag to admin
    toast.success(`Flag submitted successfully. Admin will review this case.`);
    
    // Reset form
    setSelectedReasons([]);
    setAdditionalDetails("");
    setIsSevere(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-600" />
            Flag {userType === "renter" ? "Renter" : "Host"}
          </DialogTitle>
          <DialogDescription>
            Report inappropriate behavior or policy violations. This report will be reviewed by our admin team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* User Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{userName}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {userType === "renter" ? "Renter" : "Property Owner"}
                  </Badge>
                </div>
                {userEmail && <p className="text-sm text-gray-600">{userEmail}</p>}
                {propertyName && (
                  <p className="text-sm text-gray-600 mt-1">
                    Property: <span className="font-medium">{propertyName}</span>
                  </p>
                )}
                {bookingRef && (
                  <p className="text-sm text-gray-600">
                    Booking: <span className="font-medium">{bookingRef}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Severity Toggle */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="severe"
                  checked={isSevere}
                  onChange={(e) => setIsSevere(e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="severe" className="flex items-center gap-2 font-semibold text-red-900 cursor-pointer">
                  <AlertTriangle className="h-4 w-4" />
                  This is a severe violation
                </label>
                <p className="text-sm text-red-800 mt-1">
                  Check this if the violation involves safety concerns, illegal activities, or requires immediate admin attention.
                </p>
              </div>
            </div>
          </div>

          {/* Reason Selection */}
          <div>
            <Label className="text-base mb-3 block">
              Reason for flagging <span className="text-red-600">*</span>
            </Label>
            <p className="text-sm text-gray-600 mb-3">Select all that apply:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto p-1">
              {reasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => toggleReason(reason)}
                  className={`text-left p-3 border rounded-lg transition-all text-sm ${
                    selectedReasons.includes(reason)
                      ? "border-red-500 bg-red-50 text-red-900 font-medium"
                      : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                      selectedReasons.includes(reason)
                        ? "border-red-500 bg-red-500"
                        : "border-gray-300"
                    }`}>
                      {selectedReasons.includes(reason) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1">{reason}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <Label htmlFor="details" className="text-base mb-2 block">
              Additional Details
            </Label>
            <p className="text-sm text-gray-600 mb-2">
              Please provide specific details about the incident, including dates, times, and any evidence you have.
            </p>
            <Textarea
              id="details"
              placeholder={`Example: On January 25th at 2:00 PM, ${userType === "renter" ? "the guest" : "the host"} ...`}
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Important:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>False reports may result in account suspension</li>
                  <li>Admin will investigate all claims thoroughly</li>
                  <li>You may be contacted for additional information</li>
                  <li>Severe violations may result in immediate account termination</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitFlag}
            className={`${
              isSevere 
                ? "bg-red-600 hover:bg-red-700" 
                : "bg-yellow-600 hover:bg-yellow-700"
            } text-white`}
          >
            <Flag className="h-4 w-4 mr-2" />
            Submit Flag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
