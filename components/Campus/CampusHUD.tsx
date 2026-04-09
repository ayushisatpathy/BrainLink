"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Zap, Users, BookOpen, Flame } from 'lucide-react';

export default function CampusHUD() {
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    const handleEnter = (e: any) => {
      const room = e.detail;
      setActivities(prev => [`✓ ACTIVATED: ${room}`, ...prev].slice(0, 5));
    };

    window.addEventListener('enterRoom', handleEnter);
    return () => window.removeEventListener('enterRoom', handleEnter);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 z-[50] flex flex-col gap-4 pointer-events-none">
      {/* Activity Feed */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-80 shadow-2xl animate-in slide-in-from-left-4 duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-100">Live Activity</h3>
        </div>
        
        <div className="space-y-3">
          {activities.map((act, i) => (
            <div key={i} className="flex gap-3 items-start animate-in fade-in slide-in-from-top-1">
              <div className="w-1 h-1 rounded-full bg-slate-700 mt-1.5" />
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{act}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Indicator */}
      <div className="flex gap-3">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl pointer-events-auto hover:bg-slate-800 transition-colors cursor-help group">
          <div className="p-2 bg-orange-500/20 rounded-lg group-hover:scale-110 transition-transform">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">Current Streak</p>
            <p className="text-sm font-black text-slate-100">12 Days</p>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Zap className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">Study Points</p>
            <p className="text-sm font-black text-slate-100">2.4k</p>
          </div>
        </div>
      </div>
    </div>
  );
}
