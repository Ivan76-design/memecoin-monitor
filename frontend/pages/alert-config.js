import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function AlertConfig() {
  const [symbol, setSymbol] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [price, setPrice] = useState('');
  const [chatId, setChatId] = useState('');
  const [message, setMessage] = useState('');

  const saveConfig = async () => {
    const res = await fetch('http://localhost:5000/api/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol, contractAddress, price: parseFloat(price), chatId }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔔 Telegram Alert Configuration</h1>
      <input className={styles.input} placeholder="Symbol (e.g., PEPE)" value={symbol} onChange={e => setSymbol(e.target.value)} />
      <input className={styles.input} placeholder="Contract Address (0x...)" value={contractAddress} onChange={e => setContractAddress(e.target.value)} />
      <input className={styles.input} placeholder="Target Price (e.g., 0.01)" value={price} onChange={e => setPrice(e.target.value)} />
      <input className={styles.input} placeholder="Telegram Chat ID" value={chatId} onChange={e => setChatId(e.target.value)} />
      <button className={styles.button} onClick={saveConfig}>Save Alert</button>
      <p>{message}</p>
    </div>
  );
}
