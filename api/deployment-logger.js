/**
 * Deployment Logger for Vercel - HR News Scraper
 * 
 * Copyright (c) 2025 Workitu Tech, Israel. All Rights Reserved.
 * 
 * This software is proprietary and confidential. Unauthorized use, reproduction, 
 * or distribution is strictly prohibited.
 */

// Deployment-specific log storage
let deploymentLogs = [];
const MAX_DEPLOYMENT_LOGS = 500;

// Deployment status tracking
let deploymentStatus = {
  initialized: false,
  buildStartTime: null,
  buildEndTime: null,
  deploymentErrors: [],
  warnings: [],
  environmentChecks: {},
  fileChecks: {},
  dependencyChecks: {},
  runtimeChecks: {}
};

// Log levels for deployment
const DEPLOYMENT_LOG_LEVELS = {
  CRITICAL: 0,
  ERROR: 1,
  WARNING: 2,
  INFO: 3,
  DEBUG: 4
};

function logDeployment(level, message, data = null, error = null) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    level: level,
    timestamp: timestamp,
    message: message,
    data: data,
    error: error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    } : null
  };
  
  deploymentLogs.push(logEntry);
  
  // Keep buffer size manageable
  if (deploymentLogs.length > MAX_DEPLOYMENT_LOGS) {
    deploymentLogs = deploymentLogs.slice(-MAX_DEPLOYMENT_LOGS);
  }
  
  // Console output with deployment prefix
  const prefix = `[DEPLOYMENT-${level}]`;
  const timeStr = timestamp.split('T')[1].split('.')[0];
  
  switch (level) {
    case 'CRITICAL':
      console.error(`${prefix} ${timeStr}: ${message}`, error ? error.stack : '', data ? JSON.stringify(data, null, 2) : '');
      break;
    case 'ERROR':
      console.error(`${prefix} ${timeStr}: ${message}`, error ? error.stack : '', data ? JSON.stringify(data, null, 2) : '');
      break;
    case 'WARNING':
      console.warn(`${prefix} ${timeStr}: ${message}`, data ? JSON.stringify(data, null, 2) : '');
      break;
    case 'INFO':
      console.log(`${prefix} ${timeStr}: ${message}`, data ? JSON.stringify(data, null, 2) : '');
      break;
    case 'DEBUG':
      console.log(`${prefix} ${timeStr}: ${message}`, data ? JSON.stringify(data, null, 2) : '');
      break;
  }
  
  return logEntry;
}

// Environment validation
function checkEnvironment() {
  logDeployment('INFO', 'Starting environment validation');
  
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_REGION: process.env.VERCEL_REGION,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
    VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF,
    LOG_LEVEL: process.env.LOG_LEVEL
  };
  
  logDeployment('INFO', 'Environment variables', env);
  
  // Check critical environment variables
  if (!process.env.NODE_ENV) {
    logDeployment('WARNING', 'NODE_ENV not set, defaulting to development');
  }
  
  if (!process.env.VERCEL_ENV) {
    logDeployment('WARNING', 'VERCEL_ENV not set - may not be running on Vercel');
  }
  
  deploymentStatus.environmentChecks = {
    timestamp: new Date().toISOString(),
    variables: env,
    issues: []
  };
  
  return env;
}

// File system validation
async function checkFileSystem() {
  logDeployment('INFO', 'Starting file system validation');
  
  const fs = await import('fs');
  const path = await import('path');
  
  const requiredFiles = [
    'api/index.js',
    'api/logger.js',
    'api/debug.js',
    'vercel.json',
    'package.json',
    'index.html'
  ];
  
  const fileChecks = {};
  
  for (const file of requiredFiles) {
    try {
      const fullPath = path.default.join(process.cwd(), file);
      const exists = fs.default.existsSync(fullPath);
      const stats = exists ? fs.default.statSync(fullPath) : null;
      
      fileChecks[file] = {
        exists: exists,
        size: exists ? stats.size : 0,
        modified: exists ? stats.mtime.toISOString() : null,
        readable: exists ? true : false
      };
      
      if (!exists) {
        logDeployment('ERROR', `Required file missing: ${file}`);
        deploymentStatus.deploymentErrors.push(`Missing file: ${file}`);
      } else {
        logDeployment('INFO', `File validated: ${file} (${stats.size} bytes)`);
      }
      
    } catch (error) {
      logDeployment('ERROR', `Error checking file: ${file}`, null, error);
      deploymentStatus.deploymentErrors.push(`Error checking file: ${file}: ${error.message}`);
    }
  }
  
  deploymentStatus.fileChecks = {
    timestamp: new Date().toISOString(),
    files: fileChecks,
    totalFiles: requiredFiles.length,
    missingFiles: requiredFiles.filter(f => !fileChecks[f]?.exists),
    unreadableFiles: requiredFiles.filter(f => fileChecks[f]?.exists && !fileChecks[f]?.readable)
  };
  
  return fileChecks;
}

