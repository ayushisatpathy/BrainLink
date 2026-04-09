"use client";

import React, { useState, useEffect } from 'react';
import { Timer, Coffee, Flame, BookOpen, Bell, CheckCircle2, VolumeX } from 'lucide-react';

export default function SilentStudy() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [sessionsCompleted, setSessionsCompleted] = useState(3);
  const [totalStudyTime, setTotalStudyTime] = useState(145); // minutes

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Logic for switching modes could go here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'study' ? 25 * 60 : 5 * 60);
  };

  return (
    <div className="flex flex-col h-[600px] w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* HUD Header */}
      <div className="p-6 bg-slate-900 border-b border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/20">
               <BookOpen className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
               <h3 className="text-xl font-black italic uppercase tracking-tighter">Silent Study Library</h3>
               <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                     <VolumeX className="w-3 h-3" /> Area is Muted
                  </span>
                  <span className="w-1 h-1 bg-slate-800 rounded-full" />
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">15 Students Focusing</span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
               <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Your Streak</span>
               <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-500/20">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span className="text-sm font-black text-orange-500">12 DAYS</span>
               </div>
            </div>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Focus Timer Section */}
         <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-950/50 relative">
            {/* Visual Progress Ring Backdrop */}
            <div className="absolute w-80 h-80 rounded-full border-[12px] border-white/5" />
            
            <div className="space-y-8 text-center relative">
               <div className="space-y-2">
                  <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">{mode === 'study' ? 'Deep Work Session' : 'Take a Break'}</p>
                  <h1 className="text-8xl font-black font-mono tracking-tighter tabular-nums">{formatTime(timeLeft)}</h1>
               </div>

               <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={toggleTimer}
                    className={`px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl ${
                       isActive 
                       ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' 
                       : 'bg-indigo-500 text-white shadow-indigo-500/20 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isActive ? 'Pause Session' : 'Start Focus'}
                  </button>
                  <button 
                    onClick={resetTimer}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-500 hover:text-white transition-colors"
                  >
                    <Coffee className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>

         {/* Stats and Achievements Sidebar */}
         <div className="w-80 bg-slate-900 border-l border-white/5 flex flex-col">
            <div className="p-8 space-y-8">
               <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                     <Bell className="w-3.5 h-3.5" /> Session Stats
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                     <StatBox label="Today" value={`${sessionsCompleted}h`} />
                     <StatBox label="Total" value={`${totalStudyTime}m`} />
                  </div>
               </section>

               <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Milestones</h4>
                  <div className="space-y-3">
                     <Milestone 
                        title="Early Bird" 
                        progress={80} 
                        desc="Focus for 1h before 9AM"
                     />
                     <Milestone 
                        title="Focus Master" 
                        progress={45} 
                        desc="Complete 5 Pomodoros"
                     />
                  </div>
               </section>

               <section className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-slate-950" />
                     </div>
                     <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Focus Tip</p>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed italic">"The secret of getting ahead is getting started. Focus on one task for 25 mins."</p>
               </section>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string, value: string }) {
   return (
      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
         <p className="text-xl font-black text-slate-100">{value}</p>
      </div>
   );
}

function Milestone({ title, progress, desc }: any) {
   return (
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3 group hover:bg-white/10 transition-all cursor-default">
         <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-slate-200">{title}</h5>
            <span className="text-[9px] font-black text-indigo-400">{progress}%</span>
         </div>
         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
         </div>
         <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">{desc}</p>
      </div>
   );
}
