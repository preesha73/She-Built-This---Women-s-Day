import { useState } from "react";

const helplines = [
  {
    name: "NCW Helpline",
    number: "7827170170",
    desc: "National Commission for Women — 24/7 support for violence & harassment",
    icon: "🏛️",
    color: "#C2185B",
  },
  {
    name: "Women Helpline",
    number: "1091",
    desc: "National Women's Emergency Helpline — immediate danger or assault",
    icon: "🚨",
    color: "#B71C1C",
  },
  {
    name: "iCall",
    number: "9152987821",
    desc: "TISS psychosocial helpline — emotional support, counselling, trauma",
    icon: "🧠",
    color: "#4527A0",
  },
  {
    name: "Vandrevala Foundation",
    number: "1860-2662-345",
    desc: "24/7 mental health crisis support — free and confidential",
    icon: "💜",
    color: "#6A1B9A",
  },
  {
    name: "Cyber Crime Helpline",
    number: "1930",
    desc: "Report online harassment, stalking, morphed images, cyberbullying",
    icon: "💻",
    color: "#1565C0",
  },
];

const awarenessCards = [
  {
    icon: "👁️",
    title: "What Counts as Harassment",
    color: "#C2185B",
    points: [
      "Unwanted comments on appearance or body",
      "Following, staring, or persistent unwanted contact",
      "Unsolicited messages or explicit images",
      "Being touched without consent — anywhere",
      "Threats, intimidation, or public humiliation",
      "Workplace quid pro quo (favours for silence)",
    ],
  },
  {
    icon: "⚖️",
    title: "Your Legal Rights (India)",
    color: "#1565C0",
    points: [
      "POSH Act 2013 — mandatory ICC in every 10+ employee workplace",
      "IPC 354 — criminal penalty for assault or outraging modesty",
      "IPC 509 — words or gestures intended to insult a woman",
      "IT Act 66E/67 — cyberstalking and non-consensual image sharing",
      "File an FIR — police must register it under Section 154 CrPC",
      "You can file online at cybercrime.gov.in",
    ],
  },
  {
    icon: "🛡️",
    title: "What To Do In The Moment",
    color: "#2E7D32",
    points: [
      "Trust your gut — if it feels wrong, it probably is",
      "Say it out loud: 'Stop. This is harassment.'",
      "Document everything — screenshots, dates, witnesses",
      "Tell someone you trust immediately",
      "Save evidence before blocking on social media",
      "You are never at fault for someone else's behaviour",
    ],
  },
  {
    icon: "🤝",
    title: "How to Be an Ally",
    color: "#E65100",
    points: [
      "Believe her — most reports are true",
      "Interrupt harassment when you witness it safely",
      "Don't ask 'what were you wearing' — it's never relevant",
      "Amplify her voice in rooms where she's talked over",
      "Check in privately after an incident",
      "Report it even if she doesn't — you saw it too",
    ],
  },
];

// ── SOS Button ─────────────────────────────────────────────────────────────
function SOSButton() {
  const [copied, setCopied] = useState(false);
  const [locating, setLocating] = useState(false);

  const handleSOS = () => {
    setLocating(true);
    const buildMessage = (coords) => {
      const locationPart = coords
        ? `\n📍 My location: https://maps.google.com/?q=${coords.latitude},${coords.longitude}`
        : "\n📍 Location unavailable — please call me immediately.";
      return `🆘 EMERGENCY — I need help right now.${locationPart}\nPlease contact me or call 112 / Women's Helpline: 1091`;
    };

    const copy = (msg) => {
      navigator.clipboard.writeText(msg).then(() => {
        setCopied(true);
        setLocating(false);
        setTimeout(() => setCopied(false), 4000);
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => copy(buildMessage(pos.coords)),
        () => copy(buildMessage(null)),
        { timeout: 5000 }
      );
    } else {
      copy(buildMessage(null));
    }
  };

  return (
    <div className="sos-wrapper">
      <button
        className={`sos-btn ${locating ? "locating" : ""} ${copied ? "copied" : ""}`}
        onClick={handleSOS}
        disabled={locating}
      >
        <span className="sos-icon">{copied ? "✅" : locating ? "📍" : "🆘"}</span>
        <span className="sos-label">
          {copied ? "Copied! Share via WhatsApp or SMS" : locating ? "Getting location…" : "SOS — Copy Emergency Message"}
        </span>
      </button>
      <p className="sos-hint">
        One tap copies a ready-to-send message with your location. Paste it into WhatsApp, SMS, or any app.
      </p>
    </div>
  );
}

// ── Helpline Card ────────────────────────────────────────────────────────────
function HelplineCard({ h }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(h.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="helpline-card" style={{ "--hcolor": h.color }}>
      <div className="helpline-icon">{h.icon}</div>
      <div className="helpline-info">
        <div className="helpline-name" style={{ color: h.color }}>{h.name}</div>
        <div className="helpline-desc">{h.desc}</div>
      </div>
      <div className="helpline-actions">
        <a href={`tel:${h.number}`} className="helpline-btn call" style={{ background: h.color }}>
          📞 {h.number}
        </a>
        <button className="helpline-btn copy" onClick={copy}>
          {copied ? "✅" : "Copy"}
        </button>
      </div>
    </div>
  );
}

// ── Awareness Card ───────────────────────────────────────────────────────────
function AwarenessCard({ card }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`awareness-card ${open ? "open" : ""}`}
      style={{ "--acolor": card.color }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="awareness-header">
        <span className="awareness-icon">{card.icon}</span>
        <span className="awareness-title">{card.title}</span>
        <span className="awareness-chevron">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <ul className="awareness-list">
          {card.points.map((p, i) => (
            <li key={i} className="awareness-point">
              <span className="awareness-dot" style={{ background: card.color }} />
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────
export default function SafetySection() {
  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: "She Built This — Women's Safety Resources",
        text: "Important safety resources, helplines, and harassment awareness for women.",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied! Share it with someone who needs it.");
    }
  };

  return (
    <section className="safety-section">
      {/* Header */}
      <div className="safety-header">
        <div className="safety-tag">Women's Safety</div>
        <h2 className="safety-title">You Are Not Alone</h2>
        <p className="safety-sub">
          Real resources, real rights, real actions. Because knowing is the first step to safety.
        </p>
      </div>

      {/* SOS */}
      <div className="safety-block">
        <div className="block-label">⚡ Emergency</div>
        <SOSButton />
      </div>

      {/* Helplines */}
      <div className="safety-block">
        <div className="block-label">📞 Helplines — India</div>
        <div className="helplines-list">
          {helplines.map((h) => (
            <HelplineCard key={h.name} h={h} />
          ))}
        </div>
      </div>

      {/* Awareness */}
      <div className="safety-block">
        <div className="block-label">📚 Know Your Rights & Resources</div>
        <div className="awareness-grid">
          {awarenessCards.map((c) => (
            <AwarenessCard key={c.title} card={c} />
          ))}
        </div>
      </div>

      {/* Share */}
      <div className="safety-share">
        <p className="share-text">Know someone who needs this? Share this page.</p>
        <button className="share-btn" onClick={share}>
          🔗 Share Safety Resources
        </button>
      </div>
    </section>
  );
}