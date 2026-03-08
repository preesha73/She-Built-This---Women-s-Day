import { useState, useEffect } from "react";

const COLORS = [
  { bg: "#C2185B", accent: "#F48FB1" },
  { bg: "#1565C0", accent: "#90CAF9" },
  { bg: "#2E7D32", accent: "#A5D6A7" },
  { bg: "#E65100", accent: "#FFCC80" },
  { bg: "#4527A0", accent: "#CE93D8" },
  { bg: "#00695C", accent: "#80CBC4" },
  { bg: "#AD1457", accent: "#F48FB1" },
  { bg: "#FF6F00", accent: "#FFB300" },
];

const PROMPTS = [
  "She stayed up all night so I could sleep.",
  "She said yes when everyone said no.",
  "She worked two jobs and never complained.",
  "She was the first in her family to graduate.",
  "She built something from nothing.",
  "She taught me what strength looks like.",
  "She kept going when giving up was easier.",
  "She chose herself, and that changed everything.",
];

const SEED_STORIES = [
  {
    id: "s1",
    name: "My Mother, Sunita",
    submittedBy: "Priya, Delhi",
    relation: "Mother",
    story: "She raised three children alone after my father passed, ran a small tiffin service from our kitchen, and made sure all of us went to college. She never once called herself brave. She just called it Tuesday.",
    color: { bg: "#C2185B", accent: "#F48FB1" },
    timestamp: "2025-03-08T08:00:00Z",
    hearts: 42,
  },
  {
    id: "s2",
    name: "Meera Krishnan",
    submittedBy: "Anonymous",
    relation: "Teacher",
    story: "My class 10 maths teacher who taught in a government school for 30 years. She personally funded stationery for students who couldn't afford it. She never made it a big deal. She just did it.",
    color: { bg: "#2E7D32", accent: "#A5D6A7" },
    timestamp: "2025-03-08T08:30:00Z",
    hearts: 38,
  },
  {
    id: "s3",
    name: "Myself",
    submittedBy: "Fatima, Hyderabad",
    relation: "Myself",
    story: "I got married at 19. I went back to school at 31. I graduated at 35 with a degree in Computer Science. My daughter watched me walk the stage. That's my story.",
    color: { bg: "#4527A0", accent: "#CE93D8" },
    timestamp: "2025-03-08T09:00:00Z",
    hearts: 91,
  },
  {
    id: "s4",
    name: "Dadi (Grandmother)",
    submittedBy: "Rohan, Jaipur",
    relation: "Grandmother",
    story: "My grandmother never learned to read, but she memorized every single medicine dose for my grandfather's 12 daily pills for 8 years. She kept him alive. She is the smartest person I know.",
    color: { bg: "#FF6F00", accent: "#FFB300" },
    timestamp: "2025-03-08T09:30:00Z",
    hearts: 67,
  },
];

// ── Story Card ────────────────────────────────────────────────────────────────
function StoryCard({ story, onHeart }) {
  const [hearted, setHearted] = useState(false);

  const handleHeart = () => {
    if (hearted) return;
    setHearted(true);
    onHeart(story.id);
  };

  const timeAgo = (ts) => {
    const diff = (Date.now() - new Date(ts)) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <div className="story-card" style={{ "--scolor": story.color.bg, "--saccent": story.color.accent }}>
      <div className="story-card-top">
        <div className="story-relation-badge" style={{ background: `${story.color.bg}22`, color: story.color.accent, border: `1px solid ${story.color.bg}44` }}>
          {story.relation}
        </div>
        <div className="story-time">{timeAgo(story.timestamp)}</div>
      </div>
      <div className="story-name">{story.name}</div>
      <div className="story-text">"{story.story}"</div>
      <div className="story-footer">
        <div className="story-by">— {story.submittedBy}</div>
        <button className={`story-heart ${hearted ? "hearted" : ""}`} onClick={handleHeart}>
          {hearted ? "❤️" : "🤍"} {story.hearts + (hearted ? 1 : 0)}
        </button>
      </div>
      <div className="story-bar" style={{ background: story.color.bg }} />
    </div>
  );
}

