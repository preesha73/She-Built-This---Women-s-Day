import { useState } from "react";

const indianWomen = [
  {
    id: 1,
    name: "Kalpana Chawla",
    year: "1962–2003",
    title: "First Indian Woman in Space",
    domain: "Aerospace Engineering",
    color: "#FF6F00",
    accent: "#FFB300",
    icon: "🚀",
    state: "Haryana",
    org: "NASA",
    story:
      "Born in Karnal, Haryana, Kalpana Chawla became the first woman of Indian origin to travel to space. She flew aboard the Space Shuttle Columbia in 1997, logging 376 hours in space. She perished heroically in the Columbia disaster of 2003 on her second mission. Her journey from a small town in India to outer space remains one of the most inspiring stories in human history.",
    quote: "The path from dreams to success does exist. May you have the vision to find it, the courage to get on to that path and the perseverance to follow it.",
    legacy: "Inspired an entire generation of Indian women to pursue science and engineering. Countless schools, universities, and scholarships across India bear her name.",
    impact: ["First Indian woman in space", "376 hours in orbit", "Mission Specialist on STS-87 and STS-107", "Posthumously awarded the Congressional Space Medal of Honor"],
  },
  {
    id: 2,
    name: "Tessy Thomas",
    year: "1963 – present",
    title: "Missile Woman of India",
    domain: "Defence & Missile Technology",
    color: "#1B5E20",
    accent: "#66BB6A",
    icon: "🎯",
    state: "Kerala",
    org: "DRDO",
    story:
      "Known as the 'Missile Woman of India', Dr. Tessy Thomas is the first woman scientist to head a missile project in India. She was the Project Director for Agni-IV and Agni-V — India's most powerful intercontinental ballistic missiles. She shattered the glass ceiling in India's defence establishment, an arena historically dominated by men.",
    quote: "Science has no gender. What matters is your dedication and hard work.",
    legacy: "Proved that women can lead India's most critical and complex defence programmes. Paved the way for women in DRDO and defence R&D.",
    impact: ["Project Director, Agni-IV & Agni-V missiles", "First woman to head a missile project in India", "Lal Bahadur Shastri National Award recipient", "DRDO's Scientist of the Year"],
  },
  {
    id: 3,
    name: "Ritu Karidhal",
    year: "1975 – present",
    title: "Rocket Woman of India",
    domain: "Space & Planetary Science",
    color: "#880E4F",
    accent: "#F48FB1",
    icon: "🛸",
    state: "Uttar Pradesh",
    org: "ISRO",
    story:
      "Ritu Karidhal was the Mission Director of Mangalyaan — India's Mars Orbiter Mission — which made India the first country to reach Mars on its very first attempt in 2014, at a cost lower than the Hollywood film Gravity. She also served as Deputy Operations Director for Chandrayaan-2. She joined ISRO straight out of Lucknow University and worked her way to leading India's most ambitious space missions.",
    quote: "When you love your work, you give it everything you have.",
    legacy: "Made India one of only four space agencies to reach Mars. Chandrayaan missions placed India at the forefront of lunar exploration.",
    impact: ["Mission Director, Mangalyaan (Mars Orbiter Mission)", "Deputy Ops Director, Chandrayaan-2", "India reached Mars on first attempt — a world first", "ISRO Team Achievement Award"],
  },
  {
    id: 4,
    name: "Muthayya Vanitha",
    year: "1969 – present",
    title: "First Woman Project Director of a Satellite Mission",
    domain: "Satellite & Space Technology",
    color: "#1A237E",
    accent: "#90CAF9",
    icon: "🛰️",
    state: "Tamil Nadu",
    org: "ISRO",
    story:
      "M. Vanitha became the first woman Project Director of a major satellite mission in India when she led Chandrayaan-2 in 2019. A data systems expert with over 30 years at ISRO, she was instrumental in designing the communication and data handling systems for multiple Indian satellites. Her appointment alongside Ritu Karidhal as the two women leading Chandrayaan-2 made global headlines.",
    quote: "We worked as a team. Every person who contributed to this mission is equally important.",
    legacy: "Along with Ritu Karidhal, became the face of ISRO's Chandrayaan-2 mission — inspiring millions of young Indian girls to dream of space.",
    impact: ["Project Director, Chandrayaan-2", "First woman to lead a major ISRO satellite mission", "30+ years at ISRO", "Designed data systems for multiple Indian satellites"],
  },
  {
    id: 5,
    name: "Sudha Murthy",
    year: "1950 – present",
    title: "Pioneer Woman Engineer & Philanthropist",
    domain: "Technology & Social Impact",
    color: "#4A148C",
    accent: "#CE93D8",
    icon: "💡",
    state: "Karnataka",
    org: "Infosys Foundation",
    story:
      "Sudha Murthy was the first woman engineer hired at TATA Engineering and Locomotive Company (TELCO) — she wrote directly to JRD Tata protesting a 'men only' job advertisement. She went on to co-found Infosys with her husband N.R. Narayana Murthy, and later built the Infosys Foundation which has donated to over 50,000 libraries, schools, and hospitals across India.",
    quote: "Kindness and compassion are not signs of weakness. They are signs of strength.",
    legacy: "Broke open India's male-dominated engineering industry. The Infosys Foundation has transformed rural education and healthcare across India.",
    impact: ["First woman engineer at TATA Motors (TELCO)", "Co-founder, Infosys", "Chairperson, Infosys Foundation", "Donated to 50,000+ libraries and schools across India", "Padma Bhushan awardee"],
  },
  {
    id: 6,
    name: "Priya Natarajan",
    year: "1969 – present",
    title: "Mapping the Universe's Dark Matter",
    domain: "Astrophysics & Cosmology",
    color: "#006064",
    accent: "#80DEEA",
    icon: "🌌",
    state: "Tamil Nadu",
    org: "Yale University",
    story:
      "Born in Chennai, Prof. Priya Natarajan is a theoretical astrophysicist at Yale University who has fundamentally changed our understanding of dark matter and black holes. She created the first high-resolution maps of dark matter distribution in the universe using gravitational lensing. Her work directly contributed to the theoretical foundations now being verified by the James Webb Space Telescope.",
    quote: "The universe is not just stranger than we suppose, it is stranger than we can suppose.",
    legacy: "Her dark matter maps are considered foundational to modern cosmology. Named one of TIME magazine's 100 Most Influential People.",
    impact: ["Created first high-resolution dark matter maps", "Professor of Astronomy & Physics, Yale", "Fellow of the American Physical Society", "TIME 100 Most Influential People"],
  },
  {
    id: 7,
    name: "Neena Gupta",
    year: "1959 – present",
    title: "Solved a 70-Year-Old Math Problem",
    domain: "Pure Mathematics",
    color: "#BF360C",
    accent: "#FFAB91",
    icon: "∑",
    state: "West Bengal",
    org: "Indian Statistical Institute",
    story:
      "Dr. Neena Gupta of the Indian Statistical Institute solved the Zariski Cancellation Problem — a problem in algebraic geometry that had remained open for over 70 years. She solved it at the age of 35 using an elegant, original approach that stunned the global mathematics community. She was awarded the prestigious Ramanujan Prize — given to mathematicians under 45 from developing countries.",
    quote: "Mathematics is not about numbers or equations — it is about ideas.",
    legacy: "Put India back on the map of pure mathematical research. Her proof is considered one of the most beautiful in modern algebra.",
    impact: ["Solved the Zariski Cancellation Problem (open 70+ years)", "Ramanujan Prize for Young Mathematicians, 2014", "Shanti Swarup Bhatnagar Prize, 2019", "Fellow of the Indian National Science Academy"],
  },
  {
    id: 8,
    name: "Falguni Nayar",
    year: "1963 – present",
    title: "India's Self-Made Woman Billionaire",
    domain: "Technology & Entrepreneurship",
    color: "#C62828",
    accent: "#EF9A9A",
    icon: "💄",
    state: "Gujarat",
    org: "Nykaa",
    story:
      "Falguni Nayar left a successful career as Managing Director at Kotak Mahindra Capital at 50 to found Nykaa — India's first profitable women-led unicorn. She built a full-stack e-commerce and beauty platform from scratch, navigating India's complex retail and logistics landscape. When Nykaa listed on the stock exchange in 2021, she became India's wealthiest self-made woman billionaire.",
    quote: "Age is just a number. If you have the passion and the drive, you can start at any age.",
    legacy: "Proved that a woman in her 50s could build a billion-dollar tech company in India. Nykaa employs thousands and has redefined beauty retail across the country.",
    impact: ["Founded Nykaa at age 50", "India's first profitable women-led unicorn", "India's wealthiest self-made woman billionaire (2021 IPO)", "Nykaa valued at ₹1 lakh crore at IPO"],
  },
];

