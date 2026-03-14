'use client';

import { useState, useEffect } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

interface Stats {
  requestsMade: number;
  tokensUsed: number;
  activeConnections: number;
}

// Animated Number Component
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const duration = 1000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (value - startValue) * easeOutQuart);
      setDisplayValue(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    if (startValue !== value) {
      window.requestAnimationFrame(step);
    }
  }, [value, displayValue]);

  return <span>{displayValue.toLocaleString()}</span>;
}

// Translation messages
const messages: Record<string, any> = {
  en: {
    title: 'Live Dashboard',
    subtitle: 'Real-time statistics • Updates every 10 seconds',
    lastUpdated: 'Last updated:',
    requestsMade: 'Requests Made',
    requestsDesc: 'Total API requests processed',
    tokensUsed: 'Tokens Used',
    tokensDesc: 'AI tokens consumed',
    activeConnections: 'Active Connections',
    connectionsDesc: 'Currently connected users',
    about: 'About This Dashboard',
    aboutText: 'This dashboard demonstrates real-time data updates using Next.js 14 and Tailwind CSS. The counters automatically refresh every 10 seconds by polling the backend API. No page refresh is required - all updates happen seamlessly in the background.',
    backToHome: 'Back to Home',
    updatingIn: 'Updating in',
    seconds: 's'
  },
  ar: {
    title: 'لوحة القيادة المباشرة',
    subtitle: 'إحصائيات في الوقت الفعلي • تحديث كل 10 ثوانٍ',
    lastUpdated: 'آخر تحديث:',
    requestsMade: 'الطلبات المنجزة',
    requestsDesc: 'إجمالي طلبات API المعالجة',
    tokensUsed: 'الرموز المستخدمة',
    tokensDesc: 'رموز الذكاء الاصطناعي المستهلكة',
    activeConnections: 'الاتصالات النشطة',
    connectionsDesc: 'المستخدمون المتصلون حاليًا',
    about: 'حول لوحة القيادة',
    aboutText: 'توضح لوحة القيادة هذه تحديثات البيانات في الوقت الفعلي باستخدام Next.js 14 و Tailwind CSS. يتم تحديث العدادات تلقائيًا كل 10 ثوانٍ عن طريق استطلاع الخلفية API. لا يلزم تحديث الصفحة - تحدث جميع التحديثات بسلاسة في الخلفية.',
    backToHome: 'العودة إلى الصفحة الرئيسية',
    updatingIn: 'تحديث في',
    seconds: 'ث'
  },
  es: {
    title: 'Panel en Vivo',
    subtitle: 'Estadísticas en tiempo real • Se actualiza cada 10 segundos',
    lastUpdated: 'Última actualización:',
    requestsMade: 'Solicitudes Realizadas',
    requestsDesc: 'Total de solicitudes API procesadas',
    tokensUsed: 'Tokens Usados',
    tokensDesc: 'Tokens de IA consumidos',
    activeConnections: 'Conexiones Activas',
    connectionsDesc: 'Usuarios conectados actualmente',
    about: 'Acerca de este Panel',
    aboutText: 'Este panel demuestra actualizaciones de datos en tiempo real usando Next.js 14 y Tailwind CSS. Los contadores se actualizan automáticamente cada 10 segundos consultando la API backend. No se requiere actualización de página - todas las actualizaciones ocurren sin problemas en segundo plano.',
    backToHome: 'Volver al Inicio',
    updatingIn: 'Actualizando en',
    seconds: 's'
  },
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    requestsMade: 0,
    tokensUsed: 0,
    activeConnections: 0,
  });
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [locale, setLocale] = useState('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const [timeLeft, setTimeLeft] = useState(10);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // Load saved language
    const savedLang = localStorage.getItem('language') || 'en';
    setLocale(savedLang);
    const isRtl = savedLang === 'ar';
    setDir(isRtl ? 'rtl' : 'ltr');

    // Fetch immediately on mount
    fetchStats();

    // Set up polling every 10 seconds
    const interval = setInterval(() => {
      fetchStats();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 10));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const fetchStats = async () => {
    try {
      setIsFetching(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await fetch(`${API_URL}/api/stats`);
      const data = await response.json();
      setStats(data);
      setLastUpdated(new Date());
      setTimeLeft(10); // Reset timer precisely on fetch
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleLanguageChange = (newLocale: string, newDir: 'ltr' | 'rtl') => {
    setLocale(newLocale);
    setDir(newDir);
  };

  const t = messages[locale] || messages.en;

  const circumference = 2 * Math.PI * 14;
  const strokeDashoffset = circumference - (timeLeft / 10) * circumference;

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans p-4 md:p-8" dir={dir}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & Utilities */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
           <Link href="/" className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors bg-white/50 px-4 py-2 rounded-full border border-slate-200 shadow-sm backdrop-blur-sm">
             <svg className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${dir === 'rtl' ? 'ml-2 rotate-180 group-hover:translate-x-1' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
             {t.backToHome}
           </Link>
           <LanguageSwitcher onLanguageChange={handleLanguageChange} />
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50/50 rounded-full blur-3xl opacity-50 -ml-32 -mb-32 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-4 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {t.title}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-medium">
              {t.subtitle}
            </p>
            <p className="text-sm font-semibold text-slate-400 mt-4 flex items-center gap-2 bg-slate-50/80 inline-flex px-4 py-2 rounded-full border border-slate-100">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.lastUpdated} <span className="text-slate-600">{lastUpdated.toLocaleTimeString()}</span>
            </p>
          </div>

          <div className="relative z-10 mt-8 md:mt-0 flex items-center bg-white/80 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow">
            <div className={`flex flex-col ${dir === 'rtl' ? 'ml-5 text-left' : 'mr-5 text-right'}`}>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.updatingIn}</span>
              <span className="text-2xl font-extrabold text-slate-700 tabular-nums">{timeLeft}<span className="text-lg text-slate-400 font-semibold">{t.seconds}</span></span>
            </div>
            <div className="relative flex items-center justify-center w-14 h-14 bg-slate-50 rounded-full inner-shadow">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle 
                  className="text-slate-100" 
                  strokeWidth="4" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="14" cx="28" cy="28" 
                />
                <circle 
                  className={`text-blue-500 transition-all ${isFetching ? 'duration-100 text-blue-300' : 'duration-1000'} ease-linear`} 
                  strokeWidth="4" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="14" cx="28" cy="28" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className={`w-2 h-2 rounded-full ${isFetching ? 'bg-blue-400 animate-pulse' : 'bg-transparent'}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Requests Made Counter */}
          <div className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100/60 transition-colors duration-500 pointer-events-none"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl group-hover:bg-indigo-100/60 transition-colors duration-500 pointer-events-none"></div>
            
            <div className="relative z-10">
               <div className="flex flex-col gap-6">
                 <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-2xl text-blue-600 shadow-sm border border-blue-100/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                   </svg>
                 </div>
                 
                 <div>
                   <h2 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-3">
                     {t.requestsMade}
                   </h2>
                   <div className="flex items-baseline gap-1">
                     <p className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter tabular-nums drop-shadow-sm">
                       <AnimatedNumber value={stats.requestsMade} />
                     </p>
                   </div>
                   <p className="text-sm text-slate-400 mt-4 font-medium leading-relaxed max-w-[200px]">
                     {t.requestsDesc}
                   </p>
                 </div>
               </div>
            </div>
          </div>

          {/* Tokens Used Counter */}
          <div className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-50/50 rounded-full blur-3xl group-hover:bg-purple-100/60 transition-colors duration-500 pointer-events-none"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-fuchsia-50/50 rounded-full blur-3xl group-hover:bg-fuchsia-100/60 transition-colors duration-500 pointer-events-none"></div>
            
            <div className="relative z-10">
               <div className="flex flex-col gap-6">
                 <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-100 to-fuchsia-50 rounded-2xl text-purple-600 shadow-sm border border-purple-100/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                   </svg>
                 </div>
                 
                 <div>
                   <h2 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-3">
                     {t.tokensUsed}
                   </h2>
                   <div className="flex items-baseline gap-1">
                     <p className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter tabular-nums drop-shadow-sm">
                       <AnimatedNumber value={stats.tokensUsed} />
                     </p>
                   </div>
                   <p className="text-sm text-slate-400 mt-4 font-medium leading-relaxed max-w-[200px]">
                     {t.tokensDesc}
                   </p>
                 </div>
               </div>
            </div>
          </div>

          {/* Active Connections Counter */}
          <div className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50/50 rounded-full blur-3xl group-hover:bg-emerald-100/60 transition-colors duration-500 pointer-events-none"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-teal-50/50 rounded-full blur-3xl group-hover:bg-teal-100/60 transition-colors duration-500 pointer-events-none"></div>
            
            <div className="relative z-10">
               <div className="flex flex-col gap-6">
                 <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl text-emerald-600 shadow-sm border border-emerald-100/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                   </svg>
                 </div>
                 
                 <div>
                   <h2 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-3">
                     {t.activeConnections}
                   </h2>
                   <div className="flex items-baseline gap-1">
                     <p className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter tabular-nums drop-shadow-sm">
                       <AnimatedNumber value={stats.activeConnections} />
                     </p>
                   </div>
                   <p className="text-sm text-slate-400 mt-4 font-medium leading-relaxed max-w-[200px]">
                     {t.connectionsDesc}
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-500"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          
          <div className={`relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start ${dir === 'rtl' ? 'pr-6' : 'pl-6'}`}>
             <div className="p-4 bg-slate-50/80 backdrop-blur-sm rounded-2xl text-blue-500 border border-slate-100/80 shadow-sm shrink-0">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <div>
               <h3 className="text-2xl font-extrabold text-slate-800 mb-3 tracking-tight">
                 {t.about}
               </h3>
               <p className="text-slate-500 leading-relaxed font-medium text-lg max-w-4xl">
                 {t.aboutText}
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
