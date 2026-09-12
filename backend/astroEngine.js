/**
 * ====================================================================
 * MADANOLOGY HIGH-PRECISION VEDIC ASTROLOGY (JYOTISH) ENGINE
 * ====================================================================
 * Exact Sidereal planetary longitudes, Lahiri Ayanamsha,
 * Ascendant (Lagnam), Tamil Raasi, Tamil Natchathiram,
 * and Comprehensive Past/Present/Upcoming Vimshottari Dasa-Bhukti Timeline.
 */

const Astronomy = require('astronomy-engine');

// 12 Zodiac Rasis with pure Tamil names
const RASIS = [
  { id: 1, english: "Aries", tamil: "மேஷம்", tamilFull: "மேஷ ராசி", lord: "Mars", lordTamil: "செவ்வாய்" },
  { id: 2, english: "Taurus", tamil: "ரிஷபம்", tamilFull: "ரிஷப ராசி", lord: "Venus", lordTamil: "சுக்கிரன்" },
  { id: 3, english: "Gemini", tamil: "மிதுனம்", tamilFull: "மிதுன ராசி", lord: "Mercury", lordTamil: "புதன்" },
  { id: 4, english: "Cancer", tamil: "கடகம்", tamilFull: "கடக ராசி", lord: "Moon", lordTamil: "சந்திரன்" },
  { id: 5, english: "Leo", tamil: "சிம்மம்", tamilFull: "சிம்ம ராசி", lord: "Sun", lordTamil: "சூரியன்" },
  { id: 6, english: "Virgo", tamil: "கன்னி", tamilFull: "கன்னி ராசி", lord: "Mercury", lordTamil: "புதன்" },
  { id: 7, english: "Libra", tamil: "துலாம்", tamilFull: "துலா ராசி", lord: "Venus", lordTamil: "சுக்கிரன்" },
  { id: 8, english: "Scorpio", tamil: "விருச்சிகம்", tamilFull: "விருச்சிக ராசி", lord: "Mars", lordTamil: "செவ்வாய்" },
  { id: 9, english: "Sagittarius", tamil: "தனுசு", tamilFull: "தனுசு ராசி", lord: "Jupiter", lordTamil: "குரு" },
  { id: 10, english: "Capricorn", tamil: "மகரம்", tamilFull: "மகர ராசி", lord: "Saturn", lordTamil: "சனி" },
  { id: 11, english: "Aquarius", tamil: "கும்பம்", tamilFull: "கும்ப ராசி", lord: "Saturn", lordTamil: "சனி" },
  { id: 12, english: "Pisces", tamil: "மீனம்", tamilFull: "மீன ராசி", lord: "Jupiter", lordTamil: "குரு" }
];

