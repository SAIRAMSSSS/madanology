import React from 'react';
import { User, MapPin, Calendar, Clock, Sparkles, Moon, Sun, Hourglass } from 'lucide-react';

export default function PanchangamSummary({ userDetails, panchangam, dasaBalance }) {
  return (
    <div className="w-full space-y-4">
      {/* Native's Header Profile */}
      <div className="bg-[#0d1424] border border-amber-500/20 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center text-amber-400 font-serif text-lg font-bold">
              {userDetails?.name?.charAt(0) || 'ம'}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
                {userDetails?.name}
              </h2>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                {userDetails?.gender === 'Male' ? 'ஆண்' : userDetails?.gender === 'Female' ? 'பெண்' : userDetails?.gender}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {userDetails?.dob}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {userDetails?.tob}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {userDetails?.place}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right text-[11px] font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg self-stretch sm:self-auto flex sm:flex-col justify-between items-center sm:items-end">
          <span>அட்சரேகை: {Number(userDetails?.latitude).toFixed(2)}°N</span>
          <span>தீர்க்கரேகை: {Number(userDetails?.longitude).toFixed(2)}°E</span>
        </div>
      </div>

      {/* 4 Royal Jyotish Pillars in Tamil */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* 1. RAASI (ராசி) - PROMINENT INDIGO CARD */}
        <div className="bg-gradient-to-b from-indigo-950/40 to-[#0b101d] border-2 border-indigo-500/40 rounded-2xl p-4 shadow-lg hover:border-indigo-400 transition-all">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>ஜென்ம ராசி (Raasi)</span>
            </span>
            <span className="text-[10px] text-indigo-300/80 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
              சந்திரன்
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white font-serif tracking-tight">
            {panchangam?.raasiTamil || panchangam?.rasiMoonSign}
          </div>
          <div className="text-xs text-indigo-200 mt-0.5 font-medium">
            {panchangam?.raasiFullTamil} • {panchangam?.raasiEnglish}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 border-t border-indigo-500/20 pt-1">
            ராசிநாதன்: <span className="text-slate-200 font-medium">{panchangam?.raasiLordTamil} ({panchangam?.raasiLordEnglish})</span>
          </div>
        </div>

        {/* 2. NATCHATHIRAM (நட்சத்திரம்) - PROMINENT AMBER CARD */}
        <div className="bg-gradient-to-b from-amber-950/30 to-[#0b101d] border-2 border-amber-500/40 rounded-2xl p-4 shadow-lg hover:border-amber-400 transition-all">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>நட்சத்திரம் (Star)</span>
            </span>
            <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
              {panchangam?.natchathiramPadaTamil || `பாதம் ${panchangam?.nakshatraPada}`}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-serif tracking-tight">
            {panchangam?.natchathiramTamil || panchangam?.nakshatra}
          </div>
          <div className="text-xs text-amber-200/80 mt-0.5">
            {panchangam?.natchathiramEnglish} (Star)
          </div>
          <div className="text-[11px] text-slate-400 mt-1 border-t border-amber-500/20 pt-1">
            நட்சத்திர அதிபதி: <span className="text-slate-200 font-medium">{panchangam?.natchathiramLordTamil} ({panchangam?.natchathiramLordEnglish})</span>
          </div>
        </div>

        {/* 3. LAGNAM (லக்னம்) - GOLD CARD */}
        <div className="bg-gradient-to-b from-amber-950/20 to-[#0b101d] border border-amber-500/30 rounded-2xl p-4 shadow-lg hover:border-amber-400 transition-all">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>உதய லக்னம் (Lagna)</span>
            </span>
            <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              1-ம் வீடு
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white font-serif tracking-tight">
            {panchangam?.lagnaTamil || panchangam?.lagnaAscendant}
          </div>
          <div className="text-xs text-amber-200/80 mt-0.5">
            {panchangam?.lagnaFullTamil} • {panchangam?.lagnaEnglish}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 border-t border-slate-800 pt-1">
            லக்னாதிபதி: <span className="text-slate-200 font-medium">{panchangam?.lagnaLordTamil} ({panchangam?.lagnaLordEnglish})</span>
          </div>
        </div>

        {/* 4. DASA BALANCE (திசை இருப்பு) - EMERALD CARD */}
        <div className="bg-gradient-to-b from-emerald-950/30 to-[#0b101d] border border-emerald-500/30 rounded-2xl p-4 shadow-lg hover:border-emerald-400 transition-all">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5">
              <Hourglass className="w-4 h-4 text-emerald-400" />
              <span>பிறப்பு திசை இருப்பு</span>
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              விம்சோத்தரி
            </span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-emerald-300 font-serif tracking-tight">
            {dasaBalance?.lordTamil || dasaBalance?.lord}
          </div>
          <div className="text-xs text-slate-300 mt-1 font-mono">
            {dasaBalance?.remainingTamil || dasaBalance?.remaining}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 border-t border-slate-800 pt-1">
            {dasaBalance?.lordEnglish}
          </div>
        </div>
      </div>

      {/* Panchangam Bar */}
      <div className="bg-[#0b101d]/70 border border-slate-800/80 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
        <div><span className="text-slate-500">திதி (Tithi):</span> <span className="text-slate-200 font-medium">{panchangam?.tithiTamil || panchangam?.tithi}</span></div>
        <div><span className="text-slate-500">யோகம் (Yoga):</span> <span className="text-slate-200 font-medium">{panchangam?.yogaTamil || panchangam?.yogam}</span></div>
        <div><span className="text-slate-500">கரணம் (Karana):</span> <span className="text-slate-200 font-medium">{panchangam?.karanaTamil || panchangam?.karanam}</span></div>
        <div><span className="text-slate-500">சூரியோதயம்:</span> <span className="text-slate-200 font-medium">{panchangam?.sunrise}</span></div>
        <div><span className="text-slate-500">அயனாம்சம்:</span> <span className="text-amber-400 font-medium">{panchangam?.ayanamsa}</span></div>
      </div>
    </div>
  );
}
