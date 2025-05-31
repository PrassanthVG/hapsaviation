import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TestResult } from "@/pages/quiz";

interface ResultsStepProps {
  testResult: TestResult;
  onRestart: () => void;
}

export default function ResultsStep({ testResult, onRestart }: ResultsStepProps) {
  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) {
      return "Outstanding! You've demonstrated exceptional aviation knowledge.";
    } else if (percentage >= 80) {
      return "Excellent work! You've shown strong aviation fundamentals.";
    } else if (percentage >= 70) {
      return "Good job! You have a solid foundation in aviation knowledge.";
    } else if (percentage >= 60) {
      return "Fair performance. Consider additional study before pursuing your CPL.";
    } else {
      return "We recommend additional study and practice before applying for the CPL program.";
    }
  };

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
            🎉
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Test Results
          </h2>
          
          <div className="text-center mb-8">
            <div className="text-5xl font-bold mb-4" style={{ color: "#1A4FD3" }}>
              {testResult.percentage}%
            </div>
            <div className="text-xl text-gray-600 mb-6">
              {getScoreMessage(testResult.percentage)}
            </div>
          </div>
        </div>

        <div 
          className="rounded-xl p-6 mb-8"
          style={{ backgroundColor: "#f0f4ff" }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            Your Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 mt-0.5 flex-shrink-0"
                style={{ backgroundColor: "#16a34a" }}
              >
                ✓
              </div>
              <div>
                <strong>Score:</strong> {testResult.score} out of {testResult.totalQuestions} questions correct
              </div>
            </div>
            <div className="flex items-start">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 mt-0.5 flex-shrink-0"
                style={{ backgroundColor: "#1A4FD3" }}
              >
                📋
              </div>
              <div>
                <strong>Application Status:</strong> Your scholarship application has been submitted for review.
              </div>
            </div>
            <div className="flex items-start">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 mt-0.5 flex-shrink-0"
                style={{ backgroundColor: "#1A4FD3" }}
              >
                📧
              </div>
              <div>
                <strong>Next Steps:</strong> You will receive an email within 5-7 business days with information about the interview process.
              </div>
            </div>
          </div>
        </div>

        <div 
          className="border-l-4 p-4 rounded-lg mb-8"
          style={{ 
            backgroundColor: "#fef3c7",
            borderLeftColor: "#f59e0b"
          }}
        >
          <p className="text-amber-800 font-medium">
            <strong>Reference Number:</strong> {testResult.referenceNumber}<br />
            Please save this reference number for your records.
          </p>
        </div>

        <div 
          className="rounded-xl p-5 text-center mb-6"
          style={{ backgroundColor: "#f9fafb" }}
        >
          <p className="text-gray-600 mb-3">Questions about your application?</p>
          <a href="mailto:admissions@hapsaviation.edu" className="text-blue-600 font-medium hover:underline">
            admissions@hapsaviation.edu
          </a>
          <span className="text-gray-400 mx-2">|</span>
          <a href="tel:+1-555-AVIATION" className="text-blue-600 font-medium hover:underline">
            +1-555-AVIATION
          </a>
        </div>

        <Button 
          onClick={onRestart}
          variant="secondary"
          className="w-full sm:w-auto mx-auto block"
        >
          Take Test Again
        </Button>
      </CardContent>
    </Card>
  );
}
