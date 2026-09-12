import React, { useState } from 'react';
import { Hourglass, CheckCircle2, PlayCircle, Clock, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function DasaTimeline({ dasaTimeline, dasaBalance }) {
  const [showAllBhuktis, setShowAllBhuktis] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'present' | 'past' | 'upcoming'

  if (!dasaTimeline) return null;

  const { currentDasa, pastDasas = [], upcomingDasas = [], allDasas = [] } = dasaTimeline;

  return (
    <div className="w-full bg-[#0d1424] border border-amber-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/25 mb-1.5">
            <Hourglass className="w-3.5 h-3.5 text-amber-400" />
            <span>விம்சோத்தரி திசா புக்தி காலங்கள் (120 Years Cycle)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
            திசை கால அட்டவணை (Dasa & Bhukti Timeline)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            கடந்த, தற்போதைய, மற்றும் எதிர்வரும் திசைகள் மற்றும் அந்தர புக்திகள்
          </p>
        </div>

        {/* Birth Balance Pill */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 text-right self-stretch sm:self-auto">
          <span className="text-[10px] text-slate-400 block uppercase font-medium">பிறப்பு திசை இருப்பு</span>
          <span className="text-xs sm:text-sm font-bold text-amber-300 font-mono">
            {dasaBalance?.lordTamil}: {dasaBalance?.remainingTamil}
          </span>
        </div>
      </div>

      {/* 1. CURRENT ACTIVE DASA (தற்போதைய திசை) - PROMINENT GLOWING CARD */}
      {currentDasa && (
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950/40 via-[#0b1220] to-[#0f172a] border-2 border-emerald-500/50 rounded-2xl p-4 sm:p-6 shadow-xl shadow-emerald-950/30">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  தற்போதைய திசை (Current Running Dasa)
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight mt-1">
                  {currentDasa.lordTamil}
                </h4>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block font-medium">திசை காலம் (Duration)</span>
              <span className="text-sm font-bold text-slate-200 font-mono">
                {currentDasa.startDate} முதல் {currentDasa.endDate} வரை
              </span>
              <span className="text-xs text-emerald-300 font-semibold block mt-0.5">
                ({currentDasa.ageRange})
              </span>
            </div>
          </div>

          {/* Dasa Progress Bar */}
          <div className="space-y-1.5 mb-5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>திசை முன்னேற்றம்: <strong className="text-emerald-300">{currentDasa.progressPercent}%</strong> முடிந்தது</span>
              <span>மொத்த காலம்: {currentDasa.years} ஆண்டுகள்</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${currentDasa.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Current Active Bhukti Highlight */}
          {currentDasa.currentBhukti && (
            <div className="bg-slate-900/80 border border-emerald-500/30 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-emerald-400/90 font-bold uppercase">தற்போது நடக்கும் அந்தர புக்தி</span>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    {currentDasa.currentBhukti.bhuktiLordTamil}
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-300 font-mono">
                {currentDasa.currentBhukti.startDate} முதல் {currentDasa.currentBhukti.endDate} வரை
              </div>
            </div>
          )}

          {/* Toggle to view all 9 Bhuktis inside current Dasa */}
          {currentDasa.bhuktis && (
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setShowAllBhuktis(!showAllBhuktis)}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-semibold cursor-pointer"
              >
                <span>{showAllBhuktis ? 'புக்தி விவரங்களை மறைக்க' : 'இந்த திசையின் 9 புக்தி காலங்களை விரிவாக காண்க'}</span>
                {showAllBhuktis ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAllBhuktis && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 animate-fadeIn">
                  {currentDasa.bhuktis.map((b, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border text-xs ${
                        b.isPresent
                          ? 'bg-emerald-950/60 border-emerald-500/60 text-white font-bold ring-1 ring-emerald-400/40'
                          : b.isPast
                          ? 'bg-slate-900/50 border-slate-800 text-slate-400'
                          : 'bg-slate-900/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{b.bhuktiLordTamil}</span>
                        {b.isPresent && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded">நடப்பில்</span>
                        )}
                        {b.isPast && (
                          <span className="text-[9px] text-slate-500">முடிந்தது</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        {b.startDate} to {b.endDate}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            activeTab === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          அனைத்து திசைகள் ({allDasas.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('past')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            activeTab === 'past'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          கடந்த திசைகள் ({pastDasas.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            activeTab === 'upcoming'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          எதிர்வரும் திசைகள் ({upcomingDasas.length})
        </button>
      </div>

      {/* Dasa Timeline Grid / List */}
      <div className="space-y-3">
        {allDasas
          .filter(d => {
            if (activeTab === 'past') return d.isPast;
            if (activeTab === 'upcoming') return d.isFuture;
            return true;
          })
          .map((d, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-3.5 sm:p-4 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                d.isPresent
                  ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                  : d.isPast
                  ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                  : 'bg-[#0b101d] border-slate-800/80 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                  d.isPresent
                    ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                    : d.isPast
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-slate-800 border border-slate-700 text-amber-400'
                }`}>
                  {d.index}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h5 className={`text-sm sm:text-base font-bold font-serif ${d.isPresent ? 'text-emerald-300' : 'text-white'}`}>
                      {d.lordTamil}
                    </h5>
                    {d.isBirthDasa && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        பிறப்பு திசை
                      </span>
                    )}
                    {d.isPresent && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold shadow-sm">
                        தற்போது நடப்பது
                      </span>
                    )}
                    {d.isPast && (
                      <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-slate-500" /> முடிந்தது
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {d.lord} Dasa • காலம்: {d.years} ஆண்டுகள்
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs font-mono">
                <div className="text-slate-200">
                  {d.startDate} முதல் {d.endDate} வரை
                </div>
                <div className="text-amber-400/90 font-sans text-[11px] mt-0.5">
                  {d.ageRange}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
