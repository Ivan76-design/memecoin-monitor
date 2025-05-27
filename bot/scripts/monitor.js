require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');
const fs = require('fs');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const ALERTS_FILE = './backend/alerts.json';

function loadAlerts() {
  try {
    const data = fs.readFileSync(ALERTS_FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function checkPricesAndAlert() {
  const alerts = loadAlerts();
  for (const alert of alerts) {
    try {
      const url = `http://localhost:5000/api/price?contract=${alert.contractAddress}&chain=ethereum`;
      const res = await axios.get(url);
      const price = parseFloat(res.data.price);

      if (price >= alert.price) {
        await bot.telegram.sendMessage(
          alert.chatId,
          `🚨 ${alert.symbol} (${alert.contractAddress}) hit $${price}! Target: $${alert.price}`
        );
      }
    } catch (e) {
      console.error('Error checking or sending alert:', e.message);
    }
  }
}


bot.launch();
console.log('🔔 Telegram bot running and monitoring prices...');
setInterval(checkPricesAndAlert, 5000);
