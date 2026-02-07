import { Search, Book, MessageCircle, Phone, FileText, ChevronRight, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface OwnerHelpCenterProps {
    onNavigate: (view: string) => void;
}

export function OwnerHelpCenter({ onNavigate }: OwnerHelpCenterProps) {
    const categories = [
        {
            icon: Book,
            title: "Getting Started",
            description: "Guides for new hosts on setting up listings.",
            color: "bg-teal-100"
        },
        {
            icon: FileText,
            title: "Policies & Rules",
            description: "Understanding cancellation and house rules.",
            color: "bg-blue-100"
        },
        {
            icon: MessageCircle,
            title: "Guest Communication",
            description: "Tips for messaging and handling inquiries.",
            color: "bg-purple-100"
        },
        {
            icon: HelpCircle,
            title: "Troubleshooting",
            description: "Common issues and how to resolve them.",
            color: "bg-orange-100"
        },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="Search for articles, guides, and more..."
                        className="pl-10 h-12 text-lg shadow-sm"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {categories.map((category, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-none shadow-sm bg-gray-50/50" onClick={() => toast.info(`Browsing ${category.title}...`)}>
                        <CardHeader className="text-center pb-2">
                            <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${category.color}`}>
                                <category.icon className="h-6 w-6 text-gray-700" />
                            </div>
                            <CardTitle className="text-lg">{category.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <CardDescription>{category.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How do I edit my property listing?</AccordionTrigger>
                            <AccordionContent>
                                Go to the "My Properties" tab, find the listing you want to edit, and click the "Edit" button. You can update availability, pricing, photos, and house rules.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>When do I get paid?</AccordionTrigger>
                            <AccordionContent>
                                Payouts are released 24 hours after the guest checks in. Depending on your bank or payout method, it may take 3-5 business days to appear in your account.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How do I improve my search ranking?</AccordionTrigger>
                            <AccordionContent>
                                To improve your ranking, ensure your calendar is up to date, respond quickly to inquiries, maintain high ratings, and offer competitive pricing. Instant Book can also boost visibility.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>What is the Host Guarantee?</AccordionTrigger>
                            <AccordionContent>
                                The Host Guarantee provides protection for up to $1M in damages to your covered property in the rare event of guest damage that isn't covered by the security deposit.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Popular Articles</h2>
                    <div className="space-y-3">
                        <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between group" onClick={(e) => { e.preventDefault(); toast.info("Opening article..."); }}>
                            <span className="font-medium text-gray-700 group-hover:text-teal-700">Guide to taking great property photos</span>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600" />
                        </a>
                        <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between group" onClick={(e) => { e.preventDefault(); toast.info("Opening article..."); }}>
                            <span className="font-medium text-gray-700 group-hover:text-teal-700">Optimizing your listing description</span>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600" />
                        </a>
                        <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between group" onClick={(e) => { e.preventDefault(); toast.info("Opening article..."); }}>
                            <span className="font-medium text-gray-700 group-hover:text-teal-700">Setting custom pricing for weekends</span>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600" />
                        </a>
                    </div>

                    <Card className="bg-gray-50 border-gray-200 mt-6">
                        <CardHeader>
                            <CardTitle>Still need help?</CardTitle>
                            <CardDescription>Our support team is available 24/7.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full justify-start" onClick={() => toast.success("Chat connected!")}>
                                <MessageCircle className="mr-2 h-4 w-4" /> Chat with Support
                            </Button>
                            <Button variant="outline" className="w-full justify-start bg-white" onClick={() => toast.success("Calling support...")}>
                                <Phone className="mr-2 h-4 w-4" /> Call Us
                            </Button>
                            <Button variant="outline" className="w-full justify-start bg-white" onClick={() => toast.success("Ticket form opened")}>
                                <HelpCircle className="mr-2 h-4 w-4" /> Submit a Ticket
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
