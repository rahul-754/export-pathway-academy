
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Video, 
  Calendar, 
  Trophy, 
  Users, 
  Play,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import UserHeader from '@/components/UserHeader';

const UserDashboard = () => {
  const enrolledCourses = [
    { 
      id: 1, 
      title: "Export Documentation", 
      progress: 75, 
      sessionsCompleted: 6, 
      totalSessions: 8,
      nextSession: "Letter of Credit Basics",
      category: "Fundamentals"
    },
    { 
      id: 2, 
      title: "International Trade Laws", 
      progress: 45, 
      sessionsCompleted: 5, 
      totalSessions: 12,
      nextSession: "WTO Regulations",
      category: "Legal"
    }
  ];

  const upcomingPrograms = [
    { id: 1, title: "Export Fundamentals Program", date: "July 15, 2024", time: "10:00 AM" },
    { id: 2, title: "Digital Marketing for Exporters", date: "July 20, 2024", time: "2:00 PM" }
  ];

  const recentCertificates = [
    { id: 1, title: "Export Documentation Specialist", date: "June 10, 2024", level: "Intermediate" },
    { id: 2, title: "Customs Procedures Expert", date: "May 25, 2024", level: "Advanced" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
          <p className="text-gray-600">Continue your export learning journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 in progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Join discussions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  My Courses
                </CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{course.title}</h4>
                        <Badge variant="outline" className="mt-1">{course.category}</Badge>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        {course.sessionsCompleted}/{course.totalSessions} sessions
                      </div>
                    </div>
                    
                    <Progress value={course.progress} className="mb-3" />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Next: {course.nextSession}</p>
                      </div>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Link to="/courses">
                  <Button variant="outline" className="w-full">
                    Browse All Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Programs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Programs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingPrograms.map((program) => (
                  <div key={program.id} className="border-l-4 border-blue-500 pl-3 py-2">
                    <h5 className="font-medium text-sm">{program.title}</h5>
                    <p className="text-xs text-gray-600">{program.date} at {program.time}</p>
                  </div>
                ))}
                <Link to="/programs">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Programs
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Certificates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Recent Certificates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentCertificates.map((cert) => (
                  <div key={cert.id} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">{cert.title}</h5>
                      <p className="text-xs text-gray-600">{cert.date}</p>
                      <Badge variant="secondary" className="mt-1">{cert.level}</Badge>
                    </div>
                  </div>
                ))}
                <Link to="/certification">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Certificates
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/sessions">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Browse Sessions
                  </Button>
                </Link>
                <Link to="/batches">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Join Discussions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
