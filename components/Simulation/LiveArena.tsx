"use client";

import React, { useState } from 'react';
import { Swords, Flame, Trophy, Clock, Zap, TrendingUp, Users } from 'lucide-react';

export default function LiveArena() {
  const [activeTab, setActiveTab] = useState<'arena' | 'leaderboard'>('arena');

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 p-8">
      {/* Arena Header */}
      <div className="flex items-center justify-between mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/20">
        <div className="p-6 flex items-center gap-6">
          <div className="relative">
            <div className="p-4 bg-orange-600 rounded-2xl shadow-lg shadow-orange-600/40">
                <Swords className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight italic uppercase">Live Coding <span className="text-orange-500">Arena</span></h2>
            <p className="text-xs text-orange-200 uppercase tracking-[0.2em] font-bold">Competitive Battlegrounds</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 px-8 border-l border-orange-500/10 h-full">
            <div className="text-center">
                <p className="text-[10px] text-orange-400 font-black mb-1">LIVE NOW</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xl font-black">124</span>
                </div>
            </div>
            <div className="text-center">
                <p className="text-[10px] text-orange-400 font-black mb-1">PRIZE POOL</p>
                <div className="flex items-center gap-1 font-black text-xl text-yellow-500">
                    <Zap className="w-4 h-4 fill-yellow-500" /> 5000+
                </div>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 w-fit self-center">
        <TabButton 
            active={activeTab === 'arena'} 
            onClick={() => setActiveTab('arena')}
            icon={<Flame className="w-4 h-4" />}
            label="Active Battles"
        />
        <TabButton 
            active={activeTab === 'leaderboard'} 
            onClick={() => setActiveTab('leaderboard')}
            icon={<Trophy className="w-4 h-4" />}
            label="Season Ranking"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'arena' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <BattleCard 
                title="Google APM Simulation"
                difficulty="Hard"
                timeLeft="12:45"
                participants={42}
                points={800}
                category="DP & Graphs"
                status="ongoing"
            />
             <BattleCard 
                title="Amazon SDE-1 Speedrun"
                difficulty="Medium"
                timeLeft="45:00"
                participants={128}
                points={450}
                category="Trees & Linked Lists"
                status="upcoming"
            />
             <BattleCard 
                title="Microsoft Mock Hack"
                difficulty="Expert"
                timeLeft="2h 15m"
                participants={18}
                points={1200}
                category="System Design"
                status="ongoing"
            />
             <BattleCard 
                title="Weekly Junior Sprint"
                difficulty="Easy"
                timeLeft="Starts Tomorrow"
                participants={0}
                points={200}
                category="Arrays & Strings"
                status="upcoming"
            />
          </div>
        ) : (
          <div className="bg-slate-900/30 rounded-3xl border border-white/5 p-8 animate-in zoom-in-95 duration-300">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black flex items-center gap-2">
                    <TrendingUp className="text-green-500" /> Global Leaderboard
                </h3>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Season 4 • March 2026</span>
             </div>
             
             <div className="space-y-3">
                <LeaderboardItem rank={1} name="CyberNinja" points={12450} streak={15} badge="Grandmaster" />
                <LeaderboardItem rank={2} name="AlgoKing" points={11200} streak={8} badge="Master" />
                <LeaderboardItem rank={3} name="BitWizard" points={10800} streak={12} badge="Master" />
                <LeaderboardItem rank={4} name="CodeGeass" points={9400} streak={5} badge="Expert" />
                <LeaderboardItem rank={5} name="PythonPro" points={8900} streak={22} badge="Expert" />
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button 
            onClick={onClick}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                active ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
        >
            {icon} {label}
        </button>
    );
}

function BattleCard({ title, difficulty, timeLeft, participants, points, category, status }: any) {
    const diffColor = difficulty === 'Hard' ? 'text-red-400 bg-red-400/10' : difficulty === 'Expert' ? 'text-purple-400 bg-purple-400/10' : 'text-blue-400 bg-blue-400/10';
    
    return (
        <div className="bg-slate-900/40 p-6 rounded-3xl border border-white/5 group hover:border-orange-500/30 transition-all cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3">
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${diffColor}`}>
                    {difficulty}
                </span>
            </div>

            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{category}</p>
            <h4 className="text-lg font-black group-hover:text-orange-500 transition-colors mb-4">{title}</h4>
            
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs font-mono font-bold">{timeLeft}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs font-mono font-bold">{participants} joined</span>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1 font-black text-yellow-500 text-sm">
                    <Zap className="w-3 h-3 fill-yellow-500" /> +{points} XP
                </div>
                <button className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    status === 'ongoing' ? 'bg-orange-600 text-white hover:brightness-110' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}>
                    {status === 'ongoing' ? 'Join Battle' : 'Registered'}
                </button>
            </div>
        </div>
    );
}

function LeaderboardItem({ rank, name, points, streak, badge }: any) {
    const rankColor = rank === 1 ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' : rank === 2 ? 'text-slate-300 bg-slate-300/10 border-slate-300/20' : rank === 3 ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' : 'text-slate-500 bg-slate-800/30 border-white/5';

    return (
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${rankColor}`}>
            <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center font-black italic">{rank}</span>
                <div>
                    <h4 className="font-bold text-sm text-slate-100">{name}</h4>
                    <p className="text-[9px] uppercase tracking-widest font-black opacity-50">{badge}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="text-center">
                    <p className="text-[8px] opacity-50 uppercase font-black">Points</p>
                    <p className="text-xs font-black">{points.toLocaleString()}</p>
                </div>
                <div className="text-center group">
                    <p className="text-[8px] opacity-50 uppercase font-black flex items-center gap-1 justify-center">
                        <Flame className="w-2.5 h-2.5 text-orange-500" /> Streak
                    </p>
                    <p className="text-xs font-black">{streak}d</p>
                </div>
            </div>
        </div>
    );
}
