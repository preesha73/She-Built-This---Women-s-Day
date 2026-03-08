import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Data ──────────────────────────────────────────────────────────────────────
const women = [
  {
    id: 1,
    year: "1843",
    name: "Ada Lovelace",
    title: "World's First Programmer",
    field: "Mathematics & Computing",
    color: "#C2185B",
    accent: "#F48FB1",
    icon: "⚙️",
    contribution:
      "Wrote the first algorithm intended to be processed by a machine — a century before computers existed. Her notes on Babbage's Analytical Engine are considered the first computer program.",
    quote: "That brain of mine is something more than merely mortal.",
    impact: "Founded the entire discipline of computer programming.",
  },
  {
    id: 2,
    year: "1906",
    name: "Grace Hopper",
    title: "Mother of COBOL",
    field: "Computer Science & Navy",
    color: "#1565C0",
    accent: "#90CAF9",
    icon: "🖥️",
    contribution:
      "Invented the first compiler. She also popularized the term 'debugging' and led development of COBOL, the language that still runs global banking today.",
    quote: "The most dangerous phrase in the language is 'we've always done it this way.'",
    impact: "Made programming accessible to non-mathematicians worldwide.",
  },
  {
    id: 3,
    year: "1936",
    name: "Margaret Hamilton",
    title: "Software Engineering Pioneer",
    field: "NASA & Space Computing",
    color: "#2E7D32",
    accent: "#A5D6A7",
    icon: "🚀",
    contribution:
      "Led the Apollo mission software team. Her error-detection code saved Apollo 11 from aborting mid-mission. She coined the term 'software engineering.'",
    quote: "There was no choice but to be pioneers.",
    impact: "Her software landed humans on the moon.",
  },
  {
    id: 4,
    year: "1958",
    name: "Annie Easley",
    title: "NASA Rocket Scientist",
    field: "Aerospace & Computing",
    color: "#E65100",
    accent: "#FFCC80",
    icon: "🛸",
    contribution:
      "Developed NASA Centaur rocket code — technology that still powers modern satellite launches. Also mentored underrepresented groups throughout her career.",
    quote: "My mother had always told us — you can be anything you want to be.",
    impact: "Propulsion code she wrote still powers space missions today.",
  },
  {
    id: 5,
    year: "1972",
    name: "Radia Perlman",
    title: "Mother of the Internet",
    field: "Network Engineering",
    color: "#4527A0",
    accent: "#CE93D8",
    icon: "🌐",
    contribution:
      "Invented the Spanning Tree Protocol (STP), the foundational algorithm that allows modern network bridges to work. Without her, the internet could not function as we know it.",
    quote: "I'm not comfortable with the 'mother of the internet' title.",
    impact: "Every data packet on the internet uses her protocol.",
  },
  {
    id: 6,
    year: "1993",
    name: "Hedy Lamarr",
    title: "Inventor of WiFi & Bluetooth",
    field: "Wireless Communication",
    color: "#00695C",
    accent: "#80CBC4",
    icon: "📡",
    contribution:
      "Co-invented frequency-hopping spread spectrum technology. This exact technology became the foundation of WiFi, Bluetooth, and GPS.",
    quote: "Films have a certain place in a certain time period. Technology is forever.",
    impact: "Her patent forms the backbone of all modern wireless communication.",
  },
  {
    id: 7,
    year: "2012",
    name: "Reshma Saujani",
    title: "Closing the Gender Gap",
    field: "Education & Advocacy",
    color: "#AD1457",
    accent: "#F48FB1",
    icon: "💻",
    contribution:
      "Founded Girls Who Code, teaching over 500,000 girls to code across 50 states and 6 countries — directly reshaping the gender ratio in tech.",
    quote: "Teach girls bravery, not perfection.",
    impact: "500,000+ girls trained. Closing tech's gender gap one coder at a time.",
  },
];

// In-memory nominations store (simulates a DB)
let nominations = [
  { id: 1, name: "Marie Curie", reason: "First woman to win a Nobel Prize — twice.", submittedBy: "Preesha", timestamp: new Date().toISOString() },
  { id: 2, name: "My Mom", reason: "She worked two jobs so I could study Computer Science.", submittedBy: "Anonymous", timestamp: new Date().toISOString() },
];

// ── Routes ────────────────────────────────────────────────────────────────────

// GET all women in tech
app.get("/api/women", (req, res) => {
  const { field } = req.query;
  if (field) {
    const filtered = women.filter((w) =>
      w.field.toLowerCase().includes(field.toLowerCase())
    );
    return res.json({ success: true, count: filtered.length, data: filtered });
  }
  res.json({ success: true, count: women.length, data: women });
});

// GET a single woman by ID
app.get("/api/women/:id", (req, res) => {
  const woman = women.find((w) => w.id === parseInt(req.params.id));
  if (!woman) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: woman });
});

// GET all nominations
app.get("/api/nominations", (req, res) => {
  res.json({ success: true, count: nominations.length, data: nominations });
});

// POST a new nomination
app.post("/api/nominations", (req, res) => {
  const { name, reason, submittedBy } = req.body;
  if (!name || !reason) {
    return res.status(400).json({ success: false, message: "Name and reason are required." });
  }
  const nomination = {
    id: nominations.length + 1,
    name: name.trim(),
    reason: reason.trim(),
    submittedBy: submittedBy?.trim() || "Anonymous",
    timestamp: new Date().toISOString(),
  };
  nominations.push(nomination);
  res.status(201).json({ success: true, message: "Nomination added!", data: nomination });
});

// DELETE a nomination (admin feature)
app.delete("/api/nominations/:id", (req, res) => {
  const idx = nominations.findIndex((n) => n.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: "Not found" });
  nominations.splice(idx, 1);
  res.json({ success: true, message: "Nomination removed." });
});

// GET stats
app.get("/api/stats", (req, res) => {
  const fields = [...new Set(women.map((w) => w.field))];
  const earliest = women.reduce((a, b) => (parseInt(a.year) < parseInt(b.year) ? a : b));
  res.json({
    success: true,
    data: {
      totalWomen: women.length,
      totalNominations: nominations.length,
      fieldsRepresented: fields.length,
      fields,
      earliestPioneer: { name: earliest.name, year: earliest.year },
      yearSpan: `${earliest.year} – present`,
    },
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "She Built This API is running 🚀", timestamp: new Date().toISOString() });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌸 She Built This API running on http://localhost:${PORT}`);
  console.log(`   GET  /api/women          → All women in tech`);
  console.log(`   GET  /api/women/:id      → Single profile`);
  console.log(`   GET  /api/nominations    → All nominations`);
  console.log(`   POST /api/nominations    → Add a nomination`);
  console.log(`   GET  /api/stats          → Project stats\n`);
});