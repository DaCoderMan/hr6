# Deployment Diagnostics System

**Copyright (c) 2025 Workitu Tech, Israel. All Rights Reserved.**

This document describes the comprehensive deployment diagnostics system designed to detect and troubleshoot Vercel deployment issues.

## Overview

The deployment diagnostics system provides real-time monitoring and validation of all aspects of the Vercel deployment process, helping identify and resolve deployment failures quickly.

## Features

### 🔍 **Comprehensive Validation**
- **Environment Checks**: Vercel environment variables and configuration
- **File System Validation**: Required files presence and accessibility
- **Dependency Validation**: Package.json and module compatibility
- **Runtime Validation**: Node.js version and memory usage
- **Import Validation**: ES6 module syntax and compatibility

### 📊 **Real-time Logging**
- **Deployment-specific logs** with timestamps and structured data
- **Error tracking** with full stack traces
- **Performance monitoring** for deployment operations
- **Memory usage tracking** to prevent OOM issues

### 🛠️ **Diagnostic Endpoints**
- `/api/deployment-diagnostics` - Main diagnostics endpoint
- Multiple diagnostic actions for specific checks
- Real-time deployment status monitoring

## Usage

### Console Logging
All deployment logs are automatically output to the console with deployment-specific prefixes:

```javascript
[DEPLOYMENT-INFO] 03:27:14: Starting file system validation
[DEPLOYMENT-ERROR] 03:27:14: Required file missing: api/index.js
[DEPLOYMENT-CRITICAL] 03:27:14: Deployment validation failed
```

### Diagnostic API Endpoints

#### Comprehensive Diagnostics
```
GET /api/deployment-diagnostics
```

#### Run Deployment Checks
```
GET /api/deployment-diagnostics?action=check
```

#### Get Deployment Logs
```
GET /api/deployment-diagnostics?action=logs&level=ERROR&limit=50
```

#### Get Deployment Status
```
GET /api/deployment-diagnostics?action=status
```

#### Environment Information
```
GET /api/deployment-diagnostics?action=environment
```

#### File System Check
```
GET /api/deployment-diagnostics?action=files
```

#### Dependency Validation
```
GET /api/deployment-diagnostics?action=dependencies
```

#### Vercel Environment
```
GET /api/deployment-diagnostics?action=vercel
```

## What Gets Validated

### ✅ **Environment Variables**
- `NODE_ENV` - Node.js environment
- `VERCEL_ENV` - Vercel environment (production/preview/development)
- `VERCEL_REGION` - Vercel deployment region
- `VERCEL_URL` - Vercel deployment URL
- `VERCEL_GIT_COMMIT_SHA` - Git commit hash
- `VERCEL_GIT_COMMIT_REF` - Git branch/tag

### ✅ **Required Files**
- `api/index.js` - Main API handler
- `api/logger.js` - Logging utility
- `api/debug.js` - Debug endpoint
- `api/deployment-logger.js` - Deployment logger
- `api/deployment-diagnostics.js` - Diagnostics endpoint
- `vercel.json` - Vercel configuration
- `package.json` - Node.js package configuration
- `index.html` - Frontend file

### ✅ **Dependencies**
- Package.json `type` field must be `"module"`
- Node.js engine specification
- Package name and version
- ES6 import syntax compatibility

### ✅ **Runtime**
- Node.js version compatibility (>=18.0.0)
- Memory usage monitoring
- Platform and architecture detection
- Process uptime tracking

## Common Deployment Issues Detected

### 🚨 **Critical Issues**
- Missing required files
- Invalid package.json configuration
- Node.js version incompatibility
- ES6 import syntax errors
- File system access issues

### ⚠️ **Warnings**
- Missing environment variables
- High memory usage
- Not running on Vercel
- Missing Node.js engine specification

### 📊 **Performance Issues**
- Slow file system operations
- High memory consumption
- Long import times
- Excessive log generation

## Response Format

### Successful Response
```json
{
  "success": true,
  "requestId": "abc123",
  "timestamp": "2025-08-14T03:27:14.803Z",
  "performance": { "totalTime": 45 },
  "deploymentChecks": {
    "success": true,
    "errors": [],
    "warnings": [],
    "checks": {
      "environment": {...},
      "files": {...},
      "dependencies": {...},
      "runtime": {...},
      "vercel": {...},
      "imports": []
    }
  },
  "summary": {
    "success": true,
    "totalErrors": 0,
    "totalWarnings": 0,
    "criticalIssues": 0
  }
}
```

### Error Response
```json
{
  "success": false,
  "requestId": "abc123",
  "error": "Deployment validation failed",
  "timestamp": "2025-08-14T03:27:14.803Z",
  "deploymentChecks": {
    "success": false,
    "errors": [
      "Missing file: api/index.js",
      "Package.json type must be 'module'"
    ],
    "warnings": ["NODE_ENV not set"]
  }
}
```

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. **Missing Files**
```
Error: Required file missing: api/index.js
Solution: Ensure all required files are committed to the repository
```

#### 2. **Package.json Issues**
```
Error: Package.json "type" must be "module"
Solution: Add "type": "module" to package.json
```

#### 3. **Node.js Version**
```
Error: Node.js version v16.x.x is too old
Solution: Update Node.js to version 18 or higher
```

#### 4. **Import Errors**
```
Error: ES6 import syntax not supported
Solution: Ensure package.json has "type": "module"
```

#### 5. **Vercel Environment**
```
Warning: Not running on Vercel
Solution: This is normal for local development
```

## Debug Commands

### Browser Testing
```bash
# Comprehensive diagnostics
https://your-app.vercel.app/api/deployment-diagnostics

# Check deployment status
https://your-app.vercel.app/api/deployment-diagnostics?action=status

# Get recent errors
https://your-app.vercel.app/api/deployment-diagnostics?action=logs&level=ERROR&limit=10
```

### PowerShell Testing
```powershell
# Test deployment diagnostics
Invoke-WebRequest -Uri "https://your-app.vercel.app/api/deployment-diagnostics" -UseBasicParsing

# Check specific issues
Invoke-WebRequest -Uri "https://your-app.vercel.app/api/deployment-diagnostics?action=check" -UseBasicParsing
```

### curl Testing (with SSL bypass)
```bash
# Test with SSL bypass
curl -k "https://your-app.vercel.app/api/deployment-diagnostics"

# Check deployment logs
curl -k "https://your-app.vercel.app/api/deployment-diagnostics?action=logs&level=ERROR"
```

## Integration with Vercel

### Automatic Validation
The deployment diagnostics system automatically runs during:
- **Build process**: Validates all files and dependencies
- **Runtime initialization**: Checks environment and runtime
- **API requests**: Monitors performance and errors

### Vercel Dashboard Integration
All deployment logs are available in:
- **Vercel Dashboard** → Functions → Logs
- **Function logs** with deployment-specific prefixes
- **Real-time monitoring** of deployment health

## Security

- **No sensitive data logged** - Only technical information
- **Request IDs for tracking** - No user data exposure
- **Memory-only storage** - No persistent log storage
- **Maximum log limits** - Prevents memory overflow

---

**This deployment diagnostics system is proprietary software belonging to Workitu Tech, Israel.**
