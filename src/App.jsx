import React from "react";
import "./index.css";

function App() {
  return (
    <div className="container">
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "16px" }}>
          🚀 Inner Rebuild Library
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#737373" }}>
          Your gamified reading journey starts here!
        </p>
      </header>
      
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>✅ App is Working!</h2>
        <p style={{ marginBottom: "20px" }}>
          Your Inner Rebuild Library dashboard is ready for development.
        </p>
        
        <div style={{ display: "grid", gap: "12px" }}>
          <div style={{ padding: "12px", background: "#f0f9ff", borderRadius: "8px" }}>
            📚 <strong>Store:</strong> Browse and purchase ebooks
          </div>
          <div style={{ padding: "12px", background: "#fef7ed", borderRadius: "8px" }}>
            📖 <strong>Library:</strong> Your owned books and progress
          </div>
          <div style={{ padding: "12px", background: "#f0fdf4", borderRadius: "8px" }}>
            ⏱️ <strong>Reader:</strong> Timer-based reading sessions
          </div>
          <div style={{ padding: "12px", background: "#fdf2f8", borderRadius: "8px" }}>
            ✍️ <strong>Journal:</strong> Reflection prompts and insights
          </div>
        </div>
        
        <button className="btn-primary" style={{ marginTop: "24px", width: "100%" }}>
          Ready to Build! 🎉
        </button>
      </div>
    </div>
  );
}

export default App;
