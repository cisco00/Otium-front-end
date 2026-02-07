import { Search, Send, MoreVertical, Phone, Video, Image, Paperclip, Smile } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OwnerMessagesProps {
    onNavigate: (view: string) => void;
}

export function OwnerMessages({ onNavigate }: OwnerMessagesProps) {
    const [message, setMessage] = useState("");
    const conversations = [
        {
            id: 1,
            name: "Sarah Williams",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
            lastMessage: "Hi, is there a blender in the kitchen?",
            time: "10:30 AM",
            unread: 2,
            status: "online",
            property: "Luxury Villa in Abuja"
        },
        {
            id: 2,
            name: "Michael Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            lastMessage: "Thanks for the great stay! We loved it.",
            time: "Yesterday",
            unread: 0,
            status: "offline",
            property: "Modern Apartment in Lagos"
        },
        {
            id: 3,
            name: "Amara Okeke",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            lastMessage: "Can we extend our stay by one more night?",
            time: "2 days ago",
            unread: 1,
            status: "online",
            property: "Seaside Retreat"
        }
    ];

    const handleSendMessage = () => {
        if (!message.trim()) {
            toast.error("Please type a message first");
            return;
        }
        toast.success("Message sent! (Simulated)");
        setMessage("");
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] flex flex-col">
            <h1 className="text-3xl font-bold mb-6">Messages</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder="Search messages..." className="pl-10" />
                        </div>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="divide-y divide-gray-100">
                            {conversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${conv.id === 1 ? 'bg-teal-50/50' : ''}`}
                                    onClick={() => toast.info(`Switched chat to ${conv.name}`)}
                                >
                                    <div className="flex gap-3">
                                        <div className="relative">
                                            <Avatar>
                                                <AvatarImage src={conv.avatar} />
                                                <AvatarFallback>{conv.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            {conv.status === 'online' && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-semibold text-sm truncate">{conv.name}</span>
                                                <span className="text-xs text-gray-500 whitespace-nowrap">{conv.time}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <p className="text-xs text-teal-600 truncate max-w-[120px]">{conv.property}</p>
                                                {conv.unread > 0 && (
                                                    <Badge className="bg-teal-600 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                                                        {conv.unread}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col hidden md:flex">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" />
                                <AvatarFallback>SW</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">Sarah Williams</h3>
                                <p className="text-xs text-gray-500">Luxury Villa in Abuja · Oct 12 - 18</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => toast.success("Calling guest...")}>
                                <Phone className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => toast.success("Starting video call...")}>
                                <Video className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => toast.info("More options clicked")}>
                                <MoreVertical className="h-4 w-4 text-gray-500" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages List */}
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">Oct 14, 10:23 AM</span>
                            </div>

                            <div className="flex gap-3">
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" />
                                    <AvatarFallback>SW</AvatarFallback>
                                </Avatar>
                                <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                                    <p className="text-sm">Hi Aisha! We've just arrived and the place looks amazing. Quick question though - is there a blender in the kitchen? We were hoping to make some smoothies.</p>
                                </div>
                            </div>

                            <div className="flex gap-3 flex-row-reverse">
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" />
                                    <AvatarFallback>AM</AvatarFallback>
                                </Avatar>
                                <div className="bg-teal-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%]">
                                    <p className="text-sm">Hello Sarah! Welcome, I'm so glad you like the villa. Yes, there is a blender in the bottom cupboard to the right of the sink. Let me know if you can't find it!</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" />
                                    <AvatarFallback>SW</AvatarFallback>
                                </Avatar>
                                <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                                    <p className="text-sm">Found it! Thanks for the quick reply.</p>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="shrink-0" onClick={() => toast.info("Attachments coming soon")}>
                                <Paperclip className="h-5 w-5 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="icon" className="shrink-0" onClick={() => toast.info("Image upload coming soon")}>
                                <Image className="h-5 w-5 text-gray-500" />
                            </Button>
                            <Input
                                placeholder="Type a message..."
                                className="flex-1"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSendMessage();
                                }}
                            />
                            <Button variant="ghost" size="icon" className="shrink-0" onClick={() => toast.info("Emoji picker coming soon")}>
                                <Smile className="h-5 w-5 text-gray-500" />
                            </Button>
                            <Button
                                className="bg-teal-600 hover:bg-teal-700 text-white shrink-0"
                                onClick={handleSendMessage}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
