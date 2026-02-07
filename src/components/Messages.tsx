import { useState } from "react";
import { MessageSquare, Send, Search, MoreVertical, Paperclip, Smile, Phone, Video, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessagesProps {
  onNavigate: (view: string) => void;
  userType: "traveler" | "owner" | "admin";
}

export function Messages({ onNavigate, userType }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [messageText, setMessageText] = useState("");

  // Mock conversations data
  const conversations = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: userType === "owner" ? "Guest" : "Property Owner",
      avatar: "",
      lastMessage: "Thank you! Looking forward to my stay.",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      property: "Luxury Beachfront Villa"
    },
    {
      id: "2",
      name: "Michael Chen",
      role: userType === "owner" ? "Guest" : "Property Owner",
      avatar: "",
      lastMessage: "Is the pool heated?",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      property: "Modern Downtown Apartment"
    },
    {
      id: "3",
      name: "Emma Williams",
      role: userType === "owner" ? "Guest" : "Property Owner",
      avatar: "",
      lastMessage: "Perfect! I'll book it right away.",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      property: "Cozy Garden Cottage"
    },
    {
      id: "4",
      name: "Otium Support",
      role: "Support Team",
      avatar: "",
      lastMessage: "How can we help you today?",
      timestamp: "Yesterday",
      unread: 0,
      online: true,
      property: "General Inquiry"
    }
  ];

  // Mock messages for selected conversation
  const messages = selectedConversation === "1" ? [
    {
      id: "1",
      sender: "other",
      text: "Hi! I'm interested in booking your property for next week.",
      timestamp: "10:30 AM"
    },
    {
      id: "2",
      sender: "me",
      text: "Hello Sarah! That's great. The property is available. Would you like to know more details?",
      timestamp: "10:32 AM"
    },
    {
      id: "3",
      sender: "other",
      text: "Yes, please! Does it have parking space? And is it pet-friendly?",
      timestamp: "10:35 AM"
    },
    {
      id: "4",
      sender: "me",
      text: "Yes, we have secure parking for 2 cars, and small pets are welcome with a small additional fee.",
      timestamp: "10:37 AM"
    },
    {
      id: "5",
      sender: "other",
      text: "Thank you! Looking forward to my stay.",
      timestamp: "10:40 AM"
    }
  ] : [];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message via API
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-7 w-7" />
            <h1 className="text-3xl font-bold">Messages</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-6 py-6 overflow-hidden">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Conversations List */}
          <Card className="col-span-12 lg:col-span-4 overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-4 border-b hover:bg-gray-50 transition-colors text-left ${
                    selectedConversation === conv.id ? "bg-teal-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conv.avatar} />
                        <AvatarFallback className="bg-teal-600 text-white">
                          {conv.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{conv.name}</h3>
                        <span className="text-xs text-gray-500">{conv.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{conv.role}</p>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-teal-600 mt-1">{conv.property}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-red-500 text-white ml-2">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="col-span-12 lg:col-span-8 overflow-hidden flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedConv.avatar} />
                        <AvatarFallback className="bg-teal-600 text-white">
                          {selectedConv.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedConv.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{selectedConv.role}</span>
                          {selectedConv.online && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-green-600">Online</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.sender === "me"
                            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white"
                            : "bg-white text-gray-900 shadow-sm"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === "me" ? "text-teal-100" : "text-gray-500"
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Conversation Selected</h3>
                  <p className="text-gray-600">Choose a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
