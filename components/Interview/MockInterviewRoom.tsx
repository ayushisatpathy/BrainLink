"use client";

import React, { useState, useEffect } from 'react';
import { Users, Code, Video, MessageSquare, Star, CheckCircle2, UserCircle } from 'lucide-react';

type Stage = 'selection' | 'pairing' | 'session' | 'feedback';
type Role = 'interviewer' | 'candidate';

export default function MockInterviewRoom() {
  const [stage, setStage] = useState<Stage>('selection');
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    if (stage === 'pairing') {
      const timer = setTimeout(() => {
        setStage('session');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="flex flex-col h-[650px] w-full bg-slate-950 text-slate-100 overflow-hidden">
      {stage === 'selection' && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center space-y-3">
             <div className="inline-flex p-4 bg-primary/10 rounded-3xl border border-primary/20 mb-4">
                <Users className="w-10 h-10 text-primary" />
             </div>
             <h2 className="text-4xl font-black tracking-tight uppercase italic">Mock Interview <span className="text-primary not-italic">Portal.</span></h2>
             <p className="text-slate-400 max-w-md mx-auto text-sm">Select your role to begin. We'll pair you with a peer currently in the room.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <RoleCard 
              role="candidate" 
              title="Be a Candidate" 
              desc="Practice solving DSA problems under pressure."
              icon={<Code className="w-6 h-6" />}
              selected={role === 'candidate'}
              onClick={() => { setRole('candidate'); setStage('pairing'); }}
            />
            <RoleCard 
              role="interviewer" 
              title="Be an Interviewer" 
              desc="Evaluate peers and improve your own communication."
              icon={<UserCircle className="w-6 h-6" />}
              selected={role === 'interviewer'}
              onClick={() => { setRole('interviewer'); setStage('pairing'); }}
            />
          </div>
        </div>
      )}

      {stage === 'pairing' && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-8">
           <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <Users className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary animate-pulse" />
           </div>
           <div className="text-center space-y-2">
              <h3 className="text-xl font-bold uppercase tracking-widest leading-none">Establishing Connection</h3>
              <p className="text-sm text-slate-500">Looking for a {role === 'candidate' ? 'Interviewer' : 'Candidate'} in the room...</p>
           </div>
           <button 
             onClick={() => setStage('selection')}
             className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all text-slate-400"
           >
             Cancel Search
           </button>
        </div>
      )}

      {stage === 'session' && (
        <div className="flex-1 flex flex-col h-full animate-in fade-in duration-500">
           {/* Session Header */}
           <div className="p-4 bg-slate-900 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-sm font-black text-white shadow-xl italic tracking-tighter">JD</div>
                    <div className="w-10 h-10 rounded-2xl bg-primary border-2 border-slate-900 flex items-center justify-center text-sm font-black text-slate-950 shadow-xl italic tracking-tighter text-center pt-0.5">YOU</div>
                 </div>
                 <div>
                    <h4 className="text-xs font-black text-slate-100 uppercase tracking-[0.2em]">{role === 'candidate' ? 'Technical Round' : 'Evaluating: John Doe'}</h4>
                    <span className="text-[10px] text-green-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Secure Connection Active</span>
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 <div className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">34:52 REMAINING</div>
                 <button className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"><Video className="w-4 h-4" /></button>
                 <button onClick={() => setStage('feedback')} className="px-6 py-2.5 bg-primary text-slate-950 rounded-xl text-xs font-black uppercase shadow-lg shadow-primary/20 hover:scale-105 transition-transform">End Session</button>
              </div>
           </div>

           {/* Workspace Area */}
           <div className="flex-1 flex overflow-hidden">
              {/* Question Panel */}
              <div className="w-72 bg-slate-900/50 border-r border-white/5 p-6 space-y-6 overflow-y-auto custom-scrollbar">
                 <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Problem Statement</span>
                    <h5 className="font-bold text-slate-100">Implement a LRU Cache</h5>
                 </div>
                 <p className="text-xs text-slate-400 leading-relaxed">
                    Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. 
                    Implement the LRUCache class: get(key) and put(key, value).
                 </p>
                 <div className="pt-4 space-y-3">
                    <h6 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Interview Notes</h6>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                       <li className="text-[10px] text-slate-400 list-none flex gap-2"><span>•</span> O(1) time complexity</li>
                       <li className="text-[10px] text-slate-400 list-none flex gap-2"><span>•</span> Use Double Linked List</li>
                    </div>
                 </div>
              </div>

              {/* Shared Editor (Placeholder for Monaco) */}
              <div className="flex-1 bg-slate-950 p-8 font-mono text-sm text-blue-400/60 flex flex-col">
                 <div className="flex-1">
                    <p>class LRUCache {"{"}</p>
                    <p className="pl-4">constructor(capacity) {"{"}</p>
                    <p className="pl-8">this.capacity = capacity;</p>
                    <p className="pl-8">this.cache = new Map();</p>
                    <p className="pl-4">{"}"}</p>
                    <p className="pl-4 mt-4">get(key) {"{"}</p>
                    <p className="pl-8 text-blue-400">|</p>
                    <p className="pl-4">{"}"}</p>
                    <p>{"}"}</p>
                 </div>
                 <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Shared Cursor: John Doe</span>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                       <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '100ms' }} />
                    </div>
                 </div>
              </div>

              {/* Chat Panel */}
              <div className="w-72 bg-slate-900/50 border-l border-white/5 flex flex-col">
                 <div className="p-4 border-b border-white/5">
                    <h6 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <MessageSquare className="w-3.5 h-3.5" /> Interview Chat
                    </h6>
                 </div>
                 <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
                    <Message text="Let's start with the basic approach." user="John" isMe={false} />
                    <Message text="I'll use a Map and a Doubly Linked List for O(1) ops." user="You" isMe={true} />
                 </div>
                 <div className="p-4 bg-slate-900">
                    <input type="text" placeholder="Send hint..." className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-xs" />
                 </div>
              </div>
           </div>
        </div>
      )}

      {stage === 'feedback' && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-8 animate-in zoom-in duration-500">
           <div className="text-center space-y-3">
              <div className="inline-flex p-4 bg-green-500/10 rounded-full mb-4">
                 <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-4xl font-black italic uppercase tracking-tight">Session <span className="text-primary not-italic text-center block">Complete.</span></h2>
              <p className="text-slate-400 max-w-sm mx-auto text-sm">Submit your evaluation and feedback for the candidate to help them improve.</p>
           </div>

           <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-6">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Technical Rating</h4>
                 <div className="flex gap-3">
                    {[1,2,3,4,5].map(i => (
                      <button key={i} className={`p-4 rounded-2xl border transition-all ${i <= 4 ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-white/5 border-white/10 text-slate-700'}`}>
                         <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Constructive Feedback</h4>
                 <textarea 
                   placeholder="Strengths: Strong understanding of data structures. Areas to improve: Time management during coding." 
                   className="w-full h-32 bg-slate-950 border border-white/10 rounded-2xl p-4 text-xs focus:outline-none focus:border-primary transition-colors resize-none"
                 />
              </div>

              <button 
                onClick={() => setStage('selection')}
                className="w-full py-4 bg-primary text-slate-950 font-black rounded-2xl hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20 uppercase text-xs tracking-widest"
              >
                Submit Feedback & Exit
              </button>
           </div>
        </div>
      )}
    </div>
  );
}

function RoleCard({ title, desc, icon, selected, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-8 rounded-[32px] border text-left transition-all group relative overflow-hidden ${
        selected ? 'bg-primary/10 border-primary shadow-2xl shadow-primary/10' : 'bg-white/5 border-white/5 hover:border-white/20'
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
        selected ? 'bg-primary text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
      }`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-2 group-hover:text-primary transition-colors ${selected ? 'text-primary' : 'text-slate-100'}`}>{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed font-bold">{desc}</p>
      <div className={`absolute top-8 right-8 transition-transform ${selected ? 'translate-x-0' : 'translate-x-12 opacity-0'}`}>
         <CheckCircle2 className="w-6 h-6 text-primary" />
      </div>
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
    </button>
  );
}

function Message({ text, user, isMe }: any) {
   return (
      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}>
         <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">{user}</span>
         <div className={`p-2.5 rounded-xl text-[10px] leading-relaxed ${isMe ? 'bg-primary/10 text-primary border border-primary/20 rounded-tr-none' : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'}`}>
            {text}
         </div>
      </div>
   );
}
