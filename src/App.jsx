:root{
  --bg:#0b1020;
  --card:#101a33;
  --muted:#a9b2c7;
  --text:#f3f6ff;
  --line:rgba(255,255,255,.08);
  --accent:#7c5cff;
  --accent2:#ff7ab6;
}

*{box-sizing:border-box}
body{
  margin:0;
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  background: radial-gradient(1200px 700px at 20% 10%, rgba(124,92,255,.22), transparent 60%),
              radial-gradient(900px 600px at 80% 20%, rgba(255,122,182,.18), transparent 55%),
              var(--bg);
  color:var(--text);
}

.appShell{max-width:1100px;margin:0 auto;padding:24px 16px 40px}

.topbar{
  display:flex;align-items:flex-end;justify-content:space-between;gap:16px;
  padding:18px 18px;margin-bottom:18px;
  border:1px solid var(--line);border-radius:16px;
  background: linear-gradient(180deg, rgba(16,26,51,.9), rgba(16,26,51,.7));
}

.brand{font-weight:800;letter-spacing:.2px;font-size:20px}
.sub{color:var(--muted);margin-top:6px;font-size:13px}

.goalBox{display:flex;flex-direction:column;gap:6px;min-width:170px}
.goalLabel{font-size:12px;color:var(--muted)}
.goalInput{
  width:100%;
  padding:10px 12px;
  border-radius:12px;
  border:1px solid var(--line);
  background: rgba(0,0,0,.2);
  color:var(--text);
  outline:none;
}

.grid{
  display:grid;
  grid-template-columns: 1.1fr .9fr;
  gap:14px;
}
@media (max-width: 920px){
  .grid{grid-template-columns:1fr}
}

.card{
  border:1px solid var(--line);
  border-radius:16px;
  padding:16px;
  background: rgba(16,26,51,.65);
}

.cardHeader{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.card h2{margin:0;font-size:16px}

.pill{
  font-size:12px;color:var(--muted);
  border:1px solid var(--line);
  padding:6px 10px;border-radius:999px;
  background: rgba(0,0,0,.18);
}

.primary, .secondary, .ghost{
  border-radius:12px;
  padding:10px 12px;
  border:1px solid var(--line);
  cursor:pointer;
  font-weight:600;
}
.primary{
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border:none;
  color:white;
}
.secondary{
  background: rgba(255,255,255,.06);
  color:var(--text);
}
.ghost{
  background: transparent;
  color: var(--muted);
}
.primary:hover,.secondary:hover{filter:brightness(1.05)}
.ghost:hover{color:var(--text)}

.hint{color:var(--muted);font-size:12px;margin-top:8px}
.hint.small{font-size:11px}

.progressRow{display:flex;gap:16px;align-items:center}
@media (max-width: 520px){.progressRow{flex-direction:column;align-items:stretch}}

.ring{
  width:120px;height:120px;border-radius:999px;
  background:
    conic-gradient(from 90deg, rgba(124,92,255,1) calc(var(--p)*1%), rgba(255,255,255,.08) 0);
  display:grid;place-items:center;
}
.ringInner{
  width:92px;height:92px;border-radius:999px;
  background: rgba(11,16,32,.75);
  border:1px solid var(--line);
  display:grid;place-items:center;
  text-align:center;
}
.ringPct{font-size:22px;font-weight:800}
.ringHint{font-size:11px;color:var(--muted);margin-top:2px}

.todayMeta{display:flex;flex-direction:column;gap:10px;flex:1}
.metric{display:flex;gap:10px;align-items:baseline}
.metricNum{font-size:20px;font-weight:800}
.metricLabel{color:var(--muted);font-size:12px}

.taskList{margin-top:12px;display:grid;gap:10px}
.task{
  display:flex;justify-content:space-between;align-items:center;gap:10px;
  padding:10px 12px;border-radius:12px;border:1px solid var(--line);
  background: rgba(0,0,0,.18);
}
.task.done{opacity:.7}
.taskLeft{display:flex;align-items:center;gap:10px;flex:1}
.taskTitle{font-weight:700}
.taskMins{font-size:12px;color:var(--muted);border:1px solid var(--line);padding:4px 8px;border-radius:999px}

.bookGrid{display:grid;grid-template-columns:1fr;gap:12px}
.book{
  border:1px solid var(--line);
  background: rgba(0,0,0,.18);
  border-radius:14px;
  padding:12px;
}
.bookTop{display:flex;justify-content:space-between;gap:10px}
.bookTitle{font-weight:800}
.bookTag{font-size:12px;color:var(--muted)}
.bookBottom{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
.price{font-weight:800}

.ownedList{display:grid;gap:10px}
.owned{
  display:flex;justify-content:space-between;align-items:center;gap:12px;
  padding:10px 12px;border:1px solid var(--line);border-radius:12px;background: rgba(0,0,0,.18);
}
.ownedTitle{font-weight:800}

.journalBox{display:grid;gap:10px;margin-bottom:12px}
.textarea{
  width:100%;
  border-radius:14px;
  border:1px solid var(--line);
  background: rgba(0,0,0,.18);
  color: var(--text);
  padding:12px;
  outline:none;
  resize: vertical;
}

.entries{display:grid;gap:10px}
.entry{
  border:1px solid var(--line);
  border-radius:12px;
  padding:10px 12px;
  background: rgba(0,0,0,.18);
}
.entryMeta{color:var(--muted);font-size:11px;margin-bottom:6px}
.entryText{white-space:pre-wrap}

.empty{color:var(--muted);font-size:13px;padding:10px 0}

.footer{
  margin-top:14px;
  color:var(--muted);
  font-size:12px;
  text-align:center;
}
