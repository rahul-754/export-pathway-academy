import { BarChart3, Edit, Plus, Trash2, Video } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getCourses } from "@/Apis/Apis";
import CourseForm from "./CourseForm/CourseForm";
import CourseCard from "./CourseCard/CourseCard";

export default function Courses({
  setTotalCourses,
}: {
  setTotalCourses: Dispatch<SetStateAction<number | null>>;
}) {
  const [courses, setCourses] = useState([]);
  const [courseFormOpen, setCourseFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const handleNewCourse = () => {
    setEditingCourse(null);
    setCourseFormOpen(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseFormOpen(true);
  };

  const handleCloseCourseForm = () => {
    setCourseFormOpen(false);
    setEditingCourse(null);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const data = await getCourses();
        setCourses(data.courses);
        setTotalCourses(data.totalCourses);
      } catch (error) {
        console.error(error);
        // Optionally show toast/snackbar here
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Course Management</h3>
        <Button onClick={handleNewCourse}>
          <Plus className="w-4 h-4 mr-2" />
          New Course
        </Button>
      </div>

      <div className="grid gap-4 ">
        {courses &&
          courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              handleEditCourse={handleEditCourse}
            />
          ))}
      </div>
      <CourseForm
        open={courseFormOpen}
        onClose={handleCloseCourseForm}
        courseData={editingCourse}
        isEditing={!!editingCourse}
      />
    </>
  );
}