// ── Submit Form ───────────────────────────────────────────────────────────────
function SubmitForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "", relation: "Mother", story: "", submittedBy: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [promptIdx] = useState(Math.floor(Math.random() * PROMPTS.length));

  const relations = ["Mother", "Sister", "Daughter", "Friend", "Teacher", "Colleague", "Mentor", "Grandmother", "Myself", "Other"];

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return setError("Please tell us her name.");
    if (!form.story.trim() || form.story.trim().length < 20)
      return setError("Please share a little more of her story (at least 20 characters).");

    const colorIdx = Math.floor(Math.random() * COLORS.length);
    const newStory = {
      id: `u${Date.now()}`,
      name: form.name.trim(),
      submittedBy: form.submittedBy.trim() || "Anonymous",
      relation: form.relation,
      story: form.story.trim(),
      color: COLORS[colorIdx],
      timestamp: new Date().toISOString(),
      hearts: 0,
    };
    onSubmit(newStory);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="submit-success">
        <div className="submit-success-icon">🌸</div>
        <div className="submit-success-title">Her story is now on the wall.</div>
        <div className="submit-success-sub">Thank you for making sure she's seen.</div>
      </div>
    );
  }

  return (
    <div className="submit-form">
      <div className="submit-prompt">
        <span className="submit-prompt-icon">✨</span>
        <span className="submit-prompt-text">{PROMPTS[promptIdx]}</span>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Her name *</label>
          <input className="form-input" name="name" placeholder="e.g. My Nani, Priya Sharma, Myself..."
            value={form.name} onChange={handleChange} />
        </div>
        <div className="form-field form-field-sm">
          <label className="form-label">She is my</label>
          <select className="form-input form-select" name="relation" value={form.relation} onChange={handleChange}>
            {relations.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Her story *</label>
        <textarea
          className="form-input form-textarea"
          name="story"
          placeholder="Tell us something she did. Big or small. It all matters here."
          value={form.story}
          onChange={handleChange}
          rows={4}
        />
        <div className="form-char-count" style={{ color: form.story.length > 20 ? "#66BB6A" : "var(--text3)" }}>
          {form.story.length} characters
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Your name (optional)</label>
        <input className="form-input" name="submittedBy" placeholder="Anonymous"
          value={form.submittedBy} onChange={handleChange} />
      </div>

      {error && <div className="form-error">⚠️ {error}</div>}

      <button className="form-submit" onClick={handleSubmit}>
        🌸 Add Her to the Wall
      </button>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function HerStoryWall() {
  const [stories, setStories] = useState(SEED_STORIES);
  const [view, setView] = useState("wall"); // "wall" | "submit"
  const [sortBy, setSortBy] = useState("recent"); // "recent" | "hearts"

  const handleNewStory = (story) => {
    setStories((prev) => [story, ...prev]);
    setTimeout(() => setView("wall"), 1800);
  };

  const handleHeart = (id) => {
    setStories((prev) =>
      prev.map((s) => s.id === id ? { ...s, hearts: s.hearts + 1 } : s)
    );
  };

  const sorted = [...stories].sort((a, b) =>
    sortBy === "hearts" ? b.hearts - a.hearts : new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <section className="hsw-section">
      {/* Header */}
      <div className="hsw-header">
        <div className="hsw-tag">Community Wall</div>
        <h2 className="hsw-title">Every Woman's Story Matters</h2>
        <p className="hsw-sub">
          She doesn't have to have gone to space or won a Nobel Prize.
          <br />
          If she moved your world — even just a little — she belongs here.
        </p>
      </div>

      {/* Controls */}
      <div className="hsw-controls">
        <div className="hsw-tabs">
          <button className={`hsw-tab ${view === "wall" ? "active" : ""}`} onClick={() => setView("wall")}>
            🌸 The Wall ({stories.length})
          </button>
          <button className={`hsw-tab ${view === "submit" ? "active" : ""}`} onClick={() => setView("submit")}>
            ✍️ Share Her Story
          </button>
        </div>
        {view === "wall" && (
          <div className="hsw-sort">
            <button className={`sort-btn ${sortBy === "recent" ? "active" : ""}`} onClick={() => setSortBy("recent")}>Recent</button>
            <button className={`sort-btn ${sortBy === "hearts" ? "active" : ""}`} onClick={() => setSortBy("hearts")}>Most Loved</button>
          </div>
        )}
      </div>

      {/* Wall View */}
      {view === "wall" && (
        <div className="hsw-grid">
          {sorted.map((s) => (
            <StoryCard key={s.id} story={s} onHeart={handleHeart} />
          ))}
        </div>
      )}

      {/* Submit View */}
      {view === "submit" && <SubmitForm onSubmit={handleNewStory} />}
    </section>
  );
}