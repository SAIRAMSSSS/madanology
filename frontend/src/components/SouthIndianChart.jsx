import React from 'react';
import { Sparkles, Moon, Sun } from 'lucide-react';

/**
 * Traditional South Indian 12-Box Jaathaga Kattam (ராசி சக்கரம்)
 * Mobile-responsive, high-contrast, authentic Tamil layout.
 * Row 1: [12: மீனம் (Pisces)]    [1: மேஷம் (Aries)]        [2: ரிஷபம் (Taurus)]     [3: மிதுனம் (Gemini)]
 * Row 2: [11: கும்பம் (Aquarius)] [--- நடு கட்டம் (CENTER 2x2) ---]               [4: கடகம் (Cancer)]
 * Row 3: [10: மகரம் (Capricorn)]  [--- நடு கட்டம் (CENTER 2x2) ---]               [5: சிம்மம் (Leo)]
 * Row 4: [9: தனுசு (Sagittarius)] [8: விருச்சிகம் (Scorpio)] [7: துலாம் (Libra)]    [6: கன்னி (Virgo)]
 */

export default function SouthIndianChart({ chartData, userDetails, panchangam }) {
  const rasiBoxes = chartData?.rasiBoxes || {};

  const renderPlanetBadge = (planet) => {
    const isLagna = planet.code === 'Lg' || planet.isLagna;
    const isMoon = planet.code === 'Mo' || planet.isMoon;

    // 1. Lagna Highlight Badge
    if (isLagna) {
      return (
        <div
          key={planet.code}
          className="inline-flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-extrabold bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 border border-amber-300 shadow-sm"
          title={`லக்னம் (Lagna): ${planet.degrees} • ${planet.nakshatraTamil} ${planet.padaTamil}`}
        >
          <Sun className="w-2.5 h-2.5 text-slate-950 fill-slate-950 hidden sm:inline-block" />
          <span>லக்</span>
          <span className="font-mono text-[8px] sm:text-[9px] text-slate-900">{planet.degNumber}°</span>
        </div>
      );
    }

    // 2. Janma Raasi / Moon Highlight Badge
    if (isMoon) {
      return (
        <div
          key={planet.code}
          className="inline-flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-white border border-indigo-400 shadow-sm"
          title={`ஜென்ம ராசி (சந்திரன்): ${planet.degrees} • ${planet.nakshatraTamil} ${planet.padaTamil}`}
        >
          <Moon className="w-2.5 h-2.5 text-indigo-200 fill-indigo-200 hidden sm:inline-block" />
          <span>ராசி</span>
          <span className="font-mono text-[8px] sm:text-[9px] text-indigo-100">{planet.degNumber}°</span>
        </div>
      );
    }

    // 3. Regular Graha Badge
    return (
      <div
        key={planet.code}
        className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[8px] sm:text-[10px] font-medium ${
          planet.isRetrograde
            ? 'bg-orange-950/90 text-orange-300 border border-orange-500/60'
            : 'bg-slate-800/95 text-slate-200 border border-slate-700'
        }`}
        title={`${planet.tamilName} (${planet.name}): ${planet.degrees} • ${planet.nakshatraTamil} ${planet.padaTamil}`}
      >
        <span className="font-bold text-amber-400">{planet.tamilShort || planet.code}</span>
        <span className="text-slate-400 font-mono text-[8px] sm:text-[9px]">{planet.degNumber}°</span>
        {planet.isRetrograde && <span className="text-amber-400 font-bold ml-0.5">(வ)</span>}
      </div>
    );
  };

  const renderBox = (signId) => {
    const box = rasiBoxes[signId];
    if (!box) return null;

    const hasLagna = box.planets.some(p => p.code === 'Lg' || p.isLagna);
    const hasMoon = box.planets.some(p => p.code === 'Mo' || p.isMoon);

    return (
      <div
        key={signId}
        className={`chart-box p-1 sm:p-2.5 flex flex-col justify-between transition-colors duration-150 relative overflow-hidden ${
          hasLagna
            ? 'bg-amber-500/[0.09] border-amber-400/90 shadow-inner'
            : hasMoon
            ? 'bg-indigo-500/[0.09] border-indigo-400/90 shadow-inner'
            : 'bg-[#0b101d]/85 hover:bg-slate-800/50'
        }`}
      >
        {/* Box Header: Tamil Rasi Name in Bold */}
        <div className="flex items-center justify-between border-b border-slate-800/70 pb-0.5">
          <span className="text-[10px] sm:text-xs font-bold text-amber-400 font-serif tracking-tight truncate">
            {box.signTamil}
          </span>
          <span className="text-[8px] sm:text-[9px] text-slate-500 font-sans hidden sm:inline-block">
            {box.signEnglish}
          </span>
        </div>

        {/* Planets situated in this Rasi */}
        <div className="flex flex-wrap gap-0.5 sm:gap-1 items-center justify-center my-auto py-1">
          {box.planets.length > 0 ? (
            box.planets.map((planet) => renderPlanetBadge(planet))
          ) : (
            <span className="text-[8px] sm:text-[9px] text-slate-600 italic">சூனியம்</span>
          )}
        </div>

        {/* Sign Lord at bottom (visible on tablet/desktop) */}
        <div className="hidden sm:block text-[8px] text-slate-500 text-right">
          {box.lordTamil}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header Banner */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/25 mb-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>தென்னிந்திய பாரம்பரிய 12-கட்ட ராசி சக்கரம்</span>
        </div>
        <h3 className="text-lg sm:text-2xl font-bold font-serif text-white tracking-wide">
          ராசி கட்டம் (South Indian Rasi Kattam)
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
          ராசி (சந்திரன்) மற்றும் உதய லக்னம் தெளிவாக குறிப்பிடப்பட்டுள்ளது
        </p>
      </div>

      {/* 4x4 Grid Container */}
      <div className="south-indian-grid rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/50 bg-[#070b16]">
        {/* Row 1: Pisces [12], Aries [1], Taurus [2], Gemini [3] */}
        {renderBox(12)}
        {renderBox(1)}
        {renderBox(2)}
        {renderBox(3)}

        {/* Row 2: Aquarius [11], CENTER BOX (2x2), Cancer [4] */}
        {renderBox(11)}

        {/* CENTER BOX (Spans 2 columns and 2 rows) */}
        <div className="chart-center p-2 sm:p-4 flex flex-col items-center justify-center text-center shadow-inner relative border-2 border-amber-500/35 overflow-hidden">
          <div className="text-xl sm:text-3xl font-serif text-amber-400">ௐ</div>
          <div className="text-[9px] sm:text-xs font-bold font-serif text-amber-300 tracking-wider uppercase">
            மதனாலஜி
          </div>
          <div className="text-[10px] sm:text-sm font-bold text-white tracking-tight mt-0.5 truncate max-w-full">
            {userDetails?.name || 'ஜாதகர்'}
          </div>

          <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-slate-700/60 w-full text-center space-y-0.5 sm:space-y-1">
            <div className="text-[9px] sm:text-xs text-indigo-300 font-bold bg-indigo-950/70 py-0.5 px-1 sm:px-2 rounded border border-indigo-500/30 truncate">
              ராசி: <span className="text-white font-extrabold">{panchangam?.raasiTamil || panchangam?.rasiMoonSign}</span>
            </div>
            <div className="text-[9px] sm:text-xs text-amber-300 font-bold bg-amber-950/70 py-0.5 px-1 sm:px-2 rounded border border-amber-500/30 truncate">
              நட்சத்திரம்: <span className="text-white font-extrabold">{panchangam?.natchathiramTamil || panchangam?.nakshatra}</span>
            </div>
            <div className="text-[8px] sm:text-[11px] text-amber-400 font-medium truncate">
              லக்னம்: <span className="text-slate-100 font-bold">{panchangam?.lagnaTamil || panchangam?.lagnaAscendant}</span>
            </div>
          </div>
        </div>

        {renderBox(4)}

        {/* Row 3: Capricorn [10], (CENTER continues), Leo [5] */}
        {renderBox(10)}
        {renderBox(5)}

        {/* Row 4: Sagittarius [9], Scorpio [8], Libra [7], Virgo [6] */}
        {renderBox(9)}
        {renderBox(8)}
        {renderBox(7)}
        {renderBox(6)}
      </div>

      {/* Legend */}
      <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-[10px] sm:text-xs text-slate-300">
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-indigo-600 border border-indigo-400" />
          <span className="font-semibold text-indigo-300">ராசி = ஜென்ம ராசி</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-amber-500 border border-amber-300" />
          <span className="font-semibold text-amber-300">லக் = உதய லக்னம்</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-amber-400 font-bold">(வ)</span>
          <span>= வக்ரம்</span>
        </div>
      </div>
    </div>
  );
}
