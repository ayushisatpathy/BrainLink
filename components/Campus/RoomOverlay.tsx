"use client";

import React, { useState, useEffect } from 'react';
import CodingLab from '../CodingLab/CodingLab';
import MentorLounge from '../Mentor/MentorLounge';
import OpportunityBoard from '../OpportunityBoard/OpportunityBoard';
import RoadmapGenerator from '../Roadmap/RoadmapGenerator';
import PlacementSimulation from '../Simulation/PlacementSimulation';
import LiveArena from '../Simulation/LiveArena';
import MockInterviewRoom from '../Interview/MockInterviewRoom';
import SilentStudy from '../Study/SilentStudy';
import DoubtArena from '../Doubt/DoubtArena';
import ProjectStudio from '../ProjectStudio/ProjectStudio';
import HackathonHub from '../Hackathon/HackathonHub';
import { X } from 'lucide-react';

export default function RoomOverlay() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  useEffect(() => {
    const handleEnter = (e: any) => setActiveRoom(e.detail);
    const handleExit = () => setActiveRoom(null);

    window.addEventListener('enterRoom', handleEnter);
    window.addEventListener('exitRoom', handleExit);

    return () => {
      window.removeEventListener('enterRoom', handleEnter);
      window.removeEventListener('exitRoom', handleExit);
    };
  }, []);

  if (!activeRoom) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-8 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-800/30">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {activeRoom}
            </h2>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 italic">Interact with nearby students here.</p>
          </div>
          
          <button 
            onClick={() => setActiveRoom(null)}
            className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeRoom === 'Coding Lab' && <CodingLab />}
          {activeRoom === 'Mentor Lounge' && <MentorLounge />}
          {activeRoom === 'Placement Center' && <PlacementSimulation />}
          {activeRoom === 'Live Arena' && <LiveArena />}
          {activeRoom === 'Hackathon Hub' && <HackathonHub />}
          {activeRoom === 'Main Library' && <SilentStudy />}
          {activeRoom === 'Interview Room' && <MockInterviewRoom />}
          {activeRoom === 'Doubt Room' && <DoubtArena />}
          {activeRoom === 'Project Studio' && <ProjectStudio />}
        </div>
      </div>
    </div>
  );
}
