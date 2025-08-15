const https = require('https');

console.log('🧪 Testing HR4AL.co API fix...\n');

const testUrl = 'https://hr6-cxk122nll-yonatan-perlins-projects.vercel.app/api/test';

https.get(testUrl, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ API Test Endpoint:');
    console.log('Status:', res.statusCode);
    console.log('Content-Type:', res.headers['content-type']);
    console.log('Response:', data);
    
    // Test main API
    const mainUrl = 'https://hr6-cxk122nll-yonatan-perlins-projects.vercel.app/api';
    
    https.get(mainUrl, (res2) => {
      let data2 = '';
      
      res2.on('data', (chunk) => {
        data2 += chunk;
      });
      
      res2.on('end', () => {
        console.log('\n✅ Main API Endpoint:');
        console.log('Status:', res2.statusCode);
        console.log('Content-Type:', res2.headers['content-type']);
        
        try {
          const jsonData = JSON.parse(data2);
          console.log('✅ Valid JSON response!');
          console.log('News count:', jsonData.news_count);
          console.log('Success:', jsonData.success);
        } catch (e) {
          console.log('❌ Invalid JSON:', e.message);
          console.log('Response preview:', data2.substring(0, 200));
        }
      });
    }).on('error', (err) => {
      console.log('❌ Main API Error:', err.message);
    });
  });
}).on('error', (err) => {
  console.log('❌ Test API Error:', err.message);
});
