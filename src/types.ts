export type Grade = 
  | '5-sinf' 
  | '6-sinf' 
  | '7-sinf' 
  | '8-sinf' 
  | '9-sinf' 
  | '10-sinf' 
  | '11-sinf';

export type Section = 
  | 'home' 
  | 'lessons' 
  | 'exercises' 
  | 'tests' 
  | 'games' 
  | 'ai-tutor' 
  | 'solver' 
  | 'results';

export type Difficulty = 'oson' | 'orta' | 'qiyin' | 'olimpiada';

export interface MiniTestQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  grade: Grade;
  topic: string;
  category: string;
  badge: string;
  description: string;
  theory: {
    definition: string;
    rules: string[];
    importantNote?: string;
    formula?: string;
  };
  simpleExample: {
    problem: string;
    given: string;
    stepByStep: string[];
    answer: string;
  };
  detailedExplanation: {
    keyPoints: string[];
    commonMistakes: string;
    proTip: string;
  };
  selfPractice: {
    question: string;
    hint: string;
    correctAnswer: string;
    explanation: string;
  };
  miniTest: MiniTestQuestion[];
}

export interface Exercise {
  id: string;
  grade: Grade;
  topic: string;
  difficulty: Difficulty;
  question: string;
  hint: string;
  correctAnswer: string;
  options: string[];
  analysis: {
    correctAnswer: string;
    mistakeTrap: string;
    correctMethod: string;
    stepByStep: string[];
  };
}

export interface TestQuestion {
  id: string;
  grade: Grade;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TestHistoryItem {
  id: string;
  date: string;
  grade: Grade;
  totalQuestions: number;
  score: number;
  percentage: number;
  topicBreakdown: Record<string, { correct: number; total: number }>;
  recommendation: string;
}

export interface UserProgress {
  studentName: string;
  currentGrade: Grade;
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  completedExerciseIds: string[];
  testHistory: TestHistoryItem[];
  gameScores: Record<string, number>;
}
