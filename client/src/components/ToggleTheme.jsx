import React, { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const cls = document.documentElement.classList;
    if (dark) {
      cls.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      cls.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button className="secondary" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
      {dark ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}
