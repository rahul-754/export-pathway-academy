import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  AwardIcon,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Lock,
  LockIcon,
  LockOpen,
  Play,
  Presentation,
  Video,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import { motion, AnimatePresence } from "framer-motion";

interface SessionCardProps {
  session: any;
  index: number;
  inCart: boolean;
  isAccessible: boolean;
  isCompleted: boolean;
  remainingDays: number | null;
  quizStatus: 'passed' | 'failed' | 'not-attempted';
  attemptsMade: number;
  addToCart: (sessionId: string) => void;
  handleWatchPreview: () => void;
  handleWatchFullVideo: (videoUrl: string) => void;
  handleViewMaterial: (materialUrl: string, type: string) => void;
  handleQuizOpen: (sessionId: string) => void;
}

export default function SessionCard({
  session,
  index,
  inCart,
  isAccessible,
  isCompleted,
  remainingDays,
  addToCart,
  handleWatchPreview,
  handleWatchFullVideo,
  handleViewMaterial,
  handleQuizOpen,
  quizStatus,
  attemptsMade,
}: SessionCardProps) {
  const { isAuthenticated, user } = useUser();
  const [open, setOpen] = useState(false);

  const durations = ["2 hours", "2 hours", "2 hours"]; // Each session is 2 hours
  const totalCourseDuration = "10 hours"; // Basic total course duration

  return (
    <Card key={session._id} className="overflow-hidden mb-5">
      <CardHeader>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-10 relative">
          {/* LEFT: Image + Title + Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="w-full sm:w-[180px] lg:w-[250px] aspect-video relative">
              <img
                src={session.sessionImage}
                alt={session.title}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                {isAccessible && isCompleted && (
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 hover:bg-green-600 hover:text-white p-1 rounded-full transition-colors" />
                )}
                <Badge variant="outline" className="w-fit space-x-2">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 font-bold text-black p-1 rounded-full transition-colors" />
                  <span className="text-sm text-black font-bold">
                    {durations[index] || "2 hours"}
                  </span>
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-blue-600 z-0 select-none">
                Session {index + 1}
              </h2>
              <CardTitle
                className="text-xl sm:text-2xl lg:text-3xl max-w-[700px] text-ellipsis tracking-tighter font-semibold mb-2 line-clamp-2"
              >
                {session.title}
              </CardTitle>
              {/* <Button
                variant="link"
                onClick={() => setOpen(!open)}
                className="p-0 h-auto text-blue-600 justify-start"
              >
                {open ? "Hide Details" : "View Details"}
              </Button> */}

              {!isAccessible ? (
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-amber-500 font-bold" />
                  <span className="mr-2 text-amber-500">Locked</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-2">
                  <LockOpen className="h-4 w-4 text-green-500 font-bold" />
                  <span className="mr-2 text-green-500">Unlocked</span>

                  {/* ✅ Session expiry display */}
                  {remainingDays !== null && remainingDays > 0 && (
                    <span className="text-sm text-gray-700 ml-2">
                      (Expires in {remainingDays} day{remainingDays > 1 ? "s" : ""})
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 sm:gap-4">
                {isAuthenticated ? (
                  <>
                    {!isAccessible && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={`border-blue-700 text-blue-900 font-bold hover:bg-blue-50 flex items-center ${
                          inCart
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : ""
                        }`}
                        onClick={() => addToCart(session._id)}
                        disabled={inCart}
                      >
                        {inCart
                          ? "Added to Cart"
                          : `Add to Cart - ${session.price.currency} ${session.price.amount}`}
                      </Button>
                    )}
                  </>
                ) : (
                  <Button variant="outline" disabled>
                    Please login to access
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-900 text-blue-900 font-bold hover:bg-blue-50 flex items-center"
                  onClick={handleWatchPreview}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Preview
                </Button>
                <Button
  variant="link"
  onClick={() => setOpen(!open)}
  className="p-0 h-auto text-blue-600 justify-start flex items-center gap-1"
>
  {open ? (
    <>
      Hide Details
      <ChevronUp className="w-4 h-4" />
    </>
  ) : (
    <>
      View Details
      <ChevronDown className="w-4 h-4" />
    </>
  )}
</Button>
              </div>
            </div>
          </div>

          {/* RIGHT: Action Buttons */}
          {isAuthenticated && (
            <div className="w-full lg:w-auto mt-4 lg:mt-0">
              <div className="flex flex-col gap-2 sm:gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                  disabled={!isAccessible || !session.videoUrl}
                  onClick={() => handleWatchFullVideo(session.videoUrl)}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Watch Video
                  {!isAccessible && (
                    <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                  disabled={!isAccessible || !session.notes}
                  onClick={() => handleViewMaterial(session.notes, 'notes')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Session Material
                  {!isAccessible && (
                    <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                  disabled={!isAccessible || !session.ppt}
                  onClick={() => handleViewMaterial(session.ppt, 'ppt')}
                >
                  <Presentation className="h-4 w-4 mr-2" />
                  View PPT
                  {!isAccessible && (
                    <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={
                    !isAccessible ||
                    !session.quiz ||
                    quizStatus === "passed" ||
                    attemptsMade >= 5
                  }
                  onClick={() => handleQuizOpen(session._id)}
                  className={`w-full justify-start ${
                    quizStatus === "passed"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : ""
                  }`}
                >
                  <AwardIcon className="h-4 w-4 mr-2" />
                  {quizStatus === "passed"
                    ? "Passed"
                    : attemptsMade >= 5
                    ? "Max Attempts Reached"
                    : `Attempt Quiz (${attemptsMade}/5)`}
                  {!isAccessible && quizStatus !== "passed" && (
                    <LockIcon
                      className="h-3 w-3 ml-auto text-blue-800 font-bold"
                    />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expand"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <CardContent className="border-t py-6 sm:py-10">
              <h3 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-5">
                What you'll learn
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {session.learnings.map((learning, index) => {
                  return (
                    <div
                      key={learning._id}
                      className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 shadow-lg border shadow-blue-200/50 rounded-xl w-full space-y-2 relative"
                    >
                      <h3 className="font-bold text-base sm:text-lg lg:text-xl z-[1]">
                        {learning.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-md max-w-[90%] sm:max-w-[85%] lg:max-w-[75%] z-[1]">
                        {learning.description}
                      </p>
                      <span className="absolute bottom-0 right-0 text-7xl sm:text-8xl lg:text-9xl font-bold text-blue-600/20 select-none z-0">
                        {index + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expired Access Message
      {!isAccessible && (
        <div className="text-xs text-red-500 mt-2">
          Access expired. Please re-enroll to continue.
        </div>
      )} */}
    </Card>
  );
}
