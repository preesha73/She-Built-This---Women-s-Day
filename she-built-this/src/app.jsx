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

// ─── Feminine Background ─────────────────────────────────────────────────────
function FeminineBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Twinkling stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.3 + 0.2,
      base: Math.random() * 0.55 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.025 + 0.006,
      color: ["#ffffff","#ffe0f0","#e8d6ff","#d6f0ff","#ffd6e8"][Math.floor(Math.random() * 5)],
      sparkle: Math.random() > 0.85,
    }));

    // Drifting sakura petals
    const PETAL_COLORS = ["#f9a8d4","#fbcfe8","#fce7f3","#e9d5ff","#ddd6fe","#c4b5fd","#fda4af"];
    const petals = Array.from({ length: 32 }, () => ({
      x: Math.random(), y: Math.random(),
      size: Math.random() * 8 + 4,
      dx: (Math.random() - 0.5) * 0.0003,
      dy: Math.random() * 0.00022 + 0.00007,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.014,
      sway: Math.random() * 0.00035 + 0.0001,
      swayPhase: Math.random() * Math.PI * 2,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      alpha: Math.random() * 0.4 + 0.15,
    }));

    // Soft bokeh orbs
    const orbs = Array.from({ length: 16 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 70 + 25,
      alpha: Math.random() * 0.045 + 0.01,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.002,
      color: ["#f9a8d4","#c4b5fd","#93c5fd","#6ee7b7","#fde68a","#fda4af"][Math.floor(Math.random() * 6)],
    }));

    // Shooting stars
    const shooters = [];
    const spawnShooter = () => {
      shooters.push({ x: Math.random() * 0.55, y: Math.random() * 0.35, len: 100 + Math.random() * 70, alpha: 1 });
      setTimeout(spawnShooter, 3500 + Math.random() * 4500);
    };
    setTimeout(spawnShooter, 1800);

    // 4-point sparkle star
    const drawSparkle = (cx, cy, r, alpha, color) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.translate(cx, cy);
      for (let a = 0; a < 4; a++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 2.5, r * 0.45, (a * Math.PI) / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Petal shape
    const drawPetal = (p, W, H) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x * W, p.y * H);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(-p.size * 0.65, 0);
      ctx.lineTo(p.size * 0.65, 0);
      ctx.stroke();
      ctx.restore();
    };

    let t = 0;
    const draw = (ts) => {
      t = ts * 0.001;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Bokeh
      orbs.forEach((o) => {
        const pulse = o.alpha + Math.sin(t * o.speed * 60 + o.phase) * 0.012;
        ctx.globalAlpha = Math.max(0, pulse);
        const g = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, o.r);
        g.addColorStop(0, o.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x * W, o.y * H, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Stars
      stars.forEach((s) => {
        const alpha = s.base + Math.sin(t * s.speed * 60 + s.phase) * 0.28;
        if (alpha <= 0) return;
        if (s.sparkle) {
          drawSparkle(s.x * W, s.y * H, s.r * 1.5, alpha, s.color);
        } else {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      // Shooting stars
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        const g = ctx.createLinearGradient(s.x * W, s.y * H, s.x * W + s.len, s.y * H + s.len * 0.28);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(0.5, `rgba(249,168,212,${s.alpha * 0.55})`);
        g.addColorStop(1, `rgba(255,255,255,${s.alpha * 0.85})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x * W, s.y * H);
        ctx.lineTo(s.x * W + s.len, s.y * H + s.len * 0.28);
        ctx.stroke();
        s.x += 3.5 / W; s.y += 1.0 / H; s.alpha *= 0.962;
        if (s.alpha < 0.02) shooters.splice(i, 1);
      }

      // Petals
      petals.forEach((p) => {
        p.x += p.dx + Math.sin(t * 0.38 + p.swayPhase) * p.sway;
        p.y += p.dy;
        p.rotation += p.rotSpeed;
        if (p.y > 1.06) { p.y = -0.06; p.x = Math.random(); }
        if (p.x < -0.06) p.x = 1.06;
        if (p.x > 1.06) p.x = -0.06;
        drawPetal(p, W, H);
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─── Aurora Blobs ────────────────────────────────────────────────────────────
function AuroraBlobs() {
  return (
    <>
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
    </>
  );
}

// ─── Mouse Glow ──────────────────────────────────────────────────────────────
function MouseGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="mouse-glow" />;
}

// ─── Scroll Progress ─────────────────────────────────────────────────────────
function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={barRef} className="scroll-progress" />;
}

// ─── Card Sparkle Hook ───────────────────────────────────────────────────────
function useCardSparkle(cardRef) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const cnv = canvasRef.current;
    if (!card || !cnv) return;
    const cc = cnv.getContext("2d");

    const resize = () => { cnv.width = card.offsetWidth; cnv.height = card.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const SPARK_COLORS = ["#F48FB1","#CE93D8","#90CAF9","#FFCC80","#ffffff","#fbcfe8","#c4b5fd","#fda4af"];

    const addSparks = (x, y) => {
      for (let i = 0; i < 6; i++) {
        sparksRef.current.push({
          x, y,
          vx: (Math.random() - 0.5) * 3.2,
          vy: (Math.random() - 0.5) * 3.2 - 1,
          r: Math.random() * 2.8 + 0.8,
          alpha: 1,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        });
      }
    };

    const animate = () => {
      cc.clearRect(0, 0, cnv.width, cnv.height);
      sparksRef.current = sparksRef.current.filter((s) => s.alpha > 0.03);
      sparksRef.current.forEach((s) => {
        cc.globalAlpha = s.alpha;
        cc.fillStyle = s.color;
        cc.beginPath();
        cc.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        cc.fill();
        cc.save();
        cc.translate(s.x, s.y);
        cc.rotate(s.alpha * 4);
        cc.globalAlpha = s.alpha * 0.5;
        for (let a = 0; a < 4; a++) {
          cc.beginPath();
          cc.ellipse(0, 0, s.r * 3, s.r * 0.4, (a * Math.PI) / 2, 0, Math.PI * 2);
          cc.fill();
        }
        cc.restore();
        s.x += s.vx; s.y += s.vy;
        s.vy += 0.055;
        s.alpha *= 0.91;
      });
      cc.globalAlpha = 1;
      if (sparksRef.current.length > 0) rafRef.current = requestAnimationFrame(animate);
      else rafRef.current = null;
    };

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      addSparks(e.clientX - rect.left, e.clientY - rect.top);
      if (!rafRef.current) animate();
    };
    const onLeave = () => { sparksRef.current = []; };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cardRef]);

  return canvasRef;
}

// ─── Timeline Node ────────────────────────────────────────────────────────────
function TimelineNode({ woman, index, isSelected, onClick, isVisible }) {
  const isLeft = index % 2 === 0;
  const cardRef = useRef(null);
  const sparkCanvasRef = useCardSparkle(cardRef);

  return (
    <div
      className={`timeline-item ${isVisible ? "visible" : ""} ${isLeft ? "left" : "right"}`}
      style={{ "--delay": `${index * 0.12}s`, "--accent": woman.color }}
    >
      <div
        ref={cardRef}
        className="timeline-card"
        onClick={() => onClick(woman)}
        style={{ borderColor: isSelected ? woman.color : "transparent" }}
      >
        <canvas
          ref={sparkCanvasRef}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "16px", zIndex: 3 }}
        />
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

// ─── Detail Panel ─────────────────────────────────────────────────────────────
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
      <ScrollProgress />
      <FeminineBackground />
      <AuroraBlobs />
      <MouseGlow />

      <div className="content">
        <header className="hero">
          <div className="hero-tag">
            <span className="hero-tag-shimmer" />
            ✦ International Women's Day 2026 ✦
          </div>
          <h1 className="hero-title">
            She <span className="hero-built" data-text="Built">Built</span> This
          </h1>
          <p className="hero-sub">
            The women who coded, engineered, and invented the world you live in.
          </p>
        </header>

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