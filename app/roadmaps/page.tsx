import RoadmapGenerator from '@/components/Roadmap/RoadmapGenerator';
import { LayoutDashboard, GraduationCap, Map, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="text-primary w-6 h-6" />
            <span className="text-xl font-bold">BrainLink Roadmaps</span>
          </Link>
          <Link 
            href="/profile" 
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Profile
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex p-3 bg-primary/10 rounded-2xl border border-primary/20 mb-4">
            <Map className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Career Path Explorer</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select your dream role and current expertise level to generate a step-by-step preparation guide tailored to industry standards.
          </p>
        </div>

        <RoadmapGenerator />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-primary mb-2">Rule-Based Generation</h3>
                <p className="text-sm text-slate-400">Our roadmaps are synthesized using current recruitment patterns from top tech firms.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-secondary mb-2">Interactive Progress</h3>
                <p className="text-sm text-slate-400">Track your learning journey. Your progress is saved automatically to your profile.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-accent mb-2">Community Insights</h3>
                <p className="text-sm text-slate-400">Get tips and resource recommendations verified by our verified campus mentors.</p>
            </div>
        </div>
      </main>
    </div>
  );
}
