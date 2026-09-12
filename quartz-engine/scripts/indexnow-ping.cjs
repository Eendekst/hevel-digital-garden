const https = require('https');
const fs = require('fs');
const path = require('path');

const host = 'garden.hevel.ca';
const key = 'hevelca0indexnowkey202688998899';
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [`https://${host}/`];

const contentIndexPath = path.join(__dirname, '..', 'public', 'static', 'contentIndex.json');
if (fs.existsSync(contentIndexPath)) {
  try {
    const raw = fs.readFileSync(contentIndexPath, 'utf-8');
    const index = JSON.parse(raw);
    for (const slug of Object.keys(index)) {
      if (slug !== 'index' && slug !== '404') {
        urlList.push(`https://${host}/${slug}`);
      }
    }
  } catch (e) {
    console.error('Error reading contentIndex.json:', e.message);
  }
}

const payload = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log(`🚀 Sending IndexNow ping for ${host} (${urlList.length} URLs)...`);

const req = https.request(options, (res) => {
  console.log(`✅ [IndexNow] (${host}) Response Status: ${res.statusCode} ${res.statusMessage}`);
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (e) => {
  console.error(`❌ [IndexNow] Error for ${host}:`, e.message);
});

req.write(payload);
req.end();