// ── Woman Card ────────────────────────────────────────────────────────────────
function WomanCard({ woman, onClick, isSelected }) {
  return (
    <div
      className={`iw-card ${isSelected ? "iw-selected" : ""}`}
      style={{ "--iwcolor": woman.color, "--iwaccent": woman.accent }}
      onClick={() => onClick(woman)}
    >
      <div className="iw-card-top">
        <div className="iw-icon">{woman.icon}</div>
        <div className="iw-meta">
          <div className="iw-domain" style={{ color: woman.accent }}>{woman.domain}</div>
          <div className="iw-state">📍 {woman.state} · {woman.org}</div>
        </div>
      </div>
      <div className="iw-name">{woman.name}</div>
      <div className="iw-title">{woman.title}</div>
      <div className="iw-year" style={{ color: woman.accent }}>{woman.year}</div>
      {isSelected && <div className="iw-active-bar" style={{ background: woman.color }} />}
    </div>
  );
}

// ── Detail Panel ──────────────────────────────────────────────────────────────
function IndianDetail({ woman, onClose }) {
  if (!woman) return null;
  return (
    <div className="detail-overlay" onClick={onClose}>
      <div
        className="detail-panel iw-detail"
        onClick={(e) => e.stopPropagation()}
        style={{ "--wcolor": woman.color, "--waccent": woman.accent }}
      >
        <button className="detail-close" onClick={onClose}>✕</button>

        <div className="iw-detail-header">
          <div className="iw-detail-icon">{woman.icon}</div>
          <div>
            <div className="iw-detail-domain" style={{ color: woman.accent }}>{woman.domain}</div>
            <div className="detail-name">{woman.name}</div>
            <div className="detail-role">{woman.title}</div>
            <div className="iw-detail-meta">
              📍 {woman.state} &nbsp;·&nbsp; 🏛️ {woman.org} &nbsp;·&nbsp; 📅 {woman.year}
            </div>
          </div>
        </div>

        <div className="detail-divider" style={{ background: `linear-gradient(90deg, ${woman.color}, transparent)` }} />

        <div className="detail-section">
          <div className="detail-label">HER STORY</div>
          <div className="detail-text">{woman.story}</div>
        </div>

        <blockquote className="detail-quote" style={{ borderColor: woman.color }}>
          <span style={{ color: woman.accent }}>"</span>{woman.quote}<span style={{ color: woman.accent }}>"</span>
        </blockquote>

        <div className="detail-section">
          <div className="detail-label">KEY ACHIEVEMENTS</div>
          <ul className="iw-impact-list">
            {woman.impact.map((item, i) => (
              <li key={i} className="iw-impact-item">
                <span className="iw-impact-dot" style={{ background: woman.color }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-impact" style={{ background: `${woman.color}22`, borderLeft: `3px solid ${woman.color}` }}>
          <div className="detail-label">LEGACY</div>
          <div className="detail-impact-text">{woman.legacy}</div>
        </div>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function IndianWomenSection() {
  const [selected, setSelected] = useState(null);

  const handleClick = (woman) => {
    setSelected((prev) => (prev?.id === woman.id ? null : woman));
  };

  return (
    <section className="iw-section">
      <div className="iw-header">
        <div className="iw-tag">Bharat Ki Betiyaan</div>
        <h2 className="iw-title">
          Made in <span className="iw-india">India</span>
        </h2>
        <p className="iw-sub">
          Eight Indian women who redefined science, technology, and society —
          from the streets of Haryana to the surface of Mars.
        </p>
      </div>

      <div className="iw-grid">
        {indianWomen.map((w) => (
          <WomanCard
            key={w.id}
            woman={w}
            onClick={handleClick}
            isSelected={selected?.id === w.id}
          />
        ))}
      </div>

      <IndianDetail woman={selected} onClose={() => setSelected(null)} />
    </section>
  );
}