// Dependency validation
async function checkDependencies() {
  logDeployment('INFO', 'Starting dependency validation');
  
  const fs = await import('fs');
  const path = await import('path');
  
  try {
    const packageJsonPath = path.default.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.default.readFileSync(packageJsonPath, 'utf8'));
    
    logDeployment('INFO', 'Package.json loaded', {
      name: packageJson.name,
      version: packageJson.version,
      type: packageJson.type,
      engines: packageJson.engines
    });
    
    // Check for required fields
    if (!packageJson.type) {
      logDeployment('WARNING', 'Package.json missing "type" field');
    }
    
    if (packageJson.type !== 'module') {
      logDeployment('ERROR', 'Package.json "type" must be "module" for ES6 imports');
      deploymentStatus.deploymentErrors.push('Package.json type must be "module"');
    }
    
    if (!packageJson.engines || !packageJson.engines.node) {
      logDeployment('WARNING', 'Package.json missing Node.js engine specification');
    }
    
    deploymentStatus.dependencyChecks = {
      timestamp: new Date().toISOString(),
      packageJson: {
        name: packageJson.name,
        version: packageJson.version,
        type: packageJson.type,
        engines: packageJson.engines
      },
      issues: []
    };
    
    return packageJson;
    
  } catch (error) {
    logDeployment('ERROR', 'Failed to read or parse package.json', null, error);
    deploymentStatus.deploymentErrors.push(`Package.json error: ${error.message}`);
    return null;
  }
}

// Runtime validation
function checkRuntime() {
  logDeployment('INFO', 'Starting runtime validation');
  
  const runtimeInfo = {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    pid: process.pid,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cwd: process.cwd(),
    env: process.env.NODE_ENV || 'development'
  };
  
  logDeployment('INFO', 'Runtime information', runtimeInfo);
  
  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 18) {
    logDeployment('ERROR', `Node.js version ${nodeVersion} is too old. Required: >=18.0.0`);
    deploymentStatus.deploymentErrors.push(`Node.js version ${nodeVersion} too old`);
  } else {
    logDeployment('INFO', `Node.js version ${nodeVersion} is compatible`);
  }
  
  // Check memory usage
  const memUsage = process.memoryUsage();
  const memUsageMB = {
    rss: Math.round(memUsage.rss / 1024 / 1024),
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024)
  };
  
  if (memUsageMB.heapUsed > 512) {
    logDeployment('WARNING', `High memory usage: ${memUsageMB.heapUsed}MB heap used`);
  }
  
  deploymentStatus.runtimeChecks = {
    timestamp: new Date().toISOString(),
    runtime: runtimeInfo,
    memoryUsageMB: memUsageMB,
    issues: []
  };
  
  return runtimeInfo;
}

// Vercel-specific checks
function checkVercelEnvironment() {
  logDeployment('INFO', 'Starting Vercel environment validation');
  
  const vercelInfo = {
    isVercel: !!process.env.VERCEL_ENV,
    environment: process.env.VERCEL_ENV,
    region: process.env.VERCEL_REGION,
    url: process.env.VERCEL_URL,
    gitCommit: process.env.VERCEL_GIT_COMMIT_SHA,
    gitRef: process.env.VERCEL_GIT_COMMIT_REF,
    functionName: process.env.VERCEL_FUNCTION_NAME,
    functionRegion: process.env.VERCEL_FUNCTION_REGION
  };
  
  logDeployment('INFO', 'Vercel environment information', vercelInfo);
  
  if (!process.env.VERCEL_ENV) {
    logDeployment('WARNING', 'Not running on Vercel - some features may not work');
  }
  
  if (!process.env.VERCEL_REGION) {
    logDeployment('WARNING', 'VERCEL_REGION not set');
  }
  
  return vercelInfo;
}

