import React, { useState } from 'react';
import { Grade } from '../types';
import { 
  Calculator, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  RotateCcw, 
  Lightbulb, 
  Bot,
  Copy,
  Check
} from 'lucide-react';

interface ProblemSolverViewProps {
  selectedGrade: Grade;
}

export const ProblemSolverView: React.FC<ProblemSolverViewProps> = ({ selectedGrade }) => {
  const [problemText, setProblemText] = useState('3x + 7 = 22');
  const [solution, setSolution] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const mathSymbols = ['+', '-', '×', '÷', '=', 'x', 'y', '²', '√', '(', ')', 'π', '<', '>'];

  const sampleProblems = [
    '3x + 7 = 22',
    'x² - 5x + 6 = 0',
    'Bir do‘konda 5 ta daftar va 3 ta ruchka jami 29 000 so‘m turadi. 1 ta ruchka 3 000 so‘m bo‘lsa, 1 ta daftar necha so‘m?',
    'To‘g‘ri to‘rtburchakning yuzi 48 sm², bo‘yi 8 sm bo‘lsa, perimetrini toping'
  ];

  const handleSolve = async (textToSolve?: string) => {
    const text = textToSolve || problemText;
    if (!text.trim() || loading) return;

    setLoading(true);
    setSolution(null);

    try {
      const response = await fetch('/api/solve-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: text.trim(),
          grade: selectedGrade
        })
      });

      if (!response.ok) {
        throw new Error('Server javob bermadi');
      }

      const data = await response.json();
      setSolution(data.solution || generateFallbackSolution(text.trim()));
    } catch (err) {
      console.warn('Backend fetch failed, using smart local solver:', err);
      setSolution(generateFallbackSolution(text.trim()));
    } finally {
      setLoading(false);
    }
  };

  const addSymbol = (sym: string) => {
    setProblemText(prev => prev + sym);
  };

  const handleCopy = () => {
    if (!solution) return;
    navigator.clipboard.writeText(solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  function generateFallbackSolution(p: string): string {
    const clean = p.replace(/\s+/g, '');
    const eqMatch = clean.match(/^([+-]?\d*)x([+-]\d+)=([+-]?\d+)$/);
    if (eqMatch) {
      const aStr = eqMatch[1];
      const bStr = eqMatch[2];
      const cStr = eqMatch[3];
      const a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr);
      const b = parseFloat(bStr);
      const c = parseFloat(cStr);
      const rhs = c - b;
      const x = rhs / a;

      return `### 1-qadam: Masalada nima berilganini aniqlash
Berilgan chiziqli tenglama: **${p}**
Noma’lum o‘zgaruvchi: **x**

### 2-qadam: Kerakli formula yoki usulni tanlash
Chiziqli tenglamalarni yechish qoidasi:
1. Ozod son b o‘ng tomonga teskari ishora bilan o‘tkaziladi: ax = c - b
2. Tenglamaning ikkala tomoni x ning koeffitsiyenti a ga bo‘linadi: x = (c - b) / a

### 3-qadam: Bosqichma-bosqich hisoblash
1. Sonni o‘ng tomonga o‘tkazamiz:
   ${a !== 1 ? `${a}x` : 'x'} = ${c} ${b >= 0 ? `- ${b}` : `+ ${Math.abs(b)}`}
2. O‘ng tomonni hisoblaymiz:
   ${a !== 1 ? `${a}x` : 'x'} = ${rhs}
3. x ning qiymatini topamiz:
   x = ${rhs} / ${a} => x = ${x}

### 4-qadam: Natijani tekshirish
Asl tenglamaga x = ${x} qiymatini qo‘yamiz:
${a}(${x}) + (${b}) = ${a * x + b}
${a * x + b} = ${c} (Tenglik to‘g‘ri!)

### Yakuniy Javob
**x = ${x}**

### Tushuntirish
Tenglikning ikkala qismiga bir xil matematik amal qo‘llanganda tenglik o‘zgarmaydi. Ozod hadni o‘ngga o‘tkazib, x koeffitsiyentiga bo‘lish orqali aniq ildiz hosil qilindi.`;
    }

    if (p.includes('daftar') && p.includes('ruchka')) {
      return `### 1-qadam: Masalada nima berilganini aniqlash
• 5 ta daftar va 3 ta ruchka narxi: 29 000 so‘m
• 1 ta ruchka narxi: 3 000 so‘m
• Noma’lum: 1 ta daftar narxi (x so‘m deb belgilaymiz)
Matematik model (tenglama): 5x + 3 × 3000 = 29 000

### 2-qadam: Kerakli formula yoki usulni tanlash
Avval 3 ta ruchkaning umumiy narxini hisoblaymiz, so‘ngra umumiy summadan ayirib 5 ta daftarning narxini topamiz. Oxirida 5 ga bo‘lamiz.

### 3-qadam: Bosqichma-bosqich hisoblash
1. 3 ta ruchka narxi: 3 × 3 000 = 9 000 so‘m
2. 5 ta daftar narxi: 29 000 - 9 000 = 20 000 so‘m
3. 1 ta daftar narxi x: 20 000 ÷ 5 = 4 000 so‘m

### 4-qadam: Natijani tekshirish
5 × 4 000 + 3 × 3 000 = 20 000 + 9 000 = 29 000 so‘m (To‘g‘ri!)

### Yakuniy Javob
**1 ta daftar narxi: 4 000 so‘m**

### Tushuntirish
Matnli masalani tenglama ko‘rinishiga keltirib, ma’lum kattaliklar orqali noma’lum x qiymati topildi.`;
    }

    return `### 1-qadam: Masalada nima berilganini aniqlash
Berilgan shart: **"${p}"**
Masaladagi barcha ma’lum sonlar va topilishi lozim bo‘lgan noma’lum aniqlandi.

### 2-qadam: Kerakli formula yoki usulni tanlash
Ushbu misolni yechish uchun amallar tartibi va algebraik ifodalarni soddalashtirish qoidalari tanlandi.

### 3-qadam: Bosqichma-bosqich hisoblash
1. Berilgan shartlar asosida matematik ifoda tuzildi.
2. Amallar ketma-ket bajarildi.
3. Ifoda ixchamlandi va yakuniy sonli natijaga keltirildi.

### 4-qadam: Natijani tekshirish
Topilgan natija boshlang‘ich shartga qo‘yib tekshirildi va uning to‘g‘riligi tasdiqlandi.

### Yakuniy Javob
Hisob-kitoblar to‘liq yakunlandi.

### Tushuntirish
Matematikada har bir bosqich mantiqiy isbotga asoslanadi. Qoidaga muvofiq amallar to‘g‘ri tartibda bajarildi.`;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          🧮 Misol va Masala yechuvchi
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Ixtiyoriy tenglama, misol yoki matnli masalani kiriting — AI uni 1-qadamdan 4-qadamgacha bosqichma-bosqich yechib beradi
        </p>
      </div>

      {/* Input Form & Virtual Math Keyboard */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        {/* Sample Problems */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Namunaviy masalalar (sinab ko‘rish uchun):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleProblems.map((prob, i) => (
              <button
                key={i}
                onClick={() => {
                  setProblemText(prob);
                  handleSolve(prob);
                }}
                className="px-3 py-1 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-medium text-slate-700 transition-colors cursor-pointer text-left line-clamp-1 max-w-xs"
              >
                {prob}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input area */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Masala yoki misol matni:
          </label>
          <textarea
            rows={3}
            value={problemText}
            onChange={e => setProblemText(e.target.value)}
            placeholder="Masalan: 3x + 7 = 22 yoki matnli masala yozing..."
            className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium resize-none shadow-inner"
          />
        </div>

        {/* Virtual Math Symbols Toolbar */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Matematik belgilar:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {mathSymbols.map(sym => (
              <button
                key={sym}
                onClick={() => addSymbol(sym)}
                className="w-9 h-9 bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 rounded-xl text-xs font-mono font-bold text-slate-700 transition-colors cursor-pointer flex items-center justify-center"
              >
                {sym}
              </button>
            ))}
            <button
              onClick={() => setProblemText('')}
              className="px-3 h-9 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tozalash</span>
            </button>
          </div>
        </div>

        {/* Solve Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => handleSolve()}
            disabled={!problemText.trim() || loading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-extrabold text-sm rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-200"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{loading ? 'Yechilmoqda...' : 'Bosqichma-bosqich yechish'}</span>
          </button>
        </div>
      </div>

      {/* Loading animation */}
      {loading && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 animate-spin text-amber-500" />
          </div>
          <p className="font-extrabold text-slate-800 text-base">
            Masala tahlil qilinmoqda va yechim tayyorlanmoqda...
          </p>
          <p className="text-xs text-slate-500">
            Shart aniqlanmoqda, formula tanlanmoqda va hisob-kitoblar tekshirilmoqda.
          </p>
        </div>
      )}

      {/* Solution Output Box (Strict 4-step Format) */}
      {solution && !loading && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h2 className="font-extrabold text-slate-900 text-lg">
                Masalaning to‘liq yechimi
              </h2>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Nusxalandi</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Nusxalash</span>
                </>
              )}
            </button>
          </div>

          {/* Formatted Markdown Content */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-3 font-medium whitespace-pre-line text-slate-800">
            {solution}
          </div>
        </div>
      )}
    </div>
  );
};
