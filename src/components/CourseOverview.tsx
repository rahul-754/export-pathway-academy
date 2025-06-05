import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Clock, BookOpen } from "lucide-react";

const CourseOverview = ({ course, purchasedSessions, onShowPreview }) => {
  const isFullyEnrolled = purchasedSessions.length === course.sessions.length;
  const isPartiallyEnrolled = purchasedSessions.length > 0 && !isFullyEnrolled;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-blue-700">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-80">
          <img
            src={course.courseImg}
            alt={course.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <Button
            onClick={onShowPreview}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Video className="h-4 w-4 mr-2" />
            Watch Course Preview
          </Button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-green-600">{course.level}</Badge>
            {isFullyEnrolled && (
              <Badge variant="outline" className="text-green-600">
                Fully Enrolled
              </Badge>
            )}
            {isPartiallyEnrolled && (
              <Badge variant="outline" className="text-yellow-600">
                Partially Enrolled
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {course.title}
          </h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Video className="h-4 w-4 mr-1" />
              {course.sessions.length} sessions
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              Instructor: {course.instructor || "Saumya Prakash"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
