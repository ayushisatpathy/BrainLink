"use client";

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import RoomOverlay from '@/components/Campus/RoomOverlay';
import GroupsSidebar from '@/components/Campus/GroupsSidebar';
import CampusHUD from '@/components/Campus/CampusHUD';

const CampusMap = dynamic(() => import('@/components/Campus/CampusMap'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-bold uppercase tracking-widest animate-pulse">Loading Campus...</p>
      </div>
    </div>
  )
});

export default function CampusPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <div className="flex-1 relative">
        <RoomOverlay />
        <CampusMap />
        <CampusHUD />
        
        {/* HUD Elements */}
        <div className="absolute top-6 left-6 flex flex-col gap-4">
          <button 
            onClick={() => router.back()}
            className="w-12 h-12 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-all shadow-xl group pointer-events-auto"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          </button>

          <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h1 className="text-xl font-black tracking-tight text-white uppercase">BrainLink <span className="text-primary">Campus</span></h1>
            </div>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">Multiplayer Real-Time Session</p>
          </div>
        </div>
      </div>
      
      <GroupsSidebar />
    </div>
  );
}
