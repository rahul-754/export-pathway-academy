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
  Users,
  Trophy,
  ArrowRight,
  User,
  Flag,
} from "lucide-react";
import { getCourses } from "@/Apis/Apis";

interface Course {
  _id: string;
  title: string;
  courseDescription: string;
  sessionsCount: number;
  level?: string;
  courseImg: string;
  pricing?: {
    duration?: string;
  };
}

interface NewUserViewProps {
  onCourseClick: (courseId: string) => void;
}

const NewUserView = ({ user, onCourseClick }: NewUserViewProps) => {
  const [courses, setCourses] = useState({ totalCourses: 0, courses: [] });
  const [loading, setLoading] = useState(true);
  console.log(user);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
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
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-gray-50 min-h-screen">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">
          <span className="text-gray-800">Welcome to </span>
          <span className="text-blue-700">TerraSourcing!</span>
        </h2>
        <p className="text-gray-500">
          Start your export journey with our comprehensive courses
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card className="rounded-xl shadow-md border border-blue-200 bg-white hover:shadow-lg transition-shadow overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-300"></div>

          <CardContent className="flex justify-between items-center p-5">
            <div>
              <p className="text-slate-500 text-base">Courses Enrolled</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <BookOpen className="text-[#0474e4] w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md border border-blue-200 bg-white hover:shadow-lg transition-shadow overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-300"></div>

          <CardContent className="flex justify-between items-center p-5">
            <div>
              <p className="text-slate-500 text-base">Active Batches</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Flag className="text-[#0474e4] w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md border border-blue-200 bg-white hover:shadow-lg transition-shadow overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-300"></div>

          <CardContent className="flex justify-between items-center p-5">
            <div>
              <p className="text-slate-500 text-base">Certified Members</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Trophy className="text-[#0474e4] w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md border border-blue-200 bg-white hover:shadow-lg transition-shadow overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-300"></div>

          <CardContent className="flex justify-between items-center p-5">
            <div>
              <p className="text-slate-500 text-base">Active Users</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="text-[#0474e4] w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            paddingLeft: "0px",
          }}
        >
          {courses.courses &&
            courses.courses.map((course) => (
              <Card
                key={course._id}
                className="overflow-hidden bg-white border border-gray-100 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onCourseClick(course._id)}
              >
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={course.courseImg}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-500 text-white">
                      {course.level || "General"}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg font-semibold text-gray-800 truncate">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 truncate">
                    {course.courseDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Video className="h-4 w-4 mr-1" />
                      {course.sessionsCount} sessions
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
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
