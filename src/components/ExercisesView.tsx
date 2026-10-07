import React, { useState } from 'react';
import { Grade, Difficulty, Exercise, Section } from '../types';
import { EXERCISES } from '../data/exercisesData';
import { useProgress } from '../context/ProgressContext';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Flame, 
  Sparkles, 
  Filter, 
  RefreshCw,
  Lightbulb,
  ArrowRight,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExercisesViewProps {
  selectedGrade: Grade;
  setSelectedGrade: (grade: Grade) => void;
  setSection: (section: Section) => void;
}

const GRADES: Grade[] = [
  '5-sinf',
  '6-sinf',
  '7-sinf',
  '8-sinf',
  '9-sinf',
  '10-sinf',
  '11-sinf'
];

const DIFFICULTIES: { id: Difficulty; label: string; badge: string; color: string }[] = [
  { id: 'oson', label: 'Oson', badge: '🟢 Oson', color: 'border-emerald-300 text-emerald-700 bg-emerald-50' },
  { id: 'orta', label: 'O‘rta', badge: '🟡 O‘rta', color: 'border-amber-300 text-amber-700 bg-amber-50' },
  { id: 'qiyin', label: 'Qiyin', badge: '🔴 Qiyin', color: 'border-rose-300 text-rose-700 bg-rose-50' },
  { id: 'olimpiada', label: 'Olimpiada', badge: '🔥 Olimpiada darajasi', color: 'border-purple-300 text-purple-700 bg-purple-50' }
];

