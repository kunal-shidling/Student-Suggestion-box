import React, { useState } from "react";
import { supabase } from "./supabaseClient";

export default function SuggestionForm({ onSaved }){
  const [studentName, setStudentName] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [urgency, setUrgency] = useState("low");
  const [status, setStatus] = useState({ text:"", type:"" });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    if(!studentName.trim() || !department.trim() || !message.trim()){
      setStatus({ text:"Please fill all fields", type:"error" });
      return;
    }

    setSaving(true);
    setStatus({ text:"Saving...", type:"" });

    try {
      const { data, error } = await supabase
        .from("suggestions")
        .insert([{
          student_name: studentName,
          department,
          suggestion_message: message,
          urgency
        }])
        .select();

      if(error) throw error;
      const saved = data?.[0] ?? null;
      setStatus({ text:"Saved successfully!", type:"success" });
      setStudentName(""); setDepartment(""); setMessage(""); setUrgency("low");
      if(onSaved && saved) onSaved(saved);
    } catch(err){
      setStatus({ text: err.message || "Could not save", type:"error" });
    } finally {
      setSaving(false);
      setTimeout(()=> setStatus({ text:"", type:"" }), 2200);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a suggestion</h2>

      <div className="field">
        <label>Student name</label>
        <input type="text" value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Your full name" />
      </div>

      <div className="field">
        <label>Department</label>
        <input type="text" value={department} onChange={e=>setDepartment(e.target.value)} placeholder="e.g., Computer Science" />
      </div>

      <div className="field">
        <label>Suggestion message</label>
        <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Type your suggestion..." />
      </div>

      <div className="row">
        <div className="col field">
          <label>Urgency</label>
          <select value={urgency} onChange={e=>setUrgency(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="col field">
          <label>Preview</label>
          <div style={{padding:10,border:'1px dashed #eef2ff',borderRadius:8, background:'#fcfeff', minHeight:48}}>
            <div style={{fontWeight:700}}>{studentName || <span className="small">Name</span>}</div>
            <div className="small">{department || <span className="small">Department</span>}</div>
          </div>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',marginTop:8, gap:12}}>
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Submit suggestion"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => { setStudentName(''); setDepartment(''); setMessage(''); setUrgency('low'); }}>
          Reset
        </button>

        {status.text && (
          <div className={`status ${status.type === 'success' ? 'success' : status.type === 'error' ? 'error' : ''}`}>
            {status.text}
          </div>
        )}
      </div>
    </form>
  );
}
