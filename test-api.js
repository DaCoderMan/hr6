const https = require('https');

const testUrls = [
  'https://hr6-cguzh6e8x-yonatan-perlins-projects.vercel.app/api/test',
  'https://hr6-cguzh6e8x-yonatan-perlins-projects.vercel.app/api',
  'https://hr6-cguzh6e8x-yonatan-perlins-projects.vercel.app/'
];

function testUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`\n✅ ${url}`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers:`, res.headers);
        console.log(`Response:`, data.substring(0, 500) + (data.length > 500 ? '...' : ''));
        resolve({ status: res.statusCode, data });
      });
    });
    
    req.on('error', (err) => {
      console.log(`\n❌ ${url}`);
      console.log(`Error:`, err.message);
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      console.log(`\n⏰ ${url} - Timeout`);
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function runTests() {
  console.log('🧪 Testing HR4AL.co API endpoints...\n');
  
  for (const url of testUrls) {
    try {
      await testUrl(url);
    } catch (error) {
      console.log(`Failed to test ${url}:`, error.message);
    }
  }
  
  console.log('\n🎉 Testing completed!');
}

runTests();
