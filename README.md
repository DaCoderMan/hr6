# HR4AL.co - Recolocação Profissional

## 🎯 Sobre o Projeto

Sistema de web scraping especializado em notícias sobre recolocação profissional, entrevistas de emprego e processos seletivos. O projeto coleta as **30 notícias mais comentadas e lidas** sobre carreira no Brasil.

## 🚀 Funcionalidades

- **Web Scraping Real** de fontes brasileiras especializadas
- **Ranking por Engajamento** (comentários + visualizações)
- **Animações CSS** modernas e responsivas
- **Logo HR4AL.co** com efeitos visuais
- **Design Glassmorphism** com fundo animado
- **Estatísticas Detalhadas** por categoria e fonte

## 📊 Fontes de Dados

- Vagas.com
- Exame
- Você S/A
- Portal RH
- Revista RH
- HR Brasil
- LinkedIn Brasil
- InfoJobs
- Catho
- Indeed Brasil

## 🛠️ Tecnologias

- **Python 3.x**
- **BeautifulSoup4** - Web scraping
- **Requests** - HTTP requests
- **HTML5/CSS3** - Interface responsiva
- **JavaScript** - Animações interativas

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/DaCoderMan/hr6.git
cd hr6

# Instale as dependências
pip install -r requirements.txt
```

## 🎮 Como Usar

```bash
# Execute o scraper
python current_hr_news_scraper.py
```

O script irá:
1. Fazer scraping das fontes configuradas
2. Coletar as 30 notícias mais relevantes
3. Gerar uma página HTML com animações
4. Abrir automaticamente no navegador

## 📁 Estrutura do Projeto

```
hr6/
├── current_hr_news_scraper.py    # Script principal
├── hr4all_animated_demo.html     # Demo das animações
├── requirements.txt              # Dependências Python
└── README.md                     # Este arquivo
```

## 🎨 Recursos Visuais

- **Fundo Animado** com gradiente dinâmico
- **Partículas Flutuantes** com efeitos CSS
- **Logo HR4AL.co** com animação de brilho
- **Design Responsivo** para mobile e desktop
- **Efeitos Glassmorphism** modernos

## 📈 Estatísticas Geradas

- Total de visualizações
- Total de comentários
- Total de compartilhamentos
- Notícias da semana
- Categoria mais popular
- Fonte mais popular

## 🔧 Configuração

O sistema pode ser configurado editando as variáveis no arquivo `current_hr_news_scraper.py`:

- `news_sources` - Lista de fontes para scraping
- `search_terms` - Termos de busca relevantes
- `article_selector` - Seletores CSS para artigos

## 📄 Licença

Copyright (c) 2025 Workitu Tech, Israel. All Rights Reserved.

Este software é proprietário e confidencial. Uso não autorizado, reprodução ou distribuição é estritamente proibido.

## 👨‍💻 Desenvolvido por

**Workitu Tech** - [https://workitu.com](https://workitu.com)

---

## 🎯 Categorias de Notícias

- **Entrevistas** - Técnicas e comportamentais
- **Processos Seletivos** - Dinâmicas e testes
- **Currículo** - Otimização e ATS
- **Networking** - Construção de rede profissional
- **Transição de Carreira** - Mudança de área
- **Entrevistas Remotas** - Videoconferência
- **Negociação** - Salário e benefícios
- **Preparação Psicológica** - Confiança e resiliência

## 🔥 Top 5 Notícias Mais Atuais

1. Dinâmicas de grupo: estratégias para se destacar
2. Testes de personalidade em seleção: como se preparar
3. Entrevista comportamental: como responder perguntas difíceis
4. Segunda entrevista: como se preparar para a próxima etapa
5. Recrutamento e seleção: o que as empresas procuram
