import { useState } from 'react';
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
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import UserHeader from '@/components/UserHeader';

const UserDashboard = () => {
  const navigate = useNavigate();
  // Simulate user enrollment status - in real app this would come from database
  const [isNewUser] = useState(false); // Change to true to see new user view
  
  const basicCourses = [
    {
      id: 1,
      title: "Export Documentation Basics",
      description: "Learn the fundamental concepts of export documentation",
      sessions: 6,
      duration: "4 weeks",
      level: "Basic",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Introduction to International Trade",
      description: "Understanding the basics of global commerce",
      sessions: 8,
      duration: "5 weeks",
      level: "Basic",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop"
    }
  ];

  const advancedCourses = [
    {
      id: 3,
      title: "Advanced Export Strategies",
      description: "Master complex export procedures and strategies",
      sessions: 12,
      duration: "8 weeks",
      level: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "International Trade Law & Compliance",
      description: "Deep dive into legal aspects of international trade",
      sessions: 10,
      duration: "6 weeks",
      level: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
    }
  ];

  const enrolledCourses = [
    { 
      id: 1, 
      title: "Export Documentation Basics", 
      progress: 75, 
      sessionsCompleted: 4, 
      totalSessions: 6,
      nextSession: "Letter of Credit Basics",
      category: "Basic",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop"
    },
    { 
      id: 2, 
      title: "International Trade Laws", 
      progress: 45, 
      sessionsCompleted: 5, 
      totalSessions: 12,
      nextSession: "WTO Regulations",
      category: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop"
    }
  ];

  const handleCourseClick = (courseId: number) => {
    navigate(`/course/${courseId}/sessions`);
  };

  if (isNewUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserHeader />
        
        <div className="container mx-auto px-4 py-6">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Exporter Learning Hub!</h2>
            <p className="text-gray-600">Start your export journey with our comprehensive courses</p>
          </div>

          {/* Basic Courses */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Star className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-2xl font-bold text-gray-900">Basic Courses</h3>
              <Badge variant="secondary" className="ml-3">Perfect for beginners</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {basicCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCourseClick(course.id)}>
                  <div className="aspect-video bg-gray-200 relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-600">{course.level}</Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Video className="h-4 w-4 mr-1" />
                        {course.sessions} sessions
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      View Sessions & Enroll
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Advanced Courses */}
          <div>
            <div className="flex items-center mb-6">
              <Trophy className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-2xl font-bold text-gray-900">Advanced Courses</h3>
              <Badge variant="secondary" className="ml-3">For experienced exporters</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advancedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCourseClick(course.id)}>
                  <div className="aspect-video bg-gray-200 relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-600">{course.level}</Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Video className="h-4 w-4 mr-1" />
                        {course.sessions} sessions
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      View Sessions & Enroll
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Existing enrolled user dashboard
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
                  My Enrolled Courses
                </CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleCourseClick(course.id)}>
                    <div className="flex gap-4">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-20 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
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
                            Continue Learning
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link to="/courses">
                  <Button variant="outline" className="w-full">
                    Browse More Courses
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
