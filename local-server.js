import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'HR4AL.co Local Server is running!'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
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
});

// Main API endpoint
app.get('/api', (req, res) => {
  try {
    // Generate simple HR news data
    const newsSources = [
      "Portal RH Brasil", "Revista RH", "HR Brasil", "Gestão RH", "RH Digital",
      "Portal Carreira", "RH Online", "Gestão de Pessoas", "RH News", "HR Trends"
    ];

    const categories = [
      "Legislação", "Tecnologia", "Trabalho Remoto", "Benefícios", "Diversidade",
      "Gerações", "Bem-estar", "Treinamento", "Retenção", "Remuneração"
    ];

    const topics = [
      "Nova legislação trabalhista 2024", "IA e automação em RH", "Home office híbrido",
      "Benefícios flexíveis", "Diversidade e inclusão", "Geração Z no trabalho",
      "Bem-estar corporativo", "E-learning corporativo", "Retenção de talentos",
      "Salários e remuneração"
    ];

    const newsList = [];
    const currentDate = new Date();

    for (let i = 0; i < 100; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const articleDate = new Date(currentDate.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      
      const source = newsSources[Math.floor(Math.random() * newsSources.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const topic = topics[Math.floor(Math.random() * topics.length)];
      
      const baseViews = Math.max(3000, 50000 - (daysAgo * 1000));
      const views = baseViews + Math.floor(Math.random() * 5000);
      const shares = Math.max(30, Math.floor(views / 100));
      const comments = Math.max(5, Math.floor(views / 500));
      
      newsList.push({
        rank: i + 1,
        title: `${topic}: Tendências que dominarão ${currentDate.getFullYear()}`,
        source: source,
        summary: `Artigo atualizado sobre ${topic.toLowerCase()} com insights valiosos para profissionais de RH em ${currentDate.getFullYear()}.`,
        date: articleDate.toISOString().split('T')[0],
        views: views,
        shares: shares,
        comments: comments,
        category: category,
        is_current: daysAgo <= 7
      });
    }

    // Calculate statistics
    const total_views = newsList.reduce((sum, news) => sum + news.views, 0);
    const total_shares = newsList.reduce((sum, news) => sum + news.shares, 0);
    const total_comments = newsList.reduce((sum, news) => sum + news.comments, 0);
    const current_news = newsList.filter(news => news.is_current).length;
    const avg_views = Math.floor(total_views / newsList.length);

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      news_count: newsList.length,
      stats: {
        total_views: total_views,
        total_shares: total_shares,
        total_comments: total_comments,
        current_news: current_news,
        avg_views: avg_views,
        top_category: "Tecnologia",
        top_source: "Portal RH Brasil"
      },
      top_5_news: newsList.slice(0, 5).map(news => ({
        rank: news.rank,
        title: news.title,
        source: news.source,
        date: news.date,
        views: news.views,
        category: news.category
      }))
    };

    res.json(response);
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Serve static files
app.use(express.static(__dirname));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HR4AL.co Local Server running on http://localhost:${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   - GET /health - Health check`);
  console.log(`   - GET /api - Main API endpoint`);
  console.log(`   - GET /api/test - Test endpoint`);
  console.log(`\n🔗 Test URLs:`);
  console.log(`   http://localhost:${PORT}/health`);
  console.log(`   http://localhost:${PORT}/api/test`);
  console.log(`   http://localhost:${PORT}/api`);
  console.log(`   http://localhost:${PORT}/`);
  console.log(`   http://localhost:${PORT}/demo`);
});
