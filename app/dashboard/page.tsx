import OpportunityBoard from '@/components/OpportunityBoard/OpportunityBoard';
import RoadmapGenerator from '@/components/Roadmap/RoadmapGenerator';
import { LayoutDashboard, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar Placeholder / Header */}
      <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="text-primary w-6 h-6" />
            <span className="text-xl font-bold">BrainLink Dashboard</span>
          </Link>
          <Link 
            href="/campus" 
            className="px-4 py-2 rounded-lg bg-primary text-slate-950 font-bold text-sm"
          >
            Enter Campus
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content: Opportunity Board */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <OpportunityBoard />
            </section>
          </div>

          {/* Sidebar Content: Roadmap & Extra Info */}
          <div className="space-y-12">
            <section>
              <RoadmapGenerator />
            </section>
            
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-secondary" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Days Streak</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-secondary">42</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