// Module import validation
async function validateImports() {
  logDeployment('INFO', 'Starting module import validation');
  
  const importErrors = [];
  
  try {
    // Test import of logger
    const { logInfo } = await import('./logger.js');
    logDeployment('INFO', 'Logger module imported successfully');
  } catch (error) {
    logDeployment('ERROR', 'Failed to import logger module', null, error);
    importErrors.push(`Logger import error: ${error.message}`);
  }
  
  try {
    // Test ES6 import syntax
    const testModule = await import('./logger.js');
    logDeployment('INFO', 'ES6 import syntax is supported');
  } catch (error) {
    logDeployment('ERROR', 'ES6 import syntax not supported', null, error);
    importErrors.push(`ES6 import error: ${error.message}`);
  }
  
  return importErrors;
}

// Comprehensive deployment check
async function runDeploymentChecks() {
  logDeployment('INFO', '=== STARTING DEPLOYMENT VALIDATION ===');
  
  deploymentStatus.initialized = true;
  deploymentStatus.buildStartTime = new Date().toISOString();
  
  try {
    // Run all checks
    const env = checkEnvironment();
    const files = await checkFileSystem();
    const deps = await checkDependencies();
    const runtime = checkRuntime();
    const vercel = checkVercelEnvironment();
    const importErrors = await validateImports();
    
    // Summary
    const totalErrors = deploymentStatus.deploymentErrors.length;
    const totalWarnings = deploymentStatus.warnings.length;
    
    logDeployment('INFO', '=== DEPLOYMENT VALIDATION SUMMARY ===', {
      totalErrors,
      totalWarnings,
      environment: env ? 'OK' : 'FAILED',
      files: files ? 'OK' : 'FAILED',
      dependencies: deps ? 'OK' : 'FAILED',
      runtime: runtime ? 'OK' : 'FAILED',
      vercel: vercel ? 'OK' : 'FAILED',
      imports: importErrors.length === 0 ? 'OK' : 'FAILED'
    });
    
    if (totalErrors > 0) {
      logDeployment('CRITICAL', `Deployment validation failed with ${totalErrors} errors`);
      logDeployment('ERROR', 'Deployment errors:', deploymentStatus.deploymentErrors);
    } else {
      logDeployment('INFO', 'Deployment validation passed successfully');
    }
    
    deploymentStatus.buildEndTime = new Date().toISOString();
    
    return {
      success: totalErrors === 0,
      errors: deploymentStatus.deploymentErrors,
      warnings: deploymentStatus.warnings,
      checks: {
        environment: env,
        files: files,
        dependencies: deps,
        runtime: runtime,
        vercel: vercel,
        imports: importErrors
      }
    };
    
  } catch (error) {
    logDeployment('CRITICAL', 'Deployment validation crashed', null, error);
    deploymentStatus.buildEndTime = new Date().toISOString();
    return {
      success: false,
      errors: [...deploymentStatus.deploymentErrors, `Validation crash: ${error.message}`],
      warnings: deploymentStatus.warnings,
      checks: {}
    };
  }
}

// Get deployment logs
function getDeploymentLogs(level = null, limit = 100) {
  let filteredLogs = deploymentLogs;
  
  if (level) {
    filteredLogs = deploymentLogs.filter(log => log.level === level);
  }
  
  return filteredLogs.slice(-limit);
}

// Get deployment status
function getDeploymentStatus() {
  return {
    ...deploymentStatus,
    currentLogs: deploymentLogs.length,
    lastCheck: deploymentStatus.buildEndTime || deploymentStatus.buildStartTime
  };
}

// Export functions
export {
  logDeployment,
  runDeploymentChecks,
  getDeploymentLogs,
  getDeploymentStatus,
  checkEnvironment,
  checkFileSystem,
  checkDependencies,
  checkRuntime,
  checkVercelEnvironment,
  validateImports,
  DEPLOYMENT_LOG_LEVELS
};
