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
      // Generate simple HR news data
      const newsSources = [
        "Portal Carreira", "InfoJobs", "Vagas.com", "LinkedIn", "Glassdoor",
        "Catho", "Indeed", "Brasil Vagas", "Empregos.com", "Carreira & Sucesso"
      ];

      const categories = [
        "Entrevistas", "Currículo", "Busca de Emprego", "Processos Seletivos", "Dicas de Carreira",
        "Recrutamento", "Networking", "Preparação", "Mercado de Trabalho", "Oportunidades"
      ];

      const topics = [
        "Como passar em entrevistas de emprego", "Dicas para criar um currículo perfeito", "Estratégias de busca de emprego",
        "Como se destacar em processos seletivos", "Networking para conseguir emprego", "Preparação para entrevistas",
        "Mercado de trabalho 2024", "Oportunidades de carreira", "Como negociar salário", "Transição de carreira"
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
          title: `${topic}: Guia completo para ${currentDate.getFullYear()}`,
          source: source,
          summary: `Artigo completo sobre ${topic.toLowerCase()} com dicas práticas e estratégias para ${currentDate.getFullYear()}.`,
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
          top_category: "Entrevistas",
          top_source: "Portal Carreira"
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

      // Ensure response is valid JSON
      const jsonResponse = JSON.stringify(response);
      
      // Validate JSON before sending
      try {
        JSON.parse(jsonResponse);
        res.status(200).json(response);
      } catch (jsonError) {
        res.status(500).json({
          success: false,
          error: 'Invalid JSON generated',
          timestamp: new Date().toISOString()
        });
      }
      
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
