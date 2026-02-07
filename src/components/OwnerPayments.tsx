
import { DollarSign, Download, ExternalLink, TrendingUp, CreditCard, Building, Calendar, ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OwnerPaymentsProps {
    onNavigate: (view: string) => void;
}

export function OwnerPayments({ onNavigate }: OwnerPaymentsProps) {
    const transactions = [
        {
            id: "TRX-12345",
            description: "Payout for Booking #8492 - Sarah Williams",
            date: "Oct 15, 2024",
            amount: "₦405,000",
            status: "completed",
            type: "payout"
        },
        {
            id: "TRX-12346",
            description: "Payout for Booking #8490 - Michael Chen",
            date: "Oct 12, 2024",
            amount: "₦162,000",
            status: "completed",
            type: "payout"
        },
        {
            id: "TRX-12347",
            description: "Service Fee Adjustment",
            date: "Oct 10, 2024",
            amount: "-₦5,000",
            status: "completed",
            type: "fee"
        },
        {
            id: "TRX-12348",
            description: "Payout for Booking #8488 - Amara Okeke",
            date: "Oct 08, 2024",
            amount: "₦288,000",
            status: "pending",
            type: "payout"
        }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Payments & Payouts</h1>
                    <p className="text-gray-600">Track your earnings, view transaction history and manage payouts.</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => toast.success("Exporting transaction history...")}
                    >
                        <Download className="h-4 w-4" />
                        <span>Export History</span>
                    </Button>
                    <Button
                        className="bg-black hover:bg-gray-800 text-white"
                        onClick={() => toast.info("Payout settings coming soon")}
                    >
                        Manage Payout Methods
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Available for Payout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">₦288,000</div>
                        <p className="text-xs text-gray-500 mt-1">Scheduled for Oct 22</p>
                        <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700" onClick={() => toast.success("Payout setup initiated")}>Setup Payout</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Pending Payouts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">₦0.00</div>
                        <p className="text-xs text-gray-500 mt-1">All caught up!</p>
                        <Button variant="outline" className="w-full mt-4" onClick={() => toast.info("Filtering pending payouts")}>View Pending</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Earnings (YTD)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">₦4,250,500</div>
                        <div className="flex items-center text-green-600 text-xs mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+12% from last year</span>
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-teal-600" onClick={() => toast.success("Downloading earnings report")}>View Report</Button>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="history" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="history">Transaction History</TabsTrigger>
                    <TabsTrigger value="methods">Payout Methods</TabsTrigger>
                </TabsList>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>All your payouts and adjustments in one place.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {transactions.map((trx) => (
                                    <div key={trx.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${trx.type === 'payout' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                {trx.type === 'payout' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{trx.description}</p>
                                                <p className="text-sm text-gray-500">{trx.date} • {trx.id}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold ${trx.amount.startsWith('-') ? 'text-gray-900' : 'text-green-600'}`}>{trx.amount}</p>
                                            <Badge variant={trx.status === 'completed' ? 'secondary' : 'outline'} className={trx.status === 'completed' ? 'bg-green-100 text-green-800' : 'text-yellow-600 border-yellow-200 bg-yellow-50'}>
                                                {trx.status}
                                            </Badge>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => toast.success(`Receipt for ${trx.id} downloaded`)}>
                                            <Download className="h-4 w-4 text-gray-400" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="methods">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payout Methods</CardTitle>
                            <CardDescription>Manage how you get paid.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg p-4 flex items-center gap-3 mb-4">
                                <div className="bg-gray-100 p-2 rounded">
                                    <CreditCard className="h-6 w-6 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">Zenith Bank</p>
                                    <p className="text-xs text-gray-500">**** 4582</p>
                                </div>
                                <Badge variant="secondary">Default</Badge>
                            </div>
                            <Button variant="outline" className="w-full" onClick={() => toast.info("Method management coming soon")}>Add Payout Method</Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100 mt-6">
                        <CardContent className="p-6">
                            <h4 className="font-semibold text-blue-900 mb-2">Need help with payments?</h4>
                            <p className="text-sm text-blue-700 mb-4">Check our help center guide on how payouts work and when to expect them.</p>
                            <Button variant="link" className="p-0 text-blue-800 font-semibold" onClick={() => onNavigate("owner-help-center")}>
                                Read Payment Guide &rarr;
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
