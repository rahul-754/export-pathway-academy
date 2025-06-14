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
      className={`flex ${
        reverse && "flex-row-reverse"
      } items-center gap-5  px-10 py-5 bg-neutral-50 border`}
    >
      <div className="w-[calc(100%-500px)] gap-3 flex flex-col justify-between">
        <CardHeader className="space-y-3">
          <Badge className=" w-fit rounded-lg p-2 px-4">
            <Video className="h-4 w-4 mr-3" />
            {course.sessionsCount} sessions
          </Badge>
          <CardTitle className="text-4xl font-bold text-gray-800">
            {course.title}
          </CardTitle>
          <CardDescription className="text-xl text-gray-600">
            {course.courseDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <Badge className="flex items-center gap-2 p-2 px-3">
              <Star fill="#ea580c" stroke="#ea580c" className="w-4 h-4" />
              <span>{course.ratingScore}</span>
            </Badge>
            <Badge className="inline space-x-2 p-2 px-3">
              <span>{course.rating} ratings</span>
            </Badge>
          </div>

          <h3 className="text-xl font-bold">What you'll learn</h3>
          {/* <h5 className="text-md">
            30+ AI Tools & Strategies for Export Growth, Market Analysis,
            Logistics Optimization | Basic Machine Learning, Data Analytics,
            Trade Intelligence
          </h5> */}
          <ul className="space-y-2 text-md">
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
      <div>
        <div className=" bg-gray-100 relative">
          <img
            src={course.courseImg}
            alt={course.title}
            className="max-w-[500px] aspect-video object-cover rounded-xl"
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
