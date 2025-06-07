import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
  Star,
  Clock,
  Users,
  Trophy,
  ArrowRight,
  User,
  Flag,
} from "lucide-react";
import { getCourses } from "@/Apis/Apis";

import curosal1 from "./ect.jpg";
import curosal2 from "./ect (1).jpg";
import curosal3 from "./ect (2).jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

const staticcData = [
  {
    img: curosal1,
    heading: "Upgrade your Export Skills",
    subHeading: "Learn modern export tactics to unlock global markets.",
    link: "",
  },
  {
    img: curosal2,
    heading: "Use AI to increase your Exports",
    subHeading: "Use AI to automate, analyze, and grow exports faster.",
    link: "",
  },
  {
    img: curosal3,
    heading: "Join our AI Export Success Mastery Course",
    subHeading: "Subscribe now and start mastering AI for exports.",
    link: "",
  },
];

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
    <div className="container  from-blue-50 via-white to-gray-0 min-h-screen mt-5 p-6">
      {/* Carousel Section */}
      <div className="mb-8 w-full">
        <Carousel
          showThumbs={false}
          infiniteLoop
          className="rounded-lg shadow-lg"
          showStatus={false}
          showIndicators={true}
          stopOnHover={false}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute top-1/2 left-2 z-10 transform transition-opacity -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-800 p-1 rounded-full shadow-md w-8 h-8 flex items-center justify-center" // Smaller size
              >
                ❮
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute top-1/2 right-2 z-10 transform transition-opacity -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-800 p-1 rounded-full shadow-md w-8 h-8 flex items-center justify-center" // Smaller size
              >
                ❯
              </button>
            )
          }
        >
          {staticcData.map((obj, index) => {
            return (
              <div className="relative w-full h-96">
                <img
                  src={obj.img}
                  alt={`Carousel Image ${index + 1}`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-1/2 left-0 gap-3 transform -translate-y-1/2 bg-white/50  text-gray-800 rounded-lg shadow-md w-full ml-16 max-w-[500px] py-5 px-6 flex flex-col">
                  <h3 className="text-4xl font-bold text-start leading-tight">
                    {obj.heading}
                  </h3>
                  <p className="text-md text-start tracking-tight leading-tight">
                    {obj.subHeading}
                  </p>
                  <a
                    href={obj.link}
                    className="bg-blue-600 font-bold hover:bg-blue-600 transition-colors text-white px-5 py-2 mt-2 rounded-sm w-fit"
                  >
                    View Plans
                  </a>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>

      {/* Welcome Section */}
      {/* <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">
          <span className="text-gray-800">Welcome to </span>
          <span className="text-blue-700">TerraSourcing!</span>
        </h2>
          <span className="text-gray-800">Welcome to </span>
          <span className="text-blue-700">TerraSourcing!</span>
        </h2>
        <p className="text-gray-500">
          Start your export journey with our comprehensive courses
        </p>
      </div> */}

      {/* Courses Section */}
      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
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
                  <div className="flex items-center mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600 border rounded-sm px-2 py-1">
                      <Video className="h-4 w-4 mr-1" />
                      {course.sessionsCount} sessions
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Star
                        fill="#ea580c"
                        stroke="#ea580c"
                        className="w-4 h-4"
                      />
                      <span>4.7</span>
                    </div>
                    <div className="inline space-x-2">
                      <span className="mb-1 text-neutral-300">|</span>
                      <span>444k ratings</span>
                    </div>
                    <div className="inline space-x-2">
                      <span className="mb-1 text-neutral-300">|</span>
                      <span>200 total hours</span>
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
