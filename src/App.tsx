/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Section, Grade } from './types';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { LessonsView } from './components/LessonsView';
import { ExercisesView } from './components/ExercisesView';
import { TestsView } from './components/TestsView';
import { GamesView } from './components/GamesView';
import { AiTutorView } from './components/AiTutorView';
import { ProblemSolverView } from './components/ProblemSolverView';
import { ResultsView } from './components/ResultsView';
import { Sparkles, Heart } from 'lucide-react';

function MainApp() {
  const [currentSection, setSection] = useState<Section>('home');
  const { progress, setCurrentGrade } = useProgress();

  const selectedGrade = progress.currentGrade;
  const setSelectedGrade = (grade: Grade) => {
    setCurrentGrade(grade);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Global Navigation */}
      <Navbar
        currentSection={currentSection}
        setSection={setSection}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentSection === 'home' && (
          <HomeView
            setSection={setSection}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
          />
        )}

        {currentSection === 'lessons' && (
          <LessonsView
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            setSection={setSection}
          />
        )}

        {currentSection === 'exercises' && (
          <ExercisesView
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            setSection={setSection}
          />
        )}

        {currentSection === 'tests' && (
          <TestsView
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            setSection={setSection}
          />
        )}

        {currentSection === 'games' && (
          <GamesView />
        )}

        {currentSection === 'ai-tutor' && (
          <AiTutorView
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            setSection={setSection}
          />
        )}

        {currentSection === 'solver' && (
          <ProblemSolverView
            selectedGrade={selectedGrade}
          />
        )}

        {currentSection === 'results' && (
          <ResultsView
            selectedGrade={selectedGrade}
            setSection={setSection}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800 text-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Hilola Math</span>
          </div>
          <p className="font-semibold text-indigo-900">
            “Hilola Math — Matematikani o‘rgan, mashq qil va zavq bilan yech!”
          </p>
          <p className="text-[11px] text-slate-400">
            5-sinfdan 11-sinfgacha O‘zbekiston maktab o‘quvchilari uchun maxsus yaratilgan matematika platformasi.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <MainApp />
    </ProgressProvider>
  );
}
