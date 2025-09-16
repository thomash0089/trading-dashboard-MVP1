import React, { useState, useEffect } from "react";
import axios from "axios";

interface StockData {
  ticker: string;
  price: string;
}

const BACKEND_API_URL = process.env.REACT_APP_API_URL || "https://your-backend-url.onrender.com";

const Dashboard: React.FC = () => {
  const [ticker, setTicker] = useState<string>("AAPL");
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setData(null);
    setError("");
    if (ticker) {
      setLoading(true);
      axios
        .get<StockData>(`${BACKEND_API_URL}/stock/${ticker}`)
        .then(res => setData(res.data))
        .catch(e => setError("API-Fehler oder Ticker nicht gefunden"))
        .finally(() => setLoading(false));
    }
  }, [ticker]);

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Stock Price Lookup</h2>
      <label>
        Ticker:&nbsp;
        <input
          type="text"
          value={ticker}
          onChange={e => setTicker(e.target.value.toUpperCase())}
          style={{ fontSize: "1rem" }}
        />
      </label>
      <button
        onClick={() => setTicker(ticker)}
        style={{ marginLeft: "1rem", padding: "0.5rem 1rem", fontWeight: "bold" }}
      >
        Abrufen
      </button>
      <div style={{ marginTop: 24 }}>
        {loading && <span>Lädt...</span>}
        {error && <span style={{ color: "red" }}>{error}</span>}
        {data && (
          <div style={{ background: "#fff", padding: "1.5rem", borderRadius: 8 }}>
            <h3>{data.ticker}</h3>
            <p>Preis: <b>{data.price}</b></p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
