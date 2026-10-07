import React, { useState } from 'react';
import { Grade, Section } from '../types';
import { useProgress } from '../context/ProgressContext';
import { 
  UserCheck, 
  Award, 
  Flame, 
  BookOpen, 
  FileEdit, 
  Brain, 
  Gamepad2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Trophy, 
  Edit3,
  RotateCcw
} from 'lucide-react';

interface ResultsViewProps {
  selectedGrade: Grade;
  setSection: (section: Section) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ selectedGrade, setSection }) => {
  const { progress, setStudentName, resetProgress } = useProgress();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(progress.studentName);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setStudentName(nameInput.trim());
    }
    setIsEditingName(false);
  };

  // Topic mastery rates
  const topicMastery = [
    { name: 'Tenglamalar va ifodalar', pct: 85, color: 'bg-indigo-600' },
    { name: 'Geometriya va shakllar', pct: 78, color: 'bg-emerald-600' },
    { name: 'Kasrlar va foizlar', pct: 64, color: 'bg-amber-500' },
    { name: 'Ratsional sonlar', pct: 90, color: 'bg-purple-600' }
  ];

  const overallMastery = Math.round(
    topicMastery.reduce((acc, curr) => acc + curr.pct, 0) / topicMastery.length
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-indigo-950 font-black text-2xl flex items-center justify-center shadow-lg">
            {progress.studentName.charAt(0).toUpperCase()}
          </div>

          <div>
            {!isEditingName ? (
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{progress.studentName}</h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Ismni tahrirlash"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="px-3 py-1 rounded-xl text-slate-900 text-sm font-bold bg-white focus:outline-none"
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-1 bg-amber-400 text-indigo-950 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            )}
            <p className="text-xs text-indigo-200 mt-0.5">
              {progress.currentGrade} o‘quvchisi • Faol ta’lim oluvchi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-center gap-2">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <div>
              <span className="text-[10px] text-indigo-200 uppercase block font-bold">Seriya:</span>
              <span className="text-sm font-black">{progress.streak} kun</span>
            </div>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-300" />
            <div>
              <span className="text-[10px] text-indigo-200 uppercase block font-bold">Tajriba:</span>
              <span className="text-sm font-black">{progress.xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Darslar</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{progress.completedLessonIds.length} ta</p>
          <p className="text-[11px] text-slate-500 font-medium">Tugallangan mavzular</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <FileEdit className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Mashqlar</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{progress.completedExerciseIds.length} ta</p>
          <p className="text-[11px] text-slate-500 font-medium">To‘g‘ri yechilgan misollar</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Brain className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Testlar</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{progress.testHistory.length} ta</p>
          <p className="text-[11px] text-slate-500 font-medium">Topshirilgan sinovlar</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Umumiy daraja</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{overallMastery}%</p>
          <p className="text-[11px] text-slate-500 font-medium">Matematik bilim darajasi</p>
        </div>
      </div>

      {/* Progress Charts & Strong/Weak Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Mastery Progress Bars */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 text-lg">
              Mavzular bo‘yicha o‘zlashtirish
            </h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
              O‘rtacha: {overallMastery}%
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {topicMastery.map(tm => (
              <div key={tm.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{tm.name}</span>
                  <span className="font-mono">{tm.pct}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${tm.color} rounded-full transition-all duration-500`}
                    style={{ width: `${tm.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* AI Diagnostic Recommendation */}
          <div className="mt-5 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-900">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Tahlil va Tavsiya:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              “Siz <strong>Ratsional sonlar (90%)</strong> va <strong>Tenglamalar (85%)</strong> mavzularida yuqori ko‘rsatkichga egasiz. 
              Biroq <strong>Kasrlar va foizlar (64%)</strong> bo‘yicha mashqlarni yana bir oz ko‘proq bajarish umumiy darajangizni 80%+ ga chiqaradi.”
            </p>
          </div>
        </div>

        {/* Strengths & Areas for Improvement */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
          <h2 className="font-extrabold text-slate-900 text-lg">
            Kuchli va rivojlantirish kerak bo‘lgan jihatlar
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Kuchli mavzularingiz:</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 pl-6 list-disc">
                <li>Bir noma’lumli chiziqli tenglamalarni yechish</li>
                <li>Musbat va manfiy sonlar ustida amallar</li>
                <li>Qisqa ko‘paytirish formulalarini qo‘llash</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-xs text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Qiynalayotgan mavzular:</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 pl-6 list-disc">
                <li>Har xil maxrajli kasrlarni qo‘shish va ayirish</li>
                <li>Murakkab matnli masalalarda tenglama tuzish</li>
              </ul>
            </div>
          </div>

          {/* Game High Scores snapshot */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              O‘yinlardagi rekordlar:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(progress.gameScores).map(([gameKey, scr]) => (
                <div key={gameKey} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-500 font-medium capitalize block truncate">
                    {gameKey.replace('-', ' ')}
                  </span>
                  <span className="font-mono font-black text-sm text-indigo-700">
                    {scr} ball
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Test History Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <h2 className="font-extrabold text-slate-900 text-lg">
          So‘nggi test sinovlari tarixi
        </h2>

        {progress.testHistory.length === 0 ? (
          <p className="text-xs text-slate-500">Hozircha test topshirilmagan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                  <th className="py-2.5 px-3">Sana</th>
                  <th className="py-2.5 px-3">Sinf</th>
                  <th className="py-2.5 px-3">Savollar</th>
                  <th className="py-2.5 px-3">To‘g‘ri javob</th>
                  <th className="py-2.5 px-3">Foiz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {progress.testHistory.slice(0, 5).map(th => (
                  <tr key={th.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">{th.date}</td>
                    <td className="py-2.5 px-3 font-bold text-indigo-700">{th.grade}</td>
                    <td className="py-2.5 px-3">{th.totalQuestions} ta</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-600">{th.score} ta</td>
                    <td className="py-2.5 px-3 font-bold">{th.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reset progress option */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={() => {
            if (confirm('Barcha progress va natijalarni qayta boshlang‘ich holatga keltirmoqchimisiz?')) {
              resetProgress();
            }
          }}
          className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Barcha natijalarni tozalash (Reset)</span>
        </button>
      </div>
    </div>
  );
};
