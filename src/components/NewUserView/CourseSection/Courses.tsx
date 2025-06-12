import { useEffect, useState } from "react";
import CardElement from "./components/CardElement";
import { getCourses } from "@/Apis/Apis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaSpinner } from "react-icons/fa";

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

export default function Courses({ user, onCourseClick }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  //console.log(user);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data.courses);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return (
      <div className="w-full max-w-[1600px] mx-auto p-10 flex items-center justify-center">
        <FaSpinner className="animate-spin w-10 h-10" />
      </div>
    );
  return (
    <section className="space-y-10 px-10 py-5 w-full max-w-[1600px] mx-auto">
      <h2 className="text-4xl font-bold">Courses</h2>
      {courses.map((course, index) => (
        <CardElement
          key={course._id}
          course={course}
          reverse={index % 2 === 0}
          onCourseClick={onCourseClick}
        />
      ))}
    </section>
  );
}
