/**
 * Deployment Diagnostics API for HR News Scraper
 * 
 * Copyright (c) 2025 Workitu Tech, Israel. All Rights Reserved.
 * 
 * This software is proprietary and confidential. Unauthorized use, reproduction, 
 * or distribution is strictly prohibited.
 */

import { 
  runDeploymentChecks, 
  getDeploymentLogs, 
  getDeploymentStatus,
  logDeployment 
} from './deployment-logger.js';

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
    try {
      const diagnostics = {
        success: true,
        timestamp: new Date().toISOString(),
        environment: {
          node_env: process.env.NODE_ENV || 'not set',
          vercel_env: process.env.VERCEL_ENV || 'not set',
          vercel_url: process.env.VERCEL_URL || 'not set'
        },
        request: {
          method: req.method,
          url: req.url,
          headers: req.headers,
          query: req.query
        },
        api_status: 'working',
        message: 'Deployment diagnostics endpoint is working correctly'
      };

      res.status(200).json(diagnostics);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  } else {
    res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['GET', 'OPTIONS']
    });
  }
}
