"use client";

import React, { useState, useEffect } from 'react';
import { Users, Plus, Hash, X, ArrowLeft, Search, MessageSquare, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSocket } from '@/lib/socket';

const AVAILABLE_GROUPS = [
  { name: "React Enthusiasts", members: 42, description: "Deep dive into React hooks, design patterns and performance optimization." },
  { name: "Data Miners", members: 28, description: "Exploring ML algorithms, data cleaning and visualization techniques." },
  { name: "Algorithm Aces", members: 156, description: "Competitive programming and DSA preparation for technical interviews." },
  { name: "Cloud Crafters", members: 18, description: "AWS/Azure certification prep and serverless architecture discussions." },
  { name: "Full Stack Force", members: 89, description: "Building end-to-end applications with Next.js, Node and Postgres." }
];

export default function LabsPage() {
  const router = useRouter();
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const socket = getSocket();

  useEffect(() => {
    const savedGroups = localStorage.getItem('brainlink_joined_groups');
    if (savedGroups) {
      setJoinedGroups(JSON.parse(savedGroups));
    }
  }, []);

  const toggleGroup = (group: string) => {
    const isAlreadyJoined = joinedGroups.includes(group);
    const newGroups = isAlreadyJoined
      ? joinedGroups.filter(g => g !== group)
      : [...joinedGroups, group];
    
    setJoinedGroups(newGroups);
    localStorage.setItem('brainlink_joined_groups', JSON.stringify(newGroups));
    socket.emit('updateGroups', newGroups);
    window.dispatchEvent(new CustomEvent('groups-updated', { detail: newGroups }));
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    
    if (!joinedGroups.includes(newGroupName)) {
      toggleGroup(newGroupName);
    }
    setNewGroupName("");
    setIsCreating(false);
  };

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
            <h1 className="text-xl font-bold">Interactive Labs</h1>
          </div>
          
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-950 rounded-lg font-bold text-sm hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" /> Create New Lab
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Zap className="text-primary w-6 h-6" /> Explore Labs
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search labs..." 
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {AVAILABLE_GROUPS.map((group) => (
                  <div key={group.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-start justify-between gap-6 group">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-950 transition-colors">
                          <Hash className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{group.name}</h3>
                          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {group.members} members</span>
                            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 12 active now</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                        {group.description}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => toggleGroup(group.name)}
                      className={`px-6 py-2 rounded-xl border transition-all font-bold text-sm ${
                        joinedGroups.includes(group.name)
                          ? "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white"
                          : "bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-slate-950"
                      }`}
                    >
                      {joinedGroups.includes(group.name) ? "Leave Lab" : "Join Lab"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="p-6 rounded-3xl bg-white/5 border border-white/10 sticky top-24">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" /> Your Active Labs
              </h3>
              
              {joinedGroups.length === 0 ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-600">
                    <Hash className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-slate-500 italic">No labs joined yet. Explore the marketplace to find your squad!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {joinedGroups.map((group) => (
                    <div key={group} className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10 group/item">
                      <span className="text-sm font-bold flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                         {group}
                      </span>
                      <div className="flex items-center gap-2">
                         <Link 
                           href="/campus"
                           className="p-2 hover:bg-primary/20 rounded-lg text-primary transition-colors hover:scale-110 active:scale-95"
                           title="Go to Lab in Campus"
                         >
                            <Zap className="w-4 h-4 fill-primary" />
                         </Link>
                         <button 
                           onClick={() => toggleGroup(group)}
                           className="p-2 hover:bg-rose-500/20 rounded-lg text-rose-500/50 hover:text-rose-500 transition-colors"
                         >
                            <X className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed text-center">
                  Labs are shared real-time environments. Joining a lab allows you to collaborate in the virtual campus.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm bg-black/60">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Create New Lab</h2>
                <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Lab Name</label>
                  <input 
                    autoFocus
                    type="text" 
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="e.g. System Design Squad"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Description (Optional)</label>
                  <textarea 
                    placeholder="What's this lab about?"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white h-24 resize-none text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-4 font-bold">
                  <button 
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary text-slate-950 rounded-xl hover:scale-105 transition-transform text-sm"
                  >
                    Launch Lab
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
