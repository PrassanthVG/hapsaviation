import { useState } from "react";
import IntroStep from "@/components/quiz-steps/intro-step";
import PersonalInfoStep from "@/components/quiz-steps/personal-info-step";
import QuizStep from "@/components/quiz-steps/quiz-step";
import ResultsStep from "@/components/quiz-steps/results-step";

export type QuizStep = "intro" | "personal" | "quiz" | "results";

export interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  education: string;
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  answers: Record<number, number>;
  referenceNumber: string;
}

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState<QuizStep>("intro");
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [personalSubmissionId, setPersonalSubmissionId] = useState<number | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const goToStep = (step: QuizStep) => {
    setCurrentStep(step);
  };

  const handlePersonalSubmit = (data: PersonalData, submissionId: number) => {
    setPersonalData(data);
    setPersonalSubmissionId(submissionId);
    setCurrentStep("quiz");
  };

  const handleTestSubmit = (result: TestResult) => {
    setTestResult(result);
    setCurrentStep("results");
  };

  const resetQuiz = () => {
    setCurrentStep("intro");
    setPersonalData(null);
    setPersonalSubmissionId(null);
    setTestResult(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F7F7" }}>
      <div className="container max-w-4xl mx-auto px-4 py-4 md:px-8 md:py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
            <div className="text-3xl mb-2 sm:mb-0 sm:mr-3" style={{ color: "#1A4FD3" }}>
              ✈️
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              HAPS Aviation Institute - CPL Scholarship Entrance Test
            </h1>
          </div>
          <p className="text-base md:text-lg text-gray-600">
            Complete your application for the Commercial Pilot License scholarship program
          </p>
        </div>

        {/* Progress Indicator */}
        {currentStep !== "intro" && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-800">
                Step {currentStep === "personal" ? "1" : currentStep === "quiz" ? "2" : "3"} of 3
              </span>
              <span className="text-sm font-medium text-gray-800">
                {currentStep === "personal" ? "33" : currentStep === "quiz" ? "66" : "100"}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: "#1A4FD3",
                  width: currentStep === "personal" ? "33%" : currentStep === "quiz" ? "66%" : "100%"
                }}
              />
            </div>
          </div>
        )}

        {/* Step Content */}
        {currentStep === "intro" && <IntroStep onNext={() => goToStep("personal")} />}
        {currentStep === "personal" && (
          <PersonalInfoStep 
            onBack={() => goToStep("intro")}
            onNext={handlePersonalSubmit}
          />
        )}
        {currentStep === "quiz" && personalSubmissionId && (
          <QuizStep
            personalSubmissionId={personalSubmissionId}
            onSubmit={handleTestSubmit}
          />
        )}
        {currentStep === "results" && testResult && (
          <ResultsStep 
            testResult={testResult}
            onRestart={resetQuiz}
          />
        )}
      </div>
    </div>
  );
}
