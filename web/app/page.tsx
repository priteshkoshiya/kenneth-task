import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans selection:bg-blue-200">

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-purple-400/20 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[40%] bg-emerald-400/20 rounded-full blur-[120px] mix-blend-multiply"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* Hero Section */}

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">

          {/* Task 1 - Dashboard */}
          <Link href="/dashboard" className="group">
            <div className="h-full bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-blue-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-colors duration-500 pointer-events-none -mr-20 -mt-20"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">TASK 1</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Live Dashboard
                </h2>
                <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                  Real-time counters with automatic updates every 10 seconds. Features smooth number animations and a visual countdown timer.
                </p>

                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Explore Dashboard</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Task 4 - i18n */}
          <Link href="/dashboard" className="group">
            <div className="h-full bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-emerald-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl group-hover:bg-emerald-100/50 transition-colors duration-500 pointer-events-none -ml-20 -mt-20"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100/50 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">TASK 4</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  Multi-Language + RTL
                </h2>
                <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                  Seamless localization supporting English, Arabic (RTL), and Spanish. Persistent preferences across the entire application layout.
                </p>

                <div className="flex items-center text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Try Languages</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Task 5 - Stripe */}
          <Link href="/billing" className="group">
            <div className="h-full bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-purple-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50/50 rounded-full blur-3xl group-hover:bg-purple-100/50 transition-colors duration-500 pointer-events-none -mr-20 -mt-20"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-fuchsia-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm border border-purple-100/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">TASK 5</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Stripe Metered Billing
                </h2>
                <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                  Start/stop AI sessions with real-time cost tracking ($0.02/sec). Includes secure Stripe Payment Intent creation and checkout.
                </p>

                <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>View Billing Flow</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Task 2 - Mobile */}
          <div className="group h-full bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-orange-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-50/50 rounded-full blur-3xl group-hover:bg-orange-100/50 transition-colors duration-500 pointer-events-none -ml-20 -mt-20"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-50 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm border border-orange-100/50 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">TASK 2</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                Native Mobile App
              </h2>
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                React Native (Expo) companion app featuring an approval/rejection flow. Fully integrated with the backend API.
              </p>

              <div className="bg-orange-50/80 border border-orange-100/50 p-4 rounded-xl flex items-center justify-between">
                <code className="text-orange-700 font-mono text-sm font-semibold">cd mobile && npm start</code>
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600" title="Run in terminal to start Expo">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l3 3-3 3m5 0h3M4 15V9a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task 3 - Docker (Wide Status Card) */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-[2rem] p-1 shadow-2xl overflow-hidden group">
          <div className="bg-slate-900 rounded-[1.85rem] p-8 md:p-10 relative overflow-hidden h-full">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIwdi0yMHptLTIwIDBoMjB2MjBIMHYtMjB6bTIwLTIwaDIwdjIwSDIwdjIweiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)] group-hover:opacity-30 transition-opacity duration-700"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="w-20 h-20 bg-indigo-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-400/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] shrink-0 group-hover:scale-105 transition-transform duration-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 text-xs font-bold px-3 py-1 rounded-full tracking-wider">TASK 3</span>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-400 text-xs font-medium">Services Ready</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Docker Compose Multi-Service Stack
                </h2>
                <p className="text-slate-400 text-lg">
                  Complete orchestration for Next.js web app, Express API backend, and PostgreSQL database. Fully containerized and networked.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl w-full md:w-auto shrink-0 group-hover:border-indigo-500/50 transition-colors duration-500">
                <div className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider flex items-center justify-between">
                  <span>Terminal</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <code className="text-indigo-400 font-mono text-base font-medium flex items-center gap-3">
                  <span className="text-slate-600">$</span> docker compose up
                </code>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
