import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown, 
  ChevronRight,
  Home,
  CreditCard,
  Shield,
  Calendar,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  Book,
  Lock,
  DollarSign,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface HelpCenterProps {
  onNavigate: (view: string) => void;
  userType?: "traveler" | "owner" | "admin";
}

export function HelpCenter({ onNavigate, userType = "traveler" }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const quickHelpCards = [
    {
      icon: Home,
      title: "How to Book a Property",
      description: "Learn the step-by-step process to reserve your perfect rental",
      category: "Booking",
      color: "teal"
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      description: "Understand accepted payment options and security",
      category: "Payments",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Verification Process",
      description: "Complete your identity verification for secure bookings",
      category: "Security",
      color: "purple"
    },
    {
      icon: Calendar,
      title: "Cancellation Policy",
      description: "Learn about cancellation terms and refund eligibility",
      category: "Policies",
      color: "yellow"
    }
  ];

  const travelerFaqs = [
    {
      question: "How do I book a property on Otium?",
      answer: "To book a property: 1) Browse available properties using our search feature, 2) Select your desired property and check availability, 3) Click 'Reserve Now' and choose your dates, 4) Complete the verification process if required, 5) Review booking details and select payment method, 6) Confirm your booking. You'll receive a confirmation email with all booking details."
    },
    {
      question: "What payment methods are accepted?",
      answer: "Otium accepts multiple payment methods including Paystack, Flutterwave, and direct bank transfers. All payments are securely processed and encrypted. You can save your preferred payment method in your account settings for faster checkouts."
    },
    {
      question: "How does the verification process work?",
      answer: "For your security and that of property owners, we require identity verification. Upload a valid government-issued ID (passport, driver's license, or national ID card) and a recent photo. The verification typically takes 24-48 hours. Once verified, you'll have a verified badge on your profile."
    },
    {
      question: "What is the cancellation policy?",
      answer: "Cancellation policies vary by property. Standard policy: Cancel 48+ hours before check-in for full refund (minus service fee), 24-48 hours for 50% refund, less than 24 hours no refund. Always check the specific property's cancellation terms before booking."
    },
    {
      question: "How do I checkout from a property?",
      answer: "When your stay ends: 1) Complete a review of the property and owner (mandatory), 2) Click 'Checkout' button in your dashboard, 3) Confirm you've vacated the property, 4) The property owner will verify the property condition, 5) Once approved, checkout is complete. Late checkouts incur penalties at the nightly rate."
    },
    {
      question: "Can I request visitors during my stay?",
      answer: "Yes! Go to your dashboard and click 'Request Visitor Access'. Provide the visitor's name, purpose, date, and time. The property owner will review and approve/decline the request. All visitors must be approved before arrival."
    },
    {
      question: "What if I need to extend my stay?",
      answer: "If you wish to extend your booking, go to your active booking and click 'Request Extension'. Specify the additional nights needed. The property owner will review availability and pricing, then approve or decline your request."
    },
    {
      question: "How does the review system work?",
      answer: "After checkout, you'll be prompted to review both the property and the owner. Rate cleanliness, accuracy, communication, and overall experience. Reviews are posted after both parties submit their reviews or after 14 days. Honest reviews help maintain quality standards."
    }
  ];

  const ownerFaqs = [
    {
      question: "How do I list my property on Otium?",
      answer: "To list your property: 1) Click 'Add Property' in your dashboard, 2) Upload high-quality photos of your property, 3) Provide detailed description and amenities, 4) Set your pricing and availability, 5) Define house rules and requirements, 6) Submit for review. Our team will verify your listing within 24-48 hours."
    },
    {
      question: "How do I handle checkout requests?",
      answer: "When a renter initiates checkout: 1) You'll receive a notification in your dashboard, 2) Review the checkout request details, 3) Verify the property condition (checklist provided), 4) If satisfactory, approve the checkout and rate the renter, 5) If issues exist, document with photos and contact support. You must respond within 24 hours."
    },
    {
      question: "What happens with late checkouts?",
      answer: "If a renter overstays beyond the agreed checkout date, penalties are automatically calculated at your nightly rate per extra day. The system tracks this and adds charges to the renter's account. You can approve or reject late checkout requests."
    },
    {
      question: "How do I approve visitor requests?",
      answer: "Visitor requests appear in your dashboard under 'Guest Verification'. Review the visitor details including name, purpose, and scheduled time. Approve or decline based on your property rules. Approved visitors receive access notifications."
    },
    {
      question: "When and how do I receive payments?",
      answer: "Payments are processed when a booking is confirmed. Funds are held securely and released to your account 24 hours after the renter's check-in, minus our service fee (typically 10-15%). You can track all earnings in the Analytics section of your dashboard."
    },
    {
      question: "How do I manage booking requests?",
      answer: "All booking requests appear in your dashboard. Review the renter's profile, verification status, and booking details. Accept or decline within 24 hours. Prompt responses improve your listing visibility and reputation."
    },
    {
      question: "Can I block dates for personal use?",
      answer: "Yes! In your property settings, you can block specific dates. Go to 'My Properties', select the property, and use the calendar to mark dates as unavailable. This prevents bookings during your blocked periods."
    },
    {
      question: "What should I do about property damage?",
      answer: "If damage occurs: 1) Document with photos immediately, 2) Do not approve checkout, 3) Contact support within 24 hours, 4) Submit a damage claim with evidence, 5) Our team will review and mediate. Renters' security deposits can cover approved damage claims."
    }
  ];

  const policyTopics = [
    {
      title: "Data Protection & Privacy",
      icon: Lock,
      content: "Otium complies with GDPR, CCPA, and Nigerian Data Protection Regulation. We collect only necessary information for service delivery. Your data is encrypted and never sold to third parties. You can request data deletion at any time through your account settings."
    },
    {
      title: "Payment & Refunds",
      icon: DollarSign,
      content: "All payments are processed securely through encrypted channels. Refunds follow the cancellation policy of each property. Standard processing time is 5-10 business days. Service fees are non-refundable except in cases of host cancellation."
    },
    {
      title: "User Roles & Restrictions",
      icon: Users,
      content: "When you register as a renter or property owner, your role is permanent and cannot be changed. This ensures platform integrity and trust. Each role has specific features and responsibilities designed for optimal user experience."
    },
    {
      title: "Booking Terms & Conditions",
      icon: FileText,
      content: "By booking through Otium, you agree to: arrive/depart on scheduled dates, maintain property condition, follow house rules, complete verification if required, pay all fees including late penalties, and provide honest reviews. Property owners must provide accurate listings and maintain property standards."
    },
    {
      title: "Dispute Resolution",
      icon: AlertCircle,
      content: "In case of disputes, contact our support team immediately. We provide mediation services for issues including: property discrepancies, damages, cancellations, payment disputes, and security concerns. Most cases are resolved within 48-72 hours."
    },
    {
      title: "Security & Verification",
      icon: Shield,
      content: "Verification protects all users. We verify identity documents, phone numbers, and email addresses. Verified users get priority in bookings and increased trust scores. All verification data is securely stored and complies with international privacy standards."
    }
  ];

  const filteredTravelerFaqs = travelerFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOwnerFaqs = ownerFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How can we help you?
          </h1>
          <p className="text-lg mb-8 text-teal-50">
            Find answers to your questions and get support when you need it
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help articles, FAQs, policies..."
              className="w-full pl-12 pr-4 py-6 text-lg rounded-xl border-0 shadow-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickHelpCards.map((card, index) => {
            const Icon = card.icon;
            const colorClasses = {
              teal: "bg-teal-100 text-teal-600",
              blue: "bg-blue-100 text-blue-600",
              purple: "bg-purple-100 text-purple-600",
              yellow: "bg-yellow-100 text-yellow-600"
            };
            
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`${colorClasses[card.color as keyof typeof colorClasses]} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{card.description}</p>
                  <Badge variant="outline" className="text-xs">{card.category}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="faqs" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-12">
            <TabsTrigger value="faqs" className="text-sm">
              <Book className="h-4 w-4 mr-2" />
              FAQs
            </TabsTrigger>
            <TabsTrigger value="policies" className="text-sm">
              <FileText className="h-4 w-4 mr-2" />
              Policies
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact
            </TabsTrigger>
          </TabsList>

          {/* FAQs Tab */}
          <TabsContent value="faqs">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                <p className="text-gray-600 mt-2">
                  Find quick answers to common questions about using Otium
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={userType === "owner" ? "owners" : "travelers"}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="travelers">For Travelers</TabsTrigger>
                    <TabsTrigger value="owners">For Property Owners</TabsTrigger>
                  </TabsList>

                  <TabsContent value="travelers">
                    <Accordion type="single" collapsible className="space-y-4">
                      {(searchQuery ? filteredTravelerFaqs : travelerFaqs).map((faq, index) => (
                        <AccordionItem key={index} value={`traveler-${index}`} className="border rounded-lg px-4">
                          <AccordionTrigger className="text-left hover:no-underline py-4">
                            <div className="flex items-start gap-3">
                              <HelpCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                              <span className="font-semibold">{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 pb-4 pl-8">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    {searchQuery && filteredTravelerFaqs.length === 0 && (
                      <div className="text-center py-12">
                        <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No results found for "{searchQuery}"</p>
                        <Button variant="link" onClick={() => setSearchQuery("")}>
                          Clear search
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="owners">
                    <Accordion type="single" collapsible className="space-y-4">
                      {(searchQuery ? filteredOwnerFaqs : ownerFaqs).map((faq, index) => (
                        <AccordionItem key={index} value={`owner-${index}`} className="border rounded-lg px-4">
                          <AccordionTrigger className="text-left hover:no-underline py-4">
                            <div className="flex items-start gap-3">
                              <HelpCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                              <span className="font-semibold">{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 pb-4 pl-8">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    {searchQuery && filteredOwnerFaqs.length === 0 && (
                      <div className="text-center py-12">
                        <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No results found for "{searchQuery}"</p>
                        <Button variant="link" onClick={() => setSearchQuery("")}>
                          Clear search
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Policies & Guidelines</CardTitle>
                <p className="text-gray-600 mt-2">
                  Understanding our terms, privacy, and platform policies
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {policyTopics.map((policy, index) => {
                    const Icon = policy.icon;
                    return (
                      <Card key={index} className="border-2">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="bg-teal-100 p-2 rounded-lg">
                              <Icon className="h-5 w-5 text-teal-600" />
                            </div>
                            <CardTitle className="text-lg">{policy.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {policy.content}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-teal-900 mb-2">Important Notice</h3>
                      <p className="text-sm text-teal-800 leading-relaxed">
                        Otium is committed to providing a safe, secure, and transparent platform. 
                        We comply with GDPR, CCPA, and Nigerian Data Protection Regulation. 
                        All users must adhere to our terms of service. Violations may result in 
                        account suspension or termination. For detailed legal terms, please contact our legal team.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contact Cards */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get instant help from our support team
                  </p>
                  <Badge className="bg-green-600 text-white mb-4">Online Now</Badge>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Start Chat
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">
                    Average response time: 2 minutes
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Send us a detailed message
                  </p>
                  <p className="text-teal-600 font-semibold mb-4">
                    support@otium.com
                  </p>
                  <Button variant="outline" className="w-full">
                    Send Email
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">
                    Response within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Speak directly with our team
                  </p>
                  <p className="text-purple-600 font-semibold mb-4">
                    +234 800 OTIUM-HELP
                  </p>
                  <Button variant="outline" className="w-full">
                    Call Now
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">
                    Mon-Sat, 8am - 8pm WAT
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Submit Ticket Form */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <p className="text-gray-600 mt-2">
                  Describe your issue and we'll get back to you shortly
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Subject</label>
                    <Input placeholder="Brief description of your issue" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Category</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option>Booking Issue</option>
                      <option>Payment Problem</option>
                      <option>Verification Help</option>
                      <option>Property Listing</option>
                      <option>Account Settings</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Message</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[120px]"
                      placeholder="Provide detailed information about your issue..."
                    />
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Submit Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <Card className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Still need help?
                </h3>
                <p className="text-gray-700">
                  Our dedicated support team is here to assist you 24/7. 
                  Don't hesitate to reach out - we're here to help make your Otium experience exceptional.
                </p>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
