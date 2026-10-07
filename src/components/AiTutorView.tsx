import React, { useState, useRef, useEffect } from 'react';
import { Grade, Section } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  BookOpen, 
  FileEdit, 
  Brain, 
  Gamepad2, 
  RotateCcw,
  User,
  Lightbulb
} from 'lucide-react';

interface AiTutorViewProps {
  selectedGrade: Grade;
  setSelectedGrade: (grade: Grade) => void;
  setSection: (section: Section) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  actions?: Array<{ type: 'LESSON' | 'PRACTICE' | 'TEST' | 'GAME'; label: string; target: string }>;
}

export const AiTutorView: React.FC<AiTutorViewProps> = ({
  selectedGrade,
  setSelectedGrade,
  setSection
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'tutor',
      text: `Salom! Men Hilola Math platformasidagi sizning AI Ustozingizman. 🌟

Men sizga ${selectedGrade} matematika dasturi bo‘yicha istalgan mavzu, formula, tenglama yoki qiyin masalani tushuntirib bera olaman.
“Keling, buni birgalikda bosqichma-bosqich yechamiz!”

Qaysi mavzudan boshlaymiz? Quyidagi tayyor savollardan birini tanlashingiz yoki o‘z savolingizni yozishingiz mumkin.`,
      actions: [
        { type: 'LESSON', label: '📚 Darslarni ko‘rish', target: 'Darslar' },
        { type: 'PRACTICE', label: '📝 Mashq qilish', target: 'Mashqlar' },
        { type: 'GAME', label: '🎮 O‘yin o‘ynash', target: 'Tezkor hisob' }
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const promptSuggestions = [
    'Chiziqli tenglamalar qanday yechiladi?',
    'Oddiy kasrlarni qo‘shish va ayirish qoidasi',
    'Pifagor teoremasi nimani bildiradi?',
    '3x + 12 = 36 tenglamani tushuntirib bering'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text: query.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          grade: selectedGrade,
          history: messages.slice(-4)
        })
      });

      if (!response.ok) {
        throw new Error('Server javob bermadi');
      }

      const data = await response.json();
      parseAndAddTutorResponse(data.reply || "Savolingizni tushundim, birgalikda o'rganamiz!");
    } catch (err) {
      console.warn('Backend fetch failed, using smart client-side tutor engine:', err);
      // Resilient fallback logic
      const fallback = generateClientTutorReply(query.trim(), selectedGrade);
      parseAndAddTutorResponse(fallback);
    } finally {
      setLoading(false);
    }
  };

  const parseAndAddTutorResponse = (rawText: string) => {
    // Extract actions from [ACTION:TYPE:TARGET] tags
    const actions: Array<{ type: 'LESSON' | 'PRACTICE' | 'TEST' | 'GAME'; label: string; target: string }> = [];
    let cleanText = rawText;

    const actionRegex = /\[ACTION:(LESSON|PRACTICE|TEST|GAME):(.*?)\]/g;
    let match;
    while ((match = actionRegex.exec(rawText)) !== null) {
      const actionType = match[1] as 'LESSON' | 'PRACTICE' | 'TEST' | 'GAME';
      const target = match[2];
      let label = '';
      if (actionType === 'LESSON') label = `📚 Darsni ochish (${target})`;
      else if (actionType === 'PRACTICE') label = `📝 Mashqlarni bajarish (${target})`;
      else if (actionType === 'TEST') label = `🧠 Testni boshlash (${target})`;
      else if (actionType === 'GAME') label = `🎮 O‘yinni o‘ynash (${target})`;

      actions.push({ type: actionType, label, target });
    }

    cleanText = rawText.replace(actionRegex, '').trim();

    // Default suggestions if none provided
    if (actions.length === 0) {
      actions.push(
        { type: 'LESSON', label: '📚 Darsni ochish', target: 'Mavzular' },
        { type: 'PRACTICE', label: '📝 Mashq qilish', target: 'Mashqlar' },
        { type: 'TEST', label: '🧠 Testni boshlash', target: 'Testlar' }
      );
    }

    const tutorMsg: Message = {
      id: 't-' + Date.now(),
      sender: 'tutor',
      text: cleanText,
      actions
    };

    setMessages(prev => [...prev, tutorMsg]);
  };

  const handleActionClick = (action: { type: 'LESSON' | 'PRACTICE' | 'TEST' | 'GAME'; target: string }) => {
    if (action.type === 'LESSON') setSection('lessons');
    else if (action.type === 'PRACTICE') setSection('exercises');
    else if (action.type === 'TEST') setSection('tests');
    else if (action.type === 'GAME') setSection('games');
  };

  function generateClientTutorReply(q: string, grade: string): string {
    const l = q.toLowerCase();
    if (l.includes('tenglama') || l.includes('3x') || l.includes('x+')) {
      return `Ajoyib savol! Keling, buni birgalikda bosqichma-bosqich yechamiz.

Chiziqli tenglamalarni yechish qoidalari:
1. Noma’lum qatnashgan hadlarni tenglikning chap tomoniga o‘tkazamiz.
2. Ma’lum sonlarni tenglikning o‘ng tomoniga qarama-qarshi ishora bilan o‘tkazamiz.
3. O‘xshash hadlarni ixchamlab, x ning oldidagi songa bo‘lamiz!

Masalan: 3x + 12 = 36 bo‘lsa:
3x = 36 - 12
3x = 24
x = 24 ÷ 3 = 8

Tenglamalarni yaxshiroq o‘rganmoqchimisiz?
[ACTION:LESSON:Chiziqli tenglamalar]
[ACTION:PRACTICE:Tenglamalar]
[ACTION:GAME:Tenglama detektivi]`;
    }

    if (l.includes('kasr') || l.includes('maxraj') || l.includes('surat')) {
      return `Kasrlar — matematika poydevori! ${grade}da bu mavzuni yaxshi bilish keyingi darslar uchun juda muhim.

Asosiy qoidalar:
• Maxrajlari bir xil bo‘lsa, suratlar qo‘shiladi yoki ayiriladi, maxraj saqlanadi: 2/7 + 3/7 = 5/7.
• Har xil maxrajli kasrlarni qo‘shishda avval umumiy maxraj topiladi.

Keling, buni mustahkamlaymiz:
[ACTION:GAME:Kasrlar o‘yini]
[ACTION:LESSON:Oddiy kasrlar]
[ACTION:PRACTICE:Kasrlar]`;
    }

    if (l.includes('pifagor') || l.includes('uchburchak') || l.includes('gipotenuza')) {
      return `Pifagor teoremasi faqat to‘g‘ri burchakli uchburchak uchun ishlatiladi!

Formula: c² = a² + b²
(Gipotenuza kvadrati katetlar kvadratlari yig‘indisiga teng).

Masalan: katetlar 3 va 4 bo‘lsa:
c² = 3² + 4² = 9 + 16 = 25
c = √25 = 5 sm!

[ACTION:LESSON:Pifagor teoremasi]
[ACTION:GAME:Geometriya ustasi]
[ACTION:TEST:Geometriya]`;
    }

    return `Savolingiz uchun rahmat! Keling, buni birgalikda bosqichma-bosqich tahlil qilamiz.

${grade} darsligiga ko‘ra har qanday matematik masalani yechishda avval berilgan ma’lumotlarni ajratib olamiz, so‘ngra mos qoida yoki formulani qo‘llaymiz.

Sizga bu mavzuni darslar yoki mashqlar orqali o‘rganishni taklif qilaman:
[ACTION:LESSON:Darslar]
[ACTION:PRACTICE:Mashqlar]
[ACTION:GAME:Tezkor hisob]`;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800 text-white p-5 rounded-3xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-amber-300">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black">Hilola Math AI Ustoz</h1>
            <p className="text-xs text-indigo-200">
              {selectedGrade} darajasi bo‘yicha sabrli va do‘stona maslahatchi
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          title="Suhbatni tozalash"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {promptSuggestions.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 rounded-xl text-xs font-semibold text-slate-700 whitespace-nowrap transition-all cursor-pointer shadow-2xs flex items-center gap-1"
          >
            <Lightbulb className="w-3 h-3 text-amber-500" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-xs min-h-[420px] max-h-[580px] overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-sm shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5 text-indigo-700" />}
            </div>

            <div
              className={`max-w-[85%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-xs'
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-xs shadow-2xs'
              }`}
            >
              <div className="whitespace-pre-line font-medium">
                {msg.text}
              </div>

              {/* Action Buttons attached by AI Ustoz (Prompt Requirement) */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="pt-2 border-t border-slate-200/70 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Tavsiya qilingan amallar:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.actions.map((act, actIdx) => (
                      <button
                        key={actIdx}
                        onClick={() => handleActionClick(act)}
                        className="px-3 py-1.5 bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                      >
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-700" />
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>AI Ustoz o‘ylamoqda va yechim tayyorlamoqda...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Matematika savolingiz, misolingiz yoki qiziqtirgan mavzuni yozing..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm shadow-xs"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-2xl font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm shadow-indigo-200"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">Yuborish</span>
        </button>
      </div>
    </div>
  );
};
