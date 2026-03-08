# 💻 She Built This — Women's Day 2026

> An interactive web experience celebrating the women who coded, engineered, and invented the world we live in — and giving every woman, known or unknown, the recognition she deserves.

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

## ✨ Features — 5 Tabs

### 🏛️ Tab 1 — Global Pioneers
An interactive animated timeline of 7 women who shaped technology — from Ada Lovelace (1843) to Reshma Saujani (2012). Cards animate in with a staggered reveal on page load. Click any card to open a full detail modal with biography, quote, and legacy. A live Canvas API particle background runs behind the entire app — 60 floating particles drawn at 60fps with no external library.

### 🇮🇳 Tab 2 — Made in India
A dedicated section honouring 8 Indian women who redefined science, technology, and society — from the streets of Haryana to the surface of Mars. Displayed as a CSS grid of interactive cards, each opening a rich detail modal with the woman's full story, achievements, and legacy. The "Made in India" heading uses a CSS gradient in India's tricolor (saffron, white, green).

| Name | Achievement |
|------|------------|
| Kalpana Chawla | First Indian woman in space |
| Tessy Thomas | Led India's Agni-IV & V missile projects |
| Ritu Karidhal | Mission Director, Mangalyaan (Mars Orbiter) |
| Muthayya Vanitha | First woman Project Director of a major ISRO mission |
| Sudha Murthy | First woman engineer at TATA; co-founded Infosys |
| Priya Natarajan | Created the first dark matter maps of the universe |
| Neena Gupta | Solved a 70-year-old unsolved maths problem |
| Falguni Nayar | Founded Nykaa at 50 — India's first profitable women-led unicorn |

### 🌸 Tab 3 — Her Story Wall
A community wall where anyone can share a story about any woman who moved their world — a mother, teacher, colleague, grandmother, or themselves. No Nobel Prize required. Stories are displayed as a masonry card grid, sortable by "Recent" or "Most Loved". Users can ❤️ any story. A rotating writing prompt helps people think before they share. The submission form validates input and gives a warm confirmation on success.

### 🧠 Tab 4 — Who Said This? (Quiz)
6 rounds of quote-based questions drawn from all 15 women across both the Global Pioneers and Made in India tabs. Each round shows a quote with 4 shuffled options, a progress bar, and live score tracking. Correct/wrong answers are colour-coded instantly. The results screen shows a full breakdown of every answer with corrections. Fully replayable with reshuffled questions every time.

### 🛡️ Tab 5 — Safety & Awareness
Real resources for real situations. Includes a one-tap SOS button that grabs the user's GPS location and copies a ready-to-send emergency message to clipboard (shareable via WhatsApp or SMS), 5 India-focused helplines with direct call links, expandable accordion cards covering legal rights (POSH Act, IPC 354, IT Act 66E), what to do during harassment, and how to be an ally. A Web Share API button lets users share the page with someone who needs it.

---

## 📁 Project Structure

```
she-built-this/
├── src/
│   ├── App.jsx                 # Main app — hero, 5-tab nav, routing
│   ├── IndianWomenSection.jsx  # Tab 2 — Made in India grid + modals
│   ├── HerStoryWall.jsx        # Tab 3 — Community story wall + submit form
│   ├── Quiz.jsx                # Tab 4 — Who Said This? quiz engine
│   ├── SafetySection.jsx       # Tab 5 — SOS, helplines, awareness
│   ├── index.css               # All styles — dark theme, animations, responsive
│   └── main.jsx                # React entry point
├── server/
│   ├── index.js                # Express REST API
│   └── package.json
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### Frontend

```bash
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
GET    /api/women               → All 7 global pioneer profiles
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

## 📱 Browser APIs Used

| API | Used For |
|-----|----------|
| `Canvas API` | Particle background — 60 particles drawn at 60fps via `requestAnimationFrame` |
| `Geolocation API` | SOS button — fetches GPS coordinates for the emergency message |
| `Clipboard API` | SOS + helpline copy buttons — silent one-tap clipboard writes |
| `Web Share API` | Share Safety button — native share sheet on mobile |

---

## 🎨 Design Decisions

- **Dark theme** — high contrast lets accent colors pop; feels premium and modern
- **Playfair Display** — editorial serif font adds gravitas to historical names
- **Alternating timeline** — classic UX pattern, cleanly executed in pure CSS
- **Canvas particles** — demonstrates low-level JS skill without any library
- **Staggered animation** — cards reveal sequentially for a polished first impression
- **Tricolor gradient** — India's flag colors (saffron/white/green) on the Made in India heading
- **Her Story Wall** — the most human feature; no credentials required, every woman belongs
- **SOS as a real tool** — genuinely functional on any mobile browser, not decorative

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
B.Tech CSE, VIT | GPA: 8.67  
Full-Stack Developer Intern @ Sarvm.AI    
Stack: React · Node.js · Express · MongoDB · PostgreSQL · Docker · AWS  

[Portfolio](https://portfolio-jwn7.onrender.com) · ptpk2810@gmail.com
