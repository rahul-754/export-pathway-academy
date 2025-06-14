import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Star, ArrowRight, Check } from "lucide-react";

const CardElement = ({
  course,
  onCourseClick,
  reverse,
}: {
  reverse: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCourseClick: any;
}) => {
  return (
    <Card
      className={`flex lg:flex-row flex-col-reverse ${
        reverse && "lg:flex-row-reverse flex-col-reverse"
      } lg:items-center md:gap-5 lg:px-10 py-5 bg-neutral-50 border`}
    >
      <div className="lg:w-[calc(100%-500px)] w-full md:gap-3 gap-0 flex flex-col justify-between">
        <CardHeader className="md:space-y-3 space-y-1">
          <Badge className=" w-fit rounded-lg p-2 px-4">
            <Video className="h-4 w-4 mr-3" />
            {course.sessionsCount} sessions
          </Badge>
          <CardTitle className="md:text-4xl text-2xl font-bold text-gray-800">
            {course.title}
          </CardTitle>
          <CardDescription className="md:text-xl text-sm md:block hidden text-gray-600">
            {course.courseDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="md:space-y-3 space-y-2 -mt-4">
          <div className="md:flex hidden flex-wrap gap-2 items-center md:mb-4">
            <Badge className="flex items-center gap-2 p-2 px-3">
              <Star fill="#ea580c" stroke="#ea580c" className="w-4 h-4" />
              <span>{course.ratingScore}</span>
            </Badge>
            <Badge className="inline space-x-2 p-2 px-3">
              <span>{course.rating} ratings</span>
            </Badge>
          </div>

          <h3 className="md:text-xl text-md font-bold">What you'll learn</h3>
          {/* <h5 className="text-md">
            30+ AI Tools & Strategies for Export Growth, Market Analysis,
            Logistics Optimization | Basic Machine Learning, Data Analytics,
            Trade Intelligence
          </h5> */}
          <ul className="space-y-2 md:text-md sm:text-sm text-xs">
            {course.learnings.map((learning, index) => {
              return (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>{learning}</span>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </div>
      <div className="lg:px-0 px-5 md:w-[500px] w-full">
        <div className="w-full bg-gray-100 relative">
          <img
            src={course.courseImg}
            alt={course.title}
            className="w-full aspect-video object-cover rounded-xl"
          />
          <div className="absolute top-2 right-2">
            <Badge>{course.level}</Badge>
          </div>
        </div>
        <Button
          className="w-full bg-blue-600 text-white !mt-7 hover:bg-blue-700 transition-colors"
          onClick={() => onCourseClick(course._id)}
        >
          View Sessions & Enroll
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default CardElement;
