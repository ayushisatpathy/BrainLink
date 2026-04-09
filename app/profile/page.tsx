"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, BookOpen, Flame, Zap, Briefcase, Award, Save, LogOut, Users } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: 'Student',
    university: 'University',
    role: 'Role',
    skills: 'Skills'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [isSaved, setIsSaved] = useState(false);
  
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [roadmapProgress, setRoadmapProgress] = useState(0);
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  useEffect(() => {
    // Check local storage for auth
    const authStatus = localStorage.getItem('brainlink_auth');
    if (authStatus !== 'true') {
      router.push('/');
      return;
    }

    const savedProfile = localStorage.getItem('brainlink_user_profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setEditedProfile(parsed);
    } else {
      const name = localStorage.getItem('brainlink_username') || 'Student';
      setProfile(prev => ({ ...prev, name }));
      setEditedProfile(prev => ({ ...prev, name }));
    }

    // Load Roadmap Data
    const savedRoadmap = localStorage.getItem('brainlink_roadmap'); // Fixed key to match RoadmapGenerator
    if (savedRoadmap) {
      const parsedRoadmap = JSON.parse(savedRoadmap);
      setRoadmapData(parsedRoadmap);
      
      // Calculate progress based on the flat 'items' array from RoadmapGenerator
      if (parsedRoadmap.items && parsedRoadmap.items.length > 0) {
        const totalItems = parsedRoadmap.items.length;
        const completedItems = parsedRoadmap.items.filter((item: any) => item.completed).length;
        setRoadmapProgress(Math.round((completedItems / totalItems) * 100));
      } else {
        setRoadmapProgress(0);
      }
    }

    // Load Joined Groups
    const savedGroups = localStorage.getItem('brainlink_joined_groups');
    if (savedGroups) {
      setJoinedGroups(JSON.parse(savedGroups));
    }
  }, [router]);

  const handleSave = () => {
    setProfile(editedProfile);
    localStorage.setItem('brainlink_user_profile', JSON.stringify(editedProfile));
    localStorage.setItem('brainlink_username', editedProfile.name);
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('brainlink_auth');
    localStorage.removeItem('brainlink_username');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/')}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Your Profile</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-colors text-slate-400 text-sm font-bold"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Identity Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[80px] rounded-full -z-10 group-hover:bg-primary/30 transition-all" />
              
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 mb-6 shadow-xl shadow-primary/20">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-5xl font-black text-white">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                <h2 className="text-3xl font-black mb-2">{profile.name}</h2>
                <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-4 py-1.5 rounded-full mb-6">
                  <Briefcase className="w-4 h-4" /> {profile.role}
                </div>
                
                <div className="w-full space-y-3 pt-6 border-t border-white/10 text-left">
                  <div className="flex items-center gap-3 text-slate-400 text-sm">
                    <BookOpen className="w-4 h-4 text-slate-500" /> {profile.university}
                  </div>
                  <div className="flex items-start gap-3 text-slate-400 text-sm">
                    <Award className="w-4 h-4 text-slate-500 mt-0.5" /> 
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.split(',').map((skill, i) => (
                        <span key={i} className="text-[10px] uppercase font-black tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-bold text-sm"
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Editing Form */}
            {isEditing && (
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-primary/30 animate-in slide-in-from-top-4 relative">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Edit Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      value={editedProfile.name}
                      onChange={e => setEditedProfile({...editedProfile, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">University</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      value={editedProfile.university}
                      onChange={e => setEditedProfile({...editedProfile, university: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Target Role</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      value={editedProfile.role}
                      onChange={e => setEditedProfile({...editedProfile, role: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Skills (Comma sep)</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      value={editedProfile.skills}
                      onChange={e => setEditedProfile({...editedProfile, skills: e.target.value})}
                    />
                  </div>
                  <button 
                    onClick={handleSave}
                    className="w-full py-3 bg-primary text-slate-950 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {isSaved && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-bold text-center animate-in fade-in">
                Profile updated successfully!
              </div>
            )}
          </div>

          {/* Stats & Progress */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-black">Your Progress Dashboard</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard icon={<Flame className="w-6 h-6 text-orange-500" />} title="Current Streak" value="12 Days" bg="bg-orange-500/10" border="border-orange-500/20" />
              <StatCard icon={<Zap className="w-6 h-6 text-blue-500" />} title="Study Points" value="2,450 XP" bg="bg-blue-500/10" border="border-blue-500/20" />
              <StatCard icon={<Award className="w-6 h-6 text-purple-500" />} title="Problems Solved" value="84" bg="bg-purple-500/10" border="border-purple-500/20" />
            </div>

            {/* Joined Groups */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/20 rounded-xl">
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <h4 className="text-lg font-bold">Your Study Groups</h4>
              </div>
              
              {joinedGroups.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {joinedGroups.map((group, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-sm font-bold text-slate-200">{group}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-slate-400">You haven't joined any active study groups yet.</p>
                  <Link href="/campus" className="text-xs font-bold text-indigo-400 hover:underline mt-2 inline-block">Explore Campus Groups →</Link>
                </div>
              )}
            </div>

            {/* Roadmap Progress */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-xl">
              {roadmapData ? (
                <>
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h4 className="text-lg font-bold">{roadmapData.title}</h4>
                      <p className="text-sm text-slate-500">{roadmapProgress}% Complete</p>
                    </div>
                    <Link href="/roadmaps" className="text-xs font-bold text-primary hover:underline">View Roadmap →</Link>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative transition-all duration-1000"
                      style={{ width: `${roadmapProgress}%` }}
                    >
                       <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 mt-6 gap-2">
                     {roadmapData.items.slice(0, 4).map((item: any, index: number) => {
                       const isCompleted = item.completed;
                       
                       return (
                         <div key={index} className={`h-12 border-l-2 pl-3 flex flex-col justify-center ${isCompleted ? 'border-emerald-500' : 'border-slate-700 opacity-50'}`}>
                            <span className="text-[9px] text-slate-500 uppercase font-black truncate">Step {index + 1}</span>
                            <span className={`text-xs font-bold truncate ${isCompleted ? 'text-emerald-500' : 'text-slate-400'}`} title={item.title}>
                              {item.title}
                            </span>
                         </div>
                       );
                     })}
                  </div>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex flex-col items-center justify-center mx-auto text-primary">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-200">No Roadmap Generated</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Generate a personalized, AI-driven learning roadmap to track your progress here.</p>
                  </div>
                  <Link href="/roadmaps" className="inline-block px-6 py-2 bg-primary text-slate-950 rounded-xl font-bold hover:scale-105 transition-transform text-sm">
                    Generate Roadmap
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-xl">
              <h4 className="text-lg font-bold mb-6">Recent Activity</h4>
              <div className="space-y-6">
                <ActivityItem title="Completed Pair Programming Session" time="2h ago" type="lab" />
                <ActivityItem title="Joined 'React Enthusiasts' Group" time="1d ago" type="group" />
                <ActivityItem title="Booked Mentor Session with Sanya Malhotra" time="2d ago" type="mentor" />
                <ActivityItem title="Hit 10 Day Learning Streak" time="3d ago" type="achievement" />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value, bg, border }: any) {
  return (
    <div className={`p-6 rounded-2xl ${bg} border ${border} flex flex-col gap-4 shadow-lg`}>
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}

function ActivityItem({ title, time, type }: any) {
  return (
    <div className="flex gap-4 items-start relative before:absolute before:inset-y-0 before:-left-8 before:w-px before:bg-white/10 ml-8">
      <div className="absolute -left-[37px] top-1 w-[11px] h-[11px] rounded-full bg-slate-900 border-2 border-primary z-10" />
      <div>
        <h5 className="text-sm font-bold text-slate-200">{title}</h5>
        <p className="text-xs text-slate-500 font-medium">{time}</p>
      </div>
    </div>
  );
}
