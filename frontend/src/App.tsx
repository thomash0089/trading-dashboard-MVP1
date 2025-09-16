import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";

const App: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", background: "#f4f6fa" }}>
      <header style={{ padding: "1rem", background: "#334155", color: "#fff" }}>
        <h1>Trading Dashboard Frontend</h1>
      </header>
      <main>
        <Dashboard />
      </main>
      <footer style={{ padding: "1rem", background: "#334155", color: "#fff", marginTop: "2rem" }}>
        Trading Dashboard © 2025
      </footer>
    </div>
  );
};

export default App;
