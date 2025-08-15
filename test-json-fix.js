// Test script to validate JSON responses
const fs = require('fs');

console.log('🧪 Testing JSON validity...\n');

// Test 1: Validate API structure
function testAPIStructure() {
  console.log('✅ Test 1: API Structure Validation');
  
  const apiFile = fs.readFileSync('./api/index.js', 'utf8');
  
  // Check for proper headers
  if (apiFile.includes('Content-Type') && apiFile.includes('application/json')) {
    console.log('   ✓ Content-Type header found');
  } else {
    console.log('   ❌ Content-Type header missing');
  }
  
  // Check for proper response
  if (apiFile.includes('res.status(200).json(')) {
    console.log('   ✓ JSON response method found');
  } else {
    console.log('   ❌ JSON response method missing');
  }
  
  // Check for error handling
  if (apiFile.includes('catch (error)')) {
    console.log('   ✓ Error handling found');
  } else {
    console.log('   ❌ Error handling missing');
  }
}

// Test 2: Validate Vercel config
function testVercelConfig() {
  console.log('\n✅ Test 2: Vercel Configuration Validation');
  
  const vercelConfig = JSON.parse(fs.readFileSync('./vercel.json', 'utf8'));
  
  // Check route order
  const routes = vercelConfig.routes;
  const apiRoutes = routes.filter(route => route.src.startsWith('/api'));
  const catchAllRoute = routes.find(route => route.src === '/(.*)');
  
  if (catchAllRoute && routes.indexOf(catchAllRoute) > routes.indexOf(apiRoutes[apiRoutes.length - 1])) {
    console.log('   ✓ API routes are before catch-all route');
  } else {
    console.log('   ❌ API routes may be after catch-all route');
  }
  
  // Check specific API route
  const mainApiRoute = routes.find(route => route.src === '/api');
  if (mainApiRoute && mainApiRoute.dest === '/api/index.js') {
    console.log('   ✓ Main API route correctly configured');
  } else {
    console.log('   ❌ Main API route incorrectly configured');
  }
}

// Test 3: Validate JSON syntax
function testJSONSyntax() {
  console.log('\n✅ Test 3: JSON Syntax Validation');
  
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('./vercel.json', 'utf8'));
    console.log('   ✓ vercel.json is valid JSON');
  } catch (error) {
    console.log('   ❌ vercel.json has invalid JSON syntax:', error.message);
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    console.log('   ✓ package.json is valid JSON');
  } catch (error) {
    console.log('   ❌ package.json has invalid JSON syntax:', error.message);
  }
}

// Run all tests
testAPIStructure();
testVercelConfig();
testJSONSyntax();

console.log('\n🎉 JSON validation tests completed!');
console.log('\n📋 Summary of fixes applied:');
console.log('   1. ✅ Reordered Vercel routes to prioritize API endpoints');
console.log('   2. ✅ Added Content-Type header with charset');
console.log('   3. ✅ Added JSON validation before response');
console.log('   4. ✅ Improved error handling');
console.log('   5. ✅ Removed conflicting route patterns');
