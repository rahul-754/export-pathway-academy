import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Question = {
  id: string;
  question: string;
  marks: number;
  type: "MCQ" | "MSQ";
  choices: string[];
  correctAnswers: number[]; // indices of correct answers
  // explanation?: string;
};

type Quiz = {
  id: string;
  title: string;
  maxAttempts: number;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  settings: {
    showAnswers: boolean;
    shuffleQuestions: boolean;
  };
  questions: Question[];
};

function QuestionForm({
  onSubmit,
  onClose,
  existingQuestion,
}: {
  onSubmit: (question: Omit<Question, "id">) => void;
  onClose: () => void;
  existingQuestion?: Question;
}) {
  const [question, setQuestion] = useState(existingQuestion?.question || "");
  const [type, setType] = useState<"MCQ" | "MSQ">(
    existingQuestion?.type || "MCQ"
  );
  const [marks, setMarks] = useState(existingQuestion?.marks || 1);
  const [choices, setChoices] = useState(
    existingQuestion?.choices || ["", "", "", ""]
  );
  const [correctAnswers, setCorrectAnswers] = useState<number[]>(
    existingQuestion?.correctAnswers || []
  );

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const removeChoice = (index: number) => {
    if (choices.length > 2) {
      const newChoices = choices.filter((_, i) => i !== index);
      setChoices(newChoices);
      // Update correct answers if they reference removed choices
      setCorrectAnswers((prev) =>
        prev
          .filter((idx) => idx !== index)
          .map((idx) => (idx > index ? idx - 1 : idx))
      );
    }
  };

  useEffect(() => {
    setCorrectAnswers([]);
  }, [type]);

  const updateChoice = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const toggleCorrectAnswer = (index: number) => {
    if (type === "MCQ") {
      setCorrectAnswers([index]);
    } else {
      setCorrectAnswers((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }
  };

  const handleSubmit = () => {
    if (
      !question.trim() ||
      choices.filter((c) => c.trim()).length < 2 ||
      correctAnswers.length === 0
    ) {
      alert("Please fill in all required fields");
      return;
    }

    onSubmit({
      question: question.trim(),
      type,
      marks,
      choices: choices.filter((c) => c.trim()),
      correctAnswers,
    });
    onClose();
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto p-5">
      {/* Question Type and Marks */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Question Type</Label>
          <Select
            value={type}
            onValueChange={(value: "MCQ" | "MSQ") => setType(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MCQ">
                Multiple Choice (Single Answer)
              </SelectItem>
              <SelectItem value="MSQ">
                Multiple Select (Multiple Answers)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="marks">Marks</Label>
          <Input
            id="marks"
            type="number"
            min="1"
            value={marks}
            onChange={(e) => setMarks(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      {/* Question Input */}
      <div className="space-y-2">
        <Label htmlFor="question">Question *</Label>
        <Textarea
          id="question"
          placeholder="Enter your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[80px] resize-none"
        />
      </div>

      {/* Choices Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Answer Choices *</Label>
          {choices.length < 4 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addChoice}
              className="h-8 px-3 text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Choice
            </Button>
          )}
        </div>

        {choices.map((choice, index) => (
          <div key={index} className="flex items-center gap-2">
            <Checkbox
              checked={correctAnswers.includes(index)}
              onCheckedChange={() => toggleCorrectAnswer(index)}
            />
            <div className="flex-1">
              <Input
                placeholder={`Choice ${index + 1}`}
                value={choice}
                onChange={(e) => updateChoice(index, e.target.value)}
                className="h-9"
              />
            </div>
            {choices.length > 2 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeChoice(index)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <p className="text-xs text-muted-foreground">
          Check the box next to correct answer(s). For MCQ, select one. For MSQ,
          select multiple.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button onClick={handleSubmit} className="flex-1">
          {existingQuestion ? "Update Question" : "Add Question"}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default function Quizes({
  setFullscreen,
}: {
  setFullscreen: Dispatch<SetStateAction<boolean>>;
}) {
  const [quizes, setQuizes] = useState<Quiz[]>([
    {
      id: "1",
      title: "AI bootcamp for exporters Basic",
      duration: 1,
      maxAttempts: 4,
      passingMarks: 5,
      totalMarks: 10,
      questions: [],
      settings: {
        showAnswers: false,
        shuffleQuestions: true,
      },
    },
  ]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const addNewQuiz = () => {
    setQuizes((state) => [
      ...state,
      {
        id: (quizes.length + 1).toString(),
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
      },
    ]);
  };

  const selectQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setFullscreen(true);
  };

  const addQuestion = (questionData: Omit<Question, "id">) => {
    if (!selectedQuiz) return;

    const newQuestion: Question = {
      ...questionData,
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    const updatedQuiz = {
      ...selectedQuiz,
      questions: [...selectedQuiz.questions, newQuestion],
      totalMarks: selectedQuiz.totalMarks + questionData.marks,
    };

    setSelectedQuiz(updatedQuiz);
    setQuizes((prev) =>
      prev.map((q) => (q.id === selectedQuiz.id ? updatedQuiz : q))
    );
  };

  const updateQuestion = (questionData: Omit<Question, "id">) => {
    if (!selectedQuiz || !editingQuestion) return;

    const updatedQuestion: Question = {
      ...questionData,
      id: editingQuestion.id,
    };

    const updatedQuiz = {
      ...selectedQuiz,
      questions: selectedQuiz.questions.map((q) =>
        q.id === editingQuestion.id ? updatedQuestion : q
      ),
      totalMarks:
        selectedQuiz.totalMarks - editingQuestion.marks + questionData.marks,
    };

    setSelectedQuiz(updatedQuiz);
    setQuizes((prev) =>
      prev.map((q) => (q.id === selectedQuiz.id ? updatedQuiz : q))
    );
    setEditingQuestion(null);
  };

  const deleteQuestion = (questionId: string) => {
    if (!selectedQuiz) return;

    const questionToDelete = selectedQuiz.questions.find(
      (q) => q.id === questionId
    );
    if (!questionToDelete) return;

    const updatedQuiz = {
      ...selectedQuiz,
      questions: selectedQuiz.questions.filter((q) => q.id !== questionId),
      totalMarks: selectedQuiz.totalMarks - questionToDelete.marks,
    };

    setSelectedQuiz(updatedQuiz);
    setQuizes((prev) =>
      prev.map((q) => (q.id === selectedQuiz.id ? updatedQuiz : q))
    );
  };

  const openNewQuestionDialog = () => {
    setEditingQuestion(null);
    setIsQuestionDialogOpen(true);
  };

  const openEditQuestionDialog = (question: Question) => {
    setEditingQuestion(question);
    setIsQuestionDialogOpen(true);
  };

  if (!selectedQuiz)
    return (
      <>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Quiz Management</h3>
          <Button variant="default" onClick={addNewQuiz}>
            <Plus />
            New Quiz
          </Button>
        </div>

        <div className="grid gap-4">
          {quizes.map((quiz) => (
            <Card
              key={quiz.id}
              className="cursor-pointer"
              onClick={() => selectQuiz(quiz)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    Title : {quiz.title}
                  </CardTitle>
                  <Badge variant="outline">
                    Max attempts : {quiz.maxAttempts}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span>Total marks : {quiz.totalMarks}</span>
                  <span>Pass Marks : {quiz.passingMarks}</span>
                  <span>Questions : {quiz.questions.length}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    );

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 h-[70vh] overflow-y-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Quiz Editor</CardTitle>
          <Button
            variant="outline"
            onClick={() => {
              setFullscreen(false);
              setSelectedQuiz(null);
            }}
          >
            Back to Quizzes
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={selectedQuiz.title}
            onChange={(e) =>
              setSelectedQuiz((state) =>
                state ? { ...state, title: e.target.value } : null
              )
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maxAttempts">Maximum Attempts</Label>
            <Input
              id="maxAttempts"
              type="number"
              value={selectedQuiz.maxAttempts}
              onChange={(e) =>
                setSelectedQuiz((state) =>
                  state
                    ? { ...state, maxAttempts: parseInt(e.target.value) || 0 }
                    : null
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration (in minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={selectedQuiz.duration}
              onChange={(e) =>
                setSelectedQuiz((state) =>
                  state
                    ? { ...state, duration: parseInt(e.target.value) || 0 }
                    : null
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="totalMarks">Total Marks</Label>
            <Input
              id="totalMarks"
              type="number"
              value={selectedQuiz.totalMarks}
              onChange={(e) =>
                setSelectedQuiz((state) =>
                  state
                    ? { ...state, totalMarks: parseInt(e.target.value) || 0 }
                    : null
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="passingMarks">Passing Marks</Label>
            <Input
              id="passingMarks"
              type="number"
              value={selectedQuiz.passingMarks}
              onChange={(e) =>
                setSelectedQuiz((state) =>
                  state
                    ? { ...state, passingMarks: parseInt(e.target.value) || 0 }
                    : null
                )
              }
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label>Settings</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showAnswers"
                checked={selectedQuiz.settings.showAnswers}
                onCheckedChange={(checked) =>
                  setSelectedQuiz((state) =>
                    state
                      ? {
                          ...state,
                          settings: {
                            ...state.settings,
                            showAnswers: Boolean(checked),
                          },
                        }
                      : null
                  )
                }
              />
              <Label htmlFor="showAnswers">Show Answers</Label>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Shuffle Settings</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="shuffleQuestions"
              checked={selectedQuiz.settings.shuffleQuestions}
              onCheckedChange={(checked) =>
                setSelectedQuiz((state) =>
                  state
                    ? {
                        ...state,
                        settings: {
                          ...state.settings,
                          shuffleQuestions: Boolean(checked),
                        },
                      }
                    : null
                )
              }
            />
            <Label htmlFor="shuffleQuestions">Shuffle Questions</Label>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex justify-between items-center mb-4">
            <Label>Questions ({selectedQuiz.questions.length})</Label>
            <Dialog
              open={isQuestionDialogOpen}
              onOpenChange={setIsQuestionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" onClick={openNewQuestionDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingQuestion ? "Edit Question" : "Add New Question"}
                  </DialogTitle>
                </DialogHeader>
                <QuestionForm
                  onSubmit={editingQuestion ? updateQuestion : addQuestion}
                  onClose={() => setIsQuestionDialogOpen(false)}
                  existingQuestion={editingQuestion || undefined}
                />
              </DialogContent>
            </Dialog>
          </div>

          {selectedQuiz.questions.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-2">
              No questions added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {selectedQuiz.questions.map((q, index) => (
                <Card key={q.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">{q.type}</Badge>
                          <span className="text-sm font-medium">
                            {q.marks} marks
                          </span>
                        </div>
                        <p className="font-medium">
                          {index + 1}. {q.question}
                        </p>
                        <div className="space-y-1">
                          {q.choices.map((choice, choiceIndex) => (
                            <div
                              key={choiceIndex}
                              className="flex items-center gap-2 text-sm"
                            >
                              <span
                                className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                                  q.correctAnswers.includes(choiceIndex)
                                    ? "bg-green-100 border-green-500 text-green-700"
                                    : "border-gray-300"
                                }`}
                              >
                                {String.fromCharCode(65 + choiceIndex)}
                              </span>
                              <span
                                className={
                                  q.correctAnswers.includes(choiceIndex)
                                    ? "font-medium"
                                    : ""
                                }
                              >
                                {choice}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditQuestionDialog(q)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteQuestion(q.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
