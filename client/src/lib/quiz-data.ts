export interface QuizQuestion {
  id: number;
  section: string;
  question: string;
  options: string[];
  correct: number;
}

export const quizQuestions: QuizQuestion[] = [
  // CPL & Aviation Basics (20 Questions)
  {
    id: 1,
    section: "CPL & Aviation Basics",
    question: "What is the full form of CPL in aviation?",
    options: ["Commercial Pilot License", "Civil Pilot License", "Certified Private License", "Commercial Passenger Line"],
    correct: 0
  },
  {
    id: 2,
    section: "CPL & Aviation Basics",
    question: "What is the minimum age to apply for a CPL in India?",
    options: ["17", "18", "21", "25"],
    correct: 1
  },
  {
    id: 3,
    section: "CPL & Aviation Basics",
    question: "How many total flying hours are required to be eligible for CPL in India?",
    options: ["100 hours", "150 hours", "200 hours", "250 hours"],
    correct: 2
  },
  {
    id: 4,
    section: "CPL & Aviation Basics",
    question: "What are the mandatory subjects you must pass for a CPL?",
    options: ["Geography, Chemistry", "Physics, Maths", "Air Regulation, Navigation, Meteorology", "Biology, History"],
    correct: 2
  },
  {
    id: 5,
    section: "CPL & Aviation Basics",
    question: "DGCA stands for:",
    options: ["Directorate General of Civil Aviation", "Delhi General Cargo Authority", "Department of Global Civil Aircraft", "Directorate of Government Charter Aircraft"],
    correct: 0
  },
  {
    id: 6,
    section: "CPL & Aviation Basics",
    question: "What is a logbook used for in aviation?",
    options: ["To log aircraft speed", "To track passenger data", "To record flight hours and experience", "To save emergency contacts"],
    correct: 2
  },
  {
    id: 7,
    section: "CPL & Aviation Basics",
    question: "Which document allows you to fly solo as a student pilot?",
    options: ["DGCA Letter", "Student Pilot License", "CPL", "Ground School Certificate"],
    correct: 1
  },
  {
    id: 8,
    section: "CPL & Aviation Basics",
    question: "What is the purpose of a checkride?",
    options: ["To go on vacation", "To test an aircraft", "To evaluate a pilot's skill for licensing", "To collect weather data"],
    correct: 2
  },
  {
    id: 9,
    section: "CPL & Aviation Basics",
    question: "What is the role of a Flight Instructor?",
    options: ["Ground duty officer", "Engine mechanic", "To train and supervise student pilots", "To approve airport designs"],
    correct: 2
  },
  {
    id: 10,
    section: "CPL & Aviation Basics",
    question: "What is \"controlled airspace\"?",
    options: ["An airspace with free movement", "Where ATC clearance is needed", "Military-only zone", "A temporary air corridor"],
    correct: 1
  },
  {
    id: 11,
    section: "CPL & Aviation Basics",
    question: "What does a \"crosswind\" mean during takeoff or landing?",
    options: ["Wind from directly behind", "Wind from the side", "Wind from above", "No wind"],
    correct: 1
  },
  {
    id: 12,
    section: "CPL & Aviation Basics",
    question: "What is a NOTAM?",
    options: ["Flight time log", "Weather forecast", "Notice to Airmen about hazards or changes", "Passenger safety manual"],
    correct: 2
  },
  {
    id: 13,
    section: "CPL & Aviation Basics",
    question: "How many types of licenses exist in Indian aviation for pilots?",
    options: ["1", "2", "3 (SPL, PPL, CPL)", "Unlimited"],
    correct: 2
  },
  {
    id: 14,
    section: "CPL & Aviation Basics",
    question: "What is the visibility requirement to fly under VFR?",
    options: ["1 km", "3 km", "5 km", "8 km"],
    correct: 2
  },
  {
    id: 15,
    section: "CPL & Aviation Basics",
    question: "What is the basic fuel requirement for VFR day flight?",
    options: ["45 minutes reserve", "30 minutes reserve", "1 hour reserve", "2 hours reserve"],
    correct: 0
  },
  {
    id: 16,
    section: "CPL & Aviation Basics",
    question: "Who controls Indian aviation licensing?",
    options: ["IAF", "DGCA", "Ministry of Defense", "Airport Authority"],
    correct: 1
  },
  {
    id: 17,
    section: "CPL & Aviation Basics",
    question: "What is the first step to becoming a commercial pilot?",
    options: ["Buy aircraft", "Get Class 1 Medical", "Study ground subjects", "Start flying"],
    correct: 1
  },
  {
    id: 18,
    section: "CPL & Aviation Basics",
    question: "Which instrument helps maintain level flight?",
    options: ["Altimeter", "Attitude Indicator", "Compass", "Speed Indicator"],
    correct: 1
  },
  {
    id: 19,
    section: "CPL & Aviation Basics",
    question: "What does a red light from the control tower mean on ground?",
    options: ["Taxi", "Take off", "Stop", "Emergency"],
    correct: 2
  },
  {
    id: 20,
    section: "CPL & Aviation Basics",
    question: "What is the role of ATC (Air Traffic Control)?",
    options: ["Selling tickets", "Maintaining aircraft", "Managing air traffic safely", "Weather reporting"],
    correct: 2
  },
  // Situational Awareness (5 Questions)
  {
    id: 21,
    section: "Behavior & Situational Awareness",
    question: "You are on a solo flight and notice the weather is getting worse than forecasted. What should you do?",
    options: ["Continue and hope for the best", "Land at the nearest suitable airport", "Turn around immediately", "Call someone for advice"],
    correct: 1
  },
  {
    id: 22,
    section: "Behavior & Situational Awareness",
    question: "During your flight, you notice an unusual engine sound. Your response?",
    options: ["Ignore it", "Land immediately at nearest airport", "Increase power to test", "Continue and monitor"],
    correct: 1
  },
  {
    id: 23,
    section: "Behavior & Situational Awareness",
    question: "You realize you are lost during a cross-country flight. What is your first action?",
    options: ["Panic", "Climb to get better radio reception and navigate", "Land anywhere", "Call emergency"],
    correct: 1
  },
  {
    id: 24,
    section: "Behavior & Situational Awareness",
    question: "How do you handle a situation where you disagree with ATC instructions?",
    options: ["Ignore ATC", "Follow ATC and clarify later", "Argue with ATC", "Do what you think is right"],
    correct: 1
  },
  {
    id: 25,
    section: "Behavior & Situational Awareness",
    question: "Which quality do you think is most important for a pilot?",
    options: ["Discipline", "Responsibility", "Situational Awareness", "All of the above"],
    correct: 3
  },
  // Motivation & Goal Alignment (5 Questions)
  {
    id: 26,
    section: "Motivation & Goal Alignment",
    question: "Why do you want to become a pilot?",
    options: ["For prestige", "Because my family forced me", "Passion for flying and career in aviation", "To avoid other jobs"],
    correct: 2
  },
  {
    id: 27,
    section: "Motivation & Goal Alignment",
    question: "How do you see yourself in 5 years?",
    options: ["Flying commercially and growing in career", "Exploring different career options", "Still deciding what I want to do", "Working in any stable job"],
    correct: 0
  },
  {
    id: 28,
    section: "Motivation & Goal Alignment",
    question: "What motivates you to pursue aviation?",
    options: ["Salary", "Love for flying and responsibility", "Peer pressure", "Random choice"],
    correct: 1
  },
  {
    id: 29,
    section: "Motivation & Goal Alignment",
    question: "What are you willing to sacrifice to become a pilot?",
    options: ["Time and comfort", "Nothing", "Only money", "Fun and friends"],
    correct: 0
  },
  {
    id: 30,
    section: "Motivation & Goal Alignment",
    question: "What is your attitude towards long hours of study and training?",
    options: ["I accept it as part of the journey", "I dislike it", "I avoid it", "I complain"],
    correct: 0
  }
];
