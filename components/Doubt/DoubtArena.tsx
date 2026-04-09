"use client";

import React, { useState } from 'react';
import { MessageSquare, HelpCircle, ArrowUpCircle, CheckCircle2, Search, Filter, Plus, Users } from 'lucide-react';

const INITIAL_DOUBTS = [
  {
    id: 1,
    title: "How to optimize Dijkstra's for large sparse graphs?",
    author: "Sneha",
    tags: ["Graph", "DSA"],
    upvotes: 12,
    resolved: false,
    replies: 5
  },
  {
    id: 2,
    title: "Understanding React Server Components vs hydration",
    author: "Rahul",
    tags: ["React", "NextJS"],
    upvotes: 8,
    resolved: true,
    replies: 3
  }
];

export default function DoubtArena() {
  const [doubts, setDoubts] = useState(INITIAL_DOUBTS);
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="flex flex-col h-[650px] w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Doubt Header */}
      <div className="p-6 bg-slate-900 border-b border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/20">
               <HelpCircle className="w-6 h-6 text-rose-400" />
            </div>
            <div>
               <h3 className="text-xl font-black italic uppercase tracking-widest text-white">Doubt Solving <span className="text-rose-500">Arena</span></h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Real-time Peer Assistance</p>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl border border-white/5">
                <Users className="w-4 h-4 text-slate-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase">8 Mentors Online</span>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-black uppercase shadow-lg shadow-rose-500/10 hover:scale-105 transition-transform">
               <Plus className="w-4 h-4" /> Post Question
            </button>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Questions Feed */}
         <div className="flex-1 flex flex-col bg-slate-950/30">
            {/* Search and Filters */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between gap-4">
               <div className="flex-1 relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <input 
                    type="text" 
                    placeholder="Search for queries..." 
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:border-rose-500/50 outline-none transition-all"
                  />
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-600 uppercase mr-2"><Filter className="w-3.5 h-3.5 inline mr-1" /> Sort:</span>
                  <FilterChip label="Recent" active={activeFilter === 'recent'} onClick={() => setActiveFilter('recent')} />
                  <FilterChip label="Top" active={activeFilter === 'top'} onClick={() => setActiveFilter('top')} />
                  <FilterChip label="Unresolved" active={activeFilter === 'unresolved'} onClick={() => setActiveFilter('unresolved')} />
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
               {doubts.map(doubt => (
                 <DoubtCard key={doubt.id} {...doubt} />
               ))}
            </div>
         </div>

         {/* Sidebar: Mentor Lounge & Tips */}
         <div className="w-80 bg-slate-900 border-l border-white/5 flex flex-col p-8 space-y-8">
            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Mentors</h4>
               <div className="space-y-3">
                  <MentorStatus name="Arjun V." expertise="React, System Design" online />
                  <MentorStatus name="Priya S." expertise="DSA, Java" online />
                  <MentorStatus name="Kishore M." expertise="Backend, Cloud" />
               </div>
            </section>

            <section className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/20 mt-auto">
               <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center mb-4">
                  <HelpCircle className="w-5 h-5 text-slate-950" />
               </div>
               <h5 className="text-sm font-black text-rose-500 uppercase mb-2">Help a Peer!</h5>
               <p className="text-[11px] text-slate-400 leading-relaxed italic">"The best way to learn is to teach. Pick an unresolved doubt and share your knowledge."</p>
            </section>
         </div>
      </div>
    </div>
  );
}

function DoubtCard({ title, author, tags, upvotes, resolved, replies }: any) {
   return (
      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-rose-500/30 transition-all group cursor-pointer relative overflow-hidden">
         <div className="flex gap-6">
            <div className="flex flex-col items-center gap-1 mt-1">
               <button className="text-slate-600 hover:text-rose-500 transition-colors">
                  <ArrowUpCircle className="w-6 h-6" />
               </button>
               <span className="text-sm font-black font-mono">{upvotes}</span>
            </div>
            
            <div className="flex-1 space-y-3">
               <div className="flex items-center gap-3">
                  {resolved && (
                    <span className="flex items-center gap-1 text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                       <CheckCircle2 className="w-3 h-3" /> RESOLVED
                    </span>
                  )}
                  <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">By {author}</span>
               </div>
               <h4 className="text-base font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">{title}</h4>
               <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                     {tags.map((tag: string) => (
                        <span key={tag} className="px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-slate-500 uppercase">{tag}</span>
                     ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px]">
                     <MessageSquare className="w-3.5 h-3.5" /> {replies} Responses
                  </div>
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-rose-500/10 transition-all" />
      </div>
   );
}

function FilterChip({ label, active, onClick }: any) {
   return (
      <button 
        onClick={onClick}
        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
           active ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
        }`}
      >
         {label}
      </button>
   );
}

function MentorStatus({ name, expertise, online }: any) {
   return (
      <div className="flex items-center gap-3 group translate-x-0 hover:translate-x-2 transition-transform">
         <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-xs font-black text-slate-400 border border-white/5 shadow-xl">{name[0]}</div>
            {online && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />}
         </div>
         <div>
            <p className="text-xs font-bold text-slate-200 leading-none mb-1">{name}</p>
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-tight">{expertise}</p>
         </div>
      </div>
   );
}
