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
            Welcome to the HAPS Aviation Institute CPL Scholarship Entrance Test!
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8">
            This test is your first step to join our 4-day free trial and scholarship training program. 
            It helps us understand your current knowledge and passion for aviation, while also qualifying 
            you for the scholarship opportunity.
          </p>
        </div>

        <div 
          className="rounded-xl p-6 mb-8"
          style={{ backgroundColor: "#f0f4ff" }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            Process Overview:
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
                Complete this online Entrance & Eligibility Test (30 questions, 30 mins). This is a mix of aviation basics, situational questions, and motivation.
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
                Once you pass, you will be invited to a 4-day free trial and scholarship training class, where you will get hands-on exposure to pilot training essentials, study materials, and mentorship.
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
                After completing the trial class, you will appear for a final scholarship exam to compete for available scholarship seats.
              </div>
            </div>
            <div className="flex items-start">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 mt-0.5 flex-shrink-0"
                style={{ backgroundColor: "#1A4FD3" }}
              >
                4
              </div>
              <div>
                Successful candidates will be offered admission into the HAPS Aviation Institute CPL program with scholarship benefits.
              </div>
            </div>
          </div>
          
          <p style={{ textAlign: "center", color: "#666", marginTop: "32px", marginBottom: "32px" }}>
            This process helps us identify motivated and capable candidates who are genuinely interested in a flying career. 
            It also allows you to experience the training before committing.
          </p>
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
          🚀 Start my pilot journey
        </Button>
      </CardContent>
    </Card>
  );
}
