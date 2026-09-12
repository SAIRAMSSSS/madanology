/**
 * Realistic Mock Data Generator for Madanology Vedic Jaathagam
 * Provides authentic astrological data for Coimbatore and any test inputs.
 */

// 12 Rasis in order (1: Mesham/Aries ... 12: Meenam/Pisces)
const RASIS = [
  { id: 1, english: "Aries", tamil: "மேஷம் (Mesham)", lord: "Mars" },
  { id: 2, english: "Taurus", tamil: "ரிஷபம் (Rishabham)", lord: "Venus" },
  { id: 3, english: "Gemini", tamil: "மிதுனம் (Mithunam)", lord: "Mercury" },
  { id: 4, english: "Cancer", tamil: "கடகம் (Kadagam)", lord: "Moon" },
  { id: 5, english: "Leo", tamil: "சிம்மம் (Simmam)", lord: "Sun" },
  { id: 6, english: "Virgo", tamil: "கன்னி (Kanni)", lord: "Mercury" },
  { id: 7, english: "Libra", tamil: "துலாம் (Thulam)", lord: "Venus" },
  { id: 8, english: "Scorpio", tamil: "விருச்சிகம் (Viruchigam)", lord: "Mars" },
  { id: 9, english: "Sagittarius", tamil: "தனுசு (Dhanusu)", lord: "Jupiter" },
  { id: 10, english: "Capricorn", tamil: "மகரம் (Makaram)", lord: "Saturn" },
  { id: 11, english: "Aquarius", tamil: "கும்பம் (Kumbham)", lord: "Saturn" },
  { id: 12, english: "Pisces", tamil: "மீனம் (Meenam)", lord: "Jupiter" }
];

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swathi", "Vishakha", "Anuradha (அனுஷம்)", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

