# 💻 She Built This — Women's Day 2025

> An interactive web experience celebrating the women who coded, engineered, and invented the world we live in — and giving every woman the safety resources she deserves.

Built by **Preesha Vashisth** as part of the ExpertHire Women's Day Full-Stack Developer Intern assessment.

---

## 🚀 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, CSS3 Animations |
| Backend | Node.js, Express.js |
| State Management | React Hooks (useState, useEffect, useRef) |
| Browser APIs | Canvas API, Geolocation API, Clipboard API, Web Share API |
| Fonts | Google Fonts — Playfair Display + DM Sans |

---

## ✨ Features

### 🏛️ Tab 1 — Pioneers Timeline
- Interactive animated timeline of 7 women who shaped technology — from Ada Lovelace (1843) to Reshma Saujani (2012)
- Staggered card reveal animation on page load using `setTimeout` + `useState`
- Click any card to open a full detail modal with biography, quote, and legacy
- Live Canvas API particle background — 60 floating particles drawn at 60fps with no external library

### 🛡️ Tab 2 — Safety & Awareness
- **SOS Button** — one tap grabs the user's GPS coordinates via the Geolocation API, builds a ready-to-send emergency message with a Google Maps link, and copies it to clipboard instantly via the Clipboard API. Shareable via WhatsApp or SMS in seconds.
- **Helplines** — 5 India-focused emergency and mental health helplines (NCW, Women's Helpline 1091, iCall, Vandrevala Foundation, Cyber Crime Helpline) with one-tap calling and copy-to-clipboard
- **Know Your Rights** — accordion cards covering what counts as harassment, legal rights under Indian law (POSH Act, IPC 354, IT Act 66E), what to do in the moment, and how to be an ally
- **Share Safety** — uses the Web Share API to let users share the page with someone who needs it

---

## 📁 Project Structure

```
she-built-this/
├── src/
│   ├── App.jsx            # Main app — hero, tab nav, timeline, modal
│   ├── SafetySection.jsx  # Safety tab — SOS, helplines, awareness accordions
│   ├── index.css          # All styles — dark theme, animations, responsive
│   └── main.jsx           # React entry point
├── server/
│   ├── index.js           # Express REST API
│   └── package.json       # Server dependencies
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### Frontend

```bash
# In project root
npm install
npm run dev
# → http://localhost:5173
```

### Backend

```bash
cd server
npm install
npm run dev
# → http://localhost:3001
```

---

## 🔌 API Endpoints

```
GET    /api/health              → Server health check
GET    /api/women               → All 7 women profiles
GET    /api/women/:id           → Single profile by ID
GET    /api/women?field=NASA    → Filter by field
GET    /api/nominations         → Community nominations
POST   /api/nominations         → Submit a new nomination
DELETE /api/nominations/:id     → Remove a nomination
GET    /api/stats               → Project statistics
```

### Example — POST a nomination:
```json
{
  "name": "Katherine Johnson",
  "reason": "NASA mathematician whose calculations sent astronauts to the moon.",
  "submittedBy": "Preesha"
}
```

---

## 🎨 Design Decisions

- **Dark theme** — high contrast lets colors pop; feels premium and modern
- **Playfair Display** — editorial serif font adds gravitas to historical names
- **Alternating timeline** — classic UX pattern executed cleanly in pure CSS
- **Canvas particles** — demonstrates low-level JS skill without any library dependency
- **Staggered animation** — cards reveal sequentially for a polished first impression
- **SOS as a real tool** — not a decorative feature; works on any mobile browser

---

## 📱 Browser APIs Used

| API | Used For |
|-----|----------|
| `Canvas API` | Particle background — drawn at 60fps with `requestAnimationFrame` |
| `Geolocation API` | SOS button — fetches GPS coordinates for emergency message |
| `Clipboard API` | SOS + helpline copy buttons — instant clipboard writes |
| `Web Share API` | Share Safety button — native share sheet on mobile |

---

## 🇮🇳 Safety Resources Included

| Resource | Number | Purpose |
|----------|--------|---------|
| NCW Helpline | 7827170170 | National Commission for Women |
| Women Helpline | 1091 | National emergency helpline |
| iCall (TISS) | 9152987821 | Psychosocial & trauma counselling |
| Vandrevala Foundation | 1860-2662-345 | 24/7 mental health crisis support |
| Cyber Crime Helpline | 1930 | Online harassment & cyberstalking |

---

## 👩‍💻 About the Developer

**Preesha Vashisth**
B.Tech CSE, Vellore Institute of Technology | GPA: 8.67
Full-Stack Developer Intern @ Sarvm.AI
Stack: React · Node.js · Express · MongoDB · PostgreSQL · Docker · AWS

[Portfolio](https://portfolio-jwn7.onrender.com) · ptpk2810@gmail.com
