import { useEffect, useState } from "react";

export default function Home() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("https://memecoin-backend-lx4b.onrender.com/api/prices");
        const data = await res.json();
        setPrices(data);
      } catch (err) {
        console.error("Failed to fetch memecoin prices:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Live Memecoin Prices</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : Object.keys(prices).length === 0 ? (
        <p className="text-center text-red-500">No data available.</p>
      ) : (
        <ul className="space-y-4">
          {Object.entries(prices).map(([name, price]) => (
            <li
              key={name}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="text-xl font-semibold capitali

}
