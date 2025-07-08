import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  getAllBatchesAdmin,
  createBatch,
  updateBatch,
  deleteBatch,
  getBatchMembers,
  getAllUsers,
} from "@/Apis/Apis";

interface Batch {
  _id: string;
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
  const [loadingBatches, setLoadingBatches] = useState(false);
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

  // USERS: fetch from backend with pagination and search
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userPage, setUserPage] = useState(1);
  const [userLimit] = useState(10);
  const [userTotal, setUserTotal] = useState(0);
  const [userSearch, setUserSearch] = useState("");
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const [programFormOpen, setProgramFormOpen] = useState(false);
  const [selectedBatchMembers, setSelectedBatchMembers] = useState<any[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch all batches on mount
  useEffect(() => {
    const fetchBatches = async () => {
      setLoadingBatches(true);
      try {
        const data = await getAllBatchesAdmin();
        setBatches(data);
      } catch (e) {
        setBatches([]);
      }
      setLoadingBatches(false);
    };
    fetchBatches();
  }, []);

  // Fetch users with pagination and search
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const data = await getAllUsers(userPage, userLimit, userSearch);
        if (Array.isArray(data)) {
          setUsers(data);
          setUserTotal(data.length);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
          setUserTotal(data.total || data.users.length);
        } else {
          setUsers([]);
          setUserTotal(0);
        }
      } catch (e) {
        setUsers([]);
        setUserTotal(0);
      }
      setLoadingUsers(false);
    };
    fetchUsers();
  }, [userPage, userLimit, userSearch]);

  // Debounced search handler
  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserPage(1); // Reset to first page on new search
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setUserSearch(value);
    }, 500); // 500ms debounce
  };

  // Handle create/update batch
  const handleBatchSubmit = async (data: any) => {
    try {
      if (editingBatch) {
        // Update existing batch
        const updated = await updateBatch(editingBatch._id, data);
        setBatches((prev) =>
          prev.map((batch) => (batch._id === updated._id ? updated : batch))
        );
      } else {
        // Create new batch
        const created = await createBatch(data);
        setBatches((prev) => [...prev, created]);
      }
      setBatchFormOpen(false);
      setEditingBatch(null);
    } catch (error) {
      // Handle error (show toast, etc.)
    }
  };

  const handleDeleteBatch = async (batchId: string) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      try {
        await deleteBatch(batchId);
        setBatches((prev) => prev.filter((batch) => batch._id !== batchId));
      } catch (error) {
        // Handle error
      }
    }
  };

  const handleEditBatch = (batch: Batch) => {
    setEditingBatch(batch);
    setBatchFormOpen(true);
  };

  // Handle status change
  const handleStatusChange = async (batchId: string, newStatus: Batch["status"]) => {
    try {
      const batch = batches.find((b) => b._id === batchId);
      if (!batch) return;
      const updated = await updateBatch(batchId, { ...batch, status: newStatus });
      setBatches((prev) =>
        prev.map((b) => (b._id === batchId ? updated : b))
      );
    } catch (error) {
      // Handle error
    }
  };

  const handleNewBatch = () => {
    setEditingBatch(null);
    setBatchFormOpen(true);
  };

  const handleCloseBatchForm = () => {
    setBatchFormOpen(false);
    setEditingBatch(null);
  };

  const handleNewProgram = () => setProgramFormOpen(true);
  const handleCloseProgramForm = () => setProgramFormOpen(false);

  const handleCreateProgram = (programData: any) => {
    // Add your logic to save the program (e.g., setPrograms([...programs, programData]))
    setProgramFormOpen(false);
  };

  // Show student modal and set users for the batch
  const handleShowMembers = async (batchId: string) => {
    setSelectedBatchId(batchId);
    setShowStudentModal(true);
    // Optionally fetch all users if needed, here we use the already loaded users
    setAllUsers(users);
    setSelectedUsers([]); // Reset selection
  };

  // Add selected users to batch (mock logic, adjust as needed)
  const handleAddStudentsToBatch = () => {
    setShowStudentModal(false);
    setSelectedBatchId(null);
    // You can add logic to update the batch with selected users here
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
              <div className="text-2xl font-bold">{Array.isArray(users) ? users.length : 0}</div>
              <p className="text-xs text-muted-foreground">
                {Array.isArray(users) ? users.filter(u => u.status === "active").length : 0} active
              </p>
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
              <div className="text-2xl font-bold">
                {Array.isArray(users) ? users.reduce((acc, u) => acc + (u.certified || 0), 0) : 0}
              </div>
              <p className="text-xs text-muted-foreground">Total certificates</p>
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
              <div className="text-2xl font-bold">
                {batches.filter(b => b.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Active</p>
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
              <div className="flex gap-2">
                {/* <input
                  type="text"
                  placeholder="Search users..."
                  className="border px-2 py-1 rounded text-sm"
                  onChange={handleUserSearch}
                  defaultValue={userSearch}
                /> */}
                <Button variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              {loadingUsers ? (
                <p>Loading users...</p>
              ) : (
                Array.isArray(users) && users.map((user) => (
                  <Card key={user._id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{user.name}</CardTitle>
                          <CardDescription>{user.emailAddress || user.email}</CardDescription>
                        </div>
                        <Badge variant="outline">{user.status || user.role}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-4 text-sm text-gray-600">
                        <span>{user.enrolledCourses?.length || user.courses || 0} courses enrolled</span>
                        <span>{user.certified || 0} certificates earned</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-end items-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={userPage === 1}
                onClick={() => setUserPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </Button>
              <span className="text-sm">
                Page {userPage} of {Math.ceil(userTotal / userLimit) || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={userPage >= Math.ceil(userTotal / userLimit)}
                onClick={() => setUserPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </TabsContent>

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
                  <Card key={batch._id}>
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
                                batch._id,
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
                            onClick={() => handleDeleteBatch(batch._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleShowMembers(batch._id)}>
                          <Users className="w-4 h-4 mr-1" />
                          Manage Students
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Analytics
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => navigate("/batches")}> {/* Navigate to discussions */}
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
        {/* Student Modal */}
        {showStudentModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-2xl max-h-[70vh] overflow-y-auto relative">
              <h2 className="text-lg font-semibold mb-4">Add Students to Batch</h2>
              <div className="mb-4">
                {allUsers.map((user) => (
                  <div key={user._id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers((prev) => [...prev, user._id]);
                        } else {
                          setSelectedUsers((prev) => prev.filter((id) => id !== user._id));
                        }
                      }}
                      className="mr-2"
                    />
                    <span>{user.name} ({user.emailAddress || user.email})</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowStudentModal(false)}>Cancel</Button>
                <Button onClick={handleAddStudentsToBatch}>Add Selected</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