export const ExercisesView: React.FC<ExercisesViewProps> = ({
  selectedGrade,
  setSelectedGrade,
  setSection
}) => {
  const { progress, completeExercise, addXp } = useProgress();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  // Exercise interaction states: map of exerciseId -> selected option
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, { checked: boolean; isCorrect: boolean }>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  // Filter exercises
  const filteredExercises = EXERCISES.filter(ex => {
    const matchGrade = ex.grade === selectedGrade;
    const matchDiff = selectedDifficulty === 'all' || ex.difficulty === selectedDifficulty;
    const matchTopic = selectedTopic === 'all' || ex.topic === selectedTopic;
    return matchGrade && matchDiff && matchTopic;
  });

  // Extract unique topics for the grade
  const availableTopics = Array.from(new Set(
    EXERCISES.filter(ex => ex.grade === selectedGrade).map(ex => ex.topic)
  ));

  const handleSelectAnswer = (exId: string, option: string) => {
    if (results[exId]?.checked) return;
    setAnswers(prev => ({ ...prev, [exId]: option }));
  };

  const handleCheckAnswer = (exercise: Exercise) => {
    const userAnswer = answers[exercise.id];
    if (!userAnswer) return;

    const isRight = userAnswer.trim() === exercise.correctAnswer.trim();
    setResults(prev => ({
      ...prev,
      [exercise.id]: { checked: true, isCorrect: isRight }
    }));

    if (isRight) {
      completeExercise(exercise.id);
      addXp(exercise.difficulty === 'olimpiada' ? 50 : 25);
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleReset = (exId: string) => {
    setAnswers(prev => {
      const next = { ...prev };
      delete next[exId];
      return next;
    });
    setResults(prev => {
      const next = { ...prev };
      delete next[exId];
      return next;
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            📝 Mashqlar bo‘limi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sinf, mavzu va qiyinchilik darajasini tanlang. Har bir xatoni AI batafsil tushuntirib beradi.
          </p>
        </div>

        <button
          onClick={() => setSection('solver')}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 transition-colors cursor-pointer"
        >
          <Bot className="w-4 h-4 text-indigo-600" />
          <span>O‘z misolingizni yechtirish</span>
        </button>
      </div>

      {/* Filter Controls: Grade, Difficulty, Topic */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        {/* 1. Grade selector */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            1. Sinfni tanlang:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {GRADES.map(grade => (
              <button
                key={grade}
                onClick={() => {
                  setSelectedGrade(grade);
                  setSelectedTopic('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedGrade === grade
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-indigo-50 text-slate-700'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Difficulty selector */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            2. Qiyinchilik darajasi:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDifficulty === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Hammasi
            </button>
            {DIFFICULTIES.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDifficulty(d.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedDifficulty === d.id
                    ? `${d.color} shadow-xs font-extrabold ring-2 ring-indigo-400`
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {d.badge}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Topic filter */}
        {availableTopics.length > 0 && (
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              3. Mavzu:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedTopic('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedTopic === 'all'
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Barcha mavzular
              </button>
              {availableTopics.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Exercises List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Topilgan mashqlar: {filteredExercises.length} ta</span>
          <span>Bajarilgan: {progress.completedExerciseIds.length} ta</span>
        </div>

        {filteredExercises.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-700">Bu filtr bo‘yicha mashq topilmadi</p>
            <p className="text-xs text-slate-500 mt-1">Boshqa sinf yoki qiyinchilik darajasini tanlab ko‘ring.</p>
          </div>
        ) : (
          filteredExercises.map(exercise => {
            const result = results[exercise.id];
            const currentAnswer = answers[exercise.id];
            const isCompleted = progress.completedExerciseIds.includes(exercise.id);
            const isHintOpen = showHint[exercise.id];

            const diffBadge = DIFFICULTIES.find(d => d.id === exercise.difficulty)?.badge || exercise.difficulty;

            return (
              <div
                key={exercise.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4"
              >
                {/* Exercise top bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {exercise.grade} • {exercise.topic}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {diffBadge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Bajarildi
                      </span>
                    )}
                    <button
                      onClick={() => setShowHint(prev => ({ ...prev, [exercise.id]: !isHintOpen }))}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{isHintOpen ? 'Maslahatni yopish' : 'Maslahat'}</span>
                    </button>
                  </div>
                </div>

                {/* Question */}
                <p className="font-extrabold text-slate-900 text-base sm:text-lg leading-relaxed">
                  {exercise.question}
                </p>

                {/* Hint if opened */}
                {isHintOpen && (
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs sm:text-sm">
                    💡 <strong>AI Maslahat:</strong> {exercise.hint}
                  </div>
                )}

                {/* Multiple choice options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {exercise.options.map((opt, optIdx) => {
                    const isSelected = currentAnswer === opt;
                    let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300';

                    if (result?.checked) {
                      if (opt === exercise.correctAnswer) {
                        style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                      } else if (isSelected && opt !== exercise.correctAnswer) {
                        style = 'bg-rose-50 border-rose-400 text-rose-950 line-through';
                      } else {
                        style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      style = 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-xs';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={result?.checked}
                        onClick={() => handleSelectAnswer(exercise.id, opt)}
                        className={`p-3.5 text-left rounded-2xl border text-xs sm:text-sm transition-all cursor-pointer font-medium ${style}`}
                      >
                        <span className="font-mono mr-2 opacity-70">
                          {String.fromCharCode(65 + optIdx)})
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Action button */}
                {!result?.checked ? (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleCheckAnswer(exercise)}
                      disabled={!currentAnswer}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Javobni tekshirish
                    </button>
                  </div>
                ) : (
                  /* AI Detailed Error / Success Analysis */
                  <div className={`mt-4 p-5 rounded-2xl border space-y-3.5 ${
                    result.isCorrect 
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                      : 'bg-rose-50/70 border-rose-200 text-slate-800'
                  }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                      <div className="flex items-center gap-2">
                        {result.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <span className="font-extrabold text-sm sm:text-base text-emerald-800">
                              Barakalla! To‘g‘ri javob berildi!
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-600" />
                            <span className="font-extrabold text-sm sm:text-base text-rose-800">
                              Javobingiz noto‘g‘ri. Keling, tahlil qilamiz:
                            </span>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => handleReset(exercise.id)}
                        className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Qayta yechish</span>
                      </button>
                    </div>

                    {/* Strict Required Format: To'g'ri javob, Qayerda xato qilingan, To'g'ri yechish usuli, Bosqichma-bosqich */}
                    <div className="space-y-2.5 text-xs sm:text-sm">
                      <div className="p-3 bg-white/80 rounded-xl border border-black/5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                          To‘g‘ri javob:
                        </span>
                        <p className="font-extrabold text-emerald-700 text-sm">
                          {exercise.analysis.correctAnswer}
                        </p>
                      </div>

                      {!result.isCorrect && (
                        <div className="p-3 bg-white/80 rounded-xl border border-rose-100">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block mb-0.5">
                            Qayerda xato qilgan bo‘lishingiz mumkin:
                          </span>
                          <p className="text-slate-700">
                            {exercise.analysis.mistakeTrap}
                          </p>
                        </div>
                      )}

                      <div className="p-3 bg-white/80 rounded-xl border border-indigo-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block mb-0.5">
                          To‘g‘ri yechish usuli:
                        </span>
                        <p className="text-slate-700">
                          {exercise.analysis.correctMethod}
                        </p>
                      </div>

                      <div className="p-3 bg-white/80 rounded-xl border border-black/5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Bosqichma-bosqich tushuntirish:
                        </span>
                        <div className="space-y-1">
                          {exercise.analysis.stepByStep.map((st, sIdx) => (
                            <div key={sIdx} className="text-slate-700 flex items-start gap-1.5">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span>{st}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
