import { useState, useEffect } from "react";
import { Mail, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface EmailVerificationProps {
  email: string;
  userType: "renter" | "owner";
  onVerified: () => void;
  onBack?: () => void;
}

export function EmailVerification({ email, userType, onVerified, onBack }: EmailVerificationProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isResending, setIsResending] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);

  // Mock verification code for demo (in real app, this would be sent via email)
  const mockCode = "123456";

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = () => {
    if (verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    // Mock verification (in real app, this would verify against backend)
    if (verificationCode === mockCode) {
      toast.success("Email verified successfully!");
      onVerified();
    } else {
      setAttemptsLeft((prev) => prev - 1);
      if (attemptsLeft - 1 <= 0) {
        toast.error("Too many failed attempts. Please request a new code.");
        setVerificationCode("");
      } else {
        toast.error(`Incorrect code. ${attemptsLeft - 1} attempts remaining.`);
        setVerificationCode("");
      }
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    
    // Simulate API call
    setTimeout(() => {
      setTimeLeft(300);
      setAttemptsLeft(3);
      setVerificationCode("");
      setIsResending(false);
      toast.success("Verification code resent to your email!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <p className="text-gray-600 mt-2">
            We've sent a 6-digit verification code to
          </p>
          <p className="font-semibold text-teal-700">{email}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Verification Code Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter Verification Code
            </label>
            <Input
              type="text"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="text-center text-2xl tracking-widest"
              disabled={timeLeft <= 0 || attemptsLeft <= 0}
            />
          </div>

          {/* Timer and Attempts */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {timeLeft > 0 ? (
                <>
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-gray-600">
                    Code expires in: <span className="font-semibold text-orange-600">{formatTime(timeLeft)}</span>
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-600 font-semibold">Code expired</span>
                </>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Attempts remaining: <span className="font-semibold">{attemptsLeft}</span>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-700"
            disabled={verificationCode.length !== 6 || timeLeft <= 0 || attemptsLeft <= 0}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Verify Email
          </Button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={isResending || (timeLeft > 240 && attemptsLeft > 0)}
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resend Code
                </>
              )}
            </Button>
            {timeLeft > 240 && attemptsLeft > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                You can resend in {formatTime(timeLeft - 240)}
              </p>
            )}
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>For demo purposes:</strong> Use code <code className="bg-blue-100 px-2 py-1 rounded font-mono">{mockCode}</code>
            </p>
          </div>

          {/* Back Button */}
          {onBack && (
            <Button variant="ghost" onClick={onBack} className="w-full">
              Back to Registration
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
