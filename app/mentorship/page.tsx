"use client";

import React from 'react';
import { ArrowLeft, Star, Briefcase, Calendar, Video, MessageCircle, MapPin, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const MENTORS = [
  {
    name: "Prof. Vishal Shrivastava",
    role: "Professor @ ACEIT",
    expertise: ["Core CS", "Algorithm Design", "Mentorship"],
    rating: 5.0,
    sessions: 340,
    location: "Jaipur, India",
    availability: "Available Today"
  },
  {
    name: "Sanya Malhotra",
    role: "Senior SWE @ Google",
    expertise: ["System Design", "Distributed Systems", "Career Prep"],
    rating: 4.9,
    sessions: 142,
    location: "London, UK",
    availability: "Available Tomorrow"
  },
  {
    name: "Arjun Reddy",
    role: "Staff Engineer @ Meta",
    expertise: ["Product Thinking", "Frontend Arch", "React"],
    rating: 5.0,
    sessions: 89,
    location: "Menlo Park, USA",
    availability: "Available Next Week"
  },
  {
    name: "Priya Singh",
    role: "AI Scientist @ NVIDIA",
    expertise: ["CUDA", "ML Ops", "Python"],
    rating: 4.8,
    sessions: 210,
    location: "Bangalore, India",
    availability: "Direct Connect Ready"
  }
];

export default function MentorshipPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Expert Mentorship</h1>
          </div>
          
          <Link 
            href="/campus?room=Mentor"
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-slate-950 rounded-lg font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-secondary/20"
          >
            <MapPin className="w-4 h-4" /> Go to Mentor Lounge
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight">Learn from the <span className="text-primary italic">Best.</span></h2>
            <p className="text-lg text-slate-400 max-w-2xl">Connect with industry veterans and successful alumni to accelerate your career growth.</p>
          </div>
          
          <div className="relative group overflow-hidden p-[1px] rounded-2xl bg-gradient-to-r from-primary to-secondary">
             <div className="relative px-6 py-3 bg-slate-950 rounded-2xl flex items-center gap-4">
                <Search className="text-slate-500 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Find a mentor (e.g. Google)..." 
                  className="bg-transparent border-none focus:outline-none text-sm w-64"
                />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENTORS.map((mentor) => (
            <div key={mentor.name} className="relative group rounded-3xl bg-slate-900/40 border border-white/10 overflow-hidden hover:border-primary/50 hover:bg-slate-900/60 transition-all p-8 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center">
                    <Star className="w-8 h-8 text-primary animate-pulse" />
                 </div>
                 <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-sm font-bold text-primary mb-1">
                       <Star className="w-4 h-4 fill-primary" /> {mentor.rating}
                    </div>
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{mentor.sessions} Sessions</div>
                 </div>
              </div>

              <div className="space-y-1 mb-6">
                 <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{mentor.name}</h3>
                 <div className="flex items-center gap-2 text-sm text-slate-300 font-bold">
                    <Briefcase className="w-4 h-4 text-slate-500" /> {mentor.role}
                 </div>
                 <div className="flex gap-2 pt-2 flex-wrap">
                    {mentor.expertise.map(exp => (
                      <span key={exp} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-tighter text-slate-400">
                        {exp}
                      </span>
                    ))}
                 </div>
              </div>

              <div className="space-y-3 mb-8 text-sm text-slate-400 font-medium">
                 <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-500" /> {mentor.location}
                 </div>
                 <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-slate-500" /> {mentor.availability}
                 </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3">
                 <button className="py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-bold">
                    <MessageCircle className="w-4 h-4" /> Message
                 </button>
                 <button className="py-3 rounded-xl bg-primary text-slate-950 flex items-center justify-center gap-2 hover:scale-105 transition-transform text-sm font-bold shadow-lg shadow-primary/20">
                    <Video className="w-4 h-4" /> Book Session
                 </button>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-24 p-12 rounded-[32px] bg-gradient-to-br from-primary/10 via-slate-900 to-secondary/10 border border-white/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />
           <div className="max-w-xl space-y-6">
              <h2 className="text-5xl font-black tracking-tight leading-none italic uppercase">The Mentor <span className="text-primary not-italic">Lounge.</span></h2>
              <p className="text-slate-400 text-lg">Prefer a face-to-face chat? Walk your avatar into the Mentor Lounge in the virtual campus to find mentors currently online and available for impromptu advice.</p>
              <Link 
                href="/campus?room=Mentor"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-slate-950 font-black tracking-tight hover:scale-105 transition-transform shadow-2xl shadow-primary/30"
              >
                ENTER LOUNGE NOW <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
           </div>
        </section>
      </main>
    </div>
  );
}
