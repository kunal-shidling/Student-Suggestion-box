import React, { useState } from "react";
import SuggestionForm from "./components/SuggestionForm";
import LatestSuggestion from "./components/LatestSuggestion";
import SuggestionCounter from "./components/SuggestionCounter";

export default function App(){
  const [latest, setLatest] = useState(null);
  const [counterRefresh, setCounterRefresh] = useState(0);

  function handleSaved(row) {
    setLatest(row);
    setCounterRefresh(prev => prev + 1); // Trigger counter refresh
  }

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <div className="logo">SS</div>
          <div>
            <div className="title">Student Suggestion Box</div>
            <div className="subtitle">Collect suggestions and display the latest entry</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <SuggestionCounter refreshTrigger={counterRefresh} />
          <div className="badge">Demo • Supabase</div>
        </div>
      </header>

      <div className="grid">
        <div className="card form">
          <SuggestionForm onSaved={handleSaved} />
          <div className="footer-small">Tip: Keep suggestions short and actionable.</div>
        </div>

        <aside>
          <div className="card latest">
            <LatestSuggestion initial={latest} />
          </div>
        </aside>
      </div>
    </div>
  );
}
