import React, { useState } from 'react';
import { 
  BookOpen, 
  FileEdit, 
  Brain, 
  Gamepad2, 
  Bot, 
  Calculator, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  Zap,
  Target
} from 'lucide-react';
import { Section, Grade } from '../types';
import { useProgress } from '../context/ProgressContext';
import confetti from 'canvas-confetti';

interface HomeViewProps {
  setSection: (section: Section) => void;
  selectedGrade: Grade;
  setSelectedGrade: (grade: Grade) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setSection,
  selectedGrade,
  setSelectedGrade
}) => {
  const { progress, addXp } = useProgress();

  // Daily Challenge state
  const [dailyAnswer, setDailyAnswer] = useState('');
  const [dailyChecked, setDailyChecked] = useState(false);
  const [dailyCorrect, setDailyCorrect] = useState(false);

  const checkDailyChallenge = () => {
    if (!dailyAnswer.trim()) return;
    const isRight = dailyAnswer.trim() === '16';
    setDailyChecked(true);
    setDailyCorrect(isRight);
    if (isRight) {
      addXp(30);
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const sectionsList = [
    {
      id: 'lessons' as Section,
      title: '📚 Darslar',
      subtitle: '5-11 sinf darsliklari',
      description: 'Nazariya, oddiy misollar, batafsil tushuntirish va mini-testlar bilan o\'rganing.',
      badge: 'Barcha sinflar',
      gradient: 'from-blue-500 to-indigo-600',
      bgLight: 'bg-blue-50/70',
      border: 'border-blue-100 hover:border-blue-300'
    },
    {
      id: 'exercises' as Section,
      title: '📝 Mashqlar',
      subtitle: '4 ta qiyinchilik darajasi',
      description: 'Oson, o\'rta, qiyin va olimpiada darajalari. Noto\'g\'ri javob berilsa, AI xatoni tushuntiradi!',
      badge: 'Interaktiv tahlil',
      gradient: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50/70',
      border: 'border-emerald-100 hover:border-emerald-300'
    },
    {
      id: 'tests' as Section,
      title: '🧠 Testlar',
      subtitle: '5, 10, 20 va 30 ta savol',
      description: 'Vaqt hisobi, foizli tahlil, xato qilingan mavzular ro\'yxati va shaxsiy tavsiyalar.',
      badge: 'Bilimni sinash',
      gradient: 'from-violet-500 to-purple-600',
      bgLight: 'bg-violet-50/70',
      border: 'border-violet-100 hover:border-violet-300'
    },
    {
      id: 'games' as Section,
      title: '🎮 Matematik o‘yinlar',
      subtitle: '7 xil qiziqarli o\'yin',
      description: 'Tezkor hisob, Xazina oroli, Sonlar jangi, Tenglama detektivi, Poyga, Kasrlar va Geometriya.',
      badge: 'Zavqli o\'rganish',
      gradient: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50/70',
      border: 'border-amber-100 hover:border-amber-300'
    },
    {
      id: 'ai-tutor' as Section,
      title: '🤖 AI Ustoz',
      subtitle: 'Aqlli yordamchi',
      description: 'Sizning sinfingizga mos tilda javob beruvchi, savol va misollarni erinmasdan tushuntiruvchi ustoz.',
      badge: 'O\'zbek tilida AI',
      gradient: 'from-rose-500 to-pink-600',
      bgLight: 'bg-rose-50/70',
      border: 'border-rose-100 hover:border-rose-300'
    },
    {
      id: 'solver' as Section,
      title: '🧮 Misol va Masala yechuvchi',
      subtitle: 'Bosqichma-bosqich yechim',
      description: 'Tenglama yoki matnli masalani yozing — 1-qadamdan 4-qadامgacha tartib bilan yechib beradi.',
      badge: 'Tezkor tahlil',
      gradient: 'from-cyan-500 to-blue-600',
      bgLight: 'bg-cyan-50/70',
      border: 'border-cyan-100 hover:border-cyan-300'
    }
  ];

  const grades: Grade[] = [
    '5-sinf',
    '6-sinf',
    '7-sinf',
    '8-sinf',
    '9-sinf',
    '10-sinf',
    '11-sinf'
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-950 text-white p-8 md:p-12 shadow-xl shadow-indigo-950/20 border border-indigo-700/50">
        {/* Decorative background elements */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-20 w-72 h-72 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
        <div className="absolute top-6 right-8 text-indigo-400/20 font-mono text-8xl font-black select-none pointer-events-none hidden md:block">
          ∑ π √x²
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>O‘zbekiston maktablari uchun 1-raqamli EdTech ilova</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Hilola Math
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-amber-300">
            “Matematikani o‘rganish endi yanada qiziqarli!”
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Hilola Math — Matematikani o‘rgan, mashq qil va zavq bilan yech! 5-sinfdan 11-sinfgacha 
            barcha darslar, tushunarli qoidalar, aqlli AI yordamchi va o‘yinlar bilan bilimingizni yangi bosqichga olib chiqing.
          </p>

          {/* Quick grade selector */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-indigo-200 mb-2.5">
              Hozirgi sinfni tanlang:
            </p>
            <div className="flex flex-wrap gap-2">
              {grades.map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedGrade === g
                      ? 'bg-amber-400 text-indigo-950 shadow-md shadow-amber-400/30 scale-105'
                      : 'bg-indigo-700/60 text-white hover:bg-indigo-600/70 border border-indigo-500/40'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setSection('lessons')}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all hover:gap-3 cursor-pointer"
            >
              <span>Darslarni boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSection('ai-tutor')}
              className="px-6 py-3 rounded-2xl bg-indigo-700/80 hover:bg-indigo-600/80 text-white font-bold text-sm flex items-center gap-2 border border-indigo-400/30 backdrop-blur-xs transition-colors cursor-pointer"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>AI Ustozdan so‘rash</span>
            </button>
          </div>
        </div>
      </section>

      {/* Daily Challenge Card + Progress Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Math Challenge */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">Kunlik matematika sinovi</h3>
                  <p className="text-xs text-slate-500">To‘g‘ri yechim uchun +30 XP mukofot</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {selectedGrade}
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 my-3 border border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Bugungi misol:
              </p>
              <p className="font-bold text-slate-800 text-base sm:text-lg">
                Agar <span className="font-mono text-indigo-600">3x - 8 = 40</span> bo‘lsa, <span className="font-mono text-indigo-600">x</span> ning qiymati nechaga teng?
              </p>
            </div>
          </div>

          <div>
            {!dailyChecked ? (
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Javobingizni yozing (masalan, 16)"
                  value={dailyAnswer}
                  onChange={e => setDailyAnswer(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && checkDailyChallenge()}
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
                <button
                  onClick={checkDailyChallenge}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Tekshirish
                </button>
              </div>
            ) : (
              <div className={`p-4 rounded-xl mt-2 flex items-center justify-between ${
                dailyCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-5 h-5 ${dailyCorrect ? 'text-emerald-600' : 'text-rose-600'}`} />
                  <div>
                    <p className="font-bold text-xs sm:text-sm">
                      {dailyCorrect ? 'Ofarin, to‘g‘ri javob! x = 16' : 'Afsuski noto‘g‘ri. To‘g‘ri javob: 16'}
                    </p>
                    <p className="text-xs opacity-80">
                      3x = 40 + 8 = 48. x = 48 ÷ 3 = 16.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { setDailyChecked(false); setDailyAnswer(''); }}
                  className="text-xs font-semibold underline px-2 py-1 cursor-pointer"
                >
                  Qayta urinish
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress Snapshot */}
        <div className="bg-gradient-to-br from-indigo-50/60 to-purple-50/60 rounded-3xl p-6 border border-indigo-100/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-slate-800 text-base">Sizning faolligingiz</h3>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-600">
                  <span>Matematika darajasi:</span>
                  <span className="font-bold text-indigo-700">74%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full w-[74%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="bg-white p-3 rounded-2xl border border-indigo-50 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium block">Tugallangan dars:</span>
                  <span className="text-lg font-black text-slate-800">{progress.completedLessonIds.length} ta</span>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-indigo-50 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium block">Yechilgan mashq:</span>
                  <span className="text-lg font-black text-slate-800">{progress.completedExerciseIds.length} ta</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSection('results')}
            className="w-full mt-4 py-2.5 bg-white hover:bg-slate-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Target className="w-3.5 h-3.5" />
            <span>To‘liq natijalarni ko‘rish</span>
          </button>
        </div>
      </section>

      {/* Main 6 Section Feature Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Asosiy bo‘limlar
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              O‘rganish, mashq qilish, o‘ynash va sun’iy intellekt vositalari
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectionsList.map(item => (
            <div
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`group bg-white rounded-3xl p-6 border ${item.border} shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-200`}>
                    {item.title.split(' ')[0]}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
                  {item.title.substring(item.title.indexOf(' ') + 1)}
                </h3>
                <p className="text-xs font-bold text-indigo-600/90 mb-2">
                  {item.subtitle}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-indigo-600">
                <span>Bo‘limga o‘tish</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
