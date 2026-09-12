# Madanology (மதனாலஜி) - Vedic Jaathagam & Horoscope Platform

A modern, responsive, mobile-first Vedic Astrology and Horoscope (Jaathagam) web application. Engineered with **React 18**, **Tailwind CSS**, **Node.js/Express**, and high-precision **VSOP87 astronomical ephemeris** with **Chitra Paksha Lahiri Ayanamsha**.

---

## 🌟 Key Features

1. **Clean Slate Input Form (No Prewritten Text)**:
   - Starts completely blank with intuitive placeholders.
   - High-contrast, mobile-safe typography.
   - Includes optional 1-click test buttons for quick verification.
   - Includes an explicit **Hour (01–12)**, **Minute (00–59)**, and **Segmented [ AM ] / [ PM ]** selector.

2. **Crisp Tamil Typography**:
   - Integrated **Google Noto Sans Tamil** font family to prevent broken glyphs or font overlap across all devices (iOS Safari, Android Chrome, Windows, Linux, macOS).
   - Clear distinction between **ஜென்ம ராசி (Raasi)**, **நட்சத்திரம் (Natchathiram)**, **உதய லக்னம் (Lagna)**, and **திசை இருப்பு (Dasa Balance)**.

3. **Traditional 12-Box South Indian Chart (ராசி கட்டம்)**:
   - **`ராசி (சந்)` Badge**: Highlighted in vibrant Indigo/Purple inside the Moon's sign box so your Raasi is instantly recognizable.
   - **`லக்னம்` Badge**: Highlighted in vibrant Amber/Gold inside the Ascendant box.
   - Fluid, mobile-responsive 4x4 grid with zero text clipping.

4. **100% Hostable Architecture**:
   - **Single Unified Command**: The Express backend is configured to serve the production-built React frontend from `frontend/dist`.
   - **Docker Ready**: Multi-stage `Dockerfile` included for instant container deployments.
   - **Render / Railway / Cloud Blueprints**: `render.yaml` and `vercel.json` included.

---

## 📁 Project Structure

```text
madanology/
├── Dockerfile                  # Multi-stage production container build
├── package.json                # Root package.json (build & run scripts)
├── render.yaml                 # 1-Click Render Cloud deployment blueprint
├── README.md                   # Documentation
├── backend/
│   ├── .env                    # Active backend environment variables
│   ├── .env.example            # Template with Vedic API configuration
│   ├── package.json            # Express, Axios, CORS, Astronomy-Engine
│   ├── server.js               # API Server & static frontend host
│   └── astroEngine.js          # High-precision VSOP87 & Lahiri engine
└── frontend/
    ├── .env                    # Frontend environment
    ├── index.html              # Shell with Noto Sans Tamil & Inter fonts
    ├── package.json            # React 18, Vite, Tailwind CSS, Lucide Icons
    ├── tailwind.config.js      # Tamil fonts & Vedic colors
    ├── vite.config.js          # Vite config with /api reverse proxy
    ├── vercel.json             # Vercel deployment rewrites
    └── src/
        ├── App.jsx             # Main orchestrator & result view
        ├── index.css           # Mobile-responsive 4x4 chart grid styling
        ├── components/
        │   ├── Header.jsx          # Madanology brand header
        │   ├── JaathagamForm.jsx   # Clean slate input form (AM/PM picker)
        │   ├── PlaceAutocomplete.jsx # Tamil Nadu & Indian city autocompleter
        │   ├── LoadingSkeleton.jsx # Celestial cosmic loading screen
        │   ├── SouthIndianChart.jsx# Authentic South Indian Rasi Chakram
        │   ├── PlanetaryTable.jsx  # Graha Spashtas & status table
        │   └── PanchangamSummary.jsx # Tamil Raasi, Natchathiram, Lagna & Dasa
        └── utils/
            └── samplePresets.js    # Tamil Nadu 38 districts & presets
```

---

## 🚀 How to Run Locally

### Option A: Unified Server (Recommended)
Builds frontend and starts both frontend and backend on port 5000:
```bash
cd /home/senju/Documents/madanology
npm run postinstall
npm run build
npm start
```
Open **`http://localhost:5000`** in your browser.

### Option B: Development Mode with Hot Reload
**Terminal 1 (Backend):**
```bash
cd /home/senju/Documents/madanology/backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd /home/senju/Documents/madanology/frontend
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## ☁️ How to Host (Cloud Deployment)

### 1. Render (Free Web Service)
1. Push this repository to GitHub.
2. In Render, create a new **Web Service** pointing to your repository (or use the included `render.yaml` Blueprint).
3. Set:
   - **Build Command**: `npm run postinstall && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

### 2. Docker Container
```bash
cd /home/senju/Documents/madanology
docker build -t madanology:latest .
docker run -p 5000:5000 madanology:latest
```
Open **`http://localhost:5000`**.

### 3. Railway / Heroku / Fly.io / VPS
Simply run `npm run build && npm start`. The server automatically listens to `process.env.PORT || 5000` on `0.0.0.0`.
