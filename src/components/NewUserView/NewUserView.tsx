import Courses from "./CourseSection/Courses";
import CarouselSection from "./CarouselSection/Carousel";
import Goals from "./GoalsSection/Goals";
import About from "./AboutSection/About";
import Reviews from "./ReviewsSection/Reviews";
import Collaborations from "./CollaborationSection/Collaborations";

interface NewUserViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  onCourseClick: (courseId: string) => void;
}

const NewUserView = ({ user, onCourseClick }: NewUserViewProps) => {
  return (
    <div className=" from-blue-50 via-white to-gray-0 min-h-screen space-y-8 ">
      {/* Carousel Section */}
      <CarouselSection />
      {/* Courses Section */}
      <Courses onCourseClick={onCourseClick} user={user} />
      {/*Goals Section*/}
      <Goals />
      {/*Review Section*/}
      <Reviews />
      {/*Collaboration Section*/}
      <Collaborations />
      {/*About Section*/}
      <About />
    </div>
  );
};

export default NewUserView;
