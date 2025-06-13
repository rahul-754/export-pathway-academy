import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Users,
  Send,
  BookOpen,
  Clock,
  Hash,
} from "lucide-react";
import UserHeader from "@/components/UserHeader";

const BatchesPage = () => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(1);

  const batches = [
    {
      id: 1,
      name: "Export Documentation Group A",
      course: "Export Documentation Essentials",
      members: 15,
      messages: 45,
      lastActivity: "2 hours ago",
      isActive: true,
    },
    {
      id: 2,
      name: "Trade Laws Discussion",
      course: "International Trade Laws",
      members: 12,
      messages: 28,
      lastActivity: "1 day ago",
      isActive: true,
    },
    {
      id: 3,
      name: "Marketing Strategies Batch",
      course: "Digital Marketing for Exporters",
      members: 8,
      messages: 19,
      lastActivity: "3 days ago",
      isActive: false,
    },
  ];

  const messages = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "SJ",
      message:
        "Hi everyone! I had a question about the commercial invoice template we discussed in session 2. Could someone help clarify the difference between FOB and CIF terms?",
      timestamp: "10:30 AM",
      isMe: false,
    },
    {
      id: 2,
      user: "Mike Chen",
      avatar: "MC",
      message:
        "Great question Sarah! FOB (Free on Board) means the seller's responsibility ends when the goods are loaded on the ship. CIF (Cost, Insurance, and Freight) includes the cost of goods, insurance, and freight to the destination port.",
      timestamp: "10:45 AM",
      isMe: false,
    },
    {
      id: 3,
      user: "You",
      avatar: "JD",
      message:
        "Thanks Mike! That's really helpful. I've been struggling with understanding when to use each term.",
      timestamp: "11:00 AM",
      isMe: true,
    },
    {
      id: 4,
      user: "Dr. Sarah Wilson",
      avatar: "SW",
      message:
        "Excellent discussion! I'm glad to see you're all engaging with the material. Remember, the choice between FOB and CIF often depends on who has better shipping rates and insurance options.",
      timestamp: "11:15 AM",
      isMe: false,
      isInstructor: true,
    },
    {
      id: 5,
      user: "Emma Rodriguez",
      avatar: "ER",
      message:
        "I've uploaded a helpful comparison chart in our shared resources. Check it out when you get a chance!",
      timestamp: "11:30 AM",
      isMe: false,
    },
  ];

  const members = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      status: "online",
      role: "student",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "MC",
      status: "online",
      role: "student",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "ER",
      status: "away",
      role: "student",
    },
    {
      id: 4,
      name: "Dr. Sarah Wilson",
      avatar: "SW",
      status: "online",
      role: "instructor",
    },
    {
      id: 5,
      name: "John Davis",
      avatar: "JD",
      status: "online",
      role: "student",
    },
    {
      id: 6,
      name: "Lisa Wang",
      avatar: "LW",
      status: "offline",
      role: "student",
    },
  ];

  const currentBatch = batches.find((b) => b.id === selectedBatch);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      //console.log('Sending message:', newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <UserHeader /> */}

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Discussion Batches
          </h2>
          <p className="text-gray-600">
            Connect and collaborate with your course mates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Batch List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">My Batches</h3>
            <div className="space-y-3">
              {batches.map((batch) => (
                <Card
                  key={batch.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBatch === batch.id
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => setSelectedBatch(batch.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm line-clamp-2">
                      {batch.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {batch.course}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {batch.members}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {batch.messages}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge
                        variant={batch.isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {batch.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {batch.lastActivity}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Hash className="h-5 w-5 mr-2" />
                      {currentBatch?.name}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {currentBatch?.course}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {currentBatch?.members} members
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[70%] ${
                        message.isMe ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <Avatar className="w-8 h-8 mx-2">
                        <AvatarImage src="" />
                        <AvatarFallback
                          className={`text-xs ${
                            message.isInstructor
                              ? "bg-purple-100 text-purple-700"
                              : message.isMe
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {message.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 ${
                          message.isMe
                            ? "bg-blue-600 text-white"
                            : message.isInstructor
                            ? "bg-purple-100 text-purple-900 border border-purple-200"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span
                            className={`text-xs font-medium ${
                              message.isMe ? "text-blue-100" : "text-gray-600"
                            }`}
                          >
                            {message.user}
                          </span>
                          {message.isInstructor && (
                            <Badge
                              variant="outline"
                              className="text-xs px-1 py-0"
                            >
                              Instructor
                            </Badge>
                          )}
                          <span
                            className={`text-xs ${
                              message.isMe ? "text-blue-200" : "text-gray-500"
                            }`}
                          >
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 min-h-[2.5rem] max-h-24 resize-none"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Members List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Members ({members.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="" />
                        <AvatarFallback
                          className={`text-xs ${
                            member.role === "instructor"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {member.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500 capitalize">
                          {member.status}
                        </p>
                        {member.role === "instructor" && (
                          <Badge
                            variant="outline"
                            className="text-xs px-1 py-0"
                          >
                            Instructor
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchesPage;
