# Madanology (மதனாலஜி) - Vedic Jaathagam & Horoscope Platform

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/SAIRAMSSSS/madanology)

A modern, responsive, mobile-first Vedic Astrology and Horoscope (Jaathagam) web application. Engineered with **React 18**, **Tailwind CSS**, **Node.js/Express**, and high-precision **VSOP87 astronomical ephemeris** with **Chitra Paksha Lahiri Ayanamsha**.

---

## 🌟 Key Features

1. **Clean Slate Input Form (No Prewritten Text)**:
   - Starts completely blank with intuitive placeholders.
   - High-contrast, mobile-safe typography.
   - Includes optional 1-click test buttons for quick verification.
   - Includes an explicit **Hour (01–12)**, **Minute (00–59)**, and **Segmented [ AM ] / [ PM ]** selector.

2. **Crisp Tamil Typography**:
   - Integrated **Google Noto Sans Tamil** font family to prevent broken glyphs or font overlap across all devices.
   - Clear distinction between **ஜென்ம ராசி (Raasi)**, **நட்சத்திரம் (Natchathiram)**, **உதய லக்னம் (Lagna)**, and **திசை இருப்பு (Dasa Balance)**.

3. **Traditional 12-Box South Indian Chart (ராசி கட்டம்)**:
   - **`ராசி (சந்)` Badge**: Highlighted in vibrant Indigo/Purple inside the Moon's sign box so your Raasi is instantly recognizable.
   - **`லக்னம்` Badge**: Highlighted in vibrant Amber/Gold inside the Ascendant box.
   - Fluid, mobile-responsive 4x4 grid with zero text clipping.

4. **120-Year Vimshottari Dasa & Bhukti Timeline (திசா புக்தி கால அட்டவணை)**:
   - **கடந்த திசைகள் (Past Dasas)** with completion badges.
   - **தற்போதைய திசை (Present Dasa)** with dynamic progress bar and active **புக்தி (Bhukti)**.
   - **எதிர்வரும் திசைகள் (Upcoming Dasas)** with future dates and age brackets.

5. **100% Hostable Architecture**:
   - **Single Unified Command**: Express serves both the API and the production-built React frontend on port 5000.
   - **1-Click Render Deploy**: Click the button above to deploy for free.

---

## 🚀 1-Click Instant Cloud Deployment (Option A - Render)

Deploy your application for free on Render in 1 minute:

1. Click here: **[Deploy Madanology to Render](https://render.com/deploy?repo=https://github.com/SAIRAMSSSS/madanology)**
2. Render reads [`render.yaml`](render.yaml) automatically:
   - **Build Command**: `npm run postinstall && npm run build`
   - **Start Command**: `npm start`
3. Click **Apply / Deploy**. Your app will be live 24/7 on `https://madanology-vedic.onrender.com`!

---

## 💻 Local Execution

### Production Unified Server
```bash
npm run build
npm start
```
Open `http://localhost:5000`.

### Development Mode with Hot Reload
**Terminal 1:** `cd backend && npm run dev`
**Terminal 2:** `cd frontend && npm run dev`
Open `http://localhost:5173`.
