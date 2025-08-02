import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const PING_INTERVAL_MS = 14 * 60 * 1000; // Ping every 14 minutes (Render free tier sleeps after 15 mins)
const HEALTH_CHECK_URL = process.env.HEALTH_CHECK_URL || 'https://chatx-oyba.onrender.com/api/health';

console.log(`Starting ping service for: ${HEALTH_CHECK_URL}`);
console.log(`Ping interval: ${PING_INTERVAL_MS / 60000} minutes`);

// Initial ping
https.get(HEALTH_CHECK_URL, (res) => {
  console.log(`✅ Initial ping successful - Status: ${res.statusCode} at ${new Date().toISOString()}`);
}).on('error', (e) => {
  console.error(`❌ Initial ping failed:`, e.message);
});

// Set interval for periodic pings
setInterval(() => {
  https.get(HEALTH_CHECK_URL, (res) => {
    if (res.statusCode === 200) {
      console.log(`✅ Ping successful - Status: ${res.statusCode} at ${new Date().toISOString()}`);
    } else {
      console.log(`⚠️ Ping returned status: ${res.statusCode} at ${new Date().toISOString()}`);
    }
  }).on('error', (e) => {
    console.error(`❌ Ping failed at ${new Date().toISOString()}:`, e.message);
  });
}, PING_INTERVAL_MS);

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\n🛑 Ping service stopped');
  process.exit(0);
});