// 27 Authentic Tamil Nakshatras with Vimshottari Dasa Lord & Years
const NAKSHATRAS = [
  { id: 1, name: "Ashwini", tamil: "அஸ்வினி", lord: "Ketu", lordTamil: "கேது", years: 7 },
  { id: 2, name: "Bharani", tamil: "பரணி", lord: "Venus", lordTamil: "சுக்கிரன்", years: 20 },
  { id: 3, name: "Krittika", tamil: "கார்த்திகை", lord: "Sun", lordTamil: "சூரியன்", years: 6 },
  { id: 4, name: "Rohini", tamil: "ரோகிணி", lord: "Moon", lordTamil: "சந்திரன்", years: 10 },
  { id: 5, name: "Mrigashira", tamil: "மிருகசீரிஷம்", lord: "Mars", lordTamil: "செவ்வாய்", years: 7 },
  { id: 6, name: "Ardra", tamil: "திருவாதிரை", lord: "Rahu", lordTamil: "ராகு", years: 18 },
  { id: 7, name: "Punarvasu", tamil: "புனர்பூசம்", lord: "Jupiter", lordTamil: "குரு", years: 16 },
  { id: 8, name: "Pushya", tamil: "பூசம்", lord: "Saturn", lordTamil: "சனி", years: 19 },
  { id: 9, name: "Ashlesha", tamil: "ஆயில்யம்", lord: "Mercury", lordTamil: "புதன்", years: 17 },
  { id: 10, name: "Magha", tamil: "மகம்", lord: "Ketu", lordTamil: "கேது", years: 7 },
  { id: 11, name: "Purva Phalguni", tamil: "பூரம்", lord: "Venus", lordTamil: "சுக்கிரன்", years: 20 },
  { id: 12, name: "Uttara Phalguni", tamil: "உத்திரம்", lord: "Sun", lordTamil: "சூரியன்", years: 6 },
  { id: 13, name: "Hasta", tamil: "அஸ்தம்", lord: "Moon", lordTamil: "சந்திரன்", years: 10 },
  { id: 14, name: "Chitra", tamil: "சித்திரை", lord: "Mars", lordTamil: "செவ்வாய்", years: 7 },
  { id: 15, name: "Swathi", tamil: "சுவாதி", lord: "Rahu", lordTamil: "ராகு", years: 18 },
  { id: 16, name: "Vishakha", tamil: "விசாகம்", lord: "Jupiter", lordTamil: "குரு", years: 16 },
  { id: 17, name: "Anuradha", tamil: "அனுஷம்", lord: "Saturn", lordTamil: "சனி", years: 19 },
  { id: 18, name: "Jyeshtha", tamil: "கேட்டை", lord: "Mercury", lordTamil: "புதன்", years: 17 },
  { id: 19, name: "Mula", tamil: "மூலம்", lord: "Ketu", lordTamil: "கேது", years: 7 },
  { id: 20, name: "Purva Ashadha", tamil: "பூராடம்", lord: "Venus", lordTamil: "சுக்கிரன்", years: 20 },
  { id: 21, name: "Uttara Ashadha", tamil: "உத்திராடம்", lord: "Sun", lordTamil: "சூரியன்", years: 6 },
  { id: 22, name: "Shravana", tamil: "திருவோணம்", lord: "Moon", lordTamil: "சந்திரன்", years: 10 },
  { id: 23, name: "Dhanishta", tamil: "அவிட்டம்", lord: "Mars", lordTamil: "செவ்வாய்", years: 7 },
  { id: 24, name: "Shatabhisha", tamil: "சதயம்", lord: "Rahu", lordTamil: "ராகு", years: 18 },
  { id: 25, name: "Purva Bhadrapada", tamil: "பூரட்டாதி", lord: "Jupiter", lordTamil: "குரு", years: 16 },
  { id: 26, name: "Uttara Bhadrapada", tamil: "உத்திரட்டாதி", lord: "Saturn", lordTamil: "சனி", years: 19 },
  { id: 27, name: "Revati", tamil: "ரேவதி", lord: "Mercury", lordTamil: "புதன்", years: 17 }
];

// Cyclic Order of the 9 Vimshottari Dasas
const DASA_ORDER = [
  { name: "Ketu", tamil: "கேது", years: 7, color: "orange" },
  { name: "Venus", tamil: "சுக்கிரன்", years: 20, color: "pink" },
  { name: "Sun", tamil: "சூரியன்", years: 6, color: "amber" },
  { name: "Moon", tamil: "சந்திரன்", years: 10, color: "blue" },
  { name: "Mars", tamil: "செவ்வாய்", years: 7, color: "rose" },
  { name: "Rahu", tamil: "ராகு", years: 18, color: "violet" },
  { name: "Jupiter", tamil: "குரு", years: 16, color: "yellow" },
  { name: "Saturn", tamil: "சனி", years: 19, color: "indigo" },
  { name: "Mercury", tamil: "புதன்", years: 17, color: "emerald" }
];

