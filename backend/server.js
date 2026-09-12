/**
 * ====================================================================
 * MADANOLOGY VEDIC JAATHAGAM ENGINE - EXPRESS SERVER
 * ====================================================================
 * High-precision Vedic Jyotish calculations with Lahiri Ayanamsha,
 * AM/PM time support, external API integrations, and static frontend hosting.
 */

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { calculateAccurateHoroscope, RASIS } = require('./astroEngine');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

/**
 * Health check route
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'Madanology High-Precision Vedic Engine',
    timestamp: new Date().toISOString()
  });
});

/**
 * Quick sample route for testing with Coimbatore, Tamil Nadu
 */
app.get('/api/sample-chart', (req, res) => {
  const samplePayload = {
    name: 'Madan Kumar',
    gender: 'Male',
    dob: '1998-05-14',
    tob: '06:30',
    meridiem: 'AM',
    place: 'Coimbatore, Tamil Nadu, India',
    latitude: 11.0168,
    longitude: 76.9558,
    timezone: 5.5
  };
  const horoscope = calculateAccurateHoroscope(samplePayload);
  res.status(200).json({
    success: true,
    source: 'astronomical-engine',
    data: horoscope
  });
});

/**
 * Helper function: Call external Vedic Rishi API (AstrologyAPI)
 */
async function fetchFromVedicRishi(payload) {
  const userId = process.env.VEDIC_RISHI_USER_ID;
  const apiKey = process.env.VEDIC_RISHI_API_KEY;

  if (!userId || !apiKey || userId.includes('your_')) {
    throw new Error('Vedic Rishi API credentials not configured');
  }

  const [year, month, date] = payload.dob.split('-').map(Number);
  let [hours, minutes] = payload.tob.split(':').map(Number);
  if (payload.meridiem) {
    if (payload.meridiem.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (payload.meridiem.toUpperCase() === 'AM' && hours === 12) hours = 0;
  }

  const requestBody = {
    date,
    month,
    year,
    hour: hours,
    minute: minutes,
    latitude: Number(payload.latitude) || 11.0168,
    longitude: Number(payload.longitude) || 76.9558,
    timezone: Number(payload.timezone) || 5.5
  };

  const authHeader = 'Basic ' + Buffer.from(`${userId}:${apiKey}`).toString('base64');

  const response = await axios.post(
    'https://json.astrologyapi.com/v1/planets/extended',
    requestBody,
    {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    }
  );

  return response.data;
}

/**
 * Helper function: Call external Prokerala Astrology API
 */
async function fetchFromProkerala(payload) {
  const clientId = process.env.PROKERALA_CLIENT_ID;
  const clientSecret = process.env.PROKERALA_CLIENT_SECRET;

  if (!clientId || !clientSecret || clientId.includes('your_')) {
    throw new Error('Prokerala API credentials not configured');
  }

  const tokenResponse = await axios.post('https://api.prokerala.com/token', {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  });

  const accessToken = tokenResponse.data.access_token;
  let [hours, minutes] = payload.tob.split(':').map(Number);
  if (payload.meridiem) {
    if (payload.meridiem.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (payload.meridiem.toUpperCase() === 'AM' && hours === 12) hours = 0;
  }

  const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  const datetime = `${payload.dob}T${timeStr}+05:30`;

  const chartResponse = await axios.get('https://api.prokerala.com/v2/astrology/kundli', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      ayanamsa: 1, // Lahiri
      datetime,
      coordinates: `${payload.latitude},${payload.longitude}`,
      la: 'en'
    },
    timeout: 10000
  });

  return chartResponse.data;
}

/**
 * Main API Route: /api/generate-chart
 * Generates an accurate Vedic Horoscope (Jaathagam)
 */
app.post('/api/generate-chart', async (req, res) => {
  try {
    const { name, gender, dob, tob, meridiem, place, latitude, longitude, timezone } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'தயவுசெய்து பெயரை உள்ளிடவும் (Full Name is required).'
      });
    }

    if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      return res.status(400).json({
        success: false,
        error: 'சரியான பிறந்த தேதியை உள்ளிடவும் (Valid Date of Birth is required in YYYY-MM-DD).'
      });
    }

    if (!tob || !/^\d{1,2}:\d{2}$/.test(tob)) {
      return res.status(400).json({
        success: false,
        error: 'பிறந்த நேரத்தை உள்ளிடவும் (Valid Time of Birth is required in HH:MM).'
      });
    }

    if (!place || typeof place !== 'string' || place.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'பிறந்த ஊரை உள்ளிடவும் (Place of Birth is required).'
      });
    }

    const provider = (process.env.ASTROLOGY_API_PROVIDER || 'mock').toLowerCase();
    let externalResult = null;
    let dataSource = 'astronomical-engine';

    if (provider === 'vedic_rishi') {
      try {
        console.log(`[Madanology] Requesting Vedic Rishi for ${name}...`);
        externalResult = await fetchFromVedicRishi(req.body);
        dataSource = 'vedic-rishi-api';
      } catch (apiErr) {
        console.warn(`[API Notice] Vedic Rishi call failed: ${apiErr.message}. Using built-in astronomical engine.`);
      }
    } else if (provider === 'prokerala') {
      try {
        console.log(`[Madanology] Requesting Prokerala for ${name}...`);
        externalResult = await fetchFromProkerala(req.body);
        dataSource = 'prokerala-api';
      } catch (apiErr) {
        console.warn(`[API Notice] Prokerala call failed: ${apiErr.message}. Using built-in astronomical engine.`);
      }
    }

    const accurateHoroscope = calculateAccurateHoroscope({
      name: name.trim(),
      gender: gender || 'Male',
      dob,
      tob,
      meridiem: meridiem ? meridiem.toUpperCase() : undefined,
      place: place.trim(),
      latitude: Number(latitude) || 11.0168,
      longitude: Number(longitude) || 76.9558,
      timezone: Number(timezone) || 5.5
    });

    if (externalResult) {
      accurateHoroscope.rawVendorResponse = externalResult;
      accurateHoroscope.meta.source = dataSource;
    }

    return res.status(200).json({
      success: true,
      provider: dataSource,
      data: accurateHoroscope
    });

  } catch (error) {
    console.error('[Madanology Error] Chart Generation Failed:', error);
    return res.status(500).json({
      success: false,
      error: 'ஜாதகம் கணிப்பதில் எதிர்பாராத பிழை ஏற்பட்டது (An unexpected error occurred).',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Production Hosting: Detect and serve frontend/dist
 */
const possibleDistPaths = [
  path.resolve(__dirname, '../frontend/dist'),
  path.resolve(process.cwd(), 'frontend/dist'),
  path.resolve(process.cwd(), 'dist')
];

let activeDistPath = possibleDistPaths.find(p => fs.existsSync(p));

if (activeDistPath) {
  console.log(`[Madanology] Serving static frontend from: ${activeDistPath}`);
  app.use(express.static(activeDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(activeDistPath, 'index.html'));
  });
} else {
  console.log(`[Madanology] Frontend dist directory not found. Running in API-only mode.`);
}

// Start server listening on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================================`);
  console.log(`  MADANOLOGY HIGH-PRECISION VEDIC ENGINE`);
  console.log(`  Listening on 0.0.0.0:${PORT}`);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`=================================================`);
});

module.exports = app;
