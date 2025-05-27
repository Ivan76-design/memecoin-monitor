import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/alerts')
      .then(res => res.json())
      .then(data => setAlerts(data));
  }, []);

  const deleteAlert = async (index) => {
    await fetch(`http://localhost:5000/api/alerts/${index}`, { method: 'DELETE' });
    setAlerts(alerts.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📋 Active Alerts</h1>
      {alerts.length === 0 && <p>No alerts yet.</p>}
      {alerts.map((alert, i) => (
        <div key={i} className={styles.alertRow}>
          <p><strong>{alert.symbol}</strong> @ ${alert.price} — {alert.contractAddress}</p>
          <button onClick={() => deleteAlert(i)} className={styles.button}>❌ Delete</button>
        </div>
      ))}
    </div>
  );
}
