import { Calendar, Clock, DollarSign, AlertCircle, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";

interface RequestExtensionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: number;
    bookingRef: string;
    property: {
      name: string;
      location: string;
      image: string;
      pricePerNight: number;
    };
    checkIn: string;
    checkOut: string;
    totalAmount: number;
  };
}

export function RequestExtensionDialog({ isOpen, onClose, booking }: RequestExtensionDialogProps) {
  const [newCheckOutDate, setNewCheckOutDate] = useState("");
  const [reason, setReason] = useState("");

  const calculateExtensionCost = () => {
    if (!newCheckOutDate) return 0;
    
    const originalCheckOut = new Date(booking.checkOut);
    const requestedCheckOut = new Date(newCheckOutDate);
    
    if (requestedCheckOut <= originalCheckOut) return 0;
    
    const daysDiff = Math.ceil((requestedCheckOut.getTime() - originalCheckOut.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff * booking.property.pricePerNight;
  };

  const getExtensionDays = () => {
    if (!newCheckOutDate) return 0;
    
    const originalCheckOut = new Date(booking.checkOut);
    const requestedCheckOut = new Date(newCheckOutDate);
    
    if (requestedCheckOut <= originalCheckOut) return 0;
    
    return Math.ceil((requestedCheckOut.getTime() - originalCheckOut.getTime()) / (1000 * 60 * 60 * 24));
  };

  const extensionCost = calculateExtensionCost();
  const extensionDays = getExtensionDays();
  const cleaningFee = extensionDays > 0 ? 10000 : 0;
  const serviceFee = extensionDays > 0 ? Math.round(extensionCost * 0.05) : 0;
  const totalExtensionCost = extensionCost + cleaningFee + serviceFee;

  const handleSubmitRequest = () => {
    if (!newCheckOutDate) {
      toast.error("Please select a new checkout date");
      return;
    }

    if (new Date(newCheckOutDate) <= new Date(booking.checkOut)) {
      toast.error("New checkout date must be after the original checkout date");
      return;
    }

    if (!reason.trim()) {
      toast.error("Please provide a reason for the extension request");
      return;
    }

    if (reason.trim().length < 20) {
      toast.error("Please provide a more detailed reason (at least 20 characters)");
      return;
    }

    // Submit extension request
    toast.success("Extension request submitted successfully! The property owner will review your request.");
    
    // Reset form
    setNewCheckOutDate("");
    setReason("");
    onClose();
  };

  // Get minimum date (day after original checkout)
  const getMinDate = () => {
    const checkoutDate = new Date(booking.checkOut);
    checkoutDate.setDate(checkoutDate.getDate() + 1);
    return checkoutDate.toISOString().split('T')[0];
  };

  // Get maximum date (30 days after original checkout)
  const getMaxDate = () => {
    const checkoutDate = new Date(booking.checkOut);
    checkoutDate.setDate(checkoutDate.getDate() + 30);
    return checkoutDate.toISOString().split('T')[0];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-teal-600" />
            Request Stay Extension
          </DialogTitle>
          <DialogDescription>
            Submit a request to extend your stay. The property owner will review and approve or decline your request.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Booking Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex gap-3">
              <img 
                src={booking.property.image} 
                alt={booking.property.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{booking.property.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{booking.property.location}</p>
                <Badge variant="secondary" className="text-xs">
                  {booking.bookingRef}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t">
              <div>
                <p className="text-xs text-gray-600 mb-1">Current Check-in</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">{new Date(booking.checkIn).toLocaleDateString()}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Current Check-out</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">{new Date(booking.checkOut).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* New Checkout Date */}
          <div>
            <Label htmlFor="newCheckOut" className="text-base mb-2 block">
              New Checkout Date <span className="text-red-600">*</span>
            </Label>
            <p className="text-sm text-gray-600 mb-2">
              Select when you'd like to check out (up to 30 days extension)
            </p>
            <Input
              id="newCheckOut"
              type="date"
              min={getMinDate()}
              max={getMaxDate()}
              value={newCheckOutDate}
              onChange={(e) => setNewCheckOutDate(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Extension Summary */}
          {extensionDays > 0 && (
            <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg">
              <h4 className="font-semibold text-teal-900 mb-3 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Extension Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Additional nights:</span>
                  <span className="font-semibold text-gray-900">{extensionDays} {extensionDays === 1 ? 'night' : 'nights'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Rate per night:</span>
                  <span className="font-semibold text-gray-900">₦{booking.property.pricePerNight.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Accommodation cost:</span>
                  <span className="font-semibold text-gray-900">₦{extensionCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Cleaning fee:</span>
                  <span className="font-semibold text-gray-900">₦{cleaningFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Service fee (5%):</span>
                  <span className="font-semibold text-gray-900">₦{serviceFee.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-teal-300 flex justify-between">
                  <span className="font-semibold text-teal-900">Total extension cost:</span>
                  <span className="font-bold text-lg text-teal-900">₦{totalExtensionCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Reason for Extension */}
          <div>
            <Label htmlFor="reason" className="text-base mb-2 block">
              Reason for Extension <span className="text-red-600">*</span>
            </Label>
            <p className="text-sm text-gray-600 mb-2">
              Please provide a detailed explanation for why you need to extend your stay
            </p>
            <Textarea
              id="reason"
              placeholder="Example: My business meetings have been extended by 3 days. I need to stay longer to complete my work commitments. The client has confirmed the new schedule..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {reason.length} / 20 minimum characters
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Important Information:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Extension requests must be approved by the property owner</li>
                  <li>Submit your request at least 48 hours before your checkout date</li>
                  <li>You will be notified once the owner reviews your request</li>
                  <li>Payment will only be processed after approval</li>
                  <li>Property availability is subject to the owner's calendar</li>
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
            onClick={handleSubmitRequest}
            className="bg-teal-600 hover:bg-teal-700 text-white"
            disabled={!newCheckOutDate || extensionDays <= 0}
          >
            <Clock className="h-4 w-4 mr-2" />
            Submit Extension Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
