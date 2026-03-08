import { useState, useEffect } from "react";

const ALL_QUOTES = [
  { quote: "That brain of mine is something more than merely mortal.", answer: "Ada Lovelace", year: "1843", icon: "⚙️" },
  { quote: "The most dangerous phrase in the language is 'we've always done it this way.'", answer: "Grace Hopper", year: "1906", icon: "🖥️" },
  { quote: "There was no choice but to be pioneers.", answer: "Margaret Hamilton", year: "1936", icon: "🚀" },
  { quote: "My mother had always told us — you can be anything you want to be.", answer: "Annie Easley", year: "1958", icon: "🛸" },
  { quote: "Films have a certain place in a certain time period. Technology is forever.", answer: "Hedy Lamarr", year: "1993", icon: "📡" },
  { quote: "Teach girls bravery, not perfection.", answer: "Reshma Saujani", year: "2012", icon: "💻" },
  { quote: "The path from dreams to success does exist. May you have the vision to find it.", answer: "Kalpana Chawla", year: "1962", icon: "🚀" },
  { quote: "Science has no gender. What matters is your dedication and hard work.", answer: "Tessy Thomas", year: "1963", icon: "🎯" },
  { quote: "When you love your work, you give it everything you have.", answer: "Ritu Karidhal", year: "1975", icon: "🛸" },
  { quote: "Age is just a number. If you have the passion and the drive, you can start at any age.", answer: "Falguni Nayar", year: "1963", icon: "💄" },
  { quote: "Kindness and compassion are not signs of weakness. They are signs of strength.", answer: "Sudha Murthy", year: "1950", icon: "💡" },
  { quote: "Mathematics is not about numbers or equations — it is about ideas.", answer: "Neena Gupta", year: "1959", icon: "∑" },
];

const ALL_NAMES = [...new Set(ALL_QUOTES.map((q) => q.answer))];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuestion(usedIndices) {
  const available = ALL_QUOTES.filter((_, i) => !usedIndices.includes(i));
  if (available.length === 0) return null;
  const pool = shuffle(available);
  const correct = pool[0];
  const wrongNames = shuffle(ALL_NAMES.filter((n) => n !== correct.answer)).slice(0, 3);
  const options = shuffle([correct.answer, ...wrongNames]);
  return { correct, options };
}

const TOTAL_ROUNDS = 6;

export default function Quiz() {
  const [phase, setPhase] = useState("start"); // start | playing | result
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [usedIndices, setUsedIndices] = useState([]);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = () => {
    setScore(0); setRound(0); setUsedIndices([]); setAnswers([]);
    setPhase("playing");
  };

  useEffect(() => {
    if (phase === "playing") {
      const idx = ALL_QUOTES.findIndex(
        (q) => !usedIndices.includes(ALL_QUOTES.indexOf(q))
      );
      const q = generateQuestion(usedIndices);
      setQuestion(q);
      setSelected(null);
      setShowResult(false);
    }
  }, [round, phase]);

  const handleAnswer = (name) => {
    if (selected) return;
    setSelected(name);
    setShowResult(true);
    const correct = name === question.correct.answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, { quote: question.correct.quote, correct: question.correct.answer, chosen: name, isCorrect: correct }]);

    setTimeout(() => {
      if (round + 1 >= TOTAL_ROUNDS) {
        setPhase("result");
      } else {
        const newIdx = ALL_QUOTES.findIndex((q) => q.quote === question.correct.quote);
        setUsedIndices((u) => [...u, newIdx]);
        setRound((r) => r + 1);
      }
    }, 1800);
  };

  const getScoreMessage = () => {
    if (score === TOTAL_ROUNDS) return { msg: "Perfect Score! You know your pioneers.", emoji: "🏆" };
    if (score >= 4) return { msg: "Excellent! You clearly paid attention.", emoji: "🌟" };
    if (score >= 2) return { msg: "Good effort! Their stories are worth revisiting.", emoji: "📚" };
    return { msg: "Keep exploring — their stories are incredible.", emoji: "🌱" };
  };

  // ── Start Screen ─────────────────────────────────────────────────────────
  if (phase === "start") {
    return (
      <section className="quiz-section">
        <div className="quiz-header">
          <div className="quiz-tag">Brain Check</div>
          <h2 className="quiz-title">Who Said This?</h2>
          <p className="quiz-sub">
            {TOTAL_ROUNDS} quotes. Women from across history and India.
            <br />How well do you know the pioneers?
          </p>
          <button className="quiz-start-btn" onClick={startQuiz}>
            Start Quiz →
          </button>
        </div>
      </section>
    );
  }

  // ── Result Screen ─────────────────────────────────────────────────────────
  if (phase === "result") {
    const { msg, emoji } = getScoreMessage();
    return (
      <section className="quiz-section">
        <div className="quiz-result">
          <div className="result-emoji">{emoji}</div>
          <div className="result-score">{score} / {TOTAL_ROUNDS}</div>
          <div className="result-msg">{msg}</div>

          <div className="result-breakdown">
            {answers.map((a, i) => (
              <div key={i} className={`result-row ${a.isCorrect ? "correct" : "wrong"}`}>
                <div className="result-row-icon">{a.isCorrect ? "✅" : "❌"}</div>
                <div className="result-row-info">
                  <div className="result-quote-text">"{a.quote.slice(0, 60)}…"</div>
                  <div className="result-answer">
                    {a.isCorrect
                      ? <span style={{ color: "#66BB6A" }}>{a.correct}</span>
                      : <><span style={{ color: "#EF5350", textDecoration: "line-through" }}>{a.chosen}</span> → <span style={{ color: "#66BB6A" }}>{a.correct}</span></>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="quiz-start-btn" onClick={startQuiz} style={{ marginTop: "24px" }}>
            Play Again
          </button>
        </div>
      </section>
    );
  }

  // ── Playing ───────────────────────────────────────────────────────────────
  if (!question) return null;

  return (
    <section className="quiz-section">
      {/* Progress */}
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${((round) / TOTAL_ROUNDS) * 100}%` }} />
      </div>
      <div className="quiz-meta">
        <span>Question {round + 1} of {TOTAL_ROUNDS}</span>
        <span>Score: {score}</span>
      </div>

      {/* Quote */}
      <div className="quiz-quote-card">
        <div className="quiz-quote-mark">"</div>
        <div className="quiz-quote-text">{question.correct.quote}</div>
        <div className="quiz-quote-mark quiz-quote-mark-end">"</div>
      </div>

      {/* Options */}
      <div className="quiz-options">
        {question.options.map((name) => {
          let state = "idle";
          if (showResult) {
            if (name === question.correct.answer) state = "correct";
            else if (name === selected) state = "wrong";
          }
          return (
            <button
              key={name}
              className={`quiz-option ${state}`}
              onClick={() => handleAnswer(name)}
              disabled={!!selected}
            >
              {state === "correct" && "✅ "}
              {state === "wrong" && "❌ "}
              {name}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`quiz-feedback ${selected === question.correct.answer ? "correct" : "wrong"}`}>
          {selected === question.correct.answer
            ? `🎉 Correct! ${question.correct.icon} ${question.correct.answer} (${question.correct.year})`
            : `The answer was ${question.correct.icon} ${question.correct.answer} (${question.correct.year})`
          }
        </div>
      )}
    </section>
  );
}