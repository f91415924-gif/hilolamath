import { Lesson } from '../types';

export const CURRICULUM: Lesson[] = [
  // ================= 5-SINF =================
  {
    id: 'les-5-1',
    grade: '5-sinf',
    topic: 'Natural sonlar va amallar tartibi',
    category: 'Arifmetika',
    badge: 'Poydevor',
    description: 'Sanoq sonlari, qavslar va amallarning to\'g\'ri bajarilish qoidalari.',
    theory: {
      definition: 'Narsalarni sanashda ishlatiladigan 1, 2, 3, 4, ... sonlar natural sonlar deyiladi. 0 soni natural son emas!',
      rules: [
        '1. Birinchi navbatda qavs ichidagi amallar bajariladi.',
        '2. So\'ngra ko\'paytirish va bo\'lish (chapdan o\'ngga qarab).',
        '3. Oxirida qo\'shish va ayirish (chapdan o\'ngga qarab).',
        '4. Nolga bo\'lish mumkin emas!'
      ],
      importantNote: 'Agar ifodada faqat qo\'shish va ayirish yoki faqat ko\'paytirish va bo\'lish bo\'lsa, amallar qat\'iy ravishda chapdan o\'ngga bajariladi.',
      formula: 'a + b = b + a (o\'rin almashtirish qonuni)'
    },
    simpleExample: {
      problem: 'Ifodaning qiymatini toping: 45 - 5 × (12 - 4) + 18 ÷ 2',
      given: 'Ifodada qavs, ko\'paytirish, bo\'lish, ayirish va qo\'shish qatnashgan.',
      stepByStep: [
        '1-qadam (Qavs ichi): 12 - 4 = 8',
        '2-qadam (Ko\'paytirish): 5 × 8 = 40',
        '3-qadam (Bo\'lish): 18 ÷ 2 = 9',
        '4-qadam (Ayirish va qo\'shish): 45 - 40 = 5',
        '5-qadam: 5 + 9 = 14'
      ],
      answer: '14'
    },
    detailedExplanation: {
      keyPoints: [
        'Ko\'paytirish amali qo\'shish va ayirishdan doim ustun turadi.',
        'Qavslar ifodadagi amallar tartibini butunlay o\'zgartirib yuboradi.'
      ],
      commonMistakes: 'Ko\'p o\'quvchilar 45 - 5 ni oldin ayirib (40 deb olib), so\'ng ko\'paytiradilar. Bu mutlaqo noto\'g\'ri! Ko\'paytirish birinchi bajariladi.',
      proTip: 'Qavs ichidagi hisob-kitob tugagach, uni bitta yaxlit son deb qabul qiling.'
    },
    selfPractice: {
      question: '36 + 4 × (15 - 9) - 20 ifodaning qiymatini hisoblang.',
      hint: 'Avval qavs (15 - 9), so\'ng 4 ga ko\'paytiring, keyin qo\'shish va ayirishni bajaring.',
      correctAnswer: '40',
      explanation: '15 - 9 = 6. 4 × 6 = 24. 36 + 24 = 60. 60 - 20 = 40.'
    },
    miniTest: [
      {
        id: 'mt-5-1-1',
        question: 'Qaysi son natural son hisoblanmaydi?',
        options: ['1', '0', '100', '7'],
        correctIndex: 1,
        explanation: '0 natural son emas, natural sonlar 1 dan boshlanadi.'
      },
      {
        id: 'mt-5-1-2',
        question: '24 + 6 ÷ 3 ifodaning qiymati nechaga teng?',
        options: ['10', '26', '30', '8'],
        correctIndex: 1,
        explanation: 'Avval bo\'lish: 6 ÷ 3 = 2. So\'ng qo\'shish: 24 + 2 = 26.'
      },
      {
        id: 'mt-5-1-3',
        question: 'Sonni nolga bo\'lish natijasi nima bo\'ladi?',
        options: ['0', 'O\'sha son', 'Nolga bo\'lish mumkin emas', '1'],
        correctIndex: 2,
        explanation: 'Matematikada nolga bo\'lish ma\'noga ega emas.'
      },
      {
        id: 'mt-5-1-4',
        question: '50 - (10 + 5 × 2) = ?',
        options: ['30', '40', '20', '35'],
        correctIndex: 0,
        explanation: '5 × 2 = 10; 10 + 10 = 20; 50 - 20 = 30.'
      }
    ]
  },
  {
    id: 'les-5-2',
    grade: '5-sinf',
    topic: 'Oddiy kasrlar va ularni taqqoslash',
    category: 'Kasrlar',
    badge: 'Vizual',
    description: 'Surat va maxraj, to\'g\'ri va noto\'g\'ri kasrlar hamda ularni solishtirish sirlari.',
    theory: {
      definition: 'Butunning bir yoki bir nechta teng ulushlarini ifodalovchi son oddiy kasr deyiladi. Kasr a/b ko\'rinishida yoziladi.',
      rules: [
        'Maxraj (b) — butun narsa nechta teng bo\'lakka bo\'linganini ko\'rsatadi.',
        'Surat (a) — shu teng bo\'laklardan nechtasi olinganini bildiradi.',
        'To\'g\'ri kasr: surati maxrajidan kichik (a < b, masalan 3/7 < 1).',
        'Noto\'g\'ri kasr: surati maxrajiga teng yoki katta (a ≥ b, masalan 8/5 ≥ 1).'
      ],
      importantNote: 'Maxrajlari bir xil kasrlarning surati kattasi katta bo\'ladi. Suratlari bir xil bo\'lsa, maxraji kichigi katta!',
      formula: 'a/c > b/c  (agar a > b bo\'lsa)'
    },
    simpleExample: {
      problem: '3/7 va 5/7 kasrlarini taqqoslang hamda 2/3 va 2/5 ni solishtiring.',
      given: 'Birinchi juftlikda maxraj bir xil (7), ikkinchisida surat bir xil (2).',
      stepByStep: [
        '1. 3/7 va 5/7: maxrajlar 7 teng. 5 > 3 bo\'lgani uchun 5/7 > 3/7.',
        '2. 2/3 va 2/5: suratlar 2 teng. Maxraj 3 kichikroq bo\'lgani uchun 2/3 > 2/5 (pitsa 3 kishiga bo\'linsa kattaroq bo\'lak tushadi).'
      ],
      answer: '5/7 > 3/7 va 2/3 > 2/5'
    },
    detailedExplanation: {
      keyPoints: [
        'Kasr chizig\'i bo\'lish amalini bildiradi: a/b = a ÷ b.',
        'Har qanday to\'g\'ri kasr 1 dan kichik, noto\'g\'ri kasr esa 1 ga teng yoki katta.'
      ],
      commonMistakes: 'O\'quvchilar ba\'zan 1/8 ni 1/4 dan katta deb o\'ylashadi, chunki 8 > 4. Ammo maxraj katta bo\'lsa, har bir bo\'lak kichikroq bo\'ladi!',
      proTip: 'Pitsa yoki shokolad plitkasini ko\'z oldingizga keltiring.'
    },
    selfPractice: {
      question: 'Noto\'g\'ri kasrni aralash songa aylantiring: 11/4 = ?',
      hint: '11 ni 4 ga bo\'ling: to\'liq qismi butun, qoldig\'i yangi surat bo\'ladi.',
      correctAnswer: '2 3/4',
      explanation: '11 ÷ 4 = 2 butun, qoldiq 3. Demak, 2 butun 3/4.'
    },
    miniTest: [
      {
        id: 'mt-5-2-1',
        question: 'Quyidagilardan qaysi biri to\'g\'ri kasr?',
        options: ['7/5', '9/9', '4/7', '8/3'],
        correctIndex: 2,
        explanation: '4/7 da surat (4) maxrajdan (7) kichik, demak to\'g\'ri kasr.'
      },
      {
        id: 'mt-5-2-2',
        question: '5/9 va 2/9 kasrlari yig\'indisi nechaga teng?',
        options: ['7/18', '7/9', '3/9', '10/9'],
        correctIndex: 1,
        explanation: 'Maxrajlari bir xil kasrlar qo\'shilganda suratlar qo\'shiladi: (5+2)/9 = 7/9.'
      },
      {
        id: 'mt-5-2-3',
        question: '1/3 va 1/6 kasrlaridan qaysi biri katta?',
        options: ['1/6 katta', '1/3 katta', 'Teng', 'Taqqoslab bo\'lmaydi'],
        correctIndex: 1,
        explanation: 'Suratlar teng bo\'lsa, maxraji kichigi katta: 1/3 > 1/6.'
      },
      {
        id: 'mt-5-2-4',
        question: 'Kasrning surati va maxraji teng bo\'lsa (masalan 6/6), qiymati nechaga teng?',
        options: ['0', '6', '1', '12'],
        correctIndex: 2,
        explanation: 'Surat va maxraj teng bo\'lsa, qiymat har doim 1 ga teng.'
      }
    ]
  },

  // ================= 6-SINF =================
  {
    id: 'les-6-1',
    grade: '6-sinf',
    topic: 'Musbat va manfiy sonlar ustida amallar',
    category: 'Ratsional sonlar',
    badge: 'Muhim poydevor',
    description: 'Noldan kichik sonlar, koordinata to\'g\'ri chizig\'i va ishoralar qoidasi.',
    theory: {
      definition: 'Noldan o\'ngdagi sonlar musbat (+), noldan chapdagi sonlar manfiy (-) sonlar deyiladi. 0 soni musbat ham, manfiy ham emas.',
      rules: [
        '1. Bir xil ishorali sonlarni qo\'shish: modullari qo\'shiladi va umumiy ishora qo\'yiladi: (-3) + (-5) = -8.',
        '2. Har xil ishorali sonlarni qo\'shish: katta moduldan kichigi ayiriladi va kattasining ishorasi qo\'yiladi: (-10) + 4 = -6.',
        '3. Ko\'paytirish va bo\'lishda: (-) × (-) = (+); (+) × (-) = (-).'
      ],
      importantNote: 'Ikkita manfiy son ko\'paytirilganda har doim musbat son hosil bo\'ladi: (-) × (-) = (+).',
      formula: '(-a) × (-b) = a × b,  |-a| = a'
    },
    simpleExample: {
      problem: 'Hisoblang: (-15) + (-8) - (-12) + (-4) × (-3)',
      given: 'Manfiy sonlar ustida barcha to\'rtta amal berilgan.',
      stepByStep: [
        '1-qadam (Ko\'paytirish): (-4) × (-3) = +12',
        '2-qadam (Qo\'shish): (-15) + (-8) = -23',
        '3-qadam: - (-12) ifoda +12 ga aylanadi',
        '4-qadam: -23 + 12 = -11',
        '5-qadam: -11 + 12 = +1'
      ],
      answer: '1'
    },
    detailedExplanation: {
      keyPoints: [
        'Harorat yoki qarz misolini eslang: -5°C harorat -2°C dan sovuqroq.',
        'Manfiy son qancha chapda tursa, shuncha kichik bo\'ladi: -100 < -1.',
        'Sonning moduli doim nomanfiy masofadir: |-7| = 7.'
      ],
      commonMistakes: '(-8) - 5 amalini -3 deb yozish. Aslida bu -8 ga -5 ni qo\'shish demakdir: natija -13 bo\'ladi.',
      proTip: 'Qarz va naqd pul bilan eslab qoling: 8 so\'m qarzga yana 5 so\'m qarz olinsa = 13 so\'m qarz (-13).'
    },
    selfPractice: {
      question: '(-24) ÷ (-6) + (-9) ning qiymati nechaga teng?',
      hint: 'Avval bo\'lish: ikkita manfiy son bo\'linsa musbat chiqadi. So\'ng -9 ni qo\'shing.',
      correctAnswer: '-5',
      explanation: '(-24) ÷ (-6) = +4. 4 + (-9) = 4 - 9 = -5.'
    },
    miniTest: [
      {
        id: 'mt-6-1-1',
        question: '(-7) + (-12) ifodaning qiymatini toping.',
        options: ['-19', '19', '-5', '5'],
        correctIndex: 0,
        explanation: 'Bir xil ishorali sonlar qo\'shiladi va ishora saqlanadi: -19.'
      },
      {
        id: 'mt-6-1-2',
        question: '(-6) × (-4) ifodaning qiymati nechaga teng?',
        options: ['-24', '24', '-10', '10'],
        correctIndex: 1,
        explanation: 'Minus ko\'paytirilgan minus plyus bo\'ladi: +24.'
      },
      {
        id: 'mt-6-1-3',
        question: 'Qaysi son katta: -15 mi yoki -3 mi?',
        options: ['-15', '-3', 'Teng', 'Bilib bo\'lmaydi'],
        correctIndex: 1,
        explanation: 'Manfiy sonlarda moduli kichigi katta bo\'ladi: -3 nolgacha yaqinroq.'
      },
      {
        id: 'mt-6-1-4',
        question: '|-18| (modul -18) nechaga teng?',
        options: ['-18', '18', '0', '1'],
        correctIndex: 1,
        explanation: 'Har qanday sonning moduli masofani bildirgani uchun musbatdir: 18.'
      }
    ]
  },

  // ================= 7-SINF =================
  {
    id: 'les-7-1',
    grade: '7-sinf',
    topic: 'Chiziqli tenglamalar va ularni yechish',
    category: 'Algebra',
    badge: 'Markaziy mavzu',
    description: 'Tenglama tushunchasi, hadlarni qarama-qarshi ishora bilan o\'tkazish va ildizni topish.',
    theory: {
      definition: 'Noma\'lum son qatnashgan tenglikka tenglama deyiladi. ax + b = 0 (a ≠ 0) ko\'rinishidagi tenglama bir noma\'lumli chiziqli tenglama deyiladi.',
      rules: [
        '1. Noma\'lum qatnashgan hadlarni tenglikning chap tomoniga, sonlarni o\'ng tomoniga o\'tkazamiz.',
        '2. Hadni tenglikning bir tomonidan ikkinchi tomoniga o\'tkazganda uning ishorasi teskarisiga o\'zgaradi (+ minusga, - plyusga).',
        '3. Tenglamaning ikkala tomonini noldan farqli bir xil songa bo\'lish yoki ko\'paytirish mumkin.'
      ],
      importantNote: 'Tenglamaning ildizi — tenglamani to\'g\'ri sonli tenglikka aylantiruvchi noma\'lumning qiymatidir.',
      formula: 'ax + b = c  =>  ax = c - b  =>  x = (c - b) / a'
    },
    simpleExample: {
      problem: 'Tenglamani yeching: 5x - 7 = 2x + 8',
      given: 'Ikki tomonda ham x qatnashgan hadlar va ozod sonlar bor.',
      stepByStep: [
        '1-qadam (x larni chapga, sonlarni o\'ngga): 5x - 2x = 8 + 7',
        '2-qadam (O\'xshash hadlarni ixchamlash): 3x = 15',
        '3-qadam (x ning koeffitsiyentiga bo\'lish): x = 15 ÷ 3',
        '4-qadam: x = 5'
      ],
      answer: 'x = 5'
    },
    detailedExplanation: {
      keyPoints: [
        'Tarozi modeli: Ikkala palladan bir xil og\'irlikni olib tashlasak yoki qo\'shsak, muvozanat buzilmaydi.',
        'Topilgan yechimni har doim tekshirib ko\'ring: 5(5) - 7 = 18; 2(5) + 8 = 18. Tenglik to\'g\'ri!'
      ],
      commonMistakes: 'Hadni narigi tomonga o\'tkazayotganda ishorasini o\'zgartirishni unutib qo\'yish (masalan, -7 ni +7 qilmasdan -7 ligicha qoldirish).',
      proTip: 'Har doim "Ko\'prikdan o\'tganda ishora teskari bo\'ladi" qoidasini eslang.'
    },
    selfPractice: {
      question: 'Tenglamani yeching: 4x + 12 = 36',
      hint: 'Avval 12 ni o\'ng tomonga ayirib o\'tkazing: 4x = 36 - 12. So\'ng 4 ga bo\'ling.',
      correctAnswer: '6',
      explanation: '4x = 36 - 12 = 24. x = 24 ÷ 4 = 6.'
    },
    miniTest: [
      {
        id: 'mt-7-1-1',
        question: '3x = 21 tenglamaning ildizi nechaga teng?',
        options: ['7', '6', '18', '24'],
        correctIndex: 0,
        explanation: 'x = 21 ÷ 3 = 7.'
      },
      {
        id: 'mt-7-1-2',
        question: '2x + 5 = 17 tenglamada x nechaga teng?',
        options: ['5', '6', '7', '8'],
        correctIndex: 1,
        explanation: '2x = 17 - 5 = 12. x = 12 ÷ 2 = 6.'
      },
      {
        id: 'mt-7-1-3',
        question: 'Hadni tenglikning narigi tomoniga o\'tkazganda ishora qanday o\'zgaradi?',
        options: ['O\'zgarmaydi', 'Teskari ishoraga aylanadi', 'Har doim musbat bo\'ladi', 'Nolga aylanadi'],
        correctIndex: 1,
        explanation: 'Ko\'prikdan o\'tganda plyus minusga, minus plyusga aylanadi.'
      },
      {
        id: 'mt-7-1-4',
        question: '7x - 4 = 3x + 16 tenglamaning yechimi qanday?',
        options: ['x = 4', 'x = 5', 'x = 6', 'x = 2'],
        correctIndex: 1,
        explanation: '7x - 3x = 16 + 4 => 4x = 20 => x = 5.'
      }
    ]
  },
  {
    id: 'les-7-2',
    grade: '7-sinf',
    topic: 'Qisqa ko\'paytirish formulalari',
    category: 'Algebra',
    badge: 'Oltin qoidalar',
    description: 'Kvadratlar ayirmasi, yig\'indi va ayirmaning kvadrati formulalari.',
    theory: {
      definition: 'Hisoblashlarni osonlashtirish va ko\'phadlarni ko\'paytuvchilarga ajratish formulalari qisqa ko\'paytirish formulalari deyiladi.',
      rules: [
        '1. Kvadratlar ayirmasi: a² - b² = (a - b)(a + b)',
        '2. Yig\'indining kvadrati: (a + b)² = a² + 2ab + b²',
        '3. Ayirmaning kvadrati: (a - b)² = a² - 2ab + b²'
      ],
      importantNote: '(a + b)² hech qachon a² + b² ga teng emas! O\'rtada albatta 2ab (ikkilangan ko\'paytma) bo\'lishi shart.',
      formula: '(a ± b)² = a² ± 2ab + b²'
    },
    simpleExample: {
      problem: 'Formuladan foydalanib hisoblang: 99² va ko\'paytuvchilarga ajrating: x² - 25',
      given: '99 = (100 - 1). 25 = 5².',
      stepByStep: [
        '1-misol: 99² = (100 - 1)² = 100² - 2 × 100 × 1 + 1² = 10000 - 200 + 1 = 9801',
        '2-misol: x² - 25 = x² - 5² = (x - 5)(x + 5)'
      ],
      answer: '9801 va (x - 5)(x + 5)'
    },
    detailedExplanation: {
      keyPoints: [
        'Ushbu formulalar butun maktab va oliy matematika davomida eng ko\'p ishlatiladi.',
        'Kvadratlar ayirmasi orqali katta sonlarni kalkulyatorsiz oson hisoblash mumkin: 51² - 49² = (51-49)(51+49) = 2 × 100 = 200.'
      ],
      commonMistakes: '(x - 3)² ni x² - 9 deb yozish. To\'g\'ri yoyilma: x² - 6x + 9.',
      proTip: 'Uchta hadni ketma-ket eslang: birinchining kvadrati, ikkilangan ko\'paytma, ikkinchining kvadrati.'
    },
    selfPractice: {
      question: 'Kvadratga ko\'taring: (2x + 3)²',
      hint: 'a = 2x, b = 3. a² + 2ab + b² formulasiga qo\'ying.',
      correctAnswer: '4x² + 12x + 9',
      explanation: '(2x)² + 2 × (2x) × 3 + 3² = 4x² + 12x + 9.'
    },
    miniTest: [
      {
        id: 'mt-7-2-1',
        question: 'a² - b² ifoda nimaga teng?',
        options: ['(a - b)²', '(a - b)(a + b)', 'a² - 2ab + b²', '(a + b)²'],
        correctIndex: 1,
        explanation: 'Kvadratlar ayirmasi: (a - b)(a + b).'
      },
      {
        id: 'mt-7-2-2',
        question: '(x - 4)² ning to\'g\'ri yoyilmasi qaysi?',
        options: ['x² - 16', 'x² - 8x + 16', 'x² + 8x - 16', 'x² - 4x + 16'],
        correctIndex: 1,
        explanation: 'a² - 2ab + b² bo\'yicha: x² - 8x + 16.'
      },
      {
        id: 'mt-7-2-3',
        question: '51² - 49² ifodaning qiymati nechaga teng?',
        options: ['100', '200', '4', '400'],
        correctIndex: 1,
        explanation: '(51 - 49)(51 + 49) = 2 × 100 = 200.'
      },
      {
        id: 'mt-7-2-4',
        question: 'x² - 64 ifodaning ko\'paytuvchilari:',
        options: ['(x - 8)(x + 8)', '(x - 32)(x + 32)', '(x - 8)²', '(x + 8)²'],
        correctIndex: 0,
        explanation: '64 = 8², shuning uchun (x - 8)(x + 8).'
      }
    ]
  },

  // ================= 8-SINF =================
  {
    id: 'les-8-1',
    grade: '8-sinf',
    topic: 'Kvadrat tenglamalar va Viyet teoremasi',
    category: 'Algebra',
    badge: 'Klassik algebra',
    description: 'Diskriminant orqali yechish va Viyet teoremasi orqali ildizlarni og\'zaki topish.',
    theory: {
      definition: 'ax² + bx + c = 0 (a ≠ 0) ko\'rinishidagi tenglama kvadrat tenglama deyiladi.',
      rules: [
        '1. Diskriminant: D = b² - 4ac',
        '2. Agar D > 0 bo\'lsa: 2 ta turli haqiqiy ildiz bor: x₁,₂ = (-b ± √D) / (2a)',
        '3. Agar D = 0 bo\'lsa: 1 ta (karrali) ildiz bor: x = -b / (2a)',
        '4. Agar D < 0 bo\'lsa: haqiqiy ildizga ega emas.',
        '5. Viyet teoremasi (x² + px + q = 0 uchun): x₁ + x₂ = -p va x₁ × x₂ = q.'
      ],
      importantNote: 'Viyet teoremasidan foydalanib butun ildizli tenglamalarni bir necha soniyada og\'zaki topish mumkin!',
      formula: 'D = b² - 4ac,  x = (-b ± √D) / 2a'
    },
    simpleExample: {
      problem: 'x² - 7x + 12 = 0 tenglamani Viyet va diskriminant bilan yeching.',
      given: 'a = 1, b = -7, c = 12',
      stepByStep: [
        '1-usul (Diskriminant): D = (-7)² - 4(1)(12) = 49 - 48 = 1',
        'x₁ = (7 + 1) / 2 = 4;  x₂ = (7 - 1) / 2 = 3',
        '2-usul (Viyet): Ildizlar yig\'indisi 7, ko\'paytmasi 12 bo\'lgan sonlar: 3 va 4!'
      ],
      answer: 'x₁ = 3, x₂ = 4'
    },
    detailedExplanation: {
      keyPoints: [
        'Diskriminant b² - 4ac noldan katta, teng yoki kichikligiga qarab ildizlar soni aniqlanadi.',
        'Agar a + b + c = 0 bo\'lsa, ildizlardan biri har doim 1, ikkinchisi c/a bo\'ladi!'
      ],
      commonMistakes: 'Diskriminantda -4ac hisoblanayotganda c manfiy bo\'lsa, minus va minus plyus bo\'lishini unutish.',
      proTip: 'Agar b juft son bo\'lsa, k = b/2 deb olib D/4 = k² - ac formulasidan foydalaning.'
    },
    selfPractice: {
      question: 'x² - 5x + 6 = 0 tenglamaning kichik ildizini toping.',
      hint: 'Viyet bo\'yicha yig\'indisi 5, ko\'paytmasi 6 bo\'lgan sonlar.',
      correctAnswer: '2',
      explanation: '2 × 3 = 6 va 2 + 3 = 5. Ildizlar 2 va 3. Kichigi: 2.'
    },
    miniTest: [
      {
        id: 'mt-8-1-1',
        question: 'D < 0 bo\'lsa, kvadrat tenglama nechta haqiqiy ildizga ega?',
        options: ['2 ta', '1 ta', 'Ildizi yo\'q', 'Cheksiz ko\'p'],
        correctIndex: 2,
        explanation: 'Diskriminant manfiy bo\'lsa, haqiqiy ildiz mavjud emas.'
      },
      {
        id: 'mt-8-1-2',
        question: 'x² - 9 = 0 chala kvadrat tenglamaning ildizlari qaysi?',
        options: ['x = 3', 'x = -3', 'x = ±3', 'x = 9'],
        correctIndex: 2,
        explanation: 'x² = 9 => x = ±3.'
      },
      {
        id: 'mt-8-1-3',
        question: 'x² - 8x + 15 = 0 tenglamaning ildizlari yig\'indisi nimaga teng?',
        options: ['-8', '8', '15', '-15'],
        correctIndex: 1,
        explanation: 'x₁ + x₂ = -(-8) = 8.'
      },
      {
        id: 'mt-8-1-4',
        question: '2x² - 8x = 0 tenglamaning ildizlarini toping.',
        options: ['0 va 4', '0 va -4', '4', '2'],
        correctIndex: 0,
        explanation: '2x(x - 4) = 0 => x = 0 yoki x = 4.'
      }
    ]
  },

  // ================= 9-SINF =================
  {
    id: 'les-9-1',
    grade: '9-sinf',
    topic: 'Arifmetik va Geometrik progressiya',
    category: 'Algebra',
    badge: 'Ketma-ketliklar',
    description: 'Qonuniyatli sonli qatorlar, n-hadi va yig\'indilar formulalari.',
    theory: {
      definition: 'Har bir hadi o\'zidan oldingisiga o\'zgarmas d sonini qo\'shishdan hosil bo\'ladigan ketma-ketlik arifmetik progressiya deyiladi.',
      rules: [
        'Arifmetik progressiya n-hadi: aₙ = a₁ + (n - 1)d',
        'Dastlabki n ta had yig\'indisi: Sₙ = ((a₁ + aₙ) / 2) × n',
        'Geometrik progressiya n-hadi: bₙ = b₁ × qⁿ⁻¹',
        'Cheksiz kamayuvchi geometrik progressiya: S = b₁ / (1 - q) (|q| < 1).'
      ],
      importantNote: 'Arifmetik progressiyada har qanday had o\'ziga qo\'shni ikki hadning o\'rta arifmetigidir: aₙ = (aₙ₋₁ + aₙ₊₁) / 2.',
      formula: 'aₙ = a₁ + (n - 1)d,  Sₙ = ((a₁ + aₙ) / 2) * n'
    },
    simpleExample: {
      problem: 'a₁ = 3 va d = 4 bo\'lsa, a₁₀ ni va S₁₀ ni toping.',
      given: 'a₁ = 3, d = 4, n = 10',
      stepByStep: [
        '1. a₁₀ = a₁ + 9d = 3 + 9 × 4 = 3 + 36 = 39',
        '2. S₁₀ = ((3 + 39) / 2) × 10 = (42 / 2) × 10 = 21 × 10 = 210'
      ],
      answer: 'a₁₀ = 39, S₁₀ = 210'
    },
    detailedExplanation: {
      keyPoints: [
        'Mashhur Karl Gauss usuli: 1 dan 100 gacha sonlar yig\'indisini topish aynan arifmetik progressiya yig\'indisidir: (1 + 100) × 100 / 2 = 5050.'
      ],
      commonMistakes: 'n-had formulasida (n - 1) d o\'rniga shunchaki nd deb hisoblash.',
      proTip: 'Ayirmani topish uchun istalgan haddan oldingisini ayiring: d = a₂ - a₁.'
    },
    selfPractice: {
      question: '2, 5, 8, 11, ... progressiyaning 6-hadini toping.',
      hint: 'a₁ = 2, d = 3. a₆ = a₁ + 5d.',
      correctAnswer: '17',
      explanation: 'a₆ = 2 + 5 × 3 = 17.'
    },
    miniTest: [
      {
        id: 'mt-9-1-1',
        question: '1, 4, 7, 10, ... progressiyaning ayirmasi (d) nechaga teng?',
        options: ['2', '3', '4', '1'],
        correctIndex: 1,
        explanation: 'd = 4 - 1 = 3.'
      },
      {
        id: 'mt-9-1-2',
        question: 'Geometrik progressiyada b₁ = 2, q = 3 bo\'lsa, b₃ nimaga teng?',
        options: ['6', '12', '18', '24'],
        correctIndex: 2,
        explanation: 'b₃ = 2 × 3² = 2 × 9 = 18.'
      },
      {
        id: 'mt-9-1-3',
        question: '1 dan 10 gacha bo\'lgan natural sonlar yig\'indisi nechaga teng?',
        options: ['45', '50', '55', '60'],
        correctIndex: 2,
        explanation: 'S₁₀ = (1 + 10) × 10 / 2 = 55.'
      },
      {
        id: 'mt-9-1-4',
        question: 'a₁ = 10 va d = -2 bo\'lsa, a₅ nechaga teng?',
        options: ['0', '2', '4', '-2'],
        correctIndex: 1,
        explanation: 'a₅ = 10 + 4 × (-2) = 10 - 8 = 2.'
      }
    ]
  },

  // ================= 10-SINF =================
  {
    id: 'les-10-1',
    grade: '10-sinf',
    topic: 'Logarifm va uning asosiy xossalari',
    category: 'Algebra va analiz',
    badge: 'Yuqori daraja',
    description: 'Daraja ko\'rsatkichini topish, logarifmik ayniyatlar va xossalar.',
    theory: {
      definition: 'b sonining a asosga ko\'ra logarifmi (logₐ b) deb, b sonini hosil qilish uchun a sonini ko\'tarish kerak bo\'lgan daraja ko\'rsatkichiga aytiladi (a > 0, a ≠ 1, b > 0).',
      rules: [
        '1. Asosiy logarifmik ayniyat: a^(logₐ b) = b',
        '2. Ko\'paytmaning logarifmi: logₐ (x × y) = logₐ x + logₐ y',
        '3. Bo\'linmaning logarifmi: logₐ (x / y) = logₐ x - logₐ y',
        '4. Darajaning logarifmi: logₐ (xⁿ) = n × logₐ x',
        '5. logₐ a = 1 va logₐ 1 = 0'
      ],
      importantNote: 'O\'nli logarifm lg x (asos 10) va natural logarifm ln x (asos e ≈ 2.718) maxsus qisqartmalar bilan belgilanadi.',
      formula: 'log_a(b) = c  <=>  a^c = b'
    },
    simpleExample: {
      problem: 'Hisoblang: log₂ 32 + log₃ (1/9) - lg 100',
      given: 'Asoslar 2, 3 va 10.',
      stepByStep: [
        '1. log₂ 32 = 5 (chunki 2⁵ = 32)',
        '2. log₃ (1/9) = -2 (chunki 3⁻² = 1/9)',
        '3. lg 100 = 2 (chunki 10² = 100)',
        '4. Natija: 5 + (-2) - 2 = 1'
      ],
      answer: '1'
    },
    detailedExplanation: {
      keyPoints: [
        'Logarifm darajaga ko\'tarish amalining teskarisidir.',
        'Logarifm ostidagi ifoda qat\'iy musbat bo\'lishi shart: b > 0.'
      ],
      commonMistakes: 'log(x + y) ni log x + log y deb hisoblash xato. Faqat ko\'paytmada logarifmlar qo\'shiladi.',
      proTip: '"a ning qaysi darajasi b ga teng?" degan savolni bering.'
    },
    selfPractice: {
      question: 'log₅ 125 ning qiymati nechaga teng?',
      hint: '5 ning nechanchi darajasi 125 ga teng?',
      correctAnswer: '3',
      explanation: '5³ = 125 bo\'lgani sababli log₅ 125 = 3.'
    },
    miniTest: [
      {
        id: 'mt-10-1-1',
        question: 'log₃ 27 nechaga teng?',
        options: ['2', '3', '9', '1'],
        correctIndex: 1,
        explanation: '3³ = 27, demak log₃ 27 = 3.'
      },
      {
        id: 'mt-10-1-2',
        question: 'log₇ 1 ning qiymati nimaga teng?',
        options: ['1', '7', '0', '-1'],
        correctIndex: 2,
        explanation: 'Har qanday asosga ko\'ra 1 ning logarifmi 0 ga teng (a⁰ = 1).'
      },
      {
        id: 'mt-10-1-3',
        question: 'log₂ 4 + log₂ 8 ifoda nimaga teng?',
        options: ['5', '6', '24', '12'],
        correctIndex: 0,
        explanation: '2 + 3 = 5.'
      },
      {
        id: 'mt-10-1-4',
        question: '2^(log₂ 15) ning qiymati nechaga teng?',
        options: ['2', '15', '30', '1'],
        correctIndex: 1,
        explanation: 'Asosiy ayniyat: a^(logₐ b) = b => 15.'
      }
    ]
  },

  // ================= 11-SINF =================
  {
    id: 'les-11-1',
    grade: '11-sinf',
    topic: 'Hosila va uning geometrik ma\'nosi',
    category: 'Matematik analiz',
    badge: 'Bitiruvchi bosqich',
    description: 'O\'zgarish tezligi, hosilalar jadvali, urinma burchak koeffitsiyenti va ekstremumlar.',
    theory: {
      definition: 'Funksiya orttirmasining argument orttirmasiga nisbatining limiti funksiyaning hosilasi deyiladi: f\'(x) = lim(Δx→0) Δy / Δx.',
      rules: [
        '1. Darajali funksiya hosilasi: (xⁿ)\' = n × xⁿ⁻¹',
        '2. O\'zgarmas son hosilasi: (C)\' = 0',
        '3. Yig\'indi hosilasi: (u + v)\' = u\' + v\'',
        '4. Geometrik ma\'no: f\'(x₀) = k = tg α (urinmaning burchak koeffitsiyenti).'
      ],
      importantNote: 'f\'(x) > 0 bo\'lgan oraliqda funksiya o\'sadi, f\'(x) < 0 bo\'lgan oraliqda kamayadi.',
      formula: '(x^n)\' = n*x^(n-1),  k = tg(\\alpha) = f\'(x_0)'
    },
    simpleExample: {
      problem: 'f(x) = 2x³ - 5x² + 7x - 4 funksiyaning hosilasini toping va f\'(1) ni hisoblang.',
      given: 'Darajali ko\'phad berilgan.',
      stepByStep: [
        '1. (2x³)\' = 6x²',
        '2. (-5x²)\' = -10x',
        '3. (7x)\' = 7',
        '4. (-4)\' = 0',
        '5. f\'(x) = 6x² - 10x + 7',
        '6. f\'(1) = 6(1)² - 10(1) + 7 = 3'
      ],
      answer: 'f\'(x) = 6x² - 10x + 7,  f\'(1) = 3'
    },
    detailedExplanation: {
      keyPoints: [
        'Fizik ma\'nosi: Masofadan olingan hosila tezlikni beradi: v(t) = s\'(t).',
        'Hosila nolga teng bo\'lgan nuqtalarda funksiya minimum yoki maksimumga erishishi mumkin.'
      ],
      commonMistakes: 'O\'zgarmas sonning hosilasi 0 bo\'lishini unutib, uni qoldirib ketish.',
      proTip: 'Darajani oldinga koeffitsiyent qilib tushiring va darajadan 1 ni ayiring.'
    },
    selfPractice: {
      question: 'f(x) = x⁴ - 3x + 8 funksiyaning x = 2 nuqtadagi hosilasi f\'(2) ni toping.',
      hint: 'Avval f\'(x) = 4x³ - 3 ni toping, so\'ng x = 2 ni qo\'ying.',
      correctAnswer: '29',
      explanation: 'f\'(x) = 4x³ - 3. f\'(2) = 4(8) - 3 = 32 - 3 = 29.'
    },
    miniTest: [
      {
        id: 'mt-11-1-1',
        question: 'f(x) = x⁵ funksiyaning hosilasi nimaga teng?',
        options: ['5x⁴', 'x⁴', '5x⁵', '5x⁶'],
        correctIndex: 0,
        explanation: '(xⁿ)\' = n × xⁿ⁻¹ bo\'yicha: 5x⁴.'
      },
      {
        id: 'mt-11-1-2',
        question: 'O\'zgarmas C = 100 sonining hosilasi nimaga teng?',
        options: ['100', '1', '0', '10'],
        correctIndex: 2,
        explanation: 'Har qanday o\'zgarmas sonning hosilasi 0 ga teng.'
      },
      {
        id: 'mt-11-1-3',
        question: 'f\'(x) > 0 bo\'lgan oraliqda funksiya o\'zini qanday tutadi?',
        options: ['O\'sadi', 'Kamayadi', 'O\'zgarmaydi', 'Nolga teng'],
        correctIndex: 0,
        explanation: 'Hosilasi musbat bo\'lsa funksiya o\'sadi.'
      },
      {
        id: 'mt-11-1-4',
        question: 'f(x) = sin(x) ning hosilasi nimaga teng?',
        options: ['-cos(x)', 'cos(x)', '-sin(x)', 'tg(x)'],
        correctIndex: 1,
        explanation: '(sin x)\' = cos x.'
      }
    ]
  }
];
