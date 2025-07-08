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
    <div className="min-h-screen bg-white">
      {/* <UserHeader /> */}
      <div className="container mx-auto px-2 py-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Discussion Batches
          </h2>
          <p className="text-gray-500 text-sm">
            Connect and collaborate with your course mates
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-8rem)]">
          {/* Batch List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-semibold text-gray-900 mb-2 text-base pl-1">
              My Batches
            </h3>
            <div className="space-y-2">
              {batches.map((batch) => (
                <Card
                  key={batch.id}
                  className={`cursor-pointer border transition-all hover:shadow-sm rounded-lg ${
                    selectedBatch === batch.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                  onClick={() => setSelectedBatch(batch.id)}
                >
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-semibold line-clamp-2">
                      {batch.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {batch.course}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {batch.members}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {batch.messages}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <Badge
                        variant={batch.isActive ? "default" : "secondary"}
                        className="text-xs px-2 py-0.5"
                      >
                        {batch.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {batch.lastActivity}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            <Card className="h-full flex flex-col border rounded-lg">
              <CardHeader className="border-b bg-gray-50 rounded-t-lg px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center text-base font-semibold">
                      <Hash className="h-5 w-5 mr-2 text-blue-500" />
                      {currentBatch?.name}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1 text-gray-600">
                      <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                      {currentBatch?.course}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {currentBatch?.members} members
                  </Badge>
                </div>
              </CardHeader>
              {/* Messages */}
              <div className="flex-1 flex flex-col min-h-0">
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ maxHeight: 'calc(70vh - 80px)' }}>
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
                          className={`rounded-lg p-3 shadow-sm ${
                            message.isMe
                              ? "bg-blue-600 text-white"
                              : message.isInstructor
                              ? "bg-purple-100 text-purple-900 border border-purple-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span
                              className={`text-xs font-semibold ${
                                message.isMe ? "text-blue-100" : "text-gray-700"
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
                                message.isMe ? "text-blue-200" : "text-gray-400"
                              }`}
                            >
                              {message.timestamp}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                {/* Message Input */}
                <div className="border-t p-3 bg-gray-50 rounded-b-lg">
                  <div className="flex space-x-2 items-end">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[2.5rem] max-h-24 resize-none border rounded text-sm"
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
                      className="h-10 px-4 text-sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Members List */}
          <div className="lg:col-span-1">
            <Card className="h-full border rounded-lg">
              <CardHeader className="bg-gray-50 rounded-t-lg px-4 py-3">
                <CardTitle className="flex items-center text-base font-semibold">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Members ({members.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4 bg-white rounded-b-lg">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center space-x-3 py-2 px-2 rounded hover:bg-gray-50 transition"
                  >
                    <div className="relative">
                      <Avatar className="w-7 h-7">
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
                        className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
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
