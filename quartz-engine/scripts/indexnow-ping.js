const https = require('https');
const fs = require('fs');
const path = require('path');

const host = 'garden.hevel.ca';
const key = 'hevelca0indexnowkey202688998899';
const keyLocation = `https://${host}/${key}.txt`;

// Collect all HTML files from Quartz output directory (public/)
function getAllUrls(dirPath, arrayOfUrls = []) {
  if (!fs.existsSync(dirPath)) return arrayOfUrls;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfUrls = getAllUrls(fullPath, arrayOfUrls);
    } else if (file.endsWith('.html')) {
      let relativePath = path.relative(path.join(__dirname, '../public'), fullPath).replace(/\\/g, '/');
      if (relativePath === 'index.html') {
        arrayOfUrls.push(`https://${host}/`);
      } else if (relativePath.endsWith('index.html')) {
        arrayOfUrls.push(`https://${host}/${relativePath.replace('/index.html', '')}`);
      } else {
        arrayOfUrls.push(`https://${host}/${relativePath.replace('.html', '')}`);
      }
    }
  });

  return arrayOfUrls;
}

const publicDir = path.join(__dirname, '../public');
let urlList = getAllUrls(publicDir);

if (urlList.length === 0) {
  urlList = [`https://${host}/`];
}

// Cap at 10,000 URLs max as per IndexNow protocol
urlList = urlList.slice(0, 10000);

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
