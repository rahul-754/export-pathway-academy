import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Video,
  Calendar,
  Trophy,
  Users,
  Play,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface EnrolledCourse {
  id: number;
  title: string;
  progress: number;
  sessionsCompleted: number;
  totalSessions: number;
  nextSession: string;
  category: string;
  courseImg: string;
}

interface UpcomingProgram {
  id: number;
  title: string;
  date: string;
  time: string;
}

interface RecentCertificate {
  id: number;
  title: string;
  date: string;
  level: string;
}

interface EnrolledUserViewProps {
  user: any;
}

const EnrolledUserView = ({ user }: EnrolledUserViewProps) => {
  const navigate = useNavigate();
  const onCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}/sessions`);
  };

  const enrolledCourses: EnrolledCourse[] =
    user.enrolledCourses?.map((enrolled: any) => {
      const course = enrolled.course || {};
      const completedCount = enrolled.completedSessions?.length || 0;

      // Find next session name or show default
      const nextSession = (() => {
        // sessions is an array of session IDs in the course
        const allSessions = course.sessions || [];
        const completedSessions = enrolled.completedSessions || [];

        const nextSessionId = allSessions.find(
          (sessionId: string) => !completedSessions.includes(sessionId)
        );
        return nextSessionId || "Upcoming session";
      })();

      return {
        id: course._id || "",
        title: course.title || "Untitled Course",
        progress: enrolled.progress || 0,
        sessionsCompleted: completedCount,
        totalSessions: enrolled.totalSessions || 0,
        nextSession,
        category: course.category || "General",
        courseImg:
          course.courseImg ||
          "https://via.placeholder.com/400x200?text=No+Image",
      };
    }) || [];
  //console.log("Enrolled Courses:", enrolledCourses);
  const upcomingPrograms: UpcomingProgram[] = [
    {
      id: 1,
      title: "Export Finance Workshop",
      date: "Dec 15",
      time: "2:00 PM",
    },
    {
      id: 2,
      title: "Trade Documentation Webinar",
      date: "Dec 18",
      time: "10:00 AM",
    },
  ];

  const recentCertificates: RecentCertificate[] = [
    {
      id: 1,
      title: "Export Documentation",
      date: "Nov 30, 2024",
      level: "Basic",
    },
    {
      id: 2,
      title: "Trade Compliance",
      date: "Nov 25, 2024",
      level: "Advanced",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}
        </h2>
        <p className="text-gray-600">Continue your export learning journey</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Courses Enrolled
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.enrolledCoursesCount}
            </div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Certificates Earned
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Batches
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Join discussions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
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
                <div
                  key={course.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onCourseClick(course.id)}
                >
                  <div className="flex gap-4">
                    <img
                      src={course.courseImg}
                      alt={course.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {course.title}
                          </h4>
                          <Badge variant="outline" className="mt-1">
                            {course.category}
                          </Badge>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          {course.sessionsCompleted}/
                          {user.enrolledSessions.length} sessions
                        </div>
                      </div>

                      <Progress value={course.progress} className="mb-3" />

                      <div className="flex justify-between items-center">
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          {course.progress === 0
                            ? "Start Learning"
                            : "Continue Learning"}
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
                <div
                  key={program.id}
                  className="border-l-4 border-blue-500 pl-3 py-2"
                >
                  <h5 className="font-medium text-sm">{program.title}</h5>
                  <p className="text-xs text-gray-600">
                    {program.date} at {program.time}
                  </p>
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
                    <Badge variant="secondary" className="mt-1">
                      {cert.level}
                    </Badge>
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
              <Link to="/courses">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Browse courses
                </Button>
              </Link>
              <Link to="/batches">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Discussions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnrolledUserView;