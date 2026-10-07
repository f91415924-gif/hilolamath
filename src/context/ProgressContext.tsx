import React, { createContext, useContext, useState, useEffect } from 'react';
import { Grade, UserProgress, TestHistoryItem } from '../types';

const STORAGE_KEY = 'hilola_math_progress_v1';

const defaultProgress: UserProgress = {
  studentName: 'Hilola o\'quvchisi',
  currentGrade: '7-sinf',
  xp: 350,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: ['les-5-1', 'les-6-1'],
  completedExerciseIds: ['ex-5-1', 'ex-6-1', 'ex-7-1'],
  testHistory: [
    {
      id: 'init-test-1',
      date: new Date().toLocaleDateString('uz-UZ'),
      grade: '7-sinf',
      totalQuestions: 10,
      score: 8,
      percentage: 80,
      topicBreakdown: {
        'Chiziqli tenglamalar': { correct: 4, total: 5 },
        'Kasrlar': { correct: 3, total: 3 },
        'Geometriya': { correct: 1, total: 2 }
      },
      recommendation: 'Siz kasrlar va tenglamalarda ajoyib natija ko\'rsatdingiz! Geometriya shakllarini yana bir oz takrorlash tavsiya etiladi.'
    }
  ],
  gameScores: {
    'speed-math': 140,
    'treasure-hunt': 3,
    'number-battle': 180,
    'equation-detective': 4,
    'math-race': 210,
    'fraction-game': 90,
    'geometry-master': 120
  }
};

interface ProgressContextType {
  progress: UserProgress;
  setStudentName: (name: string) => void;
  setCurrentGrade: (grade: Grade) => void;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  completeExercise: (exerciseId: string) => void;
  saveTestResult: (item: Omit<TestHistoryItem, 'id' | 'date'>) => void;
  saveGameScore: (gameKey: string, score: number) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return defaultProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [progress]);

  const setStudentName = (name: string) => {
    setProgress(prev => ({ ...prev, studentName: name }));
  };

  const setCurrentGrade = (grade: Grade) => {
    setProgress(prev => ({ ...prev, currentGrade: grade }));
  };

  const addXp = (amount: number) => {
    setProgress(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const completeLesson = (lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      return {
        ...prev,
        xp: prev.xp + 50,
        completedLessonIds: [...prev.completedLessonIds, lessonId]
      };
    });
  };

  const completeExercise = (exerciseId: string) => {
    setProgress(prev => {
      if (prev.completedExerciseIds.includes(exerciseId)) return prev;
      return {
        ...prev,
        xp: prev.xp + 30,
        completedExerciseIds: [...prev.completedExerciseIds, exerciseId]
      };
    });
  };

  const saveTestResult = (item: Omit<TestHistoryItem, 'id' | 'date'>) => {
    const newItem: TestHistoryItem = {
      ...item,
      id: 'test-' + Date.now(),
      date: new Date().toLocaleDateString('uz-UZ')
    };

    setProgress(prev => ({
      ...prev,
      xp: prev.xp + item.score * 15,
      testHistory: [newItem, ...prev.testHistory]
    }));
  };

  const saveGameScore = (gameKey: string, score: number) => {
    setProgress(prev => {
      const currentBest = prev.gameScores[gameKey] || 0;
      const isNewRecord = score > currentBest;
      return {
        ...prev,
        xp: prev.xp + Math.floor(score / 5),
        gameScores: {
          ...prev.gameScores,
          [gameKey]: isNewRecord ? score : currentBest
        }
      };
    });
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        setStudentName,
        setCurrentGrade,
        addXp,
        completeLesson,
        completeExercise,
        saveTestResult,
        saveGameScore,
        resetProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
