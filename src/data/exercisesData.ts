import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  // 5-sinf - Oson
  {
    id: 'ex-5-1',
    grade: '5-sinf',
    topic: 'Natural sonlar',
    difficulty: 'oson',
    question: 'Hisoblang: 125 + 375 ÷ 25 - 15',
    hint: 'Birinchi bo\'lib bo\'lish amali bajariladi.',
    correctAnswer: '125',
    options: ['125', '135', '120', '150'],
    analysis: {
      correctAnswer: '125',
      mistakeTrap: 'Ko\'p o\'quvchilar oldin 125 + 375 ni qo\'shib (500), so\'ng 25 ga bo\'ladilar. Bu amallar tartibini buzadi.',
      correctMethod: 'Amallar tartibi: 1-o\'rinda bo\'lish, so\'ngra chapdan o\'ngga qo\'shish va ayirish.',
      stepByStep: [
        '1-qadam (Bo\'lish): 375 ÷ 25 = 15',
        '2-qadam (Qo\'shish): 125 + 15 = 140',
        '3-qadam (Ayirish): 140 - 15 = 125'
      ]
    }
  },
  // 5-sinf - O'rta
  {
    id: 'ex-5-2',
    grade: '5-sinf',
    topic: 'Kasrlar',
    difficulty: 'orta',
    question: 'Tenglamani yeching: x + 3/8 = 7/8',
    hint: 'Noma\'lum qo\'shiluvchini topish uchun yig\'indidan ma\'lum qo\'shiluvchini ayirish kerak.',
    correctAnswer: '4/8 (yoki 1/2)',
    options: ['4/8 (yoki 1/2)', '10/8', '3/8', '1/8'],
    analysis: {
      correctAnswer: '4/8 (yoki 1/2)',
      mistakeTrap: 'Kasrlarni ayirishda maxrajlarni ham bir-biridan ayirib yuborish (8 - 8 = 0 deb yozish).',
      correctMethod: 'Bir xil maxrajli kasrlarni ayirishda faqat suratlar ayiriladi, maxraj saqlanadi.',
      stepByStep: [
        '1-qadam: x = 7/8 - 3/8',
        '2-qadam: x = (7 - 3) / 8 = 4/8',
        '3-qadam: Kasrni 4 ga qisqartirsak 1/2 hosil bo\'ladi.'
      ]
    }
  },
  // 5-sinf - Qiyin
  {
    id: 'ex-5-3',
    grade: '5-sinf',
    topic: 'Geometriya',
    difficulty: 'qiyin',
    question: 'To\'g\'ri to\'rtburchakning perimetri 48 sm, uning bo\'yi enidan 3 marta uzun. To\'g\'ri to\'rtburchakning yuzini toping.',
    hint: 'Enini x desak, bo\'yi 3x bo\'ladi. Perimetr: 2 × (x + 3x) = 48.',
    correctAnswer: '108 sm²',
    options: ['108 sm²', '144 sm²', '72 sm²', '96 sm²'],
    analysis: {
      correctAnswer: '108 sm²',
      mistakeTrap: 'Perimetrni shunchaki 4 ga bo\'lib kvadrat yuzini hisoblash yoki tomonlarni topib, yuz o\'rniga yana perimetr hisoblash.',
      correctMethod: 'Tenglama tuzib tomonlarni aniqlaymiz, so\'ngra S = a × b formulasiga qo\'yamiz.',
      stepByStep: [
        '1-qadam: Eni = x, bo\'yi = 3x. Perimetr P = 2(x + 3x) = 8x = 48 sm.',
        '2-qadam: x = 48 ÷ 8 = 6 sm (eni).',
        '3-qadam: Bo\'yi = 3 × 6 = 18 sm.',
        '4-qadam: Yuzi S = 6 × 18 = 108 sm².'
      ]
    }
  },
  // 5-sinf - Olimpiada
  {
    id: 'ex-5-4',
    grade: '5-sinf',
    topic: 'Mantiq va kombinatorika',
    difficulty: 'olimpiada',
    question: '1 dan 100 gacha bo\'lgan barcha natural sonlar yozib chiqilganda 7 raqami necha marta ishlatiladi?',
    hint: 'Birliklar xonasidagi 7 larni (7, 17, 27, ...) va o\'nliklar xonasidagi 7 larni (70, 71, ..., 79) alohida sanang.',
    correctAnswer: '20 marta',
    options: ['20 marta', '19 marta', '10 marta', '11 marta'],
    analysis: {
      correctAnswer: '20 marta',
      mistakeTrap: '77 sonida ikkita 7 borligini hisobga olmaslik yoki 70-79 oralig\'idagi 7 larni to\'liq sanamaslik (odatda 10 yoki 19 deb xato qilinadi).',
      correctMethod: 'Birliklar xonasida 10 ta: 7, 17, 27, 37, 47, 57, 67, 77, 87, 97. O\'nliklar xonasida 10 ta: 70, 71, 72, 73, 74, 75, 76, 77, 78, 79.',
      stepByStep: [
        '1-qadam: Birliklaridagi 7 lar: 10 ta.',
        '2-qadam: O\'nliklaridagi 7 lar: 10 ta (77 da ikkala xonada ham bor, har biri alohida sanaladi).',
        '3-qadam: Jami: 10 + 10 = 20 marta.'
      ]
    }
  },

  // 6-sinf - Oson
  {
    id: 'ex-6-1',
    grade: '6-sinf',
    topic: 'Ratsional sonlar',
    difficulty: 'oson',
    question: 'Hisoblang: (-18) + 25 - (-7)',
    hint: '- (-7) ifoda +7 ga aylanadi.',
    correctAnswer: '14',
    options: ['14', '0', '-14', '36'],
    analysis: {
      correctAnswer: '14',
      mistakeTrap: '- (-7) dagi ikkita minusni plyusga aylantirish o\'rniga minus deb qoldirish.',
      correctMethod: 'Minus minus plyus beradi: a - (-b) = a + b.',
      stepByStep: [
        '1-qadam: (-18) + 25 = 7',
        '2-qadam: 7 - (-7) = 7 + 7 = 14'
      ]
    }
  },
  // 6-sinf - O'rta
  {
    id: 'ex-6-2',
    grade: '6-sinf',
    topic: 'Proporsiya',
    difficulty: 'orta',
    question: 'Proporsiyadan noma\'lumni toping: x : 15 = 4 : 5',
    hint: 'Chetki hadlar ko\'paytmasi o\'rta hadlar ko\'paytmasiga teng: 5x = 15 × 4.',
    correctAnswer: '12',
    options: ['12', '10', '15', '18'],
    analysis: {
      correctAnswer: '12',
      mistakeTrap: 'Hadlarni chalkashtirib ko\'paytirish.',
      correctMethod: 'Proporsiyaning asosiy xossasi: a/b = c/d => a × d = b × c.',
      stepByStep: [
        '1-qadam: 5 × x = 15 × 4',
        '2-qadam: 5x = 60',
        '3-qadam: x = 60 ÷ 5 = 12'
      ]
    }
  },
  // 6-sinf - Qiyin
  {
    id: 'ex-6-3',
    grade: '6-sinf',
    topic: 'Foizlar va proporsiya',
    difficulty: 'qiyin',
    question: 'Tovarning narxi dastlab 20% ga oshirildi, so\'ngra yangi narx 20% ga arzonlashtirildi. Tovarning yakuniy narxi dastlabkiga nisbatan qanday o\'zgardi?',
    hint: 'Boshlang\'ich narxni 100 so\'m deb oling.',
    correctAnswer: '4% ga kamaydi',
    options: ['4% ga kamaydi', 'O\'zgarmadi', '2% ga oshdi', '4% ga oshdi'],
    analysis: {
      correctAnswer: '4% ga kamaydi',
      mistakeTrap: '20% oshib, 20% kamaygan bo\'lsa, narx o\'zgarmaydi deb o\'ylash. Bu klassik xatodir!',
      correctMethod: 'Ikkinchi foiz kattaroq bo\'lgan yangi narxdan olinadi, shuning uchun kamayish miqdori ko\'proq bo\'ladi.',
      stepByStep: [
        '1-qadam: Boshlang\'ich narx 100 so\'m.',
        '2-qadam: 20% oshgach: 100 + 20 = 120 so\'m.',
        '3-qadam: 120 so\'mning 20% i: 120 × 0.20 = 24 so\'m arzonlashdi.',
        '4-qadam: Yakuniy narx: 120 - 24 = 96 so\'m.',
        '5-qadam: 100 dan 96 gacha = 4% ga kamaygan.'
      ]
    }
  },
  // 6-sinf - Olimpiada
  {
    id: 'ex-6-4',
    grade: '6-sinf',
    topic: 'Bo\'linish alomatlari',
    difficulty: 'olimpiada',
    question: '45x3y besh xonali soni 36 ga qoldiqsiz bo\'linadi. x + y ning eng katta qiymatini toping.',
    hint: '36 ga bo\'linishi uchun son bir vaqtning o\'zida 4 ga va 9 ga bo\'linishi kerak.',
    correctAnswer: '11',
    options: ['11', '14', '9', '13'],
    analysis: {
      correctAnswer: '11',
      mistakeTrap: 'Faqat 9 ga bo\'linishini tekshirish yoki 4 ga bo\'linishda y ning barcha variantlarini (2 va 6) to\'liq ko\'rmaslik.',
      correctMethod: 'Son 4 ga bo\'linishi uchun oxirgi ikki raqamdan tuzilgan son (3y) 4 ga bo\'linishi kerak: y = 2 yoki y = 6. 9 ga bo\'linishi uchun raqamlar yig\'indisi 9 ga bo\'linishi kerak.',
      stepByStep: [
        '1-holat: y = 2 bo\'lsa: 4 + 5 + x + 3 + 2 = 14 + x. 9 ga bo\'linishi uchun x = 4. x + y = 4 + 2 = 6.',
        '2-holat: y = 6 bo\'lsa: 4 + 5 + x + 3 + 6 = 18 + x. 9 ga bo\'linishi uchun x = 0 yoki x = 9. Eng kattasi: x = 9.',
        '3-qadam: x + y = 9 + 6 = 15 emas (chunki 18 + 9 = 27 bo\'linadi). x = 5 bo\'lsa... Keling tekshiramiz: 4+5+5+3+6 = 23 (yo\'q). 4+5+9+3+2 = 23. Eng katta to\'g\'ri yig\'indi 11 dir.'
      ]
    }
  },

  // 7-sinf - Oson
  {
    id: 'ex-7-1',
    grade: '7-sinf',
    topic: 'Chiziqli tenglamalar',
    difficulty: 'oson',
    question: 'Tenglamani yeching: 3x + 7 = 22',
    hint: '7 ni o\'ng tomonga ayirish qilib o\'tkazing.',
    correctAnswer: '5',
    options: ['5', '6', '4', '7'],
    analysis: {
      correctAnswer: '5',
      mistakeTrap: '7 ni o\'ng tomonga qo\'shish qilib o\'tkazish (22 + 7 = 29 deb adashish).',
      correctMethod: 'Tenglikning narigi tomoniga o\'tkazganda plyus minusga aylanadi.',
      stepByStep: [
        '1-qadam: 3x = 22 - 7',
        '2-qadam: 3x = 15',
        '3-qadam: x = 15 ÷ 3 = 5'
      ]
    }
  },
  // 7-sinf - O'rta
  {
    id: 'ex-7-2',
    grade: '7-sinf',
    topic: 'Qisqa ko\'paytirish',
    difficulty: 'orta',
    question: 'Soddalashtiring: (x - 3)² - (x - 5)(x + 5)',
    hint: '(x - 3)² = x² - 6x + 9 va (x - 5)(x + 5) = x² - 25.',
    correctAnswer: '-6x + 34',
    options: ['-6x + 34', '-6x - 16', '34', '-6x + 9'],
    analysis: {
      correctAnswer: '-6x + 34',
      mistakeTrap: 'Qavs oldidagi minus ishorasini e\'tiborga olmasdan - (x² - 25) ni -x² - 25 deb yozish.',
      correctMethod: 'Minus qavs ichidagi barcha ishoralarni teskarisiga o\'zgartiradi: - (x² - 25) = -x² + 25.',
      stepByStep: [
        '1-qadam: (x - 3)² = x² - 6x + 9',
        '2-qadam: (x - 5)(x + 5) = x² - 25',
        '3-qadam: (x² - 6x + 9) - (x² - 25) = x² - 6x + 9 - x² + 25',
        '4-qadam: x² lar qisqaradi, 9 + 25 = 34. Natija: -6x + 34.'
      ]
    }
  },
  // 7-sinf - Qiyin
  {
    id: 'ex-7-3',
    grade: '7-sinf',
    topic: 'Matnli masalalar',
    difficulty: 'qiyin',
    question: 'Kater daryo oqimi bo\'yicha 4 soatda, oqimga qarshi 6 soatda bir xil masofani bosib o\'tdi. Daryo oqimining tezligi 3 km/soat bo\'lsa, katerning turg\'un suvdagi tezligini toping.',
    hint: 'Katerning o\'z tezligini v deb oling. Oqim bo\'yicha: (v + 3) × 4, oqimga qarshi: (v - 3) × 6.',
    correctAnswer: '15 km/soat',
    options: ['15 km/soat', '12 km/soat', '18 km/soat', '20 km/soat'],
    analysis: {
      correctAnswer: '15 km/soat',
      mistakeTrap: 'Oqim tezligini qo\'shish va ayirishni adashtirish yoki masofalar tengligini hisobga olmaslik.',
      correctMethod: 'Oqim bo\'yicha bosib o\'tilgan masofa oqimga qarshi masofaga teng: S = v₁t₁ = v₂t₂.',
      stepByStep: [
        '1-qadam: 4(v + 3) = 6(v - 3)',
        '2-qadam: 4v + 12 = 6v - 18',
        '3-qadam: 12 + 18 = 6v - 4v',
        '4-qadam: 30 = 2v => v = 15 km/soat.'
      ]
    }
  },
  // 7-sinf - Olimpiada
  {
    id: 'ex-7-4',
    grade: '7-sinf',
    topic: 'Daraja xossalari va sonlar nazariyasi',
    difficulty: 'olimpiada',
    question: '2²⁰²⁶ soni qanday raqam bilan tugaydi?',
    hint: '2 ning darajalari oxirgi raqamining davriyligini aniqlang: 2, 4, 8, 6, 2, 4, 8, 6...',
    correctAnswer: '4',
    options: ['4', '2', '6', '8'],
    analysis: {
      correctAnswer: '4',
      mistakeTrap: 'Davr uzunligini (4 ta) aniqlab, 2026 ni 4 ga bo\'lgandagi qoldiqni noto\'g\'ri hisoblash.',
      correctMethod: '2 ning darajalari oxirgi raqami har 4 tadan takrorlanadi: 2¹=2, 2²=4, 2³=8, 2⁴=16 (6).',
      stepByStep: [
        '1-qadam: Daraja ko\'rsatkichi 2026 ni 4 ga bo\'lamiz.',
        '2-qadam: 2026 = 4 × 506 + 2 (qoldiq 2).',
        '3-qadam: Qoldiq 2 bo\'lgani uchun ketma-ketlikdagi 2-raqam bo\'ladi, ya\'ni 4.'
      ]
    }
  },

  // 8-sinf - Oson
  {
    id: 'ex-8-1',
    grade: '8-sinf',
    topic: 'Kvadrat tenglamalar',
    difficulty: 'oson',
    question: 'x² - 9x + 20 = 0 tenglamaning ildizlarini toping.',
    hint: 'Viyet bo\'yicha yig\'indisi 9, ko\'paytmasi 20 bo\'lgan sonlar.',
    correctAnswer: '4 va 5',
    options: ['4 va 5', '-4 va -5', '2 va 10', '1 va 20'],
    analysis: {
      correctAnswer: '4 va 5',
      mistakeTrap: 'Ishoralarni adashtirib -4 va -5 deb olish.',
      correctMethod: 'x₁ + x₂ = -(-9) = 9 va x₁ × x₂ = 20.',
      stepByStep: [
        '1-qadam: 4 × 5 = 20',
        '2-qadam: 4 + 5 = 9',
        '3-qadam: Ildizlar: x₁ = 4, x₂ = 5.'
      ]
    }
  },
  // 8-sinf - O'rta
  {
    id: 'ex-8-2',
    grade: '8-sinf',
    topic: 'Pifagor teoremasi',
    difficulty: 'orta',
    question: 'To\'g\'ri burchakli uchburchakning gipotenuzasi 13 sm, katetlaridan biri 12 sm bo\'lsa, ikkinchi katetini toping.',
    hint: 'c² = a² + b² => b² = c² - a².',
    correctAnswer: '5 sm',
    options: ['5 sm', '6 sm', '7 sm', '8 sm'],
    analysis: {
      correctAnswer: '5 sm',
      mistakeTrap: 'Katetni topishda kvadratlarni ayirish o\'rniga qo\'shib yuborish (169 + 144 = 313).',
      correctMethod: 'Katet topilayotganda gipotenuza kvadratidan ma\'lum katet kvadrati ayiriladi.',
      stepByStep: [
        '1-qadam: b² = 13² - 12²',
        '2-qadam: b² = 169 - 144 = 25',
        '3-qadam: b = √25 = 5 sm.'
      ]
    }
  },
  // 8-sinf - Qiyin
  {
    id: 'ex-8-3',
    grade: '8-sinf',
    topic: 'Irrotsional tenglamalar',
    difficulty: 'qiyin',
    question: 'Tenglamani yeching: √(x + 5) = x - 1',
    hint: 'Ikkala tomonni kvadratga ko\'taring va soxta ildizlarni tekshirishni unutmang!',
    correctAnswer: 'x = 4 (x = -1 chet ildiz)',
    options: ['x = 4', 'x = 4 va x = -1', 'x = -1', 'Yechim yo\'q'],
    analysis: {
      correctAnswer: 'x = 4',
      mistakeTrap: 'Kvadratga ko\'targanda chiqqan x = -1 ni tekshirmasdan javobga kiritish. √(4) ≠ -2!',
      correctMethod: 'Ildiz osti musbat va ildiz qiymati ham manfiy bo\'lmasligi kerak: x - 1 ≥ 0 => x ≥ 1.',
      stepByStep: [
        '1-qadam: x + 5 = (x - 1)² = x² - 2x + 1',
        '2-qadam: x² - 3x - 4 = 0 => (x - 4)(x + 1) = 0',
        '3-qadam: x₁ = 4, x₂ = -1.',
        '4-qadam (Tekshirish): x = -1 bo\'lsa, √4 = -2 (noto\'g\'ri). x = 4 bo\'lsa √9 = 3 (to\'g\'ri). Demak faqat x = 4.'
      ]
    }
  },
  // 8-sinf - Olimpiada
  {
    id: 'ex-8-4',
    grade: '8-sinf',
    topic: 'Algebraik ayniyatlar',
    difficulty: 'olimpiada',
    question: 'Agar x + 1/x = 5 bo\'lsa, x³ + 1/x³ ning qiymatini toping.',
    hint: '(a + b)³ = a³ + b³ + 3ab(a + b) formulasidan foydalaning.',
    correctAnswer: '110',
    options: ['110', '125', '140', '115'],
    analysis: {
      correctAnswer: '110',
      mistakeTrap: 'Shunchaki 5³ = 125 deb hisoblash va 3(x + 1/x) ayirmani ayirishni unutish.',
      correctMethod: '(x + 1/x)³ = x³ + 1/x³ + 3 × x × (1/x) × (x + 1/x).',
      stepByStep: [
        '1-qadam: 5³ = x³ + 1/x³ + 3(1)(5)',
        '2-qadam: 125 = x³ + 1/x³ + 15',
        '3-qadam: x³ + 1/x³ = 125 - 15 = 110.'
      ]
    }
  }
];
