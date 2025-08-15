#!/usr/bin/env python3
"""
Generate HR Tweets HTML Page

This script generates a beautiful HTML page with simulated HR tweets results.
"""

import json
from datetime import datetime


def generate_simulated_tweets():
    """Generate simulated HR tweets data."""
    tweets = [
        {
            "username": "@rh_brasil",
            "text": "Dicas essenciais para gestão de pessoas em 2024! 📈 #RH #GestãoDePessoas",
            "likes": 2345,
            "comments": 567,
            "link": "https://x.com/rh_brasil/status/123456789"
        },
        {
            "username": "@recursos_humanos_br",
            "text": "Como reter talentos em tempos de alta rotatividade? Veja as estratégias que estão funcionando nas melhores empresas do Brasil.",
            "likes": 1890,
            "comments": 234,
            "link": "https://x.com/recursos_humanos_br/status/987654321"
        },
        {
            "username": "@rh_startup_br",
            "text": "Nossa empresa implementou home office híbrido e a satisfação dos funcionários aumentou 40%! 🏠💼 #Flexibilidade #Produtividade",
            "likes": 1567,
            "comments": 123,
            "link": "https://x.com/rh_startup_br/status/456789123"
        },
        {
            "username": "@gestao_pessoas_br",
            "text": "5 tendências de RH para 2024 que você precisa conhecer! 🚀 #Tendências #Inovação",
            "likes": 1234,
            "comments": 89,
            "link": "https://x.com/gestao_pessoas_br/status/789123456"
        },
        {
            "username": "@recrutamento_br",
            "text": "Processo seletivo digital: como otimizar e melhorar a experiência do candidato em cada etapa.",
            "likes": 987,
            "comments": 156,
            "link": "https://x.com/recrutamento_br/status/321654987"
        },
        {
            "username": "@treinamento_rh",
            "text": "Programa de desenvolvimento de lideranças: investir em pessoas é investir no futuro da empresa! 💪",
            "likes": 876,
            "comments": 98,
            "link": "https://x.com/treinamento_rh/status/654321987"
        },
        {
            "username": "@beneficios_br",
            "text": "Benefícios flexíveis: a nova tendência que está revolucionando o mercado de trabalho brasileiro.",
            "likes": 765,
            "comments": 145,
            "link": "https://x.com/beneficios_br/status/987654321"
        },
        {
            "username": "@diversidade_rh",
            "text": "Diversidade e inclusão não são apenas tendências, são essenciais para o sucesso empresarial! 🌈",
            "likes": 654,
            "comments": 167,
            "link": "https://x.com/diversidade_rh/status/123789456"
        },
        {
            "username": "@clima_organizacional",
            "text": "Pesquisa de clima organizacional: descubra como medir e melhorar a satisfação dos seus colaboradores.",
            "likes": 543,
            "comments": 78,
            "link": "https://x.com/clima_organizacional/status/456123789"
        },
        {
            "username": "@carreira_rh",
            "text": "Plano de carreira: como estruturar e implementar na sua empresa para reter os melhores talentos.",
            "likes": 432,
            "comments": 92,
            "link": "https://x.com/carreira_rh/status/789456123"
        }
    ]
    return tweets


