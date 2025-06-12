import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Users,
  BookOpen,
  Trophy,
  Plus,
  Edit,
  Trash2,
  Video,
  BarChart3,
  Calendar,
  MessageSquare,
} from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import Quizes from "@/components/AdminDashboard/Courses/CourseCard/Quizes";
import BatchForm from "@/components/BatchForm";
import Courses from "@/components/AdminDashboard/Courses/Courses";
import ProgramForm from '@/components/ProgramForm';

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
  status: "upcoming" | "active" | "completed";
}

const AdminDashboard = () => {
  const [batchFormOpen, setBatchFormOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  // const [fullscreen, setFullscreen] = useState(false);
  const [totalCourses, setTotalCourses] = useState<number | null>(null);
  const [programs] = useState([
    {
      id: 1,
      title: "Export Fundamentals Program",
      startDate: "2024-07-15",
      enrolled: 15,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Advanced Export Strategies",
      startDate: "2024-06-20",
      enrolled: 22,
      status: "active",
    },
  ]);

  const [users] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      courses: 3,
      certified: 2,
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      courses: 5,
      certified: 4,
      status: "active",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      courses: 2,
      certified: 1,
      status: "active",
    },
  ]);

  const [programFormOpen, setProgramFormOpen] = useState(false);

  // Add mock data for demonstration if not present
  const courses = [
    { id: 'course1', title: 'Export Fundamentals' },
    { id: 'course2', title: 'Advanced Export Strategies' }
  ];
  const membersByCourse = {
    course1: [
      { id: 'user1', name: 'John Smith' },
      { id: 'user2', name: 'Sarah Johnson' }
    ],
    course2: [
      { id: 'user3', name: 'Mike Chen' }
    ]
  };

  const handleNewBatch = () => {
    setEditingBatch(null);
    setBatchFormOpen(true);
  };

  const handleCloseBatchForm = () => {
    setBatchFormOpen(false);
    setEditingBatch(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBatchSubmit = (data: any) => {
    if (editingBatch) {
      // Update existing batch
      setBatches((prevBatches) =>
        prevBatches.map((batch) =>
          batch.id === editingBatch.id
            ? { ...batch, ...data, isPaid: data.amount ? true : false }
            : batch
        )
      );
    } else {
      // Create new batch
      const newBatch: Batch = {
        id: `batch-${Date.now()}`,
        ...data,
        enrolledCount: 0,
        status: "upcoming",
        isPaid: data.amount ? true : false,
      };
      setBatches((prevBatches) => [...prevBatches, newBatch]);
    }
    setBatchFormOpen(false);
    setEditingBatch(null);
  };

  const handleDeleteBatch = (batchId: string) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      setBatches((prevBatches) =>
        prevBatches.filter((batch) => batch.id !== batchId)
      );
    }
  };

  const handleEditBatch = (batch: Batch) => {
    setEditingBatch(batch);
    setBatchFormOpen(true);
  };

  const handleStatusChange = (batchId: string, newStatus: Batch["status"]) => {
    setBatches((prevBatches) =>
      prevBatches.map((batch) =>
        batch.id === batchId ? { ...batch, status: newStatus } : batch
      )
    );
  };

  const handleNewProgram = () => setProgramFormOpen(true);
  const handleCloseProgramForm = () => setProgramFormOpen(false);

  const handleCreateProgram = (programData) => {
    // Add your logic to save the program (e.g., setPrograms([...programs, programData]))
    setProgramFormOpen(false);
  };

  return (
    <div className="bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Certified Members
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Batches
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">0</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="batches">Batches</TabsTrigger>
            {/* <TabsTrigger value="quizes">Quizes</TabsTrigger> */}
          </TabsList>

          <TabsContent value="courses" className="space-y-4 overflow-y-auto">
            <Courses setTotalCourses={setTotalCourses} />
          </TabsContent>

          <TabsContent value="programs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Program Management</h3>
              <Button onClick={handleNewProgram}>
                <Plus className="w-4 h-4 mr-2" />
                New Program
              </Button>
            </div>

            {programFormOpen && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded shadow-lg w-full max-w-2xl max-h-[70vh] overflow-y-auto relative">
                  <ProgramForm
                    onClose={handleCloseProgramForm}
                    onSubmit={handleCreateProgram}
                    users={users}
                  />
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {programs.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {program.title}
                        </CardTitle>
                        <CardDescription>
                          Starts: {program.startDate} • {program.enrolled}{" "}
                          enrolled
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            program.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {program.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">User Management</h3>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                      </div>
                      <Badge variant="outline">{user.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4 text-sm text-gray-600">
                      <span>{user.courses} courses enrolled</span>
                      <span>{user.certified} certificates earned</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* <TabsContent value="quizes" className="space-y-4">
            <Quizes setFullscreen={setFullscreen} />
          </TabsContent> */}

          <TabsContent value="batches" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Batch Management</h3>
              <Button onClick={handleNewBatch}>
                <Plus className="w-4 h-4 mr-2" />
                Create Batch
              </Button>
            </div>

            <div className="grid gap-4">
              {batches.length === 0 ? (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600 text-center">
                      No batches found. Create a new batch to get started.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                batches.map((batch) => (
                  <Card key={batch.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {batch.title}
                          </CardTitle>
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
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <select
                            value={batch.status}
                            onChange={(e) =>
                              handleStatusChange(
                                batch.id,
                                e.target.value as Batch["status"]
                              )
                            }
                            className="text-sm border rounded px-2 py-1"
                          >
                            <option value="upcoming">Upcoming</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                          </select>
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
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Discussions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
        {batchFormOpen && (
          <BatchForm
            onClose={handleCloseBatchForm}
            onSubmit={handleBatchSubmit}
            batch={editingBatch}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
