import Courses from "./CourseSection/Courses";
import CarouselSection from "./CarouselSection/Carousel";
import Goals from "./GoalsSection/Goals";
import About from "./AboutSection/About";
import Reviews from "./ReviewsSection/Reviews";
import Collaborations from "./CollaborationSection/Collaborations";
import Contact from "./ContactSection/Contact";

interface NewUserViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  onCourseClick: (courseId: string) => void;
}

const NewUserView = ({ user, onCourseClick }: NewUserViewProps) => {
  return (
    <div className=" bg-white min-h-screen space-y-8 ">
      {/* Carousel Section */}
      <CarouselSection />
      {/* Courses Section */}
      <Courses onCourseClick={onCourseClick} user={user} />
      {/*Goals Section*/}
      <Goals />
      {/*Collaboration Section*/}
      <Collaborations />
      {/*About Section*/}
      <About />
      {/*Review Section*/}
      <Reviews />
      {/*Contact Section*/}
      <Contact />
    </div>
  );
};

export default NewUserView;