const TITHIS_TAMIL = [
  "சுக்கில பிரதமை", "சுக்கில துவிதியை", "சுக்கில திருதியை", "சுக்கில சதுர்த்தி", "சுக்கில பஞ்சமி",
  "சுக்கில சஷ்டி", "சுக்கில சப்தமி", "சுக்கில அஷ்டமி", "சுக்கில நவமி", "சுக்கில தசமி",
  "சுக்கில ஏகாதசி", "சுக்கில துவாதசி", "சுக்கில திரயோதசி", "சுக்கில சதுர்த்தசி", "பௌர்ணமி (முழு நிலவு)",
  "கிருஷ்ண பிரதமை", "கிருஷ்ண துவிதியை", "கிருஷ்ண திருதியை", "கிருஷ்ண சதுர்த்தி", "கிருஷ்ண பஞ்சமி",
  "கிருஷ்ண சஷ்டி", "கிருஷ்ண சப்தமி", "கிருஷ்ண அஷ்டமி", "கிருஷ்ண நவமி", "கிருஷ்ண தசமி",
  "கிருஷ்ண ஏகாதசி", "கிருஷ்ண துவாதசி", "கிருஷ்ண திரயோதசி", "கிருஷ்ண சதுர்த்தசி", "அமாவாசை"
];

const YOGAS_TAMIL = [
  "விஷ்கம்பம்", "ப்ரீதி", "ஆயுஷ்மான்", "சௌபாக்யம்", "சோபனம்", "அதிகண்டம்",
  "சுகர்மம்", "திருதி", "சூலம்", "கண்டம்", "விருத்தி", "துருவம்",
  "வியாகாதம்", "ஹர்ஷணம்", "வஜ்ரம்", "சித்தி", "வியதீபாதம்", "வரீயான்",
  "பரிகம்", "சிவம்", "சித்தம்", "சாத்தியம்", "சுபம்", "சுப்ரம்",
  "பிராம்மம்", "ஐந்திரம்", "வைத்ருதி"
];

const KARANAS_TAMIL = [
  "பவம்", "பாலவம்", "கௌலவம்", "தைதுலை", "கரசை", "வனசை", "பத்திரை",
  "சகுனி", "சதுஷ்பாதம்", "நாகவம்", "கிம்ஸ்துக்னம்"
];

function formatDMS(deg) {
  const d = Math.floor(deg);
  const mDec = (deg - d) * 60;
  const m = Math.floor(mDec);
  const s = Math.floor((mDec - m) * 60);
  return `${String(d).padStart(2, '0')}° ${String(m).padStart(2, '0')}' ${String(s).padStart(2, '0')}"`;
}

function getLahiriAyanamsha(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  return 23.8570917 + 1.396887 * T + 0.0003086 * T * T;
}

function calculateAscendant(astroTime, jd, lat, lon, ayanamsha) {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const T = (jd - 2451545.0) / 36525.0;
  const eps = (23.4392911 - 0.0130042 * T) * rad;

  const gastHours = Astronomy.SiderealTime(astroTime);
  const lstDeg = (gastHours * 15 + lon + 3600) % 360;
  const ramcRad = lstDeg * rad;

  const y = Math.cos(ramcRad);
  const x = - (Math.sin(ramcRad) * Math.cos(eps) + Math.tan(lat * rad) * Math.sin(eps));
  let ascTropical = Math.atan2(y, x) * deg;
  if (ascTropical < 0) ascTropical += 360;

  return (ascTropical - ayanamsha + 360) % 360;
}

function calculateLunarNodes(jd, ayanamsha) {
  const T = (jd - 2451545.0) / 36525.0;
  let omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000;
  omega = ((omega % 360) + 360) % 360;

  const rahuSidereal = ((omega - ayanamsha) % 360 + 360) % 360;
  const ketuSidereal = (rahuSidereal + 180) % 360;

  return { rahuSidereal, ketuSidereal };
}

function isPlanetRetrograde(body, astroTime) {
  const dtDays = 0.05;
  const tBefore = astroTime.AddDays(-dtDays);
  const tAfter = astroTime.AddDays(dtDays);

  const vec1 = Astronomy.GeoVector(body, tBefore, true);
  const ecl1 = Astronomy.Ecliptic(vec1);

  const vec2 = Astronomy.GeoVector(body, tAfter, true);
  const ecl2 = Astronomy.Ecliptic(vec2);

  let diff = ecl2.elon - ecl1.elon;
  if (diff < -180) diff += 360;
  if (diff > 180) diff -= 360;

  return diff < 0;
}

