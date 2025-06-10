import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Star, ArrowRight } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";

const CardElement = ({
  course,
  onCourseClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCourseClick: any;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Popover open={open}>
      <PopoverContent
        align="center"
        side="right"
        className="max-w-[400px] w-full space-y-2 p-10"
      >
        <h3 className="text-xl font-bold">AI Mastery for Exporter Basic</h3>
        <h5 className="text-sm">
          30+ AI Tools & Strategies for Export Growth, Market Analysis,
          Logistics Optimization | Basic Machine Learning, Data Analytics, Trade
          Intelligence
        </h5>
        <ul className=" space-y-1 text-sm">
          <li className="relative pl-8 before:content-['✔'] before:text-green-500 before:absolute before:left-0 before:top-0.5">
            Leverage AI to identify emerging global markets, analyze competitor
            strategies, and discover new customer segments for export success.
          </li>
          <li className="relative pl-8 before:content-['✔'] before:text-green-500 before:absolute before:left-0 before:top-0.5">
            Optimize shipping routes, predict demand fluctuations, and manage
            inventory efficiently using AI-powered analytics to reduce costs and
            delays.
          </li>
          <li className="relative pl-8 before:content-['✔'] before:text-green-500 before:absolute before:left-0 before:top-0.5">
            Utilize AI for basic trade compliance checks, identify potential
            regulatory hurdles, and minimize risks in international
            transactions.
          </li>
        </ul>
      </PopoverContent>
      <PopoverTrigger
        asChild
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <Card
          key={course._id}
          className="overflow-hidden bg-white border border-gray-100 rounded-xl shadow hover:shadow-lg transition-shadow"
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
                <Star fill="#ea580c" stroke="#ea580c" className="w-4 h-4" />
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

            <Button
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={() => onCourseClick(course._id)}
            >
              View Sessions & Enroll
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </PopoverTrigger>
    </Popover>
  );
};

export default CardElement;
