import { useEffect, useState } from "react";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("https://memecoin-backend-lx4b.onrender.com/api/prices");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        // Convert the object into an array of { name, price } objects
        const formattedData = Object.entries(data).map(([name, price]) => ({
          name,
          price,
        }));
        setPrices(formattedData);
      } catch (err) {
        console.error("Failed to fetch memecoin prices:", err);
        setPrices([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Live Memecoin Prices</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : prices.length > 0 ? (
        <ul className="space-y-4">
          {prices.map((coin, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p className="text-xl font-semibold capitalize">{coin.name}</p>
              <p className="text-gray-700">${coin.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-red-500">No data available.</p>
      )}
    </div>
  );
}
