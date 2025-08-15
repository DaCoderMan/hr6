export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET requests
  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      message: 'HR4AL.co API is working!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      endpoints: {
        '/api': 'Main API endpoint',
        '/api/test': 'Test endpoint',
        '/api/scrape': 'Python scraper endpoint'
      }
    });
  } else {
    res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['GET', 'OPTIONS']
    });
  }
}
