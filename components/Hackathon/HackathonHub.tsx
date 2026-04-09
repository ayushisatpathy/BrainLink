"use client";

import React, { useState } from 'react';
import { Target, Trophy, Users, Send, ExternalLink, Flame, Lightbulb, UserPlus, Search, ChevronRight } from 'lucide-react';

const CAPITAL_ARENA_URL = "https://unstop.com/competitions/capital-arena-season-2-arya-college-of-engineering-and-information-technology-aceit-jaipur-rajasthan-1648863?lb=DoaYWVzM&utm_medium=Share&utm_source=dwbcplje60572&utm_campaign=Competitions";

export default function HackathonHub() {
  const [activeTab, setActiveTab] = useState('competitions');

  return (
    <div className="flex flex-col h-[650px] w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Hub Header */}
      <div className="p-6 bg-slate-900 border-b border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/20">
               <Trophy className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
               <h3 className="text-xl font-black italic uppercase tracking-widest text-white">Hackathon <span className="text-cyan-500">Hub</span></h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Team Up • Innovate • Win</p>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl border border-white/5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase">5 Active Hacks Today</span>
            </div>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Main Hub Content */}
         <div className="flex-1 flex flex-col bg-slate-950/30 overflow-y-auto custom-scrollbar">
            {/* Navigation Tabs */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-8">
               <NavTab label="Competitions" active={activeTab === 'competitions'} onClick={() => setActiveTab('competitions')} />
               <NavTab label="Team Finder" active={activeTab === 'teams'} onClick={() => setActiveTab('teams')} />
               <NavTab label="Idea Sandbox" active={activeTab === 'ideas'} onClick={() => setActiveTab('ideas')} />
            </div>

            <div className="p-6 space-y-6">
               {activeTab === 'competitions' && (
                 <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Featured Competition</h4>
                    <div className="p-8 rounded-[32px] bg-gradient-to-br from-cyan-600/20 to-indigo-600/20 border border-cyan-500/30 relative overflow-hidden group">
                       <div className="relative z-10 space-y-4">
                          <div className="flex items-center gap-3">
                             <span className="px-3 py-1 bg-cyan-500 text-slate-950 text-[10px] font-black uppercase rounded-full">ACTIVE</span>
                             <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Unstop Featured</span>
                          </div>
                          <h3 className="text-3xl font-black italic uppercase tracking-tighter">Capital Arena <span className="text-cyan-500">Season 2</span></h3>
                          <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
                             Join the ultimate innovation challenge by Arya College of Engineering. Compete with top minds and showcase your problem-solving skills.
                          </p>
                          <div className="flex items-center gap-6 pt-4">
                             <a 
                               href={CAPITAL_ARENA_URL} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="flex items-center gap-2 px-8 py-3 bg-cyan-500 text-slate-950 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                             >
                               Apply Now <ExternalLink className="w-4 h-4" />
                             </a>
                             <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-2xl bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs font-bold" />)}
                                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-cyan-400">+1.2k</div>
                             </div>
                          </div>
                       </div>
                       <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-cyan-500/20 transition-all" />
                       <Trophy className="absolute bottom-4 right-8 w-32 h-32 text-cyan-500/5 rotate-12 group-hover:scale-110 transition-transform" />
                    </div>

                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pt-4">Browse All</h4>
                    <CompetitionRow name="Projectathon 2.0" host="Arya College" prize="TBD" href="https://docs.google.com/forms/d/e/1FAIpQLSffQNlcGOYQG9Y0wUjO2mZ9OkwarPaV7Dg1VYD8SvS89RhiyA/closedform" applied={true} />
                    <CompetitionRow name="HackAryaVerse 2.0" host="Arya College" prize="TBD" href="https://linktr.ee/HackAryaVerse_2.0" />
                    <CompetitionRow name="CodeRush 2024" host="IIT Bombay" prize="₹5,00,000" />
                    <CompetitionRow name="HackTheWorld" host="Major League Hacking" prize="$10,000" />
                 </div>
               )}

               {activeTab === 'teams' && (
                 <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center justify-between gap-4 py-2">
                       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recent Team Postings</h4>
                       <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Create Team</button>
                    </div>
                    <TeamCard 
                       title="Frontend Wizard Needed" 
                       hack="Capital Arena" 
                       tags={["React", "Framer Motion"]} 
                       members={2} 
                       needed={1} 
                    />
                    <TeamCard 
                       title="Python/ML Backend Support" 
                       hack="CodeRush" 
                       tags={["FastAPI", "Tensorflow"]} 
                       members={3} 
                       needed={2} 
                    />
                 </div>
               )}

               {activeTab === 'ideas' && (
                 <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center">
                       <Lightbulb className="w-10 h-10 text-cyan-500" />
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-xl font-bold uppercase italic">Idea Sandbox</h3>
                       <p className="text-slate-400 text-sm max-w-sm">Collaborate on concepts before you build. Share your sparks and find mentors to validate them.</p>
                    </div>
                    <button className="px-8 py-3 bg-cyan-500 text-slate-950 rounded-xl font-black uppercase text-xs tracking-widest">New Proposal</button>
                 </div>
               )}
            </div>
         </div>

         {/* Sidebar: Hub Stats */}
         <div className="w-80 bg-slate-900 border-l border-white/5 flex flex-col p-8 space-y-8">
            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" /> Your Profile
               </h4>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] text-slate-400 font-bold">Hackathon Score</span>
                     <span className="text-sm font-black text-cyan-400">1,240 XP</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-500 rounded-full w-2/3" />
                  </div>
               </div>
            </section>

            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trending Topics</h4>
               <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400">AI Safety</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400">Web3</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400">Sustainable Tech</span>
               </div>
            </section>

            <div className="mt-auto p-6 rounded-3xl bg-cyan-500/10 border border-cyan-500/20">
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                     <Trophy className="w-5 h-5 text-slate-950" />
                  </div>
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest leading-none">Pro Tip</p>
               </div>
               <p className="text-[11px] text-slate-400 leading-relaxed italic">"A balanced team with diverse skills (Dev, Design, Pitch) wins hackathons. Network in the Team Finder!"</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function NavTab({ label, active, onClick }: any) {
   return (
      <button 
        onClick={onClick}
        className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all pb-4 border-b-2 ${
         active ? 'text-cyan-500 border-cyan-500' : 'text-slate-600 border-transparent hover:text-slate-400'
      }`}>
         {label}
      </button>
   );
}

function CompetitionRow({ name, host, prize, href, applied }: any) {
   const Content = (
     <div className="p-4 w-full rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-colors cursor-pointer relative overflow-hidden">
        {applied && (
           <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase px-2 py-0.5 rounded-bl-lg">
              Applied
           </div>
        )}
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
           </div>
           <div className="text-left">
              <p className="text-sm font-bold text-slate-200">{name}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{host}</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <p className="text-xs font-black text-cyan-400">{prize}</p>
              <p className="text-[9px] text-slate-600 font-black uppercase tracking-tighter">Prize Pool</p>
           </div>
           <ChevronRight className="w-4 h-4 text-slate-700 group-hover:translate-x-1 transition-transform" />
        </div>
     </div>
   );

   if (href) {
      return (
         <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
            {Content}
         </a>
      );
   }

   return Content;
}

function TeamCard({ title, hack, tags, members, needed }: any) {
   return (
      <div className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group cursor-pointer">
         <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
               <p className="text-[9px] text-cyan-500 font-black uppercase tracking-widest">{hack}</p>
               <h5 className="font-bold text-slate-100">{title}</h5>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
               <UserPlus className="w-3.5 h-3.5 text-cyan-400" />
               <span className="text-[10px] font-black text-cyan-400">{needed} Needed</span>
            </div>
         </div>
         <div className="flex items-center justify-between">
            <div className="flex gap-2">
               {tags.map((tag: string) => <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-bold text-slate-500 uppercase">{tag}</span>)}
            </div>
            <div className="flex items-center gap-2">
               <div className="flex -space-x-2">
                  {[...Array(members)].map((_, i) => <div key={i} className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-900" />)}
               </div>
               <span className="text-[10px] font-bold text-slate-600">{members} joined</span>
            </div>
         </div>
      </div>
   );
}
