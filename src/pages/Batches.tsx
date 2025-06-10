import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  BookOpen,
  FileText,
  MessageSquare,
  Video,
  Award,
  Clock,
  DollarSign,
  Globe,
  Tag,
  BarChart3,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";

interface Batch {
  id: string;
  title: string;
  description: string;
  batchDetails: string;
  metaImage: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  seatCount: number;
  enrolledCount: number;
  medium: "Online" | "Offline";
  category: string;
  evaluationEndDate: string;
  batchDetailsRaw: string;
  isPaid: boolean;
  amount?: number;
  currency?: string;
  courses: Course[];
  students: Student[];
  assessments: Assessment[];
  announcements: Announcement[];
  discussions: Discussion[];
  status: "active" | "inactive";
}

interface Course {
  id: string;
  title: string;
  evaluator: string;
  progress: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  progress: number;
  lastActive: string;
}

interface Assessment {
  id: string;
  title: string;
  type: "quiz" | "assignment";
  dueDate: string;
  status: "pending" | "completed" | "graded";
  score?: number;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastReply: string;
}

const BatchesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showNewBatchForm, setShowNewBatchForm] = useState(false);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    // In a real application, this would be an API call
    setBatches([
      {
        id: "1",
        title: "May 2025 Expert Certified Program",
        description: "Comprehensive training program for aspiring experts",
        batchDetails: "Detailed syllabus and prerequisites...",
        metaImage: "/batch-preview.jpg",
        startDate: "2025-05-01",
        endDate: "2025-08-31",
        startTime: "09:00",
        endTime: "17:00",
        seatCount: 30,
        enrolledCount: 15,
        medium: "Online",
        category: "Professional Development",
        evaluationEndDate: "2025-09-15",
        batchDetailsRaw: "<div>Raw HTML content</div>",
        isPaid: true,
        amount: 999,
        currency: "USD",
        courses: [],
        students: [],
        assessments: [],
        announcements: [],
        discussions: [],
        status: "active",
      },
    ]);
  }, []);

  const handleCreateBatch = () => {
    setShowNewBatchForm(true);
  };

  const handleManageBatch = (batchId: string) => {
    const batch = batches.find((b) => b.id === batchId);
    setSelectedBatch(batch || null);
    setActiveTab("overview");
  };

  const handleEditBatch = (batch: Batch) => {
    // Implement edit batch functionality
  };

  const handleDeleteBatch = (batchId: string) => {
    // Implement delete batch functionality
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-var(--header-height)-var(--footer-height))]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Batches</h1>
            <Button
              onClick={handleCreateBatch}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              New Batch
            </Button>
          </div>

          {showNewBatchForm ? (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Create New Batch</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., May 2025 Expert Certified Program"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Input type="text" placeholder="Short description" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch Details
                  </label>
                  <Textarea
                    placeholder="Detailed description including syllabus, prerequisites, benefits..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <Input type="time" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <Input type="time" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seat Count
                    </label>
                    <Input
                      type="number"
                      placeholder="Maximum number of students"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medium
                    </label>
                    <Select>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <Input type="text" placeholder="Batch category" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Evaluation End Date
                    </label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="paidBatch" className="mr-2" />
                    <label
                      htmlFor="paidBatch"
                      className="text-sm font-medium text-gray-700"
                    >
                      Paid Batch
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount
                      </label>
                      <Input type="number" placeholder="Batch fee" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <Select>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="INR">INR</option>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewBatchForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 text-white">
                    Create Batch
                  </Button>
                </div>
              </form>
            </div>
          ) : selectedBatch ? (
            <div className="bg-white rounded-lg shadow-lg mb-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="border-b">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="assessments">Assessments</TabsTrigger>
                  <TabsTrigger value="announcements">Announcements</TabsTrigger>
                  <TabsTrigger value="discussions" className="min-w-[80px]">
                    Discuss
                  </TabsTrigger>
                  <TabsTrigger value="live-class">Live Class</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-4">
                        Batch Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                          <span>
                            {selectedBatch.startDate} - {selectedBatch.endDate}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-gray-500" />
                          <span>
                            {selectedBatch.startTime} - {selectedBatch.endTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 h-5 mr-2 text-gray-500" />
                          <span>
                            {selectedBatch.enrolledCount}/
                            {selectedBatch.seatCount} Students
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 mr-2 text-gray-500" />
                          <span>{selectedBatch.medium}</span>
                        </div>
                        <div className="flex items-center">
                          <Tag className="w-5 h-5 mr-2 text-gray-500" />
                          <span>{selectedBatch.category}</span>
                        </div>
                        {selectedBatch.isPaid && (
                          <div className="flex items-center">
                            <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                            <span>
                              {selectedBatch.amount} {selectedBatch.currency}
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-4">
                        Progress Overview
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              Course Completion
                            </span>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                          <Progress value={75} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              Assessment Completion
                            </span>
                            <span className="text-sm font-medium">60%</span>
                          </div>
                          <Progress value={60} />
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="courses" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Courses</h3>
                    <Button className="bg-blue-600 text-white">
                      Add Course
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {selectedBatch.courses.map((course) => (
                      <Card key={course.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-gray-500">
                              Evaluator: {course.evaluator}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Progress
                              value={course.progress}
                              className="w-32 mr-4"
                            />
                            <span className="text-sm font-medium">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="students" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Students</h3>
                    <Button className="bg-blue-600 text-white">
                      Add Student
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {selectedBatch.students.map((student) => (
                      <Card key={student.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar>
                              <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-full h-full object-cover"
                              />
                            </Avatar>
                            <div className="ml-4">
                              <h4 className="font-medium">{student.name}</h4>
                              <p className="text-sm text-gray-500">
                                {student.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Progress
                              value={student.progress}
                              className="w-32 mr-4"
                            />
                            <span className="text-sm font-medium">
                              {student.progress}%
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="assessments" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Assessments</h3>
                    <Button className="bg-blue-600 text-white">
                      Add Assessment
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {selectedBatch.assessments.map((assessment) => (
                      <Card key={assessment.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{assessment.title}</h4>
                            <p className="text-sm text-gray-500">
                              Due: {assessment.dueDate}
                            </p>
                          </div>
                          <Badge
                            className={
                              assessment.status === "completed"
                                ? "bg-green-500"
                                : assessment.status === "graded"
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                            }
                          >
                            {assessment.status}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="announcements" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Announcements</h3>
                    <Button className="bg-blue-600 text-white">
                      New Announcement
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {selectedBatch.announcements.map((announcement) => (
                      <Card key={announcement.id} className="p-4">
                        <h4 className="font-medium mb-2">
                          {announcement.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {announcement.content}
                        </p>
                        <p className="text-xs text-gray-500">
                          {announcement.date}
                        </p>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="discussions" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Discussions</h3>
                    <Button className="bg-blue-600 text-white">
                      New Discussion
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {selectedBatch.discussions.map((discussion) => (
                      <Card key={discussion.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{discussion.title}</h4>
                            <p className="text-sm text-gray-500">
                              By {discussion.author}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              {discussion.replies} replies
                            </p>
                            <p className="text-xs text-gray-400">
                              Last reply: {discussion.lastReply}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="live-class" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Live Classes</h3>
                    <Button className="bg-blue-600 text-white">
                      Schedule Class
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Upcoming Classes</h4>
                      <div className="space-y-4">
                        {/* Add upcoming classes list */}
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Past Classes</h4>
                      <div className="space-y-4">
                        {/* Add past classes list */}
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {batches.map((batch) => (
                <Card key={batch.id} className="mb-4">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{batch.title}</CardTitle>
                        <CardDescription>
                          {batch.startDate} - {batch.endDate} •{" "}
                          {batch.enrolledCount}/{batch.seatCount} enrolled
                        </CardDescription>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600">
                            {batch.description}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {batch.startTime} - {batch.endTime}
                            </span>
                            <span>•</span>
                            <span>{batch.medium}</span>
                            {batch.isPaid && (
                              <>
                                <span>•</span>
                                <span className="text-green-600">
                                  {batch.amount} {batch.currency}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Video className="w-4 h-4 mr-1" />
                              Watch
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              Notes
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              PPT
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Award className="w-4 h-4 mr-1" />
                              Quiz
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            batch.status === "active" ? "default" : "secondary"
                          }
                        >
                          {batch.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBatch(batch)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBatch(batch.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-1" />
                        Manage Students
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm" className="w-24">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Discuss
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BatchesPage;
