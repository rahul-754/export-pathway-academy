/* eslint-disable @typescript-eslint/no-explicit-any */
import { createQuizWithSessionId, getCourseById } from "@/Apis/Apis";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Edit,
  Eye,
  EyeClosed,
  LucideZoomIn,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import { useLayoutEffect, useState } from "react";
import Quizes, { Quiz } from "./Quizes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaSpinner } from "react-icons/fa";

export type Session = {
  _id: string;
  title: string;
  description: string;
  quiz: Quiz;
};

type Course = {
  _id: string;
  title: string;
  sessionsCount: number;
  enrolledUsersCount: number;
  status: "active" | "inactive";
};

export default function CourseCard({
  course,
  handleEditCourse,
}: {
  course: Course;
  handleEditCourse: (course: Course) => void;
}) {
  const [viewSession, setViewSession] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [creatingNewQuizes, setCreatingNewQuizes] = useState(new Set());

  useLayoutEffect(() => {
    const fetchSessions = async () => {
      try {
        const { sessions } = await getCourseById(course._id);
        setSessions(sessions);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      }
    };
    fetchSessions();
  }, [course._id, viewSession]);

  const addQuiz = async (session: Session) => {
    const newQuiz = {
      title: "Untitled",
      duration: 0,
      maxAttempts: 0,
      passingMarks: 0,
      totalMarks: 0,
      questions: [],
      settings: {
        showAnswers: false,
        shuffleQuestions: false,
      },
    };
    setCreatingNewQuizes((state) => {
      const temp = new Set(state);
      temp.add(session._id);
      return temp;
    });
    try {
      const { _id } = await createQuizWithSessionId(session._id, newQuiz);
      setSessions((prevSessions) =>
        prevSessions.map((ses) =>
          ses._id === session._id ? { ...ses, quiz: _id } : ses
        )
      );

      setCreatingNewQuizes((state) => {
        const temp = new Set(state);
        temp.delete(session._id);
        return temp;
      });
    } catch (e) {
      console.error("Failed to add new quiz:", e);
      setCreatingNewQuizes((state) => {
        const temp = new Set(state);
        temp.delete(session._id);
        return temp;
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <CardDescription>
              {course.sessionsCount} sessions • {course.enrolledUsersCount}{" "}
              enrolled
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={course.status === "active" ? "default" : "secondary"}
            >
              {course.status}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewSession((state) => !state)}
            >
              {viewSession ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeClosed className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditCourse(course)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {viewSession && (
        <>
          <CardContent>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4 mr-1" />
                Add Session
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-1" />
                Analytics
              </Button>
            </div>
          </CardContent>

          <CardContent>
            <div className="border-t py-5">
              <CardTitle className="text-lg mb-5">Sessions</CardTitle>
              {sessions.map((session, index) => (
                <Card key={session._id} className="mt-5 p-5">
                  <div className="w-full flex justify-between items-center">
                    <CardTitle className="text-md font-medium mb-3">
                      <Badge className="rounded-lg " variant="secondary">
                        Session {index + 1}
                      </Badge>
                      &nbsp; {session.title}
                    </CardTitle>
                    <div className="flex gap-2 items-center">
                      <Dialog>
                        {session.quiz ? (
                          <DialogTrigger asChild>
                            <Button className="h-7 rounded-full p-0 px-2">
                              <LucideZoomIn className="text-white w-4 h-4" />
                              Show Quiz
                            </Button>
                          </DialogTrigger>
                        ) : (
                          <Button
                            onClick={() => addQuiz(session)}
                            disabled={creatingNewQuizes.has(session._id)}
                            className="h-7 rounded-full p-0 px-2"
                          >
                            {creatingNewQuizes.has(session._id) ? (
                              <FaSpinner className="animate-spin w-10 h-10" />
                            ) : (
                              <Plus className="text-white w-4 h-4" />
                            )}
                            <span>
                              {creatingNewQuizes.has(session._id)
                                ? "Creating"
                                : "Create"}{" "}
                              Quiz
                            </span>
                          </Button>
                        )}
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>
                              Quiz for Session {index + 1}
                            </DialogTitle>
                          </DialogHeader>
                          <Quizes session={session} setSessions={setSessions} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <CardContent className="text-sm w-4/6 pl-0 pb-0">
                    {session.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
