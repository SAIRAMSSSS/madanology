import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-[#070b16]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-serif">
                Madanology
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Vedic AI
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Authentic South Indian Jaathagam & Horoscope Engine
            </p>
          </div>
        </div>

        {/* Top Badges */}
        <div className="hidden sm:flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Lahiri Ayanamsha (Chitra Paksha)</span>
          </div>
        </div>
      </div>
    </header>
  );
}
