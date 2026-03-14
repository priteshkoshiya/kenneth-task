'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Billing() {
  const [sessionActive, setSessionActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const COST_PER_SECOND = 0.02;

  useEffect(() => {
    if (sessionActive) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          const newTime = prev + 1;
          setTotalCost(newTime * COST_PER_SECOND);
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sessionActive]);

  const handleStartSession = () => {
    setSessionActive(true);
    setElapsedTime(0);
    setTotalCost(0);
    setPaymentIntentId('');
  };

  const handleEndSession = async () => {
    setSessionActive(false);
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await fetch(`${API_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalCost,
        }),
      });

      const data = await response.json();
      setPaymentIntentId(data.paymentIntentId);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      alert('Error creating payment intent. Make sure the backend is running and STRIPE_SECRET_KEY is set.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeMinutesValues = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { mins: mins.toString().padStart(2, '0'), secs: secs.toString().padStart(2, '0') };
  };

  const timeVals = formatTimeMinutesValues(elapsedTime);

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans p-4 md:p-8 selection:bg-purple-200 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[120px] mix-blend-multiply pointer-events-none -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-[120px] mix-blend-multiply pointer-events-none -ml-40 -mb-40"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        {/* Navigation */}
        <Link href="/" className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-purple-600 transition-colors bg-white/50 px-4 py-2 rounded-full border border-slate-200 shadow-sm backdrop-blur-sm">
          <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        
        {/* Header */}
        <div className="text-center sm:text-left">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100/50 border border-purple-200/50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             Live Metering
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
             Adaptive Billing
           </h1>
           <p className="text-lg md:text-xl text-slate-500 font-medium">
             Start a secure Stripe session to track usage and cost in real-time
           </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Main Card (Timer & Controls) */}
          <div className="lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden group">
            
            {/* Timer Display */}
            <div className="flex flex-col items-center justify-center py-10 relative">
              
              {/* Spinning Glow Effect when active */}
              {sessionActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none blur-2xl">
                   <div className="w-48 h-48 bg-purple-400/30 rounded-full animate-spin-slow"></div>
                   <div className="w-48 h-48 bg-pink-400/30 rounded-full animate-reverse-spin absolute mix-blend-multiply"></div>
                </div>
              )}

              <div className={`relative z-10 w-56 h-56 rounded-full flex flex-col items-center justify-center border-[6px] transition-colors duration-500 shadow-inner ${sessionActive ? 'border-purple-100 bg-white shadow-[0_0_50px_rgba(168,85,247,0.15)]' : 'border-slate-50 bg-slate-50/50 grayscale'}`}>
                 <div className="flex items-baseline gap-1 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-700">
                    <span className="text-6xl font-black tabular-nums tracking-tighter">{timeVals.mins}</span>
                    <span className="text-4xl font-bold opacity-50 mb-1">:</span>
                    <span className="text-6xl font-black tabular-nums tracking-tighter">{timeVals.secs}</span>
                 </div>
                 
                 <div className={`mt-3 flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors px-4 py-1.5 rounded-full ${sessionActive ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-500'}`}>
                    {sessionActive && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                      </span>
                    )}
                    {sessionActive ? 'Tracking' : 'Stopped'}
                 </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
               <button
                 onClick={handleStartSession}
                 disabled={sessionActive || loading}
                 className={`flex-1 relative overflow-hidden py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 ${
                   sessionActive || loading
                     ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-transparent'
                     : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-[0_8px_25px_rgba(16,185,129,0.3)] hover:-translate-y-1'
                 }`}
               >
                 {!sessionActive && !loading && <div className="absolute inset-0 bg-white/20 w-1/2 skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>}
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                 </svg>
                 Start Session
               </button>

               <button
                 onClick={handleEndSession}
                 disabled={!sessionActive || loading}
                 className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 ${
                   !sessionActive && !loading
                     ? 'bg-slate-100 text-slate-400 border-transparent cursor-not-allowed'
                     : loading
                       ? 'bg-slate-800 text-white cursor-wait'
                       : 'bg-slate-900 text-white hover:bg-black hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] hover:-translate-y-1'
                 }`}
               >
                 {loading ? (
                   <>
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                     Processing...
                   </>
                 ) : (
                   <>
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                     </svg>
                     End & Pay
                   </>
                 )}
               </button>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Cost Display */}
             <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-slate-500 font-bold uppercase tracking-widest text-sm">Accumulated Cost</h2>
                 <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
               </div>
               
               <div className="flex items-baseline gap-1 mb-2">
                 <span className="text-3xl font-bold text-slate-400">$</span>
                 <span className="text-6xl font-black text-slate-900 tracking-tighter tabular-nums">{totalCost.toFixed(2)}</span>
               </div>
               
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100/50 mt-2">
                 <span className="text-sm font-semibold text-slate-600">${COST_PER_SECOND.toFixed(2)}</span>
                 <span className="text-xs text-slate-400 font-medium">per second</span>
               </div>
             </div>

             {/* Stripe Details / Payment Intent */}
             {paymentIntentId ? (
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(99,102,241,0.2)] text-white relative overflow-hidden animate-[fade-in-up_0.5s_ease-out]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16"></div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Secure Checkout</h3>
                      <p className="text-purple-200 text-sm font-medium">Payment intent generated.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <p className="text-xs text-purple-200 uppercase tracking-widest font-bold mb-1">Stripe Intent ID</p>
                      <p className="text-sm font-mono text-white break-all">{paymentIntentId}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                         <p className="text-xs text-purple-200 uppercase tracking-widest font-bold mb-1">Final Time</p>
                         <p className="text-xl font-bold">{formatTimeMinutesValues(elapsedTime).mins}:{formatTimeMinutesValues(elapsedTime).secs}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                         <p className="text-xs text-purple-200 uppercase tracking-widest font-bold mb-1">Total Due</p>
                         <p className="text-xl font-bold">${totalCost.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
             ) : (
                <div className="bg-indigo-50/80 backdrop-blur-md rounded-[2rem] p-8 border border-indigo-100/50 relative overflow-hidden h-[300px]">
                   <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                     <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     How It Works
                   </h3>
                   <ol className="space-y-4 text-sm text-slate-600 font-medium">
                     <li className="flex gap-3">
                       <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs mt-0.5">1</span>
                       Start the timer to simulate an AI computing session.
                     </li>
                     <li className="flex gap-3">
                       <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs mt-0.5">2</span>
                       Watch the cost calculate dynamically.
                     </li>
                     <li className="flex gap-3">
                       <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs mt-0.5">3</span>
                       Ending the session calls standard Stripe APIs to create an intent securely.
                     </li>
                   </ol>
                   <p className="text-xs text-indigo-600/70 mt-6 pt-4 border-t border-indigo-200/50 font-medium italic">
                     This operates entirely in Stripe test mode. 
                   </p>
                </div>
             )}
          </div>
        </div>
      </div>

    </div>
  );
}