/**
 * Calculate the 9 Bhuktis (Sub-periods) for a given Maha Dasa
 */
function calculateBhuktis(mainLordName, dasaStartDate, dasaTotalYears, today) {
  const mainIdx = DASA_ORDER.findIndex(d => d.name.toLowerCase() === mainLordName.toLowerCase());
  const mainYears = DASA_ORDER[mainIdx].years;
  
  let cur = new Date(dasaStartDate.getTime());
  const bhuktis = [];
  let currentBhukti = null;

  for (let i = 0; i < 9; i++) {
    const bInfo = DASA_ORDER[(mainIdx + i) % 9];
    const durationDays = (mainYears * bInfo.years / 120) * 365.25;
    const start = new Date(cur.getTime());
    const end = new Date(start.getTime() + durationDays * 24 * 3600 * 1000);
    cur = new Date(end.getTime());

    const isPast = end < today;
    const isPresent = start <= today && today <= end;
    const isFuture = start > today;

    const obj = {
      bhuktiLord: bInfo.name,
      bhuktiLordTamil: `${bInfo.tamil} புக்தி`,
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
      isPast,
      isPresent,
      isFuture
    };
    bhuktis.push(obj);
    if (isPresent) currentBhukti = obj;
  }

  return { bhuktis, currentBhukti };
}

/**
 * Generate Comprehensive Vimshottari Dasa Timeline (Past, Present & Upcoming)
 */
function generateVimshottariTimeline(birthDateStr, startLordName, balanceDaysTotal) {
  const birthDate = new Date(birthDateStr);
  const today = new Date();
  
  let startIndex = DASA_ORDER.findIndex(d => d.name.toLowerCase() === startLordName.toLowerCase());
  if (startIndex === -1) startIndex = 0;

  let currentDate = new Date(birthDate.getTime());
  const allDasas = [];
  let currentDasa = null;

  for (let i = 0; i < 9; i++) {
    const dasaInfo = DASA_ORDER[(startIndex + i) % 9];
    const startDate = new Date(currentDate.getTime());
    
    // First Dasa duration is the birth balance; subsequent are the full canonical period
    const durationDays = i === 0 ? balanceDaysTotal : dasaInfo.years * 365.25;
    const endDate = new Date(startDate.getTime() + durationDays * 24 * 3600 * 1000);
    currentDate = new Date(endDate.getTime());
    
    const isPast = endDate < today;
    const isPresent = startDate <= today && today <= endDate;
    const isFuture = startDate > today;

    // Age calculation at start and end
    const ageStart = Math.max(0, Math.floor((startDate.getTime() - birthDate.getTime()) / (365.25 * 24 * 3600 * 1000)));
    const ageEnd = Math.floor((endDate.getTime() - birthDate.getTime()) / (365.25 * 24 * 3600 * 1000));

    // Calculate Bhuktis
    const { bhuktis, currentBhukti } = calculateBhuktis(dasaInfo.name, startDate, dasaInfo.years, today);

    // Percentage elapsed if present
    let progressPercent = 0;
    if (isPresent) {
      const totalSpan = endDate.getTime() - startDate.getTime();
      const elapsed = today.getTime() - startDate.getTime();
      progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / totalSpan) * 100)));
    }

    const dasaItem = {
      index: i + 1,
      lord: dasaInfo.name,
      lordTamil: `${dasaInfo.tamil} திசை`,
      years: i === 0 ? parseFloat((balanceDaysTotal / 365.25).toFixed(1)) : dasaInfo.years,
      totalCanonicalYears: dasaInfo.years,
      isBirthDasa: i === 0,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      ageRange: `வயது ${ageStart} - ${ageEnd}`,
      ageRangeEnglish: `Age ${ageStart} - ${ageEnd}`,
      isPast,
      isPresent,
      isFuture,
      progressPercent,
      currentBhukti,
      bhuktis
    };

    allDasas.push(dasaItem);
    if (isPresent) {
      currentDasa = dasaItem;
    }
  }

  // Split into Past, Present, and Upcoming
  const pastDasas = allDasas.filter(d => d.isPast);
  const upcomingDasas = allDasas.filter(d => d.isFuture);

  // If person is older than 120 or younger, ensure currentDasa fallback
  if (!currentDasa && allDasas.length > 0) {
    currentDasa = allDasas[0];
  }

  return {
    currentDasa,
    pastDasas,
    upcomingDasas,
    allDasas
  };
}

