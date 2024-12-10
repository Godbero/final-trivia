export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Roland Checked into the hotel under what name?",
    options: ["Damon Steel", "Dustin Steel", "Darren Steel", "Damian Steel"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the town where the show is set?",
    options: ["Schitt's Creek", "Rose Creek", "Rosebud", "Schittville"],
    correctAnswer: 0
  },
  {
    question: "What is the name of the motel the Rose family lives in?",
    options: ["Rosebud Motel", "Schitt's Inn", "Rose Motel", "Creek Lodge"],
    correctAnswer: 0
  }
  // Add more questions here to reach a total of 20
];

