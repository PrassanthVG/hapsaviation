import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface IntroStepProps {
  onNext: () => void;
}

export default function IntroStep({ onNext }: IntroStepProps) {
  return (
    <Card className="animate-in fade-in-50 duration-500" style={{ 
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      padding: "32px",
      marginBottom: "24px"
    }}>
      <CardContent className="p-0">
        <div className="text-center mb-4">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
            style={{ backgroundColor: "#e0e7ff", color: "#1A4FD3" }}
          >
            ℹ️
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Scholarship Entrance Test Overview
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8">
            Welcome to HAPS Aviation Institute's CPL scholarship entrance test. This comprehensive assessment will evaluate your knowledge and readiness for our Commercial Pilot License program.
          </p>
        </div>

        <div 
          className="rounded-xl p-6 mb-8"
          style={{ backgroundColor: "#f0f4ff" }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            Test Process
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 mt-0.5 flex-shrink-0"
                style={{ backgroundColor: "#1A4FD3" }}
              >
                1
              </div>
              <div>
                <strong>Personal Information</strong><br />
                Provide your basic details and contact information for scholarship application.
              </div>
            </div>
            <div className="flex items-start">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 mt-0.5 flex-shrink-0"
                style={{ backgroundColor: "#1A4FD3" }}
              >
                2
              </div>
              <div>
                <strong>Aviation Knowledge Test</strong><br />
                Complete a 20-question multiple-choice test covering aviation fundamentals, regulations, and safety procedures. Time limit: 30 minutes.
              </div>
            </div>
            <div className="flex items-start">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 mt-0.5 flex-shrink-0"
                style={{ backgroundColor: "#1A4FD3" }}
              >
                3
              </div>
              <div>
                <strong>Results & Next Steps</strong><br />
                View your test score and receive information about the next phase of the scholarship application process.
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
            <strong>Important:</strong> Ensure you have a stable internet connection. The test must be completed in one session. Once you begin the aviation knowledge test, you cannot pause or restart it.
          </p>
        </div>

        <Button 
          onClick={onNext}
          className="w-full sm:w-auto mx-auto block px-6 py-3 text-base font-semibold"
          style={{ 
            backgroundColor: "#5088dd",
            minHeight: "48px"
          }}
        >
          Begin Application
        </Button>
      </CardContent>
    </Card>
  );
}
