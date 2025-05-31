export interface QuizQuestion {
  id: number;
  section: string;
  question: string;
  options: string[];
  correct: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    section: "Aviation Fundamentals",
    question: "What is the standard atmospheric pressure at sea level?",
    options: [
      "29.92 inches of mercury",
      "30.00 inches of mercury", 
      "28.50 inches of mercury",
      "31.00 inches of mercury"
    ],
    correct: 0
  },
  {
    id: 2,
    section: "Aviation Fundamentals",
    question: "Which flight control surface is primarily responsible for controlling pitch?",
    options: [
      "Rudder",
      "Ailerons", 
      "Elevator",
      "Flaps"
    ],
    correct: 2
  },
  {
    id: 3,
    section: "Navigation",
    question: "What does VOR stand for in aviation navigation?",
    options: [
      "Visual Omni Range",
      "VHF Omnidirectional Range", 
      "Variable Omni Radio",
      "Vertical Orientation Reference"
    ],
    correct: 1
  },
  {
    id: 4,
    section: "Regulations",
    question: "What is the minimum altitude for VFR flight over congested areas?",
    options: [
      "500 feet above the highest obstacle",
      "1,000 feet above the highest obstacle within 2,000 feet horizontal", 
      "1,500 feet above ground level",
      "2,000 feet above ground level"
    ],
    correct: 1
  },
  {
    id: 5,
    section: "Weather",
    question: "What type of weather is typically associated with a cold front?",
    options: [
      "Gradual temperature decrease with light rain",
      "Sudden temperature drop with thunderstorms", 
      "Warm temperatures with clear skies",
      "Fog and low visibility"
    ],
    correct: 1
  },
  {
    id: 6,
    section: "Aircraft Systems",
    question: "What is the purpose of the pitot tube?",
    options: [
      "Measure static air pressure",
      "Measure dynamic air pressure", 
      "Measure air temperature",
      "Measure wind direction"
    ],
    correct: 1
  },
  {
    id: 7,
    section: "Safety",
    question: "What should a pilot do if encountering wake turbulence from a larger aircraft?",
    options: [
      "Maintain current altitude and heading",
      "Climb immediately to avoid the wake", 
      "Descend below the flight path of the larger aircraft",
      "Turn away from the flight path and adjust altitude"
    ],
    correct: 3
  },
  {
    id: 8,
    section: "Regulations",
    question: "What is the maximum speed allowed in Class B airspace below 10,000 feet?",
    options: [
      "200 knots",
      "250 knots", 
      "300 knots",
      "No speed limit"
    ],
    correct: 1
  },
  {
    id: 9,
    section: "Aviation Fundamentals",
    question: "What are the four fundamental forces acting on an aircraft in flight?",
    options: [
      "Lift, Weight, Thrust, Drag",
      "Lift, Gravity, Power, Resistance", 
      "Thrust, Weight, Speed, Direction",
      "Power, Drag, Lift, Momentum"
    ],
    correct: 0
  },
  {
    id: 10,
    section: "Navigation",
    question: "How many satellites are required for a GPS to determine position?",
    options: [
      "2 satellites",
      "3 satellites", 
      "4 satellites",
      "5 satellites"
    ],
    correct: 2
  },
  {
    id: 11,
    section: "Weather",
    question: "What visibility is required for VFR flight?",
    options: [
      "1 statute mile",
      "2 statute miles", 
      "3 statute miles",
      "5 statute miles"
    ],
    correct: 2
  },
  {
    id: 12,
    section: "Aircraft Systems",
    question: "What does the oil pressure gauge indicate?",
    options: [
      "Engine temperature",
      "Hydraulic pressure", 
      "Lubrication system pressure",
      "Fuel flow rate"
    ],
    correct: 2
  },
  {
    id: 13,
    section: "Safety",
    question: "What is the first action to take in case of an engine failure during takeoff?",
    options: [
      "Maintain airspeed and land straight ahead",
      "Turn back to the airport immediately", 
      "Climb to gain altitude",
      "Restart the engine"
    ],
    correct: 0
  },
  {
    id: 14,
    section: "Regulations",
    question: "How long is a private pilot certificate valid?",
    options: [
      "2 years",
      "5 years", 
      "10 years",
      "Indefinitely (until revoked)"
    ],
    correct: 3
  },
  {
    id: 15,
    section: "Aviation Fundamentals",
    question: "What happens to air density as altitude increases?",
    options: [
      "Air density increases",
      "Air density decreases", 
      "Air density remains constant",
      "Air density fluctuates randomly"
    ],
    correct: 1
  },
  {
    id: 16,
    section: "Navigation",
    question: "What is magnetic variation?",
    options: [
      "The difference between magnetic north and true north",
      "The difference between compass heading and magnetic heading", 
      "The error in compass readings due to aircraft metal",
      "The change in magnetic field over time"
    ],
    correct: 0
  },
  {
    id: 17,
    section: "Weather",
    question: "What causes turbulence in clear air?",
    options: [
      "Temperature inversions and wind shear",
      "Heavy precipitation", 
      "Low visibility conditions",
      "High humidity levels"
    ],
    correct: 0
  },
  {
    id: 18,
    section: "Aircraft Systems",
    question: "What is the function of the carburetor in an aircraft engine?",
    options: [
      "To cool the engine",
      "To mix fuel and air in proper proportions", 
      "To generate electrical power",
      "To reduce engine noise"
    ],
    correct: 1
  },
  {
    id: 19,
    section: "Safety",
    question: "What is the sterile cockpit rule?",
    options: [
      "Keeping the cockpit clean at all times",
      "No non-essential activities below 10,000 feet", 
      "Only certified pilots allowed in cockpit",
      "No food or drinks in the cockpit"
    ],
    correct: 1
  },
  {
    id: 20,
    section: "Regulations",
    question: "What documents must a pilot carry during flight?",
    options: [
      "License and medical certificate only",
      "License, medical certificate, and photo ID", 
      "License, medical certificate, photo ID, and logbook",
      "Only a valid driver's license"
    ],
    correct: 1
  }
];
