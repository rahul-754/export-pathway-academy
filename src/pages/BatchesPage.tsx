import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import {
  getUserBatches,
  getBatchMessages,
  getBatchMembers,
  sendBatchMessage,
} from "@/Apis/Apis";
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
  const { user } = useUser();
  const [batches, setBatches] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch batches for the user
  useEffect(() => {
    if (user?._id) {
      getUserBatches(user._id).then(setBatches);
    }
  }, [user]);

  // Fetch messages and members when selectedBatch changes
  useEffect(() => {
    if (selectedBatch) {
      getBatchMessages(selectedBatch).then(setMessages);
      getBatchMembers(selectedBatch).then(setMembers);
    }
  }, [selectedBatch]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedBatch && user?._id) {
      await sendBatchMessage(selectedBatch, newMessage, user._id);
      setNewMessage("");
      getBatchMessages(selectedBatch).then(setMessages); // Refresh messages
    }
  };

  // Use _id for batch selection and lookup
  const currentBatch = batches.find((b) => b._id === selectedBatch);

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
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBatch === batch.id
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => setSelectedBatch(batch._id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm line-clamp-2">
                      {batch.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {batch.course}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {batch.members?.length ?? 0}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {batch.startDate?.slice(0, 10)} -{" "}
                        {batch.endDate?.slice(0, 10)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <Badge
                        variant={batch.isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {batch.status}
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
          <div className="lg:col-span-2 flex flex-col">
            <Card className="h-full flex flex-col border rounded-lg">
              <CardHeader className="border-b bg-gray-50 rounded-t-lg px-4 py-3">
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
