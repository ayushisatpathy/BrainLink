"use client";

import React, { useState, useEffect } from 'react';
import { Users, Plus, X, Check, Hash } from 'lucide-react';
import { getSocket } from '@/lib/socket';

const AVAILABLE_GROUPS = [
  "React Enthusiasts",
  "Data Miners",
  "Algorithm Aces",
  "Cloud Crafters",
  "Full Stack Force"
];

const ROOM_TO_GROUP_MAP: { [key: string]: string } = {
  "Coding": "React Enthusiasts",
  "Hub": "Hackathon Hub",
  "Mock": "Data Miners",
  "Doubt": "Doubt Room",
  "Library": "General",
  "Place": "Placement Center",
  "Studio": "Algorithm Aces",
  "Arena": "Live Arena",
  "Mentor": "Silent"
};

export default function GroupsSidebar() {
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [playerLocation, setPlayerLocation] = useState<{ x: number, y: number }>({ x: 0.5, y: 0.5 });
  const socket = getSocket();

  useEffect(() => {
    const handleLocationUpdate = (e: any) => setPlayerLocation(e.detail);
    window.addEventListener('player-location-update', handleLocationUpdate);
    
    const savedGroups = localStorage.getItem('brainlink_joined_groups');
    if (savedGroups) {
      const parsed = JSON.parse(savedGroups);
      setJoinedGroups(parsed);
      socket.emit('updateGroups', parsed);
      window.dispatchEvent(new CustomEvent('groups-updated', { detail: parsed }));
    }

    return () => window.removeEventListener('player-location-update', handleLocationUpdate);
  }, []);

  const handleTeleport = (group: string) => {
    window.dispatchEvent(new CustomEvent('teleport-to-room', { detail: group }));
  };

  const toggleGroup = (group: string) => {
    const isAlreadyJoined = joinedGroups.includes(group);
    
    const newGroups = isAlreadyJoined
      ? joinedGroups.filter(g => g !== group)
      : [...joinedGroups, group];
    
    setJoinedGroups(newGroups);
    localStorage.setItem('brainlink_joined_groups', JSON.stringify(newGroups));
    socket.emit('updateGroups', newGroups);
    window.dispatchEvent(new CustomEvent('groups-updated', { detail: newGroups }));

    // Teleport on join
    if (!isAlreadyJoined) {
       handleTeleport(group);
    }
  };

  return (
    <div className="w-80 bg-slate-900/80 backdrop-blur-xl border-l border-white/10 h-full flex flex-col shadow-2xl">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg">Social Groups</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Campus Guide / Mini-Map - Updated to 3x3 layout */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Campus Map</h3>
          <div className="relative aspect-[4/3] w-full bg-slate-800/50 rounded-xl border border-white/10 p-2 grid grid-cols-3 grid-rows-3 gap-1 shadow-inner">
            <MiniRoom name="Coding" color="bg-sky-500" onClick={() => handleTeleport(ROOM_TO_GROUP_MAP["Coding"])} />
            <MiniRoom name="Hub" color="bg-purple-500" onClick={() => handleTeleport(ROOM_TO_GROUP_MAP["Hub"])} />
            <MiniRoom name="Mock" color="bg-indigo-500" onClick={() => handleTeleport(ROOM_TO_GROUP_MAP["Mock"])} />
            
            <MiniRoom name="Doubt" color="bg-rose-500" onClick={() => handleTeleport(ROOM_TO_GROUP_MAP["Doubt"])} />
            <MiniRoom name="Library" color="bg-emerald-500" border="border-primary/40" onClick={() => handleTeleport(ROOM_TO_GROUP_MAP["Library"])} />
            <MiniRoom name="Place" color="bg-amber-500" onClick={() => handleTeleport(ROOM_TO_GROUP_MAP["Place"])} />
            
            <MiniRoom name="Studio" color="bg-pink-500" onClick={() => handleTeleport(ROOM_TO_GROUP_MAP["Studio"])} />
            <MiniRoom name="Arena" color="bg-cyan-500" onClick={() => handleTeleport(ROOM_TO_GROUP_MAP["Arena"])} />
            <MiniRoom name="Mentor" color="bg-orange-500" onClick={() => handleTeleport(ROOM_TO_GROUP_MAP["Mentor"])} />

            {/* Avatar Indicator (Red Dot) */}
            <div 
              className="absolute w-2 h-2 bg-rose-500 rounded-full border border-white shadow-[0_0_8px_rgba(244,63,94,0.8)] z-10 transition-all duration-100 ease-out"
              style={{
                left: `${playerLocation.x * 100}%`,
                top: `${playerLocation.y * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>
          <p className="text-[9px] text-slate-600 mt-2 text-center uppercase tracking-tighter">Drag screen or Press 'C' to re-center</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Your Groups</h3>
          {joinedGroups.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No groups joined yet.</p>
          ) : (
            <div className="space-y-2">
              {joinedGroups.map(group => (
                <div 
                  key={group} 
                  onClick={() => handleTeleport(group)}
                  className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/20 transition-all group"
                >
                  <span className="text-sm font-medium text-primary flex items-center gap-2">
                    <Hash className="w-4 h-4" /> {group}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleGroup(group); }} 
                    className="text-primary/40 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Explore Groups</h3>
           <div className="space-y-2">
              {AVAILABLE_GROUPS.filter(g => !joinedGroups.includes(g)).map(group => (
                <button 
                  key={group}
                  onClick={() => toggleGroup(group)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.08] group"
                >
                  <span className="text-sm font-medium text-slate-300 flex items-center gap-2 group-hover:text-white">
                    <Hash className="w-4 h-4 text-slate-500" /> {group}
                  </span>
                  <Plus className="w-4 h-4 text-slate-500 group-hover:text-primary" />
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10">
        <p className="text-[10px] text-slate-500 text-center uppercase tracking-tighter">
          Fellow group members will see your tag in the campus!
        </p>
      </div>
    </div>
  );
}

function MiniRoom({ name, color, onClick, border = "border-white/5" }: { name: string, color: string, onClick: () => void, border?: string }) {
  return (
    <div 
      onClick={onClick}
      className={`rounded-md ${color}/10 border ${border} flex items-center justify-center text-[6px] font-black ${color.replace('bg-', 'text-')} uppercase p-0.5 text-center leading-none cursor-pointer hover:bg-white/5 transition-colors`}
    >
      {name}
    </div>
  );
}
