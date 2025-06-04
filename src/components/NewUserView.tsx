import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Video,
  Clock,
  Star,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { getCourses } from "@/Apis/Apis";
interface Course {
  _id: string;
  title: string;
  courseDescription: string;
  sessionsCount: number;
  level?: string; // optional if backend doesn't send it
  courseImg: string;
  pricing?: {
    duration?: string;
  };
}

interface NewUserViewProps {
  onCourseClick: (courseId: string) => void;
}

const NewUserView = ({ onCourseClick }: NewUserViewProps) => {
  const [courses, setCourses] = useState({ totalCourses: 0, courses: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        console.log(data);
        setCourses(data);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Terra Souring!
        </h2>
        <p className="text-gray-600">
          Start your export journey with our comprehensive courses
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Courses Enrolled
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{0}</div>
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
            <p className="text-xs text-muted-foreground">this month</p>
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

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{
            gridTemplateColumns: "repeat(4, 3fr)",
            paddingLeft: "30px",
          }}
        >
          {courses.courses &&
            courses.courses.map((course) => (
              <Card
                key={course._id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onCourseClick(course._id)}
              >
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={course.courseImg}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600">
                      {course.level || "General"}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl truncate whitespace-nowrap overflow-hidden">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm truncate whitespace-nowrap overflow-hidden">
                    {course.courseDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Video className="h-4 w-4 mr-1" />
                      {course.sessionsCount} sessions
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.pricing?.duration || "4 weeks"}
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
      )}
    </div>
  );
};

export default NewUserView;
