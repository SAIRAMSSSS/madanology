import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, CheckCircle2 } from 'lucide-react';
import { COMMON_INDIAN_CITIES } from '../utils/samplePresets';

export default function PlaceAutocomplete({ value, onChange, error }) {
  const [inputValue, setInputValue] = useState(value?.place || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const wrapperRef = useRef(null);

  const googleApiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

  useEffect(() => {
    if (value?.place !== undefined && value.place !== inputValue) {
      setInputValue(value.place);
    }
  }, [value?.place]);

  useEffect(() => {
    if (!googleApiKey || googleApiKey.includes('your_')) return;

    if (window.google && window.google.maps && window.google.maps.places) {
      initGoogleAutocomplete();
      return;
    }

    const scriptId = 'google-maps-places-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initGoogleAutocomplete();
      document.head.appendChild(script);
    }
  }, [googleApiKey]);

  const initGoogleAutocomplete = () => {
    if (!inputRef.current || !window.google?.maps?.places) return;

    try {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)'],
        fields: ['formatted_address', 'geometry', 'name', 'utc_offset_minutes']
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const formatted = place.formatted_address || place.name;
          const tzOffsetHours = place.utc_offset_minutes ? place.utc_offset_minutes / 60 : 5.5;

          setInputValue(formatted);
          setShowSuggestions(false);
          onChange({
            place: formatted,
            latitude: lat,
            longitude: lng,
            timezone: tzOffsetHours
          });
        }
      });

      setGoogleReady(true);
    } catch (err) {
      console.warn('Google Places warning:', err);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);

    if (!googleReady) {
      const trimmed = query.trim().toLowerCase();
      let matchedCity = null;

      if (trimmed.length > 0) {
        const matches = COMMON_INDIAN_CITIES.filter(item =>
          item.description.toLowerCase().includes(trimmed) ||
          item.city.toLowerCase().includes(trimmed)
        );
        setSuggestions(matches);
        setShowSuggestions(true);

        // Auto-match exact city name
        matchedCity = COMMON_INDIAN_CITIES.find(item =>
          item.city.toLowerCase() === trimmed ||
          item.description.toLowerCase().startsWith(trimmed)
        );
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }

      onChange({
        place: query,
        latitude: matchedCity ? matchedCity.lat : (value?.latitude || 11.0168),
        longitude: matchedCity ? matchedCity.lng : (value?.longitude || 76.9558),
        timezone: matchedCity ? matchedCity.timezone : 5.5
      });
    }
  };

  const selectSuggestion = (item) => {
    setInputValue(item.description);
    setShowSuggestions(false);
    onChange({
      place: item.description,
      latitude: item.lat,
      longitude: item.lng,
      timezone: item.timezone
    });
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>பிறந்த ஊர் / இடம் (Place of Birth)</span>
        </span>
        {googleReady ? (
          <span className="text-[10px] text-emerald-400 font-normal flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Google Autocomplete
          </span>
        ) : (
          <span className="text-[10px] text-amber-400/80 font-normal">
            தமிழ்நாடு மற்றும் இந்திய ஊர்கள்
          </span>
        )}
      </label>

      <div className="relative rounded-xl shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="h-4 w-4" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (!googleReady) {
              setSuggestions(COMMON_INDIAN_CITIES.slice(0, 8));
              setShowSuggestions(true);
            }
          }}
          placeholder="உ.ம். Coimbatore (கோயம்புத்தூர்), Chennai"
          className={`block w-full pl-10 pr-4 py-3 bg-[#080d1a] border ${
            error ? 'border-rose-500' : 'border-slate-700/80 focus:border-amber-500 focus:ring-amber-500/20'
          } rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition duration-200`}
        />
      </div>

      {!googleReady && showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-1.5 bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl max-h-56 overflow-y-auto divide-y divide-slate-800">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => selectSuggestion(item)}
              className="px-4 py-2.5 text-xs text-slate-200 hover:bg-amber-500/10 hover:text-amber-300 cursor-pointer flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400/70" />
                <span>{item.description}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {item.lat.toFixed(2)}°N, {item.lng.toFixed(2)}°E
              </span>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}
