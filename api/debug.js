/**
 * Debug API Endpoint for HR News Scraper
 * 
 * Copyright (c) 2025 Workitu Tech, Israel. All Rights Reserved.
 * 
 * This software is proprietary and confidential. Unauthorized use, reproduction, 
 * or distribution is strictly prohibited.
 */

import { getLogs, getLogStats, clearLogs, logInfo, logError, logWarning, CURRENT_LOG_LEVEL } from './logger.js';

export default function handler(req, res) {
  const requestId = Math.random().toString(36).substring(2, 15);
  const startTime = Date.now();
  
  logInfo(`Debug API Request started`, { 
    requestId: requestId,
    method: req.method,
    url: req.url,
    userAgent: req.headers['user-agent']
  });

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    logInfo(`Debug API CORS preflight handled`, { requestId: requestId });
    res.status(200).end();
    return;
  }

  // Handle GET requests
  if (req.method === 'GET') {
    try {
      const { level, limit, action } = req.query;
      
      logInfo(`Processing debug request`, { 
        requestId: requestId,
        level: level,
        limit: limit,
        action: action
      });

      let responseData = {
        success: true,
        requestId: requestId,
        timestamp: new Date().toISOString(),
        performance: {
          totalTime: Date.now() - startTime
        }
      };

      // Handle different debug actions
      switch (action) {
        case 'logs':
          const logLevel = level || null;
          const logLimit = parseInt(limit) || 100;
          responseData.logs = getLogs(logLevel, logLimit);
          responseData.logCount = responseData.logs.length;
          break;
          
        case 'stats':
          responseData.stats = getLogStats();
          break;
          
        case 'system':
          responseData.system = {
            nodeVersion: process.version,
            platform: process.platform,
            arch: process.arch,
            memoryUsage: process.memoryUsage(),
            uptime: process.uptime(),
            logLevel: CURRENT_LOG_LEVEL,
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString()
          };
          break;
          
        case 'clear':
          const clearedCount = clearLogs();
          responseData.cleared = clearedCount;
          responseData.message = `Cleared ${clearedCount} log entries`;
          break;
          
        default:
          // Return all debug information
          responseData.logs = getLogs(null, 50);
          responseData.stats = getLogStats();
          responseData.system = {
            nodeVersion: process.version,
            platform: process.platform,
            arch: process.arch,
            memoryUsage: process.memoryUsage(),
            uptime: process.uptime(),
            logLevel: CURRENT_LOG_LEVEL,
            environment: process.env.NODE_ENV || 'development'
          };
          break;
      }

      logInfo(`Debug request completed successfully`, { 
        requestId: requestId,
        totalTime: Date.now() - startTime,
        action: action
      });

      res.status(200).json(responseData);
      
    } catch (error) {
      const errorData = {
        success: false,
        requestId: requestId,
        error: error.message,
        timestamp: new Date().toISOString(),
        performance: {
          totalTime: Date.now() - startTime
        }
      };
      
      logError(`Debug request failed`, error, { 
        requestId: requestId,
        totalTime: Date.now() - startTime,
        method: req.method,
        url: req.url
      });
      
      res.status(500).json(errorData);
    }
  } else {
    // Method not allowed
    logWarning(`Debug API method not allowed`, { 
      requestId: requestId,
      method: req.method,
      allowedMethods: ['GET', 'OPTIONS']
    });
    
    res.status(405).json({ 
      error: 'Method not allowed',
      requestId: requestId,
      allowedMethods: ['GET', 'OPTIONS']
    });
  }
}
