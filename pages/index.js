import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Temporary logo map – replace with real logos if you host them
const coinLogos = {
  doge: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  shiba: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
  pepe: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
};

export default function Home() {
  const [prices, setPrices] = useState({});
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      const res = await fetch("https://memecoin-backend-lx4b.onrender.com/api/prices");
      const data = await res.json();

      setPrices(data);
      // Build price history per coin
      setHistory((prev) => {
        const updated = { ...prev };
        Object.entries(data).forEach(([coin, price]) => {
          if (!updated[coin]) updated[coin] = [];
          updated[coin] = [...updated[coin].slice(-9), { time: new Date().toLocaleTimeString(), price }];
        });
        return updated;
      });
    } catch (err) {
      console.error("Failed to fetch memecoin prices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices(); // Initial fetch
    const interval = setInterval(fetchPrices, 10000); // Refresh every 10 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Live Memecoin Prices</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : Object.keys(prices).length === 0 ? (
        <p className="text-center text-red-500">No data available.</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(prices).map(([name, price]) => (
            <div key={name} className="border p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={coinLogos[name]}
                  alt={name}
                  className="w-10 h-10 rounded-full"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div>
                  <p className="text-xl font-semibold capitalize">{name}</p>
                  <p className="text-gray-700">${price.toFixed(8)}</p>
                </div>
              </div>
              {history[name] && history[name].l
