import https from 'https';
import http from 'http';
import { URL } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Ping every 13 minutes to ensure we stay ahead of the 15-minute timeout
const PING_INTERVAL_MS = 13 * 60 * 1000;
const HEALTH_CHECK_URL = process.env.HEALTH_CHECK_URL || 'https://chatx-oyba.onrender.com/api/health';
const MAX_RETRIES = 3;
const RETRY_DELAY = 30000; // 30 seconds between retries

let consecutiveFailures = 0;
let totalPings = 0;
let successfulPings = 0;

console.log('🚀 ChatX Cold Start Prevention Service Started');
console.log(`📍 Target URL: ${HEALTH_CHECK_URL}`);
console.log(`⏰ Ping interval: ${PING_INTERVAL_MS / 60000} minutes`);
console.log(`🔄 Max retries per ping: ${MAX_RETRIES}`);
console.log('='.repeat(60));

// Enhanced ping function with retry logic
function performPing(retryCount = 0) {
  const url = new URL(HEALTH_CHECK_URL);
  const client = url.protocol === 'https:' ? https : http;
  
  const startTime = Date.now();
  totalPings++;
  
  const req = client.get(HEALTH_CHECK_URL, {
    timeout: 30000, // 30 second timeout
    headers: {
      'User-Agent': 'ChatX-KeepAlive-Service/1.0',
      'Accept': 'application/json'
    }
  }, (res) => {
    const responseTime = Date.now() - startTime;
    
    if (res.statusCode === 200) {
      successfulPings++;
      consecutiveFailures = 0;
      console.log(`✅ Ping #${totalPings} successful - Status: ${res.statusCode} | Response time: ${responseTime}ms | Success rate: ${((successfulPings/totalPings)*100).toFixed(1)}% | ${new Date().toISOString()}`);
    } else {
      consecutiveFailures++;
      console.log(`⚠️ Ping #${totalPings} returned status: ${res.statusCode} | Response time: ${responseTime}ms | ${new Date().toISOString()}`);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`🔄 Retrying in ${RETRY_DELAY/1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
        setTimeout(() => performPing(retryCount + 1), RETRY_DELAY);
      }
    }
    
    // Alert if too many consecutive failures
    if (consecutiveFailures >= 3) {
      console.log(`🚨 WARNING: ${consecutiveFailures} consecutive failures detected!`);
    }
  });
  
  req.on('timeout', () => {
    req.destroy();
    consecutiveFailures++;
    console.error(`⏰ Ping #${totalPings} timed out after 30 seconds | ${new Date().toISOString()}`);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`🔄 Retrying due to timeout... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      setTimeout(() => performPing(retryCount + 1), RETRY_DELAY);
    }
  });
  
  req.on('error', (e) => {
    consecutiveFailures++;
    console.error(`❌ Ping #${totalPings} failed | Error: ${e.message} | ${new Date().toISOString()}`);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`🔄 Retrying due to error... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      setTimeout(() => performPing(retryCount + 1), RETRY_DELAY);
    }
  });
}

// Initial ping
console.log('🎯 Performing initial ping...');
performPing();

// Set interval for periodic pings
setInterval(() => {
  performPing();
}, PING_INTERVAL_MS);

// Display stats every hour
setInterval(() => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  
  console.log('\n📊 === PING SERVICE STATS ===');
  console.log(`⏰ Service uptime: ${hours}h ${minutes}m`);
  console.log(`📈 Total pings: ${totalPings}`);
  console.log(`✅ Successful pings: ${successfulPings}`);
  console.log(`📊 Success rate: ${totalPings > 0 ? ((successfulPings/totalPings)*100).toFixed(1) : 0}%`);
  console.log(`🔴 Consecutive failures: ${consecutiveFailures}`);
  console.log('='.repeat(35) + '\n');
}, 60 * 60 * 1000); // Every hour

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down ping service...');
  console.log(`📊 Final stats - Total pings: ${totalPings} | Successful: ${successfulPings} | Success rate: ${totalPings > 0 ? ((successfulPings/totalPings)*100).toFixed(1) : 0}%`);
  console.log('👋 Ping service stopped gracefully');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down ping service...');
  process.exit(0);
});
