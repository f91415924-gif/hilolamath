import React, { useState } from 'react';
import { 
  Grade, 
  Lesson, 
  MiniTestQuestion,
  Section 
} from '../types';
import { CURRICULUM } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import { 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  ArrowLeft, 
  Play, 
  Award, 
  Lightbulb, 
  AlertTriangle,
  Send,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonsViewProps {
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

export const LessonsView: React.FC<LessonsViewProps> = ({
  selectedGrade,
  setSelectedGrade,
  setSection
}) => {
  const { progress, completeLesson, addXp } = useProgress();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Self practice interactive state
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [practiceCorrect, setPracticeCorrect] = useState(false);
  const [showPracticeHint, setShowPracticeHint] = useState(false);

  // Mini-test interactive state
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const gradeLessons = CURRICULUM.filter(l => l.grade === selectedGrade);

  const openLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setPracticeAnswer('');
    setPracticeChecked(false);
    setPracticeCorrect(false);
    setShowPracticeHint(false);
    setTestAnswers({});
    setTestSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePracticeCheck = () => {
    if (!activeLesson || !practiceAnswer.trim()) return;
    const cleanUser = practiceAnswer.trim().toLowerCase().replace(/\s+/g, '');
    const cleanTarget = activeLesson.selfPractice.correctAnswer.toLowerCase().replace(/\s+/g, '');
    const isRight = cleanUser === cleanTarget || cleanTarget.includes(cleanUser);

    setPracticeChecked(true);
    setPracticeCorrect(isRight);
    if (isRight) {
      addXp(20);
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleTestAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (testSubmitted) return;
    setTestAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleTestSubmit = () => {
    if (!activeLesson) return;
    setTestSubmitted(true);
    
    // Calculate score
    let correctCount = 0;
    activeLesson.miniTest.forEach((q, idx) => {
      if (testAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount >= Math.ceil(activeLesson.miniTest.length / 2)) {
      completeLesson(activeLesson.id);
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header & Grade Pills */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              📚 Darslar bo‘limi
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              5–11-sinf matematika darsliklari, nazariya, misollar va mini-testlar
            </p>
          </div>

          <button
            onClick={() => setSection('ai-tutor')}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 transition-colors cursor-pointer"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>AI Ustozdan yordam olish</span>
          </button>
        </div>

        {/* Grade Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {GRADES.map(grade => {
            const isSelected = selectedGrade === grade;
            const count = CURRICULUM.filter(l => l.grade === grade).length;
            return (
              <button
                key={grade}
                onClick={() => {
                  setSelectedGrade(grade);
                  setActiveLesson(null);
                }}
                className={`px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-white text-slate-700 hover:bg-indigo-50/70 border border-slate-200'
                }`}
              >
                <span>{grade}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main View: Lessons Grid OR Active Lesson Detail */}
      {!activeLesson ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{selectedGrade} uchun mavzular:</span>
            <span>Jami: {gradeLessons.length} ta dars</span>
          </div>

          {gradeLessons.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-slate-700">Ushbu sinf uchun darslar tez kunda qo‘shiladi</p>
              <p className="text-xs text-slate-500 mt-1">Hozirda 5-sinf, 6-sinf, 7-sinf, 8-sinf, 9-sinf, 10-sinf va 11-sinf darslarini ko‘rishingiz mumkin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gradeLessons.map((lesson, idx) => {
                const isCompleted = progress.completedLessonIds.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    onClick={() => openLesson(lesson)}
                    className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {lesson.category}
                        </span>
                        {isCompleted && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle className="w-3.5 h-3.5" /> Bajarildi
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors mb-2">
                        {idx + 1}. {lesson.topic}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {lesson.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> {lesson.badge}
                      </span>
                      <button className="px-3.5 py-1.5 rounded-xl bg-indigo-600 group-hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 transition-colors">
                        <span>Darsni ochish</span>
                        <Play className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Detailed Lesson View with Strictly Required Structure */
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Back button & Title Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveLesson(null)}
              className="p-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-bold text-indigo-600">
                {activeLesson.grade} • {activeLesson.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeLesson.topic}
              </h2>
            </div>
          </div>

          {/* 1. MAVZU VA NAZARIYA */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Nazariya va Ta’rif</h3>
            </div>

            <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              {activeLesson.theory.definition}
            </div>

            {activeLesson.theory.formula && (
              <div className="p-4 bg-slate-900 text-amber-300 font-mono text-center rounded-2xl text-base sm:text-lg font-bold shadow-inner">
                {activeLesson.theory.formula}
              </div>
            )}

            <div>
              <h4 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider mb-2">
                Asosiy qoidalar:
              </h4>
              <ul className="space-y-2">
                {activeLesson.theory.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeLesson.theory.importantNote && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Eslatma:</strong> {activeLesson.theory.importantNote}</span>
              </div>
            )}
          </div>

          {/* 2. ODDIY MISOL */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Oddiy misol</h3>
            </div>

            <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
              <p className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                {activeLesson.simpleExample.problem}
              </p>
              <p className="text-xs text-slate-600">
                {activeLesson.simpleExample.given}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Yechish bosqichlari:
              </h4>
              <div className="space-y-1.5">
                {activeLesson.simpleExample.stepByStep.map((step, idx) => (
                  <div key={idx} className="px-3.5 py-2 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 font-medium">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-emerald-100 text-emerald-950 font-bold rounded-xl text-sm">
              <span>Javob:</span>
              <span className="font-mono text-base">{activeLesson.simpleExample.answer}</span>
            </div>
          </div>

          {/* 3. BATAFSIL TUSHUNTIRISH */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Batafsil tushuntirish</h3>
            </div>

            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Muhim jihatlar:
              </h4>
              {activeLesson.detailedExplanation.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-900 text-xs sm:text-sm">
              <strong className="block font-bold mb-1">Tez-tez qilinadigan xatolar:</strong>
              <p>{activeLesson.detailedExplanation.commonMistakes}</p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs sm:text-sm flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Ustoz maslahati:</strong> {activeLesson.detailedExplanation.proTip}</span>
            </div>
          </div>

          {/* 4. MUSTAQIL MASHQ */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg">Mustaqil mashq</h3>
              </div>
              <button
                onClick={() => setShowPracticeHint(!showPracticeHint)}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showPracticeHint ? 'Maslahatni yashirish' : 'Yordam / Maslahat'}</span>
              </button>
            </div>

            <p className="font-bold text-slate-800 text-base">
              {activeLesson.selfPractice.question}
            </p>

            {showPracticeHint && (
              <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800 border border-amber-200">
                💡 <strong>Maslahat:</strong> {activeLesson.selfPractice.hint}
              </div>
            )}

            {!practiceChecked ? (
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Javobingizni kiriting..."
                  value={practiceAnswer}
                  onChange={e => setPracticeAnswer(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handlePracticeCheck()}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handlePracticeCheck}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Javobni tekshirish
                </button>
              </div>
            ) : (
              <div className={`p-4 rounded-2xl ${
                practiceCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-rose-50 border border-rose-200 text-rose-900'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-sm">
                    {practiceCorrect ? '🎉 Ajoyib! Javobingiz to‘g‘ri!' : 'Qayta tekshiring!'}
                  </p>
                  <button
                    onClick={() => { setPracticeChecked(false); setPracticeAnswer(''); }}
                    className="text-xs font-semibold underline cursor-pointer"
                  >
                    Qayta yechish
                  </button>
                </div>
                <p className="text-xs leading-relaxed">
                  <strong>To‘g‘ri javob:</strong> {activeLesson.selfPractice.correctAnswer}
                </p>
                <p className="text-xs opacity-90 mt-1">
                  {activeLesson.selfPractice.explanation}
                </p>
              </div>
            )}
          </div>

          {/* 5. MINI-TEST */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Mavzu bo‘yicha mini-test</h3>
                  <p className="text-xs text-slate-500">Mavzuni to‘liq o‘zlashtirganingizni sinab ko‘ring</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700">
                {activeLesson.miniTest.length} ta savol
              </span>
            </div>

            <div className="space-y-5">
              {activeLesson.miniTest.map((q, qIdx) => {
                const selectedOption = testAnswers[qIdx];
                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3">
                    <p className="font-bold text-slate-800 text-sm">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOption === optIdx;
                        let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300';

                        if (testSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                          } else if (isChosen && optIdx !== q.correctIndex) {
                            btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 line-through';
                          } else {
                            btnStyle = 'bg-white border-slate-200 text-slate-400';
                          }
                        } else if (isChosen) {
                          btnStyle = 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={testSubmitted}
                            onClick={() => handleTestAnswerSelect(qIdx, optIdx)}
                            className={`p-3 text-left rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                          >
                            <span className="font-mono mr-2 opacity-70">
                              {String.fromCharCode(65 + optIdx)})
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {testSubmitted && (
                      <div className="text-xs p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700">
                        <strong>Tushuntirish:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!testSubmitted ? (
              <button
                onClick={handleTestSubmit}
                disabled={Object.keys(testAnswers).length === 0}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-sm shadow-indigo-200"
              >
                Mini-testni yakunlash va tekshirish
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center space-y-2">
                <p className="font-black text-slate-800 text-lg">
                  Natija: {
                    activeLesson.miniTest.filter((q, idx) => testAnswers[idx] === q.correctIndex).length
                  } / {activeLesson.miniTest.length}
                </p>
                <p className="text-xs text-slate-600">
                  Tabriklaymiz! Siz ushbu darsni muvaffaqiyatli yakunladingiz. +50 XP hisobingizga qo‘shildi.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setActiveLesson(null)}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Keyingi darslarga qaytish
                  </button>
                  <button
                    onClick={() => setSection('exercises')}
                    className="px-5 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Mashqlarni boshlash
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
