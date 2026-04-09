"use client";

import React, { useState } from 'react';
import { Github, Rocket, MessageCircle, Star, Plus, Share2, Target, Users, Layout } from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "EcoLink - Smart Waste Management",
    desc: "AI-driven waste segregation using computer vision. Looking for ML enthusiasts.",
    author: "Sneha K.",
    tags: ["React", "Python", "ML"],
    stars: 15,
    members: 3
  },
  {
    id: 2,
    title: "CodeFlow - Visual Algorithm Editor",
    desc: "Node-based editor for creating and visualizing complex algorithms in real-time.",
    author: "Arjun V.",
    tags: ["TypeScript", "Canvas", "Algorithms"],
    stars: 28,
    members: 2
  }
];

export default function ProjectStudio() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  return (
    <div className="flex flex-col h-[650px] w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Studio Header */}
      <div className="p-6 bg-slate-900 border-b border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-fuchsia-500/20 rounded-2xl border border-fuchsia-500/20">
               <Rocket className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
               <h3 className="text-xl font-black italic uppercase tracking-[0.05em] text-white">Project <span className="text-fuchsia-500">Studio</span></h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Brainstorm • Build • Launch</p>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-fuchsia-500 text-white rounded-xl text-xs font-black uppercase shadow-lg shadow-fuchsia-500/10 hover:scale-105 transition-transform">
               <Plus className="w-4 h-4" /> Start Project
            </button>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Main Workspace */}
         <div className="flex-1 flex flex-col bg-slate-950/30">
            {/* Project Discovery Tabs */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-6">
               <TabItem label="Discovery" active />
               <TabItem label="My Ideas" />
               <TabItem label="Active Boards" />
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
               {projects.map(project => (
                 <ProjectCard key={project.id} {...project} />
               ))}
            </div>
         </div>

         {/* Right Panel: Collaboration Tools */}
         <div className="w-80 bg-slate-900 border-l border-white/5 flex flex-col p-8 space-y-8">
            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5" /> Quick Actions
               </h4>
               <div className="grid grid-cols-1 gap-3">
                  <ActionButton icon={<Github className="w-4 h-4" />} label="Import from GitHub" />
                  <ActionButton icon={<Target className="w-4 h-4" />} label="Team Formation" />
                  <ActionButton icon={<MessageCircle className="w-4 h-4" />} label="Join Discord" />
               </div>
            </section>

            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Team Formation</h4>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <p className="text-[11px] text-slate-400 leading-relaxed">Find collaborators for your project based on skill match and role requirements.</p>
                  <button className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-100 uppercase tracking-widest hover:bg-white/10 transition-colors">Find Teammates</button>
               </div>
            </section>

            <div className="mt-auto p-6 rounded-3xl bg-fuchsia-500/10 border border-fuchsia-500/20">
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-500 flex items-center justify-center">
                     <Rocket className="w-5 h-5 text-slate-950" />
                  </div>
                  <p className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest leading-none">Studio Insight</p>
               </div>
               <p className="text-[11px] text-slate-400 leading-relaxed italic">"Great projects start with a clear vision and a passionate team. Share your wildest ideas today."</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, author, tags, stars, members }: any) {
   return (
      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-fuchsia-500/30 transition-all group relative overflow-hidden">
         <div className="flex justify-between items-start gap-4">
            <div className="space-y-3">
               <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">By {author}</span>
                  <span className="w-1 h-1 bg-slate-800 rounded-full" />
                  <span className="flex items-center gap-1 text-[9px] font-black text-fuchsia-400 bg-fuchsia-400/10 px-2 py-0.5 rounded-full border border-fuchsia-400/20 uppercase tracking-tighter">Seeking Members</span>
               </div>
               <h4 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">{title}</h4>
               <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 max-w-xl">{desc}</p>
               <div className="flex gap-2">
                  {tags.map((tag: string) => (
                     <span key={tag} className="px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-slate-500 uppercase">{tag}</span>
                  ))}
               </div>
            </div>

            <div className="flex flex-col items-end gap-3 text-right">
               <div className="flex items-center gap-2 text-fuchsia-500">
                  <Star className="w-4 h-4 fill-fuchsia-500" />
                  <span className="text-sm font-black font-mono">{stars}</span>
               </div>
               <div className="flex items-center gap-2 text-slate-500">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-bold">{members} Members</span>
               </div>
               <button className="mt-2 p-2 bg-white/5 rounded-xl text-slate-600 hover:text-white hover:bg-white/10 transition-all">
                  <Share2 className="w-4 h-4" />
               </button>
            </div>
         </div>
         <div className="absolute bottom-0 right-0 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-3xl -mr-24 -mb-24 group-hover:bg-fuchsia-500/10 transition-all" />
      </div>
   );
}

function TabItem({ label, active }: any) {
   return (
      <button className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all pb-2 border-b-2 ${
         active ? 'text-fuchsia-500 border-fuchsia-500' : 'text-slate-600 border-transparent hover:text-slate-400'
      }`}>
         {label}
      </button>
   );
}

function ActionButton({ icon, label }: any) {
   return (
      <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all group">
         <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 group-hover:text-primary transition-all">
            {icon}
         </div>
         <span className="text-xs font-bold">{label}</span>
      </button>
   );
}
