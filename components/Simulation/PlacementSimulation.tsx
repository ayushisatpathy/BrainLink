import React, { useState, useEffect } from 'react';
import { Timer, Trophy, Code, Users, Star, ArrowRight, CheckCircle2, ChevronRight, Layout, PieChart, Award } from 'lucide-react';

export default function PlacementSimulation() {
  const [stage, setStage] = useState<'intro' | 'coding' | 'hr' | 'feedback'>('intro');
  const [timeLeft, setLeft] = useState(1800); // 30 mins

  useEffect(() => {
    let interval: any;
    if (stage === 'coding' && timeLeft > 0) {
      interval = setInterval(() => setLeft(l => l - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [stage, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col h-[650px] w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Simulation HUD */}
      <div className="p-6 bg-slate-900 border-b border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-2xl border border-yellow-500/20">
               <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
               <h3 className="text-xl font-black italic uppercase tracking-widest text-white">Placement Simulation <span className="text-yellow-500">Center</span></h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Mock Corporate Standards</p>
            </div>
         </div>

         <div className="flex items-center gap-6">
            {stage === 'coding' && (
              <div className="flex items-center gap-3 px-6 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                 <Timer className="w-5 h-5 text-rose-500 animate-pulse" />
                 <span className="text-2xl font-mono font-black text-rose-500 tracking-tighter">{formatTime(timeLeft)}</span>
              </div>
            )}
            <div className="hidden md:flex flex-col items-end">
               <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Live Benchmark</span>
               <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 flex items-center gap-2">
                  <Award className="w-3 h-3 text-yellow-500" />
                  <span className="text-[10px] font-black text-slate-300">Top 10% Match</span>
               </div>
            </div>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Main Simulation Workspace */}
         <div className="flex-1 flex flex-col bg-slate-950/30 overflow-y-auto custom-scrollbar">
            {stage === 'intro' && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-12 animate-in fade-in zoom-in duration-500">
                 <div className="text-center space-y-4 max-w-lg">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter">Enter the <span className="text-primary not-italic block">Pro Simulation.</span></h2>
                    <p className="text-slate-400 text-sm leading-relaxed">Experience a full-cycle placement round. From timed coding to behavioral HR interviews, benchmarked against corporate standards.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                    <ProcessStep 
                       icon={<Code className="w-6 h-6 text-blue-400" />}
                       title="Technical Screen"
                       desc="3 DSA Problems • 45m"
                    />
                    <ProcessStep 
                       icon={<Users className="w-6 h-6 text-indigo-400" />}
                       title="Mock Interview"
                       desc="System Design Round"
                    />
                    <ProcessStep 
                       icon={<Star className="w-6 h-6 text-amber-400" />}
                       title="HR Evaluation"
                       desc="Behavioral Assessment"
                    />
                 </div>

                 <button 
                   onClick={() => setStage('coding')}
                   className="px-12 py-4 bg-primary text-slate-950 rounded-[32px] font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20"
                 >
                   Initialize Simulation
                 </button>
              </div>
            )}

            {stage === 'coding' && (
              <div className="flex-1 flex flex-col p-8 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-start justify-between">
                    <div className="space-y-2">
                       <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 text-[9px] font-black uppercase rounded border border-rose-500/20">Problem 1/3 • HARD</span>
                       <h4 className="text-2xl font-black text-white">Trapping Rain Water</h4>
                    </div>
                    <button onClick={() => setStage('hr')} className="px-6 py-2 bg-emerald-500 text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">Submit Round</button>
                 </div>

                 <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
                    <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 overflow-y-auto custom-scrollbar">
                       <p className="text-sm text-slate-400 leading-relaxed">
                          Given n non-negative integers representing an elevation map where the width of each bar is 1, 
                          compute how many units of water it can trap after raining.
                       </p>
                       <div className="mt-6 p-4 bg-slate-950 border border-white/10 rounded-2xl font-mono text-[11px] text-slate-500">
                          <p>// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]</p>
                          <p>// Output: 6</p>
                       </div>
                    </div>
                    <div className="bg-slate-950 border border-primary/20 rounded-3xl p-8 font-mono text-xs opacity-60">
                       <div className="space-y-1">
                          <p className="text-indigo-400">function trap(height) {"{"}</p>
                          <p className="pl-4">let totalWater = 0;</p>
                          <p className="pl-4">let left = 0, right = height.length - 1;</p>
                          <p className="pl-4 text-primary animate-pulse">|</p>
                          <p className="text-indigo-400">{"}"}</p>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {stage === 'hr' && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 max-w-2xl mx-auto space-y-8 animate-in zoom-in duration-500">
                 <div className="text-center space-y-3">
                    <div className="inline-flex p-4 bg-amber-500/10 rounded-3xl border border-amber-500/20 mb-4">
                       <Star className="w-10 h-10 text-amber-500" />
                    </div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter">Behavioral <span className="text-primary not-italic block">Assessment.</span></h2>
                    <p className="text-slate-400 text-sm">Corporate HR Round Simulation. Be precise and confident.</p>
                 </div>

                 <div className="w-full bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-6">
                    <div className="space-y-4">
                       <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Question 1/5</p>
                       <h4 className="text-lg font-bold text-white leading-relaxed">"Can you describe a situation where you had to work with a difficult team member?"</h4>
                    </div>
                    <textarea 
                      placeholder="Start typing your response..."
                      className="w-full h-40 bg-slate-950 border border-white/10 rounded-2xl p-6 text-sm focus:outline-none focus:border-amber-500/50 resize-none transition-all placeholder:text-slate-800"
                    />
                    <button 
                      onClick={() => setStage('feedback')}
                      className="w-full py-4 bg-amber-500 text-slate-950 font-black rounded-2xl uppercase text-[10px] tracking-widest hover:scale-[1.01] transition-transform"
                    >
                      Next Question
                    </button>
                 </div>
              </div>
            )}

            {stage === 'feedback' && (
              <div className="flex-1 flex flex-col p-12 space-y-8 animate-in fade-in duration-500">
                 <div className="text-center space-y-3">
                    <div className="inline-flex p-4 bg-emerald-500/10 rounded-full mb-2">
                       <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter">Round <span className="text-primary not-italic block text-center">Summary.</span></h2>
                    <p className="text-slate-400 text-sm">Performance analytics based on campus-wide benchmarking.</p>
                 </div>

                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <ScoreCard label="Technical" value="84/100" />
                    <ScoreCard label="Communication" value="92/100" />
                    <ScoreCard label="Time Mgmt" value="Top 5%" />
                    <ScoreCard label="Overall Rank" value="#42" />
                 </div>

                 <div className="flex-1 bg-slate-900 border border-white/5 rounded-[40px] p-8 space-y-6">
                    <div className="flex items-center justify-between">
                       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Local Leaderboard</h4>
                       <span className="text-[10px] text-primary font-black uppercase">Refresh in 5m</span>
                    </div>
                    <div className="space-y-3">
                       <LeaderboardRow rank={1} name="Ankit S." score={2450} isMe={false} />
                       <LeaderboardRow rank={2} name="Sneha K." score={2310} isMe={false} />
                       <LeaderboardRow rank={42} name="YOU" score={1840} isMe={true} />
                    </div>
                 </div>

                 <button 
                   onClick={() => setStage('intro')}
                   className="w-full py-4 bg-white/5 border border-white/10 text-slate-400 font-bold rounded-2xl hover:text-white transition-colors uppercase text-[10px] tracking-widest"
                 >
                   Re-launch Center
                 </button>
              </div>
            )}
         </div>

         {/* Stats Panel */}
         <div className="w-80 bg-slate-900 border-l border-white/5 flex flex-col p-8 space-y-8 overflow-y-auto custom-scrollbar">
            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <PieChart className="w-3.5 h-3.5" /> Skill Radar
               </h4>
               <div className="space-y-4">
                  <SkillProgress label="DSA" val={85} />
                  <SkillProgress label="Design" val={60} />
                  <SkillProgress label="Soft Skills" val={90} />
               </div>
            </section>

            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recent Activity</h4>
               <div className="space-y-4">
                  <ActivityItem text="Completed HR Round" time="2h ago" />
                  <ActivityItem text="New Rank: #42" time="5h ago" />
               </div>
            </section>
         </div>
      </div>
    </div>
  );
}

function ProcessStep({ icon, title, desc }: any) {
   return (
      <div className="p-6 rounded-[32px] bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
         <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">{icon}</div>
         <h4 className="text-sm font-black uppercase text-slate-100 mb-1">{title}</h4>
         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{desc}</p>
      </div>
   );
}

function ScoreCard({ label, value }: any) {
   return (
      <div className="p-6 rounded-3xl bg-slate-900 border border-white/5 text-center flex flex-col items-center justify-center">
         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
         <h4 className="text-xl font-black text-white">{value}</h4>
      </div>
   );
}

function LeaderboardRow({ rank, name, score, isMe }: any) {
   return (
      <div className={`p-4 rounded-2xl flex items-center justify-between border transition-all ${
         isMe ? 'bg-primary/10 border-primary text-primary shadow-xl shadow-primary/5' : 'bg-white/20 border-white/5 text-slate-400'
      }`}>
         <div className="flex items-center gap-4">
            <span className="text-xs font-black italic w-6">#{rank}</span>
            <span className="text-xs font-bold uppercase tracking-widest">{name}</span>
         </div>
         <span className="text-xs font-black font-mono">{score} pts</span>
      </div>
   );
}

function SkillProgress({ label, val }: any) {
   return (
      <div className="space-y-2">
         <div className="flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-widest">
            <span>{label}</span>
            <span>{val}%</span>
         </div>
         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${val}%` }} />
         </div>
      </div>
   );
}

function ActivityItem({ text, time }: any) {
   return (
      <div className="flex gap-3">
         <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
         <div>
            <p className="text-[11px] font-bold text-slate-300 leading-none mb-1">{text}</p>
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">{time}</p>
         </div>
      </div>
   );
}
