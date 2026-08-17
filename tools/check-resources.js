const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const root = 'http://127.0.0.1:3000';
const html = fs.readFileSync(path.join(__dirname, '..', 'served_index.html'), 'utf8');

const urls = new Set();
const re = /(?:src|href)=\"([^\"]+)\"/g;
let m;
while ((m = re.exec(html)) !== null) urls.add(m[1]);

// Also find url('...') in style attributes
const re2 = /url\(['\"]?([^'"\)]+)['\"]?\)/g;
while ((m = re2.exec(html)) !== null) urls.add(m[1]);

const toCheck = Array.from(urls).filter(u => !u.startsWith('data:') && !u.startsWith('http'));

function check(u) {
  return new Promise((res) => {
    const target = u.startsWith('/') ? root + u : (u.startsWith('./') ? root + '/' + u.replace(/^\.\//, '') : root + '/' + u);
    const client = target.startsWith('https') ? https : http;
    const req = client.request(target, { method: 'HEAD' }, (r) => {
      res({ url: u, target, status: r.statusCode });
    });
    req.on('error', (e) => res({ url: u, target, error: e.message }));
    req.end();
  });
}

(async () => {
  const results = [];
  for (const u of toCheck) {
    // ignore anchors and mailto
    if (u.startsWith('#') || u.startsWith('mailto:')) continue;
    results.push(await check(u));
  }
  console.log('Checked', results.length, 'resources');
  results.forEach(r => {
    if (r.error) console.log('[ERR]', r.url, '->', r.error);
    else console.log(r.status, r.url, '->', r.target);
  });
})();