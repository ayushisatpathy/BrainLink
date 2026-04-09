"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

export default function GlobalProfileButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initials, setInitials] = useState('S');
  const pathname = usePathname();

  // Hide on the profile page itself or the front page (since it has its own navbar)
  const shouldHide = pathname === '/' || pathname === '/profile';

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('brainlink_auth');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
      
      // Get user name for initials
      const savedProfile = localStorage.getItem('brainlink_user_profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setInitials(parsed.name.charAt(0).toUpperCase());
      } else {
        const username = localStorage.getItem('brainlink_username');
        if (username) {
          setInitials(username.charAt(0).toUpperCase());
        }
      }
    }
  }, [pathname]);

  if (shouldHide || !isLoggedIn) return null;

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <Link 
        href="/profile"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/30 hover:scale-110 transition-all border-2 border-slate-950"
        title="View Profile"
      >
        <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-slate-950 font-black text-xl">{initials}</span>
        
        {/* Tooltip */}
        <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform origin-bottom bg-slate-900 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg whitespace-nowrap">
          Profile Dashboard
        </div>
      </Link>
    </div>
  );
}
