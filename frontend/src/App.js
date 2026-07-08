import { useEffect, useState } from "react";
import "./App.css";

// Replace this with your real Render backend URL once deployed.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(
          data.status === "ok"
            ? "✅ Backend + DB connected"
            : `⚠️ ${data.detail}`
        );
      })
      .catch(() => setStatus("❌ Backend not reachable yet"));
  }, []);

  return (
    <div className="App">
      <div className="card">
        <h1>Price Watcher</h1>
        <p>Frontend skeleton deployed. Backend status:</p>
        <div className="status">{status}</div>
      </div>
    </div>
  );
}

export default App;
