import React, { useState } from 'react';
import Header from './components/Header';
import JaathagamForm from './components/JaathagamForm';
import LoadingSkeleton from './components/LoadingSkeleton';
import SouthIndianChart from './components/SouthIndianChart';
import PlanetaryTable from './components/PlanetaryTable';
import PanchangamSummary from './components/PanchangamSummary';
import DasaTimeline from './components/DasaTimeline';
import { ArrowLeft, Printer, AlertCircle } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/generate-chart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Failed to calculate Vedic Jaathagam.');
      }

      setChartData(json.data);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage(
        err.message || 'Unable to connect to backend astrology server. Please ensure the server is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setChartData(null);
    setErrorMessage(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060913] text-slate-100 antialiased selection:bg-amber-500/20 selection:text-amber-300">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-10">
        {/* Error Alert */}
        {errorMessage && (
          <div className="max-w-xl mx-auto mb-5 p-3.5 sm:p-4 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 flex items-start gap-2.5 sm:gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-xs sm:text-sm">
              <span className="font-semibold block mb-0.5">கணிப்பு பிழை (Calculation Notice):</span>
              {errorMessage}
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200 text-xs font-semibold px-1 py-0.5 cursor-pointer"
            >
              சரி
            </button>
          </div>
        )}

        {/* 1. Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* 2. Initial Empty Form State */}
        {!isLoading && !chartData && (
          <div className="flex flex-col items-center justify-center min-h-[65vh]">
            <JaathagamForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        )}

        {/* 3. Result View */}
        {!isLoading && chartData && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3 sm:pb-4">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-medium px-3 sm:px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-amber-500/50 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>மறுமுறை கணிக்க (New Chart)</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-medium px-3 sm:px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>அச்சிட (Print)</span>
              </button>
            </div>

            {/* Native's Details & Panchangam Summary */}
            <PanchangamSummary
              userDetails={chartData.userDetails}
              panchangam={chartData.panchangam}
              dasaBalance={chartData.dasaBalance}
            />

            {/* Traditional 12-Box South Indian Rasi Chart */}
            <div className="bg-[#0d1424] border border-amber-500/20 rounded-2xl sm:rounded-3xl p-3 sm:p-8 shadow-2xl">
              <SouthIndianChart
                chartData={chartData}
                userDetails={chartData.userDetails}
                panchangam={chartData.panchangam}
              />
            </div>

            {/* Dasa & Bhukti Timeline: Past, Present & Upcoming Dasas */}
            <DasaTimeline
              dasaTimeline={chartData.dasaTimeline}
              dasaBalance={chartData.dasaBalance}
            />

            {/* Planetary Coordinates Table */}
            <PlanetaryTable planets={chartData.planetaryPositions} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b16]/70 py-5 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-serif font-semibold text-slate-400">மதனாலஜி (Madanology)</span> • வேத ஜோதிட தளம்
          </div>
          <div className="text-[11px] text-slate-600">
            Powered by Astronomical Ephemeris & South Indian Jyotish
          </div>
        </div>
      </footer>
    </div>
  );
}
