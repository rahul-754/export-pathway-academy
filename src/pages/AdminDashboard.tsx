
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminHeader from '@/components/AdminHeader';

const AdminDashboard = () => {
  const [courses] = useState([
    { id: 1, title: "Export Documentation", sessions: 8, enrolled: 45, status: "active" },
    { id: 2, title: "International Trade Laws", sessions: 12, enrolled: 32, status: "active" },
    { id: 3, title: "Customs Procedures", sessions: 6, enrolled: 28, status: "draft" }
  ]);

  const [programs] = useState([
    { id: 1, title: "Export Fundamentals Program", startDate: "2024-07-15", enrolled: 15, status: "upcoming" },
    { id: 2, title: "Advanced Export Strategies", startDate: "2024-06-20", enrolled: 22, status: "active" }
  ]);

  const [users] = useState([
    { id: 1, name: "John Smith", email: "john@example.com", courses: 3, certified: 2, status: "active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", courses: 5, certified: 4, status: "active" },
    { id: 3, name: "Mike Chen", email: "mike@example.com", courses: 2, certified: 1, status: "active" }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">+48 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certified Members</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">298</div>
              <p className="text-xs text-muted-foreground">+15 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 new this week</p>
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

          <TabsContent value="courses" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Course Management</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Course
              </Button>
            </div>
            
            <div className="grid gap-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>
                          {course.sessions} sessions • {course.enrolled} enrolled
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4 mr-1" />
                        Add Session
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Program Management</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Program
              </Button>
            </div>
            
            <div className="grid gap-4">
              {programs.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                        <CardDescription>
                          Starts: {program.startDate} • {program.enrolled} enrolled
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
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

          <TabsContent value="batches" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Batch Management</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Batch
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Discussion Batches</CardTitle>
                <CardDescription>
                  Manage group discussions and member assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No active batches found. Create a new batch to get started.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
