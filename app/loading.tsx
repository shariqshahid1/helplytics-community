"use client";

import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[100]">
      <div className="relative">
        <div className="h-20 w-20 rounded-3xl bg-zinc-900 flex items-center justify-center animate-bounce shadow-2xl shadow-indigo-200">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 animate-[loading_1.5s_ease-in-out_infinite] w-[40%]" />
        </div>
      </div>
      <p className="mt-16 text-sm font-black uppercase tracking-[0.3em] text-zinc-400 animate-pulse">
        Initializing Helplytics AI
      </p>
      
      <style jsx global>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}
