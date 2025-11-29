import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function LatestSuggestion({ initial }){
  const [row, setRow] = useState(initial || null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(!initial) fetchLatest();
    else setRow(initial);
    // eslint-disable-next-line
  }, [initial]);

  async function fetchLatest(){
    setLoading(true);
    const { data, error } = await supabase
      .from("suggestions")
      .select("*")
      .order("created_at", { ascending:false })
      .limit(1);

    if(!error && data && data.length) setRow(data[0]);
    setLoading(false);
  }

  if(loading) return <div className="empty card">Loading latest suggestion…</div>;

  if(!row) return (
    <div className="empty">
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 8a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7l-4 4V8z" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
      <div style={{fontWeight:700}}>No suggestions yet</div>
      <div className="small">Submit the first suggestion using the form.</div>
    </div>
  );

  return (
    <div>
      <div className="meta">
        <div>
          <div className="name">{row.student_name}</div>
          <div className="small">{row.department} • {new Date(row.created_at).toLocaleString()}</div>
        </div>
        <div>
          <span className={`urgency ${row.urgency}`} aria-hidden>{row.urgency.toUpperCase()}</span>
        </div>
      </div>

      <div className="message">{row.suggestion_message}</div>

      <div style={{marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div className="small">ID: {row.id}</div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost" onClick={fetchLatest}>Refresh</button>
        </div>
      </div>
    </div>
  );
}