function calculateAccurateHoroscope(params) {
  const { name, gender, dob, tob, meridiem, place, latitude, longitude, timezone } = params;

  let [hours, minutes] = tob.split(':').map(Number);
  if (meridiem) {
    const isPM = meridiem.toUpperCase() === 'PM';
    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
  }

  const [year, month, day] = dob.split('-').map(Number);
  const tzOffset = Number(timezone) || 5.5;

  const localDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const utcMillis = localDate.getTime() - tzOffset * 3600 * 1000;
  const utcDate = new Date(utcMillis);

  const lat = Number(latitude) || 11.0168;
  const lon = Number(longitude) || 76.9558;

  const astroTime = Astronomy.MakeTime(utcDate);
  const jd = astroTime.ut + 2451545.0;
  const ayanamsha = getLahiriAyanamsha(jd);

  // 1. Calculate Lagna
  const lagnaSidereal = calculateAscendant(astroTime, jd, lat, lon, ayanamsha);
  const lagnaRasiIndex = Math.floor(lagnaSidereal / 30);
  const lagnaSignId = lagnaRasiIndex + 1;

  // 2. Physical Planets
  const planetList = [
    { body: Astronomy.Body.Sun, name: "Sun", code: "Su", tamilName: "சூரியன்", tamilShort: "சூரி" },
    { body: Astronomy.Body.Moon, name: "Moon", code: "Mo", tamilName: "சந்திரன்", tamilShort: "சந்" },
    { body: Astronomy.Body.Mars, name: "Mars", code: "Ma", tamilName: "செவ்வாய்", tamilShort: "செவ்" },
    { body: Astronomy.Body.Mercury, name: "Mercury", code: "Me", tamilName: "புதன்", tamilShort: "புத" },
    { body: Astronomy.Body.Jupiter, name: "Jupiter", code: "Ju", tamilName: "குரு", tamilShort: "குரு" },
    { body: Astronomy.Body.Venus, name: "Venus", code: "Ve", tamilName: "சுக்கிரன்", tamilShort: "சுக்" },
    { body: Astronomy.Body.Saturn, name: "Saturn", code: "Sa", tamilName: "சனி", tamilShort: "சனி" }
  ];

  const calculatedPlanets = [];

  const processPosition = (siderealLon, name, code, tamilName, tamilShort, isRetro, isLagna = false, isMoon = false) => {
    const signIndex = Math.floor(siderealLon / 30);
    const signId = signIndex + 1;
    const degInSign = siderealLon % 30;
    const signMeta = RASIS[signIndex];

    const nakTotal = siderealLon / (360 / 27);
    const nakIndex = Math.floor(nakTotal);
    const nakRemainderDeg = siderealLon % (360 / 27);
    const pada = Math.floor(nakRemainderDeg / (360 / 108)) + 1;
    const nakMeta = NAKSHATRAS[nakIndex % 27];

    const house = ((signId - lagnaSignId + 12) % 12) + 1;

    return {
      name,
      code,
      tamilName,
      tamilShort,
      totalLongitude: siderealLon,
      signId,
      signName: signMeta.english,
      signTamil: signMeta.tamil,
      signTamilFull: signMeta.tamilFull,
      degrees: formatDMS(degInSign),
      degNumber: parseFloat(degInSign.toFixed(1)),
      nakshatra: nakMeta.name,
      nakshatraTamil: nakMeta.tamil,
      pada,
      padaTamil: `பாதம் ${pada}`,
      isRetrograde: isRetro,
      isLagna,
      isMoon,
      house
    };
  };

  // Add Lagna
  const lagnaProcessed = processPosition(lagnaSidereal, "Lagna (Ascendant)", "Lg", "லக்னம்", "லக்", false, true, false);
  calculatedPlanets.push(lagnaProcessed);

  let moonSiderealLon = 0;
  let sunSiderealLon = 0;

  for (const p of planetList) {
    const vec = Astronomy.GeoVector(p.body, astroTime, true);
    const ecl = Astronomy.Ecliptic(vec);
    const siderealLon = ((ecl.elon - ayanamsha) % 360 + 360) % 360;

    const isMoon = p.code === 'Mo';
    if (isMoon) moonSiderealLon = siderealLon;
    if (p.code === 'Su') sunSiderealLon = siderealLon;

    let isRetro = false;
    if (p.code !== 'Su' && p.code !== 'Mo') {
      isRetro = isPlanetRetrograde(p.body, astroTime);
    }

    calculatedPlanets.push(processPosition(siderealLon, p.name, p.code, p.tamilName, p.tamilShort, isRetro, false, isMoon));
  }

  // Lunar Nodes
  const { rahuSidereal, ketuSidereal } = calculateLunarNodes(jd, ayanamsha);
  calculatedPlanets.push(processPosition(rahuSidereal, "Rahu", "Ra", "ராகு", "ராகு", true, false, false));
  calculatedPlanets.push(processPosition(ketuSidereal, "Ketu", "Ke", "கேது", "கேது", true, false, false));

  // Assemble 12 South Indian Rasi Boxes
  const rasiBoxes = {};
  for (let i = 1; i <= 12; i++) {
    const meta = RASIS.find(r => r.id === i);
    rasiBoxes[i] = {
      signId: i,
      signEnglish: meta.english,
      signTamil: meta.tamil,
      signTamilFull: meta.tamilFull,
      lord: meta.lord,
      lordTamil: meta.lordTamil,
      planets: []
    };
  }

  calculatedPlanets.forEach(p => {
    if (rasiBoxes[p.signId]) {
      rasiBoxes[p.signId].planets.push(p);
    }
  });

  // Janma Rasi (Moon Sign)
  const moonSignIndex = Math.floor(moonSiderealLon / 30);
  const moonRasi = RASIS[moonSignIndex];

  // Janma Nakshatra
  const moonNakTotal = moonSiderealLon / (360 / 27);
  const moonNakIndex = Math.floor(moonNakTotal);
  const moonNakRemainder = moonSiderealLon % (360 / 27);
  const moonPada = Math.floor(moonNakRemainder / (360 / 108)) + 1;
  const janmaNak = NAKSHATRAS[moonNakIndex % 27];

  // Tithi
  let tithiAngle = (moonSiderealLon - sunSiderealLon + 360) % 360;
  const tithiIndex = Math.floor(tithiAngle / 12);
  const currentTithiTamil = TITHIS_TAMIL[tithiIndex % 30];

  // Yoga
  const yogaAngle = (sunSiderealLon + moonSiderealLon) % 360;
  const yogaIndex = Math.floor(yogaAngle / (360 / 27));
  const currentYogaTamil = YOGAS_TAMIL[yogaIndex % 27];

  // Karana
  const karanaIndex = Math.floor(tithiAngle / 6);
  const currentKaranaTamil = KARANAS_TAMIL[karanaIndex % 11];

  // Sunrise / Sunset
  let sunriseStr = "06:00 AM";
  let sunsetStr = "06:30 PM";
  try {
    const observer = new Astronomy.Observer(lat, lon, 300);
    const dayStart = new Date(Date.UTC(year, month - 1, day, 0, 0));
    const sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, dayStart, 1);
    const sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, dayStart, 1);

    if (sunrise && sunrise.date) {
      const riseLocal = new Date(sunrise.date.getTime() + tzOffset * 3600 * 1000);
      sunriseStr = riseLocal.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    }
    if (sunset && sunset.date) {
      const setLocal = new Date(sunset.date.getTime() + tzOffset * 3600 * 1000);
      sunsetStr = setLocal.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    }
  } catch (err) {
    console.warn("Rise/Set calculation fallback:", err.message);
  }

  // Vimshottari Dasa Balance at birth
  const nakTotalSpan = 360 / 27;
  const fractionElapsed = moonNakRemainder / nakTotalSpan;
  const fractionRemaining = 1.0 - fractionElapsed;
  const totalDasaYears = janmaNak.years;
  const remYearsExact = fractionRemaining * totalDasaYears;

  const dYears = Math.floor(remYearsExact);
  const remMonthsExact = (remYearsExact - dYears) * 12;
  const dMonths = Math.floor(remMonthsExact);
  const dDays = Math.floor((remMonthsExact - dMonths) * 30);

  const formattedDasaBalanceTamil = `${dYears} ஆண்டுகள், ${dMonths} மாதங்கள், ${dDays} நாட்கள்`;
  const formattedDasaBalanceEnglish = `${dYears} Years, ${dMonths} Months, ${dDays} Days`;

  // Total balance days for sequential timeline calculation
  const totalBalanceDays = (dYears * 365.25) + (dMonths * 30.4375) + dDays;

  // Generate Comprehensive Past, Present, and Upcoming Dasa Timeline
  const dasaTimeline = generateVimshottariTimeline(dob, janmaNak.lord, totalBalanceDays);

  const displayHours12 = hours % 12 || 12;
  const displayMeridiem = hours >= 12 ? 'PM' : 'AM';
  const displayTimeFormatted = `${String(displayHours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${displayMeridiem}`;

  return {
    meta: {
      appName: "Madanology",
      calculationEngine: "Astronomical VSOP87 & Lahiri Ayanamsha (Chitra Paksha)",
      ayanamshaFormatted: formatDMS(ayanamsha),
      generatedAt: new Date().toISOString()
    },
    userDetails: {
      name: name || "Native",
      gender: gender || "Male",
      dob,
      tob: displayTimeFormatted,
      meridiem: displayMeridiem,
      raw24hTime: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
      place,
      latitude: lat,
      longitude: lon,
      timezone: tzOffset >= 0 ? `UTC+${tzOffset}` : `UTC${tzOffset}`
    },
    panchangam: {
      raasiTamil: moonRasi.tamil,
      raasiFullTamil: moonRasi.tamilFull,
      raasiEnglish: moonRasi.english,
      raasiLordTamil: moonRasi.lordTamil,
      raasiLordEnglish: moonRasi.lord,

      natchathiramTamil: janmaNak.tamil,
      natchathiramEnglish: janmaNak.name,
      natchathiramPada: moonPada,
      natchathiramPadaTamil: `பாதம் ${moonPada}`,
      natchathiramLordTamil: janmaNak.lordTamil,
      natchathiramLordEnglish: janmaNak.lord,

      lagnaTamil: RASIS[lagnaRasiIndex].tamil,
      lagnaFullTamil: RASIS[lagnaRasiIndex].tamilFull,
      lagnaEnglish: RASIS[lagnaRasiIndex].english,
      lagnaLordTamil: RASIS[lagnaRasiIndex].lordTamil,
      lagnaLordEnglish: RASIS[lagnaRasiIndex].lord,

      tithiTamil: currentTithiTamil,
      yogaTamil: currentYogaTamil,
      karanaTamil: currentKaranaTamil,
      sunrise: sunriseStr,
      sunset: sunsetStr,
      ayanamsa: `சித்திரபக்ஷ லாகிரி ${formatDMS(ayanamsha)}`
    },
    dasaBalance: {
      lordTamil: `${janmaNak.lordTamil} திசை`,
      lordEnglish: `${janmaNak.lord} Dasa`,
      remainingTamil: formattedDasaBalanceTamil,
      remainingEnglish: formattedDasaBalanceEnglish
    },
    dasaTimeline, // Full Past, Present & Upcoming Dasa & Bhukti Periods
    planetaryPositions: calculatedPlanets,
    rasiBoxes
  };
}

module.exports = {
  calculateAccurateHoroscope,
  RASIS,
  NAKSHATRAS
};
