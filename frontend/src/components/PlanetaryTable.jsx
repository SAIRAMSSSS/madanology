import React from 'react';
import { Compass, Moon, Sun } from 'lucide-react';

export default function PlanetaryTable({ planets = [] }) {
  return (
    <div className="w-full bg-[#0d1424] border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <h4 className="font-serif font-bold text-white text-base">
            கிரக நிலைகள் & ஸ்புடங்கள் (Planetary Longitudes)
          </h4>
        </div>
        <span className="text-xs text-amber-400/90 font-mono bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
          சித்திரபக்ஷ லாகிரி அயனாம்சம்
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-2.5 px-3">கிரகம் (Graha)</th>
              <th className="py-2.5 px-3">ராசி (Raasi)</th>
              <th className="py-2.5 px-3">பாகை (Degrees)</th>
              <th className="py-2.5 px-3">நட்சத்திரம் (Natchathiram)</th>
              <th className="py-2.5 px-3">பாதம்</th>
              <th className="py-2.5 px-3 text-center">பாவகம் (House)</th>
              <th className="py-2.5 px-3 text-center">கதி (Status)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {planets.map((p, idx) => {
              const isLagna = p.code === 'Lg' || p.isLagna;
              const isMoon = p.code === 'Mo' || p.isMoon;

              return (
                <tr
                  key={idx}
                  className={`hover:bg-slate-800/30 transition-colors ${
                    isLagna
                      ? 'bg-amber-500/[0.08] text-amber-300 font-semibold'
                      : isMoon
                      ? 'bg-indigo-500/[0.08] text-indigo-300 font-semibold'
                      : 'text-slate-200'
                  }`}
                >
                  <td className="py-3 px-3 font-sans flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                      isLagna
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : isMoon
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800 border border-slate-700 text-amber-400'
                    }`}>
                      {p.tamilShort || p.code}
                    </span>
                    <div>
                      <div className="text-slate-100 font-bold flex items-center gap-1.5">
                        <span>{p.tamilName}</span>
                        {isLagna && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-sans">லக்னம்</span>}
                        {isMoon && <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-sans">ராசி</span>}
                      </div>
                      <div className="text-[10px] text-slate-400">{p.name} ({p.code})</div>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-sans">
                    <div className="text-slate-100 font-bold">{p.signTamil}</div>
                    <div className="text-[10px] text-slate-400">{p.signName}</div>
                  </td>

                  <td className="py-3 px-3 text-amber-400 font-semibold">
                    {p.degrees}
                  </td>

                  <td className="py-3 px-3 font-sans">
                    <div className="text-slate-100 font-bold">{p.nakshatraTamil}</div>
                    <div className="text-[10px] text-slate-400">{p.nakshatra}</div>
                  </td>

                  <td className="py-3 px-3 font-sans">
                    {p.padaTamil || `பாதம் ${p.pada}`}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-sans text-[11px] font-medium">
                      {p.house}-ம் வீடு
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center font-sans">
                    {p.isRetrograde ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-950/80 text-orange-400 border border-orange-500/30">
                        வக்ரம் (Retrograde)
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400">
                        நேர்கதி (Direct)
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
