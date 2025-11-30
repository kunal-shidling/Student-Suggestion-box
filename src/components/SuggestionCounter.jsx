import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function SuggestionCounter({ refreshTrigger }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCount();
  }, [refreshTrigger]);

  async function fetchCount() {
    try {
      const { count, error } = await supabase
        .from("suggestions")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      setCount(count || 0);
    } catch (err) {
      console.error("Error fetching count:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="suggestion-counter">
      <div className="counter-icon">📊</div>
      <div className="counter-content">
        <div className="counter-label">Total Suggestions</div>
        <div className="counter-value">
          {loading ? "..." : count.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
