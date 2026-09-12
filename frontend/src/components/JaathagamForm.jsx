import React, { useState } from 'react';
import { User, Calendar, Clock, Sparkles, ArrowRight, ShieldCheck, RotateCcw } from 'lucide-react';
import PlaceAutocomplete from './PlaceAutocomplete';
import { PRESET_KETTAI, PRESET_ANUSHAM, PRESET_MOOLAM } from '../utils/samplePresets';

export default function JaathagamForm({ onSubmit, isLoading }) {
  // Completely empty initial state - NO prewritten text!
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    dob: '',
    hour: '',
    minute: '',
    meridiem: 'AM',
    place: '',
    latitude: null,
    longitude: null,
    timezone: 5.5
  });

  const [errors, setErrors] = useState({});

  const applyPreset = (preset) => {
    setFormData({
      name: preset.name,
      gender: preset.gender,
      dob: preset.dob,
      hour: preset.hour,
      minute: preset.minute,
      meridiem: preset.meridiem,
      place: preset.place,
      latitude: preset.latitude,
      longitude: preset.longitude,
      timezone: preset.timezone
    });
    setErrors({});
  };

  const handleReset = () => {
    setFormData({
      name: '',
      gender: 'Male',
      dob: '',
      hour: '',
      minute: '',
      meridiem: 'AM',
      place: '',
      latitude: null,
      longitude: null,
      timezone: 5.5
    });
    setErrors({});
  };

  const handlePlaceChange = (placeData) => {
    setFormData((prev) => ({
      ...prev,
      place: placeData.place,
      latitude: placeData.latitude,
      longitude: placeData.longitude,
      timezone: placeData.timezone
    }));
    if (errors.place) {
      setErrors((prev) => ({ ...prev, place: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'தயவுசெய்து பெயரை உள்ளிடவும் (Please enter name).';
    if (!formData.dob) newErrors.dob = 'பிறந்த தேதியை தேர்ந்தெடுக்கவும் (Please select birth date).';
    if (!formData.hour) newErrors.hour = 'மணியை தேர்ந்தெடுக்கவும் (Select hour).';
    if (formData.minute === '' || formData.minute === undefined) newErrors.minute = 'நிமிடத்தை தேர்ந்தெடுக்கவும் (Select minute).';
    if (!formData.place.trim()) newErrors.place = 'பிறந்த ஊரை உள்ளிடவும் (Please enter birth place).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let h = parseInt(formData.hour, 10);
      if (formData.meridiem === 'PM' && h < 12) h += 12;
      if (formData.meridiem === 'AM' && h === 12) h = 0;
      const m = String(formData.minute).padStart(2, '0');
      const formatted24 = `${String(h).padStart(2, '0')}:${m}`;

      onSubmit({
        name: formData.name.trim(),
        gender: formData.gender,
        dob: formData.dob,
        tob: formatted24,
        meridiem: formData.meridiem,
        place: formData.place.trim(),
        latitude: formData.latitude || 11.0168,
        longitude: formData.longitude || 76.9558,
        timezone: formData.timezone || 5.5
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-2 sm:px-0">
      <div className="relative bg-[#0d1424]/95 backdrop-blur-xl border border-amber-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-9 shadow-2xl shadow-amber-500/5">
        
        {/* Top Auspicious Title */}
        <div className="text-center mb-6 sm:mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/25 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>வேத ஜோதிட ஜாதகம் • Vedic Kundli</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
            ஜாதகம் கணிக்க (Generate Jaathagam)
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            உங்கள் பிறந்த விவரங்களை உள்ளிட்டு துல்லியமான ராசி, நட்சத்திரம், லக்னம் மற்றும் 12-கட்ட ஜாதகம் பெறவும்.
          </p>

          {/* Quick Demo Fill Buttons (Optional) */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="text-[11px] text-amber-400/90 font-medium mb-1.5">
              மாதிரி விவரங்கள் (Optional Demo Fill):
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => applyPreset(PRESET_ANUSHAM)}
                className="text-[10px] sm:text-xs font-medium px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer active:scale-95"
              >
                கோவை (அனுஷம்)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(PRESET_KETTAI)}
                className="text-[10px] sm:text-xs font-medium px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all cursor-pointer active:scale-95"
              >
                கோவை (கேட்டை)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(PRESET_MOOLAM)}
                className="text-[10px] sm:text-xs font-medium px-2.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all cursor-pointer active:scale-95"
              >
                சென்னை (மூலம்)
              </button>
              {(formData.name || formData.dob || formData.place) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] sm:text-xs font-medium px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>அழிக்க (Clear)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>பெயர் (Full Name) <span className="text-rose-400">*</span></span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              placeholder="உ.ம். Madan Kumar"
              className={`block w-full px-4 py-3 bg-[#080d1a] border ${
                errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700/80 focus:border-amber-500 focus:ring-amber-500/20'
              } rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition duration-200 min-h-[46px]`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.name}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>பாலினம் (Gender)</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="block w-full px-4 py-3 bg-[#080d1a] border border-slate-700/80 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-2 transition duration-200 min-h-[46px]"
            >
              <option value="Male">ஆண் (Male)</option>
              <option value="Female">பெண் (Female)</option>
              <option value="Other">மற்றவை (Other)</option>
            </select>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>பிறந்த தேதி (Date of Birth) <span className="text-rose-400">*</span></span>
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => {
                  setFormData({ ...formData, dob: e.target.value });
                  if (errors.dob) setErrors({ ...errors, dob: null });
                }}
                className={`block w-full px-3.5 py-3 bg-[#080d1a] border ${
                  errors.dob ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700/80 focus:border-amber-500 focus:ring-amber-500/20'
                } rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-2 transition duration-200 min-h-[46px] [color-scheme:dark]`}
              />
              {errors.dob && <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.dob}</p>}
            </div>

            {/* Time with explicit AM/PM */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>பிறந்த நேரம் (Time) <span className="text-rose-400">*</span></span>
                </span>
                {formData.hour && formData.minute !== '' && (
                  <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {formData.hour}:{String(formData.minute).padStart(2, '0')} {formData.meridiem}
                  </span>
                )}
              </label>

              <div className="grid grid-cols-3 gap-1.5">
                {/* Hour */}
                <div>
                  <select
                    value={formData.hour}
                    onChange={(e) => {
                      setFormData({ ...formData, hour: e.target.value });
                      if (errors.hour) setErrors({ ...errors, hour: null });
                    }}
                    className={`block w-full px-2 py-3 bg-[#080d1a] border ${
                      errors.hour ? 'border-rose-500' : 'border-slate-700/80 focus:border-amber-500'
                    } rounded-xl text-slate-100 text-xs sm:text-sm focus:outline-none text-center font-mono min-h-[46px]`}
                    aria-label="Hour"
                  >
                    <option value="" disabled>மணி (Hr)</option>
                    {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((h) => (
                      <option key={h} value={h}>{h} மணி</option>
                    ))}
                  </select>
                </div>

                {/* Minute */}
                <div>
                  <select
                    value={formData.minute}
                    onChange={(e) => {
                      setFormData({ ...formData, minute: e.target.value });
                      if (errors.minute) setErrors({ ...errors, minute: null });
                    }}
                    className={`block w-full px-2 py-3 bg-[#080d1a] border ${
                      errors.minute ? 'border-rose-500' : 'border-slate-700/80 focus:border-amber-500'
                    } rounded-xl text-slate-100 text-xs sm:text-sm focus:outline-none text-center font-mono min-h-[46px]`}
                    aria-label="Minute"
                  >
                    <option value="" disabled>நிமி (Min)</option>
                    {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map((m) => (
                      <option key={m} value={m}>{m} நிமி</option>
                    ))}
                  </select>
                </div>

                {/* AM / PM Segmented Control */}
                <div className="flex rounded-xl bg-[#080d1a] border border-slate-700/80 p-0.5 min-h-[46px] items-stretch">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, meridiem: 'AM' })}
                    className={`flex-1 flex items-center justify-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      formData.meridiem === 'AM'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, meridiem: 'PM' })}
                    className={`flex-1 flex items-center justify-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      formData.meridiem === 'PM'
                        ? 'bg-indigo-600 text-white shadow-md font-extrabold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>

              {(errors.hour || errors.minute) && (
                <p className="mt-1.5 text-xs text-rose-400 font-medium">
                  {errors.hour || errors.minute}
                </p>
              )}
            </div>
          </div>

          {/* Place of Birth */}
          <PlaceAutocomplete
            value={{
              place: formData.place,
              latitude: formData.latitude,
              longitude: formData.longitude,
              timezone: formData.timezone
            }}
            onChange={handlePlaceChange}
            error={errors.place}
          />

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer min-h-[48px]"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span>ஜாதகம் கணிக்கப்படுகிறது...</span>
                </span>
              ) : (
                <>
                  <span className="text-sm sm:text-base">துல்லிய ஜாதகம் காண்க (Generate Jaathagam)</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
