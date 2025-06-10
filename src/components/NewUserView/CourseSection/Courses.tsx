import React, { useEffect, useState } from "react";
import CardElement from "./components/CardElement";
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

export default function Courses({ user, onCourseClick }) {
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

  if (loading)
    return <p className="text-center text-gray-500">Loading courses...</p>;
  return (
    <section className="space-y-5 py-5 w-full max-w-[1400px] mx-auto">
      <h2 className="text-4xl font-bold">Courses</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-10">
        {courses.courses &&
          courses.courses.map((course) => (
            <CardElement
              key={course._id}
              course={course}
              onCourseClick={onCourseClick}
            />
          ))}
      </div>
    </section>
  );
}
