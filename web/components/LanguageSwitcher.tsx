'use client';

import { useState, useEffect } from 'react';

type LanguageConfig = {
  code: string;
  name: string;
  short: string;
  flag: string;
  dir: 'ltr' | 'rtl';
};

const languages: LanguageConfig[] = [
  { code: 'en', name: 'English', short: 'EN', flag: 'https://flagcdn.com/w40/us.png', dir: 'ltr' },
  { code: 'ar', name: 'العربية', short: 'AR', flag: 'https://flagcdn.com/w40/sa.png', dir: 'rtl' },
  { code: 'es', name: 'Español', short: 'ES', flag: 'https://flagcdn.com/w40/es.png', dir: 'ltr' },
];

interface LanguageSwitcherProps {
  onLanguageChange?: (locale: string, dir: 'ltr' | 'rtl') => void;
}

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLang(savedLang);
    const lang = languages.find((l) => l.code === savedLang);
    if (lang) {
      document.documentElement.dir = lang.dir;
      document.documentElement.lang = savedLang;
      if (onLanguageChange) {
        onLanguageChange(savedLang, lang.dir);
      }
    }
  }, [onLanguageChange]);

  const handleLanguageChange = (langCode: string) => {
    const lang = languages.find((l) => l.code === langCode);
    if (!lang) return;

    setCurrentLang(langCode);
    localStorage.setItem('language', langCode);
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = langCode;
    setIsOpen(false);

    if (onLanguageChange) {
      onLanguageChange(langCode, lang.dir);
    }
  };

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between min-w-[150px] px-3 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/60 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-4 rounded-sm overflow-hidden border border-slate-200 shadow-sm shrink-0 relative">
             <img src={current.flag} alt={`${current.name} flag`} className="w-full h-full object-cover absolute inset-0" />
          </div>
          <span className="font-semibold text-slate-700 text-sm">{current.short}</span>
          <span className="text-slate-400 font-medium text-sm hidden sm:inline-block">{current.name}</span>
        </div>
        <svg
          className={`w-4 h-4 ml-3 transition-transform duration-300 text-slate-400 group-hover:text-blue-500 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-[calc(100%+8px)] right-0 lg:left-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_-10px_rgb(0,0,0,0.15)] border border-slate-100 overflow-hidden z-20 min-w-[200px] py-2 animate-[fade-in-down_0.2s_ease-out]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center w-full px-4 py-3 transition-all duration-200 relative overflow-hidden group/lang ${
                  currentLang === lang.code ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                }`}
              >
                {currentLang === lang.code && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-sm"></div>}
                
                <div className={`flex items-center gap-3 flex-1 text-left ${currentLang === lang.code ? 'ml-1' : ''}`}>
                  <div className="w-6 h-4 rounded-sm overflow-hidden border border-slate-200 shadow-sm shrink-0 relative group-hover/lang:scale-105 transition-transform duration-300">
                     <img src={lang.flag} alt={`${lang.name} flag`} className="w-full h-full object-cover absolute inset-0" />
                  </div>
                  <span className={`font-bold text-sm ${currentLang === lang.code ? 'text-blue-700' : 'text-slate-700'}`}>{lang.short}</span>
                  <span className={`font-medium text-sm ${currentLang === lang.code ? 'text-blue-600' : 'text-slate-500'}`}>{lang.name}</span>
                </div>
                
                {currentLang === lang.code && (
                  <svg className="w-4 h-4 text-blue-600 ml-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
