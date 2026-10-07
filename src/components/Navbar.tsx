import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  FileEdit, 
  Brain, 
  Gamepad2, 
  Bot, 
  Calculator, 
  UserCheck, 
  Menu, 
  X, 
  Flame, 
  Award,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Section, Grade } from '../types';
import { useProgress } from '../context/ProgressContext';

interface NavbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
  selectedGrade: Grade;
  setSelectedGrade: (grade: Grade) => void;
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

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  setSection,
  selectedGrade,
  setSelectedGrade
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gradeDropdownOpen, setGradeDropdownOpen] = useState(false);
  const { progress } = useProgress();

  const navItems = [
    { id: 'home' as Section, label: 'Bosh sahifa', icon: Home },
    { id: 'lessons' as Section, label: 'Darslar', icon: BookOpen },
    { id: 'exercises' as Section, label: 'Mashqlar', icon: FileEdit },
    { id: 'tests' as Section, label: 'Testlar', icon: Brain },
    { id: 'games' as Section, label: 'O‘yinlar', icon: Gamepad2 },
    { id: 'ai-tutor' as Section, label: 'AI Ustoz', icon: Bot, highlight: true },
    { id: 'solver' as Section, label: 'Misol yechuvchi', icon: Calculator },
    { id: 'results' as Section, label: 'Natijalarim', icon: UserCheck }
  ];

  const handleNavClick = (sectionId: Section) => {
    setSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent">
                  HILOLA MATH
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  EdTech
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Matematika platformasi
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                      : item.highlight
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Stats & Grade Picker */}
          <div className="flex items-center gap-2.5">
            {/* Grade Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setGradeDropdownOpen(!gradeDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-xl transition-colors cursor-pointer"
              >
                <span>{selectedGrade}</span>
                <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
              </button>

              {gradeDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setGradeDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Sinfni tanlang:
                  </div>
                  {GRADES.map(grade => (
                    <button
                      key={grade}
                      onClick={() => {
                        setSelectedGrade(grade);
                        setGradeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedGrade === grade
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{grade}</span>
                      {selectedGrade === grade && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Streak & XP Badges */}
            <div className="hidden sm:flex items-center gap-1.5">
              <div 
                title="Kundalik seriya (streak)"
                className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-200"
              >
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-bounce" />
                <span>{progress.streak} kun</span>
              </div>
              <div 
                title="To'plangan tajriba ballari (XP)"
                className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-200"
              >
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                <span>{progress.xp} XP</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-indigo-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 mb-2">
            <span className="text-xs font-bold text-slate-500">Faollik:</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" /> {progress.streak} kun
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                <Award className="w-3 h-3 text-indigo-600" /> {progress.xp} XP
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer text-left ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : item.highlight
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'text-slate-700 bg-slate-50 hover:bg-indigo-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
