import Courses from "../components/NewUserView/CourseSection/Courses";
import CarouselSection from "../components/NewUserView/CarouselSection/Carousel";
import Goals from "../components/NewUserView/GoalsSection/Goals";
import About from "../components/NewUserView/AboutSection/About";
import Reviews from "../components/NewUserView/ReviewsSection/Reviews";
import Collaborations from "../components/NewUserView/CollaborationSection/Collaborations";
import Contact from "../components/NewUserView/ContactSection/Contact";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const NewUserView = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}/sessions`);
  };

  useEffect(() => {
  setLoading(true);

  if (!user) {
    setLoading(false);
    return;
  }

  if (user.role === "admin") {
    navigate("/admin-dashboard");
    return;
  }

  if (user.enrolledCourses.length > 0) {
    navigate("/user-dashboard");
    return;
  }

  setLoading(false);
}, [user]);


  if (loading)
    return (
      <div className="h-[80vh] w-screen flex justify-center items-center">
        <FaSpinner className="w-16 h-16 animate-spin" />
      </div>
    );

  return (
    <div className="bg-white space-y-8">
      <CarouselSection />
      <Courses onCourseClick={handleCourseClick} />
      <Goals />
      <Collaborations />
      <About />
      <Reviews />
      <Contact />
    </div>
  );
};

export default NewUserView;
