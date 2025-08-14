# 🚀 HR News Scraper - Vercel Deployment

**PROPRIETARY SOFTWARE - WORKITU TECH, ISRAEL**

**Copyright (c) 2025 Workitu Tech, Israel. All Rights Reserved.**

This software is proprietary and confidential. Unauthorized use, reproduction, or distribution is strictly prohibited.

## 📋 Overview

This project is configured for deployment on Vercel as a serverless application. It provides a web interface to generate and display the 100 most current HR news articles from Brazilian sources.

## 🏗️ Project Structure

```
├── api/
│   └── index.py          # Vercel serverless function
├── index.html            # Frontend interface
├── current_hr_news_scraper.py  # Main scraper logic
├── vercel.json           # Vercel configuration
├── requirements.txt      # Python dependencies
└── README.md            # Project documentation
```

## 🚀 Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
vercel
```

### 4. Follow the prompts:
- **Set up and deploy**: `Y`
- **Which scope**: Select your account
- **Link to existing project**: `N`
- **Project name**: `hr-news-scraper` (or your preferred name)
- **Directory**: `./` (current directory)
- **Override settings**: `N`

## 🌐 Usage

### Frontend Interface
- Visit your deployed URL (e.g., `https://hr-news-scraper.vercel.app`)
- Click "🚀 Gerar Notícias de RH" to generate news
- View statistics and top 5 news preview
- Click "📄 Ver Página Completa" to see full results

### API Endpoint
- **URL**: `https://your-domain.vercel.app/api`
- **Method**: `GET`
- **Response**: JSON with news data and HTML content

## ⚙️ Configuration

### Vercel Settings (`vercel.json`)
- **Runtime**: Python 3.9+
- **Max Duration**: 30 seconds
- **Routes**: API and static file handling
- **CORS**: Enabled for cross-origin requests

### Environment Variables
No environment variables required for basic functionality.

## 🔧 Customization

### Modify Scraper Logic
Edit `current_hr_news_scraper.py` to:
- Add new news sources
- Change ranking algorithms
- Modify HTML templates

### Update Frontend
Edit `index.html` to:
- Change styling and branding
- Add new features
- Modify user interface

### API Modifications
Edit `api/index.py` to:
- Add new endpoints
- Modify response format
- Add authentication

## 📊 Features

### ✅ Implemented
- **100 current HR news articles** from Brazilian sources
- **Real-time statistics** (views, shares, comments)
- **Google search integration** for each article
- **Workitu TecH branding** with golden styling
- **Responsive design** for mobile and desktop
- **Serverless architecture** on Vercel
- **CORS support** for cross-origin requests

### 🎨 Design Features
- **Modern gradient backgrounds**
- **Interactive buttons** with hover effects
- **Loading animations** during processing
- **Error handling** with user-friendly messages
- **Statistics cards** with visual appeal
- **News preview** with ranking system

## 🐛 Troubleshooting

### Common Issues

1. **Import Errors**
   - Ensure all dependencies are in `requirements.txt`
   - Check Python version compatibility

2. **Timeout Errors**
   - Increase `maxDuration` in `vercel.json`
   - Optimize scraper performance

3. **CORS Issues**
   - Verify CORS headers in API response
   - Check frontend fetch requests

4. **Memory Issues**
   - Reduce data size in responses
   - Optimize HTML generation

### Debug Mode
Add debug logging to `api/index.py`:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 📈 Performance

### Optimization Tips
- **Caching**: Implement Redis for news caching
- **CDN**: Use Vercel's edge network
- **Compression**: Enable gzip compression
- **Images**: Optimize and compress images

### Monitoring
- **Vercel Analytics**: Monitor performance
- **Error Tracking**: Set up error monitoring
- **Uptime**: Check service availability

## 🔒 Security

### Best Practices
- **Input Validation**: Validate all inputs
- **Rate Limiting**: Implement API rate limits
- **HTTPS**: Always use secure connections
- **CORS**: Configure proper CORS policies

## 📞 Support

### Resources
- **Vercel Documentation**: https://vercel.com/docs
- **Python Runtime**: https://vercel.com/docs/runtimes#python
- **Serverless Functions**: https://vercel.com/docs/functions

### Contact
- **Developer**: Workitu Tech, Israel
- **Website**: https://workitu.com
- **Repository**: https://github.com/DaCoderMan/hrx3

## 🎯 Next Steps

### Potential Enhancements
1. **Database Integration**: Store news in database
2. **User Authentication**: Add login system
3. **News Categories**: Filter by category
4. **Export Features**: PDF/Excel export
5. **Real-time Updates**: WebSocket integration
6. **Analytics Dashboard**: Detailed statistics
7. **Newsletter Integration**: Email subscriptions
8. **Social Sharing**: Direct social media sharing

---

**Copyright (c) 2025 Workitu Tech, Israel. All Rights Reserved.**

**Deployed with ❤️ by Workitu Tech, Israel**
