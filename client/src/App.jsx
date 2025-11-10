import React from "react";
import TypingTest from "./components/TypingTest.jsx";

export default function App() {
  return (
    <div className="container">
      <h1>Typing Speed Checker</h1>
      <p style={{color: "var(--muted)"}}>Light/Dark mode, timer, start/stop, and change paragraph.</p>
      <TypingTest />
    </div>
  );
}