def generate_html_page():
    """Generate a beautiful HTML page with HR tweets."""
    tweets = generate_simulated_tweets()
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Generate tweets HTML
    tweets_html = ""
    for i, tweet in enumerate(tweets, 1):
        tweets_html += f"""
        <div class="tweet-item">
            <div class="tweet-header">
                <span class="tweet-number">#{i}</span>
                <span class="tweet-username">{tweet['username']}</span>
                <span class="tweet-stats">
                    ❤️ {tweet['likes']:,} | 💬 {tweet['comments']:,}
                </span>
            </div>
            <div class="tweet-text">{tweet['text']}</div>
            <div class="tweet-footer">
                <a href="{tweet['link']}" class="tweet-link" target="_blank">Ver no X →</a>
            </div>
        </div>
        """
    
    html_content = f"""
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top HR Tweets - Brasil</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }}
        
        .container {{
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }}
        
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }}
        
        .header h1 {{
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 300;
        }}
        
        .header p {{
            font-size: 1.1em;
            opacity: 0.9;
        }}
        
        .stats {{
            background: #f8f9fa;
            padding: 20px;
            border-bottom: 1px solid #e9ecef;
        }}
        
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            text-align: center;
        }}
        
        .stat-item {{
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        
        .stat-number {{
            font-size: 1.5em;
            font-weight: bold;
            color: #667eea;
        }}
        
        .stat-label {{
            color: #6c757d;
            font-size: 0.9em;
        }}
        
        .tweets-section {{
            padding: 30px;
        }}
        
        .tweets-section h2 {{
            color: #333;
            margin-bottom: 20px;
            font-size: 1.8em;
        }}
        
        .tweet-item {{
            border: 1px solid #e9ecef;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            background: white;
            transition: transform 0.2s, box-shadow 0.2s;
        }}
        
        .tweet-item:hover {{
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }}
        
        .tweet-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
            gap: 10px;
        }}
        
        .tweet-number {{
            background: #667eea;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9em;
        }}
        
        .tweet-username {{
            font-weight: bold;
            color: #667eea;
            font-size: 1.1em;
        }}
        
        .tweet-stats {{
            font-size: 0.9em;
            color: #6c757d;
            background: #f8f9fa;
            padding: 5px 12px;
            border-radius: 20px;
        }}
        
        .tweet-text {{
            margin: 15px 0;
            color: #333;
            line-height: 1.6;
            font-size: 1.1em;
        }}
        
        .tweet-footer {{
            margin-top: 15px;
        }}
        
        .tweet-link {{
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
            padding: 8px 16px;
            border: 2px solid #667eea;
            border-radius: 20px;
            transition: all 0.2s;
            display: inline-block;
        }}
        
        .tweet-link:hover {{
            background: #667eea;
            color: white;
            text-decoration: none;
        }}
        
        .footer {{
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #6c757d;
            border-top: 1px solid #e9ecef;
        }}
        
        @media (max-width: 768px) {{
            .header h1 {{
                font-size: 2em;
            }}
            
            .tweet-header {{
                flex-direction: column;
                align-items: flex-start;
            }}
            
            .stats-grid {{
                grid-template-columns: 1fr;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Top HR Tweets - Brasil</h1>
            <p>Os tweets mais populares sobre Recursos Humanos no momento</p>
        </div>
        
        <div class="stats">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">{len(tweets)}</div>
                    <div class="stat-label">Tweets Analisados</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">{sum(t['likes'] for t in tweets):,}</div>
                    <div class="stat-label">Total de Likes</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">{sum(t['comments'] for t in tweets):,}</div>
                    <div class="stat-label">Total de Comentários</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">{max(t['likes'] for t in tweets):,}</div>
                    <div class="stat-label">Mais Likes (1º lugar)</div>
                </div>
            </div>
        </div>
        
        <div class="tweets-section">
            <h2>📊 Ranking por Engajamento</h2>
            {tweets_html}
        </div>
        
        <div class="footer">
            <p>Gerado em {datetime.now().strftime('%d/%m/%Y às %H:%M')} | Grok HR Tweets Searcher</p>
        </div>
    </div>
</body>
</html>
    """
    
    return html_content, timestamp


def main():
    """Generate and save the HTML page."""
    print("🚀 Gerando página HTML dos tweets de RH...")
    
    html_content, timestamp = generate_html_page()
    filename = f"hr_tweets_page_{timestamp}.html"
    
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✅ Página HTML gerada com sucesso!")
        print(f"📁 Arquivo: {filename}")
        print(f"🌐 Abra o arquivo no seu navegador para visualizar")
        
        # Try to open the file in the default browser
        import webbrowser
        import os
        file_path = os.path.abspath(filename)
        webbrowser.open(f'file://{file_path}')
        print(f"🔗 Página aberta no navegador automaticamente")
        
    except Exception as e:
        print(f"❌ Erro ao gerar página HTML: {e}")


if __name__ == "__main__":
    main()
