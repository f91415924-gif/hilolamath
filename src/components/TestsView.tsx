import React, { useState, useEffect } from 'react';
import { Grade, Section, TestQuestion } from '../types';
import { TEST_BANK } from '../data/testsData';
import { useProgress } from '../context/ProgressContext';
import { 
  Brain, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RefreshCw, 
  ArrowRight, 
  BookOpen, 
  FileEdit,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TestsViewProps {
  selectedGrade: Grade;
  setSelectedGrade: (grade: Grade) => void;
  setSection: (section: Section) => void;
}

const QUESTION_COUNTS = [5, 10, 20, 30];

export const TestsView: React.FC<TestsViewProps> = ({
  selectedGrade,
  setSelectedGrade,
  setSection
}) => {
  const { saveTestResult } = useProgress();

  // Test setup
  const [selectedCount, setSelectedCount] = useState<number>(10);
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);

  // Active test execution
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  // Timer effect
  useEffect(() => {
    let timer: any = null;
    if (isTestActive && !isTestFinished) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestActive, isTestFinished]);

  // Start test and shuffle questions
  const startTest = () => {
    // Filter matching grade, or add additional from nearby grades if needed to fulfill question count
    let pool = TEST_BANK.filter(q => q.grade === selectedGrade);
    if (pool.length < selectedCount) {
      pool = [...pool, ...TEST_BANK.filter(q => q.grade !== selectedGrade)];
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, selectedCount);

    setQuestions(chosen);
    setCurrentIndex(0);
    setUserAnswers({});
    setSecondsElapsed(0);
    setIsTestActive(true);
    setIsTestFinished(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const finishTest = () => {
    setIsTestFinished(true);

    // Calculate detailed analytics
    let correctCount = 0;
    const topicBreakdown: Record<string, { correct: number; total: number }> = {};

    questions.forEach((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctIndex;
      if (isCorrect) correctCount++;

      if (!topicBreakdown[q.topic]) {
        topicBreakdown[q.topic] = { correct: 0, total: 0 };
      }
      topicBreakdown[q.topic].total += 1;
      if (isCorrect) {
        topicBreakdown[q.topic].correct += 1;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    // Identify weakest topic
    let weakestTopic = '';
    let lowestScore = 1;
    for (const [topic, stat] of Object.entries(topicBreakdown)) {
      const ratio = stat.correct / stat.total;
      if (ratio < lowestScore) {
        lowestScore = ratio;
        weakestTopic = topic;
      }
    }

    // Generate smart recommendation text
    let recommendation = '';
    if (percentage >= 80) {
      recommendation = weakestTopic
        ? `Siz ajoyib natija ko‘rsatdingiz! Natijani yanada mustahkamlash uchun ${weakestTopic} mavzusidagi olimpiada mashqlarini sinab ko‘ring.`
        : 'Mukammal natija! Barcha mavzularni a’lo darajada o‘zlashtirgansiz.';
    } else if (percentage >= 50) {
      recommendation = weakestTopic
        ? `Siz umumiy hisobda yaxshi natija ko‘rsatdingiz, ammo ${weakestTopic} mavzusini darslar bo‘limida yana bir marta takrorlash tavsiya qilinadi.`
        : 'O‘rtacha natija. Formulalar va misollarni yana bir bor takrorlang.';
    } else {
      recommendation = `Asosiy qoidalarni mustahkamlash zarur. Xususan ${weakestTopic || 'darslar'} bo‘limidagi nazariya va oddiy misollarni boshidan o‘rganishni maslahat beramiz.`;
    }

    // Save to context / localStorage
    saveTestResult({
      grade: selectedGrade,
      totalQuestions: questions.length,
      score: correctCount,
      percentage,
      topicBreakdown,
      recommendation
    });

    if (percentage >= 70) {
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          🧠 Testlar bo‘limi
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          5, 10, 20 yoki 30 ta savollik testlar bilan bilimingizni sinang va xatolaringiz tahlilini oling
        </p>
      </div>

      {/* Screen 1: Test Setup (Start Screen) */}
      {!isTestActive && !isTestFinished && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
            <Brain className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Matematika testini boshlash
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Savollar sonini tanlang. Har safar savollar tasodifiy tartibda yangilanadi.
            </p>
          </div>

          {/* Question count options */}
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Savollar sonini tanlang:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {QUESTION_COUNTS.map(count => (
                <button
                  key={count}
                  onClick={() => setSelectedCount(count)}
                  className={`py-3.5 px-4 rounded-2xl border font-black text-sm text-center transition-all cursor-pointer ${
                    selectedCount === count
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300'
                  }`}
                >
                  {count} ta savol
                </button>
              ))}
            </div>
          </div>

          {/* Info pill */}
          <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 text-left flex items-start gap-3 text-xs sm:text-sm text-indigo-900">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Test xususiyatlari:</p>
              <p className="text-slate-600 text-xs mt-0.5">
                • Vaqt o‘lchagich (taymer)<br/>
                • Test yakunida foiz, to‘g‘ri/noto‘g‘ri javoblar soni<br/>
                • Qaysi mavzuda xato ko‘p qilinganligi tahlili va shaxsiy tavsiyalar
              </p>
            </div>
          </div>

          <button
            onClick={startTest}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-indigo-200 transition-all cursor-pointer"
          >
            Testni hoziroq boshlash
          </button>
        </div>
      )}

      {/* Screen 2: Active Test in Progress */}
      {isTestActive && !isTestFinished && questions.length > 0 && (
        <div className="max-w-3xl mx-auto space-y-5">
          {/* Status Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700">
                Savol {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                {questions[currentIndex].topic}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <p className="text-base sm:text-xl font-extrabold text-slate-900 leading-relaxed">
              {questions[currentIndex].question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {questions[currentIndex].options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 text-left rounded-2xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-300'
                    }`}
                  >
                    <span className="font-mono mr-2 opacity-70">
                      {String.fromCharCode(65 + optIdx)})
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
              >
                ← Oldingi savol
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Keyingi savol →
                </button>
              ) : (
                <button
                  onClick={finishTest}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-md shadow-emerald-200"
                >
                  Testni yakunlash
                </button>
              )}
            </div>
          </div>

          {/* Quick jump pills */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  currentIndex === idx
                    ? 'ring-2 ring-indigo-500 scale-110'
                    : ''
                } ${
                  userAnswers[idx] !== undefined
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Screen 3: Test Results & Comprehensive Analytics */}
      {isTestFinished && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Main Score Banner */}
          {(() => {
            const correctCount = questions.filter((q, idx) => userAnswers[idx] === q.correctIndex).length;
            const percentage = Math.round((correctCount / questions.length) * 100);
            const wrongCount = questions.length - correctCount;

            // Find topic breakdowns
            const topicBreakdown: Record<string, { correct: number; total: number }> = {};
            questions.forEach((q, idx) => {
              if (!topicBreakdown[q.topic]) topicBreakdown[q.topic] = { correct: 0, total: 0 };
              topicBreakdown[q.topic].total += 1;
              if (userAnswers[idx] === q.correctIndex) topicBreakdown[q.topic].correct += 1;
            });

            // Find weakest topic
            let weakestTopic = '';
            let lowestRatio = 1;
            for (const [topic, stat] of Object.entries(topicBreakdown)) {
              const r = stat.correct / stat.total;
              if (r < lowestRatio) {
                lowestRatio = r;
                weakestTopic = topic;
              }
            }

            return (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <Award className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Natija: {correctCount} / {questions.length}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Sarflangan vaqt: {formatTime(secondsElapsed)}
                  </p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase block">To‘g‘ri</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-800">{correctCount} ta</span>
                  </div>
                  <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-100">
                    <span className="text-[11px] font-bold text-rose-700 uppercase block">Noto‘g‘ri</span>
                    <span className="text-xl sm:text-2xl font-black text-rose-800">{wrongCount} ta</span>
                  </div>
                  <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <span className="text-[11px] font-bold text-indigo-700 uppercase block">Foiz</span>
                    <span className="text-xl sm:text-2xl font-black text-indigo-800">{percentage}%</span>
                  </div>
                </div>

                {/* Topic Breakdown */}
                <div className="space-y-2.5">
                  <h3 className="font-extrabold text-slate-800 text-sm">
                    Mavzular bo‘yicha o‘zlashtirish:
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(topicBreakdown).map(([top, stat]) => {
                      const topicPct = Math.round((stat.correct / stat.total) * 100);
                      return (
                        <div key={top} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold text-slate-700">
                            <span>{top}</span>
                            <span>{stat.correct}/{stat.total} ({topicPct}%)</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                topicPct >= 70 ? 'bg-emerald-500' : topicPct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${topicPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI Recommendation Message (Strict Requirement) */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-1.5">
                  <div className="flex items-center gap-1.5 font-extrabold text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>AI Ustoz tavsiyasi:</span>
                  </div>
                  <p className="leading-relaxed">
                    {weakestTopic 
                      ? `“Siz umumiy hisobda yaxshi natija ko‘rsatdingiz, ammo ${weakestTopic} mavzusini yana bir marta takrorlash tavsiya qilinadi.”`
                      : '“Ajoyib! Barcha savollarga to‘g‘ri javob berdingiz, bilimingiz juda mustahkam!”'}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={startTest}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Testni qayta topshirish</span>
                  </button>
                  <button
                    onClick={() => setSection('lessons')}
                    className="flex-1 py-3 bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Tavsiya qilingan darsni ochish</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
