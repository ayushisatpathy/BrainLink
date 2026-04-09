"use client";

import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, MapPin, Bookmark, Search } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: 'Hackathon' | 'Internship' | 'Placement';
  location: string;
  deadline: string;
  description: string;
  applyLink: string;
  applied?: boolean;
}

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Capital Arena Season 2',
    company: 'Arya College (ACEIT)',
    type: 'Hackathon',
    location: 'Jaipur, Rajasthan',
    deadline: '2026-04-10',
    description: 'A major competitive event hosted at ACEIT Jaipur. Register now on Unstop to compete in technical and creative challenges.',
    applyLink: 'https://unstop.com/competitions/capital-arena-season-2-arya-college-of-engineering-and-information-technology-aceit-jaipur-rajasthan-1648863?lb=DoaYWVzM&utm_medium=Share&utm_source=dwbcplje60572&utm_campaign=Competitions'
  },
  {
    id: '2',
    title: 'Software Engineer Intern - ML',
    company: 'NVIDIA',
    type: 'Internship',
    location: 'Bangalore, India',
    deadline: '2026-03-30',
    description: 'Work on cutting-edge AI and graphics technologies in a fast-paced environment.',
    applyLink: 'https://www.nvidia.com/en-us/about-nvidia/careers/'
  },
  {
    id: '3',
    title: 'High-Frequency Trading Drive',
    company: 'Tower Research Capital',
    type: 'Placement',
    location: 'Gurgaon, India',
    deadline: '2026-05-01',
    description: 'Join the premier HFT firm for a chance to work on low-latency trading systems.',
    applyLink: 'https://www.tower-research.com/careers'
  },
  {
    id: '4',
    title: 'HackAryaVerse 2.0',
    company: 'Arya College',
    type: 'Hackathon',
    location: 'Jaipur, Rajasthan',
    deadline: '2026-05-15',
    description: 'Join the Aryaverse and build the future. Compete in an immersive hackathon driven by creativity and next-gen tech.',
    applyLink: 'https://linktr.ee/HackAryaVerse_2.0'
  },
  {
    id: '6',
    title: 'Projectathon 2.0',
    company: 'Arya College',
    type: 'Hackathon',
    location: 'Jaipur, Rajasthan',
    deadline: '2026-03-12',
    description: 'A flagship hackathon event. Build innovative projects and compete for the top prize.',
    applyLink: 'https://docs.google.com/forms/d/e/1FAIpQLSffQNlcGOYQG9Y0wUjO2mZ9OkwarPaV7Dg1VYD8SvS89RhiyA/closedform',
    applied: true
  }
];

export default function OpportunityBoard() {
  const [filter, setFilter] = useState('All');
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const [mounted, setMounted] = useState(false);

  // Load bookmarks
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('brainlink_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  // Save bookmarks
  const toggleBookmark = (id: string) => {
    const newBookmarks = bookmarks.includes(id) 
      ? bookmarks.filter(b => b !== id) 
      : [...bookmarks, id];
    setBookmarks(newBookmarks);
    localStorage.setItem('brainlink_bookmarks', JSON.stringify(newBookmarks));
  };

  const filteredOpportunities = filter === 'All' 
    ? mockOpportunities 
    : mockOpportunities.filter(op => op.type === filter);

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Real-Time Opportunity Board</h1>
            <p className="text-slate-400">Latest hackathons, internships, and placement drives updated daily.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search opportunities..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
            >
              <option value="All">All Types</option>
              <option value="Hackathon">Hackathons</option>
              <option value="Internship">Internships</option>
              <option value="Placement">Placements</option>
              <option value="Bookmarked">Saved Only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filter === 'Bookmarked' ? filteredOpportunities.filter(o => bookmarks.includes(o.id)) : filteredOpportunities).map((op) => (
            <div key={op.id} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all hover:bg-white/[0.07]">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  op.type === 'Hackathon' ? 'bg-purple-500/20 text-purple-400' :
                  op.type === 'Internship' ? 'bg-primary/20 text-primary' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {op.type}
                </span>
                <button 
                  onClick={() => toggleBookmark(op.id)}
                  className={`transition-colors ${bookmarks.includes(op.id) ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
                >
                  <Bookmark className={`w-5 h-5 ${bookmarks.includes(op.id) ? 'fill-primary' : ''}`} />
                </button>
              </div>
              
              <h3 className="text-xl font-bold mb-1 line-clamp-1">{op.title}</h3>
              <p className="text-slate-400 font-medium mb-4">{op.company}</p>
              
              <div className="space-y-2 mb-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {op.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Deadline: {mounted ? new Date(op.deadline).toLocaleDateString() : op.deadline}
                </div>
              </div>
              
              <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                {op.description}
              </p>
              
              {op.applied ? (
                <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20 cursor-default">
                  Applied ✓
                </div>
              ) : (
                <a 
                  href={op.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 text-primary font-bold hover:bg-primary hover:text-slate-950 transition-all cursor-pointer"
                >
                  Apply Now <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
