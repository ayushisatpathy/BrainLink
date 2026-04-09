"use client";

import OpportunityBoard from '@/components/OpportunityBoard/OpportunityBoard';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function OpportunitiesPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Opportunity Board</h1>
          </div>
        </div>
      </header>

      <main>
        <OpportunityBoard />
      </main>
    </div>
  );
}
