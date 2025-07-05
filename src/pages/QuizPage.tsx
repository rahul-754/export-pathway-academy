import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getQuizWithSessionId } from "@/Apis/Apis";
import UserHeader from "@/components/UserHeader";
import { AlertCircle, Clock, CheckCircle2, BookOpenCheck } from "lucide-react";

// Sample quiz data structure
type Question = {
  _id: string;
  question: string;
  type: "MCQ" | "MSQ";
  choices: string[];
  correctAnswers: number[];
};

type Quiz = {
  _id: string;
  title: string;
  maxAttempts: number;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  questions: Question[];
};

const QuizPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number[] }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Sample quiz data (replace with actual API data)
  const sampleQuiz: Quiz = {
    _id: "1",
    title: "Export Website Development Quiz",
    maxAttempts: 3,
    duration: 15,
    totalMarks: 100,
    passingMarks: 60,
    questions: [
      {
        _id: "q1",
        question: "What is one key benefit of using AI website builders for exporters?",
        type: "MCQ",
        choices: [
          "Requires hiring a full-time developer",
          "Launch a website in under 30 minutes",
          "Manual coding skills needed",
          "Only works for local businesses"
        ],
        correctAnswers: [1]
      },
      {
        _id: "q2",
        question: "Why do exporters need a professional website?",
        type: "MCQ",
        choices: [
          "To increase offline foot traffic",
          "To act as a 24/7 online showroom for products",
          "To avoid social media marketing",
          "To limit buyer inquiries"
        ],
        correctAnswers: [1]
      },
      {
        _id: "q3",
        question: "Which of the following is a challenge with traditional website development?",
        type: "MCQ",
        choices: [
          "Instant AI-generated content",
          "High upfront costs and long timelines",
          "Auto-translation for global visitors",
          "Drag and drop interface"
        ],
        correctAnswers: [1]
      },
      {
        _id: "q4",
        question: "Which AI website builder is best suited for beginners wanting instant sites?",
        type: "MCQ",
        choices: [
          "Wix ADI",
          "ZipWP",
          "Durable.co",
          "Hostinger AI"
        ],
        correctAnswers: [2]
      },
      {
        _id: "q5",
        question: "What should every export website include?",
        type: "MCQ",
        choices: [
          "Only product images, no company info",
          "Inquiry/contact form with WhatsApp link",
          "Homepage with detailed pricing for every product",
          "No social media links"
        ],
        correctAnswers: [1]
      },
      {
        _id: "q6",
        question: "How can ChatGPT help in website content creation?",
        type: "MCQ",
        choices: [
          "Generate formal, globally understandable text",
          "Design product images",
          "Host the website",
          "Handle payment gateways"
        ],
        correctAnswers: [0]
      },
      {
        _id: "q7",
        question: "What is a recommended way to categorize products on an export website?",
        type: "MCQ",
        choices: [
          "Alphabetically by product name only",
          "By HS Code or export categories like FMCG, garments",
          "Random grouping",
          "No categorization needed"
        ],
        correctAnswers: [1]
      },
      {
        _id: "q8",
        question: "Which is a common mistake to avoid when building an export website?",
        type: "MCQ",
        choices: [
          "Including an inquiry form",
          "Using low-resolution product images",
          "Mentioning shipping/payment terms",
          "Using SEO keywords"
        ],
        correctAnswers: [1]
      },
      {
        _id: "q9",
        question: "What is a key feature of AI website builders like Durable.co?",
        type: "MCQ",
        choices: [
          "They require coding knowledge",
          "They auto-generate pre-written sections like About Us",
          "They do not support mobile optimization",
          "They take weeks to launch a site"
        ],
        correctAnswers: [1]
      },
      {
        _id: "q10",
        question: "What is the purpose of integrating WhatsApp with your export website?",
        type: "MCQ",
        choices: [
          "To block buyer inquiries",
          "To enable direct communication and faster deal closure",
          "To replace the website entirely",
          "To avoid buyer contact"
        ],
        correctAnswers: [1]
      }
    ]
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Fetch quiz by sessionId from your API
        const res = await getQuizWithSessionId(sessionId);
        // If your API returns { quiz: {...} }
        setQuiz(res.quiz);
        setTimeLeft((res.quiz.duration || 0) * 60);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [sessionId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started && timeLeft > 0 && !submitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft, submitted]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];
      if (quiz?.questions.find(q => q._id === questionId)?.type === "MCQ") {
        return { ...prev, [questionId]: [answerIndex] };
      } else {
        if (currentAnswers.includes(answerIndex)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter((a) => a !== answerIndex),
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, answerIndex],
          };
        }
      }
    });
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let totalScore = 0;
    quiz.questions.forEach((question) => {
      const userAnswers = answers[question._id] || [];
      const isCorrect = question.correctAnswers.every(
        (ans) => userAnswers.includes(ans)
      ) && userAnswers.length === question.correctAnswers.length;
      if (isCorrect) {
        totalScore += quiz.totalMarks / quiz.questions.length;
      }
    });

    setScore(totalScore);
    setSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading quiz...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="p-6 text-center text-red-500">Quiz not found.</div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <UserHeader />
        <div className="container mx-auto py-12 px-4">
          <Card className="w-full max-w-4xl mx-auto shadow-lg border-0">
            <CardHeader className="bg-white border-b border-gray-200 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-800">{quiz.title}</CardTitle>
                  <p className="text-gray-500 mt-1">Test your knowledge about export website development</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-full">
                  <span className="text-blue-600 font-medium">Quiz</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quiz Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{quiz.duration} minutes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-500">Passing Score</p>
                          <p className="font-medium">{quiz.passingMarks}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpenCheck className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Questions</p>
                          <p className="font-medium">{quiz.questions.length} questions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Instructions</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        Read each question carefully before answering
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        You can navigate between questions using Previous and Next buttons
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        The quiz will automatically submit when time runs out
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        You need {quiz.passingMarks}% to pass the quiz
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpenCheck className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Start?</h3>
                      <p className="text-gray-500">Test your knowledge about export website development</p>
                    </div>
                    <Button 
                      onClick={handleStart}
                      className="w-full py-6 text-lg font-medium bg-blue-600 hover:bg-blue-700"
                    >
                      Start Quiz
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <UserHeader />
        <div className="container mx-auto py-12 px-4">
          <Card className="w-full max-w-4xl mx-auto shadow-lg border-0">
            <CardHeader className="bg-white border-b border-gray-200 rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-gray-800">Quiz Results</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-blue-50">
                  {score >= quiz.passingMarks ? (
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  ) : (
                    <AlertCircle className="h-12 w-12 text-red-600" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {score >= quiz.passingMarks ? "Congratulations!" : "Try Again"}
                </h2>
                <p className="text-gray-600 mb-6">
                  {score >= quiz.passingMarks
                    ? "You have successfully passed the quiz."
                    : "You need to score higher to pass the quiz."}
                </p>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-md mx-auto mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Your Score</span>
                    <span className="text-2xl font-bold text-blue-600">{score.toFixed(0)}%</span>
                  </div>
                  <Progress 
                    value={(score / quiz.totalMarks) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>Passing Score: {quiz.passingMarks}%</span>
                    <span>Total Marks: {quiz.totalMarks}%</span>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate(-1)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Back to Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <UserHeader />
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-4xl mx-auto shadow-lg border-0">
          <CardHeader className="bg-white border-b border-gray-200 rounded-t-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </CardTitle>
                <div className="mt-2">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-600">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{currentQ.question}</h2>
                <RadioGroup
                  value={answers[currentQ._id]?.[0]?.toString() || ""}
                  onValueChange={(value) => handleAnswer(currentQ._id, parseInt(value))}
                  className="space-y-4"
                >
                  {currentQ.choices.map((choice, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`q${currentQ._id}-${index}`}
                        className="text-blue-600"
                      />
                      <Label
                        htmlFor={`q${currentQ._id}-${index}`}
                        className="text-gray-700 cursor-pointer flex-1"
                      >
                        {choice}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6"
                >
                  Previous
                </Button>
                {currentQuestion === quiz.questions.length - 1 ? (
                  <Button 
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 px-6"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      setCurrentQuestion((prev) =>
                        Math.min(quiz.questions.length - 1, prev + 1)
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 px-6"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;