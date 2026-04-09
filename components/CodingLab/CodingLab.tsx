import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Share2, MessageSquare, Code2 } from 'lucide-react';
import { getSocket } from '@/lib/socket';

const DAILY_CHALLENGE = {
  id: "challenge-101",
  title: "Median of Two Sorted Arrays",
  difficulty: "Hard",
  tags: ["Array", "Binary Search", "Divide and Conquer"],
  description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
  starterCode: "/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    \n};"
};

const INITIAL_SESSIONS = [
  { id: 1, user1: "Sneha", user2: "Rahul", problem: "Two Sum" },
  { id: 2, user1: "Arjun", user2: "You", problem: "Median Arrays" }
];

export default function CodingLab() {
  const [code, setCode] = useState(DAILY_CHALLENGE.starterCode);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const socket = getSocket();

  useEffect(() => {
    socket.on('codeChanged', (newCode: string) => {
      setCode(newCode);
    });

    socket.on('receiveRoomMessage', (msg: any) => {
      setMessages(prev => [...prev, msg].slice(-20));
    });

    return () => {
      socket.off('codeChanged');
      socket.off('receiveRoomMessage');
    };
  }, [socket]);

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    socket.emit('codeUpdate', newCode);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    socket.emit('sendRoomMessage', {
      user: 'You',
      text: inputValue
    });
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-[700px] w-full bg-slate-950 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(56,189,248,0.2)]">
      {/* Lab Header */}
      <div className="bg-slate-900/80 backdrop-blur-md p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-2xl border border-primary/20">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-100 tracking-tight underline decoration-primary/30 underline-offset-4">CODING LAB</h3>
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black uppercase border border-green-500/20 animate-pulse">Live</span>
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-0.5">Collaborative Workspace</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Sessions</span>
            <div className="flex -space-x-2 mt-1">
               {[1,2,3,4].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950" />)}
               <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-slate-950 flex items-center justify-center text-[8px] font-bold text-primary">+12</div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-slate-950 text-xs font-black uppercase transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
            <Play className="w-3.5 h-3.5 fill-slate-950" /> Run Code
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary text-slate-950 text-xs font-black uppercase transition-all hover:scale-105 active:scale-95 shadow-lg shadow-secondary/20">
             Live Arena
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Challenge & Sessions */}
        <div className="w-80 bg-slate-900/30 border-r border-white/5 flex flex-col overflow-y-auto custom-scrollbar">
           <div className="p-6 space-y-6">
              <section>
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Daily Challenge</h4>
                 <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 group hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between">
                       <span className="text-rose-400 text-[9px] font-black uppercase px-2 py-0.5 bg-rose-400/10 rounded-full border border-rose-400/20">{DAILY_CHALLENGE.difficulty}</span>
                       <span className="text-[9px] text-slate-500 font-mono">#{DAILY_CHALLENGE.id}</span>
                    </div>
                    <h5 className="font-bold text-sm group-hover:text-primary transition-colors">{DAILY_CHALLENGE.title}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{DAILY_CHALLENGE.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                       {DAILY_CHALLENGE.tags.map(tag => (
                         <span key={tag} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-bold text-slate-500">{tag}</span>
                       ))}
                    </div>
                 </div>
              </section>

              <section>
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Pair Sessions</h4>
                 <div className="space-y-3">
                    {sessions.map(session => (
                      <div key={session.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group">
                         <div className="flex items-center gap-3">
                            <div className="relative">
                               <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black">{session.user1[0]}</div>
                               <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-950" />
                            </div>
                            <div>
                               <p className="text-xs font-bold">{session.user1} & {session.user2}</p>
                               <p className="text-[9px] text-slate-500">{session.problem}</p>
                            </div>
                         </div>
                         <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/5 rounded-lg text-primary transition-all">
                            <Share2 className="w-3.5 h-3.5" />
                         </button>
                      </div>
                    ))}
                    <button className="w-full py-3 border border-dashed border-white/10 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-all">
                       + Start Pair Session
                    </button>
                 </div>
              </section>
           </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-slate-950 relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
             <select className="bg-slate-900 border border-white/10 rounded-lg text-[10px] font-bold px-2 py-1 text-slate-400">
                <option>JavaScript</option>
                <option>Python</option>
                <option>C++</option>
             </select>
          </div>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleCodeChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'Fira Code, monospace',
              padding: { top: 40 },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              lineNumbers: 'on',
              glyphMargin: true,
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
            }}
          />
        </div>

        {/* Sidebar / Chat */}
        <div className="w-80 bg-slate-900/30 border-l border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5">
             <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-100 uppercase tracking-[0.2em]">
                <MessageSquare className="w-3.5 h-3.5 text-primary" /> Discussion
             </h4>
          </div>
          <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center py-12">
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-6 h-6 text-slate-700" />
                 </div>
                 <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black leading-relaxed">
                    Problem discussion chat.<br/>Share LeetCode links!
                 </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <ChatMessage 
                key={i} 
                user={msg.user} 
                text={msg.text} 
                time={msg.timestamp} 
                isMe={msg.senderId === socket.id} 
              />
            ))}
          </div>
          <div className="p-6 bg-slate-900/50">
            <div className="relative group">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Discuss problem..." 
                className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-xs focus:outline-none focus:border-primary transition-colors pr-10"
              />
              <button 
                onClick={handleSendMessage}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4 rotate-90" />
              </button>
            </div>
            <p className="text-[9px] text-slate-600 mt-3 text-center font-bold uppercase tracking-widest">Shift + Enter for new line</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ user, text, time, isMe }: { user: string, text: string, time: string, isMe: boolean }) {
  return (
    <div className={`space-y-2 animate-in slide-in-from-bottom-2 duration-300 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
      <div className="flex items-center gap-2">
        {!isMe && <span className="text-[9px] font-black text-primary uppercase tracking-tighter">{user}</span>}
        <span className="text-[8px] text-slate-600 font-mono">{time}</span>
        {isMe && <span className="text-[9px] font-black text-secondary uppercase tracking-tighter">You</span>}
      </div>
      <div className={`p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
        isMe ? 'bg-secondary/10 text-secondary border border-secondary/20 rounded-tr-none' : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'
      }`}>
        {text}
      </div>
    </div>
  );
}
