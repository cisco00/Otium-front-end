import { User, Mail, Phone, MapPin, Shield, Bell, Lock, LogOut, Edit } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OwnerProfileProps {
    onNavigate: (view: string) => void;
}

export function OwnerProfile({ onNavigate }: OwnerProfileProps) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6">Profile & Settings</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full lg:w-64 space-y-2">
                    <Button
                        variant="ghost"
                        className="w-full justify-start font-semibold bg-gray-100"
                        onClick={() => toast.info("Viewing Personal Info")}
                    >
                        <User className="h-4 w-4 mr-2" />
                        Personal Info
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-600 hover:text-gray-900"
                        onClick={() => toast.info("Security settings coming soon")}
                    >
                        <Shield className="h-4 w-4 mr-2" />
                        Login & Security
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-600 hover:text-gray-900"
                        onClick={() => toast.info("Notification settings coming soon")}
                    >
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-600 hover:text-gray-900"
                        onClick={() => toast.info("Privacy settings coming soon")}
                    >
                        <Lock className="h-4 w-4 mr-2" />
                        Privacy
                    </Button>
                    <div className="pt-4 mt-4 border-t">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                                toast.success("Logged out successfully");
                                onNavigate("login");
                            }}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Log Out
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 max-w-2xl">
                    <Card className="mb-6">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" />
                                        <AvatarFallback>AM</AvatarFallback>
                                    </Avatar>
                                    <Button
                                        size="sm"
                                        className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 border-2 border-white"
                                        onClick={() => toast.info("Upload photo feature coming soon")}
                                    >
                                        <Edit className="h-3 w-3" />
                                    </Button>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Aisha Mohammed</h2>
                                    <p className="text-gray-500">Superhost • Joined Jan 2024</p>
                                    <Button variant="link" className="p-0 h-auto text-teal-600" onClick={() => toast.info("View public profile preview")}>View Public Profile</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="Aisha" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Mohammed" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="flex gap-2">
                                    <Input id="email" defaultValue="aisha.mohammed@example.com" />
                                    <Button
                                        variant="outline"
                                        className="shrink-0 text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
                                        onClick={() => toast.success("Email verified!")}
                                    >
                                        Verified
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="flex gap-2">
                                    <Input id="phone" defaultValue="+234 801 234 5678" />
                                    <Button
                                        variant="outline"
                                        onClick={() => toast.info("Phone update flow coming soon")}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => toast.success("Profile changes saved!")}>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Manage how you receive updates and messages.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Email Notifications</Label>
                                    <p className="text-sm text-gray-500">Receive booking confirmations and updates via email.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">SMS Notifications</Label>
                                    <p className="text-sm text-gray-500">Receive urgent alerts and messages via SMS.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Marketing Communications</Label>
                                    <p className="text-sm text-gray-500">Receive tips, trends, and promotional offers.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
