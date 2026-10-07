import { TestQuestion } from '../types';

export const TEST_BANK: TestQuestion[] = [
  // 5-sinf
  {
    id: 't-5-1',
    grade: '5-sinf',
    topic: 'Natural sonlar',
    question: '48 + 52 × 2 ifodaning qiymati nechaga teng?',
    options: ['152', '200', '104', '148'],
    correctIndex: 0,
    explanation: 'Avval ko\'paytirish: 52 × 2 = 104. So\'ng qo\'shish: 48 + 104 = 152.'
  },
  {
    id: 't-5-2',
    grade: '5-sinf',
    topic: 'Kasrlar',
    question: 'Quyidagi kasrlardan qaysi biri eng katta?',
    options: ['3/8', '5/8', '7/8', '1/8'],
    correctIndex: 2,
    explanation: 'Maxrajlari bir xil bo\'lganda surati kattasi eng katta bo\'ladi: 7/8.'
  },
  {
    id: 't-5-3',
    grade: '5-sinf',
    topic: 'Geometriya',
    question: 'Tomoni 7 sm bo\'lgan kvadratning yuzi nechaga teng?',
    options: ['28 sm²', '49 sm²', '14 sm²', '21 sm²'],
    correctIndex: 1,
    explanation: 'Kvadrat yuzi S = a² = 7² = 49 sm².'
  },
  {
    id: 't-5-4',
    grade: '5-sinf',
    topic: 'Foizlar',
    question: '200 sonining 25% i nechaga teng?',
    options: ['25', '50', '75', '100'],
    correctIndex: 1,
    explanation: '200 × 0.25 = 50 (yoki 200 ning to\'rtdan bir qismi).'
  },
  {
    id: 't-5-5',
    grade: '5-sinf',
    topic: 'Vaqt va o\'lchov',
    question: '3 soat 45 minut necha minutga teng?',
    options: ['225 minut', '180 minut', '195 minut', '245 minut'],
    correctIndex: 0,
    explanation: '3 × 60 + 45 = 180 + 45 = 225 minut.'
  },

  // 6-sinf
  {
    id: 't-6-1',
    grade: '6-sinf',
    topic: 'Ratsional sonlar',
    question: '(-12) × (-5) + (-20) ifodaning qiymati:',
    options: ['40', '-40', '80', '-80'],
    correctIndex: 0,
    explanation: '(-12) × (-5) = +60. 60 + (-20) = 40.'
  },
  {
    id: 't-6-2',
    grade: '6-sinf',
    topic: 'Proporsiya',
    question: 'Agar 3 kg olma 18 000 so\'m tursa, 5 kg olma qancha turadi?',
    options: ['24 000 so\'m', '30 000 so\'m', '36 000 so\'m', '25 000 so\'m'],
    correctIndex: 1,
    explanation: '1 kg olma = 18000 ÷ 3 = 6000 so\'m. 5 kg = 5 × 6000 = 30 000 so\'m.'
  },
  {
    id: 't-6-3',
    grade: '6-sinf',
    topic: 'Modul',
    question: '|-25| - |15| ifodaning qiymati nechaga teng?',
    options: ['10', '-10', '40', '-40'],
    correctIndex: 0,
    explanation: '25 - 15 = 10.'
  },
  {
    id: 't-6-4',
    grade: '6-sinf',
    topic: 'Tenglamalar',
    question: '-4x = 28 tenglamaning ildizi nechaga teng?',
    options: ['7', '-7', '24', '-24'],
    correctIndex: 1,
    explanation: 'x = 28 ÷ (-4) = -7.'
  },

  // 7-sinf
  {
    id: 't-7-1',
    grade: '7-sinf',
    topic: 'Chiziqli tenglamalar',
    question: '4x - 9 = 2x + 11 tenglamaning ildizi:',
    options: ['10', '8', '5', '12'],
    correctIndex: 0,
    explanation: '4x - 2x = 11 + 9 => 2x = 20 => x = 10.'
  },
  {
    id: 't-7-2',
    grade: '7-sinf',
    topic: 'Qisqa ko\'paytirish',
    question: '(x + 6)² ning to\'g\'ri yoyilmasi:',
    options: ['x² + 36', 'x² + 12x + 36', 'x² + 6x + 36', '2x + 12'],
    correctIndex: 1,
    explanation: 'a² + 2ab + b² => x² + 2(x)(6) + 36 = x² + 12x + 36.'
  },
  {
    id: 't-7-3',
    grade: '7-sinf',
    topic: 'Daraja xossalari',
    question: 'a⁵ × a³ ÷ a⁴ ifodaning soddalashtirilgan ko\'rinishi:',
    options: ['a⁴', 'a³', 'a²', 'a⁶'],
    correctIndex: 0,
    explanation: 'Ko\'paytirilganda darajalar qo\'shiladi, bo\'linganda ayiriladi: 5 + 3 - 4 = 4.'
  },
  {
    id: 't-7-4',
    grade: '7-sinf',
    topic: 'Geometriya',
    question: 'Uchburchakning ikki burchagi 40° va 70° bo\'lsa, uchinchi burchagi necha gradus?',
    options: ['70°', '80°', '60°', '90°'],
    correctIndex: 0,
    explanation: 'Uchburchak burchaklari yig\'indisi 180°: 180 - (40 + 70) = 70°.'
  },

  // 8-sinf
  {
    id: 't-8-1',
    grade: '8-sinf',
    topic: 'Kvadrat tenglamalar',
    question: 'x² - 5x + 6 = 0 tenglamaning ildizlari yig\'indisi nimaga teng?',
    options: ['-5', '5', '6', '-6'],
    correctIndex: 1,
    explanation: 'Viyet teoremasiga ko\'ra x₁ + x₂ = -p = 5.'
  },
  {
    id: 't-8-2',
    grade: '8-sinf',
    topic: 'Pifagor teoremasi',
    question: 'Katetlari 6 sm va 8 sm bo\'lgan to\'g\'ri burchakli uchburchakning gipotenuzasi:',
    options: ['10 sm', '12 sm', '14 sm', '9 sm'],
    correctIndex: 0,
    explanation: 'c = √(6² + 8²) = √(36 + 64) = √100 = 10 sm.'
  },
  {
    id: 't-8-3',
    grade: '8-sinf',
    topic: 'Kvadrat ildizlar',
    question: '√(75) ifodani ildiz belgisi ostidan ko\'paytuvchi chiqarib yozing:',
    options: ['5√3', '3√5', '25√3', '15√5'],
    correctIndex: 0,
    explanation: '√75 = √(25 × 3) = 5√3.'
  },
  {
    id: 't-8-4',
    grade: '8-sinf',
    topic: 'Tengsizliklar',
    question: '3x - 5 > 7 tengsizlikning yechimi:',
    options: ['x > 4', 'x < 4', 'x > 12', 'x < 12'],
    correctIndex: 0,
    explanation: '3x > 12 => x > 4.'
  },

  // 9-sinf
  {
    id: 't-9-1',
    grade: '9-sinf',
    topic: 'Progressiya',
    question: 'a₁ = 5 va d = 3 bo\'lgan arifmetik progressiyaning 5-hadi nechaga teng?',
    options: ['17', '20', '15', '14'],
    correctIndex: 0,
    explanation: 'a₅ = 5 + 4 × 3 = 17.'
  },
  {
    id: 't-9-2',
    grade: '9-sinf',
    topic: 'Trigonometriya',
    question: 'sin² α + cos² α ifodaning qiymati har doim nimaga teng?',
    options: ['0', '1', '2', 'tg α'],
    correctIndex: 1,
    explanation: 'Asosiy trigonometrik ayniyat: sin² α + cos² α = 1.'
  },
  {
    id: 't-9-3',
    grade: '9-sinf',
    topic: 'Kvadrat funksiya',
    question: 'y = (x - 2)² + 3 parabolaning uchi qaysi nuqtada joylashgan?',
    options: ['(2; 3)', '(-2; 3)', '(2; -3)', '(-2; -3)'],
    correctIndex: 0,
    explanation: 'y = a(x - x₀)² + y₀ parabolaning uchi (x₀; y₀) nuqtada: (2; 3).'
  },

  // 10-sinf
  {
    id: 't-10-1',
    grade: '10-sinf',
    topic: 'Logarifm',
    question: 'log₂ 64 ning qiymati nechaga teng?',
    options: ['4', '5', '6', '8'],
    correctIndex: 2,
    explanation: '2⁶ = 64 bo\'lgani sababli log₂ 64 = 6.'
  },
  {
    id: 't-10-2',
    grade: '10-sinf',
    topic: 'Ko\'rsatkichli tenglamalar',
    question: '3^(x + 1) = 81 tenglamaning ildizi:',
    options: ['2', '3', '4', '1'],
    correctIndex: 1,
    explanation: '81 = 3⁴ => x + 1 = 4 => x = 3.'
  },

  // 11-sinf
  {
    id: 't-11-1',
    grade: '11-sinf',
    topic: 'Hosila',
    question: 'f(x) = 3x² - 4x + 5 funksiyaning hosilasi:',
    options: ['6x - 4', '3x - 4', '6x² - 4', '6x'],
    correctIndex: 0,
    explanation: '(3x²)\' = 6x, (-4x)\' = -4, (5)\' = 0 => 6x - 4.'
  },
  {
    id: 't-11-2',
    grade: '11-sinf',
    topic: 'Integral',
    question: '∫ 2x dx boshlang\'ich funksiyasi nimaga teng?',
    options: ['x² + C', '2x² + C', 'x + C', '2 + C'],
    correctIndex: 0,
    explanation: '2 × (x² / 2) + C = x² + C.'
  }
];