function generateRealisticHoroscope(payload) {
  const { name, gender, dob, tob, place, latitude, longitude, timezone } = payload;
  const birthDate = new Date(`${dob}T${tob || '06:30'}`);

  // Base preset specifically tailored for Coimbatore / Standard Morning Birth
  const isCoimbatore = place && place.toLowerCase().includes('coimbatore');

  // Realistic planetary positions
  // Signs: 1=Aries, 2=Taurus, ..., 8=Scorpio, etc.
  const planetaryPositions = [
    {
      name: "Lagna (Ascendant)",
      code: "Lg",
      tamilName: "லக்னம்",
      signId: isCoimbatore ? 2 : 1, // Taurus for Coimbatore morning, or Aries
      signName: isCoimbatore ? "Taurus" : "Aries",
      signTamil: isCoimbatore ? "ரிஷபம்" : "மேஷம்",
      degrees: "14° 22' 08\"",
      nakshatra: "Rohini",
      pada: 2,
      isRetrograde: false,
      house: 1
    },
    {
      name: "Sun (Suriyan)",
      code: "Su",
      tamilName: "சூரியன்",
      signId: 2, // Taurus
      signName: "Taurus",
      signTamil: "ரிஷபம்",
      degrees: "29° 48' 12\"",
      nakshatra: "Mrigashira",
      pada: 2,
      isRetrograde: false,
      house: isCoimbatore ? 1 : 2
    },
    {
      name: "Moon (Chandran)",
      code: "Mo",
      tamilName: "சந்திரன்",
      signId: 8, // Scorpio (Neecha / Deep spiritual rasi)
      signName: "Scorpio",
      signTamil: "விருச்சிகம்",
      degrees: "08° 14' 33\"",
      nakshatra: "Anuradha (அனுஷம்)",
      pada: 2,
      isRetrograde: false,
      house: isCoimbatore ? 7 : 8
    },
    {
      name: "Mars (Chevvai)",
      code: "Ma",
      tamilName: "செவ்வாய்",
      signId: 1, // Aries (Own House - Swakshetram)
      signName: "Aries",
      signTamil: "மேஷம்",
      degrees: "18° 35' 40\"",
      nakshatra: "Bharani",
      pada: 2,
      isRetrograde: false,
      house: isCoimbatore ? 12 : 1
    },
    {
      name: "Mercury (Budhan)",
      code: "Me",
      tamilName: "புதன்",
      signId: 3, // Gemini (Swakshetram)
      signName: "Gemini",
      signTamil: "மிதுனம்",
      degrees: "05° 11' 22\"",
      nakshatra: "Mrigashira",
      pada: 4,
      isRetrograde: false,
      house: isCoimbatore ? 2 : 3
    },
    {
      name: "Jupiter (Guru)",
      code: "Ju",
      tamilName: "குரு",
      signId: 11, // Aquarius
      signName: "Aquarius",
      signTamil: "கும்பம்",
      degrees: "21° 50' 19\"",
      nakshatra: "Purva Bhadrapada",
      pada: 1,
      isRetrograde: true,
      house: isCoimbatore ? 10 : 11
    },
    {
      name: "Venus (Sukran)",
      code: "Ve",
      tamilName: "சுக்கிரன்",
      signId: 4, // Cancer
      signName: "Cancer",
      signTamil: "கடகம்",
      degrees: "12° 26' 45\"",
      nakshatra: "Pushya",
      pada: 3,
      isRetrograde: false,
      house: isCoimbatore ? 3 : 4
    },
    {
      name: "Saturn (Sani)",
      code: "Sa",
      tamilName: "சனி",
      signId: 12, // Pisces
      signName: "Pisces",
      signTamil: "மீனம்",
      degrees: "02° 41' 10\"",
      nakshatra: "Purva Bhadrapada",
      pada: 4,
      isRetrograde: false,
      house: isCoimbatore ? 11 : 12
    },
    {
      name: "Rahu",
      code: "Ra",
      tamilName: "ராகு",
      signId: 6, // Virgo
      signName: "Virgo",
      signTamil: "கன்னி",
      degrees: "15° 02' 54\"",
      nakshatra: "Hasta",
      pada: 2,
      isRetrograde: true,
      house: isCoimbatore ? 5 : 6
    },
    {
      name: "Ketu",
      code: "Ke",
      tamilName: "கேது",
      signId: 12, // Pisces (opposite Rahu)
      signName: "Pisces",
      signTamil: "மீனம்",
      degrees: "15° 02' 54\"",
      nakshatra: "Uttara Bhadrapada",
      pada: 4,
      isRetrograde: true,
      house: isCoimbatore ? 11 : 12
    }
  ];

  // Organize planets into 12 Rasi boxes for the South Indian Chart
  // Boxes correspond to signs 1 through 12
  const rasiBoxes = {};
  for (let i = 1; i <= 12; i++) {
    const meta = RASIS.find(r => r.id === i);
    rasiBoxes[i] = {
      signId: i,
      signEnglish: meta.english,
      signTamil: meta.tamil,
      lord: meta.lord,
      planets: []
    };
  }

  planetaryPositions.forEach(p => {
    if (rasiBoxes[p.signId]) {
      rasiBoxes[p.signId].planets.push(p);
    }
  });

  return {
    meta: {
      appName: "Madanology",
      calculationEngine: "Vedic Lahiri Ayanamsha (Chitra Paksha)",
      generatedAt: new Date().toISOString()
    },
    userDetails: {
      name: name || "Madan Kumar",
      gender: gender || "Male",
      dob: dob || "1998-05-14",
      tob: tob || "06:30",
      place: place || "Coimbatore, Tamil Nadu, India",
      latitude: latitude || 11.0168,
      longitude: longitude || 76.9558,
      timezone: timezone || "Asia/Kolkata (+05:30)"
    },
    panchangam: {
      nakshatra: "Anuradha (அனுஷம்)",
      nakshatraLord: "Saturn (சனி)",
      nakshatraPada: 2,
      rasiMoonSign: "Scorpio (விருச்சிகம்)",
      rasiLord: "Mars (செவ்வாய்)",
      lagnaAscendant: isCoimbatore ? "Taurus (ரிஷபம்)" : "Aries (மேஷம்)",
      lagnaLord: isCoimbatore ? "Venus (சுக்கிரன்)" : "Mars (செவ்வாய்)",
      tithi: "Krishna Paksha Tritiya",
      yogam: "Sadhya",
      karanam: "Vanija",
      sunrise: "06:05 AM",
      sunset: "06:34 PM",
      ayanamsa: "Lahiri 23° 49' 52\""
    },
    dasaBalance: {
      lord: "Saturn (சனி திசை)",
      remaining: "4 Years, 6 Months, 12 Days"
    },
    planetaryPositions,
    rasiBoxes
  };
}

module.exports = {
  generateRealisticHoroscope,
  RASIS,
  NAKSHATRAS
};
