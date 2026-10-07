import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Flame, 
  Trophy, 
  Timer, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Car, 
  Search, 
  PieChart, 
  Shapes, 
  Zap,
  CheckCircle2,
  XCircle,
  Award
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import confetti from 'canvas-confetti';

type GameMode = 
  | 'menu'
  | 'speed-math'
  | 'treasure-hunt'
  | 'number-battle'
  | 'equation-detective'
  | 'math-race'
  | 'fraction-game'
  | 'geometry-master';

export const GamesView: React.FC = () => {
  const { progress, saveGameScore, addXp } = useProgress();
  const [activeGame, setActiveGame] = useState<GameMode>('menu');

  // Generic Game State
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  // 1. Tezkor Hisob State
  const [speedProblem, setSpeedProblem] = useState<{ q: string; a: number }>({ q: '7 × 8', a: 56 });
  const [speedInput, setSpeedInput] = useState<string>('');

  // 2. Matematik Xazina State (5 stages)
  const [treasureStage, setTreasureStage] = useState<number>(1);
  const [treasureRiddle, setTreasureRiddle] = useState<string>('');
  const [treasureOptions, setTreasureOptions] = useState<number[]>([]);
  const [treasureAnswer, setTreasureAnswer] = useState<number>(0);

  // 3. Sonlar Jangi State (True/False battle)
  const [battleStatement, setBattleStatement] = useState<string>('15 + 28 = 43');
  const [battleIsCorrect, setBattleIsCorrect] = useState<boolean>(true);

  // 4. Tenglama Detektivi State
  const [detectiveClue, setDetectiveClue] = useState<string>('2x + 6 = 20');
  const [detectiveAnswer, setDetectiveAnswer] = useState<number>(7);
  const [detectiveInput, setDetectiveInput] = useState<string>('');

  // 5. Matematik Poyga State
  const [raceProgress, setRaceProgress] = useState<number>(0); // 0 to 100%
  const [raceProblem, setRaceProblem] = useState<{ q: string; opts: number[]; a: number }>({
    q: '35 ÷ 5 + 9 = ?',
    opts: [16, 14, 18, 12],
    a: 16
  });

  // 6. Kasrlar O'yini State
  const [fractionPair, setFractionPair] = useState<{ f1: string; f2: string; greater: '>' | '<' | '=' }>({
    f1: '3/4',
    f2: '2/3',
    greater: '>'
  });

  // 7. Geometriya Ustasi State
  const [geoQuestion, setGeoQuestion] = useState<{ q: string; opts: number[]; a: number; shape: string }>({
    q: 'Bo‘yi 8 sm, eni 5 sm bo‘lgan to‘g‘ri to‘rtburchak perimetri?',
    opts: [26, 40, 13, 24],
    a: 26,
    shape: 'rectangle'
  });

  // Countdown timer for timed games
  useEffect(() => {
    let t: any = null;
    if (gameRunning && timeLeft > 0) {
      t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (gameRunning && timeLeft <= 0) {
      endGame();
    }
    return () => clearInterval(t);
  }, [gameRunning, timeLeft]);

  const startGame = (mode: GameMode, initialTime: number = 30) => {
    setActiveGame(mode);
    setScore(0);
    setTimeLeft(initialTime);
    setGameFinished(false);
    setGameRunning(true);

    if (mode === 'speed-math') {
      nextSpeedMath();
    } else if (mode === 'treasure-hunt') {
      setTreasureStage(1);
      nextTreasureStage(1);
    } else if (mode === 'number-battle') {
      nextNumberBattle();
    } else if (mode === 'equation-detective') {
      nextDetectiveClue();
    } else if (mode === 'math-race') {
      setRaceProgress(0);
      nextRaceProblem();
    } else if (mode === 'fraction-game') {
      nextFractionPair();
    } else if (mode === 'geometry-master') {
      nextGeoQuestion();
    }
  };

  const endGame = () => {
    setGameRunning(false);
    setGameFinished(true);
    saveGameScore(activeGame, score);
    addXp(Math.max(10, Math.floor(score / 2)));
    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch (e) {
      console.error(e);
    }
  };

  // --- 1. TEZKOR HISOB LOGIC ---
  const nextSpeedMath = () => {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 20) + 2;
    let b = Math.floor(Math.random() * 12) + 2;
    let ans = 0;

    if (op === '+') {
      ans = a + b;
    } else if (op === '-') {
      if (a < b) [a, b] = [b, a];
      ans = a - b;
    } else {
      a = Math.floor(Math.random() * 10) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      ans = a * b;
    }

    setSpeedProblem({ q: `${a} ${op} ${b}`, a: ans });
    setSpeedInput('');
  };

  const handleSpeedSubmit = () => {
    const val = parseInt(speedInput.trim());
    if (val === speedProblem.a) {
      setScore(prev => prev + 10);
      nextSpeedMath();
    } else {
      setSpeedInput('');
    }
  };

  // --- 2. XAZINA OROLI LOGIC ---
  const nextTreasureStage = (stage: number) => {
    const riddles = [
      { q: '1-orol: 7 ta oltin tanga 4 kishiga teng taqsimlanib, 3 ta qoldi. Jami nechta tanga bor edi (7 × 4 + 3)?', a: 31, opts: [31, 28, 35, 25] },
      { q: '2-orol: Xazina eshigi paroli: 12² - 44 = ?', a: 100, opts: [100, 144, 90, 110] },
      { q: '3-orol: Sehrli son: 45 sonining 20% i nechaga teng?', a: 9, opts: [9, 15, 12, 10] },
      { q: '4-orol: Sandiq kodi: 3x - 15 = 45 tenglamada x nechaga teng?', a: 20, opts: [20, 15, 25, 30] },
      { q: '5-orol (Xazina!): 25 × 16 ÷ 4 = ?', a: 100, opts: [100, 80, 120, 150] }
    ];
    const r = riddles[(stage - 1) % riddles.length];
    setTreasureRiddle(r.q);
    setTreasureAnswer(r.a);
    setTreasureOptions(r.opts.sort(() => Math.random() - 0.5));
  };

  const handleTreasurePick = (chosen: number) => {
    if (chosen === treasureAnswer) {
      const next = treasureStage + 1;
      setScore(prev => prev + 25);
      if (next > 5) {
        endGame();
      } else {
        setTreasureStage(next);
        nextTreasureStage(next);
      }
    } else {
      setTimeLeft(prev => Math.max(0, prev - 5));
    }
  };

  // --- 3. SONLAR JANGI LOGIC ---
  const nextNumberBattle = () => {
    const isActuallyTrue = Math.random() > 0.5;
    const a = Math.floor(Math.random() * 30) + 5;
    const b = Math.floor(Math.random() * 30) + 5;
    const correctSum = a + b;
    const displayedSum = isActuallyTrue ? correctSum : correctSum + (Math.random() > 0.5 ? 2 : -2);

    setBattleStatement(`${a} + ${b} = ${displayedSum}`);
    setBattleIsCorrect(displayedSum === correctSum);
  };

  const handleBattleChoice = (userThinksTrue: boolean) => {
    if (userThinksTrue === battleIsCorrect) {
      setScore(prev => prev + 15);
    } else {
      setTimeLeft(prev => Math.max(0, prev - 3));
    }
    nextNumberBattle();
  };

  // --- 4. TENGLAMA DETEKTIVI LOGIC ---
  const nextDetectiveClue = () => {
    const a = Math.floor(Math.random() * 4) + 2;
    const xVal = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 15) + 3;
    const c = a * xVal + b;

    setDetectiveClue(`${a}x + ${b} = ${c}`);
    setDetectiveAnswer(xVal);
    setDetectiveInput('');
  };

  const handleDetectiveSubmit = () => {
    const val = parseInt(detectiveInput.trim());
    if (val === detectiveAnswer) {
      setScore(prev => prev + 20);
      nextDetectiveClue();
    } else {
      setDetectiveInput('');
    }
  };

  // --- 5. MATEMATIK POYGA LOGIC ---
  const nextRaceProblem = () => {
    const a = Math.floor(Math.random() * 15) + 3;
    const b = Math.floor(Math.random() * 15) + 3;
    const sum = a + b;
    const wrong = [sum + 2, sum - 2, sum + 5];
    const all = [sum, ...wrong].sort(() => Math.random() - 0.5);

    setRaceProblem({
      q: `${a} + ${b} = ?`,
      opts: all,
      a: sum
    });
  };

  const handleRaceAnswer = (opt: number) => {
    if (opt === raceProblem.a) {
      const newProg = Math.min(100, raceProgress + 20);
      setRaceProgress(newProg);
      setScore(prev => prev + 25);
      if (newProg >= 100) {
        endGame();
      } else {
        nextRaceProblem();
      }
    } else {
      setTimeLeft(prev => Math.max(0, prev - 4));
    }
  };

  // --- 6. KASRLAR O'YINI LOGIC ---
  const nextFractionPair = () => {
    const fractions = [
      { f1: '1/2', f2: '1/4', g: '>' },
      { f1: '2/5', f2: '3/5', g: '<' },
      { f1: '3/4', f2: '6/8', g: '=' },
      { f1: '5/6', f2: '2/3', g: '>' },
      { f1: '1/3', f2: '1/2', g: '<' },
      { f1: '4/4', f2: '7/7', g: '=' }
    ];
    const chosen = fractions[Math.floor(Math.random() * fractions.length)];
    setFractionPair({ f1: chosen.f1, f2: chosen.f2, greater: chosen.g as any });
  };

  const handleFractionChoice = (sign: '>' | '<' | '=') => {
    if (sign === fractionPair.greater) {
      setScore(prev => prev + 15);
    } else {
      setTimeLeft(prev => Math.max(0, prev - 3));
    }
    nextFractionPair();
  };

  // --- 7. GEOMETRIYA USTASI LOGIC ---
  const nextGeoQuestion = () => {
    const list = [
      { q: 'Tomonlari 6 sm va 4 sm bo‘lgan to‘rtburchak perimetri?', a: 20, opts: [20, 24, 18, 10], shape: 'rectangle' },
      { q: 'Tomoni 5 sm bo‘lgan kvadratning yuzi nechaga teng?', a: 25, opts: [25, 20, 15, 30], shape: 'square' },
      { q: 'Uchburchakning ikki burchagi 50° va 60°. Uchinchi burchagi?', a: 70, opts: [70, 80, 60, 90], shape: 'triangle' },
      { q: 'Radiusi 3 sm bo‘lgan doiraning diametri nechaga teng?', a: 6, opts: [6, 9, 3, 12], shape: 'circle' }
    ];
    const picked = list[Math.floor(Math.random() * list.length)];
    setGeoQuestion(picked);
  };

  const handleGeoAnswer = (opt: number) => {
    if (opt === geoQuestion.a) {
      setScore(prev => prev + 20);
    } else {
      setTimeLeft(prev => Math.max(0, prev - 3));
    }
    nextGeoQuestion();
  };

  const gamesCatalog = [
    {
      id: 'speed-math' as GameMode,
      name: 'Tezkor hisob',
      description: 'Berilgan arifmetik misollarni vaqt tugaguncha imkon qadar tez va to‘g‘ri yeching.',
      icon: Zap,
      gradient: 'from-amber-500 to-orange-600',
      time: 45
    },
    {
      id: 'treasure-hunt' as GameMode,
      name: 'Matematik xazina',
      description: '5 ta orol bo‘ylab xazina qidiruvi: jumboqlarni yechib, oltin sandiqqa yetib boring!',
      icon: Trophy,
      gradient: 'from-yellow-500 to-amber-600',
      time: 60
    },
    {
      id: 'number-battle' as GameMode,
      name: 'Sonlar jangi',
      description: 'To‘g‘ri yoki noto‘g‘ri? Sonli tengliklarni soniyalar ichida tekshirib, g‘alaba qozoning.',
      icon: ShieldCheck,
      gradient: 'from-blue-500 to-indigo-600',
      time: 30
    },
    {
      id: 'equation-detective' as GameMode,
      name: 'Tenglama detektivi',
      description: 'Sirli tenglamadagi yashiringan noma’lum x qiymatini topuvchi haqiqiy detektivga aylaning.',
      icon: Search,
      gradient: 'from-purple-500 to-violet-600',
      time: 45
    },
    {
      id: 'math-race' as GameMode,
      name: 'Matematik poyga',
      description: 'Misollarni tez yechib poyga mashinangizga tezlik bering va marraga birinchi yetib boring!',
      icon: Car,
      gradient: 'from-rose-500 to-red-600',
      time: 40
    },
    {
      id: 'fraction-game' as GameMode,
      name: 'Kasrlar o‘yini',
      description: 'Kasrlarni vizual taqqoslash: katta, kichik yoki teng belgilarini tezkor tanlang.',
      icon: PieChart,
      gradient: 'from-emerald-500 to-teal-600',
      time: 30
    },
    {
      id: 'geometry-master' as GameMode,
      name: 'Geometriya ustasi',
      description: 'Shakllar, perimetr, yuza va burchaklar bo‘yicha vazifalarni bajarib usta unvonini oling.',
      icon: Shapes,
      gradient: 'from-cyan-500 to-blue-600',
      time: 40
    }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            🎮 Matematik o‘yinlar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Zavqli o‘yinlar orqali hisoblash tezligini, mantiqiy fikrlashni va epchillikni rivojlantiring
          </p>
        </div>

        {activeGame !== 'menu' && (
          <button
            onClick={() => setActiveGame('menu')}
            className="self-start sm:self-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>O‘yinlar ro‘yxatiga qaytish</span>
          </button>
        )}
      </div>

      {/* 1. Games Catalog Grid */}
      {activeGame === 'menu' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gamesCatalog.map(g => {
            const Icon = g.icon;
            const highScore = progress.gameScores[g.id] || 0;
            return (
              <div
                key={g.id}
                onClick={() => startGame(g.id, g.time)}
                className="group bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${g.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {highScore > 0 && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-amber-500" /> Rekord: {highScore}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors mb-1.5">
                    {g.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {g.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Vaqt: {g.time} soniya
                  </span>
                  <button className="px-4 py-2 bg-indigo-600 group-hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors">
                    O‘ynash
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Active Game Container */}
      {activeGame !== 'menu' && (
        <div className="max-w-2xl mx-auto space-y-5">
          {/* In-Game Header: Score, Time */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Ball:</span>
              <span className="text-xl font-black text-indigo-600 font-mono">{score}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 font-bold font-mono text-sm">
              <Timer className="w-4 h-4 text-amber-600" />
              <span>{timeLeft}s</span>
            </div>

            <div className="text-xs font-bold text-slate-500">
              Rekord: <span className="font-mono text-slate-800">{progress.gameScores[activeGame] || 0}</span>
            </div>
          </div>

          {/* GAME 1: Tezkor hisob */}
          {activeGame === 'speed-math' && !gameFinished && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-6 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                ⚡ Tezkor hisob
              </span>

              <div className="text-4xl sm:text-5xl font-black text-slate-900 font-mono">
                {speedProblem.q} = ?
              </div>

              <div className="max-w-xs mx-auto flex gap-2">
                <input
                  type="number"
                  autoFocus
                  placeholder="Javob..."
                  value={speedInput}
                  onChange={e => setSpeedInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSpeedSubmit()}
                  className="w-full text-center text-2xl font-bold font-mono py-3 rounded-2xl border-2 border-indigo-200 focus:outline-none focus:border-indigo-600"
                />
                <button
                  onClick={handleSpeedSubmit}
                  className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl text-sm cursor-pointer"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* GAME 2: Matematik xazina */}
          {activeGame === 'treasure-hunt' && !gameFinished && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  🏴‍☠️ {treasureStage}-bosqich (5 tadan)
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Xazinagacha: {5 - treasureStage + 1} qadam
                </span>
              </div>

              <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed text-center">
                {treasureRiddle}
              </p>

              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {treasureOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleTreasurePick(opt)}
                    className="p-4 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded-2xl font-black text-lg text-slate-800 transition-all cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* GAME 3: Sonlar jangi */}
          {activeGame === 'number-battle' && !gameFinished && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-6 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                ⚔️ Tenglik to‘g‘rimi?
              </span>

              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono py-2">
                {battleStatement}
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <button
                  onClick={() => handleBattleChoice(true)}
                  className="py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-200"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>To‘g‘ri</span>
                </button>
                <button
                  onClick={() => handleBattleChoice(false)}
                  className="py-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-rose-200"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Noto‘g‘ri</span>
                </button>
              </div>
            </div>
          )}

          {/* GAME 4: Tenglama detektivi */}
          {activeGame === 'equation-detective' && !gameFinished && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-6 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                🔍 Noma’lum x ni toping
              </span>

              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                {detectiveClue}
              </div>

              <div className="max-w-xs mx-auto flex gap-2">
                <input
                  type="number"
                  autoFocus
                  placeholder="x = ?"
                  value={detectiveInput}
                  onChange={e => setDetectiveInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleDetectiveSubmit()}
                  className="w-full text-center text-2xl font-bold font-mono py-3 rounded-2xl border-2 border-purple-200 focus:outline-none focus:border-purple-600"
                />
                <button
                  onClick={handleDetectiveSubmit}
                  className="px-6 py-3 bg-purple-600 text-white font-bold rounded-2xl text-sm cursor-pointer"
                >
                  Yechish
                </button>
              </div>
            </div>
          )}

          {/* GAME 5: Matematik poyga */}
          {activeGame === 'math-race' && !gameFinished && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 shadow-xs text-center">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>Marragacha masofa:</span>
                  <span>{raceProgress}%</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full transition-all duration-300"
                    style={{ width: `${raceProgress}%` }}
                  />
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono py-2">
                {raceProblem.q}
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                {raceProblem.opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleRaceAnswer(opt)}
                    className="p-3.5 bg-slate-50 hover:bg-rose-50 hover:border-rose-300 border border-slate-200 rounded-2xl font-black text-base text-slate-800 transition-all cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* GAME 6: Kasrlar o'yini */}
          {activeGame === 'fraction-game' && !gameFinished && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-6 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                🥧 Kasrlarni taqqoslang
              </span>

              <div className="flex items-center justify-center gap-6 text-4xl sm:text-5xl font-black text-slate-900 font-mono py-3">
                <span className="px-4 py-2 bg-slate-50 rounded-2xl border">{fractionPair.f1}</span>
                <span className="text-indigo-400">?</span>
                <span className="px-4 py-2 bg-slate-50 rounded-2xl border">{fractionPair.f2}</span>
              </div>

              <div className="flex justify-center gap-4 max-w-xs mx-auto">
                {(['<', '=', '>'] as const).map(sign => (
                  <button
                    key={sign}
                    onClick={() => handleFractionChoice(sign)}
                    className="w-16 h-16 bg-indigo-50 hover:bg-indigo-600 hover:text-white border border-indigo-200 rounded-2xl font-black text-2xl text-indigo-700 transition-all cursor-pointer flex items-center justify-center"
                  >
                    {sign}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* GAME 7: Geometriya ustasi */}
          {activeGame === 'geometry-master' && !gameFinished && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-6 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
                📐 Geometriya jumboqlari
              </span>

              <p className="text-lg sm:text-xl font-bold text-slate-800 max-w-md mx-auto">
                {geoQuestion.q}
              </p>

              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                {geoQuestion.opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleGeoAnswer(opt)}
                    className="p-3.5 bg-slate-50 hover:bg-cyan-50 hover:border-cyan-300 border border-slate-200 rounded-2xl font-black text-base text-slate-800 transition-all cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameFinished && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-5 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">O‘yin yakunlandi!</h2>
                <p className="text-xs text-slate-500 mt-1">Barakalla, ajoyib ishtirok!</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 max-w-xs mx-auto">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Yakuniy ball:</span>
                <span className="text-3xl font-black text-indigo-600 font-mono">{score}</span>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => startGame(activeGame)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
                >
                  Qayta o‘ynash
                </button>
                <button
                  onClick={() => setActiveGame('menu')}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
                >
                  O‘yinlar menyusi
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
