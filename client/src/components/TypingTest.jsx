import React, { useEffect, useRef, useState } from "react";
import ToggleTheme from "./ToggleTheme.jsx";

const DEFAULT_SECONDS = 60;

export default function TypingTest() {
  const [paragraph, setParagraph] = useState("");
  const [userText, setUserText] = useState("");
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const intervalRef = useRef(null);
  const inputRef = useRef(null);

  async function fetchParagraph() {
    try {
      const res = await fetch("/api/paragraphs/random");
      const data = await res.json();
      if (data.paragraph) setParagraph(data.paragraph);
    } catch (e) {
      setParagraph("Network error: using fallback text. Keep practicing steadily every day and your speed will improve.");
    }
  }

  useEffect(() => { fetchParagraph(); }, []);

  function start() {
    if (running) return;
    setResult(null);
    setRunning(true);
    setSeconds(DEFAULT_SECONDS);
    inputRef.current?.focus();
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          stop(); // time over
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  function stop() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    const stats = computeStats(userText, paragraph, DEFAULT_SECONDS - seconds);
    setResult(stats);
  }

  function resetAndChangeParagraph() {
    stop();
    setUserText("");
    setSeconds(DEFAULT_SECONDS);
    setResult(null);
    fetchParagraph();
  }

  function computeStats(text, para, elapsed) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const timeMin = Math.max(elapsed, 1) / 60;
    const grossWPM = Math.round(words.length / timeMin);

    // Accuracy
    const expected = para.split(/\s+/);
    let correct = 0;
    for (let i = 0; i < Math.min(words.length, expected.length); i++) {
      if (words[i] === expected[i]) correct++;
    }
    const accuracy = expected.length ? Math.round((correct / expected.length) * 100) : 0;
    return { wpm: grossWPM, accuracy, timeSec: elapsed };
  }

  return (
    <div className="card" style={{display:"grid", gap: 16}}>
      <div className="controls">
        <button onClick={start} disabled={running}>Start</button>
        <button onClick={stop} className="secondary">Stop</button>
        <button onClick={resetAndChangeParagraph}>Change Paragraph</button>
        <ToggleTheme />
        <span className="badge" aria-live="polite">{seconds}s</span>
      </div>

      <div style={{lineHeight: 1.8, padding: 12, borderRadius: 12, background: "white"}}>
        {paragraph || "Loading paragraph..."}
      </div>

      <textarea
        ref={inputRef}
        placeholder="Start typing here..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        disabled={!running}
      />

      {result && (
        <div className="card">
          <strong>Results</strong>
          <div>WPM: {result.wpm}</div>
          <div>Accuracy: {result.accuracy}%</div>
          <div>Time: {result.timeSec}s</div>
        </div>
      )}
    </div>
  );
}
