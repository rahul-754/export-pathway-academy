import { useEffect, useState, useRef } from "react";
import { useUser } from "@/hooks/useUser";
import {
  getUserBatches,
  getBatchMessages,
  getBatchMembers,
} from "@/Apis/Apis";
import io from "socket.io-client";
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
import { useParams, useNavigate } from "react-router-dom";

const SOCKET_URL = "http://localhost:5000"; // Change if your backend runs elsewhere

const BatchesPage = () => {
  const { user } = useUser();
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [batches, setBatches] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(batchId || null);
  const [messages, setMessages] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<any>(null);

  // Fetch batches for the user
  useEffect(() => {
    if (user?._id) {
      getUserBatches(user._id).then(setBatches);
    }
  }, [user]);

  // Select batch from URL or default to first batch
  useEffect(() => {
    if (batches.length > 0) {
      if (batchId) {
        setSelectedBatch(batchId);
      } else if (!selectedBatch) {
        setSelectedBatch(batches[0]._id);
      }
    }
  }, [batches, batchId, selectedBatch]);

  // Socket connection and room join
  useEffect(() => {
    if (!selectedBatch || !user?._id) return;

    // Connect socket if not already
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        query: { userId: user._id },
      });
      console.log("Socket connected:", socketRef.current.id);
    }

    // Join batch room
    socketRef.current.emit("joinBatch", { batchId: selectedBatch, userId: user._id });
    console.log("Joined batch:", selectedBatch);

    // Handler for new messages
    const handleBatchMessage = (msg: any) => {
      console.log("Received batchMessage:", msg);
      setMessages((prev: any[]) => [
        ...prev,
        mapMessage(msg, user._id)
      ]);
    };

    // Remove previous listener, then add
    socketRef.current.off("batchMessage", handleBatchMessage);
    socketRef.current.on("batchMessage", handleBatchMessage);

    // Fetch initial messages and members
    getBatchMessages(selectedBatch).then((msgs) => {
      console.log("Fetched initial messages:", msgs);
      setMessages(msgs.map((m: any, idx: number) => mapMessage(m, user._id, idx)));
    });
    getBatchMembers(selectedBatch).then((members) => {
      console.log("Fetched members:", members);
      setMembers(members);
    });

    // Cleanup on batch change/unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveBatch", { batchId: selectedBatch, userId: user._id });
        socketRef.current.off("batchMessage", handleBatchMessage);
        console.log("Left batch:", selectedBatch);
      }
    };
  }, [selectedBatch, user]);

  // Send message via socket
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedBatch && user?._id && socketRef.current) {
      const msgObj = {
        batchId: selectedBatch,
        userId: user._id,
        message: newMessage,
        name: user.name,
        timestamp: new Date().toISOString(),
      };
      console.log("Sending message:", msgObj);
      socketRef.current.emit("sendBatchMessage", msgObj);
      setNewMessage("");
      // Do NOT fetch messages here; rely on socket event for real-time update
    }
  };

  // Use _id for batch selection and lookup
  const currentBatch = batches.find((b) => b._id === selectedBatch);

  // When user clicks a batch, update URL
  const handleBatchSelect = (id: string) => {
    setSelectedBatch(id);
    navigate(`/batches/${id}`);
  };

  // Helper to map message for UI
  function mapMessage(message: any, myId: string, idx?: number) {
    return {
      ...message,
      id: message._id || message.id || idx, // fallback to idx if no id
      isMe: (message.userId || message.user?._id || message.user) === myId,
      isInstructor: message.role === "instructor",
      avatar: message.name ? message.name[0].toUpperCase() : "U",
      user: message.name || "User",
      timestamp: message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "",
    };
  }

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
                  key={batch._id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBatch === batch._id
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => handleBatchSelect(batch._id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm line-clamp-2">
                      {batch.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {batch.category}
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
                        variant={batch.status === "active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {batch.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {batch.isPaid ? `₹${batch.amount}` : "Free"}
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
                      {currentBatch?.title}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {currentBatch?.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {currentBatch?.members?.length ?? 0} members
                  </Badge>
                </div>
              </CardHeader>
              {/* Messages */}
              <div className="flex-1 flex flex-col min-h-0">
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ maxHeight: 'calc(70vh - 80px)' }}>
                  {messages.map((message, idx) => (
                    <div
                      key={message.id || idx}
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
            <Card className="h-full border rounded-lg flex flex-col">
              <CardHeader className="bg-gray-50 rounded-t-lg px-4 py-3">
                <CardTitle className="flex items-center text-base font-semibold">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Members ({members.length})
                </CardTitle>
              </CardHeader>
              <CardContent
                className="space-y-3 p-4 bg-white rounded-b-lg overflow-y-auto"
                style={{ maxHeight: "60vh" }} // Ensures scroll if too many members
              >
                {members.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    No members found.
                  </div>
                ) : (
                  members.map((member) => (
                    <div
                      key={member._id}
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
                            {member.name ? member.name[0].toUpperCase() : "U"}
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
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchesPage;
