import axios from 'axios';
import chalk from 'chalk';

const ENDPOINTS = [
  { name: 'Frontend', url: 'http://localhost:3000', type: 'web' },
  { name: 'API Server', url: 'http://localhost:4000/api/v1', type: 'api' },
  { name: 'API Proxy', url: 'http://localhost:3000/api/v1', type: 'proxy' },
];

const CHECK_INTERVAL = 10000; // 10 seconds

async function checkHealth() {
  console.log(chalk.blue(`\n[${new Date().toLocaleTimeString()}] 🏥 Running Health Checks...`));

  for (const endpoint of ENDPOINTS) {
    try {
      const start = Date.now();
      const response = await axios.get(endpoint.url, { timeout: 5000 });
      const duration = Date.now() - start;

      if (response.status >= 200 && response.status < 300) {
        console.log(
          chalk.green(`  ✅ ${endpoint.name.padEnd(12)} | `) +
          chalk.white(`Status: ${response.status} | `) +
          chalk.gray(`Latency: ${duration}ms`)
        );
      } else {
        console.log(
          chalk.yellow(`  ⚠️  ${endpoint.name.padEnd(12)} | `) +
          chalk.white(`Status: ${response.status}`)
        );
      }
    } catch (error: any) {
      console.log(
        chalk.red(`  ❌ ${endpoint.name.padEnd(12)} | `) +
        chalk.white(`Error: ${error.message || 'Connection Refused'}`)
      );
    }
  }
}

console.log(chalk.cyan.bold('=== NEXUS Health Monitor Started ==='));
console.log(chalk.gray(`Monitoring ${ENDPOINTS.length} endpoints every ${CHECK_INTERVAL / 1000}s`));

// Initial check
checkHealth();

// Interval check
setInterval(checkHealth, CHECK_INTERVAL);
