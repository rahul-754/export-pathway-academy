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
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Video,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Play,
} from "lucide-react";
import UserHeader from "@/components/UserHeader";
import { getCourses } from "@/Apis/Apis";

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [courses, setCourses] = useState({ totalCourses: 0, courses: [] });
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const handleCourseClick = (course: any) => {
    if (course._id === "683eb8cf6dfab461f47cd71c") {
      navigate("/course/Export-Success-Mastery/BasicSessions");
    } else if (course._id === "a9c7f83d2b214df9ab8e3475") {
      navigate("/course/Export-Success-Mastery/AdvancedSessions");
    } 
    else if (course._id === "68f1e4f5d32828b4221a9225") {
      navigate("/course/Export-Success-Mastery/AdvancedSessions");
    } 
    else {
      navigate("/not-found");
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const data = await getCourses();
        setCourses(data);
        const allCategories = data.courses.map(
          (course) => course.category?.toLowerCase() || "uncategorized"
        );
        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(uniqueCategories as string[]);
      } catch (error) {
        console.error(error);
        // Optionally show toast/snackbar here
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      course.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  //console.log(filteredCourses);
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Explore Courses
        </h2>
        <p className="text-gray-600">
          Build your export expertise with our comprehensive course library
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-gray-200 relative">
              <img
                src={course.courseImg}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-blue-500 text-white">
                  {course.level || "General"}
                </Badge>{" "}
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
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <Video className="h-4 w-4 mr-1" />
                    {course.sessionTitles.length} sessions
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  Instructor: {course.instructor || "Saumya Prakash"}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-lg font-bold text-blue-600">
                    {course.price}
                  </div>
                  <Button onClick={() => handleCourseClick(course)}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Enroll Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
