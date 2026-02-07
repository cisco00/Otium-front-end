import { useState } from "react";
import { CreditCard, Plus, Trash2, Shield, Check, Building2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethodsProps {
  onNavigate: (view: string) => void;
}

export function PaymentMethods({ onNavigate }: PaymentMethodsProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [paymentType, setPaymentType] = useState("card");

  // Mock payment methods data
  const paymentMethods = [
    {
      id: "1",
      type: "card",
      cardType: "Visa",
      lastFour: "4242",
      expiryMonth: "12",
      expiryYear: "2025",
      holderName: "Jane Doe",
      isDefault: true
    },
    {
      id: "2",
      type: "card",
      cardType: "Mastercard",
      lastFour: "8888",
      expiryMonth: "09",
      expiryYear: "2026",
      holderName: "Jane Doe",
      isDefault: false
    }
  ];

  const bankAccounts = [
    {
      id: "3",
      type: "bank",
      bankName: "Access Bank",
      accountNumber: "0123456789",
      accountName: "Jane Doe",
      isDefault: false
    }
  ];

  const handleAddPaymentMethod = () => {
    // In a real app, this would process payment method addition
    alert(`Adding ${paymentType} payment method...`);
    setShowAddDialog(false);
  };

  const handleRemovePayment = (id: string, type: string) => {
    if (confirm(`Are you sure you want to remove this ${type}?`)) {
      alert(`Payment method removed`);
    }
  };

  const handleSetDefault = (id: string) => {
    alert(`Payment method set as default`);
  };

  const getCardIcon = (cardType: string) => {
    // In a real app, you'd use actual card brand logos
    return <CreditCard className="h-8 w-8" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="h-8 w-8" />
                <h1 className="text-4xl font-bold">Payment Methods</h1>
              </div>
              <p className="text-teal-100">
                Manage your payment cards and bank accounts securely
              </p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Payment Type Selection */}
                  <div>
                    <Label>Payment Type</Label>
                    <RadioGroup value={paymentType} onValueChange={setPaymentType} className="mt-2">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-teal-600" />
                            <span className="font-medium">Credit/Debit Card</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-teal-600" />
                            <span className="font-medium">Bank Account</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="paystack" id="paystack" />
                        <Label htmlFor="paystack" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-teal-600" />
                            <span className="font-medium">Paystack</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="flutterwave" id="flutterwave" />
                        <Label htmlFor="flutterwave" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-teal-600" />
                            <span className="font-medium">Flutterwave</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Card Form */}
                  {paymentType === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" type="password" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="Jane Doe" />
                      </div>
                    </div>
                  )}

                  {/* Bank Account Form */}
                  {paymentType === "bank" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input id="bankName" placeholder="Select your bank" />
                      </div>
                      <div>
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" placeholder="0123456789" />
                      </div>
                      <div>
                        <Label htmlFor="accountName">Account Name</Label>
                        <Input id="accountName" placeholder="Jane Doe" />
                      </div>
                    </div>
                  )}

                  {/* Paystack Form */}
                  {paymentType === "paystack" && (
                    <div className="space-y-4">
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          You'll be redirected to Paystack to securely link your account.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Flutterwave Form */}
                  {paymentType === "flutterwave" && (
                    <div className="space-y-4">
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          You'll be redirected to Flutterwave to securely link your account.
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleAddPaymentMethod}
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                  >
                    Add Payment Method
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Security Notice */}
        <Card className="mb-6 bg-teal-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-teal-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure Payment Processing</h3>
                <p className="text-sm text-gray-700">
                  All payment information is encrypted and securely stored. We comply with PCI DSS standards and never store your CVV.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cards</h2>
          {paymentMethods.length === 0 ? (
            <Card className="p-8 text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-600">No cards added yet</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <Card key={method.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getCardIcon(method.cardType)}
                        <div>
                          <p className="font-semibold text-gray-900">{method.cardType}</p>
                          <p className="text-sm text-gray-600">•••• {method.lastFour}</p>
                        </div>
                      </div>
                      {method.isDefault && (
                        <Badge className="bg-green-500">
                          <Check className="h-3 w-3 mr-1" />
                          Default
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Cardholder:</span> {method.holderName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Expires:</span> {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {!method.isDefault && (
                        <Button
                          onClick={() => handleSetDefault(method.id)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button
                        onClick={() => handleRemovePayment(method.id, "card")}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 border-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Bank Accounts Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bank Accounts</h2>
          {bankAccounts.length === 0 ? (
            <Card className="p-8 text-center">
              <Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-600">No bank accounts added yet</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bankAccounts.map((account) => (
                <Card key={account.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-8 w-8 text-teal-600" />
                        <div>
                          <p className="font-semibold text-gray-900">{account.bankName}</p>
                          <p className="text-sm text-gray-600">{account.accountNumber}</p>
                        </div>
                      </div>
                      {account.isDefault && (
                        <Badge className="bg-green-500">
                          <Check className="h-3 w-3 mr-1" />
                          Default
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Account Name:</span> {account.accountName}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {!account.isDefault && (
                        <Button
                          onClick={() => handleSetDefault(account.id)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button
                        onClick={() => handleRemovePayment(account.id, "bank account")}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 border-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Payment Providers Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Supported Payment Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CreditCard className="h-8 w-8 text-teal-600" />
                <div>
                  <p className="font-semibold text-sm">Cards</p>
                  <p className="text-xs text-gray-600">Visa, Mastercard, Verve</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Wallet className="h-8 w-8 text-teal-600" />
                <div>
                  <p className="font-semibold text-sm">Paystack</p>
                  <p className="text-xs text-gray-600">Fast & Secure</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Wallet className="h-8 w-8 text-teal-600" />
                <div>
                  <p className="font-semibold text-sm">Flutterwave</p>
                  <p className="text-xs text-gray-600">Instant Processing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
