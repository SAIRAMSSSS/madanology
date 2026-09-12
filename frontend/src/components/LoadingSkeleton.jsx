import React from 'react';
import { Sparkles, Sun, Moon, Compass } from 'lucide-react';

export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col items-center">
      {/* Central Rotating Celestial Element */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="w-28 h-28 rounded-full border-2 border-dashed border-amber-500/40 animate-spin" style={{ animationDuration: '10s' }} />
        <div className="w-20 h-20 rounded-full border border-amber-400/60 animate-ping absolute opacity-20" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600/40 to-yellow-500/20 border border-amber-500/50 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-amber-500/20 absolute">
          <Compass className="w-8 h-8 text-amber-400 animate-spin-slow" />
        </div>
        <Sun className="w-4 h-4 text-amber-400 absolute -top-2 animate-bounce" />
        <Moon className="w-4 h-4 text-indigo-300 absolute -bottom-2 animate-pulse" />
      </div>

      {/* Loading Text */}
      <div className="text-center mb-10">
        <h3 className="text-xl font-bold font-serif text-white tracking-wide flex items-center justify-center gap-2">
          <span>Calculating Vedic Jaathagam</span>
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        </h3>
        <p className="text-xs text-slate-400 mt-2 max-w-md">
          Aligning planetary coordinates (Graha Sphutas), calculating Lagnam, and arranging the South Indian 12-box Rasi chart...
        </p>
      </div>

      {/* Skeleton Card Placeholders */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 animate-pulse">
            <div className="h-4 bg-slate-800 rounded w-1/2 mb-3"></div>
            <div className="h-6 bg-slate-800/60 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-800/40 rounded w-full"></div>
          </div>
        ))}
      </div>

      {/* Skeleton 4x4 Chart Grid Preview */}
      <div className="w-full max-w-md aspect-square border border-amber-500/20 rounded-2xl p-2 bg-slate-950/40 backdrop-blur animate-pulse grid grid-cols-4 grid-rows-4 gap-1.5">
        {Array.from({ length: 16 }).map((_, idx) => (
          <div
            key={idx}
            className={`rounded-lg border border-slate-800/60 bg-slate-900/40 ${
              // Hollow center matching 2x2 South Indian chart
              (idx === 5 || idx === 6 || idx === 9 || idx === 10) ? 'bg-amber-950/10 border-amber-500/10' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}
