# Logging System Documentation

**Copyright (c) 2025 Workitu Tech, Israel. All Rights Reserved.**

This document describes the comprehensive logging system implemented in the HR News Scraper API.

## Overview

The logging system provides detailed error detection, performance monitoring, and debugging capabilities for the HR News Scraper API.

## Features

### 🔍 **Log Levels**
- **DEBUG**: Detailed debugging information
- **INFO**: General information about application flow
- **WARNING**: Warning messages for potential issues
- **ERROR**: Error messages with full stack traces

### 📊 **Performance Monitoring**
- Automatic timing of operations
- Performance warnings for slow operations (>1 second)
- Request timing and response size tracking

### 🛠️ **Debug Endpoints**
- `/api/debug` - Access logs and system information
- Real-time log viewing and statistics
- System health monitoring

## Usage

### Console Logging
All logs are automatically output to the console with timestamps and structured data:

```javascript
[INFO] 2025-08-14T02:54:36.595Z: API Request started
[ERROR] 2025-08-14T02:54:36.595Z: Request failed Error: Something went wrong
```

### Debug API Endpoints

#### Get All Debug Information
```
GET /api/debug
```

#### Get Logs Only
```
GET /api/debug?action=logs&level=ERROR&limit=50
```

#### Get System Information
```
GET /api/debug?action=system
```

#### Get Log Statistics
```
GET /api/debug?action=stats
```

#### Clear Logs
```
GET /api/debug?action=clear
```

## Log Structure

Each log entry contains:
```json
{
  "level": "INFO|WARNING|ERROR|DEBUG",
  "timestamp": "2025-08-14T02:54:36.595Z",
  "message": "Log message",
  "data": { "additional": "data" },
  "error": {
    "name": "Error",
    "message": "Error message",
    "stack": "Full stack trace"
  },
  "context": { "requestId": "abc123" }
}
```

## Error Detection

The system automatically detects and logs:
- ✅ API request failures
- ✅ Data generation errors
- ✅ Performance issues
- ✅ Invalid data types
- ✅ Missing required fields
- ✅ CORS issues
- ✅ Method not allowed errors

## Performance Monitoring

The system tracks:
- ⏱️ Request processing time
- 📊 Response size
- 🐌 Slow operations (>1 second)
- 💾 Memory usage
- 🔄 Function execution time

## Environment Variables

- `LOG_LEVEL`: Set logging level (DEBUG, INFO, WARNING, ERROR)
- `NODE_ENV`: Environment (development, production)

## Vercel Integration

All logs are automatically available in Vercel's function logs and can be accessed via:
- Vercel Dashboard → Functions → Logs
- Debug API endpoint: `/api/debug`

## Security

- Logs are stored in memory only (no persistent storage)
- Maximum 1000 log entries kept in memory
- No sensitive data logged
- Request IDs for tracking without exposing user data

## Troubleshooting

### Common Issues

1. **High Memory Usage**: Clear logs using `/api/debug?action=clear`
2. **Too Many Logs**: Adjust log level via `LOG_LEVEL` environment variable
3. **Performance Issues**: Check `/api/debug?action=stats` for slow operations

### Debug Commands

```bash
# Check system health
curl "https://your-app.vercel.app/api/debug?action=system"

# Get recent errors
curl "https://your-app.vercel.app/api/debug?action=logs&level=ERROR&limit=10"

# Get performance stats
curl "https://your-app.vercel.app/api/debug?action=stats"
```

---

**This logging system is proprietary software belonging to Workitu Tech, Israel.**
