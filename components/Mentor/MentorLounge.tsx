import React, { useState } from 'react';
import { Coffee, Video, MessageCircle, Calendar, Star, Users, ShieldCheck, FileText, Upload, ChevronRight } from 'lucide-react';

export default function MentorLounge() {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [bookedSessions, setBookedSessions] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const mentors = [
    {
      name: "Prof. Vishal Shrivastava",
      role: "Professor @ ACEIT",
      expertise: ["Core CS", "Algorithm Design"],
      rating: 5.0,
      students: 450,
      image: "VS",
      active: true
    },
    {
      name: "Arjun Sharma",
      role: "SDE @ Google",
      expertise: ["DSA", "System Design"],
      rating: 4.9,
      students: 124,
      image: "AS",
      active: true
    },
    {
      name: "Priya Varma",
      role: "Product Manager @ Microsoft",
      expertise: ["Resume Review", "Mock Interviews"],
      rating: 4.8,
      students: 89,
      image: "PV",
      active: true
    },
    {
      name: "Siddharth Malhotra",
      role: "Senior Engineer @ Netflix",
      expertise: ["Kubernetes", "Scalability"],
      rating: 4.7,
      students: 56,
      image: "SM",
      active: false
    }
  ];

  return (
    <div className="flex flex-col h-[650px] w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Lounge Header */}
      <div className="p-6 bg-slate-900 border-b border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/20">
               <Coffee className="w-6 h-6 text-amber-400" />
            </div>
            <div>
               <h3 className="text-xl font-black italic uppercase tracking-widest text-white">Mentor <span className="text-amber-500">Lounge</span></h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Expert Guidance & Career Support</p>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl border border-white/5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase">Verified Industry Experts</span>
            </div>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Mentors List */}
         <div className="flex-1 flex flex-col bg-slate-950/30 overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Available Mentors</h4>
               {mentors.map((mentor, idx) => (
                 <MentorCard 
                   key={idx} 
                   mentor={mentor} 
                   isActive={activeSession === mentor.name}
                   isBooked={bookedSessions.includes(mentor.name)}
                   onJoin={() => setActiveSession(mentor.name === activeSession ? null : mentor.name)}
                   onBook={() => {
                     if (bookedSessions.includes(mentor.name)) {
                       setBookedSessions(bookedSessions.filter(s => s !== mentor.name));
                     } else {
                       setBookedSessions([...bookedSessions, mentor.name]);
                     }
                   }}
                 />
               ))}
            </div>
         </div>

         {/* Right Panel: Support Tools */}
         <div className="w-80 bg-slate-900 border-l border-white/5 flex flex-col p-8 space-y-8">
            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Resume Review
               </h4>
               <div 
                 onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                 onDragLeave={() => setIsDragging(false)}
                 onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
                 className={`p-6 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center space-y-3 cursor-pointer ${
                   isDragging ? 'border-amber-500 bg-amber-500/10' : 'border-white/5 bg-white/20 hover:border-white/20'
                 }`}
               >
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                     <Upload className="w-6 h-6 text-slate-500" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-slate-300">Drop your resume</p>
                     <p className="text-[10px] text-slate-500 mt-1 uppercase font-black">PDF ONLY (MAX 5MB)</p>
                  </div>
                  <button className="text-[9px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">Select File</button>
               </div>
            </section>

            <section className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Office Hours</h4>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] text-slate-400 font-bold">Upcoming Session</span>
                     <span className="text-[9px] text-amber-500 font-black px-2 py-0.5 bg-amber-500/10 rounded-full">IN 2H</span>
                  </div>
                  <p className="text-xs font-bold text-slate-200 leading-tight">Mock Interview Workshop by Microsoft Mentors</p>
                  <button className="w-full py-2 bg-amber-500 text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">Notify Me</button>
               </div>
            </section>

            <div className="mt-auto p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-xl">
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                     <Star className="w-5 h-5 text-slate-950" />
                  </div>
                  <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest leading-none">Career Insight</p>
               </div>
               <p className="text-[11px] text-slate-400 leading-relaxed italic">"A great resume opens doors, but a great mentorship paves the path. Don't be afraid to ask for help."</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function MentorCard({ mentor, isActive, isBooked, onJoin, onBook }: any) {
   return (
      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all group relative overflow-hidden">
         <div className="flex items-center gap-6">
            <div className="relative">
               <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xl font-black text-slate-950 shadow-2xl">
                  {mentor.image}
               </div>
               {mentor.active && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-slate-950 animate-pulse" />
               )}
            </div>

            <div className="flex-1 space-y-2">
               <div className="flex items-center gap-3">
                  <h4 className="text-lg font-bold text-slate-100">{mentor.name}</h4>
                  <span className="px-2 py-0.5 rounded-lg bg-white/5 text-slate-500 text-[9px] font-black uppercase border border-white/10">{mentor.role}</span>
               </div>
               <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((exp: string) => (
                    <span key={exp} className="text-[9px] font-black text-amber-500/80 uppercase">#{exp}</span>
                  ))}
               </div>
               <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 pt-1">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {mentor.rating}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {mentor.students} Students Mentored</span>
               </div>
            </div>

            <div className="flex gap-2">
               <button 
                 onClick={onJoin}
                 className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-2 ${
                    isActive ? 'bg-emerald-500 text-slate-950' : 'bg-primary text-slate-950'
                 }`}
               >
                  <Video className="w-3.5 h-3.5" /> {isActive ? 'Connected' : 'Request Guidance'}
               </button>
               <button 
                 onClick={onBook}
                 className={`px-4 py-2.5 rounded-xl border font-black text-[10px] uppercase transition-all ${
                    isBooked ? 'bg-white/10 border-white/20 text-slate-500' : 'bg-white/5 border-white/10 text-slate-100 hover:bg-white/10'
                 }`}
               >
                  {isBooked ? 'Session Booked' : 'Book 1:1'}
               </button>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-all" />
      </div>
   );
}
