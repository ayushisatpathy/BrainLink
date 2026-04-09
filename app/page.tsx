"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Rocket, Users, Target, Briefcase, GraduationCap, LogIn, LogOut } from 'lucide-react';

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    role: '',
    skills: ''
  });
  const [existingProfile, setExistingProfile] = useState<any>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    // Check local storage for mock auth state on mount
    const authStatus = localStorage.getItem('brainlink_auth');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    try {
      const savedProfile = localStorage.getItem('brainlink_user_profile');
      if (savedProfile) {
        setExistingProfile(JSON.parse(savedProfile));
        setShowRegistrationForm(false);
      } else {
        setExistingProfile(null);
        setShowRegistrationForm(true);
      }
    } catch (e) {
      console.error("Error parsing profile:", e);
      setExistingProfile(null);
      setShowRegistrationForm(true);
    }
    setShowLoginModal(true);
  };

  const handleExistingLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    localStorage.setItem('brainlink_auth', 'true');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
    localStorage.setItem('brainlink_auth', 'true');
    localStorage.setItem('brainlink_username', formData.name || 'Student');
    localStorage.setItem('brainlink_user_profile', JSON.stringify(formData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('brainlink_auth');
    localStorage.removeItem('brainlink_username');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              BrainLink
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#campus" className="hover:text-primary transition-colors">Virtual Campus</a>
            <Link href="/roadmaps" className="hover:text-primary transition-colors">Roadmap</Link>
          </div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/campus" 
                  className="px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all font-semibold text-sm"
                >
                  Enter Campus
                </Link>
                <Link 
                  href="/profile" 
                  className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold text-sm"
                  title="View Profile"
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button 
                onClick={handleLoginClick}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-slate-950 hover:bg-slate-200 transition-all font-bold text-sm"
              >
                <LogIn className="w-4 h-4" /> Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next generation placement prep
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            The Digital Frontier for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Future Engineers
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Break the isolation of placement prep. Enter a multiplayer virtual campus, collaborate on coding, and get mentored in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/campus" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-slate-950 font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              Enter Virtual Campus <Rocket className="w-5 h-5" />
            </Link>
            <Link 
              href="/roadmaps"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-bold text-lg hover:bg-white/10 transition-colors text-center"
            >
              Explore Roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Users className="w-6 h-6" />}
            title="Multiplayer Campus"
            description="Move your avatar, meet nearby students, and start impromptu study sessions."
            href="/campus"
          />
          <FeatureCard 
            icon={<Target className="w-6 h-6" />}
            title="Interactive Labs"
            description="Collaborative coding environments with real-time shared editors."
            href="/labs"
          />
          <FeatureCard 
            icon={<Briefcase className="w-6 h-6" />}
            title="Opportunity Board"
            description="Live feed of internships, hackathons, and company placement drives."
            href="/opportunities"
          />
          <FeatureCard 
            icon={<GraduationCap className="w-6 h-6" />}
            title="Expert Mentorship"
            description="Connect with seniors and industry mentors in the Mentor Lounge."
            href="/mentorship"
          />
        </div>
      </section>

      {/* Campus Preview */}
      <section id="campus" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-bold">Immersive Virtual Environment</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Our Top-Down 2D campus simulates a real university experience. Walk into the <strong>Coding Lab</strong> to solve problems, or head to the <strong>Silent Study Library</strong> for deep focus.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                  Proximity-based voice and chat
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                  Customizable avatars
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                  Real-time collaboration tools
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-[4/3] rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                <div className="absolute inset-x-8 inset-y-8 rounded-xl border border-white/5 bg-slate-800/50 flex items-center justify-center">
                   {/* Placeholder for Graphic */}
                   <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center animate-bounce">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-sm text-slate-500 font-mono">CAMPUS_PREVIEW_RENDER</p>
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Login / Profile Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button 
              onClick={() => setShowLoginModal(false)} 
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            {existingProfile && !showRegistrationForm ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto text-2xl font-black text-slate-950 shadow-lg shadow-primary/20">
                  {(existingProfile?.name || 'S').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Welcome Back!</h3>
                  <p className="text-slate-400 mt-2">Log in as <span className="text-primary font-bold">{existingProfile?.name || 'Student'}</span></p>
                </div>
                
                <div className="pt-4 space-y-3">
                  <button 
                    onClick={handleExistingLogin}
                    className="w-full py-4 bg-primary text-slate-950 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
                  >
                    Continue to Campus
                  </button>
                  <button 
                    onClick={() => setShowRegistrationForm(true)}
                    className="w-full py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                  >
                    Create New Profile instead
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Create Profile</h3>
                    <p className="text-xs text-slate-400">Help us personalize your campus experience.</p>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">College / University</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="e.g. ACEIT"
                  value={formData.university}
                  onChange={e => setFormData({...formData, university: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Target Role</label>
                <select 
                  required
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-slate-300"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option value="" disabled>Select a role...</option>
                  <option value="SDE">Software Development Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Top Skills (Comma separated)</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="e.g. React, Python, Machine Learning"
                  value={formData.skills}
                  onChange={e => setFormData({...formData, skills: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 mt-4 bg-primary text-slate-950 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
              >
                Complete & Enter
              </button>
            </form>
            </>
          )}
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) {
  return (
    <Link href={href} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 block cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-slate-950 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
