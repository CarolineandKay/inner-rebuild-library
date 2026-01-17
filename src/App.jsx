import React, { useEffect, useMemo, useState } from "react";
import "./index.css";

const DEFAULT_BOOKS = [
  { id: "healing-from-within", title: "Healing From Within" },
  { id: "inner-journey", title: "The Inner Journey" },
  { id: "loving-yourself-first", title: "Loving Yourself First" },
  { id: "boundaries-in-love", title: "Boundaries in Love" },
  { id: "emotional-intelligence-in-love", title: "Emotional Intelligence in Love" },
];

const XP_PER_MIN = 2;
const XP_CAP = 120; // cap per session

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

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function fmtTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function dayKey(d = new Date()) {
  // YYYY-MM-DD local
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function isYesterday(prevDay, todayDay) {
  // prevDay/todayDay are YYYY-MM-DD
  const [y1, m1, d1] = prevDay.split("-").map(Number);
  const [y2, m2, d2] = todayDay.split("-").map(Number);
  const a = new Date(y1, m1 - 1, d1).getTime();
  const b = new Date(y2, m2 - 1, d2).getTime();
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
  return diff === 1;
}

function ProgressRing({ progress01, size = 96, stroke = 10 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * (1 - clamp(progress01, 0, 1));
  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(0,0,0,0.85)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={dash}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export default function App() {
  // --- Saved profile ---
  const [books] = useState(DEFAULT_BOOKS);
  const [selectedBookId, setSelectedBookId] = useState(books[0]?.id);

  const [xp, setXp] = useState(() => load("irl_xp", 0));
  const [streak, setStreak] = useState(() => load("irl_streak", 0));
  const [lastSessionDay, setLastSessionDay] = useState(() => load("irl_lastDay", null));
  const [bookStats, setBookStats] = useState(() => load("irl_bookStats", {})); // { [id]: { minutes, xp } }

  // --- Timer state ---
  const [minutesPlanned, setMinutesPlanned] = useState(() => load("irl_minutesPlanned", 25));
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // persist core data
  useEffect(() => save("irl_xp", xp), [xp]);
  useEffect(() => save("irl_streak", streak), [streak]);
  useEffect(() => save("irl_lastDay", lastSessionDay), [lastSessionDay]);
  useEffect(() => save("irl_bookStats", bookStats), [bookStats]);
  useEffect(() => save("irl_minutesPlanned", minutesPlanned), [minutesPlanned]);

  // timer tick
  useEffect(() => {
    if (!isRunning) return;
    if (secondsLeft <= 0) return;

    const t = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    return () => clearInterval(t);
  }, [isRunning, secondsLeft]);

  // auto-stop at 0
  useEffect(() => {
    if (isRunning && secondsLeft === 0) setIsRunning(false);
  }, [isRunning, secondsLeft]);

  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp]);
  const xpToNext = useMemo(() => xp % 100, [xp]);
  const progress01 = useMemo(() => xpToNext / 100, [xpToNext]);

  const currentBook = useMemo(
    () => books.find((b) => b.id === selectedBookId) || books[0],
    [books, selectedBookId]
  );

  const currentBookStat = bookStats[currentBook?.id] || { minutes: 0, xp: 0 };

  const plannedSeconds = clamp(Number(minutesPlanned) || 25, 5, 120) * 60;
  const activeProgress01 = plannedSeconds ? 1 - secondsLeft / plannedSeconds : 0;

  function startSession() {
    setSecondsLeft(plannedSeconds);
    setIsRunning(true);
  }

  function togglePause() {
    if (secondsLeft <= 0) return;
    setIsRunning((v) => !v);
  }

  function resetSession() {
    setIsRunning(false);
    setSecondsLeft(0);
  }

  function completeSession() {
    // award based on planned minutes (simple, predictable, habit-forming)
    const mins = clamp(Number(minutesPlanned) || 25, 5, 120);
    const gained = clamp(mins * XP_PER_MIN, 0, XP_CAP);

    // streak logic: only changes once per day
    const today = dayKey(new Date());

    setStreak((prev) => {
      if (!lastSessionDay) return 1;
      if (lastSessionDay === today) return prev; // already counted today
      if (isYesterday(lastSessionDay, today)) return prev + 1;
      return 1; // broke streak
    });

    setLastSessionDay(today);

    setXp((prev) => prev + gained);

    setBookStats((prev) => {
      const next = { ...prev };
      const existing = next[currentBook.id] || { minutes: 0, xp: 0 };
      next[currentBook.id] = {
        minutes: existing.minutes + mins,
        xp: existing.xp + gained,
      };
      return next;
    });

    resetSession();
  }

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "42px 18px 60px" }}>
      {/* Top */}
      <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 18 }}>
        <div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
            🚀 Inner Rebuild Library
          </div>
          <div style={{ marginTop: 8, color: "rgba(0,0,0,0.55)", fontSize: 16 }}>
            Read. Reflect. Level up.
          </div>
        </div>

        {/* Progress ring */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative" }}>
            <ProgressRing progress01={progress01} size={96} stroke={10} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
              }}
            >
              L{level}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>XP: {xp}</div>
            <div style={{ color: "rgba(0,0,0,0.6)" }}>{xpToNext}/100 to next level</div>
            <div style={{ marginTop: 6, fontWeight: 700 }}>🔥 Streak: {streak}</div>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <main style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 18, marginTop: 22 }}>
        {/* Reader card */}
        <section
          style={{
            background: "white",
            borderRadius: 16,
            padding: 18,
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>⏱️ Reading Session</div>
              <div style={{ marginTop: 4, color: "rgba(0,0,0,0.6)" }}>
                XP rule: {XP_PER_MIN} XP/min (cap {XP_CAP} XP)
              </div>
            </div>

            {/* active ring */}
            <div style={{ position: "relative" }}>
              <ProgressRing progress01={secondsLeft > 0 ? activeProgress01 : 0} size={76} stroke={10} />
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontWeight: 800 }}>
                {secondsLeft > 0 ? fmtTime(secondsLeft) : "00:00"}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 12, marginTop: 16 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 700 }}>Choose a book</div>
              <select
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.12)",
                  fontSize: 14,
                }}
              >
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 700 }}>Minutes</div>
              <input
                type="number"
                min={5}
                max={120}
                value={minutesPlanned}
                onChange={(e) => setMinutesPlanned(e.target.value)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.12)",
                  fontSize: 14,
                }}
              />
            </label>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
            <button
              onClick={startSession}
              disabled={isRunning}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.10)",
                background: isRunning ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.92)",
                color: isRunning ? "rgba(0,0,0,0.45)" : "white",
                fontWeight: 800,
                cursor: isRunning ? "not-allowed" : "pointer",
              }}
            >
              Start
            </button>

            <button
              onClick={togglePause}
              disabled={secondsLeft <= 0}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.10)",
                background: secondsLeft <= 0 ? "rgba(0,0,0,0.05)" : "white",
                color: "rgba(0,0,0,0.85)",
                fontWeight: 800,
                cursor: secondsLeft <= 0 ? "not-allowed" : "pointer",
              }}
            >
              {isRunning ? "Pause" : "Resume"}
            </button>

            <button
              onClick={completeSession}
              disabled={secondsLeft <= 0}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.10)",
                background: secondsLeft <= 0 ? "rgba(0,0,0,0.05)" : "rgba(0,160,90,0.12)",
                color: "rgba(0,0,0,0.85)",
                fontWeight: 800,
                cursor: secondsLeft <= 0 ? "not-allowed" : "pointer",
              }}
            >
              Complete (+XP)
            </button>

            <button
              onClick={resetSession}
              disabled={secondsLeft <= 0 && !isRunning}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.10)",
                background: "white",
                color: "rgba(0,0,0,0.6)",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>

          <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(0,0,0,0.03)" }}>
            <div style={{ fontWeight: 800 }}>{currentBook.title}</div>
            <div style={{ marginTop: 6, color: "rgba(0,0,0,0.7)" }}>
              Logged: <b>{currentBookStat.minutes}</b> minutes · <b>{currentBookStat.xp}</b> XP
            </div>
          </div>
        </section>

        {/* Summary card */}
        <section
          style={{
            background: "white",
            borderRadius: 16,
            padding: 18,
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800 }}>📊 Today’s Snapshot</div>
          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            <div style={{ padding: 12, borderRadius: 14, background: "rgba(0,0,0,0.03)" }}>
              <div style={{ color: "rgba(0,0,0,0.6)", fontWeight: 700 }}>Next Level</div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{100 - xpToNext} XP</div>
            </div>

            <div style={{ padding: 12, borderRadius: 14, background: "rgba(0,0,0,0.03)" }}>
              <div style={{ color: "rgba(0,0,0,0.6)", fontWeight: 700 }}>Recommended session</div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>25 minutes</div>
              <div style={{ marginTop: 4, color: "rgba(0,0,0,0.6)" }}>
                Small wins beat “I’ll start Monday.”
              </div>
            </div>

            <div style={{ padding: 12, borderRadius: 14, background: "rgba(0,0,0,0.03)" }}>
              <div style={{ color: "rgba(0,0,0,0.6)", fontWeight: 700 }}>Rule of the game</div>
              <div style={{ marginTop: 6, color: "rgba(0,0,0,0.75)" }}>
                Don’t aim for “perfect.” Aim for <b>logged</b>.
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ marginTop: 18, color: "rgba(0,0,0,0.45)", fontSize: 13 }}>
        Data saves in your browser (localStorage) for now. Later we’ll add accounts + Stripe gating.
      </footer>
    </div>
  );
}
