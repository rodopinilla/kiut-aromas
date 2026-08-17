const { chromium } = require('playwright');
const fs = require('fs');
const outFile = require('path').join(__dirname, 'capture-output.json');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const logs = [];
  page.on('console', (msg) => {
    const entry = { kind: 'console', type: msg.type(), text: msg.text() };
    logs.push(entry);
    console.log(`[PAGE ${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', (err) => {
    const entry = { kind: 'pageerror', text: err.message };
    logs.push(entry);
    console.error('[PAGE ERROR]', err.message);
  });

  page.on('response', (response) => {
    const status = response.status();
    if (status >= 400) {
      const entry = { kind: 'network', status, url: response.url() };
      logs.push(entry);
      console.error('[NETWORK ERROR]', status, response.url());
    }
  });

  page.on('requestfailed', (req) => {
    const entry = { kind: 'requestfailed', url: req.url(), error: req.failure() && req.failure().errorText };
    logs.push(entry);
    console.error('[REQUEST FAILED]', req.url(), req.failure() && req.failure().errorText);
  });

  await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
  // wait a bit for JS to initialize
  await page.waitForTimeout(2000);

  // capture DOM ready state
  const ready = await page.evaluate(() => document.readyState + ' - ' + location.href);
  logs.push({ kind: 'pageready', value: ready });
  console.log('[PAGE READY] ' + ready);

  await browser.close();

  try {
    fs.writeFileSync(outFile, JSON.stringify(logs, null, 2), 'utf8');
    console.log('WROTE LOGS:', outFile);
  } catch (e) {
    console.error('Failed to write logs:', e && e.message);
  }
})();