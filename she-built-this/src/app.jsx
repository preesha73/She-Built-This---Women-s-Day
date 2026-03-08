import { useState, useEffect, useRef } from "react";
import SafetySection from "./SafetySection";
import IndianWomenSection from "./Indianwomensection";
import HerStoryWall from "./Herstorywall";
import Quiz from "./quiz";

const women = [
  {
    id: 1, year: "1843", name: "Ada Lovelace", title: "World's First Programmer",
    field: "Mathematics & Computing", color: "#C2185B", accent: "#F48FB1", icon: "⚙️",
    contribution: "Wrote the first algorithm intended to be processed by a machine — a century before computers existed. Her notes on Babbage's Analytical Engine are considered the first computer program.",
    quote: "That brain of mine is something more than merely mortal.",
    impact: "Founded the entire discipline of computer programming.",
  },
  {
    id: 2, year: "1906", name: "Grace Hopper", title: "Mother of COBOL",
    field: "Computer Science & Navy", color: "#1565C0", accent: "#90CAF9", icon: "🖥️",
    contribution: "Invented the first compiler — a tool that translates human-readable code into machine code. She also popularized the term 'debugging' and led development of COBOL, the language that still runs global banking today.",
    quote: "The most dangerous phrase in the language is 'we've always done it this way.'",
    impact: "Made programming accessible to non-mathematicians worldwide.",
  },
  {
    id: 3, year: "1936", name: "Margaret Hamilton", title: "Software Engineering Pioneer",
    field: "NASA & Space Computing", color: "#2E7D32", accent: "#A5D6A7", icon: "🚀",
    contribution: "Led the team that developed the on-board flight software for NASA's Apollo missions. Her error-detection code saved Apollo 11 from aborting mid-mission. She coined the term 'software engineering.'",
    quote: "There was no choice but to be pioneers.",
    impact: "Her software landed humans on the moon.",
  },
  {
    id: 4, year: "1958", name: "Annie Easley", title: "NASA Rocket Scientist",
    field: "Aerospace & Computing", color: "#E65100", accent: "#FFCC80", icon: "🛸",
    contribution: "Developed and implemented code for NASA's Centaur rocket — the technology that now powers modern satellite launches. As one of NASA's first Black employees, she also mentored underrepresented groups throughout her career.",
    quote: "My mother had always told us — you can be anything you want to be.",
    impact: "Propulsion code she wrote still powers space missions today.",
  },
  {
    id: 5, year: "1972", name: "Radia Perlman", title: "Mother of the Internet",
    field: "Network Engineering", color: "#4527A0", accent: "#CE93D8", icon: "🌐",
    contribution: "Invented the Spanning Tree Protocol (STP), the foundational algorithm that allows modern network bridges to work. Without her invention, the internet as we know it could not function.",
    quote: "I'm not comfortable with the 'mother of the internet' title.",
    impact: "Every data packet on the internet uses her protocol.",
  },
  {
    id: 6, year: "1993", name: "Hedy Lamarr", title: "Inventor of WiFi & Bluetooth",
    field: "Wireless Communication", color: "#00695C", accent: "#80CBC4", icon: "📡",
    contribution: "Co-invented frequency-hopping spread spectrum technology during WWII. This exact technology became the foundation of WiFi, Bluetooth, and GPS — technologies we all use daily.",
    quote: "Films have a certain place in a certain time period. Technology is forever.",
    impact: "Her patent forms the backbone of all modern wireless communication.",
  },
  {
    id: 7, year: "2012", name: "Reshma Saujani", title: "Closing the Gender Gap",
    field: "Education & Advocacy", color: "#AD1457", accent: "#F48FB1", icon: "💻",
    contribution: "Founded Girls Who Code, an organization that has taught over 500,000 girls to code across 50 states and 6 countries. She's directly responsible for reshaping the gender ratio in tech.",
    quote: "Teach girls bravery, not perfection.",
    impact: "500,000+ girls trained. Closing tech's gender gap one coder at a time.",
  },
];

function ParticleBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4, dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        color: ["#F48FB1", "#CE93D8", "#90CAF9", "#FFCC80"][Math.floor(Math.random() * 4)],
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function TimelineNode({ woman, index, isSelected, onClick, isVisible }) {
  const isLeft = index % 2 === 0;
  return (
    <div className={`timeline-item ${isVisible ? "visible" : ""} ${isLeft ? "left" : "right"}`}
      style={{ "--delay": `${index * 0.12}s`, "--accent": woman.color }}>
      <div className="timeline-card" onClick={() => onClick(woman)}
        style={{ borderColor: isSelected ? woman.color : "transparent" }}>
        <div className="card-year" style={{ color: woman.accent }}>{woman.year}</div>
        <div className="card-icon">{woman.icon}</div>
        <div className="card-name">{woman.name}</div>
        <div className="card-title">{woman.title}</div>
        <div className="card-field" style={{ color: woman.accent }}>{woman.field}</div>
        {isSelected && <div className="card-selected-indicator" style={{ background: woman.color }} />}
      </div>
      <div className="timeline-dot" style={{ background: woman.color, boxShadow: `0 0 20px ${woman.color}88` }} />
    </div>
  );
}

function DetailPanel({ woman, onClose }) {
  if (!woman) return null;
  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}
        style={{ "--wcolor": woman.color, "--waccent": woman.accent }}>
        <button className="detail-close" onClick={onClose}>✕</button>
        <div className="detail-header">
          <div className="detail-icon">{woman.icon}</div>
          <div>
            <div className="detail-year" style={{ color: woman.accent }}>{woman.year}</div>
            <div className="detail-name">{woman.name}</div>
            <div className="detail-role">{woman.title}</div>
            <div className="detail-field" style={{ color: woman.accent }}>{woman.field}</div>
          </div>
        </div>
        <div className="detail-divider" style={{ background: `linear-gradient(90deg, ${woman.color}, transparent)` }} />
        <div className="detail-section">
          <div className="detail-label">CONTRIBUTION</div>
          <div className="detail-text">{woman.contribution}</div>
        </div>
        <blockquote className="detail-quote" style={{ borderColor: woman.color }}>
          <span style={{ color: woman.accent }}>"</span>{woman.quote}<span style={{ color: woman.accent }}>"</span>
        </blockquote>
        <div className="detail-impact" style={{ background: `${woman.color}22`, borderLeft: `3px solid ${woman.color}` }}>
          <div className="detail-label">LEGACY</div>
          <div className="detail-impact-text">{woman.impact}</div>
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id: "timeline", label: "🏛️ Global Pioneers" },
  { id: "india",    label: "🇮🇳 Made in India" },
  { id: "stories",  label: "🌸 Her Story Wall" },
  { id: "quiz",     label: "🧠 Quiz" },
  { id: "safety",   label: "🛡️ Safety" },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState([]);
  const [activeTab, setActiveTab] = useState("timeline");

  useEffect(() => {
    women.forEach((_, i) => {
      setTimeout(() => setVisible((v) => [...v, i]), i * 150 + 300);
    });
  }, []);

  return (
    <div className="app">
      <ParticleBackground />
      <div className="content">

        <header className="hero">
          <div className="hero-tag">International Women's Day 2026</div>
          <h1 className="hero-title">
            She <span className="hero-built">Built</span> This
          </h1>
          <p className="hero-sub">
            The women who coded, engineered, and invented the world you live in.
          </p>
        </header>

        {/* 5-TAB NAVIGATION */}
        <nav className="tab-nav tab-nav-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? "active" : ""} ${t.id === "india" && activeTab === t.id ? "india-tab" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {activeTab === "timeline" && (
          <div className="timeline">
            <div className="timeline-line" />
            {women.map((w, i) => (
              <TimelineNode key={w.id} woman={w} index={i}
                isSelected={selected?.id === w.id}
                onClick={setSelected} isVisible={visible.includes(i)} />
            ))}
          </div>
        )}

        {activeTab === "india"   && <IndianWomenSection />}
        {activeTab === "stories" && <HerStoryWall />}
        {activeTab === "quiz"    && <Quiz />}
        {activeTab === "safety"  && <SafetySection />}

        <footer className="footer">
          <div className="footer-text">
            Built by <strong>Preesha Vashisth</strong> · Women's Day 2026 · React + Node.js
          </div>
          <div className="footer-sub">Full-Stack Developer · VIT Chennai · Sarvm.AI</div>
        </footer>
      </div>

      {activeTab === "timeline" && (
        <DetailPanel woman={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}