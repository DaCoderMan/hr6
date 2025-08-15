/**
 * Logger Utility for HR News API
 * 
 * Copyright (c) 2025 Workitu Tech, Israel. All Rights Reserved.
 * 
 * This software is proprietary and confidential. Unauthorized use, reproduction, 
 * or distribution is strictly prohibited.
 */

// In-memory log storage (for Vercel serverless environment)
let logBuffer = [];
const MAX_LOG_BUFFER = 1000; // Keep last 1000 log entries in memory

// Log levels
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARNING: 2,
  ERROR: 3
};

// Current log level (can be set via environment variable)
const CURRENT_LOG_LEVEL = process.env.LOG_LEVEL ? LOG_LEVELS[process.env.LOG_LEVEL.toUpperCase()] : LOG_LEVELS.INFO;

function addToLogBuffer(level, message, data = null, error = null, context = null) {
  const logEntry = {
    level: level,
    timestamp: new Date().toISOString(),
    message: message,
    data: data,
    error: error ? {
      name: error.name,
      message: error.message,
      stack: error.stack
    } : null,
    context: context
  };
  
  logBuffer.push(logEntry);
  
  // Keep buffer size manageable
  if (logBuffer.length > MAX_LOG_BUFFER) {
    logBuffer = logBuffer.slice(-MAX_LOG_BUFFER);
  }
  
  return logEntry;
}

function shouldLog(level) {
  return LOG_LEVELS[level] >= CURRENT_LOG_LEVEL;
}

function logInfo(message, data = null) {
  if (!shouldLog('INFO')) return null;
  
  const logEntry = addToLogBuffer('INFO', message, data);
  console.log(`[INFO] ${logEntry.timestamp}: ${message}`, data ? JSON.stringify(data, null, 2) : '');
  return logEntry;
}

function logError(message, error = null, context = null) {
  if (!shouldLog('ERROR')) return null;
  
  const logEntry = addToLogBuffer('ERROR', message, null, error, context);
  console.error(`[ERROR] ${logEntry.timestamp}: ${message}`, error ? error.stack : '', context ? JSON.stringify(context, null, 2) : '');
  return logEntry;
}

function logWarning(message, data = null) {
  if (!shouldLog('WARNING')) return null;
  
  const logEntry = addToLogBuffer('WARNING', message, data);
  console.warn(`[WARNING] ${logEntry.timestamp}: ${message}`, data ? JSON.stringify(data, null, 2) : '');
  return logEntry;
}

function logDebug(message, data = null) {
  if (!shouldLog('DEBUG')) return null;
  
  const logEntry = addToLogBuffer('DEBUG', message, data);
  console.log(`[DEBUG] ${logEntry.timestamp}: ${message}`, data ? JSON.stringify(data, null, 2) : '');
  return logEntry;
}

// Performance monitoring
function measurePerformance(operation, fn) {
  const startTime = Date.now();
  try {
    const result = fn();
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    logInfo(`Performance: ${operation} completed in ${duration}ms`);
    
    if (duration > 1000) {
      logWarning(`Performance: ${operation} took longer than 1 second (${duration}ms)`);
    }
    
    return result;
  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    logError(`Performance: ${operation} failed after ${duration}ms`, error);
    throw error;
  }
}

// Get logs for debugging
function getLogs(level = null, limit = 100) {
  let filteredLogs = logBuffer;
  
  if (level) {
    filteredLogs = logBuffer.filter(log => log.level === level);
  }
  
  return filteredLogs.slice(-limit);
}

// Get log statistics
function getLogStats() {
  const stats = {
    total: logBuffer.length,
    byLevel: {},
    recentErrors: [],
    performance: {
      avgResponseTime: 0,
      slowestOperations: []
    }
  };
  
  // Count by level
  logBuffer.forEach(log => {
    stats.byLevel[log.level] = (stats.byLevel[log.level] || 0) + 1;
  });
  
  // Get recent errors
  stats.recentErrors = logBuffer
    .filter(log => log.level === 'ERROR')
    .slice(-10)
    .map(log => ({
      timestamp: log.timestamp,
      message: log.message,
      error: log.error
    }));
  
  return stats;
}

// Clear logs (useful for memory management)
function clearLogs() {
  const count = logBuffer.length;
  logBuffer = [];
  logInfo(`Logs cleared. Removed ${count} entries.`);
  return count;
}

// Export functions
export {
  logInfo,
  logError,
  logWarning,
  logDebug,
  measurePerformance,
  getLogs,
  getLogStats,
  clearLogs,
  LOG_LEVELS,
  CURRENT_LOG_LEVEL
};
