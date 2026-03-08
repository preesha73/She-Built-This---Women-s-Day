# 💻 She Built This — Women's Day 2026

> An interactive timeline celebrating the women who coded, engineered, and invented the world we live in.

Built by **Preesha Vashisth** as part of the ExpertHire Women's Day Full-Stack Developer Intern assessment.

---

## 🚀 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, CSS3 Animations |
| Backend | Node.js, Express.js |
| State | React Hooks (useState, useEffect, useRef) |
| Animation | Canvas API, CSS keyframes |
| Fonts | Google Fonts (Playfair Display + DM Sans) |

---

## ✨ Features

- **Interactive Timeline** — 7 pioneering women from 1843 to 2012, animated stagger on load
- **Detail Modal** — Click any card to see full biography, quote, and legacy
- **Canvas Particle Background** — Living, breathing particle field built with raw Canvas API
- **Responsive Design** — Works on mobile, tablet, and desktop
- **REST API** — Full Express backend with 5 endpoints

---

## 📁 Project Structure

```
she-built-this/
├── src/
│   ├── App.jsx          # Main React component (Timeline, Cards, Modal)
│   ├── index.css        # All styles (dark theme, animations, responsive)
│   └── main.jsx         # React entry point
├── server/
│   ├── index.js         # Express server with REST API
│   └── package.json     # Server dependencies
├── index.html
├── vite.config.js
└── package.json
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

### Backend (optional, shows full-stack)

```bash
cd server
npm install
npm run dev
# → http://localhost:3001
```

---

## 🔌 API Endpoints

```
GET  /api/health           → Server health check
GET  /api/women            → All 7 women profiles
GET  /api/women/:id        → Single profile by ID
GET  /api/women?field=NASA → Filter by field
GET  /api/nominations      → Community nominations
POST /api/nominations      → Add a new nomination
DELETE /api/nominations/:id → Remove a nomination
GET  /api/stats            → Project statistics
```

### Example POST body:
```json
{
  "name": "Katherine Johnson",
  "reason": "NASA mathematician whose calculations sent astronauts to the moon.",
  "submittedBy": "Preesha"
}
```

---

## 🎨 Design Decisions

- **Dark theme** — Lets colors pop; feels premium and modern
- **Playfair Display** — Serif editorial font adds gravitas to historical names
- **Alternating timeline** — Classic UX pattern executed with clean CSS
- **Canvas particles** — Shows low-level JS skills without a library
- **Staggered animation** — Each card animates in sequence for a polished reveal

---

## 👩‍💻 About the Developer

**Preesha Vashisth**  
B.Tech CSE, Vellore Institute of Technology | GPA: 8.67  
Full-Stack Developer Intern @ Sarvm.AI  
Stack: React · Node.js · Express · MongoDB · PostgreSQL · Docker  

[Portfolio](https://portfolio-jwn7.onrender.com) · ptpk2810@gmail.com