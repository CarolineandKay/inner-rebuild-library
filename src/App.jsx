import React, { useEffect, useMemo, useState } from "react";

const DEFAULT_BOOKS = [
  { id: "healing-from-within", title: "Healing From Within", tag: "Relationships" },
  { id: "inner-journey", title: "The Inner Journey", tag: "Self-awareness" },
  { id: "loving-yourself-first", title: "Loving Yourself First", tag: "Self-worth" },
  { id: "boundaries-in-love", title: "Boundaries in Love", tag: "Boundaries" },
  { id: "emotional-intelligence-in-love", title: "Emotional Intelligence in Love", tag: "Emotions" },
];

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function App() {
  const [books] = useState(DEFAULT_BOOKS);

  const [xp, setXp] = useState(() => load("irl_xp", 0));
  const [streak, setStreak] = useState(() => load("irl_streak", 0));
  const [lastSessionDate, setLastSessionDate] = useState(() => load("irl_lastSessionDate", null));

  const [selectedBookId, setSelectedBookId] = useState(() => load("irl_selectedBookId", books[0]?.id));
  const [minutes, setMinutes] = useState(20);

  const [journalText, setJournalText] = useState(() => load("irl_journalDraft", ""));
  const [journalEntries, setJournalEntries] = useState(() => load("irl_journalEntries", []));

  useEffect(() => save("irl_xp", xp), [xp]);
  useEffect(() => save("irl_streak", streak), [streak]);
  useEffect(() => save("irl_lastSessionDate", lastSessionDate), [lastSessionDate]);
  useEffect(() => save("irl_selectedBookId", selectedBookId), [selectedBookId]);
  useEffect(() => save("irl_journalDraft", journalText), [journalText]);
  useEffect(() => save("irl_journalEntries", journalEntries), [journalEntries]);

  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp]);
  const progressToNext = useMemo(() => xp % 100, [xp]);

  function completeReadingSession() {
    // XP rule (simple + addictive):
    // 1 minute = 2 XP, capped at 120 XP per session to stop “gaming”
    const earned = Math.min(minutes * 2, 120);
    setXp((v) => v + earned);

    // Streak rule:
    // If last session was yesterday -> +1
    // If last session was today -> no change
    // Else -> reset to 1
    const today = new Date();
    const yyyyMmDd = today.toISOString().slice(0, 10);

    if (!lastSessionDate) {
      setStreak(1);
    } else if (lastSessionDate === yyyyMmDd) {
      // same day, no change
    } else {
      const prev = new Date(lastSessionDate);
      const diffDays = Math.round((today - prev) / (1000 * 60 * 60 * 24));
      setStreak(diffDays === 1 ? streak + 1 : 1);
    }

    setLastSessionDate(yyyyMmDd);
    alert(`Nice. You earned ${earned} XP 💅`);
  }

  function addJournalEntry() {
    const trimmed = journalText.trim();
    if (!trimmed) return;

    const entry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      bookId: selectedBookId,
      text: trimmed,
    };
    setJournalEntries([entry, ...journalEntries]);
    setJournalText("");
  }

  const selectedBook = books.find((b) => b.id === selectedBookId);

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <div className="brand">🚀 Inner Rebuild Library</div>
          <div className="sub">Gamified ebook learning + journalling</div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="statNum">{level}</div>
            <div className="statLabel">Level</div>
          </div>
          <div className="stat">
            <div className="statNum">{xp}</div>
            <div className="statLabel">XP</div>
          </div>
          <div className="stat">
            <div className="statNum">{streak}</div>
            <div className="statLabel">Streak</div>
          </div>
        </div>
      </header>

      <main className="grid">
        {/* Progress card */}
        <section className="card">
          <h2>Progress</h2>
          <p className="muted">
            {progressToNext}/100 XP to the next level. Keep stacking tiny wins.
          </p>
          <div className="bar">
            <div className="barFill" style={{ width: `${progressToNext}%` }} />
          </div>

          <div className="row">
            <div className="pill">🏅 Badges: coming next</div>
            <div className="pill">🎯 Goals: coming next</div>
          </div>
        </section>

        {/* Library card */}
        <section className="card">
          <h2>Your Library</h2>
          <p className="muted">Pick a book, then log a timed read session.</p>

          <div className="books">
            {books.map((b) => (
              <button
                key={b.id}
                className={"book" + (b.id === selectedBookId ? " active" : "")}
                onClick={() => setSelectedBookId(b.id)}
              >
                <div className="bookTitle">{b.title}</div>
                <div className="bookTag">{b.tag}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Reading session */}
        <section className="card">
          <h2>Reading Session</h2>
          <p className="muted">
            Book: <strong>{selectedBook?.title}</strong>
          </p>

          <div className="row">
            <label className="field">
              Minutes
              <input
                type="number"
                min="5"
                max="120"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
            </label>

            <button className="primary" onClick={completeReadingSession}>
              Complete Session (+XP)
            </button>
          </div>

          <div className="hint">
            XP rule: 2 XP/min (cap 120 XP). Streak updates when you log a session.
          </div>
        </section>

        {/* Journal */}
        <section className="card">
          <h2>Journal</h2>
          <p className="muted">Reflection = transformation. (Also: retention.)</p>

          <div className="prompt">
            Prompt: What did you learn today that changes how you’ll show up in love?
          </div>

          <textarea
            className="textarea"
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Type your reflection..."
          />

          <div className="row">
            <button className="primary" onClick={addJournalEntry}>
              Save Entry
            </button>
            <div className="muted">{journalEntries.length} entries</div>
          </div>

          <div className="entries">
            {journalEntries.slice(0, 5).map((e) => (
              <div className="entry" key={e.id}>
                <div className="entryMeta">
                  <span>{new Date(e.createdAt).toLocaleString()}</span>
                  <span className="dot">•</span>
                  <span>{books.find((b) => b.id === e.bookId)?.title}</span>
                </div>
                <div className="entryText">{e.text}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

