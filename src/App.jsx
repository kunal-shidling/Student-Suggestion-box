import React, { useState } from "react";
import SuggestionForm from "./components/SuggestionForm";
import LatestSuggestion from "./components/LatestSuggestion";

export default function App(){
  const [latest, setLatest] = useState(null);

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
        <div className="badge">Demo • Supabase</div>
      </header>

      <div className="grid">
        <div className="card form">
          <SuggestionForm onSaved={row => setLatest(row)} />
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
