const { useState } = require("react");
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  // transition move one step up
  function transition(newMode, replace = false) {
    const newHistory = [...history]
    // replace is true then its back
    if (replace) {
      back()
    }
    newHistory.push(newMode);
    setHistory(prev => ([...prev, newMode]));
  }
  // this create back move one step down
  function back() {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
    }
    
  }
  const mode = history[history.length - 1];
  return { mode, transition, back, history };
}