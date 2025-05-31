import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { quizQuestions } from "@/lib/quiz-data";
import { TestResult } from "@/pages/quiz";

interface QuizStepProps {
  personalSubmissionId: number;
  onSubmit: (result: TestResult) => void;
}

export default function QuizStep({ personalSubmissionId, onSubmit }: QuizStepProps) {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/test-result", data);
      return response.json();
    },
    onSuccess: (result) => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const score = calculateScore();
      
      const testResult: TestResult = {
        score: score.correct,
        totalQuestions: quizQuestions.length,
        percentage: score.percentage,
        timeSpent,
        answers,
        referenceNumber: result.referenceNumber,
      };
      
      onSubmit(testResult);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit test. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correct++;
      }
    });
    const percentage = Math.round((correct / quizQuestions.length) * 100);
    return { correct, percentage };
  };

  const handleSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const score = calculateScore();
    const referenceNumber = `HAPS-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    const testData = {
      personalSubmissionId,
      score: score.correct,
      totalQuestions: quizQuestions.length,
      percentage: score.percentage,
      timeSpent,
      answers,
      referenceNumber,
    };

    submitMutation.mutate(testData);
  };

  const selectAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: answerIndex });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const question = quizQuestions[currentQuestion];

  return (
    <Card className="animate-in fade-in-50 duration-500" style={{ 
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      padding: "32px",
      marginBottom: "24px"
    }}>
      <CardContent className="p-0">
        <div className="text-center mb-8">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
            style={{ backgroundColor: "#ecfdf5", color: "#16a34a" }}
          >
            📝
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Aviation Knowledge Test
          </h2>
        </div>

        {/* Quiz Header */}
        <div 
          className="flex justify-between items-center mb-6 p-4 rounded-xl"
          style={{ backgroundColor: "#f8fafc" }}
        >
          <div className="text-center text-gray-600">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
          <div className="flex items-center text-red-500 font-semibold">
            ⏰ Time Remaining: {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Section Badge */}
        <Badge 
          className="mb-4"
          style={{ 
            backgroundColor: "#e0e7ff",
            color: "#3730a3",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "500"
          }}
        >
          {question.section}
        </Badge>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {question.question}
          </h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                  answers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-500'
                }`}
                onClick={() => selectAnswer(index)}
              >
                <div 
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 relative ${
                    answers[currentQuestion] === index
                      ? 'border-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {answers[currentQuestion] === index && (
                    <div 
                      className="w-2.5 h-2.5 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ backgroundColor: "#1A4FD3" }}
                    />
                  )}
                </div>
                <div className="flex-1 text-base">
                  <span className="font-semibold mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="w-full sm:w-auto"
          >
            ← Previous Question
          </Button>
          
          <div className="text-center text-gray-600 text-sm order-first sm:order-none">
            {answeredCount} of {quizQuestions.length} answered
          </div>
          
          {currentQuestion === quizQuestions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={submitMutation.isPending}
              className="w-full sm:w-auto"
              style={{ backgroundColor: "#16a34a" }}
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Test"}
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              className="w-full sm:w-auto"
              style={{ backgroundColor: "#5088dd" }}
            >
              Next Question →
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
