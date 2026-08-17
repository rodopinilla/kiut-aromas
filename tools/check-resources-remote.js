const http = require('http');
const https = require('https');
const { URL } = require('url');

const root = process.argv[2] || 'http://127.0.0.1:3000/app/index.html';

function get(url) {
  return new Promise((res, rej) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (r) => {
      let body = '';
      r.on('data', (c) => body += c);
      r.on('end', () => res({ status: r.statusCode, body }));
    }).on('error', rej);
  });
}

function head(url) {
  return new Promise((res) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, { method: 'HEAD' }, (r) => res({ status: r.statusCode }));
    req.on('error', (e) => res({ error: e.message }));
    req.end();
  });
}

(async () => {
  console.log('Fetching', root);
  const fetched = await get(root);
  if (!fetched || fetched.status >= 400) { console.error('Failed to fetch root HTML', fetched && fetched.status); process.exit(1); }
  const html = fetched.body;
  const urls = new Set();
  const re = /(?:src|href)=\"([^\"]+)\"/g;
  let m;
  while ((m = re.exec(html)) !== null) urls.add(m[1]);
  const re2 = /url\(['\"]?([^'"\)]+)['\"]?\)/g;
  while ((m = re2.exec(html)) !== null) urls.add(m[1]);

  const checks = [];
  for (const u of urls) {
    if (u.startsWith('data:') || u.startsWith('mailto:') || u.startsWith('#')) continue;
    let target;
    try {
      target = new URL(u, root).toString();
    } catch { target = root.replace(/\/[^\/]*$/, '/') + u; }
    checks.push({ u, target });
  }

  const results = [];
  for (const c of checks) {
    const r = await head(c.target);
    results.push({ url: c.u, target: c.target, status: r.status, error: r.error });
  }

  results.forEach(r => {
    if (r.error) console.log('[ERR]', r.error, r.url, '->', r.target);
    else console.log(r.status, r.url, '->', r.target);
  });
})();